"use client";

import { useCallback, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { renderMixedText } from "@/lib/latex-utils";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createModuleFeedbackProvider } from "@/lib/feedback/moduleFeedbackProvider";

import {
    Stage,
    SP104Quest,
    generateSolarSystemQuests,
    generateMoonPhasesQuests,
    generateSeasonsQuests
} from "@/lib/sp1-04/quests";

import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function SP104AstronomyBasics() {
    const { t } = useLanguage();
    const feedbackContentProvider = useMemo(() => createModuleFeedbackProvider(t, "sp1-04"), [t]);

    const sp1_04_t = useMemo(() => ({
        title: t("sp1_04.title"),
        back: t("sp1_04.back"),
        difficulty: {
            basic: t("sp1_04.difficulty.basic"),
            core: t("sp1_04.difficulty.core"),
            advanced: t("sp1_04.difficulty.advanced"),
            elite: t("sp1_04.difficulty.elite")
        },
        stages: {
            solar_system: t("sp1_04.stages.solar_system"),
            moon_phases: t("sp1_04.stages.moon_phases"),
            seasons: t("sp1_04.stages.seasons")
        },
        check: t("sp1_04.check"),
        next: t("sp1_04.next"),
        correct: t("sp1_04.correct"),
        incorrect: t("sp1_04.incorrect"),
        monitor_title: t("sp1_04.monitor_title"),
        loading: t("sp1_04.loading"),
        labels: {
            sensor_feed: t("sp1_04.labels.sensor_feed")
        }
    }), [t]);

    const buildPool = useCallback((d: Difficulty, s: Stage) => {
        if (s === "SOLAR_SYSTEM") return generateSolarSystemQuests(t, d);
        if (s === "MOON_PHASES") return generateMoonPhasesQuests(t, d);
        if (s === "SEASONS") return generateSeasonsQuests(t, d);
        return [];
    }, [t]);

    const stages = useMemo(() => [
        { id: "SOLAR_SYSTEM" as Stage, label: sp1_04_t.stages.solar_system },
        { id: "MOON_PHASES" as Stage, label: sp1_04_t.stages.moon_phases },
        { id: "SEASONS" as Stage, label: sp1_04_t.stages.seasons }
    ], [sp1_04_t.stages.moon_phases, sp1_04_t.stages.seasons, sp1_04_t.stages.solar_system]);

    const printSections = useMemo(() => buildQuestPrintSections<SP104Quest, Stage>({
        moduleTitle: sp1_04_t.title,
        stages,
        difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
        difficultyLabels: {
            BASIC: sp1_04_t.difficulty.basic,
            CORE: sp1_04_t.difficulty.core,
            ADVANCED: sp1_04_t.difficulty.advanced,
            ELITE: sp1_04_t.difficulty.elite,
        },
        buildPool,
    }), [buildPool, sp1_04_t.difficulty.advanced, sp1_04_t.difficulty.basic, sp1_04_t.difficulty.core, sp1_04_t.difficulty.elite, sp1_04_t.title, stages]);

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
        lastCheck,
        feedbackLevel,
        feedbackContent,
        feedbackAvailability,
        showHintLevel,
        showStepsLevel,
        showFullSolution,
        policy,
    } = useQuestManager<SP104Quest, Stage>({
        moduleCode: "SP1.04",
        initialStage: "SOLAR_SYSTEM",
    feedbackContentProvider,
        buildPool
    });

    if (!currentQuest) return <div className="p-8 text-white">{sp1_04_t.loading}</div>;

    const handleInputChange = (slotId: string, val: string) => {
        setInputs((prev) => ({ ...prev, [slotId]: val }));
    };

    const handleVerify = () => verify();

    return (
        <ChamberLayout
            title={sp1_04_t.title}
            moduleCode="SP1.04"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            printSections={printSections}
            onVerify={handleVerify}
            onNext={next}
            checkStatus={lastCheck}
            translations={{
                back: sp1_04_t.back,
                difficulty: sp1_04_t.difficulty,
                check: sp1_04_t.check,
                next: sp1_04_t.next,
                correct: sp1_04_t.correct,
                incorrect: sp1_04_t.incorrect,
                monitor_title: sp1_04_t.monitor_title
            }}
            feedbackContent={feedbackContent}
            feedbackLevel={feedbackLevel}
            feedbackAvailability={feedbackAvailability}
            feedbackPolicy={policy}
            onShowHint={showHintLevel}
            onShowSteps={showStepsLevel}
            onShowFull={showFullSolution}
        >
            <div className="flex flex-col lg:flex-row h-full">
                {/* Left Panel: Visualization Placeholder */}
                <div className="lg:w-1/2 p-6 flex flex-col bg-[#050B14] border-r border-[#0ff]/20">
                    <div className="h-full rounded border border-[#0ff]/30 shadow-[0_0_15px_rgba(0,255,255,0.1)] flex items-center justify-center p-8 bg-black/40 relative overflow-hidden">
                        <h2 className="text-[#0ff] font-mono opacity-50 absolute top-4 left-4">{sp1_04_t.labels.sensor_feed}</h2>
                    </div>
                </div>

                {/* Right Panel: Equation & Controls */}
                <div className="lg:w-1/2 p-6 flex flex-col items-center">
                    <div className="w-full max-w-md mt-16 text-center">
                        <div className="text-xl text-gray-300 font-mono mb-8 opacity-80 h-16">
                            {renderMixedText(currentQuest?.promptLatex || "")}
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
