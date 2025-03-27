
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
    </div>
  );
}
