import type { FeedbackContent, Quest } from "@/hooks/useQuestManager";
import { solveSM211, type SM211SequenceData } from "./solver";

type Translator = (path: string, params?: Record<string, string | number>) => any;

export interface SM211FeedbackQuest extends Quest {
  stage: "ARITHMETIC" | "GEOMETRIC" | "SERIES";
  sequenceData?: SM211SequenceData;
}

export function createSM211FeedbackProvider(t: Translator) {
  return (quest: SM211FeedbackQuest): Omit<FeedbackContent, "hint"> => {
    const { steps, fullSolutionLatex } = solveSM211(quest.stage, quest.sequenceData, t);

    return {
      steps,
      fullSolutionLatex,
      hasFullSolution: !!fullSolutionLatex,
    };
  };
}
