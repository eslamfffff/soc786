
import { useState } from "react";
import { questions } from "@/data/questions";
import QuizCard from "@/components/QuizCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

export default function Index() {
  const [showQuiz, setShowQuiz] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'football-bg-dark' : 'football-bg-light'} pb-10 transition-colors duration-300`}>
      <ThemeToggle />
      
      {!showQuiz ? (
        <div className="container max-w-4xl mx-auto px-4 md:px-6 pt-20 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 md:p-10 w-full max-w-lg backdrop-blur-sm border border-slate-100 dark:border-slate-700 animate-fade-in transition-colors">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center font-cairo" dir="rtl">
              اختبار كرة القدم
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-center font-cairo" dir="rtl">
              اختبر معلوماتك في كرة القدم مع هذا الاختبار المكون من {questions.length} سؤال!
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-primary text-white font-medium py-3 px-8 rounded-lg
                          transition-all duration-300 ease-out shadow-sm hover:shadow-md
                          hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-primary/20
                          text-lg font-cairo"
              >
                ابدأ الاختبار
              </button>
            </div>
          </div>
        </div>
      ) : (
        <QuizCard questions={questions} />
      )}
    </div>
  );
}
