import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "ELECTRIC_FIELD" | "MAGNETIC_FIELD" | "PARTICLE_MOTION";

export interface GP302Quest extends Quest {
  stage: Stage;
  charge?: number;
  distance?: number;
  fieldStrength?: number;
  velocity?: number;
  magneticField?: number;
}
