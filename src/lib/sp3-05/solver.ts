import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SP305Quest } from "./types";

function buildGivenLatex(quest: SP305Quest) {
  const parts: string[] = [];
  if (quest.load != null) parts.push(`F_l=${formatNumber(quest.load)}`);
  if (quest.effortArm != null) parts.push(`d_e=${formatNumber(quest.effortArm)}`);
  if (quest.loadArm != null) parts.push(`d_l=${formatNumber(quest.loadArm)}`);
  if (quest.strands != null) parts.push(`n=${formatNumber(quest.strands)}`);
  if (quest.height != null) parts.push(`h=${formatNumber(quest.height)}`);
  if (quest.length != null) parts.push(`l=${formatNumber(quest.length)}`);
  if (quest.angle != null) parts.push(`\\theta=${formatNumber(quest.angle)}^\\circ`);
  if (quest.friction != null) parts.push(`\\mu=${formatNumber(quest.friction)}`);
  if (quest.pitch != null) parts.push(`p=${formatNumber(quest.pitch)}`);
  if (quest.radius != null) parts.push(`r=${formatNumber(quest.radius)}`);
  return parts.join(",\\; ");
}

function buildSubstitutionLatex(quest: SP305Quest) {
  if (quest.machineType === "lever" && quest.load != null && quest.effortArm != null) {
    const loadArm = quest.loadArm ?? 1;
    if (quest.efficiency != null) {
      const ma = quest.effortArm / loadArm;
      return `F_e = \\frac{F_l}{MA \\cdot \\eta} = \\frac{${formatNumber(quest.load)}}{${formatNumber(ma)} \\cdot ${formatNumber(quest.efficiency)}} = ${formatNumber(quest.effort ?? 0)}`;
    }
    if (quest.stagesCount != null) {
      const ma = quest.effortArm / loadArm;
      return `F_e = \\frac{F_l}{MA^{${quest.stagesCount}}} = \\frac{${formatNumber(quest.load)}}{${formatNumber(ma)}^{${quest.stagesCount}}} = ${formatNumber(quest.effort ?? 0)}`;
    }
    return `F_e = F_l \\cdot \\frac{d_l}{d_e} = ${formatNumber(quest.load)} \\cdot \\frac{${formatNumber(loadArm)}}{${formatNumber(quest.effortArm)}} = ${formatNumber(quest.effort ?? 0)}`;
  }

  if (quest.machineType === "pulley" && quest.load != null) {
    const strands = quest.strands ?? ((quest.movable ?? 0) + (quest.fixed ?? 0));
    if (quest.efficiency != null && strands) {
      return `F_e = \\frac{F_l}{n \\cdot \\eta} = \\frac{${formatNumber(quest.load)}}{${formatNumber(strands)} \\cdot ${formatNumber(quest.efficiency)}} = ${formatNumber(quest.effort ?? 0)}`;
    }
    if (strands) {
      return `F_e = \\frac{F_l}{n} = \\frac{${formatNumber(quest.load)}}{${formatNumber(strands)}} = ${formatNumber(quest.effort ?? 0)}`;
    }
  }

  if (quest.machineType === "inclined_plane" && quest.load != null) {
    if (quest.pitch != null && quest.radius != null) {
      return `F_e = \\frac{F_l \\cdot p}{2\\pi r} = \\frac{${formatNumber(quest.load)} \\cdot ${formatNumber(quest.pitch)}}{2\\pi \\cdot ${formatNumber(quest.radius)}} = ${formatNumber(quest.effort ?? 0)}`;
    }
    if (quest.friction != null && quest.height != null && quest.length != null) {
      return `F_e = F_l\\left(\\frac{h}{l} + \\mu\\right) = ${formatNumber(quest.load)}\\left(\\frac{${formatNumber(quest.height)}}{${formatNumber(quest.length)}} + ${formatNumber(quest.friction)}\\right) = ${formatNumber(quest.effort ?? 0)}`;
    }
    if (quest.angle != null) {
      return `F_e = F_l\\sin\\theta = ${formatNumber(quest.load)}\\sin(${formatNumber(quest.angle)}^\\circ) \\approx ${formatNumber(quest.effort ?? 0)}`;
    }
    if (quest.height != null && quest.length != null) {
      return `F_e = F_l\\frac{h}{l} = ${formatNumber(quest.load)}\\cdot \\frac{${formatNumber(quest.height)}}{${formatNumber(quest.length)}} = ${formatNumber(quest.effort ?? 0)}`;
    }
  }

  return quest.hintLatex?.[0] ?? "";
}

export function solveSP305(quest: SP305Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), buildGivenLatex(quest) || String(quest.machineType ?? quest.stage)),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), quest.expressionLatex),
  ];

  const substitutionLatex = buildSubstitutionLatex(quest);
  if (substitutionLatex) {
    steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), substitutionLatex));
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
