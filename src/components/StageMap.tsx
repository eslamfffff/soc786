
import React, { useState, useEffect } from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, Lock, Unlock, Trophy, Star, ArrowLeft, MapPin, Flag, Award, X, Compass, Ship, Anchor, Skull } from 'lucide-react';
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
  const getStageIcon = (order: number, isCompleted: boolean) => {
    if (isCompleted) return <Check className="h-5 w-5 text-green-500" />;
    
    // Special stages with treasure-map themed icons
    switch(order) {
      case 1: return <MapPin className="h-5 w-5 text-red-600" />;
      case 2: return <Anchor className="h-5 w-5 text-blue-600" />;
      case 3: return <Ship className="h-5 w-5 text-indigo-600" />;
      case 4: return <Compass className="h-5 w-5 text-cyan-600" />;
      case 5: return <X className="h-5 w-5 text-purple-600" />;
      case 6: return <Anchor className="h-5 w-5 text-amber-600" />;
      case 7: return <Skull className="h-5 w-5 text-gray-600" />;
      case 8: return <Ship className="h-5 w-5 text-emerald-600" />;
      case 9: return <Compass className="h-5 w-5 text-orange-600" />;
      case 10: return <Trophy className="h-5 w-5 text-yellow-500" />;
      default: return <MapPin className="h-5 w-5 text-teal-600" />;
    }
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

  // Calculate paths for the treasure map
  const getPathCoordinates = (index: number, totalStages: number) => {
    // Create a zigzag path that resembles a treasure map route
    const baseX = 160; // Center of the map
    const startY = 550; // Bottom of the map
    const endY = 50; // Top of the map
    const totalHeight = startY - endY;
    const segmentHeight = totalHeight / (totalStages - 1);
    
    // Make the path zigzag
    const amplitude = 100; // How far left/right the zigzag goes
    const y = startY - (index * segmentHeight);
    // Alternate left and right, but with some randomness
    const xOffset = ((index % 2) * 2 - 1) * amplitude * (0.8 + Math.cos(index * 0.7) * 0.2);
    
    return { x: baseX + xOffset, y };
  };

  return (
    <div className="relative min-h-screen">
      {/* Treasure Map background */}
      <div 
        className="min-h-screen pb-20 pt-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('/lovable-uploads/c03b91b5-be2d-430c-8eea-e0c0ff3e9b47.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay to enhance visibility of content */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 to-amber-800/20"></div>
        
        {/* Back button and level info */}
        <div className="relative z-10 flex justify-between items-center px-6 py-4">
          <Button 
            variant="outline" 
            className="bg-amber-50/90 hover:bg-amber-50 text-amber-900 font-cairo flex items-center gap-2 border-amber-700"
            onClick={onBackToLevels}
          >
            <ArrowLeft size={18} />
            <span dir="rtl">العودة للمستويات</span>
          </Button>
          
          <div className="bg-amber-50/90 dark:bg-amber-900/90 rounded-lg px-4 py-2 shadow-md border-2 border-amber-700">
            <h2 className="text-xl font-bold text-center flex items-center gap-2 justify-center text-amber-900 dark:text-amber-50">
              <Badge className={cn("text-sm", levelColor)}>
                {levelLabel}
              </Badge>
              <span>المستوى {limitedStages.length > 0 ? limitedStages[0].order : 1} - {limitedStages.length > 0 ? limitedStages[limitedStages.length-1].order : 10}</span>
            </h2>
          </div>
          
          <div className="bg-amber-50/90 dark:bg-amber-900/90 rounded-lg px-4 py-2 shadow-md border-2 border-amber-700">
            <span className="font-bold text-amber-900 dark:text-amber-50">
              {totalCompletedStages} / {limitedStages.length} مرحلة
            </span>
          </div>
        </div>

        {/* Main treasure map path */}
        <div className="container mx-auto max-w-lg px-4 pt-10 z-10 relative">
          {/* The treasure map path */}
          <div className="relative min-h-[600px] w-full">
            {/* Dotted path - using SVG for better control */}
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 320 600" preserveAspectRatio="none">
              {/* Create zigzag dotted line path */}
              <motion.path
                d={`M${getPathCoordinates(0, limitedStages.length).x},${getPathCoordinates(0, limitedStages.length).y} 
                   ${Array.from({length: limitedStages.length - 1}, (_, i) => 
                     `L${getPathCoordinates(i + 1, limitedStages.length).x},${getPathCoordinates(i + 1, limitedStages.length).y}`
                   ).join(' ')}`}
                fill="none"
                stroke="#8B4513"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="1, 15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Solid path underneath for completed stages */}
              <motion.path
                d={`M${getPathCoordinates(0, limitedStages.length).x},${getPathCoordinates(0, limitedStages.length).y} 
                   ${Array.from({length: limitedStages.length - 1}, (_, i) => {
                     // Only include stages that are completed in the solid path
                     const stageCompleted = progress.completedStages[category]?.[limitedStages[i]?.id] || false;
                     if (stageCompleted) {
                       return `L${getPathCoordinates(i + 1, limitedStages.length).x},${getPathCoordinates(i + 1, limitedStages.length).y}`;
                     }
                     return '';
                   }).join(' ')}`}
                fill="none"
                stroke="#A0522D"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>

            {/* Render stage nodes along the treasure path */}
            {limitedStages.map((stage, index) => {
              const isUnlocked = isStageUnlocked(category, stage.id, progress);
              const isCompleted = progress.completedStages[category]?.[stage.id] || false;
              const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
              
              // Get position from our path calculation function
              const position = getPathCoordinates(index, limitedStages.length);
              
              return (
                <motion.div
                  key={stage.id}
                  className="absolute"
                  style={{ 
                    top: position.y - 30, // Center the icon
                    left: position.x - 30, // Center the icon
                    zIndex: 30 - index
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: -30 }}
                  animate={{ 
                    opacity: animationComplete ? 1 : 0, 
                    scale: animationComplete ? 1 : 0,
                    rotate: 0
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
                            "w-16 h-16 rounded-full flex items-center justify-center relative cursor-pointer",
                            isCompleted ? "bg-yellow-500 border-4 border-amber-700 shadow-[0_0_15px_rgba(245,158,11,0.5)]" : 
                            isUnlocked ? "bg-amber-400 border-4 border-amber-700 shadow-md" : 
                            "bg-slate-600 border-4 border-slate-800 opacity-80"
                          )}
                          onClick={() => handleStageClick(stage)}
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className={cn(
                            "absolute inset-0 rounded-full overflow-hidden",
                            isUnlocked ? "" : "grayscale brightness-50"
                          )}>
                            {/* Background texture for the stage markers */}
                            <div className="w-full h-full bg-gradient-to-br from-amber-300 to-amber-600"></div>
                            <div className="absolute inset-0 bg-[url('/lovable-uploads/ece5b219-22bb-496e-8cbb-2d07647c2edf.jpeg')] opacity-30 mix-blend-overlay"></div>
                          </div>
                          
                          {/* Stage number */}
                          <div className="relative z-10 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">{stage.order}</span>
                            <div className="mt-1">
                              {getStageIcon(stage.order, isCompleted)}
                            </div>
                          </div>
                          
                          {/* Lock overlay for locked stages */}
                          {!isUnlocked && (
                            <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 z-20">
                              <Lock className="h-7 w-7 text-white drop-shadow-lg" />
                            </div>
                          )}
                          
                          {/* Stars below the stage icon */}
                          {(isCompleted || (isUnlocked && completionPercentage > 0)) && (
                            <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 z-10">
                              {renderStars(completionPercentage)}
                            </div>
                          )}
                          
                          {/* Glow effect for the next unlocked stage */}
                          {isUnlocked && !isCompleted && (
                            <motion.div 
                              className="absolute inset-0 rounded-full"
                              animate={{ 
                                boxShadow: ['0 0 5px 2px rgba(255,204,0,0.3)', '0 0 15px 5px rgba(255,204,0,0.6)', '0 0 5px 2px rgba(255,204,0,0.3)']
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            />
                          )}
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-amber-800 border-amber-600 shadow-xl">
                        <div className="text-center text-amber-50 font-cairo" dir="rtl">
                          <p className="font-bold text-lg">{stage.title}</p>
                          {isCompleted ? (
                            <p className="text-green-300">تم الإكمال! {completionPercentage}%</p>
                          ) : isUnlocked ? (
                            <p className="text-yellow-300">متاح اللعب</p>
                          ) : (
                            <p className="text-red-300">مقفل - أكمل المرحلة السابقة</p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  {/* Stage title bubble */}
                  <div className="absolute mt-8 left-1/2 -translate-x-1/2 min-w-[80px] text-center">
                    <motion.div
                      className="stage-bubble-text bg-amber-900/70 text-amber-50 font-cairo font-bold text-xs py-1 px-2 rounded-lg whitespace-nowrap border border-amber-600/50 shadow-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 10 }}
                      transition={{ delay: 0.8 + (index * 0.15) }}
                    >
                      {stage.title}
                    </motion.div>
                  </div>
                  
                  {/* Small decorative elements around the map - only for certain stages */}
                  {index % 3 === 0 && (
                    <motion.div 
                      className="absolute"
                      style={{ 
                        top: Math.random() * 80 - 40, 
                        left: Math.random() * 80 - 40,
                        zIndex: -1
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.7, scale: 1 }}
                      transition={{ delay: 1.5 + (index * 0.1) }}
                    >
                      <img 
                        src="/lovable-uploads/d6dbdcbd-c9dd-48f4-be1c-8b1c0ab0a39e.png" 
                        className="w-10 h-10 object-contain opacity-70"
                        alt="Map decoration"
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
            
            {/* Decorative elements on the map */}
            <motion.div
              className="absolute top-1/4 right-5 opacity-70 z-0"
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 0.7, rotate: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Compass className="h-12 w-12 text-amber-800" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-1/4 left-5 opacity-70 z-0"
              initial={{ opacity: 0, rotate: 20 }}
              animate={{ opacity: 0.7, rotate: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <Ship className="h-10 w-10 text-amber-800" />
            </motion.div>
          </div>
        </div>
        
        <div className="mt-16 text-center relative z-10">
          <p className="text-amber-50 font-cairo text-lg bg-amber-900/50 mx-auto max-w-md rounded-lg p-3 backdrop-blur-sm border border-amber-600/50 shadow-lg" dir="rtl">
            اتبع مسار الكنز وأكمل كل مرحلة للوصول إلى الجائزة النهائية!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StageMap;
