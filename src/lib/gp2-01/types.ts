import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "IDEAL_GAS" | "BOYLES_LAW" | "CHARLES_LAW";

export interface GP201Quest extends Quest {
  stage: Stage;
  gasType?: string;
  lawType?: string;
}
