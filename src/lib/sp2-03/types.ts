import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "POWER_BASICS" | "ENERGY_CONSUMPTION" | "EFFICIENCY";

export interface SP203Quest extends Quest {
  stage: Stage;
  voltage?: number;
  current?: number;
  power?: number;
  time?: number;
  energy?: number;
  cost?: number;
  answer: string;
}
