import React, { useState, useEffect } from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Trophy, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { isStageUnlocked } from '@/utils/progressUtils';

interface StageCardProps {
  stage: Stage;
  categoryId: string;
  progress: any;
  onClick: () => void;
  index: number;
  animate?: boolean;
  starsCount?: number;
}

const StageCard: React.FC<StageCardProps> = ({ 
  stage, 
  categoryId, 
  progress, 
  onClick, 
  index,
  animate = false,
  starsCount
}) => {
  const isUnlocked = isStageUnlocked(categoryId, stage.id, progress);
  const isCompleted = progress.completedStages?.[categoryId]?.[stage.id] || false;
  const completionPercentage = progress.stageCompletion?.[categoryId]?.[stage.id] || 0;
  const [showStarAnimation, setShowStarAnimation] = useState(false);
  const [animatingStarIndex, setAnimatingStarIndex] = useState(-1);
  const [cardGlowColor, setCardGlowColor] = useState('transparent');
  
  // Get level from stage ID
  const levelId = stage.id.split('-')[0];
  
  // Get colors based on level
  const getLevelColors = () => {
    switch(levelId) {
      case 'beginner':
        return {
          bg: isCompleted ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-emerald-50 dark:bg-emerald-900/20',
          border: isCompleted ? 'border-emerald-300 dark:border-emerald-700' : 'border-emerald-200 dark:border-emerald-800',
          text: 'text-emerald-800 dark:text-emerald-300',
          icon: 'text-emerald-600 dark:text-emerald-400'
        };
      case 'intermediate':
        return {
          bg: isCompleted ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-blue-50 dark:bg-blue-900/20',
          border: isCompleted ? 'border-blue-300 dark:border-blue-700' : 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-300',
          icon: 'text-blue-600 dark:text-blue-400'
        };
      case 'advanced':
        return {
          bg: isCompleted ? 'bg-red-100 dark:bg-red-900/30' : 'bg-red-50 dark:bg-red-900/20',
          border: isCompleted ? 'border-red-300 dark:border-red-700' : 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-300',
          icon: 'text-red-600 dark:text-red-400'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-800',
          border: 'border-gray-300 dark:border-gray-700',
          text: 'text-gray-800 dark:text-gray-300',
          icon: 'text-gray-600 dark:text-gray-400'
        };
    }
  };
  
  // Get card glow color based on number of stars
  const getGlowColor = (stars: number) => {
    if (stars === 3) return 'rgba(234, 179, 8, 0.6)'; // Golden
    if (stars === 2) return 'rgba(239, 68, 68, 0.5)'; // Red
    if (stars === 1) return 'rgba(156, 163, 175, 0.5)'; // Gray
    return 'transparent';
  };
  
  const colors = getLevelColors();
  
  useEffect(() => {
    if (animate && starsCount && starsCount > 0) {
      // Start animation sequence
      setShowStarAnimation(true);
      setAnimatingStarIndex(0);
      
      const animationSequence = [];
      
      // For each star, we'll show animation and then update the glow color
      for (let i = 0; i < starsCount; i++) {
        // Delay before showing star
        animationSequence.push(setTimeout(() => {
          setAnimatingStarIndex(i);
        }, i * 1000));
        
        // Update glow color after star hits
        animationSequence.push(setTimeout(() => {
          // Incrementally change glow color
          if (starsCount === 3) {
            if (i === 0) setCardGlowColor('rgba(234, 179, 8, 0.2)');
            if (i === 1) setCardGlowColor('rgba(234, 179, 8, 0.4)');
            if (i === 2) setCardGlowColor('rgba(234, 179, 8, 0.6)');
          } else if (starsCount === 2) {
            if (i === 0) setCardGlowColor('rgba(239, 68, 68, 0.25)');
            if (i === 1) setCardGlowColor('rgba(239, 68, 68, 0.5)');
          } else {
            setCardGlowColor('rgba(156, 163, 175, 0.5)');
          }
        }, (i * 1000) + 500));
      }
      
      // Reset animation after sequence completes
      const resetTimer = setTimeout(() => {
        setShowStarAnimation(false);
        setAnimatingStarIndex(-1);
        // Keep the glow color
      }, (starsCount * 1000) + 1500);
      
      return () => {
        // Clear all timers on unmount
        animationSequence.forEach(timer => clearTimeout(timer));
        clearTimeout(resetTimer);
      };
    }
  }, [animate, starsCount]);
  
  // Generate stars based on completion percentage
  const renderStars = () => {
    if (!isCompleted) return null;
    
    let starCount = Math.min(3, Math.floor(completionPercentage / 33.33) + 1);
    
    return (
      <div className="flex mt-1 justify-center">
        {[...Array(3)].map((_, i) => (
          <Star 
            key={i}
            className={cn(
              "h-4 w-4 mx-[-2px]",
              i < starCount ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
            )}
          />
        ))}
      </div>
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        boxShadow: cardGlowColor !== 'transparent' 
          ? `0 0 20px 5px ${cardGlowColor}`
          : 'none'
      }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "relative p-4 rounded-xl border shadow-sm backdrop-blur-sm",
        colors.bg,
        colors.border,
        isUnlocked ? "cursor-pointer hover:shadow-md transition-all" : "opacity-70 cursor-not-allowed"
      )}
      onClick={isUnlocked ? onClick : undefined}
      whileHover={isUnlocked ? { scale: 1.03 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
    >
      <div className="text-center">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className={cn("font-medium", colors.text)}>
            المرحلة {stage.order}
          </Badge>
          
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center",
            isCompleted ? "bg-green-100 dark:bg-green-900" : 
            !isUnlocked ? "bg-gray-100 dark:bg-gray-800" :
            "bg-white dark:bg-gray-900"
          )}>
            {isCompleted ? (
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : !isUnlocked ? (
              <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <Trophy className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            )}
          </div>
        </div>
        
        <h3 className={cn("font-bold text-lg mb-1", colors.text)} dir="rtl">
          {stage.title}
        </h3>
        
        {renderStars()}
        
        {stage.reward && stage.reward.coins && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
            <span>{stage.reward.coins}</span>
            <span>🪙</span>
          </div>
        )}
      </div>
      
      {!isUnlocked && (
        <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-gray-200/60 dark:bg-gray-800/60">
          <Lock className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>
      )}
      
      {/* Flying stars animation */}
      <AnimatePresence>
        {showStarAnimation && [...Array(3)].map((_, i) => (
          i === animatingStarIndex && (
            <motion.div
              key={`star-${i}`}
              initial={{ 
                scale: 0.5, 
                opacity: 0,
                x: i % 2 === 0 ? -150 : 150, 
                y: -150,
                rotate: i % 2 === 0 ? -45 : 45
              }}
              animate={{ 
                scale: [0.5, 1.5, 1],
                opacity: [0, 1, 0.8],
                x: 0,
                y: 0,
                rotate: 0
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 0.8,
                times: [0, 0.7, 1]
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <div className="relative">
                <motion.div 
                  className="absolute inset-0"
                  animate={{
                    boxShadow: [
                      `0 0 0px rgba(234, 179, 8, 0)`,
                      `0 0 40px rgba(234, 179, 8, 0.8)`,
                      `0 0 10px rgba(234, 179, 8, 0.3)`
                    ]
                  }}
                  transition={{ duration: 0.8, times: [0, 0.5, 1] }}
                />
                <Star 
                  className={cn(
                    "h-14 w-14",
                    starsCount === 3 ? "text-yellow-400 fill-yellow-400" : // Gold
                    starsCount === 2 ? "text-red-500 fill-red-500" : // Red
                    "text-gray-400 fill-gray-400" // Gray
                  )}
                />
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Impact animation */}
      <AnimatePresence>
        {showStarAnimation && animatingStarIndex >= 0 && (
          <motion.div
            key="impact"
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ 
              scale: [0.1, 1.5, 1],
              opacity: [0, 0.7, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-xl pointer-events-none z-20"
            style={{
              background: starsCount === 3 
                ? 'radial-gradient(circle, rgba(234, 179, 8, 0.6) 0%, rgba(234, 179, 8, 0) 70%)'
                : starsCount === 2
                  ? 'radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, rgba(239, 68, 68, 0) 70%)'
                  : 'radial-gradient(circle, rgba(156, 163, 175, 0.6) 0%, rgba(156, 163, 175, 0) 70%)'
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StageCard;
