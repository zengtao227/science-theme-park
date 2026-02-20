"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import FerryCanvas from "@/components/chamber/sp3-07/FerryCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "COMPOSITION" | "DRIFT" | "NAVIGATION";

interface SP307Quest extends Quest {
    stage: Stage;
    vRiver: number;
    vFerry: number;
    theta: number; // degrees
}

export default function SP307Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP307Quest[] => {
        const quests: SP307Quest[] = [];

        // STAGE 1: COMPOSITION - Vector Addition
        if (stage === "COMPOSITION") {
            if (difficulty === "BASIC") {
                // BASIC: Simple parallel/antiparallel vectors
                quests.push(
                    {
                        id: "C-B1", difficulty, stage, vRiver: 1.0, vFerry: 2.0, theta: 0,
                        promptLatex: t("sp3_07.prompts.c_b1"),
                        expressionLatex: "v_{net} = v_f + v_r",
 targetLatex: "3.0",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 3.0 }],
                        correctLatex: "3.0", hintLatex: [t("sp3_07.hints.c_b1")]
                    },
                    {
                        id: "C-B2", difficulty, stage, vRiver: 1.5, vFerry: 1.5, theta: 180,
                        promptLatex: t("sp3_07.prompts.c_b2"),
                        expressionLatex: "v_{net} = v_f - v_r", targetLatex: "0.0",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 0.0 }],
                        correctLatex: "0.0", hintLatex: [t("sp3_07.hints.c_b2")]
                    },
                    {
                        id: "C-B3", difficulty, stage, vRiver: 0.5, vFerry: 3.0, theta: 0,
                        promptLatex: t("sp3_07.prompts.c_b3"),
                        expressionLatex: "v_{net} = v_f + v_r", targetLatex: "3.5",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 3.5 }],
                        correctLatex: "3.5", hintLatex: [t("sp3_07.hints.c_b3")]
                    },
                    {
                        id: "C-B4", difficulty, stage, vRiver: 2.0, vFerry: 3.0, theta: 180,
                        promptLatex: t("sp3_07.prompts.c_b4"),
                        expressionLatex: "v_{net} = v_f - v_r", targetLatex: "1.0",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 1.0 }],
                        correctLatex: "1.0", hintLatex: [t("sp3_07.hints.c_b4")]
                    },
                    {
                        id: "C-B5", difficulty, stage, vRiver: 1.0, vFerry: 4.0, theta: 0,
                        promptLatex: t("sp3_07.prompts.c_b5"),
                        expressionLatex: "v_{net} = v_f + v_r", targetLatex: "5.0",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 5.0 }],
                        correctLatex: "5.0", hintLatex: [t("sp3_07.hints.c_b5")]
                    }
                );
            }
            if (difficulty === "CORE") {
                // CORE: Perpendicular vectors, Pythagorean theorem
                quests.push(
                    {
                        id: "C-C1", difficulty, stage, vRiver: 3.0, vFerry: 4.0, theta: 90,
                        promptLatex: t("sp3_07.prompts.c_c1"),
                        expressionLatex: "v_{net} = \\\\sqrt{v_f^{2} + v_r^2}", targetLatex: "5.0",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 5.0 }],
                        correctLatex: "5.0", hintLatex: [t("sp3_07.hints.c_c1")]
                    },
                    {
                        id: "C-C2", difficulty, stage, vRiver: 1.0, vFerry: 1.0, theta: 90,
                        promptLatex: t("sp3_07.prompts.c_c2"),
                        expressionLatex: "v_{net} = \\\\sqrt{1^{2} + 1^2}", targetLatex: "1.41",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 1.41 }],
                        correctLatex: "1.41", hintLatex: [t("sp3_07.hints.c_c2")]
                    },
                    {
                        id: "C-C3", difficulty, stage, vRiver: 2.0, vFerry: 2.0, theta: 90,
                        promptLatex: t("sp3_07.prompts.c_c3"),
                        expressionLatex: "v_{net} = \\\\sqrt{2^{2} + 2^2}", targetLatex: "2.83",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 2.83 }],
                        correctLatex: "2.83", hintLatex: [t("sp3_07.hints.c_c3")]
                    },
                    {
                        id: "C-C4", difficulty, stage, vRiver: 1.5, vFerry: 2.0, theta: 90,
                        promptLatex: t("sp3_07.prompts.c_c4"),
                        expressionLatex: "v_{net} = \\\\sqrt{2^{2} + 1.5^2}", targetLatex: "2.5",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 2.5 }],
                        correctLatex: "2.5", hintLatex: [t("sp3_07.hints.c_c4")]
                    },
                    {
                        id: "C-C5", difficulty, stage, vRiver: 5.0, vFerry: 12.0, theta: 90,
                        promptLatex: t("sp3_07.prompts.c_c5"),
                        expressionLatex: "v_{net} = \\\\sqrt{12^{2} + 5^2}", targetLatex: "13.0",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 13.0 }],
                        correctLatex: "13.0", hintLatex: [t("sp3_07.hints.c_c5")]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                // ADVANCED: Angled vectors with components
                quests.push(
                    {
                        id: "C-A1", difficulty, stage, vRiver: 2.0, vFerry: 4.0, theta: 60,
                        promptLatex: t("sp3_07.prompts.c_a1"),
                        expressionLatex: "v_{net,x} = v_f \\cos(60^\\circ)", targetLatex: "2.0",
                        slots: [{ id: "ans", labelLatex: "v_{net,x}", placeholder: "m/s", expected: 2.0 }],
                        correctLatex: "2.0", hintLatex: [t("sp3_07.hints.c_a1")]
                    },
                    {
                        id: "C-A2", difficulty, stage, vRiver: 1.0, vFerry: 2.0, theta: 30,
                        promptLatex: t("sp3_07.prompts.c_a2"),
                        expressionLatex: "v_{net,y} = v_f \\sin(30^\\circ) + v_r", targetLatex: "2.0",
                        slots: [{ id: "ans", labelLatex: "v_{net,y}", placeholder: "m/s", expected: 2.0 }],
                        correctLatex: "2.0", hintLatex: [t("sp3_07.hints.c_a2")]
                    },
                    {
                        id: "C-A3", difficulty, stage, vRiver: 1.5, vFerry: 3.0, theta: 45,
                        promptLatex: t("sp3_07.prompts.c_a3"),
                        expressionLatex: "v_{net,x} = v_f \\cos(45^\\circ)", targetLatex: "2.12",
                        slots: [{ id: "ans", labelLatex: "v_{net,x}", placeholder: "m/s", expected: 2.12 }],
                        correctLatex: "2.12", hintLatex: [t("sp3_07.hints.c_a3")]
                    },
                    {
                        id: "C-A4", difficulty, stage, vRiver: 2.0, vFerry: 6.0, theta: 30,
                        promptLatex: t("sp3_07.prompts.c_a4"),
                        expressionLatex: "v_{net,y} = v_f \\sin(30^\\circ) + v_r", targetLatex: "5.0",
                        slots: [{ id: "ans", labelLatex: "v_{net,y}", placeholder: "m/s", expected: 5.0 }],
                        correctLatex: "5.0", hintLatex: [t("sp3_07.hints.c_a4")]
                    },
                    {
                        id: "C-A5", difficulty, stage, vRiver: 1.0, vFerry: 4.0, theta: 60,
                        promptLatex: t("sp3_07.prompts.c_a5"),
                        expressionLatex: "v_{net,y} = v_f \\sin(60^\\circ) + v_r", targetLatex: "4.46",
                        slots: [{ id: "ans", labelLatex: "v_{net,y}", placeholder: "m/s", expected: 4.46 }],
                        correctLatex: "4.46", hintLatex: [t("sp3_07.hints.c_a5")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                // ELITE: Complex vector resolution and magnitude
                quests.push(
                    {
                        id: "C-E1", difficulty, stage, vRiver: 2.0, vFerry: 5.0, theta: 53,
                        promptLatex: t("sp3_07.prompts.c_e1"),
                        expressionLatex: "v_{net} = \\\\sqrt{(v_f\\cos\\theta)^{2} + (v_f\\sin\\theta + v_r)^2}", targetLatex: "6.0",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 6.0 }],
                        correctLatex: "6.0", hintLatex: [t("sp3_07.hints.c_e1")]
                    },
                    {
                        id: "C-E2", difficulty, stage, vRiver: 1.5, vFerry: 4.0, theta: 37,
                        promptLatex: t("sp3_07.prompts.c_e2"),
                        expressionLatex: "v_{net} = \\\\sqrt{(v_f\\cos\\theta)^{2} + (v_f\\sin\\theta + v_r)^2}", targetLatex: "4.92",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 4.92 }],
                        correctLatex: "4.92", hintLatex: [t("sp3_07.hints.c_e2")]
                    },
                    {
                        id: "C-E3", difficulty, stage, vRiver: 3.0, vFerry: 8.0, theta: 45,
                        promptLatex: t("sp3_07.prompts.c_e3"),
                        expressionLatex: "\\theta_{net} = \\arctan\\left(\\\\frac{v_f\\sin\\theta + v_r}{v_f\\cos\\theta}\\right)", targetLatex: "56.3",
                        slots: [{ id: "ans", labelLatex: "\\theta_{net}", placeholder: "deg", expected: 56.3 }],
                        correctLatex: "56.3", hintLatex: [t("sp3_07.hints.c_e3")]
                    },
                    {
                        id: "C-E4", difficulty, stage, vRiver: 2.5, vFerry: 6.0, theta: 60,
                        promptLatex: t("sp3_07.prompts.c_e4"),
                        expressionLatex: "v_{net} = \\\\sqrt{(v_f\\cos\\theta)^{2} + (v_f\\sin\\theta + v_r)^2}", targetLatex: "7.81",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 7.81 }],
                        correctLatex: "7.81", hintLatex: [t("sp3_07.hints.c_e4")]
                    },
                    {
                        id: "C-E5", difficulty, stage, vRiver: 1.0, vFerry: 5.0, theta: 30,
                        promptLatex: t("sp3_07.prompts.c_e5"),
                        expressionLatex: "\\theta_{net} = \\arctan\\left(\\\\frac{v_f\\sin\\theta + v_r}{v_f\\cos\\theta}\\right)", targetLatex: "40.9",
                        slots: [{ id: "ans", labelLatex: "\\theta_{net}", placeholder: "deg", expected: 40.9 }],
                        correctLatex: "40.9", hintLatex: [t("sp3_07.hints.c_e5")]
                    }
                );
            }
        }

        // STAGE 2: DRIFT - Zero Drift Angle Calculation
        if (stage === "DRIFT") {
            if (difficulty === "BASIC") {
                // BASIC: Simple angle calculations
                quests.push(
                    {
                        id: "D-B1", difficulty, stage, vRiver: 1.0, vFerry: 2.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_b1"),
                        expressionLatex: "v_f \\cos(\\theta) + v_r = 0", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_b1")]
                    },
                    {
                        id: "D-B2", difficulty, stage, vRiver: 1.5, vFerry: 3.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_b2"),
                        expressionLatex: "\\cos(\\theta) = -\\\\frac{v_r}{v_f}", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_b2")]
                    },
                    {
                        id: "D-B3", difficulty, stage, vRiver: 2.0, vFerry: 4.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_b3"),
                        expressionLatex: "\\cos(\\theta) = -0.5", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_b3")]
                    },
                    {
                        id: "D-B4", difficulty, stage, vRiver: 0.5, vFerry: 1.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_b4"),
                        expressionLatex: "\\cos(\\theta) = -\\\\frac{0.5}{1.0}", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_b4")]
                    },
                    {
                        id: "D-B5", difficulty, stage, vRiver: 3.0, vFerry: 6.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_b5"),
                        expressionLatex: "\\cos(\\theta) = -0.5", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_b5")]
                    }
                );
            }
            if (difficulty === "CORE") {
                // CORE: Different ratios
                quests.push(
                    {
                        id: "D-C1", difficulty, stage, vRiver: 1.0, vFerry: 1.73, theta: 125.3,
                        promptLatex: t("sp3_07.prompts.d_c1"),
                        expressionLatex: "\\theta = \\arccos\\left(-\\\\frac{v_r}{v_f}\\right)", targetLatex: "125.3",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 125.3 }],
                        correctLatex: "125.3", hintLatex: [t("sp3_07.hints.d_c1")]
                    },
                    {
                        id: "D-C2", difficulty, stage, vRiver: 2.0, vFerry: 2.83, theta: 135,
                        promptLatex: t("sp3_07.prompts.d_c2"),
                        expressionLatex: "\\cos(\\theta) = -\\\\frac{2.0}{2.83}", targetLatex: "135",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 135 }],
                        correctLatex: "135", hintLatex: [t("sp3_07.hints.d_c2")]
                    },
                    {
                        id: "D-C3", difficulty, stage, vRiver: 1.5, vFerry: 2.12, theta: 135,
                        promptLatex: t("sp3_07.prompts.d_c3"),
                        expressionLatex: "\\cos(\\theta) = -\\\\frac{1.5}{2.12}", targetLatex: "135",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 135 }],
                        correctLatex: "135", hintLatex: [t("sp3_07.hints.d_c3")]
                    },
                    {
                        id: "D-C4", difficulty, stage, vRiver: 3.0, vFerry: 5.0, theta: 126.9,
                        promptLatex: t("sp3_07.prompts.d_c4"),
                        expressionLatex: "\\theta = \\arccos(-0.6)", targetLatex: "126.9",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 126.9 }],
                        correctLatex: "126.9", hintLatex: [t("sp3_07.hints.d_c4")]
                    },
                    {
                        id: "D-C5", difficulty, stage, vRiver: 2.5, vFerry: 3.54, theta: 135,
                        promptLatex: t("sp3_07.prompts.d_c5"),
                        expressionLatex: "\\cos(\\theta) = -\\\\frac{2.5}{3.54}", targetLatex: "135",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 135 }],
                        correctLatex: "135", hintLatex: [t("sp3_07.hints.d_c5")]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                // ADVANCED: Fractional ratios
                quests.push(
                    {
                        id: "D-A1", difficulty, stage, vRiver: 1.2, vFerry: 2.0, theta: 126.9,
                        promptLatex: t("sp3_07.prompts.d_a1"),
                        expressionLatex: "\\theta = \\arccos\\left(-\\\\frac{1.2}{2.0}\\right)", targetLatex: "126.9",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 126.9 }],
                        correctLatex: "126.9", hintLatex: [t("sp3_07.hints.d_a1")]
                    },
                    {
                        id: "D-A2", difficulty, stage, vRiver: 1.8, vFerry: 3.6, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_a2"),
                        expressionLatex: "\\cos(\\theta) = -0.5", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_a2")]
                    },
                    {
                        id: "D-A3", difficulty, stage, vRiver: 2.4, vFerry: 4.0, theta: 126.9,
                        promptLatex: t("sp3_07.prompts.d_a3"),
                        expressionLatex: "\\cos(\\theta) = -0.6", targetLatex: "126.9",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 126.9 }],
                        correctLatex: "126.9", hintLatex: [t("sp3_07.hints.d_a3")]
                    },
                    {
                        id: "D-A4", difficulty, stage, vRiver: 3.5, vFerry: 7.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_a4"),
                        expressionLatex: "\\cos(\\theta) = -0.5", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_a4")]
                    },
                    {
                        id: "D-A5", difficulty, stage, vRiver: 1.6, vFerry: 3.2, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_a5"),
                        expressionLatex: "\\cos(\\theta) = -0.5", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_a5")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                // ELITE: Complex scenarios with multiple constraints
                quests.push(
                    {
                        id: "D-E1", difficulty, stage, vRiver: 2.7, vFerry: 4.5, theta: 126.9,
                        promptLatex: t("sp3_07.prompts.d_e1"),
                        expressionLatex: "\\theta = \\arccos\\left(-\\\\frac{2.7}{4.5}\\right)", targetLatex: "126.9",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 126.9 }],
                        correctLatex: "126.9", hintLatex: [t("sp3_07.hints.d_e1")]
                    },
                    {
                        id: "D-E2", difficulty, stage, vRiver: 3.2, vFerry: 6.4, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_e2"),
                        expressionLatex: "\\cos(\\theta) = -0.5", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_e2")]
                    },
                    {
                        id: "D-E3", difficulty, stage, vRiver: 1.4, vFerry: 2.8, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_e3"),
                        expressionLatex: "\\cos(\\theta) = -0.5", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_e3")]
                    },
                    {
                        id: "D-E4", difficulty, stage, vRiver: 2.1, vFerry: 4.2, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_e4"),
                        expressionLatex: "\\cos(\\theta) = -0.5", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_e4")]
                    },
                    {
                        id: "D-E5", difficulty, stage, vRiver: 4.0, vFerry: 8.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.d_e5"),
                        expressionLatex: "\\cos(\\theta) = -0.5", targetLatex: "120",
                        slots: [{ id: "ans", labelLatex: "\\theta", placeholder: "deg", expected: 120 }],
                        correctLatex: "120", hintLatex: [t("sp3_07.hints.d_e5")]
                    }
                );
            }
        }

        // STAGE 3: NAVIGATION - Time and Distance Calculations
        if (stage === "NAVIGATION") {
            if (difficulty === "BASIC") {
                // BASIC: Simple time calculations
                quests.push(
                    {
                        id: "N-B1", difficulty, stage, vRiver: 1.0, vFerry: 2.0, theta: 90,
                        promptLatex: t("sp3_07.prompts.n_b1"),
                        expressionLatex: "t = \\\\frac{d}{v_f}", targetLatex: "10.0",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 10.0 }],
                        correctLatex: "10.0", hintLatex: [t("sp3_07.hints.n_b1")]
                    },
                    {
                        id: "N-B2", difficulty, stage, vRiver: 1.5, vFerry: 3.0, theta: 90,
                        promptLatex: t("sp3_07.prompts.n_b2"),
                        expressionLatex: "t = \\\\frac{30}{3.0}", targetLatex: "10.0",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 10.0 }],
                        correctLatex: "10.0", hintLatex: [t("sp3_07.hints.n_b2")]
                    },
                    {
                        id: "N-B3", difficulty, stage, vRiver: 0.5, vFerry: 4.0, theta: 90,
                        promptLatex: t("sp3_07.prompts.n_b3"),
                        expressionLatex: "t = \\\\frac{40}{4.0}", targetLatex: "10.0",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 10.0 }],
                        correctLatex: "10.0", hintLatex: [t("sp3_07.hints.n_b3")]
                    },
                    {
                        id: "N-B4", difficulty, stage, vRiver: 2.0, vFerry: 5.0, theta: 90,
                        promptLatex: t("sp3_07.prompts.n_b4"),
                        expressionLatex: "t = \\\\frac{25}{5.0}", targetLatex: "5.0",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 5.0 }],
                        correctLatex: "5.0", hintLatex: [t("sp3_07.hints.n_b4")]
                    },
                    {
                        id: "N-B5", difficulty, stage, vRiver: 1.0, vFerry: 2.5, theta: 90,
                        promptLatex: t("sp3_07.prompts.n_b5"),
                        expressionLatex: "t = \\\\frac{50}{2.5}", targetLatex: "20.0",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 20.0 }],
                        correctLatex: "20.0", hintLatex: [t("sp3_07.hints.n_b5")]
                    }
                );
            }
            if (difficulty === "CORE") {
                // CORE: Angled crossings
                quests.push(
                    {
                        id: "N-C1", difficulty, stage, vRiver: 1.0, vFerry: 2.0, theta: 60,
                        promptLatex: t("sp3_07.prompts.n_c1"),
                        expressionLatex: "t = \\\\frac{d}{v_f \\sin(\\theta)}", targetLatex: "11.55",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 11.55 }],
                        correctLatex: "11.55", hintLatex: [t("sp3_07.hints.n_c1")]
                    },
                    {
                        id: "N-C2", difficulty, stage, vRiver: 1.5, vFerry: 3.0, theta: 30,
                        promptLatex: t("sp3_07.prompts.n_c2"),
                        expressionLatex: "t = \\\\frac{30}{3.0 \\times 0.5}", targetLatex: "20.0",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 20.0 }],
                        correctLatex: "20.0", hintLatex: [t("sp3_07.hints.n_c2")]
                    },
                    {
                        id: "N-C3", difficulty, stage, vRiver: 2.0, vFerry: 4.0, theta: 45,
                        promptLatex: t("sp3_07.prompts.n_c3"),
                        expressionLatex: "t = \\\\frac{40}{4.0 \\times \\sin(45^\\circ)}", targetLatex: "14.14",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 14.14 }],
                        correctLatex: "14.14", hintLatex: [t("sp3_07.hints.n_c3")]
                    },
                    {
                        id: "N-C4", difficulty, stage, vRiver: 0.5, vFerry: 2.5, theta: 60,
                        promptLatex: t("sp3_07.prompts.n_c4"),
                        expressionLatex: "t = \\\\frac{25}{2.5 \\times \\sin(60^\\circ)}", targetLatex: "11.55",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 11.55 }],
                        correctLatex: "11.55", hintLatex: [t("sp3_07.hints.n_c4")]
                    },
                    {
                        id: "N-C5", difficulty, stage, vRiver: 1.0, vFerry: 5.0, theta: 30,
                        promptLatex: t("sp3_07.prompts.n_c5"),
                        expressionLatex: "t = \\\\frac{50}{5.0 \\times 0.5}", targetLatex: "20.0",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 20.0 }],
                        correctLatex: "20.0", hintLatex: [t("sp3_07.hints.n_c5")]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                // ADVANCED: Drift distance calculations
                quests.push(
                    {
                        id: "N-A1", difficulty, stage, vRiver: 1.2, vFerry: 2.4, theta: 120,
                        promptLatex: t("sp3_07.prompts.n_a1"),
                        expressionLatex: "t = \\\\frac{20}{v_f \\sin(120^\\circ)}", targetLatex: "9.62",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 9.62 }],
                        correctLatex: "9.62", hintLatex: [t("sp3_07.hints.n_a1")]
                    },
                    {
                        id: "N-A2", difficulty, stage, vRiver: 1.5, vFerry: 3.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.n_a2"),
                        expressionLatex: "d_{drift} = v_r \\times t", targetLatex: "11.55",
                        slots: [{ id: "ans", labelLatex: "d_{drift}", placeholder: "m", expected: 11.55 }],
                        correctLatex: "11.55", hintLatex: [t("sp3_07.hints.n_a2")]
                    },
                    {
                        id: "N-A3", difficulty, stage, vRiver: 2.0, vFerry: 4.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.n_a3"),
                        expressionLatex: "t = \\\\frac{30}{4.0 \\times \\sin(120^\\circ)}", targetLatex: "8.66",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 8.66 }],
                        correctLatex: "8.66", hintLatex: [t("sp3_07.hints.n_a3")]
                    },
                    {
                        id: "N-A4", difficulty, stage, vRiver: 1.0, vFerry: 2.0, theta: 135,
                        promptLatex: t("sp3_07.prompts.n_a4"),
                        expressionLatex: "t = \\\\frac{25}{2.0 \\times \\sin(135^\\circ)}", targetLatex: "17.68",
                        slots: [{ id: "ans", labelLatex: "t", placeholder: "s", expected: 17.68 }],
                        correctLatex: "17.68", hintLatex: [t("sp3_07.hints.n_a4")]
                    },
                    {
                        id: "N-A5", difficulty, stage, vRiver: 1.8, vFerry: 3.6, theta: 120,
                        promptLatex: t("sp3_07.prompts.n_a5"),
                        expressionLatex: "d_{drift} = 1.8 \\times \\\\frac{40}{3.6 \\times \\sin(120^\\circ)}", targetLatex: "23.09",
                        slots: [{ id: "ans", labelLatex: "d_{drift}", placeholder: "m", expected: 23.09 }],
                        correctLatex: "23.09", hintLatex: [t("sp3_07.hints.n_a5")]
                    }
                );
            }
            if (difficulty === "ELITE") {
                // ELITE: Complex multi-step navigation
                quests.push(
                    {
                        id: "N-E1", difficulty, stage, vRiver: 2.5, vFerry: 5.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.n_e1"),
                        expressionLatex: "v_{net} = \\\\sqrt{(v_f\\sin\\theta)^{2} + (v_f\\cos\\theta + v_r)^2}", targetLatex: "4.33",
                        slots: [{ id: "ans", labelLatex: "v_{net}", placeholder: "m/s", expected: 4.33 }],
                        correctLatex: "4.33", hintLatex: [t("sp3_07.hints.n_e1")]
                    },
                    {
                        id: "N-E2", difficulty, stage, vRiver: 1.5, vFerry: 4.0, theta: 135,
                        promptLatex: t("sp3_07.prompts.n_e2"),
                        expressionLatex: "t_{total} = \\\\frac{d}{v_f\\sin\\theta} + \\\\frac{d_{drift}}{v_{net}}", targetLatex: "18.38",
                        slots: [{ id: "ans", labelLatex: "t_{total}", placeholder: "s", expected: 18.38 }],
                        correctLatex: "18.38", hintLatex: [t("sp3_07.hints.n_e2")]
                    },
                    {
                        id: "N-E3", difficulty, stage, vRiver: 3.0, vFerry: 6.0, theta: 120,
                        promptLatex: t("sp3_07.prompts.n_e3"),
                        expressionLatex: "d_{total} = \\\\sqrt{d^{2} + d_{drift}^2}", targetLatex: "46.19",
                        slots: [{ id: "ans", labelLatex: "d_{total}", placeholder: "m", expected: 46.19 }],
                        correctLatex: "46.19", hintLatex: [t("sp3_07.hints.n_e3")]
                    },
                    {
                        id: "N-E4", difficulty, stage, vRiver: 2.0, vFerry: 5.0, theta: 126.9,
                        promptLatex: t("sp3_07.prompts.n_e4"),
                        expressionLatex: "\\theta_{path} = \\arctan\\left(\\\\frac{d_{drift}}{d}\\right)", targetLatex: "33.7",
                        slots: [{ id: "ans", labelLatex: "\\theta_{path}", placeholder: "deg", expected: 33.7 }],
                        correctLatex: "33.7", hintLatex: [t("sp3_07.hints.n_e4")]
                    },
                    {
                        id: "N-E5", difficulty, stage, vRiver: 1.0, vFerry: 3.0, theta: 110,
                        promptLatex: t("sp3_07.prompts.n_e5"),
                        expressionLatex: "E = \\\\frac{1}{2}m v_{net}^{2}", targetLatex: "4.5",
                        slots: [{ id: "ans", labelLatex: "E", placeholder: "J", expected: 4.5 }],
                        correctLatex: "4.5", hintLatex: [t("sp3_07.hints.n_e5")]
                    }
                );
            }
        }

        return quests;
    }, [t]);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s), [buildStagePool]);

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
        getHint,
        currentStageStats,
      adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<SP307Quest, Stage>({
    moduleCode: "sp3-07",
        buildPool,
        initialStage: "COMPOSITION",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sp3-07", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "COMPOSITION", label: t("sp3_07.stages.composition") },
        { id: "DRIFT", label: t("sp3_07.stages.drift") },
        { id: "NAVIGATION", label: t("sp3_07.stages.navigation") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      moduleCode="SP3.07"
            title={t("sp3_07.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sp3_07.footer_left")}
            translations={{
                back: t("sp3_07.back"),
                check: t("sp3_07.check"),
                next: t("sp3_07.next"),
                correct: t("sp3_07.correct"),
                incorrect: t("sp3_07.incorrect"),
                ready: t("sp3_07.ready"),
                monitor_title: t("sp3_07.monitor_title"),
                difficulty: {
                    basic: t("sp3_07.difficulty.basic"),
                    core: t("sp3_07.difficulty.core"),
                    advanced: t("sp3_07.difficulty.advanced"),
                    elite: t("sp3_07.difficulty.elite"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        {currentQuest ? (
                            <FerryCanvas
                                riverSpeed={currentQuest?.vRiver}
                                cableAngle={currentQuest?.theta}
                                ferrySpeed={currentQuest?.vFerry}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-white/50 italic font-mono">
                                COMPILING_VECTORS...
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-[8px] uppercase text-white/40 tracking-widest">{t("sp3_07.labels.river_speed")}</div>
                            <div className="text-sm font-mono text-neon-cyan">{currentQuest?.vRiver.toFixed(2)} m/s</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-[8px] uppercase text-white/40 tracking-widest">{t("sp3_07.labels.cable_angle")}</div>
                            <div className="text-sm font-mono text-neon-cyan">{currentQuest?.theta.toFixed(1)}°</div>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t("sp3_07.results.stability")}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? "bg-neon-cyan shadow-[0_0_5px_cyan]" : "bg-transparent"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full">
                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                                {t("labels.mission_objective")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest?.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    Vector Geometry
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest?.expressionLatex || ""} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-cyan/30" />
                                    {t("labels.terminal_input")} [Alpha]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest?.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">PARM_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-cyan/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-cyan/0 group-focus-within:bg-neon-cyan/20 transition-all blur-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {lastCheck && (
                                        <motion.div
                                            key={lastCheck.ok ? "correct" : "incorrect"}
                                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                            className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${lastCheck.ok
                                                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                : 'bg-red-500/10 border-red-500/30 text-red-400'
                                                }`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
                                                    }`}>
                                                    {lastCheck.ok ? "✓" : "✗"}
                                                </div>
                                                <div>
                                                    <div className="font-black text-lg tracking-widest uppercase italic">
                                                        {lastCheck.ok ? t("sp3_07.results.valid") : t("sp3_07.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sp3_07.results.valid_desc") : t("sp3_07.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("labels.hint")}:</span>
                                                    <div className="text-white font-bold">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}

                                            {lastCheck.ok && (
                                                <button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                                >
                                                    {t("labels.next_mission")}
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ChamberLayout>
    );
}
