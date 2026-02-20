"use client";

import { useCallback, useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";

import {
    Stage,
    SC107Quest,
    generateRecyclingQuests,
    generateGreenChemistryQuests,
    generateCircularEconomyQuests
} from "@/lib/sc1-07/quests";

import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function SC107Sustainability() {
    const { t } = useLanguage();

    const sc1_07_t = useMemo(() => ({
        title: t("sc1_07.title") || "SC1.07 // Sustainability & Recycling",
        back: t("sc1_07.back") || "Back",
        difficulty: {
            basic: t("sc1_07.difficulty.basic") || "BASIC",
            core: t("sc1_07.difficulty.core") || "CORE",
            advanced: t("sc1_07.difficulty.advanced") || "ADVANCED",
            elite: t("sc1_07.difficulty.elite") || "ELITE"
        },
        stages: {
            recycling: t("sc1_07.stages.recycling") || "RECYCLING",
            green_chemistry: t("sc1_07.stages.green_chemistry") || "GREEN CHEMISTRY",
            circular_economy: t("sc1_07.stages.circular_economy") || "CIRCULAR ECONOMY"
        },
        footer_left: t("sc1_07.footer_left") || "SC1.07_SUSTAINABILITY",
        check: t("sc1_07.check") || "Verify",
        next: t("sc1_07.next") || "Next",
        correct: t("sc1_07.correct") || "Correct",
        incorrect: t("sc1_07.incorrect") || "Incorrect"
    }), [t]);

    const buildPool = useCallback((d: Difficulty, s: Stage) => {
        if (s === "RECYCLING") return generateRecyclingQuests(t, d);
        if (s === "GREEN_CHEMISTRY") return generateGreenChemistryQuests(t, d);
        if (s === "CIRCULAR_ECONOMY") return generateCircularEconomyQuests(t, d);
        return [];
    }, [t]);

    const {
        difficulty,
        stage,
        inputs,
        setInputs,
        currentQuest,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
        lastCheck
    } = useQuestManager<SC107Quest, Stage>({
        moduleCode: "SC1.07",
        initialStage: "RECYCLING",
        buildPool
    });

    if (!currentQuest) return <div className="p-8 text-white">Loading...</div>;

    const handleInputChange = (slotId: string, val: string) => {
        setInputs((prev) => ({ ...prev, [slotId]: val }));
    };

    const handleVerify = () => verify();

    return (
        <ChamberLayout
            title={sc1_07_t.title}
            moduleCode="SC1.07"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "RECYCLING", label: sc1_07_t.stages.recycling },
                { id: "GREEN_CHEMISTRY", label: sc1_07_t.stages.green_chemistry },
                { id: "CIRCULAR_ECONOMY", label: sc1_07_t.stages.circular_economy }
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={handleVerify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sc1_07_t.footer_left}
            translations={{
                back: sc1_07_t.back,
                difficulty: sc1_07_t.difficulty,
                check: sc1_07_t.check,
                next: sc1_07_t.next,
                correct: sc1_07_t.correct,
                incorrect: sc1_07_t.incorrect,
                ready: "SYSTEM_READY",
                monitor_title: "ECOLOGY_V1"
            }}
        >
            <div className="flex flex-col lg:flex-row h-full">
                {/* Left Panel: Visualization Placeholder */}
                <div className="lg:w-1/2 p-6 flex flex-col bg-[#050B14] border-r border-[#0ff]/20">
                    <div className="h-full rounded border border-[#0ff]/30 shadow-[0_0_15px_rgba(0,255,255,0.1)] flex items-center justify-center p-8 bg-black/40 relative overflow-hidden">
                        <h2 className="text-[#0ff] font-mono opacity-50 absolute top-4 left-4">SENSOR FEED</h2>
                    </div>
                </div>

                {/* Right Panel: Equation & Controls */}
                <div className="lg:w-1/2 p-6 flex flex-col items-center">
                    <div className="w-full max-w-md mt-16 text-center">
                        <div className="text-xl text-gray-300 font-mono mb-8 opacity-80 h-16">
                            {currentQuest.promptLatex}
                        </div>
                        <div className="text-4xl text-[#0ff] drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] my-8">
                            <BlockMath math={currentQuest.expressionLatex} />
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            {currentQuest.slots.map(s => (
                                <div key={s.id} className="flex items-center gap-4">
                                    <span className="text-[#0ff] font-mono text-xl">{s.labelLatex} =</span>
                                    <input
                                        type="text"
                                        className="bg-black/50 border border-[#0ff]/50 rounded px-4 py-2 text-[#0ff] text-xl font-mono text-center focus:outline-none focus:border-[#0ff] focus:shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all w-32"
                                        placeholder={s.placeholder}
                                        value={inputs[s.id] || ""}
                                        onChange={(e) => handleInputChange(s.id, e.target.value)}
                                        disabled={lastCheck?.ok}
                                    />
                                    {s.unit && <span className="text-[#0ff]/70 font-mono text-lg">{s.unit}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
