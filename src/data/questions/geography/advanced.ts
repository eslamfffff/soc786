
import { Question } from '../types';

const advancedGeographyQuestions: Question[] = [
  {
    id: 2016,
    question: "ما هو الخط الوهمي الذي يقسم الأرض إلى نصفين شمالي وجنوبي؟",
    options: ["خط الاستواء", "خط غرينتش", "مدار السرطان", "مدار الجدي"],
    correctAnswer: 0,
    category: "geography",
    level: "advanced",
    difficulty: 2.6,
    stageId: "advanced-1"
  },
  {
    id: 2017,
    question: "ما هي ظاهرة تشكل الوديان على شكل حرف U؟",
    options: ["التعرية النهرية", "التعرية الجليدية", "التعرية الهوائية", "التجوية الكيميائية"],
    correctAnswer: 1,
    category: "geography",
    level: "advanced",
    difficulty: 3.0,
    stageId: "advanced-2"
  },
  {
    id: 2018,
    question: "أي من التالي ليس من أنواع الصخور الرئيسية؟",
    options: ["الصخور النارية", "الصخور الرسوبية", "الصخور المتحولة", "الصخور الكلسية"],
    correctAnswer: 3,
    category: "geography",
    level: "advanced",
    difficulty: 2.9,
    stageId: "advanced-3"
  }
];

export default advancedGeographyQuestions;
