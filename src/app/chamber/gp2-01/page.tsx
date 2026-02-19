"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguage, TranslationKeys } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GasLawsVisualization from "@/components/chamber/gp2-01/GasLawsVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "IDEAL_GAS" | "BOYLES_LAW" | "CHARLES_LAW";

interface GP201Quest extends Quest {
    stage: Stage;
    gasType?: string;
    lawType?: string;
}

// Helper to access nested keys safely if needed, but we rely on standard structure
// We will use the t() function provided by useLanguage for dynamic prompts
type T = (path: string, params?: Record<string, string | number>) => string;

const R = 8.314;

function buildStagePool(
    getT: any, // The main t function from useLanguage
    tObj: TranslationKeys['gp2_01'], // The object for static keys
    difficulty: Difficulty,
    stage: Stage
): GP201Quest[] {
    const quests: GP201Quest[] = [];
    const t = getT; // Alias for brevity

    // Helper to format numbers
    const fm = (n: number) => Number.isInteger(n) ? n.toString() : n.toFixed(2);

    if (stage === "IDEAL_GAS") {
        // PV = nRT
        if (difficulty === "BASIC") {
            // Simple direct calculations
            quests.push(
                {
                    id: "IG-B1", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_p", { n: 2, T: 300, V: 0.05 }),
                    expressionLatex: `P = \\\\frac{nRT}{V}`,
                    targetLatex: "P",
                    slots: [{ id: "p", labelLatex: "P \\\\text{ (Pa)}", placeholder: "99768", expected: 99768 }],
                    correctLatex: "P \\approx 99768 \\\\text{ Pa}",
                    hintLatex: [`P = \\\\frac{2 \\times 8.314 \\times 300}{0.05}`]
                },
                {
                    id: "IG-B2", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_n", { P: 100000, V: 0.1, T: 400 }),
                    expressionLatex: `n = \\\\frac{PV}{RT}`,
                    targetLatex: "n",
                    slots: [{ id: "n", labelLatex: "n \\\\text{ (mol)}", placeholder: "3.01", expected: 3.01 }],
                    correctLatex: "n \\approx 3.01 \\\\text{ mol}",
                    hintLatex: [`n = \\\\frac{100000 \\times 0.1}{8.314 \\times 400}`]
                },
                {
                    id: "IG-B3", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_v", { n: 1, P: 101325, T: 273 }),
                    expressionLatex: `V = \\\\frac{nRT}{P}`,
                    targetLatex: "V",
                    slots: [{ id: "v", labelLatex: "V \\\\text{ (m}^3)", placeholder: "0.0224", expected: 0.0224 }],
                    correctLatex: "V \\approx 0.0224 \\\\text{ m}^3",
                    hintLatex: [`\\\\text{STP conditions}`]
                },
                {
                    id: "IG-B4", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_t", { P: 200000, V: 0.02, n: 2 }),
                    expressionLatex: `T = \\\\frac{PV}{nR}`,
                    targetLatex: "T",
                    slots: [{ id: "t", labelLatex: "T \\\\text{ (K)}", placeholder: "240.56", expected: 240.56 }],
                    correctLatex: "T \\approx 240.6 \\\\text{ K}",
                    hintLatex: [`T = \\\\frac{200000 \\times 0.02}{2 \\times 8.314}`]
                },
                {
                    id: "IG-B5", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_p", { n: 5, T: 350, V: 0.1 }),
                    expressionLatex: `P = \\\\frac{nRT}{V}`,
                    targetLatex: "P",
                    slots: [{ id: "p", labelLatex: "P \\\\text{ (Pa)}", placeholder: "145495", expected: 145495 }],
                    correctLatex: "P \\approx 145495 \\\\text{ Pa}",
                    hintLatex: [`P = \\\\frac{5 \\times 8.314 \\times 350}{0.1}`]
                }
            );
        } else if (difficulty === "CORE") {
            // More varied values
            quests.push(
                {
                    id: "IG-C1", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_p", { n: 0.5, T: 298, V: 0.01 }),
                    expressionLatex: `P = \\\\frac{nRT}{V}`,
                    targetLatex: "P",
                    slots: [{ id: "p", labelLatex: "P", placeholder: "123878", expected: 123878 }],
                    correctLatex: "P \\approx 123879 \\\\text{ Pa}",
                    hintLatex: ["R = 8.314"]
                },
                {
                    id: "IG-C2", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_n", { P: 150000, V: 0.05, T: 300 }),
                    expressionLatex: `n = \\\\frac{PV}{RT}`,
                    targetLatex: "n",
                    slots: [{ id: "n", labelLatex: "n", placeholder: "3.01", expected: 3.01 }],
                    correctLatex: "n \\approx 3.01 \\\\text{ mol}",
                    hintLatex: ["Watch units"]
                },
                {
                    id: "IG-C3", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_v", { n: 2.5, P: 50000, T: 400 }),
                    expressionLatex: `V = \\\\frac{nRT}{P}`,
                    targetLatex: "V",
                    slots: [{ id: "v", labelLatex: "V", placeholder: "0.166", expected: 0.166 }],
                    correctLatex: "V \\approx 0.166 \\\\text{ m}^3",
                    hintLatex: ["Standard calculation"]
                },
                {
                    id: "IG-C4", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_t", { P: 300000, V: 0.01, n: 1 }),
                    expressionLatex: `T = \\\\frac{PV}{nR}`,
                    targetLatex: "T",
                    slots: [{ id: "t", labelLatex: "T", placeholder: "360.8", expected: 360.8 }],
                    correctLatex: "T \\approx 361 \\\\text{ K}",
                    hintLatex: ["Check R value"]
                },
                {
                    id: "IG-C5", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.relation_pt"),
                    expressionLatex: `P \\propto T \\\\text{ (V, n const)}`,
                    targetLatex: "\\\\text{Factor}",
                    slots: [{ id: "f", labelLatex: "\\times", placeholder: "2", expected: 2 }],
                    correctLatex: "\\\\text{Factor } = 2",
                    hintLatex: ["Linear relationship"]
                }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                {
                    id: "IG-A1", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.relation_vn"),
                    expressionLatex: `V \\propto n`,
                    targetLatex: "\\\\text{Factor}",
                    slots: [{ id: "f", labelLatex: "\\times", placeholder: "2", expected: 2 }],
                    correctLatex: "\\\\text{Factor } = 2",
                    hintLatex: ["Avogadro's Law"]
                },
                {
                    id: "IG-A2", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_p", { n: 10, T: 500, V: 0.1 }),
                    expressionLatex: "P = \\\\frac{nRT}{V}",
                    targetLatex: "P",
                    slots: [{ id: "p", labelLatex: "P", placeholder: "415700", expected: 415700 }],
                    correctLatex: "P = 415700 \\\\text{ Pa}",
                    hintLatex: ["High temperature"]
                },
                {
                    id: "IG-A3", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_n", { P: 10000, V: 2, T: 100 }),
                    expressionLatex: "n = \\\\frac{PV}{RT}",
                    targetLatex: "n",
                    slots: [{ id: "n", labelLatex: "n", placeholder: "24.06", expected: 24.06 }],
                    correctLatex: "n \\approx 24.1 \\\\text{ mol}",
                    hintLatex: ["Low temperature"]
                },
                {
                    id: "IG-A4", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.find_v", { n: 0.1, P: 1000000, T: 300 }),
                    expressionLatex: "V = \\\\frac{nRT}{P}",
                    targetLatex: "V",
                    slots: [{ id: "v", labelLatex: "V", placeholder: "0.00025", expected: 0.00025 }],
                    correctLatex: "V \\approx 2.5 \\times 10^{-4} \\\\text{ m}^3",
                    hintLatex: ["High pressure"]
                },
                {
                    id: "IG-A5", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.combined_law", { target: "P2" }),
                    expressionLatex: "\\\\frac{P_1V_1}{T_1} = \\\\frac{P_2V_2}{T_2}",
                    targetLatex: "P_2",
                    slots: [{ id: "f", labelLatex: "\\\\text{Symbol}", placeholder: "P2", expected: "P2" }], // Logic placeholder
                    correctLatex: "P_2 = P_1 \\\\frac{V_1 T_2}{V_2 T_1}",
                    hintLatex: ["Isolate P2"]
                }
            );
        } else { // ELITE
            quests.push(
                {
                    id: "IG-E1", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.iwb_steam", { T: 450, V: 50, n: 2000 }),
                    expressionLatex: "P = \\\\frac{nRT}{V}",
                    targetLatex: "P",
                    slots: [{ id: "p", labelLatex: "P \\\\text{ (Pa)}", placeholder: "149652", expected: 149652 }],
                    correctLatex: "P \\approx 150 \\\\text{ kPa}",
                    hintLatex: ["R = 8.314 J/mol·K"]
                },
                {
                    id: "IG-E2", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.roche_tower", { V: 500, T: 300, P: 100000 }),
                    expressionLatex: "n = \\\\frac{PV}{RT}",
                    targetLatex: "n",
                    slots: [{ id: "n", labelLatex: "n \\\\text{ (mol)}", placeholder: "20046", expected: 20046 }],
                    correctLatex: "n \\approx 20050 \\\\text{ mol}",
                    hintLatex: ["P in Pa, V in m³"]
                },
                {
                    id: "IG-E3", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.rhine_bubble", { p1: 200, v1: 20, p2: 100 }),
                    expressionLatex: "P_1 V_1 = P_2 V_2",
                    targetLatex: "V_2",
                    slots: [{ id: "v", labelLatex: "V_2 \\\\text{ (mL)}", placeholder: "40", expected: 40 }],
                    correctLatex: "40 \\\\text{ mL}",
                    hintLatex: ["Pressure halves, Volume doubles"]
                },
                {
                    id: "IG-E4", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.weather_balloon", { v1: 10, t1: 300, t2: 240 }),
                    expressionLatex: "\\\\frac{V_1}{T_1} = \\\\frac{V_2}{T_2}",
                    targetLatex: "V_2",
                    slots: [{ id: "v", labelLatex: "V_2 \\\\text{ (m}^3)", placeholder: "8", expected: 8 }],
                    correctLatex: "8 \\\\text{ m}^3",
                    hintLatex: ["Cooling shrinks volume"]
                },
                {
                    id: "IG-E5", difficulty, stage, gasType: "ideal",
                    promptLatex: t("gp2_01.prompts.novartis_reactor", { V: 10, P: 200000, T: 300 }),
                    expressionLatex: "m = n \\times M = \\frac{PV}{RT} \\times M",
                    targetLatex: "m",
                    slots: [{ id: "m", labelLatex: "m \\\\text{ (kg)}", placeholder: "22.45", expected: 22.45 }],
                    correctLatex: "m \\approx 22.5 \\\\text{ kg}",
                    hintLatex: ["Calc n first, then × 0.028"]
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
                    slots: [{ id: "p", labelLatex: "P_2", placeholder: "200", expected: 200 }],
                    correctLatex: "P_2 = 200 \\\\text{ kPa}",
                    hintLatex: ["Volume halves, pressure doubles"]
                },
                {
                    id: "B-B2", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_v2", { p1: 200, v1: 1, p2: 100 }),
                    expressionLatex: "V_2 = P_1 V_1 / P_2",
                    targetLatex: "V_2",
                    slots: [{ id: "v", labelLatex: "V_2", placeholder: "2", expected: 2 }],
                    correctLatex: "V_2 = 2 \\\\text{ L}",
                    hintLatex: ["Pressure halves, volume doubles"]
                },
                {
                    id: "B-B3", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_p2", { p1: 50, v1: 4, v2: 2 }),
                    expressionLatex: "50 \\times 4 = P_2 \\times 2",
                    targetLatex: "P_2",
                    slots: [{ id: "p", labelLatex: "P_2", placeholder: "100", expected: 100 }],
                    correctLatex: "P_2 = 100 \\\\text{ kPa}",
                    hintLatex: ["Calculate constant first"]
                },
                {
                    id: "B-B4", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_v2", { p1: 100, v1: 5, p2: 500 }),
                    expressionLatex: "100 \\times 5 = 500 \\times V_2",
                    targetLatex: "V_2",
                    slots: [{ id: "v", labelLatex: "V_2", placeholder: "1", expected: 1 }],
                    correctLatex: "V_2 = 1 \\\\text{ L}",
                    hintLatex: ["Pressure x5, Vol /5"]
                },
                {
                    id: "B-B5", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_condition"),
                    expressionLatex: "PV = k",
                    targetLatex: "\\\\text{Constant}",
                    slots: [{ id: "c", labelLatex: "T", placeholder: "temperature", expected: "temperature" }],
                    correctLatex: "Temperature",
                    hintLatex: ["Isothermal"]
                }
            );
        } else if (difficulty === "CORE") {
            quests.push(
                {
                    id: "B-C1", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_p2", { p1: 150, v1: 3, v2: 1.5 }),
                    expressionLatex: "150 \\times 3 = P_2 \\times 1.5",
                    targetLatex: "P_2",
                    slots: [{ id: "p", labelLatex: "P_2", placeholder: "300", expected: 300 }],
                    correctLatex: "P_2 = 300 \\\\text{ kPa}",
                    hintLatex: ["Inverse proportion"]
                },
                {
                    id: "B-C2", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_v2", { p1: 120, v1: 2, p2: 80 }),
                    expressionLatex: "120 \\times 2 = 80 \\times V_2",
                    targetLatex: "V_2",
                    slots: [{ id: "v", labelLatex: "V_2", placeholder: "3", expected: 3 }],
                    correctLatex: "V_2 = 3 \\\\text{ L}",
                    hintLatex: ["240 / 80"]
                },
                {
                    id: "B-C3", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_relation", { v1: 10, v2: 2 }),
                    expressionLatex: "P_2/P_1 = V_1/V_2",
                    targetLatex: "\\\\text{Factor}",
                    slots: [{ id: "f", labelLatex: "\\times", placeholder: "5", expected: 5 }],
                    correctLatex: "5\\times",
                    hintLatex: ["10/2"]
                },
                {
                    id: "B-C4", difficulty, stage, lawType: "boyle",
                    promptLatex: t("gp2_01.prompts.boyle_find_p2", { p1: 101.3, v1: 10, v2: 5 }),
                    expressionLatex: "101.3 \\times 10 = P_2 \\times 5",
                    targetLatex: "P_2",
                    slots: [{ id: "p", labelLatex: "P_2", placeholder: "202.6", expected: 202.6 }],
                    correctLatex: "202.6 \\\\text{ kPa}",
                    hintLatex: ["Double"]
                },
                {
                    id: "B-C5", difficulty, stage, lawType: "boyle",
                    promptLatex: "PV constant k = 2400 (kPa L). If P = 600, V?",
                    expressionLatex: "600 \\times V = 2400",
                    targetLatex: "V",
                    slots: [{ id: "v", labelLatex: "V", placeholder: "4", expected: 4 }],
                    correctLatex: "4 \\\\text{ L}",
                    hintLatex: ["2400/600"]
                }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                { id: "B-A1", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_find_p2", { p1: 300, v1: 0.5, v2: 0.1 }), expressionLatex: "300 \\times 0.5 = P_2 \\times 0.1", targetLatex: "P_2", slots: [{ id: "p", labelLatex: "P", placeholder: "1500", expected: 1500 }], correctLatex: "1500 kPa", hintLatex: ["x5"] },
                { id: "B-A2", difficulty, stage, lawType: "boyle", promptLatex: "Pressure increases by 25%. New Volume factor?", expressionLatex: "P_2 = 1.25 P_1 \\implies V_2 = V_1 / 1.25", targetLatex: "\\\\text{Factor}", slots: [{ id: "f", labelLatex: "F", placeholder: "0.8", expected: 0.8 }], correctLatex: "0.8", hintLatex: ["1/1.25"] },
                { id: "B-A3", difficulty, stage, lawType: "boyle", promptLatex: "P V = 5000 J (energy density). If V=0.01 m^3, P?", expressionLatex: "P = 5000/0.01", targetLatex: "P", slots: [{ id: "p", labelLatex: "P", placeholder: "500000", expected: 500000 }], correctLatex: "500 kPa", hintLatex: ["J/m^3 = Pa"] },
                { id: "B-A4", difficulty, stage, lawType: "boyle", promptLatex: t("gp2_01.prompts.boyle_find_v2", { p1: 400, v1: 2.5, p2: 1000 }), expressionLatex: "400(2.5)=1000 V_2", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: "1", expected: 1 }], correctLatex: "1 L", hintLatex: ["1000/1000"] },
                { id: "B-A5", difficulty, stage, lawType: "boyle", promptLatex: "Graph P vs V is a hyperbola. P(V) = k/V. If k=100, P at V=5?", expressionLatex: "P=100/5", targetLatex: "P", slots: [{ id: "p", labelLatex: "P", placeholder: "20", expected: 20 }], correctLatex: "20", hintLatex: ["Inverse"] }
            );
        } else {
            // ELITE
            quests.push(
                { id: "B-E1", difficulty, stage, lawType: "boyle", promptLatex: "Isothermal Work W = nRT ln(V2/V1). P1V1=1000 J. Expand V to 2V. W?", expressionLatex: "W = 1000 \\ln(2)", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: "693", expected: 693 }], correctLatex: "\\approx 693 \\\\text{ J}", hintLatex: ["ln(2)=0.693"] },
                { id: "B-E2", difficulty, stage, lawType: "boyle", promptLatex: "Compress V to V/3. Work done on gas?", expressionLatex: "W = -P_1 V_1 \\ln(1/3)", targetLatex: "\\\\text{Sign}", slots: [{ id: "s", labelLatex: "+/-", placeholder: "+", expected: "+" }], correctLatex: "Positive work on gas", hintLatex: ["Compression"] },
                { id: "B-E3", difficulty, stage, lawType: "boyle", promptLatex: "Real gas does NOT follow Boyle's exactly at...", expressionLatex: "\\\\text{High P, Low T}", targetLatex: "\\\\text{Conditions}", slots: [{ id: "c", labelLatex: "P is", placeholder: "high", expected: "high" }], correctLatex: "High Pressure", hintLatex: ["Intermolecular forces dominate"] },
                { id: "B-E4", difficulty, stage, lawType: "boyle", promptLatex: "P1=1 atm, V1=10 L. Compress to P2=10 atm. V2 if Ideal?", expressionLatex: "1(10) = 10(V_2)", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: "1", expected: 1 }], correctLatex: "1 L", hintLatex: ["Ratio 10"] },
                { id: "B-E5", difficulty, stage, lawType: "boyle", promptLatex: "Two bulbs connected. P1=2, V1=1; P2=0, V2=1 (Values). Open valve. Final P?", expressionLatex: "P_f (V_1+V_2) = P_1 V_1", targetLatex: "P_f", slots: [{ id: "p", labelLatex: "P", placeholder: "1", expected: 1 }], correctLatex: "1", hintLatex: ["Total Volume = 2"] }
            );
        }
    }

    if (stage === "CHARLES_LAW") {
        if (difficulty === "BASIC") {
            quests.push(
                { id: "C-B1", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_v2", { v1: 2, t1: 300, t2: 600 }), expressionLatex: "V_2/600 = 2/300", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: "4", expected: 4 }], correctLatex: "4 L", hintLatex: ["T doubles, V doubles"] },
                { id: "C-B2", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_t2", { v1: 1, t1: 200, v2: 2 }), expressionLatex: "2/T_2 = 1/200", targetLatex: "T_2", slots: [{ id: "t", labelLatex: "T", placeholder: "400", expected: 400 }], correctLatex: "400 K", hintLatex: ["V doubles, T doubles"] },
                { id: "C-B3", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_v2", { v1: 10, t1: 400, t2: 200 }), expressionLatex: "V_2/200 = 10/400", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: "5", expected: 5 }], correctLatex: "5 L", hintLatex: ["T halves"] },
                { id: "C-B4", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_find_t2", { v1: 5, t1: 250, v2: 10 }), expressionLatex: "10/T_2 = 5/250", targetLatex: "T_2", slots: [{ id: "t", labelLatex: "T", placeholder: "500", expected: 500 }], correctLatex: "500 K", hintLatex: ["Proportional"] },
                { id: "C-B5", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_condition"), expressionLatex: "V/T = k", targetLatex: "\\\\text{Constant}", slots: [{ id: "c", labelLatex: "P", placeholder: "pressure", expected: "pressure" }], correctLatex: "Pressure", hintLatex: ["Isobaric"] }
            );
        } else if (difficulty === "CORE") {
            quests.push(
                { id: "C-C1", difficulty, stage, lawType: "charles", promptLatex: "V1=3 L, T1=27 °C (300 K). T2=127 °C (400 K). Find V2.", expressionLatex: "V_2 = 3 \\times 400/300", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: "4", expected: 4 }], correctLatex: "4 L", hintLatex: ["Use Kelvin Only"] },
                { id: "C-C2", difficulty, stage, lawType: "charles", promptLatex: "V1=2 L, T1=200 K. V2=3 L. Find T2.", expressionLatex: "T_2 = 3 \\times 200/2", targetLatex: "T_2", slots: [{ id: "t", labelLatex: "T", placeholder: "300", expected: 300 }], correctLatex: "300 K", hintLatex: ["Ratio 1.5"] },
                { id: "C-C3", difficulty, stage, lawType: "charles", promptLatex: t("gp2_01.prompts.charles_relation"), expressionLatex: "V \\propto T", targetLatex: "\\\\text{Factor}", slots: [{ id: "f", labelLatex: "\\times", placeholder: "2", expected: 2 }], correctLatex: "2", hintLatex: ["Linear"] },
                { id: "C-C4", difficulty, stage, lawType: "charles", promptLatex: "Cool gas from 400 K to 100 K. Volume factor?", expressionLatex: "100/400", targetLatex: "\\\\text{Factor}", slots: [{ id: "f", labelLatex: "F", placeholder: "0.25", expected: 0.25 }], correctLatex: "0.25", hintLatex: ["1/4"] },
                { id: "C-C5", difficulty, stage, lawType: "charles", promptLatex: "Absolute Zero in Celsius?", expressionLatex: "0 \\\\text{ K}", targetLatex: "^\circ\\\\text{C}", slots: [{ id: "c", labelLatex: "C", placeholder: "-273.15", expected: -273.15 }], correctLatex: "-273.15", hintLatex: ["Offset"] }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                { id: "C-A1", difficulty, stage, lawType: "charles", promptLatex: "V1=5 L at 20 °C. At 80 °C (353 K), V2?", expressionLatex: "V_2 = 5 \\times 353 / 293", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: "6.02", expected: 6.02 }], correctLatex: "\\approx 6.02 \\\\text{ L}", hintLatex: ["Kelvin conv"] },
                { id: "C-A2", difficulty, stage, lawType: "charles", promptLatex: "Heating gas increases kinetic energy. Mean KE is prop to?", expressionLatex: "KE \\propto T", targetLatex: "\\\\text{Quantity}", slots: [{ id: "q", labelLatex: "Q", placeholder: "temperature", expected: "temperature" }], correctLatex: "Temperature", hintLatex: ["T is measure of KE"] },
                { id: "C-A3", difficulty, stage, lawType: "charles", promptLatex: "V1=10, T1=500. V2=5. T2?", expressionLatex: "T_2 = 5/10 \\times 500", targetLatex: "T_2", slots: [{ id: "t", labelLatex: "T", placeholder: "250", expected: 250 }], correctLatex: "250 K", hintLatex: ["Halved"] },
                { id: "C-A4", difficulty, stage, lawType: "combined", promptLatex: "Combined Law at constant P reduces to?", expressionLatex: "V/T = k", targetLatex: "\\\\text{Law}", slots: [{ id: "l", labelLatex: "Law", placeholder: "charles", expected: "charles" }], correctLatex: "Charles's Law", hintLatex: ["Name"] },
                { id: "C-A5", difficulty, stage, lawType: "charles", promptLatex: "Isobaric expansion work W = P(V2-V1). If P=100 Pa, V changes 1 to 2. W?", expressionLatex: "100(2-1)", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: "100", expected: 100 }], correctLatex: "100 J", hintLatex: ["Direct mult"] }
            );
        } else { // ELITE
            quests.push(
                { id: "C-E1", difficulty, stage, lawType: "combined", promptLatex: "Ideal Gas: density \\rho \\propto 1/T (at const P). T multiplies by 2. \\rho factor?", expressionLatex: "1/2", targetLatex: "\\\\text{Factor}", slots: [{ id: "f", labelLatex: "F", placeholder: "0.5", expected: 0.5 }], correctLatex: "0.5", hintLatex: ["Inverse"] },
                { id: "C-E2", difficulty, stage, lawType: "charles", promptLatex: "V-T Graph slope = nR/P. If n=1, P=8.314. Slope?", expressionLatex: "Slope = R/P = 1", targetLatex: "S", slots: [{ id: "s", labelLatex: "S", placeholder: "1", expected: 1 }], correctLatex: "1", hintLatex: ["R = 8.314"] },
                { id: "C-E3", difficulty, stage, lawType: "charles", promptLatex: "T1=300, V1=1. Piston moves out, doing Work W=300J at P=100Pa. V2?", expressionLatex: "300 = 100(V_2 - 1)", targetLatex: "V_2", slots: [{ id: "v", labelLatex: "V", placeholder: "4", expected: 4 }], correctLatex: "4 L", hintLatex: ["W = P \\Delta V"] },
                { id: "C-E4", difficulty, stage, lawType: "charles", promptLatex: "Find T2 in prev problem (Quest C-E3). T1/V1 = T2/V2.", expressionLatex: "300/1 = T_2/4", targetLatex: "T_2", slots: [{ id: "t", labelLatex: "T", placeholder: "1200", expected: 1200 }], correctLatex: "1200 K", hintLatex: ["Prop"] },
                { id: "C-E5", difficulty, stage, lawType: "combined", promptLatex: "Efficiency = 1 - T_c/T_h (Carnot). If V doubles adiabatically... (Ignore for Charles). Just: T proportional E_kin.", expressionLatex: "v_{rms} \\propto \\\\\sqrt{T}", targetLatex: "\\\\text{Power}", slots: [{ id: "p", labelLatex: "P", placeholder: "0.5", expected: 0.5 }], correctLatex: "Sq root", hintLatex: ["Power 1/2"] }
            );
        }
    }

    return quests;
}

export default function GP201Page() {
    const { t: getT, currentLanguage } = useLanguage();
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
    } = useQuestManager<GP201Quest, Stage>({
        buildPool,
        initialStage: "IDEAL_GAS",
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

    // Safety check for t loading
    if (!t || !t.stages) return null;

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="GP2.01"
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                stages={stagesProps}
                currentStage={stage}
                onStageChange={(s) => handleStageChange(s as Stage)}
                footerLeft={t.footer_left}
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
            title={t.title}
            moduleCode="GP2.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t.footer_left}
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
                        <InlineMath math={currentQuest.promptLatex} />
                    </div>

                    <div className="text-cyan-300">
                        <InlineMath math={currentQuest.expressionLatex} />
                    </div>

                    <div className="space-y-3">
                        {currentQuest.slots.map((slot) => (
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
