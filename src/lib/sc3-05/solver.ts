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

function vseprGeometryKey(bondedAtoms: number, lonePairs: number) {
  switch (`${bondedAtoms}:${lonePairs}`) {
    case "2:0":
      return "linear";
    case "3:0":
      return "trigonal_planar";
    case "2:1":
      return "bent";
    case "4:0":
      return "tetrahedral";
    case "3:1":
      return "trigonal_pyramidal";
    case "2:2":
      return "bent";
    case "5:0":
      return "trigonal_bipyramidal";
    case "4:1":
      return "seesaw";
    case "3:2":
      return "t_shaped";
    case "2:3":
      return "linear";
    case "6:0":
      return "octahedral";
    case "5:1":
      return "square_pyramidal";
    case "4:2":
      return "square_planar";
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
      const geometryKey = vseprGeometryKey(quest.data.bondedAtoms, quest.data.lonePairs);
      if (!geometryKey) {
        return { steps: [], fullSolutionLatex: null };
      }
      const geometry = t(`chemistry.sc3_05.solver.geometry.${geometryKey}`);
      steps.push(
        makeStep(
          1,
          t("common.feedback_reasons.identify_given_values"),
          `\\text{${escapeLatexText(
            t("chemistry.sc3_05.solver.vsepr_identify", {
              molecule: quest.data.molecule,
              bondedAtoms: String(quest.data.bondedAtoms),
              lonePairs: String(quest.data.lonePairs),
            })
          )}}`
        )
      );
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          `\\text{${escapeLatexText(
            t("chemistry.sc3_05.solver.vsepr_rule", {
              bondedAtoms: String(quest.data.bondedAtoms),
              lonePairs: String(quest.data.lonePairs),
              totalDomains: String(totalDomains),
            })
          )}}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\text{${escapeLatexText(
            t("chemistry.sc3_05.solver.vsepr_solve_prefix")
          )}}\\; AX_${quest.data.bondedAtoms}E_${quest.data.lonePairs}\\; \\text{${escapeLatexText(
            t("chemistry.sc3_05.solver.vsepr_solve_suffix", { geometry })
          )}}`
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
          `\\text{${escapeLatexText(
            t("chemistry.sc3_05.solver.hybridization_identify", {
              molecule: quest.data.molecule,
              electronDomains: String(quest.data.electronDomains),
            })
          )}}`
        )
      );
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          `\\text{${escapeLatexText(t("chemistry.sc3_05.solver.hybridization_rule"))}}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\text{${escapeLatexText(
            t("chemistry.sc3_05.solver.hybridization_solve", {
              electronDomains: String(quest.data.electronDomains),
              hybridization,
            })
          )}}`
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
          `\\text{${escapeLatexText(
            t("chemistry.sc3_05.solver.mo_identify", {
              species: quest.data.species,
              bondingElectrons: String(quest.data.bondingElectrons),
              antibondingElectrons: String(quest.data.antibondingElectrons),
            })
          )}}`
        )
      );
      steps.push(
        makeStep(
          2,
          t("common.feedback_reasons.select_formula_or_rule"),
          `\\text{${escapeLatexText(t("chemistry.sc3_05.solver.mo_rule"))}}`
        )
      );
      steps.push(
        makeStep(
          3,
          t("common.feedback_reasons.solve_step_by_step"),
          `\\frac{1}{2}(${quest.data.bondingElectrons} - ${quest.data.antibondingElectrons}) = ${bondOrder}\\; \\text{${escapeLatexText(
            t("chemistry.sc3_05.solver.mo_solve_suffix")
          )}}`
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
