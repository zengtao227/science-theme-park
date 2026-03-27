import type { S304Quest } from "@/lib/sm3-04/quests";
import { createGenericModuleFeedbackProvider } from "@/lib/feedback/genericModuleProvider";

type Translator = (key: string, params?: Record<string, string | number>) => string;

const STAGE_RULES = {
  PH: "\\mathrm{pH}=-\\log_{10}[H^+]",
  DECIBEL: "L=10\\log_{10}\\left(\\frac{I}{I_0}\\right)",
  RICHTER: "M=\\log_{10}\\left(\\frac{A}{A_0}\\right)",
};

export function createSM304FeedbackProvider(t: Translator) {
  return createGenericModuleFeedbackProvider<S304Quest>(t, STAGE_RULES);
}
