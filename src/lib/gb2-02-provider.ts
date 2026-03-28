import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { GB202Quest } from "./gb2-02-types";
import { solveGB202 } from "./gb2-02-solver";

export function createGB202FeedbackProvider(t: Translator) {
  return (quest: GB202Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveGB202(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
