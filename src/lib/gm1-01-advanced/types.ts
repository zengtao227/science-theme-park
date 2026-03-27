import type { Quest } from "@/hooks/useQuestManager";

export type Challenge = "COMPOSITE" | "MODELING" | "OPTIMIZATION" | "ANALYSIS";

export interface G101AdvQuest extends Quest {
  challenge: Challenge;
  scenario: string;
  functionLatex: string;
  question: string;
  hint: string;
}
