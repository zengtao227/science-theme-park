import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveSM202, type SM202FeedbackQuest } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM202FeedbackProvider(t: Translator) {
  return (quest: SM202FeedbackQuest): Omit<FeedbackContent, "hint"> => solveSM202(quest, t);
}
