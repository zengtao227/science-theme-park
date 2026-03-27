import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "BASICS" | "MEASURE" | "SURVEY";

export interface ThalesQuest extends Quest {
  stage: Stage;
  concept?: string;
}
