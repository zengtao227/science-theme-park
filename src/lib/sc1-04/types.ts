import type { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "build" | "periodic" | "groups";

export interface PeriodicQuest extends Quest {
  difficulty: Difficulty;
  stage: Stage;
}
