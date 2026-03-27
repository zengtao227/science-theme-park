import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, round2, type Translator } from "@/lib/feedback/solverSupport";
import type { SP307Quest } from "./types";

function rad(deg: number) {
  return (deg * Math.PI) / 180;
}

function compositionWork(quest: SP307Quest) {
  const cos = Math.cos(rad(quest.theta));
  const sin = Math.sin(rad(quest.theta));
  const vx = quest.vFerry * cos;
  const vy = quest.vFerry * sin + quest.vRiver;

  if (quest.theta === 0 || quest.theta === 180) {
    const value = quest.theta === 0 ? quest.vFerry + quest.vRiver : quest.vFerry - quest.vRiver;
    return `v_{net} = ${formatNumber(quest.vFerry)} ${quest.theta === 0 ? "+" : "-"} ${formatNumber(quest.vRiver)} = ${formatNumber(value)}`;
  }
  if (quest.targetLatex.includes("x")) {
    return `v_x = v_f\\cos\\theta = ${formatNumber(quest.vFerry)}\\cos(${formatNumber(quest.theta)}^\\circ) = ${formatNumber(vx)}`;
  }
  if (quest.targetLatex.includes("y")) {
    return `v_y = v_f\\sin\\theta + v_r = ${formatNumber(quest.vFerry)}\\sin(${formatNumber(quest.theta)}^\\circ) + ${formatNumber(quest.vRiver)} = ${formatNumber(vy)}`;
  }
  if (quest.targetLatex.includes("\\theta")) {
    return `\\theta_{net} = \\arctan\\left(\\frac{${formatNumber(vy)}}{${formatNumber(vx)}}\\right) = ${formatNumber((Math.atan2(vy, vx) * 180) / Math.PI)}^\\circ`;
  }
  return `v_{net} = \\sqrt{${formatNumber(vx)}^{2} + ${formatNumber(vy)}^{2}} = ${formatNumber(Math.sqrt(vx * vx + vy * vy))}`;
}

function driftWork(quest: SP307Quest) {
  const angle = (Math.acos(-quest.vRiver / quest.vFerry) * 180) / Math.PI;
  return `\\theta = \\arccos\\left(-\\frac{v_r}{v_f}\\right) = \\arccos\\left(-\\frac{${formatNumber(quest.vRiver)}}{${formatNumber(quest.vFerry)}}\\right) = ${formatNumber(angle)}^\\circ`;
}

export function solveSP307(quest: SP307Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), `v_r=${formatNumber(quest.vRiver)},\\; v_f=${formatNumber(quest.vFerry)},\\; \\theta=${formatNumber(quest.theta)}^\\circ`),
  ];

  if (quest.stage === "COMPOSITION") {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), quest.expressionLatex));
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), compositionWork(quest)));
  } else if (quest.stage === "DRIFT") {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "v_f\\cos\\theta + v_r = 0"));
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), driftWork(quest)));
  } else {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), quest.expressionLatex));
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), quest.hintLatex?.[0] ?? quest.expressionLatex));
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
