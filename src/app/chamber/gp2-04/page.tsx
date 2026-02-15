"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import EntropyVisualization from "@/components/chamber/gp2-04/EntropyVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "ENTROPY_CONCEPT" | "SECOND_LAW" | "ARROW_OF_TIME";

interface GP204Quest extends Quest {
    stage: Stage;
    processType?: string;
}

type GP204T = typeof translations.EN.gp2_04;

export default function GP204Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.gp2_04 || translations.EN.gp2_04) as GP204T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GP204Quest[] => {
        const quests: GP204Quest[] = [];

        if (stage === "ENTROPY_CONCEPT") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "EC-B1", difficulty, stage, processType: "disorder",
                        promptLatex: `\\text{Entropy measures disorder. Which has higher entropy: ice or water?}`,
                        expressionLatex: `\\text{More disorder} \\Rightarrow \\text{Higher entropy}`,
                        targetLatex: `\\text{State}`,
                        slots: [{ id: "state", labelLatex: `\\text{Higher S}`, placeholder: "water", expected: "water" }],
                        correctLatex: `\\text{Water (liquid has more disorder than solid)}`,
                        hintLatex: [`\\text{Molecules move more freely in liquid}`]
                    },
                    {
                        id: "EC-B2", difficulty, stage, processType: "phase",
                        promptLatex: `\\text{Which has highest entropy: ice, water, or steam?}`,
                        expressionLatex: `\\text{Solid < Liquid < Gas}`,
                        targetLatex: `\\text{State}`,
                        slots: [{ id: "state", labelLatex: `\\text{Highest S}`, placeholder: "steam", expected: "steam" }],
                        correctLatex: `\\text{Steam (gas has maximum disorder)}`,
                        hintLatex: [`\\text{Gas molecules are most disordered}`]
                    },
                    {
                        id: "EC-B3", difficulty, stage, processType: "mixing",
                        promptLatex: `\\text{Mix hot and cold water. Does total entropy increase or decrease?}`,
                        expressionLatex: `\\text{Irreversible mixing} \\Rightarrow \\Delta S > 0`,
                        targetLatex: `\\text{Change}`,
                        slots: [{ id: "change", labelLatex: `\\Delta S`, placeholder: "increase", expected: "increase" }],
                        correctLatex: `\\text{Entropy INCREASES}`,
                        hintLatex: [`\\text{Irreversible processes increase entropy}`]
                    },
                    {
                        id: "EC-B4", difficulty, stage, processType: "expansion",
                        promptLatex: `\\text{Gas expands into vacuum. Does entropy increase?}`,
                        expressionLatex: `\\text{Free expansion} \\Rightarrow \\Delta S > 0`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Increase?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{YES - more possible positions}`,
                        hintLatex: [`\\text{More volume = more disorder}`]
                    },
                    {
                        id: "EC-B5", difficulty, stage, processType: "reversible",
                        promptLatex: `\\text{Reversible process: } \\Delta S_{\\text{universe}} = ?`,
                        expressionLatex: `\\Delta S_{\\text{universe}} = \\Delta S_{\\text{system}} + \\Delta S_{\\text{surroundings}}`,
                        targetLatex: `\\Delta S_{\\text{universe}}`,
                        slots: [{ id: "entropy", labelLatex: `\\Delta S_{\\text{univ}}`, placeholder: "0", expected: 0 }],
                        correctLatex: `\\Delta S_{\\text{universe}} = 0`,
                        hintLatex: [`\\text{Reversible means no net entropy change}`]
                    }
                );
            }
        }

        if (stage === "SECOND_LAW") {
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "SL-C1", difficulty, stage, processType: "statement",
                        promptLatex: `\\text{Second Law: Entropy of isolated system can only increase or stay constant. Can it decrease?}`,
                        expressionLatex: `\\Delta S_{\\text{isolated}} \\geq 0`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Decrease?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{NO - violates Second Law}`,
                        hintLatex: [`\\text{Entropy never decreases in isolated systems}`]
                    },
                    {
                        id: "SL-C2", difficulty, stage, processType: "heat_flow",
                        promptLatex: `\\text{Heat flows from hot (400 K) to cold (300 K). Is this allowed by Second Law?}`,
                        expressionLatex: `\\text{Heat flows hot} \\to \\text{cold (increases entropy)}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Allowed?}`, placeholder: "yes", expected: "yes" }],
                        correctLatex: `\\text{YES - natural direction}`,
                        hintLatex: [`\\text{Heat spontaneously flows hot to cold}`]
                    },
                    {
                        id: "SL-C3", difficulty, stage, processType: "impossible",
                        promptLatex: `\\text{Can heat spontaneously flow from cold to hot without work input?}`,
                        expressionLatex: `\\text{Would decrease entropy (impossible)}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Possible?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{NO - violates Second Law}`,
                        hintLatex: [`\\text{Requires work (refrigerator)}`]
                    },
                    {
                        id: "SL-C4", difficulty, stage, processType: "engine",
                        promptLatex: `\\text{Engine converts 100\\% heat to work with no waste. Possible?}`,
                        expressionLatex: `\\eta = 1 \\text{ (violates Second Law)}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Possible?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{NO - must reject some heat}`,
                        hintLatex: [`\\text{Perfect efficiency impossible}`]
                    },
                    {
                        id: "SL-C5", difficulty, stage, processType: "local",
                        promptLatex: `\\text{Freezer decreases entropy of water (makes ice). Does this violate Second Law?}`,
                        expressionLatex: `\\Delta S_{\\text{water}} < 0, \\text{ but } \\Delta S_{\\text{universe}} > 0`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Violate?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{NO - total entropy increases}`,
                        hintLatex: [`\\text{Surroundings gain more entropy than water loses}`]
                    }
                );
            }
        }

        if (stage === "ARROW_OF_TIME") {
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "AT-A1", difficulty, stage, processType: "direction",
                        promptLatex: `\\text{Drop glass, it shatters. Can shattered glass spontaneously reassemble?}`,
                        expressionLatex: `\\text{Entropy increase defines time direction}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Reassemble?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{NO - entropy only increases}`,
                        hintLatex: [`\\text{Time flows in direction of increasing entropy}`]
                    },
                    {
                        id: "AT-A2", difficulty, stage, processType: "irreversible",
                        promptLatex: `\\text{Mix milk in coffee. Can you unmix them?}`,
                        expressionLatex: `\\text{Mixing is irreversible}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Unmix?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{NO - entropy increased}`,
                        hintLatex: [`\\text{Irreversible process}`]
                    },
                    {
                        id: "AT-A3", difficulty, stage, processType: "universe",
                        promptLatex: `\\text{Universe entropy: increasing, constant, or decreasing?}`,
                        expressionLatex: `\\Delta S_{\\text{universe}} > 0 \\text{ (always)}`,
                        targetLatex: `\\text{Trend}`,
                        slots: [{ id: "trend", labelLatex: `\\text{Trend}`, placeholder: "increasing", expected: "increasing" }],
                        correctLatex: `\\text{INCREASING (heat death)}`,
                        hintLatex: [`\\text{Universe is isolated system}`]
                    },
                    {
                        id: "AT-A4", difficulty, stage, processType: "life",
                        promptLatex: `\\text{Living organisms decrease local entropy (create order). Does this violate Second Law?}`,
                        expressionLatex: `\\text{Local decrease, but universe entropy increases}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Violate?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{NO - we export entropy to surroundings}`,
                        hintLatex: [`\\text{Life requires energy input (food, sunlight)}`]
                    },
                    {
                        id: "AT-A5", difficulty, stage, processType: "maxwell",
                        promptLatex: `\\text{Maxwell's demon: Can a demon sort fast/slow molecules to decrease entropy without work?}`,
                        expressionLatex: `\\text{Information processing requires energy}`,
                        targetLatex: `\\text{Answer}`,
                        slots: [{ id: "ans", labelLatex: `\\text{Possible?}`, placeholder: "no", expected: "no" }],
                        correctLatex: `\\text{NO - demon must do work}`,
                        hintLatex: [`\\text{Measuring and sorting requires energy}`]
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
    } = useQuestManager<GP204Quest, Stage>({
        buildPool,
        initialStage: "ENTROPY_CONCEPT",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gp2-04", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "ENTROPY_CONCEPT" as Stage, label: t.stages.entropy_concept },
        { id: "SECOND_LAW" as Stage, label: t.stages.second_law },
        { id: "ARROW_OF_TIME" as Stage, label: t.stages.arrow_of_time },
    ], [t.stages]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="GP2.04"
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
                monitorContent={<EntropyVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="GP2.04"
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
            monitorContent={<EntropyVisualization quest={currentQuest} stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-500/30">
                    <h3 className="text-cyan-400 font-bold mb-2">{t.objective_title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {t.scenarios[stage.toLowerCase() as keyof typeof t.scenarios]}
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
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
