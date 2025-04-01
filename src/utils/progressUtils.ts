// Function to load user progress from localStorage
export const loadProgress = () => {
  try {
    const serializedProgress = localStorage.getItem('userProgress');
    if (serializedProgress === null) {
      return {
        completedLevels: {},
        completedStages: {},
        stageCompletion: {}
      };
    }
    return JSON.parse(serializedProgress);
  } catch (error) {
    console.error("Failed to load progress from localStorage:", error);
    return {
      completedLevels: {},
      completedStages: {},
      stageCompletion: {}
    };
  }
};

// Function to save user progress to localStorage
export const saveProgress = (progress: any) => {
  try {
    const serializedProgress = JSON.stringify(progress);
    localStorage.setItem('userProgress', serializedProgress);
  } catch (error) {
    console.error("Failed to save progress to localStorage:", error);
  }
};

// Function to save level completion status
export const saveLevelCompletion = (categoryId: string, levelId: string, percentage: number) => {
  const progress = loadProgress();
  if (!progress.completedLevels) {
    progress.completedLevels = {};
  }
  if (!progress.completedLevels[categoryId]) {
    progress.completedLevels[categoryId] = {};
  }
  progress.completedLevels[categoryId][levelId] = percentage;
  saveProgress(progress);
};

// Function to save stage completion status
export const saveStageCompletion = (categoryId: string, stageId: string, completed: boolean, percentage: number) => {
  const progress = loadProgress();
  if (!progress.completedStages) {
    progress.completedStages = {};
  }
  if (!progress.completedStages[categoryId]) {
    progress.completedStages[categoryId] = {};
  }
  progress.completedStages[categoryId][stageId] = completed;
    
  if (!progress.stageCompletion) {
    progress.stageCompletion = {};
  }
    
  if (!progress.stageCompletion[categoryId]) {
    progress.stageCompletion[categoryId] = {};
  }
    
  progress.stageCompletion[categoryId][stageId] = percentage;
  saveProgress(progress);
};

// Function to check if a level is unlocked
export const isLevelUnlocked = (categoryId: string, levelId: string, progress: any): boolean => {
  if (levelId === 'beginner') return true;
  
  const previousLevelId = levelId === 'intermediate' ? 'beginner' : 'intermediate';
  const requiredPercentage = getUnlockThreshold(levelId);
  
  const completedLevels = progress.completedLevels || {};
  const categoryProgress = completedLevels[categoryId] || {};
  
  return (categoryProgress[previousLevelId] || 0) >= requiredPercentage;
};

// Function to check if a stage is unlocked
export const isStageUnlocked = (categoryId: string, stageId: string, progress: any): boolean => {
  const stages = stageId.split('-');
  const level = stages[0];
  const stageNumber = parseInt(stages[1]);
  
  if (stageNumber === 1) return true;
  
  const previousStageId = `${level}-${stageNumber - 1}`;
  return progress.completedStages?.[categoryId]?.[previousStageId] === true;
};

// Function to get the unlock requirement text
export const getUnlockRequirementText = (levelId: string): string => {
  if (levelId === 'beginner') return "هذا المستوى مفتوح تلقائيًا.";
  
  const previousLevel = levelId === 'intermediate' ? 'المبتدئ' : 'المتوسط';
  const threshold = getUnlockThreshold(levelId);
  
  return `يجب إكمال المستوى ${previousLevel} بنسبة ${threshold}% على الأقل لفتح هذا المستوى.`;
};

// Function to get the unlock threshold
export const getUnlockThreshold = (levelId: string): number => {
  switch (levelId) {
    case 'intermediate':
      return 70;
    case 'advanced':
      return 70;
    default:
      return 70;
  }
};

