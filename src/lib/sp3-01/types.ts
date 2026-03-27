import type { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "SI_UNITS" | "CONVERSION" | "PRECISION";

export interface SP301Quest extends Quest {
  difficulty: Difficulty;
  stage: Stage;
  value?: number | string;
  fromUnit?: string;
  toUnit?: string;
  measurement?: string;
  sigfigsCount?: number | string;
  rule?: string;
  scenarioKey?:
    | "si_base_unit"
    | "si_derived_unit"
    | "equivalent_unit"
    | "single_conversion"
    | "multi_step_conversion"
    | "area_volume_conversion"
    | "compound_conversion"
    | "count_sig_figs"
    | "round_sig_figs"
    | "calculate_sig_figs"
    | "percent_uncertainty";
}
