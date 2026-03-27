import type { Quest } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;
type SM201FeedbackQuest = Quest & { stage: "EXPLORE" | "ARCHITECT" | "SCRAPPER" | "SPEEDSTER" | "ELITE" | "VOYAGER" };

const STAGE_RULES = {
  ARCHITECT: "(a+b)^2=a^2+2ab+b^2",
  SCRAPPER: "a^2-b^2=(a-b)(a+b)",
  SPEEDSTER: "(a\\pm b)^2=a^2\\pm 2ab+b^2",
  ELITE: "(a+b)^2,\\;(a-b)^2,\\;a^2-b^2",
  VOYAGER: "a^2-b^2=(a-b)(a+b)",
};

export function createSM201FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<SM201FeedbackQuest>(t, STAGE_RULES);
}
