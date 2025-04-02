
import React, { useState, useEffect, useRef } from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion, useAnimation } from 'framer-motion';
import { 
  Check, Lock, Trophy, Star, ArrowLeft, MapPin, 
  Flag, Award, Compass, Ship, Anchor, Skull, 
  BookOpen, Map, Route, Sparkles, Zap
} from 'lucide-react';
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
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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
      transition: { duration: 2, ease: "easeInOut" }
    });
    
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
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
    
    setIsTransitioning(true);
    
    // Add transition effect before navigating to stage
    setTimeout(() => {
      onStageSelect(stage.id);
    }, 600);
  };

  const currentLevelStages = stages.filter(stage => stage.id.startsWith(levelId));
  const limitedStages = currentLevelStages.slice(0, 10);
  
  const totalCompletedStages = Object.keys(progress.completedStages[category] || {})
    .filter(stageId => stageId.startsWith(levelId) && progress.completedStages[category][stageId])
    .length;
  
  const completionPercentage = limitedStages.length > 0 
    ? Math.round((totalCompletedStages / limitedStages.length) * 100) 
    : 0;
  
  const levelLabel = levelId === 'beginner' ? 'مبتدئ' : 
                    levelId === 'intermediate' ? 'متوسط' : 'متقدم';
  
  const levelColor = levelId === 'beginner' ? 'bg-emerald-500 text-white' : 
                    levelId === 'intermediate' ? 'bg-blue-500 text-white' : 
                    'bg-red-500 text-white';

  const getStageIcon = (order: number, isCompleted: boolean) => {
    if (isCompleted) return <Check className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
    
    switch(order) {
      case 1: return <MapPin className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 2: return <Anchor className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 3: return <Ship className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 4: return <Compass className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 5: return <Zap className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 6: return <Sparkles className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 7: return <Skull className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 8: return <Ship className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 9: return <Compass className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      case 10: return <Trophy className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
      default: return <MapPin className={cn("text-white", isMobile ? "h-4 w-4" : "h-5 w-5")} />;
    }
  };

  const getBackgroundGradient = () => {
    if (levelId === 'beginner') {
      return 'from-emerald-900 via-emerald-700 to-emerald-800';
    } else if (levelId === 'intermediate') {
      return 'from-blue-900 via-blue-700 to-blue-800';
    } else {
      return 'from-red-900 via-red-700 to-red-800';
    }
  };

  const getNodeColor = (completed: boolean, unlocked: boolean) => {
    if (completed) {
      return levelId === 'beginner' ? 'bg-emerald-400' :
             levelId === 'intermediate' ? 'bg-blue-400' :
             'bg-red-400';
    }
    
    if (unlocked) {
      return levelId === 'beginner' ? 'bg-emerald-500' :
             levelId === 'intermediate' ? 'bg-blue-500' :
             'bg-red-500';
    }
    
    return 'bg-gray-500';
  };

  const calculateStagePosition = (index: number, totalStages: number) => {
    // Calculate positions in a winding path pattern
    const row = Math.floor(index / 3);
    const colIndex = index % 3;
    const col = row % 2 === 0 ? colIndex : 2 - colIndex;
    
    // Create zigzag path
    const xBase = (col * 33) + 10;
    const yBase = (row * 20) + 10;
    
    // Add some randomness for natural feel
    const xJitter = Math.sin(index * 0.5) * 3;
    const yJitter = Math.cos(index * 0.7) * 2;
    
    return {
      x: xBase + xJitter,
      y: yBase + yJitter
    };
  };

  // Create connections array for the path
  const connections = limitedStages.map((stage, index) => {
    if (index === 0) return null;
    
    const start = calculateStagePosition(index - 1, limitedStages.length);
    const end = calculateStagePosition(index, limitedStages.length);
    
    const isCompleted = progress.completedStages[category]?.[limitedStages[index - 1].id] || false;
    
    return {
      id: `${index-1}-${index}`,
      start,
      end,
      completed: isCompleted
    };
  }).filter(Boolean);

  const renderStars = (percentage: number) => {
    let starCount = 0;
    if (percentage >= 90) starCount = 3;
    else if (percentage >= 70) starCount = 2;
    else if (percentage >= 50) starCount = 1;
    
    return (
      <div className="flex mt-1">
        {[...Array(3)].map((_, i) => (
          <Star 
            key={i}
            className={cn(
              "h-4 w-4 mx-[-2px]",
              i < starCount ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden" ref={mapRef}>
      <motion.div 
        className={cn(
          "min-h-screen pb-20 pt-4 relative overflow-hidden",
          isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dynamic background with parallax effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()}`}>
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: Math.random() * 5 + 2,
                  height: Math.random() * 5 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: Math.random() * 10 + 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
          
          {/* Glowing effect layers */}
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
        </div>
        
        {/* Header with nav */}
        <div className="relative z-20 container mx-auto px-4">
          <div className={cn(
            "flex items-center mb-6",
            isMobile ? "flex-col gap-4" : "justify-between"
          )}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border-white/20 rounded-xl flex items-center gap-2"
                onClick={onBackToLevels}
              >
                <ArrowLeft size={isMobile ? 14 : 18} />
                <span dir="rtl">العودة للمستويات</span>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Badge className={cn("text-sm", levelColor)}>
                  {levelLabel}
                </Badge>
                <span dir="rtl">المستوى {totalCompletedStages}/{limitedStages.length}</span>
              </h2>
              
              <div className="w-full max-w-xs h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className={cn(
                    "h-full rounded-full",
                    levelId === 'beginner' ? 'bg-emerald-400' :
                    levelId === 'intermediate' ? 'bg-blue-400' :
                    'bg-red-400'
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>
            
            <div className="w-32">
              {/* Spacer div for layout balance on mobile */}
            </div>
          </div>
        </div>
          
        {/* Interactive Map */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="relative bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Map title */}
            <div className="text-center py-4 border-b border-white/10">
              <div className="flex justify-center items-center gap-2">
                <Map className="h-6 w-6 text-white" />
                <h1 className="text-2xl font-bold text-white" dir="rtl">
                  خريطة المراحل
                </h1>
              </div>
              <p className="text-white/70 mt-1 text-sm" dir="rtl">
                استكشف المراحل وابدأ رحلتك المعرفية
              </p>
            </div>
            
            {/* Map container */}
            <div className="relative p-8 md:p-12 min-h-[500px]">
              {/* SVG path connections */}
              <svg 
                className="absolute inset-0 w-full h-full z-0" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
                  </linearGradient>
                  
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {connections.map((connection, index) => (
                  <motion.path
                    key={connection.id}
                    d={`M${connection.start.x} ${connection.start.y} Q${(connection.start.x + connection.end.x) / 2 + (Math.random() * 5 - 2.5)} ${(connection.start.y + connection.end.y) / 2 + (Math.random() * 10 - 5)} ${connection.end.x} ${connection.end.y}`}
                    stroke={connection.completed ? "url(#pathGradient)" : "rgba(255,255,255,0.2)"}
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="5,5"
                    filter={connection.completed ? "url(#glow)" : ""}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.5 + (index * 0.1),
                      ease: "easeInOut"
                    }}
                    className={connection.completed ? "animate-pulse" : ""}
                  />
                ))}
              </svg>
              
              {/* Stage nodes */}
              {limitedStages.map((stage, index) => {
                const isUnlocked = isStageUnlocked(category, stage.id, progress);
                const isCompleted = progress.completedStages[category]?.[stage.id] || false;
                const position = calculateStagePosition(index, limitedStages.length);
                const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
                const isHovered = hoveredStage === stage.id;
                
                return (
                  <motion.div
                    key={stage.id}
                    className="absolute z-10"
                    style={{ 
                      left: `${position.x}%`, 
                      top: `${position.y}%`,
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
                    onMouseEnter={() => setHoveredStage(stage.id)}
                    onMouseLeave={() => setHoveredStage(null)}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            className={cn(
                              "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center relative cursor-pointer border-2 backdrop-blur-sm border-white/30",
                              getNodeColor(isCompleted, isUnlocked),
                              !isUnlocked && "opacity-60 grayscale"
                            )}
                            onClick={() => handleStageClick(stage)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                              boxShadow: isHovered ? "0 0 20px 5px rgba(255, 255, 255, 0.3)" : "0 0 5px 2px rgba(255, 255, 255, 0.1)"
                            }}
                            transition={{ duration: 0.3 }}
                            disabled={!isUnlocked}
                          >
                            {/* Glow effect on hover */}
                            {isHovered && (
                              <motion.div 
                                className="absolute inset-0 rounded-full opacity-70"
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  opacity: [0.7, 0, 0.7]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                style={{
                                  background: isCompleted ? 
                                    `radial-gradient(circle, ${levelId === 'beginner' ? '#10b981' : levelId === 'intermediate' ? '#3b82f6' : '#ef4444'} 0%, transparent 70%)` :
                                    'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
                                }}
                              />
                            )}
                            
                            <div className="relative z-10 flex flex-col items-center justify-center">
                              <span className="font-bold text-white text-lg">{stage.order}</span>
                              <div className="mt-1">
                                {getStageIcon(stage.order, isCompleted)}
                              </div>
                            </div>
                            
                            {!isUnlocked && (
                              <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 z-20">
                                <Lock className="text-white h-5 w-5" />
                              </div>
                            )}
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="top" 
                          className="bg-black/80 backdrop-blur-md border-white/20 text-white"
                        >
                          <div className="text-center p-1" dir="rtl">
                            <p className="font-bold">{stage.title}</p>
                            {isCompleted ? (
                              <div className="flex flex-col items-center">
                                <p className="text-green-400">تم الإكمال!</p>
                                {renderStars(completionPercentage)}
                              </div>
                            ) : isUnlocked ? (
                              <p className="text-blue-400">متاح اللعب</p>
                            ) : (
                              <p className="text-red-400">مقفل</p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* Stage label for larger screens */}
                    {!isMobile && (
                      <motion.div 
                        className="absolute left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + (index * 0.1) }}
                      >
                        <span className={cn(
                          "text-xs font-bold px-3 py-1 rounded-full text-white",
                          isCompleted ? "bg-white/20" : "bg-black/30", 
                          "backdrop-blur-md border border-white/10"
                        )}>
                          {stage.title}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
              
              {/* Decorative elements */}
              <motion.div
                className="absolute top-10 right-10 opacity-30 hidden md:block"
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 0.3, rotate: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <Compass className="h-12 w-12 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-10 left-10 opacity-30 hidden md:block"
                initial={{ opacity: 0, rotate: 10 }}
                animate={{ opacity: 0.3, rotate: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
              >
                <Ship className="h-10 w-10 text-white" />
              </motion.div>
              
              {/* Interactive guide hint */}
              <motion.div 
                className="absolute bottom-4 right-4 text-white/70 text-sm flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                dir="rtl"
              >
                <span>انقر على أي مرحلة للبدء</span>
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="h-4 w-4" />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Stages list for mobile */}
            {isMobile && (
              <div className="border-t border-white/10 p-4">
                <div className="flex items-center justify-center mb-4">
                  <Route className="h-5 w-5 text-white mr-2" />
                  <h3 className="text-lg font-bold text-white" dir="rtl">قائمة المراحل</h3>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto p-2">
                  {limitedStages.map((stage, index) => {
                    const isUnlocked = isStageUnlocked(category, stage.id, progress);
                    const isCompleted = progress.completedStages[category]?.[stage.id] || false;
                    const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
                    
                    return (
                      <motion.div
                        key={stage.id}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                      >
                        <button
                          onClick={() => handleStageClick(stage)}
                          disabled={!isUnlocked}
                          className={cn(
                            "w-full p-2 rounded-md border text-right flex items-center gap-2 transition-all",
                            isCompleted ? "bg-white/10 border-white/30" :
                            isUnlocked ? "bg-white/5 border-white/20 hover:bg-white/10" :
                            "bg-black/20 border-white/10 opacity-60 cursor-not-allowed"
                          )}
                          dir="rtl"
                        >
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center",
                            getNodeColor(isCompleted, isUnlocked)
                          )}>
                            {isCompleted ? (
                              <Check className="h-4 w-4 text-white" />
                            ) : !isUnlocked ? (
                              <Lock className="h-4 w-4 text-white" />
                            ) : (
                              <span className="text-white">{stage.order}</span>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="font-bold text-white">
                              {stage.title}
                            </div>
                            <div className="text-xs text-white/70">
                              {isCompleted ? "تم الإكمال" : isUnlocked ? "متاح اللعب" : "مقفل"}
                            </div>
                          </div>
                          
                          {isCompleted && renderStars(completionPercentage)}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Map footer */}
            <div className="border-t border-white/10 p-4 text-center">
              <p className="text-white/70 text-sm" dir="rtl">
                استكشف رحلتك المعرفية وأكمل كل المراحل للحصول على الجوائز!
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StageMap;
