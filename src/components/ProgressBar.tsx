
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
      <div className="progress-bar dark:bg-gray-700">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
