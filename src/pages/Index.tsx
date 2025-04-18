import { useState, useEffect } from "react";
import { getQuestionsByCategoryAndLevel } from "@/data/questions";
import categories from "@/data/categories";
import QuizCard from "@/components/QuizCard";
import CategorySelection from "@/components/CategorySelection";
import LevelSelection from "@/components/LevelSelection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { loadProgress, isLevelUnlocked, getUniqueQuestions } from "@/utils/progressUtils";
import { useToast } from "@/hooks/use-toast";
import StageSelection from "@/components/StageSelection";
import StageQuiz from "@/components/StageQuiz";
import StageComplete from "@/components/StageComplete";
import { Stage } from "@/data/questions/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const generateStages = (level: string): Stage[] => {
  const stages: Stage[] = [];
  
  const stageDifficulty = level === 'beginner' ? 'easy' : 
                         level === 'intermediate' ? 'medium' : 'hard';
  
  const specialTitles: Record<number, string> = {
    1: 'البداية',
    3: 'المرحلة الوسطى',
    5: 'منتصف الطريق',
    8: 'اقتربت',
    10: 'النهائي'
  };
  
  for (let i = 1; i <= 10; i++) {
    stages.push({
      id: `${level}-${i}`,
      title: specialTitles[i] || `المرحلة ${i}`,
      level: stageDifficulty as 'easy' | 'medium' | 'hard',
      order: i,
      unlockRule: i === 1 ? 'none' : `complete-stage-${i-1}`,
      reward: {
        coins: i * 50,
        badge: i === 10 ? "إتمام المستوى" : undefined
      }
    });
  }
  
  return stages;
};

export const STAGES: Record<string, Stage[]> = {
  "football": [
    ...generateStages('beginner'),
    ...generateStages('intermediate'),
    ...generateStages('advanced')
  ],
  "islam": [
    ...generateStages('beginner'),
    ...generateStages('intermediate'),
    ...generateStages('advanced')
  ],
  "science": [
    ...generateStages('beginner'),
    ...generateStages('intermediate'),
    ...generateStages('advanced')
  ],
  "history": [
    ...generateStages('beginner'),
    ...generateStages('intermediate'),
    ...generateStages('advanced')
  ],
  "geography": [
    ...generateStages('beginner'),
    ...generateStages('intermediate'),
    ...generateStages('advanced')
  ]
};

export enum ViewMode {
  CATEGORIES = 'categories',
  LEVELS = 'levels',
  STAGES = 'stages',
  QUIZ = 'quiz',
  STAGE_QUIZ = 'stage_quiz',
  STAGE_COMPLETE = 'stage_complete',
}

