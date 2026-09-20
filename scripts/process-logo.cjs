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
  let width = 0, height = 0;
  const idatChunks = [];

  while (pos < buffer.length) {
    const len = buffer.readUInt32BE(pos);
    const type = buffer.subarray(pos + 4, pos + 8).toString('ascii');
    const data = buffer.subarray(pos + 8, pos + 8 + len);

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      const bitDepth = data[8];
      const colorType = data[9];
      if (bitDepth !== 8 || colorType !== 6) {
        throw new Error(`Only 8-bit RGBA supported currently (got depth=${bitDepth}, colorType=${colorType})`);
      }
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    }
    pos += 12 + len;
  }

  const compressedData = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressedData);

  const bpp = 4; // RGBA
  const stride = width * bpp;
  const rawPixels = Buffer.alloc(width * height * 4);

  let srcPos = 0;
  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcPos++];
    const lineStart = y * stride;
    const prevLineStart = (y - 1) * stride;

    for (let x = 0; x < stride; x++) {
      const byte = decompressed[srcPos++];
      const a = x >= bpp ? rawPixels[lineStart + x - bpp] : 0;
      const b = y > 0 ? rawPixels[prevLineStart + x] : 0;
      const c = (y > 0 && x >= bpp) ? rawPixels[prevLineStart + x - bpp] : 0;

      let val = 0;
      switch (filterType) {
        case 0: val = byte; break;
        case 1: val = (byte + a) & 0xff; break;
        case 2: val = (byte + b) & 0xff; break;
        case 3: val = (byte + Math.floor((a + b) / 2)) & 0xff; break;
        case 4: val = (byte + paethPredictor(a, b, c)) & 0xff; break;
        default: throw new Error(`Unknown filter type ${filterType}`);
      }
      rawPixels[lineStart + x] = val;
    }
  }

  return { width, height, data: rawPixels };
}

function encodePng(width, height, rgbaBuffer) {
  const bpp = 4;
  const stride = width * bpp;
  // Use filter type 0 (None) for all scanlines
  const rawScanlines = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    const destOffset = y * (stride + 1);
    rawScanlines[destOffset] = 0; // Filter None
    rgbaBuffer.copy(rawScanlines, destOffset + 1, y * stride, (y + 1) * stride);
  }

  const deflated = zlib.deflateSync(rawScanlines, { level: 9 });

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 6; // Color type RGBA
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace (no)
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT chunk
  const idatChunk = createChunk('IDAT', deflated);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

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

const inputPath = path.resolve('src/assets/images/BALU LOGO.png');
const rawPng = fs.readFileSync(inputPath);
const img = decodePng(rawPng);

console.log(`Loaded image ${img.width}x${img.height}`);

// Sample the 4 corners to find background color
const samples = [
  getPixel(img, 0, 0),
  getPixel(img, img.width - 1, 0),
  getPixel(img, 0, img.height - 1),
  getPixel(img, img.width - 1, img.height - 1),
  getPixel(img, Math.floor(img.width / 2), 2),
  getPixel(img, 2, Math.floor(img.height / 2))
];

console.log('Corner/edge samples:', samples);

function getPixel(image, x, y) {
  const idx = (y * image.width + x) * 4;
  return {
    r: image.data[idx],
    g: image.data[idx + 1],
    b: image.data[idx + 2],
    a: image.data[idx + 3]
  };
}

// Background is white/light (e.g. RGB around 240-255 or dark depending on samples)
// Let's determine if the background is light or dark or flood fill from the borders.
// We'll perform a flood fill / connected-component from all borders or color distance calculation.

const bgR = samples[0].r;
const bgG = samples[0].g;
const bgB = samples[0].b;

console.log(`Detected primary BG color: rgb(${bgR}, ${bgG}, ${bgB})`);

// Let's check brightness of BG:
const isLightBg = (bgR + bgG + bgB) / 3 > 128;
console.log(`Is light background: ${isLightBg}`);

// Let's do a flood fill from all perimeter pixels that match the background color within a threshold
const width = img.width;
const height = img.height;
const isBg = new Uint8Array(width * height);
const queue = [];

