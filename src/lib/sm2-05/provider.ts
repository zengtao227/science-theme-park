import type { Quest } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;
type SM205FeedbackQuest = Quest & { stage: "RULES" | "NEGATIVE" | "SCIENTIFIC" };

const STAGE_RULES = {
  RULES: "a^m\\cdot a^n=a^{m+n},\\;\\frac{a^m}{a^n}=a^{m-n},\\;(a^m)^n=a^{mn}",
  NEGATIVE: "a^{-n}=\\frac{1}{a^n}",
  SCIENTIFIC: "a\\times 10^n",
};

export function createSM205FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<SM205FeedbackQuest>(t, STAGE_RULES);
}
