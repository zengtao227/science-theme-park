/**
 * SB3.02 Biodiversity Module - Progress Persistence
 * LocalStorage wrapper for saving and loading user progress
 */

import { UserProgress, Language } from './types';

const STORAGE_KEY = 'sb3-02-biodiversity-progress';
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit

export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Save user progress to LocalStorage
 */
export function saveProgress(progress: UserProgress): void {
  try {
    const data = JSON.stringify(progress);
    
    // Check if we're approaching storage limits
    if (data.length > MAX_STORAGE_SIZE) {
      throw new StorageError('Progress data exceeds storage limit');
    }
    
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      // Try to clean up old data
      cleanupOldData();
      
      // Retry once
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (retryError) {
        throw new StorageError('Storage quota exceeded and cleanup failed');
      }
    } else {
      throw error;
    }
  }
}

/**
 * Load user progress from LocalStorage
 */
export function loadProgress(): UserProgress | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    
    if (!data) {
      return null;
    }
    
    const progress = JSON.parse(data) as UserProgress;
    
    // Convert lastAccessed string back to Date
    progress.lastAccessed = new Date(progress.lastAccessed);
    
    // Validate the loaded data
    if (!isValidProgress(progress)) {
      console.warn('Invalid progress data found, returning null');
      return null;
    }
    
    return progress;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
}

/**
 * Clear all progress data
 */
export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
}

/**
 * Initialize progress for a new user
 */
export function initializeProgress(language: Language = 'en'): UserProgress {
  return {
    moduleId: 'SB3.02',
    completedQuests: [],
    currentStage: 'SPECIES_DIVERSITY',
    lastAccessed: new Date(),
    language,
  };
}

/**
 * Update progress with a completed quest
 */
export function markQuestComplete(progress: UserProgress, questId: string): UserProgress {
  if (progress.completedQuests.includes(questId)) {
    return progress;
  }
  
  return {
    ...progress,
    completedQuests: [...progress.completedQuests, questId],
    lastAccessed: new Date(),
  };
}

/**
 * Update language preference
 */
export function updateLanguage(progress: UserProgress, language: Language): UserProgress {
  return {
    ...progress,
    language,
    lastAccessed: new Date(),
  };
}

/**
 * Validate progress data structure
 */
function isValidProgress(progress: any): progress is UserProgress {
  return (
    progress &&
    typeof progress === 'object' &&
    progress.moduleId === 'SB3.02' &&
    Array.isArray(progress.completedQuests) &&
    typeof progress.currentStage === 'string' &&
    progress.lastAccessed &&
    ['en', 'cn', 'de'].includes(progress.language)
  );
}

/**
 * Clean up old data to free storage space
 */
function cleanupOldData(): void {
  try {
    // Remove other module data if needed (future enhancement)
    // For now, just clear our own data
    const keys = Object.keys(localStorage);
    const oldKeys = keys.filter(key => 
      key.startsWith('sb3-') && key !== STORAGE_KEY
    );
    
    oldKeys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Failed to cleanup old data:', error);
  }
}
