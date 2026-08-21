import React from 'react';
import { Question } from '../types';
import { AnswerOption } from './AnswerOption';
import { motion } from 'motion/react';
import { Sun } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedChoiceIndex?: number;
  onSelectChoice: (choiceIndex: number) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedChoiceIndex,
  onSelectChoice
}) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Scenario Container with Sun Icon Header */}
      <div className="bg-white/90 border border-amber-900/10 rounded-3xl p-6 sm:p-8 mb-6 shadow-sm backdrop-blur-sm text-center">
        <div className="w-12 h-12 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Sun className="w-6 h-6 stroke-[1.75]" />
        </div>

        <h2 className="text-xl sm:text-2xl font-serif-title font-normal text-slate-800 leading-snug sm:leading-relaxed">
          {question.scenario}
        </h2>
      </div>

      {/* Answer Options List */}
      <div className="space-y-3">
        {question.choices.map((choice, idx) => (
          <AnswerOption
            key={idx}
            labelLetter={LETTERS[idx]}
            text={choice.text}
            isSelected={selectedChoiceIndex === idx}
            onSelect={() => onSelectChoice(idx)}
          />
        ))}
      </div>
    </motion.div>
  );
};
