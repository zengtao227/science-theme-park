import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "FARADAYS_LAW" | "LENZS_LAW" | "GENERATORS";

export interface GP303Quest extends Quest {
  stage: Stage;
  flux?: number;
  time?: number;
  emf?: number;
  turns?: number;
}
