
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

// Load custom uploaded questions from localStorage
export const loadUploadedQuestions = () => {
  try {
    const serializedQuestions = localStorage.getItem('uploadedQuestions');
    if (serializedQuestions === null) {
      return [];
    }
    return JSON.parse(serializedQuestions);
  } catch (error) {
    console.error("Failed to load uploaded questions from localStorage:", error);
    return [];
  }
};

// Get questions for a specific stage
export const getQuestionsByStage = (allQuestions: any[], categoryId: string, stageId: string, count: number = 10) => {
  // Filter questions specifically assigned to this stage
  const stageQuestions = allQuestions.filter(
    q => q.category === categoryId && q.stageId === stageId
  );
  
  // Include custom uploaded questions that match the category and stage
  const uploadedQuestions = loadUploadedQuestions().filter(
    (q: any) => q.category === categoryId && q.stageId === stageId
  );
  
  // Combine default questions with uploaded questions
  const combinedQuestions = [
    ...stageQuestions,
    ...uploadedQuestions
  ];
  
  if (combinedQuestions.length === 0) {
    // Fallback for stages without explicitly assigned questions
    return getUniqueQuestions(allQuestions, categoryId, stageId.split('-')[0], count, stageId);
  }
  
  // If we don't have enough questions, duplicate some to reach the desired count
  if (combinedQuestions.length < count) {
    const multiplier = Math.ceil(count / combinedQuestions.length);
    const expanded = Array(multiplier).fill(combinedQuestions).flat();
    return expanded.slice(0, count);
  }
  
  return combinedQuestions.slice(0, count);
};

// Improved function to ensure unique questions for each stage - always returning exactly 10 questions
export const getUniqueQuestions = (
  allQuestions: any[], 
  categoryId: string, 
  levelId: string, 
  count: number = 10,
  stageId?: string
) => {
  if (allQuestions.length === 0) return [];
  
  // If stageId is provided, try to get questions specifically for that stage first
  if (stageId) {
    const stageSpecificQuestions = allQuestions.filter(
      q => q.category === categoryId && q.stageId === stageId
    );
    
    if (stageSpecificQuestions.length > 0) {
      if (stageSpecificQuestions.length >= count) {
        return stageSpecificQuestions.slice(0, count);
      } else {
        // If not enough stage-specific questions, we'll use them all and won't get duplicates
        console.log(`Found ${stageSpecificQuestions.length} questions for stage ${stageId}, but need ${count}`);
      }
    }
  }
  
  // Parse stage number from stageId
  const stageNumber = stageId ? parseInt(stageId.split('-')[1]) || 1 : 1;
  
  // Include custom uploaded questions that match the category and level
  const uploadedQuestions = loadUploadedQuestions().filter(
    (q: any) => q.category === categoryId && q.level === levelId
  );
  
  // Combine default questions with uploaded questions
  const combinedQuestions = [
    ...allQuestions,
    ...uploadedQuestions
  ];
  
  // Step 1: Get all level-specific questions
  const levelQuestions = combinedQuestions.filter(
    q => q.category === categoryId && q.level === levelId
  );
  
  if (levelQuestions.length === 0) return [];
  
  // Step 2: Split questions by stage
  const questionsByStage: Record<string, any[]> = {};
  
  // Group questions by stage
  levelQuestions.forEach(q => {
    if (q.stageId) {
      if (!questionsByStage[q.stageId]) {
        questionsByStage[q.stageId] = [];
      }
      questionsByStage[q.stageId].push(q);
    }
  });
  
  // If we have explicit questions for this stage, use them
  if (stageId && questionsByStage[stageId] && questionsByStage[stageId].length >= count) {
    return questionsByStage[stageId].slice(0, count);
  }
  
  // Step 3: If we don't have stage-specific questions, distribute level questions evenly
  const totalStages = 10; // Assuming 10 stages per level
  const questionsPerStage = Math.floor(levelQuestions.length / totalStages);
  
  if (questionsPerStage > 0 && stageId) {
    const stageIndex = parseInt(stageId.split('-')[1]) - 1;
    const startIdx = stageIndex * questionsPerStage;
    const endIdx = Math.min(startIdx + questionsPerStage, levelQuestions.length);
    
    // If we have enough questions for this distribution method
    if (startIdx < levelQuestions.length) {
      const stageQuestions = levelQuestions.slice(startIdx, endIdx);
      
      // If we still need more questions, duplicate what we have
      if (stageQuestions.length < count) {
        const multiplier = Math.ceil(count / stageQuestions.length);
        const expanded = Array(multiplier).fill(stageQuestions).flat();
        return expanded.slice(0, count);
      }
      
      return stageQuestions.slice(0, count);
    }
  }
  
  // Step 4: Deterministic but unique shuffling as last resort
  const seedRandom = (seed: number) => {
    let state = seed;
    return () => {
      state = (state * 9301 + 49297) % 233280;
      return state / 233280;
    };
  };
  
  let seedMultiplier = 100;
  if (categoryId === 'islam') seedMultiplier = 200;
  if (categoryId === 'science') seedMultiplier = 300;
  
  const levelModifier = levelId === 'beginner' ? 1000 : 
                        levelId === 'intermediate' ? 2000 : 3000;
  
  const random = seedRandom(stageNumber * seedMultiplier + levelModifier);
  
  // Make a copy of questions to shuffle
  const shuffled = [...levelQuestions];
  
  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // If we don't have enough questions, duplicate some to reach the desired count
  if (shuffled.length < count) {
    const multiplier = Math.ceil(count / shuffled.length);
    const expanded = Array(multiplier).fill(shuffled).flat();
    return expanded.slice(0, count);
  }
  
  // Return exactly 10 questions
  return shuffled.slice(0, count);
};
