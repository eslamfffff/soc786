
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  level: string;
  explanation?: string;
}
