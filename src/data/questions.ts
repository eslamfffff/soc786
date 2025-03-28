
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  level: string; // New field for difficulty level
  explanation?: string; // Optional explanation field
}

const footballQuestions: Question[] = [
  // Beginner level questions
  {
    id: 1,
    question: "أي دولة فازت بكأس العالم لكرة القدم 2022؟",
    options: ["فرنسا", "البرازيل", "الأرجنتين", "ألمانيا"],
    correctAnswer: 2,
    category: "football",
    level: "beginner"
  },
  {
    id: 2,
    question: "من هو صاحب الرقم القياسي في تسجيل الأهداف في سنة تقويمية واحدة؟",
    options: ["كريستيانو رونالدو", "ليونيل ميسي", "بيليه", "روبرت ليفاندوفسكي"],
    correctAnswer: 1,
    category: "football",
    level: "beginner"
  },
  {
    id: 3,
    question: "أي لاعب سجل هدف 'يد الله'؟",
    options: ["دييجو مارادونا", "بيليه", "زين الدين زيدان", "رونالدو"],
    correctAnswer: 0,
    category: "football",
    level: "beginner"
  },
  {
    id: 4,
    question: "أي نادٍ فاز بأكبر عدد من ألقاب دوري أبطال أوروبا؟",
    options: ["برشلونة", "بايرن ميونخ", "ليفربول", "ريال مدريد"],
    correctAnswer: 3,
    category: "football",
    level: "beginner"
  },
  {
    id: 5,
    question: "من هو الهداف التاريخي لكأس العالم؟",
    options: ["كريستيانو رونالدو", "ليونيل ميسي", "ميروسلاف كلوزه", "جيرد مولر"],
    correctAnswer: 2,
    category: "football",
    level: "beginner"
  },
  {
    id: 6,
    question: "أي دولة فازت بأكبر عدد من ألقاب كأس العالم لكرة القدم؟",
    options: ["ألمانيا", "إيطاليا", "الأرجنتين", "البرازيل"],
    correctAnswer: 3,
    category: "football",
    level: "beginner"
  },
  {
    id: 7,
    question: "أي لاعب فاز بأكبر عدد من جوائز الكرة الذهبية؟",
    options: ["كريستيانو رونالدو", "ليونيل ميسي", "ميشيل بلاتيني", "يوهان كرويف"],
    correctAnswer: 1,
    category: "football",
    level: "beginner"
  },
  {
    id: 8,
    question: "في أي سنة أقيمت أول بطولة لكأس العالم؟",
    options: ["1926", "1930", "1934", "1938"],
    correctAnswer: 1,
    category: "football",
    level: "beginner"
  },
  {
    id: 9,
    question: "أي فريق يُعرف باسم 'الشياطين الحمر'؟",
    options: ["ليفربول", "مانشستر يونايتد", "آرسنال", "بايرن ميونخ"],
    correctAnswer: 1,
    category: "football",
    level: "beginner"
  },
  {
    id: 10,
    question: "من هو المدرب الذي فاز بأكبر عدد من ألقاب الدوري الإنجليزي الممتاز؟",
    options: ["جوزيه مورينيو", "أرسين فينغر", "بيب غوارديولا", "السير أليكس فيرغسون"],
    correctAnswer: 3,
    category: "football",
    level: "beginner"
  },
  
  // Intermediate level questions
  {
    id: 11,
    question: "أي لاعب سجل أسرع هاتريك في تاريخ الدوري الإنجليزي الممتاز؟",
    options: ["سيرخيو أغويرو", "ساديو ماني", "آلان شيرر", "روبي فاولر"],
    correctAnswer: 1,
    category: "football",
    level: "intermediate"
  },
  {
    id: 12,
    question: "أي نادٍ درَّبه بيب غوارديولا قبل انضمامه إلى مانشستر سيتي؟",
    options: ["برشلونة", "بايرن ميونخ", "ريال مدريد", "يوفنتوس"],
    correctAnswer: 1,
    category: "football",
    level: "intermediate"
  },
  {
    id: 13,
    question: "من كان أول لاعب يسجل 100 هدف في الدوري الإنجليزي الممتاز؟",
    options: ["آلان شيرر", "واين روني", "تييري هنري", "مايكل أوين"],
    correctAnswer: 0,
    category: "football",
    level: "intermediate"
  },
  {
    id: 14,
    question: "أي دولة فازت بأول بطولة كأس عالم لكرة القدم؟",
    options: ["البرازيل", "أوروغواي", "إيطاليا", "الأرجنتين"],
    correctAnswer: 1,
    category: "football",
    level: "intermediate"
  },
  {
    id: 15,
    question: "أي لاعب يُعرف باسم 'الملك المصري'؟",
    options: ["ساديو ماني", "محمد صلاح", "رياض محرز", "بيير إيميريك أوباميانغ"],
    correctAnswer: 1,
    category: "football",
    level: "intermediate"
  },
  {
    id: 16,
    question: "أي استاد يُعرف باسم 'مسرح الأحلام'؟",
    options: ["أولد ترافورد", "أنفيلد", "كامب نو", "سانتياغو برنابيو"],
    correctAnswer: 0,
    category: "football",
    level: "intermediate"
  },
  {
    id: 17,
    question: "من سجل هدف الفوز في نهائي كأس العالم 2014؟",
    options: ["ليونيل ميسي", "توماس مولر", "ماريو غوتزه", "ميروسلاف كلوزه"],
    correctAnswer: 2,
    category: "football",
    level: "intermediate"
  },
  {
    id: 18,
    question: "أي نادٍ فاز بأكبر عدد من ألقاب الدوري الإنجليزي الممتاز؟",
    options: ["تشيلسي", "مانشستر سيتي", "ليفربول", "مانشستر يونايتد"],
    correctAnswer: 3,
    category: "football",
    level: "intermediate"
  },
  {
    id: 19,
    question: "أي لاعب سجل أكبر عدد من الأهداف في موسم واحد بالدوري الإنجليزي الممتاز (38 مباراة)؟",
    options: ["كريستيانو رونالدو", "آلان شيرر", "محمد صلاح", "لويس سواريز"],
    correctAnswer: 2,
    category: "football",
    level: "intermediate"
  },
  {
    id: 20,
    question: "أي دولة فازت ببطولة أمم أوروبا 2020 (التي أقيمت في 2021)؟",
    options: ["إنجلترا", "إيطاليا", "إسبانيا", "فرنسا"],
    correctAnswer: 1,
    category: "football",
    level: "intermediate"
  },
  
  // Advanced level questions
  {
    id: 21,
    question: "من هو أصغر لاعب يسجل هدفاً في كأس العالم؟",
    options: ["بيليه", "كيليان مبابي", "مايكل أوين", "ليونيل ميسي"],
    correctAnswer: 0,
    category: "football",
    level: "advanced"
  },
  {
    id: 22,
    question: "من هو اللاعب صاحب أكبر عدد من التمريرات الحاسمة في تاريخ الدوري الإنجليزي الممتاز؟",
    options: ["ريان غيغز", "فرانك لامبارد", "سيسك فابريغاس", "كيفن دي بروين"],
    correctAnswer: 0,
    category: "football",
    level: "advanced"
  },
  {
    id: 23,
    question: "أي فريق لم يهبط أبداً من الدوري الإنجليزي الممتاز منذ تأسيسه في عام 1992؟",
    options: ["مانشستر يونايتد", "آرسنال", "تشيلسي", "ليفربول"],
    correctAnswer: 0,
    category: "football",
    level: "advanced"
  },
  {
    id: 24,
    question: "من هو اللاعب الوحيد الذي فاز بدوري أبطال أوروبا مع ثلاثة أندية مختلفة؟",
    options: ["كريستيانو رونالدو", "كلارنس سيدورف", "زلاتان إبراهيموفيتش", "تييري هنري"],
    correctAnswer: 1,
    category: "football",
    level: "advanced"
  },
  {
    id: 25,
    question: "أي لاعب كرة قدم لديه أكبر عدد من المتابعين على إنستغرام؟",
    options: ["ليونيل ميسي", "نيمار جونيور", "كريستيانو رونالدو", "ديفيد بيكهام"],
    correctAnswer: 2,
    category: "football",
    level: "advanced"
  }
];

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
  }
];

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
  }
];

const questions: Question[] = [
  ...footballQuestions,
  ...islamicQuestions,
  ...scienceQuestions
];

export const getQuestionsByCategory = (categoryId: string): Question[] => {
  return questions.filter(question => question.category === categoryId);
};

export const getQuestionsByCategoryAndLevel = (categoryId: string, levelId: string): Question[] => {
  return questions.filter(
    question => question.category === categoryId && question.level === levelId
  );
};

export default questions;
