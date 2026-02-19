/**
 * SP1.01 - Forces Basics Module
 * Progress storage and persistence system
 */

import {
  QuestCompletion,
  UserProgress,
  StageProgress,
  Stage,
  Difficulty,
  DifficultyProgress,
  ValidationResult,
  Answer,
} from '../domain/types';

const STORAGE_KEY = 'sp1-01-progress';
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // ms

/**
 * Progress Storage Manager
 */
export class ProgressStorage {
  /**
   * Save quest completion
   */
  async saveQuestCompletion(
    questId: string,
    result: ValidationResult,
    answer: Answer
  ): Promise<void> {
    try {
      const progress = await this.loadProgress();
      
      // Find existing completion or create new one
      const existingIndex = progress.questHistory.findIndex(
        (c) => c.questId === questId
      );

      const completion: QuestCompletion = {
        questId,
        completedAt: new Date(),
        attempts: existingIndex >= 0 ? progress.questHistory[existingIndex].attempts + 1 : 1,
        lastAnswer: answer,
        wasCorrect: result.isCorrect,
      };

      if (existingIndex >= 0) {
        progress.questHistory[existingIndex] = completion;
      } else {
        progress.questHistory.push(completion);
      }

      // Add to completed quests if correct
      if (result.isCorrect) {
        progress.completedQuests.add(questId);
        progress.lastAccessedQuest = questId;
      }

      progress.updatedAt = new Date();

      await this.saveProgress(progress);
    } catch (error) {
      await this.handleStorageError(error, 'saveQuestCompletion');
    }
  }

  /**
   * Get quest completion
   */
  async getQuestCompletion(questId: string): Promise<QuestCompletion | null> {
    try {
      const progress = await this.loadProgress();
      return (
        progress.questHistory.find((c) => c.questId === questId) || null
      );
    } catch (error) {
      console.error('Failed to get quest completion:', error);
      return null;
    }
  }

  /**
   * Get all completions
   */
  async getAllCompletions(): Promise<QuestCompletion[]> {
    try {
      const progress = await this.loadProgress();
      return progress.questHistory;
    } catch (error) {
      console.error('Failed to get all completions:', error);
      return [];
    }
  }

  /**
   * Get stage progress
   */
  async getStageProgress(stage: Stage): Promise<StageProgress> {
    try {
      const progress = await this.loadProgress();
      return (
        progress.stageProgress.get(stage) || {
          stage,
          totalQuests: 0,
          completedQuests: 0,
          unlockedQuests: 0,
        }
      );
    } catch (error) {
      console.error('Failed to get stage progress:', error);
      return {
        stage,
        totalQuests: 0,
        completedQuests: 0,
        unlockedQuests: 0,
      };
    }
  }

  /**
   * Update stage progress
   */
  async updateStageProgress(
    stage: Stage,
    stageProgress: StageProgress
  ): Promise<void> {
    try {
      const progress = await this.loadProgress();
      progress.stageProgress.set(stage, stageProgress);
      progress.updatedAt = new Date();
      await this.saveProgress(progress);
    } catch (error) {
      await this.handleStorageError(error, 'updateStageProgress');
    }
  }

  /**
   * Get difficulty progress
   */
  async getDifficultyProgress(
    difficulty: Difficulty
  ): Promise<DifficultyProgress> {
    try {
      const progress = await this.loadProgress();
      return (
        progress.difficultyProgress.get(difficulty) || {
          difficulty,
          totalQuests: 0,
          completedQuests: 0,
        }
      );
    } catch (error) {
      console.error('Failed to get difficulty progress:', error);
      return {
        difficulty,
        totalQuests: 0,
        completedQuests: 0,
      };
    }
  }

  /**
   * Update difficulty progress
   */
  async updateDifficultyProgress(
    difficulty: Difficulty,
    difficultyProgress: DifficultyProgress
  ): Promise<void> {
    try {
      const progress = await this.loadProgress();
      progress.difficultyProgress.set(difficulty, difficultyProgress);
      progress.updatedAt = new Date();
      await this.saveProgress(progress);
    } catch (error) {
      await this.handleStorageError(error, 'updateDifficultyProgress');
    }
  }

  /**
   * Save preference
   */
  async savePreference(key: string, value: any): Promise<void> {
    try {
      const progress = await this.loadProgress();
      // Store preferences in a generic way
      (progress as any)[key] = value;
      progress.updatedAt = new Date();
      await this.saveProgress(progress);
    } catch (error) {
      await this.handleStorageError(error, 'savePreference');
    }
  }

  /**
   * Get preference
   */
  async getPreference(key: string): Promise<any> {
    try {
      const progress = await this.loadProgress();
      return (progress as any)[key];
    } catch (error) {
      console.error('Failed to get preference:', error);
      return null;
    }
  }

