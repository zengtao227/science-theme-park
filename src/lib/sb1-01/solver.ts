import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "IDENTIFICATION" | "FUNCTION" | "ORGANELLES";

export interface SB101SolverQuest extends Quest {
  stage: Stage;
  targetOrganelleId: string;
  organelleName: string;
}

function buildRuleLatex(quest: SB101SolverQuest) {
  if (quest.stage === "IDENTIFICATION") {
    return "\\text{Match the size or visible feature to the correct organelle}";
  }
  if (quest.stage === "FUNCTION") {
    return "\\text{Link each organelle to its defining cellular function}";
  }
  if (quest.stage === "ORGANELLES") {
    return "\\text{Use the standard reference value or organelle fact requested in the prompt}";
  }
  return null;
}

function buildSolveLatex(quest: SB101SolverQuest) {
  if (quest.stage === "IDENTIFICATION") {
    return `\\text{Compare the clue to the structure } \\text{${quest.organelleName}}`;
  }
  if (quest.stage === "FUNCTION") {
    return `\\text{The organelle } \\text{${quest.organelleName}} \\text{ is identified by the function in the prompt}`;
  }
  return `\\text{Recall the quantitative or structural cell-biology fact asked by the quest}`;
}

export function solveSB101(quest: SB101SolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest);
  const solveLatex = buildSolveLatex(quest);
  if (!ruleLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
