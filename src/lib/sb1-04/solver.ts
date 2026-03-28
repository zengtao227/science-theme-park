import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "PLANT_STRUCTURE" | "WATER_TRANSPORT" | "NUTRIENT_TRANSPORT";

export interface SB104SolverQuest extends Quest {
  stage: Stage;
  structure?: string;
  function?: string;
}

function buildRuleLatex(quest: SB104SolverQuest) {
  if (quest.stage === "PLANT_STRUCTURE") {
    return "\\text{Match each plant structure to the function it performs}";
  }
  if (quest.stage === "WATER_TRANSPORT") {
    return "\\text{Use transpiration, cohesion-tension, or adaptation concepts to explain the response}";
  }
  if (quest.stage === "NUTRIENT_TRANSPORT") {
    return "\\text{Apply phloem source-sink transport and plant signaling concepts}";
  }
  return null;
}

function buildSolveLatex(quest: SB104SolverQuest) {
  if (quest.stage === "PLANT_STRUCTURE") {
    return `\\text{Use the role of } \\text{${quest.structure || "the structure"}} \\text{ to determine the answer}`;
  }
  if (quest.stage === "WATER_TRANSPORT") {
    return "\\text{Relate the prompt to water uptake, transpiration, or the plant adaptation being described}";
  }
  return "\\text{Relate the prompt to phloem transport, source-sink behavior, or plant hormonal signaling}";
}

export function solveSB104(quest: SB104SolverQuest, t: Translator) {
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
