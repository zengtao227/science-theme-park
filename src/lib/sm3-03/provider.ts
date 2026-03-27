import type { Quest } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;
type SM303FeedbackQuest = Quest & { stage: "EXPONENTIAL" | "LOGARITHM" | "APPLICATIONS" };

const STAGE_RULES = {
  EXPONENTIAL: "N(t)=N_0\\cdot 2^{t/d}",
  LOGARITHM: "\\log_b(x)=y \\iff b^y=x",
  APPLICATIONS: "\\text{Model the real-world growth or decay situation}",
};

export function createSM303FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<SM303FeedbackQuest>(t, STAGE_RULES);
}
