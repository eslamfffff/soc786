
import React from 'react';
import { Button } from '@/components/ui/button';
import categories from '@/data/categories';
import { Trophy, RefreshCw, ListFilter } from 'lucide-react';

interface GameOverProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onBackToCategories: () => void;
  categoryId: string;
}

const GameOver: React.FC<GameOverProps> = ({ 
  score, 
  totalQuestions, 
  onRestart, 
  onBackToCategories,
  categoryId
}) => {
  const category = categories.find(cat => cat.id === categoryId);
  const categoryName = category?.name || "";
  
  return (
    <div className="game-over-container animate-fade-in font-cairo" dir="rtl">
      <Trophy className="h-16 w-16 text-primary mb-4" />
      <h2 className="result-heading dark:text-slate-100">تم إكمال الإختبار!</h2>
      <p className="mb-2 text-slate-500 dark:text-slate-400">النتيجة النهائية في {categoryName}:</p>
      <div className="result-score dark:text-primary-foreground">{score}</div>
      
      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 w-full max-w-md mb-8">
        <div className="flex justify-between mb-3">
          <span className="text-slate-600 dark:text-slate-300">عدد الأسئلة:</span>
          <span className="font-medium dark:text-slate-100">{totalQuestions}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-slate-600 dark:text-slate-300">متوسط النقاط لكل سؤال:</span>
          <span className="font-medium dark:text-slate-100">{totalQuestions > 0 ? Math.round(score/totalQuestions) : 0}</span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button 
          onClick={onRestart}
          className="bg-primary hover:bg-primary/90 text-white dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 px-6 py-5 text-lg flex items-center gap-2 flex-1"
          size="lg"
        >
          <RefreshCw size={18} />
          العب مرة أخرى
        </Button>
        
        <Button 
          onClick={onBackToCategories}
          variant="outline"
          className="border-slate-300 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700 px-6 py-5 text-lg flex items-center gap-2 flex-1"
          size="lg"
        >
          <ListFilter size={18} />
          تغيير الفئة
        </Button>
      </div>
    </div>
  );
};

export default GameOver;
