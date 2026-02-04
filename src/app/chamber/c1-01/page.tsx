"use client";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import { useQuestManager, Difficulty, Quest } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import C101LabCanvas from "@/components/chamber/C101_LabCanvas";
import clsx from "clsx";

type Stage = "SODA" | "STARCH" | "FULL";


interface C101Quest extends Quest {
    stage: Stage;
    unknowns: { id: string, type: "soda" | "salt" | "starch", label: string }[];
    targetId: string; // The ID of the substance to identify
}

function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

function buildStagePool(difficulty: Difficulty, stage: Stage): C101Quest[] {
    const quests: C101Quest[] = [];

    // Base substances
    const baseSubstances = [
        { type: "soda" as const, name: "Baking Soda" },
        { type: "salt" as const, name: "Table Salt" },
        { type: "starch" as const, name: "Corn Starch" }
    ];

    // Logic to generate variations
    for (let i = 0; i < 5; i++) {
        const shuffled = shuffleArray(baseSubstances).map((s, idx) => ({
            id: `sample-${idx}`,
            type: s.type,
            label: String.fromCharCode(65 + idx) // A, B, C
        }));

        let targetType = "soda";
        let prompt = "Find the Baking Soda.";
        let hint = "It reacts with acid (Vinegar) to create bubbles.";

        if (stage === "STARCH") {
            targetType = "starch";
            prompt = "Find the Starch.";
            hint = "It turns blue-black when mixed with Iodine.";
        } else if (stage === "FULL") {
            // For FULL, maybe ask to identify a random one, or all?
            // Let's stick to identifying one specific logic for now to fit the slot system
            targetType = baseSubstances[i % 3].type;
            prompt = `Find the ${baseSubstances[i % 3].name}.`;
            hint = "Use your tools to observe reactions.";
        }

        const targetSubstance = shuffled.find(s => s.type === targetType)!;

        quests.push({
            id: `C101-${stage}-${i}`,
            difficulty,
            stage,
            unknowns: shuffled,
            targetId: targetSubstance.id,
            promptLatex: `\\text{${prompt}}`,
            expressionLatex: `\\text{${hint}}`,
            targetLatex: "\\text{Sample}",
            correctLatex: `\\text{Found: } ${targetSubstance.label}`,
            slots: [
                {
                    id: "result",
                    labelLatex: "\\text{Answer (A/B/C)}",
                    placeholder: "?",
                    expected: targetSubstance.label
                }
            ]
        });
    }

    return quests;
}

export default function C101Page() {
    const { currentLanguage } = useAppStore();

    // Placeholder translations
    const t = {
        title: "C1.01 // MYSTERY LAB",
        objective: "Substance Analysis",
        target: "Target",
        stages: {
            SODA: "Test for Carbonates",
            STARCH: "Test for Starch",
            FULL: "Full Analysis"
        }
    };

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
    } = useQuestManager<C101Quest, Stage>({
        buildPool: (d, s) => buildStagePool(d, s),
        initialStage: "SODA",
    });

    if (!currentQuest) return null;

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="C1.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "SODA", label: t.stages.SODA },
                { id: "STARCH", label: t.stages.STARCH },
                { id: "FULL", label: t.stages.FULL },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            checkStatus={lastCheck}
            onVerify={verify}
            onNext={next}
            // Simple translations object for layout
            translations={{
                back: "Back",
                check: "Analyze",
                next: "Next Case",
                correct: "Identified",
                incorrect: "Analysis Failed",
                ready: "Lab Ready",
                monitor_title: "Chemical Analysis",
                difficulty: { basic: "Basic", core: "Core", advanced: "Adv", elite: "Elite" }
            }}
            monitorContent={
                <C101LabCanvas
                    unknowns={currentQuest.unknowns}
                    onIdentify={() => { }} // Visual feedback handled in canvas
                    identified={{}} // State tracking if needed
                />
            }
        >
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h3 className="text-[10px] text-white/60 uppercase tracking-widest font-black">Mission</h3>
                    <p className="text-2xl font-black italic">{currentQuest.promptLatex.replace(/\\text{|}/g, "")}</p>
                    <p className="text-sm text-white/50">{currentQuest.expressionLatex.replace(/\\text{|}/g, "")}</p>
                </div>

                <div className="p-8 bg-white/5 rounded-xl border border-white/10 text-center">
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-4">Enter Selection</div>
                    <div className="flex gap-4 justify-center">
                        {['A', 'B', 'C'].map(choice => (
                            <button
                                key={choice}
                                onClick={() => setInputs({ result: choice })}
                                className={clsx(
                                    "w-16 h-16 rounded-xl border-2 font-black text-2xl transition-all",
                                    inputs.result === choice
                                        ? "border-neon-green bg-neon-green/20 text-white scale-110"
                                        : "border-white/20 hover:border-white/50 text-white/50"
                                )}
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
