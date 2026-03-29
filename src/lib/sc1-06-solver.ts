import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import { buildFullSolution, makeStep, type Translator } from "@/lib/feedback/solverSupport";
import type { Compound, ReactionType, SC106Quest } from "./sc1-06-types";

function formatReactionType(type: ReactionType, t: Translator) {
  return `\\text{${t(`chemistry.sc1_06.solver.reaction_type_${type}`)}}`;
}

function formatEnergyChange(energyChange: SC106Quest["energyChange"], t: Translator) {
  if (!energyChange) return null;
  return `\\text{${t(`chemistry.sc1_06.solver.energy_change_${energyChange}`)}}`;
}

function reactionPattern(type: ReactionType) {
  switch (type) {
    case "synthesis":
      return "A + B \\rightarrow AB";
    case "decomposition":
      return "AB \\rightarrow A + B";
    case "single_replacement":
      return "A + BC \\rightarrow AC + B";
    case "double_replacement":
      return "AB + CD \\rightarrow AD + CB";
    case "combustion":
      return "C_xH_y + O_2 \\rightarrow CO_2 + H_2O";
  }
}

function compoundContribution(compound: Compound, coefficient: number) {
  return compound.elements.map((element) => `${element.element}: ${coefficient}\\cdot${element.count}=${coefficient * element.count}`);
}

function buildBalanceSummary(quest: SC106Quest) {
  const reactantTerms = quest.equation.reactants.flatMap((compound, index) =>
    compoundContribution(compound, quest.coefficients?.[index] ?? 1)
  );
  const productOffset = quest.equation.reactants.length;
  const productTerms = quest.equation.products.flatMap((compound, index) =>
    compoundContribution(compound, quest.coefficients?.[productOffset + index] ?? 1)
  );
  return `${reactantTerms.join(", ")}\\;;\\;${productTerms.join(", ")}`;
}

export function solveSC106(quest: SC106Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [makeStep(1, t("common.feedback_reasons.identify_given_values"), quest.equationLatex)];

  switch (quest.stage) {
    case "REACTION_TYPES":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), reactionPattern(quest.reactionType ?? quest.equation.type)));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("chemistry.sc1_06.solver.type_label")}} = ${formatReactionType(quest.reactionType ?? quest.equation.type, t)}`));
      break;
    case "EQUATION_BALANCING":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc1_06.solver.coefficients_label")}} = (${(quest.coefficients ?? []).join(", ")})`));
      steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), buildBalanceSummary(quest)));
      steps.push(makeStep(4, t("common.feedback_reasons.solve_step_by_step"), quest.equationLatex));
      break;
    case "REACTION_SIMULATION":
      steps.push(makeStep(2, t("common.feedback_reasons.select_formula_or_rule"), `\\text{${t("chemistry.sc1_06.solver.pattern_label")}} = ${reactionPattern(quest.reactionType ?? quest.equation.type)}`));
      const energyChange = formatEnergyChange(quest.energyChange, t);
      if (energyChange) {
        steps.push(makeStep(3, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("chemistry.sc1_06.solver.energy_label")}} = ${energyChange}`));
      }
      steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.solve_step_by_step"), `\\text{${t("chemistry.sc1_06.solver.observed_type_label")}} = ${formatReactionType(quest.reactionType ?? quest.equation.type, t)}`));
      break;
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
