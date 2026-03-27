import type { Difficulty, Quest } from "@/hooks/useQuestManager";

export type SC201Stage = "ARRHENIUS" | "RATE_LAW" | "HALF_LIFE";

export interface SC201QuestSlot {
  id: string;
  labelLatex: string;
  placeholder: string;
  expected: string | number;
  unit?: string;
}

export interface SC201Quest extends Quest {
  difficulty: Difficulty;
  stage: SC201Stage;
  context?: string;
  scenario?: string;
  temperature?: number;
  activationEnergy?: number;
  slots: SC201QuestSlot[];
}
