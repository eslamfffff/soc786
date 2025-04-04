
import React, { useState, useEffect } from 'react';
import { Stage } from '@/data/questions/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import StageMap from './StageMap';
import StageCard from './StageCard';
import { motion, AnimatePresence } from 'framer-motion';
import { loadProgress } from '@/utils/progressUtils';

interface StageSelectionProps {
  stages: Stage[];
  category: string;
  levelId: string;
  onStageSelect: (stageId: string) => void;
  onBackToLevels: () => void;
  completedStage: { stageId: string; stars: number } | null;
}

const StageSelection: React.FC<StageSelectionProps> = ({
  stages,
  category,
  levelId,
  onStageSelect,
  onBackToLevels,
  completedStage
}) => {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [progress, setProgress] = useState(loadProgress());
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  useEffect(() => {
    // Load the latest progress
    setProgress(loadProgress());
    
    // Trigger animation if completedStage is present
    if (completedStage) {
      setShouldAnimate(true);
      
      // Reset animation flag after 5 seconds
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [completedStage]);
  
  const filteredStages = stages.filter(stage => stage.id.startsWith(levelId));
  
  const getLevelName = (levelId: string) => {
    switch(levelId) {
      case 'beginner': return 'المبتدئ';
      case 'intermediate': return 'المتوسط';
      case 'advanced': return 'المتقدم';
      default: return levelId;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onBackToLevels}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>العودة للمستويات</span>
          </Button>
          
          <h2 className="text-2xl font-bold text-center font-cairo" dir="rtl">
            <span className="opacity-70">المستوى:</span> {getLevelName(levelId)}
          </h2>
          
          <div className="w-[100px]">
            {/* Spacer for layout balance */}
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'list'
                  ? 'bg-white dark:bg-slate-700 shadow'
                  : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
              onClick={() => setView('list')}
            >
              قائمة المراحل
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'map'
                  ? 'bg-white dark:bg-slate-700 shadow'
                  : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
              onClick={() => setView('map')}
            >
              خريطة المراحل
            </button>
          </div>
        </div>
        
        {view === 'list' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredStages.map((stage, index) => (
                <motion.div key={stage.id} layoutId={stage.id}>
                  <StageCard 
                    stage={stage}
                    categoryId={category}
                    progress={progress}
                    onClick={() => onStageSelect(stage.id)}
                    index={index}
                    animate={shouldAnimate && completedStage?.stageId === stage.id}
                    starsCount={completedStage?.stageId === stage.id ? completedStage.stars : undefined}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <StageMap 
            stages={stages}
            category={category}
            onStageSelect={onStageSelect}
            onBackToLevels={onBackToLevels}
            levelId={levelId}
          />
        )}
      </div>
    </div>
  );
};

export default StageSelection;
