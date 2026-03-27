import type { Quest } from "@/hooks/useQuestManager";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;
type SM202FeedbackQuest = Quest & { stage: string };

const STAGE_RULES = {
  SOLVE_HYP: "a^2+b^2=c^2",
  SOLVE_LEG: "a^2+b^2=c^2",
  CHECK_RIGHT: "a^2+b^2=c^2",
  DISTANCE: "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}",
  ELITE_SPACE: "d=\\sqrt{a^2+b^2+c^2}",
  MENTAL: "\\sqrt{a^2}=a",
  CHAIN: "\\sqrt{ab}=\\sqrt{a}\\sqrt{b}",
  PERFECT: "\\sqrt{n^2}=n",
  SIMPLIFY: "\\sqrt{ab}=\\sqrt{a}\\sqrt{b}",
  ESTIMATE: "n^2<a<(n+1)^2",
};

export function createSM202FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<SM202FeedbackQuest>(t, STAGE_RULES);
}
