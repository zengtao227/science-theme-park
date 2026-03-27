import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { GC302Quest } from "./quests";

function getRuleLatex(stage: GC302Quest["stage"]) {
  switch (stage) {
    case "SC":
      return "\\text{Simple cubic has 1 atom per cell, coordination number 6, and packing efficiency about } 52\\%";
    case "BCC":
      return "\\text{Body-centered cubic has 2 atoms per cell, coordination number 8, and packing efficiency about } 68\\%";
    case "FCC":
      return "\\text{Face-centered cubic has 4 atoms per cell, coordination number 12, and packing efficiency about } 74\\%";
    default:
      return null;
  }
}

export function solveGC302(quest: GC302Quest, t: Translator) {
  const ruleLatex = getRuleLatex(quest.stage);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), `\\text{Lattice type: } \\text{${quest.stage}}`),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), "\\text{Read off the lattice property requested in the prompt from the structure type}"),
    makeStep(4, t("common.feedback_reasons.state_final_result"), `\\text{${quest.correctLatex}}`, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
