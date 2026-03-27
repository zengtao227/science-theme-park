import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "CURVES" | "EQUIVALENCE" | "INDICATORS";

export interface TitrationQuest extends Quest {
  stage: Stage;
  simConfig: {
    acidType: "strong" | "weak";
    acidConc: number;
    baseConc: number;
    volumeAdded: number;
    indicator: "phenolphthalein" | "methyl_orange" | "universal";
  };
}
