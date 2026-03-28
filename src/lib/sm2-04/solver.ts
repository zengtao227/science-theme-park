import type { FeedbackContent, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "SCALE_FACTOR" | "SIMILAR_TRIANGLES" | "MISSION";

interface SimilarityVisual {
  kind?: string;
  a?: number;
  b?: number;
  k?: number;
  r?: number;
  l?: number;
}

export interface SM204FeedbackQuest extends Quest {
  stage: Stage;
  visual?: SimilarityVisual;
}

function getExpectedNumber(quest: SM204FeedbackQuest, id: string) {
  const slot = quest.slots.find((item) => item.id === id);
  if (!slot) return null;
  const value = slot.expected;
  return typeof value === "number" ? value : Number(value);
}

export function solveSM204(quest: SM204FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
  ];

  if (quest.stage === "SCALE_FACTOR") {
    const oldValue = quest.visual?.a;
    const scaleFactor = quest.visual?.k;
    const newValue = getExpectedNumber(quest, "n");
    const askedK = getExpectedNumber(quest, "k");

    if (oldValue === undefined || scaleFactor === undefined) {
      return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
    }

    if (newValue !== null) {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\text{new value} = k \\cdot \\text{old value}"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{new value} = ${formatNumber(scaleFactor)} \\cdot ${formatNumber(oldValue)} = ${formatNumber(newValue)}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `${quest.targetLatex} = ${formatNumber(newValue)}`, "key")
      );
    } else if (askedK !== null) {
      const computedNew = oldValue * scaleFactor;
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "k = \\frac{\\text{new value}}{\\text{old value}}"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `k = \\frac{${formatNumber(computedNew)}}{${formatNumber(oldValue)}} = ${formatNumber(askedK)}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `k = ${formatNumber(askedK)}`, "key")
      );
    } else {
      return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
    }
  } else if (quest.stage === "SIMILAR_TRIANGLES") {
    const x = getExpectedNumber(quest, "x");
    const a = quest.visual?.a;
    const b = quest.visual?.b;
    const k = quest.visual?.k;
    if (x === null || a === undefined || b === undefined || k === undefined) {
      return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
    }

    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\frac{a_1}{a_2} = \\frac{b_1}{b_2}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `k = ${formatNumber(k)},\\; x = ${formatNumber(k)} \\cdot ${formatNumber(a)} = ${formatNumber(b)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `x = ${formatNumber(x)}`, "key")
    );
  } else if (quest.stage === "MISSION") {
    const height = getExpectedNumber(quest, "h");
    const width = getExpectedNumber(quest, "w");

    if (quest.visual?.kind === "shadow" && height !== null && quest.visual.b !== undefined && quest.visual.k !== undefined) {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\frac{H}{\\text{tower shadow}} = \\frac{\\text{stick height}}{\\text{stick shadow}}"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `H = ${formatNumber(quest.visual.b)} \\cdot ${formatNumber(quest.visual.k)} = ${formatNumber(height)}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `H = ${formatNumber(height)}`, "key")
      );
    } else if (quest.visual?.kind === "ring" && width !== null && quest.visual.r !== undefined && quest.visual.l !== undefined) {
      const halfChord = quest.visual.l / 2;
      const innerRadius = Math.sqrt(quest.visual.r * quest.visual.r - halfChord * halfChord);
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "d = \\sqrt{R^2 - \\left(\\frac{L}{2}\\right)^2}"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `d = \\sqrt{${formatNumber(quest.visual.r)}^2 - (${formatNumber(halfChord)})^2} = ${formatNumber(innerRadius)}`),
        makeStep(4, t("common.feedback_reasons.compute_result"), `w = ${formatNumber(quest.visual.r)} - ${formatNumber(innerRadius)} = ${formatNumber(width)}`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), `w = ${formatNumber(width)}`, "key")
      );
    } else {
      return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
    }
  } else {
    return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
