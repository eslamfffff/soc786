
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import categories from '@/data/categories';
import { Badge } from '@/components/ui/badge';

interface GameOverProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onBackToCategories: () => void;
  categoryId: string;
  levelId?: string;
}

const GameOver: React.FC<GameOverProps> = ({ 
  score, 
  totalQuestions, 
  onRestart, 
  onBackToCategories,
  categoryId,
  levelId = 'beginner'
}) => {
  const percentage = Math.round((score / (totalQuestions * 100)) * 100);
  const category = categories.find(cat => cat.id === categoryId);
  const level = category?.levels.find(lvl => lvl.id === levelId);
  
  // Determine if next level should be unlocked
  const passThreshold = 70; // 70% to pass
  const passed = percentage >= passThreshold;
  
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
        انتهى الاختبار!
      </h2>

      {level && (
        <div className="mb-6 text-center">
          <Badge className={cn(
            "px-4 py-2 text-base font-normal",
            level.id === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
            level.id === 'intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
          )}>
            {level.icon} {level.name}
          </Badge>
        </div>
      )}
      
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
          النقاط: <span className="text-primary">{score}</span> من <span>{totalQuestions * 100}</span>
        </p>
        <p className={cn("text-xl font-cairo", feedbackClass)} dir="rtl">
          {feedbackMessage}
        </p>
        
        {passed && levelId === 'beginner' && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200 font-cairo text-lg" dir="rtl">
              🎉 مبروك! لقد اجتزت هذا المستوى وتم فتح المستوى المتوسط!
            </p>
          </div>
        )}
        
        {passed && levelId === 'intermediate' && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200 font-cairo text-lg" dir="rtl">
              🎉 مبروك! لقد اجتزت هذا المستوى وتم فتح المستوى المتقدم!
            </p>
          </div>
        )}
        
        {passed && levelId === 'advanced' && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200 font-cairo text-lg" dir="rtl">
              🏆 مبروك! لقد اجتزت جميع المستويات بنجاح!
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={onRestart}
          size="lg"
          className="min-w-[180px] min-h-[60px] font-cairo text-lg"
        >
          إعادة المحاولة
        </Button>
        <Button 
          onClick={onBackToCategories} 
          variant="outline"
          size="lg"
          className="min-w-[180px] min-h-[60px] font-cairo text-lg"
        >
          العودة للمستويات
        </Button>
      </div>
    </div>
  );
};

export default GameOver;
