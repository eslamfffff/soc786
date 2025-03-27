
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import categories, { Category } from '@/data/categories';
import { cn } from '@/lib/utils';

interface CategorySelectionProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ onCategorySelect }) => {
  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-6 pt-10 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-cairo text-slate-800 dark:text-slate-100" dir="rtl">
        اختر فئة الأسئلة
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className={cn(
              "overflow-hidden border-2 transition-all duration-300",
              "hover:shadow-xl hover:scale-105 cursor-pointer",
              "dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
            )}
            onClick={() => onCategorySelect(category.id)}
          >
            <CardHeader className="pb-2">
              <div className="text-4xl mb-2 text-center">{category.icon}</div>
              <CardTitle className="text-center font-cairo text-xl">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center font-cairo dark:text-slate-300" dir="rtl">
                {category.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-600 dark:text-slate-400 font-cairo" dir="rtl">
          كل فئة تحتوي على 10 أسئلة متنوعة. جاوب بشكل صحيح واحصل على أعلى النقاط!
        </p>
      </div>
    </div>
  );
};

export default CategorySelection;
