const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c >>> 0;
}

function calcCrc(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function decodePng(buffer) {
  let pos = 8;
  let width = 0, height = 0, colorType = 2, bitDepth = 8;
  const idatChunks = [];

  while (pos < buffer.length) {
    const len = buffer.readUInt32BE(pos);
    const type = buffer.subarray(pos + 4, pos + 8).toString('ascii');
    const data = buffer.subarray(pos + 8, pos + 8 + len);

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    }
    pos += 12 + len;
  }

  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const stride = width * bpp;
  const rawPixels = Buffer.alloc(width * height * 4);

  const scanlines = Buffer.alloc(width * height * bpp);
  let srcPos = 0;
  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcPos++];
    const lineStart = y * stride;
    const prevLineStart = (y - 1) * stride;

    for (let x = 0; x < stride; x++) {
      const byte = decompressed[srcPos++];
      const a = x >= bpp ? scanlines[lineStart + x - bpp] : 0;
      const b = y > 0 ? scanlines[prevLineStart + x] : 0;
      const c = (y > 0 && x >= bpp) ? scanlines[prevLineStart + x - bpp] : 0;

      let val = 0;
      switch (filterType) {
        case 0: val = byte; break;
        case 1: val = (byte + a) & 0xff; break;
        case 2: val = (byte + b) & 0xff; break;
        case 3: val = (byte + Math.floor((a + b) / 2)) & 0xff; break;
        case 4: val = (byte + paethPredictor(a, b, c)) & 0xff; break;
      }
      scanlines[lineStart + x] = val;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sIdx = (y * width + x) * bpp;
      const dIdx = (y * width + x) * 4;
      if (bpp === 3) {
        rawPixels[dIdx] = scanlines[sIdx];
        rawPixels[dIdx + 1] = scanlines[sIdx + 1];
        rawPixels[dIdx + 2] = scanlines[sIdx + 2];
        rawPixels[dIdx + 3] = 255;
      } else if (bpp === 4) {
        rawPixels[dIdx] = scanlines[sIdx];
        rawPixels[dIdx + 1] = scanlines[sIdx + 1];
        rawPixels[dIdx + 2] = scanlines[sIdx + 2];
        rawPixels[dIdx + 3] = scanlines[sIdx + 3];
      }
    }
  }

  return { width, height, data: rawPixels };
}

function encodePng(width, height, rgbaBuffer) {
  const bpp = 4;
  const stride = width * bpp;
  const rawScanlines = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    const destOffset = y * (stride + 1);
    rawScanlines[destOffset] = 0;
    rgbaBuffer.copy(rawScanlines, destOffset + 1, y * stride, (y + 1) * stride);
  }

  const deflated = zlib.deflateSync(rawScanlines, { level: 9 });
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  function createChunk(typeStr, dataBuf) {
    const len = dataBuf.length;
    const total = Buffer.alloc(12 + len);
    total.writeUInt32BE(len, 0);
    total.write(typeStr, 4, 4, 'ascii');
    dataBuf.copy(total, 8);
    const typeAndData = total.subarray(4, 8 + len);
    const crc = calcCrc(typeAndData);
    total.writeUInt32BE(crc, 8 + len);
    return total;
  }

  return Buffer.concat([
    signature,
    createChunk('IHDR', ihdrData),
    createChunk('IDAT', deflated),
    createChunk('IEND', Buffer.alloc(0))
  ]);
}

const inputPath = path.resolve('src/assets/images/HERO.png');
const rawPng = fs.readFileSync(inputPath);
const img = decodePng(rawPng);
const { width, height } = img;
console.log(`Processing HERO.png: ${width}x${height}`);

// Step 1: Detect sky vs foreground
// Sky has prominent blue component (b > r && b > g) or bright light gray/cloud tint in upper region
// Bottom road/asphalt has ground colors that can be softly feathered into a contact shadow

const alphaMap = new Float32Array(width * height);

for (let y = 0; y < height; y++) {
  const normY = y / height; // 0 at top, 1 at bottom

  for (let x = 0; x < width; x++) {
    const normX = x / width; // 0 at left, 1 at right
    const idx = (y * width + x) * 4;
    const r = img.data[idx];
    const g = img.data[idx + 1];
    const b = img.data[idx + 2];

    const brightness = (r + g + b) / 3;
    const isSkyBlue = b > 110 && (b - r > 15 || b - g > 10) && normY < 0.65;
    const isOvercastWhiteSky = normY < 0.35 && r > 210 && g > 210 && b > 210;
    const isUpperBackground = normY < 0.45 && (isSkyBlue || isOvercastWhiteSky || (b > r + 10 && brightness > 120));

    let alpha = 1.0;

    if (isUpperBackground) {
      // Calculate smooth transition
      const skyFactor = Math.max(0, Math.min(1, (b - r) / 40));
      alpha = Math.max(0, 1 - skyFactor * 1.3);
      if (isSkyBlue || isOvercastWhiteSky) alpha = 0.0;
    }

    // Feather edges horizontally (smooth left & right fade)
    const edgeDistX = Math.min(normX, 1 - normX);
    if (edgeDistX < 0.12) {
      const fadeX = edgeDistX / 0.12;
      alpha *= Math.pow(fadeX, 1.2);
    }

    // Feather top edge
    if (normY < 0.15) {
      const fadeY = normY / 0.15;
      alpha *= Math.pow(fadeY, 1.2);
    }

    // Feather bottom edge (soft ground shadow melt)
    if (normY > 0.85) {
      const bottomDist = (1 - normY) / 0.15;
      alpha *= Math.pow(bottomDist, 1.1);
    }

    alphaMap[y * width + x] = Math.max(0, Math.min(1, alpha));
  }
}

// Step 2: Smooth the alpha map (3-pass box blur for high-quality feathered mask)
const smoothedAlpha = new Float32Array(width * height);
const radius = 3;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let sum = 0, count = 0;
    for (let dy = -radius; dy <= radius; dy++) {
      const ny = y + dy;
      if (ny >= 0 && ny < height) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          if (nx >= 0 && nx < width) {
            sum += alphaMap[ny * width + nx];
            count++;
          }
        }
      }
    }
    smoothedAlpha[y * width + x] = sum / count;
  }
}

// Step 3: Apply smoothed alpha to image pixels
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const a = smoothedAlpha[y * width + x];
    img.data[idx + 3] = Math.round(a * 255);
  }
}

// Step 4: Crop empty transparent padding
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const a = img.data[(y * width + x) * 4 + 3];
    if (a > 8) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = 16;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

const croppedWidth = maxX - minX + 1;
const croppedHeight = maxY - minY + 1;

console.log(`Cropping blended HERO from (${minX}, ${minY}) to (${maxX}, ${maxY}) => ${croppedWidth}x${croppedHeight}`);

const croppedData = Buffer.alloc(croppedWidth * croppedHeight * 4);
for (let y = 0; y < croppedHeight; y++) {
  const srcY = minY + y;
  const srcStart = (srcY * width + minX) * 4;
  const destStart = (y * croppedWidth) * 4;
  img.data.copy(croppedData, destStart, srcStart, srcStart + croppedWidth * 4);
}

const outputPng = encodePng(croppedWidth, croppedHeight, croppedData);
fs.writeFileSync(inputPath, outputPng);
console.log(`Successfully saved blended HERO.png to ${inputPath} (${outputPng.length} bytes)`);

// Also save to public/
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'HERO.png'), outputPng);
fs.writeFileSync(path.join(publicDir, 'hero.png'), outputPng);
console.log('Saved to public/HERO.png and public/hero.png');
