
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  level: string;
  explanation?: string;
  difficulty?: number; // 1-3 scale where 1=easy, 2=medium, 3=hard
  stageId?: string; // Which stage this question belongs to
}

export interface Stage {
  id: string;
  title: string;
  level: 'easy' | 'medium' | 'hard';
  order: number;
  unlockRule: string;
  bgTheme?: string;
  reward?: {
    coins?: number;
    badge?: string;
  };
  isCompleted?: boolean;
  isLocked?: boolean;
  completionPercentage?: number;
}
