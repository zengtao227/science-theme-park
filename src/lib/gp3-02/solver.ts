import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { GP302Quest } from "./types";

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

function finalStep(stepNumber: number, t: Translator, quest: GP302Quest) {
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key");
}

function solveElectricField(quest: GP302Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  const usesForce = quest.id.includes("_ELITE_");
  steps.push(
    makeStep(1, t("gp3_02.reasons.select_field_or_force_formula"), usesForce ? "F=qE" : "E=k\\frac{Q}{r^2}"),
    makeStep(2, t("gp3_02.reasons.substitute_em_values"), quest.expressionLatex),
    finalStep(3, t, quest)
  );
  return steps;
}

function solveMagneticField(quest: GP302Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  const isSolenoid = quest.expressionLatex.includes("\\mu_0 \\frac{NI}{L}");
  steps.push(
    makeStep(1, t("gp3_02.reasons.select_magnetic_field_formula"), isSolenoid ? "B=\\mu_0\\frac{NI}{L}" : "B=\\frac{\\mu_0I}{2\\pi r}"),
    makeStep(2, t("gp3_02.reasons.substitute_em_values"), quest.expressionLatex),
    finalStep(3, t, quest)
  );
  return steps;
}

function solveParticleMotion(quest: GP302Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  const expr = quest.expressionLatex;
  const rule =
    expr.includes("\\sqrt{\\frac{2qV}{m}}") ? "v=\\sqrt{\\frac{2qV}{m}}" :
    expr.includes("\\frac{mv}{qB}") ? "r=\\frac{mv}{qB}" :
    expr.includes("qvB") ? "F=qvB" :
    "F=qE";
  steps.push(
    makeStep(1, t("gp3_02.reasons.select_particle_motion_formula"), rule),
    makeStep(2, t("gp3_02.reasons.substitute_em_values"), expr),
    finalStep(3, t, quest)
  );
  return steps;
}

export function solveGP302(
  quest: GP302Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps =
    quest.stage === "ELECTRIC_FIELD" ? solveElectricField(quest, t) :
    quest.stage === "MAGNETIC_FIELD" ? solveMagneticField(quest, t) :
    solveParticleMotion(quest, t);
  if (steps.length === 0) return { steps: [], fullSolutionLatex: null };
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
