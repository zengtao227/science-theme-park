import type { Quest } from "@/hooks/useQuestManager";

export type SM104Stage = "BALANCE" | "SOLVE" | "TRANSFORM" | "APPLICATIONS";

export type EquationQuest = Quest & {
  stage: SM104Stage;
  context?: string;
  scenario?: string;
  equation?: string;
  leftSide?: number;
  rightSide?: number;
  operation?: string;
};
