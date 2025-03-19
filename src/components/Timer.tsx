
import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [animationDuration, setAnimationDuration] = useState(`${duration}s`);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeUp, isActive]);

  useEffect(() => {
    // Reset timer when new question is shown
    setTimeLeft(duration);
    setAnimationDuration(`${duration}s`);
    setKey(prev => prev + 1);
  }, [duration, isActive]);
  
  const percentage = (timeLeft / duration) * 100;

  return (
    <div className="timer-container" aria-label="Question timer">
      <div className="timer-bar">
        {isActive && (
          <div
            key={key}
            className="timer-progress"
            style={{
              width: `${percentage}%`,
              transition: 'width 1s linear'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Timer;
