import type { Quest } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;
type SM203FeedbackQuest = Quest & { stage: "LEVEL1" | "LEVEL2" | "LEVEL3" };

const STAGE_RULES = {
  LEVEL1: "y=mx+c",
  LEVEL2: "m_1x+c_1=m_2x+c_2",
  LEVEL3: "m_1x+c_1=m_2x+c_2",
};

export function createSM203FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<SM203FeedbackQuest>(t, STAGE_RULES);
}
