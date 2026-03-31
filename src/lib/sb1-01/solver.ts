import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "IDENTIFICATION" | "FUNCTION" | "ORGANELLES";

export interface SB101SolverQuest extends Quest {
  stage: Stage;
  targetOrganelleId: string;
  organelleName: string;
}

function buildClueLatex(quest: SB101SolverQuest, t: Translator) {
  if (quest.stage === "IDENTIFICATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01.solver.clue_size_label"))}} ${quest.expressionLatex || quest.promptLatex}`;
  }
  if (quest.stage === "FUNCTION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01.solver.clue_function_label"))}} ${quest.expressionLatex || quest.promptLatex}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_01.solver.clue_target_label"))}} ${quest.promptLatex}`;
}

function buildTraceLatex(quest: SB101SolverQuest, t: Translator) {
  if (quest.stage === "IDENTIFICATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01.solver.trace_identification_pattern"))}}`;
  }
  if (quest.stage === "FUNCTION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01.solver.trace_function_pattern"))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_01.solver.trace_fact_pattern"))}}`;
}

function buildRuleLatex(quest: SB101SolverQuest, t: Translator) {
  if (quest.stage === "IDENTIFICATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01.solver.rule_identification"))}}`;
  }
  if (quest.stage === "FUNCTION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01.solver.rule_function"))}}`;
  }
  if (quest.stage === "ORGANELLES") {
    return `\\text{${escapeLatexText(t("biology.sb1_01.solver.rule_organelles"))}}`;
  }
  return null;
}

function buildSolveLatex(quest: SB101SolverQuest, t: Translator) {
  if (quest.stage === "IDENTIFICATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01.solver.solve_identification", { organelle: quest.organelleName }))}}`;
  }
  if (quest.stage === "FUNCTION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01.solver.solve_function", { organelle: quest.organelleName }))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_01.solver.solve_organelles"))}}`;
}

export function solveSB101(quest: SB101SolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest, t);
  const clueLatex = buildClueLatex(quest, t);
  const traceLatex = buildTraceLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!ruleLatex || !clueLatex || !traceLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("biology.sb1_01.solver.extract_organelle_clue"), clueLatex),
    makeStep(4, t("biology.sb1_01.solver.trace_cell_role"), traceLatex),
    makeStep(5, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
