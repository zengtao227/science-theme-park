import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "DIGESTIVE" | "CIRCULATORY" | "RESPIRATORY";

export interface SB202BodySystemsSolverQuest extends Quest {
  stage: Stage;
  systemType?: string;
  organPath?: string[];
}

function buildClueLatex(quest: SB202BodySystemsSolverQuest, t: Translator) {
  if (quest.organPath?.length) {
    return `\\text{${escapeLatexText(t("biology.sb2_02.solver.route_clue_label"))}} ${quest.organPath.map((part) => `\\text{${escapeLatexText(part)}}`).join(" \\to ")}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_02.solver.system_clue_label"))}} ${escapeLatexText(quest.systemType || t("biology.sb2_02.solver.default_system"))}`;
}

function buildTraceLatex(quest: SB202BodySystemsSolverQuest, t: Translator) {
  if (quest.stage === "DIGESTIVE") {
    return `\\text{${escapeLatexText(t("biology.sb2_02.solver.trace_digestive_pattern"))}}`;
  }
  if (quest.stage === "CIRCULATORY") {
    return `\\text{${escapeLatexText(t("biology.sb2_02.solver.trace_circulatory_pattern"))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_02.solver.trace_respiratory_pattern"))}}`;
}

function buildRuleLatex(quest: SB202BodySystemsSolverQuest, t: Translator) {
  if (quest.stage === "DIGESTIVE") return `\\text{${escapeLatexText(t("biology.sb2_02.solver.rule_digestive"))}}`;
  if (quest.stage === "CIRCULATORY") return `\\text{${escapeLatexText(t("biology.sb2_02.solver.rule_circulatory"))}}`;
  if (quest.stage === "RESPIRATORY") return `\\text{${escapeLatexText(t("biology.sb2_02.solver.rule_respiratory"))}}`;
  return null;
}

function buildSolveLatex(quest: SB202BodySystemsSolverQuest, t: Translator) {
  if (quest.organPath?.length) {
    return `\\text{${escapeLatexText(t("biology.sb2_02.solver.trace_route"))}}\\; ${quest.organPath.map((part) => `\\text{${escapeLatexText(part)}}`).join(" \\to ")}\\; \\text{${escapeLatexText(t("biology.sb2_02.solver.identify_missing_component"))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_02.solver.solve_system_clue", {
    system: quest.systemType || t("biology.sb2_02.solver.default_system"),
  }))}}`;
}

export function solveSB202BodySystems(quest: SB202BodySystemsSolverQuest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest, t);
  const clueLatex = buildClueLatex(quest, t);
  const traceLatex = buildTraceLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!ruleLatex || !clueLatex || !traceLatex || !solveLatex) return { steps: [], fullSolutionLatex: null };
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("biology.sb2_02.solver.extract_system_clue"), clueLatex),
    makeStep(4, t("biology.sb2_02.solver.trace_system_pathway"), traceLatex),
    makeStep(5, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
