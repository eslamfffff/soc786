
import React, { useState, useEffect } from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, Lock, Unlock, Trophy, Star, ArrowLeft, MapPin, Flag, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { loadProgress, isStageUnlocked } from '@/utils/progressUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StageMapProps {
  stages: Stage[];
  category: string;
  onStageSelect: (stageId: string) => void;
  onBackToLevels: () => void;
  levelId: string;
}

const StageMap: React.FC<StageMapProps> = ({ stages, category, onStageSelect, onBackToLevels, levelId }) => {
  const { toast } = useToast();
  const progress = loadProgress();
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Initialize progress data if needed
  if (!progress.completedStages) {
    progress.completedStages = {};
  }
  
  if (!progress.completedStages[category]) {
    progress.completedStages[category] = {};
  }
  
  if (!progress.stageCompletion) {
    progress.stageCompletion = {};
  }
  
  if (!progress.stageCompletion[category]) {
    progress.stageCompletion[category] = {};
  }

  useEffect(() => {
    // Start with animation not complete
    setAnimationComplete(false);
    
    // Set animation complete after a delay
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [category, levelId]);

  const handleStageClick = (stage: Stage) => {
    const isUnlocked = isStageUnlocked(category, stage.id, progress);
    
    if (!isUnlocked) {
      const previousStage = stages.find(s => s.order === stage.order - 1);
      toast({
        title: "المرحلة مقفلة",
        description: previousStage 
          ? `يجب إكمال المرحلة "${previousStage?.title}" أولاً` 
          : "يجب إكمال المراحل السابقة أولاً",
        variant: "destructive",
      });
      return;
    }
    
    onStageSelect(stage.id);
  };

  // Filter stages by the current level
  const currentLevelStages = stages.filter(stage => stage.id.startsWith(levelId));
  
  // Limit to 10 stages per map as requested
  const limitedStages = currentLevelStages.slice(0, 10);
  
  // Calculate completion statistics
  const totalCompletedStages = Object.values(progress.completedStages[category] || {})
    .filter(Boolean).length;
  
  const levelLabel = levelId === 'beginner' ? 'مبتدئ' : 
                    levelId === 'intermediate' ? 'متوسط' : 'متقدم';
  
  const levelColor = levelId === 'beginner' ? 'bg-green-100 text-green-800' : 
                    levelId === 'intermediate' ? 'bg-blue-100 text-blue-800' : 
                    'bg-red-100 text-red-800';

  // Get background based on level
  const getLevelBackground = () => {
    switch(levelId) {
      case 'beginner': 
        return "bg-gradient-to-b from-blue-900 to-blue-700";
      case 'intermediate':
        return "bg-gradient-to-b from-blue-800 to-blue-600";
      case 'advanced':
        return "bg-gradient-to-b from-blue-700 to-blue-500";
      default:
        return "bg-gradient-to-b from-blue-900 to-blue-700";
    }
  };

  // Get stage icon based on order
  const getStageIcon = (order: number, isCompleted: boolean, isUnlocked: boolean) => {
    // Special stages
    if (order === 10) return <Flag className="h-5 w-5 text-red-500" />;
    if (order === 1) return <MapPin className="h-5 w-5 text-blue-500" />;
    if (order % 5 === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    
    // Regular stages
    if (isCompleted) return <Check className="h-4 w-4 text-green-500" />;
    if (isUnlocked) return <Unlock className="h-4 w-4 text-blue-500" />;
    return <Lock className="h-4 w-4 text-gray-500" />;
  };

  // Get star rating based on completion percentage
  const getStarRating = (percentage: number) => {
    const stars = [];
    const totalStars = 3;
    const filledStars = percentage >= 90 ? 3 : percentage >= 60 ? 2 : percentage >= 30 ? 1 : 0;
    
    for (let i = 0; i < totalStars; i++) {
      stars.push(
        <Star 
          key={i} 
          className={cn(
            "h-4 w-4", 
            i < filledStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )} 
        />
      );
    }
    
    return stars;
  };

  // Calculate positions for the winding path
  const calculateStagePosition = (index: number, total: number) => {
    // This creates a zig-zag pattern from bottom to top
    const row = total - index - 1;
    const isEvenRow = row % 2 === 0;
    
    // For even rows, stages go from right to left
    // For odd rows, stages go from left to right
    const horizontalPosition = isEvenRow ? 'flex-end' : 'flex-start';
    
    return {
      position: 'relative',
      alignSelf: horizontalPosition,
      marginLeft: isEvenRow ? '0' : '20px', 
      marginRight: isEvenRow ? '20px' : '0',
      marginTop: index === 0 ? '0' : '-20px', // Overlap to create connected path
    };
  };

  return (
    <div className="relative min-h-screen">
      {/* Map background */}
      <div className={cn(
        "min-h-screen pb-20 pt-4 relative overflow-hidden",
        getLevelBackground()
      )}>
        {/* Field markings - using the custom background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="20" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>
        
        {/* Back button and level info */}
        <div className="relative z-10 flex justify-between items-center px-6 py-4">
          <Button 
            variant="outline" 
            className="bg-white/90 hover:bg-white font-cairo flex items-center gap-2"
            onClick={onBackToLevels}
          >
            <ArrowLeft size={18} />
            <span dir="rtl">العودة للمستويات</span>
          </Button>
          
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg px-4 py-2 shadow-md">
            <h2 className="text-xl font-bold text-center flex items-center gap-2 justify-center dark:text-white">
              <Badge className={cn("text-sm", levelColor)}>
                {levelLabel}
              </Badge>
              <span>المستوى {limitedStages.length > 0 ? limitedStages[0].order : 1} - {limitedStages.length > 0 ? limitedStages[limitedStages.length-1].order : 10}</span>
            </h2>
          </div>
          
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg px-4 py-2 shadow-md">
            <span className="font-bold text-slate-800 dark:text-white">
              {totalCompletedStages} / {limitedStages.length} مرحلة
            </span>
          </div>
        </div>
        
        {/* Winding path container */}
        <div className="relative mx-auto max-w-3xl px-4 pt-10 z-10">
          {/* The winding path SVG - orange path like in the reference image */}
          <svg 
            className="absolute top-0 left-0 w-full h-full z-0" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{ transform: "scale(1.05)" }}
          >
            <path 
              d="M10,90 C30,90 30,70 50,70 C70,70 70,50 50,50 C30,50 30,30 50,30 C70,30 70,10 90,10" 
              fill="none" 
              stroke="#E67E22" 
              strokeWidth="8" 
              strokeLinecap="round"
              className="path-animation"
            />
          </svg>
          
          {/* Stages container - flex column from bottom to top */}
          <div className="flex flex-col-reverse items-stretch space-y-reverse space-y-16 relative z-10">
            {limitedStages.map((stage, index) => {
              const isUnlocked = isStageUnlocked(category, stage.id, progress);
              const isCompleted = progress.completedStages[category]?.[stage.id] || false;
              const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
              
              return (
                <TooltipProvider key={stage.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ 
                          scale: animationComplete ? 1 : 0.5, 
                          opacity: animationComplete ? 1 : 0,
                        }}
                        transition={{ 
                          delay: index * 0.05,
                          duration: 0.3 
                        }}
                        className={cn(
                          "w-20 h-20 md:w-24 md:h-24 relative flex items-center justify-center cursor-pointer"
                        )}
                        style={calculateStagePosition(index, limitedStages.length)}
                        onClick={() => handleStageClick(stage)}
                      >
                        <div 
                          className={cn(
                            "w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4",
                            isCompleted ? "bg-green-600 border-green-300" : 
                            isUnlocked ? "bg-blue-600 border-blue-300" : 
                            "bg-gray-600 border-gray-400 opacity-80"
                          )}
                        >
                          {/* Stage number - larger font */}
                          <span className="text-3xl">{stage.order}</span>
                          
                          {/* Status icon */}
                          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-md">
                            {getStageIcon(stage.order, isCompleted, isUnlocked)}
                          </div>
                          
                          {/* Star ratings - positioned below the circle */}
                          {(isCompleted || isUnlocked) && (
                            <div className="absolute -bottom-6 flex space-x-1">
                              {getStarRating(completionPercentage)}
                            </div>
                          )}
                          
                          {/* Lock for locked stages */}
                          {!isUnlocked && (
                            <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/30">
                              <Lock className="h-8 w-8 text-white" />
                            </div>
                          )}
                          
                          {/* Glow effect for completed stages */}
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ 
                                scale: [0.8, 1.1, 0.8], 
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(0,0,0,0) 70%)',
                                zIndex: -1,
                              }}
                            />
                          )}
                        </div>
                        
                        {/* Stage name - make sure it's visible in dark mode */}
                        <div className="absolute -bottom-10 text-center min-w-[80px]">
                          <span className="stage-bubble-text dark:bg-slate-800 dark:text-white text-xs">
                            {stage.title || `المرحلة ${stage.order}`}
                          </span>
                        </div>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-cairo dark:text-white" dir="rtl">
                        {stage.title || `المرحلة ${stage.order}`}
                        <br />
                        {isCompleted ? `تم الإكمال! ${completionPercentage}%` : 
                         isUnlocked ? "متاح اللعب" : 
                         "يجب إكمال المرحلة السابقة أولاً"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
        
        <div className="mt-16 text-center relative z-10">
          <p className="text-white font-cairo text-lg bg-black/20 mx-auto max-w-md rounded-lg p-2" dir="rtl">
            أكمل كل مرحلة للتقدم في مسيرتك!
          </p>
        </div>

        {/* Decorative elements */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent z-5"
        />
      </div>
    </div>
  );
};

export default StageMap;
