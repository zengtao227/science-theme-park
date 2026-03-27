import type { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "COMPOSITION" | "DRIFT" | "NAVIGATION";

export interface SP307Quest extends Quest {
  difficulty: Difficulty;
  stage: Stage;
  vRiver: number;
  vFerry: number;
  theta: number;
}
