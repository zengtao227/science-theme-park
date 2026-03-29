import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SC206Quest } from "./types";

export function solveSC206(quest: SC206Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex)];

  switch (quest.stage) {
    case "OXIDATION_STATE":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc2_06.solver.rule_oxidation_state")}}`));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("chemistry.sc2_06.solver.solve_oxidation_state")}}`));
      break;
    case "ELECTRON_TRANSFER":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc2_06.solver.rule_electron_transfer")}}`));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `n(e^-) = ${quest.electronsTransferred}`));
      break;
    case "ELECTROCHEMISTRY":
      if (quest.id.startsWith("EC-B")) {
        steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc2_06.solver.rule_galvanic_roles")}}`));
      } else if (quest.id.startsWith("EC-C")) {
        steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc2_06.solver.standard_cell_potential_label")}}\\; E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}`));
        if (quest.cellPotential != null) {
          steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `E^\\circ_{cell} = ${formatNumber(quest.cellPotential)}\\,\\text{V}`));
        }
      } else if (quest.id.startsWith("EC-A")) {
        steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc2_06.solver.nernst_label")}}\\; E = E^\\circ - \\frac{0.0592}{n}\\log Q`));
        if (quest.cellPotential != null) {
          steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `E = ${formatNumber(quest.cellPotential)}\\,\\text{V}`));
        }
      } else {
        steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc2_06.solver.faraday_label")}}\\; m = \\frac{I t M}{nF}`));
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `m = \\frac{I t M}{${quest.electronsTransferred}F}`));
      }
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
