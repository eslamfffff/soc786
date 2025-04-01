import { Question } from './types';

const scienceQuestions: Question[] = [
  // Beginner level questions
  {
    id: 1,
    question: "ما هو الرمز الكيميائي للذهب؟",
    options: ["Au", "Ag", "Fe", "Zn"],
    correctAnswer: 0,
    category: "science",
    level: "beginner"
  },
  {
    id: 2,
    question: "ما هي أقرب مجرة إلى مجرة درب التبانة؟",
    options: ["المجرة المثلثية", "مجرة أندروميدا", "مجرة العين السوداء", "مجرة العجلة"],
    correctAnswer: 1,
    category: "science",
    level: "beginner"
  },
  {
    id: 3,
    question: "ما هو أكبر عضو في جسم الإنسان؟",
    options: ["الكبد", "الدماغ", "القلب", "الجلد"],
    correctAnswer: 3,
    category: "science",
    level: "beginner"
  },
  {
    id: 4,
    question: "أي من الكواكب التالية هو الأقرب إلى الشمس؟",
    options: ["الزهرة", "المريخ", "الأرض", "عطارد"],
    correctAnswer: 3,
    category: "science",
    level: "beginner"
  },
  {
    id: 5,
    question: "ما هي وحدة قياس القوة في النظام الدولي؟",
    options: ["واط", "جول", "نيوتن", "أمبير"],
    correctAnswer: 2,
    category: "science",
    level: "beginner"
  },
  {
    id: 6,
    question: "من هو مكتشف الجاذبية؟",
    options: ["ألبرت أينشتاين", "إسحاق نيوتن", "غاليليو غاليلي", "نيلز بور"],
    correctAnswer: 1,
    category: "science",
    level: "beginner"
  },
  {
    id: 7,
    question: "ما هي الصيغة الكيميائية للماء؟",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctAnswer: 1,
    category: "science",
    level: "beginner"
  },
  {
    id: 8,
    question: "ما هو العنصر الأكثر وفرة في الكون؟",
    options: ["الأكسجين", "الكربون", "الهيدروجين", "النيتروجين"],
    correctAnswer: 2,
    category: "science",
    level: "beginner"
  },
  {
    id: 9,
    question: "ما هي سرعة الضوء التقريبية في الفراغ؟",
    options: ["300,000 كم/ثانية", "150,000 كم/ثانية", "200,000 كم/ثانية", "250,000 كم/ثانية"],
    correctAnswer: 0,
    category: "science",
    level: "beginner"
  },
  {
    id: 10,
    question: "ما هو العلم الذي يدرس الحيوانات؟",
    options: ["علم النبات", "علم الأحياء", "علم الحيوان", "علم البيئة"],
    correctAnswer: 2,
    category: "science",
    level: "beginner"
  },
  
  // Intermediate level questions
  {
    id: 11,
    question: "ما هو العنصر الأكثر توصيلًا للكهرباء؟",
    options: ["الذهب", "النحاس", "الفضة", "الألومنيوم"],
    correctAnswer: 2,
    category: "science",
    level: "intermediate",
    difficulty: 2.0
  },
  {
    id: 12,
    question: "أي من التالي ليس من الغازات النبيلة؟",
    options: ["النيون", "الأرغون", "الكريبتون", "النيتروجين"],
    correctAnswer: 3,
    category: "science",
    level: "intermediate",
    difficulty: 2.2
  },
  {
    id: 13,
    question: "ما هو أكبر عضو داخلي في جسم الإنسان؟",
    options: ["القلب", "الكبد", "الدماغ", "المعدة"],
    correctAnswer: 1,
    category: "science",
    level: "intermediate",
    difficulty: 1.8
  },
  {
    id: 14,
    question: "ما هو قانون نيوتن الثاني للحركة؟",
    options: [
      "القوة تساوي الكتلة مضروبة في التسارع", 
      "لكل فع�� رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه", 
      "الجسم يبقى على حالته من السكون أو الحركة المنتظمة إلا إذا أثرت عليه قوة", 
      "الطاقة لا تفنى ولا تستحدث"
    ],
    correctAnswer: 0,
    category: "science",
    level: "intermediate",
    difficulty: 2.1
  },
  {
    id: 15,
    question: "ما هو أكبر محيط في العالم؟",
    options: ["المحيط الأطلسي", "المحيط الهندي", "المحيط المتجمد الشمالي", "المحيط الهادئ"],
    correctAnswer: 3,
    category: "science",
    level: "intermediate",
    difficulty: 1.9
  },
  {
    id: 16,
    question: "ما هي أطول سلسلة جبال في العالم؟",
    options: ["جبال الهيمالايا", "جبال الأنديز", "جبال الألب", "جبال روكي"],
    correctAnswer: 1,
    category: "science",
    level: "intermediate",
    difficulty: 2.3
  },
  {
    id: 17,
    question: "ما هي الحالة التي تكون فيها المادة صلبة وسائلة في نفس الوقت؟",
    options: ["البلازما", "البلورات السائلة", "المعلق", "الغروي"],
    correctAnswer: 1,
    category: "science",
    level: "intermediate",
    difficulty: 2.5
  },
  {
    id: 18,
    question: "ما هو الهرمون المسؤول عن تنظيم مستوى السكر في الدم؟",
    options: ["الأدرينالين", "التستوستيرون", "الإنسولين", "الثيروكسين"],
    correctAnswer: 2,
    category: "science",
    level: "intermediate",
    difficulty: 1.7
  },
  {
    id: 19,
    question: "ما هي السرعة التي ينتقل بها الصوت في الهواء تقريبًا؟",
    options: ["300 م/ث", "340 م/ث", "500 م/ث", "1000 م/ث"],
    correctAnswer: 1,
    category: "science",
    level: "intermediate",
    difficulty: 2.0
  },
  {
    id: 20,
    question: "ما هو أكبر كوكب في النظام الشمسي؟",
    options: ["الأرض", "المشتري", "زحل", "نبتون"],
    correctAnswer: 1,
    category: "science",
    level: "intermediate",
    difficulty: 1.5
  },
  
  // Advanced level questions
  {
    id: 21,
    question: "ما هي نظرية الأوتار الفائقة؟",
    options: [
      "نظرية تفسر سلوك الجسيمات دون الذرية كأوتار مهتزة", 
      "نظرية تفسر نشأة الكون", 
      "نظرية تفسر الجاذبية", 
      "نظرية تفسر تشكل المجرات"
    ],
    correctAnswer: 0,
    category: "science",
    level: "advanced",
    difficulty: 3.0
  },
  {
    id: 22,
    question: "ما هو مبدأ هايزنبرغ للارتياب؟",
    options: [
      "لا يمكن تحديد موضع وسرعة الجسيم في نفس الوقت بدقة تامة", 
      "الكتلة والطاقة وجهان لعملة واحدة", 
      "المادة والطاقة لا تفنى ولا تستحدث", 
      "الضوء يسلك سلوك الموجة والجسيم في آن واحد"
    ],
    correctAnswer: 0,
    category: "science",
    level: "advanced",
    difficulty: 2.9
  },
  {
    id: 23,
    question: "ما هو العنصر الذي له أكبر عدد من النظائر؟",
    options: ["الهيدروجين", "الكربون", "الزينون", "الكريبتون"],
    correctAnswer: 2,
    category: "science",
    level: "advanced",
    difficulty: 2.8
  },
  {
    id: 24,
    question: "ما هي المعادل�� التي تعبر عن نظرية النسبية الخاصة لأينشتاين؟",
    options: ["E = mc²", "F = ma", "PV = nRT", "E = hf"],
    correctAnswer: 0,
    category: "science",
    level: "advanced",
    difficulty: 2.6
  },
  {
    id: 25,
    question: "ما هو القانون الثالث لكبلر؟",
    options: [
      "مربع زمن الدوران لكوكب حول الشمس يتناسب مع مكعب متوسط بعده عن الشمس", 
      "الكواكب تدور في مدارات إهليلجية تكون الشمس في أحد بؤرتيها", 
      "الخط الواصل من الشمس إلى الكوكب يمسح مساحات متساوية في أزمنة متساوية", 
      "قوة الجذب بين جسمين تتناسب طرديًا مع حاصل ضرب كتلتيهما وعكسيًا مع مربع المسافة بينهما"
    ],
    correctAnswer: 0,
    category: "science",
    level: "advanced",
    difficulty: 2.7
  },
  {
    id: 26,
    question: "ما هو تأثير دوبلر؟",
    options: [
      "تغير التردد الظاهري للموجات بالنسبة للمراقب المتحرك", 
      "انحناء الضوء عند مروره بجسم ذي جاذبية قوية", 
      "اختلاف سرعة الضوء باختلاف الوسط", 
      "تداخل الموجات الضوئية"
    ],
    correctAnswer: 0,
    category: "science",
    level: "advanced",
    difficulty: 2.7
  },
  {
    id: 27,
    question: "ما هو عدد الأحماض الأمينية الأساسية التي لا يستطيع جسم الإنسان تصنيعها؟",
    options: ["6", "9", "12", "20"],
    correctAnswer: 1,
    category: "science",
    level: "advanced",
    difficulty: 2.8
  },
  {
    id: 28,
    question: "ما هو العملية التي تسمى التمثيل الضوئي العكسي؟",
    options: [
      "عملية تنفس الخلايا", 
      "عملية تحويل الضوء إلى كيمياء", 
      "عملية تحويل السكر إلى طاقة", 
      "عملية إنتاج الأكسجين"
    ],
    correctAnswer: 0,
    category: "science",
    level: "advanced",
    difficulty: 2.9
  },
  {
    id: 29,
    question: "ما هو قانون هارتلي-شانون؟",
    options: [
      "قانون في نظرية المعلومات يربط بين معدل نقل المعلومات وعرض النطاق الترددي", 
      "قانون في الديناميكا الحرارية", 
      "قانون في الكهرومغناطيسية", 
      "قانون في ميكانيكا الكم"
    ],
    correctAnswer: 0,
    category: "science",
    level: "advanced",
    difficulty: 3.0
  },
  {
    id: 30,
    question: "ما هو طبقة الأوزون وأين توجد؟",
    options: [
      "طبقة من غاز الأوزون في الطبقة السفلى من الغلاف الجوي", 
      "طبقة من غاز الأوزون في طبقة الستراتوسفير", 
      "طبقة من غاز الأوزون في طبقة الميزوسفير", 
      "طبقة من غاز الأوزون في الغلاف المائي"
    ],
    correctAnswer: 1,
    category: "science",
    level: "advanced",
    difficulty: 2.5
  },
  
  // New advanced level questions
  {
    id: 31,
    question: "ما هو الجسم الغريب الفضائي الذي زار نظامنا الشمسي في عام 2017؟",
    options: ["أوموامو", "أتلانتيس", "كويبر", "نيبيرو"],
    correctAnswer: 0,
    category: "science",
    level: "advanced",
    difficulty: 2.8
  },
  {
    id: 32,
    question: "ما هو الفرق بين الخلية حقيقية النواة والخلية بدائية النواة؟",
    options: [
      "الخلية حقيقية النواة أصغر من بدائية النواة", 
      "الخلية حقيقية النواة لها نواة محاطة بغشاء بينما بدائية النواة ليس لها نواة محددة", 
      "الخلية بدائية النواة لها ميتوكوندريا بينما حقيقية النواة ليس لها", 
      "الخلية بدائية النواة متعددة الخلايا بينما حقيقية النواة وحيدة الخلية"
    ],
    correctAnswer: 1,
    category: "science",
    level: "advanced",
    difficulty: 2.7
  },
  {
    id: 33,
    question: "ما هي أكبر غدة في جسم الإنسان؟",
    options: ["الغدة الدرقية", "الغدة النخامية", "الكبد", "البنكرياس"],
    correctAnswer: 2,
    category: "science",
    level: "advanced",
    difficulty: 2.6
  },
  {
    id: 34,
    question: "ما هو الرقم الذري للكربون؟",
    options: ["4", "6", "8", "12"],
    correctAnswer: 1,
    category: "science",
    level: "advanced",
    difficulty: 2.5
  },
  {
    id: 35,
    question: "ما هو مقدار الطاقة الناتجة عن تحويل 1 جرام من المادة إلى طاقة وفقاً لمعادلة E=mc²؟",
    options: [
      "9×10¹⁶ جول", 
      "9×10¹⁵ جول", 
      "9×10¹⁷ جول", 
      "9×10¹⁸ جول"
    ],
    correctAnswer: 0,
    category: "science",
    level: "advanced",
    difficulty: 3.0
  },
  {
    id: 36,
    question: "أي من العناصر التالية له أعلى كثافة في درجة حرارة الغرفة؟",
    options: ["الذهب", "الرصاص", "البلاتين", "الأوزميوم"],
    correctAnswer: 3,
    category: "science",
    level: "advanced",
    difficulty: 2.9
  },
  {
    id: 37,
    question: "ما هو الفرق بين الجسيمات الأولية المسماة فرميونات والجسيمات المسماة بوزونات؟",
    options: [
      "الفرميونات تحمل شحنة كهربائية والبوزونات محايدة", 
      "الفرميونات تشكل المادة والبوزونات تنقل القوى", 
      "الفرميونات أثقل من البوزونات", 
      "الفرميونات موجات والبوزونات جسيمات"
    ],
    correctAnswer: 1,
    category: "science",
    level: "advanced",
    difficulty: 3.0
  },
  {
    id: 38,
    question: "أي من التالي ليس من علماء الفيزياء الذين ساهموا في تطوير نظرية الكم؟",
    options: ["نيلز بور", "فيرنر هايزنبرغ", "ألبرت أينشتاين", "تشارلز داروين"],
    correctAnswer: 3,
    category: "science",
    level: "advanced",
    difficulty: 2.7
  },
  {
    id: 39,
    question: "ما هو علم دراسة الطقس والمناخ؟",
    options: ["علم الجيولوجيا", "علم الأرصاد الجوية", "علم المحيطات", "علم الفلك"],
    correctAnswer: 1,
    category: "science",
    level: "advanced",
    difficulty: 2.5
  },
  {
    id: 40,
    question: "ما هو الفيروس المسبب لمرض كوفيد-19؟",
    options: [
      "فيروس كورونا المرتبط بالمتلازمة التنفسية الحادة الشديدة 2 (SARS-CoV-2)", 
      "فيروس نقص المناعة البشرية (HIV)", 
      "فيروس إيبولا", 
      "فيروس الإنفلونزا H1N1"
    ],
    correctAnswer: 0,
    category: "science",
    level: "advanced",
    difficulty: 2.6
  }
];

export default scienceQuestions;
