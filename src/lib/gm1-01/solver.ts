import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { G101Quest } from "./quests";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function formatNumber(value: number) {
  const rounded = round2(value);
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

function escapeLatexText(text: string) {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([{}%$&#_^])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}");
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps
    .map((step) => `\\text{${escapeLatexText(step.justification)}} \\implies ${step.expressionLatex}`)
    .join(" \\\\ ");
}

function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function parseLinearCoefficient(expr: string) {
  const match = expr.match(/([+-]?\d*)x(?!\^)/);
  if (!match) return 0;
  if (match[1] === "" || match[1] === "+") return 1;
  if (match[1] === "-") return -1;
  return Number(match[1]);
}

function parseChainFactor(expr: string) {
  const match = expr.match(/sin\(([-\d.]+)x\)/);
  return match ? Number(match[1]) : null;
}

export function solveGM101(
  quest: G101Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps: PlatformSolutionStep[] = [];
  const x = quest.xPosition;

  steps.push(
    makeStep(1, t("gm1_01.reasons.identify_function"), quest.expressionLatex)
  );

  if (quest.stage === "POWER_RULE") {
    if (quest.exponent === undefined) return { steps: [], fullSolutionLatex: null };
    const n = quest.exponent;
    const symbolic = `${n}x^{${n - 1}}`;
    const numeric = round2(n * Math.pow(x, n - 1));

    steps.push(
      makeStep(2, t("gm1_01.reasons.apply_power_rule"), `f'(x) = ${symbolic}`),
      makeStep(3, t("gm1_01.reasons.substitute_x_value"), `f'(${formatNumber(x)}) = ${n} \\cdot ${formatNumber(x)}^{${n - 1}} = ${formatNumber(numeric)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "FACTOR_RULE") {
    if (quest.exponent === undefined || quest.coefficient === undefined) return { steps: [], fullSolutionLatex: null };
    const a = quest.coefficient;
    const n = quest.exponent;
    const symbolic = `${a} \\cdot ${n}x^{${n - 1}} = ${a * n}x^{${n - 1}}`;
    const numeric = round2(a * n * Math.pow(x, n - 1));

    steps.push(
      makeStep(2, t("gm1_01.reasons.include_constant_factor"), `f'(x) = ${symbolic}`),
      makeStep(3, t("gm1_01.reasons.substitute_x_value"), `f'(${formatNumber(x)}) = ${formatNumber(numeric)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "SUM_RULE") {
    if (quest.coefficient === undefined || quest.exponent === undefined) return { steps: [], fullSolutionLatex: null };
    const a = quest.coefficient;
    const n = quest.exponent;
    const b = parseLinearCoefficient(quest.expressionLatex);
    const powerTerm = `${a * n}x^{${n - 1}}`;
    const derivativeLatex = b === 0 ? powerTerm : `${powerTerm}${b > 0 ? "+" : ""}${b}`;
    const numeric = round2(a * n * Math.pow(x, n - 1) + b);

    steps.push(
      makeStep(2, t("gm1_01.reasons.differentiate_termwise"), `f'(x) = ${derivativeLatex}`),
      makeStep(3, t("gm1_01.reasons.substitute_x_value"), `f'(${formatNumber(x)}) = ${formatNumber(numeric)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "PRODUCT_RULE") {
    const sinX = round2(Math.sin(x));
    const cosX = round2(Math.cos(x));
    const numeric = round2(Math.sin(x) + x * Math.cos(x));

    steps.push(
      makeStep(2, t("gm1_01.reasons.apply_product_rule"), `f'(x) = 1 \\cdot \\sin(x) + x \\cdot \\cos(x)`),
      makeStep(3, t("gm1_01.reasons.substitute_x_value"), `f'(${formatNumber(x)}) = ${formatNumber(sinX)} + ${formatNumber(x)} \\cdot ${formatNumber(cosX)} = ${formatNumber(numeric)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "QUOTIENT_RULE") {
    const sinX = round2(Math.sin(x));
    const cosX = round2(Math.cos(x));
    const numerator = round2(Math.sin(x) - x * Math.cos(x));
    const denominator = round2(Math.sin(x) * Math.sin(x));
    const numeric = round2((Math.sin(x) - x * Math.cos(x)) / (Math.sin(x) * Math.sin(x)));

    steps.push(
      makeStep(2, t("gm1_01.reasons.apply_quotient_rule"), `f'(x) = \\frac{1 \\cdot \\sin(x) - x \\cdot \\cos(x)}{\\sin^{2}(x)}`),
      makeStep(3, t("gm1_01.reasons.substitute_x_value"), `f'(${formatNumber(x)}) = \\frac{${formatNumber(sinX)} - ${formatNumber(x)} \\cdot ${formatNumber(cosX)}}{${formatNumber(denominator)}} = \\frac{${formatNumber(numerator)}}{${formatNumber(denominator)}} = ${formatNumber(numeric)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "CHAIN_RULE") {
    const k = parseChainFactor(quest.expressionLatex);
    if (k === null) return { steps: [], fullSolutionLatex: null };
    const cosValue = round2(Math.cos(k * x));
    const numeric = round2(k * Math.cos(k * x));

    steps.push(
      makeStep(2, t("gm1_01.reasons.apply_chain_rule"), `f'(x) = ${formatNumber(k)}\\cos(${formatNumber(k)}x)`),
      makeStep(3, t("gm1_01.reasons.substitute_x_value"), `f'(${formatNumber(x)}) = ${formatNumber(k)} \\cdot \\cos(${formatNumber(k * x)}) = ${formatNumber(k)} \\cdot ${formatNumber(cosValue)} = ${formatNumber(numeric)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else {
    return { steps: [], fullSolutionLatex: null };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
