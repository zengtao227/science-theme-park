import type { FeedbackContent, Quest } from "@/hooks/useQuestManager";
import { solveSM301 } from "./solver";

type Translator = (path: string, params?: Record<string, string | number>) => any;

type Stage = "TERMS" | "FACTORIZE" | "FRACTIONS" | "EQUATIONS";

export interface SM301FeedbackQuest extends Quest {
  stage: Stage;
  a?: number;
  b?: number;
  c?: number;
}

export function createSM301FeedbackProvider(t: Translator) {
  return (quest: SM301FeedbackQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSM301(quest, t);

    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
