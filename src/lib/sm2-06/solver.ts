import type { FeedbackContent, Quest, Slot } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SystemsVisual } from "@/components/chamber/sm2-06/AlchemistCanvas";

type Stage = "SUBSTITUTION" | "ELIMINATION" | "MISSION";

export interface SM206FeedbackQuest extends Quest {
  stage: Stage;
  visual: SystemsVisual;
  slots: Slot[];
}

function emptyResult(): Omit<FeedbackContent, "hint"> {
  return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
}

function getExpectedNumber(quest: SM206FeedbackQuest, id: string) {
  const value = quest.slots.find((slot) => slot.id === id)?.expected;
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) return Number(value);
  return null;
}

function formatEquation(eq: { a: number; b: number; c: number }) {
  const bTerm = eq.b < 0 ? `${eq.b}y` : `+ ${eq.b}y`;
  return `${eq.a}x ${bTerm} = ${formatNumber(eq.c)}`;
}

function eliminationPlan(visual: SystemsVisual) {
  const { eq1, eq2 } = visual;
  const canEliminateX = Math.abs(eq1.a) === Math.abs(eq2.a) || eq1.a === 1 || eq2.a === 1;
  const variable = canEliminateX ? "x" : "y";

  if (variable === "x") {
    const factor1 = eq2.a === 0 ? 1 : Math.abs(eq2.a);
    const factor2 = eq1.a === 0 ? 1 : Math.abs(eq1.a);
    return { variable, factor1, factor2 };
  }

  const factor1 = eq2.b === 0 ? 1 : Math.abs(eq2.b);
  const factor2 = eq1.b === 0 ? 1 : Math.abs(eq1.b);
  return { variable, factor1, factor2 };
}

export function solveSM206(quest: SM206FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const x = getExpectedNumber(quest, "x");
  const y = getExpectedNumber(quest, "y");
  if (x === null || y === null) return emptyResult();

  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
  ];

  if (quest.stage === "SUBSTITUTION") {
    const isolatedVar = quest.expressionLatex.includes("x =") ? "x" : "y";
    const solvedVar = isolatedVar === "x" ? "y" : "x";
    const solvedValue = isolatedVar === "x" ? y : x;
    const backValue = isolatedVar === "x" ? x : y;

    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("math.sm2_06.solver.substitution_rule")}}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("math.sm2_06.solver.solve_for_label", { variable: solvedVar })}}\\; ${solvedVar} = ${formatNumber(solvedValue)}`),
      makeStep(4, t("common.feedback_reasons.substitute_values"), `\\text{${t("math.sm2_06.solver.back_substitute_label", { variable: isolatedVar })}}\\; ${isolatedVar} = ${formatNumber(backValue)}`),
      makeStep(5, t("common.feedback_reasons.state_final_result"), `x = ${formatNumber(x)},\\; y = ${formatNumber(y)}`, "key")
    );
  } else if (quest.stage === "ELIMINATION") {
    const plan = eliminationPlan(quest.visual);
    const solvedVar = plan.variable === "x" ? "y" : "x";
    const solvedValue = solvedVar === "x" ? x : y;
    const backVar = solvedVar === "x" ? "y" : "x";
    const backValue = backVar === "x" ? x : y;

    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("math.sm2_06.solver.elimination_rule")}}`),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${plan.factor1}\\left(${formatEquation(quest.visual.eq1)}\\right),\\; ${plan.factor2}\\left(${formatEquation(quest.visual.eq2)}\\right)`),
      makeStep(4, t("common.feedback_reasons.compute_result"), `\\text{${t("math.sm2_06.solver.eliminate_and_solve_label", { eliminate: plan.variable, solve: solvedVar })}}\\; ${solvedVar} = ${formatNumber(solvedValue)}`),
      makeStep(5, t("common.feedback_reasons.substitute_values"), `\\text{${t("math.sm2_06.solver.back_substitute_label", { variable: backVar })}}\\; ${backVar} = ${formatNumber(backValue)}`),
      makeStep(6, t("common.feedback_reasons.state_final_result"), `x = ${formatNumber(x)},\\; y = ${formatNumber(y)}`, "key")
    );
  } else if (quest.stage === "MISSION") {
    const preferSubstitution =
      Math.abs(quest.visual.eq1.a) === 1 ||
      Math.abs(quest.visual.eq1.b) === 1 ||
      Math.abs(quest.visual.eq2.a) === 1 ||
      Math.abs(quest.visual.eq2.b) === 1;

    steps.push(
      makeStep(
        2,
        t("common.feedback_reasons.select_formula_or_rule"),
        preferSubstitution
          ? `\\text{${t("math.sm2_06.solver.choose_substitution")}}`
          : `\\text{${t("math.sm2_06.solver.choose_elimination")}}`
      ),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${formatEquation(quest.visual.eq1)},\\; ${formatEquation(quest.visual.eq2)}`),
      makeStep(4, t("common.feedback_reasons.compute_result"), `\\text{${t("math.sm2_06.solver.solve_system_label")}}\\; x = ${formatNumber(x)},\\; y = ${formatNumber(y)}`),
      makeStep(5, t("common.feedback_reasons.state_final_result"), quest.correctLatex || `x = ${formatNumber(x)},\\; y = ${formatNumber(y)}`, "key")
    );
  } else {
    return emptyResult();
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
