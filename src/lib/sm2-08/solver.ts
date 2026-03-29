import type { FeedbackContent, Quest, Slot } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, formatNumber, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "BASIC_PROB" | "LOTTERY" | "COMBINED" | "DATA_STATS";

export interface SM208FeedbackQuest extends Quest {
  stage: Stage;
  context?: string;
  scenario?: string;
}

function getSlot(quest: SM208FeedbackQuest, id?: string) {
  if (id) return quest.slots.find((slot) => slot.id === id) ?? null;
  return quest.slots[0] ?? null;
}

function getExpectedNumber(slot: Slot | null) {
  if (!slot) return null;
  if (typeof slot.expected === "number") return slot.expected;
  const numeric = Number(slot.expected);
  return Number.isFinite(numeric) ? numeric : null;
}

function formatExpected(slot: Slot | null) {
  const expected = getExpectedNumber(slot);
  if (expected === null) return null;
  if (slot?.unit === "%") return `${formatNumber(expected)}\\%`;
  if (slot?.unit === "degC") return `${formatNumber(expected)}^\\circ\\mathrm{C}`;
  if (slot?.unit === "CHF") return `${formatNumber(expected)}\\text{ CHF}`;
  return formatNumber(expected);
}

function buildProbabilitySteps(quest: SM208FeedbackQuest, t: Translator) {
  const slot = getSlot(quest, "P");
  const finalValue = formatExpected(slot);
  if (!slot || finalValue === null) return null;

  const expr = quest.expressionLatex;
  const steps = [
    makeStep(1, t("math.sm2_10.reasons.identify_sample_space"), expr),
  ];

  if (quest.id === "L20") {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "P(\\text{exactly one pair}) = \\frac{13\\binom{4}{2}\\binom{12}{3}4^3}{\\binom{52}{5}}"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "P \\approx 0.423"),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `P \\approx ${finalValue}`, "key")
    );
    return steps;
  }

  if (quest.stage === "COMBINED") {
    if (expr.includes("1 -")) {
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "P(\\text{at least one success}) = 1 - P(\\text{no success})"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `P = ${expr}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `P = ${finalValue}`, "key")
      );
      return steps;
    }

    if (expr.includes("^") || expr.includes("\\times")) {
      const rule = quest.id === "CA2" || quest.id === "CE3"
        ? "P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}"
        : "P(\\text{independent events}) = P(A)\\cdot P(B)\\cdots";
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), rule),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `P = ${expr}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `P = ${finalValue}`, "key")
      );
      return steps;
    }
  }

  if (quest.stage === "LOTTERY" && expr.includes("\\times")) {
    steps.push(
      makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "P(\\text{without replacement}) = P(A_1)\\cdot P(A_2)\\cdots"),
      makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `P = ${expr}`),
      makeStep(4, t("common.feedback_reasons.state_final_result"), `P = ${finalValue}`, "key")
    );
      return steps;
  }

  steps.push(
    makeStep(
      2,
      t("math.sm2_10.reasons.apply_probability_ratio"),
      `P(E)=\\frac{\\text{${escapeLatexText(t("math.sm2_08.solver.favorable_outcomes_label"))}}}{\\text{${escapeLatexText(t("math.sm2_08.solver.total_outcomes_label"))}}}`
    ),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `P = ${expr}`),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `P = ${finalValue}`, "key")
  );
  return steps;
}

