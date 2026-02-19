/**
 * SP1.01 - Forces Basics Module
 * Quest Engine - manages quest flow, progression, and state
 */

import {
  Quest,
  Stage,
  Difficulty,
  StageProgress,
  DifficultyProgress,
  Answer,
  ValidationResult,
} from './types';
import {
  getAllQuests,
  getQuestById,
  getQuestsByStage,
  getQuestsByDifficulty,
  getNextQuest as getNextQuestFromLoader,
  getPreviousQuest as getPreviousQuestFromLoader,
} from '../data/questLoader';
import { validateAnswer } from './validation';
import { getProgressStorage } from '../data/ProgressStorage';
import { getLanguageManager } from '../data/LanguageManager';

/**
 * Quest Engine manages quest state and progression
 */
export class QuestEngine {
  private currentQuest: Quest | null = null;
  private allQuests: Quest[];

  constructor() {
    this.allQuests = getAllQuests();
  }

  // ============================================================================
  // Quest Navigation
  // ============================================================================

  /**
   * Load a quest by ID
   */
  loadQuest(questId: string): Quest | null {
    const quest = getQuestById(questId);
    if (quest) {
      this.currentQuest = quest;
    }
    return quest || null;
  }

  /**
   * Get current quest
   */
  getCurrentQuest(): Quest | null {
    return this.currentQuest;
  }

  /**
   * Get next quest in sequence
   */
  getNextQuest(): Quest | null {
    if (!this.currentQuest) {
      return null;
    }
    return getNextQuestFromLoader(this.currentQuest.id);
  }

  /**
   * Get previous quest in sequence
   */
  getPreviousQuest(): Quest | null {
    if (!this.currentQuest) {
      return null;
    }
    return getPreviousQuestFromLoader(this.currentQuest.id);
  }

  /**
   * Get first quest (for starting the module)
   */
  getFirstQuest(): Quest | null {
    return this.allQuests.length > 0 ? this.allQuests[0] : null;
  }

  // ============================================================================
  // Quest Progression
  // ============================================================================

  /**
   * Submit an answer for the current quest
   */
  async submitAnswer(answer: Answer): Promise<ValidationResult> {
    if (!this.currentQuest) {
      throw new Error('No current quest');
    }

    const language = getLanguageManager().getCurrentLanguage();
    const result = validateAnswer(
      answer,
      this.currentQuest.validation,
      language
    );

    // Save completion to storage
    const storage = getProgressStorage();
    await storage.saveQuestCompletion(this.currentQuest.id, result, answer);

    // Update stage and difficulty progress if correct
    if (result.isCorrect) {
      await this.updateProgress();
    }

    return result;
  }

  /**
   * Complete a quest (mark as done)
   */
  async completeQuest(questId: string): Promise<void> {
    const storage = getProgressStorage();
    const quest = getQuestById(questId);
    
    if (!quest) {
      throw new Error(`Quest ${questId} not found`);
    }

    // Mark as completed with a dummy correct result
    await storage.saveQuestCompletion(
      questId,
      {
        isCorrect: true,
        feedback: {
          en: 'Completed',
          cn: '已完成',
          de: 'Abgeschlossen',
        },
      },
      { value: 0 }
    );

    await this.updateProgress();
  }

  /**
   * Check if a quest is unlocked (prerequisites met)
   */
  async isQuestUnlocked(questId: string): Promise<boolean> {
    const quest = getQuestById(questId);
    if (!quest) {
      return false;
    }

    // If no prerequisites, it's unlocked
    if (quest.prerequisites.length === 0) {
      return true;
    }

    // Check if all prerequisites are completed
    const storage = getProgressStorage();
    const completedIds = await storage.getCompletedQuestIds();

    return quest.prerequisites.every((prereqId) =>
      completedIds.includes(prereqId)
    );
  }

  // ============================================================================
  // Stage Management
  // ============================================================================

