import type { FeedbackContent, Quest } from "@/hooks/useQuestManager";
import { solveSM305 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export type SM305FeedbackQuest = Quest & {
  stage: "BASEL_ARCH" | "CROSS_SECTIONS" | "CURVED_SOLIDS";
  geometryType?: string;
  hintLatex?: string[];
};

export function createSM305FeedbackProvider(t: Translator) {
  return (quest: SM305FeedbackQuest): Omit<FeedbackContent, "hint"> => solveSM305(quest, t);
}
