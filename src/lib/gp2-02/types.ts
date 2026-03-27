import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "FIRST_LAW" | "INTERNAL_ENERGY" | "WORK_HEAT";

export interface GP202Quest extends Quest {
  stage: Stage;
  processType?: string;
}