export default function Index() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.CATEGORIES);
  const { theme } = useTheme();
  const [quizStats, setQuizStats] = useState({
    score: 0,
    correctAnswers: 0,
    totalQuestions: 10
  });

  useEffect(() => {
    const isDarkMode = theme === 'dark';
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }

    return () => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      }
    };
  }, [theme]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setViewMode(ViewMode.LEVELS);
  };

  const handleLevelSelect = (categoryId: string, levelId: string) => {
    const progress = loadProgress();
    if (!isLevelUnlocked(categoryId, levelId, progress)) {
      toast({
        title: "المستوى مقفل",
        description: "يجب إكمال المستوى السابق أولاً",
        variant: "destructive",
      });
      return;
    }

    setSelectedLevel(levelId);
    setViewMode(ViewMode.STAGES);
  };

  const handleStageSelect = (stageId: string) => {
    if (!selectedCategory || !selectedLevel) return;
    
    const categoryStages = STAGES[selectedCategory];
    const levelStages = categoryStages.filter(stage => stage.id.startsWith(selectedLevel));
    
    const stage = levelStages.find(s => s.id === stageId) || null;
    if (!stage) return;
    
    setSelectedStage(stage);
    setViewMode(ViewMode.STAGE_QUIZ);
    
    const allLevelQuestions = getQuestionsByCategoryAndLevel(selectedCategory, selectedLevel);
    
    const questionsPerStage = 10;
    
    const uniqueQuestions = getUniqueQuestions(
      allLevelQuestions,
      selectedCategory,
      selectedLevel,
      questionsPerStage,
      stageId
    );
    
    setCurrentQuestions(uniqueQuestions);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedLevel(null);
    setSelectedStage(null);
    setViewMode(ViewMode.CATEGORIES);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setSelectedStage(null);
    setViewMode(ViewMode.LEVELS);
  };

  const handleBackToStages = () => {
    setSelectedStage(null);
    setViewMode(ViewMode.STAGES);
  };

  const handleStageComplete = (completed: boolean, percentage: number, stats: { 
    score: number, 
    correctAnswers: number,
    totalQuestions: number 
  }) => {
    setQuizStats(stats);
    setViewMode(ViewMode.STAGE_COMPLETE);
  };

  const handleNextStage = () => {
    if (!selectedCategory || !selectedLevel || !selectedStage) return;
    
    const categoryStages = STAGES[selectedCategory];
    const levelStages = categoryStages.filter(stage => stage.id.startsWith(selectedLevel));
    
    const currentStageIndex = levelStages.findIndex(s => s.id === selectedStage.id);
    
    if (currentStageIndex >= 0 && currentStageIndex < levelStages.length - 1) {
      const nextStage = levelStages[currentStageIndex + 1];
      setSelectedStage(null);
      setTimeout(() => {
        handleStageSelect(nextStage.id);
      }, 100);
    } else {
      handleBackToStages();
    }
  };

  const getBackgroundClass = () => {
    if (!selectedCategory) return theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100';
    
    const category = categories.find(cat => cat.id === selectedCategory);
    if (!category) return theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100';
    
    return theme === 'dark' ? category.darkBackgroundColor : category.backgroundColor;
  };

  const getCurrentCategory = () => {
    if (!selectedCategory) return null;
    return categories.find(cat => cat.id === selectedCategory) || null;
  };

  const hasNextStage = (): boolean => {
    if (!selectedCategory || !selectedLevel || !selectedStage) return false;
    
    const categoryStages = STAGES[selectedCategory];
    const levelStages = categoryStages.filter(stage => stage.id.startsWith(selectedLevel));
    
    const currentStageIndex = levelStages.findIndex(s => s.id === selectedStage.id);
    
    return currentStageIndex >= 0 && currentStageIndex < levelStages.length - 1;
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} pb-10 transition-colors duration-300`}>
      <div className="flex justify-between items-center p-2">
        <ThemeToggle />
        <Link to="/admin">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">لوحة الإدارة</span>
          </Button>
        </Link>
      </div>
      
      {viewMode === ViewMode.CATEGORIES && (
        <CategorySelection onCategorySelect={handleCategorySelect} />
      )}

      {viewMode === ViewMode.LEVELS && selectedCategory && getCurrentCategory() && (
        <LevelSelection 
          category={getCurrentCategory()!}
          onLevelSelect={handleLevelSelect}
          onBackToCategories={handleBackToCategories}
        />
      )}
      
      {viewMode === ViewMode.STAGES && selectedCategory && selectedLevel && (
        <StageSelection 
          stages={STAGES[selectedCategory] || []} 
          category={selectedCategory}
          onStageSelect={handleStageSelect}
          onBackToLevels={handleBackToLevels}
          levelId={selectedLevel}
        />
      )}
      
      {viewMode === ViewMode.QUIZ && selectedCategory && selectedLevel && (
        <QuizCard 
          questions={currentQuestions.length > 0 ? currentQuestions : []} 
          categoryId={selectedCategory}
          onBackToCategories={handleBackToLevels}
        />
      )}
      
      {viewMode === ViewMode.STAGE_QUIZ && selectedCategory && selectedStage && currentQuestions.length > 0 && (
        <StageQuiz
          questions={currentQuestions}
          stage={selectedStage}
          categoryId={selectedCategory}
          onBack={handleBackToStages}
          onComplete={handleStageComplete}
        />
      )}
      
      {viewMode === ViewMode.STAGE_COMPLETE && selectedStage && (
        <div className="quiz-container">
          <div className="quiz-card">
            <StageComplete
              stage={selectedStage}
              score={quizStats.score}
              correctAnswers={quizStats.correctAnswers}
              totalQuestions={quizStats.totalQuestions}
              onBackToStages={handleBackToStages}
              onNextStage={hasNextStage() ? handleNextStage : undefined}
              hasNextStage={hasNextStage()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
