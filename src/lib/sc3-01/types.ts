import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "ASPIRIN" | "CAFFEINE" | "ADRENALINE";

export interface SC301Quest extends Quest {
  stage: Stage;
  moleculeName: string;
  scenario?: string;
}
