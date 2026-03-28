import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { GP201Quest } from "./types";

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

function finalStep(stepNumber: number, t: Translator, quest: GP201Quest) {
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key");
}

function includesTarget(quest: GP201Quest, fragment: string) {
  return quest.targetLatex.toLowerCase().includes(fragment.toLowerCase());
}

function solveIdealGas(quest: GP201Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.id === "IG-A5") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.link_combined_gas_law"), "\\frac{P_1V_1}{T_1}=\\frac{P_2V_2}{T_2}"),
      makeStep(2, t("gp2_01.reasons.rearrange_for_target"), "P_2=P_1\\frac{V_1T_2}{V_2T_1}"),
      makeStep(3, t("gp2_01.reasons.substitute_known_values"), quest.expressionLatex),
      finalStep(4, t, quest)
    );
    return steps;
  }

  if (quest.id === "IG-E5") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.select_ideal_gas_equation"), "n=\\frac{PV}{RT}"),
      makeStep(2, t("gp2_01.reasons.substitute_known_values"), "\\frac{PV}{RT}"),
      makeStep(3, t("gp2_01.reasons.convert_amount_to_mass"), quest.expressionLatex),
      finalStep(4, t, quest)
    );
    return steps;
  }

  if (quest.id === "IG-E3") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.link_combined_gas_law"), "P_1V_1=P_2V_2"),
      makeStep(2, t("gp2_01.reasons.apply_inverse_law"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "IG-E4") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.link_combined_gas_law"), "\\frac{V_1}{T_1}=\\frac{V_2}{T_2}"),
      makeStep(2, t("gp2_01.reasons.apply_direct_law"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "IG-C5" || quest.id === "IG-A1") {
    const relation = quest.id === "IG-C5" ? "P\\propto T\\;(V,n\\text{ konstant})" : "V\\propto n\\;(P,T\\text{ konstant})";
    const substitution = quest.id === "IG-C5"
      ? "\\frac{P_2}{P_1}=\\frac{T_2}{T_1}"
      : "\\frac{V_2}{V_1}=\\frac{n_2}{n_1}";
    steps.push(
      makeStep(1, t("gp2_01.reasons.identify_constant_condition"), relation),
      makeStep(2, t("gp2_01.reasons.apply_direct_law"), substitution),
      finalStep(3, t, quest)
    );
    return steps;
  }

  const rearranged =
    includesTarget(quest, "P") ? "P=\\frac{nRT}{V}" :
    includesTarget(quest, "n") ? "n=\\frac{PV}{RT}" :
    includesTarget(quest, "V") ? "V=\\frac{nRT}{P}" :
    "T=\\frac{PV}{nR}";

  steps.push(
    makeStep(1, t("gp2_01.reasons.select_ideal_gas_equation"), "PV=nRT"),
    makeStep(2, t("gp2_01.reasons.rearrange_for_target"), rearranged),
    makeStep(3, t("gp2_01.reasons.substitute_known_values"), quest.expressionLatex),
    finalStep(4, t, quest)
  );
  return steps;
}

function solveBoyle(quest: GP201Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.id === "B-B5") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.identify_constant_condition"), "P_1V_1=P_2V_2"),
      makeStep(2, t("gp2_01.reasons.interpret_physical_condition"), "T=\\text{konstant}"),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "B-E1") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.apply_inverse_law"), "W=nRT\\ln\\left(\\frac{V_2}{V_1}\\right)"),
      makeStep(2, t("gp2_01.reasons.substitute_known_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "B-E2") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.identify_constant_condition"), "P_1V_1=P_2V_2\\;(T\\text{ konstant})"),
      makeStep(2, t("gp2_01.reasons.interpret_work_sign"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "B-E3") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.state_model_limit"), "\\text{Reale Gase weichen bei hohem Druck und tiefer Temperatur ab}"),
      finalStep(2, t, quest)
    );
    return steps;
  }

  if (quest.id === "B-E5") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.apply_inverse_law"), "P_f(V_1+V_2)=P_1V_1"),
      makeStep(2, t("gp2_01.reasons.substitute_known_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "B-C3" || quest.id === "B-A2" || quest.id === "B-A5") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.apply_inverse_law"), "P\\propto \\frac{1}{V}"),
      makeStep(2, t("gp2_01.reasons.substitute_known_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  steps.push(
    makeStep(1, t("gp2_01.reasons.select_boyle_law"), "P_1V_1=P_2V_2"),
    makeStep(2, t("gp2_01.reasons.rearrange_for_target"), quest.targetLatex.includes("P_2") ? "P_2=\\frac{P_1V_1}{V_2}" : "V_2=\\frac{P_1V_1}{P_2}"),
    makeStep(3, t("gp2_01.reasons.substitute_known_values"), quest.expressionLatex),
    finalStep(4, t, quest)
  );
  return steps;
}

function solveCharles(quest: GP201Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  if (quest.id === "C-B5") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.identify_constant_condition"), "\\frac{V}{T}=k"),
      makeStep(2, t("gp2_01.reasons.interpret_physical_condition"), "P=\\text{konstant}"),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "C-C5") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.convert_temperatures_to_kelvin"), "0\\text{ K}=-273.15^{\\circ}\\text{C}"),
      finalStep(2, t, quest)
    );
    return steps;
  }

  if (quest.id === "C-A2" || quest.id === "C-A4" || quest.id === "C-E1" || quest.id === "C-E2" || quest.id === "C-E5") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.interpret_concept"), quest.expressionLatex),
      finalStep(2, t, quest)
    );
    return steps;
  }

  if (quest.id === "C-A5" || quest.id === "C-E3") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.apply_direct_law"), "W=P\\Delta V"),
      makeStep(2, t("gp2_01.reasons.substitute_known_values"), quest.expressionLatex),
      finalStep(3, t, quest)
    );
    return steps;
  }

  if (quest.id === "C-C1" || quest.id === "C-A1") {
    steps.push(
      makeStep(1, t("gp2_01.reasons.convert_temperatures_to_kelvin"), "\\text{Verwende nur absolute Temperaturen in Kelvin}"),
      makeStep(2, t("gp2_01.reasons.select_charles_law"), "\\frac{V_1}{T_1}=\\frac{V_2}{T_2}"),
      makeStep(3, t("gp2_01.reasons.substitute_known_values"), quest.expressionLatex),
      finalStep(4, t, quest)
    );
    return steps;
  }

  steps.push(
    makeStep(1, t("gp2_01.reasons.select_charles_law"), "\\frac{V_1}{T_1}=\\frac{V_2}{T_2}"),
    makeStep(2, t("gp2_01.reasons.apply_direct_law"), quest.expressionLatex),
    finalStep(3, t, quest)
  );
  return steps;
}

export function solveGP201(
  quest: GP201Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps =
    quest.stage === "IDEAL_GAS" ? solveIdealGas(quest, t) :
    quest.stage === "BOYLES_LAW" ? solveBoyle(quest, t) :
    solveCharles(quest, t);

  if (steps.length === 0) {
    return { steps: [], fullSolutionLatex: null };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
