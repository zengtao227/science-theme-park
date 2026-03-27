import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { S101Quest } from "@/lib/sm1-01/types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps.map((s) => `\\text{${s.justification}} \\implies ${s.expressionLatex}`).join(" \\\\ ");
}

function stringifyParams(params: Record<string, number> | undefined) {
  if (!params) return "";
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join(",\\;");
}

function selectFormula(quest: S101Quest) {
  const target = quest.targetLatex.trim();
  const type = quest.visualMeta?.type;

  if (target === "A") {
    switch (type) {
      case "rectangle":
        return "A=a\\cdot b";
      case "triangle":
        return "A=\\frac{1}{2}bh";
      case "trapezoid":
        return "A=\\frac{1}{2}(a+b)h";
      case "circle":
        return "A=\\pi r^2";
    }
  }

  if (target === "V") {
    switch (type) {
      case "cube":
        return "V=a^3";
      case "prism":
        return "V=a\\cdot b\\cdot c";
      case "cylinder":
        return "V=\\pi r^2 h";
    }
  }

  if (target === "P") return "P=2(a+b)";
  if (target === "SA") return "SA=6a^2";
  if (target === "d") return "d=a\\sqrt{3}";
  if (target === "h" && type === "cylinder") return "V=\\pi r^2 h";
  if (target === "r" && type === "cylinder") return "V=\\pi r^2 h";

  return quest.expressionLatex?.trim() || "";
}

export function solveSM101(
  quest: S101Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const expression = quest.expressionLatex?.trim();
  const finalLatex = quest.correctLatex?.trim();

  if (!expression || !finalLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const givenLatex = stringifyParams(quest.visualMeta?.params) || expression;
  const formulaLatex = selectFormula(quest);
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("sm1_01.reasons.identify_shape_and_dimensions"), givenLatex),
    makeStep(2, t("sm1_01.reasons.select_geometry_formula"), formulaLatex || expression),
    makeStep(3, t("sm1_01.reasons.substitute_into_formula"), expression),
    makeStep(4, t("sm1_01.reasons.compute_final_geometry_result"), finalLatex, "key"),
  ];

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
