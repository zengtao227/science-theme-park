/**
 * GP2.03 Gas Laws Module - State Management Store
 * 
 * Centralized state management using Zustand for the Gas Laws module.
 * Handles quest progress, stage navigation, language selection, and visualization state.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ModuleState,
  StageId,
  Language,
  QuestProgressMap,
  VisualizationStateMap,
  StageProgress,
  GasParameters,
} from "./gp2-03-types";
import { GAS_CONSTANT, STANDARD_CONDITIONS } from "./gp2-03-types";

// ============================================================================
// Store Interface
// ============================================================================

interface GP203Store extends ModuleState {
  // Actions
  setStage: (stageId: StageId) => void;
  setLanguage: (language: Language) => void;
  completeQuest: (questId: string) => void;
  updateVisualization: (vizId: keyof VisualizationStateMap, state: any) => void;
  resetProgress: () => void;
  
  // Selectors
  getStageProgress: (stageId: StageId) => StageProgress;
  canAccessQuest: (questId: string, requiredQuests: string[]) => boolean;
  getCompletionPercentage: () => number;
}

// ============================================================================
// Initial State
// ============================================================================

const initialGasParameters: GasParameters = {
  pressure: STANDARD_CONDITIONS.STP.pressure,
  volume: 0.0224, // 22.4 L at STP
  temperature: STANDARD_CONDITIONS.STP.temperature,
  moles: 1,
};

const initialState: ModuleState = {
  currentStage: "BASIC_GAS_LAWS",
  currentLanguage: "en",
  questProgress: {},
  visualizationState: {
    gasLawSimulator: initialGasParameters,
    pvDiagram: {
      processes: [],
      selectedPoint: undefined,
    },
    partialPressureCalc: {
      totalPressure: 101325,
      totalMoles: 0,
      components: [],
      isValid: false,
      validationErrors: [],
    },
  },
};

// ============================================================================
// Quest Distribution (for progress calculation)
// ============================================================================

const QUEST_COUNTS = {
  BASIC_GAS_LAWS: 15,
  IDEAL_GAS_EQUATION: 20,
  GAS_MIXTURES: 25, // 15 ADVANCED + 10 ELITE
};

const TOTAL_QUESTS = 60;

// ============================================================================
// Stage Unlock Rules
// ============================================================================

const STAGE_UNLOCK_RULES = {
  BASIC_GAS_LAWS: {
    unlocked: true,
    requiredCompletion: 0,
    requiredStage: null,
  },
  IDEAL_GAS_EQUATION: {
    unlocked: false,
    requiredCompletion: 0.8, // 80% of BASIC_GAS_LAWS
    requiredStage: "BASIC_GAS_LAWS" as StageId,
  },
  GAS_MIXTURES: {
    unlocked: false,
    requiredCompletion: 0.8, // 80% of IDEAL_GAS_EQUATION
    requiredStage: "IDEAL_GAS_EQUATION" as StageId,
  },
};

// ============================================================================
// Store Implementation
// ============================================================================

export const useGP203Store = create<GP203Store>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ========================================================================
      // Actions
      // ========================================================================

      setStage: (stageId: StageId) => {
        set({ currentStage: stageId });
      },

      setLanguage: (language: Language) => {
        set({ currentLanguage: language });
      },

      completeQuest: (questId: string) => {
        set((state) => ({
          questProgress: {
            ...state.questProgress,
            [questId]: {
              completed: true,
              attempts: (state.questProgress[questId]?.attempts || 0) + 1,
              lastAttemptTime: Date.now(),
            },
          },
        }));
      },

      updateVisualization: (vizId: keyof VisualizationStateMap, vizState: any) => {
        set((state) => ({
          visualizationState: {
            ...state.visualizationState,
            [vizId]: vizState,
          },
        }));
      },

      resetProgress: () => {
        set({
          questProgress: {},
          currentStage: "BASIC_GAS_LAWS",
        });
      },

      // ========================================================================
      // Selectors
      // ========================================================================

      getStageProgress: (stageId: StageId): StageProgress => {
        const state = get();
        const totalQuests = QUEST_COUNTS[stageId];
        
        // Count completed quests for this stage
        const completedQuests = Object.entries(state.questProgress)
          .filter(([questId, progress]) => {
            // Quest IDs are formatted as "STAGE-DIFFICULTY-NUMBER"
            // e.g., "BGL-B-01" for BASIC_GAS_LAWS, BASIC, quest 1
            const stagePrefix = getStagePrefix(stageId);
            return questId.startsWith(stagePrefix) && progress.completed;
          })
          .length;

        const completionPercentage = totalQuests > 0 ? completedQuests / totalQuests : 0;

        // Check if stage is unlocked
        const rules = STAGE_UNLOCK_RULES[stageId];
        let isUnlocked = rules.unlocked;

        if (!isUnlocked && rules.requiredStage) {
          const requiredProgress = get().getStageProgress(rules.requiredStage);
          isUnlocked = requiredProgress.completionPercentage >= rules.requiredCompletion;
        }

        return {
          totalQuests,
          completedQuests,
          completionPercentage,
          isUnlocked,
        };
      },

      canAccessQuest: (questId: string, requiredQuests: string[]): boolean => {
        const state = get();
        
        // Check if all required quests are completed
        return requiredQuests.every(
          (reqId) => state.questProgress[reqId]?.completed === true
        );
      },

      getCompletionPercentage: (): number => {
        const state = get();
        const completedCount = Object.values(state.questProgress).filter(
          (progress) => progress.completed
        ).length;
        return completedCount / TOTAL_QUESTS;
      },
    }),
    {
      name: "gp2-03-gas-laws-storage", // localStorage key
      partialize: (state) => ({
        // Only persist these fields
        currentStage: state.currentStage,
        currentLanguage: state.currentLanguage,
        questProgress: state.questProgress,
        visualizationState: state.visualizationState,
      }),
    }
  )
);

// ============================================================================
// Helper Functions
// ============================================================================

function getStagePrefix(stageId: StageId): string {
  switch (stageId) {
    case "BASIC_GAS_LAWS":
      return "BGL-";
    case "IDEAL_GAS_EQUATION":
      return "IGE-";
    case "GAS_MIXTURES":
      return "GM-";
    default:
      return "";
  }
}
