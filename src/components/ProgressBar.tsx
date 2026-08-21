import React from 'react';

interface ProgressBarProps {
  currentIndex: number; // 0-indexed
  totalQuestions: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalQuestions
}) => {
  const currentNum = currentIndex + 1;
  const percentage = Math.round((currentNum / totalQuestions) * 100);

  const formattedCurrent = currentNum < 10 ? `0${currentNum}` : `${currentNum}`;
  const formattedTotal = totalQuestions < 10 ? `0${totalQuestions}` : `${totalQuestions}`;

  return (
    <div className="w-full max-w-lg mx-auto mb-6 text-center">
      <div className="text-sm font-medium text-slate-700 mb-2 font-serif-title tracking-wide">
        Question {formattedCurrent} of {formattedTotal}
      </div>

      <div className="w-full h-3 rounded-full bg-slate-200/80 p-0.5 overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300 transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="text-xs text-slate-500 font-medium mt-1.5">
        {percentage}%
      </div>
    </div>
  );
};
