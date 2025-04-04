
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

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  // Animate path for progress bar
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: completionPercentage / 100,
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
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
      
      <motion.div 
        className={cn(
          "rounded-xl p-4 mb-6",
          levelBgColor
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          delay: 0.2
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold" dir="rtl">التقدم</h2>
          <span className="text-lg font-bold">{completionPercentage}%</span>
        </div>
        
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
          {/* Animated progress track */}
          <motion.div 
            className={cn(
              "absolute top-0 left-0 h-full rounded-full",
              levelId === 'beginner' ? 'bg-emerald-500' :
              levelId === 'intermediate' ? 'bg-blue-500' :
              'bg-red-500'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          />
          
          {/* Animated glowing effect */}
          {completionPercentage > 0 && (
            <motion.div 
              className="absolute top-0 left-0 h-full rounded-full bg-white opacity-40"
              initial={{ width: 0 }}
              animate={{
                width: [`${completionPercentage}%`, `${completionPercentage}%`],
                opacity: [0.4, 0.1, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          {/* Stars above progress bar for achievements */}
          {completionPercentage >= 30 && (
            <motion.div 
              className="absolute -top-3 left-[30%] transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
            >
              <div className="bg-amber-400 rounded-full p-1 shadow-glow">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </motion.div>
          )}
          
          {completionPercentage >= 70 && (
            <motion.div 
              className="absolute -top-3 left-[70%] transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.3 }}
            >
              <div className="bg-amber-400 rounded-full p-1 shadow-glow">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </motion.div>
          )}
          
          {completionPercentage >= 100 && (
            <motion.div 
              className="absolute -top-3 left-[100%] transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1, duration: 0.3 }}
            >
              <div className="bg-amber-400 rounded-full p-1 shadow-glow">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <motion.div 
        className={cn(
          "grid gap-4",
          isMobile ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        )}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {limitedStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <StageCard
              stage={stage}
              categoryId={category}
              progress={progress}
              onClick={() => handleStageClick(stage.id)}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="text-center mt-10 text-gray-500 dark:text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p dir="rtl">استكشف رحلتك المعرفية وأكمل كل المراحل للحصول على الجوائز!</p>
      </motion.div>
    </div>
  );
};

export default StageSelection;
