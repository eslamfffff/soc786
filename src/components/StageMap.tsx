
import React, { useState } from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, Lock, Unlock, Trophy, Star, Heart, Settings, Users } from 'lucide-react';
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
  const [stats, setStats] = useState({
    lives: 3,
    correctAnswers: 240,
    starsEarned: 63,
    currentStage: 32
  });

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

  // Calculate completion statistics
  const totalCompletedStages = Object.values(progress.completedStages[category] || {})
    .filter(Boolean).length;
  
  const averageCompletion = Object.values(progress.stageCompletion[category] || {})
    .reduce((sum, val) => sum + val, 0) / 
    (Object.values(progress.stageCompletion[category] || {}).length || 1);

  // Get player level based on completed stages (1 level per 2 completed stages)
  const playerLevel = Math.max(1, Math.floor(totalCompletedStages / 2));
  
  // Determine player milestone based on level
  const getMilestone = (level: number) => {
    if (level >= 31) return "Legendary Status";
    if (level >= 21) return "International Call-Up";
    if (level >= 11) return "Professional Debut";
    return "Youth Academy";
  };
  
  const currentMilestone = getMilestone(playerLevel);
  
  // Filter stages by level (we'll display them in a curved path)
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);

  return (
    <div className="relative">
      {/* Football field background */}
      <div className="bg-gradient-to-b from-green-600 to-green-700 min-h-screen pb-20 pt-4 relative overflow-hidden">
        {/* Field markings */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full bg-[url('/lovable-uploads/eecd19c1-0ef2-492d-bc35-8cc44d278946.png')] bg-cover bg-center" />
        </div>
        
        {/* Stats Bar at the top */}
        <div className="relative z-10 mb-10 flex justify-between items-center px-4">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-2 shadow-md flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="font-bold text-gray-800">{stats.lives}</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg px-4 py-2 shadow-md">
            <h2 className="text-xl font-bold text-center">Level {playerLevel}: {currentMilestone}</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2 shadow-md flex items-center space-x-2">
              <div className="bg-blue-500 rounded-full p-1">
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
              <span className="font-bold text-gray-800">{stats.starsEarned}</span>
            </div>
            
            <div className="bg-white rounded-full p-2 shadow-md">
              <div className="bg-blue-200 rounded-full p-1">
                <span className="font-bold text-gray-800">{stats.correctAnswers}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Player Stats Card */}
        <div className="mx-auto max-w-md bg-white rounded-lg shadow-lg p-4 mb-8 relative z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">Player Stats</h3>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {totalCompletedStages}/{stages.length} Stages
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-gray-600 text-sm">Accuracy</div>
              <div className="text-xl font-bold">{Math.round(averageCompletion)}%</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-sm">Milestone</div>
              <div className="text-xl font-bold">
                {playerLevel >= 30 ? "⭐⭐⭐" : 
                 playerLevel >= 20 ? "⭐⭐" : 
                 playerLevel >= 10 ? "⭐" : "🔰"}
              </div>
            </div>
          </div>
        </div>

        {/* Curved Path with Stages */}
        <div className="relative mx-auto max-w-3xl px-4 pb-20 z-10">
          {/* Dotted path (using SVG for better curves) */}
          <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 400 1000" preserveAspectRatio="none">
            <path 
              d="M200,20 C100,120 300,300 150,400 C50,480 250,600 150,700 C50,800 300,900 200,980" 
              fill="none" 
              stroke="white" 
              strokeWidth="5" 
              strokeDasharray="10,10"
              className="path-animation"
            />
          </svg>
          
          {/* Actual Stages */}
          <div className="relative z-10">
            {sortedStages.slice(0, 20).map((stage, index) => {
              const isUnlocked = isStageUnlocked(category, stage.id, progress);
              const isCompleted = progress.completedStages[category]?.[stage.id] || false;
              const completionPercentage = progress.stageCompletion[category]?.[stage.id] || 0;
              
              // Calculate position along the path
              const leftPos = index % 2 === 0 ? '10%' : 
                           index % 3 === 0 ? '70%' : '40%';
              const topSpacing = 120; // Space between stages
              
              return (
                <TooltipProvider key={stage.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: isUnlocked ? 1.1 : 1 }}
                        className="absolute"
                        style={{
                          left: leftPos,
                          top: `${index * topSpacing}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => handleStageClick(stage)}
                      >
                        <div 
                          className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl relative",
                            isCompleted ? "bg-red-500" : 
                            isUnlocked ? "bg-blue-500" : 
                            "bg-gray-500"
                          )}
                        >
                          {/* Stage number */}
                          {stage.order}
                          
                          {/* Stars at the top (based on completion %) */}
                          {isCompleted && (
                            <div className="absolute -top-6 flex space-x-1">
                              <Star 
                                className={cn(
                                  "h-4 w-4", 
                                  completionPercentage >= 30 ? "text-yellow-400" : "text-gray-400"
                                )} 
                              />
                              <Star 
                                className={cn(
                                  "h-4 w-4", 
                                  completionPercentage >= 60 ? "text-yellow-400" : "text-gray-400"
                                )} 
                              />
                              <Star 
                                className={cn(
                                  "h-4 w-4", 
                                  completionPercentage >= 90 ? "text-yellow-400" : "text-gray-400"
                                )} 
                              />
                            </div>
                          )}
                          
                          {/* Status icon */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center bg-white">
                            {isCompleted ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : isUnlocked ? (
                              <Unlock className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Lock className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                          
                          {/* Trophy for milestone stages */}
                          {[5, 10, 15, 20].includes(stage.order) && (
                            <div className="absolute -bottom-6 -right-6 w-8 h-8 rounded-full flex items-center justify-center bg-yellow-400">
                              <Trophy className="h-5 w-5 text-white" />
                            </div>
                          )}
                        </div>
                        
                        {/* Stage name (only for important stages) */}
                        {[1, 5, 10, 15, 20].includes(stage.order) && (
                          <div className="absolute -bottom-8 w-24 text-center left-1/2 transform -translate-x-1/2">
                            <span className="text-xs font-bold bg-white px-2 py-1 rounded-md shadow-sm text-gray-800">
                              {stage.title}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-cairo" dir="rtl">
                        {stage.title}
                        <br />
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
        
        {/* Bottom navigation bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-3 flex justify-between items-center z-20">
          <button className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <Settings className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <span className="font-bold text-gray-800">My Football Career</span>
          </div>
          
          <button className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <Users className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageMap;
