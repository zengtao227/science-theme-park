import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { SC201Quest } from "./types";

function buildStageRule(quest: SC201Quest) {
  const id = quest.id;

  if (quest.stage === "ARRHENIUS") {
    if (id.includes("C4") || id.includes("A1")) {
      return "\\ln\\!\\left(\\frac{k_2}{k_1}\\right)=\\frac{E_a}{R}\\left(\\frac{1}{T_1}-\\frac{1}{T_2}\\right)";
    }
    if (id.includes("A2")) {
      return "\\text{slope of Arrhenius plot} = -\\frac{E_a}{R}";
    }
    if (id.includes("A3") || id.includes("A5") || id.includes("E1") || id.includes("E3") || id.includes("E4")) {
      return "k = A e^{-E_a/(RT)}";
    }
    return "\\text{Higher } T \\text{ or lower } E_a \\text{ increases } k \\text{ through the Arrhenius relation}";
  }

  if (quest.stage === "RATE_LAW") {
    if (id.includes("B1") || id.includes("B5")) return "\\text{First-order rate law: } \\text{rate} = k[A]";
    if (id.includes("B2") || id.includes("C2")) return "\\text{Second-order behavior: } \\text{rate} = k[A]^2";
    if (id.includes("B3")) return "\\text{Zero-order rate law: } \\text{rate} = k";
    if (id.includes("C1") || id.includes("A1")) return "\\text{Mixed rate law: combine the concentration terms with } k";
    if (id.includes("C3")) return "\\ln[A] = \\ln[A]_0 - kt";
    if (id.includes("C4")) return "t = \\frac{\\ln 2}{k}";
    if (id.includes("C5")) return "k = \\frac{\\text{rate}}{[A]^n}";
    return "\\text{Use the rate-law form or integrated rate equation that matches the reaction order}";
  }

  if (quest.stage === "HALF_LIFE") {
    if (id.includes("B1") || id.includes("C1")) return "t_{1/2} = \\frac{\\ln 2}{k}";
    if (id.includes("B2")) return "t_{1/2} = \\frac{1}{k[A]_0}";
    if (id.includes("B3")) return "t_{1/2} = \\frac{[A]_0}{2k}";
    if (id.includes("C2") || id.includes("C3") || id.includes("C4") || id.includes("E1") || id.includes("E5")) {
      return "\\text{Each half-life reduces the amount to one half of the previous value}";
    }
    if (id.includes("C5")) return "\\text{Compare half-lives inversely with the rate constants}";
    return "\\text{Use the half-life model that matches the reaction or decay process}";
  }

  return null;
}

function buildSolveLatex(quest: SC201Quest) {
  const slot = quest.slots[0];
  if (!slot) return null;
  return `\\text{Solve for } ${slot.labelLatex} \\text{ using the given data } ${quest.expressionLatex}`;
}

export function solveSC201(quest: SC201Quest, t: Translator) {
  const ruleLatex = buildStageRule(quest);
  const solveLatex = buildSolveLatex(quest);
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
