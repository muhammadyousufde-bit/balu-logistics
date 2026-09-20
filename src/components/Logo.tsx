import React, { useState } from 'react';
import { Language } from '../types';
import baluLogoImg from '../assets/images/BALU LOGO.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  companyName?: string;
  isDark?: boolean;
  lang?: Language;
}

/**
 * Brand Logo component rendering the transparent BALU LOGISTIK logo.
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  isDark = false,
  lang = 'de'
}) => {
  const [imgError, setImgError] = useState(false);

  // Height sizing for the logo image
  const heightClass =
    size === 'sm' ? 'h-8' : size === 'lg' ? 'h-12' : 'h-10';
  const taglineSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <div className={`inline-flex flex-col text-left select-none ${className}`}>
      <div className="flex items-center gap-2">
        {!imgError ? (
          <img
            src={baluLogoImg}
            alt="BALU LOGISTIK"
            className={`${heightClass} w-auto object-contain transition-transform hover:scale-[1.02]`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="font-extrabold tracking-tight text-xl font-['Outfit',sans-serif]">
            <span className={isDark ? 'text-white' : 'text-[#1E2024]'}>BALU </span>
            <span className="text-[#C89C50]">LOGISTIK</span>
          </div>
        )}
      </div>

      {showTagline && (
        <div className="mt-0.5 pl-0.5">
          <span
            className={`font-semibold uppercase tracking-wider block ${taglineSize} text-[#8C6326]`}
          >
            Amazon DSP • Paderborn
          </span>
        </div>
      )}
    </div>
  );
};

