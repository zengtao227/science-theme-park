import type { FeedbackContent, Quest, Slot } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, toLatexValue, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "EXPLORE" | "ARCHITECT" | "SCRAPPER" | "SPEEDSTER" | "ELITE" | "VOYAGER";
type QuestType = "EXPAND" | "SCRAPPER" | "SPEEDSTER" | "ELITE" | "DIFFERENCE";

export interface SM201FeedbackQuest extends Quest {
  stage: Stage;
  type: QuestType;
  ca?: number;
  vb?: number;
  formula?: string;
  isFactor?: boolean;
  variant?: "XY" | "X";
  base?: number;
  roundBase?: number;
  offset?: number;
  sign?: "+" | "-";
  a2?: number;
  middle?: number;
  b2?: number;
  target?: number;
  C?: number;
  V?: number;
  expr?: string;
  subType?: "EXPAND" | "FACTOR";
  slots: Slot[];
}

function getSlot(quest: SM201FeedbackQuest, id: string) {
  return quest.slots.find((slot) => slot.id === id);
}

function getSlotValue(quest: SM201FeedbackQuest, id: string) {
  return getSlot(quest, id)?.expected;
}

function getLatexValue(quest: SM201FeedbackQuest, id: string) {
  const value = getSlotValue(quest, id);
  if (value == null) return null;
  return toLatexValue(value);
}

function getNumberValue(quest: SM201FeedbackQuest, id: string) {
  const value = getSlotValue(quest, id);
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) return Number(value);
  return null;
}

function emptyResult(): Omit<FeedbackContent, "hint"> {
  return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
}

export function solveSM201(quest: SM201FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
  ];

  if (quest.stage === "ARCHITECT" && quest.type === "EXPAND") {
    if (quest.isFactor) {
      const a = getLatexValue(quest, "a_root");
      const b = getLatexValue(quest, "b_root");
      if (!a || !b) return emptyResult();

      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "(a+b)^2 = a^2 + 2ab + b^2"),
        makeStep(3, t("common.feedback_reasons.identify_given_values"), `a = ${a},\\; b = ${b}`),
        makeStep(4, t("common.feedback_reasons.solve_step_by_step"), `${quest.expressionLatex} = (${a} + ${b})^2`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `(${a} + ${b})^2`, "key")
      );
    } else {
      if (quest.ca === undefined || quest.vb === undefined) return emptyResult();
      const a = quest.ca === 1 ? "x" : `${quest.ca}x`;
      const b = `${quest.vb}`;
      const a2 = getNumberValue(quest, "a2");
      const ab = getNumberValue(quest, "ab");
      const b2 = getNumberValue(quest, "b2");
      if (a2 === null || ab === null || b2 === null) return emptyResult();

      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "(a+b)^2 = a^2 + 2ab + b^2"),
        makeStep(3, t("common.feedback_reasons.identify_given_values"), `a = ${a},\\; b = ${b}`),
        makeStep(4, t("common.feedback_reasons.substitute_values"), `(${a} + ${b})^2 = ${a2 === 1 ? "x^2" : `${a2}x^2`} + ${ab}x + ${b2}`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${a2 === 1 ? "x^2" : `${a2}x^2`} + ${ab}x + ${b2}`, "key")
      );
    }
  } else if (quest.stage === "SCRAPPER" && quest.type === "SCRAPPER") {
    const a = getLatexValue(quest, "a");
    const b = getLatexValue(quest, "b");
    if (!a || !b) return emptyResult();

    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "(a+b)^2 = a^2 + 2ab + b^2"),
      makeStep(3, t("common.feedback_reasons.identify_given_values"), `a = ${a},\\; b = ${b}`),
      makeStep(4, t("common.feedback_reasons.solve_step_by_step"), `${quest.expressionLatex} = (${a} + ${b})^2`),
      makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `(${a} + ${b})^2`, "key")
    );
  } else if (quest.stage === "SPEEDSTER" && quest.type === "SPEEDSTER") {
    if (
      quest.roundBase === undefined ||
      quest.offset === undefined ||
      quest.sign === undefined ||
      quest.a2 === undefined ||
      quest.middle === undefined ||
      quest.b2 === undefined ||
      quest.target === undefined
    ) {
      return emptyResult();
    }
    const signToken = quest.sign === "-" ? "-" : "+";
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "(a\\pm b)^2 = a^2 \\pm 2ab + b^2"),
      makeStep(3, t("common.feedback_reasons.identify_given_values"), `a = ${quest.roundBase},\\; b = ${quest.offset}`),
      makeStep(4, t("common.feedback_reasons.substitute_values"), `(${quest.roundBase} ${signToken} ${quest.offset})^2 = ${quest.a2} ${signToken} ${Math.abs(quest.middle)} + ${quest.b2}`),
      makeStep(5, t("common.feedback_reasons.compute_result"), `${quest.a2} ${signToken} ${Math.abs(quest.middle)} + ${quest.b2} = ${quest.target}`),
      makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `${quest.target}`, "key")
    );
  } else if (quest.stage === "ELITE" && quest.type === "ELITE") {
    const a = getLatexValue(quest, "base");
    const b = getLatexValue(quest, "sub");
    const crossTerm = getLatexValue(quest, "add_term");
    const constTerm = getLatexValue(quest, "const_term");
    if (!a || !b || !crossTerm || !constTerm) return emptyResult();

    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "(a-b)^2 = a^2 - 2ab + b^2"),
      makeStep(3, t("common.feedback_reasons.identify_given_values"), `a = ${a},\\; b = ${b}`),
      makeStep(4, t("common.feedback_reasons.solve_step_by_step"), `a^2 - b^2 = (a-b)^2 + 2ab - 2b^2`),
      makeStep(5, t("common.feedback_reasons.substitute_values"), `${quest.expressionLatex} = (${a} - ${b})^2 + ${crossTerm} - ${constTerm}`),
      makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex || quest.targetLatex, "key")
    );
  } else if (quest.stage === "VOYAGER" && quest.type === "DIFFERENCE") {
    const a = getLatexValue(quest, "a");
    const b = getLatexValue(quest, "b");

    if (quest.subType === "FACTOR") {
      if (!a || !b) return emptyResult();
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "a^2 - b^2 = (a+b)(a-b)"),
        makeStep(3, t("common.feedback_reasons.identify_given_values"), `a = ${a},\\; b = ${b}`),
        makeStep(4, t("common.feedback_reasons.solve_step_by_step"), `${quest.expressionLatex} = (${a} + ${b})(${a} - ${b})`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `(${a} + ${b})(${a} - ${b})`, "key")
      );
    } else {
      const part1 = getNumberValue(quest, "part1");
      const part2 = getNumberValue(quest, "part2");
      if (part1 === null || part2 === null || !a || !b) return emptyResult();
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "(a+b)(a-b) = a^2 - b^2"),
        makeStep(3, t("common.feedback_reasons.identify_given_values"), `a = ${a},\\; b = ${b}`),
        makeStep(4, t("common.feedback_reasons.substitute_values"), `(${a} + ${b})(${a} - ${b}) = ${part1}x^{2} - ${part2}${String(b).includes("y") ? "y^{2}" : ""}`),
        makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex || quest.targetLatex, "key")
      );
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
