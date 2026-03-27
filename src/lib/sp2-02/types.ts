import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "OHMS_LAW" | "SERIES_CIRCUITS" | "PARALLEL_CIRCUITS";

export interface SP202Quest extends Quest {
  stage: Stage;
  voltage?: number;
  current?: number;
  resistance?: number;
  circuitType?: "series" | "parallel" | "mixed";
  components?: number[];
  answer: string;
}
