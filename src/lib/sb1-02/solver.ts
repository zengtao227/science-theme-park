import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "EQUATION" | "FACTORS" | "CHLOROPLAST";

export interface SB102SolverQuest extends Quest {
  stage: Stage;
  factor?: string;
  structure?: string;
}

function buildRuleLatex(quest: SB102SolverQuest, t: Translator) {
  if (quest.stage === "EQUATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_02.solver.rule_equation"))}}`;
  }
  if (quest.stage === "FACTORS") {
    return `\\text{${escapeLatexText(t("biology.sb1_02.solver.rule_factors"))}}`;
  }
  if (quest.stage === "CHLOROPLAST") {
    return `\\text{${escapeLatexText(t("biology.sb1_02.solver.rule_chloroplast"))}}`;
  }
  return null;
}

function buildSolveLatex(quest: SB102SolverQuest, t: Translator) {
  if (quest.stage === "EQUATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_02.solver.solve_equation"))}}`;
  }
  if (quest.stage === "FACTORS") {
    return `\\text{${escapeLatexText(t("biology.sb1_02.solver.solve_factor_effect", {
      factor: quest.factor || t("biology.sb1_02.solver.default_factor"),
    }))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_02.solver.solve_chloroplast_structure", {
    structure: quest.structure || t("biology.sb1_02.solver.default_structure"),
  }))}}`;
}

export function solveSB102(quest: SB102SolverQuest, t: Translator) {
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
