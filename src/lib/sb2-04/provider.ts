import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SB204Quest } from "@/lib/sb2-04-types";
import { solveSB204 } from "./solver";

export function createSB204FeedbackProvider(t: Translator) {
  return (quest: SB204Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSB204(quest, t);
    return { steps, fullSolutionLatex, hasFullSolution: !!fullSolutionLatex };
  };
}
