import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { S302Quest } from "@/lib/sm3-02/quests";
import { solveSM302 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM302FeedbackProvider(t: Translator) {
  return (quest: S302Quest): Omit<FeedbackContent, "hint"> => solveSM302(quest, t);
}
