import type { Difficulty, Quest } from "@/hooks/useQuestManager";

export type Stage = "build" | "elements" | "isotopes";

export interface AtomQuest extends Quest {
  difficulty: Difficulty;
  stage: Stage;
}
