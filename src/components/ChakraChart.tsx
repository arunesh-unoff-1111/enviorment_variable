import React from 'react';
import { ChakraKey } from '../types';
import { CHAKRA_METADATA, CHAKRA_ORDER } from '../data/chakras';
import { motion } from 'motion/react';

interface ChakraChartProps {
  scores: Record<ChakraKey, number>;
}

export const ChakraChart: React.FC<ChakraChartProps> = ({ scores }) => {
  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-md">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6 text-center">
        7-Chakra Alignment Profile (0–20 Scale)
      </h3>

      <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 sm:h-56 pt-6 pb-2 px-1 border-b border-slate-800">
        {CHAKRA_ORDER.map((key) => {
          const meta = CHAKRA_METADATA[key];
          const score = scores[key] || 0;
          const heightPct = Math.max(10, (score / 20) * 100);

          return (
            <div key={key} className="flex flex-col items-center h-full justify-end group">
              {/* Score label above bar */}
              <span className="text-xs font-bold text-slate-200 mb-1">
                {score}
              </span>

              {/* Bar */}
              <div className="w-full max-w-[32px] sm:max-w-[44px] bg-slate-800/80 rounded-t-lg overflow-hidden flex flex-col justify-end p-0.5 h-full">
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`w-full rounded-t-md bg-gradient-to-t ${meta.barGradient}`}
                  style={{ boxShadow: `0 0 12px ${meta.colorHex}30` }}
                />
              </div>

              {/* Label below bar */}
              <div className="mt-3 text-center">
                <span
                  className="block text-[10px] sm:text-xs font-medium truncate max-w-[42px] sm:max-w-[70px] text-slate-300"
                  title={meta.name}
                >
                  {meta.name.replace(' Chakra', '')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
