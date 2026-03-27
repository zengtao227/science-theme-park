import type { Quest } from "@/hooks/useQuestManager";

export type SC305Stage = "VSEPR" | "HYBRIDIZATION" | "MO_THEORY";

export type SC305Data =
  | {
      kind: "VSEPR";
      molecule: string;
      lonePairs: number;
      bondedAtoms: number;
    }
  | {
      kind: "HYBRIDIZATION";
      molecule: string;
      electronDomains: number;
    }
  | {
      kind: "MO_THEORY";
      species: string;
      bondingElectrons: number;
      antibondingElectrons: number;
    };

export interface SC305Quest extends Quest {
  stage: SC305Stage;
  data?: SC305Data;
}
