import React, { useState } from 'react';
import { Question } from '../types';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { LotusIcon } from './LotusIcon';
import { ArrowLeft, ArrowRight, RotateCcw, X, ShieldAlert } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

interface QuestionScreenProps {
  participantName: string;
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<number, number>;
  onAnswer: (questionId: number, choiceIndex: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onRestart: () => void;
  onSubmit: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  participantName,
  questions,
  currentIndex,
  userAnswers,
  onAnswer,
  onPrev,
  onNext,
  onRestart,
  onSubmit
}) => {
  const [showConfirmRestart, setShowConfirmRestart] = useState(false);
  const currentQuestion = questions[currentIndex];
  const selectedChoiceIndex = userAnswers[currentQuestion?.id];
  const isLastQuestion = currentIndex === questions.length - 1;

  if (!currentQuestion) return null;

  const handleSelectChoice = (choiceIndex: number) => {
    onAnswer(currentQuestion.id, choiceIndex);
  };

  const handleNextClick = () => {
    if (selectedChoiceIndex === undefined) return;
    if (isLastQuestion) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col justify-between px-4 py-6 selection:bg-amber-200">
      {/* Header Bar */}
      <div className="max-w-lg mx-auto w-full flex items-center justify-between mb-3">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-amber-100/60 transition-colors cursor-pointer ${
            currentIndex === 0 ? 'opacity-25 cursor-not-allowed' : ''
          }`}
          title="Previous Question"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 text-center">
          <LotusIcon className="w-6 h-6 text-amber-600" />
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">
            Reflection for <span className="font-semibold text-slate-700">{participantName}</span>
          </span>
        </div>

        <button
          onClick={() => setShowConfirmRestart(true)}
          className="p-2 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          title="Restart Assessment"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Confirmation modal if user taps restart */}
      {showConfirmRestart && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title text-xl font-medium text-slate-800 mb-2">
              Restart Assessment?
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Your answered questions will be cleared and you will return to the start screen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmRestart(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  setShowConfirmRestart(false);
                  onRestart();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 text-white text-sm font-medium hover:bg-rose-700"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Questionnaire Container */}
      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col justify-center my-2">
        {/* Progress Bar */}
        <ProgressBar
          currentIndex={currentIndex}
          totalQuestions={questions.length}
        />

        {/* Animated Question Card */}
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedChoiceIndex={selectedChoiceIndex}
            onSelectChoice={handleSelectChoice}
          />
        </AnimatePresence>
      </div>

      {/* Bottom Button */}
      <div className="max-w-lg mx-auto w-full pt-4 pb-2">
        <button
          onClick={handleNextClick}
          disabled={selectedChoiceIndex === undefined}
          className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 text-base font-medium transition-all duration-300 shadow-lg cursor-pointer ${
            selectedChoiceIndex !== undefined
              ? 'bg-[#181A20] hover:bg-slate-800 text-white shadow-slate-900/20'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
          }`}
        >
          <span>{isLastQuestion ? 'Submit Assessment' : 'Next Question'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
