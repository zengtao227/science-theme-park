"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
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

type SP304T = typeof translations.EN.sp3_04;

export default function SP304Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sp3_04 || translations.EN.sp3_04) as SP304T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SP304Quest[] => {
        const quests: SP304Quest[] = [];

        if (stage === "PRESSURE") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "P-B1", difficulty, stage, depth: 10,
                        promptLatex: `P = \\rho gh. \\text{ If } h = 10 \\text{ m, } \\rho = 1000 \\text{ kg/m}^3, \\text{ find gauge pressure } P.`,
                        expressionLatex: `P = 1000 \\times 9.8 \\times 10`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "98000", expected: 98000 }],
                        correctLatex: `P = 98000 \\text{ Pa}`,
                        hintLatex: [`P = \\rho gh`]
                    },
                    {
                        id: "P-B2", difficulty, stage, depth: 5,
                        promptLatex: `\\text{Water depth 5 m. Pressure? } (\\rho = 1000 \\text{ kg/m}^3, g = 10 \\text{ m/s}^2)`,
                        expressionLatex: `P = \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "50000", expected: 50000 }],
                        correctLatex: `P = 50000 \\text{ Pa}`,
                        hintLatex: [`P = 1000 \\times 10 \\times 5`]
                    },
                    {
                        id: "P-B3", difficulty, stage, area: 2, force: 100,
                        promptLatex: `\\text{Force 100 N on area 2 m}^2. \\text{ Pressure?}`,
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "50", expected: 50 }],
                        correctLatex: `P = 50 \\text{ Pa}`,
                        hintLatex: [`P = 100/2`]
                    },
                    {
                        id: "P-B4", difficulty, stage, area: 0.5, force: 200,
                        promptLatex: `\\text{Force 200 N on area 0.5 m}^2. \\text{ Pressure?}`,
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "400", expected: 400 }],
                        correctLatex: `P = 400 \\text{ Pa}`,
                        hintLatex: [`P = 200/0.5`]
                    },
                    {
                        id: "P-B5", difficulty, stage, depth: 2,
                        promptLatex: `\\text{Diver at 2 m depth. Gauge pressure? } (\\rho = 1000, g = 10)`,
                        expressionLatex: `P = \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "20000", expected: 20000 }],
                        correctLatex: `P = 20000 \\text{ Pa}`,
                        hintLatex: [`P = 1000 \\times 10 \\times 2`]
                    }
                );
            }
            
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "P-C1", difficulty, stage, depth: 15,
                        promptLatex: `\\text{Submarine at 15 m depth. Total pressure? } (P_{atm} = 101000 \\text{ Pa})`,
                        expressionLatex: `P_{total} = P_{atm} + \\rho gh`,
                        targetLatex: `P_{total}`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "248000", expected: 248000 }],
                        correctLatex: `P = 248000 \\text{ Pa}`,
                        hintLatex: [`101000 + 1000 \\times 9.8 \\times 15`]
                    },
                    {
                        id: "P-C2", difficulty, stage, area: 0.01, force: 500,
                        promptLatex: `\\text{Hydraulic press: 500 N on 0.01 m}^2. \\text{ Pressure?}`,
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "50000", expected: 50000 }],
                        correctLatex: `P = 50000 \\text{ Pa}`,
                        hintLatex: [`P = 500/0.01`]
                    },
                    {
                        id: "P-C3", difficulty, stage, depth: 20,
                        promptLatex: `\\text{Oil tank depth 20 m. Pressure at bottom? } (\\rho_{oil} = 800 \\text{ kg/m}^3)`,
                        expressionLatex: `P = \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "156800", expected: 156800 }],
                        correctLatex: `P = 156800 \\text{ Pa}`,
                        hintLatex: [`P = 800 \\times 9.8 \\times 20`]
                    },
                    {
                        id: "P-C4", difficulty, stage, area: 0.02, force: 1000,
                        promptLatex: `\\text{Piston: 1000 N on 0.02 m}^2. \\text{ Pressure transmitted?}`,
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "50000", expected: 50000 }],
                        correctLatex: `P = 50000 \\text{ Pa}`,
                        hintLatex: [`P = 1000/0.02`]
                    },
                    {
                        id: "P-C5", difficulty, stage, depth: 100,
                        promptLatex: `\\text{Ocean depth 100 m. Gauge pressure? } (\\rho = 1030 \\text{ kg/m}^3)`,
                        expressionLatex: `P = \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "1009400", expected: 1009400 }],
                        correctLatex: `P = 1009400 \\text{ Pa}`,
                        hintLatex: [`P = 1030 \\times 9.8 \\times 100`]
                    }
                );
            }
            
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "P-A1", difficulty, stage, depth: 50,
                        promptLatex: `\\text{Two-layer fluid: 30 m water + 20 m oil } (\\rho_w = 1000, \\rho_o = 800). \\text{ Pressure at bottom?}`,
                        expressionLatex: `P = \\rho_w g h_w + \\rho_o g h_o`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "450800", expected: 450800 }],
                        correctLatex: `P = 450800 \\text{ Pa}`,
                        hintLatex: [`1000 \\times 9.8 \\times 30 + 800 \\times 9.8 \\times 20`]
                    },
                    {
                        id: "P-A2", difficulty, stage, area: 0.001, force: 100,
                        promptLatex: `\\text{Hydraulic lift: small piston 0.001 m}^2, \\text{ large piston 0.1 m}^2. \\text{ Force 100 N on small. Force on large?}`,
                        expressionLatex: `F_2 = F_1 \\times \\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `F_2 = 10000 \\text{ N}`,
                        hintLatex: [`100 \\times (0.1/0.001)`]
                    },
                    {
                        id: "P-A3", difficulty, stage, depth: 10,
                        promptLatex: `\\text{U-tube: water on left, mercury on right. Water height 10 m. Mercury height? } (\\rho_w = 1000, \\rho_{Hg} = 13600)`,
                        expressionLatex: `\\rho_w h_w = \\rho_{Hg} h_{Hg}`,
                        targetLatex: `h_{Hg}`,
                        slots: [{ id: "height", labelLatex: `h_{Hg} \\text{ (m)}`, placeholder: "0.735", expected: 0.735 }],
                        correctLatex: `h_{Hg} = 0.735 \\text{ m}`,
                        hintLatex: [`h_{Hg} = 1000 \\times 10 / 13600`]
                    },
                    {
                        id: "P-A4", difficulty, stage, area: 0.05, force: 2000,
                        promptLatex: `\\text{Hydraulic brake: master cylinder 0.01 m}^2, \\text{ slave cylinder 0.05 m}^2. \\text{ Force 200 N on master. Force on slave?}`,
                        expressionLatex: `F_2 = F_1 \\times \\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "1000", expected: 1000 }],
                        correctLatex: `F_2 = 1000 \\text{ N}`,
                        hintLatex: [`200 \\times (0.05/0.01)`]
                    },
                    {
                        id: "P-A5", difficulty, stage, depth: 200,
                        promptLatex: `\\text{Deep ocean: 200 m depth. Total pressure? } (P_{atm} = 101000, \\rho = 1030)`,
                        expressionLatex: `P = P_{atm} + \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "2119800", expected: 2119800 }],
                        correctLatex: `P = 2119800 \\text{ Pa}`,
                        hintLatex: [`101000 + 1030 \\times 9.8 \\times 200`]
                    }
                );
            }
            
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "P-E1", difficulty, stage, depth: 11000,
                        promptLatex: `\\text{Mariana Trench: 11000 m depth. Pressure? } (\\rho = 1050, P_{atm} = 101000)`,
                        expressionLatex: `P = P_{atm} + \\rho gh`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (MPa)}`, placeholder: "113.1", expected: 113.1 }],
                        correctLatex: `P = 113.1 \\text{ MPa}`,
                        hintLatex: [`(101000 + 1050 \\times 9.8 \\times 11000) / 10^6`]
                    },
                    {
                        id: "P-E2", difficulty, stage, area: 0.0001, force: 50,
                        promptLatex: `\\text{Hydraulic system: A}_1 = 0.0001 \\text{ m}^2, A_2 = 0.01 \\text{ m}^2. \\text{ Mechanical advantage?}`,
                        expressionLatex: `MA = \\frac{A_2}{A_1}`,
                        targetLatex: `MA`,
                        slots: [{ id: "ma", labelLatex: `MA`, placeholder: "100", expected: 100 }],
                        correctLatex: `MA = 100`,
                        hintLatex: [`0.01 / 0.0001`]
                    },
                    {
                        id: "P-E3", difficulty, stage, depth: 5,
                        promptLatex: `\\text{Three-layer fluid: 2 m water, 2 m oil } (\\rho = 800), \\text{ 1 m mercury } (\\rho = 13600). \\text{ Total pressure?}`,
                        expressionLatex: `P = \\sum \\rho_i g h_i`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "168880", expected: 168880 }],
                        correctLatex: `P = 168880 \\text{ Pa}`,
                        hintLatex: [`1000 \\times 9.8 \\times 2 + 800 \\times 9.8 \\times 2 + 13600 \\times 9.8 \\times 1`]
                    },
                    {
                        id: "P-E4", difficulty, stage, area: 0.002, force: 500,
                        promptLatex: `\\text{Hydraulic jack: efficiency 80\\%. Input 500 N on 0.002 m}^2, \\text{ output area 0.2 m}^2. \\text{ Output force?}`,
                        expressionLatex: `F_2 = 0.8 \\times F_1 \\times \\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "40000", expected: 40000 }],
                        correctLatex: `F_2 = 40000 \\text{ N}`,
                        hintLatex: [`0.8 \\times 500 \\times (0.2/0.002)`]
                    },
                    {
                        id: "P-E5", difficulty, stage, depth: 1000,
                        promptLatex: `\\text{Submarine at 1000 m. Pressure difference across 1 m}^2 \\text{ hatch? } (\\rho = 1030)`,
                        expressionLatex: `F = (P_{water} - P_{atm}) \\times A`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F \\text{ (MN)}`, placeholder: "10.09", expected: 10.09 }],
                        correctLatex: `F = 10.09 \\text{ MN}`,
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
                        promptLatex: `F_b = \\rho Vg. \\text{ If } V = 0.1 \\text{ m}^3, \\rho = 1000, \\text{ find buoyant force } F_b.`,
                        expressionLatex: `F_b = 1000 \\times 0.1 \\times 9.8`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\text{ (N)}`, placeholder: "980", expected: 980 }],
                        correctLatex: `F_b = 980 \\text{ N}`,
                        hintLatex: [`\\text{Archimedes' Principle}`]
                    },
                    {
                        id: "B-B2", difficulty, stage, volume: 0.05,
                        promptLatex: `\\text{Object volume 0.05 m}^3 \\text{ in water. Buoyant force?}`,
                        expressionLatex: `F_b = \\rho Vg`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\text{ (N)}`, placeholder: "490", expected: 490 }],
                        correctLatex: `F_b = 490 \\text{ N}`,
                        hintLatex: [`1000 \\times 0.05 \\times 9.8`]
                    },
                    {
                        id: "B-B3", difficulty, stage, volume: 0.2,
                        promptLatex: `\\text{Balloon volume 0.2 m}^3 \\text{ in air } (\\rho = 1.2 \\text{ kg/m}^3). \\text{ Buoyant force?}`,
                        expressionLatex: `F_b = \\rho Vg`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\text{ (N)}`, placeholder: "2.35", expected: 2.35 }],
                        correctLatex: `F_b = 2.35 \\text{ N}`,
                        hintLatex: [`1.2 \\times 0.2 \\times 9.8`]
                    },
                    {
                        id: "B-B4", difficulty, stage, volume: 0.01,
                        promptLatex: `\\text{Rock volume 0.01 m}^3 \\text{ submerged in water. Buoyant force?}`,
                        expressionLatex: `F_b = \\rho Vg`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\text{ (N)}`, placeholder: "98", expected: 98 }],
                        correctLatex: `F_b = 98 \\text{ N}`,
                        hintLatex: [`1000 \\times 0.01 \\times 9.8`]
                    },
                    {
                        id: "B-B5", difficulty, stage, volume: 0.5,
                        promptLatex: `\\text{Boat displaces 0.5 m}^3 \\text{ of water. Buoyant force?}`,
                        expressionLatex: `F_b = \\rho Vg`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\text{ (N)}`, placeholder: "4900", expected: 4900 }],
                        correctLatex: `F_b = 4900 \\text{ N}`,
                        hintLatex: [`1000 \\times 0.5 \\times 9.8`]
                    }
                );
            }
            
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "B-C1", difficulty, stage, volume: 0.02,
                        promptLatex: `\\text{Wood block: mass 10 kg, volume 0.02 m}^3. \\text{ Will it float in water?}`,
                        expressionLatex: `\\rho_{wood} = m/V = 10/0.02 = 500 < 1000`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Float?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{Yes (density < water)}`,
                        hintLatex: [`\\text{Compare densities}`]
                    },
                    {
                        id: "B-C2", difficulty, stage, volume: 0.1,
                        promptLatex: `\\text{Object: weight 1500 N, volume 0.1 m}^3 \\text{ in water. Net force?}`,
                        expressionLatex: `F_{net} = F_b - W = 980 - 1500`,
                        targetLatex: `F_{net}`,
                        slots: [{ id: "force", labelLatex: `F_{net} \\text{ (N)}`, placeholder: "-520", expected: -520 }],
                        correctLatex: `F_{net} = -520 \\text{ N (sinks)}`,
                        hintLatex: [`F_b = 1000 \\times 0.1 \\times 9.8 = 980`]
                    },
                    {
                        id: "B-C3", difficulty, stage, volume: 0.05,
                        promptLatex: `\\text{Ice cube: density 900 kg/m}^3, \\text{ volume 0.05 m}^3. \\text{ Fraction submerged in water?}`,
                        expressionLatex: `f = \\rho_{ice}/\\rho_{water}`,
                        targetLatex: `f`,
                        slots: [{ id: "frac", labelLatex: `f`, placeholder: "0.9", expected: 0.9 }],
                        correctLatex: `f = 0.9 \\text{ (90\\%)}`,
                        hintLatex: [`900/1000`]
                    },
                    {
                        id: "B-C4", difficulty, stage, volume: 0.03,
                        promptLatex: `\\text{Aluminum block: mass 81 kg, volume 0.03 m}^3. \\text{ Apparent weight in water?}`,
                        expressionLatex: `W_{app} = W - F_b = mg - \\rho Vg`,
                        targetLatex: `W_{app}`,
                        slots: [{ id: "weight", labelLatex: `W_{app} \\text{ (N)}`, placeholder: "500", expected: 500 }],
                        correctLatex: `W_{app} = 500 \\text{ N}`,
                        hintLatex: [`81 \\times 9.8 - 1000 \\times 0.03 \\times 9.8`]
                    },
                    {
                        id: "B-C5", difficulty, stage, volume: 1,
                        promptLatex: `\\text{Hot air balloon: volume 1000 m}^3, \\rho_{air} = 1.2, \\rho_{hot} = 0.9. \\text{ Lift force?}`,
                        expressionLatex: `F_{lift} = (\\rho_{air} - \\rho_{hot}) Vg`,
                        targetLatex: `F_{lift}`,
                        slots: [{ id: "force", labelLatex: `F_{lift} \\text{ (N)}`, placeholder: "2940", expected: 2940 }],
                        correctLatex: `F_{lift} = 2940 \\text{ N}`,
                        hintLatex: [`(1.2 - 0.9) \\times 1000 \\times 9.8`]
                    }
                );
            }
            
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "B-A1", difficulty, stage, volume: 0.04,
                        promptLatex: `\\text{Hydrometer: mass 50 g, volume 40 cm}^3. \\text{ Depth submerged in water?}`,
                        expressionLatex: `V_{sub} = m/\\rho = 0.05/1000`,
                        targetLatex: `V_{sub}`,
                        slots: [{ id: "vol", labelLatex: `V_{sub} \\text{ (m}^3\\text{)}`, placeholder: "0.00005", expected: 0.00005 }],
                        correctLatex: `V_{sub} = 5 \\times 10^{-5} \\text{ m}^3`,
                        hintLatex: [`\\text{At equilibrium: } W = F_b`]
                    },
                    {
                        id: "B-A2", difficulty, stage, volume: 0.1,
                        promptLatex: `\\text{Ship: mass 50000 kg. Volume of water displaced?}`,
                        expressionLatex: `V = m/\\rho = 50000/1000`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V \\text{ (m}^3\\text{)}`, placeholder: "50", expected: 50 }],
                        correctLatex: `V = 50 \\text{ m}^3`,
                        hintLatex: [`\\text{Weight = Buoyant force}`]
                    },
                    {
                        id: "B-A3", difficulty, stage, volume: 0.02,
                        promptLatex: `\\text{Cork: density 250 kg/m}^3, \\text{ volume 0.02 m}^3 \\text{ in water. Maximum load before sinking?}`,
                        expressionLatex: `m_{load} = (\\rho_w - \\rho_c) V`,
                        targetLatex: `m_{load}`,
                        slots: [{ id: "mass", labelLatex: `m_{load} \\text{ (kg)}`, placeholder: "15", expected: 15 }],
                        correctLatex: `m_{load} = 15 \\text{ kg}`,
                        hintLatex: [`(1000 - 250) \\times 0.02`]
                    },
                    {
                        id: "B-A4", difficulty, stage, volume: 0.001,
                        promptLatex: `\\text{Gold nugget: mass 19.3 kg, volume 0.001 m}^3. \\text{ Tension in string when submerged?}`,
                        expressionLatex: `T = W - F_b = mg - \\rho Vg`,
                        targetLatex: `T`,
                        slots: [{ id: "tension", labelLatex: `T \\text{ (N)}`, placeholder: "179.34", expected: 179.34 }],
                        correctLatex: `T = 179.34 \\text{ N}`,
                        hintLatex: [`19.3 \\times 9.8 - 1000 \\times 0.001 \\times 9.8`]
                    },
                    {
                        id: "B-A5", difficulty, stage, volume: 500,
                        promptLatex: `\\text{Submarine: volume 500 m}^3, \\text{ mass 400000 kg. Ballast water needed to submerge?}`,
                        expressionLatex: `m_{ballast} = \\rho V - m_{sub}`,
                        targetLatex: `m_{ballast}`,
                        slots: [{ id: "mass", labelLatex: `m_{ballast} \\text{ (kg)}`, placeholder: "100000", expected: 100000 }],
                        correctLatex: `m_{ballast} = 100000 \\text{ kg}`,
                        hintLatex: [`1000 \\times 500 - 400000`]
                    }
                );
            }
            
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "B-E1", difficulty, stage, volume: 0.1,
                        promptLatex: `\\text{Two-fluid system: object half in water, half in oil } (\\rho_o = 800). \\text{ Total buoyant force if } V = 0.1 \\text{ m}^3?`,
                        expressionLatex: `F_b = (\\rho_w V_w + \\rho_o V_o) g`,
                        targetLatex: `F_b`,
                        slots: [{ id: "force", labelLatex: `F_b \\text{ (N)}`, placeholder: "882", expected: 882 }],
                        correctLatex: `F_b = 882 \\text{ N}`,
                        hintLatex: [`(1000 \\times 0.05 + 800 \\times 0.05) \\times 9.8`]
                    },
                    {
                        id: "B-E2", difficulty, stage, volume: 0.05,
                        promptLatex: `\\text{Hollow sphere: outer radius 0.2 m, inner radius 0.15 m, mass 10 kg. Will it float?}`,
                        expressionLatex: `V = \\frac{4}{3}\\pi(R^3 - r^3), \\rho_{avg} = m/V`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Float?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{Yes (} \\rho_{avg} < 1000 \\text{)}`,
                        hintLatex: [`V \\approx 0.0196 \\text{ m}^3, \\rho \\approx 510 \\text{ kg/m}^3`]
                    },
                    {
                        id: "B-E3", difficulty, stage, volume: 0.02,
                        promptLatex: `\\text{Iceberg: density 900 kg/m}^3 \\text{ in seawater } (\\rho = 1030). \\text{ Fraction above water?}`,
                        expressionLatex: `f_{above} = 1 - \\rho_{ice}/\\rho_{sea}`,
                        targetLatex: `f_{above}`,
                        slots: [{ id: "frac", labelLatex: `f_{above}`, placeholder: "0.126", expected: 0.126 }],
                        correctLatex: `f_{above} = 0.126 \\text{ (12.6\\%)}`,
                        hintLatex: [`1 - 900/1030`]
                    },
                    {
                        id: "B-E4", difficulty, stage, volume: 0.001,
                        promptLatex: `\\text{Helium balloon: volume 1 m}^3, \\rho_{He} = 0.18, \\rho_{air} = 1.2, \\text{ balloon mass 0.5 kg. Max payload?}`,
                        expressionLatex: `m_{payload} = (\\rho_{air} - \\rho_{He}) V - m_{balloon}`,
                        targetLatex: `m_{payload}`,
                        slots: [{ id: "mass", labelLatex: `m_{payload} \\text{ (kg)}`, placeholder: "0.52", expected: 0.52 }],
                        correctLatex: `m_{payload} = 0.52 \\text{ kg}`,
                        hintLatex: [`(1.2 - 0.18) \\times 1 - 0.5`]
                    },
                    {
                        id: "B-E5", difficulty, stage, volume: 0.1,
                        promptLatex: `\\text{Archimedes' crown: weight in air 10 N, in water 8.5 N. Density?}`,
                        expressionLatex: `\\rho = \\frac{W_{air}}{W_{air} - W_{water}} \\times \\rho_w`,
                        targetLatex: `\\rho`,
                        slots: [{ id: "density", labelLatex: `\\rho \\text{ (kg/m}^3\\text{)}`, placeholder: "6667", expected: 6667 }],
                        correctLatex: `\\rho = 6667 \\text{ kg/m}^3`,
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
                        promptLatex: `P = F/A. \\text{ If } F = 100 \\text{ N on } A = 0.01 \\text{ m}^2, \\text{ find pressure } P.`,
                        expressionLatex: `P = 100 / 0.01`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `P = 10000 \\text{ Pa}`,
                        hintLatex: [`\\text{Pressure is force per unit area}`]
                    },
                    {
                        id: "H-B2", difficulty, stage, area: 0.02, force: 200,
                        promptLatex: `\\text{Hydraulic press: 200 N on 0.02 m}^2. \\text{ Pressure?}`,
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `P = 10000 \\text{ Pa}`,
                        hintLatex: [`200/0.02`]
                    },
                    {
                        id: "H-B3", difficulty, stage, area: 0.05, force: 500,
                        promptLatex: `\\text{Piston: 500 N on 0.05 m}^2. \\text{ Pressure?}`,
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `P = 10000 \\text{ Pa}`,
                        hintLatex: [`500/0.05`]
                    },
                    {
                        id: "H-B4", difficulty, stage, area: 0.1, force: 1000,
                        promptLatex: `\\text{Hydraulic cylinder: 1000 N on 0.1 m}^2. \\text{ Pressure?}`,
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `P = 10000 \\text{ Pa}`,
                        hintLatex: [`1000/0.1`]
                    },
                    {
                        id: "H-B5", difficulty, stage, area: 0.005, force: 50,
                        promptLatex: `\\text{Small piston: 50 N on 0.005 m}^2. \\text{ Pressure?}`,
                        expressionLatex: `P = F/A`,
                        targetLatex: `P`,
                        slots: [{ id: "press", labelLatex: `P \\text{ (Pa)}`, placeholder: "10000", expected: 10000 }],
                        correctLatex: `P = 10000 \\text{ Pa}`,
                        hintLatex: [`50/0.005`]
                    }
                );
            }
            
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "H-C1", difficulty, stage, area: 0.01, force: 100,
                        promptLatex: `\\text{Hydraulic lift: } A_1 = 0.01 \\text{ m}^2, A_2 = 0.1 \\text{ m}^2, F_1 = 100 \\text{ N. Find } F_2.`,
                        expressionLatex: `F_2 = F_1 \\times \\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "1000", expected: 1000 }],
                        correctLatex: `F_2 = 1000 \\text{ N}`,
                        hintLatex: [`100 \\times (0.1/0.01)`]
                    },
                    {
                        id: "H-C2", difficulty, stage, area: 0.005, force: 50,
                        promptLatex: `\\text{Hydraulic brake: } A_1 = 0.005 \\text{ m}^2, A_2 = 0.05 \\text{ m}^2, F_1 = 50 \\text{ N. Find } F_2.`,
                        expressionLatex: `F_2 = F_1 \\times \\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "500", expected: 500 }],
                        correctLatex: `F_2 = 500 \\text{ N}`,
                        hintLatex: [`50 \\times (0.05/0.005)`]
                    },
                    {
                        id: "H-C3", difficulty, stage, area: 0.02, force: 200,
                        promptLatex: `\\text{Hydraulic jack: } A_1 = 0.02 \\text{ m}^2, A_2 = 0.2 \\text{ m}^2, F_1 = 200 \\text{ N. Find } F_2.`,
                        expressionLatex: `F_2 = F_1 \\times \\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "2000", expected: 2000 }],
                        correctLatex: `F_2 = 2000 \\text{ N}`,
                        hintLatex: [`200 \\times (0.2/0.02)`]
                    },
                    {
                        id: "H-C4", difficulty, stage, area: 0.001, force: 10,
                        promptLatex: `\\text{Hydraulic press: } A_1 = 0.001 \\text{ m}^2, A_2 = 0.1 \\text{ m}^2, F_1 = 10 \\text{ N. Find } F_2.`,
                        expressionLatex: `F_2 = F_1 \\times \\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "1000", expected: 1000 }],
                        correctLatex: `F_2 = 1000 \\text{ N}`,
                        hintLatex: [`10 \\times (0.1/0.001)`]
                    },
                    {
                        id: "H-C5", difficulty, stage, area: 0.03, force: 300,
                        promptLatex: `\\text{Hydraulic system: } A_1 = 0.03 \\text{ m}^2, A_2 = 0.3 \\text{ m}^2, F_1 = 300 \\text{ N. Find } F_2.`,
                        expressionLatex: `F_2 = F_1 \\times \\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "3000", expected: 3000 }],
                        correctLatex: `F_2 = 3000 \\text{ N}`,
                        hintLatex: [`300 \\times (0.3/0.03)`]
                    }
                );
            }
            
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "H-A1", difficulty, stage, area: 0.01, force: 100,
                        promptLatex: `\\text{Hydraulic lift: } A_1 = 0.01 \\text{ m}^2, F_1 = 100 \\text{ N, } F_2 = 5000 \\text{ N. Find } A_2.`,
                        expressionLatex: `A_2 = A_1 \\times \\frac{F_2}{F_1}`,
                        targetLatex: `A_2`,
                        slots: [{ id: "area", labelLatex: `A_2 \\text{ (m}^2\\text{)}`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `A_2 = 0.5 \\text{ m}^2`,
                        hintLatex: [`0.01 \\times (5000/100)`]
                    },
                    {
                        id: "H-A2", difficulty, stage, area: 0.002, force: 50,
                        promptLatex: `\\text{Hydraulic system: } A_1 = 0.002 \\text{ m}^2, A_2 = 0.2 \\text{ m}^2, \\text{ piston 1 moves 10 cm. Piston 2 moves?}`,
                        expressionLatex: `d_2 = d_1 \\times \\frac{A_1}{A_2}`,
                        targetLatex: `d_2`,
                        slots: [{ id: "dist", labelLatex: `d_2 \\text{ (cm)}`, placeholder: "0.1", expected: 0.1 }],
                        correctLatex: `d_2 = 0.1 \\text{ cm}`,
                        hintLatex: [`10 \\times (0.002/0.2)`]
                    },
                    {
                        id: "H-A3", difficulty, stage, area: 0.01, force: 200,
                        promptLatex: `\\text{Hydraulic press: efficiency 90\\%. } A_1 = 0.01 \\text{ m}^2, A_2 = 0.1 \\text{ m}^2, F_1 = 200 \\text{ N. Find } F_2.`,
                        expressionLatex: `F_2 = 0.9 \\times F_1 \\times \\frac{A_2}{A_1}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "1800", expected: 1800 }],
                        correctLatex: `F_2 = 1800 \\text{ N}`,
                        hintLatex: [`0.9 \\times 200 \\times (0.1/0.01)`]
                    },
                    {
                        id: "H-A4", difficulty, stage, area: 0.005, force: 100,
                        promptLatex: `\\text{Hydraulic jack: } A_1 = 0.005 \\text{ m}^2, A_2 = 0.5 \\text{ m}^2, F_1 = 100 \\text{ N. Mechanical advantage?}`,
                        expressionLatex: `MA = \\frac{A_2}{A_1}`,
                        targetLatex: `MA`,
                        slots: [{ id: "ma", labelLatex: `MA`, placeholder: "100", expected: 100 }],
                        correctLatex: `MA = 100`,
                        hintLatex: [`0.5/0.005`]
                    },
                    {
                        id: "H-A5", difficulty, stage, area: 0.01, force: 150,
                        promptLatex: `\\text{Hydraulic brake: } A_1 = 0.01 \\text{ m}^2, A_2 = 0.04 \\text{ m}^2, F_1 = 150 \\text{ N, } d_1 = 5 \\text{ cm. Work done?}`,
                        expressionLatex: `W = F_1 \\times d_1`,
                        targetLatex: `W`,
                        slots: [{ id: "work", labelLatex: `W \\text{ (J)}`, placeholder: "7.5", expected: 7.5 }],
                        correctLatex: `W = 7.5 \\text{ J}`,
                        hintLatex: [`150 \\times 0.05`]
                    }
                );
            }
            
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "H-E1", difficulty, stage, area: 0.001, force: 50,
                        promptLatex: `\\text{Multi-stage hydraulic: } A_1 = 0.001, A_2 = 0.01, A_3 = 0.1 \\text{ m}^2, F_1 = 50 \\text{ N. Find } F_3.`,
                        expressionLatex: `F_3 = F_1 \\times \\frac{A_2}{A_1} \\times \\frac{A_3}{A_2}`,
                        targetLatex: `F_3`,
                        slots: [{ id: "force", labelLatex: `F_3 \\text{ (N)}`, placeholder: "5000", expected: 5000 }],
                        correctLatex: `F_3 = 5000 \\text{ N}`,
                        hintLatex: [`50 \\times (0.1/0.001)`]
                    },
                    {
                        id: "H-E2", difficulty, stage, area: 0.01, force: 200,
                        promptLatex: `\\text{Hydraulic system with friction: } A_1 = 0.01, A_2 = 0.1 \\text{ m}^2, F_1 = 200 \\text{ N, friction } = 100 \\text{ N. Net } F_2?`,
                        expressionLatex: `F_2 = F_1 \\times \\frac{A_2}{A_1} - F_{friction}`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "1900", expected: 1900 }],
                        correctLatex: `F_2 = 1900 \\text{ N}`,
                        hintLatex: [`200 \\times 10 - 100`]
                    },
                    {
                        id: "H-E3", difficulty, stage, area: 0.005, force: 100,
                        promptLatex: `\\text{Hydraulic accumulator: } A_1 = 0.005, A_2 = 0.05 \\text{ m}^2, \\text{ pressure } = 2 \\times 10^6 \\text{ Pa. Force on } A_2?`,
                        expressionLatex: `F_2 = P \\times A_2`,
                        targetLatex: `F_2`,
                        slots: [{ id: "force", labelLatex: `F_2 \\text{ (N)}`, placeholder: "100000", expected: 100000 }],
                        correctLatex: `F_2 = 100000 \\text{ N}`,
                        hintLatex: [`2 \\times 10^6 \\times 0.05`]
                    },
                    {
                        id: "H-E4", difficulty, stage, area: 0.01, force: 500,
                        promptLatex: `\\text{Hydraulic damper: } A = 0.01 \\text{ m}^2, \\text{ velocity } = 0.5 \\text{ m/s, viscosity creates } 200 \\text{ N resistance. Net force?}`,
                        expressionLatex: `F_{net} = F_{applied} - F_{resistance}`,
                        targetLatex: `F_{net}`,
                        slots: [{ id: "force", labelLatex: `F_{net} \\text{ (N)}`, placeholder: "300", expected: 300 }],
                        correctLatex: `F_{net} = 300 \\text{ N}`,
                        hintLatex: [`500 - 200`]
                    },
                    {
                        id: "H-E5", difficulty, stage, area: 0.002, force: 100,
                        promptLatex: `\\text{Hydraulic circuit: } A_1 = 0.002, A_2 = 0.02, A_3 = 0.2 \\text{ m}^2 \\text{ in series. } F_1 = 100 \\text{ N. Total MA?}`,
                        expressionLatex: `MA_{total} = \\frac{A_3}{A_1}`,
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
    } = useQuestManager<SP304Quest, Stage>({
        buildPool,
        initialStage: "PRESSURE",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sp3-04", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "PRESSURE" as Stage, label: t.stages.pressure },
        { id: "BUOYANCY" as Stage, label: t.stages.buoyancy },
        { id: "HYDRAULICS" as Stage, label: t.stages.hydraulics },
    ], [t.stages]);

    if (!currentQuest) return <div className="p-20 text-white">Loading...</div>;

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SP3.04"
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
            monitorContent={
                <PressureBuoyancyCanvas
                    stage={stage.toLowerCase()}
                    depth={currentQuest.depth || 0}
                    objectDensity={1000}
                    pistonForce={currentQuest.force || 0}
                    translations={t}
                />
            }
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
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
