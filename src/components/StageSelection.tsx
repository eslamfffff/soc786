
import React from 'react';
import { Stage } from '@/data/questions/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loadProgress } from '@/utils/progressUtils';
import StageCard from './StageCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface StageSelectionProps {
  stages: Stage[];
  category: string;
  levelId: string;
  onStageSelect: (stageId: string) => void;
  onBackToLevels: () => void;
}

const StageSelection: React.FC<StageSelectionProps> = ({ 
  stages, 
  category, 
  levelId, 
  onStageSelect, 
  onBackToLevels 
}) => {
  const progress = loadProgress();
  const isMobile = useIsMobile();
  
  // Filter stages by selected level
  const currentLevelStages = stages.filter(stage => stage.id.startsWith(levelId));
  const limitedStages = currentLevelStages.slice(0, 10);
  
  // Calculate completion statistics
  const totalCompletedStages = Object.keys(progress.completedStages?.[category] || {})
    .filter(stageId => stageId.startsWith(levelId) && progress.completedStages[category][stageId])
    .length;
  
  const completionPercentage = limitedStages.length > 0 
    ? Math.round((totalCompletedStages / limitedStages.length) * 100) 
    : 0;
  
  // Get level information for styling
  const levelLabel = levelId === 'beginner' ? 'مبتدئ' : 
                    levelId === 'intermediate' ? 'متوسط' : 'متقدم';
  
  const levelColor = levelId === 'beginner' ? 'text-emerald-600 dark:text-emerald-400' : 
                    levelId === 'intermediate' ? 'text-blue-600 dark:text-blue-400' : 
                    'text-red-600 dark:text-red-400';
                    
  const levelBgColor = levelId === 'beginner' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 
                      levelId === 'intermediate' ? 'bg-blue-50 dark:bg-blue-900/20' : 
                      'bg-red-50 dark:bg-red-900/20';
  
  const handleStageClick = (stageId: string) => {
    onStageSelect(stageId);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-8 gap-4 flex-wrap"
      >
        <Button 
          variant="outline" 
          size="sm"
          className="font-medium flex items-center gap-2"
          onClick={onBackToLevels}
        >
          <ArrowLeft size={16} />
          <span dir="rtl">العودة للمستويات</span>
        </Button>
        
        <div className="flex items-center gap-2 text-lg font-bold" dir="rtl">
          <Home className="h-5 w-5" />
          <span className={levelColor}>{levelLabel}</span>
          <span>({totalCompletedStages}/{limitedStages.length})</span>
        </div>
      </motion.div>
      
      <div className={cn(
        "rounded-xl p-4 mb-6",
        levelBgColor
      )}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold" dir="rtl">التقدم</h2>
          <span className="text-lg font-bold">{completionPercentage}%</span>
        </div>
        
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className={cn(
              "h-full",
              levelId === 'beginner' ? 'bg-emerald-500' :
              levelId === 'intermediate' ? 'bg-blue-500' :
              'bg-red-500'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
      
      <motion.div 
        className={cn(
          "grid gap-4",
          isMobile ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        )}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {limitedStages.map((stage, index) => (
          <StageCard
            key={stage.id}
            stage={stage}
            categoryId={category}
            progress={progress}
            onClick={() => handleStageClick(stage.id)}
            index={index}
          />
        ))}
      </motion.div>
      
      <div className="text-center mt-10 text-gray-500 dark:text-gray-400 text-sm">
        <p dir="rtl">استكشف رحلتك المعرفية وأكمل كل المراحل للحصول على الجوائز!</p>
      </div>
    </div>
  );
};

export default StageSelection;
