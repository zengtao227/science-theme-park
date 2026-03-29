import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { escapeLatexText } from "@/lib/feedback/solverSupport";
import type { S105Quest } from "@/lib/sm1-05/types";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps.map((s) => `\\text{${escapeLatexText(s.justification)}} \\implies ${s.expressionLatex}`).join(" \\\\ ");
}

function stringifyValue(value: string | number | boolean | undefined) {
  if (typeof value === "boolean") return value ? "true" : "false";
  if (value == null) return "";
  return `${value}`;
}

function getExpectedLatex(quest: S105Quest) {
  if (quest.slots.length === 1) {
    return `${quest.slots[0].expected}`;
  }
  return quest.slots.map((slot) => `${slot.labelLatex}=${slot.expected}`).join(",\\;");
}

function getRecipeGivenLatex(quest: S105Quest, t: Translator) {
  const { ingredient, baseAmount, targetAmount } = quest.visualData;
  const parts = [
    ingredient ? `\\text{${escapeLatexText(t("sm1_05.labels.item"))}}=${escapeLatexText(ingredient)}` : "",
    typeof baseAmount === "number" ? `\\text{${escapeLatexText(t("sm1_05.labels.base"))}}=${baseAmount}` : "",
    typeof targetAmount === "number" ? `\\text{${escapeLatexText(t("sm1_05.labels.target"))}}=${targetAmount}` : "",
  ].filter(Boolean);
  return parts.join(",\\;") || (quest.expressionLatex ?? "");
}

function getPercentGivenLatex(quest: S105Quest) {
  const { percentage, totalValue, partValue } = quest.visualData;
  const parts = [
    typeof percentage === "number" ? `p=${percentage}\\%` : "",
    typeof totalValue === "number" ? `T=${totalValue}` : "",
    typeof partValue === "number" ? `P=${partValue}` : "",
  ].filter(Boolean);
  return parts.join(",\\;") || (quest.expressionLatex ?? "");
}

function getMixtureGivenLatex(quest: S105Quest, t: Translator) {
  const { solute, solvent } = quest.visualData;
  const total =
    typeof solute === "number" && typeof solvent === "number" ? solute + solvent : undefined;
  const parts = [
    typeof solute === "number" ? `\\text{${escapeLatexText(t("sm1_05.labels.solute"))}}=${solute}` : "",
    typeof solvent === "number" ? `\\text{${escapeLatexText(t("sm1_05.labels.solvent"))}}=${solvent}` : "",
    typeof total === "number" ? `\\text{${escapeLatexText(t("sm1_05.labels.total"))}}=${total}` : "",
  ].filter(Boolean);
  return parts.join(",\\;") || (quest.expressionLatex ?? "");
}

function getExpressionStep(quest: S105Quest) {
  return quest.expressionLatex?.trim() || quest.targetLatex?.trim() || "";
}

function buildFinalLatex(quest: S105Quest) {
  return quest.correctLatex?.trim() || getExpectedLatex(quest);
}

function summarizeRequestedOutputs(quest: S105Quest) {
  return quest.slots
    .map((slot) => `${slot.labelLatex}=${stringifyValue(slot.expected)}`)
    .join(",\\;");
}

export function solveSM105(
  quest: S105Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps: PlatformSolutionStep[] = [];
  const expression = getExpressionStep(quest);
  const finalLatex = buildFinalLatex(quest);

  if (!expression || !finalLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  if (quest.stage === "RECIPES") {
    steps.push(makeStep(1, t("sm1_05.reasons.identify_recipe_quantities"), getRecipeGivenLatex(quest, t)));
    steps.push(makeStep(2, t("sm1_05.reasons.setup_scaling_or_ratio"), expression));
    if (quest.slots.length > 1) {
      steps.push(makeStep(3, t("sm1_05.reasons.resolve_requested_quantities"), summarizeRequestedOutputs(quest), "key"));
    } else {
      steps.push(makeStep(3, t("sm1_05.reasons.compute_recipe_result"), finalLatex, "key"));
    }
  } else if (quest.stage === "PERCENT") {
    steps.push(makeStep(1, t("sm1_05.reasons.identify_percent_values"), getPercentGivenLatex(quest)));
    steps.push(makeStep(2, t("sm1_05.reasons.convert_or_apply_percentage"), expression));
    steps.push(makeStep(3, t("sm1_05.reasons.compute_percent_result"), finalLatex, "key"));
  } else {
    steps.push(makeStep(1, t("sm1_05.reasons.identify_solution_components"), getMixtureGivenLatex(quest, t)));
    steps.push(makeStep(2, t("sm1_05.reasons.apply_mixture_formula"), expression));
    steps.push(makeStep(3, t("sm1_05.reasons.compute_mixture_result"), finalLatex, "key"));
  }

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
