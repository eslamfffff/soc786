import { Question } from './types';

const islamicQuestions: Question[] = [
  // Beginner level questions
  {
    id: 1,
    question: "كم عدد السور في القرآن الكريم؟",
    options: ["110", "114", "120", "116"],
    correctAnswer: 1,
    category: "islam",
    level: "beginner"
  },
  {
    id: 2,
    question: "من هو أول الخلفاء الراشدين؟",
    options: ["عمر بن الخطاب", "عثمان بن عفان", "علي بن أبي طالب", "أبو بكر الصديق"],
    correctAnswer: 3,
    category: "islam",
    level: "beginner"
  },
  {
    id: 3,
    question: "كم عدد أركان الإسلام؟",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    category: "islam",
    level: "beginner"
  },
  {
    id: 4,
    question: "أين ولد النبي محمد صلى الله عليه وسلم؟",
    options: ["المدينة المنورة", "الطائف", "مكة المكرمة", "القدس"],
    correctAnswer: 2,
    category: "islam",
    level: "beginner"
  },
  {
    id: 5,
    question: "ما هي أول سورة نزلت على النبي محمد؟",
    options: ["الفاتحة", "البقرة", "العلق", "يس"],
    correctAnswer: 2,
    category: "islam",
    level: "beginner"
  },
  {
    id: 6,
    question: "من هو النبي الذي لُقب بأبي الأنبياء؟",
    options: ["نوح عليه السلام", "إبراهيم عليه السلام", "موسى عليه السلام", "عيسى عليه السلام"],
    correctAnswer: 1,
    category: "islam",
    level: "beginner"
  },
  {
    id: 7,
    question: "كم عدد ركعات صلاة الظهر؟",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    category: "islam",
    level: "beginner"
  },
  {
    id: 8,
    question: "ما هو الشهر الذي فرض فيه الصيام على المسلمين؟",
    options: ["رجب", "شعبان", "رمضان", "محرم"],
    correctAnswer: 2,
    category: "islam",
    level: "beginner"
  },
  {
    id: 9,
    question: "من هو آخر الأنبياء والرسل؟",
    options: ["إبراهيم عليه السلام", "عيسى عليه السلام", "محمد صلى الله عليه وسلم", "موسى عليه السلام"],
    correctAnswer: 2,
    category: "islam",
    level: "beginner"
  },
  {
    id: 10,
    question: "كم مرة ذُكر اسم النبي محمد في القرآن الكريم؟",
    options: ["مرة واحدة", "4 مرات", "7 مرات", "10 مرات"],
    correctAnswer: 1,
    category: "islam",
    level: "beginner"
  },
  
  // Intermediate level questions
  {
    id: 11,
    question: "من هو الصحابي الذي لُقب بـ'سيف الله المسلول'؟",
    options: ["أبو بكر الصديق", "خالد بن الوليد", "عمر بن الخطاب", "علي بن أبي طالب"],
    correctAnswer: 1,
    category: "islam",
    level: "intermediate",
    difficulty: 2.0,
    explanation: "خالد بن الوليد لُقب بسيف الله المسلول بسبب براعته في القتال ودوره في الفتوحات الإسلامية"
  },
  {
    id: 12,
    question: "ما هو الكتاب الذي ألفه الإمام البخاري؟",
    options: ["صحيح مسلم", "سنن أبي داود", "صحيح البخاري", "الموطأ"],
    correctAnswer: 2,
    category: "islam",
    level: "intermediate",
    difficulty: 1.8
  },
  {
    id: 13,
    question: "كم عدد الأنبياء المذكورين في القرآن الكريم باسمهم؟",
    options: ["20", "25", "30", "35"],
    correctAnswer: 1,
    category: "islam",
    level: "intermediate",
    difficulty: 2.2
  },
  {
    id: 14,
    question: "من هو الخليفة الأموي الذي بنى قبة الصخرة؟",
    options: ["معاوية بن أبي سفيان", "عبد الملك بن مروان", "الوليد بن عبد الملك", "عمر بن عبد العزيز"],
    correctAnswer: 1,
    category: "islam",
    level: "intermediate",
    difficulty: 2.5
  },
  {
    id: 15,
    question: "ما هي السورة التي تسمى قلب القرآن؟",
    options: ["سورة يس", "سورة الرحمن", "سورة الفاتحة", "سورة الإخلاص"],
    correctAnswer: 0,
    category: "islam",
    level: "intermediate",
    difficulty: 1.9
  },
  {
    id: 16,
    question: "ما هي آخر آية نزلت في القرآن الكريم؟",
    options: ["آية الكرسي", "آية المواريث", "آية الربا", "آية إكمال الدين"],
    correctAnswer: 3,
    category: "islam",
    level: "intermediate",
    difficulty: 2.3
  },
  {
    id: 17,
    question: "من هو الصحابي الذي لقب بأمين الأمة؟",
    options: ["أبو عبيدة بن الجراح", "عثمان بن عفان", "أبو هريرة", "سعد بن أبي وقاص"],
    correctAnswer: 0,
    category: "islam",
    level: "intermediate",
    difficulty: 2.4
  },
  {
    id: 18,
    question: "ما هو الكتاب الذي ألفه الإمام مالك؟",
    options: ["المسند", "الموطأ", "الأم", "الرسالة"],
    correctAnswer: 1,
    category: "islam",
    level: "intermediate",
    difficulty: 2.0
  },
  {
    id: 19,
    question: "كم عدد الصحابة الذين شهدوا بيعة العقبة الثانية؟",
    options: ["70", "73", "75", "80"],
    correctAnswer: 1,
    category: "islam",
    level: "intermediate",
    difficulty: 2.6
  },
  {
    id: 20,
    question: "في أي سنة هجرية كانت غزوة بدر؟",
    options: ["السنة الأولى", "السنة الثانية", "السنة الثالثة", "السنة الرابعة"],
    correctAnswer: 1,
    category: "islam",
    level: "intermediate",
    difficulty: 1.7
  },
  
  // Advanced level questions
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
  }
];

export default islamicQuestions;
