
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  backgroundColor: string;
  darkBackgroundColor: string;
}

const categories: Category[] = [
  {
    id: "football",
    name: "كرة القدم",
    icon: "🏟️",
    description: "اختبر معلوماتك في كرة القدم!",
    backgroundColor: "football-bg-light",
    darkBackgroundColor: "football-bg-dark"
  },
  {
    id: "islam",
    name: "الدراسات الإسلامية",
    icon: "📖",
    description: "اختبر معلوماتك في العلوم الإسلامية!",
    backgroundColor: "islam-bg-light",
    darkBackgroundColor: "islam-bg-dark"
  },
  {
    id: "science",
    name: "العلوم",
    icon: "🔬",
    description: "اختبر معلوماتك العلمية!",
    backgroundColor: "science-bg-light",
    darkBackgroundColor: "science-bg-dark"
  }
];

export default categories;
