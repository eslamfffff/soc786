
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="score-display font-cairo flex items-center justify-end" dir="rtl">
      <div className="ml-4">
        <span className="text-slate-500 dark:text-slate-400">النقاط:</span>{' '}
        <span className="text-primary font-semibold">{score}</span>
      </div>
      <div className="flex items-center space-x-1 border rounded-full p-1 bg-white/10 dark:bg-black/20 backdrop-blur-sm" title={isDark ? 'تبديل إلى الوضع النهاري' : 'تبديل إلى الوضع الليلي'}>
        <Sun className={`h-4 w-4 transition-all duration-300 ${isDark ? 'opacity-50' : 'text-amber-500 opacity-100'}`} />
        <Switch 
          checked={isDark}
          onCheckedChange={toggleTheme}
          className="mx-1"
        />
        <Moon className={`h-4 w-4 transition-all duration-300 ${isDark ? 'text-blue-400 opacity-100' : 'opacity-50'}`} />
      </div>
    </div>
  );
};

export default ScoreDisplay;
