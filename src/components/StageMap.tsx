
import React, { useState, useEffect, useRef } from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion, useAnimation } from 'framer-motion';
import { Check, Lock, Trophy, Star, ArrowLeft, MapPin, Flag, Award, X, Compass, Ship, Anchor, Skull, BookOpen, Map, Route } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { loadProgress, isStageUnlocked } from '@/utils/progressUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const mapRef = useRef<HTMLDivElement>(null);
  const pathControls = useAnimation();
  const isMobile = useIsMobile();
  const [isBookOpen, setIsBookOpen] = useState(true);
  
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
    setAnimationComplete(false);
    
    pathControls.start({
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    });
    
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
    
    if (mapRef.current) {
      mapRef.current.scrollTop = 0;
    }
    
    return () => clearTimeout(timer);
  }, [category, levelId, pathControls]);

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
    
    // Add page turning effect
    setIsBookOpen(false);
    setTimeout(() => {
      onStageSelect(stage.id);
    }, 500);
  };

  const currentLevelStages = stages.filter(stage => stage.id.startsWith(levelId));
  
  const limitedStages = currentLevelStages.slice(0, 10);
  
  const totalCompletedStages = Object.values(progress.completedStages[category] || {})
    .filter(Boolean).length;
  
  const completionPercentage = limitedStages.length > 0 
    ? Math.round((totalCompletedStages / limitedStages.length) * 100) 
    : 0;
  
  const levelLabel = levelId === 'beginner' ? 'مبتدئ' : 
                    levelId === 'intermediate' ? 'متوسط' : 'متقدم';
  
  const levelColor = levelId === 'beginner' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200' : 
                    levelId === 'intermediate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : 
                    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';

  const getStageIcon = (order: number, isCompleted: boolean) => {
    if (isCompleted) return <Check className={cn("text-green-500 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
    
    switch(order) {
      case 1: return <MapPin className={cn("text-red-600 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 2: return <Anchor className={cn("text-blue-600 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 3: return <Ship className={cn("text-indigo-600 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 4: return <Compass className={cn("text-cyan-600 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 5: return <X className={cn("text-purple-600 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 6: return <Anchor className={cn("text-amber-600 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 7: return <Skull className={cn("text-gray-600 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 8: return <Ship className={cn("text-emerald-600 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 9: return <Compass className={cn("text-orange-600 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 10: return <Trophy className={cn("text-yellow-500 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      default: return <MapPin className={cn("text-teal-600 drop-shadow-md", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
    }
  };

  const renderStars = (percentage: number) => {
    let starCount = 0;
    if (percentage >= 90) starCount = 3;
    else if (percentage >= 70) starCount = 2;
    else if (percentage >= 50) starCount = 1;
    
    const starSize = isMobile ? 'w-4 h-4' : 'w-5 h-5';
    
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
              starSize,
              "mx-[-2px]",
              i < starCount ? "text-yellow-400" : "text-gray-400 opacity-40"
            )}>
              <svg viewBox="0 0 24 24" fill={i < starCount ? "url(#starGradient)" : "#808080"} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FFA000" />
                  </linearGradient>
                </defs>
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
    <div className="relative min-h-screen" ref={mapRef}>
      <div 
        className={cn(
          "min-h-screen pb-20 pt-4 relative overflow-hidden transition-all duration-500",
          isBookOpen ? "opacity-100" : "opacity-0 scale-90"
        )}
      >
        {/* Book-style background effect */}
        <div className="absolute inset-0 bg-amber-100 dark:bg-amber-900/40 overflow-hidden">
          {/* Paper texture */}
          <div className="absolute inset-0 bg-[url('/lovable-uploads/ece5b219-22bb-496e-8cbb-2d07647c2edf.jpeg')] opacity-20 mix-blend-multiply"></div>
          
          {/* Book binding shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-amber-800/30 to-transparent"></div>
          
          {/* Page fold corner */}
          <div className="absolute top-0 right-0 w-20 h-20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200/50 shadow-inner transform origin-top-right"></div>
            <div className="absolute top-0 right-0 w-20 h-20 border-l border-b border-amber-700/20 transform rotate-[315deg] origin-top-right shadow-md"></div>
          </div>
          
          {/* Random ink stains */}
          <div className="absolute top-1/4 left-1/5 w-12 h-8 bg-amber-900/10 rounded-full blur-md transform rotate-12"></div>
          <div className="absolute bottom-1/3 right-1/4 w-16 h-6 bg-amber-900/5 rounded-full blur-md transform -rotate-6"></div>
          
          {/* Coffee stain */}
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-amber-800/10 blur-md"></div>
        </div>
        
        {/* Header */}
        <div className={cn(
          "relative z-20 flex justify-between items-center px-2 sm:px-6 py-2 sm:py-4",
          isMobile ? "flex-col gap-2" : "flex-row"
        )}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="bg-amber-50/90 hover:bg-amber-50 text-amber-900 font-cairo flex items-center gap-2 border-amber-700 shadow-md"
              onClick={onBackToLevels}
            >
              <ArrowLeft size={isMobile ? 14 : 18} />
              <span dir="rtl">العودة للمستويات</span>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="bg-amber-50/90 dark:bg-amber-900/90 rounded-lg px-3 py-1 sm:px-4 sm:py-2 shadow-md border-2 border-amber-700"
          >
            <h2 className={cn(
              "font-bold text-center flex items-center gap-2 justify-center text-amber-900 dark:text-amber-50",
              isMobile ? "text-base" : "text-xl"
            )}>
              <Badge className={cn("text-xs sm:text-sm", levelColor)}>
                {levelLabel}
              </Badge>
              <span>المستوى {limitedStages.length > 0 ? limitedStages[0].order : 1} - {limitedStages.length > 0 ? limitedStages[limitedStages.length-1].order : 10}</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-amber-50/90 dark:bg-amber-900/90 rounded-lg px-3 py-1 sm:px-4 sm:py-2 shadow-md border-2 border-amber-700"
          >
            <div className="flex flex-col items-center">
              <span className={cn(
                "font-bold text-amber-900 dark:text-amber-50",
                isMobile ? "text-sm" : "text-base"
              )}>
                {totalCompletedStages} / {limitedStages.length} مرحلة
              </span>
              <div className="w-full h-2 bg-amber-200/50 dark:bg-amber-800/50 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Book pages with stages */}
        <div className="container mx-auto px-4 pt-6 sm:pt-10 z-10 relative">
          <div className="bg-amber-50 dark:bg-amber-900/40 border-2 border-amber-800/20 rounded-lg shadow-xl overflow-hidden">
            {/* Book title */}
            <motion.div 
              className="text-center py-4 border-b-2 border-amber-800/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center items-center gap-2">
                <BookOpen className="h-6 w-6 text-amber-800 dark:text-amber-200" />
                <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-200" dir="rtl">
                  كتاب المراحل
                </h1>
              </div>
              <p className="text-amber-700 dark:text-amber-300 mt-1 text-sm" dir="rtl">
                اختر مرحلة للبدء في المغامرة
              </p>
            </motion.div>
            
            {/* Two page layout */}
            <div className={cn(
              "flex flex-col md:flex-row min-h-[500px]",
              isMobile ? "gap-8 p-4" : "gap-0"
            )}>
              {/* Left page - Stage map */}
              <div className={cn(
                "relative flex-1 p-4 md:p-6 border-r border-amber-800/10 md:min-h-[600px]",
                isMobile ? "" : "bg-gradient-to-r from-amber-100/30 to-transparent dark:from-amber-800/30"
              )}>
                <div className="flex items-center justify-center mb-4">
                  <Map className="h-5 w-5 text-amber-700 dark:text-amber-300 mr-2" />
                  <h3 className="text-lg font-bold text-amber-700 dark:text-amber-300" dir="rtl">خريطة المسار</h3>
                </div>
                
                {/* Stage path */}
                <div className="relative h-full">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <svg width="100%" height="100%" viewBox="0 0 300 500" preserveAspectRatio="none">
                      <defs>
                        <pattern id="paperPattern" patternUnits="userSpaceOnUse" width="200" height="200">
                          <image href="/lovable-uploads/ece5b219-22bb-496e-8cbb-2d07647c2edf.jpeg" width="200" height="200" opacity="0.1" />
                        </pattern>
                      </defs>
                      <motion.path
                        d="M50,450 Q100,400 80,350 Q60,300 120,250 Q180,200 150,150 Q120,100 180,50"
                        fill="none"
                        stroke="url(#paperPattern)"
                        strokeWidth="25"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                      />
                      <motion.path
                        d="M50,450 Q100,400 80,350 Q60,300 120,250 Q180,200 150,150 Q120,100 180,50"
                        fill="none"
                        stroke="#8B4513"
                        strokeOpacity="0.6"
                        strokeWidth="8"
                        strokeDasharray="1, 15"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Stage nodes along the path */}
                  {limitedStages.map((stage, index) => {
                    const isUnlocked = isStageUnlocked(category, stage.id, progress);
                    const isCompleted = progress.completedStages[category]?.[stage.id] || false;
                    const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
                    
                    // Calculate position along the path
                    const progress = index / (limitedStages.length - 1);
                    const yPos = 450 - (progress * 400);
                    
                    // Add some variation to x position
                    const xOffset = Math.sin(index * 0.7) * 60;
                    const xPos = 120 + xOffset;
                    
                    return (
                      <motion.div
                        key={stage.id}
                        className="absolute"
                        style={{ 
                          top: yPos - 20, 
                          left: xPos - 20,
                          zIndex: 10
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: animationComplete ? 1 : 0,
                          opacity: animationComplete ? 1 : 0
                        }}
                        transition={{ 
                          delay: 0.8 + (index * 0.15), 
                          duration: 0.5,
                          type: "spring"
                        }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.button
                                className={cn(
                                  "w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative cursor-pointer border-2",
                                  isCompleted ? "bg-amber-400 border-amber-700" : 
                                  isUnlocked ? "bg-amber-200 border-amber-600" : 
                                  "bg-gray-300 border-gray-500 opacity-70"
                                )}
                                onClick={() => handleStageClick(stage)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={!isUnlocked}
                              >
                                <div className={cn(
                                  "absolute inset-0 rounded-full overflow-hidden",
                                  isUnlocked ? "" : "grayscale"
                                )}>
                                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-500 opacity-50"></div>
                                  <div className="absolute inset-0 bg-[url('/lovable-uploads/ece5b219-22bb-496e-8cbb-2d07647c2edf.jpeg')] opacity-20 mix-blend-overlay"></div>
                                </div>
                                
                                <div className="relative z-10 flex flex-col items-center justify-center">
                                  <span className="font-bold text-amber-900 text-lg">{stage.order}</span>
                                  <div className="mt-1">
                                    {getStageIcon(stage.order, isCompleted)}
                                  </div>
                                </div>
                                
                                {!isUnlocked && (
                                  <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 z-20">
                                    <Lock className="text-white h-5 w-5" />
                                  </div>
                                )}
                                
                                {isCompleted && (
                                  <motion.div 
                                    className="absolute -bottom-2 transform -translate-x-1/2 left-1/2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.2 + (index * 0.1) }}
                                  >
                                    {renderStars(completionPercentage)}
                                  </motion.div>
                                )}
                              </motion.button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              <div className="text-center p-1" dir="rtl">
                                <p className="font-bold">{stage.title}</p>
                                {isCompleted ? (
                                  <p className="text-green-600">تم الإكمال!</p>
                                ) : isUnlocked ? (
                                  <p className="text-blue-600">متاح اللعب</p>
                                ) : (
                                  <p className="text-red-600">مقفل</p>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        {/* Stage label */}
                        <div className="absolute left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap">
                          <span className="text-xs font-bold bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-amber-100 px-2 py-1 rounded-full border border-amber-300 dark:border-amber-600">
                            {stage.title}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Right page - Stage list */}
              <div className={cn(
                "flex-1 p-4 md:p-6 md:min-h-[600px]",
                isMobile ? "" : "bg-gradient-to-l from-amber-100/30 to-transparent dark:from-amber-800/30"
              )}>
                <div className="flex items-center justify-center mb-4">
                  <Route className="h-5 w-5 text-amber-700 dark:text-amber-300 mr-2" />
                  <h3 className="text-lg font-bold text-amber-700 dark:text-amber-300" dir="rtl">قائمة المراحل</h3>
                </div>
                
                <div className="space-y-2">
                  {limitedStages.map((stage, index) => {
                    const isUnlocked = isStageUnlocked(category, stage.id, progress);
                    const isCompleted = progress.completedStages[category]?.[stage.id] || false;
                    
                    return (
                      <motion.div
                        key={stage.id}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                      >
                        <button
                          onClick={() => handleStageClick(stage)}
                          disabled={!isUnlocked}
                          className={cn(
                            "w-full p-2 sm:p-3 rounded-md border text-right flex items-center gap-2 transition-all",
                            isCompleted ? "bg-amber-100 dark:bg-amber-800/50 border-amber-300 dark:border-amber-700" :
                            isUnlocked ? "bg-amber-50 dark:bg-amber-900/50 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-800/70" :
                            "bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 opacity-60 cursor-not-allowed"
                          )}
                          dir="rtl"
                        >
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center",
                            isCompleted ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" :
                            isUnlocked ? "bg-amber-200 text-amber-800 dark:bg-amber-800/80 dark:text-amber-200" :
                            "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                          )}>
                            {isCompleted ? (
                              <Check className="h-4 w-4" />
                            ) : !isUnlocked ? (
                              <Lock className="h-4 w-4" />
                            ) : (
                              <span>{stage.order}</span>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="font-bold text-amber-900 dark:text-amber-100">
                              {stage.title}
                            </div>
                            <div className="text-xs text-amber-700 dark:text-amber-300">
                              {isCompleted ? "تم الإكمال" : isUnlocked ? "متاح اللعب" : "مقفل"}
                            </div>
                          </div>
                          
                          {isCompleted && (
                            <div className="flex">
                              {[...Array(3)].map((_, i) => {
                                const percentage = progress.stageCompletion[category]?.[stage.id] || 0;
                                let starCount = 0;
                                if (percentage >= 90) starCount = 3;
                                else if (percentage >= 70) starCount = 2;
                                else if (percentage >= 50) starCount = 1;
                                
                                return (
                                  <Star 
                                    key={i}
                                    className={cn(
                                      "h-4 w-4",
                                      i < starCount ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"
                                    )}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Book footer */}
            <div className="border-t-2 border-amber-800/20 p-4 text-center">
              <p className="text-amber-700 dark:text-amber-300 text-sm italic" dir="rtl">
                اتبع مسار الكنز وأكمل كل مرحلة للوصول إلى الجائزة النهائية!
              </p>
            </div>
          </div>
          
          {/* Book binding effect */}
          <div className="absolute left-1/2 top-6 bottom-0 w-4 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-800/20 to-transparent hidden md:block"></div>
          
          {/* Decorative elements */}
          <motion.div
            className="absolute top-24 right-10 opacity-40 hidden md:block"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 0.4, rotate: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Compass className="h-12 w-12 text-amber-800 dark:text-amber-500" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 left-10 opacity-40 hidden md:block"
            initial={{ opacity: 0, rotate: 10 }}
            animate={{ opacity: 0.4, rotate: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <Ship className="h-10 w-10 text-amber-800 dark:text-amber-500" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StageMap;
