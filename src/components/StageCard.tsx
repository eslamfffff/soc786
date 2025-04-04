
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
}

const StageCard: React.FC<StageCardProps> = ({ 
  stage, 
  categoryId, 
  progress, 
  onClick, 
  index 
}) => {
  const isUnlocked = isStageUnlocked(categoryId, stage.id, progress);
  const isCompleted = progress.completedStages?.[categoryId]?.[stage.id] || false;
  const completionPercentage = progress.stageCompletion?.[categoryId]?.[stage.id] || 0;
  const [showGlow, setShowGlow] = useState(false);
  
  // Get level from stage ID
  const levelId = stage.id.split('-')[0];
  
  useEffect(() => {
    // Only show glow effect on completed stages
    if (isCompleted) {
      const timer = setTimeout(() => {
        setShowGlow(true);
      }, index * 100 + 500);
      
      return () => clearTimeout(timer);
    }
  }, [isCompleted, index]);
  
  // Get star rating based on completion percentage
  const getStarRating = () => {
    if (!isCompleted) return 0;
    if (completionPercentage >= 90) return 3; // Gold - 3 stars
    if (completionPercentage >= 70) return 2; // Red - 2 stars
    return 1; // Gray - 1 star
  };
  
  const starRating = getStarRating();
  
  // Get colors based on level and star rating
  const getLevelColors = () => {
    // If completed, use star rating colors
    if (isCompleted) {
      switch(starRating) {
        case 3: // Gold for 3 stars
          return {
            bg: 'bg-amber-100 dark:bg-amber-900/30',
            border: 'border-amber-300 dark:border-amber-700',
            text: 'text-amber-800 dark:text-amber-300',
            icon: 'text-amber-600 dark:text-amber-400',
            glow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]'
          };
        case 2: // Red for 2 stars
          return {
            bg: 'bg-red-100 dark:bg-red-900/30',
            border: 'border-red-300 dark:border-red-700',
            text: 'text-red-800 dark:text-red-300',
            icon: 'text-red-600 dark:text-red-400',
            glow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]'
          };
        case 1: // Gray for 1 star
          return {
            bg: 'bg-gray-100 dark:bg-gray-800/50',
            border: 'border-gray-300 dark:border-gray-700',
            text: 'text-gray-700 dark:text-gray-400',
            icon: 'text-gray-600 dark:text-gray-500',
            glow: 'shadow-[0_0_15px_rgba(156,163,175,0.4)]'
          };
      }
    }
    
    // If not completed, use level colors
    switch(levelId) {
      case 'beginner':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-900/20',
          border: 'border-emerald-200 dark:border-emerald-800',
          text: 'text-emerald-800 dark:text-emerald-300',
          icon: 'text-emerald-600 dark:text-emerald-400',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]'
        };
      case 'intermediate':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-300',
          icon: 'text-blue-600 dark:text-blue-400',
          glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]'
        };
      case 'advanced':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-300',
          icon: 'text-red-600 dark:text-red-400',
          glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-800',
          border: 'border-gray-300 dark:border-gray-700',
          text: 'text-gray-800 dark:text-gray-300',
          icon: 'text-gray-600 dark:text-gray-400',
          glow: 'shadow-none'
        };
    }
  };
  
  const colors = getLevelColors();
  
  // Generate stars based on completion percentage
  const renderStars = () => {
    if (!isCompleted) return null;
    
    return (
      <div className="flex mt-1 justify-center">
        {[...Array(3)].map((_, i) => (
          <Star 
            key={i}
            className={cn(
              "h-4 w-4 mx-[-2px]",
              i < starRating 
                ? starRating === 3 ? "text-amber-400 fill-amber-400" :
                  starRating === 2 ? "text-red-400 fill-red-400" :
                  "text-gray-400 fill-gray-400"
                : "text-gray-300 dark:text-gray-600"
            )}
          />
        ))}
      </div>
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "relative p-4 rounded-xl border shadow-sm backdrop-blur-sm",
        colors.bg,
        colors.border,
        showGlow && isCompleted ? colors.glow : "",
        isUnlocked ? "cursor-pointer hover:shadow-md transition-all" : "opacity-70 cursor-not-allowed"
      )}
      onClick={isUnlocked ? onClick : undefined}
      whileHover={isUnlocked ? { scale: 1.03 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
    >
      {/* Glowing pulse effect for completed stages */}
      <AnimatePresence>
        {showGlow && isCompleted && (
          <motion.div
            className="absolute inset-0 rounded-xl z-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [0.95, 1.02, 0.95]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              background: starRating === 3 
                ? 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, rgba(245,158,11,0) 70%)' 
                : starRating === 2
                ? 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0) 70%)'
                : 'radial-gradient(circle, rgba(156,163,175,0.3) 0%, rgba(156,163,175,0) 70%)'
            }}
          />
        )}
      </AnimatePresence>

      <div className="text-center relative z-10">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className={cn("font-medium", colors.text)}>
            المرحلة {stage.order}
          </Badge>
          
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center",
            isCompleted 
              ? starRating === 3 ? "bg-amber-100 dark:bg-amber-900/50" :
                starRating === 2 ? "bg-red-100 dark:bg-red-900/50" :
                "bg-gray-100 dark:bg-gray-800"
              : !isUnlocked ? "bg-gray-100 dark:bg-gray-800" :
              "bg-white dark:bg-gray-900"
          )}>
            {isCompleted ? (
              <Check className={cn(
                "h-5 w-5",
                starRating === 3 ? "text-amber-500 dark:text-amber-400" :
                starRating === 2 ? "text-red-500 dark:text-red-400" :
                "text-gray-500 dark:text-gray-400"
              )} />
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
    </motion.div>
  );
};

export default StageCard;
