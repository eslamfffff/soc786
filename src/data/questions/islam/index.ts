
import { Question } from '../types';
import beginnerIslamicQuestions from './beginner';
import intermediateIslamicQuestions from './intermediate';
import advancedIslamicQuestions from './advanced';

const islamicQuestions: Question[] = [
  ...beginnerIslamicQuestions,
  ...intermediateIslamicQuestions,
  ...advancedIslamicQuestions
];

export default islamicQuestions;
