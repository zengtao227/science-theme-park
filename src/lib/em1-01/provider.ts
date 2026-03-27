import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveEM101 } from "./solver";
import type { ThalesQuest } from "./types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createEM101FeedbackProvider(t: Translator) {
  return (quest: ThalesQuest): Omit<FeedbackContent, "hint"> => solveEM101(quest, t);
}
