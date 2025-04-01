
import { Question } from '../types';
import beginnerFootballQuestions from './beginner';
import intermediateFootballQuestions from './intermediate';
import advancedFootballQuestions from './advanced';

const footballQuestions: Question[] = [
  ...beginnerFootballQuestions,
  ...intermediateFootballQuestions,
  ...advancedFootballQuestions
];

export default footballQuestions;
