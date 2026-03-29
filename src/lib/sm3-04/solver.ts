import type { FeedbackContent } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { S304Quest } from "@/lib/sm3-04/quests";

function getSlot(quest: S304Quest, id?: string) {
  if (id) return quest.slots.find((slot) => slot.id === id) ?? null;
  return quest.slots[0] ?? null;
}

function solvePh(quest: S304Quest, t: Translator) {
  const slot = getSlot(quest, "pH");
  if (!slot || quest.concentration == null) return null;
  const concentrationText = quest.expressionLatex.replace(/^\[H\^\+\] = /, "").replace(/\\;\\mathrm\{mol\/L\}/, "");
  return [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{pH} = -\\log_{10}[H^+]"),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\mathrm{pH} = -\\log_{10}\\left(${concentrationText}\\right)`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `\\mathrm{pH} = ${formatNumber(Number(slot.expected))}`, "key"),
  ];
}

function solveDecibel(quest: S304Quest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot) return null;

  const formula = quest.id.includes("ELITE")
    ? "\\Delta L = 10\\log_{10}\\left(\\frac{I_1}{I_2}\\right)"
    : "L = 10\\log_{10}\\left(\\frac{I}{I_0}\\right)";

  const substitution = quest.id.includes("ELITE")
    ? (() => {
        const match = quest.expressionLatex.match(/I_1 = ([^,]+),\\; I_2 = ([^,]+)/);
        if (!match) return quest.expressionLatex;
        return `\\Delta L = 10\\log_{10}\\left(\\frac{${match[1]}}{${match[2]}}\\right)`;
      })()
    : `L = 10\\log_{10}\\left(\\frac{${quest.intensity != null ? quest.intensity.toExponential(0).replace("e", "\\times 10^{") + "}" : "I"}}{10^{-12}}\\right)`;

  return [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), formula),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), substitution),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${formatNumber(Number(slot.expected))}${slot.unit ? `\\;${slot.unit}` : ""}`, "key"),
  ];
}

function solveRichter(quest: S304Quest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot) return null;

  const formula = quest.id.includes("ELITE")
    ? "\\Delta M = \\log_{10}\\left(\\frac{A_1}{A_2}\\right)"
    : "M = \\log_{10}\\left(\\frac{A}{A_0}\\right)";

  const substitution = quest.id.includes("ELITE")
    ? (() => {
        const match = quest.expressionLatex.match(/A_1=([^,]+),\\; A_2=([^,]+)/);
        if (!match) return quest.expressionLatex;
        return `\\Delta M = \\log_{10}\\left(\\frac{${match[1]}}{${match[2]}}\\right)`;
      })()
    : `M = \\log_{10}(${formatNumber(Number(quest.amplitude))})`;

  return [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), formula),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), substitution),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${formatNumber(Number(slot.expected))}`, "key"),
  ];
}

export function solveSM304(quest: S304Quest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps =
    quest.stage === "PH" ? solvePh(quest, t) :
    quest.stage === "DECIBEL" ? solveDecibel(quest, t) :
    solveRichter(quest, t);

  if (!steps || steps.length === 0) {
    return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
