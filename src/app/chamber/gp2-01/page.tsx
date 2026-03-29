"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguage, TranslationKeys } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GasLawsVisualization from "@/components/chamber/gp2-01/GasLawsVisualization";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createGP201FeedbackProvider } from "@/lib/gp2-01/provider";
import type { GP201Quest, Stage } from "@/lib/gp2-01/types";

function buildStagePool(
    getT: any, // The main t function from useLanguage
    tObj: TranslationKeys['gp2_01'], // The object for static keys
    difficulty: Difficulty,
    stage: Stage
): GP201Quest[] {
    const quests: GP201Quest[] = [];
    const t = getT; // Alias for brevity
    const hints = tObj.hints;
    const placeholders = tObj.placeholders;

    if (stage === "IDEAL_GAS") {
        // PV = nRT
        if (difficulty === "BASIC") {
            // Simple direct calculations
            quests.push(
                {
                    id: "IG-B1", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_p", { n: 2, T: 300, V: 0.05 }),
                    expressionLatex: `P = \\frac{nRT}{V}`,
                    targetLatex: "P",
                    slots: [{ id: "p", labelLatex: "P \\text{ (Pa)}", placeholder: t("gp2_01.placeholders.v_99768"), expected: 99768 }],
                    correctLatex: "P \\approx 99768 \\text{ Pa}",
                    hintLatex: [hints.ideal_substitute_pressure]
                },
                {
                    id: "IG-B2", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_n", { P: 100000, V: 0.1, T: 400 }),
                    expressionLatex: `n = \\frac{PV}{RT}`,
                    targetLatex: "n",
                    slots: [{ id: "n", labelLatex: "n \\text{ (mol)}", placeholder: t("gp2_01.placeholders.v_3_dot_01"), expected: 3.01 }],
                    correctLatex: "n \\approx 3.01 \\text{ mol}",
                    hintLatex: [hints.ideal_substitute_moles]
                },
                {
                    id: "IG-B3", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_v", { n: 1, P: 101325, T: 273 }),
                    expressionLatex: `V = \\frac{nRT}{P}`,
                    targetLatex: "V",
                    slots: [{ id: "v", labelLatex: "V \\text{ (m}^{3})", placeholder: t("gp2_01.placeholders.v_0_dot_0224"), expected: 0.0224 }],
                    correctLatex: "V \\approx 0.0224 \\text{ m}^{3}",
                    hintLatex: [t("gp2_01.hints.stp_conditions")]
                },
                {
                    id: "IG-B4", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_t", { P: 200000, V: 0.02, n: 2 }),
                    expressionLatex: `T = \\frac{PV}{nR}`,
                    targetLatex: "T",
                    slots: [{ id: "t", labelLatex: "T \\text{ (K)}", placeholder: t("gp2_01.placeholders.v_240_dot_56"), expected: 240.56 }],
                    correctLatex: "T \\approx 240.6 \\text{ K}",
                    hintLatex: [hints.ideal_substitute_temperature]
                },
                {
                    id: "IG-B5", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_p", { n: 5, T: 350, V: 0.1 }),
                    expressionLatex: `P = \\frac{nRT}{V}`,
                    targetLatex: "P",
                    slots: [{ id: "p", labelLatex: "P \\text{ (Pa)}", placeholder: t("gp2_01.placeholders.v_145495"), expected: 145495 }],
                    correctLatex: "P \\approx 145495 \\text{ Pa}",
                    hintLatex: [hints.ideal_substitute_pressure_high]
                }
            );
        } else if (difficulty === "CORE") {
            // More varied values
            quests.push(
                {
                    id: "IG-C1", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_p", { n: 0.5, T: 298, V: 0.01 }),
                    expressionLatex: `P = \\frac{nRT}{V}`,
                    targetLatex: "P",
                    slots: [{ id: "p", labelLatex: "P", placeholder: t("gp2_01.placeholders.v_123878"), expected: 123878 }],
                    correctLatex: "P \\approx 123879 \\text{ Pa}",
                    hintLatex: [hints.r_value]
                },
                {
                    id: "IG-C2", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_n", { P: 150000, V: 0.05, T: 300 }),
                    expressionLatex: `n = \\frac{PV}{RT}`,
                    targetLatex: "n",
                    slots: [{ id: "n", labelLatex: "n", placeholder: t("gp2_01.placeholders.v_3_dot_01"), expected: 3.01 }],
                    correctLatex: "n \\approx 3.01 \\text{ mol}",
                    hintLatex: [hints.watch_units]
                },
                {
                    id: "IG-C3", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_v", { n: 2.5, P: 50000, T: 400 }),
                    expressionLatex: `V = \\frac{nRT}{P}`,
                    targetLatex: "V",
                    slots: [{ id: "v", labelLatex: "V", placeholder: t("gp2_01.placeholders.v_0_dot_166"), expected: 0.166 }],
                    correctLatex: "V \\approx 0.166 \\text{ m}^{3}",
                    hintLatex: [hints.standard_calculation]
                },
                {
                    id: "IG-C4", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_t", { P: 300000, V: 0.01, n: 1 }),
                    expressionLatex: `T = \\frac{PV}{nR}`,
                    targetLatex: "T",
                    slots: [{ id: "t", labelLatex: "T", placeholder: t("gp2_01.placeholders.v_360_dot_8"), expected: 360.8 }],
                    correctLatex: "T \\approx 361 \\text{ K}",
                    hintLatex: [hints.check_r_value]
                },
                {
                    id: "IG-C5", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.relation_pt"),
                    expressionLatex: `P \\propto T \\text{ (V, n const)}`,
                    targetLatex: t("gp2_01.labels.factor"),
                    slots: [{ id: "f", labelLatex: "\\times", placeholder: t("gp2_01.placeholders.v_2"), expected: 2 }],
                    correctLatex: "\\text{Factor } = 2",
                    hintLatex: [hints.linear_relationship]
                }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                {
                    id: "IG-A1", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.relation_vn"),
                    expressionLatex: `V \\propto n`,
                    targetLatex: t("gp2_01.labels.factor"),
                    slots: [{ id: "f", labelLatex: "\\times", placeholder: t("gp2_01.placeholders.v_2"), expected: 2 }],
                    correctLatex: "\\text{Factor } = 2",
                    hintLatex: [hints.avogadros_law]
                },
                {
                    id: "IG-A2", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_p", { n: 10, T: 500, V: 0.1 }),
                    expressionLatex: "P = \\frac{nRT}{V}",
                    targetLatex: "P",
                    slots: [{ id: "p", labelLatex: "P", placeholder: t("gp2_01.placeholders.v_415700"), expected: 415700 }],
                    correctLatex: "P = 415700 \\text{ Pa}",
                    hintLatex: [hints.high_temperature]
                },
                {
                    id: "IG-A3", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_n", { P: 10000, V: 2, T: 100 }),
                    expressionLatex: "n = \\frac{PV}{RT}",
                    targetLatex: "n",
                    slots: [{ id: "n", labelLatex: "n", placeholder: t("gp2_01.placeholders.v_24_dot_06"), expected: 24.06 }],
                    correctLatex: "n \\approx 24.1 \\text{ mol}",
                    hintLatex: [hints.low_temperature]
                },
                {
                    id: "IG-A4", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_v", { n: 0.1, P: 1000000, T: 300 }),
                    expressionLatex: "V = \\frac{nRT}{P}",
                    targetLatex: "V",
                    slots: [{ id: "v", labelLatex: "V", placeholder: t("gp2_01.placeholders.v_0_dot_00025"), expected: 0.00025 }],
                    correctLatex: "V \\approx 2.5 \\times 10^{-4} \\text{ m}^{3}",
                    hintLatex: [hints.high_pressure]
                },
                {
                    id: "IG-A5", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.combined_law", { target: "P2" }),
                    expressionLatex: "\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}",
                    targetLatex: "P_2",
                    slots: [{ id: "f", labelLatex: t("gp2_01.labels.symbol"), placeholder: t("gp2_01.placeholders.p2"), expected: "P2" }], // Logic placeholder
                    correctLatex: "P_2 = P_1 \\frac{V_1 T_2}{V_2 T_1}",
                    hintLatex: [hints.isolate_p2]
                }
            );
        } else { // ELITE
            quests.push(
                {
                    id: "IG-E1", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.iwb_steam", { T: 450, V: 50, n: 2000 }),
                    expressionLatex: "P = \\frac{nRT}{V}",
                    targetLatex: "P",
                    slots: [{ id: "p", labelLatex: "P \\text{ (Pa)}", placeholder: t("gp2_01.placeholders.v_149652"), expected: 149652 }],
                    correctLatex: "P \\approx 150 \\text{ kPa}",
                    hintLatex: [hints.r_value_si]
                },
                {
                    id: "IG-E2", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.roche_tower", { V: 500, T: 300, P: 100000 }),
                    expressionLatex: "n = \\frac{PV}{RT}",
                    targetLatex: "n",
                    slots: [{ id: "n", labelLatex: "n \\text{ (mol)}", placeholder: t("gp2_01.placeholders.v_20046"), expected: 20046 }],
                    correctLatex: "n \\approx 20050 \\text{ mol}",
                    hintLatex: [hints.p_in_pa_v_in_m3]
                },
                {
                    id: "IG-E3", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.rhine_bubble", { p1: 200, v1: 20, p2: 100 }),
                    expressionLatex: "P_1 V_1 = P_2 V_2",
                    targetLatex: "V_2",
                    slots: [{ id: "v", labelLatex: "V_2 \\text{ (mL)}", placeholder: t("gp2_01.placeholders.v_40"), expected: 40 }],
                    correctLatex: "40 \\text{ mL}",
                    hintLatex: [hints.pressure_halves_volume_doubles]
                },
                {
                    id: "IG-E4", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.weather_balloon", { v1: 10, t1: 300, t2: 240 }),
                    expressionLatex: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}",
                    targetLatex: "V_2",
                    slots: [{ id: "v", labelLatex: "V_2 \\text{ (m}^{3})", placeholder: t("gp2_01.placeholders.v_8"), expected: 8 }],
                    correctLatex: "8 \\text{ m}^{3}",
                    hintLatex: [hints.cooling_shrinks_volume]
                },
                {
                    id: "IG-E5", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.novartis_reactor", { V: 10, P: 200000, T: 300 }),
                    expressionLatex: "m = n \\times M = \\frac{PV}{RT} \\times M",
                    targetLatex: "m",
                    slots: [{ id: "m", labelLatex: "m \\text{ (kg)}", placeholder: t("gp2_01.placeholders.v_22_dot_45"), expected: 22.45 }],
                    correctLatex: "m \\approx 22.5 \\text{ kg}",
                    hintLatex: [hints.calculate_n_then_mass]
                }
            );
        }
    }

    if (stage === "BOYLES_LAW") {
        if (difficulty === "BASIC") {
            quests.push(
                {
                    id: "B-B1", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_p2", { p1: 100, v1: 2, v2: 1 }),
                    expressionLatex: "P_1 V_1 = P_2 V_2",
                    targetLatex: "P_2",
                    slots: [{ id: "p", labelLatex: "P_2", placeholder: t("gp2_01.placeholders.v_200"), expected: 200 }],
                    correctLatex: "P_2 = 200 \\text{ kPa}",
                    hintLatex: [hints.volume_halves_pressure_doubles]
                },
                {
                    id: "B-B2", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_v2", { p1: 200, v1: 1, p2: 100 }),
                    expressionLatex: "V_2 = P_1 V_1 / P_2",
                    targetLatex: "V_2",
                    slots: [{ id: "v", labelLatex: "V_2", placeholder: t("gp2_01.placeholders.v_2"), expected: 2 }],
                    correctLatex: "V_2 = 2 \\text{ L}",
                    hintLatex: [hints.pressure_halves_volume_doubles]
                },
                {
                    id: "B-B3", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_p2", { p1: 50, v1: 4, v2: 2 }),
                    expressionLatex: "50 \\times 4 = P_2 \\times 2",
                    targetLatex: "P_2",
                    slots: [{ id: "p", labelLatex: "P_2", placeholder: t("gp2_01.placeholders.v_100"), expected: 100 }],
                    correctLatex: "P_2 = 100 \\text{ kPa}",
                    hintLatex: [hints.calculate_constant_first]
                },
                {
                    id: "B-B4", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_v2", { p1: 100, v1: 5, p2: 500 }),
                    expressionLatex: "100 \\times 5 = 500 \\times V_2",
                    targetLatex: "V_2",
                    slots: [{ id: "v", labelLatex: "V_2", placeholder: t("gp2_01.placeholders.v_1"), expected: 1 }],
                    correctLatex: "V_2 = 1 \\text{ L}",
                    hintLatex: [hints.pressure_times_five_volume_div_five]
                },
                {
                    id: "B-B5", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_condition"),
                    expressionLatex: "PV = k",
                    targetLatex: t("gp2_01.labels.constant"),
                    slots: [{ id: "c", labelLatex: "T", placeholder: placeholders.temperature, expected: placeholders.temperature }],
                    correctLatex: placeholders.temperature,
                    hintLatex: [hints.isothermal]
                }
            );
        } else if (difficulty === "CORE") {
            quests.push(
                {
                    id: "B-C1", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_p2", { p1: 150, v1: 3, v2: 1.5 }),
                    expressionLatex: "150 \\times 3 = P_2 \\times 1.5",
                    targetLatex: "P_2",
                    slots: [{ id: "p", labelLatex: "P_2", placeholder: t("gp2_01.placeholders.v_300"), expected: 300 }],
                    correctLatex: "P_2 = 300 \\text{ kPa}",
                    hintLatex: [hints.inverse_proportion]
                },
                {
                    id: "B-C2", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_v2", { p1: 120, v1: 2, p2: 80 }),
                    expressionLatex: "120 \\times 2 = 80 \\times V_2",
                    targetLatex: "V_2",
                    slots: [{ id: "v", labelLatex: "V_2", placeholder: t("gp2_01.placeholders.v_3"), expected: 3 }],
                    correctLatex: "V_2 = 3 \\text{ L}",
                    hintLatex: [hints.two_forty_over_eighty]
                },
                {
                    id: "B-C3", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_relation", { v1: 10, v2: 2 }),
                    expressionLatex: "P_2/P_1 = V_1/V_2",
                    targetLatex: t("gp2_01.labels.factor"),
                    slots: [{ id: "f", labelLatex: "\\times", placeholder: t("gp2_01.placeholders.v_5"), expected: 5 }],
                    correctLatex: "5\\times",
                    hintLatex: [hints.ten_over_two]
                },
                {
                    id: "B-C4", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_p2", { p1: 101.3, v1: 10, v2: 5 }),
                    expressionLatex: "101.3 \\times 10 = P_2 \\times 5",
                    targetLatex: "P_2",
                    slots: [{ id: "p", labelLatex: "P_2", placeholder: t("gp2_01.placeholders.v_202_dot_6"), expected: 202.6 }],
                    correctLatex: "202.6 \\text{ kPa}",
                    hintLatex: [hints.double_value]
                },
                {
                    id: "B-C5", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_k_find_v"),
                    expressionLatex: "600 \\times V = 2400",
                    targetLatex: "V",
                    slots: [{ id: "v", labelLatex: "V", placeholder: t("gp2_01.placeholders.v_4"), expected: 4 }],
                    correctLatex: "4 \\text{ L}",
                    hintLatex: [hints.twenty_four_hundred_over_six_hundred]
                }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                { id: "B-A1", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_find_p2", { p1: 300, v1: 0.5, v2: 0.1 }), expressionLatex: "300 \\times 0.5 = P_2 \\times 0.1", targetLatex: "P_2", slots: [{ id: "p", labelLatex: "P", placeholder: t("gp2_01.placeholders.v_1500"), expected: 1500 }], correctLatex: "1500 kPa", hintLatex: [hints.times_five] },
                { id: "B-A2", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_p_increase_factor"), expressionLatex: "P_2 = 1.25 P_1 \\implies V_2 = V_1 / 1.25", targetLatex: "\\text{Factor}", slots: [{ id: "f", labelLatex: "F", placeholder: t("gp2_01.placeholders.v_0_dot_8"), expected: 0.8 }], correctLatex: "0.8", hintLatex: [hints.one_over_one_point_two_five] },
                { id: "B-A3", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_energy_density"), expressionLatex: "P = 5000/0.01", targetLatex: "P", slots: [{ id: "p", labelLatex: "P", placeholder: t("gp2_01.placeholders.v_500000"), expected: 500000 }], correctLatex: "500 kPa", hintLatex: [hints.j_per_m3_equals_pa] },
                { id: "B-A4", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_find_v2", { p1: 400, v1: 2.5, p2: 1000 }), expressionLatex: "400(2.5)=1000 V_2", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: t("gp2_01.placeholders.v_1"), expected: 1 }], correctLatex: "1 L", hintLatex: [hints.one_thousand_over_one_thousand] },
                { id: "B-A5", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_hyperbola"), expressionLatex: "P=100/5", targetLatex: "P", slots: [{ id: "p", labelLatex: "P", placeholder: t("gp2_01.placeholders.v_20"), expected: 20 }], correctLatex: "20", hintLatex: [hints.inverse] }
            );
        } else {
            // ELITE
            quests.push(
                { id: "B-E1", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_isothermal_work"), expressionLatex: "W = 1000 \\ln(2)", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_01.placeholders.v_693"), expected: 693 }], correctLatex: "\\approx 693 \\text{ J}", hintLatex: [hints.ln_two] },
                { id: "B-E2", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_compress_v3"), expressionLatex: "W = -P_1 V_1 \\ln(1/3)", targetLatex: "\\text{Sign}", slots: [{ id: "s", labelLatex: "+/-", placeholder: t("gp2_01.placeholders.plus"), expected: "+" }], correctLatex: placeholders.positive_work_on_gas, hintLatex: [hints.compression] },
                { id: "B-E3", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_real_gas_limit"), expressionLatex: "\\text{High P, Low T}", targetLatex: "\\text{Conditions}", slots: [{ id: "c", labelLatex: "P is", placeholder: placeholders.high, expected: placeholders.high }], correctLatex: placeholders.high_pressure, hintLatex: [hints.intermolecular_forces_dominate] },
                { id: "B-E4", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_compress_atm"), expressionLatex: "1(10) = 10(V_2)", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: t("gp2_01.placeholders.v_1"), expected: 1 }], correctLatex: "1 L", hintLatex: [hints.ratio_ten] },
                { id: "B-E5", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_two_bulbs"), expressionLatex: "P_f (V_1+V_2) = P_1 V_1", targetLatex: "P_f", slots: [{ id: "p", labelLatex: "P", placeholder: t("gp2_01.placeholders.v_1"), expected: 1 }], correctLatex: "1", hintLatex: [hints.total_volume_two] }
            );
        }
    }

    if (stage === "CHARLES_LAW") {
        if (difficulty === "BASIC") {
            quests.push(
                { id: "C-B1", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_v2", { v1: 2, t1: 300, t2: 600 }), expressionLatex: "V_2/600 = 2/300", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: t("gp2_01.placeholders.v_4"), expected: 4 }], correctLatex: "4 L", hintLatex: [hints.temperature_doubles_volume_doubles] },
                { id: "C-B2", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_t2", { v1: 1, t1: 200, v2: 2 }), expressionLatex: "2/T_2 = 1/200", targetLatex: "T_2", slots: [{ id: "t", labelLatex: "T", placeholder: t("gp2_01.placeholders.v_400"), expected: 400 }], correctLatex: "400 K", hintLatex: [hints.volume_doubles_temperature_doubles] },
                { id: "C-B3", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_v2", { v1: 10, t1: 400, t2: 200 }), expressionLatex: "V_2/200 = 10/400", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: t("gp2_01.placeholders.v_5"), expected: 5 }], correctLatex: "5 L", hintLatex: [hints.temperature_halves] },
                { id: "C-B4", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_t2", { v1: 5, t1: 250, v2: 10 }), expressionLatex: "10/T_2 = 5/250", targetLatex: "T_2", slots: [{ id: "t", labelLatex: "T", placeholder: t("gp2_01.placeholders.v_500"), expected: 500 }], correctLatex: "500 K", hintLatex: [hints.proportional] },
                { id: "C-B5", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_condition"), expressionLatex: "V/T = k", targetLatex: "\\text{Constant}", slots: [{ id: "c", labelLatex: "P", placeholder: placeholders.pressure, expected: placeholders.pressure }], correctLatex: placeholders.pressure, hintLatex: [hints.isobaric] }
            );
        } else if (difficulty === "CORE") {
            quests.push(
                { id: "C-C1", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_celsius_find_v2"), expressionLatex: "V_2 = 3 \\times 400/300", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: t("gp2_01.placeholders.v_4"), expected: 4 }], correctLatex: "4 L", hintLatex: [hints.use_kelvin_only] },
                { id: "C-C2", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_t2_c2"), expressionLatex: "T_2 = 3 \\times 200/2", targetLatex: "T_2", slots: [{ id: "t", labelLatex: "T", placeholder: t("gp2_01.placeholders.v_300"), expected: 300 }], correctLatex: "300 K", hintLatex: [hints.ratio_one_point_five] },
                { id: "C-C3", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_relation"), expressionLatex: "V \\propto T", targetLatex: "\\text{Factor}", slots: [{ id: "f", labelLatex: "\\times", placeholder: t("gp2_01.placeholders.v_2"), expected: 2 }], correctLatex: "2", hintLatex: [hints.linear] },
                { id: "C-C4", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_cool_factor"), expressionLatex: "100/400", targetLatex: "\\text{Factor}", slots: [{ id: "f", labelLatex: "F", placeholder: t("gp2_01.placeholders.v_0_dot_25"), expected: 0.25 }], correctLatex: "0.25", hintLatex: [hints.one_quarter] },
                { id: "C-C5", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_abs_zero"), expressionLatex: "0 \\text{ K}", targetLatex: "^\\circ\\text{C}", slots: [{ id: "c", labelLatex: "C", placeholder: t("gp2_01.placeholders.minus_273_dot_15"), expected: -273.15 }], correctLatex: "-273.15", hintLatex: [hints.offset] }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                { id: "C-A1", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_20c_to_80c"), expressionLatex: "V_2 = 5 \\times 353 / 293", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: t("gp2_01.placeholders.v_6_dot_02"), expected: 6.02 }], correctLatex: "\\approx 6.02 \\text{ L}", hintLatex: [hints.kelvin_conversion] },
                { id: "C-A2", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_ke_proportional"), expressionLatex: "KE \\propto T", targetLatex: "\\text{Quantity}", slots: [{ id: "q", labelLatex: "Q", placeholder: placeholders.temperature, expected: placeholders.temperature }], correctLatex: placeholders.temperature, hintLatex: [hints.temperature_measures_ke] },
                { id: "C-A3", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_t2_a3"), expressionLatex: "T_2 = 5/10 \\times 500", targetLatex: "T_2", slots: [{ id: "t", labelLatex: "T", placeholder: t("gp2_01.placeholders.v_250"), expected: 250 }], correctLatex: "250 K", hintLatex: [hints.halved] },
                { id: "C-A4", difficulty, stage, lawType: "combined", promptLatex: t("gp2_01.prompts.charles_combined_reduces"), expressionLatex: "V/T = k", targetLatex: "\\text{Law}", slots: [{ id: "l", labelLatex: "Law", placeholder: placeholders.charles, expected: placeholders.charles }], correctLatex: placeholders.charles_law, hintLatex: [hints.name] },
                { id: "C-A5", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_isobaric_work"), expressionLatex: "100(2-1)", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_01.placeholders.v_100"), expected: 100 }], correctLatex: "100 J", hintLatex: [hints.direct_multiply] }
            );
        } else { // ELITE
            quests.push(
                { id: "C-E1", difficulty, stage, lawType: "combined", promptLatex: t("gp2_01.prompts.charles_density_factor"), expressionLatex: "1/2", targetLatex: "\\text{Factor}", slots: [{ id: "f", labelLatex: "F", placeholder: t("gp2_01.placeholders.v_0_dot_5"), expected: 0.5 }], correctLatex: "0.5", hintLatex: [hints.inverse] },
                { id: "C-E2", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_vt_slope"), expressionLatex: "Slope = R/P = 1", targetLatex: "S", slots: [{ id: "s", labelLatex: "S", placeholder: t("gp2_01.placeholders.v_1"), expected: 1 }], correctLatex: "1", hintLatex: [hints.r_value] },
                { id: "C-E3", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_piston_work"), expressionLatex: "300 = 100(V_2 - 1)", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: t("gp2_01.placeholders.v_4"), expected: 4 }], correctLatex: "4 L", hintLatex: [hints.w_equals_p_delta_v] },
                { id: "C-E4", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_t2_piston"), expressionLatex: "300/1 = T_2/4", targetLatex: "T_2", slots: [{ id: "t", labelLatex: "T", placeholder: t("gp2_01.placeholders.v_1200"), expected: 1200 }], correctLatex: "1200 K", hintLatex: [hints.proportional_short] },
                { id: "C-E5", difficulty, stage, lawType: "combined", promptLatex: t("gp2_01.prompts.charles_carnot_ke"), expressionLatex: "v_{rms} \\propto \\sqrt{T}", targetLatex: "\\text{Power}", slots: [{ id: "p", labelLatex: "P", placeholder: t("gp2_01.placeholders.v_0_dot_5"), expected: 0.5 }], correctLatex: placeholders.square_root, hintLatex: [hints.power_half] }
            );
        }
    }

    return quests;
}

export default function GP201Page() {
    const { t: getT } = useLanguage();
    const feedbackContentProvider = useMemo(() => createGP201FeedbackProvider(getT), [getT]);
    const t = getT("gp2_01");
    const { completeStage } = useAppStore();

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(getT, t, d, s), [getT, t]);

    const {
        currentQuest,
        difficulty,
        stage,
        lastCheck,
        inputs,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
      adaptiveRecommendation,
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
    } = useQuestManager<GP201Quest, Stage>({
    moduleCode: "gp2-01",
        buildPool,
        initialStage: "IDEAL_GAS",
    feedbackContentProvider,
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gp2-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "IDEAL_GAS" as Stage, label: t.stages.ideal_gas },
        { id: "BOYLES_LAW" as Stage, label: t.stages.boyles },
        { id: "CHARLES_LAW" as Stage, label: t.stages.charles },
    ], [t.stages]);

    const printSections = useMemo(() => buildQuestPrintSections<GP201Quest, Stage>({
        moduleTitle: t.title,
        stages: stagesProps,
        difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
        difficultyLabels: {
            BASIC: t.difficulty.BASIC,
            CORE: t.difficulty.CORE,
            ADVANCED: t.difficulty.ADVANCED,
            ELITE: t.difficulty.ELITE,
        },
        buildPool,
    }), [buildPool, stagesProps, t.difficulty.ADVANCED, t.difficulty.BASIC, t.difficulty.CORE, t.difficulty.ELITE, t.title]);

    // Safety check for t loading
    if (!t || !t.stages) return null;

    if (!currentQuest) {
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
      title={t.title}
                moduleCode="GP2.01"
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                stages={stagesProps}
                currentStage={stage}
                onStageChange={(s) => handleStageChange(s as Stage)}
                printSections={printSections}
                translations={{
                    back: t.back,
                    check: t.check,
                    next: t.next,
                    correct: t.correct,
                    incorrect: t.incorrect,
                    difficulty: t.difficulty,
                }}
                monitorContent={<GasLawsVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

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
      title={t.title}
            moduleCode="GP2.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            printSections={printSections}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            translations={{
                back: t.back,
                check: t.check,
                next: t.next,
                correct: t.correct,
                incorrect: t.incorrect,
                difficulty: t.difficulty,
            }}
            monitorContent={<GasLawsVisualization quest={currentQuest} stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30">
                    <h3 className="text-cyan-400 font-bold mb-2">{t.objective_title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t.scenarios[stage.toLowerCase() as keyof typeof t.scenarios]}
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        {renderMixedText(currentQuest?.promptLatex || "")}
                    </div>

                    <div className="text-cyan-300">
                        <KatexTextWrap math={currentQuest?.expressionLatex || ""} />
                    </div>

                    <div className="space-y-3">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-3">
                                <InlineMath math={slot.labelLatex} />
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    placeholder={slot.placeholder}
                                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                    disabled={lastCheck?.ok}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
