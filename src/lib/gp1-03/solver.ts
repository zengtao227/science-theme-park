import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { ColliderQuest } from "./types";

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
  return steps
    .map((step) => `\\text{${escapeLatexText(step.justification)}} \\implies ${step.expressionLatex}`)
    .join(" \\\\ ");
}

function finalStep(stepNumber: number, t: Translator, quest: ColliderQuest) {
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key");
}

function solveAcceleration(quest: ColliderQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.id === "A-B-1" || quest.id === "A-A-1") {
    steps.push(
      makeStep(1, t("gp1_03.reasons.select_relativistic_gamma"), "\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}"),
      makeStep(2, t("gp1_03.reasons.substitute_collider_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "A-C-1") {
    steps.push(
      makeStep(1, t("gp1_03.reasons.select_beam_energy_formula"), "E=\\gamma mc^2"),
      makeStep(2, t("gp1_03.reasons.substitute_collider_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "A-E-1") {
    steps.push(
      makeStep(1, t("gp1_03.reasons.select_relativistic_momentum"), "p\\approx\\gamma mv"),
      makeStep(2, t("gp1_03.reasons.use_ultrarelativistic_limit"), "v\\approx c"),
      makeStep(3, t("gp1_03.reasons.substitute_collider_values"), quest.expressionLatex),
      finalStep(4, t, quest)
    );
    return steps;
  }

  return steps;
}

function solveCollision(quest: ColliderQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.id === "C-B-1" || quest.id === "C-A-1") {
    steps.push(
      makeStep(1, t("gp1_03.reasons.identify_head_on_collision"), "\\sqrt{s}=E_1+E_2"),
      makeStep(2, t("gp1_03.reasons.substitute_collider_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "C-C-1") {
    steps.push(
      makeStep(1, t("gp1_03.reasons.select_event_rate_formula"), "N=L\\sigma t"),
      makeStep(2, t("gp1_03.reasons.substitute_collider_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "C-E-1") {
    steps.push(
      makeStep(1, t("gp1_03.reasons.select_beta_formula"), "\\beta=\\sqrt{1-\\frac{1}{\\gamma^2}}"),
      makeStep(2, t("gp1_03.reasons.substitute_collider_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  return steps;
}

function solveDetection(quest: ColliderQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.id === "D-B-1") {
    steps.push(
      makeStep(1, t("gp1_03.reasons.select_track_radius_formula"), "r=\\frac{p}{0.3B}"),
      makeStep(2, t("gp1_03.reasons.substitute_collider_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "D-C-1") {
    steps.push(
      makeStep(1, t("gp1_03.reasons.select_invariant_mass_formula"), "m=\\sqrt{E^2-p^2}"),
      makeStep(2, t("gp1_03.reasons.substitute_collider_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "D-A-1") {
    steps.push(
      makeStep(1, t("gp1_03.reasons.select_pseudorapidity_formula"), "\\eta=-\\ln\\left(\\tan\\frac{\\theta}{2}\\right)"),
      makeStep(2, t("gp1_03.reasons.substitute_collider_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "D-E-1") {
    steps.push(
      makeStep(1, t("gp1_03.reasons.compare_reconstructed_mass"), "\\Delta m=m_{reco}-m_H"),
      makeStep(2, t("gp1_03.reasons.substitute_collider_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  return steps;
}

export function solveGP103(
  quest: ColliderQuest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps =
    quest.stage === "acceleration" ? solveAcceleration(quest, t) :
    quest.stage === "collision" ? solveCollision(quest, t) :
    solveDetection(quest, t);

  if (steps.length === 0) {
    return { steps: [], fullSolutionLatex: null };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
