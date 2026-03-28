import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { G101AdvQuest } from "./types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

type Polynomial = {
  variable: string;
  coeffs: number[];
};

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return String(round2(value));
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

function normalizePolynomial(input: string) {
  return input.replace(/\s+/g, "").replace(/\^\{(\d+)\}/g, "^$1");
}

function parsePolynomial(input: string, fallbackVariable = "x"): Polynomial | null {
  const normalized = normalizePolynomial(input);
  const variableMatch = normalized.match(/[a-z]/i);
  const variable = variableMatch?.[0] ?? fallbackVariable;
  const split = normalized.replace(/-/g, "+-");
  const rawTerms = split.split("+").filter(Boolean);
  const coeffs = [0, 0, 0, 0, 0];

  for (const term of rawTerms) {
    if (!term.includes(variable)) {
      const constant = Number(term);
      if (Number.isNaN(constant)) return null;
      coeffs[0] += constant;
      continue;
    }

    const [coefficientPart, exponentPartRaw] = term.split(variable);
    let coefficient = 1;
    if (coefficientPart === "-" || coefficientPart === "-1") coefficient = -1;
    else if (coefficientPart === "" || coefficientPart === "+") coefficient = 1;
    else coefficient = Number(coefficientPart);

    if (Number.isNaN(coefficient)) return null;

    let exponent = 1;
    if (exponentPartRaw?.startsWith("^")) {
      exponent = Number(exponentPartRaw.slice(1));
      if (Number.isNaN(exponent)) return null;
    }

    if (exponent >= coeffs.length) return null;
    coeffs[exponent] += coefficient;
  }

  return { variable, coeffs };
}

function derivative(poly: Polynomial): Polynomial {
  const coeffs = poly.coeffs.map(() => 0);
  for (let exponent = 1; exponent < poly.coeffs.length; exponent += 1) {
    coeffs[exponent - 1] = poly.coeffs[exponent] * exponent;
  }
  return { variable: poly.variable, coeffs };
}

function evaluate(poly: Polynomial, value: number) {
  return round2(poly.coeffs.reduce((sum, coeff, exponent) => sum + coeff * value ** exponent, 0));
}

