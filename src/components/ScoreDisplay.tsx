
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
      <div className="flex items-center" title={isDark ? 'تبديل إلى الوضع النهاري' : 'تبديل إلى الوضع الليلي'}>
        <Sun className={`h-4 w-4 transition-opacity ${isDark ? 'opacity-50' : 'opacity-100'}`} />
        <Switch 
          checked={isDark}
          onCheckedChange={toggleTheme}
          className="mx-1.5"
        />
        <Moon className={`h-4 w-4 transition-opacity ${isDark ? 'opacity-100' : 'opacity-50'}`} />
      </div>
    </div>
  );
};

export default ScoreDisplay;
