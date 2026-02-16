"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import BodySystemVisualization from "@/components/chamber/sb2-02-body-systems/BodySystemVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "DIGESTIVE" | "CIRCULATORY" | "RESPIRATORY";

interface SB202BodySystemsQuest extends Quest {
    stage: Stage;
    systemType?: string;
    organPath?: string[];
}

type SB202BodySystemsT = typeof translations.EN.sb2_02;

export default function SB202BodySystemsPage() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sb2_02 || translations.EN.sb2_02) as SB202BodySystemsT;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB202BodySystemsQuest[] => {
        const quests: SB202BodySystemsQuest[] = [];

        if (stage === "DIGESTIVE") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "D-B1", difficulty, stage, systemType: "digestive",
                        promptLatex: `\\text{Food travels: Mouth} \\to \\text{Esophagus} \\to ? \\to \\text{Intestines}`,
                        expressionLatex: `\\text{Digestive pathway}`,
                        targetLatex: `\\text{Organ}`,
                        slots: [{ id: "organ", labelLatex: `\\text{Organ}`, placeholder: "stomach", expected: "stomach" }],
                        correctLatex: `\\text{Stomach}`,
                        hintLatex: [`\\text{Where food is churned and digested}`]
                    },
                    {
                        id: "D-B2", difficulty, stage, systemType: "digestive",
                        promptLatex: `\\text{The digestive system breaks down food. What is its main function?}`,
                        expressionLatex: `\\text{System: Digestive}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "digestion", expected: "digestion" }],
                        correctLatex: `\\text{Digestion and absorption}`,
                        hintLatex: [`\\text{Breaks down food into nutrients}`]
                    },
                    {
                        id: "D-B3", difficulty, stage, systemType: "digestive",
                        promptLatex: `\\text{The small intestine absorbs nutrients. What is its function?}`,
                        expressionLatex: `\\text{Organ: Small intestine}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "absorption", expected: "absorption" }],
                        correctLatex: `\\text{Nutrient absorption}`,
                        hintLatex: [`\\text{Takes nutrients into bloodstream}`]
                    },
                    {
                        id: "D-B4", difficulty, stage, systemType: "digestive",
                        promptLatex: `\\text{The liver produces bile for fat digestion. What is its function?}`,
                        expressionLatex: `\\text{Organ: Liver}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "bile", expected: "bile" }],
                        correctLatex: `\\text{Bile production}`,
                        hintLatex: [`\\text{Helps digest fats}`]
                    },
                    {
                        id: "D-B5", difficulty, stage, systemType: "digestive",
                        promptLatex: `\\text{The digestive system has 7 major organs. Count them:}`,
                        expressionLatex: `\\text{Mouth, Esophagus, Stomach, Small intestine, Large intestine, Liver, Pancreas}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "7", expected: 7 }],
                        correctLatex: `n = 7`,
                        hintLatex: [`\\text{Count all organs in the pathway}`]
                    }
                );
            }
        }

        if (stage === "CIRCULATORY") {
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "C-C1", difficulty, stage, systemType: "circulatory",
                        promptLatex: `\\text{The heart pumps blood throughout the body. What is its function?}`,
                        expressionLatex: `\\text{Organ: Heart}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "pump", expected: "pump" }],
                        correctLatex: `\\text{Pump blood}`,
                        hintLatex: [`\\text{Circulates blood}`]
                    },
                    {
                        id: "C-C2", difficulty, stage, systemType: "circulatory",
                        promptLatex: `\\text{Arteries carry blood away from the heart. What do veins do?}`,
                        expressionLatex: `\\text{Blood vessels}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "return", expected: "return" }],
                        correctLatex: `\\text{Return blood to heart}`,
                        hintLatex: [`\\text{Opposite of arteries}`]
                    },
                    {
                        id: "C-C3", difficulty, stage, systemType: "circulatory",
                        promptLatex: `\\text{The circulatory system has 3 main components. Count:}`,
                        expressionLatex: `\\text{Heart, Arteries, Veins}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "3", expected: 3 }],
                        correctLatex: `n = 3`,
                        hintLatex: [`\\text{Heart and two types of vessels}`]
                    },
                    {
                        id: "C-C4", difficulty, stage, systemType: "circulatory",
                        promptLatex: `\\text{Blood carries oxygen to cells. What does it carry away?}`,
                        expressionLatex: `\\text{Gas exchange}`,
                        targetLatex: `\\text{Gas}`,
                        slots: [{ id: "gas", labelLatex: `\\text{Gas}`, placeholder: "CO2", expected: "CO2" }],
                        correctLatex: `\\text{Carbon dioxide (CO}_2\\text{)}`,
                        hintLatex: [`\\text{Waste gas from cells}`]
                    },
                    {
                        id: "C-C5", difficulty, stage, systemType: "circulatory",
                        promptLatex: `\\text{The heart has 4 chambers. Count them:}`,
                        expressionLatex: `\\text{2 atria + 2 ventricles}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "4", expected: 4 }],
                        correctLatex: `n = 4`,
                        hintLatex: [`\\text{Upper and lower chambers}`]
                    }
                );
            }
        }

        if (stage === "RESPIRATORY") {
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "R-A1", difficulty, stage, systemType: "respiratory",
                        promptLatex: `\\text{Gas exchange occurs in tiny air sacs. What are they called?}`,
                        expressionLatex: `\\text{Location: Lungs}`,
                        targetLatex: `\\text{Structure}`,
                        slots: [{ id: "struct", labelLatex: `\\text{Structure}`, placeholder: "alveoli", expected: "alveoli" }],
                        correctLatex: `\\text{Alveoli}`,
                        hintLatex: [`\\text{Tiny air sacs in lungs}`]
                    },
                    {
                        id: "R-A2", difficulty, stage, systemType: "respiratory",
                        promptLatex: `\\text{The respiratory system exchanges gases. What gas enters the blood?}`,
                        expressionLatex: `\\text{Gas exchange}`,
                        targetLatex: `\\text{Gas}`,
                        slots: [{ id: "gas", labelLatex: `\\text{Gas}`, placeholder: "O2", expected: "O2" }],
                        correctLatex: `\\text{Oxygen (O}_2\\text{)}`,
                        hintLatex: [`\\text{Gas needed for cellular respiration}`]
                    },
                    {
                        id: "R-A3", difficulty, stage, systemType: "respiratory",
                        promptLatex: `\\text{The respiratory system has 5 major organs. Count:}`,
                        expressionLatex: `\\text{Nose, Pharynx, Larynx, Trachea, Lungs}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "5", expected: 5 }],
                        correctLatex: `n = 5`,
                        hintLatex: [`\\text{From nose to lungs}`]
                    },
                    {
                        id: "R-A4", difficulty, stage, systemType: "respiratory",
                        promptLatex: `\\text{The diaphragm contracts to expand the lungs. What is its function?}`,
                        expressionLatex: `\\text{Muscle: Diaphragm}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "breathing", expected: "breathing" }],
                        correctLatex: `\\text{Enable breathing}`,
                        hintLatex: [`\\text{Muscle for breathing}`]
                    },
                    {
                        id: "R-A5", difficulty, stage, systemType: "respiratory",
                        promptLatex: `\\text{Air pathway: Nose} \\to \\text{Pharynx} \\to ? \\to \\text{Trachea}`,
                        expressionLatex: `\\text{Respiratory pathway}`,
                        targetLatex: `\\text{Organ}`,
                        slots: [{ id: "organ", labelLatex: `\\text{Organ}`, placeholder: "larynx", expected: "larynx" }],
                        correctLatex: `\\text{Larynx (voice box)}`,
                        hintLatex: [`\\text{Voice box}`]
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
    } = useQuestManager<SB202BodySystemsQuest, Stage>({
        buildPool,
        initialStage: "DIGESTIVE",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb2-02-body-systems", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "DIGESTIVE" as Stage, label: t.stages.digestive },
        { id: "CIRCULATORY" as Stage, label: t.stages.circulatory },
        { id: "RESPIRATORY" as Stage, label: t.stages.respiratory },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="SB2.02"
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
                    ready: t.ready,
                    monitor_title: t.monitor_title,
                    difficulty: {
                        basic: t.difficulty.basic,
                        core: t.difficulty.core,
                        advanced: t.difficulty.advanced,
                        elite: t.difficulty.elite,
                    },
                }}
                monitorContent={<BodySystemVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SB2.02"
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
                ready: t.ready,
                monitor_title: t.monitor_title,
                difficulty: {
                    basic: t.difficulty.basic,
                    core: t.difficulty.core,
                    advanced: t.difficulty.advanced,
                    elite: t.difficulty.elite,
                },
            }}
            monitorContent={<BodySystemVisualization quest={currentQuest} stage={stage} />}
        >
            {/* Left side: Quest content */}
            <div className="space-y-6">
                {/* Scenario Description */}
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30">
                    <h3 className="text-cyan-400 font-bold mb-2">{t.objective_title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t.scenarios[stage.toLowerCase() as keyof typeof t.scenarios]}
                    </p>
                </div>

                {/* Quest Display */}
                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        <InlineMath math={currentQuest.promptLatex} />
                    </div>
                    
                    <div className="text-cyan-300">
                        <InlineMath math={currentQuest.expressionLatex} />
                    </div>

                    {/* Input Slots */}
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
