
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Stage } from '@/data/questions/types';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface StageCompleteProps {
  stage: Stage;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  onBackToStages: () => void;
  onNextStage?: () => void;
  hasNextStage: boolean;
}

const StageComplete: React.FC<StageCompleteProps> = ({ 
  stage, 
  score, 
  correctAnswers, 
  totalQuestions, 
  onBackToStages,
  onNextStage,
  hasNextStage
}) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = percentage >= 70;
  
  // تحديد عدد النجوم بناءً على النسبة المئوية
  const getStarsCount = () => {
    if (percentage >= 90) return 3; // ممتاز - 3 نجوم
    if (percentage >= 70) return 2; // جيد - 2 نجوم
    if (percentage >= 50) return 1; // مقبول - نجمة واحدة
    return 0; // ضعيف - بدون نجوم
  };
  
  const starsCount = getStarsCount();
  
  // Trigger confetti effect on component mount if passed
  useEffect(() => {
    if (passed) {
      const shootConfetti = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      };
      
      // Initial confetti burst
      shootConfetti();
      
      // Additional bursts for more celebration
      setTimeout(shootConfetti, 500);
      setTimeout(shootConfetti, 1000);
    }
  }, [passed]);
  
  let feedbackMessage = '';
  let feedbackClass = '';
  
  if (percentage >= 90) {
    feedbackMessage = 'ممتاز! أداء رائع!';
    feedbackClass = 'text-green-600 dark:text-green-400';
  } else if (percentage >= 70) {
    feedbackMessage = 'جيد جداً! أحسنت!';
    feedbackClass = 'text-blue-600 dark:text-blue-400';
  } else if (percentage >= 50) {
    feedbackMessage = 'جيد، يمكنك تحسين أدائك!';
    feedbackClass = 'text-yellow-600 dark:text-yellow-400';
  } else {
    feedbackMessage = 'حاول مرة أخرى لتحسين نتيجتك!';
    feedbackClass = 'text-red-600 dark:text-red-400';
  }
  
  // نظام عرض النجوم المحسن
  const renderStars = () => {
    return (
      <div className="flex justify-center gap-3 mb-6">
        {[1, 2, 3].map((star) => (
          <motion.div
            key={star}
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: star <= starsCount ? [0, 10, -5, 0] : 0
            }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: star * 0.15 
            }}
            className="relative"
          >
            <div className={cn(
              "w-14 h-14 flex items-center justify-center",
              star <= starsCount ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
            )}>
              <svg 
                viewBox="0 0 24 24" 
                fill={star <= starsCount ? "#FFD700" : "none"}
                stroke={star <= starsCount ? "#FFA000" : "currentColor"}
                strokeWidth="1.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              
              {/* Add glow effect for earned stars */}
              {star <= starsCount && (
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.7, 0],
                    scale: [1, 1.2, 1] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: star * 0.3
                  }}
                  style={{ 
                    background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,215,0,0) 70%)'
                  }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-6 text-center font-cairo" 
        dir="rtl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {passed ? '🏆 اكتملت المرحلة!' : 'انتهت المرحلة!'}
      </motion.h2>

      <motion.div 
        className="mb-6 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Badge className={cn(
          "px-4 py-2 text-base font-normal",
          stage.level === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
          stage.level === 'medium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' :
          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
        )}>
          {stage.level === 'easy' && '⚽️ سهل'}
          {stage.level === 'medium' && '⚽⚽ متوسط'}
          {stage.level === 'hard' && '⚽⚽⚽ صعب'}
          {' - '}
          {stage.title}
        </Badge>
      </motion.div>
      
      {/* عرض النجوم بشكل واضح ومحسن */}
      {renderStars()}
      
      <motion.div 
        className="score-circle mb-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.5
        }}
      >
        <div className="relative w-40 h-40 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 shadow-lg">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="text-slate-200 dark:text-slate-700" 
              strokeWidth="8"
              stroke="currentColor" 
              fill="transparent" 
              r="42" 
              cx="50" 
              cy="50" 
            />
            <motion.circle 
              className={cn(
                percentage >= 70 ? "text-green-500" : 
                percentage >= 50 ? "text-yellow-500" : 
                "text-red-500"
              )}
              strokeWidth="8"
              strokeDasharray={264}
              initial={{ strokeDashoffset: 264 }}
              animate={{ strokeDashoffset: 264 - (264 * percentage) / 100 }}
              transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
              strokeLinecap="round"
              stroke="currentColor" 
              fill="transparent" 
              r="42" 
              cx="50" 
              cy="50" 
            />
          </svg>
          <div className="text-center">
            <motion.span 
              className="text-4xl font-bold text-slate-800 dark:text-slate-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {percentage}%
            </motion.span>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">نسبة النجاح</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="text-center mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <p className="text-2xl font-bold mb-4 font-cairo" dir="rtl">
          النقاط: <span className="text-primary">{score}</span>
        </p>
        <p className="text-xl font-bold mb-4 font-cairo" dir="rtl">
          الإجابات الصحيحة: <span className="text-primary">{correctAnswers}</span> من <span>{totalQuestions}</span>
        </p>
        <motion.p 
          className={cn("text-xl font-cairo", feedbackClass)}
          dir="rtl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {feedbackMessage}
        </motion.p>
        
        {passed && stage.reward && (
          <motion.div 
            className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 max-w-md mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <motion.div 
              className="flex justify-center mb-3"
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="h-10 w-10 text-yellow-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 font-cairo" dir="rtl">
              المكافأة!
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 font-cairo" dir="rtl">
              لقد حصلت على {stage.reward.coins} نقطة!
            </p>
            {stage.reward.badge && (
              <div className="mt-2">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700">
                  <Star className="h-3 w-3 mr-1" />
                  {stage.reward.badge}
                </Badge>
              </div>
            )}
          </motion.div>
        )}
        
        {!passed && (
          <motion.div 
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-red-800 dark:text-red-200 font-cairo text-lg" dir="rtl">
              تحتاج إلى 70% على الأقل لإكمال المرحلة. حاول مرة أخرى!
            </p>
          </motion.div>
        )}
      </motion.div>

      <motion.div 
        className="flex flex-wrap gap-4 justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
      >
        {passed && hasNextStage && onNextStage && (
          <Button 
            onClick={onNextStage}
            size="lg"
            className="min-w-[220px] min-h-[60px] font-cairo text-lg flex items-center gap-2"
          >
            <span>المرحلة التالية</span>
            <ArrowRight size={18} />
          </Button>
        )}
        <Button 
          onClick={onBackToStages} 
          variant={passed && hasNextStage && onNextStage ? "outline" : "default"}
          size="lg"
          className="min-w-[180px] min-h-[60px] font-cairo text-lg"
        >
          العودة للمراحل
        </Button>
      </motion.div>
    </div>
  );
};

export default StageComplete;