  /**
   * Clear all progress
   */
  async clearProgress(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear progress:', error);
      throw error;
    }
  }

  /**
   * Export progress as JSON string
   */
  async exportProgress(): Promise<string> {
    try {
      const progress = await this.loadProgress();
      return JSON.stringify(
        {
          ...progress,
          completedQuests: Array.from(progress.completedQuests),
          stageProgress: Array.from(progress.stageProgress.entries()),
          difficultyProgress: Array.from(progress.difficultyProgress.entries()),
        },
        null,
        2
      );
    } catch (error) {
      console.error('Failed to export progress:', error);
      throw error;
    }
  }

  /**
   * Import progress from JSON string
   */
  async importProgress(data: string): Promise<void> {
    try {
      const parsed = JSON.parse(data);
      
      // Reconstruct Sets and Maps
      const progress: UserProgress = {
        ...parsed,
        completedQuests: new Set(parsed.completedQuests || []),
        stageProgress: new Map(parsed.stageProgress || []),
        difficultyProgress: new Map(parsed.difficultyProgress || []),
        createdAt: new Date(parsed.createdAt),
        updatedAt: new Date(parsed.updatedAt),
      };

      await this.saveProgress(progress);
    } catch (error) {
      console.error('Failed to import progress:', error);
      throw error;
    }
  }

  /**
   * Check if quest is completed
   */
  async isQuestCompleted(questId: string): Promise<boolean> {
    try {
      const progress = await this.loadProgress();
      return progress.completedQuests.has(questId);
    } catch (error) {
      console.error('Failed to check quest completion:', error);
      return false;
    }
  }

  /**
   * Get completed quest IDs
   */
  async getCompletedQuestIds(): Promise<string[]> {
    try {
      const progress = await this.loadProgress();
      return Array.from(progress.completedQuests);
    } catch (error) {
      console.error('Failed to get completed quest IDs:', error);
      return [];
    }
  }

  // ============================================================================
  // Private Methods
  // ============================================================================

  /**
   * Load progress from storage
   */
  private async loadProgress(): Promise<UserProgress> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (!stored) {
        return this.createEmptyProgress();
      }

      const parsed = JSON.parse(stored);
      
      // Reconstruct Sets and Maps
      return {
        ...parsed,
        completedQuests: new Set(parsed.completedQuests || []),
        stageProgress: new Map(parsed.stageProgress || []),
        difficultyProgress: new Map(parsed.difficultyProgress || []),
        createdAt: new Date(parsed.createdAt),
        updatedAt: new Date(parsed.updatedAt),
      };
    } catch (error) {
      console.error('Failed to load progress, creating new:', error);
      return this.createEmptyProgress();
    }
  }

  /**
   * Save progress to storage
   */
  private async saveProgress(progress: UserProgress): Promise<void> {
    try {
      const serialized = JSON.stringify({
        ...progress,
        completedQuests: Array.from(progress.completedQuests),
        stageProgress: Array.from(progress.stageProgress.entries()),
        difficultyProgress: Array.from(progress.difficultyProgress.entries()),
      });

      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      if (this.isQuotaExceededError(error)) {
        await this.handleQuotaExceeded();
        // Retry once after cleanup
        const serialized = JSON.stringify({
          ...progress,
          completedQuests: Array.from(progress.completedQuests),
          stageProgress: Array.from(progress.stageProgress.entries()),
          difficultyProgress: Array.from(progress.difficultyProgress.entries()),
        });
        localStorage.setItem(STORAGE_KEY, serialized);
      } else {
        throw error;
      }
    }
  }

  /**
   * Create empty progress object
   */
  private createEmptyProgress(): UserProgress {
    return {
      lastAccessedQuest: '',
      completedQuests: new Set(),
      stageProgress: new Map(),
      difficultyProgress: new Map(),
      languagePreference: 'en',
      questHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Check if error is quota exceeded
   */
  private isQuotaExceededError(error: any): boolean {
    return (
      error instanceof DOMException &&
      (error.code === 22 ||
        error.code === 1014 ||
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    );
  }

  /**
   * Handle quota exceeded error
   */
  private async handleQuotaExceeded(): Promise<void> {
    console.warn('Storage quota exceeded, cleaning up old data');
    
    try {
      const progress = await this.loadProgress();
      
      // Keep only the most recent 100 quest completions
      if (progress.questHistory.length > 100) {
        progress.questHistory = progress.questHistory
          .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
          .slice(0, 100);
      }

      await this.saveProgress(progress);
    } catch (error) {
      console.error('Failed to clean up storage:', error);
      throw new Error('Storage is full and cleanup failed');
    }
  }

  /**
   * Handle storage errors with retry
   */
  private async handleStorageError(
    error: any,
    operation: string
  ): Promise<void> {
    console.error(`Storage error in ${operation}:`, error);

    // Notify user
    if (typeof window !== 'undefined') {
      const message = this.isQuotaExceededError(error)
        ? 'Storage is full. Some progress may not be saved.'
        : 'Failed to save progress. Please try again.';
      
      // You could dispatch a custom event here for the UI to handle
      window.dispatchEvent(
        new CustomEvent('sp1-01-storage-error', {
          detail: { message, error, operation },
        })
      );
    }

    throw error;
  }
}

// Singleton instance
let progressStorageInstance: ProgressStorage | null = null;

/**
 * Get or create the progress storage instance
 */
export function getProgressStorage(): ProgressStorage {
  if (!progressStorageInstance) {
    progressStorageInstance = new ProgressStorage();
  }
  return progressStorageInstance;
}

/**
 * Reset the progress storage instance (useful for testing)
 */
export function resetProgressStorage(): void {
  progressStorageInstance = null;
}
