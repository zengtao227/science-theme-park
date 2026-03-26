import type { FeedbackContent, Quest } from "@/hooks/useQuestManager";
import type { SM210Parameters } from "./solver";
import { solveSM210 } from "./solver";

type Translator = (path: string, params?: Record<string, string | number>) => any;

export interface SM210FeedbackQuest extends Quest {
    dataType?: string;
    parameters?: SM210Parameters;
}

export function createSM210FeedbackProvider(t: Translator) {
    return (quest: SM210FeedbackQuest): Omit<FeedbackContent, "hint"> => {
        const { steps, fullSolutionLatex } = solveSM210(
            quest.dataType,
            quest.parameters,
            t,
            quest.correctLatex || ""
        );

        return {
            steps,
            fullSolutionLatex,
            hasFullSolution: !!fullSolutionLatex,
        };
    };
}
