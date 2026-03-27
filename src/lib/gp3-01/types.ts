import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "WAVE_PROPERTIES" | "SUPERPOSITION" | "OPTICS";

export interface GP301Quest extends Quest {
  stage: Stage;
  amplitude?: number;
  frequency?: number;
  wavelength?: number;
  velocity?: number;
  medium?: string;
  waveType?: string;
}
