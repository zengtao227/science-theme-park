"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import GeometryVisualization from "@/components/chamber/sm3-05/GeometryVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "BASEL_ARCH" | "CROSS_SECTIONS" | "CURVED_SOLIDS";

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

        if (stage === "BASEL_ARCH") {
            quests.push(
                {
                    id: "ARCH-1", difficulty: "BASIC", stage, geometryType: "roche1",
                    promptLatex: `\\text{Roche Tower 1 is } 178\\text{m tall. If modeled as a rectangular prism with base } 60\\text{m} \\times 40\\text{m}, \\text{ what is the volume?}`,
                    expressionLatex: `V = l \\cdot w \\cdot h`,
                    targetLatex: `V`,
                    slots: [{ id: "vol", labelLatex: `V\\text{ (m}^3\\text{)}`, placeholder: "427200", expected: 427200 }],
                    correctLatex: `427,200 \\text{ m}^3`,
                    hintLatex: [`178 \\times 60 \\times 40 = 427200`]
                },
                {
                    id: "ARCH-2", difficulty: "CORE", stage, geometryType: "messeturm",
                    promptLatex: `\\text{Messeturm Basel: a cylinder of height } 105\\text{m, radius } 15\\text{m. Approximate volume? } (\\pi \\approx 3.14)`,
                    expressionLatex: `V = \\pi r^2 h`,
                    targetLatex: `V`,
                    slots: [{ id: "vol", labelLatex: `V\\text{ (m}^3\\text{)}`, placeholder: "74182", expected: 74182 }],
                    correctLatex: `74,183 \\text{ m}^3`,
                    hintLatex: [`3.14 \\times 15^2 \\times 105 = 74182.5`]
                },
                {
                    id: "ARCH-3", difficulty: "ADVANCED", stage, geometryType: "roche2",
                    promptLatex: `\\text{Roche Tower 2 is } 205\\text{m. It tapers. If the base is } 2400\\text{m}^2 \\text{ and top is } 1800\\text{m}^2, \\text{ use the average area for volume.}`,
                    expressionLatex: `V \\approx \\frac{A_1 + A_2}{2} \\cdot h`,
                    targetLatex: `V`,
                    slots: [{ id: "vol", labelLatex: `V`, placeholder: "430500", expected: 430500 }],
                    correctLatex: `430,500 \\text{ m}^3`,
                    hintLatex: [`(2100) \\times 205 = 430500`]
                }
            );
            if (difficulty === "ELITE") {
                quests.push({
                    id: "ARCH-E1", difficulty, stage, geometryType: "kunstmuseum",
                    promptLatex: `\\text{Kunstmuseum Basel skylights are square pyramids with base } 2\\text{m and height } 1.5\\text{m. Total volume of 100 skylights?}`,
                    expressionLatex: `V = 100 \\cdot \\frac{1}{3} a^2 h`,
                    targetLatex: `V`,
                    slots: [{ id: "vol", labelLatex: `V`, placeholder: "200", expected: 200 }],
                    correctLatex: `200 \\text{ m}^3`,
                    hintLatex: [`100 \\times (1/3) \\times 4 \\times 1.5 = 100 \\times 2 = 200`]
                });
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

        if (stage === "CURVED_SOLIDS") {
            quests.push(
                {
                    id: "CURVE-1", difficulty: "BASIC", stage, geometryType: "sphere_vol",
                    promptLatex: `\\text{A liposome (sphere) has radius } 3\\mu\\text{m. Calculate volume.} (\\pi \\approx 3.14)`,
                    expressionLatex: `V = \\frac{4}{3}\\pi r^3`,
                    targetLatex: `V`,
                    slots: [{ id: "vol", labelLatex: `V`, placeholder: "113", expected: 113.04 }],
                    correctLatex: `113.04 \\mu\\text{m}^3`,
                    hintLatex: [`4/3 \\times 3.14 \\times 27 = 113.04`]
                },
                {
                    id: "CURVE-2", difficulty: "CORE", stage, geometryType: "cylinder_sa",
                    promptLatex: `\\text{Novartis delivery tube: } r=2\\text{cm, } h=10\\text{cm. Total surface area?}`,
                    expressionLatex: `A = 2\\pi r h + 2\\pi r^2`,
                    targetLatex: `A`,
                    slots: [{ id: "area", labelLatex: `A`, placeholder: "150.7", expected: 150.72 }],
                    correctLatex: `150.72 \\text{ cm}^2`,
                    hintLatex: [`2 \\times 3.14 \\times 2 \\times 10 + 2 \\times 3.14 \\times 4 = 125.6 + 25.12 = 150.72`]
                },
                {
                    id: "CURVE-3", difficulty: "ADVANCED", stage, geometryType: "cone_vol",
                    promptLatex: `\\text{A conical storage bin: } r=1.5\\text{m, } h=4\\text{m. Volume?}`,
                    expressionLatex: `V = \\frac{1}{3}\\pi r^2 h`,
                    targetLatex: `V`,
                    slots: [{ id: "vol", labelLatex: `V`, placeholder: "9.42", expected: 9.42 }],
                    correctLatex: `9.42 \\text{ m}^3`,
                    hintLatex: [`(1/3) \\times 3.14 \\times 2.25 \\times 4 = 9.42`]
                }
            );
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
        { id: "BASEL_ARCH" as Stage, label: t.stages.basel_arch },
        { id: "CROSS_SECTIONS" as Stage, label: t.stages.cross_sections },
        { id: "CURVED_SOLIDS" as Stage, label: t.stages.curved_solids },
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
