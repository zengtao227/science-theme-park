"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import KineticsCanvas from "@/components/chamber/sc2-01/KineticsCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createModuleFeedbackProvider } from "@/lib/feedback/moduleFeedbackProvider";

type Stage = "ARRHENIUS" | "RATE_LAW" | "HALF_LIFE";
type KineticsQuest = Quest & { 
  stage: Stage; 
  context?: string; 
  scenario?: string;
  temperature?: number;
  activationEnergy?: number;
};

export default function SC201Page() {
  const { completeStage } = useAppStore();
  const { t } = useLanguage();
  const sc2_01_t = t("sc2_01");
  const feedbackContentProvider = useMemo(() => createModuleFeedbackProvider(t, "sc2-01"), [t]);

  const buildStagePool = useCallback((tObj: typeof sc2_01_t, difficulty: Difficulty, stage: Stage): KineticsQuest[] => {
    const pools: Record<Stage, Record<Difficulty, KineticsQuest[]>> = {
      ARRHENIUS: {
        BASIC: [
          {
            id: "ARR_B1", difficulty, stage,
            scenario: tObj.scenarios.arrhenius,
            context: tObj.problems.arr_temp_300_ea_50,
            promptLatex: t("sc2_01.prompts.arr_b"),
            expressionLatex: "T=300\\text{K}, E_a=50\\text{kJ/mol}",
            targetLatex: "k_{\\text{rel}}",
            slots: [{ id: "k", labelLatex: "k", placeholder: t("sc2_01.placeholders.question"), expected: 1.5 }],
            correctLatex: "1.5",
            hintLatex: ["Use R = 8.314 J/(mol·K)", "Convert Ea to J"],
            temperature: 300, activationEnergy: 50
          },
          {
            id: "ARR_B2", difficulty, stage,
            scenario: tObj.scenarios.arrhenius,
            context: tObj.problems.arr_temp_350_ea_40,
            promptLatex: t("sc2_01.prompts.arr_b"),
            expressionLatex: "T=350\\text{K}, E_a=40\\text{kJ/mol}",
            targetLatex: "k_{\\text{rel}}",
            slots: [{ id: "k", labelLatex: "k", placeholder: t("sc2_01.placeholders.question"), expected: 2.8 }],
            correctLatex: "2.8",
            temperature: 350, activationEnergy: 40
          },
          {
            id: "ARR_B3", difficulty, stage,
            scenario: tObj.scenarios.arrhenius,
            context: tObj.problems.arr_temp_400_ea_60,
            promptLatex: t("sc2_01.prompts.arr_b"),
            expressionLatex: "T=400\\text{K}, E_a=60\\text{kJ/mol}",
            targetLatex: "k_{\\text{rel}}",
            slots: [{ id: "k", labelLatex: "k", placeholder: t("sc2_01.placeholders.question"), expected: 3.2 }],
            correctLatex: "3.2",
            temperature: 400, activationEnergy: 60
          },
          {
            id: "ARR_B4", difficulty, stage,
            scenario: tObj.scenarios.arrhenius,
            context: tObj.problems.arr_temp_320_ea_45,
            promptLatex: t("sc2_01.prompts.arr_b"),
            expressionLatex: "T=320\\text{K}, E_a=45\\text{kJ/mol}",
            targetLatex: "k_{\\text{rel}}",
            slots: [{ id: "k", labelLatex: "k", placeholder: t("sc2_01.placeholders.question"), expected: 2.1 }],
            correctLatex: "2.1",
            temperature: 320, activationEnergy: 45
          },
          {
            id: "ARR_B5", difficulty, stage,
            scenario: tObj.scenarios.arrhenius,
            context: tObj.problems.arr_temp_280_ea_55,
            promptLatex: t("sc2_01.prompts.arr_b"),
            expressionLatex: "T=280\\text{K}, E_a=55\\text{kJ/mol}",
            targetLatex: "k_{\\text{rel}}",
            slots: [{ id: "k", labelLatex: "k", placeholder: t("sc2_01.placeholders.question"), expected: 0.8 }],
            correctLatex: "0.8",
            temperature: 280, activationEnergy: 55
          },
        ],
        CORE: [
          { id: "ARR_C1", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_double_temp, promptLatex: t("sc2_01.prompts.arr_c1"), expressionLatex: "T: 300\\to600\\text{K}", targetLatex: "k_{\\text{ratio}}", slots: [{ id: "k", labelLatex: "k_{600}/k_{300}", placeholder: t("sc2_01.placeholders.question"), expected: 100 }], correctLatex: "100", temperature: 600, activationEnergy: 50 },
          { id: "ARR_C2", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_ea_effect, promptLatex: t("sc2_01.prompts.arr_c2"), expressionLatex: "E_a: 80\\to40\\text{kJ/mol}", targetLatex: "k_{\\text{ratio}}", slots: [{ id: "k", labelLatex: "k_{40}/k_{80}", placeholder: t("sc2_01.placeholders.question"), expected: 50 }], correctLatex: "50", temperature: 300, activationEnergy: 40 },
          { id: "ARR_C3", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_ln_form, promptLatex: t("sc2_01.prompts.arr_c3"), expressionLatex: "E_a=50, T=300", targetLatex: "\\ln(k)", slots: [{ id: "lnk", labelLatex: "\\ln(k)", placeholder: t("sc2_01.placeholders.question"), expected: -20 }], correctLatex: "-20", temperature: 300, activationEnergy: 50 },
          { id: "ARR_C4", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_activation, promptLatex: t("sc2_01.prompts.arr_c4"), expressionLatex: "k_2/k_1=10, \\Delta T=50", targetLatex: "E_a", slots: [{ id: "ea", labelLatex: "E_a", placeholder: t("sc2_01.placeholders.question"), expected: 53, unit: "kJ/mol" }], correctLatex: "53", temperature: 350, activationEnergy: 53 },
          { id: "ARR_C5", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_catalyst, promptLatex: t("sc2_01.prompts.arr_c5"), expressionLatex: "E_a: 80\\to60", targetLatex: "\\text{ratio}", slots: [{ id: "ratio", labelLatex: "k_{\\text{ratio}}", placeholder: t("sc2_01.placeholders.question"), expected: 8 }], correctLatex: "8", temperature: 300, activationEnergy: 60 },
        ],
        ADVANCED: [
          { id: "ARR_A1", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_two_temps, promptLatex: t("sc2_01.prompts.arr_a1"), expressionLatex: "T_1=300, T_2=350", targetLatex: "E_a", slots: [{ id: "ea", labelLatex: "E_a", placeholder: t("sc2_01.placeholders.question"), expected: 52, unit: "kJ/mol" }], correctLatex: "52", temperature: 350, activationEnergy: 52 },
          { id: "ARR_A2", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_plot, promptLatex: t("sc2_01.prompts.arr_a2"), expressionLatex: "-E_a/R", targetLatex: "E_a", slots: [{ id: "ea", labelLatex: "E_a", placeholder: t("sc2_01.placeholders.question"), expected: 65, unit: "kJ/mol" }], correctLatex: "65", temperature: 300, activationEnergy: 65 },
          { id: "ARR_A3", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_frequency, promptLatex: t("sc2_01.prompts.arr_a3"), expressionLatex: "k=1.5, E_a=50, T=300", targetLatex: "A", slots: [{ id: "a", labelLatex: "A", placeholder: t("sc2_01.placeholders.question"), expected: 1e13 }], correctLatex: "10^{13}", temperature: 300, activationEnergy: 50 },
          { id: "ARR_A4", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_temp_for_k, promptLatex: t("sc2_01.prompts.arr_a4"), expressionLatex: "k=10^6, E_a=60", targetLatex: "T", slots: [{ id: "t", labelLatex: "T", placeholder: t("sc2_01.placeholders.question"), expected: 450, unit: "K" }], correctLatex: "450", temperature: 450, activationEnergy: 60 },
          { id: "ARR_A5", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_enzyme, promptLatex: t("sc2_01.prompts.arr_a5"), expressionLatex: "E_a=40, T=310", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: t("sc2_01.placeholders.question"), expected: 5.2 }], correctLatex: "5.2", temperature: 310, activationEnergy: 40 },
        ],
        ELITE: [
          { id: "ARR_E1", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_complex, promptLatex: t("sc2_01.prompts.arr_e1"), expressionLatex: "E_{a1}=50, E_{a2}=30", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: t("sc2_01.placeholders.question"), expected: 2.5 }], correctLatex: "2.5", temperature: 300, activationEnergy: 40 },
          { id: "ARR_E2", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_pressure, promptLatex: t("sc2_01.prompts.arr_e2"), expressionLatex: "\\Delta V^\\ddagger=-10", targetLatex: "k_2/k_1", slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: t("sc2_01.placeholders.question"), expected: 1.5 }], correctLatex: "1.5", temperature: 300, activationEnergy: 50 },
          { id: "ARR_E3", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_quantum, promptLatex: t("sc2_01.prompts.arr_e3"), expressionLatex: "\\kappa=2.5", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: t("sc2_01.placeholders.question"), expected: 3.8 }], correctLatex: "3.8", temperature: 300, activationEnergy: 50 },
          { id: "ARR_E4", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_isotope, promptLatex: t("sc2_01.prompts.arr_e4"), expressionLatex: "E_a=50", targetLatex: "\\text{KIE}", slots: [{ id: "kie", labelLatex: "k_H/k_D", placeholder: t("sc2_01.placeholders.question"), expected: 7 }], correctLatex: "7", temperature: 300, activationEnergy: 50 },
          { id: "ARR_E5", difficulty, stage, scenario: tObj.scenarios.arrhenius, context: tObj.problems.arr_transition, promptLatex: t("sc2_01.prompts.arr_e5"), expressionLatex: "k=10^6, T=300", targetLatex: "\\Delta G", slots: [{ id: "dg", labelLatex: "\\Delta G^\\ddagger", placeholder: t("sc2_01.placeholders.question"), expected: 65, unit: "kJ/mol" }], correctLatex: "65", temperature: 300, activationEnergy: 65 },
        ],
      },
      RATE_LAW: {
        BASIC: [
          { id: "RL_B1", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_first_order, promptLatex: t("sc2_01.prompts.rl_b"), expressionLatex: "[A]=2.0, k=0.5", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: t("sc2_01.placeholders.question"), expected: 1.0, unit: "M/s" }], correctLatex: "1.0", temperature: 300, activationEnergy: 50 },
          { id: "RL_B2", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_second_order, promptLatex: t("sc2_01.prompts.rl_b"), expressionLatex: "[A]=1.5, k=0.4", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: t("sc2_01.placeholders.question"), expected: 0.9, unit: "M/s" }], correctLatex: "0.9", temperature: 300, activationEnergy: 50 },
          { id: "RL_B3", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_zero_order, promptLatex: t("sc2_01.prompts.rl_b"), expressionLatex: "k=0.8", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: t("sc2_01.placeholders.question"), expected: 0.8, unit: "M/s" }], correctLatex: "0.8", temperature: 300, activationEnergy: 50 },
          { id: "RL_B4", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_concentration, promptLatex: t("sc2_01.prompts.rl_b4"), expressionLatex: "\\text{1st order}", targetLatex: "\\text{ratio}", slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: t("sc2_01.placeholders.question"), expected: 2 }], correctLatex: "2", temperature: 300, activationEnergy: 50 },
          { id: "RL_B5", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_initial, promptLatex: t("sc2_01.prompts.rl_b5"), expressionLatex: "[A]_0=1.0, k=0.6", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: t("sc2_01.placeholders.question"), expected: 0.6, unit: "M/s" }], correctLatex: "0.6", temperature: 300, activationEnergy: 50 },
        ],
        CORE: [
          { id: "RL_C1", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_mixed, promptLatex: t("sc2_01.prompts.rl_b"), expressionLatex: "[A]=2, [B]=3, k=0.5", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: t("sc2_01.placeholders.question"), expected: 3.0, unit: "M/s" }], correctLatex: "3.0", temperature: 300, activationEnergy: 50 },
          { id: "RL_C2", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_order, promptLatex: t("sc2_01.prompts.rl_c2"), expressionLatex: "[A]\\times2 \\to \\text{rate}\\times4", targetLatex: "n", slots: [{ id: "n", labelLatex: "n", placeholder: t("sc2_01.placeholders.question"), expected: 2 }], correctLatex: "2", temperature: 300, activationEnergy: 50 },
          { id: "RL_C3", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_integrated, promptLatex: t("sc2_01.prompts.rl_c3"), expressionLatex: "[A]_0=1, k=0.1, t=10", targetLatex: "[A]", slots: [{ id: "a", labelLatex: "[A]", placeholder: t("sc2_01.placeholders.question"), expected: 0.37, unit: "M" }], correctLatex: "0.37", temperature: 300, activationEnergy: 50 },
          { id: "RL_C4", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_time, promptLatex: t("sc2_01.prompts.rl_c4"), expressionLatex: "k=0.05", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: t("sc2_01.placeholders.question"), expected: 13.9, unit: "s" }], correctLatex: "13.9", temperature: 300, activationEnergy: 50 },
          { id: "RL_C5", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_constant, promptLatex: t("sc2_01.prompts.rl_c5"), expressionLatex: "\\text{rate}=2, [A]=4", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: t("sc2_01.placeholders.question"), expected: 0.5 }], correctLatex: "0.5", temperature: 300, activationEnergy: 50 },
        ],
        ADVANCED: [
          { id: "RL_A1", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_complex_order, promptLatex: t("sc2_01.prompts.rl_b"), expressionLatex: "[A]=4, [B]=9, k=0.2", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: t("sc2_01.placeholders.question"), expected: 2.4, unit: "M/s" }], correctLatex: "2.4", temperature: 300, activationEnergy: 50 },
          { id: "RL_A2", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_mechanism, promptLatex: t("sc2_01.prompts.rl_a2"), expressionLatex: "k_1=0.5, k_2=0.3", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: t("sc2_01.placeholders.question"), expected: 0.15, unit: "M/s" }], correctLatex: "0.15", temperature: 300, activationEnergy: 50 },
          { id: "RL_A3", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_steady_state, promptLatex: t("sc2_01.prompts.rl_a3"), expressionLatex: "k_1=0.5, k_2=0.2", targetLatex: "[I]", slots: [{ id: "i", labelLatex: "[I]", placeholder: t("sc2_01.placeholders.question"), expected: 2.5, unit: "M" }], correctLatex: "2.5", temperature: 300, activationEnergy: 50 },
          { id: "RL_A4", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_pre_equilibrium, promptLatex: t("sc2_01.prompts.rl_a4"), expressionLatex: "k_f=0.8, k_r=0.2", targetLatex: "K", slots: [{ id: "k", labelLatex: "K", placeholder: t("sc2_01.placeholders.question"), expected: 4 }], correctLatex: "4", temperature: 300, activationEnergy: 50 },
          { id: "RL_A5", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_inhibition, promptLatex: t("sc2_01.prompts.rl_b"), expressionLatex: "[I]=2, K_I=1", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: t("sc2_01.placeholders.question"), expected: 0.33, unit: "M/s" }], correctLatex: "0.33", temperature: 300, activationEnergy: 50 },
        ],
        ELITE: [
          { id: "RL_E1", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_oscillating, promptLatex: t("sc2_01.prompts.rl_e1"), expressionLatex: "\\text{Belousov-Zhabotinsky}", targetLatex: "[A]", slots: [{ id: "a", labelLatex: "[A]", placeholder: t("sc2_01.placeholders.question"), expected: 1.5, unit: "M" }], correctLatex: "1.5", temperature: 300, activationEnergy: 50 },
          { id: "RL_E2", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_autocatalytic, promptLatex: t("sc2_01.prompts.rl_e2"), expressionLatex: "[A]_0=0.1", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: t("sc2_01.placeholders.question"), expected: 15, unit: "s" }], correctLatex: "15", temperature: 300, activationEnergy: 50 },
          { id: "RL_E3", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_chain, promptLatex: t("sc2_01.prompts.rl_e3"), expressionLatex: "k_p/k_t=100", targetLatex: "\\nu", slots: [{ id: "nu", labelLatex: "\\nu", placeholder: t("sc2_01.placeholders.question"), expected: 100 }], correctLatex: "100", temperature: 300, activationEnergy: 50 },
          { id: "RL_E4", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_photochemical, promptLatex: t("sc2_01.prompts.rl_e4"), expressionLatex: "\\text{quantum yield}", targetLatex: "\\Phi", slots: [{ id: "phi", labelLatex: "\\Phi", placeholder: t("sc2_01.placeholders.question"), expected: 0.8 }], correctLatex: "0.8", temperature: 300, activationEnergy: 50 },
          { id: "RL_E5", difficulty, stage, scenario: tObj.scenarios.rate_law, context: tObj.problems.rl_enzyme_complex, promptLatex: t("sc2_01.prompts.rl_e5"), expressionLatex: "K_M=1, [S]=5", targetLatex: "V", slots: [{ id: "v", labelLatex: "V", placeholder: t("sc2_01.placeholders.question"), expected: 0.83, unit: "M/s" }], correctLatex: "0.83", temperature: 300, activationEnergy: 50 },
        ],
      },
      HALF_LIFE: {
        BASIC: [
          { id: "HL_B1", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_first_order, promptLatex: t("sc2_01.prompts.hl_b"), expressionLatex: "k=0.1", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: t("sc2_01.placeholders.question"), expected: 6.9, unit: "s" }], correctLatex: "6.9", temperature: 300, activationEnergy: 50 },
          { id: "HL_B2", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_second_order, promptLatex: t("sc2_01.prompts.hl_b"), expressionLatex: "k=0.5, [A]_0=2", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: t("sc2_01.placeholders.question"), expected: 1.0, unit: "s" }], correctLatex: "1.0", temperature: 300, activationEnergy: 50 },
          { id: "HL_B3", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_zero_order, promptLatex: t("sc2_01.prompts.hl_b"), expressionLatex: "k=0.4, [A]_0=4", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: t("sc2_01.placeholders.question"), expected: 5.0, unit: "s" }], correctLatex: "5.0", temperature: 300, activationEnergy: 50 },
          { id: "HL_B4", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_remaining, promptLatex: t("sc2_01.prompts.hl_b4"), expressionLatex: "[A]_0=8", targetLatex: "[A]", slots: [{ id: "a", labelLatex: "[A]", placeholder: t("sc2_01.placeholders.question"), expected: 2.0, unit: "M" }], correctLatex: "2.0", temperature: 300, activationEnergy: 50 },
          { id: "HL_B5", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_time, promptLatex: t("sc2_01.prompts.rl_c4"), expressionLatex: "t_{1/2}=10", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: t("sc2_01.placeholders.question"), expected: 20, unit: "s" }], correctLatex: "20", temperature: 300, activationEnergy: 50 },
        ],
        CORE: [
          { id: "HL_C1", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_find_k, promptLatex: t("sc2_01.prompts.rl_c5"), expressionLatex: "t_{1/2}=5", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: t("sc2_01.placeholders.question"), expected: 0.14 }], correctLatex: "0.14", temperature: 300, activationEnergy: 50 },
          { id: "HL_C2", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_fraction, promptLatex: t("sc2_01.prompts.hl_c2"), expressionLatex: "n=3", targetLatex: "f", slots: [{ id: "f", labelLatex: "f", placeholder: t("sc2_01.placeholders.question"), expected: 0.125 }], correctLatex: "0.125", temperature: 300, activationEnergy: 50 },
          { id: "HL_C3", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_radioactive, promptLatex: t("sc2_01.prompts.hl_c3"), expressionLatex: "N_0=1000, t=20, t_{1/2}=10", targetLatex: "N", slots: [{ id: "n", labelLatex: "N", placeholder: t("sc2_01.placeholders.question"), expected: 250 }], correctLatex: "250", temperature: 300, activationEnergy: 50 },
          { id: "HL_C4", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_drug, promptLatex: t("sc2_01.prompts.hl_c4"), expressionLatex: "[D]_0=100, t_{1/2}=4\\text{h}, t=12\\text{h}", targetLatex: "[D]", slots: [{ id: "d", labelLatex: "[D]", placeholder: t("sc2_01.placeholders.question"), expected: 12.5, unit: "mg/L" }], correctLatex: "12.5", temperature: 300, activationEnergy: 50 },
          { id: "HL_C5", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_compare, promptLatex: t("sc2_01.prompts.hl_c5"), expressionLatex: "k_A=0.2, k_B=0.4", targetLatex: "\\text{ratio}", slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: t("sc2_01.placeholders.question"), expected: 2 }], correctLatex: "2", temperature: 300, activationEnergy: 50 },
        ],
        ADVANCED: [
          { id: "HL_A1", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_consecutive, promptLatex: t("sc2_01.prompts.hl_a1"), expressionLatex: "k_1=0.5, k_2=0.2", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: t("sc2_01.placeholders.question"), expected: 4.6, unit: "s" }], correctLatex: "4.6", temperature: 300, activationEnergy: 50 },
          { id: "HL_A2", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_parallel, promptLatex: t("sc2_01.prompts.hl_a2"), expressionLatex: "k_1=0.3, k_2=0.2", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: t("sc2_01.placeholders.question"), expected: 1.4, unit: "s" }], correctLatex: "1.4", temperature: 300, activationEnergy: 50 },
          { id: "HL_A3", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_reversible, promptLatex: t("sc2_01.prompts.hl_a3"), expressionLatex: "k_f=0.5, k_r=0.1", targetLatex: "[A]", slots: [{ id: "a", labelLatex: "[A]", placeholder: t("sc2_01.placeholders.question"), expected: 0.17, unit: "M" }], correctLatex: "0.17", temperature: 300, activationEnergy: 50 },
          { id: "HL_A4", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_temperature, promptLatex: t("sc2_01.prompts.hl_a4"), expressionLatex: "t_{1/2}(300)=10, E_a=50", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: t("sc2_01.placeholders.question"), expected: 2.5, unit: "s" }], correctLatex: "2.5", temperature: 350, activationEnergy: 50 },
          { id: "HL_A5", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_enzyme, promptLatex: t("sc2_01.prompts.hl_b"), expressionLatex: "k_{\\text{cat}}=100", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: t("sc2_01.placeholders.question"), expected: 0.007, unit: "s" }], correctLatex: "0.007", temperature: 300, activationEnergy: 50 },
        ],
        ELITE: [
          { id: "HL_E1", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_isotope_dating, promptLatex: t("sc2_01.prompts.hl_e1"), expressionLatex: "N/N_0=0.25, t_{1/2}=5730", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: t("sc2_01.placeholders.question"), expected: 11460, unit: "years" }], correctLatex: "11460", temperature: 300, activationEnergy: 50 },
          { id: "HL_E2", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_branching, promptLatex: t("sc2_01.prompts.hl_e2"), expressionLatex: "k_\\alpha/k_\\beta=2", targetLatex: "f_\\alpha", slots: [{ id: "f", labelLatex: "f_\\alpha", placeholder: t("sc2_01.placeholders.question"), expected: 0.67 }], correctLatex: "0.67", temperature: 300, activationEnergy: 50 },
          { id: "HL_E3", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_secular, promptLatex: t("sc2_01.prompts.hl_e3"), expressionLatex: "t_{1/2,1}\\gg t_{1/2,2}", targetLatex: "\\text{ratio}", slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: t("sc2_01.placeholders.question"), expected: 1 }], correctLatex: "1", temperature: 300, activationEnergy: 50 },
          { id: "HL_E4", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_transient, promptLatex: t("sc2_01.prompts.hl_a1"), expressionLatex: "t_{1/2,1}=10, t_{1/2,2}=2", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: t("sc2_01.placeholders.question"), expected: 3.5, unit: "s" }], correctLatex: "3.5", temperature: 300, activationEnergy: 50 },
          { id: "HL_E5", difficulty, stage, scenario: tObj.scenarios.half_life, context: tObj.problems.hl_cosmogenic, promptLatex: t("sc2_01.prompts.hl_e5"), expressionLatex: "^{10}\\text{Be}, N/N_0=0.5", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: t("sc2_01.placeholders.question"), expected: 1.39e6, unit: "years" }], correctLatex: "1.39\\times10^6", temperature: 300, activationEnergy: 50 },
        ],
      },
    };

    return pools[stage][difficulty] || [];
  }, [t]);

  const buildPool = useCallback(
    (difficulty: Difficulty, stage: Stage) => buildStagePool(sc2_01_t, difficulty, stage),
    [buildStagePool, sc2_01_t]
  );

  const stages = useMemo(() => [
    { id: "ARRHENIUS" as Stage, label: sc2_01_t.stages.arrhenius },
    { id: "RATE_LAW" as Stage, label: sc2_01_t.stages.concentration },
    { id: "HALF_LIFE" as Stage, label: sc2_01_t.stages.collision },
  ], [sc2_01_t.stages.arrhenius, sc2_01_t.stages.collision, sc2_01_t.stages.concentration]);

  const printSections = useMemo(() => buildQuestPrintSections<KineticsQuest, Stage>({
    moduleTitle: sc2_01_t.title,
    stages,
    difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
    difficultyLabels: {
      BASIC: sc2_01_t.difficulty.basic,
      CORE: sc2_01_t.difficulty.core,
      ADVANCED: sc2_01_t.difficulty.advanced,
      ELITE: sc2_01_t.difficulty.elite,
    },
    buildPool,
  }), [buildPool, sc2_01_t.difficulty.advanced, sc2_01_t.difficulty.basic, sc2_01_t.difficulty.core, sc2_01_t.difficulty.elite, sc2_01_t.title, stages]);

  const { stage: currentStage, difficulty: currentDifficulty, currentQuest, inputs: userAnswer, lastCheck, setInputs, verify, next, handleStageChange, handleDifficultyChange, adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback,
    feedbackLevel,
    feedbackContent,
    feedbackAvailability,
    showHintLevel,
    showStepsLevel,
    showFullSolution,
    policy,
    } = useQuestManager({
    moduleCode: "sc2-01",
    buildPool,
    initialStage: "ARRHENIUS" as Stage,
    feedbackContentProvider,
  });

  const isCorrect = lastCheck?.ok || null;

  useEffect(() => {
    if (isCorrect && currentQuest) {
      completeStage("sc2-01", currentStage);
    }
  }, [isCorrect, currentStage, currentQuest, completeStage]);

  const quest = currentQuest as KineticsQuest | null;

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      feedbackContent={feedbackContent}
      feedbackLevel={feedbackLevel}
      feedbackAvailability={feedbackAvailability}
      feedbackPolicy={policy}
      onShowHint={showHintLevel}
      onShowSteps={showStepsLevel}
      onShowFull={showFullSolution}
      moduleCode="SC2.01"
      title={sc2_01_t.title}
      difficulty={currentDifficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stages}
      currentStage={currentStage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      printSections={printSections}
      onVerify={verify}
      onNext={next}
      checkStatus={lastCheck}
      translations={{
        back: sc2_01_t.back,
        check: sc2_01_t.check,
        next: sc2_01_t.next,
        correct: sc2_01_t.correct,
        incorrect: sc2_01_t.incorrect,
        monitor_title: sc2_01_t.monitor_title,
        difficulty: {
          basic: sc2_01_t.difficulty.basic,
          core: sc2_01_t.difficulty.core,
          advanced: sc2_01_t.difficulty.advanced,
          elite: sc2_01_t.difficulty.elite,
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <div className="aspect-video w-full">
            <KineticsCanvas
              temperature={quest?.temperature || 300}
              activationEnergy={quest?.activationEnergy || 50}
              showCollisions={true}
            />
          </div>
          <div className="text-xs text-cyan-300/60 space-y-1">
            <div>{sc2_01_t.labels.temperature}: {quest?.temperature || 300} K</div>
            <div>{sc2_01_t.labels.activation_energy}: {quest?.activationEnergy || 50} kJ/mol</div>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Scenario */}
        {quest?.scenario && (
          <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-black mb-3">
              {sc2_01_t.scenario_title}
            </div>
            <p className="text-white/90 leading-relaxed font-medium">{quest.scenario}</p>
          </div>
        )}

        {/* Problem Context */}
        {quest?.context && (
          <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-black mb-3">
              {sc2_01_t.objective_title}
            </div>
            <p className="text-white/80 leading-relaxed">{quest.context}</p>
          </div>
        )}

        {/* Formula Display */}
        <div className="text-center space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {sc2_01_t.labels.formula}
          </div>
          {quest?.promptLatex && (
            <div className="text-2xl text-white font-black">
              <BlockMath math={quest.promptLatex} />
            </div>
          )}
        </div>

        {/* Given Data */}
        {quest?.expressionLatex && (
          <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-green-400 font-black mb-3">
              {sc2_01_t.labels.given}
            </div>
            <div className="text-center">
              <BlockMath math={quest.expressionLatex} />
            </div>
          </div>
        )}

        {/* Input Fields */}
        <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-black mb-3">
            {sc2_01_t.answer_title}
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
                onChange={(e) => setInputs((prev: Record<string, string>) => ({ ...prev, [slot.id]: e.target.value }))}
                className="w-full px-4 py-3 bg-black/50 border border-blue-500/50 rounded-lg text-blue-100 text-lg font-mono focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              />
            </div>
          ))}
        </div>
      </div>
    </ChamberLayout>
  );
}
