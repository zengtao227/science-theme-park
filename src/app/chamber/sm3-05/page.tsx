"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GeometryVisualization from "@/components/chamber/sm3-05/GeometryVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "BASEL_ARCH" | "CROSS_SECTIONS" | "CURVED_SOLIDS";

interface SM305Quest extends Quest {
    stage: Stage;
    geometryType?: string;
}

export default function SM305Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SM305Quest[] => {
        const quests: SM305Quest[] = [];

        if (stage === "BASEL_ARCH") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "ARCH-B1", difficulty, stage, geometryType: "roche1",
                        promptLatex: `\\\\text{Roche Tower 1 is } 178\\\\text{m tall. If modeled as a rectangular prism with base } 60\\\\text{m} \\times 40\\\\text{m}, \\\\text{ what is the volume?}`,
                        expressionLatex: `V = l \\cdot w \\cdot h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "427200", expected: 427200 }],
                        correctLatex: `427,200 \\\\text{ m}^3`,
                        hintLatex: [`178 \\times 60 \\times 40 = 427200`]
                    },
                    {
                        id: "ARCH-B2", difficulty, stage, geometryType: "cube",
                        promptLatex: `\\\\text{A cube has edge length } 5\\\\text{m. What is its volume?}`,
                        expressionLatex: `V = a^3`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "125", expected: 125 }],
                        correctLatex: `125 \\\\text{ m}^3`,
                        hintLatex: [`5^3 = 125`]
                    },
                    {
                        id: "ARCH-B3", difficulty, stage, geometryType: "box",
                        promptLatex: `\\\\text{A box is } 10\\\\text{m} \\times 8\\\\text{m} \\times 6\\\\text{m. What is its volume?}`,
                        expressionLatex: `V = l \\cdot w \\cdot h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "480", expected: 480 }],
                        correctLatex: `480 \\\\text{ m}^3`,
                        hintLatex: [`10 \\times 8 \\times 6 = 480`]
                    },
                    {
                        id: "ARCH-B4", difficulty, stage, geometryType: "prism",
                        promptLatex: `\\\\text{A prism has base area } 50\\\\text{ m}^2 \\\\text{ and height } 12\\\\text{m. What is its volume?}`,
                        expressionLatex: `V = A_{base} \\cdot h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "600", expected: 600 }],
                        correctLatex: `600 \\\\text{ m}^3`,
                        hintLatex: [`50 \\times 12 = 600`]
                    },
                    {
                        id: "ARCH-B5", difficulty, stage, geometryType: "warehouse",
                        promptLatex: `\\\\text{A warehouse is } 20\\\\text{m} \\times 15\\\\text{m} \\times 8\\\\text{m. What is its volume?}`,
                        expressionLatex: `V = l \\cdot w \\cdot h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "2400", expected: 2400 }],
                        correctLatex: `2,400 \\\\text{ m}^3`,
                        hintLatex: [`20 \\times 15 \\times 8 = 2400`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "ARCH-C1", difficulty, stage, geometryType: "messeturm",
                        promptLatex: `\\\\text{Messeturm Basel: a cylinder of height } 105\\\\text{m, radius } 15\\\\text{m. Approximate volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "74182", expected: 74182 }],
                        correctLatex: `74,183 \\\\text{ m}^3`,
                        hintLatex: [`3.14 \\times 15^2 \\times 105 = 74182.5`]
                    },
                    {
                        id: "ARCH-C2", difficulty, stage, geometryType: "cylinder",
                        promptLatex: `\\\\text{A cylinder has radius } 4\\\\text{m and height } 10\\\\text{m. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "502", expected: 502 }],
                        correctLatex: `502 \\\\text{ m}^3`,
                        hintLatex: [`3.14 \\times 16 \\times 10 = 502.4`]
                    },
                    {
                        id: "ARCH-C3", difficulty, stage, geometryType: "tank",
                        promptLatex: `\\\\text{A water tank is cylindrical: radius } 3\\\\text{m, height } 8\\\\text{m. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "226", expected: 226 }],
                        correctLatex: `226 \\\\text{ m}^3`,
                        hintLatex: [`3.14 \\times 9 \\times 8 = 226.08`]
                    },
                    {
                        id: "ARCH-C4", difficulty, stage, geometryType: "silo",
                        promptLatex: `\\\\text{A grain silo: radius } 5\\\\text{m, height } 20\\\\text{m. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "1570", expected: 1570 }],
                        correctLatex: `1,570 \\\\text{ m}^3`,
                        hintLatex: [`3.14 \\times 25 \\times 20 = 1570`]
                    },
                    {
                        id: "ARCH-C5", difficulty, stage, geometryType: "pipe",
                        promptLatex: `\\\\text{A pipe: radius } 2\\\\text{m, length } 50\\\\text{m. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "628", expected: 628 }],
                        correctLatex: `628 \\\\text{ m}^3`,
                        hintLatex: [`3.14 \\times 4 \\times 50 = 628`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "ARCH-A1", difficulty, stage, geometryType: "roche2",
                        promptLatex: `\\\\text{Roche Tower 2 is } 205\\\\text{m. It tapers. If the base is } 2400\\\\text{ m}^2 \\\\text{ and top is } 1800\\\\text{ m}^2, \\\\text{ use the average area for volume.}`,
                        expressionLatex: `V \\approx \\\\frac{A_1 + A_2}{2} \\cdot h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V`, placeholder: "430500", expected: 430500 }],
                        correctLatex: `430,500 \\\\text{ m}^3`,
                        hintLatex: [`(2100) \\times 205 = 430500`]
                    },
                    {
                        id: "ARCH-A2", difficulty, stage, geometryType: "pyramid",
                        promptLatex: `\\\\text{A pyramid has square base } 10\\\\text{m} \\times 10\\\\text{m and height } 15\\\\text{m. Volume?}`,
                        expressionLatex: `V = \\\\frac{1}{3} A_{base} \\cdot h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "500", expected: 500 }],
                        correctLatex: `500 \\\\text{ m}^3`,
                        hintLatex: [`(1/3) \\times 100 \\times 15 = 500`]
                    },
                    {
                        id: "ARCH-A3", difficulty, stage, geometryType: "cone",
                        promptLatex: `\\\\text{A cone has radius } 6\\\\text{m and height } 12\\\\text{m. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{1}{3} \\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "452", expected: 452 }],
                        correctLatex: `452 \\\\text{ m}^3`,
                        hintLatex: [`(1/3) \\times 3.14 \\times 36 \\times 12 = 452.16`]
                    },
                    {
                        id: "ARCH-A4", difficulty, stage, geometryType: "frustum",
                        promptLatex: `\\\\text{A frustum (truncated cone): base radius } 8\\\\text{m, top radius } 4\\\\text{m, height } 10\\\\text{m. Approximate volume using average area.}`,
                        expressionLatex: `V \\approx \\pi \\cdot \\\\frac{r_1^2 + r_2^2}{2} \\cdot h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "1256", expected: 1256 }],
                        correctLatex: `1,256 \\\\text{ m}^3`,
                        hintLatex: [`3.14 \\times 40 \\times 10 = 1256`]
                    },
                    {
                        id: "ARCH-A5", difficulty, stage, geometryType: "composite",
                        promptLatex: `\\\\text{A building: rectangular base } 30\\\\text{m} \\times 20\\\\text{m} \\times 50\\\\text{m topped with pyramid height } 10\\\\text{m. Total volume?}`,
                        expressionLatex: `V = V_{prism} + V_{pyramid}`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "32000", expected: 32000 }],
                        correctLatex: `32,000 \\\\text{ m}^3`,
                        hintLatex: [`30000 + 2000 = 32000`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "ARCH-E1", difficulty, stage, geometryType: "kunstmuseum",
                        promptLatex: `\\\\text{Kunstmuseum Basel skylights are square pyramids with base } 2\\\\text{m and height } 1.5\\\\text{m. Total volume of 100 skylights?}`,
                        expressionLatex: `V = 100 \\cdot \\\\frac{1}{3} a^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V`, placeholder: "200", expected: 200 }],
                        correctLatex: `200 \\\\text{ m}^3`,
                        hintLatex: [`100 \\times (1/3) \\times 4 \\times 1.5 = 100 \\times 2 = 200`]
                    },
                    {
                        id: "ARCH-E2", difficulty, stage, geometryType: "dome",
                        promptLatex: `\\\\text{A hemispherical dome has radius } 10\\\\text{m. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{2}{3} \\pi r^3`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "2093", expected: 2093 }],
                        correctLatex: `2,093 \\\\text{ m}^3`,
                        hintLatex: [`(2/3) \\times 3.14 \\times 1000 = 2093.33`]
                    },
                    {
                        id: "ARCH-E3", difficulty, stage, geometryType: "complex",
                        promptLatex: `\\\\text{A structure: cylinder radius } 5\\\\text{m, height } 20\\\\text{m topped with cone height } 8\\\\text{m. Total volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = V_{cylinder} + V_{cone}`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "1780", expected: 1780 }],
                        correctLatex: `1,780 \\\\text{ m}^3`,
                        hintLatex: [`1570 + 209.33 \\approx 1780`]
                    },
                    {
                        id: "ARCH-E4", difficulty, stage, geometryType: "sphere",
                        promptLatex: `\\\\text{A spherical tank has radius } 6\\\\text{m. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{4}{3} \\pi r^3`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "904", expected: 904 }],
                        correctLatex: `904 \\\\text{ m}^3`,
                        hintLatex: [`(4/3) \\times 3.14 \\times 216 = 904.32`]
                    },
                    {
                        id: "ARCH-E5", difficulty, stage, geometryType: "torus",
                        promptLatex: `\\\\text{A torus (donut) has major radius } 5\\\\text{m and minor radius } 2\\\\text{m. Approximate volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V \\approx 2 \\pi^2 R r^2`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (m}^3\\\\text{)}`, placeholder: "394", expected: 394 }],
                        correctLatex: `394 \\\\text{ m}^3`,
                        hintLatex: [`2 \\times 9.86 \\times 5 \\times 4 \\approx 394`]
                    }
                );
            }
        }

        if (stage === "CROSS_SECTIONS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "CS-B1", difficulty, stage, geometryType: "cube_parallel",
                        promptLatex: `\\\\text{Cube cut parallel to a face. What shape is the cross-section?}`,
                        expressionLatex: `\\\\text{Parallel cut} \\rightarrow \\\\text{same shape as face}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "square", expected: "square" }],
                        correctLatex: `\\\\text{Square}`,
                        hintLatex: [`\\\\text{Cube faces are squares}`]
                    },
                    {
                        id: "CS-B2", difficulty, stage, geometryType: "sphere",
                        promptLatex: `\\\\text{Sphere cut by any plane. What shape is the cross-section?}`,
                        expressionLatex: `\\\\text{Sphere} \\rightarrow \\\\text{always circular}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "circle", expected: "circle" }],
                        correctLatex: `\\\\text{Circle}`,
                        hintLatex: [`\\\\text{All sphere cross-sections are circles}`]
                    },
                    {
                        id: "CS-B3", difficulty, stage, geometryType: "cylinder_perp",
                        promptLatex: `\\\\text{Cylinder cut perpendicular to axis. What shape?}`,
                        expressionLatex: `\\\\text{Perpendicular to axis} \\rightarrow \\\\text{circle}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "circle", expected: "circle" }],
                        correctLatex: `\\\\text{Circle}`,
                        hintLatex: [`\\\\text{Perpendicular cut shows circular base}`]
                    },
                    {
                        id: "CS-B4", difficulty, stage, geometryType: "cylinder_parallel",
                        promptLatex: `\\\\text{Cylinder cut parallel to axis. What shape?}`,
                        expressionLatex: `\\\\text{Parallel to axis} \\rightarrow \\\\text{rectangle}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "rectangle", expected: "rectangle" }],
                        correctLatex: `\\\\text{Rectangle}`,
                        hintLatex: [`\\\\text{Parallel cut shows side view}`]
                    },
                    {
                        id: "CS-B5", difficulty, stage, geometryType: "cone_perp",
                        promptLatex: `\\\\text{Cone cut perpendicular to axis. What shape?}`,
                        expressionLatex: `\\\\text{Perpendicular} \\rightarrow \\\\text{circle}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "circle", expected: "circle" }],
                        correctLatex: `\\\\text{Circle}`,
                        hintLatex: [`\\\\text{Horizontal cut through cone is circular}`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "CS-C1", difficulty, stage, geometryType: "cube_diagonal",
                        promptLatex: `\\\\text{Cube cut diagonally through opposite edges. What shape?}`,
                        expressionLatex: `\\\\text{Diagonal cut} \\rightarrow \\\\text{rectangle}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "rectangle", expected: "rectangle" }],
                        correctLatex: `\\\\text{Rectangle}`,
                        hintLatex: [`\\\\text{Diagonal cut creates rectangle}`]
                    },
                    {
                        id: "CS-C2", difficulty, stage, geometryType: "cylinder_angle",
                        promptLatex: `\\\\text{Cylinder cut at angle to axis. What shape?}`,
                        expressionLatex: `\\\\text{Angled cut} \\rightarrow \\\\text{ellipse}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "ellipse", expected: "ellipse" }],
                        correctLatex: `\\\\text{Ellipse}`,
                        hintLatex: [`\\\\text{Angled cut stretches circle into ellipse}`]
                    },
                    {
                        id: "CS-C3", difficulty, stage, geometryType: "cone_parallel",
                        promptLatex: `\\\\text{Cone cut parallel to base. What shape?}`,
                        expressionLatex: `\\\\text{Parallel to base} \\rightarrow \\\\text{circle}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "circle", expected: "circle" }],
                        correctLatex: `\\\\text{Circle (smaller than base)}`,
                        hintLatex: [`\\\\text{Parallel cut is circular, smaller radius}`]
                    },
                    {
                        id: "CS-C4", difficulty, stage, geometryType: "pyramid",
                        promptLatex: `\\\\text{Square pyramid cut parallel to base. What shape?}`,
                        expressionLatex: `\\\\text{Parallel} \\rightarrow \\\\text{similar shape}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "square", expected: "square" }],
                        correctLatex: `\\\\text{Square (smaller)}`,
                        hintLatex: [`\\\\text{Parallel cut creates similar square}`]
                    },
                    {
                        id: "CS-C5", difficulty, stage, geometryType: "prism",
                        promptLatex: `\\\\text{Triangular prism cut perpendicular to length. What shape?}`,
                        expressionLatex: `\\\\text{Perpendicular} \\rightarrow \\\\text{base shape}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "triangle", expected: "triangle" }],
                        correctLatex: `\\\\text{Triangle}`,
                        hintLatex: [`\\\\text{Shows triangular base}`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "CS-A1", difficulty, stage, geometryType: "cone_parabola",
                        promptLatex: `\\\\text{Cone cut parallel to slant edge. What conic section?}`,
                        expressionLatex: `\\\\text{Parallel to edge} \\rightarrow \\\\text{parabola}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "parabola", expected: "parabola" }],
                        correctLatex: `\\\\text{Parabola}`,
                        hintLatex: [`\\\\text{Parallel to slant creates parabola}`]
                    },
                    {
                        id: "CS-A2", difficulty, stage, geometryType: "cone_hyperbola",
                        promptLatex: `\\\\text{Cone cut parallel to axis. What conic section?}`,
                        expressionLatex: `\\\\text{Parallel to axis} \\rightarrow \\\\text{hyperbola}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "hyperbola", expected: "hyperbola" }],
                        correctLatex: `\\\\text{Hyperbola}`,
                        hintLatex: [`\\\\text{Steep cut creates hyperbola}`]
                    },
                    {
                        id: "CS-A3", difficulty, stage, geometryType: "cube_hexagon",
                        promptLatex: `\\\\text{Cube cut through 6 edge midpoints. What shape?}`,
                        expressionLatex: `\\\\text{Through edge midpoints} \\rightarrow \\\\text{hexagon}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "hexagon", expected: "hexagon" }],
                        correctLatex: `\\\\text{Regular hexagon}`,
                        hintLatex: [`\\\\text{Special diagonal cut creates hexagon}`]
                    },
                    {
                        id: "CS-A4", difficulty, stage, geometryType: "area",
                        promptLatex: `\\\\text{Cube edge 4 cm, cut parallel to face at midpoint. Cross-section area?}`,
                        expressionLatex: `A = a^2`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\\\text{ (cm}^2\\\\text{)}`, placeholder: "16", expected: 16 }],
                        correctLatex: `16\\\\text{ cm}^2`,
                        hintLatex: [`4^2 = 16`]
                    },
                    {
                        id: "CS-A5", difficulty, stage, geometryType: "cylinder_ellipse",
                        promptLatex: `\\\\text{Cylinder radius 3 cm cut at 45° angle. Cross-section is ellipse. Minor axis?}`,
                        expressionLatex: `\\\\text{Minor axis} = 2r`,
                        targetLatex: `b`,
                        slots: [{ id: "minor", labelLatex: `b\\\\text{ (cm)}`, placeholder: "6", expected: 6 }],
                        correctLatex: `6\\\\text{ cm}`,
                        hintLatex: [`\\\\text{Minor axis equals diameter: } 2 \\times 3 = 6`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "CS-E1", difficulty, stage, geometryType: "max_area",
                        promptLatex: `\\\\text{Sphere radius 5 cm. Maximum cross-section area?}`,
                        expressionLatex: `A_{\\\\text{max}} = \\pi r^2 \\\\text{ (through center)}`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\\\text{ (cm}^2\\\\text{)}`, placeholder: "79", expected: 79 }],
                        correctLatex: `78.5\\\\text{ cm}^2`,
                        hintLatex: [`\\pi \\times 5^2 \\approx 78.5`]
                    },
                    {
                        id: "CS-E2", difficulty, stage, geometryType: "cylinder_max",
                        promptLatex: `\\\\text{Cylinder: radius 3 cm, height 8 cm. Max rectangular cross-section area?}`,
                        expressionLatex: `A_{\\\\text{max}} = 2r \\times h`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\\\text{ (cm}^2\\\\text{)}`, placeholder: "48", expected: 48 }],
                        correctLatex: `48\\\\text{ cm}^2`,
                        hintLatex: [`2 \\times 3 \\times 8 = 48`]
                    },
                    {
                        id: "CS-E3", difficulty, stage, geometryType: "cone_ellipse",
                        promptLatex: `\\\\text{Cone: base radius 4 cm, cut at angle creating ellipse. Min axis 4 cm. Max axis?}`,
                        expressionLatex: `\\\\text{Ellipse from angled cut}`,
                        targetLatex: `a`,
                        slots: [{ id: "axis", labelLatex: `a\\\\text{ (cm)}`, placeholder: "8", expected: 8 }],
                        correctLatex: `> 4\\\\text{ cm (depends on angle)}`,
                        hintLatex: [`\\\\text{Angled cut stretches circle}`]
                    },
                    {
                        id: "CS-E4", difficulty, stage, geometryType: "torus",
                        promptLatex: `\\\\text{Torus (donut) cut through center hole. What shape?}`,
                        expressionLatex: `\\\\text{Torus cross-section}`,
                        targetLatex: `\\\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\\\text{Shape}`, placeholder: "circles", expected: "circles" }],
                        correctLatex: `\\\\text{Two circles}`,
                        hintLatex: [`\\\\text{Cut shows two circular tubes}`]
                    },
                    {
                        id: "CS-E5", difficulty, stage, geometryType: "pyramid_diagonal",
                        promptLatex: `\\\\text{Square pyramid: base 6 cm, height 8 cm. Cut through apex and base diagonal. Cross-section area?}`,
                        expressionLatex: `A = \\\\frac{1}{2} \\times \\\\text{diagonal} \\times h`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\\\text{ (cm}^2\\\\text{)}`, placeholder: "34", expected: 34 }],
                        correctLatex: `33.9\\\\text{ cm}^2`,
                        hintLatex: [`\\\\text{Diagonal} = 6\\\\sqrt{2} \\approx 8.49, \\; A = \\\\frac{1}{2} \\times 8.49 \\times 8 \\approx 34`]
                    }
                );
            }
        }

        if (stage === "CURVED_SOLIDS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "CURVE-B1", difficulty, stage, geometryType: "sphere_vol",
                        promptLatex: `\\\\text{A liposome (sphere) has radius } 3\\mu\\\\text{m. Calculate volume.} (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{4}{3}\\pi r^3`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V`, placeholder: "113", expected: 113.04 }],
                        correctLatex: `113.04 \\mu\\\\text{m}^3`,
                        hintLatex: [`4/3 \\times 3.14 \\times 27 = 113.04`]
                    },
                    {
                        id: "CURVE-B2", difficulty, stage, geometryType: "sphere",
                        promptLatex: `\\\\text{A sphere has radius } 5\\\\text{cm. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{4}{3}\\pi r^3`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "523", expected: 523 }],
                        correctLatex: `523 \\\\text{ cm}^3`,
                        hintLatex: [`(4/3) \\times 3.14 \\times 125 = 523.33`]
                    },
                    {
                        id: "CURVE-B3", difficulty, stage, geometryType: "cylinder_basic",
                        promptLatex: `\\\\text{A cylinder: radius } 3\\\\text{cm, height } 10\\\\text{cm. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "283", expected: 283 }],
                        correctLatex: `283 \\\\text{ cm}^3`,
                        hintLatex: [`3.14 \\times 9 \\times 10 = 282.6`]
                    },
                    {
                        id: "CURVE-B4", difficulty, stage, geometryType: "cone_basic",
                        promptLatex: `\\\\text{A cone: radius } 4\\\\text{cm, height } 9\\\\text{cm. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{1}{3}\\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "151", expected: 151 }],
                        correctLatex: `151 \\\\text{ cm}^3`,
                        hintLatex: [`(1/3) \\times 3.14 \\times 16 \\times 9 = 150.72`]
                    },
                    {
                        id: "CURVE-B5", difficulty, stage, geometryType: "hemisphere",
                        promptLatex: `\\\\text{A hemisphere has radius } 6\\\\text{cm. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{2}{3}\\pi r^3`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "452", expected: 452 }],
                        correctLatex: `452 \\\\text{ cm}^3`,
                        hintLatex: [`(2/3) \\times 3.14 \\times 216 = 452.16`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "CURVE-C1", difficulty, stage, geometryType: "cylinder_sa",
                        promptLatex: `\\\\text{Novartis delivery tube: } r=2\\\\text{cm, } h=10\\\\text{cm. Total surface area?}`,
                        expressionLatex: `A = 2\\pi r h + 2\\pi r^2`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A`, placeholder: "150.7", expected: 150.72 }],
                        correctLatex: `150.72 \\\\text{ cm}^2`,
                        hintLatex: [`2 \\times 3.14 \\times 2 \\times 10 + 2 \\times 3.14 \\times 4 = 125.6 + 25.12 = 150.72`]
                    },
                    {
                        id: "CURVE-C2", difficulty, stage, geometryType: "sphere_sa",
                        promptLatex: `\\\\text{A sphere has radius } 7\\\\text{cm. Surface area? } (\\pi \\approx 3.14)`,
                        expressionLatex: `A = 4\\pi r^2`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\\\text{ (cm}^2\\\\text{)}`, placeholder: "616", expected: 616 }],
                        correctLatex: `616 \\\\text{ cm}^2`,
                        hintLatex: [`4 \\times 3.14 \\times 49 = 615.44`]
                    },
                    {
                        id: "CURVE-C3", difficulty, stage, geometryType: "cone_sa",
                        promptLatex: `\\\\text{A cone: radius } 5\\\\text{cm, slant height } 13\\\\text{cm. Lateral surface area? } (\\pi \\approx 3.14)`,
                        expressionLatex: `A = \\pi r l`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\\\text{ (cm}^2\\\\text{)}`, placeholder: "204", expected: 204 }],
                        correctLatex: `204 \\\\text{ cm}^2`,
                        hintLatex: [`3.14 \\times 5 \\times 13 = 204.1`]
                    },
                    {
                        id: "CURVE-C4", difficulty, stage, geometryType: "cylinder_lateral",
                        promptLatex: `\\\\text{A cylinder: radius } 4\\\\text{cm, height } 15\\\\text{cm. Lateral surface area? } (\\pi \\approx 3.14)`,
                        expressionLatex: `A = 2\\pi r h`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\\\text{ (cm}^2\\\\text{)}`, placeholder: "377", expected: 377 }],
                        correctLatex: `377 \\\\text{ cm}^2`,
                        hintLatex: [`2 \\times 3.14 \\times 4 \\times 15 = 376.8`]
                    },
                    {
                        id: "CURVE-C5", difficulty, stage, geometryType: "hemisphere_sa",
                        promptLatex: `\\\\text{A hemisphere: radius } 8\\\\text{cm. Total surface area (curved + base)? } (\\pi \\approx 3.14)`,
                        expressionLatex: `A = 3\\pi r^2`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\\\text{ (cm}^2\\\\text{)}`, placeholder: "603", expected: 603 }],
                        correctLatex: `603 \\\\text{ cm}^2`,
                        hintLatex: [`3 \\times 3.14 \\times 64 = 602.88`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "CURVE-A1", difficulty, stage, geometryType: "cone_vol",
                        promptLatex: `\\\\text{A conical storage bin: } r=1.5\\\\text{m, } h=4\\\\text{m. Volume?}`,
                        expressionLatex: `V = \\\\frac{1}{3}\\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V`, placeholder: "9.42", expected: 9.42 }],
                        correctLatex: `9.42 \\\\text{ m}^3`,
                        hintLatex: [`(1/3) \\times 3.14 \\times 2.25 \\times 4 = 9.42`]
                    },
                    {
                        id: "CURVE-A2", difficulty, stage, geometryType: "sphere_segment",
                        promptLatex: `\\\\text{A spherical cap: sphere radius } 10\\\\text{cm, cap height } 3\\\\text{cm. Approximate volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V \\approx \\\\frac{1}{3}\\pi h^2(3r - h)`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "254", expected: 254 }],
                        correctLatex: `254 \\\\text{ cm}^3`,
                        hintLatex: [`(1/3) \\times 3.14 \\times 9 \\times 27 = 254.34`]
                    },
                    {
                        id: "CURVE-A3", difficulty, stage, geometryType: "torus_approx",
                        promptLatex: `\\\\text{A torus: major radius } 8\\\\text{cm, minor radius } 3\\\\text{cm. Approximate volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V \\approx 2\\pi^2 R r^2`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "1420", expected: 1420 }],
                        correctLatex: `1,420 \\\\text{ cm}^3`,
                        hintLatex: [`2 \\times 9.86 \\times 8 \\times 9 \\approx 1420`]
                    },
                    {
                        id: "CURVE-A4", difficulty, stage, geometryType: "ellipsoid",
                        promptLatex: `\\\\text{An ellipsoid: semi-axes } a=5, b=4, c=3\\\\text{cm. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{4}{3}\\pi abc`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "251", expected: 251 }],
                        correctLatex: `251 \\\\text{ cm}^3`,
                        hintLatex: [`(4/3) \\times 3.14 \\times 60 = 251.2`]
                    },
                    {
                        id: "CURVE-A5", difficulty, stage, geometryType: "paraboloid",
                        promptLatex: `\\\\text{A paraboloid: base radius } 6\\\\text{cm, height } 8\\\\text{cm. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{1}{2}\\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "452", expected: 452 }],
                        correctLatex: `452 \\\\text{ cm}^3`,
                        hintLatex: [`0.5 \\times 3.14 \\times 36 \\times 8 = 452.16`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "CURVE-E1", difficulty, stage, geometryType: "composite_sphere_cone",
                        promptLatex: `\\\\text{A structure: hemisphere radius } 5\\\\text{cm on top of cone radius } 5\\\\text{cm, height } 12\\\\text{cm. Total volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = V_{hemisphere} + V_{cone}`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "576", expected: 576 }],
                        correctLatex: `576 \\\\text{ cm}^3`,
                        hintLatex: [`261.67 + 314 = 575.67`]
                    },
                    {
                        id: "CURVE-E2", difficulty, stage, geometryType: "hollow_sphere",
                        promptLatex: `\\\\text{A hollow sphere: outer radius } 10\\\\text{cm, inner radius } 8\\\\text{cm. Volume of material? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{4}{3}\\pi(R^3 - r^3)`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "1877", expected: 1877 }],
                        correctLatex: `1,877 \\\\text{ cm}^3`,
                        hintLatex: [`(4/3) \\times 3.14 \\times (1000 - 512) = 1877.33`]
                    },
                    {
                        id: "CURVE-E3", difficulty, stage, geometryType: "spherical_shell",
                        promptLatex: `\\\\text{A spherical shell: outer radius } 12\\\\text{cm, thickness } 2\\\\text{cm. Volume of shell? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{4}{3}\\pi(R^3 - r^3)`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "1206", expected: 1206 }],
                        correctLatex: `1,206 \\\\text{ cm}^3`,
                        hintLatex: [`(4/3) \\times 3.14 \\times (1728 - 1000) = 1205.76`]
                    },
                    {
                        id: "CURVE-E4", difficulty, stage, geometryType: "truncated_cone",
                        promptLatex: `\\\\text{A frustum: base radius } 10\\\\text{cm, top radius } 6\\\\text{cm, height } 12\\\\text{cm. Volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = \\\\frac{1}{3}\\pi h(R^2 + Rr + r^2)`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "2111", expected: 2111 }],
                        correctLatex: `2,111 \\\\text{ cm}^3`,
                        hintLatex: [`(1/3) \\times 3.14 \\times 12 \\times 196 = 2110.93`]
                    },
                    {
                        id: "CURVE-E5", difficulty, stage, geometryType: "composite_complex",
                        promptLatex: `\\\\text{A capsule: cylinder radius } 4\\\\text{cm, height } 10\\\\text{cm with hemispheres on both ends. Total volume? } (\\pi \\approx 3.14)`,
                        expressionLatex: `V = V_{cylinder} + 2V_{hemisphere}`,
                        targetLatex: `V`,
                        slots: [{ id: "vol", labelLatex: `V\\\\text{ (cm}^3\\\\text{)}`, placeholder: "770", expected: 770 }],
                        correctLatex: `770 \\\\text{ cm}^3`,
                        hintLatex: [`502.4 + 267.95 = 770.35`]
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
    } = useQuestManager<SM305Quest, Stage>({
        buildPool,
        initialStage: "BASEL_ARCH",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm3-05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "BASEL_ARCH" as Stage, label: t("sm3_05.stages.basel_arch") },
        { id: "CROSS_SECTIONS" as Stage, label: t("sm3_05.stages.cross_sections") },
        { id: "CURVED_SOLIDS" as Stage, label: t("sm3_05.stages.curved_solids") },
    ], [t]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t("sm3_05.title")}
                moduleCode="SM3.05"
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                stages={stagesProps}
                currentStage={stage}
                onStageChange={(s) => handleStageChange(s as Stage)}
                footerLeft={t("sm3_05.footer_left")}
                translations={{
                    back: t("sm3_05.back"),
                    check: t("sm3_05.check"),
                    next: t("sm3_05.next"),
                    correct: t("sm3_05.correct"),
                    incorrect: t("sm3_05.incorrect"),
                    difficulty: {
                        basic: t("sm3_05.difficulty.basic"),
                        core: t("sm3_05.difficulty.core"),
                        advanced: t("sm3_05.difficulty.advanced"),
                        elite: t("sm3_05.difficulty.elite"),
                    },
                }}
                monitorContent={<GeometryVisualization stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t("sm3_05.title")}
            moduleCode="SM3.05"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sm3_05.footer_left")}
            translations={{
                back: t("sm3_05.back"),
                check: t("sm3_05.check"),
                next: t("sm3_05.next"),
                correct: t("sm3_05.correct"),
                incorrect: t("sm3_05.incorrect"),
                difficulty: {
                    basic: t("sm3_05.difficulty.basic"),
                    core: t("sm3_05.difficulty.core"),
                    advanced: t("sm3_05.difficulty.advanced"),
                    elite: t("sm3_05.difficulty.elite"),
                },
            }}
            monitorContent={<GeometryVisualization stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/30">
                    <h3 className="text-green-400 font-bold mb-2">{t("sm3_05.objective_title")}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t(`sm3_05.scenarios.${stage.toLowerCase()}`)}
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        <InlineMath math={currentQuest.promptLatex} />
                    </div>

                    <div className="text-green-300">
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
