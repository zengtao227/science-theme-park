import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveSM204, type SM204FeedbackQuest } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM204FeedbackProvider(t: Translator) {
  return (quest: SM204FeedbackQuest): Omit<FeedbackContent, "hint"> => solveSM204(quest, t);
}
