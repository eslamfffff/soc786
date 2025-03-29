import React from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, Lock, Unlock, Trophy, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { loadProgress, isStageUnlocked } from '@/utils/progressUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StageMapProps {
  stages: Stage[];
  category: string;
  onStageSelect: (stageId: string) => void;
}

const StageMap: React.FC<StageMapProps> = ({ stages, category, onStageSelect }) => {
  const { toast } = useToast();
  const progress = loadProgress();

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

  // Make sure completedStages and stageCompletion are properly initialized
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

  // Group stages by level for easier rendering
  const stagesByLevel: Record<string, Stage[]> = {
    'easy': stages.filter(s => s.level === 'easy'),
    'medium': stages.filter(s => s.level === 'medium'),
    'hard': stages.filter(s => s.level === 'hard'),
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-10 font-cairo" dir="rtl">خريطة المراحل</h2>
      
      {Object.entries(stagesByLevel).map(([level, levelStages]) => {
        if (levelStages.length === 0) return null;
        
        return (
          <div key={level} className="mb-16">
            <h3 className="text-2xl font-bold mb-6 font-cairo flex items-center" dir="rtl">
              {level === 'easy' && (
                <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                  سهل
                </Badge>
              )}
              {level === 'medium' && (
                <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                  متوسط
                </Badge>
              )}
              {level === 'hard' && (
                <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                  صعب
                </Badge>
              )}
              <span>المراحل {levelStages.length}</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {levelStages.map((stage) => {
                const isUnlocked = isStageUnlocked(category, stage.id, progress);
                const isCompleted = progress.completedStages[category]?.[stage.id] || false;
                const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
                
                return (
                  <TooltipProvider key={stage.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
                          className={cn(
                            "stage-card relative rounded-lg p-4 border-2 aspect-square flex flex-col items-center justify-center cursor-pointer",
                            isUnlocked && !isCompleted && "border-primary bg-primary/5 hover:bg-primary/10",
                            isCompleted && "border-green-500 bg-green-50 dark:bg-green-900/20",
                            !isUnlocked && "border-gray-300 bg-gray-100 dark:bg-gray-800/50 opacity-60",
                          )}
                          onClick={() => handleStageClick(stage)}
                        >
                          <div className="absolute top-2 right-2">
                            {isCompleted ? (
                              <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full">
                                <Check size={16} />
                              </div>
                            ) : !isUnlocked ? (
                              <div className="w-8 h-8 flex items-center justify-center bg-gray-500 text-white rounded-full">
                                <Lock size={16} />
                              </div>
                            ) : (
                              <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                                <Unlock size={16} />
                              </div>
                            )}
                          </div>
                          
                          <div className="text-3xl mb-3">
                            {stage.level === 'easy' && '⚽️'}
                            {stage.level === 'medium' && '⚽⚽'}
                            {stage.level === 'hard' && '⚽⚽⚽'}
                          </div>
                          
                          <h4 className="text-lg font-bold text-center mb-1 font-cairo" dir="rtl">
                            {stage.title}
                          </h4>
                          
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            المرحلة {stage.order}
                          </div>
                          
                          {isCompleted && (
                            <div className="mt-3 flex items-center text-green-600 dark:text-green-400">
                              <Star size={16} className="mr-1" />
                              <span>{completionPercentage}%</span>
                            </div>
                          )}
                          
                          {!isUnlocked && stage.unlockRule.startsWith('complete-stage') && (
                            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                              يتطلب إكمال المرحلة السابقة
                            </div>
                          )}
                          
                          {stage.reward && (
                            <div className="mt-2 flex items-center">
                              <Trophy size={14} className="text-yellow-500 mr-1" />
                              <span className="text-xs">{stage.reward.coins} نقطة</span>
                            </div>
                          )}
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-cairo" dir="rtl">
                          {isCompleted ? "تم الإكمال! النسبة: " + completionPercentage + "%" : 
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
        );
      })}
    </div>
  );
};

export default StageMap;
