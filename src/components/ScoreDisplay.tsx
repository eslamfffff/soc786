
import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="score-display font-cairo flex items-center justify-end" dir="rtl">
      <div>
        <span className="text-slate-500 dark:text-slate-400">النقاط:</span>{' '}
        <span className="text-primary font-semibold">{score}</span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
