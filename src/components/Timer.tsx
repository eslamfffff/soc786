
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [percentage, setPercentage] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasCalledTimeUp = useRef(false);

  // Color based on remaining time percentage
  const getTimerColor = () => {
    if (percentage > 60) return "bg-gradient-to-r from-emerald-500 to-green-500";
    if (percentage > 30) return "bg-gradient-to-r from-amber-500 to-yellow-500";
    return "bg-gradient-to-r from-red-600 to-rose-500";
  };

  useEffect(() => {
    // Reset timer when duration changes or becomes active again
    setTimeLeft(duration);
    setPercentage(100);
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
          const newTimeLeft = prev <= 1 ? 0 : prev - 1;
          // Update percentage based on new time left
          setPercentage((newTimeLeft / duration) * 100);
          
          if (newTimeLeft <= 0 && !hasCalledTimeUp.current) {
            hasCalledTimeUp.current = true;
            
            // Use setTimeout to avoid state updates during render
            setTimeout(() => {
              onTimeUp();
            }, 0);
            
            // Clear the interval
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
          }
          
          return newTimeLeft;
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

  return (
    <div className="relative mb-4" aria-label="Question timer">
      <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300 mb-1">
        <span className="font-medium">{timeLeft}s</span>
        <span className={cn(
          "font-medium",
          percentage > 60 ? "text-green-600 dark:text-green-400" : 
          percentage > 30 ? "text-amber-600 dark:text-amber-400" : 
          "text-red-600 dark:text-red-400"
        )}>
          {isActive ? "الوقت المتبقي" : percentage <= 0 ? "انتهى الوقت!" : "متوقف"}
        </span>
      </div>
      
      <div className="timer-wrapper overflow-hidden">
        <Progress 
          value={percentage} 
          className="h-3 bg-slate-200 dark:bg-slate-700"
        >
          <div 
            className={cn(
              "h-full transition-all duration-1000 ease-linear rounded-full",
              getTimerColor()
            )}
            style={{ width: `${percentage}%` }}
          />
        </Progress>
        
        {/* Pulsing effect when time is running low */}
        {isActive && percentage <= 30 && (
          <div 
            className="absolute inset-0 rounded-full animate-pulse opacity-50"
            style={{ 
              background: percentage <= 15 ? 
                "radial-gradient(circle, rgba(239,68,68,0.2) 0%, rgba(0,0,0,0) 70%)" : 
                "radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(0,0,0,0) 70%)" 
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Timer;
