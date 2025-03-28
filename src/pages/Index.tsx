
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

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<any[]>([]);
  const { theme } = useTheme();

  // Log developer signature on load
  useEffect(() => {
    console.log("🧠 Engineered by Islam Farid Ahmed - Progressive Quiz System");
    console.log("Version 2.0 - Dynamic Non-Repeating Question Engine");
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedLevel(null);
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
    
    // Get non-repeating questions for this level
    const allLevelQuestions = getQuestionsByCategoryAndLevel(categoryId, levelId);
    const questionsPerSession = levelId === 'beginner' ? 10 : levelId === 'intermediate' ? 12 : 15;
    
    // Use our utility to get unique questions
    const uniqueQuestions = getUniqueQuestions(
      allLevelQuestions,
      categoryId,
      levelId,
      questionsPerSession
    );
    
    setCurrentQuestions(uniqueQuestions);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedLevel(null);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
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

  // Handle direct URL access attempts (security)
  useEffect(() => {
    if (selectedCategory && selectedLevel) {
      const progress = loadProgress();
      if (!isLevelUnlocked(selectedCategory, selectedLevel, progress)) {
        toast({
          title: "Access Denied",
          description: "You cannot access this level directly without completing previous levels.",
          variant: "destructive",
        });
        setSelectedLevel(null);
      }
    }
  }, [selectedCategory, selectedLevel]);

  return (
    <div className={`min-h-screen ${getBackgroundClass()} pb-10 transition-colors duration-300`}>
      <ThemeToggle />
      
      {!selectedCategory && (
        <CategorySelection onCategorySelect={handleCategorySelect} />
      )}

      {selectedCategory && !selectedLevel && getCurrentCategory() && (
        <LevelSelection 
          category={getCurrentCategory()!}
          onLevelSelect={handleLevelSelect}
          onBackToCategories={handleBackToCategories}
        />
      )}
      
      {selectedCategory && selectedLevel && (
        <QuizCard 
          questions={currentQuestions.length > 0 ? currentQuestions : []} 
          categoryId={selectedCategory}
          onBackToCategories={handleBackToLevels}
        />
      )}
      
      <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-black/10 dark:bg-black/40 backdrop-blur-sm py-2 text-center">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Engineered by Islam Farid Ahmed
        </p>
      </div>
    </div>
  );
};
