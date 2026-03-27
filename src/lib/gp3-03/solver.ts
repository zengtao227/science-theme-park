import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { GP303Quest } from "./types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(stepNumber: number, justification: string, expressionLatex: string, emphasis?: PlatformSolutionStep["emphasis"]): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function escapeLatexText(text: string) {
  return text.replace(/\\/g, "\\textbackslash{}").replace(/([{}%$&#_^])/g, "\\$1").replace(/~/g, "\\textasciitilde{}");
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps.map((step) => `\\text{${escapeLatexText(step.justification)}} \\implies ${step.expressionLatex}`).join(" \\\\ ");
}

function finalStep(stepNumber: number, t: Translator, quest: GP303Quest) {
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key");
}

function solveFaraday(quest: GP303Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  const rule = quest.id.includes("_ELITE_") ? "\\varepsilon=NAB\\omega" : "\\varepsilon=-N\\frac{\\Delta\\Phi}{\\Delta t}";
  steps.push(
    makeStep(1, t("gp3_03.reasons.select_faraday_formula"), rule),
    makeStep(2, t("gp3_03.reasons.substitute_induction_values"), quest.expressionLatex),
    finalStep(3, t, quest)
  );
  return steps;
}

function solveLenz(quest: GP303Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  steps.push(
    makeStep(1, t("gp3_03.reasons.apply_lenz_direction_rule"), quest.expressionLatex),
    finalStep(2, t, quest)
  );
  return steps;
}

function solveGenerators(quest: GP303Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  const expr = quest.expressionLatex;
  const rule =
    expr.includes("NAB\\omega") ? "\\varepsilon=NAB\\omega" :
    expr.includes("P = VI") ? "P=VI" :
    expr.includes("\\eta =") ? "\\eta=\\frac{P_{out}}{P_{in}}" :
    "\\text{Generatorprinzipien}";
  steps.push(
    makeStep(1, t("gp3_03.reasons.select_generator_formula"), rule),
    makeStep(2, t("gp3_03.reasons.substitute_induction_values"), expr),
    finalStep(3, t, quest)
  );
  return steps;
}

export function solveGP303(
  quest: GP303Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps =
    quest.stage === "FARADAYS_LAW" ? solveFaraday(quest, t) :
    quest.stage === "LENZS_LAW" ? solveLenz(quest, t) :
    solveGenerators(quest, t);
  if (steps.length === 0) return { steps: [], fullSolutionLatex: null };
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
