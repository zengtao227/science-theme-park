import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { AcidBaseQuest } from "./types";

function isBase(quest: AcidBaseQuest) {
  return /OH|NH_3/.test(quest.substance ?? "") || (quest.pH ?? 7) > 7;
}

function concentrationText(quest: AcidBaseQuest) {
  if (typeof quest.concentration === "number") return String(quest.concentration);
  const match = quest.expressionLatex.match(/(?:=|approx)\s*([0-9.]+(?:\\times 10\^{[-\d]+})?)/);
  return match?.[1] ?? quest.expressionLatex;
}

export function solveSC205(quest: AcidBaseQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];

  switch (quest.stage) {
    case "PH_BASICS":
      if (quest.reactionType === "buffer") {
        steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "pH = pK_a + \\log\\frac{[A^-]}{[HA]}"));
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("chemistry.sc2_05.solver.ph_special_case"))}}`));
      } else if (quest.reactionType === "dissociation") {
        const concentration = concentrationText(quest);
        steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), isBase(quest) ? "pOH = -\\log[OH^-],\\; pH = 14 - pOH" : "pH = -\\log[H^+]"));
        steps.push(
          makeStep(
            3,
            t("common.feedback_reasons.solve_step_by_step"),
            isBase(quest)
              ? `pOH = -\\log(${concentration}),\\; pH = 14 - pOH`
              : `pH = -\\log(${concentration})`
          )
        );
      } else {
        steps.push(
          makeStep(
            2,
            t("common.feedback_reasons.select_formula_or_rule"),
            `\\text{${escapeLatexText(t("chemistry.sc2_05.solver.polyprotic_or_amphoteric_rule"))}}`
          )
        );
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("chemistry.sc2_05.solver.ph_special_case"))}}`));
      }
      break;
    case "NEUTRALIZATION":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("chemistry.sc2_05.solver.neutralization_rule_full"))}}`));
      if (quest.targetLatex.includes("pH")) {
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("chemistry.sc2_05.solver.neutralization_ph"))}}`));
      } else if (quest.targetLatex.includes("V")) {
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("chemistry.sc2_05.solver.neutralization_volume"))}}`));
      } else if (quest.targetLatex.includes("Q")) {
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "Q = n \\Delta H_{neut}"));
      } else {
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("chemistry.sc2_05.solver.neutralization_generic"))}}`));
      }
      break;
    case "TITRATION":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "C_a V_a = C_b V_b"));
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          quest.targetLatex.includes("pH")
            ? `C_a V_a = C_b V_b,\\; \\text{${escapeLatexText(t("chemistry.sc2_05.solver.titration_ph"))}}`
            : `C_a V_a = C_b V_b,\\; \\text{${escapeLatexText(t("chemistry.sc2_05.solver.titration_generic"))}}`
        )
      );
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
