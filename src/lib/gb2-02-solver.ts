import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { GB202Quest } from "./gb2-02-types";

function buildFeedbackChainLatex(quest: GB202Quest) {
  if (!quest.feedbackLoop?.components?.length) return null;
  return quest.feedbackLoop.components
    .map((component, index) => `${index + 1}.\\;\\text{${escapeLatexText(component.name)}}`)
    .join(" \\to ");
}

function buildAbnormalLabsLatex(quest: GB202Quest, t: Translator) {
  if (!quest.clinicalCase?.labResults?.length) return null;
  const abnormal = quest.clinicalCase.labResults.filter((lab) => lab.status !== "normal");
  if (!abnormal.length) return null;
  return abnormal
    .map(
      (lab) =>
        `\\text{${escapeLatexText(lab.hormone)}}=${lab.value}\\,${escapeLatexText(lab.unit)}\\;(${escapeLatexText(labStatusLabel(t, lab.status))})`
    )
    .join(",\\; ");
}

function buildClueLatex(quest: GB202Quest, t: Translator) {
  if (quest.stage === "HORMONE_IDENTIFICATION" && quest.hormone) {
    const hormoneName = quest.hormone.nameLatex || `\\text{${escapeLatexText(quest.hormone.name)}}`;
    return `\\text{${escapeLatexText(t("biology.gb2_02.solver.hormone_label"))}} ${hormoneName},\\ \\text{${escapeLatexText(t("biology.gb2_02.solver.gland_label"))}} ${escapeLatexText(quest.hormone.gland)}`;
  }
  if (quest.stage === "FEEDBACK_MECHANISMS" && quest.feedbackLoop) {
    const chain = buildFeedbackChainLatex(quest);
    return chain
      ? `\\text{${escapeLatexText(t("biology.gb2_02.solver.feedback_chain_label"))}} ${chain}`
      : `\\text{${escapeLatexText(t("biology.gb2_02.solver.stimulus_label"))}}: ${escapeLatexText(quest.feedbackLoop.stimulus)}`;
  }
  if (quest.stage === "CLINICAL_APPLICATIONS" && quest.clinicalCase) {
    const abnormalLabs = buildAbnormalLabsLatex(quest, t);
    return abnormalLabs
      ? `\\text{${escapeLatexText(t("biology.gb2_02.solver.abnormal_labs_label"))}} ${abnormalLabs}`
      : `\\text{${escapeLatexText(t("biology.gb2_02.solver.chief_complaint_label"))}}: ${escapeLatexText(quest.clinicalCase.chiefComplaint)}`;
  }
  return null;
}

function buildTraceLatex(quest: GB202Quest, t: Translator) {
  if (quest.stage === "HORMONE_IDENTIFICATION" && quest.hormone) {
    const targets = quest.hormone.targetOrgans.map((organ) => `\\text{${escapeLatexText(organ)}}`).join(", ");
    return `\\text{${escapeLatexText(t("biology.gb2_02.solver.target_organs_label"))}} ${targets}`;
  }
  if (quest.stage === "FEEDBACK_MECHANISMS" && quest.feedbackLoop) {
    return `\\text{${escapeLatexText(t("biology.gb2_02.solver.trace_feedback_loop"))}}\\; ${escapeLatexText(quest.feedbackLoop.stimulus)} \\to ${escapeLatexText(quest.feedbackLoop.response)}`;
  }
  if (quest.stage === "CLINICAL_APPLICATIONS" && quest.clinicalCase) {
    return `\\text{${escapeLatexText(t("biology.gb2_02.solver.trace_clinical_pattern"))}}`;
  }
  return null;
}

function labStatusLabel(t: Translator, status: "normal" | "high" | "low") {
  return t(`biology.gb2_02.solver.lab_status_${status}`);
}

function buildIdentifyLatex(quest: GB202Quest, t: Translator) {
  if (quest.hormone) {
    return quest.hormone.nameLatex || `\\text{${escapeLatexText(quest.hormone.name)}}`;
  }
  if (quest.feedbackLoop) {
    return `\\text{${escapeLatexText(quest.feedbackLoop.description)}}`;
  }
  if (quest.clinicalCase) {
    const chiefComplaint = escapeLatexText(quest.clinicalCase.chiefComplaint);
    return `\\text{${escapeLatexText(t("biology.gb2_02.solver.chief_complaint_label"))}}: ${chiefComplaint}`;
  }
  return quest.expressionLatex || quest.promptLatex;
}

