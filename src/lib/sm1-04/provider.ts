import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { EquationQuest } from "@/lib/sm1-04/types";
import { solveSM104 } from "@/lib/sm1-04/solver";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSM104FeedbackProvider(t: Translator) {
  return (quest: EquationQuest): Omit<FeedbackContent, "hint"> => {
    const solved = solveSM104(quest, t);
    return {
      steps: solved.steps,
      fullSolutionLatex: solved.fullSolutionLatex,
      hasFullSolution: !!solved.fullSolutionLatex,
    };
  };
}
