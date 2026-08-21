import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface AnswerOptionProps {
  labelLetter: string; // 'A', 'B', 'C', 'D'
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  labelLetter,
  text,
  isSelected,
  onSelect
}) => {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer min-h-[64px] border ${
        isSelected
          ? 'bg-gradient-to-r from-orange-400 via-rose-400 to-orange-400 border-orange-300 text-white shadow-lg shadow-orange-500/20'
          : 'bg-white hover:bg-amber-50/50 border-amber-900/10 hover:border-amber-900/20 text-slate-800 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center font-medium text-sm shrink-0 transition-colors ${
            isSelected
              ? 'bg-white/20 text-white font-semibold'
              : 'bg-amber-100/60 text-slate-700 font-medium'
          }`}
        >
          {labelLetter}
        </div>

        <span
          className={`text-sm sm:text-base leading-relaxed ${
            isSelected ? 'font-medium text-white' : 'font-normal text-slate-700'
          }`}
        >
          {text}
        </span>
      </div>

      {isSelected && (
        <div className="w-7 h-7 rounded-full bg-white text-orange-500 flex items-center justify-center shrink-0 shadow-sm">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      )}
    </motion.button>
  );
};