function polynomialToLatex(poly: Polynomial) {
  const parts: string[] = [];
  for (let exponent = poly.coeffs.length - 1; exponent >= 0; exponent -= 1) {
    const coeff = round2(poly.coeffs[exponent]);
    if (Math.abs(coeff) < 1e-9) continue;
    const sign = coeff < 0 ? "-" : "+";
    const absCoeff = Math.abs(coeff);
    let core = "";
    if (exponent === 0) core = formatNumber(absCoeff);
    else if (exponent === 1) core = `${absCoeff === 1 ? "" : formatNumber(absCoeff)}${poly.variable}`;
    else core = `${absCoeff === 1 ? "" : formatNumber(absCoeff)}${poly.variable}^{${exponent}}`;
    parts.push(`${sign}${core}`);
  }
  if (parts.length === 0) return "0";
  return parts
    .join("")
    .replace(/^\+/, "")
    .replace(/\+/g, " + ")
    .replace(/-/g, " - ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseEvaluationValue(targetLatex: string) {
  const match = targetLatex.match(/\((.+)\)/);
  if (!match) return null;
  const raw = match[1].trim();
  if (raw === "\\pi/2") return Math.PI / 2;
  if (raw === "\\pi/4") return Math.PI / 4;
  if (raw === "\\pi/3") return Math.PI / 3;
  if (raw === "\\pi/6") return Math.PI / 6;
  if (raw === "\\pi") return Math.PI;
  const numeric = Number(raw);
  return Number.isNaN(numeric) ? null : numeric;
}

function finalValueLatex(quest: G101AdvQuest) {
  if (quest.slots.length === 1) {
    const slot = quest.slots[0];
    return `${slot.labelLatex}=${formatNumber(Number(slot.expected))}`;
  }
  return quest.slots
    .map((slot) => `${slot.labelLatex}=${formatNumber(Number(slot.expected))}`)
    .join(",\\;");
}

function solveQuadraticRoots(poly: Polynomial) {
  const a = poly.coeffs[2] ?? 0;
  const b = poly.coeffs[1] ?? 0;
  const c = poly.coeffs[0] ?? 0;

  if (Math.abs(a) < 1e-9) {
    if (Math.abs(b) < 1e-9) return [];
    return [round2(-c / b)];
  }

  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return [];
  if (Math.abs(discriminant) < 1e-9) return [round2(-b / (2 * a))];
  const root1 = round2((-b - Math.sqrt(discriminant)) / (2 * a));
  const root2 = round2((-b + Math.sqrt(discriminant)) / (2 * a));
  return [root1, root2].sort((x, y) => x - y);
}

function parseCompositeProduct(functionLatex: string) {
  const match = functionLatex.match(/^f\(x\)\s*=\s*\((.+)\)\\cdot\\(sin|cos)\(x\)$/);
  if (!match) return null;
  const polynomial = parsePolynomial(match[1], "x");
  const trig = match[2];
  return polynomial ? { polynomial, trig } : null;
}

function parseCompositeQuotient(functionLatex: string) {
  const match = functionLatex.match(/^f\(x\)\s*=\s*\\frac\{(.+)\}\{\\(sin|cos)\(x\)\}$/);
  if (!match) return null;
  const numerator = parsePolynomial(match[1], "x");
  const trig = match[2];
  return numerator ? { numerator, trig } : null;
}

function trigValue(name: "sin" | "cos", x: number) {
  return name === "sin" ? Math.sin(x) : Math.cos(x);
}

function trigDerivativeName(name: "sin" | "cos") {
  return name === "sin" ? "\\cos(x)" : "-\\sin(x)";
}

function solveComposite(
  quest: G101AdvQuest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const xValue = parseEvaluationValue(quest.targetLatex);
  if (xValue === null) return { steps: [], fullSolutionLatex: null };

  const product = parseCompositeProduct(quest.functionLatex);
  if (product) {
    const u = product.polynomial;
    const uPrime = derivative(u);
    const uValue = evaluate(u, xValue);
    const uPrimeValue = evaluate(uPrime, xValue);
    const trigName = product.trig as "sin" | "cos";
    const vValue = round2(trigValue(trigName, xValue));
    const vPrimeValue = round2(trigName === "sin" ? Math.cos(xValue) : -Math.sin(xValue));

    const steps = [
      makeStep(1, t("gm1_01_advanced.reasons.identify_outer_structure"), `u(x)=${polynomialToLatex(u)},\\;v(x)=\\${trigName}(x)`),
      makeStep(2, t("gm1_01_advanced.reasons.differentiate_component_functions"), `u'(x)=${polynomialToLatex(uPrime)},\\;v'(x)=${trigDerivativeName(trigName)}`),
      makeStep(3, t("gm1_01_advanced.reasons.apply_product_rule"), `f'(x)=u'(x)v(x)+u(x)v'(x)`),
      makeStep(4, t("gm1_01_advanced.reasons.substitute_target_value"), `f'(${formatNumber(xValue)})=${formatNumber(uPrimeValue)}\\cdot ${formatNumber(vValue)} + ${formatNumber(uValue)}\\cdot ${formatNumber(vPrimeValue)}`),
      makeStep(5, t("common.feedback_reasons.state_final_result"), finalValueLatex(quest), "key"),
    ];
    return { steps, fullSolutionLatex: buildFullSolution(steps) };
  }

  const quotient = parseCompositeQuotient(quest.functionLatex);
  if (quotient) {
    const u = quotient.numerator;
    const uPrime = derivative(u);
    const uValue = evaluate(u, xValue);
    const uPrimeValue = evaluate(uPrime, xValue);
    const trigName = quotient.trig as "sin" | "cos";
    const vValue = round2(trigValue(trigName, xValue));
    const vPrimeValue = round2(trigName === "sin" ? Math.cos(xValue) : -Math.sin(xValue));

    const steps = [
      makeStep(1, t("gm1_01_advanced.reasons.identify_outer_structure"), `u(x)=${polynomialToLatex(u)},\\;v(x)=\\${trigName}(x)`),
      makeStep(2, t("gm1_01_advanced.reasons.differentiate_component_functions"), `u'(x)=${polynomialToLatex(uPrime)},\\;v'(x)=${trigDerivativeName(trigName)}`),
      makeStep(3, t("gm1_01_advanced.reasons.apply_quotient_rule"), `f'(x)=\\frac{u'(x)v(x)-u(x)v'(x)}{v(x)^2}`),
      makeStep(4, t("gm1_01_advanced.reasons.substitute_target_value"), `f'(${formatNumber(xValue)})=\\frac{${formatNumber(uPrimeValue)}\\cdot ${formatNumber(vValue)}-${formatNumber(uValue)}\\cdot ${formatNumber(vPrimeValue)}}{(${formatNumber(vValue)})^2}`),
      makeStep(5, t("common.feedback_reasons.state_final_result"), finalValueLatex(quest), "key"),
    ];
    return { steps, fullSolutionLatex: buildFullSolution(steps) };
  }

  return { steps: [], fullSolutionLatex: null };
}

function extractPolynomialFromExpression(expressionLatex: string, variable: "x" | "t") {
  const source = expressionLatex.split(",")[0];
  const rightSide = source.includes("=") ? source.split("=").pop()?.trim() ?? source.trim() : source.trim();
  return parsePolynomial(rightSide, variable);
}

function solveModeling(
  quest: G101AdvQuest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const variable = quest.functionLatex.includes("(t)") ? "t" : "x";
  const poly = extractPolynomialFromExpression(quest.expressionLatex, variable);
  const value = parseEvaluationValue(quest.targetLatex);
  if (!poly || value === null) return { steps: [], fullSolutionLatex: null };

  const firstDerivative = derivative(poly);
  const secondDerivative = derivative(firstDerivative);
  const targetIsSecond = quest.targetLatex.includes("''") || quest.hint.includes("f''");
  const relevantDerivative = targetIsSecond ? secondDerivative : firstDerivative;
  const derivativeName = targetIsSecond ? "a" : "v";

  const steps = [
    makeStep(1, t("gm1_01_advanced.reasons.identify_model_function"), `${variable} \\mapsto ${polynomialToLatex(poly)}`),
    makeStep(2, t("gm1_01_advanced.reasons.take_first_derivative"), `${derivativeName === "v" ? "v" : "v"}(${variable})=${polynomialToLatex(firstDerivative)}`),
  ];

  if (targetIsSecond) {
    steps.push(
      makeStep(3, t("gm1_01_advanced.reasons.take_second_derivative"), `a(${variable})=${polynomialToLatex(secondDerivative)}`),
      makeStep(4, t("gm1_01_advanced.reasons.substitute_target_value"), `${quest.targetLatex}=${polynomialToLatex(secondDerivative).replaceAll(variable, `(${formatNumber(value)})`)}`),
      makeStep(5, t("common.feedback_reasons.state_final_result"), finalValueLatex(quest), "key")
    );
  } else {
    steps.push(
      makeStep(3, t("gm1_01_advanced.reasons.substitute_target_value"), `${quest.targetLatex}=${polynomialToLatex(firstDerivative).replaceAll(variable, `(${formatNumber(value)})`)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), finalValueLatex(quest), "key")
    );
  }

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}

function solveOptimization(
  quest: G101AdvQuest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const poly = extractPolynomialFromExpression(quest.expressionLatex, "x");
  if (!poly) return { steps: [], fullSolutionLatex: null };

  const firstDerivative = derivative(poly);
  const roots = solveQuadraticRoots(firstDerivative);
  if (!roots.length) return { steps: [], fullSolutionLatex: null };
  const criticalPoint = roots[0];
  const asksMaximumValue = quest.targetLatex.includes("_{max}");
  const maxValue = evaluate(poly, criticalPoint);

  const steps = [
    makeStep(1, t("gm1_01_advanced.reasons.identify_model_function"), `f(x)=${polynomialToLatex(poly)}`),
    makeStep(2, t("gm1_01_advanced.reasons.take_first_derivative"), `f'(x)=${polynomialToLatex(firstDerivative)}`),
    makeStep(3, t("gm1_01_advanced.reasons.set_derivative_zero"), `${polynomialToLatex(firstDerivative)}=0 \\Rightarrow x=${formatNumber(criticalPoint)}`),
  ];

  if (asksMaximumValue) {
    steps.push(
      makeStep(4, t("gm1_01_advanced.reasons.evaluate_extremum_value"), `${quest.targetLatex}=f(${formatNumber(criticalPoint)})=${formatNumber(maxValue)}`),
      makeStep(5, t("common.feedback_reasons.state_final_result"), finalValueLatex(quest), "key")
    );
  } else {
    steps.push(makeStep(4, t("common.feedback_reasons.state_final_result"), finalValueLatex(quest), "key"));
  }

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}

function solveAnalysis(
  quest: G101AdvQuest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const poly = extractPolynomialFromExpression(quest.expressionLatex, "x");
  if (!poly) return { steps: [], fullSolutionLatex: null };
  const firstDerivative = derivative(poly);
  const secondDerivative = derivative(firstDerivative);

  if (quest.targetLatex.includes("x_1")) {
    const roots = solveQuadraticRoots(firstDerivative);
    if (!roots.length) return { steps: [], fullSolutionLatex: null };
    const solutionLatex =
      roots.length === 1
        ? `x=${formatNumber(roots[0])}`
        : `x_1=${formatNumber(roots[0])},\\;x_2=${formatNumber(roots[1])}`;

    const steps = [
      makeStep(1, t("gm1_01_advanced.reasons.identify_model_function"), `f(x)=${polynomialToLatex(poly)}`),
      makeStep(2, t("gm1_01_advanced.reasons.take_first_derivative"), `f'(x)=${polynomialToLatex(firstDerivative)}`),
      makeStep(3, t("gm1_01_advanced.reasons.set_derivative_zero"), `${polynomialToLatex(firstDerivative)}=0`),
      makeStep(4, t("gm1_01_advanced.reasons.solve_critical_points"), solutionLatex),
      makeStep(5, t("common.feedback_reasons.state_final_result"), finalValueLatex(quest), "key"),
    ];
    return { steps, fullSolutionLatex: buildFullSolution(steps) };
  }

  const value = parseEvaluationValue(quest.targetLatex);
  if (value === null) return { steps: [], fullSolutionLatex: null };
  const steps = [
    makeStep(1, t("gm1_01_advanced.reasons.identify_model_function"), `f(x)=${polynomialToLatex(poly)}`),
    makeStep(2, t("gm1_01_advanced.reasons.take_first_derivative"), `f'(x)=${polynomialToLatex(firstDerivative)}`),
    makeStep(3, t("gm1_01_advanced.reasons.take_second_derivative"), `f''(x)=${polynomialToLatex(secondDerivative)}`),
    makeStep(4, t("gm1_01_advanced.reasons.substitute_target_value"), `${quest.targetLatex}=${polynomialToLatex(secondDerivative).replaceAll("x", `(${formatNumber(value)})`)}`),
    makeStep(5, t("common.feedback_reasons.state_final_result"), finalValueLatex(quest), "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}

export function solveGM101Advanced(
  quest: G101AdvQuest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  if (quest.challenge === "COMPOSITE") return solveComposite(quest, t);
  if (quest.challenge === "MODELING") return solveModeling(quest, t);
  if (quest.challenge === "OPTIMIZATION") return solveOptimization(quest, t);
  if (quest.challenge === "ANALYSIS") return solveAnalysis(quest, t);
  return { steps: [], fullSolutionLatex: null };
}
