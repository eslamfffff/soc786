
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import categories, { Category } from '@/data/categories';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { getQuestionsByCategory } from '@/data/questions';

interface CategorySelectionProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ onCategorySelect }) => {
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
                "dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
              )}
              onClick={() => onCategorySelect(category.id)}
            >
              <CardHeader className="pb-2">
                <div className="text-5xl mb-3 text-center">{category.icon}</div>
                <CardTitle className="text-center font-cairo text-2xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
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

      <footer className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Developed by Islam Farid Ahmed
        </p>
      </footer>
    </div>
  );
};

export default CategorySelection;
