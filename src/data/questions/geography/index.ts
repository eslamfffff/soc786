
import { Question } from '../types';
import beginnerGeographyQuestions from './beginner';
import intermediateGeographyQuestions from './intermediate';
import advancedGeographyQuestions from './advanced';

const geographyQuestions: Question[] = [
  ...beginnerGeographyQuestions,
  ...intermediateGeographyQuestions,
  ...advancedGeographyQuestions
];

export default geographyQuestions;
