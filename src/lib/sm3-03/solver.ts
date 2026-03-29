import type { FeedbackContent, Slot } from "@/hooks/useQuestManager";
import { buildFullSolution, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SM303FeedbackQuest } from "./provider";

function getSlot(quest: SM303FeedbackQuest, id?: string) {
  if (id) return quest.slots.find((slot) => slot.id === id) ?? null;
  return quest.slots[0] ?? null;
}

function asNumber(value: string | number | undefined) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  }
  return null;
}

function expectedValue(slot: Slot | null) {
  if (!slot) return null;
  if (typeof slot.expected === "string") return slot.expected;
  return formatNumber(slot.expected);
}

function solveExponential(quest: SM303FeedbackQuest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot) return null;

  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
  ];

  if (slot.id === "N" && quest.initialCount != null && quest.doublingTime != null && quest.time != null) {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "N(t)=N_0\\cdot 2^{t/d}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `N(t) = ${formatNumber(quest.initialCount)}\\cdot 2^{${formatNumber(quest.time)}/${formatNumber(quest.doublingTime)}}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `N(t) = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  if (slot.id === "n" && quest.initialCount != null && quest.finalCount != null) {
    const ratio = quest.finalCount / quest.initialCount;
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "N(t)=N_0\\cdot 2^n"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `2^n = \\frac{${formatNumber(quest.finalCount)}}{${formatNumber(quest.initialCount)}} = ${formatNumber(ratio)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `n = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  if (slot.id === "d" && quest.time != null && quest.initialCount != null && quest.finalCount != null) {
    const ratio = quest.finalCount / quest.initialCount;
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "N(t)=N_0\\cdot 2^{t/d}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `2^{t/d} = \\frac{${formatNumber(quest.finalCount)}}{${formatNumber(quest.initialCount)}} = ${formatNumber(ratio)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `d = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  if (slot.id === "t" && quest.doublingTime != null && quest.initialCount != null && quest.finalCount != null) {
    const ratio = quest.finalCount / quest.initialCount;
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "N(t)=N_0\\cdot 2^{t/d}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `2^{t/${formatNumber(quest.doublingTime)}} = \\frac{${formatNumber(quest.finalCount)}}{${formatNumber(quest.initialCount)}} = ${formatNumber(ratio)}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `t = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  if (slot.id === "k" && quest.doublingTime != null) {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "k = \\frac{\\ln 2}{d}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `k = \\frac{\\ln 2}{${formatNumber(quest.doublingTime)}}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `k = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  if (slot.id === "kd") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "2^{t/d} = e^{kt} \\Rightarrow kd = \\ln 2"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "kd = \\ln 2"),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `kd = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  return null;
}

function solveLogarithm(quest: SM303FeedbackQuest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot) return null;

  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
  ];

  if (slot.id === "t" && quest.initialCount != null && quest.finalCount != null && quest.doublingTime != null) {
    const ratio = quest.finalCount / quest.initialCount;
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "t = d\\cdot \\log_2\\!\\left(\\frac{N}{N_0}\\right)"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `t = ${formatNumber(quest.doublingTime)}\\cdot \\log_2\\!\\left(\\frac{${formatNumber(quest.finalCount)}}{${formatNumber(quest.initialCount)}}\\right) = ${formatNumber(quest.doublingTime)}\\cdot \\log_2(${formatNumber(ratio)})`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `t = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  if (slot.id === "x") {
    const transformedEquation =
      quest.expressionLatex === "\\log_2(x) + \\log_2(4) = 5" ? "\\log_2(4x)=5 \\Rightarrow 4x=2^5" :
      quest.expressionLatex === "\\log_2(x) = 3" ? "x = 2^3" :
      quest.expressionLatex === "\\log_x(16)=2" ? "x^2 = 16" :
      quest.expressionLatex === "\\ln(x)=0" ? "x = e^0" :
      quest.expressionLatex === "2\\log_2(x)=6" ? "\\log_2(x)=3 \\Rightarrow x=2^3" :
      quest.expressionLatex === "\\log_2(x+2)=3" ? "x+2 = 2^3" :
      quest.expressionLatex === "e^{2x}=1" ? "2x = \\ln(1)" :
      quest.expressionLatex === "\\log_{10}(x)=-1" ? "x = 10^{-1}" :
      "\\log_b(x)=y \\iff x=b^y";
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\log_b(x)=y \\iff x=b^y"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), transformedEquation),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `x = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  return null;
}

function solveApplications(quest: SM303FeedbackQuest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot) return null;

  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
  ];

  if (slot.id === "N" && quest.initialCount != null && quest.time != null && quest.chartMode === "halflife" && quest.doublingTime != null) {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "N(t)=N_0\\cdot \\left(\\frac{1}{2}\\right)^{t/h}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `N(t) = ${formatNumber(quest.initialCount)}\\cdot \\left(\\frac{1}{2}\\right)^{${formatNumber(quest.time)}/${formatNumber(quest.doublingTime)}}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `N(t) = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  if (slot.id === "A" && quest.initialCount != null && quest.time != null) {
    const rateMatch = quest.expressionLatex.match(/r=(\d+)\%/);
    const rate = rateMatch ? Number(rateMatch[1]) / 100 : null;
    if (rate != null) {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "A = P(1+r)^t"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `A = ${formatNumber(quest.initialCount)}(1+${formatNumber(rate)})^{${formatNumber(quest.time)}}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `A = ${expectedValue(slot)}`, "key")
      );
      return steps;
    }
  }

  if (slot.id === "r" && quest.initialCount != null && quest.finalCount != null && quest.time != null) {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\frac{P}{P_0} = (1+r)^t"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `(1+r)^{${formatNumber(quest.time)}} = \\frac{${formatNumber(quest.finalCount)}}{${formatNumber(quest.initialCount)}}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `r = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  if ((slot.id === "h" || slot.id === "t") && quest.initialCount != null && quest.finalCount != null && quest.chartMode === "halflife") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "N(t)=N_0\\cdot \\left(\\frac{1}{2}\\right)^{t/h}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\frac{${formatNumber(quest.finalCount)}}{${formatNumber(quest.initialCount)}} = \\left(\\frac{1}{2}\\right)^{t/h}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  if (slot.id === "pH") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\mathrm{pH} = -\\log_{10}[H^+]"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\mathrm{pH} = -\\log_{10}\\left(${quest.expressionLatex.replace(/^\[H\^\+\] = /, "").replace(/\\;\\mathrm\{mol\/L\}/, "")}\\right)`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `\\mathrm{pH} = ${expectedValue(slot)}`, "key")
    );
    return steps;
  }

  if (slot.id === "H") {
    const value = asNumber(slot.expected);
    if (value != null) {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "[H^+] = 10^{-\\mathrm{pH}}"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `[H^+] = 10^{${formatNumber(value)}}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
      );
      return steps;
    }
  }

  if (slot.id === "ratio") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\log_{10}\\!\\left(\\frac{I}{I_0}\\right)=2 \\Rightarrow \\frac{I}{I_0}=10^2"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\frac{I}{I_0}=100"),
      makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key")
    );
    return steps;
  }

  return null;
}

export function solveSM303(quest: SM303FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps =
    quest.stage === "EXPONENTIAL" ? solveExponential(quest, t) :
    quest.stage === "LOGARITHM" ? solveLogarithm(quest, t) :
    solveApplications(quest, t);

  if (!steps || steps.length === 0) {
    return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
