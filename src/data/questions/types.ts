
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  level: string;
  explanation?: string;
  difficulty?: number; // 1-3 scale where 1=easy, 2=medium, 3=hard
}
