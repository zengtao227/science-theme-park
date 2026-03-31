import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";

type Stage = "NATURAL_SELECTION" | "SPECIATION" | "EVIDENCE";

export interface GB101SolverQuest extends Quest {
  stage: Stage;
}

function buildTargetLatex(quest: GB101SolverQuest, t: Translator) {
  const slot = quest.slots[0];
  if (!slot) return null;
  return `\\text{${escapeLatexText(t("biology.gb1_01.solver.target_label"))}} ${slot.labelLatex}`;
}

function solveSelectionLatex(quest: GB101SolverQuest, t: Translator) {
  const slot = quest.slots[0];
  const expected = slot?.expected;
  if (!slot || expected === undefined) return null;

  if (
    quest.targetLatex === "w" ||
    quest.targetLatex === "s" ||
    quest.targetLatex === "2pq" ||
    quest.targetLatex === "q" ||
    quest.targetLatex === "\\Delta p" ||
    quest.targetLatex === "W"
  ) {
    return `${quest.expressionLatex} = ${expected}`;
  }

  return `\\text{${escapeLatexText(t("biology.gb1_01.solver.evaluate_expression_isolate"))}} ${slot.labelLatex}`;
}

function solveDirectExpressionLatex(quest: GB101SolverQuest) {
  const slot = quest.slots[0];
  const expected = slot?.expected;
  if (!slot || expected === undefined) return null;
  return `${quest.expressionLatex} = ${expected}`;
}

function buildRuleLatex(quest: GB101SolverQuest, t: Translator) {
  const target = quest.targetLatex;
  const expression = quest.expressionLatex;

  if (quest.stage === "NATURAL_SELECTION") {
    if (target === "w") {
      return `w = \\frac{\\text{${escapeLatexText(t("biology.gb1_01.solver.survivors_label"))}}}{\\text{${escapeLatexText(t("biology.gb1_01.solver.initial_population_label"))}}}`;
    }
    if (target === "s") return "s = 1 - w";
    if (target === "2pq") return "q = 1 - p, \\quad 2pq = 2p(1-p)";
    if (target === "q" && expression.includes("\\sqrt")) return "q = \\sqrt{q^2}";
    if (target === "\\Delta p") return "\\Delta p \\approx spq^2";
    if (target === "W") return "\\bar W = 1 - sq^2";
    return `\\text{${escapeLatexText(t("biology.gb1_01.solver.apply_population_relation"))}}`;
  }

  if (quest.stage === "SPECIATION") {
    if (target === "D") {
      return `D = ut \\text{ ${escapeLatexText(t("biology.gb1_01.solver.or_word"))} } D = 2uT \\text{ ${escapeLatexText(t("biology.gb1_01.solver.depending_on_divergence_model"))} }`;
    }
    if (target === "t" && expression.includes("4")) return "t \\approx 4N_e";
    if (target === "T") return "D = 2uT \\Rightarrow T = \\frac{D}{2u}";
    if (target === "P") return "P = \\frac{1}{2N}";
    if (target === "F") return "F = 1 - \\frac{1}{2N}";
    if (target === "Ne") return `N_e = \\frac{4N_fN_m}{N_f + N_m} \\text{ ${escapeLatexText(t("biology.gb1_01.solver.rule_effective_population"))} }`;
    return `\\text{${escapeLatexText(t("biology.gb1_01.solver.use_speciation_relation"))}}`;
  }

  if (quest.stage === "EVIDENCE") {
    if (target === "A") return "A = n \\cdot t_{1/2}";
    if (target === "N") return "N = \\log_2\\!\\left(\\frac{1}{f}\\right)";
    if (target === "L") return "\\lambda = \\frac{k}{N}";
    if (target === "F") return "F = e^{-\\lambda t}";
    if (target === "Lt") return `\\lambda t_{1/2} = \\ln 2 \\text{ ${escapeLatexText(t("biology.gb1_01.solver.rule_decay_constant"))} }`;
    if (target === "K") return "K = \\frac{D}{2t}";
    if (target === "R") {
      return `R = \\frac{\\text{${escapeLatexText(t("biology.gb1_01.solver.older_rate_label"))}}}{\\text{${escapeLatexText(t("biology.gb1_01.solver.newer_rate_label"))}}}`;
    }
    if (target === "Type") return `\\text{${escapeLatexText(t("biology.gb1_01.solver.rule_positive_selection"))}}`;
    if (target === "C") {
      return `C = \\frac{\\text{${escapeLatexText(t("biology.gb1_01.solver.accepted_cases_label"))}}}{\\text{${escapeLatexText(t("biology.gb1_01.solver.total_cases_label"))}}} \\times 100\\%`;
    }
    return `\\text{${escapeLatexText(t("biology.gb1_01.solver.use_evidence_reasoning"))}}`;
  }

  return null;
}

function buildSolveLatex(quest: GB101SolverQuest, t: Translator) {
  if (quest.stage === "NATURAL_SELECTION") return solveSelectionLatex(quest, t);
  if (quest.stage === "SPECIATION" || quest.stage === "EVIDENCE") return solveDirectExpressionLatex(quest);
  const slot = quest.slots[0];
  if (!slot) return null;
  return `\\text{${escapeLatexText(t("biology.gb1_01.solver.substitute_values_solve"))}} ${quest.expressionLatex} \\text{ ${escapeLatexText(t("biology.gb1_01.solver.and_solve_for"))} } ${slot.labelLatex}`;
}

function buildTraceLatex(quest: GB101SolverQuest, t: Translator) {
  if (quest.stage === "NATURAL_SELECTION") {
    return `\\text{${escapeLatexText(t("biology.gb1_01.solver.trace_selection_pattern"))}}`;
  }
  if (quest.stage === "SPECIATION") {
    return `\\text{${escapeLatexText(t("biology.gb1_01.solver.trace_speciation_pattern"))}}`;
  }
  if (quest.stage === "EVIDENCE") {
    return `\\text{${escapeLatexText(t("biology.gb1_01.solver.trace_evidence_pattern"))}}`;
  }
  return null;
}

export function solveGB101(quest: GB101SolverQuest, t: Translator) {
  const targetLatex = buildTargetLatex(quest, t);
  const ruleLatex = buildRuleLatex(quest, t);
  const traceLatex = buildTraceLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!targetLatex || !ruleLatex || !traceLatex || !solveLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex || quest.promptLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("biology.gb1_01.solver.identify_target_step"), targetLatex),
    makeStep(4, t("biology.gb1_01.solver.trace_reasoning_pattern"), traceLatex),
    makeStep(5, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(6, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
