import type { PlatformSolutionStep } from "@/hooks/useQuestManager";

export interface SM212ComboData {
  n: number;
  r: number;
  answer: number;
}

type Translator = (path: string, params?: Record<string, string | number>) => any;
type Stage = "PERMUTATIONS" | "COMBINATIONS" | "PROBABILITY";

interface RawStep {
  justification: string;
  expressionLatex: string;
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps
    .map((step) => `\\text{${step.justification}} \\implies ${step.expressionLatex}`)
    .join(" \\\\ ");
}

export function solveSM212(
  stage: Stage,
  data: SM212ComboData | undefined,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  if (!data) {
    return { steps: [], fullSolutionLatex: null };
  }

  const rawSteps: RawStep[] = [];

  if (stage === "PERMUTATIONS") {
    rawSteps.push({
      justification: t("sm2_12.reasons.choose_permutation_formula"),
      expressionLatex: `P(${data.n}, ${data.r}) = \\frac{${data.n}!}{(${data.n}-${data.r})!}`,
    });
    rawSteps.push({
      justification: t("sm2_12.reasons.expand_permutation_product"),
      expressionLatex: `P(${data.n}, ${data.r}) = ${data.n} \\cdot ${data.n - 1}${data.r > 2 ? ` \\cdots ${data.n - data.r + 1}` : ""}`,
    });
    rawSteps.push({
      justification: t("sm2_12.reasons.compute_combinatorics_result"),
      expressionLatex: `P(${data.n}, ${data.r}) = ${data.answer}`,
    });
  } else if (stage === "COMBINATIONS") {
    rawSteps.push({
      justification: t("sm2_12.reasons.choose_combination_formula"),
      expressionLatex: `C(${data.n}, ${data.r}) = \\frac{${data.n}!}{${data.r}!(${data.n}-${data.r})!}`,
    });
    rawSteps.push({
      justification: t("sm2_12.reasons.divide_by_orderings"),
      expressionLatex: `C(${data.n}, ${data.r}) = \\frac{P(${data.n}, ${data.r})}{${data.r}!}`,
    });
    rawSteps.push({
      justification: t("sm2_12.reasons.compute_combinatorics_result"),
      expressionLatex: `C(${data.n}, ${data.r}) = ${data.answer}`,
    });
  } else {
    rawSteps.push({
      justification: t("sm2_12.reasons.identify_probability_ratio"),
      expressionLatex: `P = \\frac{${data.r}}{${data.n}}`,
    });
    rawSteps.push({
      justification: t("sm2_12.reasons.compute_combinatorics_result"),
      expressionLatex: `P = ${data.answer}`,
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
