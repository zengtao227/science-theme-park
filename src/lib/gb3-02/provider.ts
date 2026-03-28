import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { GB302SolverQuest } from "./solver";
import { solveGB302 } from "./solver";

export function createGB302FeedbackProvider(t: Translator) {
  return (quest: GB302SolverQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGB302(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
