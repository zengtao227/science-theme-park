import type { PlatformSolutionStep } from "@/hooks/useQuestManager";

type Translator = (path: string, params?: Record<string, string | number>) => any;

type Stage = "TERMS" | "FACTORIZE" | "FRACTIONS" | "EQUATIONS";

export interface SM301SolverQuest {
  stage: Stage;
  expressionLatex?: string;
  correctLatex?: string;
  slots?: Array<{
    id: string;
    expected: number | string;
  }>;
  a?: number;
  b?: number;
  c?: number;
}

interface RawStep {
  justification: string;
  expressionLatex: string;
}

function getExpectedNumber(quest: SM301SolverQuest, slotId: string) {
  const slot = quest.slots?.find((item) => item.id === slotId);
  if (!slot) return null;
  const value = slot.expected;
  return typeof value === "number" ? value : Number(value);
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps
    .map((step) => `\\text{${step.justification}} \\implies ${step.expressionLatex}`)
    .join(" \\\\ ");
}

export function solveSM301(
  quest: SM301SolverQuest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const rawSteps: RawStep[] = [];
  const correctLatex = quest.correctLatex || "";

  if (!quest.stage || !quest.slots?.length) {
    return { steps: [], fullSolutionLatex: null };
  }

  if (quest.stage === "TERMS") {
    const a = getExpectedNumber(quest, "a");
    const b = getExpectedNumber(quest, "b");
    const c = getExpectedNumber(quest, "c");

    rawSteps.push({
      justification: t("sm3_01.reasons.group_like_terms"),
      expressionLatex: `\\text{${t("sm3_01.solver.group_terms_instruction")}}`,
    });
    rawSteps.push({
      justification: t("sm3_01.reasons.read_combined_coefficients"),
      expressionLatex: c === null
        ? `a = ${a},\\; b = ${b}`
        : `a = ${a},\\; b = ${b},\\; c = ${c}`,
    });
    rawSteps.push({
      justification: t("sm3_01.reasons.final_simplified_form"),
      expressionLatex: correctLatex,
    });
  } else if (quest.stage === "FACTORIZE") {
    if (quest.slots.some((slot) => slot.id === "A") && quest.slots.some((slot) => slot.id === "B")) {
      const A = getExpectedNumber(quest, "A");
      const B = getExpectedNumber(quest, "B");
      rawSteps.push({
        justification: t("sm3_01.reasons.use_factor_identity"),
        expressionLatex: quest.a && quest.a !== 1
          ? `(${quest.a}x + ${A})(x + ${B})`
          : `(x + ${A})(x + ${B})`,
      });
      rawSteps.push({
        justification: t("sm3_01.reasons.match_middle_constant_terms"),
        expressionLatex: quest.a && quest.a !== 1
          ? `${quest.a}B + A = ${quest.b},\\; AB = ${quest.c}`
          : `A + B = ${quest.b},\\; AB = ${quest.c}`,
      });
      rawSteps.push({
        justification: t("sm3_01.reasons.final_simplified_form"),
        expressionLatex: correctLatex,
      });
    } else if (quest.slots.some((slot) => slot.id === "a") && quest.slots.some((slot) => slot.id === "b")) {
      const a = getExpectedNumber(quest, "a");
      const b = getExpectedNumber(quest, "b");
      rawSteps.push({
        justification: t("sm3_01.reasons.recognize_special_identity"),
        expressionLatex: quest.b === 0
          ? `(ax+b)(ax-b) = a^2x^2 - b^2`
          : `(ax+b)^2 = a^2x^2 + 2abx + b^2`,
      });
      rawSteps.push({
        justification: t("sm3_01.reasons.identify_factor_parameters"),
        expressionLatex: `a = ${a},\\; b = ${b}`,
      });
      rawSteps.push({
        justification: t("sm3_01.reasons.final_simplified_form"),
        expressionLatex: correctLatex,
      });
    } else {
      return { steps: [], fullSolutionLatex: null };
    }
  } else if (quest.stage === "FRACTIONS") {
    rawSteps.push({
      justification: t("sm3_01.reasons.factor_numerator_denominator"),
      expressionLatex: quest.expressionLatex || "",
    });
    rawSteps.push({
      justification: t("sm3_01.reasons.cancel_common_factor"),
      expressionLatex: `\\text{${t("sm3_01.solver.cancel_shared_factors_instruction")}}`,
    });
    rawSteps.push({
      justification: t("sm3_01.reasons.final_simplified_form"),
      expressionLatex: correctLatex,
    });
  } else if (quest.stage === "EQUATIONS") {
    if (quest.slots.some((slot) => slot.id === "x1") && quest.slots.some((slot) => slot.id === "x2")) {
      const x1 = getExpectedNumber(quest, "x1");
      const x2 = getExpectedNumber(quest, "x2");
      rawSteps.push({
        justification: t("sm3_01.reasons.rewrite_quadratic_zero"),
        expressionLatex: `${quest.expressionLatex || ""}`,
      });
      rawSteps.push({
        justification: t("sm3_01.reasons.apply_zero_product_rule"),
        expressionLatex: `(x - (${x1}))(x - (${x2})) = 0`,
      });
      rawSteps.push({
        justification: t("sm3_01.reasons.solve_required_values"),
        expressionLatex: correctLatex,
      });
    } else if (quest.slots.some((slot) => slot.id === "k")) {
      const k = getExpectedNumber(quest, "k");
      rawSteps.push({
        justification: t("sm3_01.reasons.substitute_known_root"),
        expressionLatex: `\\text{${t("sm3_01.solver.insert_known_root_instruction")}}`,
      });
      rawSteps.push({
        justification: t("sm3_01.reasons.solve_required_values"),
        expressionLatex: `k = ${k}`,
      });
    } else if (quest.slots.some((slot) => slot.id === "x")) {
      const x = getExpectedNumber(quest, "x");
      rawSteps.push({
        justification: t("sm3_01.reasons.recognize_double_root"),
        expressionLatex: `(x - (${x}))^2 = 0`,
      });
      rawSteps.push({
        justification: t("sm3_01.reasons.solve_required_values"),
        expressionLatex: correctLatex,
      });
    } else {
      return { steps: [], fullSolutionLatex: null };
    }
  }

  const steps: PlatformSolutionStep[] = rawSteps.map((step, index) => ({
    stepNumber: index + 1,
    justification: step.justification,
    expressionLatex: step.expressionLatex,
  }));

  return {
    steps,
    fullSolutionLatex: steps.length > 0 ? buildFullSolution(steps) : null,
  };
}
