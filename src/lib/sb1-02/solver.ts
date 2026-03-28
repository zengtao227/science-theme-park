import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "EQUATION" | "FACTORS" | "CHLOROPLAST";

export interface SB102SolverQuest extends Quest {
  stage: Stage;
  factor?: string;
  structure?: string;
}

function buildRuleLatex(quest: SB102SolverQuest) {
  if (quest.stage === "EQUATION") {
    return "\\text{Use the balanced photosynthesis equation and the light-reaction / Calvin-cycle facts}";
  }
  if (quest.stage === "FACTORS") {
    return "\\text{Rate changes depend on limiting factors such as light, CO}_2\\text{, temperature, and stomata}";
  }
  if (quest.stage === "CHLOROPLAST") {
    return "\\text{Match each chloroplast structure to the process or role it performs}";
  }
  return null;
}

function buildSolveLatex(quest: SB102SolverQuest) {
  if (quest.stage === "EQUATION") {
    return "\\text{Identify the missing molecule, count, or process from the photosynthesis pathway}";
  }
  if (quest.stage === "FACTORS") {
    return `\\text{Use the effect of } \\text{${quest.factor || "the factor"}} \\text{ on photosynthesis to determine the answer}`;
  }
  return `\\text{The chloroplast structure } \\text{${quest.structure || "in the prompt"}} \\text{ is recognized by its function}`;
}

export function solveSB102(quest: SB102SolverQuest, t: Translator) {
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
