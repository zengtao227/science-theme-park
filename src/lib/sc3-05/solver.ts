import type { PlatformSolutionStep } from "@/hooks/useQuestManager";
import {
  buildFullSolution,
  escapeLatexText,
  makeStep,
  type Translator,
} from "@/lib/feedback/solverSupport";
import type { SC305Quest } from "./types";

function hybridizationRule(electronDomains: number) {
  switch (electronDomains) {
    case 2:
      return "sp";
    case 3:
      return "sp2";
    case 4:
      return "sp3";
    case 5:
      return "sp3d";
    case 6:
      return "sp3d2";
    default:
      return null;
  }
}

function vseprGeometry(bondedAtoms: number, lonePairs: number) {
  switch (`${bondedAtoms}:${lonePairs}`) {
    case "2:0":
      return "linear";
    case "3:0":
      return "trigonal planar";
    case "2:1":
      return "bent";
    case "4:0":
      return "tetrahedral";
    case "3:1":
      return "trigonal pyramidal";
    case "2:2":
      return "bent";
    case "5:0":
      return "trigonal bipyramidal";
    case "4:1":
      return "seesaw";
    case "3:2":
      return "T-shaped";
    case "2:3":
      return "linear";
    case "6:0":
      return "octahedral";
    case "5:1":
      return "square pyramidal";
    case "4:2":
      return "square planar";
    default:
      return null;
  }
}

export function solveSC305(quest: SC305Quest, t: Translator) {
  const steps: PlatformSolutionStep[] = [];

  switch (quest.stage) {
    case "VSEPR": {
      if (!quest.data || quest.data.kind !== "VSEPR") {
        return { steps: [], fullSolutionLatex: null };
      }
      const totalDomains = quest.data.lonePairs + quest.data.bondedAtoms;
      const geometry = vseprGeometry(quest.data.bondedAtoms, quest.data.lonePairs);
      if (!geometry) {
        return { steps: [], fullSolutionLatex: null };
      }
      steps.push(
        makeStep(
          1,
          t("common.feedback_reasons.identify_given_values"),
          `\\text{${escapeLatexText(quest.data.molecule)}}: ${quest.data.bondedAtoms} \\text{ bonded atoms and } ${quest.data.lonePairs} \\text{ lone pairs}`
        )
      );
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          `\\text{VSEPR uses the total electron domains around the central atom: } ${quest.data.bondedAtoms} + ${quest.data.lonePairs} = ${totalDomains}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\text{AXE analysis gives } AX_${quest.data.bondedAtoms}E_${quest.data.lonePairs},\\text{ which corresponds to } \\text{${escapeLatexText(geometry)}}`
        )
      );
      break;
    }
    case "HYBRIDIZATION": {
      if (!quest.data || quest.data.kind !== "HYBRIDIZATION") {
        return { steps: [], fullSolutionLatex: null };
      }
      const hybridization = hybridizationRule(quest.data.electronDomains);
      if (!hybridization) {
        return { steps: [], fullSolutionLatex: null };
      }
      steps.push(
        makeStep(
          1,
          t("common.feedback_reasons.identify_given_values"),
          `\\text{${escapeLatexText(quest.data.molecule)}} \\text{ has } ${quest.data.electronDomains} \\text{ electron domains around the central atom}`
        )
      );
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          "\\text{Hybridization follows the domain count: } 2\\to sp,\\ 3\\to sp^2,\\ 4\\to sp^3,\\ 5\\to sp^3d,\\ 6\\to sp^3d^2"
        )
      );
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\text{For } ${quest.data.electronDomains} \\text{ domains, the central atom is } ${hybridization}`
        )
      );
      break;
    }
    case "MO_THEORY": {
      if (!quest.data || quest.data.kind !== "MO_THEORY") {
        return { steps: [], fullSolutionLatex: null };
      }
      const bondOrder = (quest.data.bondingElectrons - quest.data.antibondingElectrons) / 2;
      steps.push(
        makeStep(
          1,
          t("common.feedback_reasons.identify_given_values"),
          `\\text{${escapeLatexText(quest.data.species)}}: n_b = ${quest.data.bondingElectrons},\\ n_a = ${quest.data.antibondingElectrons}`
        )
      );
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          "\\text{Bond order} = \\frac{1}{2}(n_b - n_a)"
        )
      );
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\frac{1}{2}(${quest.data.bondingElectrons} - ${quest.data.antibondingElectrons}) = ${bondOrder}`
        )
      );
      break;
    }
    default:
      return { steps: [], fullSolutionLatex: null };
  }

  steps.push(makeStep(steps.length + 1, t("common.feedback_reasons.state_final_result"), quest.correctLatex, "key"));
  return { steps, fullSolutionLatex: buildFullSolution(steps) };
}
