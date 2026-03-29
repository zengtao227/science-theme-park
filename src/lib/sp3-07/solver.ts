import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";
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

function compositionRule(quest: SP307Quest) {
  if (quest.targetLatex.includes("x")) return "v_{net,x} = v_f\\cos\\theta";
  if (quest.targetLatex.includes("y")) return "v_{net,y} = v_f\\sin\\theta + v_r";
  if (quest.targetLatex.includes("\\theta")) return "\\theta_{net} = \\arctan\\left(\\frac{v_f\\sin\\theta + v_r}{v_f\\cos\\theta}\\right)";
  return "v_{net} = \\sqrt{(v_f\\cos\\theta)^2 + (v_f\\sin\\theta + v_r)^2}";
}

function navigationWork(quest: SP307Quest) {
  const sin = Math.sin(rad(quest.theta));
  const cos = Math.cos(rad(quest.theta));
  const verticalSpeed = quest.vFerry * sin;
  const horizontalSpeed = quest.vFerry * cos + quest.vRiver;

  if (quest.targetLatex.includes("d_{drift}")) {
    return quest.expressionLatex;
  }
  if (quest.targetLatex.includes("\\theta")) {
    return quest.expressionLatex;
  }
  if (quest.targetLatex.includes("E")) {
    return quest.expressionLatex;
  }
  if (quest.targetLatex.includes("v_{net}")) {
    return `v_{net} = \\sqrt{(${formatNumber(verticalSpeed)})^2 + (${formatNumber(horizontalSpeed)})^2}`;
  }
  return quest.expressionLatex;
}

function navigationRule(quest: SP307Quest) {
  if (quest.targetLatex.includes("d_{drift}")) return "d_{drift} = v_r t";
  if (quest.targetLatex.includes("\\theta")) return "\\theta_{path} = \\arctan\\left(\\frac{d_{drift}}{d}\\right)";
  if (quest.targetLatex.includes("E")) return "E = \\frac{1}{2}mv_{net}^{2}";
  if (quest.targetLatex.includes("v_{net}")) return "v_{net} = \\sqrt{(v_f\\sin\\theta)^2 + (v_f\\cos\\theta + v_r)^2}";
  return quest.expressionLatex;
}

export function solveSP307(quest: SP307Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), `v_r=${formatNumber(quest.vRiver)},\\; v_f=${formatNumber(quest.vFerry)},\\; \\theta=${formatNumber(quest.theta)}^\\circ`),
  ];

  if (quest.stage === "COMPOSITION") {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), compositionRule(quest)));
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), compositionWork(quest)));
  } else if (quest.stage === "DRIFT") {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "v_f\\cos\\theta + v_r = 0"));
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), driftWork(quest)));
  } else {
    steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), navigationRule(quest)));
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), navigationWork(quest)));
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
