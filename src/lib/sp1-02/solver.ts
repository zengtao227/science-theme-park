import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import type { SP102Quest } from "./quests";

type Translator = (key: string, params?: Record<string, string | number>) => string;

function makeStep(
  stepNumber: number,
  justification: string,
  expressionLatex: string,
  emphasis?: PlatformSolutionStep["emphasis"]
): PlatformSolutionStep {
  return { stepNumber, justification, expressionLatex, emphasis };
}

function escapeLatexText(text: string) {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([{}%$&#_^])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}");
}

function buildFullSolution(steps: PlatformSolutionStep[]) {
  return steps
    .map((step) => `\\text{${escapeLatexText(step.justification)}} \\implies ${step.expressionLatex}`)
    .join(" \\\\ ");
}

function finalStep(stepNumber: number, t: Translator, quest: SP102Quest) {
  return makeStep(stepNumber, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key");
}

function solveFirstLaw(quest: SP102Quest, t: Translator) {
  const expected = quest.slots[0]?.expected;
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("sp1_02.reasons.state_equilibrium_principle"), "F_{net}=0 \\Rightarrow v=\\text{const}"),
    makeStep(2, t("sp1_02.reasons.match_balancing_force"), `F_{\\text{needed}}=${expected}`),
    finalStep(3, t, quest),
  ];
  return steps;
}

function solveSecondLaw(quest: SP102Quest, t: Translator) {
  const applied = quest.forceX ?? 0;
  const friction = quest.friction ?? 0;
  const mass = quest.mass ?? 1;
  const netForce = applied - friction;
  const acceleration = mass === 0 ? 0 : Math.round((netForce / mass) * 100) / 100;
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("sp1_02.reasons.compute_net_force"), `F_{net}=${applied}-${friction}=${Math.round(netForce * 100) / 100}`),
    makeStep(2, t("sp1_02.reasons.apply_newton_second_law"), `a=\\frac{F_{net}}{m}=\\frac{${Math.round(netForce * 100) / 100}}{${mass}}=${acceleration}`),
    finalStep(3, t, quest),
  ];
  return steps;
}

function solveThirdLaw(quest: SP102Quest, t: Translator) {
  const reaction = quest.slots[0]?.expected;
  const steps: PlatformSolutionStep[] = [
    makeStep(1, t("sp1_02.reasons.state_action_reaction_pair"), "\\vec{F}_{AB}=-\\vec{F}_{BA}"),
    makeStep(2, t("sp1_02.reasons.match_equal_magnitude"), `|F_{\\text{reaction}}|=${reaction}`),
    finalStep(3, t, quest),
  ];
  return steps;
}

export function solveSP102(
  quest: SP102Quest,
  t: Translator
): { steps: PlatformSolutionStep[]; fullSolutionLatex: string | null } {
  const steps =
    quest.stage === "FIRST_LAW" ? solveFirstLaw(quest, t) :
    quest.stage === "SECOND_LAW" ? solveSecondLaw(quest, t) :
    solveThirdLaw(quest, t);

  return {
    steps,
    fullSolutionLatex: buildFullSolution(steps),
  };
}
