import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { GM103Quest } from "./gm1-03-types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function formatValue(value: number | string | undefined) {
  if (value === undefined) return "?";
  if (typeof value === "string") {
    if (value === "DNE") return "\\text{DNE}";
    if (value === "undefined") return "\\text{undefined}";
    if (value === "yes") return "\\text{yes}";
    if (value === "no") return "\\text{no}";
    return value;
  }
  if (value === Infinity) return "\\infty";
  if (value === -Infinity) return "-\\infty";
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

function toJavaScriptExpression(expr: string) {
  return expr
    .replace(/\s+/g, "")
    .replace(/floor\(/g, "Math.floor(")
    .replace(/sign\(/g, "Math.sign(")
    .replace(/sqrt\(/g, "Math.sqrt(")
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/abs\(/g, "Math.abs(")
    .replace(/e\^x/g, "Math.exp(x)")
    .replace(/\^/g, "**");
}

function evaluateExpression(expr: string, x: number) {
  const jsExpr = toJavaScriptExpression(expr);
  const result = Function("x", `return ${jsExpr};`)(x);
  return typeof result === "number" ? round2(result) : Number(result);
}

function inferSimplifiedLinear(quest: GM103Quest) {
  if (typeof quest.limitValue !== "number") return null;
  const constant = round2(quest.limitValue - quest.limitPoint);
  const constantText = constant >= 0 ? `+${formatValue(constant)}` : formatValue(constant);
  return `x${constantText}`;
}

function inferLeadingRatio(expr: string) {
  const match = expr.match(/^\(([-\d.]+)?x\^\{?(\d+)\}?[^)]*\) \/ \(([-\d.]+)?x\^\{?(\d+)\}?/);
  if (!match) return null;
  const numeratorCoeff = match[1] === "-" ? -1 : match[1] ? Number(match[1]) : 1;
  const denominatorCoeff = match[3] === "-" ? -1 : match[3] ? Number(match[3]) : 1;
  const numeratorDegree = Number(match[2]);
  const denominatorDegree = Number(match[4]);
  return { numeratorCoeff, denominatorCoeff, numeratorDegree, denominatorDegree };
}

function derivativeForLHopital(expr: string) {
  const derivatives: Record<string, string> = {
    "sin(x) / x": "\\frac{\\cos(x)}{1}",
    "(e^x - 1) / x": "\\frac{e^x}{1}",
    "(x^{2} - 1) / (x - 1)": "\\frac{2x}{1}",
    "(1 - cos(x)) / x^{2}": "\\frac{\\sin(x)}{2x}",
    "ln(x) / (x - 1)": "\\frac{1/x}{1}",
  };
  return derivatives[expr] ?? null;
}

export function solveGM103(
  quest: GM103Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps: PlatformSolutionStep[] = [];

  if (quest.stage === "LIMIT_BASICS") {
    steps.push(
      makeStep(
        1,
        t("gm1_03.reasons.identify_limit_target"),
        `x \\to ${formatValue(quest.limitPoint)},\\; f(x) = ${quest.functionExpr}`
      )
    );

    if (quest.leftLimit !== undefined || quest.rightLimit !== undefined) {
      steps.push(
        makeStep(
          2,
          t("gm1_03.reasons.compare_one_sided_limits"),
          `\\lim_{x \\to ${formatValue(quest.limitPoint)}^-} f(x) = ${formatValue(quest.leftLimit)},\\; \\lim_{x \\to ${formatValue(quest.limitPoint)}^+} f(x) = ${formatValue(quest.rightLimit)}`
        )
      );

      const finalExpression =
        quest.leftLimit === quest.rightLimit && quest.rightLimit !== undefined
          ? `\\lim_{x \\to ${formatValue(quest.limitPoint)}} f(x) = ${formatValue(quest.rightLimit)}`
          : `\\lim_{x \\to ${formatValue(quest.limitPoint)}} f(x) = \\text{DNE}`;

      steps.push(
        makeStep(3, t("common.feedback_reasons.state_final_result"), finalExpression, "key")
      );
    } else if (quest.limitPoint === Infinity) {
      const ratio = inferLeadingRatio(quest.functionExpr);
      if (!ratio) return { steps: [], fullSolutionLatex: null };

      steps.push(
        makeStep(
          2,
          t("gm1_03.reasons.compare_leading_terms"),
          `\\text{Leading terms: } ${formatValue(ratio.numeratorCoeff)}x^{${ratio.numeratorDegree}} \\text{ and } ${formatValue(ratio.denominatorCoeff)}x^{${ratio.denominatorDegree}}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.state_final_result"),
          `\\lim_{x \\to \\infty} f(x) = \\frac{${formatValue(ratio.numeratorCoeff)}}{${formatValue(ratio.denominatorCoeff)}} = ${formatValue(quest.limitValue)}`,
          "key"
        )
      );
    } else if (quest.functionExpr.includes("/")) {
      const simplified = inferSimplifiedLinear(quest);
      if (!simplified) return { steps: [], fullSolutionLatex: null };

      steps.push(
        makeStep(
          2,
          t("gm1_03.reasons.simplify_expression"),
          `f(x) = ${simplified} \\quad (x \\ne ${formatValue(quest.limitPoint)})`
        )
      );
      steps.push(
        makeStep(
          3,
          t("gm1_03.reasons.direct_substitution"),
          `\\lim_{x \\to ${formatValue(quest.limitPoint)}} f(x) = ${formatValue(quest.limitPoint)} ${round2((quest.limitValue as number) - quest.limitPoint) >= 0 ? "+" : ""} ${formatValue(round2((quest.limitValue as number) - quest.limitPoint))} = ${formatValue(quest.limitValue)}`
        )
      );
      steps.push(
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      const directValue = evaluateExpression(quest.functionExpr, quest.limitPoint);
      steps.push(
        makeStep(
          2,
          t("gm1_03.reasons.direct_substitution"),
          `f(${formatValue(quest.limitPoint)}) = ${formatValue(directValue)}`
        )
      );
      steps.push(
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    }
  } else if (quest.stage === "LIMIT_OPERATIONS") {
    const expr = quest.expressionLatex ?? "";
    const fMatch = expr.match(/f\(x\) = (.*?)(?:,|$)/);
    const gMatch = expr.match(/g\(x\) = (.*)$/);
    const fExpr = fMatch?.[1]?.trim();
    const gExpr = gMatch?.[1]?.trim();

    if (!fExpr) return { steps: [], fullSolutionLatex: null };

    steps.push(
      makeStep(1, t("gm1_03.reasons.identify_limit_target"), `x \\to ${formatValue(quest.limitPoint)}`)
    );

    if (quest.id.startsWith("LO_E")) {
      const derivativeLatex = derivativeForLHopital(quest.functionExpr);
      if (!derivativeLatex) return { steps: [], fullSolutionLatex: null };

      steps.push(
        makeStep(
          2,
          t("gm1_03.reasons.recognize_indeterminate_form"),
          `\\text{Direct substitution gives } \\frac{0}{0}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("gm1_03.reasons.apply_lhopital"),
          `\\lim_{x \\to ${formatValue(quest.limitPoint)}} ${quest.functionExpr} = \\lim_{x \\to ${formatValue(quest.limitPoint)}} ${derivativeLatex}`
        )
      );
      steps.push(
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.promptLatex.includes("f(g(x))")) {
      if (!gExpr) return { steps: [], fullSolutionLatex: null };
      const innerValue = evaluateExpression(gExpr, quest.limitPoint);
      const outerValue = evaluateExpression(fExpr, innerValue);

      steps.push(
        makeStep(
          2,
          t("gm1_03.reasons.evaluate_inner_limit"),
          `\\lim_{x \\to ${formatValue(quest.limitPoint)}} g(x) = ${formatValue(innerValue)}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("gm1_03.reasons.apply_composition_rule"),
          `\\lim_{x \\to ${formatValue(quest.limitPoint)}} f(g(x)) = f(${formatValue(innerValue)}) = ${formatValue(outerValue)}`
        )
      );
      steps.push(
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      const fValue = evaluateExpression(fExpr, quest.limitPoint);
      const gValue = gExpr ? evaluateExpression(gExpr, quest.limitPoint) : undefined;
      const operator = quest.promptLatex.includes("+ g(x)")
        ? "+"
        : quest.promptLatex.includes("\\cdot g(x)")
          ? "\\cdot"
          : "\\div";

      steps.push(
        makeStep(
          2,
          t("gm1_03.reasons.evaluate_component_limits"),
          gValue === undefined
            ? `\\lim_{x \\to ${formatValue(quest.limitPoint)}} f(x) = ${formatValue(fValue)}`
            : `\\lim_{x \\to ${formatValue(quest.limitPoint)}} f(x) = ${formatValue(fValue)},\\; \\lim_{x \\to ${formatValue(quest.limitPoint)}} g(x) = ${formatValue(gValue)}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("gm1_03.reasons.apply_limit_law"),
          gValue === undefined
            ? `${formatValue(fValue)}`
            : `${formatValue(fValue)} ${operator} ${formatValue(gValue)} = ${formatValue(quest.limitValue)}`
        )
      );
      steps.push(
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    }
  } else if (quest.stage === "CONTINUITY") {
    steps.push(
      makeStep(
        1,
        t("gm1_03.reasons.check_function_value"),
        `f(${formatValue(quest.limitPoint)}) = ${formatValue(quest.functionValue)}`
      )
    );

    if (quest.isContinuous) {
      steps.push(
        makeStep(
          2,
          t("gm1_03.reasons.compare_limit_and_value"),
          `\\lim_{x \\to ${formatValue(quest.limitPoint)}} f(x) = ${formatValue(quest.functionValue)} = f(${formatValue(quest.limitPoint)})`
        )
      );
      steps.push(
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      steps.push(
        makeStep(
          2,
          t("gm1_03.reasons.check_one_sided_continuity"),
          `\\lim_{x \\to ${formatValue(quest.limitPoint)}^-} f(x) = ${formatValue(quest.leftLimit)},\\; \\lim_{x \\to ${formatValue(quest.limitPoint)}^+} f(x) = ${formatValue(quest.rightLimit)}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("gm1_03.reasons.compare_limit_and_value"),
          `\\lim_{x \\to ${formatValue(quest.limitPoint)}} f(x) = ${formatValue(quest.limitValue)},\\; f(${formatValue(quest.limitPoint)}) = ${formatValue(quest.functionValue)}`
        )
      );
      steps.push(
        makeStep(
          4,
          t("gm1_03.reasons.classify_discontinuity"),
          `\\text{${quest.discontinuityType ?? "discontinuous"}}`
        )
      );
      steps.push(
        makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
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
