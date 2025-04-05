
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  backgroundColor: string;
  darkBackgroundColor: string;
  levels: Level[];
}

export interface Level {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  darkColor: string;
  questionCount: number;
  isLocked: boolean;
}

const categories: Category[] = [
  {
    id: "football",
    name: "كرة القدم",
    icon: "⚽",
    description: "اختبر معلوماتك في كرة القدم!",
    backgroundColor: "football-bg-light",
    darkBackgroundColor: "football-bg-dark",
    levels: [
      {
        id: "beginner",
        name: "المبتدئ",
        description: "أسئلة سهلة لمن بدأ للتو التعرف على كرة القدم",
        icon: "🥉",
        color: "bg-green-100 dark:bg-green-900/30",
        darkColor: "dark:bg-green-900/30",
        questionCount: 10,
        isLocked: false
      },
      {
        id: "intermediate",
        name: "المتوسط",
        description: "أسئلة متوسطة الصعوبة لمحبي كرة القدم",
        icon: "🥈",
        color: "bg-blue-100 dark:bg-blue-900/30",
        darkColor: "dark:bg-blue-900/30",
        questionCount: 10,
        isLocked: true
      },
      {
        id: "advanced",
        name: "المتقدم",
        description: "أسئلة صعبة لخبراء كرة القدم",
        icon: "🥇",
        color: "bg-red-100 dark:bg-red-900/30",
        darkColor: "dark:bg-red-900/30",
        questionCount: 5,
        isLocked: true
      }
    ]
  },
  {
    id: "islam",
    name: "الدراسات الإسلامية",
    icon: "🕌",
    description: "اختبر معلوماتك في العلوم الإسلامية!",
    backgroundColor: "islam-bg-light",
    darkBackgroundColor: "islam-bg-dark",
    levels: [
      {
        id: "beginner",
        name: "المبتدئ",
        description: "أسئلة سهلة في العلوم الإسلامية الأساسية",
        icon: "🥉",
        color: "bg-green-100 dark:bg-green-900/30",
        darkColor: "dark:bg-green-900/30",
        questionCount: 10,
        isLocked: false
      },
      {
        id: "intermediate",
        name: "المتوسط",
        description: "أسئلة متوسطة الصعوبة في العلوم الإسلامية",
        icon: "🥈",
        color: "bg-blue-100 dark:bg-blue-900/30",
        darkColor: "dark:bg-blue-900/30",
        questionCount: 0,
        isLocked: true
      },
      {
        id: "advanced",
        name: "المتقدم",
        description: "أسئلة متقدمة للمتخصصين في العلوم الإسلامية",
        icon: "🥇",
        color: "bg-red-100 dark:bg-red-900/30",
        darkColor: "dark:bg-red-900/30",
        questionCount: 0,
        isLocked: true
      }
    ]
  },
  {
    id: "science",
    name: "العلوم",
    icon: "🔬",
    description: "اختبر معلوماتك العلمية!",
    backgroundColor: "science-bg-light",
    darkBackgroundColor: "science-bg-dark",
    levels: [
      {
        id: "beginner",
        name: "المبتدئ",
        description: "أسئلة علمية سهلة للمبتدئين",
        icon: "🥉",
        color: "bg-green-100 dark:bg-green-900/30",
        darkColor: "dark:bg-green-900/30",
        questionCount: 10,
        isLocked: false
      },
      {
        id: "intermediate",
        name: "المتوسط",
        description: "أسئلة علمية متوسطة الصعوبة",
        icon: "🥈",
        color: "bg-blue-100 dark:bg-blue-900/30",
        darkColor: "dark:bg-blue-900/30",
        questionCount: 0,
        isLocked: true
      },
      {
        id: "advanced",
        name: "المتقدم",
        description: "أسئلة علمية متقدمة للخبراء",
        icon: "🥇",
        color: "bg-red-100 dark:bg-red-900/30",
        darkColor: "dark:bg-red-900/30",
        questionCount: 0,
        isLocked: true
      }
    ]
  },
  {
    id: "history",
    name: "التاريخ",
    icon: "📜",
    description: "اختبر معلوماتك في التاريخ العالمي والعربي!",
    backgroundColor: "history-bg-light",
    darkBackgroundColor: "history-bg-dark",
    levels: [
      {
        id: "beginner",
        name: "المبتدئ",
        description: "أسئلة تاريخية سهلة للمبتدئين",
        icon: "🥉",
        color: "bg-green-100 dark:bg-green-900/30",
        darkColor: "dark:bg-green-900/30",
        questionCount: 10,
        isLocked: false
      },
      {
        id: "intermediate",
        name: "المتوسط",
        description: "أسئلة تاريخية متوسطة الصعوبة",
        icon: "🥈",
        color: "bg-blue-100 dark:bg-blue-900/30",
        darkColor: "dark:bg-blue-900/30",
        questionCount: 5,
        isLocked: true
      },
      {
        id: "advanced",
        name: "المتقدم",
        description: "أسئلة تاريخية متقدمة للخبراء",
        icon: "🥇",
        color: "bg-red-100 dark:bg-red-900/30",
        darkColor: "dark:bg-red-900/30",
        questionCount: 3,
        isLocked: true
      }
    ]
  },
  {
    id: "geography",
    name: "الجغرافيا",
    icon: "🌍",
    description: "اختبر معلوماتك في جغرافيا العالم!",
    backgroundColor: "geography-bg-light",
    darkBackgroundColor: "geography-bg-dark",
    levels: [
      {
        id: "beginner",
        name: "المبتدئ",
        description: "أسئلة جغرافية سهلة للمبتدئين",
        icon: "🥉",
        color: "bg-green-100 dark:bg-green-900/30",
        darkColor: "dark:bg-green-900/30",
        questionCount: 10,
        isLocked: false
      },
      {
        id: "intermediate",
        name: "المتوسط",
        description: "أسئلة جغرافية متوسطة الصعوبة",
        icon: "🥈",
        color: "bg-blue-100 dark:bg-blue-900/30",
        darkColor: "dark:bg-blue-900/30",
        questionCount: 5,
        isLocked: true
      },
      {
        id: "advanced",
        name: "المتقدم",
        description: "أسئلة جغرافية متقدمة للخبراء",
        icon: "🥇",
        color: "bg-red-100 dark:bg-red-900/30",
        darkColor: "dark:bg-red-900/30",
        questionCount: 3,
        isLocked: true
      }
    ]
  }
];

export default categories;
