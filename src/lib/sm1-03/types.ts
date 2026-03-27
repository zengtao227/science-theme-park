import type { Quest } from "@/hooks/useQuestManager";

export type SM103Stage = "NUMBER_LINE" | "RATIONALS" | "QUADRANTS";

export interface IntegerQuest extends Quest {
  stage: SM103Stage;
  context?: string;
  scenario?: string;
  value?: number;
  x?: number;
  y?: number;
}
