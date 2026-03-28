import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "MITOSIS" | "MEIOSIS_I" | "MEIOSIS_II";

export interface SB103SolverQuest extends Quest {
  stage: Stage;
  phase: string;
  chromosomeCount: number;
}

function buildRuleLatex(quest: SB103SolverQuest) {
  if (quest.stage === "MITOSIS") {
    return "\\text{Track chromosome and chromatid behavior through mitosis}";
  }
  if (quest.stage === "MEIOSIS_I") {
    return "\\text{In meiosis I, homologous chromosomes pair and then separate, reducing ploidy}";
  }
  if (quest.stage === "MEIOSIS_II") {
    return "\\text{In meiosis II, sister chromatids separate in a mitosis-like division}";
  }
  return null;
}

function buildSolveLatex(quest: SB103SolverQuest) {
  const phase = escapeLatexText(quest.phase.replace(/_/g, " "));
  if (quest.stage === "MITOSIS") {
    return `\\text{In } ${phase}\\text{, track whether sister chromatids are still paired or already separated; the prompt is testing the value } ${quest.chromosomeCount}`;
  }
  if (quest.stage === "MEIOSIS_I") {
    return `\\text{In } ${phase}\\text{, homologous chromosomes pair and then separate, so the chromosome count is interpreted before chromatids split; the relevant count is } ${quest.chromosomeCount}`;
  }
  return `\\text{In } ${phase}\\text{, meiosis II separates sister chromatids in a mitosis-like step; use that to justify the count } ${quest.chromosomeCount}`;
}

export function solveSB103(quest: SB103SolverQuest, t: Translator) {
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
