"use client";

import { useEffect, useCallback } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AcidBaseVisualization from "@/components/chamber/sc2-05/AcidBaseVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { renderMixedText } from "@/lib/latex-utils";

type Stage = "PH_BASICS" | "NEUTRALIZATION" | "TITRATION";

type AcidBaseQuest = Quest & {
  stage: Stage;
  context?: string;
  scenario?: string;
  substance?: string;
  concentration?: number;
  volume?: number;
  pH?: number;
  reactionType?: string;
};

export default function SC205Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();

  const buildStagePool = useCallback(
    (difficulty: Difficulty, stage: Stage): AcidBaseQuest[] => {
      const pools: Record<Stage, Record<Difficulty, AcidBaseQuest[]>> = {
        PH_BASICS: {
          BASIC: [
            {
              id: "PH_B1", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_B1"),
              promptLatex: t("sc2_05.prompts.ph_b1"),
              expressionLatex: "[HCl] = 0.1\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 1.0 }],
              correctLatex: "1.0",
              substance: "HCl",
              concentration: 0.1,
              pH: 1.0,
              reactionType: "dissociation"
            },
            {
              id: "PH_B2", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_B2"),
              promptLatex: t("sc2_05.prompts.ph_b2"),
              expressionLatex: "[H^+] = 10^{-7}\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 7.0 }],
              correctLatex: "7.0",
              substance: "H2O",
              pH: 7.0,
              reactionType: "dissociation"
            },
            {
              id: "PH_B3", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_B3"),
              promptLatex: t("sc2_05.prompts.ph_b3"),
              expressionLatex: "[NaOH] = 0.01\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 12.0 }],
              correctLatex: "12.0",
              substance: "NaOH",
              concentration: 0.01,
              pH: 12.0,
              reactionType: "dissociation"
            },
            {
              id: "PH_B4", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_B4"),
              promptLatex: t("sc2_05.prompts.ph_b4"),
              expressionLatex: "[HNO_3] = 0.001\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 3.0 }],
              correctLatex: "3.0",
              substance: "HNO3",
              concentration: 0.001,
              pH: 3.0,
              reactionType: "dissociation"
            },
            {
              id: "PH_B5", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_B5"),
              promptLatex: t("sc2_05.prompts.ph_b5"),
              expressionLatex: "[KOH] = 0.0001\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 10.0 }],
              correctLatex: "10.0",
              substance: "KOH",
              concentration: 0.0001,
              pH: 10.0,
              reactionType: "dissociation"
            },
          ],
          CORE: [
            {
              id: "PH_C1", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_C1"),
              promptLatex: t("sc2_05.prompts.ph_c1"),
              expressionLatex: "K_a = 1.8 \\times 10^{-5}, C = 0.1\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 2.9 }],
              correctLatex: "2.9",
              substance: "CH3COOH",
              concentration: 0.1,
              pH: 2.9,
              reactionType: "dissociation"
            },
            {
              id: "PH_C2", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_C2"),
              promptLatex: t("sc2_05.prompts.ph_c2"),
              expressionLatex: "\\text{pKa} = 4.76, [A^-] = [HA]",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 4.8 }],
              correctLatex: "4.8",
              pH: 4.8,
              reactionType: "buffer"
            },
            {
              id: "PH_C3", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_C3"),
              promptLatex: t("sc2_05.prompts.ph_c3"),
              expressionLatex: "K_b = 1.8 \\times 10^{-5}, C = 0.01\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 10.6 }],
              correctLatex: "10.6",
              substance: "NH3",
              concentration: 0.01,
              pH: 10.6,
              reactionType: "dissociation"
            },
            {
              id: "PH_C4", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_C4"),
              promptLatex: t("sc2_05.prompts.ph_c4"),
              expressionLatex: "\\text{pKa} = 5.0, \\frac{[A^-]}{[HA]} = \\frac{0.1}{0.2}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 4.7 }],
              correctLatex: "4.7",
              pH: 4.7,
              reactionType: "buffer"
            },
            {
              id: "PH_C5", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_C5"),
              promptLatex: t("sc2_05.prompts.ph_c5"),
              expressionLatex: "[H^+] = 0.001\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 3.0 }],
              correctLatex: "3.0",
              substance: "HCl",
              concentration: 0.001,
              pH: 3.0,
              reactionType: "dissociation"
            },
          ],
          ADVANCED: [
            {
              id: "PH_A1", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_A1"),
              promptLatex: t("sc2_05.prompts.ph_a1"),
              expressionLatex: "[H_2SO_4] = 0.1\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 1.2 }],
              correctLatex: "1.2",
              substance: "H2SO4",
              concentration: 0.1,
              pH: 1.2,
              reactionType: "polyprotic"
            },
            {
              id: "PH_A2", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_A2"),
              promptLatex: t("sc2_05.prompts.ph_a2"),
              expressionLatex: "\\text{pH} = 5.5, \\text{pKa} = 4.76",
              targetLatex: "\\frac{[A^-]}{[HA]}",
              slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: t("sc2_05.placeholders.question"), expected: 5.5 }],
              correctLatex: "5.5",
              pH: 5.5,
              reactionType: "buffer"
            },
            {
              id: "PH_A3", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_A3"),
              promptLatex: t("sc2_05.prompts.ph_a3"),
              expressionLatex: "\\text{pKa}_1 = 2.3, \\text{pKa}_2 = 9.6",
              targetLatex: "\\text{pI}",
              slots: [{ id: "pi", labelLatex: "\\text{pI}", placeholder: t("sc2_05.placeholders.question"), expected: 6.0 }],
              correctLatex: "6.0",
              pH: 6.0,
              reactionType: "amphoteric"
            },
            {
              id: "PH_A4", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_A4"),
              promptLatex: t("sc2_05.prompts.ph_a4"),
              expressionLatex: "K_{a1} = 7.5 \\times 10^{-3}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 1.8 }],
              correctLatex: "1.8",
              substance: "H3PO4",
              concentration: 0.05,
              pH: 1.8,
              reactionType: "polyprotic"
            },
            {
              id: "PH_A5", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_A5"),
              promptLatex: t("sc2_05.prompts.ph_a5"),
              expressionLatex: "C = 0.5\\text{M}, \\text{pKa} = 4.76",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 4.8 }],
              correctLatex: "4.8",
              pH: 4.8,
              reactionType: "buffer"
            },
          ],
          ELITE: [
            {
              id: "PH_E1", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_E1"),
              promptLatex: t("sc2_05.prompts.ph_e1"),
              expressionLatex: "pKa_{ideal} = 4.76, \\gamma_{A^-} = 0.8",
              targetLatex: "pKa_{eff}",
              slots: [{ id: "ph", labelLatex: "pKa", placeholder: t("sc2_05.placeholders.question"), expected: 4.66 }],
              correctLatex: "4.66",
              reactionType: "buffer"
            },
            {
              id: "PH_E2", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_E2"),
              promptLatex: t("sc2_05.prompts.ph_e2"),
              expressionLatex: "pKa = 6.25, \\text{ratio} = 20",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 7.55 }],
              correctLatex: "7.55",
              pH: 7.55,
              reactionType: "buffer"
            },
            {
              id: "PH_E3", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_E3"),
              promptLatex: t("sc2_05.prompts.ph_e3"),
              expressionLatex: "pKa_1 = 2.35, pKa_2 = 9.78",
              targetLatex: "pI",
              slots: [{ id: "ph", labelLatex: "pI", placeholder: t("sc2_05.placeholders.question"), expected: 6.07 }],
              correctLatex: "6.07",
              pH: 6.07,
              reactionType: "amphoteric"
            },
            {
              id: "PH_E4", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_E4"),
              promptLatex: t("sc2_05.prompts.ph_e4"),
              expressionLatex: "\\text{pH} = 7.4, [HCO_3^-] = 24\\text{mM}",
              targetLatex: "P_{CO2}",
              slots: [{ id: "pco2", labelLatex: "P_{CO2}", placeholder: t("sc2_05.placeholders.question"), expected: 40 }],
              correctLatex: "40",
              pH: 7.4,
              reactionType: "buffer"
            },
            {
              id: "PH_E5", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: t("sc2_05.contexts.PH_E5"),
              promptLatex: t("sc2_05.prompts.ph_e5"),
              expressionLatex: "[HCO_3^-] = 15\\text{mM}, \\text{pH} = 7.1",
              targetLatex: "P_{CO2}",
              slots: [{ id: "pco2", labelLatex: "P_{CO2}", placeholder: t("sc2_05.placeholders.question"), expected: 50 }],
              correctLatex: "50",
              pH: 7.1,
              reactionType: "buffer"
            },
          ],
        },
        NEUTRALIZATION: {
          BASIC: [
            {
              id: "NT_B1", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_B1"),
              promptLatex: t("sc2_05.prompts.nt_b1"),
              expressionLatex: "n_{HCl} = 0.1\\text{ mol}, n_{NaOH} = 0.1\\text{ mol}",
              targetLatex: "n_{NaCl}",
              slots: [{ id: "moles", labelLatex: "n", placeholder: t("sc2_05.placeholders.question"), expected: 0.1, unit: "mol" }],
              correctLatex: "0.1",
              reactionType: "neutralization"
            },
            {
              id: "NT_B2", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_B2"),
              promptLatex: t("sc2_05.prompts.nt_b2"),
              expressionLatex: "\\text{Strong acid + Strong base}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 7.0 }],
              correctLatex: "7.0",
              pH: 7.0,
              reactionType: "neutralization"
            },
            {
              id: "NT_B3", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_B3"),
              promptLatex: t("sc2_05.prompts.nt_b3"),
              expressionLatex: "n_{H^+} = 0.005\\text{ mol}, n_{OH^-} = 0.005\\text{ mol}",
              targetLatex: "\\text{Complete?}",
              slots: [{ id: "complete", labelLatex: "\\text{Yes=1, No=2}", placeholder: t("sc2_05.placeholders.question"), expected: 1 }],
              correctLatex: "1",
              reactionType: "neutralization"
            },
            {
              id: "NT_B4", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_B4"),
              promptLatex: t("sc2_05.prompts.nt_b4"),
              expressionLatex: "n_{H^+} = 0.003, n_{OH^-} = 0.003",
              targetLatex: "\\text{Excess}",
              slots: [{ id: "excess", labelLatex: "\\text{None=0, Acid=1, Base=2}", placeholder: t("sc2_05.placeholders.question"), expected: 0 }],
              correctLatex: "0",
              reactionType: "neutralization"
            },
            {
              id: "NT_B5", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_B5"),
              promptLatex: t("sc2_05.prompts.nt_b5"),
              expressionLatex: "V_1 + V_2",
              targetLatex: "V",
              slots: [{ id: "volume", labelLatex: "V", placeholder: t("sc2_05.placeholders.question"), expected: 35, unit: "mL" }],
              correctLatex: "35",
              volume: 35,
              reactionType: "neutralization"
            },
          ],
          CORE: [
            {
              id: "NT_C1", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_C1"),
              promptLatex: t("sc2_05.prompts.nt_c1"),
              expressionLatex: "n_{\\text{excess}} = 0.002\\text{ mol}, V = 50\\text{ mL}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 1.4 }],
              correctLatex: "1.4",
              pH: 1.4,
              reactionType: "neutralization"
            },
            {
              id: "NT_C2", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_C2"),
              promptLatex: t("sc2_05.prompts.nt_c2"),
              expressionLatex: "n_{\\text{excess}} = 0.0015\\text{ mol}, V = 65\\text{ mL}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 12.4 }],
              correctLatex: "12.4",
              pH: 12.4,
              reactionType: "neutralization"
            },
            {
              id: "NT_C3", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_C3"),
              promptLatex: t("sc2_05.prompts.nt_c3"),
              expressionLatex: "\\text{Stoichiometry: 1:2}",
              targetLatex: "\\text{ratio}",
              slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: t("sc2_05.placeholders.question"), expected: 0.5 }],
              correctLatex: "0.5",
              reactionType: "neutralization"
            },
            {
              id: "NT_C4", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_C4"),
              promptLatex: t("sc2_05.prompts.nt_c4"),
              expressionLatex: "n = 0.1\\text{ mol}",
              targetLatex: "Q",
              slots: [{ id: "heat", labelLatex: "Q", placeholder: t("sc2_05.placeholders.question"), expected: -5.7, unit: "kJ" }],
              correctLatex: "-5.7",
              reactionType: "neutralization"
            },
            {
              id: "NT_C5", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_C5"),
              promptLatex: t("sc2_05.prompts.nt_c5"),
              expressionLatex: "\\text{Total acid} = 0.004\\text{ mol}, \\text{Base} = 0.004\\text{ mol}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 8.9 }],
              correctLatex: "8.9",
              pH: 8.9,
              reactionType: "neutralization"
            },
          ],
          ADVANCED: [
            {
              id: "NT_A1", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_A1"),
              promptLatex: t("sc2_05.prompts.nt_a1"),
              expressionLatex: "\\text{pKa} = 4.76",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 8.9 }],
              correctLatex: "8.9",
              pH: 8.9,
              reactionType: "neutralization"
            },
            {
              id: "NT_A2", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_A2"),
              promptLatex: t("sc2_05.prompts.nt_a2"),
              expressionLatex: "\\text{pKb} = 4.76",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 5.1 }],
              correctLatex: "5.1",
              pH: 5.1,
              reactionType: "neutralization"
            },
            {
              id: "NT_A3", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_A3"),
              promptLatex: t("sc2_05.prompts.nt_a3"),
              expressionLatex: "\\text{Half-neutralized: pH = pKa}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 4.8 }],
              correctLatex: "4.8",
              pH: 4.8,
              reactionType: "neutralization"
            },
            {
              id: "NT_A4", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_A4"),
              promptLatex: t("sc2_05.prompts.nt_a4"),
              expressionLatex: "n_{H_3PO_4} = 0.05\\text{ mol}",
              targetLatex: "n_{NaOH}",
              slots: [{ id: "moles", labelLatex: "n", placeholder: t("sc2_05.placeholders.question"), expected: 0.15, unit: "mol" }],
              correctLatex: "0.15",
              reactionType: "neutralization"
            },
            {
              id: "NT_A5", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_A5"),
              promptLatex: t("sc2_05.prompts.nt_a5"),
              expressionLatex: "25\\text{mL } 0.1\\text{M HCl} + 0.1\\text{M NaOH}",
              targetLatex: "V",
              slots: [{ id: "volume", labelLatex: "V", placeholder: t("sc2_05.placeholders.question"), expected: 25, unit: "mL" }],
              correctLatex: "25",
              volume: 25,
              reactionType: "neutralization"
            },
          ],
          ELITE: [
            {
              id: "NT_E1", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_E1"),
              promptLatex: t("sc2_05.prompts.nt_e1"),
              expressionLatex: "n_{H_2CO_3} = 0.02\\text{ mol}",
              targetLatex: "n_{OH^-}",
              slots: [{ id: "moles", labelLatex: "n", placeholder: t("sc2_05.placeholders.question"), expected: 0.04, unit: "mol" }],
              correctLatex: "0.04",
              reactionType: "neutralization"
            },
            {
              id: "NT_E2", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_E2"),
              promptLatex: t("sc2_05.prompts.nt_e2"),
              expressionLatex: "n_{HPO_4^{2-}} = 0.1\\text{ mol}",
              targetLatex: "n_{H^+}",
              slots: [{ id: "moles", labelLatex: "n", placeholder: t("sc2_05.placeholders.question"), expected: 0.1, unit: "mol" }],
              correctLatex: "0.1",
              reactionType: "amphoteric"
            },
            {
              id: "NT_E3", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_E3"),
              promptLatex: t("sc2_05.prompts.nt_e3"),
              expressionLatex: "V = 100\\text{L}, C = 0.05\\text{M}",
              targetLatex: "n",
              slots: [{ id: "moles", labelLatex: "n", placeholder: t("sc2_05.placeholders.question"), expected: 5, unit: "mol" }],
              correctLatex: "5",
              reactionType: "neutralization"
            },
            {
              id: "NT_E4", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_E4"),
              promptLatex: t("sc2_05.prompts.nt_e4"),
              expressionLatex: "n_{\\text{lactic acid}} = 0.05\\text{ mol}",
              targetLatex: "n_{HCO_3^-}",
              slots: [{ id: "moles", labelLatex: "n", placeholder: t("sc2_05.placeholders.question"), expected: 0.05, unit: "mol" }],
              correctLatex: "0.05",
              reactionType: "neutralization"
            },
            {
              id: "NT_E5", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: t("sc2_05.contexts.NT_E5"),
              promptLatex: t("sc2_05.prompts.nt_e5"),
              expressionLatex: "n_{NH_4^+} = 0.1\\text{ mol}",
              targetLatex: "n_{HCO_3^-}",
              slots: [{ id: "moles", labelLatex: "n", placeholder: t("sc2_05.placeholders.question"), expected: 0.1, unit: "mol" }],
              correctLatex: "0.1",
              reactionType: "neutralization"
            },
          ],
        },
        TITRATION: {
          BASIC: [
            {
              id: "TT_B1", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_B1"),
              promptLatex: t("sc2_05.prompts.tt_b1"),
              expressionLatex: "C_1 = 0.1, V_1 = 25, C_2 = 0.2",
              targetLatex: "V_2",
              slots: [{ id: "volume", labelLatex: "V_2", placeholder: t("sc2_05.placeholders.question"), expected: 12.5, unit: "mL" }],
              correctLatex: "12.5",
              volume: 12.5,
              reactionType: "titration"
            },
            {
              id: "TT_B2", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_B2"),
              promptLatex: t("sc2_05.prompts.tt_b2"),
              expressionLatex: "C_2 = 0.15, V_2 = 30, V_1 = 20",
              targetLatex: "C_1",
              slots: [{ id: "conc", labelLatex: "C_1", placeholder: t("sc2_05.placeholders.question"), expected: 0.225, unit: "M" }],
              correctLatex: "0.225",
              concentration: 0.225,
              reactionType: "titration"
            },
            {
              id: "TT_B3", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_B3"),
              promptLatex: t("sc2_05.prompts.tt_b3"),
              expressionLatex: "\\text{Same concentration: } V_{\\text{eq}} = 50\\text{ mL}",
              targetLatex: "V",
              slots: [{ id: "volume", labelLatex: "V", placeholder: t("sc2_05.placeholders.question"), expected: 50, unit: "mL" }],
              correctLatex: "50",
              volume: 50,
              reactionType: "titration"
            },
            {
              id: "TT_B4", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_B4"),
              promptLatex: t("sc2_05.prompts.tt_b4"),
              expressionLatex: "\\text{Strong/Strong: pH = 7}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 7.0 }],
              correctLatex: "7.0",
              pH: 7.0,
              reactionType: "titration"
            },
            {
              id: "TT_B5", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_B5"),
              promptLatex: t("sc2_05.prompts.tt_b5"),
              expressionLatex: "V_{\\text{final}} = 25.8, V_{\\text{initial}} = 0.5",
              targetLatex: "V",
              slots: [{ id: "volume", labelLatex: "V", placeholder: t("sc2_05.placeholders.question"), expected: 25.3, unit: "mL" }],
              correctLatex: "25.3",
              volume: 25.3,
              reactionType: "titration"
            },
          ],
          CORE: [
            {
              id: "TT_C1", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_C1"),
              promptLatex: t("sc2_05.prompts.tt_c1"),
              expressionLatex: "\\text{Midpoint of steep rise}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 7.0 }],
              correctLatex: "7.0",
              pH: 7.0,
              reactionType: "titration"
            },
            {
              id: "TT_C2", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_C2"),
              promptLatex: t("sc2_05.prompts.tt_c2"),
              expressionLatex: "\\text{pKa} = 4.76",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 4.8 }],
              correctLatex: "4.8",
              pH: 4.8,
              reactionType: "titration"
            },
            {
              id: "TT_C3", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_C3"),
              promptLatex: t("sc2_05.prompts.tt_c3"),
              expressionLatex: "\\text{pH}_{\\text{eq}} \\approx 8.9",
              targetLatex: "\\text{Yes=1, No=2}",
              slots: [{ id: "suitable", labelLatex: t("common.labels.answer"), placeholder: t("sc2_05.placeholders.question"), expected: 1 }],
              correctLatex: "1",
              reactionType: "titration"
            },
            {
              id: "TT_C4", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_C4"),
              promptLatex: t("sc2_05.prompts.tt_c4"),
              expressionLatex: "\\text{Strong acid: pH} < 7",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 4.5 }],
              correctLatex: "4.5",
              pH: 4.5,
              reactionType: "titration"
            },
            {
              id: "TT_C5", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_C5"),
              promptLatex: t("sc2_05.prompts.tt_c5"),
              expressionLatex: "V_1 = 24.8, V_2 = 25.1, V_3 = 24.9",
              targetLatex: "\\bar{V}",
              slots: [{ id: "avg", labelLatex: "\\bar{V}", placeholder: t("sc2_05.placeholders.question"), expected: 24.9, unit: "mL" }],
              correctLatex: "24.9",
              volume: 24.9,
              reactionType: "titration"
            },
          ],
          ADVANCED: [
            {
              id: "TT_A1", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_A1"),
              promptLatex: t("sc2_05.prompts.tt_a1"),
              expressionLatex: "\\text{pKa} = 4.76",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}_{50\\%}", placeholder: t("sc2_05.placeholders.question"), expected: 4.8 }],
              correctLatex: "4.8",
              pH: 4.8,
              reactionType: "titration"
            },
            {
              id: "TT_A2", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_A2"),
              promptLatex: t("sc2_05.prompts.tt_a2"),
              expressionLatex: "\\text{pH}_{75\\%} - \\text{pH}_{25\\%} \\approx 1.2",
              targetLatex: "\\Delta \\text{pH}",
              slots: [{ id: "delta", labelLatex: "\\Delta \\text{pH}", placeholder: t("sc2_05.placeholders.question"), expected: 1.2 }],
              correctLatex: "1.2",
              reactionType: "titration"
            },
            {
              id: "TT_A3", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_A3"),
              promptLatex: t("sc2_05.prompts.tt_a3"),
              expressionLatex: "\\text{Triprotic acid}",
              targetLatex: "n",
              slots: [{ id: "n", labelLatex: "n", placeholder: t("sc2_05.placeholders.question"), expected: 3 }],
              correctLatex: "3",
              reactionType: "titration"
            },
            {
              id: "TT_A4", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_A4"),
              promptLatex: t("sc2_05.prompts.tt_a4"),
              expressionLatex: "\\text{Locate inflection point}",
              targetLatex: "V_{\\text{eq}}",
              slots: [{ id: "volume", labelLatex: "V", placeholder: t("sc2_05.placeholders.question"), expected: 25.0, unit: "mL" }],
              correctLatex: "25.0",
              volume: 25.0,
              reactionType: "titration"
            },
            {
              id: "TT_A5", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_A5"),
              promptLatex: t("sc2_05.prompts.tt_a5"),
              expressionLatex: "V \\times 10^{-\\text{pH}} \\text{ vs } V",
              targetLatex: "V_{\\text{eq}}",
              slots: [{ id: "volume", labelLatex: "V", placeholder: t("sc2_05.placeholders.question"), expected: 25.0, unit: "mL" }],
              correctLatex: "25.0",
              volume: 25.0,
              reactionType: "titration"
            },
          ],
          ELITE: [
            {
              id: "TT_E1", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_E1"),
              promptLatex: t("sc2_05.prompts.tt_e1"),
              expressionLatex: "\\text{pH} = 4.75 \\text{ at 50% titration}",
              targetLatex: "\\text{pKa}",
              slots: [{ id: "pka", labelLatex: "\\text{pKa}", placeholder: t("sc2_05.placeholders.question"), expected: 4.75 }],
              correctLatex: "4.75",
              reactionType: "titration"
            },
            {
              id: "TT_E2", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_E2"),
              promptLatex: t("sc2_05.prompts.tt_e2"),
              expressionLatex: "V_{\\text{intercept}} = 25.4\\text{mL}",
              targetLatex: "V_{\\text{eq}}",
              slots: [{ id: "volume", labelLatex: "V", placeholder: t("sc2_05.placeholders.question"), expected: 25.4, unit: "mL" }],
              correctLatex: "25.4",
              volume: 25.4,
              reactionType: "titration"
            },
            {
              id: "TT_E3", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_E3"),
              promptLatex: t("sc2_05.prompts.tt_e3"),
              expressionLatex: "n_{HCl} = 0.005, n_{NaOH} = 0.002",
              targetLatex: "n",
              slots: [{ id: "moles", labelLatex: "n", placeholder: t("sc2_05.placeholders.question"), expected: 0.003, unit: "mol" }],
              correctLatex: "0.003",
              reactionType: "titration"
            },
            {
              id: "TT_E4", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_E4"),
              promptLatex: t("sc2_05.prompts.tt_e4"),
              expressionLatex: "C_{HCl} = 0.1, V_{HCl} = 2.4, V_{\\text{plasma}} = 10",
              targetLatex: "[HCO_3^-]",
              slots: [{ id: "conc", labelLatex: "C", placeholder: t("sc2_05.placeholders.question"), expected: 0.024, unit: "M" }],
              correctLatex: "0.024",
              reactionType: "titration"
            },
            {
              id: "TT_E5", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: t("sc2_05.contexts.TT_E5"),
              promptLatex: t("sc2_05.prompts.tt_e5"),
              expressionLatex: "m = 0.5106, Mw = 204.22, V = 0.025",
              targetLatex: "C",
              slots: [{ id: "conc", labelLatex: "C", placeholder: t("sc2_05.placeholders.question"), expected: 0.1, unit: "M" }],
              correctLatex: "0.1",
              reactionType: "titration"
            },
          ],
        },
      };

      return pools[stage][difficulty] || [];
    },
    [t]
  );

  const {
    stage: currentStage,
    difficulty: currentDifficulty,
    currentQuest,
    inputs: userAnswer,
    lastCheck,
    setInputs,
    verify,
    next,
    handleStageChange,
    handleDifficultyChange,
    adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager({
    moduleCode: "sc2-05",
    buildPool: (difficulty, stage) => buildStagePool(difficulty, stage as Stage),
    initialStage: "PH_BASICS" as Stage,
  });

  const isCorrect = lastCheck?.ok || null;

  useEffect(() => {
    if (isCorrect && currentQuest) {
      completeStage("sc2-05", currentStage);
    }
  }, [isCorrect, currentStage, currentQuest, completeStage]);

  const quest = currentQuest as AcidBaseQuest | null;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      moduleCode="SC2.05"
      title={t("sc2_05.title") || "SC2.05 // ACID-BASE CHEMISTRY"}
      difficulty={currentDifficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "PH_BASICS", label: t("sc2_05.stages.ph_basics") || "PH BASICS" },
        { id: "NEUTRALIZATION", label: t("sc2_05.stages.neutralization") || "NEUTRALIZATION" },
        { id: "TITRATION", label: t("sc2_05.stages.titration") || "TITRATION" },
      ]}
      currentStage={currentStage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      footerLeft={t("sc2_05.footer_left") || "SC2.05_ACIDBASE // NODE: BASEL"}
      translations={{
        back: t("sc2_05.back") || "Back",
        check: t("sc2_05.check") || "Verify",
        next: t("sc2_05.next") || "Next",
        correct: t("sc2_05.correct") || "Correct",
        incorrect: t("sc2_05.incorrect") || "Incorrect",
        ready: t("sc2_05.ready") || "Ready",
        monitor_title: t("sc2_05.monitor_title") || "SC2.05_MONITOR",
        difficulty: {
          basic: t("sc2_05.difficulty.basic") || "BASIC",
          core: t("sc2_05.difficulty.core") || "CORE",
          advanced: t("sc2_05.difficulty.advanced") || "ADVANCED",
          elite: t("sc2_05.difficulty.elite") || "ELITE",
        },
      }}
      monitorContent={
        <AcidBaseVisualization
          quest={quest}
          inputs={userAnswer}
          checkStatus={lastCheck}
        />
      }
    >
      <div className="space-y-8">
        {quest?.scenario && (
          <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-black mb-3">
              {t("sc2_05.scenario_title") || "BASEL SCENARIO"}
            </div>
            <p className="text-white/90 leading-relaxed font-medium">{quest.scenario}</p>
          </div>
        )}

        {quest?.context && (
          <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-black mb-3">
              {t("sc2_05.objective_title") || "PROBLEM"}
            </div>
            <p className="text-white/80 leading-relaxed">{quest.context}</p>
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            FORMULA
          </div>
          {quest?.promptLatex && (
            <div className="text-2xl text-white font-black">
              {renderMixedText(quest.promptLatex)}
            </div>
          )}
        </div>

        {quest?.expressionLatex && (
          <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-green-400 font-black mb-3">
              GIVEN
            </div>
            <div className="text-center">
              <BlockMath math={quest.expressionLatex} />
            </div>
          </div>
        )}

        <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-black mb-3">
            {t("sc2_05.answer_title") || "YOUR ANSWER"}
          </div>
          {quest?.slots.map((slot) => (
            <div key={slot.id} className="space-y-2">
              <label className="text-sm text-blue-300 font-medium">
                <InlineMath math={slot.labelLatex} />
                {slot.unit && ` (${slot.unit})`}
              </label>
              <input
                type="text"
                placeholder={slot.placeholder}
                value={userAnswer[slot.id] || ""}
                onChange={(e) =>
                  setInputs((prev: Record<string, string>) => ({
                    ...prev,
                    [slot.id]: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-black/50 border border-blue-500/50 rounded-lg text-blue-100 text-lg font-mono focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              />
            </div>
          ))}
        </div>
      </div>
    </ChamberLayout>
  );
}
