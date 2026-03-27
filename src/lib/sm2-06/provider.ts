import type { Quest } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;
type SM206FeedbackQuest = Quest & { stage: "SUBSTITUTION" | "ELIMINATION" | "MISSION" };

const STAGE_RULES = {
  SUBSTITUTION: "\\text{Substitute one equation into the other}",
  ELIMINATION: "\\text{Add or subtract equations to eliminate a variable}",
  MISSION: "\\text{Choose substitution or elimination strategically}",
};

export function createSM206FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<SM206FeedbackQuest>(t, STAGE_RULES);
}
