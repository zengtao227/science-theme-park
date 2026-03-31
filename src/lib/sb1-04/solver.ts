import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "PLANT_STRUCTURE" | "WATER_TRANSPORT" | "NUTRIENT_TRANSPORT";

export interface SB104SolverQuest extends Quest {
  stage: Stage;
  structure?: string;
  function?: string;
}

function buildClueLatex(quest: SB104SolverQuest, t: Translator) {
  if (quest.stage === "PLANT_STRUCTURE") {
    return `\\text{${escapeLatexText(t("biology.sb1_04.solver.clue_structure_label"))}} ${escapeLatexText(quest.structure || t("biology.sb1_04.solver.default_structure"))}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_04.solver.clue_function_label"))}} ${quest.promptLatex}`;
}

function buildTraceLatex(quest: SB104SolverQuest, t: Translator) {
  if (quest.stage === "PLANT_STRUCTURE") {
    return `\\text{${escapeLatexText(t("biology.sb1_04.solver.trace_plant_structure_pattern"))}}`;
  }
  if (quest.stage === "WATER_TRANSPORT") {
    return `\\text{${escapeLatexText(t("biology.sb1_04.solver.trace_water_transport_pattern"))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_04.solver.trace_nutrient_transport_pattern"))}}`;
}

function buildRuleLatex(quest: SB104SolverQuest, t: Translator) {
  if (quest.stage === "PLANT_STRUCTURE") {
    return `\\text{${escapeLatexText(t("biology.sb1_04.solver.rule_plant_structure"))}}`;
  }
  if (quest.stage === "WATER_TRANSPORT") {
    return `\\text{${escapeLatexText(t("biology.sb1_04.solver.rule_water_transport"))}}`;
  }
  if (quest.stage === "NUTRIENT_TRANSPORT") {
    return `\\text{${escapeLatexText(t("biology.sb1_04.solver.rule_nutrient_transport"))}}`;
  }
  return null;
}

function buildSolveLatex(quest: SB104SolverQuest, t: Translator) {
  if (quest.stage === "PLANT_STRUCTURE") {
    return `\\text{${escapeLatexText(t("biology.sb1_04.solver.solve_plant_structure", {
      structure: quest.structure || t("biology.sb1_04.solver.default_structure"),
    }))}}`;
  }
  if (quest.stage === "WATER_TRANSPORT") {
    return `\\text{${escapeLatexText(t("biology.sb1_04.solver.solve_water_transport"))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb1_04.solver.solve_nutrient_transport"))}}`;
}

export function solveSB104(quest: SB104SolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest, t);
  const clueLatex = buildClueLatex(quest, t);
  const traceLatex = buildTraceLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!ruleLatex || !clueLatex || !traceLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("biology.sb1_04.solver.extract_plant_clue"), clueLatex),
    makeStep(4, t("biology.sb1_04.solver.trace_transport_pattern"), traceLatex),
    makeStep(5, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
