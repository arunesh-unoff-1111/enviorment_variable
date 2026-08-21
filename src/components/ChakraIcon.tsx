import React from 'react';
import { ChakraKey } from '../types';
import { CHAKRA_METADATA } from '../data/chakras';

interface ChakraIconProps {
  chakraKey: ChakraKey;
  className?: string;
  size?: number;
}

export const ChakraIcon: React.FC<ChakraIconProps> = ({
  chakraKey,
  className = "w-6 h-6",
  size = 24
}) => {
  const meta = CHAKRA_METADATA[chakraKey];

  return (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 border shadow-md transition-shadow ${className}`}
      style={{
        width: `${size * 1.6}px`,
        height: `${size * 1.6}px`,
        backgroundColor: `${meta.colorHex}15`,
        borderColor: `${meta.colorHex}50`,
        boxShadow: `0 0 12px ${meta.colorHex}25`
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={meta.colorHex}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {chakraKey === 'root' && (
          // Square inside circle / Root geometry
          <>
            <circle cx="12" cy="12" r="9" strokeWidth="1.2" strokeOpacity="0.4" />
            <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" />
            <path d="M12 7.5V16.5" strokeWidth="1" strokeDasharray="1 1" />
          </>
        )}

        {chakraKey === 'sacral' && (
          // Crescent moon / Sacral geometry
          <>
            <circle cx="12" cy="12" r="9" strokeWidth="1.2" strokeOpacity="0.4" />
            <path d="M10 6C13.5 7.5 14.5 12 12.5 16.5C10.5 15 9.5 10.5 10 6Z" fill={meta.colorHex} fillOpacity="0.2" />
            <circle cx="12" cy="12" r="4.5" />
          </>
        )}

        {chakraKey === 'solarPlexus' && (
          // Downward triangle / Solar Plexus fire geometry
          <>
            <circle cx="12" cy="12" r="9" strokeWidth="1.2" strokeOpacity="0.4" />
            <polygon points="12,17.5 6,7.5 18,7.5" fill={meta.colorHex} fillOpacity="0.2" />
            <polygon points="12,17.5 6,7.5 18,7.5" />
          </>
        )}

        {chakraKey === 'heart' && (
          // Yantra / Hexagram / Heart lotus geometry
          <>
            <circle cx="12" cy="12" r="9" strokeWidth="1.2" strokeOpacity="0.4" />
            <polygon points="12,6 17.2,15 6.8,15" fill={meta.colorHex} fillOpacity="0.15" />
            <polygon points="12,18 6.8,9 17.2,9" />
          </>
        )}

        {chakraKey === 'throat' && (
          // Circle in triangle / Throat sound geometry
          <>
            <circle cx="12" cy="12" r="9" strokeWidth="1.2" strokeOpacity="0.4" />
            <polygon points="12,17 6.5,7.5 17.5,7.5" strokeOpacity="0.6" />
            <circle cx="12" cy="11.5" r="3.5" fill={meta.colorHex} fillOpacity="0.2" />
          </>
        )}

        {chakraKey === 'thirdEye' && (
          // 2 petaled lotus with triangle / Third Eye intuition
          <>
            <path d="M4 12C7 8 10 7 12 12C14 7 17 8 20 12C17 16 14 17 12 12C10 17 7 16 4 12Z" strokeWidth="1.2" strokeOpacity="0.5" />
            <polygon points="12,16 7.5,8.5 16.5,8.5" fill={meta.colorHex} fillOpacity="0.2" />
            <circle cx="12" cy="11" r="2" fill={meta.colorHex} />
          </>
        )}

        {chakraKey === 'crown' && (
          // Thousand-petaled crown lotus
          <>
            <circle cx="12" cy="12" r="9" strokeWidth="1.2" strokeOpacity="0.4" />
            <circle cx="12" cy="12" r="3" fill={meta.colorHex} fillOpacity="0.3" />
            <path d="M12 3V6M12 18V21M3 12H6M18 12H21M5.6 5.6L7.8 7.8M16.2 16.2L18.4 18.4M18.4 5.6L16.2 7.8M7.8 16.2L5.6 18.4" strokeWidth="1.2" strokeOpacity="0.7" />
          </>
        )}
      </svg>
    </div>
  );
};
