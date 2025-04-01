
import { Question } from '../types';
import beginnerScienceQuestions from './beginner';
import intermediateScienceQuestions from './intermediate';
import advancedScienceQuestions from './advanced';

const scienceQuestions: Question[] = [
  ...beginnerScienceQuestions,
  ...intermediateScienceQuestions,
  ...advancedScienceQuestions
];

export default scienceQuestions;
