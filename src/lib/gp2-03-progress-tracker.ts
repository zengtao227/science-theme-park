/**
 * GP2.03 Gas Laws Module - Quest Progress Tracker
 * 
 * Manages quest completion state and progression logic.
 * Implements stage unlock rules (80% completion threshold).
 */

import type {
  Quest,
  QuestProgressMap,
  StageId,
  StageProgress,
} from "./gp2-03-types";

// ============================================================================
// Quest Progress Tracker Class
// ============================================================================

export class QuestProgressTracker {
  private progress: QuestProgressMap;
  private quests: Quest[];

  constructor(quests: Quest[], initialProgress: QuestProgressMap = {}) {
    this.quests = quests;
    this.progress = initialProgress;
  }

  /**
   * Mark a quest as complete
   */
  markComplete(questId: string): void {
    const existing = this.progress[questId];
    
    this.progress[questId] = {
      completed: true,
      attempts: existing ? existing.attempts + 1 : 1,
      lastAttemptTime: Date.now(),
    };
  }

  /**
   * Check if a quest is complete
   */
  isComplete(questId: string): boolean {
    return this.progress[questId]?.completed === true;
  }

  /**
   * Check if a quest can be accessed (prerequisites met)
   */
  canAccess(questId: string): boolean {
    const quest = this.quests.find((q) => q.id === questId);
    
    if (!quest) {
      return false;
    }

    // Check if all required quests are completed
    return quest.requiredQuests.every((reqId) => this.isComplete(reqId));
  }

  /**
   * Get progress for a specific stage
   */
  getStageProgress(stageId: StageId): StageProgress {
    const stageQuests = this.quests.filter((q) => q.stageId === stageId);
    const totalQuests = stageQuests.length;
    
    const completedQuests = stageQuests.filter((q) => 
      this.isComplete(q.id)
    ).length;

    const completionPercentage = totalQuests > 0 
      ? completedQuests / totalQuests 
      : 0;

    const isUnlocked = this.isStageUnlocked(stageId);

    return {
      totalQuests,
      completedQuests,
      completionPercentage,
      isUnlocked,
    };
  }

  /**
   * Check if a stage is unlocked based on completion rules
   */
  private isStageUnlocked(stageId: StageId): boolean {
    switch (stageId) {
      case "BASIC_GAS_LAWS":
        // Always unlocked
        return true;

      case "IDEAL_GAS_EQUATION": {
        // Requires 80% completion of BASIC_GAS_LAWS
        const basicProgress = this.getStageProgress("BASIC_GAS_LAWS");
        return basicProgress.completionPercentage >= 0.8;
      }

      case "GAS_MIXTURES": {
        // Requires 80% completion of IDEAL_GAS_EQUATION
        const idealProgress = this.getStageProgress("IDEAL_GAS_EQUATION");
        return idealProgress.completionPercentage >= 0.8;
      }

      default:
        return false;
    }
  }

  /**
   * Get overall completion percentage across all quests
   */
  getOverallProgress(): number {
    const totalQuests = this.quests.length;
    const completedQuests = this.quests.filter((q) => 
      this.isComplete(q.id)
    ).length;

    return totalQuests > 0 ? completedQuests / totalQuests : 0;
  }

  /**
   * Get quests available for a given stage and difficulty
   */
  getAvailableQuests(stageId: StageId, difficulty?: string): Quest[] {
    return this.quests.filter((quest) => {
      // Match stage
      if (quest.stageId !== stageId) return false;

      // Match difficulty if specified
      if (difficulty && quest.difficulty !== difficulty) return false;

      // Check if accessible (prerequisites met)
      return this.canAccess(quest.id);
    });
  }

  /**
   * Get next incomplete quest for a stage
   */
  getNextQuest(stageId: StageId): Quest | null {
    const availableQuests = this.getAvailableQuests(stageId);
    
    // Find first incomplete quest
    const nextQuest = availableQuests.find((q) => !this.isComplete(q.id));
    
    return nextQuest || null;
  }

  /**
   * Get current progress map
   */
  getProgress(): QuestProgressMap {
    return { ...this.progress };
  }

  /**
   * Update progress map
   */
  setProgress(progress: QuestProgressMap): void {
    this.progress = { ...progress };
  }

  /**
   * Reset all progress
   */
  resetProgress(): void {
    this.progress = {};
  }

  /**
   * Get statistics for a difficulty level
   */
  getDifficultyStats(difficulty: string): {
    total: number;
    completed: number;
    percentage: number;
  } {
    const difficultyQuests = this.quests.filter(
      (q) => q.difficulty === difficulty
    );
    const total = difficultyQuests.length;
    const completed = difficultyQuests.filter((q) => 
      this.isComplete(q.id)
    ).length;

    return {
      total,
      completed,
      percentage: total > 0 ? completed / total : 0,
    };
  }

  /**
   * Get number of attempts for a quest
   */
  getAttempts(questId: string): number {
    return this.progress[questId]?.attempts || 0;
  }

  /**
   * Get last attempt time for a quest
   */
  getLastAttemptTime(questId: string): number | null {
    return this.progress[questId]?.lastAttemptTime || null;
  }

  /**
   * Check if all quests in a stage are complete
   */
  isStageComplete(stageId: StageId): boolean {
    const progress = this.getStageProgress(stageId);
    return progress.completionPercentage === 1.0;
  }

  /**
   * Check if all quests are complete
   */
  isModuleComplete(): boolean {
    return this.getOverallProgress() === 1.0;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Calculate stage unlock status based on progress
 */
export function calculateStageUnlock(
  stageId: StageId,
  progressTracker: QuestProgressTracker
): boolean {
  switch (stageId) {
    case "BASIC_GAS_LAWS":
      return true;

    case "IDEAL_GAS_EQUATION": {
      const basicProgress = progressTracker.getStageProgress("BASIC_GAS_LAWS");
      return basicProgress.completionPercentage >= 0.8;
    }

    case "GAS_MIXTURES": {
      const idealProgress = progressTracker.getStageProgress("IDEAL_GAS_EQUATION");
      return idealProgress.completionPercentage >= 0.8;
    }

    default:
      return false;
  }
}

/**
 * Get recommended next stage based on progress
 */
export function getRecommendedStage(
  progressTracker: QuestProgressTracker
): StageId {
  // Check BASIC_GAS_LAWS first
  if (!progressTracker.isStageComplete("BASIC_GAS_LAWS")) {
    return "BASIC_GAS_LAWS";
  }

  // Then IDEAL_GAS_EQUATION
  if (!progressTracker.isStageComplete("IDEAL_GAS_EQUATION")) {
    return "IDEAL_GAS_EQUATION";
  }

  // Finally GAS_MIXTURES
  return "GAS_MIXTURES";
}
