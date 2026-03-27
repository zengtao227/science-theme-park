import type { Quest } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;
type SM204FeedbackQuest = Quest & { stage: "SCALE_FACTOR" | "SIMILAR_TRIANGLES" | "MISSION" };

const STAGE_RULES = {
  SCALE_FACTOR: "\\text{new value}=k\\cdot \\text{old value}",
  SIMILAR_TRIANGLES: "\\frac{a_1}{a_2}=\\frac{b_1}{b_2}=\\frac{c_1}{c_2}",
  MISSION: "\\text{Use similarity ratios consistently}",
};

export function createSM204FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<SM204FeedbackQuest>(t, STAGE_RULES);
}
