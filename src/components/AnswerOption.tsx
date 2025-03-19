
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
        disabled ? 'pointer-events-none' : ''
      )}
      onClick={disabled ? undefined : onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <span className={cn(
        'option-letter',
        isSelected && !isRevealed ? 'bg-primary/20 text-primary' : '',
        isRevealed && isCorrect ? 'bg-green-100 text-green-700' : '',
        isRevealed && isSelected && !isCorrect ? 'bg-red-100 text-red-700' : ''
      )}>
        {letter}
      </span>
      <span className="option-text">{text}</span>
    </div>
  );
};

export default AnswerOption;
