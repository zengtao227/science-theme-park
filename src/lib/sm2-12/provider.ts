import type { FeedbackContent, Quest } from "@/hooks/useQuestManager";
import { solveSM212, type SM212ComboData } from "./solver";

type Translator = (path: string, params?: Record<string, string | number>) => any;
type Stage = "PERMUTATIONS" | "COMBINATIONS" | "PROBABILITY";

export interface SM212FeedbackQuest extends Quest {
  stage: Stage;
  comboData?: SM212ComboData;
}

export function createSM212FeedbackProvider(t: Translator) {
  return (quest: SM212FeedbackQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSM212(quest.stage, quest.comboData, t);
    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
