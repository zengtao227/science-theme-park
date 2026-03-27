import type { S302Quest } from "@/lib/sm3-02/quests";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;

const STAGE_RULES = {
  UNIT_CIRCLE: "\\sin(\\theta),\\;\\cos(\\theta),\\;\\tan(\\theta)",
  PROJECTIONS: "x=r\\cos(\\theta),\\;y=r\\sin(\\theta)",
  WAVES: "y=a\\sin(bx+c)+d",
};

export function createSM302FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<S302Quest>(t, STAGE_RULES);
}
