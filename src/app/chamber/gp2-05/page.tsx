"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MagneticFieldVisualization from "@/components/chamber/gp2-05/MagneticFieldVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "MAGNETIC_FORCE" | "MAGNETIC_FIELD" | "APPLICATIONS";

interface GP205Quest extends Quest {
    stage: Stage;
    magneticType?: string;
}

type GP205T = typeof translations.EN.gp2_05;

export default function GP205Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.gp2_05 || translations.EN.gp2_05) as GP205T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GP205Quest[] => {
        const quests: GP205Quest[] = [];

        if (stage === "MAGNETIC_FORCE") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "MF-B1", difficulty, stage, magneticType: "lorentz_basic",
                        promptLatex: `\\text{Proton (q = 1.6 × 10}^{-19}\\text{ C) moves at 1000 m/s perpendicular to 0.5 T field. Force?}`,
                        expressionLatex: `F = qvB`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F\\text{ (N)}`, placeholder: "8e-17", expected: 8e-17 }],
                        correctLatex: `8 \\times 10^{-17}\\text{ N}`,
                        hintLatex: [`1.6 \\times 10^{-19} \\times 1000 \\times 0.5 = 8 \\times 10^{-17}`]
                    },
                    {
                        id: "MF-B2", difficulty, stage, magneticType: "direction",
                        promptLatex: `\\text{Positive charge moves right in magnetic field pointing up. Force direction?}`,
                        expressionLatex: `\\text{Right-hand rule}`,
                        targetLatex: `\\text{Direction}`,
                        slots: [{ id: "dir", labelLatex: `\\text{Direction}`, placeholder: "out", expected: "out" }],
                        correctLatex: `\\text{Out of page}`,
                        hintLatex: [`\\text{Fingers: velocity, curl: field, thumb: force}`]
                    },
                    {
                        id: "MF-B3", difficulty, stage, magneticType: "zero_force",
                        promptLatex: `\\text{Electron moves parallel to magnetic field. What is the force?}`,
                        expressionLatex: `\\theta = 0° \\Rightarrow \\sin(0°) = 0`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F\\text{ (N)}`, placeholder: "0", expected: 0 }],
                        correctLatex: `0\\text{ N (parallel motion)}`,
                        hintLatex: [`F = qvB\\sin(\\theta), \\quad \\theta = 0°`]
                    },
                    {
                        id: "MF-B4", difficulty, stage, magneticType: "circular_motion",
                        promptLatex: `\\text{Magnetic force on moving charge causes what type of motion?}`,
                        expressionLatex: `\\text{Perpendicular force} \\rightarrow \\text{circular path}`,
                        targetLatex: `\\text{Motion}`,
                        slots: [{ id: "motion", labelLatex: `\\text{Type}`, placeholder: "circular", expected: "circular" }],
                        correctLatex: `\\text{Circular motion}`,
                        hintLatex: [`\\text{Centripetal force = magnetic force}`]
                    },
                    {
                        id: "MF-B5", difficulty, stage, magneticType: "negative_charge",
                        promptLatex: `\\text{Negative charge moves right in field pointing up. Force direction vs positive charge?}`,
                        expressionLatex: `\\text{Opposite charge} \\rightarrow \\text{opposite force}`,
                        targetLatex: `\\text{Direction}`,
                        slots: [{ id: "dir", labelLatex: `\\text{Direction}`, placeholder: "opposite", expected: "opposite" }],
                        correctLatex: `\\text{Opposite (into page)}`,
                        hintLatex: [`\\text{Negative charge reverses force direction}`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "MF-C1", difficulty, stage, magneticType: "radius_calc",
                        promptLatex: `\\text{Electron (m = 9.1 × 10}^{-31}\\text{ kg, q = 1.6 × 10}^{-19}\\text{ C) at 10}^6\\text{ m/s in 0.01 T field. Radius?}`,
                        expressionLatex: `r = \\frac{mv}{qB}`,
                        targetLatex: `r`,
                        slots: [{ id: "radius", labelLatex: `r\\text{ (m)}`, placeholder: "0.00057", expected: 0.00057 }],
                        correctLatex: `5.7 \\times 10^{-4}\\text{ m}`,
                        hintLatex: [`\\frac{9.1 \\times 10^{-31} \\times 10^6}{1.6 \\times 10^{-19} \\times 0.01} \\approx 5.7 \\times 10^{-4}`]
                    },
                    {
                        id: "MF-C2", difficulty, stage, magneticType: "force_angle",
                        promptLatex: `\\text{Charge q = 2 × 10}^{-6}\\text{ C moves at 500 m/s at 30° to 0.4 T field. Force?}`,
                        expressionLatex: `F = qvB\\sin(\\theta)`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F\\text{ (N)}`, placeholder: "0.0002", expected: 0.0002 }],
                        correctLatex: `2 \\times 10^{-4}\\text{ N}`,
                        hintLatex: [`2 \\times 10^{-6} \\times 500 \\times 0.4 \\times \\sin(30°) = 2 \\times 10^{-4}`]
                    },
                    {
                        id: "MF-C3", difficulty, stage, magneticType: "velocity_selector",
                        promptLatex: `\\text{Particle with E = 1000 V/m and B = 0.5 T passes undeflected. What is velocity?}`,
                        expressionLatex: `v = \\frac{E}{B}`,
                        targetLatex: `v`,
                        slots: [{ id: "velocity", labelLatex: `v\\text{ (m/s)}`, placeholder: "2000", expected: 2000 }],
                        correctLatex: `2000\\text{ m/s}`,
                        hintLatex: [`1000 \\div 0.5 = 2000`]
                    },
                    {
                        id: "MF-C4", difficulty, stage, magneticType: "period",
                        promptLatex: `\\text{Proton (m = 1.67 × 10}^{-27}\\text{ kg, q = 1.6 × 10}^{-19}\\text{ C) in 0.5 T field. Period of circular motion?}`,
                        expressionLatex: `T = \\frac{2\\pi m}{qB}`,
                        targetLatex: `T`,
                        slots: [{ id: "period", labelLatex: `T\\text{ (s)}`, placeholder: "1.31e-7", expected: 1.31e-7 }],
                        correctLatex: `1.31 \\times 10^{-7}\\text{ s}`,
                        hintLatex: [`\\frac{2\\pi \\times 1.67 \\times 10^{-27}}{1.6 \\times 10^{-19} \\times 0.5} \\approx 1.31 \\times 10^{-7}`]
                    },
                    {
                        id: "MF-C5", difficulty, stage, magneticType: "current_wire",
                        promptLatex: `\\text{Wire carries 5 A current perpendicular to 0.2 T field. Force per meter?}`,
                        expressionLatex: `F = BIL \\Rightarrow \\frac{F}{L} = BI`,
                        targetLatex: `F/L`,
                        slots: [{ id: "force_per_length", labelLatex: `F/L\\text{ (N/m)}`, placeholder: "1", expected: 1 }],
                        correctLatex: `1\\text{ N/m}`,
                        hintLatex: [`0.2 \\times 5 = 1`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "MF-A1", difficulty, stage, magneticType: "cyclotron_frequency",
                        promptLatex: `\\text{Proton (q = 1.6 × 10}^{-19}\\text{ C, m = 1.67 × 10}^{-27}\\text{ kg) in 1 T field. Cyclotron frequency?}`,
                        expressionLatex: `f = \\frac{qB}{2\\pi m}`,
                        targetLatex: `f`,
                        slots: [{ id: "freq", labelLatex: `f\\text{ (Hz)}`, placeholder: "1.52e7", expected: 1.52e7 }],
                        correctLatex: `1.52 \\times 10^7\\text{ Hz}`,
                        hintLatex: [`\\frac{1.6 \\times 10^{-19} \\times 1}{2\\pi \\times 1.67 \\times 10^{-27}} \\approx 1.52 \\times 10^7`]
                    },
                    {
                        id: "MF-A2", difficulty, stage, magneticType: "mass_spectrometer",
                        promptLatex: `\\text{Ion (q = 1.6 × 10}^{-19}\\text{ C) at 10}^5\\text{ m/s in 0.5 T field has radius 0.01 m. Mass?}`,
                        expressionLatex: `m = \\frac{qBr}{v}`,
                        targetLatex: `m`,
                        slots: [{ id: "mass", labelLatex: `m\\text{ (kg)}`, placeholder: "8e-26", expected: 8e-26 }],
                        correctLatex: `8 \\times 10^{-26}\\text{ kg}`,
                        hintLatex: [`\\frac{1.6 \\times 10^{-19} \\times 0.5 \\times 0.01}{10^5} = 8 \\times 10^{-26}`]
                    },
                    {
                        id: "MF-A3", difficulty, stage, magneticType: "hall_effect",
                        promptLatex: `\\text{Hall voltage develops when current flows perpendicular to magnetic field. What causes it?}`,
                        expressionLatex: `\\text{Lorentz force separates charges}`,
                        targetLatex: `\\text{Cause}`,
                        slots: [{ id: "cause", labelLatex: `\\text{Cause}`, placeholder: "lorentz", expected: "lorentz" }],
                        correctLatex: `\\text{Lorentz force}`,
                        hintLatex: [`\\text{Magnetic force pushes charges to sides}`]
                    },
                    {
                        id: "MF-A4", difficulty, stage, magneticType: "helical_motion",
                        promptLatex: `\\text{Charged particle enters field at angle. Path shape?}`,
                        expressionLatex: `\\text{Circular + linear} = \\text{helix}`,
                        targetLatex: `\\text{Path}`,
                        slots: [{ id: "path", labelLatex: `\\text{Shape}`, placeholder: "helix", expected: "helix" }],
                        correctLatex: `\\text{Helical (spiral)}`,
                        hintLatex: [`\\text{Perpendicular component: circle, parallel: straight}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "MF-E1", difficulty, stage, magneticType: "relativistic",
                        promptLatex: `\\text{At high speeds, relativistic mass increases. Does cyclotron frequency depend on velocity?}`,
                        expressionLatex: `f = \\frac{qB}{2\\pi m} \\text{ (m increases with v)}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Yes/No}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{Yes (decreases at high v)}`,
                        hintLatex: [`\\text{Relativistic mass } \\gamma m \\text{ reduces frequency}`]
                    },
                    {
                        id: "MF-E2", difficulty, stage, magneticType: "drift_velocity",
                        promptLatex: `\\text{Crossed E and B fields cause drift velocity. Direction relative to E and B?}`,
                        expressionLatex: `\\vec{v}_d = \\frac{\\vec{E} \\times \\vec{B}}{B^2}`,
                        targetLatex: `\\text{Direction}`,
                        slots: [{ id: "dir", labelLatex: `\\text{Direction}`, placeholder: "perpendicular", expected: "perpendicular" }],
                        correctLatex: `\\text{Perpendicular to both}`,
                        hintLatex: [`\\text{Cross product: perpendicular to E and B}`]
                    },
                    {
                        id: "MF-E3", difficulty, stage, magneticType: "magnetic_mirror",
                        promptLatex: `\\text{Charged particle in converging field lines can be reflected. What is this called?}`,
                        expressionLatex: `\\text{Increasing B reflects particle}`,
                        targetLatex: `\\text{Effect}`,
                        slots: [{ id: "effect", labelLatex: `\\text{Name}`, placeholder: "magnetic mirror", expected: "magnetic mirror" }],
                        correctLatex: `\\text{Magnetic mirror}`,
                        hintLatex: [`\\text{Used in plasma confinement}`]
                    },
                    {
                        id: "MF-E4", difficulty, stage, magneticType: "aurora",
                        promptLatex: `\\text{Earth's magnetic field traps charged particles from solar wind. What phenomenon results?}`,
                        expressionLatex: `\\text{Particles spiral along field lines}`,
                        targetLatex: `\\text{Phenomenon}`,
                        slots: [{ id: "phenom", labelLatex: `\\text{Name}`, placeholder: "aurora", expected: "aurora" }],
                        correctLatex: `\\text{Aurora (Northern/Southern Lights)}`,
                        hintLatex: [`\\text{Van Allen belts and aurora}`]
                    }
                );
            }
