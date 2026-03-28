import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "OSMOSIS" | "RESPIRATION" | "HOMEOSTASIS";

export interface MetabolicSolverQuest extends Quest {
  stage: Stage;
  targetOsmolarity?: number;
  statusKey?: "hypertonic" | "hypotonic" | "isotonic";
}

function buildRuleLatex(quest: MetabolicSolverQuest, t: Translator) {
  if (quest.stage === "OSMOSIS") {
    return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.rule_osmosis"))}}`;
  }
  if (quest.stage === "RESPIRATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.rule_respiration"))}}`;
  }
  if (quest.stage === "HOMEOSTASIS") {
    return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.rule_homeostasis"))}}`;
  }
  return null;
}

function buildSolveLatex(quest: MetabolicSolverQuest, t: Translator) {
  if (quest.stage === "OSMOSIS") {
    if (quest.statusKey === "hypertonic") return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.solve_osmosis_hypertonic"))}}`;
    if (quest.statusKey === "hypotonic") return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.solve_osmosis_hypotonic"))}}`;
    return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.solve_osmosis_isotonic"))}}`;
  }
  if (quest.stage === "RESPIRATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.solve_respiration"))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.solve_homeostasis"))}}`;
}

export function solveSB101Metabolic(quest: MetabolicSolverQuest, t: Translator) {
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
