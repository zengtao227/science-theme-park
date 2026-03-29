import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP303Quest } from "./quests";

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
  return Math.round(value * 100) / 100;
}

export function solveSP303(quest: SP303Quest, t: Translator) {
  const m = quest.mass ?? 0;
  const h = quest.height ?? 0;
  const v = quest.velocity ?? 0;
  const f = quest.force ?? 0;
  const d = quest.distance ?? 0;
  const time = quest.time ?? 1;
  const g = 9.8;
  const steps: PlatformSolutionStep[] = [];

  if (quest.stage === "POTENTIAL") {
    const ep = round(m * g * h);
    steps.push(makeStep(1, t("sp3_03.reasons.apply_gravitational_potential_formula"), `E_p = mgh = ${m}\\times ${g}\\times ${h} = ${ep}`));
    if (quest.scenarioKey === "total_energy") {
      const ek = round(0.5 * m * 100);
      steps.push(makeStep(2, t("sp3_03.reasons.add_mechanical_energy_terms"), `E = E_p + E_k = ${ep} + ${ek} = ${round(ep + ek)}`));
    }
    steps.push(
      makeStep(3, t("common.feedback_reasons.compute_result"), quest.scenarioKey === "total_energy" ? `E = ${round(ep + round(0.5 * m * 100))}` : `E_p = ${ep}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
  } else if (quest.stage === "KINETIC") {
    if (quest.scenarioKey === "velocity_at_bottom") {
      const finalV = round(Math.sqrt(2 * g * h + v * v));
      steps.push(
        makeStep(1, t("sp3_03.reasons.apply_energy_conservation"), `mgh + \\frac{1}{2}mv_0^2 = \\frac{1}{2}mv^2`),
        makeStep(2, t("sp3_03.reasons.apply_energy_conservation"), `v = \\sqrt{2gh + v_0^2} = \\sqrt{2\\times ${g}\\times ${h} + ${v}^2} = ${finalV}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.scenarioKey === "work_energy") {
      const initialEk = round(0.5 * m * v * v);
      const work = round(f * d);
      const finalEk = round(initialEk + work);
      steps.push(
        makeStep(1, t("sp3_03.reasons.apply_kinetic_energy_formula"), `E_{k,0} = \\frac{1}{2}mv^2 = \\frac{1}{2}\\times ${m}\\times ${v}^2 = ${initialEk}`),
        makeStep(2, t("sp3_03.reasons.apply_work_formula"), `W = Fd = ${f}\\times ${d} = ${work}`),
        makeStep(3, t("sp3_03.reasons.apply_energy_conservation"), `E_{k,f} = E_{k,0} + W = ${initialEk} + ${work} = ${finalEk}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      const ek = round(0.5 * m * v * v);
      steps.push(
        makeStep(1, t("sp3_03.reasons.apply_kinetic_energy_formula"), `E_k = \\frac{1}{2}mv^2 = \\frac{1}{2}\\times ${m}\\times ${v}^2 = ${ek}`),
        makeStep(2, t("common.feedback_reasons.compute_result"), `E_k = ${ek}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    }
  } else {
    if (quest.scenarioKey === "basic_work") {
      const work = round(f * d);
      steps.push(
        makeStep(1, t("sp3_03.reasons.apply_work_formula"), `W = Fd = ${f}\\times ${d} = ${work}`),
        makeStep(2, t("common.feedback_reasons.compute_result"), `W = ${work}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      const work = quest.scenarioKey === "basic_power" ? round(f * d) : round(m * g * h);
      const power = round(work / time);
      steps.push(
        makeStep(1, t("sp3_03.reasons.apply_work_formula"), quest.scenarioKey === "basic_power" ? `W = Fd = ${f}\\times ${d} = ${work}` : `W = mgh = ${m}\\times ${g}\\times ${h} = ${work}`),
        makeStep(2, t("sp3_03.reasons.divide_work_by_time_for_power"), `P = \\frac{W}{t} = \\frac{${work}}{${time}} = ${power}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    }
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
