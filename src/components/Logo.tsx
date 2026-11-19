import React, { useState } from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LOGO_IMAGE_SRC = '/src/assets/images/infocus_logo.jpg';

export const AcademyLogo: React.FC<LogoProps> = ({
  variant = 'dark',
  showText = true,
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  const boxSize =
    size === 'lg' ? 'w-20 h-20 rounded-xl' : size === 'sm' ? 'w-9 h-9 rounded-lg' : 'w-11 h-11 rounded-lg';

  return (
    <span className="inline-flex items-center gap-3 shrink-0 whitespace-nowrap select-none">
      {!imgError ? (
        <span
          className={`${boxSize} overflow-hidden shrink-0 inline-flex items-center justify-center bg-[#051133] ${
            variant === 'light'
              ? 'ring-2 ring-[#D6AF62] shadow-md'
              : 'ring-1 ring-[#10233F]/20 shadow-xs'
          }`}
        >
          <img
            src={LOGO_IMAGE_SRC}
            alt="INFOCUS ACADEMY Logo"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain"
          />
        </span>
      ) : (
        <span
          className={`${boxSize} bg-[#051133] border-2 border-[#D6AF62] flex items-center justify-center font-display text-xs font-extrabold text-[#D6AF62] shrink-0`}
        >
          IA
        </span>
      )}
      {showText && (
        <span
          className={`font-display text-base sm:text-lg font-extrabold tracking-tight whitespace-nowrap shrink-0 ${
            variant === 'light' ? 'text-white' : 'text-[#10233F]'
          }`}
        >
          INFOCUS <span className="text-[#D6AF62]">ACADEMY</span>
        </span>
      )}
    </span>
  );
};
