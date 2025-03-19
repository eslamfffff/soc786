
/**
 * Calculates score based on answer correctness and time taken
 */
export const calculateScore = (isCorrect: boolean, timeRemaining: number, maxTime: number): number => {
  if (!isCorrect) return 0;
  
  // Base score for correct answer
  const baseScore = 100;
  
  // Time bonus (up to 50 additional points for very fast answers)
  const timeBonus = Math.floor((timeRemaining / maxTime) * 50);
  
  return baseScore + timeBonus;
};

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Gets a random subset of questions
 */
export const getRandomQuestions = (questions: any[], count: number): any[] => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
};

/**
 * Formats time in seconds to mm:ss format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
