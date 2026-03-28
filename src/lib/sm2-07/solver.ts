import type { FeedbackContent, Quest, Slot } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "DISTANCE" | "MIDPOINT" | "SLOPE";

export interface SM207FeedbackQuest extends Quest {
  stage: Stage;
  point1: [number, number];
  point2: [number, number];
  promptKey?: string;
  promptParams?: Record<string, string | number>;
  slots: Slot[];
}

function emptyResult(): Omit<FeedbackContent, "hint"> {
  return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
}

function getExpectedNumber(quest: SM207FeedbackQuest, id: string) {
  const value = quest.slots.find((slot) => slot.id === id)?.expected;
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) return Number(value);
  return null;
}

function parseCollinearPoints(expressionLatex: string) {
  const match = expressionLatex.match(/A\(([-\d.]+),([-\d.]+)\),\s*B\(([-\d.]+),([-\d.]+)\),\s*C\(([^,]+),([^)]+)\)/);
  if (!match) return null;
  return {
    ax: Number(match[1]),
    ay: Number(match[2]),
    bx: Number(match[3]),
    by: Number(match[4]),
    cx: match[5],
    cy: match[6],
  };
}

export function solveSM207(quest: SM207FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const [x1, y1] = quest.point1;
  const [x2, y2] = quest.point2;
  const dx = x2 - x1;
  const dy = y2 - y1;

  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
  ];

  if (quest.stage === "DISTANCE") {
    const d = getExpectedNumber(quest, "d");
    const x = getExpectedNumber(quest, "x");
    const y = getExpectedNumber(quest, "y");

    if (d !== null) {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}"),
        makeStep(3, t("common.feedback_reasons.substitute_values"), `d = \\sqrt{(${x2}-${x1})^2 + (${y2}-${y1})^2}`),
        makeStep(4, t("common.feedback_reasons.compute_result"), `d = \\sqrt{${dx * dx} + ${dy * dy}} = ${formatNumber(d)}`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), `d = ${formatNumber(d)}`, "key")
      );
    } else if (x !== null || y !== null) {
      const target = x !== null ? "x" : "y";
      const knownDiff = x !== null ? dy : dx;
      const solvedValue = x !== null ? x : y;
      if (solvedValue === null) return emptyResult();
      const unknownDiff = x !== null ? solvedValue - x1 : solvedValue - y1;
      const distance = Number(quest.promptParams?.d ?? Math.sqrt(dx * dx + dy * dy));
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "d^2 = (x_2-x_1)^2 + (y_2-y_1)^2"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${distance}^2 = ${x !== null ? `(x-${x1})^2 + (${knownDiff})^2` : `(${knownDiff})^2 + (y-${y1})^2`}`),
        makeStep(4, t("common.feedback_reasons.compute_result"), `${target}-${target === "x" ? x1 : y1} = ${formatNumber(unknownDiff)}`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), `${target} = ${formatNumber(solvedValue)}`, "key")
      );
    } else {
      return emptyResult();
    }
  } else if (quest.stage === "MIDPOINT") {
    const mx = getExpectedNumber(quest, "mx");
    const my = getExpectedNumber(quest, "my");
    const bx = getExpectedNumber(quest, "bx");
    const by = getExpectedNumber(quest, "by");

    if (mx !== null && my !== null) {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "M\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)"),
        makeStep(3, t("common.feedback_reasons.substitute_values"), `M\\left(\\frac{${x1}+${x2}}{2},\\frac{${y1}+${y2}}{2}\\right)`),
        makeStep(4, t("common.feedback_reasons.compute_result"), `M(${formatNumber(mx)}, ${formatNumber(my)})`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), `M(${formatNumber(mx)}, ${formatNumber(my)})`, "key")
      );
    } else if (bx !== null && by !== null) {
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "x_B = 2x_M - x_A,\\; y_B = 2y_M - y_A"),
        makeStep(3, t("common.feedback_reasons.substitute_values"), `x_B = 2\\cdot ${formatNumber(midX)} - ${x1},\\; y_B = 2\\cdot ${formatNumber(midY)} - ${y1}`),
        makeStep(4, t("common.feedback_reasons.compute_result"), `B(${formatNumber(bx)}, ${formatNumber(by)})`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), `B(${formatNumber(bx)}, ${formatNumber(by)})`, "key")
      );
    } else {
      return emptyResult();
    }
  } else if (quest.stage === "SLOPE") {
    const m = getExpectedNumber(quest, "m");
    const x = getExpectedNumber(quest, "x");
    const y = getExpectedNumber(quest, "y");

    if (m !== null) {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "m = \\frac{y_2-y_1}{x_2-x_1}"),
        makeStep(3, t("common.feedback_reasons.substitute_values"), `m = \\frac{${y2}-${y1}}{${x2}-${x1}}`),
        makeStep(4, t("common.feedback_reasons.compute_result"), `m = ${formatNumber(dy / dx)}`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), `m = ${formatNumber(m)}`, "key")
      );
    } else if (x !== null || y !== null) {
      const parsed = parseCollinearPoints(quest.expressionLatex);
      if (!parsed) return emptyResult();
      const slopeAB = (parsed.by - parsed.ay) / (parsed.bx - parsed.ax);
      const solvedValue = x !== null ? x : y;
      if (solvedValue === null) return emptyResult();
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{Collinear points have the same slope.}"),
        makeStep(3, t("common.feedback_reasons.compute_result"), `m_{AB} = \\frac{${parsed.by}-${parsed.ay}}{${parsed.bx}-${parsed.ax}} = ${formatNumber(slopeAB)}`),
        makeStep(
          4,
          t("common.feedback_reasons.solve_step_by_step"),
          x !== null
            ? `\\frac{${parsed.by}-${parsed.ay}}{${parsed.bx}-${parsed.ax}} = \\frac{${parsed.cy}-${parsed.by}}{x-${parsed.bx}}`
            : `\\frac{${parsed.by}-${parsed.ay}}{${parsed.bx}-${parsed.ax}} = \\frac{y-${parsed.by}}{${parsed.cx}-${parsed.bx}}`
        ),
        makeStep(5, t("common.feedback_reasons.state_final_result"), `${x !== null ? "x" : "y"} = ${formatNumber(solvedValue)}`, "key")
      );
    } else {
      return emptyResult();
    }
  } else {
    return emptyResult();
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
