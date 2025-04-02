
import React, { useState, useEffect, useRef } from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion, useAnimation } from 'framer-motion';
import { Check, Lock, Trophy, Star, ArrowLeft, MapPin, Flag, Award, X, Compass, Ship, Anchor, Skull } from 'lucide-react';
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
  const mapRef = useRef<HTMLDivElement>(null);
  const pathControls = useAnimation();
  
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
    
    // Animate the path first, then reveal the stages
    pathControls.start({
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    });
    
    // Set animation complete after the path is drawn
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
    
    // Scroll to top when changing levels
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
    
    onStageSelect(stage.id);
  };

  // Filter stages by the current level
  const currentLevelStages = stages.filter(stage => stage.id.startsWith(levelId));
  
  // Limit to 10 stages per map as requested
  const limitedStages = currentLevelStages.slice(0, 10);
  
  // Calculate completion statistics
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

  // Calculate paths for the treasure map
  const getPathCoordinates = (index: number, totalStages: number) => {
    // Create a richer, more natural-looking path for the treasure map
    const baseX = 160; // Center of the map
    const startY = 550; // Bottom of the map
    const endY = 50; // Top of the map
    const totalHeight = startY - endY;
    const segmentHeight = totalHeight / (totalStages - 1);
    
    // Make the path more natural looking with some randomness
    // We use the same seed (index + stage ID) to ensure consistent positions
    const seedX = index * 5 + (index % 2 === 0 ? 13 : 7);
    const seedY = index * 3 + (index % 3 === 0 ? 17 : 11);
    
    // Base position
    const y = startY - (index * segmentHeight);
    
    // More natural curves for the path
    const xOffset = Math.sin(index * 0.7) * 80 + Math.cos(seedX) * 20; 
    const yOffset = Math.cos(seedY) * 10;
    
    return { 
      x: baseX + xOffset, 
      y: y + yOffset
    };
  };

  return (
    <div className="relative min-h-screen" ref={mapRef}>
      {/* Treasure Map background */}
      <div 
        className="min-h-screen pb-20 pt-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('/lovable-uploads/c03b91b5-be2d-430c-8eea-e0c0ff3e9b47.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Enhanced lighting and atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 to-amber-800/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/10 to-transparent"></div>
        
        {/* Light rays effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-20 left-1/3 w-96 h-[800px] bg-amber-300/10 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.1, 0.2, 0] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div 
            className="absolute -top-20 right-1/4 w-80 h-[700px] bg-amber-100/5 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0.05, 0.15, 0] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          />
        </div>
        
        {/* Back button and level info */}
        <div className="relative z-20 flex justify-between items-center px-6 py-4 bg-gradient-to-b from-amber-900/30 to-transparent">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Button 
              variant="outline" 
              className="bg-amber-50/90 hover:bg-amber-50 text-amber-900 font-cairo flex items-center gap-2 border-amber-700 shadow-md backdrop-blur-sm"
              onClick={onBackToLevels}
            >
              <ArrowLeft size={18} />
              <span dir="rtl">العودة للمستويات</span>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="bg-amber-50/90 dark:bg-amber-900/90 rounded-lg px-4 py-2 shadow-md border-2 border-amber-700 backdrop-blur-sm"
          >
            <h2 className="text-xl font-bold text-center flex items-center gap-2 justify-center text-amber-900 dark:text-amber-50">
              <Badge className={cn("text-sm", levelColor)}>
                {levelLabel}
              </Badge>
              <span>المستوى {limitedStages.length > 0 ? limitedStages[0].order : 1} - {limitedStages.length > 0 ? limitedStages[limitedStages.length-1].order : 10}</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-amber-50/90 dark:bg-amber-900/90 rounded-lg px-4 py-2 shadow-md border-2 border-amber-700 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center">
              <span className="font-bold text-amber-900 dark:text-amber-50">
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

        {/* Main treasure map path */}
        <div className="container mx-auto max-w-lg px-4 pt-10 z-10 relative">
          {/* The treasure map path */}
          <div className="relative min-h-[600px] w-full">
            {/* Improved path with glow and texture */}
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 320 600" preserveAspectRatio="none">
              {/* Path glow effect */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              
              {/* Path textures */}
              <pattern id="pathPattern" patternUnits="userSpaceOnUse" width="30" height="30">
                <image href="/lovable-uploads/ece5b219-22bb-496e-8cbb-2d07647c2edf.jpeg" width="30" height="30" opacity="0.3" />
              </pattern>
              
              {/* Create improved dotted line path with better visual effects */}
              <motion.path
                d={`M${getPathCoordinates(0, limitedStages.length).x},${getPathCoordinates(0, limitedStages.length).y} 
                   ${Array.from({length: limitedStages.length - 1}, (_, i) => 
                     `L${getPathCoordinates(i + 1, limitedStages.length).x},${getPathCoordinates(i + 1, limitedStages.length).y}`
                   ).join(' ')}`}
                fill="none"
                stroke="url(#pathPattern)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="1, 15"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0.5 }}
                animate={pathControls}
                style={{ filter: "drop-shadow(0 0 8px rgba(180, 83, 9, 0.6))" }}
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
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              />
              
              {/* Footprints along the path */}
              {Array.from({length: limitedStages.length - 1}, (_, i) => {
                const startPoint = getPathCoordinates(i, limitedStages.length);
                const endPoint = getPathCoordinates(i + 1, limitedStages.length);
                const midX = (startPoint.x + endPoint.x) / 2;
                const midY = (startPoint.y + endPoint.y) / 2;
                const stageCompleted = progress.completedStages[category]?.[limitedStages[i]?.id] || false;
                
                return stageCompleted ? (
                  <motion.circle 
                    key={`footprint-${i}`}
                    cx={midX + (Math.random() * 10 - 5)} 
                    cy={midY + (Math.random() * 10 - 5)} 
                    r="3"
                    fill="#8B4513"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 1.5 + (i * 0.1) }}
                  />
                ) : null;
              })}
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
                    delay: 0.8 + (index * 0.15), 
                    duration: 0.5,
                    type: "spring"
                  }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center relative cursor-pointer",
                            isCompleted ? "bg-yellow-500 border-4 border-amber-700 shadow-[0_0_15px_rgba(245,158,11,0.6)]" : 
                            isUnlocked ? "bg-amber-400 border-4 border-amber-700 shadow-lg" : 
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
                            {/* Background texture for the stage markers with better effects */}
                            <div className="w-full h-full bg-gradient-to-br from-amber-300 to-amber-600"></div>
                            <div className="absolute inset-0 bg-[url('/lovable-uploads/ece5b219-22bb-496e-8cbb-2d07647c2edf.jpeg')] opacity-30 mix-blend-overlay"></div>
                            {/* Overlay textures to create depth */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-400/10 to-amber-900/20"></div>
                            {/* Inner shadow for depth */}
                            <div className="absolute inset-0 shadow-inner rounded-full"></div>
                          </div>
                          
                          {/* Stage number */}
                          <div className="relative z-10 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{stage.order}</span>
                            <div className="mt-1">
                              {getStageIcon(stage.order, isCompleted)}
                            </div>
                          </div>
                          
                          {/* Lock overlay for locked stages */}
                          {!isUnlocked && (
                            <motion.div 
                              className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 z-20"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1 + (index * 0.1) }}
                            >
                              <Lock className="h-7 w-7 text-white drop-shadow-lg" />
                            </motion.div>
                          )}
                          
                          {/* Stars below the stage icon */}
                          {(isCompleted || (isUnlocked && completionPercentage > 0)) && (
                            <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 z-10">
                              {renderStars(completionPercentage)}
                            </div>
                          )}
                          
                          {/* Enhanced glow effect for the next unlocked stage */}
                          {isUnlocked && !isCompleted && (
                            <motion.div 
                              className="absolute inset-0 rounded-full"
                              animate={{ 
                                boxShadow: ['0 0 5px 2px rgba(255,204,0,0.3)', '0 0 20px 8px rgba(255,204,0,0.6)', '0 0 5px 2px rgba(255,204,0,0.3)']
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
                      <TooltipContent 
                        className="bg-amber-800 border-amber-600 shadow-xl"
                        sideOffset={5}
                        side="top"
                      >
                        <div className="text-center text-amber-50 font-cairo p-1" dir="rtl">
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
                  
                  {/* Stage title bubble with improved styling */}
                  <div className="absolute mt-8 left-1/2 -translate-x-1/2 min-w-[80px] text-center">
                    <motion.div
                      className="stage-bubble-text bg-amber-900/80 text-amber-50 font-cairo font-bold text-xs py-1 px-2 rounded-lg whitespace-nowrap border border-amber-600/50 shadow-md backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 10 }}
                      transition={{ delay: 0.8 + (index * 0.15) }}
                    >
                      {stage.title}
                    </motion.div>
                  </div>
                  
                  {/* Enhanced decorative elements around the map - more varied and thematic */}
                  {index % 2 === 0 && (
                    <motion.div 
                      className="absolute"
                      style={{ 
                        top: Math.random() * 100 - 50, 
                        left: Math.random() * 100 - 50,
                        zIndex: -1,
                        rotate: Math.random() * 40 - 20
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.8, scale: 1 }}
                      transition={{ delay: 1.5 + (index * 0.1) }}
                    >
                      <img 
                        src="/lovable-uploads/d6dbdcbd-c9dd-48f4-be1c-8b1c0ab0a39e.png" 
                        className="w-10 h-10 object-contain opacity-80 drop-shadow-lg"
                        alt="Map decoration"
                      />
                    </motion.div>
                  )}
                  
                  {/* Add extra thematic decorations for milestone stages */}
                  {(stage.order === 5 || stage.order === 10) && (
                    <motion.div
                      className="absolute -right-10 -top-6 z-0"
                      initial={{ opacity: 0, scale: 0, rotate: -10 }}
                      animate={{ opacity: 0.9, scale: 1, rotate: 5 }}
                      transition={{ delay: 1.7 + (index * 0.1), duration: 0.7 }}
                    >
                      {stage.order === 10 ? (
                        <div className="w-14 h-14 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Trophy className="h-14 w-14 text-yellow-500 drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]" />
                          </motion.div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: [0, 3, -3, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Flag className="h-12 w-12 text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
            
            {/* Enhanced decorative elements on the map with animations */}
            <motion.div
              className="absolute top-1/4 right-5 opacity-80 z-0"
              initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
              animate={{ opacity: 0.8, rotate: 0, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Compass className="h-14 w-14 text-amber-800 drop-shadow-lg" />
              </motion.div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-1/4 left-5 opacity-70 z-0"
              initial={{ opacity: 0, rotate: 20, scale: 0.8 }}
              animate={{ opacity: 0.7, rotate: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0, 5, 0], rotate: [0, -3, 0, 3, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Ship className="h-12 w-12 text-amber-800 drop-shadow-lg" />
              </motion.div>
            </motion.div>
            
            {/* Add water ripple effect near the bottom */}
            <motion.div
              className="absolute bottom-10 right-20 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <motion.div
                className="w-28 h-28 rounded-full border-2 border-blue-500/20 absolute"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 6, repeat: Infinity, repeatDelay: 2 }}
              />
              <motion.div
                className="w-28 h-28 rounded-full border-2 border-blue-500/30 absolute"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 4, repeat: Infinity, delay: 1, repeatDelay: 2 }}
              />
              <div className="w-8 h-8 absolute top-10 left-10">
                <Anchor className="h-8 w-8 text-blue-500/60" />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Improved footer messaging */}
        <div className="mt-16 text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            <p className="text-amber-50 font-cairo text-lg bg-amber-900/60 mx-auto max-w-md rounded-lg p-3 backdrop-blur-sm border border-amber-600/50 shadow-lg" dir="rtl">
              اتبع مسار الكنز وأكمل كل مرحلة للوصول إلى الجائزة النهائية!
            </p>
          </motion.div>
        </div>
        
        {/* Animated background particles for atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-amber-200/40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, -200],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                repeatType: 'loop',
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StageMap;
