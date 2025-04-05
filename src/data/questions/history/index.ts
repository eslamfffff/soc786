
import { Question } from '../types';
import beginnerHistoryQuestions from './beginner';
import intermediateHistoryQuestions from './intermediate';
import advancedHistoryQuestions from './advanced';

const historyQuestions: Question[] = [
  ...beginnerHistoryQuestions,
  ...intermediateHistoryQuestions,
  ...advancedHistoryQuestions
];

export default historyQuestions;
