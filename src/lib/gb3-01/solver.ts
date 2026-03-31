import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";

type Stage = "PAIRING" | "BONDS" | "SEQUENCE";

export interface GB301SolverQuest extends Quest {
  stage: Stage;
  base?: string;
  b1?: string;
  b2?: string;
  seq?: string;
}

function buildClueLatex(quest: GB301SolverQuest, t: Translator) {
  if (quest.stage === "PAIRING" && quest.base) {
    return `\\text{${escapeLatexText(t("biology.gb3_01.solver.pairing_clue_label"))}} ${quest.base}`;
  }
  if (quest.stage === "BONDS" && quest.b1 && quest.b2) {
    return `\\text{${escapeLatexText(t("biology.gb3_01.solver.bond_clue_label"))}} ${quest.b1}-${quest.b2}`;
  }
  if (quest.stage === "SEQUENCE" && quest.seq) {
    return `\\text{${escapeLatexText(t("biology.gb3_01.solver.sequence_clue_label"))}} ${escapeLatexText(quest.seq)}`;
  }
  return null;
}

function buildIdentifyLatex(quest: GB301SolverQuest) {
  if (quest.stage === "PAIRING" && quest.base) return null;
  if (quest.stage === "BONDS" && quest.b1 && quest.b2) return null;
  if (quest.stage === "SEQUENCE" && quest.seq) return null;
  return quest.expressionLatex || quest.promptLatex;
}

function buildRuleLatex(quest: GB301SolverQuest, t: Translator) {
  if (quest.stage === "PAIRING" || quest.stage === "SEQUENCE") {
    return "A \\leftrightarrow T, \\quad G \\leftrightarrow C";
  }
  if (quest.stage === "BONDS") {
    return `\\text{${escapeLatexText(t("biology.gb3_01.solver.rule_bonds"))}}`;
  }
  return null;
}

function buildTraceLatex(quest: GB301SolverQuest, t: Translator) {
  if (quest.stage === "PAIRING") {
    return `\\text{${escapeLatexText(t("biology.gb3_01.solver.trace_pairing_pattern"))}}`;
  }
  if (quest.stage === "BONDS") {
    return `\\text{${escapeLatexText(t("biology.gb3_01.solver.trace_bonds_pattern"))}}`;
  }
  if (quest.stage === "SEQUENCE") {
    return `\\text{${escapeLatexText(t("biology.gb3_01.solver.trace_sequence_pattern"))}}`;
  }
  return null;
}

function buildSolveLatex(quest: GB301SolverQuest, t: Translator) {
  if (quest.stage === "PAIRING" && quest.base) {
    const partner = quest.base === "A" ? "T" : quest.base === "T" ? "A" : quest.base === "G" ? "C" : "G";
    return `\\text{${escapeLatexText(t("biology.gb3_01.solver.solve_pairing_intro"))}}\\ ${quest.base} \\mapsto ${partner}`;
  }
  if (quest.stage === "BONDS" && quest.b1 && quest.b2) {
    const bonds = quest.b1 === "A" || quest.b1 === "T" ? 2 : 3;
    const pairType = quest.b1 === "A" || quest.b1 === "T" ? "A-T" : "G-C";
    return `\\text{${escapeLatexText(t("biology.gb3_01.solver.solve_bonds", {
      pair: `${quest.b1}-${quest.b2}`,
      pairType,
      bonds,
    }))}}`;
  }
  if (quest.stage === "SEQUENCE" && quest.seq) {
    const mapped = quest.seq
      .split("")
      .map((base) => `${base}\\to${base === "A" ? "T" : base === "T" ? "A" : base === "G" ? "C" : "G"}`)
      .join(",\\ ");
    return `\\text{${escapeLatexText(t("biology.gb3_01.solver.solve_sequence_intro"))}} ${mapped}`;
  }
  return null;
}

export function solveGB301(quest: GB301SolverQuest, t: Translator) {
  const identifyLatex =
    quest.stage === "PAIRING" && quest.base
      ? `\\text{${escapeLatexText(t("biology.gb3_01.solver.base_label"))}}: ${quest.base}`
      : quest.stage === "BONDS" && quest.b1 && quest.b2
        ? `\\text{${escapeLatexText(t("biology.gb3_01.solver.pair_label"))}}: ${quest.b1}-${quest.b2}`
        : quest.stage === "SEQUENCE" && quest.seq
          ? `\\text{${escapeLatexText(t("biology.gb3_01.solver.sequence_label"))}}: ${escapeLatexText(quest.seq)}`
          : buildIdentifyLatex(quest);
  const clueLatex = buildClueLatex(quest, t);
  const ruleLatex = buildRuleLatex(quest, t);
  const traceLatex = buildTraceLatex(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!identifyLatex || !ruleLatex || !traceLatex || !solveLatex || !quest.correctLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), identifyLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    ...(clueLatex ? [makeStep(3, t("biology.gb3_01.solver.extract_dna_clue"), clueLatex)] : []),
    makeStep(clueLatex ? 4 : 3, t("biology.gb3_01.solver.trace_dna_mechanism"), traceLatex),
    makeStep(clueLatex ? 5 : 4, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(clueLatex ? 6 : 5, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
