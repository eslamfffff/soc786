
import { useState } from "react";
import { getQuestionsByCategory } from "@/data/questions";
import categories from "@/data/categories";
import QuizCard from "@/components/QuizCard";
import CategorySelection from "@/components/CategorySelection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const getBackgroundClass = () => {
    if (!selectedCategory) return theme === 'dark' ? 'bg-gradient-football' : 'bg-gradient-pitch';
    
    const category = categories.find(cat => cat.id === selectedCategory);
    if (!category) return theme === 'dark' ? 'bg-gradient-football' : 'bg-gradient-pitch';
    
    return theme === 'dark' ? category.darkBackgroundColor : category.backgroundColor;
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} pb-10 transition-colors duration-300`}>
      <ThemeToggle />
      
      {!selectedCategory ? (
        <CategorySelection onCategorySelect={handleCategorySelect} />
      ) : (
        <QuizCard 
          questions={getQuestionsByCategory(selectedCategory)} 
          categoryId={selectedCategory}
          onBackToCategories={handleBackToCategories}
        />
      )}
      
      <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-black/10 dark:bg-black/40 backdrop-blur-sm py-2 text-center">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Developed by Islam Farid Ahmed
        </p>
      </div>
    </div>
  );
}
