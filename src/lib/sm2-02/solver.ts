import type { FeedbackContent, Quest, Slot } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import { formatRadicalLatex, type Radical } from "@/lib/math";

type Stage =
  | "EXPLORER"
  | "SOLVE_HYP" | "SOLVE_LEG" | "CHECK_RIGHT"
  | "DISTANCE" | "ELITE_SPACE" | "MISSION"
  | "MENTAL" | "CHAIN"
  | "PERFECT" | "SIMPLIFY" | "ESTIMATE";

export interface SM202FeedbackQuest extends Quest {
  stage: Stage;
  visual: {
    kind: "triangle" | "space" | "distance" | "box" | "3d";
    a?: number;
    b?: number;
    c?: number;
    p1?: { x: number; y: number; z?: number };
    p2?: { x: number; y: number; z?: number };
  };
  slots: Slot[];
}

function getSlot(quest: SM202FeedbackQuest, id: string) {
  return quest.slots.find((slot) => slot.id === id);
}

function getNumberExpected(quest: SM202FeedbackQuest, id: string) {
  const slot = getSlot(quest, id);
  if (!slot) return null;
  const value = slot.expected;
  return typeof value === "number" ? value : Number(value);
}

function getRadicalExpected(quest: SM202FeedbackQuest, id: string): Radical | null {
  const slot = getSlot(quest, id);
  if (!slot || typeof slot.expected !== "string") return null;
  try {
    return JSON.parse(slot.expected) as Radical;
  } catch {
    return null;
  }
}

