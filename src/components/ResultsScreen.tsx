import React, { useState, useEffect } from 'react';
import { AssessmentResults } from '../types';
import { CHAKRA_METADATA, CHAKRA_ORDER } from '../data/chakras';
import { ScoreCard } from './ScoreCard';
import { ChakraIcon } from './ChakraIcon';
import { LotusIcon } from './LotusIcon';
import { RotateCcw, Copy, Check, Sparkles, Heart, Leaf, Sun, X, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface ResultsScreenProps {
  results: AssessmentResults;
  onRetake: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onRetake }) => {
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF8A65', '#48BB78', '#667EEA', '#ECC94B', '#9F7AEA']
      });
    } catch {
      // ignore if canvas unavailable
    }
  }, []);

  const handleCopySummary = () => {
    const summaryLines = [
      "Inner Balance - Reflection Results",
      "=================================",
      ""
    ];

    CHAKRA_ORDER.forEach((key) => {
      const meta = CHAKRA_METADATA[key];
      summaryLines.push(`${meta.name}: ${results.scores[key]} / 20`);
    });

    summaryLines.push("");
    summaryLines.push(`Strongest Area: ${results.strongest.map((k) => `${CHAKRA_METADATA[k].name} (${results.scores[k]}/20)`).join(', ')}`);
    summaryLines.push(`Area for Reflection: ${results.lowest.map((k) => `${CHAKRA_METADATA[k].name} (${results.scores[k]}/20)`).join(', ')}`);

    navigator.clipboard.writeText(summaryLines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12"
    >
      {/* Header matching Panels 4 & 5 */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <div className="mb-4 flex justify-center">
          <LotusIcon className="w-10 h-10 text-amber-200 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
        </div>

        <h1 className="font-serif-title text-4xl sm:text-5xl font-light text-slate-100 tracking-tight mb-3">
          Your Inner Balance
        </h1>

        <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
          Your responses have been mapped across the traditional seven-chakra framework.
        </p>
      </div>

      {/* Main Grid: Left Column (Chakra Scores), Middle Column (Strongest/Reflection/Quote), Right Column (About Your Scores) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 items-start">
        {/* Left Column: 7 Chakra Score Cards (Panel 4 in mockup) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-1">
            Chakra Alignment Profile
          </h2>
          {CHAKRA_ORDER.map((key) => {
            const meta = CHAKRA_METADATA[key];
            const score = results.scores[key];
            const isStrongest = results.strongest.includes(key);
            const isLowest = results.lowest.includes(key);

            return (
              <ScoreCard
                key={key}
                meta={meta}
                score={score}
                isStrongest={isStrongest}
                isLowest={isLowest}
              />
            );
          })}
        </div>

        {/* Middle Column: Highlights & Quote & Actions (Panel 5 in mockup) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-1">
            Key Reflection Highlights
          </h2>

          {/* Strongest Area Card */}
          <div className="p-5 rounded-2xl bg-[#161922] border border-emerald-500/30 shadow-md flex items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <LotusIcon className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Strongest Area
              </span>
              <div className="text-xl font-serif-title font-medium text-emerald-400 mt-0.5 truncate">
                {results.strongest.map((k) => CHAKRA_METADATA[k].name).join(', ')}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">
                {results.scores[results.strongest[0]]} <span className="text-xs text-slate-500 font-normal">/ 20</span>
              </div>
            </div>
          </div>

          {/* Area for Reflection Card */}
          <div className="p-5 rounded-2xl bg-[#161922] border border-amber-500/30 shadow-md flex items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
              <LotusIcon className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Area for Reflection
              </span>
              <div className="text-xl font-serif-title font-medium text-amber-400 mt-0.5 truncate">
                {results.lowest.map((k) => CHAKRA_METADATA[k].name).join(', ')}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">
                {results.scores[results.lowest[0]]} <span className="text-xs text-slate-500 font-normal">/ 20</span>
              </div>
            </div>
          </div>

          {/* Quote Card matching Panel 5 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181B26] to-[#12141D] border border-slate-800/90 text-center relative overflow-hidden">
            <div className="text-3xl text-amber-200/40 font-serif mb-1 leading-none">“</div>
            <p className="font-serif-title text-lg sm:text-xl text-slate-200 leading-relaxed font-light italic px-2">
              Balance is not something you find, it's something you create within.
            </p>
            <div className="mt-4 flex justify-center text-rose-400/60">
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </div>

          {/* Buttons matching Panel 5 */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => setShowAboutModal(true)}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-orange-400 text-white font-medium text-sm transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Summary Guide</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopySummary}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Scores to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Scores Text</span>
                </>
              )}
            </button>

            <button
              onClick={onRetake}
              className="w-full py-3 px-4 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>
          </div>
        </div>

        {/* Right Column: "About Your Scores" (Panel 6 in mockup) */}
        <div className="lg:col-span-3 bg-[#161922] border border-slate-800/90 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-serif-title font-medium text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>About Your Scores</span>
            </h2>
          </div>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {CHAKRA_ORDER.map((key) => {
              const meta = CHAKRA_METADATA[key];
              return (
                <div key={key} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
                  <ChakraIcon chakraKey={key} size={18} />
                  <div>
                    <h4 className="text-xs font-semibold" style={{ color: meta.colorHex }}>
                      {meta.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {meta.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* "About Your Scores" Slide-over Modal for Mobile view */}
      <AnimatePresence>
        {showAboutModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-md bg-[#12141D] border-l border-slate-800 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <h2 className="text-lg font-serif-title font-medium text-slate-100">
                    About Your Scores
                  </h2>
                  <button
                    onClick={() => setShowAboutModal(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {CHAKRA_ORDER.map((key) => {
                    const meta = CHAKRA_METADATA[key];
                    const score = results.scores[key];
                    return (
                      <div key={key} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                        <ChakraIcon chakraKey={key} size={20} />
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold" style={{ color: meta.colorHex }}>
                              {meta.name}
                            </h4>
                            <span className="text-xs font-medium text-slate-300">{score} / 20</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {meta.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6">
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
                >
                  Close Summary
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Row Feature Cards matching Mockup */}
      <div className="w-full max-w-5xl mx-auto pt-8 pb-4 border-t border-slate-800/80">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-200">Calm & Peaceful</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">A soothing experience from start to finish.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-200">Simple & Focused</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">One question at a time. No distractions.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-200">Personal & Private</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">Your answers stay just with you.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 shrink-0">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-200">Meaningful Reflection</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">Gain clarity through self-awareness.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Required Disclaimer at Bottom */}
      <div className="border-t border-slate-900 mt-8 pt-6 text-center max-w-xl mx-auto">
        <p className="text-xs text-slate-500 leading-relaxed italic">
          Chakras are a traditional spiritual framework. These scores are for self-reflection and are not a scientific or medical assessment.
        </p>
      </div>
    </motion.div>
  );
};
