
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
import StageMap from "@/components/StageMap";
import StageQuiz from "@/components/StageQuiz";
import StageComplete from "@/components/StageComplete";
import { Stage } from "@/data/questions/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Función para generar etapas para cada nivel
const generateStages = (level: string, count: number = 20): Stage[] => {
  const stages: Stage[] = [];
  
  // Nivel de dificultad basado en el nivel seleccionado
  const stageDifficulty = level === 'beginner' ? 'easy' : 
                         level === 'intermediate' ? 'medium' : 'hard';
  
  // Títulos especiales para algunas etapas
  const specialTitles: Record<number, string> = {
    1: 'البداية',
    5: 'الربع الأول',
    10: 'المنتصف',
    15: 'الربع الأخير',
    20: 'النهائي'
  };
  
  for (let i = 1; i <= count; i++) {
    stages.push({
      id: `${level}-${i}`,
      title: specialTitles[i] || `المرحلة ${i}`,
      level: stageDifficulty as 'easy' | 'medium' | 'hard',
      order: i,
      unlockRule: i === 1 ? 'none' : `complete-stage-${i-1}`
    });
  }
  
  return stages;
};

// Generate stages for all levels
const STAGES: Record<string, Stage[]> = {
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

  // Log developer signature on load
  useEffect(() => {
    console.log("🧠 Engineered by Islam Farid Ahmed - Progressive Quiz System");
    console.log("Version 4.0 - Game-Based Question Engine");
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setViewMode(ViewMode.LEVELS);
  };

  const handleLevelSelect = (categoryId: string, levelId: string) => {
    // Check if level is unlocked
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
    
    // Filter stages by selected category and level
    const categoryStages = STAGES[selectedCategory];
    const levelStages = categoryStages.filter(stage => stage.id.startsWith(selectedLevel));
    
    const stage = levelStages.find(s => s.id === stageId) || null;
    if (!stage) return;
    
    setSelectedStage(stage);
    setViewMode(ViewMode.STAGE_QUIZ);
    
    // Get questions for this stage
    const allLevelQuestions = getQuestionsByCategoryAndLevel(selectedCategory, selectedLevel);
    
    // Always 10 questions per stage
    const questionsPerStage = 10;
    
    // Use our utility to get unique questions with balanced difficulty
    const uniqueQuestions = getUniqueQuestions(
      allLevelQuestions,
      selectedCategory,
      selectedLevel,
      questionsPerStage
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

  const handleStageComplete = (completed: boolean, percentage: number) => {
    setViewMode(ViewMode.STAGE_COMPLETE);
  };

  const handleNextStage = () => {
    if (!selectedCategory || !selectedLevel || !selectedStage) return;
    
    // Find next stage in the current level
    const categoryStages = STAGES[selectedCategory];
    const levelStages = categoryStages.filter(stage => stage.id.startsWith(selectedLevel));
    
    const currentStageIndex = levelStages.findIndex(s => s.id === selectedStage.id);
    
    if (currentStageIndex >= 0 && currentStageIndex < levelStages.length - 1) {
      const nextStage = levelStages[currentStageIndex + 1];
      setSelectedStage(null); // Reset current stage
      setTimeout(() => {
        handleStageSelect(nextStage.id); // Select next stage
      }, 100);
    } else {
      // No next stage, go back to stage map
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

  // Check if there's a next stage
  const hasNextStage = (): boolean => {
    if (!selectedCategory || !selectedLevel || !selectedStage) return false;
    
    const categoryStages = STAGES[selectedCategory];
    const levelStages = categoryStages.filter(stage => stage.id.startsWith(selectedLevel));
    
    const currentStageIndex = levelStages.findIndex(s => s.id === selectedStage.id);
    
    return currentStageIndex >= 0 && currentStageIndex < levelStages.length - 1;
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} pb-10 transition-colors duration-300`}>
      <ThemeToggle />
      
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
        <div className="container mx-auto pt-2">
          <StageMap 
            stages={STAGES[selectedCategory] || []} 
            category={selectedCategory}
            onStageSelect={handleStageSelect}
            onBackToLevels={handleBackToLevels}
            levelId={selectedLevel}
          />
        </div>
      )}
      
      {viewMode === ViewMode.QUIZ && selectedCategory && selectedLevel && (
        <QuizCard 
          questions={currentQuestions.length > 0 ? currentQuestions : []} 
          categoryId={selectedCategory}
          onBackToCategories={handleBackToLevels}
        />
      )}
      
      {viewMode === ViewMode.STAGE_QUIZ && selectedCategory && selectedStage && (
        <StageQuiz
          questions={currentQuestions.length > 0 ? currentQuestions : []}
          stage={selectedStage}
          categoryId={selectedCategory}
          onBack={handleBackToStages}
          onComplete={handleStageComplete}
        />
      )}
      
      {viewMode === ViewMode.STAGE_COMPLETE && selectedStage && (
        <div className="quiz-container">
          <div className="quiz-card dark:bg-slate-800 dark:border-slate-700">
            <StageComplete
              stage={selectedStage}
              score={2500} // Mock score
              correctAnswers={7} // Mock correct answers
              totalQuestions={10} // Mock total questions
              onBackToStages={handleBackToStages}
              onNextStage={hasNextStage() ? handleNextStage : undefined}
              hasNextStage={hasNextStage()}
            />
          </div>
        </div>
      )}
      
      <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-black/10 dark:bg-black/40 backdrop-blur-sm py-2 text-center">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Engineered by Islam Farid Ahmed
        </p>
      </div>
    </div>
  );
};
