import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SP103Quest } from "./quests";
import { solveSP103 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSP103FeedbackProvider(t: Translator) {
  return (quest: SP103Quest): Omit<FeedbackContent, "hint"> => solveSP103(quest, t);
}
