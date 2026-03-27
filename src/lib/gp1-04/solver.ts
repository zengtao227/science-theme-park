import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { TunnelQuest } from "./types";

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

function finalStep(stepNumber: number, t: Translator, quest: TunnelQuest) {
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key");
}

function solveClassical(quest: TunnelQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.id === "CL-B-1" || quest.id === "CL-C-1") {
    steps.push(
      makeStep(1, t("gp1_04.reasons.compare_energy_with_barrier"), "E>V_0"),
      makeStep(2, t("gp1_04.reasons.use_classical_limit"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "CL-A-1") {
    steps.push(
      makeStep(1, t("gp1_04.reasons.select_wave_number_formula"), "k\\propto\\sqrt{E}"),
      makeStep(2, t("gp1_04.reasons.substitute_quantum_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "CL-E-1") {
    steps.push(
      makeStep(1, t("gp1_04.reasons.select_de_broglie_relation"), "\\lambda=\\frac{hc}{pc^2}"),
      makeStep(2, t("gp1_04.reasons.substitute_quantum_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  return steps;
}

function solveTunneling(quest: TunnelQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.id === "TU-B-1" || quest.id === "TU-A-1") {
    steps.push(
      makeStep(1, t("gp1_04.reasons.select_tunneling_formula"), "T=e^{-2\\kappa a}"),
      makeStep(2, t("gp1_04.reasons.substitute_quantum_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "TU-C-1") {
    steps.push(
      makeStep(1, t("gp1_04.reasons.select_decay_constant_formula"), "\\kappa=\\sqrt{V_0-E}"),
      makeStep(2, t("gp1_04.reasons.substitute_quantum_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "TU-E-1") {
    steps.push(
      makeStep(1, t("gp1_04.reasons.select_tunneling_formula"), "T=e^{-2\\kappa a}"),
      makeStep(2, t("gp1_04.reasons.rearrange_for_barrier_width"), "a=\\frac{-\\ln(T)}{2\\kappa}"),
      makeStep(3, t("gp1_04.reasons.substitute_quantum_values"), quest.expressionLatex),
      finalStep(4, t, quest)
    );
    return steps;
  }

  return steps;
}

function solveResonance(quest: TunnelQuest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.id === "RE-B-1") {
    steps.push(
      makeStep(1, t("gp1_04.reasons.select_standing_wave_condition"), "2a=n\\lambda"),
      makeStep(2, t("gp1_04.reasons.substitute_quantum_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "RE-C-1") {
    steps.push(
      makeStep(1, t("gp1_04.reasons.select_quantized_energy_rule"), "E_n=n^2E_1"),
      makeStep(2, t("gp1_04.reasons.substitute_quantum_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "RE-A-1") {
    steps.push(
      makeStep(1, t("gp1_04.reasons.compute_energy_gap"), "\\Delta E=E_2-E_1"),
      makeStep(2, t("gp1_04.reasons.substitute_quantum_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "RE-E-1") {
    steps.push(
      makeStep(1, t("gp1_04.reasons.select_photon_frequency_relation"), "f=\\frac{\\Delta E}{h}"),
      makeStep(2, t("gp1_04.reasons.substitute_quantum_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  return steps;
}

export function solveGP104(
  quest: TunnelQuest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps =
    quest.stage === "classical" ? solveClassical(quest, t) :
    quest.stage === "tunneling" ? solveTunneling(quest, t) :
    solveResonance(quest, t);

  if (steps.length === 0) {
    return { steps: [], fullSolutionLatex: null };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
