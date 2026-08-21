import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LotusIcon } from './LotusIcon';
import { Heart } from 'lucide-react';

interface AnalysisScreenProps {
  onComplete: () => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 1200);
    const timer2 = setTimeout(() => setPhase(2), 2400);
    const timer3 = setTimeout(() => onComplete(), 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const messages = [
    { title: "Analyzing your responses...", sub: "This will just take a moment" },
    { title: "Mapping subtle patterns...", sub: "Aligning dimensions across the framework" },
    { title: "Your reflection is complete.", sub: "Preparing your results" }
  ];

  return (
    <div className="min-h-screen bg-[#0E1017] flex flex-col items-center justify-between px-4 py-12 text-center relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/20 via-pink-900/15 to-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <div />

      {/* Sacred Geometry Lotus Animation matching Panel 3 */}
      <div className="relative my-auto flex flex-col items-center">
        {/* Outer Sacred Geometry Ring */}
        <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80">
          {/* Rotating Outer Dashed Orbit */}
          <div className="absolute inset-0 rounded-full border border-dashed border-amber-200/30 animate-spin-slow" />

          {/* Glowing Concentric Pulse Ring 1 */}
          <motion.div
            animate={{
              scale: [0.95, 1.1, 0.95],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-4 rounded-full border border-orange-400/30 bg-orange-500/5"
          />

          {/* Glowing Concentric Pulse Ring 2 */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-10 rounded-full border border-rose-400/20 bg-rose-500/5"
          />

          {/* Floating Starlight Specks */}
          <div className="absolute top-2 right-12 w-1.5 h-1.5 rounded-full bg-amber-200 animate-ping" />
          <div className="absolute bottom-6 left-10 w-2 h-2 rounded-full bg-rose-300 animate-pulse" />
          <div className="absolute top-12 left-16 w-1 h-1 rounded-full bg-purple-200" />
          <div className="absolute bottom-16 right-14 w-1.5 h-1.5 rounded-full bg-orange-300 animate-ping" />

          {/* Center Multi-petal Glowing Lotus */}
          <motion.div
            animate={{
              scale: [0.98, 1.05, 0.98]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="relative z-10 p-6 rounded-full bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-purple-500/10 backdrop-blur-md border border-amber-200/40 shadow-[0_0_40px_rgba(251,146,60,0.25)]"
          >
            <LotusIcon className="w-20 h-20 sm:w-28 sm:h-28 text-amber-200 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
          </motion.div>
        </div>

        {/* Dynamic Text Messages */}
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="mt-8 max-w-sm mx-auto"
        >
          <h2 className="font-serif-title text-2xl sm:text-3xl font-light text-slate-100 tracking-wide mb-2">
            {messages[phase].title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-light">
            {messages[phase].sub}
          </p>
        </motion.div>
      </div>

      {/* Heart Icon at Bottom matching Panel 3 */}
      <div className="relative z-10 mb-4">
        <Heart className="w-4 h-4 text-rose-300/60 mx-auto" />
      </div>
    </div>
  );
};
