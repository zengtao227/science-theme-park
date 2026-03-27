import type { Quest } from "@/hooks/useQuestManager";

export type Stage = "acceleration" | "collision" | "detection";

export type ColliderQuest = Quest & {
  stage: Stage;
};
