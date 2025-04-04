
import React, { useState, useEffect } from 'react';
import { Question } from '@/data/questions/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { saveStageCompletion } from '@/utils/progressUtils';

interface StageQuizProps {
  questions: Question[];
  stage: any;
  categoryId: string;
  onBack: () => void;
  onComplete: (completed: boolean, percentage: number, stats: { 
    score: number, 
    correctAnswers: number,
    totalQuestions: number 
  }) => void;
}

const StageQuiz: React.FC<StageQuizProps> = ({ 
  questions, 
  stage, 
  categoryId, 
  onBack, 
  onComplete 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const totalQuestions = questions.length;
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
  };
  
  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 10);
      setCorrectAnswers(correctAnswers + 1);
    }
    
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = () => {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = percentage >= 70;
    
    // Save stage completion status
    saveStageCompletion(categoryId, stage.id, passed, percentage);
    
    // Add points to user's score if passed
    if (passed && stage.reward && stage.reward.coins) {
      // Update user score/coins logic here
    }
    
    // Call completion callback
    onComplete(passed, percentage, {
      score,
      correctAnswers,
      totalQuestions
    });
  };
  
  return (
    <div className="quiz-container">
      <div className="quiz-card dark:bg-slate-800 dark:border-slate-700">
        <div className="quiz-header">
          <Button variant="ghost" size="sm" onClick={onBack} className="absolute top-2 left-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            عودة
          </Button>
          
          <div className="flex flex-col items-center justify-center">
            <Badge className={cn(
              "px-4 py-2 text-base font-normal",
              stage.level === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
              stage.level === 'medium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
            )}>
              {stage.level === 'easy' && '⚽️ سهل'}
              {stage.level === 'medium' && '⚽⚽ متوسط'}
              {stage.level === 'hard' && '⚽⚽⚽ صعب'}
              {' - '}
              {stage.title}
            </Badge>
            <h2 className="text-2xl font-bold mt-2 font-cairo" dir="rtl">
              السؤال {currentQuestionIndex + 1} / {questions.length}
            </h2>
          </div>
        </div>
        
        <div className="quiz-content">
          <p className="text-lg font-cairo mb-6 text-center" dir="rtl">
            {currentQuestion.question}
          </p>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={cn(
                  "w-full py-3 px-4 rounded-md text-lg font-cairo text-right",
                  "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600",
                  "focus:outline-none focus:ring-2 focus:ring-primary",
                  selectedAnswer === index ? "ring-2 ring-primary" : ""
                )}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                dir="rtl"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="quiz-footer mt-4">
          <div className="progress-bar mb-4 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <Button 
            onClick={handleNextQuestion} 
            disabled={selectedAnswer === null}
            className="w-full font-cairo text-lg"
          >
            {currentQuestionIndex === questions.length - 1 ? 'إنهاء الاختبار' : 'السؤال التالي'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StageQuiz;
