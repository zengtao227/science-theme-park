import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveSM207, type SM207FeedbackQuest } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM207FeedbackProvider(t: Translator) {
  return (quest: SM207FeedbackQuest): Omit<FeedbackContent, "hint"> => solveSM207(quest, t);
}
