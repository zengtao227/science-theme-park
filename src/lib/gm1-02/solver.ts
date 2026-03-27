import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { GM102Quest } from "./quests";

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

function antiderivativeTerms(coeffs: number[]) {
  return coeffs
    .map((coeff, power) => ({ coeff, power }))
    .filter(({ coeff }) => coeff !== 0)
    .map(({ coeff, power }) => ({
      originalPower: power,
      newPower: power + 1,
      newCoeff: round2(coeff / (power + 1)),
    }));
}

function buildPolynomialLatex(coeffs: number[]) {
  const pieces = coeffs
    .map((coeff, power) => ({ coeff, power }))
    .filter(({ coeff }) => coeff !== 0)
    .map(({ coeff, power }) => {
      const coeffText = formatNumber(coeff);
      if (power === 0) return coeffText;
      if (power === 1) {
        if (coeffText === "1") return "x";
        if (coeffText === "-1") return "-x";
        return `${coeffText}x`;
      }
      if (coeffText === "1") return `x^{${power}}`;
      if (coeffText === "-1") return `-x^{${power}}`;
      return `${coeffText}x^{${power}}`;
    });

  return pieces.map((piece, index) => (index > 0 && !piece.startsWith("-") ? `+${piece}` : piece)).join("") || "0";
}

function evaluateIntegral(coeffs: number[], x: number) {
  return round2(coeffs.reduce((sum, coeff, power) => sum + (coeff * Math.pow(x, power + 1)) / (power + 1), 0));
}

function buildAntiderivativeLatex(coeffs: number[]) {
  const pieces = antiderivativeTerms(coeffs).map(({ newCoeff, newPower }) => {
    if (newPower === 1) return formatNumber(newCoeff) === "1" ? "x" : `${formatNumber(newCoeff)}x`;
    if (formatNumber(newCoeff) === "1") return `x^{${newPower}}`;
    if (formatNumber(newCoeff) === "-1") return `-x^{${newPower}}`;
    return `${formatNumber(newCoeff)}x^{${newPower}}`;
  });

  return pieces
    .map((piece, index) => (index > 0 && !piece.startsWith("-") ? `+${piece}` : piece))
    .join("") || "0";
}

function squareLinearCoeffs(coeffs: number[]) {
  const linearCoeff = coeffs[1] ?? 0;
  return [0, 0, linearCoeff * linearCoeff];
}

export function solveGM102(
  quest: GM102Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps: PlatformSolutionStep[] = [];
  const antiderivativeLatex = buildAntiderivativeLatex(quest.functionCoeffs);

  if (quest.stage === "ANTIDERIVATIVE") {
    const valueAtOne = evaluateIntegral(quest.functionCoeffs, 1);

    steps.push(
      makeStep(1, t("gm1_02.reasons.identify_integrand"), quest.expressionLatex),
      makeStep(2, t("gm1_02.reasons.apply_antiderivative_rule"), `F(x) = ${antiderivativeLatex} + C`),
      makeStep(3, t("gm1_02.reasons.evaluate_at_point"), `F(1) = ${formatNumber(valueAtOne)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "DEFINITE_INTEGRAL") {
    if (quest.lowerBound === undefined || quest.upperBound === undefined) {
      return { steps: [], fullSolutionLatex: null };
    }

    const upperValue = evaluateIntegral(quest.functionCoeffs, quest.upperBound);
    const lowerValue = evaluateIntegral(quest.functionCoeffs, quest.lowerBound);
    const result = round2(upperValue - lowerValue);

    steps.push(
      makeStep(1, t("gm1_02.reasons.identify_integrand"), quest.expressionLatex),
      makeStep(2, t("gm1_02.reasons.apply_antiderivative_rule"), `F(x) = ${antiderivativeLatex}`),
      makeStep(
        3,
        t("gm1_02.reasons.apply_bounds"),
        `F(${formatNumber(quest.upperBound)}) - F(${formatNumber(quest.lowerBound)}) = ${formatNumber(upperValue)} - ${formatNumber(lowerValue)} = ${formatNumber(result)}`
      ),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "APPLICATION") {
    if (quest.lowerBound === undefined || quest.upperBound === undefined) {
      return { steps: [], fullSolutionLatex: null };
    }

    const lower = quest.lowerBound;
    const upper = quest.upperBound;

    if (quest.context === "between" && quest.upperCoeffs) {
      const upperArea = round2(evaluateIntegral(quest.upperCoeffs, upper) - evaluateIntegral(quest.upperCoeffs, lower));
      const lowerArea = round2(evaluateIntegral(quest.functionCoeffs, upper) - evaluateIntegral(quest.functionCoeffs, lower));
      const area = round2(upperArea - lowerArea);

      steps.push(
        makeStep(1, t("gm1_02.reasons.identify_application_model"), `A = \\int_{${formatNumber(lower)}}^{${formatNumber(upper)}} (f_{\\text{upper}}(x)-f_{\\text{lower}}(x))\\,dx`),
        makeStep(2, t("gm1_02.reasons.compute_upper_area"), `${formatNumber(upperArea)}`),
        makeStep(3, t("gm1_02.reasons.compute_lower_area"), `${formatNumber(lowerArea)}`),
        makeStep(4, t("gm1_02.reasons.combine_application_result"), `${formatNumber(upperArea)} - ${formatNumber(lowerArea)} = ${formatNumber(area)}`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.context === "volume") {
      const squaredCoeffs = squareLinearCoeffs(quest.functionCoeffs);
      const diskIntegral = round2(evaluateIntegral(squaredCoeffs, upper) - evaluateIntegral(squaredCoeffs, lower));
      const volume = round2(Math.PI * diskIntegral);

      steps.push(
        makeStep(1, t("gm1_02.reasons.identify_application_model"), `V = \\pi \\int_{${formatNumber(lower)}}^{${formatNumber(upper)}} [f(x)]^{2}\\,dx`),
        makeStep(2, t("gm1_02.reasons.square_function"), `[f(x)]^2 = ${buildPolynomialLatex(squaredCoeffs)}`),
        makeStep(3, t("gm1_02.reasons.apply_bounds"), `\\int_{${formatNumber(lower)}}^{${formatNumber(upper)}} [f(x)]^2 dx = ${formatNumber(diskIntegral)}`),
        makeStep(4, t("gm1_02.reasons.combine_application_result"), `V = \\pi \\cdot ${formatNumber(diskIntegral)} \\approx ${formatNumber(volume)}`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      const result = round2(evaluateIntegral(quest.functionCoeffs, upper) - evaluateIntegral(quest.functionCoeffs, lower));

      steps.push(
        makeStep(1, t("gm1_02.reasons.identify_application_model"), `A = \\int_{${formatNumber(lower)}}^{${formatNumber(upper)}} f(x)\\,dx`),
        makeStep(2, t("gm1_02.reasons.apply_antiderivative_rule"), `F(x) = ${antiderivativeLatex}`),
        makeStep(
          3,
          t("gm1_02.reasons.apply_bounds"),
          `F(${formatNumber(upper)}) - F(${formatNumber(lower)}) = ${formatNumber(result)}`
        ),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    }
  }

  if (steps.length === 0) {
    return { steps: [], fullSolutionLatex: null };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
