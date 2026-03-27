import type { Quest } from "@/hooks/useQuestManager";
import type { AlgebraVisualMode } from "@/components/chamber/sm1-02/AlgebraCanvas";

export type SM102Stage = "VARIABLES" | "TERMS" | "SUBSTITUTION";

export interface S102Quest extends Quest {
  stage: SM102Stage;
  visualMode: AlgebraVisualMode;
  visualData: {
    variables?: { label: string; value: number | string; color: string }[];
    expression?: string;
    items?: { type: string; count: number; color: string }[];
    inputValue?: number;
    formula?: string;
  };
}
