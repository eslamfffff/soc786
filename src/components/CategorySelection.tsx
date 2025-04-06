import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import categories, { Category } from '@/data/categories';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Home, Globe, MapPin, Book, GraduationCap, Award } from 'lucide-react';
import { getQuestionsByCategory } from '@/data/questions';
import { loadProgress } from '@/utils/progressUtils';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface CategorySelectionProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ onCategorySelect }) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const progress = loadProgress();
  
  // Preload background images
  useEffect(() => {
    const bgImages = {
      football: '/football-bg.png',
      islam: '/mosque-dark.jpg',
      science: '/science-bg.png',
      history: '/history-bg.png',
      geography: '/world-map-bg.png'
    };
    
    Object.entries(bgImages).forEach(([category, url]) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setLoadedImages(prev => ({
          ...prev,
          [category]: true
        }));
      };
    });
  }, []);
  
  // Function to get icon component based on category
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'geography':
        return <Globe className="h-10 w-10 mb-2 text-blue-500" />;
      case 'history':
        return <Book className="h-10 w-10 mb-2 text-amber-600" />;
      case 'science':
        return <GraduationCap className="h-10 w-10 mb-2 text-green-500" />;
      case 'football':
        return <Award className="h-10 w-10 mb-2 text-emerald-500" />;
      default:
        return null;
    }
  };
  
  // Calculate completion percentage for each category
  const getCategoryCompletion = (categoryId: string): number => {
    const categoryStages = progress.completedStages?.[categoryId] || {};
    const completedCount = Object.values(categoryStages).filter(Boolean).length;
    const totalQuestions = getQuestionsByCategory(categoryId).length;
    const stageCount = Math.min(30, totalQuestions / 10); // Assuming 10 questions per stage
    
    return stageCount > 0 ? Math.round((completedCount / stageCount) * 100) : 0;
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-6 pt-10 animate-fade-in">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              <Home className="h-4 w-4 mr-2" />
              <span>الرئيسية</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>اختيار الفئة</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-cairo text-slate-800 dark:text-slate-100" dir="rtl">
        اختر فئة الأسئلة
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const questionCount = getQuestionsByCategory(category.id).length;
          const completionPercentage = getCategoryCompletion(category.id);
          const isImageLoaded = loadedImages[category.id];
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
              }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => onCategorySelect(category.id)}
              className={cn(
                "category-card relative overflow-hidden rounded-xl border-2 cursor-pointer min-h-[280px]",
                "dark:border-slate-700",
                hoveredCategory === category.id ? "ring-2 ring-offset-2 ring-primary" : "",
                category.id === 'islam' ? "islamic-category" : ""
              )}
              data-category={category.id}
            >
              {/* Background Image Layer */}
              <div 
                className={cn(
                  "absolute inset-0 w-full h-full z-0 transition-all duration-300",
                  hoveredCategory === category.id ? "scale-105 blur-[1px]" : "scale-100"
                )}
                style={{
                  backgroundImage: isImageLoaded ? 
                    `url('${category.id === 'islam' ? '/mosque-dark.jpg' : `/${category.id}-bg.png`}')` : 
                    'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: category.id === 'islam' ? 0.8 : 0.35,
                  backgroundBlendMode: 'overlay'
                }}
                aria-hidden="true"
              >
                {!isImageLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <Skeleton className="w-full h-full" />
                  </div>
                )}
              </div>
              
              {/* Overlay Gradient */}
              <div 
                className={cn(
                  "absolute inset-0 z-0",
                  category.id === 'football' ? "bg-gradient-to-br from-emerald-900/70 to-emerald-600/50" :
                  category.id === 'islam' ? "bg-gradient-to-br from-slate-900/70 to-slate-700/60" :
                  category.id === 'science' ? "bg-gradient-to-br from-green-900/70 to-teal-600/50" :
                  category.id === 'history' ? "bg-gradient-to-br from-amber-900/70 to-amber-600/50" :
                  "bg-gradient-to-br from-blue-900/70 to-blue-600/50"
                )}
                aria-hidden="true"
              />
              
              {/* Content Layer */}
              <div className="relative z-10 flex flex-col h-full p-6">
                <div className="flex flex-col items-center justify-center flex-grow">
                  <div className={cn(
                    "text-5xl mb-3 text-center",
                    category.id === 'islam' ? "text-[#D4AF37]" : "text-white"
                  )}>{category.icon}</div>
                  
                  <h3 className={cn(
                    "text-center font-cairo text-2xl font-bold mb-2",
                    category.id === 'islam' ? "text-[#F5F5F5] islamic-title" : "text-white"
                  )}>
                    {category.name}
                  </h3>
                  
                  <div className="mt-2 text-center">
                    <p className={cn(
                      "text-center font-cairo text-lg mb-4",
                      category.id === 'islam' ? "text-[#F5F5F5] text-opacity-90" : "text-white text-opacity-90"
                    )} dir="rtl">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-white text-opacity-90" dir="rtl">
                      {questionCount} سؤال
                    </span>
                    <span className="text-xs font-medium text-white text-opacity-90" dir="rtl">
                      {completionPercentage}% اكتمال
                    </span>
                  </div>
                  <div className={cn(
                    "w-full bg-gray-200 rounded-full h-2.5",
                    category.id === 'islam' ? "bg-white bg-opacity-30" : "bg-opacity-30"
                  )}>
                    <motion.div 
                      className={cn(
                        "h-2.5 rounded-full",
                        category.id === 'football' ? "bg-emerald-500" :
                        category.id === 'islam' ? "bg-[#D4AF37]" :
                        category.id === 'science' ? "bg-teal-500" :
                        category.id === 'history' ? "bg-amber-500" :
                        "bg-blue-500"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-600 dark:text-slate-400 font-cairo text-lg" dir="rtl">
          كل جولة تحتوي على 10 أسئلة متنوعة. جاوب بشكل صحيح واحصل على أعلى النقاط!
        </p>
      </div>
    </div>
  );
};

export default CategorySelection;
