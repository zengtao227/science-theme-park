import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "MITOSIS" | "MEIOSIS_I" | "MEIOSIS_II";

export interface SB103SolverQuest extends Quest {
  stage: Stage;
  phase: string;
  chromosomeCount: number;
}

function buildRuleLatex(quest: SB103SolverQuest, t: Translator) {
  if (quest.stage === "MITOSIS") {
    return `\\text{${escapeLatexText(t("biology.sb1_03.solver.rule_mitosis"))}}`;
  }
  if (quest.stage === "MEIOSIS_I") {
    return `\\text{${escapeLatexText(t("biology.sb1_03.solver.rule_meiosis_i"))}}`;
  }
  if (quest.stage === "MEIOSIS_II") {
    return `\\text{${escapeLatexText(t("biology.sb1_03.solver.rule_meiosis_ii"))}}`;
  }
  return null;
}

function buildSolveLatex(quest: SB103SolverQuest, t: Translator) {
  const phase = escapeLatexText(quest.phase.replace(/_/g, " "));
  if (quest.stage === "MITOSIS") {
    return `\\text{${escapeLatexText(t("biology.sb1_03.solver.solve_mitosis", { phase, count: quest.chromosomeCount }))}}`;
  }
  if (quest.stage === "MEIOSIS_I") {
    return `\\text{${escapeLatexText(t("biology.sb1_03.solver.solve_meiosis_i", { phase, count: quest.chromosomeCount }))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_03.solver.solve_meiosis_ii", { phase, count: quest.chromosomeCount }))}}`;
}

export function solveSB103(quest: SB103SolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!ruleLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
