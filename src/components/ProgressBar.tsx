
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="progress-container font-cairo" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} dir="rtl">
      <span className="progress-text dark:text-slate-400">السؤال {current} من {total}</span>
      <div className="progress-bar dark:bg-gray-700 relative h-2 bg-slate-100 rounded-full overflow-hidden transition-all duration-300">
        <div 
          className="progress-fill absolute top-0 left-0 h-full bg-primary/80 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        >
          <span className="absolute inset-0 flex justify-center items-center text-xs text-white font-bold opacity-0 md:opacity-100">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
