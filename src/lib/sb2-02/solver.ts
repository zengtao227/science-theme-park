import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "DIGESTIVE" | "CIRCULATORY" | "RESPIRATORY";

export interface SB202SolverQuest extends Quest {
  stage: Stage;
  organ?: string;
  system?: string;
}

function clueLatex(quest: SB202SolverQuest, t: Translator) {
  if (quest.organ) {
    return `\\text{${escapeLatexText(t("biology.sb2_02.solver.organ_clue_label"))}} ${escapeLatexText(quest.organ.replace(/_/g, " "))}`;
  }
  if (quest.system) {
    return `\\text{${escapeLatexText(t("biology.sb2_02.solver.system_clue_label"))}} ${escapeLatexText(quest.system.replace(/_/g, " "))}`;
  }
  return `\\text{${escapeLatexText(t(`biology.sb2_02.stages.${quest.stage.toLowerCase()}`))}}`;
}

function buildRuleLatex(quest: SB202SolverQuest, t: Translator) {
  if (quest.stage === "DIGESTIVE") return `\\text{${escapeLatexText(t("biology.sb2_02.solver.rule_digestive"))}}`;
  if (quest.stage === "CIRCULATORY") return `\\text{${escapeLatexText(t("biology.sb2_02.solver.rule_circulatory"))}}`;
  if (quest.stage === "RESPIRATORY") return `\\text{${escapeLatexText(t("biology.sb2_02.solver.rule_respiratory"))}}`;
  return null;
}

function buildSolveLatex(quest: SB202SolverQuest, t: Translator) {
  if (quest.organ) {
    return `\\text{${escapeLatexText(t("biology.sb2_02.solver.solve_with_organ", { organ: quest.organ }))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_02.solver.solve_default"))}}`;
}

function traceLatex(quest: SB202SolverQuest, t: Translator) {
  if (quest.stage === "DIGESTIVE") return `\\text{${escapeLatexText(t("biology.sb2_02.solver.digestive_step"))}}`;
  if (quest.stage === "CIRCULATORY") return `\\text{${escapeLatexText(t("biology.sb2_02.solver.circulatory_step"))}}`;
  return `\\text{${escapeLatexText(t("biology.sb2_02.solver.respiratory_step"))}}`;
}

export function solveSB202(quest: SB202SolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!ruleLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("biology.sb2_02.solver.extract_key_clue"), clueLatex(quest, t)),
    makeStep(4, t("biology.sb2_02.solver.trace_system_role"), traceLatex(quest, t)),
    makeStep(5, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
