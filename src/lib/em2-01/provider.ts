import type { FeedbackContent } from "@/hooks/useQuestManager";
import { solveEM201 } from "./solver";
import type { MatrixQuest } from "./types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createEM201FeedbackProvider(t: Translator) {
  return (quest: MatrixQuest): Omit<FeedbackContent, "hint"> => solveEM201(quest, t);
}
