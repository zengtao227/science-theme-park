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

function buildIdentifyLatex(quest: GB301SolverQuest) {
  if (quest.stage === "PAIRING" && quest.base) return `\\text{Base: } ${quest.base}`;
  if (quest.stage === "BONDS" && quest.b1 && quest.b2) return `\\text{Pair: } ${quest.b1}-${quest.b2}`;
  if (quest.stage === "SEQUENCE" && quest.seq) return `\\text{Sequence: } ${escapeLatexText(quest.seq)}`;
  return quest.expressionLatex || quest.promptLatex;
}

function buildRuleLatex(quest: GB301SolverQuest) {
  if (quest.stage === "PAIRING" || quest.stage === "SEQUENCE") {
    return "A \\leftrightarrow T, \\quad G \\leftrightarrow C";
  }
  if (quest.stage === "BONDS") {
    return "\\text{A-T pairs form 2 hydrogen bonds, while G-C pairs form 3 hydrogen bonds}";
  }
  return null;
}

function buildSolveLatex(quest: GB301SolverQuest) {
  if (quest.stage === "PAIRING" && quest.base) {
    const partner = quest.base === "A" ? "T" : quest.base === "T" ? "A" : quest.base === "G" ? "C" : "G";
    return `\\text{Using } A\\leftrightarrow T \\text{ and } G\\leftrightarrow C,\\ ${quest.base} \\mapsto ${partner}`;
  }
  if (quest.stage === "BONDS" && quest.b1 && quest.b2) {
    const bonds = quest.b1 === "A" || quest.b1 === "T" ? 2 : 3;
    const pairType = quest.b1 === "A" || quest.b1 === "T" ? "A-T" : "G-C";
    return `\\text{The pair } ${quest.b1}-${quest.b2} \\text{ is } ${pairType}\\text{, so it forms } ${bonds} \\text{ hydrogen bonds}`;
  }
  if (quest.stage === "SEQUENCE" && quest.seq) {
    const mapped = quest.seq
      .split("")
      .map((base) => `${base}\\to${base === "A" ? "T" : base === "T" ? "A" : base === "G" ? "C" : "G"}`)
      .join(",\\ ");
    return `\\text{Convert each base one by one: } ${mapped}`;
  }
  return null;
}

export function solveGB301(quest: GB301SolverQuest, t: Translator) {
  const identifyLatex = buildIdentifyLatex(quest);
  const ruleLatex = buildRuleLatex(quest);
  const solveLatex = buildSolveLatex(quest);
  if (!identifyLatex || !ruleLatex || !solveLatex || !quest.correctLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), identifyLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
