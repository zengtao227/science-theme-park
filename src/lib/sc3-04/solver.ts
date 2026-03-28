import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { SC304Quest } from "./types";

const GROUP_RULE_KEYS: Record<string, string> = {
  hydroxyl: "chemistry.sc3_04.solver.rule_hydroxyl",
  carboxyl: "chemistry.sc3_04.solver.rule_carboxyl",
  aldehyde: "chemistry.sc3_04.solver.rule_aldehyde",
  ketone: "chemistry.sc3_04.solver.rule_ketone",
};

function buildGivenLatex(quest: SC304Quest) {
  if (quest.formula && quest.moleculeName) {
    return `\\text{${escapeLatexText(quest.moleculeName)}}: ${quest.formula}`;
  }
  if (quest.propA && quest.propB) {
    return `\\text{${escapeLatexText(quest.propA)}} \\text{ ? } \\text{${escapeLatexText(quest.propB)}}`;
  }
  return quest.expressionLatex || quest.promptLatex;
}

function buildPropertyRule(quest: SC304Quest, t: Translator) {
  if (quest.comparisonType === "sol") {
    return `\\text{${t("chemistry.sc3_04.solver.rule_solubility")}}`;
  }
  return `\\text{${t("chemistry.sc3_04.solver.rule_intermolecular_forces")}}`;
}

export function solveSC304(quest: SC304Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), buildGivenLatex(quest))];

  switch (quest.stage) {
    case "ALCOHOLS":
    case "ACIDS": {
      const groupKey = quest.characteristicGroup;
      if (!groupKey) {
        return { steps: [], fullSolutionLatex: null };
      }
      const ruleKey = GROUP_RULE_KEYS[groupKey];
      const ruleLatex = ruleKey ? `\\text{${t(ruleKey)}}` : null;
      if (!ruleLatex) {
        return { steps: [], fullSolutionLatex: null };
      }
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex));
      break;
    }
    case "ESTERS":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), buildPropertyRule(quest, t)));
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\text{${t("chemistry.sc3_04.solver.choose_stronger_interactions")}}`
        )
      );
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), `\\text{${escapeLatexText(quest.correctLatex)}}`, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
