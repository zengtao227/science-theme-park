import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "OSMOSIS" | "RESPIRATION" | "HOMEOSTASIS";

export interface MetabolicSolverQuest extends Quest {
  stage: Stage;
  targetOsmolarity?: number;
  statusKey?: "hypertonic" | "hypotonic" | "isotonic";
}

function buildClueLatex(quest: MetabolicSolverQuest, t: Translator) {
  if (quest.stage === "OSMOSIS") {
    return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.osmotic_status_label"))}} ${escapeLatexText(quest.statusKey || "isotonic")}`;
  }
  if (quest.stage === "RESPIRATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.respiration_clue_label"))}} ${quest.expressionLatex || quest.promptLatex}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.homeostasis_clue_label"))}} ${quest.expressionLatex || quest.promptLatex}`;
}

function buildTraceLatex(quest: MetabolicSolverQuest, t: Translator) {
  if (quest.stage === "OSMOSIS") {
    return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.trace_osmosis_pattern"))}}`;
  }
  if (quest.stage === "RESPIRATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.trace_respiration_pattern"))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_01_metabolic.solver.trace_homeostasis_pattern"))}}`;
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
  const clueLatex = buildClueLatex(quest, t);
  const traceLatex = buildTraceLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!ruleLatex || !clueLatex || !traceLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("biology.sb1_01_metabolic.solver.extract_metabolic_clue"), clueLatex),
    makeStep(4, t("biology.sb1_01_metabolic.solver.trace_regulation_pattern"), traceLatex),
    makeStep(5, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
