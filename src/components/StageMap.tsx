
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
        return "bg-gradient-to-b from-green-500 to-green-700";
      case 'intermediate':
        return "bg-gradient-to-b from-blue-500 to-blue-700";
      case 'advanced':
        return "bg-gradient-to-b from-red-500 to-red-700";
      default:
        return "bg-gradient-to-b from-green-500 to-green-700";
    }
  };

  // Get background image based on level
  const getBackgroundImage = () => {
    switch(levelId) {
      case 'beginner': return "url('/lovable-uploads/eecd19c1-0ef2-492d-bc35-8cc44d278946.png')";
      case 'intermediate': return "url('/lovable-uploads/eecd19c1-0ef2-492d-bc35-8cc44d278946.png')";
      case 'advanced': return "url('/lovable-uploads/eecd19c1-0ef2-492d-bc35-8cc44d278946.png')";
      default: return "url('/lovable-uploads/eecd19c1-0ef2-492d-bc35-8cc44d278946.png')";
    }
  };

  // Get stage icon based on order
  const getStageIcon = (order: number, isCompleted: boolean, isUnlocked: boolean) => {
    // Special stages
    if (order === 20) return <Flag className="h-5 w-5 text-red-500" />;
    if (order === 1) return <MapPin className="h-5 w-5 text-blue-500" />;
    if (order % 5 === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    
    // Regular stages
    if (isCompleted) return <Check className="h-4 w-4 text-green-500" />;
    if (isUnlocked) return <Unlock className="h-4 w-4 text-blue-500" />;
    return <Lock className="h-4 w-4 text-gray-500" />;
  };

  // Create path elements to connect stages
  const renderStagePaths = () => {
    // Only render paths if animation is complete
    if (!animationComplete || currentLevelStages.length <= 1) return null;
    
    const paths = [];
    for (let i = 0; i < currentLevelStages.length - 1; i++) {
      const isCurrentUnlocked = isStageUnlocked(category, currentLevelStages[i].id, progress);
      const isNextUnlocked = isStageUnlocked(category, currentLevelStages[i+1].id, progress);
      
      paths.push(
        <motion.div 
          key={`path-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 + 0.3, duration: 0.5 }}
          className="absolute z-0"
          style={{
            left: `${(i % 5) * 20 + 10}%`,  
            top: `${Math.floor(i / 5) * 120 + 80}px`,
            width: '15%',
            height: '40px',
            backgroundImage: `linear-gradient(90deg, 
              ${isCurrentUnlocked ? 'rgba(34, 197, 94, 0.6)' : 'rgba(156, 163, 175, 0.4)'}, 
              ${isNextUnlocked ? 'rgba(34, 197, 94, 0.6)' : 'rgba(156, 163, 175, 0.4)'}
            )`,
            clipPath: 'polygon(0 45%, 100% 45%, 100% 55%, 0 55%)'
          }}
        />
      );
    }
    return paths;
  };

  return (
    <div className="relative min-h-screen">
      {/* Map background */}
      <div className={cn(
        "min-h-screen pb-20 pt-4 relative overflow-hidden",
        getLevelBackground()
      )}>
        {/* Field markings */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: getBackgroundImage() }} />
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
            <h2 className="text-xl font-bold text-center flex items-center gap-2 justify-center">
              <Badge className={cn("text-sm", levelColor)}>
                {levelLabel}
              </Badge>
              <span>المستوى {currentLevelStages.length > 0 ? currentLevelStages[0].order : 1} - {currentLevelStages.length > 0 ? currentLevelStages[currentLevelStages.length-1].order : 20}</span>
            </h2>
          </div>
          
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg px-4 py-2 shadow-md">
            <span className="font-bold text-slate-800 dark:text-white">
              {totalCompletedStages} / {stages.length} مرحلة
            </span>
          </div>
        </div>
        
        {/* Render connecting paths between stages */}
        <div className="relative mx-auto max-w-4xl px-4 mt-8 z-0">
          {renderStagePaths()}
        </div>
        
        {/* Map grid container */}
        <div className="relative mx-auto max-w-4xl px-4 mt-8 z-10">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
            {currentLevelStages.map((stage, index) => {
              const isUnlocked = isStageUnlocked(category, stage.id, progress);
              const isCompleted = progress.completedStages[category]?.[stage.id] || false;
              const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
              
              // Special stages get different styling
              const isSpecialStage = stage.order === 1 || stage.order === 5 || 
                                    stage.order === 10 || stage.order === 15 || 
                                    stage.order === 20;
              
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
                          "stage-card p-2 relative flex flex-col items-center justify-center cursor-pointer",
                          isCompleted ? "opacity-100" : isUnlocked ? "opacity-100" : "opacity-70"
                        )}
                        onClick={() => handleStageClick(stage)}
                      >
                        <div 
                          className={cn(
                            "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg relative border-4",
                            isSpecialStage && "stage-checkpoint",
                            isCompleted ? "bg-green-500 border-green-300" : 
                            isUnlocked ? "bg-blue-500 border-blue-300" : 
                            "bg-gray-500 border-gray-400"
                          )}
                        >
                          {/* Stage number */}
                          <span className="text-2xl">{stage.order}</span>
                          
                          {/* Status icon */}
                          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-md">
                            {getStageIcon(stage.order, isCompleted, isUnlocked)}
                          </div>
                          
                          {/* Animate completed stages */}
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(0,0,0,0) 70%)',
                                zIndex: -1,
                              }}
                            />
                          )}
                          
                          {/* Stars for completed stages */}
                          {isCompleted && (
                            <div className="absolute -bottom-3 flex space-x-1 bg-white/80 dark:bg-slate-800/80 rounded-full px-1 py-0.5 shadow-sm">
                              <Star className={cn("h-3 w-3", completionPercentage >= 30 ? "text-yellow-400" : "text-gray-300")} />
                              <Star className={cn("h-3 w-3", completionPercentage >= 60 ? "text-yellow-400" : "text-gray-300")} />
                              <Star className={cn("h-3 w-3", completionPercentage >= 90 ? "text-yellow-400" : "text-gray-300")} />
                            </div>
                          )}
                          
                          {/* Trophy for milestone stages (every 5th stage) */}
                          {stage.order % 5 === 0 && (
                            <div className="absolute -bottom-6 -right-6 w-8 h-8 rounded-full flex items-center justify-center bg-yellow-400 shadow-md">
                              <Trophy className="h-5 w-5 text-white" />
                            </div>
                          )}
                          
                          {/* Starting flag */}
                          {stage.order === 1 && (
                            <div className="absolute -top-6 -left-6 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 shadow-md">
                              <MapPin className="h-5 w-5 text-white" />
                            </div>
                          )}
                          
                          {/* Finish flag */}
                          {stage.order === currentLevelStages.length && (
                            <div className="absolute -bottom-6 -left-6 w-8 h-8 rounded-full flex items-center justify-center bg-red-500 shadow-md">
                              <Flag className="h-5 w-5 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-2 text-center">
                          <span className="stage-bubble-text">
                            {stage.title || `المرحلة ${stage.order}`}
                          </span>
                        </div>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-cairo" dir="rtl">
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
        
        <div className="mt-10 text-center relative z-10">
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
        
        {/* Animated particles for visual interest */}
        {animationComplete && Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ y: -20, x: Math.random() * 100, opacity: 0 }}
            animate={{ 
              y: [Math.random() * 100, Math.random() * 500], 
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              opacity: [0, 0.7, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: i * 2
            }}
            className="absolute w-3 h-3 rounded-full bg-white/30 z-0"
          />
        ))}
      </div>
    </div>
  );
};

export default StageMap;
