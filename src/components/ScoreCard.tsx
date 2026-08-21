import React from 'react';
import { ChakraMeta } from '../types';
import { ChakraIcon } from './ChakraIcon';
import { motion } from 'motion/react';

interface ScoreCardProps {
  meta: ChakraMeta;
  score: number; // 0 to 20
  isStrongest?: boolean;
  isLowest?: boolean;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  meta,
  score
}) => {
  const percentage = Math.round((score / 20) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-4 rounded-2xl bg-[#161922] border border-slate-800/90 shadow-sm flex items-center gap-4 transition-all hover:border-slate-700/80"
    >
      {/* Glowing Chakra Icon Badge */}
      <ChakraIcon chakraKey={meta.key} size={22} />

      {/* Main Info & Progress Bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm sm:text-base font-medium text-slate-200 truncate">
            {meta.name}
          </h3>

          <div className="text-sm font-semibold text-slate-200 shrink-0 ml-2">
            {score} <span className="text-xs font-normal text-slate-500">/ 20</span>
          </div>
        </div>

        {/* Progress Bar with Chakra Color Gradient */}
        <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full bg-gradient-to-r ${meta.barGradient}`}
            style={{ boxShadow: `0 0 8px ${meta.colorHex}50` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
