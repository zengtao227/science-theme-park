import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveSM208, type SM208FeedbackQuest } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM208FeedbackProvider(t: Translator) {
  return (quest: SM208FeedbackQuest): Omit<FeedbackContent, "hint"> => solveSM208(quest, t);
}