function colorDist(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

// Seed border pixels
for (let x = 0; x < width; x++) {
  seedPixel(x, 0);
  seedPixel(x, height - 1);
}
for (let y = 0; y < height; y++) {
  seedPixel(0, y);
  seedPixel(width - 1, y);
}

function seedPixel(x, y) {
  const idx = y * width + x;
  if (isBg[idx]) return;
  const pIdx = idx * 4;
  const r = img.data[pIdx];
  const g = img.data[pIdx + 1];
  const b = img.data[pIdx + 2];
  
  // If close to bg color or if light bg and pixel is very light (r,g,b > 230)
  const dist = colorDist(r, g, b, bgR, bgG, bgB);
  if (dist < 60 || (isLightBg && r > 220 && g > 220 && b > 220)) {
    isBg[idx] = 1;
    queue.push(idx);
  }
}

// Flood fill BFS
let head = 0;
while (head < queue.length) {
  const currIdx = queue[head++];
  const cx = currIdx % width;
  const cy = Math.floor(currIdx / width);

  const neighbors = [
    [cx + 1, cy],
    [cx - 1, cy],
    [cx, cy + 1],
    [cx, cy - 1]
  ];

  for (const [nx, ny] of neighbors) {
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const nIdx = ny * width + nx;
      if (!isBg[nIdx]) {
        const pIdx = nIdx * 4;
        const r = img.data[pIdx];
        const g = img.data[pIdx + 1];
        const b = img.data[pIdx + 2];

        const dist = colorDist(r, g, b, bgR, bgG, bgB);
        if (dist < 45 || (isLightBg && r > 225 && g > 225 && b > 225)) {
          isBg[nIdx] = 1;
          queue.push(nIdx);
        }
      }
    }
  }
}

console.log(`Flood filled background pixels: ${queue.length} of ${width * height} (${Math.round(queue.length / (width * height) * 100)}%)`);

// Also any pixel anywhere that is pure/near white when isLightBg
let extraRemoved = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    const pIdx = idx * 4;
    const r = img.data[pIdx];
    const g = img.data[pIdx + 1];
    const b = img.data[pIdx + 2];

    if (isBg[idx]) {
      // Background pixel -> make transparent
      img.data[pIdx + 3] = 0;
    } else {
      // Check if it's near-white background island (e.g. inside letters like O, A, B, D, P, R, etc. if desired)
      if (isLightBg && r > 245 && g > 245 && b > 245) {
        img.data[pIdx + 3] = 0;
        extraRemoved++;
      } else if (isLightBg && r > 220 && g > 220 && b > 220) {
        // Soft anti-aliased edge
        const t = (Math.min(r, g, b) - 220) / 35; // 0..1
        img.data[pIdx + 3] = Math.round(255 * (1 - t));
        extraRemoved++;
      }
    }
  }
}

console.log(`Extra near-white pixels made transparent: ${extraRemoved}`);

// Crop transparent borders (autotrim)
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const alpha = img.data[(y * width + x) * 4 + 3];
    if (alpha > 15) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// Add padding
const pad = 12;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

const croppedWidth = maxX - minX + 1;
const croppedHeight = maxY - minY + 1;

console.log(`Cropping from (${minX}, ${minY}) to (${maxX}, ${maxY}) => ${croppedWidth}x${croppedHeight}`);

const croppedData = Buffer.alloc(croppedWidth * croppedHeight * 4);
for (let y = 0; y < croppedHeight; y++) {
  const srcY = minY + y;
  const srcStart = (srcY * width + minX) * 4;
  const destStart = (y * croppedWidth) * 4;
  img.data.copy(croppedData, destStart, srcStart, srcStart + croppedWidth * 4);
}

// Write back to BALU LOGO.png
const outputPng = encodePng(croppedWidth, croppedHeight, croppedData);
fs.writeFileSync(inputPath, outputPng);
console.log(`Successfully saved transparent logo to ${inputPath} (${outputPng.length} bytes)`);

// Also save to public/
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'BALU LOGO.png'), outputPng);
fs.writeFileSync(path.join(publicDir, 'logo.png'), outputPng);
console.log('Copied transparent logo to public/ folder');