function parseFirstNumber(text: string | undefined) {
  if (!text) return null;
  const match = text.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

export function solveSM202(quest: SM202FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
  ];

  switch (quest.stage) {
    case "SOLVE_HYP": {
      if (quest.visual.a === undefined || quest.visual.b === undefined) {
        return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
      }
      const c2 = getNumberExpected(quest, "c2");
      const c = getNumberExpected(quest, "c");
      if (c2 === null || c === null) return { steps: [], fullSolutionLatex: null, hasFullSolution: false };

      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a^2 + b^2 = c^2"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `c^2 = ${quest.visual.a}^2 + ${quest.visual.b}^2 = ${c2}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `c = \\sqrt{${c2}} = ${c}`, "key")
      );
      break;
    }

    case "SOLVE_LEG": {
      const c = quest.visual.c;
      const a = quest.visual.a;
      const b = quest.visual.b;
      const leg2 = getNumberExpected(quest, "leg2");
      const leg = getNumberExpected(quest, "leg");
      if (c === undefined || a === undefined || b === undefined || leg2 === null || leg === null) {
        return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
      }
      const knownIsA = leg === b;
      const known = knownIsA ? a : b;
      const missingVar = knownIsA ? "b" : "a";

      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a^2 + b^2 = c^2"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${missingVar}^2 = ${c}^2 - ${known}^2 = ${leg2}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `${missingVar} = \\sqrt{${leg2}} = ${leg}`, "key")
      );
      break;
    }

    case "CHECK_RIGHT": {
      const a = quest.visual.a;
      const b = quest.visual.b;
      const c = quest.visual.c;
      if (a === undefined || b === undefined || c === undefined) {
        return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
      }
      const left = a * a + b * b;
      const right = c * c;
        steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a^2 + b^2 = c^2"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${a}^2 + ${b}^2 = ${left},\\; ${c}^2 = ${right}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), left === right ? `\\text{${t("sm2_02.yes")}}` : `\\text{${t("sm2_02.no")}}`, "key")
      );
      break;
    }

    case "DISTANCE": {
      const { p1, p2 } = quest.visual;
      const d2 = getNumberExpected(quest, "d2");
      const radical = getRadicalExpected(quest, "d");
      if (!p1 || !p2 || d2 === null || !radical) {
        return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
      }
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dz = (p2.z ?? 0) - (p1.z ?? 0);
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "d^2 = (\\Delta x)^2 + (\\Delta y)^2 + (\\Delta z)^2"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `d^2 = (${dx})^2 + (${dy})^2 + (${dz})^2 = ${d2}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `d = \\sqrt{${d2}} = ${formatRadicalLatex(radical)}`, "key")
      );
      break;
    }

    case "ELITE_SPACE": {
      const { a, b, c } = quest.visual;
      const d2 = getNumberExpected(quest, "d2");
      const radical = getRadicalExpected(quest, "d");
      if (a === undefined || b === undefined || c === undefined || d2 === null || !radical) {
        return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
      }
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "d^2 = a^2 + b^2 + c^2"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `d^2 = ${a}^2 + ${b}^2 + ${c}^2 = ${d2}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `d = \\sqrt{${d2}} = ${formatRadicalLatex(radical)}`, "key")
      );
      break;
    }

    case "MISSION":
    case "CHAIN": {
      const s2 = getNumberExpected(quest, "s2");
      const s = getRadicalExpected(quest, "s");
      const d2 = getNumberExpected(quest, "d2") ?? getNumberExpected(quest, "c2") ?? getNumberExpected(quest, "r2");
      const finalRadical = getRadicalExpected(quest, "d") ?? getRadicalExpected(quest, "r");
      const finalNumber = getNumberExpected(quest, "c");

      if (s2 !== null && s && d2 !== null && finalRadical) {
        steps.push(
          makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "s^2 = a^2 + b^2"),
          makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `s^2 = ${s2},\\; s = ${formatRadicalLatex(s)}`),
          makeStep(4, t("common.feedback_reasons.compute_result"), `d^2 = s^2 + c^2 = ${d2}`),
          makeStep(5, t("common.feedback_reasons.state_final_result"), `d = \\sqrt{${d2}} = ${formatRadicalLatex(finalRadical)}`, "key")
        );
      } else if (d2 !== null && finalRadical) {
        steps.push(
          makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "d^2 = a^2 + b^2 + c^2"),
          makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `d^2 = ${d2}`),
          makeStep(4, t("common.feedback_reasons.state_final_result"), `d = \\sqrt{${d2}} = ${formatRadicalLatex(finalRadical)}`, "key")
        );
      } else if (d2 !== null && finalNumber !== null) {
        steps.push(
          makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "c^2 = a^2 + b^2"),
          makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `c^2 = ${d2}`),
          makeStep(4, t("common.feedback_reasons.state_final_result"), `c = \\sqrt{${d2}} = ${finalNumber}`, "key")
        );
      } else {
        return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
      }
      break;
    }

    case "MENTAL": {
      const ans = getNumberExpected(quest, "ans");
      if (ans === null) return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
      const usesHyp = quest.expressionLatex?.includes("a^2 + b^2") ?? false;
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), usesHyp ? "c = \\sqrt{a^2 + b^2}" : "b = \\sqrt{c^2 - a^2}"),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${usesHyp ? "c" : "b"} = ${ans}`, "key")
      );
      break;
    }

    case "PERFECT": {
      const ans = getNumberExpected(quest, "sqrt");
      const n = parseFirstNumber(quest.expressionLatex);
      if (ans === null || n === null) return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `${n} = ${ans}^2`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), `\\sqrt{${n}} = ${ans}`, "key")
      );
      break;
    }

    case "SIMPLIFY": {
      const radical = getRadicalExpected(quest, "simplify");
      const n = parseFirstNumber(quest.expressionLatex);
      if (!radical || n === null) return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\sqrt{${n}} = \\sqrt{${radical.k * radical.k}\\cdot ${radical.m}}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), `\\sqrt{${n}} = ${formatRadicalLatex(radical)}`, "key")
      );
      break;
    }

    case "ESTIMATE": {
      const judge = getSlot(quest, "judge")?.expected === "true";
      if (!quest.targetLatex) return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "n^2 < a < (n+1)^2"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), quest.targetLatex),
        makeStep(4, t("common.feedback_reasons.state_final_result"), judge ? `\\text{${t("sm2_02.yes")}}` : `\\text{${t("sm2_02.no")}}`, "key")
      );
      break;
    }

    default:
      return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
