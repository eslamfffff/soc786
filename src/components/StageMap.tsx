
import React, { useState, useEffect } from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, Lock, Unlock, Trophy, Star, ArrowLeft } from 'lucide-react';
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

  // Get background image based on level
  const getBackgroundImage = () => {
    switch(levelId) {
      case 'beginner': return "url('/lovable-uploads/eecd19c1-0ef2-492d-bc35-8cc44d278946.png')";
      case 'intermediate': return "url('/lovable-uploads/eecd19c1-0ef2-492d-bc35-8cc44d278946.png')";
      case 'advanced': return "url('/lovable-uploads/eecd19c1-0ef2-492d-bc35-8cc44d278946.png')";
      default: return "url('/lovable-uploads/eecd19c1-0ef2-492d-bc35-8cc44d278946.png')";
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Map background */}
      <div className="bg-gradient-to-b from-green-600 to-green-700 min-h-screen pb-20 pt-4 relative overflow-hidden">
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
          
          <div className="bg-white/90 rounded-lg px-4 py-2 shadow-md">
            <h2 className="text-xl font-bold text-center flex items-center gap-2 justify-center">
              <Badge className={cn("text-sm", levelColor)}>
                {levelLabel}
              </Badge>
              <span>المستوى {currentLevelStages.length > 0 ? currentLevelStages[0].order : 1} - {currentLevelStages.length > 0 ? currentLevelStages[currentLevelStages.length-1].order : 20}</span>
            </h2>
          </div>
          
          <div className="bg-white/90 rounded-lg px-4 py-2 shadow-md">
            <span className="font-bold">
              {totalCompletedStages} / {stages.length} مرحلة
            </span>
          </div>
        </div>
        
        {/* Map grid container */}
        <div className="relative mx-auto max-w-4xl px-4 mt-8 z-10">
          <div className="grid grid-cols-4 gap-4 md:gap-6">
            {currentLevelStages.map((stage, index) => {
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
                          "stage-card p-2 relative flex flex-col items-center justify-center cursor-pointer",
                          isCompleted ? "opacity-100" : isUnlocked ? "opacity-100" : "opacity-70"
                        )}
                        onClick={() => handleStageClick(stage)}
                      >
                        <div 
                          className={cn(
                            "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg relative border-4",
                            isCompleted ? "bg-green-500 border-green-300" : 
                            isUnlocked ? "bg-blue-500 border-blue-300" : 
                            "bg-gray-500 border-gray-400"
                          )}
                        >
                          {/* Stage number */}
                          <span className="text-2xl">{stage.order}</span>
                          
                          {/* Status icon */}
                          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center bg-white shadow-md">
                            {isCompleted ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : isUnlocked ? (
                              <Unlock className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Lock className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                          
                          {/* Stars for completed stages */}
                          {isCompleted && (
                            <div className="absolute -bottom-3 flex space-x-1 bg-white/80 rounded-full px-1 py-0.5 shadow-sm">
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
                        </div>
                        
                        <div className="mt-2 text-center">
                          <span className="text-xs font-medium bg-white/90 px-2 py-1 rounded shadow-sm inline-block">
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
            أكمل كل مرحلة للتقدم في مسيرتك الكروية!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StageMap;
