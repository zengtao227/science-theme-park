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
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "MF-C1", difficulty, stage, magneticType: "force_calc",
                        promptLatex: `\\text{Electron (q = 1.6 × 10}^{-19}\\text{ C) at 2 × 10}^6\\text{ m/s perpendicular to 0.1 T. Force?}`,
                        expressionLatex: `F = qvB`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F\\text{ (N)}`, placeholder: "3.2e-14", expected: 3.2e-14 }],
                        correctLatex: `3.2 \\times 10^{-14}\\text{ N}`,
                        hintLatex: [`1.6 \\times 10^{-19} \\times 2 \\times 10^6 \\times 0.1`]
                    },
                    {
                        id: "MF-C2", difficulty, stage, magneticType: "radius",
                        promptLatex: `\\text{Proton (m = 1.67 × 10}^{-27}\\text{ kg, q = 1.6 × 10}^{-19}\\text{ C) at 10}^5\\text{ m/s in 0.5 T. Radius?}`,
                        expressionLatex: `r = \\frac{mv}{qB}`,
                        targetLatex: `r`,
                        slots: [{ id: "radius", labelLatex: `r\\text{ (m)}`, placeholder: "0.002", expected: 0.002 }],
                        correctLatex: `0.002\\text{ m = 2 mm}`,
                        hintLatex: [`\\frac{1.67 \\times 10^{-27} \\times 10^5}{1.6 \\times 10^{-19} \\times 0.5}`]
                    },
                    {
                        id: "MF-C3", difficulty, stage, magneticType: "angle_effect",
                        promptLatex: `\\text{Charge moves at 30° to field. Force is F = qvB × what?}`,
                        expressionLatex: `F = qvB\\sin(\\theta)`,
                        targetLatex: `\\sin(30°)`,
                        slots: [{ id: "factor", labelLatex: `\\sin(30°)`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `\\sin(30°) = 0.5`,
                        hintLatex: [`\\sin(30°) = 0.5`]
                    },
                    {
                        id: "MF-C4", difficulty, stage, magneticType: "velocity_effect",
                        promptLatex: `\\text{Double particle velocity. Circular path radius becomes how many times larger?}`,
                        expressionLatex: `r \\propto v`,
                        targetLatex: `\\text{Factor}`,
                        slots: [{ id: "factor", labelLatex: `\\text{Factor}`, placeholder: "2", expected: 2 }],
                        correctLatex: `2\\times`,
                        hintLatex: [`r = \\frac{mv}{qB}, \\quad v \\rightarrow 2v \\Rightarrow r \\rightarrow 2r`]
                    },
                    {
                        id: "MF-C5", difficulty, stage, magneticType: "field_strength",
                        promptLatex: `\\text{Increase B from 1 T to 4 T. Radius becomes what fraction?}`,
                        expressionLatex: `r \\propto \\frac{1}{B}`,
                        targetLatex: `\\text{Fraction}`,
                        slots: [{ id: "frac", labelLatex: `\\text{Fraction}`, placeholder: "0.25", expected: 0.25 }],
                        correctLatex: `\\frac{1}{4}`,
                        hintLatex: [`r \\propto \\frac{1}{B}, \\quad B \\rightarrow 4B \\Rightarrow r \\rightarrow \\frac{r}{4}`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "MF-A1", difficulty, stage, magneticType: "mass_spectrometer",
                        promptLatex: `\\text{Two ions same charge, different mass. Heavier ion has larger or smaller radius?}`,
                        expressionLatex: `r = \\frac{mv}{qB}, \\quad m \\uparrow \\Rightarrow r \\uparrow`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{L/S}`, placeholder: "larger", expected: "larger" }],
                        correctLatex: `\\text{Larger radius}`,
                        hintLatex: [`r \\propto m`]
                    },
                    {
                        id: "MF-A2", difficulty, stage, magneticType: "cyclotron_frequency",
                        promptLatex: `\\text{Cyclotron frequency: } f = \\frac{qB}{2\\pi m}. \\text{ Does it depend on velocity?}`,
                        expressionLatex: `f = \\frac{qB}{2\\pi m}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Yes/No}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{No (independent of v)}`,
                        hintLatex: [`\\text{No } v \\text{ in formula}`]
                    },
                    {
                        id: "MF-A3", difficulty, stage, magneticType: "hall_effect",
                        promptLatex: `\\text{Current flows through conductor in perpendicular B field. Voltage appears across conductor. What effect?}`,
                        expressionLatex: `\\text{Magnetic deflection} \\rightarrow \\text{charge separation}`,
                        targetLatex: `\\text{Effect}`,
                        slots: [{ id: "effect", labelLatex: `\\text{Name}`, placeholder: "hall", expected: "hall" }],
                        correctLatex: `\\text{Hall effect}`,
                        hintLatex: [`\\text{Named after Edwin Hall}`]
                    },
                    {
                        id: "MF-A4", difficulty, stage, magneticType: "aurora",
                        promptLatex: `\\text{Solar wind particles spiral along Earth's magnetic field lines toward poles. What creates aurora?}`,
                        expressionLatex: `\\text{Charged particles} + \\text{magnetic field}`,
                        targetLatex: `\\text{Cause}`,
                        slots: [{ id: "cause", labelLatex: `\\text{Cause}`, placeholder: "magnetic", expected: "magnetic" }],
                        correctLatex: `\\text{Magnetic deflection}`,
                        hintLatex: [`\\text{Lorentz force guides particles}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "MF-E1", difficulty, stage, magneticType: "relativistic",
                        promptLatex: `\\text{At relativistic speeds, mass increases: } m = \\gamma m_0. \\text{ How does this affect radius?}`,
                        expressionLatex: `r = \\frac{\\gamma m_0 v}{qB}`,
                        targetLatex: `\\text{Effect}`,
                        slots: [{ id: "effect", labelLatex: `\\text{Effect}`, placeholder: "increases", expected: "increases" }],
                        correctLatex: `\\text{Radius increases}`,
                        hintLatex: [`r \\propto \\gamma m_0`]
                    },
                    {
                        id: "MF-E2", difficulty, stage, magneticType: "lhc_bending",
                        promptLatex: `\\text{LHC: protons at 0.999999c, B = 8.3 T. Why such strong field needed?}`,
                        expressionLatex: `r = \\frac{mv}{qB}, \\quad v \\approx c \\Rightarrow \\text{large } B`,
                        targetLatex: `\\text{Reason}`,
                        slots: [{ id: "reason", labelLatex: `\\text{Reason}`, placeholder: "high speed", expected: "high speed" }],
                        correctLatex: `\\text{Extreme velocity requires strong B}`,
                        hintLatex: [`\\text{Higher } v \\text{ needs higher } B \\text{ for same } r`]
                    },
                    {
                        id: "MF-E3", difficulty, stage, magneticType: "magnetic_bottle",
                        promptLatex: `\\text{Charged particles trapped between two magnetic mirrors. What is this configuration?}`,
                        expressionLatex: `\\text{Converging field lines trap particles}`,
                        targetLatex: `\\text{Name}`,
                        slots: [{ id: "name", labelLatex: `\\text{Name}`, placeholder: "magnetic bottle", expected: "magnetic bottle" }],
                        correctLatex: `\\text{Magnetic bottle}`,
                        hintLatex: [`\\text{Used in fusion reactors}`]
                    },
                    {
                        id: "MF-E4", difficulty, stage, magneticType: "drift_velocity",
                        promptLatex: `\\text{Crossed E and B fields. Particles drift perpendicular to both. Drift velocity?}`,
                        expressionLatex: `v_d = \\frac{E}{B}`,
                        targetLatex: `\\text{Formula}`,
                        slots: [{ id: "formula", labelLatex: `v_d`, placeholder: "E/B", expected: "E/B" }],
                        correctLatex: `v_d = \\frac{E}{B}`,
                        hintLatex: [`\\text{E×B drift}`]
                    }
                );
            }
        }

        if (stage === "MAGNETIC_FIELD") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "MB-B1", difficulty, stage, magneticType: "units",
                        promptLatex: `\\text{Magnetic field strength is measured in what SI unit?}`,
                        expressionLatex: `\\text{SI unit of } B`,
                        targetLatex: `\\text{Unit}`,
                        slots: [{ id: "unit", labelLatex: `\\text{Unit}`, placeholder: "tesla", expected: "tesla" }],
                        correctLatex: `\\text{Tesla (T)}`,
                        hintLatex: [`\\text{Named after Nikola Tesla}`]
                    },
                    {
                        id: "MB-B2", difficulty, stage, magneticType: "earth_field",
                        promptLatex: `\\text{Earth's magnetic field is about 0.00005 T. MRI scanner is 3 T. How many times stronger?}`,
                        expressionLatex: `\\frac{3}{0.00005}`,
                        targetLatex: `\\text{Ratio}`,
                        slots: [{ id: "ratio", labelLatex: `\\text{Ratio}`, placeholder: "60000", expected: 60000 }],
                        correctLatex: `60{,}000\\times`,
                        hintLatex: [`3 \\div 0.00005 = 60{,}000`]
                    },
                    {
                        id: "MB-B3", difficulty, stage, magneticType: "current_source",
                        promptLatex: `\\text{Magnetic fields are created by moving charges (currents). True or false?}`,
                        expressionLatex: `\\text{Moving charge} \\rightarrow \\text{magnetic field}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{T/F}`, placeholder: "true", expected: "true" }],
                        correctLatex: `\\text{True}`,
                        hintLatex: [`\\text{No magnetic monopoles}`]
                    },
                    {
                        id: "MB-B4", difficulty, stage, magneticType: "right_hand_rule",
                        promptLatex: `\\text{Current flows up through wire. Magnetic field circles clockwise or counterclockwise (viewed from above)?}`,
                        expressionLatex: `\\text{Right-hand rule: thumb = current, fingers = field}`,
                        targetLatex: `\\text{Direction}`,
                        slots: [{ id: "dir", labelLatex: `\\text{CW/CCW}`, placeholder: "clockwise", expected: "clockwise" }],
                        correctLatex: `\\text{Clockwise}`,
                        hintLatex: [`\\text{Thumb up, fingers curl clockwise}`]
                    },
                    {
                        id: "MB-B5", difficulty, stage, magneticType: "distance_effect",
                        promptLatex: `\\text{Double distance from wire. Magnetic field becomes stronger or weaker?}`,
                        expressionLatex: `B \\propto \\frac{1}{r}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{S/W}`, placeholder: "weaker", expected: "weaker" }],
                        correctLatex: `\\text{Weaker (half strength)}`,
                        hintLatex: [`B = \\frac{\\mu_0 I}{2\\pi r}`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "MB-C1", difficulty, stage, magneticType: "wire_field",
                        promptLatex: `\\text{Wire carries 10 A. Field at 0.1 m distance? (}\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T·m/A)}`,
                        expressionLatex: `B = \\frac{\\mu_0 I}{2\\pi r}`,
                        targetLatex: `B`,
                        slots: [{ id: "field", labelLatex: `B\\text{ (T)}`, placeholder: "2e-5", expected: 2e-5 }],
                        correctLatex: `2 \\times 10^{-5}\\text{ T}`,
                        hintLatex: [`\\frac{4\\pi \\times 10^{-7} \\times 10}{2\\pi \\times 0.1} = 2 \\times 10^{-5}`]
                    },
                    {
                        id: "MB-C2", difficulty, stage, magneticType: "solenoid",
                        promptLatex: `\\text{Solenoid: 1000 turns/m, current 2 A. Internal field? (}\\mu_0 = 4\\pi \\times 10^{-7}\\text{)}`,
                        expressionLatex: `B = \\mu_0 n I`,
                        targetLatex: `B`,
                        slots: [{ id: "field", labelLatex: `B\\text{ (T)}`, placeholder: "0.0025", expected: 0.0025 }],
                        correctLatex: `0.0025\\text{ T = 2.5 mT}`,
                        hintLatex: [`4\\pi \\times 10^{-7} \\times 1000 \\times 2`]
                    },
                    {
                        id: "MB-C3", difficulty, stage, magneticType: "current_increase",
                        promptLatex: `\\text{Triple current in wire. Magnetic field becomes how many times stronger?}`,
                        expressionLatex: `B \\propto I`,
                        targetLatex: `\\text{Factor}`,
                        slots: [{ id: "factor", labelLatex: `\\text{Factor}`, placeholder: "3", expected: 3 }],
                        correctLatex: `3\\times`,
                        hintLatex: [`B \\propto I`]
                    },
                    {
                        id: "MB-C4", difficulty, stage, magneticType: "electromagnet",
                        promptLatex: `\\text{Electromagnet is a coil with current. Can it be turned on/off?}`,
                        expressionLatex: `\\text{Current on/off} \\rightarrow \\text{field on/off}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Yes/No}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{Yes (controllable)}`,
                        hintLatex: [`\\text{Control current = control field}`]
                    },
                    {
                        id: "MB-C5", difficulty, stage, magneticType: "field_direction",
                        promptLatex: `\\text{Solenoid with current flowing clockwise (viewed from end). Field points toward or away from you?}`,
                        expressionLatex: `\\text{Right-hand rule: fingers = current, thumb = field}`,
                        targetLatex: `\\text{Direction}`,
                        slots: [{ id: "dir", labelLatex: `\\text{T/A}`, placeholder: "away", expected: "away" }],
                        correctLatex: `\\text{Away (into solenoid)}`,
                        hintLatex: [`\\text{Curl fingers with current, thumb points field}`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "MB-A1", difficulty, stage, magneticType: "mri_field",
                        promptLatex: `\\text{MRI scanner: 3 T field. Why use superconducting coils?}`,
                        expressionLatex: `\\text{Zero resistance} \\rightarrow \\text{large current, no heat}`,
                        targetLatex: `\\text{Reason}`,
                        slots: [{ id: "reason", labelLatex: `\\text{Reason}`, placeholder: "no resistance", expected: "no resistance" }],
                        correctLatex: `\\text{No resistance = high current}`,
                        hintLatex: [`\\text{Superconductor: } R = 0`]
                    },
                    {
                        id: "MB-A2", difficulty, stage, magneticType: "field_uniformity",
                        promptLatex: `\\text{MRI requires uniform field (< 1 ppm variation). Why?}`,
                        expressionLatex: `\\text{Uniform } B \\rightarrow \\text{clear image}`,
                        targetLatex: `\\text{Reason}`,
                        slots: [{ id: "reason", labelLatex: `\\text{Reason}`, placeholder: "image quality", expected: "image quality" }],
                        correctLatex: `\\text{Image quality/resolution}`,
                        hintLatex: [`\\text{Non-uniform field blurs image}`]
                    },
                    {
                        id: "MB-A3", difficulty, stage, magneticType: "amperes_law",
                        promptLatex: `\\text{Ampère's law relates magnetic field to what?}`,
                        expressionLatex: `\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enc}}`,
                        targetLatex: `\\text{Related to}`,
                        slots: [{ id: "related", labelLatex: `\\text{Related}`, placeholder: "current", expected: "current" }],
                        correctLatex: `\\text{Enclosed current}`,
                        hintLatex: [`\\text{Circulation of } B \\text{ = enclosed } I`]
                    },
                    {
                        id: "MB-A4", difficulty, stage, magneticType: "toroid",
                        promptLatex: `\\text{Toroidal coil (donut shape) confines field to interior. External field is what?}`,
                        expressionLatex: `\\text{Closed loop} \\rightarrow \\text{no external field}`,
                        targetLatex: `\\text{External B}`,
                        slots: [{ id: "field", labelLatex: `\\text{Field}`, placeholder: "zero", expected: "zero" }],
                        correctLatex: `\\text{Zero (confined)}`,
                        hintLatex: [`\\text{Field lines close inside toroid}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "MB-E1", difficulty, stage, magneticType: "biot_savart",
                        promptLatex: `\\text{Biot-Savart law: } d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I d\\vec{l} \\times \\hat{r}}{r^2}. \\text{ What does it calculate?}`,
                        expressionLatex: `\\text{Field from current element}`,
                        targetLatex: `\\text{Calculates}`,
                        slots: [{ id: "calc", labelLatex: `\\text{Calculates}`, placeholder: "magnetic field", expected: "magnetic field" }],
                        correctLatex: `\\text{Magnetic field from current}`,
                        hintLatex: [`\\text{Fundamental law for } B \\text{ from } I`]
                    },
                    {
                        id: "MB-E2", difficulty, stage, magneticType: "helmholtz_coils",
                        promptLatex: `\\text{Two coils separated by their radius create uniform field between them. What configuration?}`,
                        expressionLatex: `\\text{Helmholtz configuration}`,
                        targetLatex: `\\text{Name}`,
                        slots: [{ id: "name", labelLatex: `\\text{Name}`, placeholder: "helmholtz", expected: "helmholtz" }],
                        correctLatex: `\\text{Helmholtz coils}`,
                        hintLatex: [`\\text{Used for calibration}`]
                    },
                    {
                        id: "MB-E3", difficulty, stage, magneticType: "magnetic_dipole",
                        promptLatex: `\\text{Current loop creates magnetic dipole. Dipole moment: } \\mu = IA. \\text{ What is A?}`,
                        expressionLatex: `\\mu = I \\times \\text{(loop area)}`,
                        targetLatex: `A`,
                        slots: [{ id: "a", labelLatex: `A`, placeholder: "area", expected: "area" }],
                        correctLatex: `\\text{Loop area}`,
                        hintLatex: [`\\text{Larger loop = stronger dipole}`]
                    },
                    {
                        id: "MB-E4", difficulty, stage, magneticType: "vector_potential",
                        promptLatex: `\\text{Magnetic field can be expressed as: } \\vec{B} = \\nabla \\times \\vec{A}. \\text{ What is } \\vec{A}\\text{?}`,
                        expressionLatex: `\\vec{B} = \\text{curl of } \\vec{A}`,
                        targetLatex: `\\vec{A}`,
                        slots: [{ id: "a", labelLatex: `\\vec{A}`, placeholder: "vector potential", expected: "vector potential" }],
                        correctLatex: `\\text{Vector potential}`,
                        hintLatex: [`\\text{Advanced formulation of magnetism}`]
                    }
                );
            }
        }

        if (stage === "APPLICATIONS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "AP-B1", difficulty, stage, magneticType: "motor_principle",
                        promptLatex: `\\text{Electric motor converts electrical energy to what?}`,
                        expressionLatex: `\\text{Electrical} \\rightarrow \\text{mechanical}`,
                        targetLatex: `\\text{Energy type}`,
                        slots: [{ id: "energy", labelLatex: `\\text{Type}`, placeholder: "mechanical", expected: "mechanical" }],
                        correctLatex: `\\text{Mechanical energy (motion)}`,
                        hintLatex: [`\\text{Motor = electrical to motion}`]
                    },
                    {
                        id: "AP-B2", difficulty, stage, magneticType: "generator_principle",
                        promptLatex: `\\text{Generator converts mechanical energy to what?}`,
                        expressionLatex: `\\text{Mechanical} \\rightarrow \\text{electrical}`,
                        targetLatex: `\\text{Energy type}`,
                        slots: [{ id: "energy", labelLatex: `\\text{Type}`, placeholder: "electrical", expected: "electrical" }],
                        correctLatex: `\\text{Electrical energy}`,
                        hintLatex: [`\\text{Generator = motion to electrical}`]
                    },
                    {
                        id: "AP-B3", difficulty, stage, magneticType: "force_on_wire",
                        promptLatex: `\\text{Current-carrying wire in magnetic field experiences what?}`,
                        expressionLatex: `F = BIL`,
                        targetLatex: `\\text{Experiences}`,
                        slots: [{ id: "exp", labelLatex: `\\text{Experiences}`, placeholder: "force", expected: "force" }],
                        correctLatex: `\\text{Force}`,
                        hintLatex: [`\\text{Lorentz force on moving charges}`]
                    },
                    {
                        id: "AP-B4", difficulty, stage, magneticType: "maglev",
                        promptLatex: `\\text{Maglev trains use magnetic forces to do what?}`,
                        expressionLatex: `\\text{Magnetic levitation}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "levitate", expected: "levitate" }],
                        correctLatex: `\\text{Levitate (float)}`,
                        hintLatex: [`\\text{Repelling magnets lift train}`]
                    },
                    {
                        id: "AP-B5", difficulty, stage, magneticType: "induction",
                        promptLatex: `\\text{Moving wire in magnetic field generates what?}`,
                        expressionLatex: `\\text{Electromagnetic induction}`,
                        targetLatex: `\\text{Generates}`,
                        slots: [{ id: "gen", labelLatex: `\\text{Generates}`, placeholder: "voltage", expected: "voltage" }],
                        correctLatex: `\\text{Voltage (EMF)}`,
                        hintLatex: [`\\text{Faraday's law}`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "AP-C1", difficulty, stage, magneticType: "wire_force_calc",
                        promptLatex: `\\text{Wire: 5 A current, 0.2 m length, perpendicular to 0.5 T field. Force?}`,
                        expressionLatex: `F = BIL`,
                        targetLatex: `F`,
                        slots: [{ id: "force", labelLatex: `F\\text{ (N)}`, placeholder: "0.5", expected: 0.5 }],
                        correctLatex: `0.5\\text{ N}`,
                        hintLatex: [`0.5 \\times 5 \\times 0.2 = 0.5`]
                    },
                    {
                        id: "AP-C2", difficulty, stage, magneticType: "motor_torque",
                        promptLatex: `\\text{Motor coil in magnetic field experiences torque. Torque causes what?}`,
                        expressionLatex: `\\text{Torque} \\rightarrow \\text{rotation}`,
                        targetLatex: `\\text{Effect}`,
                        slots: [{ id: "effect", labelLatex: `\\text{Effect}`, placeholder: "rotation", expected: "rotation" }],
                        correctLatex: `\\text{Rotation}`,
                        hintLatex: [`\\text{Torque = rotational force}`]
                    },
                    {
                        id: "AP-C3", difficulty, stage, magneticType: "regenerative_braking",
                        promptLatex: `\\text{Tram motor runs backwards as generator during braking. What happens to kinetic energy?}`,
                        expressionLatex: `\\text{KE} \\rightarrow \\text{electrical energy}`,
                        targetLatex: `\\text{Energy fate}`,
                        slots: [{ id: "fate", labelLatex: `\\text{Fate}`, placeholder: "recovered", expected: "recovered" }],
                        correctLatex: `\\text{Recovered as electricity}`,
                        hintLatex: [`\\text{Regenerative braking}`]
                    },
                    {
                        id: "AP-C4", difficulty, stage, magneticType: "hall_sensor",
                        promptLatex: `\\text{Hall effect sensor measures what?}`,
                        expressionLatex: `\\text{Hall voltage} \\propto B`,
                        targetLatex: `\\text{Measures}`,
                        slots: [{ id: "meas", labelLatex: `\\text{Measures}`, placeholder: "magnetic field", expected: "magnetic field" }],
                        correctLatex: `\\text{Magnetic field strength}`,
                        hintLatex: [`\\text{Voltage indicates field strength}`]
                    },
                    {
                        id: "AP-C5", difficulty, stage, magneticType: "loudspeaker",
                        promptLatex: `\\text{Loudspeaker: current through coil in magnetic field causes what?}`,
                        expressionLatex: `\\text{Varying current} \\rightarrow \\text{varying force} \\rightarrow \\text{vibration}`,
                        targetLatex: `\\text{Effect}`,
                        slots: [{ id: "effect", labelLatex: `\\text{Effect}`, placeholder: "vibration", expected: "vibration" }],
                        correctLatex: `\\text{Cone vibration (sound)}`,
                        hintLatex: [`F = BIL \\text{ with varying } I`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "AP-A1", difficulty, stage, magneticType: "faraday_law",
                        promptLatex: `\\text{Faraday's law: induced EMF = rate of change of what?}`,
                        expressionLatex: `\\mathcal{E} = -\\frac{d\\Phi_B}{dt}`,
                        targetLatex: `\\text{Change of}`,
                        slots: [{ id: "change", labelLatex: `\\text{Change}`, placeholder: "magnetic flux", expected: "magnetic flux" }],
                        correctLatex: `\\text{Magnetic flux}`,
                        hintLatex: [`\\Phi_B = B \\cdot A`]
                    },
                    {
                        id: "AP-A2", difficulty, stage, magneticType: "lenz_law",
                        promptLatex: `\\text{Lenz's law: induced current opposes the change causing it. This conserves what?}`,
                        expressionLatex: `\\text{Opposition} \\rightarrow \\text{energy conservation}`,
                        targetLatex: `\\text{Conserves}`,
                        slots: [{ id: "cons", labelLatex: `\\text{Conserves}`, placeholder: "energy", expected: "energy" }],
                        correctLatex: `\\text{Energy}`,
                        hintLatex: [`\\text{Can't get free energy}`]
                    },
                    {
                        id: "AP-A3", difficulty, stage, magneticType: "transformer",
                        promptLatex: `\\text{Transformer changes voltage using what principle?}`,
                        expressionLatex: `\\text{Changing flux induces EMF}`,
                        targetLatex: `\\text{Principle}`,
                        slots: [{ id: "prin", labelLatex: `\\text{Principle}`, placeholder: "induction", expected: "induction" }],
                        correctLatex: `\\text{Electromagnetic induction}`,
                        hintLatex: [`\\text{Faraday's law}`]
                    },
                    {
                        id: "AP-A4", difficulty, stage, magneticType: "eddy_currents",
                        promptLatex: `\\text{Changing magnetic field in conductor induces circular currents. What are these called?}`,
                        expressionLatex: `\\text{Induced loops of current}`,
                        targetLatex: `\\text{Name}`,
                        slots: [{ id: "name", labelLatex: `\\text{Name}`, placeholder: "eddy currents", expected: "eddy currents" }],
                        correctLatex: `\\text{Eddy currents}`,
                        hintLatex: [`\\text{Cause energy loss (heat)}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "AP-E1", difficulty, stage, magneticType: "synchrotron",
                        promptLatex: `\\text{Synchrotron increases both particle energy and magnetic field together. Why?}`,
                        expressionLatex: `r = \\frac{mv}{qB}, \\quad v \\uparrow \\Rightarrow B \\uparrow \\text{ (constant } r\\text{)}`,
                        targetLatex: `\\text{Reason}`,
                        slots: [{ id: "reason", labelLatex: `\\text{Reason}`, placeholder: "constant radius", expected: "constant radius" }],
                        correctLatex: `\\text{Maintain constant radius}`,
                        hintLatex: [`\\text{Higher } v \\text{ needs higher } B`]
                    },
                    {
                        id: "AP-E2", difficulty, stage, magneticType: "tokamak",
                        promptLatex: `\\text{Tokamak fusion reactor uses magnetic fields to do what?}`,
                        expressionLatex: `\\text{Confine hot plasma}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "confine plasma", expected: "confine plasma" }],
                        correctLatex: `\\text{Confine plasma}`,
                        hintLatex: [`\\text{Magnetic bottle for fusion}`]
                    },
                    {
                        id: "AP-E3", difficulty, stage, magneticType: "railgun",
                        promptLatex: `\\text{Railgun uses Lorentz force on current-carrying projectile. What does it accelerate?}`,
                        expressionLatex: `F = BIL \\text{ on sliding conductor}`,
                        targetLatex: `\\text{Accelerates}`,
                        slots: [{ id: "acc", labelLatex: `\\text{Accelerates}`, placeholder: "projectile", expected: "projectile" }],
                        correctLatex: `\\text{Projectile to high speed}`,
                        hintLatex: [`\\text{Electromagnetic launcher}`]
                    },
                    {
                        id: "AP-E4", difficulty, stage, magneticType: "magnetohydrodynamics",
                        promptLatex: `\\text{MHD: interaction of magnetic fields with conducting fluids. Used in what?}`,
                        expressionLatex: `\\text{Plasma physics, propulsion}`,
                        targetLatex: `\\text{Applications}`,
                        slots: [{ id: "app", labelLatex: `\\text{App}`, placeholder: "propulsion", expected: "propulsion" }],
                        correctLatex: `\\text{Propulsion, power generation}`,
                        hintLatex: [`\\text{Magnetohydrodynamics}`]
                    }
                );
            }
        }

        return quests;
    }, []);

    const {
        stage: currentStage,
        difficulty: currentDifficulty,
        currentQuest,
        inputs: userAnswer,
        lastCheck: feedback,
        setInputs,
        verify,
        next,
        handleStageChange,
        handleDifficultyChange
    } = useQuestManager<GP205Quest, Stage>({
        buildPool: buildStagePool,
        initialStage: "MAGNETIC_FORCE"
    });

    const isCorrect = feedback?.ok ?? false;

    const handleAnswer = useCallback((slotId: string, value: string) => {
        if (slotId === "check") {
            verify();
        } else {
            // This is handled by the input onChange directly
        }
    }, [verify]);

    const handleNext = useCallback(() => {
        next();
    }, [next]);

    const handleStageComplete = useCallback(() => {
        // Stage completion logic if needed
    }, []);

    const handleBack = useCallback(() => {
        window.history.back();
    }, []);

    const progress = useMemo(() => ({
        completedStages: [],
        allComplete: false
    }), []);

    const scenario = useMemo(() => {
        if (!currentStage) return "";
        const stageKey = currentStage.toLowerCase() as keyof typeof t.scenarios;
        return t.scenarios[stageKey] || "";
    }, [currentStage, t]);

    useEffect(() => {
        // Module completion tracking can be added here if needed
    }, [progress]);

    return (
        <ChamberLayout
            title={t.title}
            back={t.back}
            onBack={handleBack}
            footerLeft={t.footer_left}
            currentStage={currentStage}
            stages={t.stages}
            difficulty={t.difficulty}
            currentDifficulty={currentDifficulty}
            progress={progress}
        >
            <div className="flex flex-col lg:flex-row gap-6 h-full">
                <div className="flex-1 flex flex-col gap-4">
                    <div className="chamber-panel p-6">
                        <h3 className="text-cyan-400 font-bold mb-3">{t.objective_title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{scenario}</p>
                    </div>

                    {currentQuest && (
                        <div className="chamber-panel p-6 flex-1 flex flex-col">
                            <h3 className="text-cyan-400 font-bold mb-4">{t.monitor_title}</h3>
                            
                            <div className="mb-4 p-4 bg-black/30 rounded border border-cyan-500/30">
                                <InlineMath math={currentQuest.promptLatex} />
                            </div>

                            {currentQuest.expressionLatex && (
                                <div className="mb-4 p-3 bg-blue-500/10 rounded border border-blue-500/30">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            )}

                            <div className="space-y-3 mb-4">
                                {currentQuest.slots.map((slot) => (
                                    <div key={slot.id} className="flex items-center gap-3">
                                        <label className="text-cyan-300 min-w-[120px]">
                                            <InlineMath math={slot.labelLatex} />
                                        </label>
                                        <input
                                            type="text"
                                            value={userAnswer[slot.id] || ""}
                                            onChange={(e) => setInputs((prev: Record<string, string>) => ({ ...prev, [slot.id]: e.target.value }))}
                                            placeholder={slot.placeholder}
                                            className="flex-1 px-3 py-2 bg-black/50 border border-cyan-500/50 rounded text-cyan-100 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                                            disabled={feedback !== null}
                                        />
                                    </div>
                                ))}
                            </div>

                            {feedback && (
                                <div className={`p-4 rounded border ${isCorrect ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500'} mb-4`}>
                                    <p className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                        {isCorrect ? t.correct : t.incorrect}
                                    </p>
                                    {!isCorrect && currentQuest.hintLatex && (
                                        <div className="mt-2 text-gray-300">
                                            <InlineMath math={currentQuest.hintLatex[0]} />
                                        </div>
                                    )}
                                    {isCorrect && currentQuest.correctLatex && (
                                        <div className="mt-2 text-green-300">
                                            <InlineMath math={currentQuest.correctLatex} />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="mt-auto">
                                <button
                                    onClick={feedback ? handleNext : verify}
                                    className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded transition-colors"
                                >
                                    {feedback ? t.next : t.check}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <MagneticFieldVisualization stage={currentStage || "MAGNETIC_FORCE"} />
                </div>
            </div>
        </ChamberLayout>
    );
}
