import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, escapeLatexText, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { SB204Quest } from "@/lib/sb2-04-types";

function stageLabel(quest: SB204Quest, t: Translator) {
  const key = `biology.sb2_04.stages.${quest.stage.toLowerCase()}`;
  return t(key);
}

function clueLatex(quest: SB204Quest, t: Translator) {
  if (quest.organ) {
    return `\\text{${escapeLatexText(t("biology.sb2_04.solver.organ_clue_label"))}} ${escapeLatexText(quest.organ.replace(/_/g, " "))}`;
  }
  if (quest.process) {
    return `\\text{${escapeLatexText(t("biology.sb2_04.solver.process_clue_label"))}} ${escapeLatexText(quest.process.replace(/_/g, " "))}`;
  }
  if (quest.baselScenario) {
    return `\\text{${escapeLatexText(t("biology.sb2_04.solver.scenario_clue_label"))}} ${escapeLatexText(quest.baselScenario.replace(/_/g, " "))}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_04.solver.system_focus_label"))}} ${escapeLatexText(stageLabel(quest, t))}`;
}

function buildRuleLatex(quest: SB204Quest, t: Translator) {
  if (quest.stage === "DIGESTIVE_SYSTEM") return `\\text{${escapeLatexText(t("biology.sb2_04.solver.rule_digestive"))}}`;
  if (quest.stage === "RESPIRATORY_SYSTEM") return `\\text{${escapeLatexText(t("biology.sb2_04.solver.rule_respiratory"))}}`;
  if (quest.stage === "CIRCULATORY_SYSTEM") return `\\text{${escapeLatexText(t("biology.sb2_04.solver.rule_circulatory"))}}`;
  if (quest.stage === "EXCRETORY_SYSTEM") return `\\text{${escapeLatexText(t("biology.sb2_04.solver.rule_excretory"))}}`;
  return null;
}

function buildQuestionTypeLatex(quest: SB204Quest, t: Translator) {
  if (quest.questionType === "identification") {
    return `\\text{${escapeLatexText(t("biology.sb2_04.solver.identification_step"))}}`;
  }
  if (quest.questionType === "process") {
    return `\\text{${escapeLatexText(t("biology.sb2_04.solver.process_step"))}}`;
  }
  if (quest.questionType === "coordination") {
    return `\\text{${escapeLatexText(t("biology.sb2_04.solver.coordination_step"))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_04.solver.comprehensive_step"))}}`;
}

function buildReasoningLatex(quest: SB204Quest, t: Translator) {
  if (quest.explanation) {
    return `\\text{${escapeLatexText(t("biology.sb2_04.solver.reasoning_label"))}} ${escapeLatexText(quest.explanation)}`;
  }
  return `\\text{${escapeLatexText(t("biology.sb2_04.solver.use_question_type_clue", { type: quest.questionType }))}}`;
}

export function solveSB204(quest: SB204Quest, t: Translator) {
  const ruleLatex = buildRuleLatex(quest, t);
  if (!ruleLatex) return { steps: [], fullSolutionLatex: null };
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("biology.sb2_04.solver.extract_key_clue"), clueLatex(quest, t)),
    makeStep(4, t("biology.sb2_04.solver.classify_question_type"), buildQuestionTypeLatex(quest, t)),
    makeStep(5, t("common.feedback_reasons.solve_step_by_step"), buildReasoningLatex(quest, t)),
    makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
