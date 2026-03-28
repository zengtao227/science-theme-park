import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveSM206, type SM206FeedbackQuest } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM206FeedbackProvider(t: Translator) {
  return (quest: SM206FeedbackQuest): Omit<FeedbackContent, "hint"> => solveSM206(quest, t);
}
