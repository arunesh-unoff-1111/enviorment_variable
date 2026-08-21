import React from 'react';

interface LotusIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const LotusIcon: React.FC<LotusIconProps> = ({
  className = "w-8 h-8 text-amber-200/90",
  size,
  color
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        width: size ? `${size}px` : undefined,
        height: size ? `${size}px` : undefined,
        color: color || undefined
      }}
    >
      {/* Center Petal */}
      <path d="M50 15 C42 35 42 55 50 78 C58 55 58 35 50 15 Z" fill="currentColor" fillOpacity="0.12" />
      
      {/* Inner Left Petal */}
      <path d="M50 28 C32 40 28 60 42 78 C48 64 48 45 50 28 Z" fill="currentColor" fillOpacity="0.1" />
      
      {/* Inner Right Petal */}
      <path d="M50 28 C68 40 72 60 58 78 C52 64 52 45 50 28 Z" fill="currentColor" fillOpacity="0.1" />
      
      {/* Outer Left Petal */}
      <path d="M50 42 C24 48 15 68 32 82 C42 75 46 58 50 42 Z" fill="currentColor" fillOpacity="0.08" />
      
      {/* Outer Right Petal */}
      <path d="M50 42 C76 48 85 68 68 82 C58 75 54 58 50 42 Z" fill="currentColor" fillOpacity="0.08" />
      
      {/* Bottom Lotus Base Line / Pond reflection */}
      <path d="M30 84 C42 88 58 88 70 84" strokeWidth="2" strokeOpacity="0.7" />
    </svg>
  );
};
