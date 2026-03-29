import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { SC201Quest } from "./types";

function buildStageRule(quest: SC201Quest, t: Translator) {
  const id = quest.id;

  if (quest.stage === "ARRHENIUS") {
    if (id.includes("C4") || id.includes("A1")) {
      return "\\ln\\!\\left(\\frac{k_2}{k_1}\\right)=\\frac{E_a}{R}\\left(\\frac{1}{T_1}-\\frac{1}{T_2}\\right)";
    }
    if (id.includes("A2")) {
      return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.arrhenius_plot_slope"))}} = -\\frac{E_a}{R}`;
    }
    if (id.includes("A3") || id.includes("A5") || id.includes("E1") || id.includes("E3") || id.includes("E4")) {
      return "k = A e^{-E_a/(RT)}";
    }
    return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.arrhenius_trend"))}}`;
  }

  if (quest.stage === "RATE_LAW") {
    if (id.includes("B1") || id.includes("B5")) return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.rate_law_first_order"))}}\\; \\text{${escapeLatexText(t("chemistry.sc2_01.solver.rate_label"))}} = k[A]`;
    if (id.includes("B2") || id.includes("C2")) return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.rate_law_second_order"))}}\\; \\text{${escapeLatexText(t("chemistry.sc2_01.solver.rate_label"))}} = k[A]^2`;
    if (id.includes("B3")) return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.rate_law_zero_order"))}}\\; \\text{${escapeLatexText(t("chemistry.sc2_01.solver.rate_label"))}} = k`;
    if (id.includes("C1") || id.includes("A1")) return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.rate_law_mixed"))}}`;
    if (id.includes("C3")) return "\\ln[A] = \\ln[A]_0 - kt";
    if (id.includes("C4")) return "t = \\frac{\\ln 2}{k}";
    if (id.includes("C5")) return `k = \\frac{\\text{${escapeLatexText(t("chemistry.sc2_01.solver.rate_label"))}}}{[A]^n}`;
    return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.rate_law_generic"))}}`;
  }

  if (quest.stage === "HALF_LIFE") {
    if (id.includes("B1") || id.includes("C1")) return "t_{1/2} = \\frac{\\ln 2}{k}";
    if (id.includes("B2")) return "t_{1/2} = \\frac{1}{k[A]_0}";
    if (id.includes("B3")) return "t_{1/2} = \\frac{[A]_0}{2k}";
    if (id.includes("C2") || id.includes("C3") || id.includes("C4") || id.includes("E1") || id.includes("E5")) {
      return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.half_life_repeated_halving"))}}`;
    }
    if (id.includes("C5")) return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.half_life_compare_rate_constants"))}}`;
    return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.half_life_generic"))}}`;
  }

  return null;
}

function buildSolveLatex(quest: SC201Quest, t: Translator) {
  const slot = quest.slots[0];
  if (!slot) return null;
  return `\\text{${escapeLatexText(t("chemistry.sc2_01.solver.solve_for_with_data", {
    target: slot.labelLatex,
  }))}}\\; ${quest.expressionLatex}`;
}

export function solveSC201(quest: SC201Quest, t: Translator) {
  const ruleLatex = buildStageRule(quest, t);
  const solveLatex = buildSolveLatex(quest, t);
  if (!ruleLatex || !solveLatex) {
    return { steps: [], fullSolutionLatex: null };
  }

  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.expressionLatex),
    makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), ruleLatex),
    makeStep(3, t("common.feedback_reasons.solve_step_by_step"), solveLatex),
    makeStep(4, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"),
  ];

  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
