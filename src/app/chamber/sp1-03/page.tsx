"use client";

import { useCallback, useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";

import {
    Stage,
    SP103Quest,
    generateAtmosphereQuests,
    generateWeatherQuests,
    generateClimateQuests
} from "@/lib/sp1-03/quests";

import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function SP103WeatherClimate() {
    const { t } = useLanguage();

    const sp1_03_t = useMemo(() => ({
        title: t("sp1_03.title") || "SP1.03 // Weather & Climate",
        back: t("sp1_03.back") || "Back",
        difficulty: {
            basic: t("sp1_03.difficulty.basic") || "BASIC",
            core: t("sp1_03.difficulty.core") || "CORE",
            advanced: t("sp1_03.difficulty.advanced") || "ADVANCED",
            elite: t("sp1_03.difficulty.elite") || "ELITE"
        },
        stages: {
            atmosphere: t("sp1_03.stages.atmosphere") || "ATMOSPHERE",
            weather: t("sp1_03.stages.weather") || "WEATHER",
            climate: t("sp1_03.stages.climate") || "CLIMATE"
        },
        footer_left: t("sp1_03.footer_left") || "SP1.03_METEOROLOGY",
        check: t("sp1_03.check") || "Verify",
        next: t("sp1_03.next") || "Next",
        correct: t("sp1_03.correct") || "Correct",
        incorrect: t("sp1_03.incorrect") || "Incorrect"
    }), [t]);

    const buildPool = useCallback((d: Difficulty, s: Stage) => {
        if (s === "ATMOSPHERE") return generateAtmosphereQuests(t, d);
        if (s === "WEATHER") return generateWeatherQuests(t, d);
        if (s === "CLIMATE") return generateClimateQuests(t, d);
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
    } = useQuestManager<SP103Quest, Stage>({
        moduleCode: "SP1.03",
        initialStage: "ATMOSPHERE",
        buildPool
    });

    if (!currentQuest) return <div className="p-8 text-white">Loading...</div>;

    const handleInputChange = (slotId: string, val: string) => {
        setInputs((prev) => ({ ...prev, [slotId]: val }));
    };

    const handleVerify = () => verify();

    return (
        <ChamberLayout
            title={sp1_03_t.title}
            moduleCode="SP1.03"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "ATMOSPHERE", label: sp1_03_t.stages.atmosphere },
                { id: "WEATHER", label: sp1_03_t.stages.weather },
                { id: "CLIMATE", label: sp1_03_t.stages.climate }
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={handleVerify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sp1_03_t.footer_left}
            translations={{
                back: sp1_03_t.back,
                difficulty: sp1_03_t.difficulty,
                check: sp1_03_t.check,
                next: sp1_03_t.next,
                correct: sp1_03_t.correct,
                incorrect: sp1_03_t.incorrect,
                ready: "SYSTEM_READY",
                monitor_title: "METEOROLOGY_V1"
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
