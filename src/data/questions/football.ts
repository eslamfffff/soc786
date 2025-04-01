import { Question } from './types';

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
  },
  
  // New advanced level questions
  {
    id: 26,
    question: "من هو اللاعب الذي يحمل الرقم القياسي في عدد المباريات الدولية؟",
    options: ["كريستيانو رونالدو", "سيرخيو راموس", "أحمد حسن", "ليونيل ميسي"],
    correctAnswer: 0,
    category: "football",
    level: "advanced"
  },
  {
    id: 27,
    question: "أي مدرب فاز بدوري أبطال أوروبا مع ثلاثة أندية مختلفة؟",
    options: ["كارلو أنشيلوتي", "جوزيه مورينيو", "بيب غوارديولا", "يورغن كلوب"],
    correctAnswer: 0,
    category: "football",
    level: "advanced"
  },
  {
    id: 28,
    question: "ما اسم الملعب الذي استضاف نهائي كأس العالم 2022؟",
    options: ["استاد البيت", "استاد لوسيل", "استاد الجنوب", "استاد أحمد بن علي"],
    correctAnswer: 1,
    category: "football",
    level: "advanced"
  },
  {
    id: 29,
    question: "من هو الهداف التاريخي للدوري الإنجليزي الممتاز؟",
    options: ["واين روني", "آلان شيرر", "سيرخيو أغويرو", "هاري كين"],
    correctAnswer: 1,
    category: "football",
    level: "advanced"
  },
  {
    id: 30,
    question: "من هو أصغر لاعب يسجل في نهائي كأس العالم؟",
    options: ["بيليه", "كيليان مبابي", "مايكل أوين", "ديفيد ألابا"],
    correctAnswer: 0,
    category: "football",
    level: "advanced"
  },
  {
    id: 31,
    question: "أي نادٍ فاز بأكبر عدد من ألقاب الدوري الإسباني؟",
    options: ["برشلونة", "ريال مدريد", "أتلتيكو مدريد", "فالنسيا"],
    correctAnswer: 1,
    category: "football",
    level: "advanced"
  },
  {
    id: 32,
    question: "من هو اللاعب الوحيد الذي فاز بجائزة أفضل لاعب في العالم (فيفا) ثلاث مرات متتالية؟",
    options: ["كريستيانو رونالدو", "ليونيل ميسي", "زين الدين زيدان", "رونالدو نازاريو"],
    correctAnswer: 0,
    category: "football",
    level: "advanced"
  },
  {
    id: 33,
    question: "أي نادٍ فاز بأول نسخة من دوري أبطال أوروبا (كأس الأندية الأوروبية البطلة سابقاً)؟",
    options: ["ريال مدريد", "بنفيكا", "ميلان", "ليفربول"],
    correctAnswer: 0,
    category: "football",
    level: "advanced"
  },
  {
    id: 34,
    question: "ما هو أكبر فوز في تاريخ كأس العالم لكرة القدم؟",
    options: ["ألمانيا 7-1 البرازيل", "المجر 10-1 السلفادور", "أستراليا 31-0 ساموا الأمريكية", "أسبانيا 10-0 تاهيتي"],
    correctAnswer: 1,
    category: "football",
    level: "advanced"
  },
  {
    id: 35,
    question: "من هو الحارس الوحيد الذي فاز بجائزة ��لكرة الذهبية؟",
    options: ["إيكر كاسياس", "جيانلويجي بوفون", "ليف ياشين", "مانويل نوير"],
    correctAnswer: 2,
    category: "football",
    level: "advanced"
  }
];

export default footballQuestions;
