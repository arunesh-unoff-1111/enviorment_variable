import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AssessmentRecord, ChakraKey, QuestionAnswerDetail } from '../types';
import { CHAKRA_METADATA, CHAKRA_ORDER } from '../data/chakras';
import { ChakraIcon } from './ChakraIcon';
import { LotusIcon } from './LotusIcon';
import { X, Calendar, Hash, Copy, Check, Trash2, ArrowUpRight, HelpCircle } from 'lucide-react';

interface ParticipantDetailModalProps {
  assessment: AssessmentRecord | null;
  onClose: () => void;
  onDelete?: (responseId: string) => void;
}

export const ParticipantDetailModal: React.FC<ParticipantDetailModalProps> = ({
  assessment,
  onClose,
  onDelete
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'scores' | 'answers'>('scores');

  if (!assessment) return null;

  const scoreMap: Record<ChakraKey, number> = {
    root: assessment.results.rootScore,
    sacral: assessment.results.sacralScore,
    solarPlexus: assessment.results.solarPlexusScore,
    heart: assessment.results.heartScore,
    throat: assessment.results.throatScore,
    thirdEye: assessment.results.thirdEyeScore,
    crown: assessment.results.crownScore
  };

  const handleCopy = () => {
    const lines = [
      `Participant: ${assessment.name}`,
      `Response ID: ${assessment.responseId}`,
      `Date: ${assessment.formattedDate}`,
      `Strongest Area: ${assessment.results.strongestChakra}`,
      `Area for Reflection: ${assessment.results.lowestChakra}`,
      '',
      'Chakra Scores (0-20):',
      `Root: ${assessment.results.rootScore}/20`,
      `Sacral: ${assessment.results.sacralScore}/20`,
      `Solar Plexus: ${assessment.results.solarPlexusScore}/20`,
      `Heart: ${assessment.results.heartScore}/20`,
      `Throat: ${assessment.results.throatScore}/20`,
      `Third Eye: ${assessment.results.thirdEyeScore}/20`,
      `Crown: ${assessment.results.crownScore}/20`
    ];

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const answersArray: QuestionAnswerDetail[] = (Object.values(assessment.answers || {}) as QuestionAnswerDetail[]).sort(
    (a, b) => a.questionId - b.questionId
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-[#12141D] border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center">
              <LotusIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-title text-2xl sm:text-3xl font-light text-slate-100">
                  {assessment.name}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                  #{assessment.responseId}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {assessment.formattedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy Summary"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-xs hidden sm:inline">Copy</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/20">
          <button
            onClick={() => setActiveTab('scores')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'scores'
                ? 'border-orange-400 text-orange-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Chakra Alignment Profile (7 Scores)
          </button>
          <button
            onClick={() => setActiveTab('answers')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'answers'
                ? 'border-orange-400 text-orange-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            All Responses ({answersArray.length} recorded)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'scores' ? (
            <>
              {/* Summary Highlight Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <LotusIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Strongest Chakra
                    </span>
                    <span className="text-lg font-serif-title font-medium text-emerald-400">
                      {assessment.results.strongestChakra}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <LotusIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Area for Reflection
                    </span>
                    <span className="text-lg font-serif-title font-medium text-amber-400">
                      {assessment.results.lowestChakra}
                    </span>
                  </div>
                </div>
              </div>

              {/* 7 Chakra Detailed Score Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
                  Seven Dimensions Breakdown (0 - 20)
                </h3>
                <div className="space-y-2.5">
                  {CHAKRA_ORDER.map((key) => {
                    const meta = CHAKRA_METADATA[key];
                    const score = scoreMap[key];
                    const percentage = Math.round((score / 20) * 100);

                    return (
                      <div
                        key={key}
                        className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4"
                      >
                        <ChakraIcon chakraKey={key} size={20} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <div>
                              <span className="text-sm font-medium text-slate-200">
                                {meta.name}
                              </span>
                              <span className="text-xs text-slate-500 ml-2 italic">
                                ({meta.sanskritName})
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-slate-200">
                              {score} <span className="text-xs text-slate-500 font-normal">/ 20</span>
                            </span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${meta.barGradient}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Answers List */
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
                Participant's Selected Choices
              </h3>
              {answersArray.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Detailed question choices are recorded with new live submissions.
                </div>
              ) : (
                <div className="space-y-3">
                  {answersArray.map((ans, idx) => (
                    <div
                      key={ans.questionId || idx}
                      className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-left"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-medium text-amber-300">
                          Question {idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px]">
                          Choice {String.fromCharCode(65 + ans.choiceIndex)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-light">
                        {ans.scenario}
                      </p>
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200">
                        <span className="text-orange-400 font-medium mr-1.5">Selected:</span>
                        {ans.selectedText}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between">
          {onDelete && (
            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${assessment.name}'s assessment?`)) {
                  onDelete(assessment.responseId);
                  onClose();
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Assessment</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
