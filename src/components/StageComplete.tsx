
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Stage } from '@/data/questions/types';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StageCompleteProps {
  stage: Stage;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  onBackToStages: () => void;
  onNextStage?: () => void;
  hasNextStage: boolean;
}

const StageComplete: React.FC<StageCompleteProps> = ({ 
  stage, 
  score, 
  correctAnswers, 
  totalQuestions, 
  onBackToStages,
  onNextStage,
  hasNextStage
}) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = percentage >= 70;
  
  // Trigger confetti effect on component mount if passed
  React.useEffect(() => {
    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [passed]);
  
  let feedbackMessage = '';
  let feedbackClass = '';
  
  if (percentage >= 90) {
    feedbackMessage = 'ممتاز! أداء رائع!';
    feedbackClass = 'text-green-600 dark:text-green-400';
  } else if (percentage >= 70) {
    feedbackMessage = 'جيد جداً! أحسنت!';
    feedbackClass = 'text-blue-600 dark:text-blue-400';
  } else if (percentage >= 50) {
    feedbackMessage = 'جيد، يمكنك تحسين أدائك!';
    feedbackClass = 'text-yellow-600 dark:text-yellow-400';
  } else {
    feedbackMessage = 'حاول مرة أخرى لتحسين نتيجتك!';
    feedbackClass = 'text-red-600 dark:text-red-400';
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center font-cairo" dir="rtl">
        {passed ? '🏆 اكتملت المرحلة!' : 'انتهت المرحلة!'}
      </h2>

      <div className="mb-6 text-center">
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
      </div>
      
      <div className="score-circle mb-8">
        <div className="relative w-40 h-40 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="text-slate-200 dark:text-slate-700" 
              strokeWidth="8"
              stroke="currentColor" 
              fill="transparent" 
              r="42" 
              cx="50" 
              cy="50" 
            />
            <circle 
              className={cn(
                "transition-all duration-1000 ease-out",
                percentage >= 70 ? "text-green-500" : 
                percentage >= 50 ? "text-yellow-500" : 
                "text-red-500"
              )}
              strokeWidth="8"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * percentage) / 100}
              strokeLinecap="round"
              stroke="currentColor" 
              fill="transparent" 
              r="42" 
              cx="50" 
              cy="50" 
            />
          </svg>
          <div className="text-center">
            <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">{percentage}%</span>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">نسبة النجاح</p>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-2xl font-bold mb-4 font-cairo" dir="rtl">
          النقاط: <span className="text-primary">{score}</span>
        </p>
        <p className="text-xl font-bold mb-4 font-cairo" dir="rtl">
          الإجابات الصحيحة: <span className="text-primary">{correctAnswers}</span> من <span>{totalQuestions}</span>
        </p>
        <p className={cn("text-xl font-cairo", feedbackClass)} dir="rtl">
          {feedbackMessage}
        </p>
        
        {passed && stage.reward && (
          <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 max-w-md mx-auto">
            <div className="flex justify-center mb-3">
              <Trophy className="h-10 w-10 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 font-cairo" dir="rtl">
              المكافأة!
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 font-cairo" dir="rtl">
              لقد حصلت على {stage.reward.coins} نقطة!
            </p>
            {stage.reward.badge && (
              <div className="mt-2">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700">
                  <Star className="h-3 w-3 mr-1" />
                  {stage.reward.badge}
                </Badge>
              </div>
            )}
          </div>
        )}
        
        {!passed && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200 font-cairo text-lg" dir="rtl">
              تحتاج إلى 70% على الأقل لإكمال المرحلة. حاول مرة أخرى!
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {passed && hasNextStage && (
          <Button 
            onClick={onNextStage}
            size="lg"
            className="min-w-[220px] min-h-[60px] font-cairo text-lg flex items-center gap-2"
          >
            <span>المرحلة التالية</span>
            <ArrowRight size={18} />
          </Button>
        )}
        <Button 
          onClick={onBackToStages} 
          variant={passed && hasNextStage ? "outline" : "default"}
          size="lg"
          className="min-w-[180px] min-h-[60px] font-cairo text-lg"
        >
          العودة للمراحل
        </Button>
      </div>
    </div>
  );
};

export default StageComplete;
