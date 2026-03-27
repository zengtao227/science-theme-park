import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { SP101AdaptedQuest } from "./types";
import { solveSP101 } from "./solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSP101FeedbackProvider(t: Translator) {
  return (quest: SP101AdaptedQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSP101(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
