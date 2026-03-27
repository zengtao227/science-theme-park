import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "OXIDATION_STATE" | "ELECTRON_TRANSFER" | "ELECTROCHEMISTRY";

export interface SC206Quest extends Quest {
  stage: Stage;
  reactants: Array<{ formula: string; oxidationState: number }>;
  products: Array<{ formula: string; oxidationState: number }>;
  oxidationStates: { [key: string]: number };
  electronsTransferred: number;
  cellPotential?: number;
}
