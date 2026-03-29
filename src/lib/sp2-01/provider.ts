import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SP201Quest } from "@/types/sp2-01-types";
import { solveSP201 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSP201FeedbackProvider(t: Translator) {
  return (quest: SP201Quest): Omit<FeedbackContent, "hint"> => solveSP201(quest, t);
}
