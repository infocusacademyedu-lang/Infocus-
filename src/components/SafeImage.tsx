import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-[#10233F] to-[#091526] text-white flex flex-col items-center justify-center p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <BookOpen className="w-8 h-8 text-[#D6AF62] mb-2" />
        <span className="font-display text-sm font-semibold">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
