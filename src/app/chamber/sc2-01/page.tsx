"use client";

import { useEffect, useCallback } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import KineticsCanvas from "@/components/chamber/sc2-01/KineticsCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "ARRHENIUS" | "RATE_LAW" | "HALF_LIFE";
type KineticsQuest = Quest & { 
  stage: Stage; 
  context?: string; 
  scenario?: string;
  temperature?: number;
  activationEnergy?: number;
};

export default function SC201Page() {
  const { currentLanguage, completeStage } = useAppStore();
  const locale = translations[currentLanguage as keyof typeof translations] as typeof translations.EN;
  const t = locale.sc2_01 || translations.EN.sc2_01;

  const buildStagePool = useCallback((t: typeof translations.EN.sc2_01, difficulty: Difficulty, stage: Stage): KineticsQuest[] => {
    const pools: Record<Stage, Record<Difficulty, KineticsQuest[]>> = {
      ARRHENIUS: {
        BASIC: [
          {
            id: "ARR_B1", difficulty, stage,
            scenario: t.scenarios?.arrhenius || "Arrhenius Equation",
            context: t.problems?.arr_temp_300_ea_50 || "T=300K, Ea=50 kJ/mol. Calculate relative k.",
            promptLatex: "k = Ae^{-E_a/RT}",
            expressionLatex: "T=300\\text{K}, E_a=50\\text{kJ/mol}",
            targetLatex: "k_{\\text{rel}}",
            slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 1.5 }],
            correctLatex: "1.5",
            hintLatex: ["Use R = 8.314 J/(mol·K)", "Convert Ea to J"],
            temperature: 300, activationEnergy: 50
          },
          {
            id: "ARR_B2", difficulty, stage,
            scenario: t.scenarios?.arrhenius || "Arrhenius Equation",
            context: t.problems?.arr_temp_350_ea_40 || "T=350K, Ea=40 kJ/mol",
            promptLatex: "k = Ae^{-E_a/RT}",
            expressionLatex: "T=350\\text{K}, E_a=40\\text{kJ/mol}",
            targetLatex: "k_{\\text{rel}}",
            slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 2.8 }],
            correctLatex: "2.8",
            temperature: 350, activationEnergy: 40
          },
          {
            id: "ARR_B3", difficulty, stage,
            scenario: t.scenarios?.arrhenius || "Arrhenius Equation",
            context: t.problems?.arr_temp_400_ea_60 || "T=400K, Ea=60 kJ/mol",
            promptLatex: "k = Ae^{-E_a/RT}",
            expressionLatex: "T=400\\text{K}, E_a=60\\text{kJ/mol}",
            targetLatex: "k_{\\text{rel}}",
            slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 3.2 }],
            correctLatex: "3.2",
            temperature: 400, activationEnergy: 60
          },
          {
            id: "ARR_B4", difficulty, stage,
            scenario: t.scenarios?.arrhenius || "Arrhenius Equation",
            context: t.problems?.arr_temp_320_ea_45 || "T=320K, Ea=45 kJ/mol",
            promptLatex: "k = Ae^{-E_a/RT}",
            expressionLatex: "T=320\\text{K}, E_a=45\\text{kJ/mol}",
            targetLatex: "k_{\\text{rel}}",
            slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 2.1 }],
            correctLatex: "2.1",
            temperature: 320, activationEnergy: 45
          },
          {
            id: "ARR_B5", difficulty, stage,
            scenario: t.scenarios?.arrhenius || "Arrhenius Equation",
            context: t.problems?.arr_temp_280_ea_55 || "T=280K, Ea=55 kJ/mol",
            promptLatex: "k = Ae^{-E_a/RT}",
            expressionLatex: "T=280\\text{K}, E_a=55\\text{kJ/mol}",
            targetLatex: "k_{\\text{rel}}",
            slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 0.8 }],
            correctLatex: "0.8",
            temperature: 280, activationEnergy: 55
          },
        ],
        CORE: [
          { id: "ARR_C1", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_double_temp || "Double T, k increases", promptLatex: "\\Delta T \\to \\Delta k", expressionLatex: "T: 300\\to600\\text{K}", targetLatex: "k_{\\text{ratio}}", slots: [{ id: "k", labelLatex: "k_{600}/k_{300}", placeholder: "?", expected: 100 }], correctLatex: "100", temperature: 600, activationEnergy: 50 },
          { id: "ARR_C2", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_ea_effect || "Lower Ea, k increases", promptLatex: "E_a \\downarrow \\to k \\uparrow", expressionLatex: "E_a: 80\\to40\\text{kJ/mol}", targetLatex: "k_{\\text{ratio}}", slots: [{ id: "k", labelLatex: "k_{40}/k_{80}", placeholder: "?", expected: 50 }], correctLatex: "50", temperature: 300, activationEnergy: 40 },
          { id: "ARR_C3", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_ln_form || "ln(k) = ln(A) - Ea/RT", promptLatex: "\\ln(k)", expressionLatex: "E_a=50, T=300", targetLatex: "\\ln(k)", slots: [{ id: "lnk", labelLatex: "\\ln(k)", placeholder: "?", expected: -20 }], correctLatex: "-20", temperature: 300, activationEnergy: 50 },
          { id: "ARR_C4", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_activation || "Find Ea from k ratio", promptLatex: "E_a", expressionLatex: "k_2/k_1=10, \\Delta T=50", targetLatex: "E_a", slots: [{ id: "ea", labelLatex: "E_a", placeholder: "?", expected: 53, unit: "kJ/mol" }], correctLatex: "53", temperature: 350, activationEnergy: 53 },
          { id: "ARR_C5", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_catalyst || "Catalyst lowers Ea by 20 kJ/mol", promptLatex: "k_{\\text{new}}/k_{\\text{old}}", expressionLatex: "E_a: 80\\to60", targetLatex: "\\text{ratio}", slots: [{ id: "ratio", labelLatex: "k_{\\text{ratio}}", placeholder: "?", expected: 8 }], correctLatex: "8", temperature: 300, activationEnergy: 60 },
        ],
        ADVANCED: [
          { id: "ARR_A1", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_two_temps || "k at two temperatures", promptLatex: "\\ln(k_2/k_1)", expressionLatex: "T_1=300, T_2=350", targetLatex: "E_a", slots: [{ id: "ea", labelLatex: "E_a", placeholder: "?", expected: 52, unit: "kJ/mol" }], correctLatex: "52", temperature: 350, activationEnergy: 52 },
          { id: "ARR_A2", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_plot || "Arrhenius plot slope", promptLatex: "\\text{slope}", expressionLatex: "-E_a/R", targetLatex: "E_a", slots: [{ id: "ea", labelLatex: "E_a", placeholder: "?", expected: 65, unit: "kJ/mol" }], correctLatex: "65", temperature: 300, activationEnergy: 65 },
          { id: "ARR_A3", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_frequency || "Pre-exponential factor A", promptLatex: "A", expressionLatex: "k=1.5, E_a=50, T=300", targetLatex: "A", slots: [{ id: "a", labelLatex: "A", placeholder: "?", expected: 1e13 }], correctLatex: "10^{13}", temperature: 300, activationEnergy: 50 },
          { id: "ARR_A4", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_temp_for_k || "Find T for target k", promptLatex: "T", expressionLatex: "k=10^6, E_a=60", targetLatex: "T", slots: [{ id: "t", labelLatex: "T", placeholder: "?", expected: 450, unit: "K" }], correctLatex: "450", temperature: 450, activationEnergy: 60 },
          { id: "ARR_A5", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_enzyme || "Enzyme kinetics", promptLatex: "k_{\\text{cat}}", expressionLatex: "E_a=40, T=310", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 5.2 }], correctLatex: "5.2", temperature: 310, activationEnergy: 40 },
        ],
        ELITE: [
          { id: "ARR_E1", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_complex || "Complex reaction mechanism", promptLatex: "k_{\\text{overall}}", expressionLatex: "E_{a1}=50, E_{a2}=30", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 2.5 }], correctLatex: "2.5", temperature: 300, activationEnergy: 40 },
          { id: "ARR_E2", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_pressure || "Pressure effect on k", promptLatex: "k(P)", expressionLatex: "\\Delta V^\\ddagger=-10", targetLatex: "k_2/k_1", slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: "?", expected: 1.5 }], correctLatex: "1.5", temperature: 300, activationEnergy: 50 },
          { id: "ARR_E3", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_quantum || "Quantum tunneling correction", promptLatex: "k_{\\text{tunnel}}", expressionLatex: "\\kappa=2.5", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 3.8 }], correctLatex: "3.8", temperature: 300, activationEnergy: 50 },
          { id: "ARR_E4", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_isotope || "Kinetic isotope effect", promptLatex: "k_H/k_D", expressionLatex: "E_a=50", targetLatex: "\\text{KIE}", slots: [{ id: "kie", labelLatex: "k_H/k_D", placeholder: "?", expected: 7 }], correctLatex: "7", temperature: 300, activationEnergy: 50 },
          { id: "ARR_E5", difficulty, stage, scenario: t.scenarios?.arrhenius || "Arrhenius", context: t.problems?.arr_transition || "Transition state theory", promptLatex: "\\Delta G^\\ddagger", expressionLatex: "k=10^6, T=300", targetLatex: "\\Delta G", slots: [{ id: "dg", labelLatex: "\\Delta G^\\ddagger", placeholder: "?", expected: 65, unit: "kJ/mol" }], correctLatex: "65", temperature: 300, activationEnergy: 65 },
        ],
      },
      RATE_LAW: {
        BASIC: [
          { id: "RL_B1", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_first_order || "First order: rate = k[A]", promptLatex: "\\text{rate}", expressionLatex: "[A]=2.0, k=0.5", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: "?", expected: 1.0, unit: "M/s" }], correctLatex: "1.0", temperature: 300, activationEnergy: 50 },
          { id: "RL_B2", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_second_order || "Second order: rate = k[A]²", promptLatex: "\\text{rate}", expressionLatex: "[A]=1.5, k=0.4", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: "?", expected: 0.9, unit: "M/s" }], correctLatex: "0.9", temperature: 300, activationEnergy: 50 },
          { id: "RL_B3", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_zero_order || "Zero order: rate = k", promptLatex: "\\text{rate}", expressionLatex: "k=0.8", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: "?", expected: 0.8, unit: "M/s" }], correctLatex: "0.8", temperature: 300, activationEnergy: 50 },
          { id: "RL_B4", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_concentration || "[A] doubles, rate?", promptLatex: "\\text{rate}_{\\text{new}}", expressionLatex: "\\text{1st order}", targetLatex: "\\text{ratio}", slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: "?", expected: 2 }], correctLatex: "2", temperature: 300, activationEnergy: 50 },
          { id: "RL_B5", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_initial || "Initial rate method", promptLatex: "\\text{rate}_0", expressionLatex: "[A]_0=1.0, k=0.6", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: "?", expected: 0.6, unit: "M/s" }], correctLatex: "0.6", temperature: 300, activationEnergy: 50 },
        ],
        CORE: [
          { id: "RL_C1", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_mixed || "rate = k[A][B]", promptLatex: "\\text{rate}", expressionLatex: "[A]=2, [B]=3, k=0.5", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: "?", expected: 3.0, unit: "M/s" }], correctLatex: "3.0", temperature: 300, activationEnergy: 50 },
          { id: "RL_C2", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_order || "Find reaction order", promptLatex: "n", expressionLatex: "[A]\\times2 \\to \\text{rate}\\times4", targetLatex: "n", slots: [{ id: "n", labelLatex: "n", placeholder: "?", expected: 2 }], correctLatex: "2", temperature: 300, activationEnergy: 50 },
          { id: "RL_C3", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_integrated || "Integrated rate law", promptLatex: "[A]_t", expressionLatex: "[A]_0=1, k=0.1, t=10", targetLatex: "[A]", slots: [{ id: "a", labelLatex: "[A]", placeholder: "?", expected: 0.37, unit: "M" }], correctLatex: "0.37", temperature: 300, activationEnergy: 50 },
          { id: "RL_C4", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_time || "Time for [A] to halve", promptLatex: "t", expressionLatex: "k=0.05", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: "?", expected: 13.9, unit: "s" }], correctLatex: "13.9", temperature: 300, activationEnergy: 50 },
          { id: "RL_C5", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_constant || "Find k from data", promptLatex: "k", expressionLatex: "\\text{rate}=2, [A]=4", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 0.5 }], correctLatex: "0.5", temperature: 300, activationEnergy: 50 },
        ],
        ADVANCED: [
          { id: "RL_A1", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_complex_order || "rate = k[A]^{1.5}[B]^{0.5}", promptLatex: "\\text{rate}", expressionLatex: "[A]=4, [B]=9, k=0.2", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: "?", expected: 2.4, unit: "M/s" }], correctLatex: "2.4", temperature: 300, activationEnergy: 50 },
          { id: "RL_A2", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_mechanism || "Multi-step mechanism", promptLatex: "\\text{rate}_{\\text{overall}}", expressionLatex: "k_1=0.5, k_2=0.3", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: "?", expected: 0.15, unit: "M/s" }], correctLatex: "0.15", temperature: 300, activationEnergy: 50 },
          { id: "RL_A3", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_steady_state || "Steady-state approximation", promptLatex: "[I]_{\\text{ss}}", expressionLatex: "k_1=0.5, k_2=0.2", targetLatex: "[I]", slots: [{ id: "i", labelLatex: "[I]", placeholder: "?", expected: 2.5, unit: "M" }], correctLatex: "2.5", temperature: 300, activationEnergy: 50 },
          { id: "RL_A4", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_pre_equilibrium || "Pre-equilibrium approximation", promptLatex: "K_{\\text{eq}}", expressionLatex: "k_f=0.8, k_r=0.2", targetLatex: "K", slots: [{ id: "k", labelLatex: "K", placeholder: "?", expected: 4 }], correctLatex: "4", temperature: 300, activationEnergy: 50 },
          { id: "RL_A5", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_inhibition || "Competitive inhibition", promptLatex: "\\text{rate}", expressionLatex: "[I]=2, K_I=1", targetLatex: "\\text{rate}", slots: [{ id: "rate", labelLatex: "\\text{rate}", placeholder: "?", expected: 0.33, unit: "M/s" }], correctLatex: "0.33", temperature: 300, activationEnergy: 50 },
        ],
        ELITE: [
          { id: "RL_E1", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_oscillating || "Oscillating reaction", promptLatex: "[A]_{\\text{max}}", expressionLatex: "\\text{Belousov-Zhabotinsky}", targetLatex: "[A]", slots: [{ id: "a", labelLatex: "[A]", placeholder: "?", expected: 1.5, unit: "M" }], correctLatex: "1.5", temperature: 300, activationEnergy: 50 },
          { id: "RL_E2", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_autocatalytic || "Autocatalytic reaction", promptLatex: "t_{\\text{inflection}}", expressionLatex: "[A]_0=0.1", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: "?", expected: 15, unit: "s" }], correctLatex: "15", temperature: 300, activationEnergy: 50 },
          { id: "RL_E3", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_chain || "Chain reaction", promptLatex: "\\text{chain length}", expressionLatex: "k_p/k_t=100", targetLatex: "\\nu", slots: [{ id: "nu", labelLatex: "\\nu", placeholder: "?", expected: 100 }], correctLatex: "100", temperature: 300, activationEnergy: 50 },
          { id: "RL_E4", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_photochemical || "Photochemical reaction", promptLatex: "\\Phi", expressionLatex: "\\text{quantum yield}", targetLatex: "\\Phi", slots: [{ id: "phi", labelLatex: "\\Phi", placeholder: "?", expected: 0.8 }], correctLatex: "0.8", temperature: 300, activationEnergy: 50 },
          { id: "RL_E5", difficulty, stage, scenario: t.scenarios?.rate_law || "Rate Law", context: t.problems?.rl_enzyme_complex || "Michaelis-Menten", promptLatex: "V_{\\text{max}}", expressionLatex: "K_M=1, [S]=5", targetLatex: "V", slots: [{ id: "v", labelLatex: "V", placeholder: "?", expected: 0.83, unit: "M/s" }], correctLatex: "0.83", temperature: 300, activationEnergy: 50 },
        ],
      },
      HALF_LIFE: {
        BASIC: [
          { id: "HL_B1", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_first_order || "First order: t₁/₂ = ln(2)/k", promptLatex: "t_{1/2}", expressionLatex: "k=0.1", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: "?", expected: 6.9, unit: "s" }], correctLatex: "6.9", temperature: 300, activationEnergy: 50 },
          { id: "HL_B2", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_second_order || "Second order: t₁/₂ = 1/(k[A]₀)", promptLatex: "t_{1/2}", expressionLatex: "k=0.5, [A]_0=2", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: "?", expected: 1.0, unit: "s" }], correctLatex: "1.0", temperature: 300, activationEnergy: 50 },
          { id: "HL_B3", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_zero_order || "Zero order: t₁/₂ = [A]₀/(2k)", promptLatex: "t_{1/2}", expressionLatex: "k=0.4, [A]_0=4", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: "?", expected: 5.0, unit: "s" }], correctLatex: "5.0", temperature: 300, activationEnergy: 50 },
          { id: "HL_B4", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_remaining || "After 2 half-lives, [A] = ?", promptLatex: "[A]", expressionLatex: "[A]_0=8", targetLatex: "[A]", slots: [{ id: "a", labelLatex: "[A]", placeholder: "?", expected: 2.0, unit: "M" }], correctLatex: "2.0", temperature: 300, activationEnergy: 50 },
          { id: "HL_B5", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_time || "Time for 75% decay", promptLatex: "t", expressionLatex: "t_{1/2}=10", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: "?", expected: 20, unit: "s" }], correctLatex: "20", temperature: 300, activationEnergy: 50 },
        ],
        CORE: [
          { id: "HL_C1", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_find_k || "Find k from t₁/₂", promptLatex: "k", expressionLatex: "t_{1/2}=5", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: "?", expected: 0.14 }], correctLatex: "0.14", temperature: 300, activationEnergy: 50 },
          { id: "HL_C2", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_fraction || "Fraction remaining after 3t₁/₂", promptLatex: "f", expressionLatex: "n=3", targetLatex: "f", slots: [{ id: "f", labelLatex: "f", placeholder: "?", expected: 0.125 }], correctLatex: "0.125", temperature: 300, activationEnergy: 50 },
          { id: "HL_C3", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_radioactive || "Radioactive decay", promptLatex: "N_t", expressionLatex: "N_0=1000, t=20, t_{1/2}=10", targetLatex: "N", slots: [{ id: "n", labelLatex: "N", placeholder: "?", expected: 250 }], correctLatex: "250", temperature: 300, activationEnergy: 50 },
          { id: "HL_C4", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_drug || "Drug elimination", promptLatex: "[D]_t", expressionLatex: "[D]_0=100, t_{1/2}=4\\text{h}, t=12\\text{h}", targetLatex: "[D]", slots: [{ id: "d", labelLatex: "[D]", placeholder: "?", expected: 12.5, unit: "mg/L" }], correctLatex: "12.5", temperature: 300, activationEnergy: 50 },
          { id: "HL_C5", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_compare || "Compare two reactions", promptLatex: "t_{1/2,A}/t_{1/2,B}", expressionLatex: "k_A=0.2, k_B=0.4", targetLatex: "\\text{ratio}", slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: "?", expected: 2 }], correctLatex: "2", temperature: 300, activationEnergy: 50 },
        ],
        ADVANCED: [
          { id: "HL_A1", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_consecutive || "Consecutive reactions", promptLatex: "t_{\\text{max}}", expressionLatex: "k_1=0.5, k_2=0.2", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: "?", expected: 4.6, unit: "s" }], correctLatex: "4.6", temperature: 300, activationEnergy: 50 },
          { id: "HL_A2", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_parallel || "Parallel reactions", promptLatex: "t_{1/2,\\text{overall}}", expressionLatex: "k_1=0.3, k_2=0.2", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: "?", expected: 1.4, unit: "s" }], correctLatex: "1.4", temperature: 300, activationEnergy: 50 },
          { id: "HL_A3", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_reversible || "Reversible reaction", promptLatex: "[A]_{\\text{eq}}", expressionLatex: "k_f=0.5, k_r=0.1", targetLatex: "[A]", slots: [{ id: "a", labelLatex: "[A]", placeholder: "?", expected: 0.17, unit: "M" }], correctLatex: "0.17", temperature: 300, activationEnergy: 50 },
          { id: "HL_A4", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_temperature || "t₁/₂ at different T", promptLatex: "t_{1/2}(350\\text{K})", expressionLatex: "t_{1/2}(300)=10, E_a=50", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: "?", expected: 2.5, unit: "s" }], correctLatex: "2.5", temperature: 350, activationEnergy: 50 },
          { id: "HL_A5", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_enzyme || "Enzyme turnover", promptLatex: "t_{1/2}", expressionLatex: "k_{\\text{cat}}=100", targetLatex: "t", slots: [{ id: "t", labelLatex: "t_{1/2}", placeholder: "?", expected: 0.007, unit: "s" }], correctLatex: "0.007", temperature: 300, activationEnergy: 50 },
        ],
        ELITE: [
          { id: "HL_E1", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_isotope_dating || "Carbon-14 dating", promptLatex: "\\text{age}", expressionLatex: "N/N_0=0.25, t_{1/2}=5730", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: "?", expected: 11460, unit: "years" }], correctLatex: "11460", temperature: 300, activationEnergy: 50 },
          { id: "HL_E2", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_branching || "Branching decay", promptLatex: "\\text{branch ratio}", expressionLatex: "k_\\alpha/k_\\beta=2", targetLatex: "f_\\alpha", slots: [{ id: "f", labelLatex: "f_\\alpha", placeholder: "?", expected: 0.67 }], correctLatex: "0.67", temperature: 300, activationEnergy: 50 },
          { id: "HL_E3", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_secular || "Secular equilibrium", promptLatex: "A_2/A_1", expressionLatex: "t_{1/2,1}\\gg t_{1/2,2}", targetLatex: "\\text{ratio}", slots: [{ id: "ratio", labelLatex: "\\text{ratio}", placeholder: "?", expected: 1 }], correctLatex: "1", temperature: 300, activationEnergy: 50 },
          { id: "HL_E4", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_transient || "Transient equilibrium", promptLatex: "t_{\\text{max}}", expressionLatex: "t_{1/2,1}=10, t_{1/2,2}=2", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: "?", expected: 3.5, unit: "s" }], correctLatex: "3.5", temperature: 300, activationEnergy: 50 },
          { id: "HL_E5", difficulty, stage, scenario: t.scenarios?.half_life || "Half-Life", context: t.problems?.hl_cosmogenic || "Cosmogenic nuclide", promptLatex: "\\text{exposure age}", expressionLatex: "^{10}\\text{Be}, N/N_0=0.5", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: "?", expected: 1.39e6, unit: "years" }], correctLatex: "1.39\\times10^6", temperature: 300, activationEnergy: 50 },
        ],
      },
    };

    return pools[stage][difficulty] || [];
  }, []);

  const { stage: currentStage, difficulty: currentDifficulty, currentQuest, inputs: userAnswer, lastCheck, setInputs, verify, next, handleStageChange, handleDifficultyChange } = useQuestManager({
    buildPool: (difficulty, stage) => buildStagePool(t, difficulty, stage as Stage),
    initialStage: "ARRHENIUS" as Stage,
  });

  const isCorrect = lastCheck?.ok || null;

  const handleAnswer = useCallback((slotId: string, value: number) => {
    setInputs((prev: Record<string, string>) => ({ ...prev, [slotId]: value.toString() }));
  }, [setInputs]);

  const handleNext = useCallback(() => {
    if (isCorrect) {
      next();
    } else {
      verify();
    }
  }, [isCorrect, next, verify]);

  useEffect(() => {
    if (isCorrect && currentQuest) {
      completeStage("sc2-01", currentStage);
    }
  }, [isCorrect, currentStage, currentQuest, completeStage]);

  const quest = currentQuest as KineticsQuest | null;

  return (
    <ChamberLayout
      moduleCode="SC2.01"
      title={t?.title || "SC2.01 // KINETICS"}
      difficulty={currentDifficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={[
        { id: "ARRHENIUS", label: t.stages?.arrhenius || "ARRHENIUS" },
        { id: "RATE_LAW", label: t.stages?.concentration || "RATE LAW" },
        { id: "HALF_LIFE", label: t.stages?.collision || "HALF-LIFE" },
      ]}
      currentStage={currentStage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      translations={t}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization */}
        <div className="border border-cyan-500/30 bg-black/20 p-4 rounded">
          <div className="aspect-video w-full">
            <KineticsCanvas
              temperature={quest?.temperature || 300}
              activationEnergy={quest?.activationEnergy || 50}
              showCollisions={true}
            />
          </div>
        </div>

        {/* Quest Panel */}
        <div className="space-y-4">
          {/* Scenario */}
          {quest?.scenario && (
            <div className="border border-purple-500/30 bg-purple-950/10 p-4 rounded">
              <div className="text-sm text-purple-400 mb-2">{t?.scenario_title || "SCENARIO"}</div>
              <div className="text-xs text-purple-300/80">{quest.scenario}</div>
            </div>
          )}

          {/* Problem */}
          {quest?.context && (
            <div className="border border-cyan-500/30 bg-cyan-950/10 p-4 rounded">
              <div className="text-sm text-cyan-400 mb-2">{t?.objective_title || "PROBLEM"}</div>
              <div className="text-sm text-cyan-300">{quest.context}</div>
            </div>
          )}

          {/* Formula */}
          {quest?.promptLatex && (
            <div className="border border-amber-500/30 bg-amber-950/10 p-4 rounded">
              <div className="text-sm text-amber-400 mb-2">FORMULA</div>
              <BlockMath math={quest.promptLatex} />
            </div>
          )}

          {/* Expression */}
          {quest?.expressionLatex && (
            <div className="border border-green-500/30 bg-green-950/10 p-4 rounded">
              <div className="text-sm text-green-400 mb-2">GIVEN</div>
              <BlockMath math={quest.expressionLatex} />
            </div>
          )}

          {/* Input */}
          <div className="border border-blue-500/30 bg-blue-950/10 p-4 rounded space-y-3">
            <div className="text-sm text-blue-400">{t?.answer_title || "YOUR ANSWER"}</div>
            {quest?.slots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <label className="text-xs text-blue-300">
                  <InlineMath math={slot.labelLatex} />
                  {slot.unit && ` (${slot.unit})`}
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder={slot.placeholder}
                  value={userAnswer[slot.id] || ""}
                  onChange={(e) => handleAnswer(slot.id, parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-black/50 border border-blue-500/50 rounded text-blue-100 focus:border-blue-400 focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleNext}
              className="flex-1 px-4 py-2 bg-cyan-500/20 border border-cyan-500 text-cyan-300 rounded hover:bg-cyan-500/30 transition-colors"
            >
              {isCorrect ? (t?.next || "NEXT") : (t?.check || "VERIFY")}
            </button>
          </div>

          {/* Feedback */}
          {isCorrect !== null && (
            <div className={`border p-3 rounded ${isCorrect ? "border-green-500/50 bg-green-950/20" : "border-red-500/50 bg-red-950/20"}`}>
              <div className={`text-sm ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                {isCorrect ? (t?.correct || "VERIFIED") : (t?.incorrect || "INCORRECT")}
              </div>
              {isCorrect && quest?.correctLatex && (
                <div className="mt-2 text-xs text-green-300/80">
                  <InlineMath math={quest.correctLatex} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ChamberLayout>
  );
}
