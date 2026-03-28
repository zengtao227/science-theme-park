import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC301Quest, Stage } from "./types";

const STAGE_FORMULAS: Record<Stage, { formula: string; c: number; h: number; n: number; o: number; groupsKey: string; rings: string; unsat: string }> = {
  ASPIRIN: { formula: "C9H8O4", c: 9, h: 8, n: 0, o: 4, groupsKey: "aspirin", rings: "1", unsat: "6" },
  CAFFEINE: { formula: "C8H10N4O2", c: 8, h: 10, n: 4, o: 2, groupsKey: "caffeine", rings: "2", unsat: "6" },
  ADRENALINE: { formula: "C9H13NO3", c: 9, h: 13, n: 1, o: 3, groupsKey: "adrenaline", rings: "1", unsat: "4" },
};

export function solveSC301(quest: SC301Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];
  const meta = STAGE_FORMULAS[quest.stage];

  if (quest.id.includes("-C")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `${meta.formula} \\Rightarrow C = ${meta.c}`));
  } else if (quest.id.includes("-H")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `${meta.formula} \\Rightarrow H = ${meta.h}`));
  } else if (quest.id.includes("-O")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `${meta.formula} \\Rightarrow O = ${meta.o}`));
  } else if (quest.id.includes("-N")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `${meta.formula} \\Rightarrow N = ${meta.n}`));
  } else if (quest.id.includes("TOTAL")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_01.solver.add_all_atoms"))}}`));
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${meta.c} + ${meta.h} + ${meta.n} + ${meta.o} = ${meta.c + meta.h + meta.n + meta.o}`));
  } else if (quest.id.includes("RATIO")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `C:O = ${meta.c}:${meta.o}`));
  } else if (quest.id.includes("MASS1")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "M \\approx 12C + H + 14N + 16O"));
  } else if (quest.id.includes("MASS2")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "M = 12.01C + 1.008H + 14.01N + 16.00O"));
  } else if (quest.id.includes("FULL")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_01.solver.assemble_complete_formula_for", { molecule: quest.moleculeName }))}}`));
  } else if (quest.id.includes("PERCENT") || quest.id.includes("COMPOSITION")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\%C = \\frac{m_C}{M_{total}}\\times 100"));
  } else if (quest.id.includes("BONDS")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_01.solver.estimate_bonds"))}}`));
  } else if (quest.id.includes("EMPIRICAL")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_01.solver.reduce_subscripts"))}}`));
  } else if (quest.id.includes("FUNCTIONAL")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_01.solver.functional_groups_label"))}} = \\text{${escapeLatexText(t(`chemistry.sc3_01.solver.groups.${meta.groupsKey}`))}}`));
  } else if (quest.id.includes("STRUCTURE")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc3_01.solver.ring_count_label"))}} = ${meta.rings}`));
  } else if (quest.id.includes("SATURATION")) {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{DU} = \\frac{2C + 2 + N - H}{2}"));
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\frac{2\\cdot${meta.c}+2+${meta.n}-${meta.h}}{2} = ${meta.unsat}`));
  } else {
    return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
