import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "ANIMAL_CLASSIFICATION" | "ADAPTATIONS" | "BEHAVIOR_EVOLUTION";

export interface SB105SolverQuest extends Quest {
  stage: Stage;
  animalName: string;
  scientificName: string;
}

function buildRuleLatex(quest: SB105SolverQuest) {
  if (quest.stage === "ANIMAL_CLASSIFICATION") {
    return "\\text{Use the defining anatomical traits of the animal group to classify the organism}";
  }
  if (quest.stage === "ADAPTATIONS") {
    return "\\text{Match the organism to the environment or adaptation that improves survival there}";
  }
  if (quest.stage === "BEHAVIOR_EVOLUTION") {
    return "\\text{Interpret the behavior in terms of survival, reproduction, migration, or conservation pressure}";
  }
  return null;
}

function buildSolveLatex(quest: SB105SolverQuest) {
  return `\\text{Use the clues for } ${escapeLatexText(quest.animalName)} \\text{ (} ${quest.scientificName} \\text{) to justify the answer}`;
}

export function solveSB105(quest: SB105SolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest);
  const solveLatex = buildSolveLatex(quest);
  if (!ruleLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
