
import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="score-display">
      <span className="text-slate-500">Score:</span> <span className="text-primary font-semibold">{score}</span>
    </div>
  );
};

export default ScoreDisplay;
