import React, { useState, useEffect, useCallback } from 'react';
import AnswerOption from './AnswerOption';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import ScoreDisplay from './ScoreDisplay';
import GameOver from './GameOver';
import { calculateScore } from '@/utils/gameUtils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Question } from '@/data/questions';
import { ArrowLeft, Home, AlertTriangle } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import categories from '@/data/categories';
import { useToast } from '@/hooks/use-toast';

interface QuizCardProps {
  questions: Question[];
  categoryId: string;
  onBackToCategories: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ questions, categoryId, onBackToCategories }) => {
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

  // Get question time based on level
  const getQuestionTime = (level?: string) => {
    if (!level) return 15; // default
    switch (level) {
      case 'beginner': return 15;
      case 'intermediate': return 12;
      case 'advanced': return 10;
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
      const questionTime = getQuestionTime(questions[0]?.level);
      setTimeLeft(questionTime);
    }
  }, [questions, toast]);

  const question = questions[currentQuestion];
  const category = categories.find(cat => cat.id === categoryId);
  const level = question?.level ? category?.levels.find(lvl => lvl.id === question.level) : null;
  
  // Calculate time per question based on level
  const QUESTION_TIME = getQuestionTime(question?.level);

  // Memoize handleTimeUp to prevent unnecessary re-renders
  const handleTimeUp = useCallback(() => {
    if (selectedAnswer === null) {
      setIsTimerActive(false);
      setIsRevealed(true);
      setShowNextButton(true);
      
      // Show time up message
      toast({
        title: "انتهى الوقت!",
        description: "الإجابة الصحيحة هي: " + question?.options[question?.correctAnswer],
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
    
    // Base points by difficulty level
    let basePoints = 100; // default
    if (question.level === 'intermediate') basePoints = 150;
    if (question.level === 'advanced') basePoints = 200;
    
    const pointsEarned = calculateScore(isCorrect, timeLeft, QUESTION_TIME, basePoints);
    
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
    
    // Auto show next button after 2 seconds
    setTimeout(() => {
      setShowNextButton(true);
    }, 2000);
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
        setTimeLeft(getQuestionTime(questions[currentQuestion + 1]?.level));
        setIsAnimating(false);
      }
    }, 500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsRevealed(false);
    setScore(0);
    setTimeLeft(getQuestionTime(questions[0]?.level));
    setShowNextButton(false);
    setIsTimerActive(true);
    setIsGameOver(false);
    setIsAnimating(false);
  };

  const handleRetry = () => {
    onBackToCategories();
  };

  const getLevelBadgeColor = () => {
    if (!level) return "";
    
    switch(level.id) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return '';
    }
  };

  if (isGameOver) {
    return (
      <div className="quiz-container">
        <div className="quiz-card dark:bg-slate-800 dark:border-slate-700">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-4 left-4 font-cairo flex items-center gap-2 text-base"
            onClick={onBackToCategories}
          >
            <ArrowLeft size={16} />
            <span dir="rtl">العودة للمستويات</span>
          </Button>
          
          <GameOver 
            score={score} 
            totalQuestions={questions.length} 
            onRestart={handleRestart}
            onBackToCategories={onBackToCategories}
            categoryId={categoryId}
            levelId={question?.level}
          />
          
          <footer className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Engineered by Islam Farid Ahmed
            </p>
          </footer>
        </div>
      </div>
    );
  }

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
            onClick={onBackToCategories}
          >
            <ArrowLeft size={16} />
            <span dir="rtl">العودة للمستويات</span>
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
            onClick={handleRetry}
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
        "quiz-card dark:bg-slate-800 dark:border-slate-700",
        isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
        "transition-all duration-500 ease-in-out"
      )}>
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { 
                  e.preventDefault(); 
                  onBackToCategories(); 
                }}>
                  <Home className="h-4 w-4 mr-2" />
                  <span>المستويات</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { 
                  e.preventDefault(); 
                  onBackToCategories(); 
                }}>
                  {category?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { 
                  e.preventDefault(); 
                  onBackToCategories(); 
                }}>
                  <span className={cn("px-2 py-0.5 rounded text-xs", getLevelBadgeColor())}>
                    {level?.icon} {level?.name}
                  </span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>سؤال {currentQuestion + 1}/{questions.length}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Button 
          variant="outline" 
          size="lg" 
          className="absolute top-4 left-4 font-cairo flex items-center gap-2 text-base min-h-[60px] min-w-[60px]"
          onClick={onBackToCategories}
        >
          <ArrowLeft size={18} />
          <span dir="rtl">العودة للمستويات</span>
        </Button>
        
        <div className="quiz-header mt-10">
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
        
        <h2 className="quiz-question font-cairo dark:text-slate-100 text-2xl md:text-3xl mt-6" dir="rtl">{question.question}</h2>
        
        <div className="space-y-4 mt-8">
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
              className="next-button font-cairo text-lg py-6 min-h-[60px] min-w-[180px]"
            >
              {currentQuestion + 1 >= questions.length ? "إنهاء الإختبار" : "السؤال التالي"}
            </Button>
          </div>
        )}
        
        <footer className="mt-10 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Engineered by Islam Farid Ahmed
          </p>
        </footer>
      </div>
    </div>
  );
};

export default QuizCard;
