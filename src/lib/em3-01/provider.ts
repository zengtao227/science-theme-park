import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { OlympiadQuest } from "@/lib/ext/olympiad-data";
import { solveEM301 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createEM301FeedbackProvider(t: Translator) {
  return (quest: OlympiadQuest): Omit<FeedbackContent, "hint"> => solveEM301(quest, t);
}
