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
    size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-9 h-9' : 'w-10 h-10';

  return (
    <span className="inline-flex items-center gap-2.5 shrink-0 whitespace-nowrap select-none">
      {!imgError ? (
        <img
          src={LOGO_IMAGE_SRC}
          alt="INFOCUS ACADEMY Logo"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`${boxSize} rounded-lg object-cover shrink-0 ${
            variant === 'light'
              ? 'border border-[#D6AF62]/50'
              : 'border border-slate-200 shadow-xs'
          }`}
        />
      ) : (
        <span
          className={`${boxSize} rounded-lg bg-[#051133] border border-[#D6AF62] flex items-center justify-center font-display text-xs font-extrabold text-[#D6AF62] shrink-0`}
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
