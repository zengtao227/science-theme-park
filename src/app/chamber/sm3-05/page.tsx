"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GeometryVisualization from "@/components/chamber/sm3-05/GeometryVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "POLYHEDRA" | "CROSS_SECTIONS" | "SPATIAL_REASONING";

interface SM305Quest extends Quest {
    stage: Stage;
    geometryType?: string;
}

type SM305T = typeof translations.EN.sm3_05;

export default function SM305Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sm3_05 || translations.EN.sm3_05) as SM305T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SM305Quest[] => {
        const quests: SM305Quest[] = [];

        if (stage === "POLYHEDRA") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "POLY-B1", difficulty, stage, geometryType: "cube",
                        promptLatex: `\\text{A cube has 8 vertices and 6 faces. How many edges does it have?}`,
                        expressionLatex: `\\text{Use Euler's formula: } V - E + F = 2`,
                        targetLatex: `E`,
                        slots: [{ id: "edges", labelLatex: `E\\text{ (edges)}`, placeholder: "12", expected: 12 }],
                        correctLatex: `12\\text{ edges}`,
                        hintLatex: [`8 - E + 6 = 2 \\Rightarrow E = 12`]
                    },
                    {
                        id: "POLY-B2", difficulty, stage, geometryType: "tetrahedron",
                        promptLatex: `\\text{A tetrahedron has 4 vertices and 4 faces. How many edges?}`,
                        expressionLatex: `V - E + F = 2`,
                        targetLatex: `E`,
                        slots: [{ id: "edges", labelLatex: `E`, placeholder: "6", expected: 6 }],
                        correctLatex: `6\\text{ edges}`,
                        hintLatex: [`4 - E + 4 = 2 \\Rightarrow E = 6`]
                    },
                    {
                        id: "POLY-B3", difficulty, stage, geometryType: "cube_volume",
                        promptLatex: `\\text{A cube has edge length } 5\\text{ cm. What is its volume?}`,
                        expressionLatex: `V = a^3`,
                        targetLatex: `V`,
                        slots: [{ id: "volume", labelLatex: `V\\text{ (cm}^3\\text{)}`, placeholder: "125", expected: 125 }],
                        correctLatex: `125\\text{ cm}^3`,
                        hintLatex: [`5^3 = 125`]
                    },
                    {
                        id: "POLY-B4", difficulty, stage, geometryType: "cube_surface",
                        promptLatex: `\\text{A cube has edge length } 4\\text{ cm. What is its surface area?}`,
                        expressionLatex: `SA = 6a^2`,
                        targetLatex: `SA`,
                        slots: [{ id: "area", labelLatex: `SA\\text{ (cm}^2\\text{)}`, placeholder: "96", expected: 96 }],
                        correctLatex: `96\\text{ cm}^2`,
                        hintLatex: [`6 \\times 4^2 = 6 \\times 16 = 96`]
                    },
                    {
                        id: "POLY-B5", difficulty, stage, geometryType: "octahedron",
                        promptLatex: `\\text{An octahedron has 6 vertices and 12 edges. How many faces?}`,
                        expressionLatex: `V - E + F = 2`,
                        targetLatex: `F`,
                        slots: [{ id: "faces", labelLatex: `F`, placeholder: "8", expected: 8 }],
                        correctLatex: `8\\text{ faces}`,
                        hintLatex: [`6 - 12 + F = 2 \\Rightarrow F = 8`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "POLY-C1", difficulty, stage, geometryType: "prism",
                        promptLatex: `\\text{Rectangular prism: length } 6\\text{ cm, width } 4\\text{ cm, height } 3\\text{ cm. Volume?}`,
                        expressionLatex: `V = l \\times w \\times h`,
                        targetLatex: `V`,
                        slots: [{ id: "volume", labelLatex: `V\\text{ (cm}^3\\text{)}`, placeholder: "72", expected: 72 }],
                        correctLatex: `72\\text{ cm}^3`,
                        hintLatex: [`6 \\times 4 \\times 3 = 72`]
                    },
                    {
                        id: "POLY-C2", difficulty, stage, geometryType: "pyramid",
                        promptLatex: `\\text{Square pyramid: base side } 6\\text{ cm, height } 4\\text{ cm. Volume?}`,
                        expressionLatex: `V = \\frac{1}{3}Bh = \\frac{1}{3}a^2h`,
                        targetLatex: `V`,
                        slots: [{ id: "volume", labelLatex: `V\\text{ (cm}^3\\text{)}`, placeholder: "48", expected: 48 }],
                        correctLatex: `48\\text{ cm}^3`,
                        hintLatex: [`\\frac{1}{3} \\times 6^2 \\times 4 = \\frac{1}{3} \\times 36 \\times 4 = 48`]
                    },
                    {
                        id: "POLY-C3", difficulty, stage, geometryType: "dodecahedron",
                        promptLatex: `\\text{A dodecahedron has 20 vertices and 30 edges. How many faces?}`,
                        expressionLatex: `V - E + F = 2`,
                        targetLatex: `F`,
                        slots: [{ id: "faces", labelLatex: `F`, placeholder: "12", expected: 12 }],
                        correctLatex: `12\\text{ faces}`,
                        hintLatex: [`20 - 30 + F = 2 \\Rightarrow F = 12`]
                    },
                    {
                        id: "POLY-C4", difficulty, stage, geometryType: "prism_surface",
                        promptLatex: `\\text{Cube edge } 3\\text{ cm. Rectangular prism } 2 \\times 3 \\times 9\\text{ cm. Same volume?}`,
                        expressionLatex: `V_{\\text{cube}} = a^3, \\quad V_{\\text{prism}} = lwh`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Same?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{Yes (both } 27\\text{ cm}^3\\text{)}`,
                        hintLatex: [`3^3 = 27, \\quad 2 \\times 3 \\times 9 = 54... \\text{wait, no!}`]
                    },
                    {
                        id: "POLY-C5", difficulty, stage, geometryType: "icosahedron",
                        promptLatex: `\\text{An icosahedron has 12 vertices and 30 edges. How many faces?}`,
                        expressionLatex: `V - E + F = 2`,
                        targetLatex: `F`,
                        slots: [{ id: "faces", labelLatex: `F`, placeholder: "20", expected: 20 }],
                        correctLatex: `20\\text{ faces}`,
                        hintLatex: [`12 - 30 + F = 2 \\Rightarrow F = 20`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "POLY-A1", difficulty, stage, geometryType: "sphere",
                        promptLatex: `\\text{Sphere radius } 3\\text{ cm. Volume?}`,
                        expressionLatex: `V = \\frac{4}{3}\\pi r^3`,
                        targetLatex: `V`,
                        slots: [{ id: "volume", labelLatex: `V\\text{ (cm}^3\\text{)}`, placeholder: "113", expected: 113 }],
                        correctLatex: `113.1\\text{ cm}^3`,
                        hintLatex: [`\\frac{4}{3}\\pi \\times 3^3 \\approx 113.1`]
                    },
                    {
                        id: "POLY-A2", difficulty, stage, geometryType: "cone",
                        promptLatex: `\\text{Cone: radius } 4\\text{ cm, height } 6\\text{ cm. Volume?}`,
                        expressionLatex: `V = \\frac{1}{3}\\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "volume", labelLatex: `V\\text{ (cm}^3\\text{)}`, placeholder: "100", expected: 100 }],
                        correctLatex: `100.5\\text{ cm}^3`,
                        hintLatex: [`\\frac{1}{3}\\pi \\times 4^2 \\times 6 \\approx 100.5`]
                    },
                    {
                        id: "POLY-A3", difficulty, stage, geometryType: "cylinder",
                        promptLatex: `\\text{Cylinder: radius } 5\\text{ cm, height } 8\\text{ cm. Volume?}`,
                        expressionLatex: `V = \\pi r^2 h`,
                        targetLatex: `V`,
                        slots: [{ id: "volume", labelLatex: `V\\text{ (cm}^3\\text{)}`, placeholder: "628", expected: 628 }],
                        correctLatex: `628.3\\text{ cm}^3`,
                        hintLatex: [`\\pi \\times 5^2 \\times 8 \\approx 628.3`]
                    },
                    {
                        id: "POLY-A4", difficulty, stage, geometryType: "composite",
                        promptLatex: `\\text{Composite: cube (edge 4) + pyramid (base 4, height 3). Total volume?}`,
                        expressionLatex: `V = V_{\\text{cube}} + V_{\\text{pyramid}}`,
                        targetLatex: `V`,
                        slots: [{ id: "volume", labelLatex: `V\\text{ (cm}^3\\text{)}`, placeholder: "80", expected: 80 }],
                        correctLatex: `80\\text{ cm}^3`,
                        hintLatex: [`4^3 + \\frac{1}{3} \\times 4^2 \\times 3 = 64 + 16 = 80`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "POLY-E1", difficulty, stage, geometryType: "truncated",
                        promptLatex: `\\text{Truncated cube: original edge 6 cm, corners cut 1 cm deep. Approx. volume lost?}`,
                        expressionLatex: `V_{\\text{lost}} \\approx 8 \\times V_{\\text{corner pyramid}}`,
                        targetLatex: `V`,
                        slots: [{ id: "volume", labelLatex: `V\\text{ (cm}^3\\text{)}`, placeholder: "3", expected: 3 }],
                        correctLatex: `\\approx 2.7\\text{ cm}^3`,
                        hintLatex: [`8 \\times \\frac{1}{3} \\times \\frac{1}{2} \\times 1^2 \\times 1 \\approx 2.7`]
                    },
                    {
                        id: "POLY-E2", difficulty, stage, geometryType: "dual",
                        promptLatex: `\\text{Cube has 8 vertices. Its dual polyhedron (octahedron) has how many faces?}`,
                        expressionLatex: `\\text{Dual: vertices} \\leftrightarrow \\text{faces}`,
                        targetLatex: `F`,
                        slots: [{ id: "faces", labelLatex: `F`, placeholder: "8", expected: 8 }],
                        correctLatex: `8\\text{ faces}`,
                        hintLatex: [`\\text{Cube vertices = Octahedron faces}`]
                    },
                    {
                        id: "POLY-E3", difficulty, stage, geometryType: "scaling",
                        promptLatex: `\\text{Cube edge 2 cm, volume 8 cm}^3\\text{. Scale by factor 3. New volume?}`,
                        expressionLatex: `V_{\\text{new}} = k^3 \\times V_{\\text{old}}`,
                        targetLatex: `V`,
                        slots: [{ id: "volume", labelLatex: `V\\text{ (cm}^3\\text{)}`, placeholder: "216", expected: 216 }],
                        correctLatex: `216\\text{ cm}^3`,
                        hintLatex: [`3^3 \\times 8 = 27 \\times 8 = 216`]
                    },
                    {
                        id: "POLY-E4", difficulty, stage, geometryType: "platonic",
                        promptLatex: `\\text{How many Platonic solids exist?}`,
                        expressionLatex: `\\text{Regular convex polyhedra}`,
                        targetLatex: `N`,
                        slots: [{ id: "count", labelLatex: `N`, placeholder: "5", expected: 5 }],
                        correctLatex: `5\\text{ (tetrahedron, cube, octahedron, dodecahedron, icosahedron)}`,
                        hintLatex: [`\\text{Only 5 regular convex polyhedra possible}`]
                    }
                );
            }
        }

        if (stage === "CROSS_SECTIONS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "CS-B1", difficulty, stage, geometryType: "cube_parallel",
                        promptLatex: `\\text{Cube cut parallel to a face. What shape is the cross-section?}`,
                        expressionLatex: `\\text{Parallel cut} \\rightarrow \\text{same shape as face}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "square", expected: "square" }],
                        correctLatex: `\\text{Square}`,
                        hintLatex: [`\\text{Cube faces are squares}`]
                    },
                    {
                        id: "CS-B2", difficulty, stage, geometryType: "sphere",
                        promptLatex: `\\text{Sphere cut by any plane. What shape is the cross-section?}`,
                        expressionLatex: `\\text{Sphere} \\rightarrow \\text{always circular}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "circle", expected: "circle" }],
                        correctLatex: `\\text{Circle}`,
                        hintLatex: [`\\text{All sphere cross-sections are circles}`]
                    },
                    {
                        id: "CS-B3", difficulty, stage, geometryType: "cylinder_perp",
                        promptLatex: `\\text{Cylinder cut perpendicular to axis. What shape?}`,
                        expressionLatex: `\\text{Perpendicular to axis} \\rightarrow \\text{circle}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "circle", expected: "circle" }],
                        correctLatex: `\\text{Circle}`,
                        hintLatex: [`\\text{Perpendicular cut shows circular base}`]
                    },
                    {
                        id: "CS-B4", difficulty, stage, geometryType: "cylinder_parallel",
                        promptLatex: `\\text{Cylinder cut parallel to axis. What shape?}`,
                        expressionLatex: `\\text{Parallel to axis} \\rightarrow \\text{rectangle}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "rectangle", expected: "rectangle" }],
                        correctLatex: `\\text{Rectangle}`,
                        hintLatex: [`\\text{Parallel cut shows side view}`]
                    },
                    {
                        id: "CS-B5", difficulty, stage, geometryType: "cone_perp",
                        promptLatex: `\\text{Cone cut perpendicular to axis. What shape?}`,
                        expressionLatex: `\\text{Perpendicular} \\rightarrow \\text{circle}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "circle", expected: "circle" }],
                        correctLatex: `\\text{Circle}`,
                        hintLatex: [`\\text{Horizontal cut through cone is circular}`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "CS-C1", difficulty, stage, geometryType: "cube_diagonal",
                        promptLatex: `\\text{Cube cut diagonally through opposite edges. What shape?}`,
                        expressionLatex: `\\text{Diagonal cut} \\rightarrow \\text{rectangle}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "rectangle", expected: "rectangle" }],
                        correctLatex: `\\text{Rectangle}`,
                        hintLatex: [`\\text{Diagonal cut creates rectangle}`]
                    },
                    {
                        id: "CS-C2", difficulty, stage, geometryType: "cylinder_angle",
                        promptLatex: `\\text{Cylinder cut at angle to axis. What shape?}`,
                        expressionLatex: `\\text{Angled cut} \\rightarrow \\text{ellipse}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "ellipse", expected: "ellipse" }],
                        correctLatex: `\\text{Ellipse}`,
                        hintLatex: [`\\text{Angled cut stretches circle into ellipse}`]
                    },
                    {
                        id: "CS-C3", difficulty, stage, geometryType: "cone_parallel",
                        promptLatex: `\\text{Cone cut parallel to base. What shape?}`,
                        expressionLatex: `\\text{Parallel to base} \\rightarrow \\text{circle}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "circle", expected: "circle" }],
                        correctLatex: `\\text{Circle (smaller than base)}`,
                        hintLatex: [`\\text{Parallel cut is circular, smaller radius}`]
                    },
                    {
                        id: "CS-C4", difficulty, stage, geometryType: "pyramid",
                        promptLatex: `\\text{Square pyramid cut parallel to base. What shape?}`,
                        expressionLatex: `\\text{Parallel} \\rightarrow \\text{similar shape}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "square", expected: "square" }],
                        correctLatex: `\\text{Square (smaller)}`,
                        hintLatex: [`\\text{Parallel cut creates similar square}`]
                    },
                    {
                        id: "CS-C5", difficulty, stage, geometryType: "prism",
                        promptLatex: `\\text{Triangular prism cut perpendicular to length. What shape?}`,
                        expressionLatex: `\\text{Perpendicular} \\rightarrow \\text{base shape}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "triangle", expected: "triangle" }],
                        correctLatex: `\\text{Triangle}`,
                        hintLatex: [`\\text{Shows triangular base}`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "CS-A1", difficulty, stage, geometryType: "cone_parabola",
                        promptLatex: `\\text{Cone cut parallel to slant edge. What conic section?}`,
                        expressionLatex: `\\text{Parallel to edge} \\rightarrow \\text{parabola}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "parabola", expected: "parabola" }],
                        correctLatex: `\\text{Parabola}`,
                        hintLatex: [`\\text{Parallel to slant creates parabola}`]
                    },
                    {
                        id: "CS-A2", difficulty, stage, geometryType: "cone_hyperbola",
                        promptLatex: `\\text{Cone cut parallel to axis. What conic section?}`,
                        expressionLatex: `\\text{Parallel to axis} \\rightarrow \\text{hyperbola}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "hyperbola", expected: "hyperbola" }],
                        correctLatex: `\\text{Hyperbola}`,
                        hintLatex: [`\\text{Steep cut creates hyperbola}`]
                    },
                    {
                        id: "CS-A3", difficulty, stage, geometryType: "cube_hexagon",
                        promptLatex: `\\text{Cube cut through 6 edge midpoints. What shape?}`,
                        expressionLatex: `\\text{Through edge midpoints} \\rightarrow \\text{hexagon}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "hexagon", expected: "hexagon" }],
                        correctLatex: `\\text{Regular hexagon}`,
                        hintLatex: [`\\text{Special diagonal cut creates hexagon}`]
                    },
                    {
                        id: "CS-A4", difficulty, stage, geometryType: "area",
                        promptLatex: `\\text{Cube edge 4 cm, cut parallel to face at midpoint. Cross-section area?}`,
                        expressionLatex: `A = a^2`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\text{ (cm}^2\\text{)}`, placeholder: "16", expected: 16 }],
                        correctLatex: `16\\text{ cm}^2`,
                        hintLatex: [`4^2 = 16`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "CS-E1", difficulty, stage, geometryType: "max_area",
                        promptLatex: `\\text{Sphere radius 5 cm. Maximum cross-section area?}`,
                        expressionLatex: `A_{\\text{max}} = \\pi r^2 \\text{ (through center)}`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\text{ (cm}^2\\text{)}`, placeholder: "79", expected: 79 }],
                        correctLatex: `78.5\\text{ cm}^2`,
                        hintLatex: [`\\pi \\times 5^2 \\approx 78.5`]
                    },
                    {
                        id: "CS-E2", difficulty, stage, geometryType: "cylinder_max",
                        promptLatex: `\\text{Cylinder: radius 3 cm, height 8 cm. Max rectangular cross-section area?}`,
                        expressionLatex: `A_{\\text{max}} = 2r \\times h`,
                        targetLatex: `A`,
                        slots: [{ id: "area", labelLatex: `A\\text{ (cm}^2\\text{)}`, placeholder: "48", expected: 48 }],
                        correctLatex: `48\\text{ cm}^2`,
                        hintLatex: [`2 \\times 3 \\times 8 = 48`]
                    },
                    {
                        id: "CS-E3", difficulty, stage, geometryType: "cone_ellipse",
                        promptLatex: `\\text{Cone: base radius 4 cm, cut at angle creating ellipse. Min axis 4 cm. Max axis?}`,
                        expressionLatex: `\\text{Ellipse from angled cut}`,
                        targetLatex: `a`,
                        slots: [{ id: "axis", labelLatex: `a\\text{ (cm)}`, placeholder: "8", expected: 8 }],
                        correctLatex: `> 4\\text{ cm (depends on angle)}`,
                        hintLatex: [`\\text{Angled cut stretches circle}`]
                    },
                    {
                        id: "CS-E4", difficulty, stage, geometryType: "torus",
                        promptLatex: `\\text{Torus (donut) cut through center hole. What shape?}`,
                        expressionLatex: `\\text{Torus cross-section}`,
                        targetLatex: `\\text{Shape}`,
                        slots: [{ id: "shape", labelLatex: `\\text{Shape}`, placeholder: "circles", expected: "circles" }],
                        correctLatex: `\\text{Two circles}`,
                        hintLatex: [`\\text{Cut shows two circular tubes}`]
                    }
                );
            }
        }

        if (stage === "SPATIAL_REASONING") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "SR-B1", difficulty, stage, geometryType: "counting",
                        promptLatex: `\\text{A } 2 \\times 2 \\times 2 \\text{ cube is made of unit cubes. How many unit cubes total?}`,
                        expressionLatex: `N = 2^3`,
                        targetLatex: `N`,
                        slots: [{ id: "count", labelLatex: `N`, placeholder: "8", expected: 8 }],
                        correctLatex: `8\\text{ unit cubes}`,
                        hintLatex: [`2 \\times 2 \\times 2 = 8`]
                    },
                    {
                        id: "SR-B2", difficulty, stage, geometryType: "distance",
                        promptLatex: `\\text{Points } A(0,0,0) \\text{ and } B(3,4,0). \\text{ Distance?}`,
                        expressionLatex: `d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}`,
                        targetLatex: `d`,
                        slots: [{ id: "dist", labelLatex: `d`, placeholder: "5", expected: 5 }],
                        correctLatex: `5\\text{ units}`,
                        hintLatex: [`\\sqrt{3^2 + 4^2 + 0^2} = \\sqrt{9+16} = 5`]
                    },
                    {
                        id: "SR-B3", difficulty, stage, geometryType: "midpoint",
                        promptLatex: `\\text{Points } A(2,4,6) \\text{ and } B(8,2,4). \\text{ Midpoint x-coordinate?}`,
                        expressionLatex: `M_x = \\frac{x_1 + x_2}{2}`,
                        targetLatex: `M_x`,
                        slots: [{ id: "mx", labelLatex: `M_x`, placeholder: "5", expected: 5 }],
                        correctLatex: `5`,
                        hintLatex: [`\\frac{2+8}{2} = 5`]
                    },
                    {
                        id: "SR-B4", difficulty, stage, geometryType: "cube_faces",
                        promptLatex: `\\text{A } 3 \\times 3 \\times 3 \\text{ cube. How many unit cubes touch a face (not just edge/corner)?}`,
                        expressionLatex: `N = 6 \\times (3^2 - 2^2)`,
                        targetLatex: `N`,
                        slots: [{ id: "count", labelLatex: `N`, placeholder: "6", expected: 6 }],
                        correctLatex: `6\\text{ (center of each face)}`,
                        hintLatex: [`\\text{One cube at center of each of 6 faces}`]
                    },
                    {
                        id: "SR-B5", difficulty, stage, geometryType: "coordinates",
                        promptLatex: `\\text{Point } P(3,5,7). \\text{ What is the z-coordinate?}`,
                        expressionLatex: `P = (x, y, z)`,
                        targetLatex: `z`,
                        slots: [{ id: "z", labelLatex: `z`, placeholder: "7", expected: 7 }],
                        correctLatex: `7`,
                        hintLatex: [`\\text{Third coordinate is z}`]
                    }
                );
            }
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "SR-C1", difficulty, stage, geometryType: "3d_distance",
                        promptLatex: `\\text{Points } A(1,2,3) \\text{ and } B(4,6,8). \\text{ Distance?}`,
                        expressionLatex: `d = \\sqrt{(4-1)^2 + (6-2)^2 + (8-3)^2}`,
                        targetLatex: `d`,
                        slots: [{ id: "dist", labelLatex: `d`, placeholder: "7", expected: 7 }],
                        correctLatex: `7.07\\text{ units}`,
                        hintLatex: [`\\sqrt{9 + 16 + 25} = \\sqrt{50} \\approx 7.07`]
                    },
                    {
                        id: "SR-C2", difficulty, stage, geometryType: "cube_diagonal",
                        promptLatex: `\\text{Cube edge 6 cm. Space diagonal length?}`,
                        expressionLatex: `d = a\\sqrt{3}`,
                        targetLatex: `d`,
                        slots: [{ id: "diag", labelLatex: `d\\text{ (cm)}`, placeholder: "10", expected: 10 }],
                        correctLatex: `10.4\\text{ cm}`,
                        hintLatex: [`6\\sqrt{3} \\approx 10.4`]
                    },
                    {
                        id: "SR-C3", difficulty, stage, geometryType: "hidden",
                        promptLatex: `\\text{A } 3 \\times 3 \\times 3 \\text{ cube. How many unit cubes are completely hidden (not visible)?}`,
                        expressionLatex: `N = (n-2)^3`,
                        targetLatex: `N`,
                        slots: [{ id: "count", labelLatex: `N`, placeholder: "1", expected: 1 }],
                        correctLatex: `1\\text{ (center cube)}`,
                        hintLatex: [`(3-2)^3 = 1^3 = 1`]
                    },
                    {
                        id: "SR-C4", difficulty, stage, geometryType: "rotation",
                        promptLatex: `\\text{Point } (3,0,0) \\text{ rotated 90° around z-axis. New position?}`,
                        expressionLatex: `\\text{90° rotation: } (x,y,z) \\rightarrow (-y,x,z)`,
                        targetLatex: `y`,
                        slots: [{ id: "y", labelLatex: `y`, placeholder: "3", expected: 3 }],
                        correctLatex: `(0,3,0)`,
                        hintLatex: [`(3,0,0) \\rightarrow (0,3,0)`]
                    },
                    {
                        id: "SR-C5", difficulty, stage, geometryType: "surface",
                        promptLatex: `\\text{A } 4 \\times 4 \\times 4 \\text{ cube. How many unit cubes are on the surface?}`,
                        expressionLatex: `N = n^3 - (n-2)^3`,
                        targetLatex: `N`,
                        slots: [{ id: "count", labelLatex: `N`, placeholder: "56", expected: 56 }],
                        correctLatex: `56\\text{ unit cubes}`,
                        hintLatex: [`64 - 8 = 56`]
                    }
                );
            }
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "SR-A1", difficulty, stage, geometryType: "net",
                        promptLatex: `\\text{Cube net: which face is opposite to the top face?}`,
                        expressionLatex: `\\text{Net folding visualization}`,
                        targetLatex: `\\text{Face}`,
                        slots: [{ id: "face", labelLatex: `\\text{Face}`, placeholder: "bottom", expected: "bottom" }],
                        correctLatex: `\\text{Bottom face}`,
                        hintLatex: [`\\text{Fold net mentally}`]
                    },
                    {
                        id: "SR-A2", difficulty, stage, geometryType: "vector",
                        promptLatex: `\\text{Vector from } A(1,2,3) \\text{ to } B(4,5,6). \\text{ What is the vector?}`,
                        expressionLatex: `\\vec{AB} = (x_2-x_1, y_2-y_1, z_2-z_1)`,
                        targetLatex: `\\vec{AB}_x`,
                        slots: [{ id: "vx", labelLatex: `\\vec{AB}_x`, placeholder: "3", expected: 3 }],
                        correctLatex: `(3,3,3)`,
                        hintLatex: [`(4-1, 5-2, 6-3) = (3,3,3)`]
                    },
                    {
                        id: "SR-A3", difficulty, stage, geometryType: "projection",
                        promptLatex: `\\text{Point } (5,7,9) \\text{ projected onto xy-plane. What are coordinates?}`,
                        expressionLatex: `\\text{Projection: } (x,y,z) \\rightarrow (x,y,0)`,
                        targetLatex: `z`,
                        slots: [{ id: "z", labelLatex: `z`, placeholder: "0", expected: 0 }],
                        correctLatex: `(5,7,0)`,
                        hintLatex: [`\\text{xy-plane has } z=0`]
                    },
                    {
                        id: "SR-A4", difficulty, stage, geometryType: "painted",
                        promptLatex: `\\text{A } 5 \\times 5 \\times 5 \\text{ cube painted, then cut into unit cubes. How many have 3 faces painted?}`,
                        expressionLatex: `N = 8 \\text{ (corners)}`,
                        targetLatex: `N`,
                        slots: [{ id: "count", labelLatex: `N`, placeholder: "8", expected: 8 }],
                        correctLatex: `8\\text{ (corner cubes)}`,
                        hintLatex: [`\\text{Only corners have 3 painted faces}`]
                    }
                );
            }
            if (difficulty === "ELITE") {
                quests.push(
                    {
                        id: "SR-E1", difficulty, stage, geometryType: "complex_distance",
                        promptLatex: `\\text{Points } A(2,3,5) \\text{ and } B(8,7,13). \\text{ Distance?}`,
                        expressionLatex: `d = \\sqrt{(8-2)^2 + (7-3)^2 + (13-5)^2}`,
                        targetLatex: `d`,
                        slots: [{ id: "dist", labelLatex: `d`, placeholder: "11", expected: 11 }],
                        correctLatex: `10.77\\text{ units}`,
                        hintLatex: [`\\sqrt{36 + 16 + 64} = \\sqrt{116} \\approx 10.77`]
                    },
                    {
                        id: "SR-E2", difficulty, stage, geometryType: "sphere_equation",
                        promptLatex: `\\text{Sphere center } (2,3,4), \\text{ radius } 5. \\text{ Point } (5,7,8) \\text{ inside or outside?}`,
                        expressionLatex: `d = \\sqrt{(5-2)^2 + (7-3)^2 + (8-4)^2}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{In/Out}`, placeholder: "outside", expected: "outside" }],
                        correctLatex: `\\text{Outside (d} \\approx 7.07 > 5\\text{)}`,
                        hintLatex: [`\\sqrt{9+16+16} = \\sqrt{41} \\approx 6.4`]
                    },
                    {
                        id: "SR-E3", difficulty, stage, geometryType: "painted_edges",
                        promptLatex: `\\text{A } 6 \\times 6 \\times 6 \\text{ cube painted, cut into unit cubes. How many have exactly 2 faces painted?}`,
                        expressionLatex: `N = 12(n-2)`,
                        targetLatex: `N`,
                        slots: [{ id: "count", labelLatex: `N`, placeholder: "48", expected: 48 }],
                        correctLatex: `48\\text{ (edge cubes, not corners)}`,
                        hintLatex: [`12 \\times (6-2) = 12 \\times 4 = 48`]
                    },
                    {
                        id: "SR-E4", difficulty, stage, geometryType: "transformation",
                        promptLatex: `\\text{Point } (4,0,0) \\text{ rotated 90° around z-axis, then reflected across xy-plane. Final position?}`,
                        expressionLatex: `\\text{Rotation then reflection}`,
                        targetLatex: `z`,
                        slots: [{ id: "z", labelLatex: `z`, placeholder: "0", expected: 0 }],
                        correctLatex: `(0,4,0)`,
                        hintLatex: [`(4,0,0) \\rightarrow (0,4,0) \\rightarrow (0,4,0)`]
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
        initialStage: "POLYHEDRA",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sm3-05", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "POLYHEDRA" as Stage, label: t.stages.polyhedra },
        { id: "CROSS_SECTIONS" as Stage, label: t.stages.cross_sections },
        { id: "SPATIAL_REASONING" as Stage, label: t.stages.spatial_reasoning },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="SM3.05"
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
                monitorContent={<GeometryVisualization stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SM3.05"
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
            monitorContent={<GeometryVisualization stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/30">
                    <h3 className="text-green-400 font-bold mb-2">{t.objective_title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t.scenarios[stage.toLowerCase() as keyof typeof t.scenarios]}
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
