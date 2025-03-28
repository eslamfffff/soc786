
import { shuffleArray } from './gameUtils';
import CryptoJS from 'crypto-js';

// Secret key for encrypting progress data (in a real app, this should be a server-side secret)
const SECRET_KEY = 'lovable-quiz-app-secret-key';

// Interface for user progress data
export interface UserProgress {
  // Track completed levels by category and level
  completedLevels: Record<string, Record<string, number>>;
  // Track used question IDs by category and level to prevent repetition
  usedQuestionIds: Record<string, Record<string, number[]>>;
}

// Initialize default progress
const defaultProgress: UserProgress = {
  completedLevels: {},
  usedQuestionIds: {},
};

// Save progress to localStorage with encryption
export const saveProgress = (progress: UserProgress): void => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(progress),
      SECRET_KEY
    ).toString();
    localStorage.setItem('quiz-progress', encryptedData);
    console.log('Progress saved successfully');
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

// Load progress from localStorage with decryption
export const loadProgress = (): UserProgress => {
  try {
    const encryptedData = localStorage.getItem('quiz-progress');
    if (!encryptedData) return defaultProgress;

    const decryptedData = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if (!decryptedData) return defaultProgress;

    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Failed to load progress, resetting:', error);
    return defaultProgress;
  }
};

// Check if a level is unlocked based on user progress
export const isLevelUnlocked = (
  categoryId: string,
  levelId: string,
  progress: UserProgress
): boolean => {
  // Beginner is always unlocked
  if (levelId === 'beginner') return true;
  
  // For intermediate, player needs 70% in beginner
  if (levelId === 'intermediate') {
    const beginnerScore = progress.completedLevels[categoryId]?.['beginner'] || 0;
    return beginnerScore >= 70;
  }
  
  // For advanced, player needs 80% in intermediate
  if (levelId === 'advanced') {
    const intermediateScore = progress.completedLevels[categoryId]?.['intermediate'] || 0;
    return intermediateScore >= 80;
  }
  
  return false;
};

// Save level completion score
export const saveLevelCompletion = (
  categoryId: string,
  levelId: string,
  score: number,
  progress: UserProgress = loadProgress()
): void => {
  // Initialize category if it doesn't exist
  if (!progress.completedLevels[categoryId]) {
    progress.completedLevels[categoryId] = {};
  }
  
  // Only update if new score is higher
  const currentScore = progress.completedLevels[categoryId][levelId] || 0;
  if (score > currentScore) {
    progress.completedLevels[categoryId][levelId] = score;
    saveProgress(progress);
    
    // Log completion for debugging
    console.log(`Level ${levelId} completed with score ${score}%`);
  }
};

// Get a set of unique questions that haven't been shown to the user yet
export const getUniqueQuestions = (
  questions: any[],
  categoryId: string,
  levelId: string,
  count: number,
  progress: UserProgress = loadProgress()
): any[] => {
  // Initialize usedQuestionIds for this category/level if it doesn't exist
  if (!progress.usedQuestionIds[categoryId]) {
    progress.usedQuestionIds[categoryId] = {};
  }
  if (!progress.usedQuestionIds[categoryId][levelId]) {
    progress.usedQuestionIds[categoryId][levelId] = [];
  }
  
  const usedIds = progress.usedQuestionIds[categoryId][levelId] || [];
  
  // Filter available questions that haven't been used
  let availableQuestions = questions.filter(q => !usedIds.includes(q.id));
  
  // If there aren't enough questions left, reset the used questions
  if (availableQuestions.length < count) {
    console.log(`Resetting used questions for ${categoryId}/${levelId}`);
    progress.usedQuestionIds[categoryId][levelId] = [];
    availableQuestions = questions;
    saveProgress(progress);
  }
  
  // Shuffle and select the requested number of questions
  const selectedQuestions = shuffleArray(availableQuestions).slice(0, count);
  
  // Mark these questions as used
  const questionIds = selectedQuestions.map(q => q.id);
  progress.usedQuestionIds[categoryId][levelId] = [
    ...progress.usedQuestionIds[categoryId][levelId],
    ...questionIds
  ];
  saveProgress(progress);
  
  return selectedQuestions;
};

// Get the unlock requirements text for a level
export const getUnlockRequirementText = (levelId: string): string => {
  if (levelId === 'beginner') return 'مفتوح للجميع';
  if (levelId === 'intermediate') return 'يتطلب إكمال المستوى المبتدئ بنسبة 70%';
  if (levelId === 'advanced') return 'يتطلب إكمال المستوى المتوسط بنسبة 80%';
  return '';
};

// Get the completion percentage needed to unlock a level
export const getUnlockThreshold = (levelId: string): number => {
  if (levelId === 'intermediate') return 70;
  if (levelId === 'advanced') return 80;
  return 0; // Beginner has no threshold
};

// Reset progress for testing purposes
export const resetAllProgress = (): void => {
  saveProgress(defaultProgress);
  console.log('All progress has been reset');
};
