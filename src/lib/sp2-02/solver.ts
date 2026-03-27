import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP202Quest } from "./types";

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

function round(value: number) {
  return Math.round(value * 1000) / 1000;
}

function solveOhmsLaw(quest: SP202Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("sp2_02.reasons.select_ohms_formula"), "U = I \\times R"),
  ];

  if (quest.current == null && quest.voltage != null && quest.resistance != null) {
    steps.push(
      makeStep(2, t("sp2_02.reasons.solve_for_missing_electrical_quantity"), `I = \\frac{U}{R} = \\frac{${quest.voltage}}{${quest.resistance}} = ${round(quest.voltage / quest.resistance)}`),
    );
  } else if (quest.voltage == null && quest.current != null && quest.resistance != null) {
    steps.push(
      makeStep(2, t("sp2_02.reasons.solve_for_missing_electrical_quantity"), `U = I \\times R = ${quest.current} \\times ${quest.resistance} = ${round(quest.current * quest.resistance)}`),
    );
  } else if (quest.resistance == null && quest.voltage != null && quest.current != null) {
    steps.push(
      makeStep(2, t("sp2_02.reasons.solve_for_missing_electrical_quantity"), `R = \\frac{U}{I} = \\frac{${quest.voltage}}{${quest.current}} = ${round(quest.voltage / quest.current)}`),
    );
  }

  steps.push(makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return steps;
}

function solveSeries(quest: SP202Quest, t: Translator) {
  const components = quest.components ?? [];
  const totalResistance = round(components.reduce((sum, value) => sum + value, 0));
  const current = quest.voltage != null && totalResistance !== 0 ? round(quest.voltage / totalResistance) : 0;

  return [
    makeStep(1, t("sp2_02.reasons.add_series_resistances"), `R_{total} = ${components.join(" + ")} = ${totalResistance}`),
    makeStep(2, t("sp2_02.reasons.divide_voltage_by_total_resistance"), `I = \\frac{U}{R_{total}} = \\frac{${quest.voltage ?? 0}}{${totalResistance}} = ${current}`),
    makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
}

function solveParallel(quest: SP202Quest, t: Translator) {
  const components = quest.components ?? [];
  const voltage = quest.voltage ?? 0;
  const branchCurrents = components.map((value) => round(voltage / value));
  const totalCurrent = round(branchCurrents.reduce((sum, value) => sum + value, 0));

  return [
    makeStep(1, t("sp2_02.reasons.compute_branch_currents"), branchCurrents.map((value, index) => `I_${index + 1} = \\frac{${voltage}}{${components[index]}} = ${value}`).join(",\\; ")),
    makeStep(2, t("sp2_02.reasons.sum_parallel_currents"), `I_{total} = ${branchCurrents.join(" + ")} = ${totalCurrent}`),
    makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
}

export function solveSP202(quest: SP202Quest, t: Translator) {
  const steps =
    quest.stage === "OHMS_LAW"
      ? solveOhmsLaw(quest, t)
      : quest.stage === "SERIES_CIRCUITS"
        ? solveSeries(quest, t)
        : solveParallel(quest, t);

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
