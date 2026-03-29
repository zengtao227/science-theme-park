import type { FeedbackContent } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { S302Quest } from "@/lib/sm3-02/quests";

function getSlot(quest: S302Quest, id?: string) {
  if (id) return quest.slots.find((slot) => slot.id === id) ?? null;
  return quest.slots[0] ?? null;
}

function getQuadrant(angle: number) {
  if (angle === 0 || angle === 360) return 1;
  if (angle === 90) return 2;
  if (angle === 180) return 3;
  if (angle === 270) return 4;
  if (angle > 0 && angle < 90) return 1;
  if (angle > 90 && angle < 180) return 2;
  if (angle > 180 && angle < 270) return 3;
  return 4;
}

function getReferenceAngle(angle: number) {
  const normalized = ((angle % 360) + 360) % 360;
  if (normalized <= 90) return normalized;
  if (normalized <= 180) return 180 - normalized;
  if (normalized <= 270) return normalized - 180;
  return 360 - normalized;
}

function parseWaveCoefficient(expr: string) {
  const match = expr.match(/^y=([+-]?)(\\frac\{\d+\}\{\d+\}|\d+)/);
  if (!match) return null;
  const sign = match[1] === "-" ? -1 : 1;
  const body = match[2];
  if (body.startsWith("\\frac")) {
    const fraction = body.match(/\\frac\{(\d+)\}\{(\d+)\}/);
    if (!fraction) return null;
    return sign * Number(fraction[1]) / Number(fraction[2]);
  }
  return sign * Number(body);
}

function parseWaveShift(expr: string) {
  const match = expr.match(/\\(?:sin|cos)\(x\)([+-]\d+)$/);
  return match ? Number(match[1]) : 0;
}

function parseWaveFrequency(expr: string) {
  if (expr.includes("\\pi x")) return Math.PI;
  if (expr.includes("2\\pi x")) return 2 * Math.PI;
  const fractionMatch = expr.match(/\\(?:sin|cos)\(x\/(\d+)\)/);
  if (fractionMatch) return 1 / Number(fractionMatch[1]);
  const integerMatch = expr.match(/\\(?:sin|cos)\((\d+)x\)/);
  if (integerMatch) return Number(integerMatch[1]);
  return 1;
}

function derivativeExpression(expr: string) {
  if (expr.includes("y=\\sin(x)")) return "y' = \\cos(x)";
  if (expr.includes("y=\\cos(x)")) return "y' = -\\sin(x)";
  if (expr.includes("y=2\\sin(x)")) return "y' = 2\\cos(x)";
  if (expr.includes("y=3\\cos(x)")) return "y' = -3\\sin(x)";
  return expr;
}

function solveUnitCircle(quest: S302Quest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot || quest.angle == null) return null;

  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
  ];

  if (slot.id === "q") {
    const quadrant = getQuadrant(quest.angle);
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("math.sm3_02.solver.quadrant_rule"))}}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("math.sm3_02.solver.quadrant_solve", { angle: quest.angle, quadrant }))}}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `Q=${quadrant}`, "key")
    );
    return steps;
  }

  if (slot.id === "s") {
    const quadrant = getQuadrant(quest.angle);
    const sign = String(slot.expected);
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("math.sm3_02.solver.sign_rule"))}}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("math.sm3_02.solver.sign_solve", { angle: quest.angle, quadrant }))}}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), sign, "key")
    );
    return steps;
  }

  if (slot.id === "r") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("math.sm3_02.solver.degrees_to_radians_rule"))}}\\; = \\text{${escapeLatexText(t("math.sm3_02.solver.degrees_label"))}}\\cdot \\frac{\\pi}{180}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${quest.angle}^\\circ \\cdot \\frac{\\pi}{180}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
    return steps;
  }

  if (slot.id === "d") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("math.sm3_02.solver.radians_to_degrees_rule"))}}\\; = \\text{${escapeLatexText(t("math.sm3_02.solver.radians_label"))}}\\cdot \\frac{180}{\\pi}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\left(${quest.expressionLatex}\\right) \\cdot \\frac{180}{\\pi}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
    return steps;
  }

  return null;
}

function solveProjections(quest: S302Quest, t: Translator) {
  const slot = getSlot(quest, "v");
  if (!slot || quest.angle == null || !quest.trigFunc) return null;

  const quadrant = getQuadrant(quest.angle);
  const ref = getReferenceAngle(quest.angle);
  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("math.sm3_02.solver.reference_angle_rule", { ref }))}}`),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${escapeLatexText(t("math.sm3_02.solver.projection_quadrant_sign", { quadrant, trigFunc: quest.trigFunc }))}}`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${quest.correctLatex}`, "key")
  ];
  return steps;
}

function solveWaves(quest: S302Quest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot) return null;

  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
  ];

  if (slot.id === "a") {
    const coefficient = parseWaveCoefficient(quest.expressionLatex);
    if (coefficient == null) return null;
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `A = |\\text{${escapeLatexText(t("math.sm3_02.solver.amplitude_rule"))}}|`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `A = |${coefficient}|`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `A = ${slot.expected}`, "key")
    );
    return steps;
  }

  if (slot.id === "p") {
    const frequency = parseWaveFrequency(quest.expressionLatex);
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `T = \\frac{2\\pi}{b}\\; \\text{${escapeLatexText(t("math.sm3_02.solver.period_rule"))}}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `T = \\frac{2\\pi}{${Number.isInteger(frequency) ? frequency : frequency.toFixed(3)}}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `T = ${quest.correctLatex}`, "key")
    );
    return steps;
  }

  if (slot.id === "m") {
    const amplitude = Math.abs(parseWaveCoefficient(quest.expressionLatex) ?? NaN);
    const shift = parseWaveShift(quest.expressionLatex);
    if (!Number.isFinite(amplitude)) return null;
    const isMax = String(slot.labelLatex).includes("max");
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), isMax ? `\\text{${escapeLatexText(t("math.sm3_02.solver.max_rule"))}} = d + A` : `\\text{${escapeLatexText(t("math.sm3_02.solver.min_rule"))}} = d - A`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), isMax ? `${shift} + ${amplitude}` : `${shift} - ${amplitude}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${slot.expected}`, "key")
    );
    return steps;
  }

  if (slot.id === "y") {
    const pointMatch = quest.expressionLatex.match(/x=(\d+)\^\circ/);
    const xAngle = pointMatch ? Number(pointMatch[1]) : null;
    if (xAngle === null) return null;
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${escapeLatexText(t("math.sm3_02.solver.substitute_angle_rule"))}}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `x = ${xAngle}^\\circ`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `y = ${quest.correctLatex}`, "key")
    );
    return steps;
  }

  if (slot.id === "d") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `(\\sin x)' = \\cos x,\\quad (\\cos x)' = -\\sin x\\; \\text{${escapeLatexText(t("math.sm3_02.solver.derivative_rule"))}}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), derivativeExpression(quest.expressionLatex)),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `y' = ${quest.correctLatex}`, "key")
    );
    return steps;
  }

  return null;
}

export function solveSM302(quest: S302Quest, t: Translator): Omit<FeedbackContent, "hint"> {
  let steps = null;

  if (quest.stage === "UNIT_CIRCLE") steps = solveUnitCircle(quest, t);
  if (quest.stage === "PROJECTIONS") steps = solveProjections(quest, t);
  if (quest.stage === "WAVES") steps = solveWaves(quest, t);

  if (!steps || steps.length === 0) {
    return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
