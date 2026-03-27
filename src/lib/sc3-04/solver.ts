import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { SC304Quest } from "./types";

const GROUP_RULES: Record<string, string> = {
  hydroxyl: "\\text{Alcohols are identified by the hydroxyl group } -OH",
  carboxyl: "\\text{Carboxylic acids contain the carboxyl group } -COOH",
  aldehyde: "\\text{Aldehydes contain a terminal } -CHO \\text{ group}",
  ketone: "\\text{Ketones contain a carbonyl group within the carbon chain}",
};

function buildGivenLatex(quest: SC304Quest) {
  if (quest.formula && quest.moleculeName) {
    return `\\text{${escapeLatexText(quest.moleculeName)}}: ${quest.formula}`;
  }
  if (quest.propA && quest.propB) {
    return `\\text{Compare } ${escapeLatexText(quest.propA)} \\text{ with } ${escapeLatexText(quest.propB)}`;
  }
  return quest.expressionLatex || quest.promptLatex;
}

function buildPropertyRule(quest: SC304Quest) {
  if (quest.comparisonType === "sol") {
    return "\\text{Greater water solubility usually comes from stronger polarity and hydrogen bonding with water}";
  }
  if (quest.correctLatex.toLowerCase().includes("acid")) {
    return "\\text{Carboxylic acids form especially strong intermolecular hydrogen bonding, raising the boiling point}";
  }
  if (quest.correctLatex.toLowerCase().includes("ol") || quest.correctLatex.toLowerCase().includes("ethanol")) {
    return "\\text{Alcohols can donate and accept hydrogen bonds, so they boil higher than aldehydes or ketones of similar size}";
  }
  return "\\text{Compare intermolecular forces to determine which molecule has the stronger attraction between particles}";
}

export function solveSC304(quest: SC304Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), buildGivenLatex(quest))];

  switch (quest.stage) {
    case "ALCOHOLS":
    case "ACIDS": {
      const groupKey = quest.characteristicGroup ?? quest.correctLatex.toLowerCase();
      const ruleLatex = GROUP_RULES[groupKey];
      if (!ruleLatex) {
        return { steps: [], fullSolutionLatex: null };
      }
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex));
      break;
    }
    case "ESTERS":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), buildPropertyRule(quest)));
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\text{The molecule with the stronger intermolecular forces is } \\text{${escapeLatexText(quest.correctLatex)}}`
        )
      );
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), `\\text{${escapeLatexText(quest.correctLatex)}}`, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
