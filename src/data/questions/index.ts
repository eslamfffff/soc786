
import { Question } from './types';
import footballQuestions from './football';
import islamicQuestions from './islam';
import scienceQuestions from './science';
import historyQuestions from './history';
import geographyQuestions from './geography';

// Combine all questions into a single array
const questions: Question[] = [
  ...footballQuestions,
  ...islamicQuestions,
  ...scienceQuestions,
  ...historyQuestions,
  ...geographyQuestions
];

// Get questions by category
export const getQuestionsByCategory = (categoryId: string): Question[] => {
  return questions.filter(question => question.category === categoryId);
};

// Get questions by category and level
export const getQuestionsByCategoryAndLevel = (categoryId: string, levelId: string): Question[] => {
  return questions.filter(
    question => question.category === categoryId && question.level === levelId
  );
};

// Use 'export type' instead of 're-export' to fix the TS1205 error
export type { Question } from './types';
export default questions;
