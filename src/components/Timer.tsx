
import React, { useEffect, useState, useRef } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [animationDuration, setAnimationDuration] = useState(`${duration}s`);
  const [key, setKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasCalledTimeUp = useRef(false);

  useEffect(() => {
    // Reset timer when duration changes or becomes active again
    setTimeLeft(duration);
    setAnimationDuration(`${duration}s`);
    setKey(prev => prev + 1);
    hasCalledTimeUp.current = false;
    
    // Clear any existing interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Only set interval if timer is active
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Only call onTimeUp once
            if (!hasCalledTimeUp.current) {
              hasCalledTimeUp.current = true;
              
              // Use setTimeout to avoid state updates during render
              setTimeout(() => {
                onTimeUp();
              }, 0);
            }
            
            // Clear the interval
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [duration, onTimeUp, isActive]);
  
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
