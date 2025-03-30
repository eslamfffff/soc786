
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

  // تحقق مما إذا كانت المرحلة ستفتح المرحلة التالية
  const willUnlockNextStage = (currentStage: Stage, nextStage: Stage | undefined) => {
    if (!nextStage) return false;
    
    // تحقق إذا كانت المرحلة الحالية مكتملة وما إذا كانت ستفتح المرحلة التالية
    const isCurrentComplete = progress.completedStages[category]?.[currentStage.id] || false;
    const isNextUnlocked = isStageUnlocked(category, nextStage.id, progress);
    
    return isCurrentComplete && isNextUnlocked;
  };
  
  // عرض النجوم بشكل أكثر احترافية
  const renderStars = (percentage: number) => {
    let starCount = 0;
    if (percentage >= 90) starCount = 3; // ممتاز
    else if (percentage >= 70) starCount = 2; // جيد
    else if (percentage >= 50) starCount = 1; // مقبول
    
    return (
      <div className="flex mt-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: animationComplete ? 1 : 0, 
              opacity: animationComplete ? 1 : 0 
            }}
            transition={{ 
              delay: animationComplete ? 0.5 + (i * 0.1) : 0,
              duration: 0.4,
              type: "spring",
              stiffness: 200
            }}
            className="relative"
          >
            <div className={cn(
              "w-5 h-5 mx-[-2px]",
              i < starCount ? "text-yellow-400" : "text-gray-400 opacity-40"
            )}>
              <svg viewBox="0 0 24 24" fill={i < starCount ? "#FFD700" : "#808080"} xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  stroke={i < starCount ? "#FFA000" : "#555555"} 
                  strokeWidth="1.5"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              {i < starCount && (
                <motion.div 
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ 
                    delay: animationComplete ? 0.7 + (i * 0.2) : 0,
                    duration: 1.5,
                    repeat: 0
                  }}
                >
                  <div className="w-full h-full bg-yellow-300 rounded-full blur-sm"></div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Map background with the new uploaded image */}
      <div 
        className="min-h-screen pb-20 pt-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('/lovable-uploads/0a548561-de49-46fc-ba7c-047bae73a678.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay to enhance visibility of content */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-950/60"></div>
        
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

        {/* Main winding path container - similar to the referenced image */}
        <div className="container mx-auto max-w-lg px-4 pt-10 z-10 relative">
          {/* The winding path - implement to match reference image */}
          <div className="relative min-h-[600px] w-full">
            {/* Base path (curved line) */}
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 320 600" preserveAspectRatio="none">
              <motion.path
                d="M160,580 C80,520 240,470 160,410 C80,350 240,300 160,240 C80,180 240,130 160,70 C80,10 160,10 160,10"
                fill="none"
                stroke="#E67E22"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="0,0"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {/* Render stage nodes along the path */}
            {limitedStages.map((stage, index) => {
              const isUnlocked = isStageUnlocked(category, stage.id, progress);
              const isCompleted = progress.completedStages[category]?.[stage.id] || false;
              const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
              
              // Calculate position along the path based on index
              const posY = 580 - (index * (570 / (limitedStages.length - 1)));
              // Alternate between left and right sides of the path
              const posX = index % 2 === 0 ? 100 : 220;
              
              // Calculate the next stage for path connection
              const nextStage = index < limitedStages.length - 1 ? limitedStages[index + 1] : null;
              const showCompletionPath = nextStage && isCompleted;
              
              return (
                <motion.div
                  key={stage.id}
                  className="absolute"
                  style={{ 
                    top: posY, 
                    left: posX,
                    zIndex: 30 - index
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: animationComplete ? 1 : 0, 
                    scale: animationComplete ? 1 : 0 
                  }}
                  transition={{ 
                    delay: 0.5 + (index * 0.15), 
                    duration: 0.5,
                    type: "spring"
                  }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <motion.div
                          className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center relative cursor-pointer shadow-lg transform hover:scale-105 transition-transform",
                            isCompleted ? "bg-blue-700 border-4 border-blue-300" : 
                            isUnlocked ? "bg-blue-600 border-4 border-blue-400" : 
                            "bg-gray-600 border-4 border-gray-400"
                          )}
                          onClick={() => handleStageClick(stage)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Stage number */}
                          <span className="text-2xl font-bold text-white">{stage.order}</span>
                          
                          {/* Lock overlay for locked stages */}
                          {!isUnlocked && (
                            <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50">
                              <Lock className="h-7 w-7 text-white" />
                            </div>
                          )}
                          
                          {/* Stars below the stage icon */}
                          {(isCompleted || (isUnlocked && completionPercentage > 0)) && (
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                              {renderStars(completionPercentage)}
                            </div>
                          )}
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-800 border-slate-700">
                        <div className="text-center text-white font-cairo" dir="rtl">
                          <p className="font-bold">{stage.title}</p>
                          {isCompleted ? (
                            <p className="text-green-300">تم الإكمال! {completionPercentage}%</p>
                          ) : isUnlocked ? (
                            <p className="text-blue-300">متاح اللعب</p>
                          ) : (
                            <p className="text-red-300">مقفل - أكمل المرحلة السابقة</p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  {/* Path connection to next stage - only show if current stage is completed */}
                  {showCompletionPath && (
                    <motion.div
                      className="absolute"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: animationComplete ? 1 : 0 }}
                      transition={{ delay: 1 + (index * 0.15) }}
                      style={{
                        zIndex: -1,
                        width: index % 2 === 0 ? '140px' : '140px',
                        height: '50px',
                        top: index % 2 === 0 ? '-25px' : '-25px',
                        left: index % 2 === 0 ? '-30px' : '-90px',
                        transformOrigin: index % 2 === 0 ? 'left center' : 'right center',
                        transform: index % 2 === 0 ? 'rotate(-30deg)' : 'rotate(30deg)'
                      }}
                    >
                      <div className="w-full h-3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
                    </motion.div>
                  )}
                  
                  {/* Stage title bubble */}
                  <div className="absolute mt-7 left-1/2 -translate-x-1/2 min-w-[80px] text-center">
                    <motion.div
                      className="stage-bubble-text font-cairo font-bold text-xs py-1 px-2 whitespace-nowrap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 10 }}
                      transition={{ delay: 0.8 + (index * 0.15) }}
                    >
                      {stage.title}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-16 text-center relative z-10">
          <p className="text-white font-cairo text-lg bg-black/30 mx-auto max-w-md rounded-lg p-2 backdrop-blur-sm" dir="rtl">
            أكمل كل مرحلة للتقدم في مسيرتك!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StageMap;
