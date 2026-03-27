import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "IONIC" | "COVALENT" | "METALLIC";

export interface BondQuest extends Quest {
  stage: Stage;
}
