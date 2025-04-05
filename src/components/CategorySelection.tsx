
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import categories, { Category } from '@/data/categories';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Home, Globe, MapPin, Book, GraduationCap } from 'lucide-react';
import { getQuestionsByCategory } from '@/data/questions';

interface CategorySelectionProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ onCategorySelect }) => {
  // Function to get icon component based on category
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'geography':
        return <Globe className="h-10 w-10 mb-2 text-blue-500" />;
      case 'history':
        return <Book className="h-10 w-10 mb-2 text-amber-600" />;
      case 'science':
        return <GraduationCap className="h-10 w-10 mb-2 text-green-500" />;
      default:
        return null;
    }
  };
  
  // Function to get background style for each category
  const getCategoryBackground = (category: Category) => {
    switch (category.id) {
      case 'geography':
        return {
          backgroundImage: `url('/world-map-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light'
        };
      case 'history':
        return {
          backgroundImage: `url('/history-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light'
        };
      case 'science':
        return {
          backgroundImage: `url('/science-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light'
        };
      case 'football':
        return {
          backgroundImage: `url('/football-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light'
        };
      case 'islam':
        return {
          backgroundImage: `url('/lovable-uploads/f2608b3b-a1de-4949-992d-0ac74ac87a55.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light'
        };
      default:
        return {};
    }
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const questionCount = getQuestionsByCategory(category.id).length;
          
          return (
            <Card 
              key={category.id}
              className={cn(
                "overflow-hidden border-2 transition-all duration-300",
                "hover:shadow-xl hover:scale-105 cursor-pointer min-h-[200px]",
                "dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100",
                "relative"
              )}
              onClick={() => onCategorySelect(category.id)}
            >
              <div 
                className="absolute inset-0 opacity-20 z-0" 
                style={getCategoryBackground(category)}
              ></div>
              <CardHeader className="pb-2 relative z-10">
                <div className="flex flex-col items-center">
                  <div className="text-5xl mb-3 text-center">{category.icon}</div>
                  {getCategoryIcon(category.id)}
                  <CardTitle className="text-center font-cairo text-2xl">{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-center font-cairo dark:text-slate-300 text-lg" dir="rtl">
                  {category.description}
                </CardDescription>
                <div className="mt-3 text-sm font-medium text-center text-slate-600 dark:text-slate-400">
                  {questionCount} سؤال
                </div>
              </CardContent>
            </Card>
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
