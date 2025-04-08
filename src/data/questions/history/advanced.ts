
import { Question } from '../types';

const advancedHistoryQuestions: Question[] = [
  {
    id: 1016,
    question: "من هو العالم المسلم الذي وضع أسس علم الاجتماع البشري؟",
    options: ["ابن سينا", "الفارابي", "ابن خلدون", "البيروني"],
    correctAnswer: 2,
    category: "history",
    level: "advanced",
    difficulty: 3.0
  },
  {
    id: 1017,
    question: "ما اسم المعاهدة التي أنهت الحرب العالمية الأولى؟",
    options: ["معاهدة فرساي", "معاهدة برلين", "معاهدة لوزان", "معاهدة وستفاليا"],
    correctAnswer: 0,
    category: "history",
    level: "advanced",
    difficulty: 2.8
  },
  {
    id: 1018,
    question: "ما هو تاريخ نهاية الخلافة العثمانية؟",
    options: ["1918", "1922", "1924", "1926"],
    correctAnswer: 2,
    category: "history",
    level: "advanced",
    difficulty: 2.7
  }
];

export default advancedHistoryQuestions;
