import type { Quest } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;
type SM207FeedbackQuest = Quest & { stage: "DISTANCE" | "MIDPOINT" | "SLOPE" };

const STAGE_RULES = {
  DISTANCE: "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}",
  MIDPOINT: "M\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)",
  SLOPE: "m=\\frac{y_2-y_1}{x_2-x_1}",
};

export function createSM207FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<SM207FeedbackQuest>(t, STAGE_RULES);
}
