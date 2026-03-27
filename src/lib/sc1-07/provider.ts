import type { FeedbackContent } from "@/hooks/useQuestManager";
import type { Translator } from "@/lib/feedback/solverSupport";
import type { SC107Quest } from "./quests";
import { solveSC107 } from "./solver";

export function createSC107FeedbackProvider(t: Translator) {
  return (quest: SC107Quest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSC107(quest, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
