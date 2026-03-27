import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "HYDROCARBONS" | "FUNCTIONAL_GROUPS" | "ISOMERS";

export interface SC302Quest extends Quest {
  stage: Stage;
  molecule?: string;
  formula?: string;
  scenario?: string;
}
