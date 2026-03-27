import type { PlatformSolutionStep } from "@/hooks/useQuestManager";

export interface SM211SequenceData {
  a1: number;
  d?: number;
  r?: number;
  n: number;
  answer: number;
}

type Translator = (path: string, params?: Record<string, string | number>) => any;

interface RawStep {
  justification: string;
  expressionLatex: string;
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps
    .map((step) => `\\text{${step.justification}} \\implies ${step.expressionLatex}`)
    .join(" \\\\ ");
}

export function solveSM211(
  stage: "ARITHMETIC" | "GEOMETRIC" | "SERIES",
  data: SM211SequenceData | undefined,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  if (!data) {
    return { steps: [], fullSolutionLatex: null };
  }

  const rawSteps: RawStep[] = [];

  if (stage === "ARITHMETIC") {
    if (data.d === undefined) {
      return { steps: [], fullSolutionLatex: null };
    }
    const offset = data.n - 1;
    const increment = offset * data.d;
    rawSteps.push({
      justification: t("sm2_11.reasons.choose_arithmetic_formula"),
      expressionLatex: `a_n = a_1 + (n-1)d`,
    });
    rawSteps.push({
      justification: t("sm2_11.reasons.compute_position_offset"),
      expressionLatex: `a_${data.n} = ${data.a1} + (${data.n} - 1) \\cdot ${data.d} = ${data.a1} + ${offset} \\cdot ${data.d}`,
    });
    rawSteps.push({
      justification: t("sm2_11.reasons.compute_sequence_result"),
      expressionLatex: `a_${data.n} = ${data.a1} + ${increment} = ${data.answer}`,
    });
  } else if (stage === "GEOMETRIC") {
    if (data.r === undefined) {
      return { steps: [], fullSolutionLatex: null };
    }
    const exponent = data.n - 1;
    const powerValue = Math.pow(data.r, exponent);
    rawSteps.push({
      justification: t("sm2_11.reasons.choose_geometric_formula"),
      expressionLatex: `a_n = a_1 \\cdot r^{n-1}`,
    });
    rawSteps.push({
      justification: t("sm2_11.reasons.compute_power_factor"),
      expressionLatex: `a_${data.n} = ${data.a1} \\cdot ${data.r}^{${exponent}} = ${data.a1} \\cdot ${powerValue}`,
    });
    rawSteps.push({
      justification: t("sm2_11.reasons.compute_sequence_result"),
      expressionLatex: `a_${data.n} = ${data.answer}`,
    });
  } else {
    if (data.d === undefined) {
      return { steps: [], fullSolutionLatex: null };
    }
    const offset = data.n - 1;
    const inner = 2 * data.a1 + offset * data.d;
    rawSteps.push({
      justification: t("sm2_11.reasons.choose_series_formula"),
      expressionLatex: `S_n = \\frac{n}{2}(2a_1 + (n-1)d)`,
    });
    rawSteps.push({
      justification: t("sm2_11.reasons.simplify_series_bracket"),
      expressionLatex: `S_${data.n} = \\frac{${data.n}}{2}\\left(2\\cdot ${data.a1} + (${data.n}-1)\\cdot ${data.d}\\right) = \\frac{${data.n}}{2}(${inner})`,
    });
    rawSteps.push({
      justification: t("sm2_11.reasons.compute_sequence_result"),
      expressionLatex: `S_${data.n} = ${data.answer}`,
    });
  }

  const steps: PlatformSolutionStep[] = rawSteps.map((step, index) => ({
    stepNumber: index + 1,
    justification: step.justification,
    expressionLatex: step.expressionLatex,
  }));

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
