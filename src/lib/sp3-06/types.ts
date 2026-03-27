import type { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "SOUND_WAVES" | "FREQUENCY_PITCH" | "LOUDNESS_INTENSITY";

export interface SP306Quest extends Quest {
  difficulty: Difficulty;
  stage: Stage;
  soundType?: string;
}
