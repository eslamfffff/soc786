
import React, { useState, useEffect, useCallback } from 'react';
import AnswerOption from './AnswerOption';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import ScoreDisplay from './ScoreDisplay';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Question, Stage } from '@/data/questions/types';
import { ArrowLeft, Home, AlertTriangle } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import categories from '@/data/categories';
import { useToast } from '@/hooks/use-toast';
import { saveStageCompletion } from '@/utils/progressUtils';

interface StageQuizProps {
  questions: Question[];
  stage: Stage;
  categoryId: string;
  onBack: () => void;
  onComplete: (completed: boolean, percentage: number) => void;
}

const StageQuiz: React.FC<StageQuizProps> = ({ 
  questions, 
  stage, 
  categoryId, 
  onBack,
  onComplete
}) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Get question time based on level
  const getQuestionTime = (level?: string) => {
    if (!level) return 15; // default
    switch (level) {
      case 'easy': return 20;
      case 'medium': return 15;
      case 'hard': return 10;
      default: return 15;
    }
  };

  useEffect(() => {
    if (questions.length === 0) {
      setIsLoading(true);
      setHasError(false);
      
      // Simulate trying to load questions
      const timer = setTimeout(() => {
        if (questions.length === 0) {
          setHasError(true);
          toast({
            title: "خطأ في تحميل الأسئلة",
            description: "فشل في تحميل الأسئلة. يرجى المحاولة مرة أخرى.",
            variant: "destructive",
          });
        } else {
          setIsLoading(false);
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setHasError(false);
      
      // Set timer based on difficulty level
      const questionTime = getQuestionTime(stage.level);
      setTimeLeft(questionTime);
    }
  }, [questions, stage.level, toast]);

  const question = questions[currentQuestion];
  const category = categories.find(cat => cat.id === categoryId);
  
  // Calculate time per question based on level
  const QUESTION_TIME = getQuestionTime(stage.level);

  // Memoize handleTimeUp to prevent unnecessary re-renders
  const handleTimeUp = useCallback(() => {
    if (selectedAnswer === null) {
      setIsTimerActive(false);
      setIsRevealed(true);
      setShowNextButton(true);
      
      // Show time up message
      toast({
        title: "انتهى الوقت!",
        description: "الإجابة الصحيحة هي: " + question.options[question.correctAnswer],
        variant: "destructive",
      });
    }
  }, [selectedAnswer, question, toast]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || !isTimerActive) return;
    
    setSelectedAnswer(index);
    setIsTimerActive(false);
    
    // Calculate score based on remaining time and level
    const isCorrect = index === question.correctAnswer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    // Base points by difficulty level
    let basePoints = 100; // default
    if (stage.level === 'medium') basePoints = 150;
    if (stage.level === 'hard') basePoints = 200;
    
    const pointsEarned = isCorrect ? Math.round(basePoints * (timeLeft / QUESTION_TIME)) : 0;
    
    if (pointsEarned > 0) {
      setScore((prevScore) => prevScore + pointsEarned);
    }
    
    // Show feedback toast for incorrect answers
    if (!isCorrect) {
      toast({
        title: "إجابة خاطئة",
        description: question.explanation || "الإجابة الصحيحة هي: " + question.options[question.correctAnswer],
        variant: "destructive",
      });
    } else {
      toast({
        title: "إجابة صحيحة!",
        description: question.explanation || "أحسنت!",
        variant: "default",
      });
    }
    
    // Reveal correct answer
    setIsRevealed(true);
    
    // Show next button immediately for better user experience
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentQuestion + 1 >= questions.length) {
        // Calculate completion percentage
        const completionPercentage = Math.round((correctAnswers / questions.length) * 100);
        const stageCompleted = completionPercentage >= 70; // Need 70% to complete a stage
        
        // Save stage completion
        saveStageCompletion(categoryId, stage.id, stageCompleted, completionPercentage);
        
        // Pass completion status back to parent
        onComplete(stageCompleted, completionPercentage);
        setIsGameOver(true);
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsRevealed(false);
        setShowNextButton(false);
        setIsTimerActive(true);
        setTimeLeft(getQuestionTime(stage.level));
        setIsAnimating(false);
      }
    }, 500);
  };

  const getLevelBadgeColor = () => {
    switch(stage.level) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="quiz-card dark:bg-slate-800 dark:border-slate-700 flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
          <p className="text-xl font-cairo text-slate-800 dark:text-slate-200" dir="rtl">
            جاري تحميل الأسئلة...
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-4 font-cairo flex items-center gap-2"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            <span dir="rtl">العودة للمراحل</span>
          </Button>
        </div>
      </div>
    );
  }

  if (hasError || questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-card dark:bg-slate-800 dark:border-slate-700 flex flex-col items-center justify-center min-h-[400px]">
          <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold font-cairo text-slate-800 dark:text-slate-200 mb-2" dir="rtl">
            خطأ في تحميل الأسئلة
          </h2>
          <p className="text-lg font-cairo text-slate-700 dark:text-slate-300 mb-6 text-center max-w-md" dir="rtl">
            لم نتمكن من تحميل الأسئلة. يرجى المحاولة مرة أخرى.
          </p>
          <Button 
            variant="default" 
            size="lg" 
            className="font-cairo"
            onClick={onBack}
          >
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className={cn(
        "quiz-card dark:bg-slate-800 dark:border-slate-700 p-4 md:p-6",
        isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
        "transition-all duration-500 ease-in-out"
      )}>
        <div className="mb-4 md:mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { 
                  e.preventDefault(); 
                  onBack(); 
                }}>
                  <Home className="h-4 w-4 mr-2" />
                  <span>المراحل</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { 
                  e.preventDefault(); 
                  onBack(); 
                }}>
                  {category?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { 
                  e.preventDefault(); 
                  onBack(); 
                }}>
                  <span className={cn("px-2 py-0.5 rounded text-xs", getLevelBadgeColor())}>
                    {stage.level === 'easy' && '⚽️ سهل'}
                    {stage.level === 'medium' && '⚽⚽ متوسط'}
                    {stage.level === 'hard' && '⚽⚽⚽ صعب'}
                  </span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <span className="dark:text-white">{stage.title} - {currentQuestion + 1}/{questions.length}</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4 md:absolute md:top-4 md:left-4 font-cairo flex items-center gap-2 text-base"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          <span dir="rtl">العودة للمراحل</span>
        </Button>
        
        <div className="quiz-header mt-6 md:mt-10">
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
        
        <h2 className="quiz-question font-cairo dark:text-slate-100 text-xl md:text-2xl mt-6" dir="rtl">{question.question}</h2>
        
        <div className="space-y-3 mt-6">
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
          <div className="flex justify-center mt-6 md:mt-8 animate-fade-in">
            <Button 
              onClick={handleNextQuestion}
              size="lg"
              className="next-button font-cairo text-lg py-2 px-6"
            >
              {currentQuestion + 1 >= questions.length ? "إنهاء الإختبار" : "السؤال التالي"}
            </Button>
          </div>
        )}
        
        <footer className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Engineered by Islam Farid Ahmed
          </p>
        </footer>
      </div>
    </div>
  );
};

export default StageQuiz;
