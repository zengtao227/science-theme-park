import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "COMBUSTION" | "SUBSTITUTION" | "ADDITION";

export interface SC303Quest extends Quest {
  stage: Stage;
  reactionType?: string;
  scenario?: string;
}
