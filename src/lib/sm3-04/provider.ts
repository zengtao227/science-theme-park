import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { S304Quest } from "@/lib/sm3-04/quests";
import { solveSM304 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM304FeedbackProvider(t: Translator) {
  return (quest: S304Quest): Omit<FeedbackContent, "hint"> => solveSM304(quest, t);
}
