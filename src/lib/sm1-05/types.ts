import type { Quest } from "@/hooks/useQuestManager";

export type SM105Stage = "RECIPES" | "PERCENT" | "MIXTURES";

export interface SM105VisualData {
  ingredient?: string;
  baseAmount?: number;
  targetAmount?: number;
  percentage?: number;
  totalValue?: number;
  partValue?: number;
  solute?: number;
  solvent?: number;
  hideResult?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface S105Quest extends Quest {
  stage: SM105Stage;
  visualMode: SM105Stage;
  visualData: SM105VisualData;
}
