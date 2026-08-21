import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { LotusIcon } from './LotusIcon';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CompletionScreenProps {
  participantName: string;
  responseId?: string;
  onFinish: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  participantName,
  responseId,
  onFinish
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#FF8A65', '#48BB78', '#667EEA', '#ECC94B']
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#090B10] flex flex-col items-center justify-between px-4 py-10 text-center relative overflow-hidden">
      {/* Gentle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar / Logo */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex items-center justify-center pt-2">
        <div className="flex items-center gap-2">
          <LotusIcon className="w-7 h-7 text-amber-200" />
          <span className="font-serif-title text-lg font-light text-slate-200 tracking-wider">
            Inner Balance
          </span>
        </div>
      </div>

      {/* Main Success Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-md mx-auto w-full my-auto px-4 py-8"
      >
        {/* Animated Checkmark Circle */}
        <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/30 animate-pulse" />
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.3)]">
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2]" />
          </div>
        </div>

        {/* Primary Completion Heading */}
        <h1 className="font-serif-title text-3xl sm:text-4xl font-light text-slate-100 mb-3 tracking-tight">
          Assessment Complete
        </h1>

        {/* Dynamic Personal Acknowledgment */}
        <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-6">
          Thank you, <span className="font-medium text-amber-200">{participantName}</span>. Your responses have been recorded.
        </p>

        {/* Submission Confirmation Pill */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left flex items-start gap-3 backdrop-blur-sm mb-8 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Your assessment has been securely logged with the assessment owner.
            </p>
            {responseId && (
              <p className="text-[11px] text-slate-500 font-mono">
                Confirmation Ref: #{responseId}
              </p>
            )}
          </div>
        </div>

        {/* Finish Button */}
        <motion.button
          onClick={onFinish}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-orange-400 text-white font-medium text-base shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all duration-300 cursor-pointer border border-orange-200/30"
        >
          <span>Finish</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Footer message */}
      <div className="relative z-10 text-xs text-slate-500 font-light pb-2">
        Inner Balance • Private Reflection Assessment
      </div>
    </div>
  );
};