  /**
   * Get progress for a stage
   */
  async getStageProgress(stage: Stage): Promise<StageProgress> {
    const storage = getProgressStorage();
    const stageQuests = getQuestsByStage(stage);
    const completedIds = await storage.getCompletedQuestIds();

    const completedQuests = stageQuests.filter((q) =>
      completedIds.includes(q.id)
    ).length;

    // Count unlocked quests
    let unlockedQuests = 0;
    for (const quest of stageQuests) {
      if (await this.isQuestUnlocked(quest.id)) {
        unlockedQuests++;
      }
    }

    return {
      stage,
      totalQuests: stageQuests.length,
      completedQuests,
      unlockedQuests,
    };
  }

  /**
   * Check if a stage is unlocked
   */
  async isStageUnlocked(stage: Stage): Promise<boolean> {
    // First stage is always unlocked
    if (stage === Stage.FORCE_CONCEPTS) {
      return true;
    }

    // Check if previous stage is completed
    const stages = Object.values(Stage);
    const currentIndex = stages.indexOf(stage);
    
    if (currentIndex <= 0) {
      return true;
    }

    const previousStage = stages[currentIndex - 1];
    const progress = await this.getStageProgress(previousStage);

    // Stage is unlocked if previous stage is completed
    return progress.completedQuests === progress.totalQuests;
  }

  // ============================================================================
  // Difficulty Tracking
  // ============================================================================

  /**
   * Get progress for a difficulty level
   */
  async getDifficultyProgress(
    difficulty: Difficulty
  ): Promise<DifficultyProgress> {
    const storage = getProgressStorage();
    const difficultyQuests = getQuestsByDifficulty(difficulty);
    const completedIds = await storage.getCompletedQuestIds();

    const completedQuests = difficultyQuests.filter((q) =>
      completedIds.includes(q.id)
    ).length;

    return {
      difficulty,
      totalQuests: difficultyQuests.length,
      completedQuests,
    };
  }

  // ============================================================================
  // Progress Updates
  // ============================================================================

  /**
   * Update stage and difficulty progress after quest completion
   */
  private async updateProgress(): Promise<void> {
    if (!this.currentQuest) {
      return;
    }

    const storage = getProgressStorage();

    // Update stage progress
    const stageProgress = await this.getStageProgress(this.currentQuest.stage);
    await storage.updateStageProgress(this.currentQuest.stage, stageProgress);

    // Update difficulty progress
    const difficultyProgress = await this.getDifficultyProgress(
      this.currentQuest.difficulty
    );
    await storage.updateDifficultyProgress(
      this.currentQuest.difficulty,
      difficultyProgress
    );
  }

  // ============================================================================
  // Utility Methods
  // ============================================================================

  /**
   * Get all quests
   */
  getAllQuests(): Quest[] {
    return this.allQuests;
  }

  /**
   * Get quests by stage
   */
  getQuestsByStage(stage: Stage): Quest[] {
    return getQuestsByStage(stage);
  }

  /**
   * Get quests by difficulty
   */
  getQuestsByDifficulty(difficulty: Difficulty): Quest[] {
    return getQuestsByDifficulty(difficulty);
  }

  /**
   * Get overall progress percentage
   */
  async getOverallProgress(): Promise<number> {
    const storage = getProgressStorage();
    const completedIds = await storage.getCompletedQuestIds();
    const total = this.allQuests.length;
    
    if (total === 0) {
      return 0;
    }

    return (completedIds.length / total) * 100;
  }

  /**
   * Reset progress (for testing or restart)
   */
  async resetProgress(): Promise<void> {
    const storage = getProgressStorage();
    await storage.clearProgress();
  }
}

// Singleton instance
let questEngineInstance: QuestEngine | null = null;

/**
 * Get or create the quest engine instance
 */
export function getQuestEngine(): QuestEngine {
  if (!questEngineInstance) {
    questEngineInstance = new QuestEngine();
  }
  return questEngineInstance;
}

/**
 * Reset the quest engine instance (useful for testing)
 */
export function resetQuestEngine(): void {
  questEngineInstance = null;
}
