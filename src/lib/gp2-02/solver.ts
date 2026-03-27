import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { GP202Quest } from "./types";

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

function finalStep(stepNumber: number, t: Translator, quest: GP202Quest) {
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key");
}

function solveFirstLaw(quest: GP202Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.id === "FL-B4" || quest.id === "FL-A5" || quest.id === "FL-E1" || quest.id === "FL-E4" || quest.id === "FL-E5") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.interpret_sign_convention"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  if (quest.id === "FL-C2" || quest.id === "FL-A1") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.apply_process_constraint"), "\\Delta U_{cycle}=0"),
      makeStep(2, t("gp2_02.reasons.relate_heat_and_work"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "FL-E2" || quest.id === "FL-E3") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.interpret_sign_convention"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  steps.push(
    makeStep(1, t("gp2_02.reasons.select_first_law_balance"), "\\Delta U = Q - W"),
    makeStep(2, t("gp2_02.reasons.rearrange_energy_balance"), quest.targetLatex === "Q" ? "Q=\\Delta U + W" : quest.targetLatex === "W" ? "W=Q-\\Delta U" : "\\Delta U=Q-W"),
    makeStep(3, t("gp2_02.reasons.substitute_known_values"), quest.expressionLatex),
    finalStep(4, t, quest)
  );
  return steps;
}

function solveInternalEnergy(quest: GP202Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.processType === "monatomic") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.select_internal_energy_model"), "U=\\frac{3}{2}nRT"),
      makeStep(2, t("gp2_02.reasons.substitute_known_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.processType === "diatomic") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.select_internal_energy_model"), "U=\\frac{5}{2}nRT"),
      makeStep(2, t("gp2_02.reasons.substitute_known_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.processType === "change") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.apply_heat_capacity_change"), "\\Delta U=nC_v\\Delta T"),
      makeStep(2, t("gp2_02.reasons.evaluate_temperature_change"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  steps.push(
    makeStep(1, t("gp2_02.reasons.identify_state_function_behavior"), quest.expressionLatex),
    finalStep(2, t, quest)
  );
  return steps;
}

function solveWorkHeat(quest: GP202Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.processType === "isobaric") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.select_work_formula"), "W=P\\Delta V"),
      makeStep(2, t("gp2_02.reasons.substitute_known_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.processType === "isochoric") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.apply_process_constraint"), "\\Delta V = 0"),
      makeStep(2, t("gp2_02.reasons.select_work_formula"), "W=P\\Delta V=0"),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.processType === "isothermal") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.apply_process_constraint"), "\\Delta U = 0"),
      makeStep(2, t("gp2_02.reasons.relate_heat_and_work"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.processType === "adiabatic") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.apply_process_constraint"), "Q=0"),
      makeStep(2, t("gp2_02.reasons.relate_heat_and_work"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.processType === "area" || quest.processType === "graph" || quest.processType === "cycle") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.read_pv_area"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  if (quest.processType === "unit" || quest.processType === "path" || quest.processType === "elite" || quest.processType === "basic") {
    steps.push(
      makeStep(1, t("gp2_02.reasons.interpret_sign_convention"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  steps.push(
    makeStep(1, t("gp2_02.reasons.select_work_formula"), quest.expressionLatex),
    finalStep(2, t, quest)
  );
  return steps;
}

export function solveGP202(
  quest: GP202Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps =
    quest.stage === "FIRST_LAW" ? solveFirstLaw(quest, t) :
    quest.stage === "INTERNAL_ENERGY" ? solveInternalEnergy(quest, t) :
    solveWorkHeat(quest, t);

  if (steps.length === 0) {
    return { steps: [], fullSolutionLatex: null };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
