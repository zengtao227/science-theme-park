import type { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "PRESSURE" | "BUOYANCY" | "HYDRAULICS";

export interface SP304Quest extends Quest {
  difficulty: Difficulty;
  stage: Stage;
  depth?: number;
  area?: number;
  force?: number;
  volume?: number;
}