function buildRuleLatex(quest: GB202Quest, t: Translator) {
  if (quest.stage === "HORMONE_IDENTIFICATION") {
    if (quest.id.includes("BASIC")) return `\\text{${escapeLatexText(t("biology.gb2_02.solver.rule_hormone_basic"))}}`;
    if (quest.id.includes("CORE")) return `\\text{${escapeLatexText(t("biology.gb2_02.solver.rule_hormone_core"))}}`;
    if (quest.id.includes("ADVANCED")) return `\\text{${escapeLatexText(t("biology.gb2_02.solver.rule_hormone_advanced"))}}`;
    return `\\text{${escapeLatexText(t("biology.gb2_02.solver.rule_hormone_therapy"))}}`;
  }
  if (quest.stage === "FEEDBACK_MECHANISMS") {
    if (quest.feedbackLoop) return `\\text{${escapeLatexText(t("biology.gb2_02.solver.rule_feedback"))}}`;
    return `\\text{${escapeLatexText(t("biology.gb2_02.solver.rule_feedback_generic"))}}`;
  }
  if (quest.stage === "CLINICAL_APPLICATIONS") {
    if (quest.clinicalCase) return `\\text{${escapeLatexText(t("biology.gb2_02.solver.rule_clinical"))}}`;
    return `\\text{${escapeLatexText(t("biology.gb2_02.solver.rule_clinical_generic"))}}`;
  }
  return null;
}

function buildSolveLatex(quest: GB202Quest, t: Translator) {
  if (quest.stage === "HORMONE_IDENTIFICATION" && quest.hormone) {
    if (quest.id.includes("CORE")) {
      return `\\text{${escapeLatexText(t("biology.gb2_02.solver.solve_hormone_core_prefix", {
        hormone: quest.hormone.name,
      }))}} ${quest.hormone.targetOrgans.map((organ) => `\\text{${escapeLatexText(organ)}}`).join(", ")} \\text{${escapeLatexText(t("biology.gb2_02.solver.solve_hormone_core_suffix", {
        func: quest.hormone.primaryFunction,
      }))}}`;
    }
    if (quest.id.includes("ADVANCED")) {
      return `\\text{${escapeLatexText(t("biology.gb2_02.solver.solve_hormone_advanced", {
        hormone: quest.hormone.name || quest.expressionLatex,
      }))}}`;
    }
    return `\\text{${escapeLatexText(t("biology.gb2_02.solver.solve_hormone_basic"))}} ${quest.hormone.nameLatex}`;
  }
  if (quest.stage === "FEEDBACK_MECHANISMS" && quest.feedbackLoop) {
    const chain = buildFeedbackChainLatex(quest);
    return chain
      ? `${chain} \\Rightarrow \\text{${escapeLatexText(t("biology.gb2_02.solver.response_label"))}}: ${escapeLatexText(quest.feedbackLoop.response)}`
      : `\\text{${escapeLatexText(t("biology.gb2_02.solver.stimulus_label"))}}: ${escapeLatexText(quest.feedbackLoop.stimulus)} \\to \\text{${escapeLatexText(t("biology.gb2_02.solver.response_label"))}}: ${escapeLatexText(quest.feedbackLoop.response)}`;
  }
  if (quest.stage === "CLINICAL_APPLICATIONS" && quest.clinicalCase) {
    const abnormalLabs = buildAbnormalLabsLatex(quest, t);
    return abnormalLabs
      ? `\\text{${escapeLatexText(t("biology.gb2_02.solver.focus_abnormal_labs"))}} ${abnormalLabs}`
      : `\\text{${escapeLatexText(t("biology.gb2_02.solver.use_symptom_pattern"))}}`;
  }
  return `\\text{${escapeLatexText(t("biology.gb2_02.solver.default_solve"))}}`;
}

export function solveGB202(quest: GB202Quest, t: Translator) {
  const identifyLatex = buildIdentifyLatex(quest, t);
  const clueLatex = buildClueLatex(quest, t);
  const ruleLatex = buildRuleLatex(quest, t);
  const traceLatex = buildTraceLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!identifyLatex || !clueLatex || !ruleLatex || !traceLatex || !solveLatex || !quest.correctLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), identifyLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("biology.gb2_02.solver.extract_endocrine_clue"), clueLatex),
    makeStep(4, t("biology.gb2_02.solver.trace_endocrine_mechanism"), traceLatex),
    makeStep(5, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
