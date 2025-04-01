
import { Question } from '../types';

const advancedIslamicQuestions: Question[] = [
  {
    id: 21,
    question: "ما هي 'الزبور' وعلى من أنزلت؟",
    options: ["كتاب أنزل على إبراهيم", "كتاب أنزل على موسى", "كتاب أنزل على داود", "كتاب أنزل على عيسى"],
    correctAnswer: 2,
    category: "islam",
    level: "advanced",
    difficulty: 2.5
  },
  {
    id: 22,
    question: "ما هو الترتيب الصحيح للخلفاء الراشدين؟",
    options: [
      "أبو بكر، عمر، علي، عثمان", 
      "أبو بكر، عمر، عثمان، علي", 
      "أبو بكر، علي، عمر، عثمان", 
      "عمر، أبو بكر، عثمان، علي"
    ],
    correctAnswer: 1,
    category: "islam",
    level: "advanced",
    difficulty: 2.7
  },
  {
    id: 23,
    question: "من هو صاحب كتاب 'إحياء علوم الدين'؟",
    options: ["الإمام الشافعي", "الإمام أحمد بن حنبل", "الإمام الغزالي", "ابن تيمية"],
    correctAnswer: 2,
    category: "islam",
    level: "advanced",
    difficulty: 2.8
  },
  {
    id: 24,
    question: "أي من الأئمة الأربعة أسبق وفاة؟",
    options: ["الإمام مالك", "الإمام أبو حنيفة", "الإمام الشافعي", "الإمام أحمد بن حنبل"],
    correctAnswer: 1,
    category: "islam",
    level: "advanced",
    difficulty: 2.9
  },
  {
    id: 25,
    question: "من الذي لقب بـ'مجدد القرن الثامن الهجري'؟",
    options: ["ابن القيم الجوزية", "ابن تيمية", "الإمام الشاطبي", "ابن خلدون"],
    correctAnswer: 1,
    category: "islam",
    level: "advanced",
    difficulty: 3.0
  },
  {
    id: 26,
    question: "ما هو الفرق بين الحديث المتواتر والحديث الآحاد؟",
    options: [
      "المتواتر رواه صحابي واحد والآحاد رواه أكثر من صحابي", 
      "المتواتر رواه عدد كبير يستحيل تواطؤهم على الكذب والآحاد رواه عدد قليل", 
      "المتواتر في العقائد والآحاد في الأحكام", 
      "المتواتر لفظي والآحاد معنوي"
    ],
    correctAnswer: 1,
    category: "islam",
    level: "advanced",
    difficulty: 2.8
  },
  {
    id: 27,
    question: "ما هي أول معركة بحرية في تاريخ الإسلام؟",
    options: ["معركة اليرموك", "معركة ذات الصواري", "معركة نهاوند", "فتح قبرص"],
    correctAnswer: 1,
    category: "islam",
    level: "advanced",
    difficulty: 2.9,
    explanation: "معركة ذات الصواري كانت أول معركة بحرية كبرى في تاريخ الإسلام وكانت في عهد الخليفة عثمان بن عفان سنة 34 هـ"
  },
  {
    id: 28,
    question: "ما هو التفسير بالمأثور؟",
    options: [
      "تفسير القرآن بالرأي والاجتهاد", 
      "تفسير القرآن بالقرآن أو السنة أو أقوال الصحابة", 
      "تفسير القرآن بالأحاديث فقط", 
      "تفسير القرآن بالعلوم الحديثة"
    ],
    correctAnswer: 1,
    category: "islam",
    level: "advanced",
    difficulty: 2.7
  },
  {
    id: 29,
    question: "من هو مؤلف كتاب 'المحلى'؟",
    options: ["ابن رشد", "ابن حزم الأندلسي", "ابن قدامة المقدسي", "ابن عبد البر"],
    correctAnswer: 1,
    category: "islam",
    level: "advanced",
    difficulty: 3.0
  },
  {
    id: 30,
    question: "ما هي الكبائر في الإسلام؟",
    options: [
      "الذنوب التي ليس فيها حد", 
      "الذنوب التي يسرها العبد", 
      "الذنوب التي ورد فيها وعيد شديد", 
      "الذنوب التي لا توبة منها"
    ],
    correctAnswer: 2,
    category: "islam",
    level: "advanced",
    difficulty: 2.5
  },
  {
    id: 31,
    question: "من هو الصحابي الذي روى حديث 'إنما الأعمال بالنيات'؟",
    options: ["أبو هريرة", "عمر بن الخطاب", "أنس بن مالك", "عبد الله بن عباس"],
    correctAnswer: 1,
    category: "islam",
    level: "advanced",
    difficulty: 2.6
  },
  {
    id: 32,
    question: "ما هي آخر غزوة غزاها النبي محمد ﷺ بنفسه؟",
    options: ["غزوة تبوك", "غزوة حنين", "غزوة بدر", "غزوة أحد"],
    correctAnswer: 0,
    category: "islam",
    level: "advanced",
    difficulty: 2.7
  },
  {
    id: 33,
    question: "أي من الصحابة كان يلقب بذي النورين؟",
    options: ["علي بن أبي طالب", "عمر بن الخطاب", "أبو بكر الصديق", "عثمان بن عفان"],
    correctAnswer: 3,
    category: "islam",
    level: "advanced",
    difficulty: 2.5
  },
  {
    id: 34,
    question: "ما هي السورة التي تعادل ثلث القرآن؟",
    options: ["سورة الإخلاص", "سورة الفاتحة", "سورة الكوثر", "سورة الناس"],
    correctAnswer: 0,
    category: "islam",
    level: "advanced",
    difficulty: 2.6
  },
  {
    id: 35,
    question: "من هم العشرة المبشرون بالجنة؟",
    options: [
      "أبو بكر وعمر وعثمان وعلي وطلحة والزبير وسعد وسعيد وأبو عبيدة وعبد الرحمن بن عوف", 
      "أبو بكر وعمر وعثمان وعلي وحمزة وجعفر وزيد وبلال وعمار وأبو ذر", 
      "أبو بكر وعمر وعثمان وعلي والحسن والحسين وفاطمة وخديجة وعائشة ومريم", 
      "أبو بكر وعمر وعثمان وعلي وخالد ومعاذ وأبي وأنس وسلمان وأبو الدرداء"
    ],
    correctAnswer: 0,
    category: "islam",
    level: "advanced",
    difficulty: 3.0
  },
  {
    id: 36,
    question: "ما هو الركن السادس من أركان الإيمان؟",
    options: ["الإيمان بالله", "الإيمان بالرسل", "الإيمان باليوم الآخر", "الإيمان بالقضاء والقدر"],
    correctAnswer: 3,
    category: "islam",
    level: "advanced",
    difficulty: 2.5
  },
  {
    id: 37,
    question: "ما هي السنة التي حدثت فيها غزوة بدر؟",
    options: ["السنة الأولى للهجرة", "السنة الثانية للهجرة", "السنة الثالثة للهجرة", "السنة الرابعة للهجرة"],
    correctAnswer: 1,
    category: "islam",
    level: "advanced",
    difficulty: 2.7
  },
  {
    id: 38,
    question: "ما معنى 'الزُّبُر' في القرآن الكريم؟",
    options: ["الكتب", "الحجارة", "الجبال", "الحديد"],
    correctAnswer: 0,
    category: "islam",
    level: "advanced",
    difficulty: 2.8
  },
  {
    id: 39,
    question: "من هو أول من جمع القرآن في مصحف واحد؟",
    options: ["أبو بكر الصديق", "عمر بن الخطاب", "عثمان بن عفان", "علي بن أبي طالب"],
    correctAnswer: 0,
    category: "islam",
    level: "advanced",
    difficulty: 2.6
  },
  {
    id: 40,
    question: "ما هي سورة القتال في القرآن الكريم؟",
    options: ["سورة الأنفال", "سورة التوبة", "سورة محمد", "سورة الأحزاب"],
    correctAnswer: 2,
    category: "islam",
    level: "advanced",
    difficulty: 2.9
  }
];

export default advancedIslamicQuestions;
