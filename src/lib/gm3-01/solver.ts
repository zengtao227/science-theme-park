import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { G301Quest } from "./quests";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function round4(value: number) {
  return Math.round(value * 10000) / 10000;
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return String(round4(value));
}

function formatProbability(value: number) {
  return round4(value).toFixed(4);
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

function binomialCoefficient(n: number, k: number) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 1; i <= k; i += 1) {
    result = (result * (n - i + 1)) / i;
  }
  return result;
}

function getQuestType(quest: G301Quest) {
  if (quest.stage !== "MISSION") return quest.stage;
  if (quest.type === "basic") return "BASIC_PROB" as const;
  if (quest.type === "binomial") return "BINOMIAL" as const;
  if (quest.type === "conditional") return "CONDITIONAL" as const;
  if (typeof quest.favorable === "number" && typeof quest.total === "number") return "BASIC_PROB" as const;
  if (typeof quest.n === "number" && typeof quest.k === "number" && typeof quest.p === "number") return "BINOMIAL" as const;
  if (typeof quest.eventB === "number" && typeof quest.eventAB === "number") return "CONDITIONAL" as const;
  return null;
}

export function solveGM301(
  quest: G301Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps: PlatformSolutionStep[] = [];
  const questType = getQuestType(quest);

  if (questType === "BASIC_PROB") {
    if (typeof quest.favorable !== "number" || typeof quest.total !== "number") {
      return { steps: [], fullSolutionLatex: null };
    }

    const probability = round4(quest.favorable / quest.total);
    steps.push(
      makeStep(
        1,
        t("gm3_01.reasons.identify_sample_space"),
        `F=${formatNumber(quest.favorable)},\\;N=${formatNumber(quest.total)}`
      ),
      makeStep(
        2,
        t("gm3_01.reasons.apply_probability_ratio"),
        `P(E)=\\frac{F}{N}=\\frac{${formatNumber(quest.favorable)}}{${formatNumber(quest.total)}}`
      ),
      makeStep(
        3,
        t("gm3_01.reasons.compute_decimal_probability"),
        `P(E)=\\frac{${formatNumber(quest.favorable)}}{${formatNumber(quest.total)}}=${formatProbability(probability)}`
      ),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (questType === "BINOMIAL") {
    if (
      typeof quest.n !== "number" ||
      typeof quest.k !== "number" ||
      typeof quest.p !== "number"
    ) {
      return { steps: [], fullSolutionLatex: null };
    }

    const combination = binomialCoefficient(quest.n, quest.k);
    const successTerm = Math.pow(quest.p, quest.k);
    const failureTerm = Math.pow(1 - quest.p, quest.n - quest.k);
    const probability = round4(combination * successTerm * failureTerm);

    steps.push(
      makeStep(
        1,
        t("gm3_01.reasons.identify_binomial_parameters"),
        `n=${formatNumber(quest.n)},\\;k=${formatNumber(quest.k)},\\;p=${formatNumber(quest.p)}`
      ),
      makeStep(
        2,
        t("gm3_01.reasons.apply_binomial_formula"),
        `P(X=${formatNumber(quest.k)})=\\binom{${formatNumber(quest.n)}}{${formatNumber(quest.k)}}\\cdot ${formatNumber(quest.p)}^{${formatNumber(quest.k)}}\\cdot (1-${formatNumber(quest.p)})^{${formatNumber(quest.n - quest.k)}}`
      ),
      makeStep(
        3,
        t("gm3_01.reasons.compute_binomial_coefficient"),
        `\\binom{${formatNumber(quest.n)}}{${formatNumber(quest.k)}}=${formatNumber(combination)}`
      ),
      makeStep(
        4,
        t("gm3_01.reasons.compute_decimal_probability"),
        `P(X=${formatNumber(quest.k)})=${formatNumber(combination)}\\cdot ${formatProbability(successTerm)}\\cdot ${formatProbability(failureTerm)}=${formatProbability(probability)}`
      ),
      makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (questType === "CONDITIONAL") {
    if (typeof quest.eventB !== "number" || typeof quest.eventAB !== "number") {
      return { steps: [], fullSolutionLatex: null };
    }

    const conditionalProbability = round4(quest.eventAB / quest.eventB);
    steps.push(
      makeStep(
        1,
        t("gm3_01.reasons.identify_conditional_components"),
        `P(B)=${formatNumber(quest.eventB)},\\;P(A\\cap B)=${formatNumber(quest.eventAB)}`
      ),
      makeStep(
        2,
        t("gm3_01.reasons.apply_conditional_formula"),
        `P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}=\\frac{${formatNumber(quest.eventAB)}}{${formatNumber(quest.eventB)}}`
      ),
      makeStep(
        3,
        t("gm3_01.reasons.compute_decimal_probability"),
        `P(A\\mid B)=\\frac{${formatNumber(quest.eventAB)}}{${formatNumber(quest.eventB)}}=${formatProbability(conditionalProbability)}`
      ),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  }

  if (steps.length === 0) {
    return { steps: [], fullSolutionLatex: null };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
