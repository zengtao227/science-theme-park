import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC207Quest } from "./sc2-07-types";

export function solveSC207(quest: SC207Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  switch (quest.stage) {
    case "ENERGY_CHANGES":
      steps.push(makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.equationLatex || quest.expressionLatex));
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          `\\Delta H < 0 \\Rightarrow \\text{exothermic},\\quad \\Delta H > 0 \\Rightarrow \\text{endothermic}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\text{${escapeLatexText(t("chemistry.sc2_07.solver.solve_energy_changes"))}}`
        )
      );
      break;
    case "HESS_LAW":
      if (!quest.hessData) {
        return { steps: [], fullSolutionLatex: null };
      }
      steps.push(makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.hessData.targetEquation.equationLatex));
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          `\\text{${escapeLatexText(t("chemistry.sc2_07.solver.rule_hess_law"))}}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\Delta H_{total} = ${quest.hessData.availableEquations.map((eq) => `(${eq.deltaH})`).join(" + ")}`
        )
      );
      break;
    case "CALORIMETRY":
      if (!quest.calorimetryData) {
        return { steps: [], fullSolutionLatex: null };
      }
      steps.push(
        makeStep(
          1,
          t("common.feedback_reasons.identify_given_values"),
          `m=${quest.calorimetryData.mass}\\text{ g},\\ c=${quest.calorimetryData.specificHeat},\\ \\Delta T=${quest.calorimetryData.tempChange}`
        )
      );
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          quest.calorimetryData.calorimeterCapacity
            ? "q_{total} = mc\\Delta T + C_{cal}\\Delta T"
            : "q = mc\\Delta T"
        )
      );
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          quest.calorimetryData.moles
            ? `\\text{${escapeLatexText(t("chemistry.sc2_07.solver.solve_calorimetry_enthalpy"))}}`
            : `q = ${quest.calorimetryData.heat}`
        )
      );
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
