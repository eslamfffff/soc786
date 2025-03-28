
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Category, Level } from '@/data/categories';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { ArrowLeft, Home, Lock, Check, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getQuestionsByCategory } from '@/data/questions';
import { 
  loadProgress, 
  isLevelUnlocked, 
  getUnlockRequirementText,
  getUnlockThreshold 
} from '@/utils/progressUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

interface LevelSelectionProps {
  category: Category;
  onLevelSelect: (categoryId: string, levelId: string) => void;
  onBackToCategories: () => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ 
  category, 
  onLevelSelect, 
  onBackToCategories 
}) => {
  // Load user progress from localStorage
  const userProgress = loadProgress();
  
  const handleLevelClick = (level: Level) => {
    const isUnlocked = isLevelUnlocked(category.id, level.id, userProgress);
    
    if (!isUnlocked) {
      const previousLevel = level.id === 'intermediate' ? 'المبتدئ' : 'المتوسط';
      const threshold = getUnlockThreshold(level.id);
      
      toast({
        title: "المستوى مقفل",
        description: `يجب إكمال المستوى ${previousLevel} بنسبة ${threshold}% على الأقل لفتح هذا المستوى.`,
        variant: "destructive",
      });
      return;
    }
    
    onLevelSelect(category.id, level.id);
  };
  
  // Get completion percentage for each level
  const getLevelCompletion = (levelId: string): number => {
    return userProgress.completedLevels[category.id]?.[levelId] || 0;
  };
  
  const getQuestionCountByLevel = (levelId: string): number => {
    const questions = getQuestionsByCategory(category.id);
    return questions.filter(q => q.level === levelId).length;
  };
  
  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-6 pt-10 animate-fade-in">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" onClick={(e) => {
              e.preventDefault();
              onBackToCategories();
            }}>
              <Home className="h-4 w-4 mr-2" />
              <span>الرئيسية</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-center mb-8">
        <button 
          onClick={onBackToCategories}
          className="mr-4 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-center font-cairo text-slate-800 dark:text-slate-100" dir="rtl">
          {category.icon} {category.name} - اختر المستوى
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {category.levels.map((level) => {
          const isUnlocked = isLevelUnlocked(category.id, level.id, userProgress);
          const completionPercentage = getLevelCompletion(level.id);
          const questionCount = getQuestionCountByLevel(level.id);
          
          return (
            <TooltipProvider key={level.id}>
              <Card 
                className={cn(
                  "overflow-hidden border-2 transition-all duration-300",
                  level.color,
                  isUnlocked ? "hover:shadow-xl hover:scale-105 cursor-pointer" : "opacity-75",
                  "dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 min-h-[200px] relative"
                )}
                onClick={() => handleLevelClick(level)}
              >
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 dark:bg-black/40 backdrop-blur-sm z-10">
                    <div className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Lock className="h-12 w-12 mx-auto mb-2 text-slate-700 dark:text-slate-300" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-cairo text-base" dir="rtl">
                            {getUnlockRequirementText(level.id)}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      <p className="font-cairo text-lg font-medium text-slate-800 dark:text-slate-200" dir="rtl">
                        أكمل المستوى السابق للفتح
                      </p>
                    </div>
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="text-5xl mb-3 text-center">{level.icon}</div>
                  <CardTitle className="text-center font-cairo text-2xl flex items-center justify-center gap-2">
                    {level.name}
                    {isUnlocked && completionPercentage >= getUnlockThreshold(level.id === 'beginner' ? 'intermediate' : 'advanced') && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    <Badge variant="outline" className="ml-2 bg-white/10 dark:bg-black/20">
                      {questionCount} سؤال
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center font-cairo dark:text-slate-300 text-lg" dir="rtl">
                    {level.description}
                  </CardDescription>
                  
                  {completionPercentage > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium dark:text-slate-300">مستوى التقدم</span>
                        <span className="font-medium dark:text-slate-300">{completionPercentage}%</span>
                      </div>
                      <Progress value={completionPercentage} className="h-2" />
                    </div>
                  )}
                  
                  <div className="mt-3 text-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 cursor-help">
                          <HelpCircle className="h-4 w-4 mr-1" />
                          <span dir="rtl">متطلبات الإكمال</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-cairo text-base" dir="rtl">
                          {getUnlockRequirementText(level.id)}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            </TooltipProvider>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-600 dark:text-slate-400 font-cairo text-lg" dir="rtl">
          أكمل المستويات بالترتيب لفتح المستويات الأصعب. كل مستوى يحتوي على أسئلة أكثر تحديًا!
        </p>
      </div>

      <footer className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Engineered by Islam Farid Ahmed
        </p>
      </footer>
    </div>
  );
};

export default LevelSelection;
