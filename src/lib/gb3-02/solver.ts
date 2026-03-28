import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  formatNumber,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";

type Stage = "INNATE" | "ADAPTIVE" | "VACCINES";

interface GB302Data {
  pathogen: string;
  cell: string;
  role: string;
  lag?: number;
  prim?: number;
}

export interface GB302SolverQuest extends Quest {
  stage: Stage;
  data?: GB302Data;
}

function buildIdentifyLatex(quest: GB302SolverQuest, t: Translator) {
  if (quest.stage === "INNATE" && quest.data) {
    return `\\text{${escapeLatexText(t("biology.gb3_02.solver.pathogen_label"))}} ${escapeLatexText(quest.data.pathogen)}`;
  }
  if (quest.stage === "ADAPTIVE" && quest.data) {
    return `\\text{${escapeLatexText(t("biology.gb3_02.solver.cell_label"))}} ${escapeLatexText(quest.data.cell)}`;
  }
  if (quest.stage === "VACCINES" && quest.data) {
    return `\\text{${escapeLatexText(t("biology.gb3_02.solver.primary_lag_label"))}} = ${quest.data.prim}\\text{ ${escapeLatexText(t("biology.gb3_02.solver.days_label"))}},\\ \\text{${escapeLatexText(t("biology.gb3_02.solver.secondary_lag_label"))}} = ${quest.data.lag}\\text{ ${escapeLatexText(t("biology.gb3_02.solver.days_label"))}}`;
  }
  return quest.expressionLatex || quest.promptLatex;
}

function buildRuleLatex(quest: GB302SolverQuest, t: Translator) {
  if (quest.stage === "INNATE") {
    return `\\text{${escapeLatexText(t("biology.gb3_02.solver.rule_innate"))}}`;
  }
  if (quest.stage === "ADAPTIVE") {
    return `\\text{${escapeLatexText(t("biology.gb3_02.solver.rule_adaptive"))}}`;
  }
  if (quest.stage === "VACCINES") {
    return `\\text{${escapeLatexText(t("biology.gb3_02.solver.memory_factor_label"))}} = \\frac{\\text{${escapeLatexText(t("biology.gb3_02.solver.primary_lag_label"))}}}{\\text{${escapeLatexText(t("biology.gb3_02.solver.secondary_lag_label"))}}}`;
  }
  return null;
}

function buildSolveLatex(quest: GB302SolverQuest, t: Translator) {
  if (quest.stage === "INNATE" && quest.data) {
    return `\\text{${escapeLatexText(t("biology.gb3_02.solver.solve_innate_prefix"))}} ${escapeLatexText(quest.data.role)} \\text{${escapeLatexText(t("biology.gb3_02.solver.solve_innate_suffix"))}} ${escapeLatexText(quest.data.cell)}`;
  }
  if (quest.stage === "ADAPTIVE" && quest.data) {
    return `\\text{${escapeLatexText(t("biology.gb3_02.solver.solve_adaptive_prefix"))}} ${escapeLatexText(quest.data.role)} \\text{${escapeLatexText(t("biology.gb3_02.solver.solve_adaptive_suffix"))}} ${escapeLatexText(quest.data.cell)}`;
  }
  if (quest.stage === "VACCINES" && quest.data) {
    const factor = (quest.data.prim ?? 0) / (quest.data.lag ?? 1);
    return `\\text{${escapeLatexText(t("biology.gb3_02.solver.memory_factor_label"))}} = \\frac{${quest.data.prim}}{${quest.data.lag}} = ${formatNumber(factor)}`;
  }
  return null;
}

export function solveGB302(quest: GB302SolverQuest, t: Translator) {
  const identifyLatex = buildIdentifyLatex(quest, t);
  const ruleLatex = buildRuleLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!identifyLatex || !ruleLatex || !solveLatex || !quest.correctLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), identifyLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
