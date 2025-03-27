
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameOverProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="game-over-container animate-fade-in font-cairo" dir="rtl">
      <h2 className="result-heading dark:text-slate-100">تم إكمال الإختبار!</h2>
      <p className="mb-2 text-slate-500 dark:text-slate-400">النتيجة النهائية:</p>
      <div className="result-score dark:text-primary-foreground">{score}</div>
      
      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 w-full max-w-md mb-8">
        <div className="flex justify-between mb-3">
          <span className="text-slate-600 dark:text-slate-300">عدد الأسئلة:</span>
          <span className="font-medium dark:text-slate-100">{totalQuestions}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-slate-600 dark:text-slate-300">متوسط النقاط لكل سؤال:</span>
          <span className="font-medium dark:text-slate-100">{Math.round(score/totalQuestions)}</span>
        </div>
      </div>
      
      <Button 
        onClick={onRestart}
        className="bg-primary hover:bg-primary/90 text-white dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 px-8 py-6 text-lg"
        size="lg"
      >
        العب مرة أخرى
      </Button>
    </div>
  );
};

export default GameOver;
