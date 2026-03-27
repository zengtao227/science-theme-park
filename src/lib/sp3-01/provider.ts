import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SP301Quest } from "./types";
import { solveSP301 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSP301FeedbackProvider(t: Translator) {
  return (quest: SP301Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSP301(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
