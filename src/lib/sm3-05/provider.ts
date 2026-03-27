import type { Quest } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;
type SM305FeedbackQuest = Quest & { stage: "BASEL_ARCH" | "CROSS_SECTIONS" | "CURVED_SOLIDS" };

const STAGE_RULES = {
  BASEL_ARCH: "V=l\\cdot w\\cdot h,\\;V=A_{base}\\cdot h",
  CROSS_SECTIONS: "A=\\text{base}\\cdot \\text{height},\\;A=\\pi r^2",
  CURVED_SOLIDS: "V=\\pi r^2 h,\\;A=2\\pi r h+2\\pi r^2",
};

export function createSM305FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<SM305FeedbackQuest>(t, STAGE_RULES);
}
