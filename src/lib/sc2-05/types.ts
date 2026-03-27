import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "PH_BASICS" | "NEUTRALIZATION" | "TITRATION";

export interface AcidBaseQuest extends Quest {
  stage: Stage;
  context?: string;
  scenario?: string;
  substance?: string;
  concentration?: number;
  volume?: number;
  pH?: number;
  reactionType?: string;
}
