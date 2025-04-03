
import React, { useState, useEffect, useRef } from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  Check, Lock, Trophy, Star, ArrowLeft, MapPin, 
  Flag, Award, Compass, Sparkles, Zap, Home
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
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [scrollPosition, setScrollPosition] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const pathControls = useAnimation();
  const isMobile = useIsMobile();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Initialize progress objects if they don't exist
  if (!progress.completedStages) progress.completedStages = {};
  if (!progress.completedStages[category]) progress.completedStages[category] = {};
  if (!progress.stageCompletion) progress.stageCompletion = {};
  if (!progress.stageCompletion[category]) progress.stageCompletion[category] = {};

  // Handle scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (mapRef.current) {
        setScrollPosition(mapRef.current.scrollTop);
      }
    };

    if (mapRef.current) {
      mapRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (mapRef.current) {
          mapRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, []);

  // Animate path on mount
  useEffect(() => {
    pathControls.start({
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut" }
    });
    
    if (mapRef.current) {
      mapRef.current.scrollTop = 0;
    }
  }, [category, levelId, pathControls]);

  // Handle stage selection with transition effect
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
    
    // Smooth transition before navigating to stage
    setTimeout(() => {
      onStageSelect(stage.id);
    }, 400);
  };

  // Filter and prepare the stages to show
  const currentLevelStages = stages.filter(stage => stage.id.startsWith(levelId));
  const limitedStages = currentLevelStages.slice(0, 10);
  
  // Calculate completion statistics
  const totalCompletedStages = Object.keys(progress.completedStages[category] || {})
    .filter(stageId => stageId.startsWith(levelId) && progress.completedStages[category][stageId])
    .length;
  
  const completionPercentage = limitedStages.length > 0 
    ? Math.round((totalCompletedStages / limitedStages.length) * 100) 
    : 0;
  
  // Get level information for styling
  const levelLabel = levelId === 'beginner' ? 'مبتدئ' : 
                    levelId === 'intermediate' ? 'متوسط' : 'متقدم';
  
  const levelColor = levelId === 'beginner' ? 'bg-emerald-500 text-white' : 
                    levelId === 'intermediate' ? 'bg-blue-500 text-white' : 
                    'bg-red-500 text-white';

  // Icon for each stage based on order and completion
  const getStageIcon = (order: number, isCompleted: boolean) => {
    if (isCompleted) return <Check className="h-5 w-5 text-white" />;
    
    switch(order % 10) {
      case 1: return <MapPin className="h-5 w-5 text-white" />;
      case 2: return <Flag className="h-5 w-5 text-white" />;
      case 3: return <Award className="h-5 w-5 text-white" />;
      case 4: return <Compass className="h-5 w-5 text-white" />;
      case 5: return <Zap className="h-5 w-5 text-white" />;
      case 6: return <Sparkles className="h-5 w-5 text-white" />;
      case 7: return <Star className="h-5 w-5 text-white" />;
      case 8: return <Trophy className="h-5 w-5 text-white" />;
      case 9: return <Home className="h-5 w-5 text-white" />;
      case 0: return <Trophy className="h-5 w-5 text-white" />;
      default: return <MapPin className="h-5 w-5 text-white" />;
    }
  };

  // Dynamic level gradient background
  const getBackgroundGradient = () => {
    if (levelId === 'beginner') {
      return 'from-emerald-900 to-emerald-600';
    } else if (levelId === 'intermediate') {
      return 'from-blue-900 to-blue-600';
    } else {
      return 'from-red-900 to-red-600';
    }
  };

  // Get stage node color based on status
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
    
    return 'bg-gray-500 dark:bg-gray-700';
  };

  // Calculate stage positions along a smooth curve
  const calculateStagePosition = (index: number) => {
    // Create a smooth S-curve for stage placement
    const progress = index / (limitedStages.length - 1);
    const xBase = 10 + progress * 80; // 10% to 90% of width
    
    // Gentle S-curve pattern for y positioning
    const yBase = 50 + Math.sin(progress * Math.PI) * 30;
    
    return { x: xBase, y: yBase };
  };

  // Generate star rating based on completion percentage
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

  // Calculate all connections between stages for path drawing
  const connections = limitedStages.map((stage, index) => {
    if (index === 0) return null;
    
    const start = calculateStagePosition(index - 1);
    const end = calculateStagePosition(index);
    
    const isCompleted = progress.completedStages[category]?.[limitedStages[index - 1].id] || false;
    
    return {
      id: `${index-1}-${index}`,
      start,
      end,
      completed: isCompleted
    };
  }).filter(Boolean);

  return (
    <div className="relative min-h-screen overflow-hidden" ref={mapRef}>
      <motion.div 
        className={cn(
          "min-h-screen pb-20 pt-4 relative",
          isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100",
          "transition-all duration-300 ease-in-out"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Dynamic gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()}`}>
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: Math.random() * 8 + 2,
                  height: Math.random() * 8 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 200 - 100],
                  x: [0, Math.random() * 200 - 100],
                  opacity: [0.5, 0.1, 0.5]
                }}
                transition={{
                  duration: Math.random() * 20 + 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
          
          {/* Ambient glow effects */}
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
        </div>
        
        {/* Header navigation */}
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
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-white/20 rounded-xl flex items-center gap-2"
                onClick={onBackToLevels}
              >
                <ArrowLeft size={16} />
                <span dir="rtl">العودة للمستويات</span>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2" dir="rtl">
                <Badge className={cn("text-sm", levelColor)}>
                  {levelLabel}
                </Badge>
                <span>التقدم {totalCompletedStages}/{limitedStages.length}</span>
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
              {/* Layout balancer for mobile */}
            </div>
          </div>
        </div>
          
        {/* Main content container */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="relative bg-black/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Tab navigation */}
            <div className="flex border-b border-white/10">
              <button 
                className={cn(
                  "flex-1 py-4 text-center transition-all duration-200",
                  activeTab === 'map' 
                    ? "text-white font-bold border-b-2 border-white" 
                    : "text-white/60 hover:text-white"
                )}
                onClick={() => setActiveTab('map')}
              >
                <div className="flex justify-center items-center space-x-2 flex-row-reverse">
                  <Compass className={cn("h-5 w-5", activeTab === 'map' ? "text-white" : "text-white/60")} />
                  <span dir="rtl">الخريطة</span>
                </div>
              </button>
              
              <button 
                className={cn(
                  "flex-1 py-4 text-center transition-all duration-200",
                  activeTab === 'list' 
                    ? "text-white font-bold border-b-2 border-white" 
                    : "text-white/60 hover:text-white"
                )}
                onClick={() => setActiveTab('list')}
              >
                <div className="flex justify-center items-center space-x-2 flex-row-reverse">
                  <Flag className={cn("h-5 w-5", activeTab === 'list' ? "text-white" : "text-white/60")} />
                  <span dir="rtl">المراحل</span>
                </div>
              </button>
            </div>

            {/* Tab content - Map view */}
            <AnimatePresence mode="wait">
              {activeTab === 'map' && (
                <motion.div 
                  key="map-view"
                  className="p-6 min-h-[500px] relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* SVG path connections */}
                  <svg 
                    className="absolute inset-0 w-full h-full z-0" 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
                      </linearGradient>
                      
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    
                    {connections.map((connection, index) => (
                      <motion.path
                        key={connection.id}
                        d={`M${connection.start.x} ${connection.start.y} 
                           C${(connection.start.x + connection.end.x) / 2} ${connection.start.y},
                             ${(connection.start.x + connection.end.x) / 2} ${connection.end.y},
                             ${connection.end.x} ${connection.end.y}`}
                        stroke={connection.completed ? "url(#pathGradient)" : "rgba(255,255,255,0.15)"}
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={connection.completed ? "none" : "5,5"}
                        filter={connection.completed ? "url(#glow)" : ""}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ 
                          duration: 1.2, 
                          delay: 0.3 + (index * 0.1),
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </svg>
                  
                  {/* Stage nodes */}
                  {limitedStages.map((stage, index) => {
                    const isUnlocked = isStageUnlocked(category, stage.id, progress);
                    const isCompleted = progress.completedStages[category]?.[stage.id] || false;
                    const position = calculateStagePosition(index);
                    const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
                    const isHovered = hoveredStage === stage.id;
                    
                    return (
                      <motion.div
                        key={stage.id}
                        className="absolute z-10"
                        style={{ 
                          left: `${position.x}%`, 
                          top: `${position.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1 
                        }}
                        transition={{ 
                          delay: 0.5 + (index * 0.1), 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.button
                                className={cn(
                                  "w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center relative cursor-pointer",
                                  "border-2 backdrop-blur-sm border-white/30 shadow-lg",
                                  getNodeColor(isCompleted, isUnlocked),
                                  !isUnlocked && "opacity-60 grayscale"
                                )}
                                onClick={() => handleStageClick(stage)}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                  boxShadow: isHovered 
                                    ? `0 0 20px 5px ${isCompleted ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`
                                    : `0 0 5px 2px rgba(255, 255, 255, 0.1)`
                                }}
                                transition={{ duration: 0.3 }}
                                disabled={!isUnlocked}
                                onMouseEnter={() => setHoveredStage(stage.id)}
                                onMouseLeave={() => setHoveredStage(null)}
                              >
                                {/* Pulse animation for current stage */}
                                <AnimatePresence>
                                  {isHovered && (
                                    <motion.div 
                                      className="absolute inset-0 rounded-full opacity-70"
                                      initial={{ scale: 1, opacity: 0.7 }}
                                      animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                                      exit={{ scale: 1, opacity: 0 }}
                                      transition={{ 
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                      style={{
                                        background: isCompleted 
                                          ? `radial-gradient(circle, ${levelId === 'beginner' ? '#10b981' : levelId === 'intermediate' ? '#3b82f6' : '#ef4444'} 0%, transparent 70%)` 
                                          : 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
                                      }}
                                    />
                                  )}
                                </AnimatePresence>
                                
                                <div className="relative z-10 flex flex-col items-center justify-center">
                                  <span className="font-bold text-white text-lg">{stage.order}</span>
                                  <div className="mt-0.5">
                                    {getStageIcon(stage.order, isCompleted)}
                                  </div>
                                </div>
                                
                                {!isUnlocked && (
                                  <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 z-20">
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
                        
                        {/* Stage label */}
                        <motion.div 
                          className={cn(
                            "absolute whitespace-nowrap mt-3",
                            "left-1/2 -translate-x-1/2"
                          )}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + (index * 0.1) }}
                        >
                          <span className={cn(
                            "text-xs font-bold px-3 py-1 rounded-full text-white",
                            isCompleted ? "bg-white/20" : "bg-black/30", 
                            "backdrop-blur-md border border-white/10"
                          )}>
                            {stage.title}
                          </span>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                  
                  {/* Navigation hint */}
                  <motion.div 
                    className="absolute bottom-4 right-4 text-white/70 text-sm flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
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
                </motion.div>
              )}
              
              {/* Tab content - List view */}
              {activeTab === 'list' && (
                <motion.div 
                  key="list-view"
                  className="p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2 max-h-[500px] overflow-y-auto p-2">
                    {limitedStages.map((stage, index) => {
                      const isUnlocked = isStageUnlocked(category, stage.id, progress);
                      const isCompleted = progress.completedStages[category]?.[stage.id] || false;
                      const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
                      
                      return (
                        <motion.div
                          key={stage.id}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 + (index * 0.05) }}
                        >
                          <motion.button
                            onClick={() => handleStageClick(stage)}
                            disabled={!isUnlocked}
                            className={cn(
                              "w-full p-3 rounded-xl border text-right flex items-center gap-3 transition-all",
                              isCompleted ? "bg-white/10 border-white/30" :
                              isUnlocked ? "bg-white/5 border-white/20 hover:bg-white/10" :
                              "bg-black/20 border-white/10 opacity-60 cursor-not-allowed"
                            )}
                            dir="rtl"
                            whileHover={isUnlocked ? { scale: 1.02, x: 5 } : {}}
                            whileTap={isUnlocked ? { scale: 0.98 } : {}}
                          >
                            <div className={cn(
                              "h-12 w-12 rounded-full flex items-center justify-center",
                              "border-2 backdrop-blur-sm border-white/30 shadow-md",
                              getNodeColor(isCompleted, isUnlocked)
                            )}>
                              {isCompleted ? (
                                <Check className="h-5 w-5 text-white" />
                              ) : !isUnlocked ? (
                                <Lock className="h-5 w-5 text-white" />
                              ) : (
                                getStageIcon(stage.order, false)
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="font-bold text-white text-lg">
                                {stage.title}
                              </div>
                              <div className="text-sm text-white/70 flex items-center gap-2">
                                {isCompleted ? (
                                  <>
                                    <span>تم الإكمال</span>
                                    <div className="inline-flex">
                                      {renderStars(completionPercentage)}
                                    </div>
                                  </>
                                ) : isUnlocked ? (
                                  <span className="text-blue-300">متاح اللعب</span>
                                ) : (
                                  <span className="text-red-300">مقفل</span>
                                )}
                              </div>
                            </div>
                            
                            <motion.div
                              className="text-white/60"
                              whileHover={{ x: -5 }}
                              animate={{ x: isUnlocked ? [0, 5, 0] : 0 }}
                              transition={{ 
                                repeat: isUnlocked ? Infinity : 0, 
                                repeatType: "reverse", 
                                duration: 1
                              }}
                            >
                              <ArrowLeft className="h-6 w-6" />
                            </motion.div>
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
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
