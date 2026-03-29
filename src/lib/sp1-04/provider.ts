import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SP104Quest } from "./quests";
import { solveSP104 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSP104FeedbackProvider(t: Translator) {
  return (quest: SP104Quest): Omit<FeedbackContent, "hint"> => solveSP104(quest, t);
}
