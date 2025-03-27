
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  backgroundColor: string;
  darkBackgroundColor: string;
  questionCount: number;
}

const categories: Category[] = [
  {
    id: "football",
    name: "كرة القدم",
    icon: "⚽",
    description: "اختبر معلوماتك في كرة القدم!",
    backgroundColor: "football-bg-light",
    darkBackgroundColor: "football-bg-dark",
    questionCount: 25
  },
  {
    id: "islam",
    name: "الدراسات الإسلامية",
    icon: "🕌",
    description: "اختبر معلوماتك في العلوم الإسلامية!",
    backgroundColor: "islam-bg-light",
    darkBackgroundColor: "islam-bg-dark",
    questionCount: 10
  },
  {
    id: "science",
    name: "العلوم",
    icon: "🔬",
    description: "اختبر معلوماتك العلمية!",
    backgroundColor: "science-bg-light",
    darkBackgroundColor: "science-bg-dark",
    questionCount: 10
  }
];

export default categories;
