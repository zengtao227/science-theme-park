import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { AcidBaseQuest } from "./types";

function isBase(quest: AcidBaseQuest) {
  return /OH|NH_3/.test(quest.substance ?? "") || (quest.pH ?? 7) > 7;
}

export function solveSC205(quest: AcidBaseQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];

  switch (quest.stage) {
    case "PH_BASICS":
      if (quest.reactionType === "buffer") {
        steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "pH = pK_a + \\log\\frac{[A^-]}{[HA]}"));
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), quest.expressionLatex));
      } else if (quest.reactionType === "dissociation") {
        steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), isBase(quest) ? "pOH = -\\log[OH^-],\\; pH = 14 - pOH" : "pH = -\\log[H^+]"));
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), quest.expressionLatex));
      } else {
        steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{Use the characteristic relation for polyprotic or amphoteric systems}"));
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\text{Set up the equilibrium expression and solve for the requested pH quantity}"));
      }
      break;
    case "NEUTRALIZATION":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "n(H^+) \\text{ and } n(OH^-) \\text{ determine the excess species}"));
      if (quest.targetLatex.includes("pH")) {
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\text{Find excess acid/base, then convert concentration to pH}"));
      } else if (quest.targetLatex.includes("V")) {
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\text{Add or solve volumes by stoichiometric equivalence}"));
      } else if (quest.targetLatex.includes("Q")) {
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "Q = n \\Delta H_{neut}"));
      } else {
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\text{Apply neutralization stoichiometry}"));
      }
      break;
    case "TITRATION":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "C_a V_a = C_b V_b"));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), quest.targetLatex.includes("pH") ? "\\text{Locate the titration point and evaluate pH there}" : "\\text{Solve the missing titration quantity from equivalence}"));
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
