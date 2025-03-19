
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import questions from '@/data/questions';
import QuizCard from '@/components/QuizCard';
import { getRandomQuestions } from '@/utils/gameUtils';
import { useTheme } from '@/hooks/useTheme';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<typeof questions>([]);
  const { theme } = useTheme();
  
  const startGame = () => {
    // Select 10 random questions
    const randomQuestions = getRandomQuestions(questions, 10);
    setSelectedQuestions(randomQuestions);
    setGameStarted(true);
  };

  const getBackgroundClass = () => {
    return theme === 'dark' 
      ? 'bg-gradient-football dark football-bg-dark'
      : 'bg-gradient-pitch football-bg-light';
  };

  if (!gameStarted) {
    return (
      <div className={`min-h-screen ${getBackgroundClass()} flex flex-col items-center justify-center p-4 transition-colors duration-500`}>
        <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg max-w-md w-full p-8 text-center animate-scale-in dark:text-white dark:border dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-80">
          <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100 font-cairo">اختبار كرة القدم</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-cairo">اختبر معلوماتك في كرة القدم مع اختبارنا التفاعلي!</p>
          
          <div className="space-y-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-right">
              <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2 font-cairo">كيفية اللعب</h3>
              <ul className="space-y-2 text-sm text-blue-700/80 dark:text-blue-300/80 font-cairo">
                <li>• الإجابة على 10 أسئلة عن كرة القدم</li>
                <li>• اكسب نقاط للإجابات الصحيحة</li>
                <li>• الإجابات السريعة تحصل على نقاط إضافية</li>
                <li>• حاول تحطيم أعلى النتائج!</li>
              </ul>
            </div>
          </div>
          
          <Button 
            onClick={startGame}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 w-full text-lg font-cairo"
          >
            ابدأ الاختبار
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getBackgroundClass()} py-8 transition-colors duration-500`}>
      <QuizCard questions={selectedQuestions} />
    </div>
  );
};

export default Index;
