import React from 'react';
import { motion } from 'motion/react';
import { LotusIcon } from './LotusIcon';

export const SubmittingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090B10] flex flex-col items-center justify-center px-4 py-12 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto">
        <div className="relative flex items-center justify-center w-36 h-36 mb-6">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-full border border-amber-200/30 bg-amber-400/5"
          />

          <motion.div
            animate={{
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="relative z-10 p-5 rounded-full bg-slate-900/80 border border-amber-200/30 shadow-[0_0_30px_rgba(251,191,36,0.2)]"
          >
            <LotusIcon className="w-14 h-14 text-amber-200" />
          </motion.div>
        </div>

        <h2 className="font-serif-title text-2xl sm:text-3xl font-light text-slate-100 mb-2">
          Recording your reflection...
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-light">
          Securely submitting your responses to the assessment owner.
        </p>
      </div>
    </div>
  );
};
