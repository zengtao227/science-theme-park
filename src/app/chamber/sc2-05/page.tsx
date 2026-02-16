"use client";

import { useEffect, useCallback } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AcidBaseVisualization from "@/components/chamber/sc2-05/AcidBaseVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

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

const round2 = (v: number) => Math.round(v * 100) / 100;

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
              context: "Calculate pH of 0.1M HCl solution",
              promptLatex: "\\text{pH} = -\\log[H^+]",
              expressionLatex: "[HCl] = 0.1\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 1.0 }],
              correctLatex: "1.0",
              substance: "HCl",
              concentration: 0.1,
              pH: 1.0,
              reactionType: "dissociation"
            },
            {
              id: "PH_B2", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Calculate pH of pure water at 25°C",
              promptLatex: "\\text{pH} = -\\log[H^+]",
              expressionLatex: "[H^+] = 10^{-7}\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 7.0 }],
              correctLatex: "7.0",
              substance: "H2O",
              pH: 7.0,
              reactionType: "dissociation"
            },
            {
              id: "PH_B3", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Calculate pH of 0.01M NaOH solution",
              promptLatex: "\\text{pOH} = -\\log[OH^-], \\text{pH} = 14 - \\text{pOH}",
              expressionLatex: "[NaOH] = 0.01\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 12.0 }],
              correctLatex: "12.0",
              substance: "NaOH",
              concentration: 0.01,
              pH: 12.0,
              reactionType: "dissociation"
            },
            {
              id: "PH_B4", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Calculate pH of 0.001M HNO3 solution",
              promptLatex: "\\text{pH} = -\\log[H^+]",
              expressionLatex: "[HNO_3] = 0.001\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 3.0 }],
              correctLatex: "3.0",
              substance: "HNO3",
              concentration: 0.001,
              pH: 3.0,
              reactionType: "dissociation"
            },
            {
              id: "PH_B5", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Calculate pH of 0.0001M KOH solution",
              promptLatex: "\\text{pOH} = -\\log[OH^-], \\text{pH} = 14 - \\text{pOH}",
              expressionLatex: "[KOH] = 0.0001\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 10.0 }],
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
              context: "Calculate pH of weak acid CH3COOH (Ka = 1.8×10⁻⁵, C = 0.1M)",
              promptLatex: "\\text{pH} = \\frac{1}{2}(\\text{pKa} - \\log C)",
              expressionLatex: "K_a = 1.8 \\times 10^{-5}, C = 0.1\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 2.9 }],
              correctLatex: "2.9",
              substance: "CH3COOH",
              concentration: 0.1,
              pH: 2.9,
              reactionType: "dissociation"
            },
            {
              id: "PH_C2", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Buffer solution: 0.1M CH3COOH + 0.1M CH3COONa, find pH",
              promptLatex: "\\text{pH} = \\text{pKa} + \\log\\frac{[A^-]}{[HA]}",
              expressionLatex: "\\text{pKa} = 4.76, [A^-] = [HA]",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 4.8 }],
              correctLatex: "4.8",
              pH: 4.8,
              reactionType: "buffer"
            },
            {
              id: "PH_C3", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Calculate pH of 0.01M NH3 solution (Kb = 1.8×10⁻⁵)",
              promptLatex: "\\text{pOH} = \\frac{1}{2}(\\text{pKb} - \\log C)",
              expressionLatex: "K_b = 1.8 \\times 10^{-5}, C = 0.01\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 10.6 }],
              correctLatex: "10.6",
              substance: "NH3",
              concentration: 0.01,
              pH: 10.6,
              reactionType: "dissociation"
            },
            {
              id: "PH_C4", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Mixed buffer: 0.2M HA + 0.1M A⁻, pKa = 5.0",
              promptLatex: "\\text{pH} = \\text{pKa} + \\log\\frac{[A^-]}{[HA]}",
              expressionLatex: "\\text{pKa} = 5.0, \\frac{[A^-]}{[HA]} = \\frac{0.1}{0.2}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 4.7 }],
              correctLatex: "4.7",
              pH: 4.7,
              reactionType: "buffer"
            },
            {
              id: "PH_C5", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Calculate pH after diluting 0.1M HCl to 0.001M",
              promptLatex: "\\text{pH} = -\\log[H^+]",
              expressionLatex: "[H^+] = 0.001\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 3.0 }],
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
              context: "Polyprotic acid H2SO4: first dissociation complete, second Ka2 = 1.2×10⁻²",
              promptLatex: "\\text{pH (polyprotic)}",
              expressionLatex: "[H_2SO_4] = 0.1\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 1.2 }],
              correctLatex: "1.2",
              substance: "H2SO4",
              concentration: 0.1,
              pH: 1.2,
              reactionType: "polyprotic"
            },
            {
              id: "PH_A2", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Henderson-Hasselbalch: pH = 5.5, pKa = 4.76, find [A⁻]/[HA]",
              promptLatex: "\\text{pH} = \\text{pKa} + \\log\\frac{[A^-]}{[HA]}",
              expressionLatex: "\\text{pH} = 5.5, \\text{pKa} = 4.76",
              targetLatex: "\\frac{[A^-]}{[HA]}",
              slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: "?", expected: 5.5 }],
              correctLatex: "5.5",
              pH: 5.5,
              reactionType: "buffer"
            },
            {
              id: "PH_A3", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Amino acid glycine at isoelectric point (pI = 6.0)",
              promptLatex: "\\text{pI} = \\frac{\\text{pKa}_1 + \\text{pKa}_2}{2}",
              expressionLatex: "\\text{pKa}_1 = 2.3, \\text{pKa}_2 = 9.6",
              targetLatex: "\\text{pI}",
              slots: [{ id: "pi", labelLatex: "\\text{pI}", placeholder: "?", expected: 6.0 }],
              correctLatex: "6.0",
              pH: 6.0,
              reactionType: "amphoteric"
            },
            {
              id: "PH_A4", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Calculate pH of 0.05M H3PO4 (Ka1 = 7.5×10⁻³)",
              promptLatex: "\\text{pH (triprotic)}",
              expressionLatex: "K_{a1} = 7.5 \\times 10^{-3}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 1.8 }],
              correctLatex: "1.8",
              substance: "H3PO4",
              concentration: 0.05,
              pH: 1.8,
              reactionType: "polyprotic"
            },
            {
              id: "PH_A5", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Buffer capacity: 0.5M CH3COOH + 0.5M CH3COONa",
              promptLatex: "\\beta = 2.303 \\times C \\times \\frac{K_a[H^+]}{(K_a + [H^+])^2}",
              expressionLatex: "C = 0.5\\text{M}, \\text{pKa} = 4.76",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 4.8 }],
              correctLatex: "4.8",
              pH: 4.8,
              reactionType: "buffer"
            },
          ],
          ELITE: [
            {
              id: "PH_E1", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Complex buffer with activity coefficients (ionic strength = 0.1)",
              promptLatex: "\\text{pH} = \\text{pKa} + \\log\\frac{\\gamma_{A^-}[A^-]}{\\gamma_{HA}[HA]}",
              expressionLatex: "\\gamma_{A^-} = 0.8, \\gamma_{HA} = 1.0",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 4.7 }],
              correctLatex: "4.7",
              pH: 4.7,
              reactionType: "buffer"
            },
            {
              id: "PH_E2", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Temperature effect: pKa changes from 4.76 (25°C) to 4.63 (37°C)",
              promptLatex: "\\text{pH}(T)",
              expressionLatex: "T = 37°C, \\text{pKa} = 4.63",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 4.6 }],
              correctLatex: "4.6",
              pH: 4.6,
              reactionType: "buffer"
            },
            {
              id: "PH_E3", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Zwitterion equilibrium: H3N⁺-CHR-COO⁻",
              promptLatex: "\\text{pH} = \\frac{\\text{pKa}_1 + \\text{pKa}_2}{2}",
              expressionLatex: "\\text{pKa}_1 = 2.2, \\text{pKa}_2 = 9.8",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 6.0 }],
              correctLatex: "6.0",
              pH: 6.0,
              reactionType: "amphoteric"
            },
            {
              id: "PH_E4", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "CO2-HCO3⁻ blood buffer system (pKa = 6.1, [HCO3⁻]/[CO2] = 20)",
              promptLatex: "\\text{pH} = 6.1 + \\log(20)",
              expressionLatex: "\\frac{[HCO_3^-]}{[CO_2]} = 20",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 7.4 }],
              correctLatex: "7.4",
              pH: 7.4,
              reactionType: "buffer"
            },
            {
              id: "PH_E5", difficulty, stage,
              scenario: t("sc2_05.scenarios.ph_basics"),
              context: "Dilution effect on buffer: 10× dilution of 0.1M buffer",
              promptLatex: "\\text{pH}_{\\text{diluted}}",
              expressionLatex: "C_{\\text{new}} = 0.01\\text{M}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 4.9 }],
              correctLatex: "4.9",
              pH: 4.9,
              reactionType: "buffer"
            },
          ],
        },
        NEUTRALIZATION: {
          BASIC: [
            {
              id: "NT_B1", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "HCl + NaOH → NaCl + H2O. Calculate moles of salt formed.",
              promptLatex: "n_{\\text{salt}} = n_{\\text{acid}} = n_{\\text{base}}",
              expressionLatex: "n_{HCl} = 0.1\\text{ mol}, n_{NaOH} = 0.1\\text{ mol}",
              targetLatex: "n_{NaCl}",
              slots: [{ id: "moles", labelLatex: "n", placeholder: "?", expected: 0.1, unit: "mol" }],
              correctLatex: "0.1",
              reactionType: "neutralization"
            },
            {
              id: "NT_B2", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "50mL 0.2M HCl + 50mL 0.2M NaOH. Final pH?",
              promptLatex: "\\text{pH}_{\\text{equivalence}}",
              expressionLatex: "\\text{Strong acid + Strong base}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 7.0 }],
              correctLatex: "7.0",
              pH: 7.0,
              reactionType: "neutralization"
            },
            {
              id: "NT_B3", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "25mL 0.1M H2SO4 + 50mL 0.1M NaOH. Complete neutralization?",
              promptLatex: "n_{H^+} = 2 \\times n_{H_2SO_4}",
              expressionLatex: "n_{H^+} = 0.005\\text{ mol}, n_{OH^-} = 0.005\\text{ mol}",
              targetLatex: "\\text{Complete?}",
              slots: [{ id: "complete", labelLatex: "\\text{Yes=1, No=2}", placeholder: "?", expected: 1 }],
              correctLatex: "1",
              reactionType: "neutralization"
            },
            {
              id: "NT_B4", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "20mL 0.15M HNO3 + 30mL 0.1M KOH. Excess reactant?",
              promptLatex: "n_{\\text{excess}}",
              expressionLatex: "n_{H^+} = 0.003, n_{OH^-} = 0.003",
              targetLatex: "\\text{Excess}",
              slots: [{ id: "excess", labelLatex: "\\text{None=0, Acid=1, Base=2}", placeholder: "?", expected: 0 }],
              correctLatex: "0",
              reactionType: "neutralization"
            },
            {
              id: "NT_B5", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "10mL 0.5M HCl + 25mL 0.2M NaOH. Final solution volume?",
              promptLatex: "V_{\\text{total}}",
              expressionLatex: "V_1 + V_2",
              targetLatex: "V",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 35, unit: "mL" }],
              correctLatex: "35",
              volume: 35,
              reactionType: "neutralization"
            },
          ],
          CORE: [
            {
              id: "NT_C1", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Excess acid: 30mL 0.2M HCl + 20mL 0.2M NaOH. Calculate final pH.",
              promptLatex: "[H^+]_{\\text{excess}} = \\frac{n_{\\text{excess}}}{V_{\\text{total}}}",
              expressionLatex: "n_{\\text{excess}} = 0.002\\text{ mol}, V = 50\\text{ mL}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 1.4 }],
              correctLatex: "1.4",
              pH: 1.4,
              reactionType: "neutralization"
            },
            {
              id: "NT_C2", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Excess base: 25mL 0.1M HCl + 40mL 0.1M NaOH. Calculate final pH.",
              promptLatex: "[OH^-]_{\\text{excess}} = \\frac{n_{\\text{excess}}}{V_{\\text{total}}}",
              expressionLatex: "n_{\\text{excess}} = 0.0015\\text{ mol}, V = 65\\text{ mL}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 12.4 }],
              correctLatex: "12.4",
              pH: 12.4,
              reactionType: "neutralization"
            },
            {
              id: "NT_C3", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Diprotic acid: H2SO4 + 2NaOH → Na2SO4 + 2H2O. Mole ratio?",
              promptLatex: "\\frac{n_{H_2SO_4}}{n_{NaOH}}",
              expressionLatex: "\\text{Stoichiometry: 1:2}",
              targetLatex: "\\text{ratio}",
              slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: "?", expected: 0.5 }],
              correctLatex: "0.5",
              reactionType: "neutralization"
            },
            {
              id: "NT_C4", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Heat of neutralization: ΔH = -57.3 kJ/mol for strong acid/base",
              promptLatex: "Q = n \\times \\Delta H",
              expressionLatex: "n = 0.1\\text{ mol}",
              targetLatex: "Q",
              slots: [{ id: "heat", labelLatex: "Q", placeholder: "?", expected: -5.7, unit: "kJ" }],
              correctLatex: "-5.7",
              reactionType: "neutralization"
            },
            {
              id: "NT_C5", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Mixed neutralization: 20mL 0.1M HCl + 20mL 0.1M CH3COOH + 40mL 0.1M NaOH",
              promptLatex: "\\text{pH}_{\\text{final}}",
              expressionLatex: "\\text{Total acid} = 0.004\\text{ mol}, \\text{Base} = 0.004\\text{ mol}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 8.9 }],
              correctLatex: "8.9",
              pH: 8.9,
              reactionType: "neutralization"
            },
          ],
          ADVANCED: [
            {
              id: "NT_A1", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Weak acid + strong base: CH3COOH + NaOH. pH at equivalence point?",
              promptLatex: "\\text{pH} > 7 \\text{ (salt hydrolysis)}",
              expressionLatex: "\\text{pKa} = 4.76",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 8.9 }],
              correctLatex: "8.9",
              pH: 8.9,
              reactionType: "neutralization"
            },
            {
              id: "NT_A2", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Weak base + strong acid: NH3 + HCl. pH at equivalence point?",
              promptLatex: "\\text{pH} < 7 \\text{ (salt hydrolysis)}",
              expressionLatex: "\\text{pKb} = 4.76",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 5.1 }],
              correctLatex: "5.1",
              pH: 5.1,
              reactionType: "neutralization"
            },
            {
              id: "NT_A3", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Partial neutralization: 50mL 0.1M CH3COOH + 25mL 0.1M NaOH",
              promptLatex: "\\text{pH} = \\text{pKa} + \\log\\frac{[A^-]}{[HA]}",
              expressionLatex: "\\text{Half-neutralized: pH = pKa}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 4.8 }],
              correctLatex: "4.8",
              pH: 4.8,
              reactionType: "neutralization"
            },
            {
              id: "NT_A4", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Polyprotic neutralization: H3PO4 + 3NaOH → Na3PO4 + 3H2O",
              promptLatex: "n_{\\text{base required}}",
              expressionLatex: "n_{H_3PO_4} = 0.05\\text{ mol}",
              targetLatex: "n_{NaOH}",
              slots: [{ id: "moles", labelLatex: "n", placeholder: "?", expected: 0.15, unit: "mol" }],
              correctLatex: "0.15",
              reactionType: "neutralization"
            },
            {
              id: "NT_A5", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Conductometric titration: conductivity minimum at equivalence point",
              promptLatex: "V_{\\text{equivalence}}",
              expressionLatex: "25\\text{mL } 0.1\\text{M HCl} + 0.1\\text{M NaOH}",
              targetLatex: "V",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 25, unit: "mL" }],
              correctLatex: "25",
              volume: 25,
              reactionType: "neutralization"
            },
          ],
          ELITE: [
            {
              id: "NT_E1", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Simultaneous neutralization: H2SO4 + 2NH3 → (NH4)2SO4",
              promptLatex: "\\text{pH}_{\\text{salt solution}}",
              expressionLatex: "\\text{pKa}(NH_4^+) = 9.25",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 5.5 }],
              correctLatex: "5.5",
              pH: 5.5,
              reactionType: "neutralization"
            },
            {
              id: "NT_E2", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Back titration: excess HCl + CaCO3, then titrate remaining HCl with NaOH",
              promptLatex: "n_{CaCO_3}",
              expressionLatex: "n_{HCl,\\text{initial}} = 0.1, n_{HCl,\\text{remaining}} = 0.04",
              targetLatex: "n",
              slots: [{ id: "moles", labelLatex: "n", placeholder: "?", expected: 0.03, unit: "mol" }],
              correctLatex: "0.03",
              reactionType: "neutralization"
            },
            {
              id: "NT_E3", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Amphoteric neutralization: Al(OH)3 + HCl and Al(OH)3 + NaOH",
              promptLatex: "\\text{Dual behavior}",
              expressionLatex: "\\text{Acts as both acid and base}",
              targetLatex: "\\text{Type}",
              slots: [{ id: "type", labelLatex: "\\text{Amphoteric=1}", placeholder: "?", expected: 1 }],
              correctLatex: "1",
              reactionType: "amphoteric"
            },
            {
              id: "NT_E4", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Redox-neutralization: Fe²⁺ + MnO4⁻ in acidic solution",
              promptLatex: "\\text{Combined reaction}",
              expressionLatex: "5Fe^{2+} + MnO_4^- + 8H^+ \\to 5Fe^{3+} + Mn^{2+} + 4H_2O",
              targetLatex: "n_{\\text{ratio}}",
              slots: [{ id: "ratio", labelLatex: "\\text{Fe:Mn}", placeholder: "?", expected: 5 }],
              correctLatex: "5",
              reactionType: "redox"
            },
            {
              id: "NT_E5", difficulty, stage,
              scenario: t("sc2_05.scenarios.neutralization"),
              context: "Complexometric neutralization: EDTA titration of Ca²⁺",
              promptLatex: "n_{EDTA} = n_{Ca^{2+}}",
              expressionLatex: "\\text{1:1 complex formation}",
              targetLatex: "\\text{ratio}",
              slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: "?", expected: 1 }],
              correctLatex: "1",
              reactionType: "complexation"
            },
          ],
        },
        TITRATION: {
          BASIC: [
            {
              id: "TT_B1", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "C₁V₁ = C₂V₂. Find volume of 0.2M NaOH to neutralize 25mL 0.1M HCl.",
              promptLatex: "V_2 = \\frac{C_1V_1}{C_2}",
              expressionLatex: "C_1 = 0.1, V_1 = 25, C_2 = 0.2",
              targetLatex: "V_2",
              slots: [{ id: "volume", labelLatex: "V_2", placeholder: "?", expected: 12.5, unit: "mL" }],
              correctLatex: "12.5",
              volume: 12.5,
              reactionType: "titration"
            },
            {
              id: "TT_B2", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "20mL unknown HCl neutralized by 30mL 0.15M NaOH. Find [HCl].",
              promptLatex: "C_1 = \\frac{C_2V_2}{V_1}",
              expressionLatex: "C_2 = 0.15, V_2 = 30, V_1 = 20",
              targetLatex: "C_1",
              slots: [{ id: "conc", labelLatex: "C_1", placeholder: "?", expected: 0.225, unit: "M" }],
              correctLatex: "0.225",
              concentration: 0.225,
              reactionType: "titration"
            },
            {
              id: "TT_B3", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Titration of 50mL 0.1M CH3COOH with 0.1M NaOH. Equivalence volume?",
              promptLatex: "V_{\\text{eq}} = V_{\\text{acid}}",
              expressionLatex: "\\text{Same concentration: } V_{\\text{eq}} = 50\\text{ mL}",
              targetLatex: "V",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 50, unit: "mL" }],
              correctLatex: "50",
              volume: 50,
              reactionType: "titration"
            },
            {
              id: "TT_B4", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Indicator selection: strong acid/strong base titration. pH at equivalence?",
              promptLatex: "\\text{pH}_{\\text{eq}}",
              expressionLatex: "\\text{Strong/Strong: pH = 7}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 7.0 }],
              correctLatex: "7.0",
              pH: 7.0,
              reactionType: "titration"
            },
            {
              id: "TT_B5", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Burette reading: initial 0.5mL, final 25.8mL. Volume delivered?",
              promptLatex: "V_{\\text{delivered}} = V_{\\text{final}} - V_{\\text{initial}}",
              expressionLatex: "V_{\\text{final}} = 25.8, V_{\\text{initial}} = 0.5",
              targetLatex: "V",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 25.3, unit: "mL" }],
              correctLatex: "25.3",
              volume: 25.3,
              reactionType: "titration"
            },
          ],
          CORE: [
            {
              id: "TT_C1", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Titration curve: identify equivalence point from pH jump (pH 4 → 10)",
              promptLatex: "\\text{Equivalence point}",
              expressionLatex: "\\text{Midpoint of steep rise}",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 7.0 }],
              correctLatex: "7.0",
              pH: 7.0,
              reactionType: "titration"
            },
            {
              id: "TT_C2", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Half-equivalence point: 25mL added to reach equivalence, pH at 12.5mL?",
              promptLatex: "\\text{pH}_{1/2} = \\text{pKa}",
              expressionLatex: "\\text{pKa} = 4.76",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 4.8 }],
              correctLatex: "4.8",
              pH: 4.8,
              reactionType: "titration"
            },
            {
              id: "TT_C3", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Indicator range: phenolphthalein (pH 8.2-10.0). Suitable for weak acid/strong base?",
              promptLatex: "\\text{Suitable?}",
              expressionLatex: "\\text{pH}_{\\text{eq}} \\approx 8.9",
              targetLatex: "\\text{Yes=1, No=2}",
              slots: [{ id: "suitable", labelLatex: "\\text{Answer}", placeholder: "?", expected: 1 }],
              correctLatex: "1",
              reactionType: "titration"
            },
            {
              id: "TT_C4", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Diprotic titration: H2SO4 has two equivalence points. First at pH?",
              promptLatex: "\\text{pH}_{\\text{eq1}}",
              expressionLatex: "\\text{Strong acid: pH} < 7",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}", placeholder: "?", expected: 4.5 }],
              correctLatex: "4.5",
              pH: 4.5,
              reactionType: "titration"
            },
            {
              id: "TT_C5", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Precision: three trials give 24.8, 25.1, 24.9 mL. Average volume?",
              promptLatex: "\\bar{V} = \\frac{\\sum V_i}{n}",
              expressionLatex: "V_1 = 24.8, V_2 = 25.1, V_3 = 24.9",
              targetLatex: "\\bar{V}",
              slots: [{ id: "avg", labelLatex: "\\bar{V}", placeholder: "?", expected: 24.9, unit: "mL" }],
              correctLatex: "24.9",
              volume: 24.9,
              reactionType: "titration"
            },
          ],
          ADVANCED: [
            {
              id: "TT_A1", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Weak acid titration curve: calculate pH at 10%, 50%, 90%, 100% neutralization",
              promptLatex: "\\text{pH}_{50\\%} = \\text{pKa}",
              expressionLatex: "\\text{pKa} = 4.76",
              targetLatex: "\\text{pH}",
              slots: [{ id: "ph", labelLatex: "\\text{pH}_{50\\%}", placeholder: "?", expected: 4.8 }],
              correctLatex: "4.8",
              pH: 4.8,
              reactionType: "titration"
            },
            {
              id: "TT_A2", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Buffer region: pH changes slowly between 25-75% neutralization",
              promptLatex: "\\Delta \\text{pH}",
              expressionLatex: "\\text{pH}_{75\\%} - \\text{pH}_{25\\%} \\approx 1.2",
              targetLatex: "\\Delta \\text{pH}",
              slots: [{ id: "delta", labelLatex: "\\Delta \\text{pH}", placeholder: "?", expected: 1.2 }],
              correctLatex: "1.2",
              reactionType: "titration"
            },
            {
              id: "TT_A3", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Polyprotic acid: H3PO4 titration shows 3 equivalence points",
              promptLatex: "\\text{Number of equivalence points}",
              expressionLatex: "\\text{Triprotic acid}",
              targetLatex: "n",
              slots: [{ id: "n", labelLatex: "n", placeholder: "?", expected: 3 }],
              correctLatex: "3",
              reactionType: "titration"
            },
            {
              id: "TT_A4", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Derivative titration: d(pH)/dV maximum at equivalence point",
              promptLatex: "\\frac{d(\\text{pH})}{dV}_{\\text{max}}",
              expressionLatex: "\\text{Locate inflection point}",
              targetLatex: "V_{\\text{eq}}",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 25.0, unit: "mL" }],
              correctLatex: "25.0",
              volume: 25.0,
              reactionType: "titration"
            },
            {
              id: "TT_A5", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Gran plot: linearization method for weak acid titration",
              promptLatex: "\\text{Linear extrapolation}",
              expressionLatex: "V \\times 10^{-\\text{pH}} \\text{ vs } V",
              targetLatex: "V_{\\text{eq}}",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 25.0, unit: "mL" }],
              correctLatex: "25.0",
              volume: 25.0,
              reactionType: "titration"
            },
          ],
          ELITE: [
            {
              id: "TT_E1", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Potentiometric titration: E vs V curve, equivalence at maximum dE/dV",
              promptLatex: "\\frac{dE}{dV}_{\\text{max}}",
              expressionLatex: "\\text{Electrode potential jump}",
              targetLatex: "V_{\\text{eq}}",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 25.0, unit: "mL" }],
              correctLatex: "25.0",
              volume: 25.0,
              reactionType: "titration"
            },
            {
              id: "TT_E2", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Spectrophotometric titration: absorbance change at equivalence",
              promptLatex: "\\text{Absorbance break}",
              expressionLatex: "\\lambda = 520\\text{ nm}",
              targetLatex: "V_{\\text{eq}}",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 24.8, unit: "mL" }],
              correctLatex: "24.8",
              volume: 24.8,
              reactionType: "titration"
            },
            {
              id: "TT_E3", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Thermometric titration: ΔT maximum at equivalence (exothermic neutralization)",
              promptLatex: "\\Delta T_{\\text{max}}",
              expressionLatex: "\\text{Heat of neutralization}",
              targetLatex: "V_{\\text{eq}}",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 25.0, unit: "mL" }],
              correctLatex: "25.0",
              volume: 25.0,
              reactionType: "titration"
            },
            {
              id: "TT_E4", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Complexometric titration: EDTA with metal ion indicator (Eriochrome Black T)",
              promptLatex: "\\text{Color change}",
              expressionLatex: "\\text{Red} \\to \\text{Blue at equivalence}",
              targetLatex: "V_{\\text{eq}}",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 20.0, unit: "mL" }],
              correctLatex: "20.0",
              volume: 20.0,
              reactionType: "complexation"
            },
            {
              id: "TT_E5", difficulty, stage,
              scenario: t("sc2_05.scenarios.titration"),
              context: "Redox titration: KMnO4 self-indicating (purple → colorless at equivalence)",
              promptLatex: "\\text{Visual endpoint}",
              expressionLatex: "MnO_4^- \\to Mn^{2+}",
              targetLatex: "V_{\\text{eq}}",
              slots: [{ id: "volume", labelLatex: "V", placeholder: "?", expected: 18.5, unit: "mL" }],
              correctLatex: "18.5",
              volume: 18.5,
              reactionType: "redox"
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
  } = useQuestManager({
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
              <BlockMath math={quest.promptLatex} />
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
