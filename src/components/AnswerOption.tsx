
import React from 'react';
import { cn } from '@/lib/utils';

interface AnswerOptionProps {
  letter: string;
  text: string;
  isSelected: boolean;
  isCorrect: boolean | null;
  isRevealed: boolean;
  onClick: () => void;
  disabled: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  letter,
  text,
  isSelected,
  isCorrect,
  isRevealed,
  onClick,
  disabled
}) => {
  const getOptionClass = () => {
    if (!isRevealed) {
      return isSelected ? 'quiz-option-active' : '';
    }
    
    if (isCorrect) {
      return 'quiz-option-correct';
    }
    
    if (isSelected && !isCorrect) {
      return 'quiz-option-incorrect';
    }
    
    return '';
  };

  return (
    <div
      className={cn(
        'quiz-option animate-fade-in',
        getOptionClass(),
        disabled ? 'pointer-events-none' : '',
        isRevealed && !isCorrect ? 'opacity-50 scale-90' : '',
        isRevealed && isCorrect ? 'scale-100' : '',
        'hover:shadow-glow hover:scale-105 hover:bg-quiz-hover transition-all duration-300'
      )}
      onClick={disabled ? undefined : onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <span className={cn(
        'option-letter',
        isSelected && !isRevealed ? 'bg-primary/20 text-primary' : '',
        isRevealed && isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200' : '',
        isRevealed && isSelected && !isCorrect ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200' : ''
      )}>
        {letter}
      </span>
      <span className="option-text font-cairo text-slate-800 dark:text-slate-100">{text}</span>
    </div>
  );
};

export default AnswerOption;
