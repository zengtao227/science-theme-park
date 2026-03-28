import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP203Quest } from "./types";

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

function solvePowerBasics(quest: SP203Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("sp2_03.reasons.choose_power_formula"), "P = U \\times I"),
  ];

  if (quest.power == null && quest.voltage != null && quest.current != null) {
    steps.push(makeStep(2, t("sp2_03.reasons.solve_for_missing_electrical_quantity"), `P = ${quest.voltage} \\times ${quest.current} = ${round(quest.voltage * quest.current)}`));
  } else if (quest.current == null && quest.power != null && quest.voltage != null) {
    steps.push(makeStep(2, t("sp2_03.reasons.solve_for_missing_electrical_quantity"), `I = \\frac{P}{U} = \\frac{${quest.power}}{${quest.voltage}} = ${round(quest.power / quest.voltage)}`));
  } else if (quest.voltage == null && quest.power != null && quest.current != null) {
    steps.push(makeStep(2, t("sp2_03.reasons.solve_for_missing_electrical_quantity"), `U = \\frac{P}{I} = \\frac{${quest.power}}{${quest.current}} = ${round(quest.power / quest.current)}`));
  }

  steps.push(makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return steps;
}

function solveEnergyConsumption(quest: SP203Quest, t: Translator) {
  const power = quest.power ?? 0;
  const time = quest.time ?? 0;
  const energyWh = round(power * time);
  const energyKWh = round((power / 1000) * time);

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("sp2_03.reasons.convert_power_time_to_energy"), `E = P \\times t = ${power} \\times ${time} = ${energyWh}\\,\\text{Wh}`),
  ];

  if (quest.cost != null) {
    const cost = round(energyKWh * quest.cost);
    steps.push(
      makeStep(2, t("sp2_03.reasons.compute_running_cost"), `\\text{Cost} = ${energyKWh}\\,\\text{kWh} \\times ${quest.cost} = ${cost}`),
    );
  } else if (Number(quest.answer) === energyKWh) {
    steps.push(
      makeStep(2, t("sp2_03.reasons.convert_wh_to_kwh"), `${energyWh}\\,\\text{Wh} = ${energyKWh}\\,\\text{kWh}`),
    );
  } else {
    steps.push(
      makeStep(2, t("sp2_03.reasons.convert_power_time_to_energy"), `\\text{Energy remains } ${energyWh}\\,\\text{Wh}`),
    );
  }

  steps.push(makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return steps;
}

function solveEfficiency(quest: SP203Quest, t: Translator) {
  const prompt = quest.promptLatex;
  const answer = quest.answer;
  const steps: PlatformSolutionStep[] = [];

  if (prompt.includes("efficiency") || prompt.includes("Effizienz") || prompt.includes("效率")) {
    steps.push(
      makeStep(1, t("sp2_03.reasons.apply_efficiency_ratio"), "\\eta = \\frac{P_{out}}{P_{in}} \\times 100\\%"),
      makeStep(2, t("sp2_03.reasons.solve_for_missing_efficiency_quantity"), `\\eta = ${answer}\\%`),
    );
  } else if (prompt.includes("loss") || prompt.includes("Verlust") || prompt.includes("损耗")) {
    steps.push(
      makeStep(1, t("sp2_03.reasons.compute_power_loss"), "P_{loss} = P_{in} - P_{out}"),
      makeStep(2, t("sp2_03.reasons.solve_for_missing_efficiency_quantity"), `P_{loss} = ${answer}`),
    );
  } else {
    steps.push(
      makeStep(1, t("sp2_03.reasons.apply_efficiency_ratio"), "\\eta = \\frac{P_{out}}{P_{in}} \\times 100\\%"),
      makeStep(2, t("sp2_03.reasons.solve_for_missing_efficiency_quantity"), `\\text{Required quantity} = ${answer}`),
    );
  }

  steps.push(makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return steps;
}

export function solveSP203(quest: SP203Quest, t: Translator) {
  const steps =
    quest.stage === "POWER_BASICS"
      ? solvePowerBasics(quest, t)
      : quest.stage === "ENERGY_CONSUMPTION"
        ? solveEnergyConsumption(quest, t)
        : solveEfficiency(quest, t);

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
