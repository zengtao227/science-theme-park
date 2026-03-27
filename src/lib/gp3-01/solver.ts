import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { GP301Quest } from "./types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function escapeLatexText(text: string) {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([{}%$&#_^])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}");
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps.map((step) => `\\text{${escapeLatexText(step.justification)}} \\implies ${step.expressionLatex}`).join(" \\\\ ");
}

function finalStep(stepNumber: number, t: Translator, quest: GP301Quest) {
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key");
}

function solveWaveProperties(quest: GP301Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  if (quest.id.startsWith("WP-B") || quest.id === "WP-C3" || quest.id === "WP-C4") {
    const rule = quest.targetLatex === "v" ? "v=f\\lambda" : quest.targetLatex.includes("\\lambda") ? "\\lambda=\\frac{v}{f}" : "f=\\frac{v}{\\lambda}";
    steps.push(
      makeStep(1, t("gp3_01.reasons.select_wave_equation"), rule),
      makeStep(2, t("gp3_01.reasons.substitute_wave_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "WP-C1" || quest.id === "WP-C2") {
    steps.push(
      makeStep(1, t("gp3_01.reasons.link_period_and_frequency"), quest.targetLatex === "T" ? "T=\\frac{1}{f}" : "f=\\frac{1}{T}"),
      makeStep(2, t("gp3_01.reasons.substitute_wave_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "WP-C5" || quest.id.startsWith("WP-A") || quest.id.startsWith("WP-E")) {
    steps.push(
      makeStep(1, t("gp3_01.reasons.interpret_wave_concept"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  return steps;
}

function solveSuperposition(quest: GP301Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  if (quest.id.startsWith("SP-B") || quest.id.startsWith("SP-C")) {
    steps.push(
      makeStep(1, t("gp3_01.reasons.select_superposition_rule"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  if (quest.id.startsWith("SP-A")) {
    steps.push(
      makeStep(1, t("gp3_01.reasons.select_interference_formula"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  if (quest.id.startsWith("SP-E")) {
    steps.push(
      makeStep(1, t("gp3_01.reasons.select_thin_film_rule"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  return steps;
}

function solveOptics(quest: GP301Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];
  if (quest.id.startsWith("OP-B")) {
    steps.push(
      makeStep(1, t("gp3_01.reasons.select_reflection_refraction_rule"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  if (quest.id.startsWith("OP-C")) {
    steps.push(
      makeStep(1, t("gp3_01.reasons.select_critical_angle_rule"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  if (quest.id.startsWith("OP-A")) {
    steps.push(
      makeStep(1, t("gp3_01.reasons.select_diffraction_rule"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  if (quest.id.startsWith("OP-E")) {
    steps.push(
      makeStep(1, t("gp3_01.reasons.select_grating_rule"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  return steps;
}

export function solveGP301(
  quest: GP301Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps =
    quest.stage === "WAVE_PROPERTIES" ? solveWaveProperties(quest, t) :
    quest.stage === "SUPERPOSITION" ? solveSuperposition(quest, t) :
    solveOptics(quest, t);

  if (steps.length === 0) return { steps: [], fullSolutionLatex: null };
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
