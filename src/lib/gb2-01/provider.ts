import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { GB201SolverQuest } from "./solver";
import { solveGB201 } from "./solver";

export function createGB201FeedbackProvider(t: Translator) {
  return (quest: GB201SolverQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGB201(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
