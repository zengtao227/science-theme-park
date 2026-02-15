"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import TissueVisualization from "@/components/chamber/sb2-01-tissues/TissueVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "TISSUES" | "ORGANS" | "SYSTEMS";

interface SB201TissuesQuest extends Quest {
    stage: Stage;
    tissueType?: string;
    organName?: string;
    systemName?: string;
}

type SB201TissuesT = typeof translations.EN.sb2_01_tissues;

export default function SB201TissuesPage() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sb2_01_tissues || translations.EN.sb2_01_tissues) as SB201TissuesT;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB201TissuesQuest[] => {
        const quests: SB201TissuesQuest[] = [];

        if (stage === "TISSUES") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "T-B1", difficulty, stage, tissueType: "epithelial",
                        promptLatex: `\\text{Epithelial tissue covers body surfaces. What is its primary function?}`,
                        expressionLatex: `\\text{Location: Skin, intestines}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "protection", expected: "protection" }],
                        correctLatex: `\\text{Protection and absorption}`,
                        hintLatex: [`\\text{Covers and protects surfaces}`]
                    },
                    {
                        id: "T-B2", difficulty, stage, tissueType: "connective",
                        promptLatex: `\\text{Connective tissue provides structural support. Name its function:}`,
                        expressionLatex: `\\text{Location: Bone, cartilage}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "support", expected: "support" }],
                        correctLatex: `\\text{Support and structure}`,
                        hintLatex: [`\\text{Provides framework}`]
                    },
                    {
                        id: "T-B3", difficulty, stage, tissueType: "muscle",
                        promptLatex: `\\text{Muscle tissue enables body movement. What is its function?}`,
                        expressionLatex: `\\text{Location: Heart, limbs}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "movement", expected: "movement" }],
                        correctLatex: `\\text{Movement and contraction}`,
                        hintLatex: [`\\text{Contracts to move}`]
                    },
                    {
                        id: "T-B4", difficulty, stage, tissueType: "nervous",
                        promptLatex: `\\text{Nervous tissue transmits electrical signals. What is its function?}`,
                        expressionLatex: `\\text{Location: Brain, nerves}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "signaling", expected: "signaling" }],
                        correctLatex: `\\text{Signal transmission}`,
                        hintLatex: [`\\text{Sends electrical signals}`]
                    },
                    {
                        id: "T-B5", difficulty, stage, tissueType: "epithelial",
                        promptLatex: `\\text{Epithelial tissue in intestines absorbs nutrients. Function?}`,
                        expressionLatex: `\\text{Location: Small intestine}`,
                        targetLatex: `\\text{Function}`,
                        slots: [{ id: "func", labelLatex: `\\text{Function}`, placeholder: "absorption", expected: "absorption" }],
                        correctLatex: `\\text{Absorption}`,
                        hintLatex: [`\\text{Takes in nutrients}`]
                    }
                );
            }
        }

        if (stage === "ORGANS") {
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "O-C1", difficulty, stage, organName: "heart",
                        promptLatex: `\\text{The heart contains muscle, epithelial, connective, and nervous tissue. Count:}`,
                        expressionLatex: `\\text{Organ: Heart}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "4", expected: 4 }],
                        correctLatex: `n = 4`,
                        hintLatex: [`\\text{Count all tissue types}`]
                    },
                    {
                        id: "O-C2", difficulty, stage, organName: "stomach",
                        promptLatex: `\\text{The stomach has epithelial, muscle, connective, and nervous tissue. Count:}`,
                        expressionLatex: `\\text{Organ: Stomach}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "4", expected: 4 }],
                        correctLatex: `n = 4`,
                        hintLatex: [`\\text{All organs have multiple tissues}`]
                    },
                    {
                        id: "O-C3", difficulty, stage, organName: "lung",
                        promptLatex: `\\text{The lung contains epithelial, connective, and blood tissue. Count:}`,
                        expressionLatex: `\\text{Organ: Lung}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "3", expected: 3 }],
                        correctLatex: `n = 3`,
                        hintLatex: [`\\text{Count tissue types}`]
                    },
                    {
                        id: "O-C4", difficulty, stage, organName: "kidney",
                        promptLatex: `\\text{The kidney has epithelial, connective, and blood tissue. Count:}`,
                        expressionLatex: `\\text{Organ: Kidney}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "3", expected: 3 }],
                        correctLatex: `n = 3`,
                        hintLatex: [`\\text{Filters blood}`]
                    },
                    {
                        id: "O-C5", difficulty, stage, organName: "liver",
                        promptLatex: `\\text{The liver contains epithelial, connective, and blood tissue. Count:}`,
                        expressionLatex: `\\text{Organ: Liver}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "3", expected: 3 }],
                        correctLatex: `n = 3`,
                        hintLatex: [`\\text{Processes nutrients}`]
                    }
                );
            }
        }

        if (stage === "SYSTEMS") {
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "S-A1", difficulty, stage, systemName: "hierarchy",
                        promptLatex: `\\text{Complete: Cell} \\to \\text{Tissue} \\to \\text{Organ} \\to ?`,
                        expressionLatex: `\\text{Biological hierarchy}`,
                        targetLatex: `\\text{Next level}`,
                        slots: [{ id: "level", labelLatex: `\\text{Level}`, placeholder: "system", expected: "system" }],
                        correctLatex: `\\text{Organ System}`,
                        hintLatex: [`\\text{Groups of organs}`]
                    },
                    {
                        id: "S-A2", difficulty, stage, systemName: "digestive",
                        promptLatex: `\\text{The digestive system has 7 major organs. Count:}`,
                        expressionLatex: `\\text{System: Digestive}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "7", expected: 7 }],
                        correctLatex: `n = 7`,
                        hintLatex: [`\\text{Mouth to anus}`]
                    },
                    {
                        id: "S-A3", difficulty, stage, systemName: "circulatory",
                        promptLatex: `\\text{The circulatory system has 3 major organs. Count:}`,
                        expressionLatex: `\\text{System: Circulatory}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "3", expected: 3 }],
                        correctLatex: `n = 3`,
                        hintLatex: [`\\text{Heart and vessels}`]
                    },
                    {
                        id: "S-A4", difficulty, stage, systemName: "respiratory",
                        promptLatex: `\\text{The respiratory system has 5 major organs. Count:}`,
                        expressionLatex: `\\text{System: Respiratory}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "5", expected: 5 }],
                        correctLatex: `n = 5`,
                        hintLatex: [`\\text{Nose to lungs}`]
                    },
                    {
                        id: "S-A5", difficulty, stage, systemName: "nervous",
                        promptLatex: `\\text{The nervous system has 2 major divisions. Count:}`,
                        expressionLatex: `\\text{System: Nervous}`,
                        targetLatex: `n`,
                        slots: [{ id: "count", labelLatex: `n`, placeholder: "2", expected: 2 }],
                        correctLatex: `n = 2`,
                        hintLatex: [`\\text{Central and peripheral}`]
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
    } = useQuestManager<SB201TissuesQuest, Stage>({
        buildPool,
        initialStage: "TISSUES",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb2-01-tissues", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "TISSUES" as Stage, label: t.stages.tissues },
        { id: "ORGANS" as Stage, label: t.stages.organs },
        { id: "SYSTEMS" as Stage, label: t.stages.systems },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="SB2.01"
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
                monitorContent={<TissueVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SB2.01"
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
            monitorContent={<TissueVisualization quest={currentQuest} stage={stage} />}
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
