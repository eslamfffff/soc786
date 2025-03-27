
import React, { useState, useEffect } from 'react';
import AnswerOption from './AnswerOption';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import ScoreDisplay from './ScoreDisplay';
import GameOver from './GameOver';
import { calculateScore } from '@/utils/gameUtils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizCardProps {
  questions: Question[];
}

const QUESTION_TIME = 15; // seconds per question

const QuizCard: React.FC<QuizCardProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || !isTimerActive) return;
    
    setSelectedAnswer(index);
    setIsTimerActive(false);
    
    // Calculate score based on remaining time
    const isCorrect = index === question.correctAnswer;
    const pointsEarned = calculateScore(isCorrect, timeLeft, QUESTION_TIME);
    
    if (pointsEarned > 0) {
      setScore((prevScore) => prevScore + pointsEarned);
    }
    
    // Reveal correct answer
    setIsRevealed(true);
    
    // Auto show next button after 2 seconds
    setTimeout(() => {
      setShowNextButton(true);
    }, 2000);
  };

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setIsTimerActive(false);
      setIsRevealed(true);
      setShowNextButton(true);
    }
  };

  const handleNextQuestion = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentQuestion + 1 >= questions.length) {
        setIsGameOver(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsRevealed(false);
        setShowNextButton(false);
        setIsTimerActive(true);
        setTimeLeft(QUESTION_TIME);
        setIsAnimating(false);
      }
    }, 500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsRevealed(false);
    setScore(0);
    setTimeLeft(QUESTION_TIME);
    setShowNextButton(false);
    setIsTimerActive(true);
    setIsGameOver(false);
    setIsAnimating(false);
  };

  if (isGameOver) {
    return (
      <div className="quiz-container">
        <div className="quiz-card dark:bg-slate-800 dark:border-slate-700">
          <GameOver 
            score={score} 
            totalQuestions={questions.length} 
            onRestart={handleRestart} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className={cn(
        "quiz-card dark:bg-slate-800 dark:border-slate-700", 
        isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
        "transition-all duration-500 ease-in-out"
      )}>
        <div className="quiz-header">
          <div className="flex justify-between mb-2">
            <ProgressBar current={currentQuestion + 1} total={questions.length} />
            <ScoreDisplay score={score} />
          </div>
          <Timer 
            duration={QUESTION_TIME} 
            onTimeUp={handleTimeUp} 
            isActive={isTimerActive} 
          />
        </div>
        
        <h2 className="quiz-question font-cairo dark:text-slate-100" dir="rtl">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <AnswerOption
              key={index}
              letter={String.fromCharCode(65 + index)} // A, B, C, D
              text={option}
              isSelected={selectedAnswer === index}
              isCorrect={isRevealed ? index === question.correctAnswer : null}
              isRevealed={isRevealed}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null || !isTimerActive}
            />
          ))}
        </div>
        
        {showNextButton && (
          <div className="flex justify-center mt-8 animate-fade-in">
            <Button 
              onClick={handleNextQuestion}
              size="lg"
              className="next-button font-cairo"
            >
              {currentQuestion + 1 >= questions.length ? "إنهاء الإختبار" : "السؤال التالي"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