function buildStatsSteps(quest: SM208FeedbackQuest, t: Translator) {
  const slot = getSlot(quest);
  if (!slot) return null;

  const finalValue = formatExpected(slot);
  if (finalValue === null) return null;

  const expr = quest.expressionLatex;
  const steps = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), expr),
  ];

  switch (slot.id) {
    case "avg":
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          expr.includes("\\times") ? "\\bar{x}_w = \\frac{\\sum w_ix_i}{\\sum w_i}" : "\\bar{x} = \\frac{\\sum x_i}{n}"
        ),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${slot.labelLatex} = ${expr}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${finalValue}`, "key")
      );
      return steps;

    case "T":
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `T = \\text{${escapeLatexText(t("math.sm2_08.solver.sum_all_values_label"))}}`),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `T = ${expr}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `T = ${finalValue}`, "key")
      );
      return steps;

    case "M":
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          expr.includes("\\frac{") ? "M = \\frac{x_{mid1}+x_{mid2}}{2}" : `M = \\text{${escapeLatexText(t("math.sm2_08.solver.middle_ordered_value_label"))}}`
        ),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${slot.labelLatex} = ${expr}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${finalValue}`, "key")
      );
      return steps;

    case "Mo":
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `Mo = \\text{${escapeLatexText(t("math.sm2_08.solver.most_frequent_value_label"))}}`),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), expr),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `Mo = ${finalValue}`, "key")
      );
      return steps;

    case "R":
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          `R = \\text{${escapeLatexText(t("math.sm2_08.solver.max_label"))}} - \\text{${escapeLatexText(t("math.sm2_08.solver.min_label"))}}`
        ),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${slot.labelLatex} = ${expr}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${finalValue}`, "key")
      );
      return steps;

    case "Q1":
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `Q_1 = \\text{${escapeLatexText(t("math.sm2_08.solver.lower_quartile_label"))}}`),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), expr),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `Q_1 = ${finalValue}`, "key")
      );
      return steps;

    case "var":
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "\\sigma^2 = \\frac{\\sum (x_i-\\bar{x})^2}{n}"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${slot.labelLatex} = ${expr}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${finalValue}`, "key")
      );
      return steps;

    case "IQR":
      steps.push(
        makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), "IQR = Q_3 - Q_1"),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `IQR = ${expr}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `IQR = ${finalValue}`, "key")
      );
      return steps;

    case "pct":
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          `\\Delta\\% = \\frac{\\text{${escapeLatexText(t("math.sm2_08.solver.new_label"))}} - \\text{${escapeLatexText(t("math.sm2_08.solver.old_label"))}}}{\\text{${escapeLatexText(t("math.sm2_08.solver.old_label"))}}}\\times 100`
        ),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${slot.labelLatex} = ${expr}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${finalValue}`, "key")
      );
      return steps;

    case "P":
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          `\\% = \\frac{\\text{${escapeLatexText(t("math.sm2_08.solver.part_label"))}}}{\\text{${escapeLatexText(t("math.sm2_08.solver.whole_label"))}}}\\times 100`
        ),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `${slot.labelLatex} = ${expr}`),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `${slot.labelLatex} = ${finalValue}`, "key")
      );
      return steps;

    case "r":
      {
      const expected = getExpectedNumber(slot);
      const trendLabel = expected !== null && expected < 0
        ? t("math.sm2_08.solver.negative_correlation_label")
        : t("math.sm2_08.solver.positive_correlation_label");
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          `r > 0\\Rightarrow \\text{${escapeLatexText(t("math.sm2_08.solver.positive_correlation_label"))}},\\quad r < 0\\Rightarrow \\text{${escapeLatexText(t("math.sm2_08.solver.negative_correlation_label"))}}`
        ),
        makeStep(3, t("common.feedback_reasons.solve_step_by_step"), expr),
        makeStep(4, t("common.feedback_reasons.state_final_result"), `r\\text{ (${escapeLatexText(trendLabel)})}`, "key")
      );
      return steps;
      }

    default:
      return null;
  }
}

export function solveSM208(quest: SM208FeedbackQuest, t: Translator): Omit<FeedbackContent, "hint"> {
  const steps = quest.stage === "DATA_STATS"
    ? buildStatsSteps(quest, t)
    : buildProbabilitySteps(quest, t);

  if (!steps || steps.length === 0) {
    return { steps: [], fullSolutionLatex: null, hasFullSolution: false };
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
    hasFullSolution: true,
  };
}
