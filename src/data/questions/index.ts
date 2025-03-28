
import { Question } from './types';
import footballQuestions from './football';
import islamicQuestions from './islam';
import scienceQuestions from './science';

// Combine all questions into a single array
const questions: Question[] = [
  ...footballQuestions,
  ...islamicQuestions,
  ...scienceQuestions
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

export { Question } from './types';
export default questions;
