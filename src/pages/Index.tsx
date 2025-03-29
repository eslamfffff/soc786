
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
import { toast } from "@/hooks/use-toast";
import StageMap from "@/components/StageMap";
import StageQuiz from "@/components/StageQuiz";
import StageComplete from "@/components/StageComplete";
import { Stage } from "@/data/questions/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock stages data - in a real app, this would come from a backend
const MOCK_STAGES: Record<string, Stage[]> = {
  "football": [
    { id: "easy-1", title: "تمهيدي", level: "easy", order: 1, unlockRule: "none" },
    { id: "easy-2", title: "الجولة الأولى", level: "easy", order: 2, unlockRule: "complete-stage-1" },
    { id: "easy-3", title: "الجولة الثانية", level: "easy", order: 3, unlockRule: "complete-stage-2" },
    { id: "easy-4", title: "دور 16", level: "easy", order: 4, unlockRule: "complete-stage-3" },
    { id: "easy-5", title: "ربع النهائي", level: "easy", order: 5, unlockRule: "complete-stage-4" },
    { id: "easy-6", title: "نصف النهائي", level: "easy", order: 6, unlockRule: "complete-stage-5" },
    { id: "easy-7", title: "النهائي", level: "easy", order: 7, unlockRule: "complete-stage-6", reward: { coins: 100, badge: "easy-champion" } },
    
    { id: "medium-1", title: "تمهيدي متوسط", level: "medium", order: 1, unlockRule: "complete-15-easy-stages" },
    { id: "medium-2", title: "الجولة الأولى", level: "medium", order: 2, unlockRule: "complete-stage-1" },
    { id: "medium-3", title: "الجولة الثانية", level: "medium", order: 3, unlockRule: "complete-stage-2" },
    { id: "medium-4", title: "دور 16", level: "medium", order: 4, unlockRule: "complete-stage-3" },
    { id: "medium-5", title: "ربع النهائي", level: "medium", order: 5, unlockRule: "complete-stage-4" },
    { id: "medium-6", title: "نصف النهائي", level: "medium", order: 6, unlockRule: "complete-stage-5" },
    { id: "medium-7", title: "النهائي", level: "medium", order: 7, unlockRule: "complete-stage-6", reward: { coins: 200, badge: "medium-champion" } },
    
    { id: "hard-1", title: "تمهيدي صعب", level: "hard", order: 1, unlockRule: "complete-15-medium-stages" },
    { id: "hard-2", title: "الجولة الأولى", level: "hard", order: 2, unlockRule: "complete-stage-1" },
    { id: "hard-3", title: "الجولة الثانية", level: "hard", order: 3, unlockRule: "complete-stage-2" },
    { id: "hard-4", title: "دور 16", level: "hard", order: 4, unlockRule: "complete-stage-3" },
    { id: "hard-5", title: "ربع النهائي", level: "hard", order: 5, unlockRule: "complete-stage-4" },
    { id: "hard-6", title: "نصف النهائي", level: "hard", order: 6, unlockRule: "complete-stage-5" },
    { id: "hard-7", title: "النهائي", level: "hard", order: 7, unlockRule: "complete-stage-6", reward: { coins: 300, badge: "hard-champion" } },
  ],
  "islam": [
    // Similar structure for Islam category
    { id: "easy-1", title: "أساسيات الإسلام", level: "easy", order: 1, unlockRule: "none" },
    { id: "easy-2", title: "السيرة النبوية", level: "easy", order: 2, unlockRule: "complete-stage-1" },
    { id: "easy-3", title: "القرآن الكريم", level: "easy", order: 3, unlockRule: "complete-stage-2" },
    { id: "easy-4", title: "العبادات", level: "easy", order: 4, unlockRule: "complete-stage-3" },
    { id: "easy-5", title: "الأخلاق", level: "easy", order: 5, unlockRule: "complete-stage-4" },
    { id: "easy-6", title: "قصص الأنبياء", level: "easy", order: 6, unlockRule: "complete-stage-5" },
    { id: "easy-7", title: "المرحلة النهائية", level: "easy", order: 7, unlockRule: "complete-stage-6", reward: { coins: 100, badge: "islamic-scholar-bronze" } },
    
    { id: "medium-1", title: "أحكام متقدمة", level: "medium", order: 1, unlockRule: "complete-15-easy-stages" },
    { id: "medium-2", title: "الفقه", level: "medium", order: 2, unlockRule: "complete-stage-1" },
    { id: "medium-3", title: "الحديث الشريف", level: "medium", order: 3, unlockRule: "complete-stage-2" },
    { id: "medium-4", title: "علوم القرآن", level: "medium", order: 4, unlockRule: "complete-stage-3" },
    { id: "medium-5", title: "الصحابة", level: "medium", order: 5, unlockRule: "complete-stage-4" },
    { id: "medium-6", title: "التاريخ الإسلامي", level: "medium", order: 6, unlockRule: "complete-stage-5" },
    { id: "medium-7", title: "المرحلة النهائية", level: "medium", order: 7, unlockRule: "complete-stage-6", reward: { coins: 200, badge: "islamic-scholar-silver" } },
  ],
  "science": [
    // Similar structure for Science category
    { id: "easy-1", title: "مقدمة في العلوم", level: "easy", order: 1, unlockRule: "none" },
    { id: "easy-2", title: "الفيزياء الأساسية", level: "easy", order: 2, unlockRule: "complete-stage-1" },
    { id: "easy-3", title: "الكيمياء", level: "easy", order: 3, unlockRule: "complete-stage-2" },
    { id: "easy-4", title: "علم الأحياء", level: "easy", order: 4, unlockRule: "complete-stage-3" },
    { id: "easy-5", title: "الفلك", level: "easy", order: 5, unlockRule: "complete-stage-4" },
    { id: "easy-6", title: "التكنولوجيا", level: "easy", order: 6, unlockRule: "complete-stage-5" },
    { id: "easy-7", title: "المرحلة النهائية", level: "easy", order: 7, unlockRule: "complete-stage-6", reward: { coins: 100, badge: "scientist-bronze" } },
    
    { id: "medium-1", title: "الفيزياء المتقدمة", level: "medium", order: 1, unlockRule: "complete-15-easy-stages" },
    { id: "medium-2", title: "الكيمياء العضوية", level: "medium", order: 2, unlockRule: "complete-stage-1" },
    { id: "medium-3", title: "علم الوراثة", level: "medium", order: 3, unlockRule: "complete-stage-2" },
    { id: "medium-4", title: "الفلك المتقدم", level: "medium", order: 4, unlockRule: "complete-stage-3" },
    { id: "medium-5", title: "الذكاء الاصطناعي", level: "medium", order: 5, unlockRule: "complete-stage-4" },
    { id: "medium-6", title: "الطاقة المتجددة", level: "medium", order: 6, unlockRule: "complete-stage-5" },
    { id: "medium-7", title: "المرحلة النهائية", level: "medium", order: 7, unlockRule: "complete-stage-6", reward: { coins: 200, badge: "scientist-silver" } },
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<any[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.CATEGORIES);
  const { theme } = useTheme();

  // Log developer signature on load
  useEffect(() => {
    console.log("🧠 Engineered by Islam Farid Ahmed - Progressive Quiz System");
    console.log("Version 3.0 - Stage-Based Question Engine");
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setViewMode(ViewMode.STAGES); // Change to stages view
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
    setViewMode(ViewMode.QUIZ);
    
    // Get non-repeating questions for this level with dynamic difficulty balancing
    const allLevelQuestions = getQuestionsByCategoryAndLevel(categoryId, levelId);
    
    // Determine questions per session based on level
    const questionsPerSession = levelId === 'beginner' ? 10 : levelId === 'intermediate' ? 12 : 15;
    
    // Use our utility to get unique questions with balanced difficulty
    const uniqueQuestions = getUniqueQuestions(
      allLevelQuestions,
      categoryId,
      levelId,
      questionsPerSession
    );
    
    setCurrentQuestions(uniqueQuestions);
  };

  const handleStageSelect = (stageId: string) => {
    if (!selectedCategory) return;
    
    const stage = MOCK_STAGES[selectedCategory]?.find(s => s.id === stageId) || null;
    if (!stage) return;
    
    setSelectedStage(stage);
    setViewMode(ViewMode.STAGE_QUIZ);
    
    // Map stage level to our existing level structure for questions
    const levelMap: Record<string, string> = {
      'easy': 'beginner',
      'medium': 'intermediate',
      'hard': 'advanced'
    };
    
    const mappedLevel = levelMap[stage.level] || 'beginner';
    
    // Get questions for this stage
    const allLevelQuestions = getQuestionsByCategoryAndLevel(selectedCategory, mappedLevel);
    
    // Always 10 questions per stage
    const questionsPerStage = 10;
    
    // Use our utility to get unique questions with balanced difficulty
    const uniqueQuestions = getUniqueQuestions(
      allLevelQuestions,
      selectedCategory,
      mappedLevel,
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
    if (!selectedCategory || !selectedStage) return;
    
    // Find next stage
    const currentStages = MOCK_STAGES[selectedCategory];
    const currentStageIndex = currentStages.findIndex(s => s.id === selectedStage.id);
    
    if (currentStageIndex >= 0 && currentStageIndex < currentStages.length - 1) {
      const nextStage = currentStages[currentStageIndex + 1];
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
    if (!selectedCategory) return theme === 'dark' ? 'bg-gradient-football' : 'bg-gradient-pitch';
    
    const category = categories.find(cat => cat.id === selectedCategory);
    if (!category) return theme === 'dark' ? 'bg-gradient-football' : 'bg-gradient-pitch';
    
    return theme === 'dark' ? category.darkBackgroundColor : category.backgroundColor;
  };

  const getCurrentCategory = () => {
    if (!selectedCategory) return null;
    return categories.find(cat => cat.id === selectedCategory) || null;
  };

  // Check if there's a next stage
  const hasNextStage = (): boolean => {
    if (!selectedCategory || !selectedStage) return false;
    
    const currentStages = MOCK_STAGES[selectedCategory];
    const currentStageIndex = currentStages.findIndex(s => s.id === selectedStage.id);
    
    return currentStageIndex >= 0 && currentStageIndex < currentStages.length - 1;
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
      
      {viewMode === ViewMode.STAGES && selectedCategory && (
        <div className="container mx-auto pt-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-4 font-cairo flex items-center gap-2"
            onClick={handleBackToCategories}
          >
            <ArrowLeft size={16} />
            <span dir="rtl">العودة للفئات</span>
          </Button>
          <StageMap 
            stages={MOCK_STAGES[selectedCategory] || []} 
            category={selectedCategory}
            onStageSelect={handleStageSelect}
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
