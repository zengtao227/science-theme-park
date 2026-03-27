import type { PlatformSolutionStep } from "@/hooks/useQuestManager";

export type Translator = (key: string, params?: Record<string, string | number>) => string;

export function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

export function escapeLatexText(text: string) {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([{}%$&#_^])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}");
}

export function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps
    .map((step) => `\\text{${escapeLatexText(step.justification)}} \\implies ${step.expressionLatex}`)
    .join(" \\\\ ");
}

export function round2(value: number) {
  return Math.round(value * 100) / 100;
}

export function formatNumber(value: number) {
  const rounded = round2(value);
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

export function toLatexValue(value: string | number | undefined) {
  if (value == null) return "";
  return typeof value === "number" ? formatNumber(value) : String(value);
}
