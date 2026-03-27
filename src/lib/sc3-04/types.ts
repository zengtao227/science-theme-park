import type { Quest } from "@/hooks/useQuestManager";

export type SC304Stage = "ALCOHOLS" | "ACIDS" | "ESTERS";
export type SC304ComparisonType = "bp" | "sol";

export interface SC304Quest extends Quest {
  stage: SC304Stage;
  molecule?: string;
  moleculeName?: string;
  formula?: string;
  propA?: string;
  propB?: string;
  comparisonType?: SC304ComparisonType;
  characteristicGroup?: "hydroxyl" | "carboxyl" | "aldehyde" | "ketone";
}
