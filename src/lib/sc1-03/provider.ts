import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { AtomQuest } from "./types";
import { solveSC103 } from "./solver";

export function createSC103FeedbackProvider(t: Translator) {
  return (quest: AtomQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC103(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
