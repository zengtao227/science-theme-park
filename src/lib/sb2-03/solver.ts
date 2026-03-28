import type { PlatformSolutionStep, Quest } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";

type Stage = "MONOHYBRID" | "PROBABILITY" | "DIHYBRID";
type Genotype = "RR" | "Rr" | "rr" | "AA" | "Aa" | "aa" | "BB" | "Bb" | "bb";

export interface SB203SolverQuest extends Quest {
  stage: Stage;
  p1: Genotype;
  p2: Genotype;
}

function gametes(genotype: Genotype) {
  if (genotype.length !== 2) return [genotype];
  return genotype[0] === genotype[1] ? [genotype[0]] : [genotype[0], genotype[1]];
}

function combineGametes(a: string, b: string) {
  return [a, b].sort((x, y) => {
    const xl = x.toLowerCase();
    const yl = y.toLowerCase();
    if (xl === yl) return x === xl ? 1 : -1;
    return xl.localeCompare(yl);
  }).join("");
}

function punnettOutcomes(quest: SB203SolverQuest) {
  const left = gametes(quest.p1);
  const right = gametes(quest.p2);
  const outcomes: string[] = [];
  for (const a of left) {
    for (const b of right) outcomes.push(combineGametes(a, b));
  }
  return outcomes;
}

function buildRuleLatex(quest: SB203SolverQuest) {
  if (quest.stage === "MONOHYBRID") return "\\text{Build a 2\\times 2 Punnett square and compare dominant and recessive outcomes}";
  if (quest.stage === "PROBABILITY") return "\\text{Use Punnett-square outcomes as probabilities for the requested genotype or phenotype}";
  if (quest.stage === "DIHYBRID") return "\\text{Combine independent trait outcomes or use the classic 9:3:3:1 dihybrid model}";
  return null;
}

function buildSolveLatex(quest: SB203SolverQuest) {
  const outcomes = punnettOutcomes(quest).join(",\\ ");
  if (quest.stage === "PROBABILITY") {
    return `\\text{Gametes from } ${quest.p1}: ${gametes(quest.p1).join(", ")};\\ \\text{from } ${quest.p2}: ${gametes(quest.p2).join(", ")}.\\ \\text{Punnett outcomes: } ${outcomes}`;
  }
  if (quest.stage === "DIHYBRID") {
    return `\\text{Treat the cross } ${quest.p1} \\times ${quest.p2} \\text{ as independent allele combinations and count the matching phenotype/genotype class}`;
  }
  return `\\text{Cross } ${quest.p1} \\times ${quest.p2} \\text{. Punnett outcomes: } ${outcomes}`;
}

export function solveSB203(quest: SB203SolverQuest, t: Translator) {
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
