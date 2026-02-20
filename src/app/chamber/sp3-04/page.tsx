"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import PressureBuoyancyCanvas from "@/components/chamber/sp1-07/PressureBuoyancyCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "PRESSURE" | "BUOYANCY" | "HYDRAULICS";

interface SP304Quest extends Quest {
    stage: Stage;
    depth?: number;
    area?: number;
    force?: number;
    volume?: number;
}

export default function SP304Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage, t: (key: string) => string): SP304Quest[] => {
        const quests: SP304Quest[] = [];

        if (stage === "PRESSURE") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "P-B1", difficulty, stage, depth: 10,
                        promptLatex: t("sp3_04.prompts.pressure_basic_1"),
                        expressionLatex: `P = \\rho \\times 9.8 \\times 10`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "98000", expected: 98000 }],
                        correctLatex: `P = 98000 \\\\text{ Pa}`,
                        hintLatex: [`P = \\rho gh`]
                    },
                    {
                        id: "P-B2", difficulty, stage, depth: 5,
                        promptLatex: t("sp3_04.prompts.pressure_basic_2"),
                        expressionLatex: `P = \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "50000", expected: 50000 }],
                        correctLatex: `P = 50000 \\\\text{ Pa}`,
                        hintLatex: [`P = 1000 \\times 10 \\times 5`]
                    },
                    {
                        id: "P-B3", difficulty, stage, area: 2, force: 100,
                        promptLatex: t("sp3_04.prompts.pressure_basic_3"),
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "50", expected: 50 }],
                        correctLatex: `P = 50 \\\\text{ Pa}`,
                        hintLatex: [`P = 100/2`]
                    },
                    {
                        id: "P-B4", difficulty, stage, area: 0.5, force: 200,
                        promptLatex: t("sp3_04.prompts.pressure_basic_4"),
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "400", expected: 400 }],
                        correctLatex: `P = 400 \\\\text{ Pa}`,
                        hintLatex: [`P = 200/0.5`]
                    },
                    {
                        id: "P-B5", difficulty, stage, depth: 2,
                        promptLatex: t("sp3_04.prompts.pressure_basic_5"),
                        expressionLatex: `P = \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "20000", expected: 20000 }],
                        correctLatex: `P = 20000 \\\\text{ Pa}`,
                        hintLatex: [`P = 1000 \\times 10 \\times 2`]
                    }
                );
            }

            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "P-C1", difficulty, stage, depth: 15,
                        promptLatex: t("sp3_04.prompts.pressure_core_1"),
                        expressionLatex: `P_{total} = P_{atm} + \\rho gh`,
                        targetLatex: `P_{total}`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "248000", expected: 248000 }],
                        correctLatex: `P = 248000 \\\\text{ Pa}`,
                        hintLatex: [`101000 + 1000 \\times 9.8 \\times 15`]
                    },
                    {
                        id: "P-C2", difficulty, stage, area: 0.01, force: 500,
                        promptLatex: t("sp3_04.prompts.pressure_core_2"),
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "50000", expected: 50000 }],
                        correctLatex: `P = 50000 \\\\text{ Pa}`,
                        hintLatex: [`P = 500/0.01`]
                    },
                    {
                        id: "P-C3", difficulty, stage, depth: 20,
                        promptLatex: t("sp3_04.prompts.pressure_core_3"),
                        expressionLatex: `P = \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "156800", expected: 156800 }],
                        correctLatex: `P = 156800 \\\\text{ Pa}`,
                        hintLatex: [`P = 800 \\times 9.8 \\times 20`]
                    },
                    {
                        id: "P-C4", difficulty, stage, area: 0.02, force: 1000,
                        promptLatex: t("sp3_04.prompts.pressure_core_4"),
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "50000", expected: 50000 }],
                        correctLatex: `P = 50000 \\\\text{ Pa}`,
                        hintLatex: [`P = 1000/0.02`]
                    },
                    {
                        id: "P-C5", difficulty, stage, depth: 100,
                        promptLatex: t("sp3_04.prompts.pressure_core_5"),
                        expressionLatex: `P = \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "1009400", expected: 1009400 }],
                        correctLatex: `P = 1009400 \\\\text{ Pa}`,
                        hintLatex: [`P = 1030 \\times 9.8 \\times 100`]
                    }
                );
            }

            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "P-A1", difficulty, stage, depth: 50,
                        promptLatex: t("sp3_04.prompts.pressure_advanced_1"),
                        expressionLatex: `P = \\rho_w g h_w + \\rho_o g h_o`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "450800", expected: 450800 }],
                        correctLatex: `P = 450800 \\\\text{ Pa}`,
                        hintLatex: [`1000 \\times 9.8 \\times 30 + 800 \\times 9.8 \\times 20`]
                    },
                    {
                        id: "P-A2", difficulty, stage, area: 0.001, force: 100,
                        promptLatex: t("sp3_04.prompts.pressure_advanced_2"),
                        expressionLatex: `F_2 = F_1 \\times \\\\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `F_2 = 10000 \\\\text{ N}`,
                        hintLatex: [`100 \\times (0.1/0.001)`]
                    },
                    {
                        id: "P-A3", difficulty, stage, depth: 10,
                        promptLatex: t("sp3_04.prompts.pressure_advanced_3"),
                        expressionLatex: `\\rho_w h_w = \\rho_{Hg} h_{Hg}`,
                        targetLatex: `h_{Hg}`,
                        slots: [{ id: "height", labelLatex: `h_{Hg} \\\\text{ (m)}`, placeholder: "0.735", expected: 0.735 }],
                        correctLatex: `h_{Hg} = 0.735 \\\\text{ m}`,
                        hintLatex: [`h_{Hg} = 1000 \\times 10 / 13600`]
                    },
                    {
                        id: "P-A4", difficulty, stage, area: 0.05, force: 2000,
                        promptLatex: t("sp3_04.prompts.pressure_advanced_4"),
                        expressionLatex: `F_2 = F_1 \\times \\\\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "1000", expected: 1000 }],
                        correctLatex: `F_2 = 1000 \\\\text{ N}`,
                        hintLatex: [`200 \\times (0.05/0.01)`]
                    },
                    {
                        id: "P-A5", difficulty, stage, depth: 200,
                        promptLatex: t("sp3_04.prompts.pressure_advanced_5"),
                        expressionLatex: `P = P_{atm} + \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "2119800", expected: 2119800 }],
                        correctLatex: `P = 2119800 \\\\text{ Pa}`,
                        hintLatex: [`101000 + 1030 \\times 9.8 \\times 200`]
                    }
                );
            }

            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "P-E1", difficulty, stage, depth: 11000,
                        promptLatex: t("sp3_04.prompts.pressure_elite_1"),
                        expressionLatex: `P = P_{atm} + \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (MPa)}`, placeholder: "113.1", expected: 113.1 }],
                        correctLatex: `P = 113.1 \\\\text{ MPa}`,
                        hintLatex: [`(101000 + 1050 \\times 9.8 \\times 11000) / 10^6`]
                    },
                    {
                        id: "P-E2", difficulty, stage, area: 0.0001, force: 50,
                        promptLatex: t("sp3_04.prompts.pressure_elite_2"),
                        expressionLatex: `MA = \\\\frac{A_2}{A_1}`,
                        targetLatex: `MA`,
                        slots: [{ id: "ma", labelLatex: `MA`, placeholder: "100", expected: 100 }],
                        correctLatex: `MA = 100`,
                        hintLatex: [`0.01 / 0.0001`]
                    },
                    {
                        id: "P-E3", difficulty, stage, depth: 5,
                        promptLatex: t("sp3_04.prompts.pressure_elite_3"),
                        expressionLatex: `P = \\sum \\rho_i g h_i`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "168880", expected: 168880 }],
                        correctLatex: `P = 168880 \\\\text{ Pa}`,
                        hintLatex: [`1000 \\times 9.8 \\times 2 + 800 \\times 9.8 \\times 2 + 13600 \\times 9.8 \\times 1`]
                    },
                    {
                        id: "P-E4", difficulty, stage, area: 0.002, force: 500,
                        promptLatex: t("sp3_04.prompts.pressure_elite_4"),
                        expressionLatex: `F_2 = 0.8 \\times F_1 \\times \\\\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "40000", expected: 40000 }],
                        correctLatex: `F_2 = 40000 \\\\text{ N}`,
                        hintLatex: [`0.8 \\times 500 \\times (0.2/0.002)`]
                    },
                    {
                        id: "P-E5", difficulty, stage, depth: 1000,
                        promptLatex: t("sp3_04.prompts.pressure_elite_5"),
                        expressionLatex: `F = (P_{water} - P_{atm}) \\times A`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F \\\\text{ (MN)}`, placeholder: "10.09", expected: 10.09 }],
                        correctLatex: `F = 10.09 \\\\text{ MN}`,
                        hintLatex: [`(1030 \\times 9.8 \\times 1000) \\times 1 / 10^6`]
                    }
                );
            }
        }

        if (stage === "BUOYANCY") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "B-B1", difficulty, stage, volume: 0.1,
                        promptLatex: t("sp3_04.prompts.buoyancy_basic_1"),
                        expressionLatex: `F_b = 1000 \\times 0.1 \\times 9.8`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\\\text{ (N)}`, placeholder: "980", expected: 980 }],
                        correctLatex: `F_b = 980 \\\\text{ N}`,
                        hintLatex: [`\\text{Archimedes' Principle}`]
                    },
                    {
                        id: "B-B2", difficulty, stage, volume: 0.05,
                        promptLatex: t("sp3_04.prompts.buoyancy_basic_2"),
                        expressionLatex: `F_b = \\rho Vg`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\\\text{ (N)}`, placeholder: "490", expected: 490 }],
                        correctLatex: `F_b = 490 \\\\text{ N}`,
                        hintLatex: [`1000 \\times 0.05 \\times 9.8`]
                    },
                    {
                        id: "B-B3", difficulty, stage, volume: 0.2,
                        promptLatex: t("sp3_04.prompts.buoyancy_basic_3"),
                        expressionLatex: `F_b = \\rho Vg`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\\\text{ (N)}`, placeholder: "2.35", expected: 2.35 }],
                        correctLatex: `F_b = 2.35 \\\\text{ N}`,
                        hintLatex: [`1.2 \\times 0.2 \\times 9.8`]
                    },
                    {
                        id: "B-B4", difficulty, stage, volume: 0.01,
                        promptLatex: t("sp3_04.prompts.buoyancy_basic_4"),
                        expressionLatex: `F_b = \\rho Vg`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\\\text{ (N)}`, placeholder: "98", expected: 98 }],
                        correctLatex: `F_b = 98 \\\\text{ N}`,
                        hintLatex: [`1000 \\times 0.01 \\times 9.8`]
                    },
                    {
                        id: "B-B5", difficulty, stage, volume: 0.5,
                        promptLatex: t("sp3_04.prompts.buoyancy_basic_5"),
                        expressionLatex: `F_b = \\rho Vg`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\\\text{ (N)}`, placeholder: "4900", expected: 4900 }],
                        correctLatex: `F_b = 4900 \\\\text{ N}`,
                        hintLatex: [`1000 \\times 0.5 \\times 9.8`]
                    }
                );
            }

            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "B-C1", difficulty, stage, volume: 0.02,
                        promptLatex: t("sp3_04.prompts.buoyancy_core_1"),
                        expressionLatex: `\\rho_{wood} = m/V = 10/0.02 = 500 < 1000`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Float?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\\\text{Yes (density < water)}`,
                        hintLatex: [`\\\\text{Compare densities}`]
                    },
                    {
                        id: "B-C2", difficulty, stage, volume: 0.1,
                        promptLatex: t("sp3_04.prompts.buoyancy_core_2"),
                        expressionLatex: `F_{net} = F_b - W = 980 - 1500`,
                        targetLatex: `F_{net}`,
                        slots: [{ id: "force", labelLatex: `F_{net} \\\\text{ (N)}`, placeholder: "-520", expected: -520 }],
                        correctLatex: `F_{net} = -520 \\\\text{ N (sinks)}`,
                        hintLatex: [`F_b = 1000 \\times 0.1 \\times 9.8 = 980`]
                    },
                    {
                        id: "B-C3", difficulty, stage, volume: 0.05,
                        promptLatex: t("sp3_04.prompts.buoyancy_core_3"),
                        expressionLatex: `f = \\rho_{ice}/\\rho_{water}`,
                        targetLatex: `f`,
                        slots: [{ id: "frac", labelLatex: `f`, placeholder: "0.9", expected: 0.9 }],
                        correctLatex: `f = 0.9 \\\\text{ (90\\%)}`,
                        hintLatex: [`900/1000`]
                    },
                    {
                        id: "B-C4", difficulty, stage, volume: 0.03,
                        promptLatex: t("sp3_04.prompts.buoyancy_core_4"),
                        expressionLatex: `W_{app} = W - F_b = mg - \\rho Vg`,
                        targetLatex: `W_{app}`,
                        slots: [{ id: "weight", labelLatex: `W_{app} \\\\text{ (N)}`, placeholder: "500", expected: 500 }],
                        correctLatex: `W_{app} = 500 \\\\text{ N}`,
                        hintLatex: [`81 \\times 9.8 - 1000 \\times 0.03 \\times 9.8`]
                    },
                    {
                        id: "B-C5", difficulty, stage, volume: 1,
                        promptLatex: t("sp3_04.prompts.buoyancy_core_5"),
                        expressionLatex: `F_{lift} = (\\rho_{air} - \\rho_{hot}) Vg`,
                        targetLatex: `F_{lift}`,
                        slots: [{ id: "force", labelLatex: `F_{lift} \\\\text{ (N)}`, placeholder: "2940", expected: 2940 }],
                        correctLatex: `F_{lift} = 2940 \\\\text{ N}`,
                        hintLatex: [`(1.2 - 0.9) \\times 1000 \\times 9.8`]
                    }
                );
            }

            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "B-A1", difficulty, stage, volume: 0.04,
                        promptLatex: t("sp3_04.prompts.buoyancy_advanced_1"),
                        expressionLatex: `V_{sub} = m/\\rho = 0.05/1000`,
                        targetLatex: `V_{sub}`,
                        slots: [{ id: "vol", labelLatex: `V_{sub} \\\\text{ (m}^3\\\\text{)}`, placeholder: "0.00005", expected: 0.00005 }],
                        correctLatex: `V_{sub} = 5 \\times 10^{-5} \\\\text{ m}^3`,
                        hintLatex: [`\\\\text{At equilibrium: } W = F_b`]
                    },
                    {
                        id: "B-A2", difficulty, stage, volume: 0.1,
                        promptLatex: t("sp3_04.prompts.buoyancy_advanced_2"),
                        expressionLatex: `V = m/\\rho = 50000/1000`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V \\\\text{ (m}^3\\\\text{)}`, placeholder: "50", expected: 50 }],
                        correctLatex: `V = 50 \\\\text{ m}^3`,
                        hintLatex: [`\\\\text{Weight = Buoyant force}`]
                    },
                    {
                        id: "B-A3", difficulty, stage, volume: 0.02,
                        promptLatex: t("sp3_04.prompts.buoyancy_advanced_3"),
                        expressionLatex: `m_{load} = (\\rho_w - \\rho_c) V`,
                        targetLatex: `m_{load}`,
                        slots: [{ id: "mass", labelLatex: `m_{load} \\\\text{ (kg)}`, placeholder: "15", expected: 15 }],
                        correctLatex: `m_{load} = 15 \\\\text{ kg}`,
                        hintLatex: [`(1000 - 250) \\times 0.02`]
                    },
                    {
                        id: "B-A4", difficulty, stage, volume: 0.001,
                        promptLatex: t("sp3_04.prompts.buoyancy_advanced_4"),
                        expressionLatex: `T = W - F_b = mg - \\rho Vg`,
                        targetLatex: `T`,
                        slots: [{ id: "tension", labelLatex: `T \\\\text{ (N)}`, placeholder: "179.34", expected: 179.34 }],
                        correctLatex: `T = 179.34 \\\\text{ N}`,
                        hintLatex: [`19.3 \\times 9.8 - 1000 \\times 0.001 \\times 9.8`]
                    },
                    {
                        id: "B-A5", difficulty, stage, volume: 500,
                        promptLatex: t("sp3_04.prompts.buoyancy_advanced_5"),
                        expressionLatex: `m_{ballast} = \\rho V - m_{sub}`,
                        targetLatex: `m_{ballast}`,
                        slots: [{ id: "mass", labelLatex: `m_{ballast} \\\\text{ (kg)}`, placeholder: "100000", expected: 100000 }],
                        correctLatex: `m_{ballast} = 100000 \\\\text{ kg}`,
                        hintLatex: [`1000 \\times 500 - 400000`]
                    }
                );
            }

            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "B-E1", difficulty, stage, volume: 0.1,
                        promptLatex: t("sp3_04.prompts.buoyancy_elite_1"),
                        expressionLatex: `F_b = (\\rho_w V_w + \\rho_o V_o) g`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\\\text{ (N)}`, placeholder: "882", expected: 882 }],
                        correctLatex: `F_b = 882 \\\\text{ N}`,
                        hintLatex: [`(1000 \\times 0.05 + 800 \\times 0.05) \\times 9.8`]
                    },
                    {
                        id: "B-E2", difficulty, stage, volume: 0.05,
                        promptLatex: t("sp3_04.prompts.buoyancy_elite_2"),
                        expressionLatex: `V = \\\\frac{4}{3}\\pi(R^3 - r^3), \\rho_{avg} = m/V`,
                        targetLatex: `\\\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\\\text{Float?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\\\text{Yes (} \\rho_{avg} < 1000 \\\\text{)}`,
                        hintLatex: [`V \\approx 0.0196 \\\\text{ m}^3, \\rho \\approx 510 \\\\text{ kg/m}^3`]
                    },
                    {
                        id: "B-E3", difficulty, stage, volume: 0.02,
                        promptLatex: t("sp3_04.prompts.buoyancy_elite_3"),
                        expressionLatex: `f_{above} = 1 - \\rho_{ice}/\\rho_{sea}`,
                        targetLatex: `f_{above}`,
                        slots: [{ id: "frac", labelLatex: `f_{above}`, placeholder: "0.126", expected: 0.126 }],
                        correctLatex: `f_{above} = 0.126 \\\\text{ (12.6\\%)}`,
                        hintLatex: [`1 - 900/1030`]
                    },
                    {
                        id: "B-E4", difficulty, stage, volume: 0.001,
                        promptLatex: t("sp3_04.prompts.buoyancy_elite_4"),
                        expressionLatex: `m_{payload} = (\\rho_{air} - \\rho_{He}) V - m_{balloon}`,
                        targetLatex: `m_{payload}`,
                        slots: [{ id: "mass", labelLatex: `m_{payload} \\\\text{ (kg)}`, placeholder: "0.52", expected: 0.52 }],
                        correctLatex: `m_{payload} = 0.52 \\\\text{ kg}`,
                        hintLatex: [`(1.2 - 0.18) \\times 1 - 0.5`]
                    },
                    {
                        id: "B-E5", difficulty, stage, volume: 0.1,
                        promptLatex: t("sp3_04.prompts.buoyancy_elite_5"),
                        expressionLatex: `\\rho = \\\\frac{W_{air}}{W_{air} - W_{water}} \\times \\rho_w`,
                        targetLatex: `\\rho`,
                        slots: [{ id: "density", labelLatex: `\\rho \\\\text{ (kg/m}^3\\\\text{)}`, placeholder: "6667", expected: 6667 }],
                        correctLatex: `\\rho = 6667 \\\\text{ kg/m}^3`,
                        hintLatex: [`10/(10-8.5) \\times 1000`]
                    }
                );
            }
        }

        if (stage === "HYDRAULICS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "H-B1", difficulty, stage, area: 0.01, force: 100,
                        promptLatex: t("sp3_04.prompts.hydraulics_basic_1"),
                        expressionLatex: `P = 100 / 0.01`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `P = 10000 \\\\text{ Pa}`,
                        hintLatex: [`\\\\text{Pressure is force per unit area}`]
                    },
                    {
                        id: "H-B2", difficulty, stage, area: 0.02, force: 200,
                        promptLatex: t("sp3_04.prompts.hydraulics_basic_2"),
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `P = 10000 \\\\text{ Pa}`,
                        hintLatex: [`200/0.02`]
                    },
                    {
                        id: "H-B3", difficulty, stage, area: 0.05, force: 500,
                        promptLatex: t("sp3_04.prompts.hydraulics_basic_3"),
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `P = 10000 \\\\text{ Pa}`,
                        hintLatex: [`500/0.05`]
                    },
                    {
                        id: "H-B4", difficulty, stage, area: 0.1, force: 1000,
                        promptLatex: t("sp3_04.prompts.hydraulics_basic_4"),
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `P = 10000 \\\\text{ Pa}`,
                        hintLatex: [`1000/0.1`]
                    },
                    {
                        id: "H-B5", difficulty, stage, area: 0.005, force: 50,
                        promptLatex: t("sp3_04.prompts.hydraulics_basic_5"),
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\\\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `P = 10000 \\\\text{ Pa}`,
                        hintLatex: [`50/0.005`]
                    }
                );
            }

            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "H-C1", difficulty, stage, area: 0.01, force: 100,
                        promptLatex: t("sp3_04.prompts.hydraulics_core_1"),
                        expressionLatex: `F_2 = F_1 \\times \\\\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "1000", expected: 1000 }],
                        correctLatex: `F_2 = 1000 \\\\text{ N}`,
                        hintLatex: [`100 \\times (0.1/0.01)`]
                    },
                    {
                        id: "H-C2", difficulty, stage, area: 0.005, force: 50,
                        promptLatex: t("sp3_04.prompts.hydraulics_core_2"),
                        expressionLatex: `F_2 = F_1 \\times \\\\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "500", expected: 500 }],
                        correctLatex: `F_2 = 500 \\\\text{ N}`,
                        hintLatex: [`50 \\times (0.05/0.005)`]
                    },
                    {
                        id: "H-C3", difficulty, stage, area: 0.02, force: 200,
                        promptLatex: t("sp3_04.prompts.hydraulics_core_3"),
                        expressionLatex: `F_2 = F_1 \\times \\\\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "2000", expected: 2000 }],
                        correctLatex: `F_2 = 2000 \\\\text{ N}`,
                        hintLatex: [`200 \\times (0.2/0.02)`]
                    },
                    {
                        id: "H-C4", difficulty, stage, area: 0.001, force: 10,
                        promptLatex: t("sp3_04.prompts.hydraulics_core_4"),
                        expressionLatex: `F_2 = F_1 \\times \\\\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "1000", expected: 1000 }],
                        correctLatex: `F_2 = 1000 \\\\text{ N}`,
                        hintLatex: [`10 \\times (0.1/0.001)`]
                    },
                    {
                        id: "H-C5", difficulty, stage, area: 0.03, force: 300,
                        promptLatex: t("sp3_04.prompts.hydraulics_core_5"),
                        expressionLatex: `F_2 = F_1 \\times \\\\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "3000", expected: 3000 }],
                        correctLatex: `F_2 = 3000 \\\\text{ N}`,
                        hintLatex: [`300 \\times (0.3/0.03)`]
                    }
                );
            }

            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "H-A1", difficulty, stage, area: 0.01, force: 100,
                        promptLatex: t("sp3_04.prompts.hydraulics_advanced_1"),
                        expressionLatex: `A_2 = A_1 \\times \\\\frac{F_2}{F_1}`,
                        targetLatex: `A_2`,
                        slots: [{ id: "area", labelLatex: `A_2 \\\\text{ (m}^2\\\\text{)}`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `A_2 = 0.5 \\\\text{ m}^2`,
                        hintLatex: [`0.01 \\times (5000/100)`]
                    },
                    {
                        id: "H-A2", difficulty, stage, area: 0.002, force: 50,
                        promptLatex: t("sp3_04.prompts.hydraulics_advanced_2"),
                        expressionLatex: `d_2 = d_1 \\times \\\\frac{A_1}{A_2}`,
                        targetLatex: `d_2`,
                        slots: [{ id: "dist", labelLatex: `d_2 \\\\text{ (cm)}`, placeholder: "0.1", expected: 0.1 }],
                        correctLatex: `d_2 = 0.1 \\\\text{ cm}`,
                        hintLatex: [`10 \\times (0.002/0.2)`]
                    },
                    {
                        id: "H-A3", difficulty, stage, area: 0.01, force: 200,
                        promptLatex: t("sp3_04.prompts.hydraulics_advanced_3"),
                        expressionLatex: `F_2 = 0.9 \\times F_1 \\times \\\\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "1800", expected: 1800 }],
                        correctLatex: `F_2 = 1800 \\\\text{ N}`,
                        hintLatex: [`0.9 \\times 200 \\times (0.1/0.01)`]
                    },
                    {
                        id: "H-A4", difficulty, stage, area: 0.005, force: 100,
                        promptLatex: t("sp3_04.prompts.hydraulics_advanced_4"),
                        expressionLatex: `MA = \\\\frac{A_2}{A_1}`,
                        targetLatex: `MA`,
                        slots: [{ id: "ma", labelLatex: `MA`, placeholder: "100", expected: 100 }],
                        correctLatex: `MA = 100`,
                        hintLatex: [`0.5/0.005`]
                    },
                    {
                        id: "H-A5", difficulty, stage, area: 0.01, force: 150,
                        promptLatex: t("sp3_04.prompts.hydraulics_advanced_5"),
                        expressionLatex: `W = F_1 \\times d_1`,
                        targetLatex: `W`,
                        slots: [{ id: "work", labelLatex: `W \\\\text{ (J)}`, placeholder: "7.5", expected: 7.5 }],
                        correctLatex: `W = 7.5 \\\\text{ J}`,
                        hintLatex: [`150 \\times 0.05`]
                    }
                );
            }

            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "H-E1", difficulty, stage, area: 0.001, force: 50,
                        promptLatex: t("sp3_04.prompts.hydraulics_elite_1"),
                        expressionLatex: `F_3 = F_1 \\times \\\\frac{A_2}{A_1} \\times \\\\frac{A_3}{A_2}`,
                        targetLatex: `F_3`,
                        slots: [{ id: "force", labelLatex: `F_3 \\\\text{ (N)}`, placeholder: "5000", expected: 5000 }],
                        correctLatex: `F_3 = 5000 \\\\text{ N}`,
                        hintLatex: [`50 \\times (0.1/0.001)`]
                    },
                    {
                        id: "H-E2", difficulty, stage, area: 0.01, force: 200,
                        promptLatex: t("sp3_04.prompts.hydraulics_elite_2"),
                        expressionLatex: `F_2 = F_1 \\times \\\\frac{A_2}{A_1} - F_{friction}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "1900", expected: 1900 }],
                        correctLatex: `F_2 = 1900 \\\\text{ N}`,
                        hintLatex: [`200 \\times 10 - 100`]
                    },
                    {
                        id: "H-E3", difficulty, stage, area: 0.005, force: 100,
                        promptLatex: t("sp3_04.prompts.hydraulics_elite_3"),
                        expressionLatex: `F_2 = P \\times A_2`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\\\text{ (N)}`, placeholder: "100000", expected: 100000 }],
                        correctLatex: `F_2 = 100000 \\\\text{ N}`,
                        hintLatex: [`2 \\times 10^6 \\times 0.05`]
                    },
                    {
                        id: "H-E4", difficulty, stage, area: 0.01, force: 500,
                        promptLatex: t("sp3_04.prompts.hydraulics_elite_4"),
                        expressionLatex: `F_{net} = F_{applied} - F_{resistance}`,
                        targetLatex: `F_{net}`,
                        slots: [{ id: "force", labelLatex: `F_{net} \\\\text{ (N)}`, placeholder: "300", expected: 300 }],
                        correctLatex: `F_{net} = 300 \\\\text{ N}`,
                        hintLatex: [`500 - 200`]
                    },
                    {
                        id: "H-E5", difficulty, stage, area: 0.002, force: 100,
                        promptLatex: t("sp3_04.prompts.hydraulics_elite_5"),
                        expressionLatex: `MA_{total} = \\\\frac{A_3}{A_1}`,
                        targetLatex: `MA`,
                        slots: [{ id: "ma", labelLatex: `MA`, placeholder: "100", expected: 100 }],
                        correctLatex: `MA = 100`,
                        hintLatex: [`0.2/0.002`]
                    }
                );
            }
        }

        return quests;
    }, []);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(d, s, t), [buildStagePool, t]);

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
      requestAiFeedback
    } = useQuestManager<SP304Quest, Stage>({
    moduleCode: "sp3-04",
        buildPool,
        initialStage: "PRESSURE",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sp3-04", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "PRESSURE" as Stage, label: t("sp3_04.stages.pressure") },
        { id: "BUOYANCY" as Stage, label: t("sp3_04.stages.buoyancy") },
        { id: "HYDRAULICS" as Stage, label: t("sp3_04.stages.hydraulics") },
    ], [t]);

    if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t("sp3_04.title")}
            moduleCode="SP3.04"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sp3_04.footer_left")}
            translations={{
                back: t("sp3_04.back"),
                check: t("sp3_04.check"),
                next: t("sp3_04.next"),
                correct: t("sp3_04.correct"),
                incorrect: t("sp3_04.incorrect"),
                difficulty: {
                    basic: t("sp3_04.difficulty.basic"),
                    core: t("sp3_04.difficulty.core"),
                    advanced: t("sp3_04.difficulty.advanced"),
                    elite: t("sp3_04.difficulty.elite"),
                },
            }}
            monitorContent={
                <PressureBuoyancyCanvas
                    stage={stage.toLowerCase()}
                    depth={currentQuest?.depth || 0}
                    objectDensity={1000}
                    pistonForce={currentQuest?.force || 0}
                    translations={{
                        title: t("sp3_04.title"),
                        stages: {
                            pressure: t("sp3_04.stages.pressure"),
                            buoyancy: t("sp3_04.stages.buoyancy"),
                            hydraulics: t("sp3_04.stages.hydraulics"),
                        },
                        difficulty: {
                            basic: t("sp3_04.difficulty.basic"),
                            core: t("sp3_04.difficulty.core"),
                            advanced: t("sp3_04.difficulty.advanced"),
                            elite: t("sp3_04.difficulty.elite"),
                        },
                        back: t("sp3_04.back"),
                        check: t("sp3_04.check"),
                        next: t("sp3_04.next"),
                        correct: t("sp3_04.correct"),
                        incorrect: t("sp3_04.incorrect"),
                        footer_left: t("sp3_04.footer_left"),
                    }}
                />
            }
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        <InlineMath math={currentQuest?.promptLatex || ""} />
                    </div>
                    <div className="text-cyan-300">
                        <InlineMath math={currentQuest?.expressionLatex || ""} />
                    </div>
                    <div className="space-y-3">
                        {currentQuest?.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-3">
                                <InlineMath math={slot.labelLatex} />
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
