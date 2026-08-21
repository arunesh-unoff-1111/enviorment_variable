import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LotusIcon } from './LotusIcon';
import { Leaf, Sparkles, Heart, Sun, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import heroBgImage from '../assets/images/meditation_hero_bg_1786546393835.jpg';

interface LandingScreenProps {
  onStart: (participantName: string) => void;
  onOpenAdmin: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart, onOpenAdmin }) => {
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (name.trim().length > 0) {
      onStart(name.trim());
    }
  };

  const isNameEmpty = touched && name.trim().length === 0;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between text-center px-4 py-8 overflow-hidden bg-[#090B10]">
      {/* Background Hero Image with Serene Twilight Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroBgImage}
          alt="Meditation Serene Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-85 scale-105 transform transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090B10]/75 via-[#090B10]/30 to-[#090B10]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#090B10]/40 to-[#090B10]" />
      </div>

      {/* Top Navigation Bar with subtle Admin Access */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between py-2 px-3">
        <div className="flex items-center gap-2">
          <LotusIcon className="w-6 h-6 text-amber-200" />
          <span className="font-serif-title text-base sm:text-lg font-light text-slate-200 tracking-wider">
            Inner Balance
          </span>
        </div>

        <button
          onClick={onOpenAdmin}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-400 hover:text-amber-200 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 transition-colors cursor-pointer"
          title="Owner & Admin Access"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Admin Portal</span>
        </button>
      </header>

      {/* Top / Main Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-lg mx-auto flex flex-col items-center pt-4 sm:pt-10 pb-8 w-full"
      >
        {/* Top Lotus Icon */}
        <div className="mb-4 filter drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]">
          <LotusIcon className="w-12 h-12 sm:w-14 sm:h-14 text-amber-200" />
        </div>

        {/* Title */}
        <h1 className="font-serif-title text-4xl sm:text-6xl font-light text-slate-100 tracking-tight leading-none mb-3 drop-shadow-md">
          Inner Balance
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl font-light text-slate-200 tracking-wide mb-4">
          36 questions. One reflection.
        </p>

        {/* Delicate Lotus Divider */}
        <div className="flex items-center gap-3 my-1 text-amber-200/60 w-32 justify-center">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-200/40" />
          <LotusIcon className="w-3.5 h-3.5 text-amber-200/70" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-200/40" />
        </div>

        {/* Participant Name Form Container */}
        <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
          <div className="text-left">
            <label
              htmlFor="participant-name-input"
              className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 pl-1"
            >
              What's your name? <span className="text-orange-400">*</span>
            </label>
            <input
              id="participant-name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (touched) setTouched(false);
              }}
              placeholder="Enter your full name..."
              className={`w-full px-4 py-3.5 rounded-2xl bg-slate-900/80 border ${
                isNameEmpty
                  ? 'border-rose-500 ring-2 ring-rose-500/20'
                  : 'border-slate-700/80 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20'
              } text-slate-100 placeholder-slate-500 text-base outline-none transition-all duration-200 shadow-inner backdrop-blur-sm`}
              autoFocus
            />
            {isNameEmpty && (
              <p className="text-xs text-rose-400 mt-1 pl-1">
                Please provide your name before beginning.
              </p>
            )}
          </div>

          {/* Explicit Privacy Notice as Required */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-left flex items-start gap-2.5 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Your name and responses will be submitted to the assessment owner. Your results will not be displayed on this screen.
            </p>
          </div>

          {/* Main CTA Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group w-full relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-orange-400 bg-[length:200%_auto] text-white font-medium text-base sm:text-lg shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 cursor-pointer border border-orange-200/30"
          >
            <span>Begin Assessment</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </form>
      </motion.div>

      {/* Bottom Feature Cards Row */}
      <div className="relative z-10 w-full max-w-5xl mx-auto pt-6 pb-2 border-t border-slate-800/60 backdrop-blur-md bg-slate-950/40 rounded-2xl px-4 sm:px-6 mb-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
          {/* Card 1 */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-200">Calm & Peaceful</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">A soothing experience from start to finish.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-200">Simple & Focused</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">One question at a time. No distractions.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-200">Personal & Private</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">Your answers stay just with you.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 shrink-0">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-200">Meaningful Reflection</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">Gain clarity through self-awareness.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
