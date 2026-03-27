import type { Quest } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;
type SM208FeedbackQuest = Quest & { stage: "BASIC_PROB" | "LOTTERY" | "COMBINED" | "DATA_STATS" };

const STAGE_RULES = {
  BASIC_PROB: "P(E)=\\frac{\\text{favorable outcomes}}{\\text{total outcomes}}",
  LOTTERY: "\\binom{n}{k}=\\frac{n!}{k!(n-k)!}",
  COMBINED: "P(A\\cap B),\\;P(A\\cup B)",
  DATA_STATS: "\\bar{x}=\\frac{\\sum x_i}{n}",
};

export function createSM208FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<SM208FeedbackQuest>(t, STAGE_RULES);
}
