"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguage, TranslationKeys } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ThermodynamicsVisualization from "@/components/chamber/gp2-02/ThermodynamicsVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";

type Stage = "FIRST_LAW" | "INTERNAL_ENERGY" | "WORK_HEAT";

interface GP202Quest extends Quest {
    stage: Stage;
    processType?: string;
}

function buildStagePool(
    getT: any,
    tObj: TranslationKeys['gp2_02'],
    difficulty: Difficulty,
    stage: Stage
): GP202Quest[] {
    const quests: GP202Quest[] = [];
    const t = getT;

    if (stage === "FIRST_LAW") {
        if (difficulty === "BASIC") {
            quests.push(
                { id: "FL-B1", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.fl_calc_du", { q: 100, w: 30 }), expressionLatex: "\\Delta U = 100 - 30", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.v_70"), expected: 70 }], correctLatex: "70 J", hintLatex: ["Q-W"] },
                { id: "FL-B2", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.fl_calc_q", { du: 50, w: 20 }), expressionLatex: "50 = Q - 20", targetLatex: "Q", slots: [{ id: "q", labelLatex: "Q", placeholder: t("gp2_02.placeholders.v_70"), expected: 70 }], correctLatex: "70 J", hintLatex: ["Q=dU+W"] },
                { id: "FL-B3", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.fl_calc_w", { q: 200, du: 150 }), expressionLatex: "150 = 200 - W", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.v_50"), expected: 50 }], correctLatex: "50 J", hintLatex: ["W=Q-dU"] },
                { id: "FL-B4", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.fl_sign_conv"), expressionLatex: "Q < 0", targetLatex: t("gp2_02.labels.sign"), slots: [{ id: "s", labelLatex: "+/-", placeholder: t("gp2_02.placeholders.minus"), expected: "-" }], correctLatex: "Negative", hintLatex: ["Loss"] },
                { id: "FL-B5", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_b5"), expressionLatex: "\\Delta U = 50 - (-20)", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.v_70"), expected: 70 }], correctLatex: "70 J", hintLatex: ["Add both"] }
            );
        } else if (difficulty === "CORE") {
            quests.push(
                { id: "FL-C1", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.fl_adiabatic", { w: -40 }), expressionLatex: "\\Delta U = 0 - (-40)", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.v_40"), expected: 40 }], correctLatex: "40 J", hintLatex: ["Compression warms"] },
                { id: "FL-C2", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.fl_cycle", { w: 50 }), expressionLatex: "\\Delta U_{cycle} = 0 \\implies Q = W", targetLatex: "Q", slots: [{ id: "q", labelLatex: "Q", placeholder: t("gp2_02.placeholders.v_50"), expected: 50 }], correctLatex: "50 J", hintLatex: ["Q_net = W_net"] },
                { id: "FL-C3", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_c3"), expressionLatex: "\\Delta U = -100 - 0", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.minus_100"), expected: -100 }], correctLatex: "-100 J", hintLatex: ["Direct change"] },
                { id: "FL-C4", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_c4"), expressionLatex: "W = 100(2)=200, \\Delta U = 500-200", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.v_300"), expected: 300 }], correctLatex: "300 J", hintLatex: ["Calc W first"] },
                { id: "FL-C5", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_c5"), expressionLatex: "-50 - (-100)", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.v_50"), expected: 50 }], correctLatex: "50 J", hintLatex: ["Net gain"] }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                { id: "FL-A1", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_a1"), expressionLatex: "50-10 + (Q_B - W_B) = 0", targetLatex: "\\Delta U_{net}", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.v_0"), expected: 0 }], correctLatex: "0", hintLatex: ["State func"] },
                { id: "FL-A2", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_a2"), expressionLatex: "\\Delta U = 125, W=0 \\implies Q=125", targetLatex: "Q", slots: [{ id: "q", labelLatex: "Q", placeholder: t("gp2_02.placeholders.v_125"), expected: 125 }], correctLatex: "125 J", hintLatex: ["Isochoric"] },
                { id: "FL-A3", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_a3"), expressionLatex: "Q=0, \\Delta U = -W", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.minus_200"), expected: -200 }], correctLatex: "-200 J", hintLatex: ["Cooling"] },
                { id: "FL-A4", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_a4"), expressionLatex: "0-0", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.v_0"), expected: 0 }], correctLatex: "0 J", hintLatex: ["T constant"] },
                { id: "FL-A5", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_a5"), expressionLatex: "\\Delta U = Q - P\\Delta V", targetLatex: t("gp2_02.labels.yes_no"), slots: [{ id: "a", labelLatex: t("gp2_02.labels.label_yn"), placeholder: t("gp2_02.placeholders.yes"), expected: "yes" }], correctLatex: "Yes", hintLatex: ["Work done expanding"] }
            );
        } else { // ELITE
            quests.push(
                { id: "FL-E1", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_e1"), expressionLatex: "dH = d(U+PV) = dQ", targetLatex: "dH", slots: [{ id: "h", labelLatex: "Q", placeholder: t("gp2_02.placeholders.q"), expected: "q" }], correctLatex: "Q_p", hintLatex: ["Heat at const P"] },
                { id: "FL-E2", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_e2"), expressionLatex: "1.5R + R", targetLatex: "C_p", slots: [{ id: "c", labelLatex: "\\times R", placeholder: t("gp2_02.placeholders.v_2_dot_5"), expected: 2.5 }], correctLatex: "2.5 R", hintLatex: ["Mayer's Relation"] },
                { id: "FL-E3", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_e3"), expressionLatex: "2^{0.67} \\approx 1.59", targetLatex: t("gp2_02.labels.factor"), slots: [{ id: "f", labelLatex: "F", placeholder: t("gp2_02.placeholders.v_1_dot_59"), expected: 1.59 }], correctLatex: "1.59", hintLatex: ["Power law"] },
                { id: "FL-E4", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_e4"), expressionLatex: "\\frac{P_2V_2 - P_1V_1}{1-n}", targetLatex: t("gp2_02.labels.formula"), slots: [{ id: "n", labelLatex: "n", placeholder: t("gp2_02.placeholders.n"), expected: "n" }], correctLatex: "Polytropic index", hintLatex: ["Calculus"] },
                { id: "FL-E5", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_fl_e5"), expressionLatex: "0/T", targetLatex: "dS", slots: [{ id: "s", labelLatex: "dS", placeholder: t("gp2_02.placeholders.v_0"), expected: 0 }], correctLatex: "0", hintLatex: ["Isentropic"] }
            );
        }
    }

    if (stage === "INTERNAL_ENERGY") {
        if (difficulty === "BASIC") {
            quests.push(
                { id: "IE-B1", difficulty, stage, processType: "monatomic", promptLatex: t("gp2_02.prompts.ie_ideal_u", { n: 2, t: 300 }), expressionLatex: "1.5(2)(8.314)(300)", targetLatex: "U", slots: [{ id: "u", labelLatex: "U", placeholder: t("gp2_02.placeholders.v_7483"), expected: 7483 }], correctLatex: "7483 J", hintLatex: ["1.5 nRT"] },
                { id: "IE-B2", difficulty, stage, processType: "monatomic", promptLatex: t("gp2_02.prompts.ie_ideal_u", { n: 1, t: 100 }), expressionLatex: "1.5(1)(8.314)(100)", targetLatex: "U", slots: [{ id: "u", labelLatex: "U", placeholder: t("gp2_02.placeholders.v_1247"), expected: 1247 }], correctLatex: "1247 J", hintLatex: ["Direct"] },
                { id: "IE-B3", difficulty, stage, processType: "monatomic", promptLatex: t("gp2_02.prompts.q_ie_b3"), expressionLatex: "U \\propto T", targetLatex: t("gp2_02.labels.factor"), slots: [{ id: "f", labelLatex: "F", placeholder: t("gp2_02.placeholders.v_2"), expected: 2 }], correctLatex: "2", hintLatex: ["Linear"] },
                { id: "IE-B4", difficulty, stage, processType: "monatomic", promptLatex: t("gp2_02.prompts.ie_delta_u"), expressionLatex: "\\Delta T = 0 \\implies", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.v_0"), expected: 0 }], correctLatex: "0", hintLatex: ["Isothermal"] },
                { id: "IE-B5", difficulty, stage, processType: "monatomic", promptLatex: t("gp2_02.prompts.q_ie_b5"), expressionLatex: "U \\downarrow", targetLatex: t("gp2_02.labels.sign"), slots: [{ id: "s", labelLatex: "+/-", placeholder: t("gp2_02.placeholders.minus"), expected: "-" }], correctLatex: "Decreases", hintLatex: ["Kinetic energy drops"] }
            );
        } else if (difficulty === "CORE") {
            quests.push(
                { id: "IE-C1", difficulty, stage, processType: "diatomic", promptLatex: t("gp2_02.prompts.ie_diatomic", { n: 1, t: 400 }), expressionLatex: "2.5(1)(8.314)(400)", targetLatex: "U", slots: [{ id: "u", labelLatex: "U", placeholder: t("gp2_02.placeholders.v_8314"), expected: 8314 }], correctLatex: "8314 J", hintLatex: ["5/2 nRT"] },
                { id: "IE-C2", difficulty, stage, processType: "diatomic", promptLatex: t("gp2_02.prompts.ie_diatomic", { n: 2, t: 300 }), expressionLatex: "2.5(2)(8.314)(300)", targetLatex: "U", slots: [{ id: "u", labelLatex: "U", placeholder: t("gp2_02.placeholders.v_12471"), expected: 12471 }], correctLatex: "12471 J", hintLatex: ["Multiply"] },
                { id: "IE-C3", difficulty, stage, processType: "change", promptLatex: t("gp2_02.prompts.q_ie_c3"), expressionLatex: "\\oint dU = 0", targetLatex: t("gp2_02.labels.type"), slots: [{ id: "t", labelLatex: t("gp2_02.labels.label_type"), placeholder: t("gp2_02.placeholders.state"), expected: "state" }], correctLatex: "State Function", hintLatex: ["Path independent"] },
                { id: "IE-C4", difficulty, stage, processType: "change", promptLatex: t("gp2_02.prompts.ie_change_t", { n: 1, cv: 12.5, t1: 300, t2: 400 }), expressionLatex: "1(12.5)(100)", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.v_1250"), expected: 1250 }], correctLatex: "1250 J", hintLatex: ["n Cv dT"] },
                { id: "IE-C5", difficulty, stage, processType: "change", promptLatex: t("gp2_02.prompts.ie_change_t", { n: 2, cv: 20, t1: 500, t2: 450 }), expressionLatex: "2(20)(-50)", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.minus_2000"), expected: -2000 }], correctLatex: "-2000 J", hintLatex: ["Cooling"] }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                { id: "IE-A1", difficulty, stage, processType: "advanced", promptLatex: t("gp2_02.prompts.q_ie_a1"), expressionLatex: "\\text{Interaction}", targetLatex: t("gp2_02.labels.reason"), slots: [{ id: "r", labelLatex: "R", placeholder: t("gp2_02.placeholders.forces"), expected: "forces" }], correctLatex: "Intermolecular forces", hintLatex: ["Potential energy"] },
                { id: "IE-A2", difficulty, stage, processType: "advanced", promptLatex: t("gp2_02.prompts.q_ie_a2"), expressionLatex: "0.5 kT", targetLatex: "E", slots: [{ id: "e", labelLatex: "\\times kT", placeholder: t("gp2_02.placeholders.v_0_dot_5"), expected: 0.5 }], correctLatex: "1/2 kT", hintLatex: ["Half"] },
                { id: "IE-A3", difficulty, stage, processType: "advanced", promptLatex: t("gp2_02.prompts.q_ie_a3"), expressionLatex: "5/2 R \\to 3/2 R", targetLatex: t("gp2_02.labels.cv_r"), slots: [{ id: "c", labelLatex: "F", placeholder: t("gp2_02.placeholders.v_1_dot_5"), expected: 1.5 }], correctLatex: "1.5", hintLatex: ["Behaves like monatomic"] },
                { id: "IE-A4", difficulty, stage, processType: "advanced", promptLatex: t("gp2_02.prompts.q_ie_a4"), expressionLatex: "H=U+PV=U+nRT \\propto T", targetLatex: "Y/N", slots: [{ id: "a", labelLatex: t("gp2_02.labels.label_yn"), placeholder: t("gp2_02.placeholders.yes"), expected: "yes" }], correctLatex: "Yes", hintLatex: ["Also pure T func"] },
                { id: "IE-A5", difficulty, stage, processType: "advanced", promptLatex: t("gp2_02.prompts.q_ie_a5"), expressionLatex: "\\Delta U = 0", targetLatex: "\\Delta U", slots: [{ id: "u", labelLatex: "\\Delta U", placeholder: t("gp2_02.placeholders.v_0"), expected: 0 }], correctLatex: "0", hintLatex: ["No reaction/interaction"] }
            );
        } else { // ELITE
            quests.push(
                { id: "IE-E1", difficulty, stage, processType: "elite", promptLatex: t("gp2_02.prompts.q_ie_e1"), expressionLatex: "dT = 0", targetLatex: "dT", slots: [{ id: "t", labelLatex: "dT", placeholder: t("gp2_02.placeholders.v_0"), expected: 0 }], correctLatex: "0", hintLatex: ["Isoenergetic"] },
                { id: "IE-E2", difficulty, stage, processType: "elite", promptLatex: t("gp2_02.prompts.q_ie_e2"), expressionLatex: "dT < 0", targetLatex: t("gp2_02.labels.sign"), slots: [{ id: "s", labelLatex: "+/-", placeholder: t("gp2_02.placeholders.minus"), expected: "-" }], correctLatex: "Negative (Cooling)", hintLatex: ["Work against forces"] },
                { id: "IE-E3", difficulty, stage, processType: "elite", promptLatex: t("gp2_02.prompts.q_ie_e3"), expressionLatex: "3+2+4=9", targetLatex: "f", slots: [{ id: "f", labelLatex: "f", placeholder: t("gp2_02.placeholders.v_9"), expected: 9 }], correctLatex: "9 (approx)", hintLatex: ["3N-5 vib modes"] },
                { id: "IE-E4", difficulty, stage, processType: "elite", promptLatex: t("gp2_02.prompts.q_ie_e4"), expressionLatex: "P = 1/3 a T^{4}", targetLatex: t("gp2_02.labels.factor"), slots: [{ id: "f", labelLatex: "1/x", placeholder: t("gp2_02.placeholders.v_3"), expected: 3 }], correctLatex: "1/3", hintLatex: ["Radiation pressure"] },
                { id: "IE-E5", difficulty, stage, processType: "elite", promptLatex: t("gp2_02.prompts.q_ie_e5"), expressionLatex: "\\gamma = 1 + 2/f", targetLatex: "\\gamma", slots: [{ id: "g", labelLatex: "\\gamma (f=3)", placeholder: t("gp2_02.placeholders.v_1_dot_67"), expected: 1.67 }], correctLatex: "5/3", hintLatex: ["Monatomic"] }
            );
        }
    }

    if (stage === "WORK_HEAT") {
        if (difficulty === "BASIC") {
            quests.push(
                { id: "WH-B1", difficulty, stage, processType: "isobaric", promptLatex: t("gp2_02.prompts.wh_isobaric", { p: 100, dv: 2 }), expressionLatex: "100(2)", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.v_200"), expected: 200 }], correctLatex: "200 J", hintLatex: ["P dV"] },
                { id: "WH-B2", difficulty, stage, processType: "isochoric", promptLatex: t("gp2_02.prompts.wh_isochoric"), expressionLatex: "\\Delta V = 0", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.v_0"), expected: 0 }], correctLatex: "0 J", hintLatex: ["No displacement"] },
                { id: "WH-B3", difficulty, stage, processType: "isothermal", promptLatex: t("gp2_02.prompts.wh_isothermal_w", { q: 500 }), expressionLatex: "W = Q", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.v_500"), expected: 500 }], correctLatex: "500 J", hintLatex: ["dU=0"] },
                { id: "WH-B4", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_wh_b4"), expressionLatex: "W < 0", targetLatex: t("gp2_02.labels.sign"), slots: [{ id: "s", labelLatex: "+/-", placeholder: t("gp2_02.placeholders.minus"), expected: "-" }], correctLatex: "Negative", hintLatex: ["Opposite to expansion"] },
                { id: "WH-B5", difficulty, stage, processType: "basic", promptLatex: t("gp2_02.prompts.q_wh_b5"), expressionLatex: "P-V", targetLatex: "Y-Axis", slots: [{ id: "y", labelLatex: "Y", placeholder: t("gp2_02.placeholders.p"), expected: "P" }], correctLatex: "Pressure", hintLatex: ["PV diagram"] }
            );
        } else if (difficulty === "CORE") {
            quests.push(
                { id: "WH-C1", difficulty, stage, processType: "area", promptLatex: t("gp2_02.prompts.wh_area"), expressionLatex: "\\text{Work}", targetLatex: "W", slots: [{ id: "w", labelLatex: t("gp2_02.labels.label_symbol"), placeholder: t("gp2_02.placeholders.w"), expected: "W" }], correctLatex: "W", hintLatex: ["Energy"] },
                { id: "WH-C2", difficulty, stage, processType: "isobaric", promptLatex: t("gp2_02.prompts.q_wh_c2"), expressionLatex: "200(3-1)", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.v_400"), expected: 400 }], correctLatex: "400 J", hintLatex: ["P dV"] },
                { id: "WH-C3", difficulty, stage, processType: "isobaric", promptLatex: t("gp2_02.prompts.q_wh_c3"), expressionLatex: "100(2-5) = -300", targetLatex: "W_{by}", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.minus_300"), expected: -300 }], correctLatex: "-300 J", hintLatex: ["Negative Volume change"] },
                { id: "WH-C4", difficulty, stage, processType: "cycle", promptLatex: t("gp2_02.prompts.q_wh_c4"), expressionLatex: "W > 0", targetLatex: t("gp2_02.labels.sign"), slots: [{ id: "s", labelLatex: "+/-", placeholder: t("gp2_02.placeholders.plus"), expected: "+" }], correctLatex: "Positive", hintLatex: ["Net expansion"] },
                { id: "WH-C5", difficulty, stage, processType: "unit", promptLatex: t("gp2_02.prompts.q_wh_c5"), expressionLatex: "N/m^{2} \\times m^{3} = Nm = J", targetLatex: t("gp2_02.labels.unit"), slots: [{ id: "u", labelLatex: "U", placeholder: t("gp2_02.placeholders.joule"), expected: "Joule" }], correctLatex: "Joule", hintLatex: ["Energy"] }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                { id: "WH-A1", difficulty, stage, processType: "isothermal", promptLatex: t("gp2_02.prompts.q_wh_a1"), expressionLatex: "RT \\ln(e) = RT", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.v_2494"), expected: 2494 }], correctLatex: "2494 J", hintLatex: ["8.314 x 300"] },
                { id: "WH-A2", difficulty, stage, processType: "adiabatic", promptLatex: t("gp2_02.prompts.q_wh_a2"), expressionLatex: "W = -\\Delta U", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.v_500"), expected: 500 }], correctLatex: "500 J", hintLatex: ["Expense of internal energy"] },
                { id: "WH-A3", difficulty, stage, processType: "graph", promptLatex: t("gp2_02.prompts.q_wh_a3"), expressionLatex: "100 - 40", targetLatex: "W_{net}", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.v_60"), expected: 60 }], correctLatex: "60 J", hintLatex: ["Sum"] },
                { id: "WH-A4", difficulty, stage, processType: "isobaric", promptLatex: t("gp2_02.prompts.q_wh_a4"), expressionLatex: "P dV = nR dT = 1(8.314)(10)", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.v_83_dot_1"), expected: 83.1 }], correctLatex: "83.1 J", hintLatex: ["nR dT utilization"] },
                { id: "WH-A5", difficulty, stage, processType: "path", promptLatex: t("gp2_02.prompts.q_wh_a5"), expressionLatex: "\\text{Depends on path}", targetLatex: t("gp2_02.labels.type"), slots: [{ id: "t", labelLatex: t("gp2_02.labels.label_ps"), placeholder: t("gp2_02.placeholders.path"), expected: "path" }], correctLatex: "Path", hintLatex: ["Trajectory matters"] }
            );
        } else { // ELITE
            quests.push(
                { id: "WH-E1", difficulty, stage, processType: "elite", promptLatex: t("gp2_02.prompts.q_wh_e1"), expressionLatex: "\\text{Undefined}", targetLatex: t("gp2_02.labels.limit"), slots: [{ id: "l", labelLatex: t("gp2_02.labels.label_type"), placeholder: t("gp2_02.placeholders.isothermal"), expected: "isothermal" }], correctLatex: "Isothermal (ln)", hintLatex: ["Logarithmic case"] },
                { id: "WH-E2", difficulty, stage, processType: "elite", promptLatex: t("gp2_02.prompts.q_wh_e2"), expressionLatex: "nRT \\ln((V_2-nb)/(V_1-nb))", targetLatex: t("gp2_02.labels.corr"), slots: [{ id: "c", labelLatex: "-", placeholder: t("gp2_02.placeholders.nb"), expected: "nb" }], correctLatex: "-nb", hintLatex: ["Excluded volume"] },
                { id: "WH-E3", difficulty, stage, processType: "elite", promptLatex: t("gp2_02.prompts.q_wh_e3"), expressionLatex: "\\text{Isochors}", targetLatex: t("gp2_02.labels.procs"), slots: [{ id: "p", labelLatex: "V", placeholder: t("gp2_02.placeholders.constant"), expected: "constant" }], correctLatex: "Constant Volume", hintLatex: ["Regeneration"] },
                { id: "WH-E4", difficulty, stage, processType: "elite", promptLatex: t("gp2_02.prompts.q_wh_e4"), expressionLatex: "50/0.67", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: t("gp2_02.placeholders.v_75"), expected: 75 }], correctLatex: "75 J", hintLatex: ["Approx"] },
                { id: "WH-E5", difficulty, stage, processType: "elite", promptLatex: t("gp2_02.prompts.q_wh_e5"), expressionLatex: "dS > 0", targetLatex: t("gp2_02.labels.sign"), slots: [{ id: "s", labelLatex: "+/-", placeholder: t("gp2_02.placeholders.plus"), expected: "+" }], correctLatex: "Positive", hintLatex: ["Second Law"] }
            );
        }
    }

    return quests;
}

export default function GP202Page() {
    const { t: getT } = useLanguage();
    const t = getT("gp2_02");
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
    } = useQuestManager<GP202Quest, Stage>({
    moduleCode: "gp2-02",
        buildPool,
        initialStage: "FIRST_LAW",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gp2-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "FIRST_LAW" as Stage, label: t.stages.first_law },
        { id: "INTERNAL_ENERGY" as Stage, label: t.stages.internal_energy },
        { id: "WORK_HEAT" as Stage, label: t.stages.work_heat },
    ], [t.stages]);

    const printSections = useMemo(() => buildQuestPrintSections<GP202Quest, Stage>({
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
                moduleCode="GP2.02"
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
                monitorContent={<ThermodynamicsVisualization quest={null} stage={stage} />}
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
            moduleCode="GP2.02"
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
            monitorContent={<ThermodynamicsVisualization quest={currentQuest} stage={stage} />}
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
