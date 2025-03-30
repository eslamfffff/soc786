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

// أضف معرف المرحلة لضمان الحصول على أسئلة مختلفة لكل مرحلة
export const getUniqueQuestions = (
  allQuestions: any[], 
  categoryId: string, 
  levelId: string, 
  count: number = 10,
  stageId?: string
) => {
  if (allQuestions.length === 0) return [];
  
  // استخدم معرف المرحلة لإنشاء بذرة مختلفة للتوزيع العشوائي
  const stageSeed = stageId ? parseInt(stageId.split('-')[1]) || 1 : 1;
  
  // فلترة الأسئلة لهذه الفئة والمستوى
  const filteredQuestions = allQuestions.filter(
    q => q.category === categoryId && q.level === levelId
  );
  
  if (filteredQuestions.length === 0) return [];
  
  // اخلط الأسئلة بطريقة ثابتة باستخدام معرف المرحلة
  let shuffled = [...filteredQuestions];
  
  // استخدام خوارزمية خلط يمكن التنبؤ بها
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(((i * stageSeed) % shuffled.length) * 0.7);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // للحصول على توزيع متوازن للصعوبة، ننظم الأسئلة
  let easyQuestions = shuffled.filter(q => q.difficulty === 1);
  let mediumQuestions = shuffled.filter(q => q.difficulty === 2);
  let hardQuestions = shuffled.filter(q => q.difficulty === 3);
  
  // إذا لم يكن هناك صعوبة محددة، استخدم التصنيف الافتراضي
  if (easyQuestions.length + mediumQuestions.length + hardQuestions.length === 0) {
    easyQuestions = shuffled.slice(0, Math.floor(shuffled.length * 0.4));
    mediumQuestions = shuffled.slice(Math.floor(shuffled.length * 0.4), Math.floor(shuffled.length * 0.7));
    hardQuestions = shuffled.slice(Math.floor(shuffled.length * 0.7));
  }
  
  const result = [];
  
  // توزيع الأسئلة بناءً على المستوى
  if (levelId === 'beginner') {
    // للمبتدئين: 60% سهل، 30% متوسط، 10% صعب
    const easyCount = Math.min(Math.ceil(count * 0.6), easyQuestions.length);
    const mediumCount = Math.min(Math.ceil(count * 0.3), mediumQuestions.length);
    const hardCount = Math.min(count - easyCount - mediumCount, hardQuestions.length);
    
    result.push(...easyQuestions.slice(0, easyCount));
    result.push(...mediumQuestions.slice(0, mediumCount));
    result.push(...hardQuestions.slice(0, hardCount));
  } else if (levelId === 'intermediate') {
    // للمتوسط: 30% سهل، 50% متوسط، 20% صعب
    const easyCount = Math.min(Math.ceil(count * 0.3), easyQuestions.length);
    const mediumCount = Math.min(Math.ceil(count * 0.5), mediumQuestions.length);
    const hardCount = Math.min(count - easyCount - mediumCount, hardQuestions.length);
    
    result.push(...easyQuestions.slice(0, easyCount));
    result.push(...mediumQuestions.slice(0, mediumCount));
    result.push(...hardQuestions.slice(0, hardCount));
  } else {
    // للمتقدم: 10% سهل، 40% متوسط، 50% صعب
    const easyCount = Math.min(Math.ceil(count * 0.1), easyQuestions.length);
    const mediumCount = Math.min(Math.ceil(count * 0.4), mediumQuestions.length);
    const hardCount = Math.min(count - easyCount - mediumCount, hardQuestions.length);
    
    result.push(...easyQuestions.slice(0, easyCount));
    result.push(...mediumQuestions.slice(0, mediumCount));
    result.push(...hardQuestions.slice(0, hardCount));
  }
  
  // إذا لم يكن لدينا ما يكفي من الأسئلة، أضف المزيد من القائمة المخلوطة
  if (result.length < count) {
    const remaining = count - result.length;
    const usedIds = new Set(result.map(q => q.id));
    
    const extraQuestions = shuffled
      .filter(q => !usedIds.has(q.id))
      .slice(0, remaining);
    
    result.push(...extraQuestions);
  }
  
  // اخلط النتيجة النهائية بطريقة مختلفة لكل مرحلة
  for (let i = result.length - 1; i > 0; i--) {
    const j = (i + stageSeed) % result.length;
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result.slice(0, count);
};
