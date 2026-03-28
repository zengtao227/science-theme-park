import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveSM205, type SM205FeedbackQuest } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM205FeedbackProvider(t: Translator) {
  return (quest: SM205FeedbackQuest): Omit<FeedbackContent, "hint"> => solveSM205(quest, t);
}
