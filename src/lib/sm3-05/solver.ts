import type { FeedbackContent } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SM305FeedbackQuest } from "./provider";

function getSlot(quest: SM305FeedbackQuest, id?: string) {
  if (id) return quest.slots.find((slot) => slot.id === id) ?? null;
  return quest.slots[0] ?? null;
}

function buildFinalExpression(quest: SM305FeedbackQuest) {
  const slot = getSlot(quest);
  if (!slot) return quest.correctLatex;
  return `${slot.labelLatex} = ${quest.correctLatex}`;
}

function architectureRule(quest: SM305FeedbackQuest) {
  switch (quest.geometryType) {
    case "roche1":
    case "box":
    case "warehouse":
      return "V = l \\cdot w \\cdot h";
    case "prism":
      return "V = A_{base} \\cdot h";
    case "messeturm":
    case "cylinder":
    case "tank":
    case "silo":
    case "pipe":
      return "V = \\pi r^{2} h";
    case "pyramid":
      return "V = \\frac{1}{3} A_{base} \\cdot h";
    case "cone":
      return "V = \\frac{1}{3} \\pi r^{2} h";
    case "dome":
      return "V = \\frac{2}{3} \\pi r^{3}";
    case "sphere":
      return "V = \\frac{4}{3} \\pi r^{3}";
    case "torus":
      return "V = 2 \\pi^{2} R r^{2}";
    case "composite":
    case "complex":
      return "V = V_{1} + V_{2}";
    default:
      return quest.expressionLatex;
  }
}

function curvedSolidRule(quest: SM305FeedbackQuest) {
  switch (quest.geometryType) {
    case "sphere_vol":
      return "V = \\frac{4}{3} \\pi r^{3}";
    case "sphere":
    case "sphere_sa":
      return "A = 4 \\pi r^{2}";
    case "cylinder_basic":
      return "V = \\pi r^{2} h";
    case "cylinder_sa":
      return "A = 2 \\pi r^{2} + 2 \\pi r h";
    case "cylinder_lateral":
      return "A_{lat} = 2 \\pi r h";
    case "cone_basic":
    case "cone_vol":
      return "V = \\frac{1}{3} \\pi r^{2} h";
    case "cone_sa":
      return "A = \\pi r^{2} + \\pi r s";
    case "hemisphere":
      return "V = \\frac{2}{3} \\pi r^{3}";
    case "hemisphere_sa":
      return "A = 3 \\pi r^{2}";
    case "truncated_cone":
      return "V = \\frac{1}{3} \\pi h \\left(r_1^2 + r_1 r_2 + r_2^2\\right)";
    default:
      return quest.expressionLatex;
  }
}

function intermediateExpression(quest: SM305FeedbackQuest) {
  const slot = getSlot(quest);
  if (typeof slot?.expected === "string") return quest.correctLatex;
  const rule =
    quest.stage === "BASEL_ARCH" ? architectureRule(quest) :
    quest.stage === "CURVED_SOLIDS" ? curvedSolidRule(quest) :
    `\\text{cross section}`;
  return `${rule},\\; ${quest.expressionLatex} \\Rightarrow ${buildFinalExpression(quest)}`;
}

function solveArchitecture(quest: SM305FeedbackQuest, t: Translator) {
  return [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), architectureRule(quest)),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), intermediateExpression(quest)),
    makeStep(4, t("common.feedback_reasons.state_final_result"), buildFinalExpression(quest), "key"),
  ];
}

function solveCrossSections(quest: SM305FeedbackQuest, t: Translator) {
  return [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("sm3_05.solver.cross_section_rule")}}`),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), intermediateExpression(quest)),
    makeStep(4, t("common.feedback_reasons.state_final_result"), buildFinalExpression(quest), "key"),
  ];
}

function solveCurvedSolids(quest: SM305FeedbackQuest, t: Translator) {
  return [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), curvedSolidRule(quest)),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), intermediateExpression(quest)),
    makeStep(4, t("common.feedback_reasons.state_final_result"), buildFinalExpression(quest), "key"),
  ];
}

export function solveSM305(quest: SM305FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps =
    quest.stage === "BASEL_ARCH" ? solveArchitecture(quest, t) :
    quest.stage === "CROSS_SECTIONS" ? solveCrossSections(quest, t) :
    solveCurvedSolids(quest, t);

  if (!steps || steps.length === 0) {
    return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
