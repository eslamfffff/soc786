
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import questions from '@/data/questions';
import QuizCard from '@/components/QuizCard';
import { getRandomQuestions } from '@/utils/gameUtils';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<typeof questions>([]);
  
  const startGame = () => {
    // Select 10 random questions
    const randomQuestions = getRandomQuestions(questions, 10);
    setSelectedQuestions(randomQuestions);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center animate-scale-in">
          <h1 className="text-3xl font-bold mb-2 text-slate-800">Football Quiz</h1>
          <p className="text-slate-500 mb-6">Test your football knowledge with our interactive quiz!</p>
          
          <div className="space-y-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-left">
              <h3 className="font-medium text-blue-700 mb-2">How to play</h3>
              <ul className="space-y-2 text-sm text-blue-700/80">
                <li>• Answer 10 football trivia questions</li>
                <li>• Score points for correct answers</li>
                <li>• Faster answers earn bonus points</li>
                <li>• Try to beat your high score!</li>
              </ul>
            </div>
          </div>
          
          <Button 
            onClick={startGame}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 w-full text-lg"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <QuizCard questions={selectedQuestions} />
    </div>
  );
};

export default Index;
