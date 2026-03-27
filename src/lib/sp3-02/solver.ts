import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP302Quest } from "./quests";

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

export function solveSP302(quest: SP302Quest, t: Translator) {
  const m = quest.mass ?? 0;
  const f = quest.force ?? 0;
  const a = quest.acceleration ?? 0;
  const mu = quest.frictionCoeff ?? 0;
  const theta = quest.theta ?? 0;
  const g = 9.8;
  const thetaRad = (theta * Math.PI) / 180;
  const steps: PlatformSolutionStep[] = [];

  if (quest.stage === "NEWTON_1") {
    if (quest.scenarioKey === "vector_add") {
      steps.push(
        makeStep(1, t("sp3_02.reasons.resolve_perpendicular_forces"), `|\\vec{F}_{net}| = \\sqrt{${f}^{2} + ${f}^{2}}`),
        makeStep(2, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.scenarioKey === "slope") {
      const normal = round(m * g * Math.cos(thetaRad));
      steps.push(
        makeStep(1, t("sp3_02.reasons.compute_normal_force"), `N = mg\\cos\\theta = ${m}\\times ${g}\\times \\cos(${theta}^{\\circ}) = ${normal}`),
        makeStep(2, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.scenarioKey === "complex") {
      const friction = round(m * g * mu);
      const net = round(f - friction);
      steps.push(
        makeStep(1, t("sp3_02.reasons.compute_normal_force"), `N = mg = ${m}\\times ${g} = ${round(m * g)}`),
        makeStep(2, t("sp3_02.reasons.apply_friction_law"), `f = \\mu N = ${mu}\\times ${round(m * g)} = ${friction}`),
        makeStep(3, t("sp3_02.reasons.apply_equilibrium_condition"), `F_{net} = ${f} - ${friction} = ${net}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      steps.push(
        makeStep(1, t("sp3_02.reasons.apply_equilibrium_condition"), "\\sum F = 0"),
        makeStep(2, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    }
  } else if (quest.stage === "NEWTON_2") {
    if (quest.scenarioKey === "find_f") {
      steps.push(
        makeStep(1, t("sp3_02.reasons.apply_newtons_second_law"), `F = ma = ${m}\\times ${a} = ${round(m * a)}`),
        makeStep(2, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else if (quest.scenarioKey === "net_force" || quest.scenarioKey === "coupled") {
      const accel = round(f / m);
      steps.push(
        makeStep(1, t("sp3_02.reasons.apply_newtons_second_law"), `a = \\frac{F}{m} = \\frac{${f}}{${m}} = ${accel}`),
        makeStep(2, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      const friction = round(m * g * mu);
      const net = round(f - friction);
      const accel = round(net / m);
      steps.push(
        makeStep(1, t("sp3_02.reasons.compute_normal_force"), `N = mg = ${m}\\times ${g} = ${round(m * g)}`),
        makeStep(2, t("sp3_02.reasons.subtract_resistive_force"), `F_{net} = ${f} - ${friction} = ${net}`),
        makeStep(3, t("sp3_02.reasons.apply_newtons_second_law"), `a = \\frac{${net}}{${m}} = ${accel}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    }
  } else {
    if (quest.scenarioKey === "slope_friction") {
      const normal = round(m * g * Math.cos(thetaRad));
      const friction = round(mu * normal);
      steps.push(
        makeStep(1, t("sp3_02.reasons.compute_normal_force"), `N = mg\\cos\\theta = ${m}\\times ${g}\\times \\cos(${theta}^{\\circ}) = ${normal}`),
        makeStep(2, t("sp3_02.reasons.apply_friction_law"), `f = \\mu N = ${mu}\\times ${normal} = ${friction}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    } else {
      const normal = round(m * g);
      const friction = round(mu * normal);
      steps.push(
        makeStep(1, t("sp3_02.reasons.compute_normal_force"), `N = mg = ${m}\\times ${g} = ${normal}`),
        makeStep(2, t("sp3_02.reasons.apply_friction_law"), `f = \\mu N = ${mu}\\times ${normal} = ${friction}`),
        makeStep(3, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
    }
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
