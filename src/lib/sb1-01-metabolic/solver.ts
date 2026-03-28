import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "OSMOSIS" | "RESPIRATION" | "HOMEOSTASIS";

export interface MetabolicSolverQuest extends Quest {
  stage: Stage;
  targetOsmolarity?: number;
  statusKey?: "hypertonic" | "hypotonic" | "isotonic";
}

function buildRuleLatex(quest: MetabolicSolverQuest) {
  if (quest.stage === "OSMOSIS") {
    return "\\text{Water moves from lower solute concentration to higher solute concentration}";
  }
  if (quest.stage === "RESPIRATION") {
    return "\\text{Use the cellular-respiration equation or the matching pathway fact}";
  }
  if (quest.stage === "HOMEOSTASIS") {
    return "\\text{Homeostasis uses set points and negative feedback to stabilize internal conditions}";
  }
  return null;
}

function buildSolveLatex(quest: MetabolicSolverQuest) {
  if (quest.stage === "OSMOSIS") {
    if (quest.statusKey === "hypertonic") return "\\text{The external solution is more concentrated, so water leaves the cell}";
    if (quest.statusKey === "hypotonic") return "\\text{The external solution is less concentrated, so water enters the cell}";
    return "\\text{Equal concentrations on both sides mean no net water movement}";
  }
  if (quest.stage === "RESPIRATION") {
    return "\\text{Identify the missing reactant, product, ATP yield, or respiration location from the pathway}";
  }
  return "\\text{Connect the physiological variable or hormone to its homeostatic role}";
}

export function solveSB101Metabolic(quest: MetabolicSolverQuest, t: Translator) {
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
