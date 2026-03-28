import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "ANIMAL_CLASSIFICATION" | "ADAPTATIONS" | "BEHAVIOR_EVOLUTION";

export interface SB105SolverQuest extends Quest {
  stage: Stage;
  animalName: string;
  scientificName: string;
}

function buildRuleLatex(quest: SB105SolverQuest, t: Translator) {
  if (quest.stage === "ANIMAL_CLASSIFICATION") {
    return `\\text{${escapeLatexText(t("biology.sb1_05.solver.rule_animal_classification"))}}`;
  }
  if (quest.stage === "ADAPTATIONS") {
    return `\\text{${escapeLatexText(t("biology.sb1_05.solver.rule_adaptations"))}}`;
  }
  if (quest.stage === "BEHAVIOR_EVOLUTION") {
    return `\\text{${escapeLatexText(t("biology.sb1_05.solver.rule_behavior_evolution"))}}`;
  }
  return null;
}

function buildSolveLatex(quest: SB105SolverQuest, t: Translator) {
  return `\\text{${escapeLatexText(t("biology.sb1_05.solver.solve_use_clues", {
    animalName: quest.animalName,
    scientificName: quest.scientificName,
  }))}}`;
}

export function solveSB105(quest: SB105SolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!ruleLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
