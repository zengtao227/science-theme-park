import type { FeedbackContent, Quest, Slot } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, toLatexValue, type Translator } from "@/lib/feedback/solverSupport";
import type { PowerVisual } from "@/components/chamber/sm2-05/PowerCanvas";

type Stage = "RULES" | "NEGATIVE" | "SCIENTIFIC";

export interface SM205FeedbackQuest extends Quest {
  stage: Stage;
  visual: PowerVisual;
  slots: Slot[];
}

function emptyResult(): Omit<FeedbackContent, "hint"> {
  return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
}

function getSlot(quest: SM205FeedbackQuest, id: string) {
  return quest.slots.find((slot) => slot.id === id);
}

function getSlotNumber(quest: SM205FeedbackQuest, id: string) {
  const value = getSlot(quest, id)?.expected;
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) return Number(value);
  return null;
}

function getBaseLabel(base: string | number) {
  return typeof base === "number" ? String(base) : base;
}

export function solveSM205(quest: SM205FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
  ];

  const base = getBaseLabel(quest.visual.base);
  const targetExponent = getSlotNumber(quest, "n");
  const targetValue = getSlot(quest, "x")?.expected;

  if (quest.stage === "RULES") {
    if (quest.visual.mode === "MULTIPLY") {
      const exponent = targetExponent ?? quest.visual.m + quest.visual.n;
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a^m \\cdot a^n = a^{m+n}"),
        makeStep(3, t("common.feedback_reasons.substitute_values"), `${base}^{${quest.visual.m}} \\cdot ${base}^{${quest.visual.n}} = ${base}^{${quest.visual.m + quest.visual.n}}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${base}^{${exponent}}`, "key")
      );
    } else if (quest.visual.mode === "DIVIDE") {
      const exponent = targetExponent ?? quest.visual.m - quest.visual.n;
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\frac{a^m}{a^n} = a^{m-n}"),
        makeStep(3, t("common.feedback_reasons.substitute_values"), `${base}^{${quest.visual.m}} \\div ${base}^{${quest.visual.n}} = ${base}^{${quest.visual.m - quest.visual.n}}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${base}^{${exponent}}`, "key")
      );
    } else if (quest.visual.mode === "POWER") {
      if (quest.expressionLatex.includes("\\cdot") || quest.expressionLatex.includes("\\div")) {
        steps.push(
          makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "(a^m)^n = a^{mn}"),
          makeStep(3, t("common.feedback_reasons.solve_step_by_step"), quest.correctLatex || quest.targetLatex),
          makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${base}^{${toLatexValue(targetExponent ?? quest.visual.m * quest.visual.n)}}`, "key")
        );
      } else {
        const exponent = targetExponent ?? quest.visual.m * quest.visual.n;
        steps.push(
          makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "(a^m)^n = a^{mn}"),
          makeStep(3, t("common.feedback_reasons.substitute_values"), `(${base}^{${quest.visual.m}})^{${quest.visual.n}} = ${base}^{${quest.visual.m * quest.visual.n}}`),
          makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${base}^{${exponent}}`, "key")
        );
      }
    } else {
      return emptyResult();
    }
  } else if (quest.stage === "NEGATIVE") {
    if (quest.expressionLatex.includes("\\frac{1}{") && targetExponent !== null) {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a^{-n} = \\frac{1}{a^n}"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${quest.expressionLatex} = ${base}^{${targetExponent}}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${base}^{${targetExponent}}`, "key")
      );
    } else if (targetValue != null) {
      const denominator = toLatexValue(targetValue);
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a^{-n} = \\frac{1}{a^n}"),
        makeStep(3, t("common.feedback_reasons.compute_result"), `${base}^{-${quest.visual.n}} = \\frac{1}{${base}^{${quest.visual.n}}} = \\frac{1}{${denominator}}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `\\frac{1}{${denominator}}`, "key")
      );
    } else if (targetExponent !== null) {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a^{-n} = \\frac{1}{a^n}"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), quest.correctLatex || quest.targetLatex),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${base}^{${targetExponent}}`, "key")
      );
    } else {
      return emptyResult();
    }
  } else if (quest.stage === "SCIENTIFIC") {
    if (typeof targetValue === "number") {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a \\times 10^n"),
        makeStep(3, t("common.feedback_reasons.substitute_values"), `${formatNumber(quest.visual.m)} \\cdot 10^{${quest.visual.n}} = ${toLatexValue(targetValue)}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), toLatexValue(targetValue), "key")
      );
    } else if (targetExponent !== null) {
      if (quest.expressionLatex.includes("\\cdot 10^") && (quest.expressionLatex.includes("\\div") || quest.expressionLatex.includes(") \\cdot (") || quest.expressionLatex.includes(")^"))) {
        steps.push(
          makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a \\cdot 10^m \\times b \\cdot 10^n = (ab) \\cdot 10^{m+n}"),
          makeStep(3, t("common.feedback_reasons.solve_step_by_step"), quest.correctLatex || quest.targetLatex),
          makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${formatNumber(quest.visual.m)} \\cdot 10^{${targetExponent}}`, "key")
        );
      } else {
        steps.push(
          makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a \\times 10^n"),
          makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${quest.expressionLatex} = ${formatNumber(quest.visual.m)} \\cdot 10^{${targetExponent}}`),
          makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${formatNumber(quest.visual.m)} \\cdot 10^{${targetExponent}}`, "key")
        );
      }
    } else {
      return emptyResult();
    }
  } else {
    return emptyResult();
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
