import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveSM201, type SM201FeedbackQuest } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM201FeedbackProvider(t: Translator) {
  return (quest: SM201FeedbackQuest): Omit<FeedbackContent, "hint"> => solveSM201(quest, t);
}