// Improved function to ensure unique questions for each stage
export const getUniqueQuestions = (
  allQuestions: any[], 
  categoryId: string, 
  levelId: string, 
  count: number = 10,
  stageId?: string
) => {
  if (allQuestions.length === 0) return [];
  
  // Parse stage number from stageId
  const stageNumber = stageId ? parseInt(stageId.split('-')[1]) || 1 : 1;
  
  // Filter questions for this category and level
  const filteredQuestions = allQuestions.filter(
    q => q.category === categoryId && q.level === levelId
  );
  
  if (filteredQuestions.length === 0) return [];
  
  // Create a more deterministic but different shuffle for each stage
  // Use a consistent seeded random approach
  const seedRandom = (seed: number) => {
    let state = seed;
    return () => {
      state = (state * 9301 + 49297) % 233280;
      return state / 233280;
    };
  };
  
  // Use stage number as part of the seed for consistent but different questions per stage
  const random = seedRandom(stageNumber * 100 + (levelId === 'beginner' ? 1 : levelId === 'intermediate' ? 2 : 3) * 1000);
  
  // Make a copy of questions to shuffle
  const shuffled = [...filteredQuestions];
  
  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Get difficulty-based questions
  let easyQuestions = shuffled.filter(q => q.difficulty === 1);
  let mediumQuestions = shuffled.filter(q => q.difficulty === 2);
  let hardQuestions = shuffled.filter(q => q.difficulty === 3);
  
  // If difficulty isn't specified, create balanced pools
  if (easyQuestions.length + mediumQuestions.length + hardQuestions.length === 0) {
    const chunkSize = Math.floor(shuffled.length / 3);
    easyQuestions = shuffled.slice(0, chunkSize);
    mediumQuestions = shuffled.slice(chunkSize, chunkSize * 2);
    hardQuestions = shuffled.slice(chunkSize * 2);
  }
  
  // Modify selection based on stage number to ensure progression
  // Earlier stages get more easy questions, later stages get more hard questions
  const stagePosition = Math.min(stageNumber / 10, 1); // 0 to 1 based on stage position
  
  let easyRatio, mediumRatio, hardRatio;
  
  if (levelId === 'beginner') {
    // Beginner level: gradually decrease easy questions, increase medium and hard
    easyRatio = 0.7 - stagePosition * 0.4; // 0.7 → 0.3
    mediumRatio = 0.2 + stagePosition * 0.3; // 0.2 → 0.5
    hardRatio = 0.1 + stagePosition * 0.1; // 0.1 → 0.2
  } else if (levelId === 'intermediate') {
    // Intermediate level: balance between all types with progression
    easyRatio = 0.4 - stagePosition * 0.3; // 0.4 → 0.1
    mediumRatio = 0.4; // Stay constant
    hardRatio = 0.2 + stagePosition * 0.3; // 0.2 → 0.5
  } else {
    // Advanced level: mostly medium and hard with progression
    easyRatio = 0.2 - stagePosition * 0.1; // 0.2 → 0.1
    mediumRatio = 0.5 - stagePosition * 0.2; // 0.5 → 0.3
    hardRatio = 0.3 + stagePosition * 0.3; // 0.3 → 0.6
  }
  
  // Calculate counts for each difficulty
  const easyCount = Math.max(1, Math.min(Math.round(count * easyRatio), easyQuestions.length));
  const hardCount = Math.max(1, Math.min(Math.round(count * hardRatio), hardQuestions.length));
  const mediumCount = Math.min(count - easyCount - hardCount, mediumQuestions.length);
  
  // Select questions based on calculated counts
  const result = [
    ...easyQuestions.slice(0, easyCount),
    ...mediumQuestions.slice(0, mediumCount),
    ...hardQuestions.slice(0, hardCount)
  ];
  
  // If we don't have enough questions, add more from any difficulty
  if (result.length < count) {
    // Remaining shuffled questions not already selected
    const usedIds = new Set(result.map(q => q.id));
    const remainingQuestions = shuffled.filter(q => !usedIds.has(q.id));
    
    // Add remaining questions up to count
    result.push(...remainingQuestions.slice(0, count - result.length));
  }
  
  // Final shuffle of the result for better question order
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result.slice(0, count);
};
