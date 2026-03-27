import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, round2, type Translator } from "@/lib/feedback/solverSupport";
import type { SP308Quest } from "./quests";

function rad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function solveSP308(quest: SP308Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.scenario === "reflection") {
    steps.push(
      makeStep(1, t("common.feedback_reasons.identify_given_values"), `\\theta_i = ${formatNumber(quest.angle)}^\\circ`),
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\theta_i = \\theta_r"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\theta_r = ${formatNumber(quest.angle)}^\\circ`),
    );
  } else if (quest.scenario === "refraction" && quest.n1 != null && quest.n2 != null) {
    const theta2 = Math.asin((quest.n1 * Math.sin(rad(quest.angle))) / quest.n2) * (180 / Math.PI);
    steps.push(
      makeStep(1, t("common.feedback_reasons.identify_given_values"), `n_1=${formatNumber(quest.n1)},\\; n_2=${formatNumber(quest.n2)},\\; \\theta_1=${formatNumber(quest.angle)}^\\circ`),
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "n_1\\sin\\theta_1 = n_2\\sin\\theta_2"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\theta_2 = \\arcsin\\left(\\frac{${formatNumber(quest.n1)}\\sin(${formatNumber(quest.angle)}^\\circ)}{${formatNumber(quest.n2)}}\\right) = ${formatNumber(theta2)}^\\circ`),
    );
  } else if (quest.scenario === "lens" && quest.focalLength != null && quest.objectDistance != null) {
    const v = (quest.focalLength * quest.objectDistance) / (quest.objectDistance - quest.focalLength);
    const m = -v / quest.objectDistance;
    steps.push(
      makeStep(1, t("common.feedback_reasons.identify_given_values"), `f=${formatNumber(quest.focalLength)},\\; u=${formatNumber(quest.objectDistance)}`),
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `v = \\frac{fu}{u-f} = \\frac{${formatNumber(quest.focalLength)} \\cdot ${formatNumber(quest.objectDistance)}}{${formatNumber(quest.objectDistance)}-${formatNumber(quest.focalLength)}} = ${formatNumber(v)}`),
      makeStep(4, t("common.feedback_reasons.solve_step_by_step"), `m = -\\frac{v}{u} = -\\frac{${formatNumber(v)}}{${formatNumber(quest.objectDistance)}} = ${formatNumber(m)}`),
    );
  } else {
    return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
