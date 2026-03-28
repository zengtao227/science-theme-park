import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveSM203, type SM203FeedbackQuest } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM203FeedbackProvider(t: Translator) {
  return (quest: SM203FeedbackQuest): Omit<FeedbackContent, "hint"> => solveSM203(quest, t);
}
