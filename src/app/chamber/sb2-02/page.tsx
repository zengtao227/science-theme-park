"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import BodySystemCanvas from "@/components/chamber/sb2-02/BodySystemCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "DIGESTIVE" | "CIRCULATORY" | "RESPIRATORY";

interface SB202Quest extends Quest {
    stage: Stage;
    organ?: string;
    system?: string;
}

type SB202T = typeof translations.EN.sb2_02;

export default function SB202Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sb2_02 || translations.EN.sb2_02) as SB202T;
    const [selectedSystem, setSelectedSystem] = useState<string>("digestive");
    const [highlightedOrgan, setHighlightedOrgan] = useState<string | null>(null);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB202Quest[] => {
        const quests: SB202Quest[] = [];

        if (stage === "DIGESTIVE") {
            const organs = [
                { name: "mouth", function: "mechanical breakdown" },
                { name: "stomach", function: "acid digestion" },
                { name: "small intestine", function: "nutrient absorption" },
                { name: "liver", function: "bile production" },
                { name: "pancreas", function: "enzyme secretion" }
            ];

            organs.forEach((org, idx) => {
                quests.push({
                    id: `DIG-${idx}`,
                    difficulty,
                    stage,
                    organ: org.name,
                    system: "digestive",
                    promptLatex: `\\text{${t.prompts.organ_function.replace('{function}', org.function)}}`,
                    expressionLatex: `\\text{${org.function}} \\rightarrow \\text{?}`,
                    targetLatex: org.name.replace(" ", "_"),
                    slots: [{ id: "ans", labelLatex: "\\text{Organ}", placeholder: "...", expected: org.name.replace(" ", "_") }],
                    correctLatex: org.name,
                    hintLatex: [`\\text{${t.prompts.hint_organ.replace('{name}', org.name)}}`]
                });
            });
        }

        if (stage === "CIRCULATORY") {
            const components = [
                { name: "heart", function: "pump blood", answer: "heart" },
                { name: "arteries", function: "carry oxygenated blood", answer: "arteries" },
                { name: "veins", function: "return deoxygenated blood", answer: "veins" },
                { name: "capillaries", function: "gas exchange", answer: "capillaries" },
                { name: "red blood cells", function: "oxygen transport", answer: "red_blood_cells" }
            ];

            components.forEach((comp, idx) => {
                quests.push({
                    id: `CIRC-${idx}`,
                    difficulty,
                    stage,
                    organ: comp.name,
                    system: "circulatory",
                    promptLatex: `\\text{${t.prompts.component_function.replace('{function}', comp.function)}}`,
                    expressionLatex: `\\text{${comp.function}} \\rightarrow \\text{?}`,
                    targetLatex: comp.answer,
                    slots: [{ id: "ans", labelLatex: "\\text{Component}", placeholder: "...", expected: comp.answer }],
                    correctLatex: comp.name,
                    hintLatex: [`\\text{${t.prompts.hint_component.replace('{name}', comp.name)}}`]
                });
            });
        }

        if (stage === "RESPIRATORY") {
            const structures = [
                { name: "trachea", function: "air passage" },
                { name: "bronchi", function: "branch to lungs" },
                { name: "alveoli", function: "gas exchange" },
                { name: "diaphragm", function: "breathing muscle" },
                { name: "lungs", function: "oxygen intake" }
            ];

            structures.forEach((struct, idx) => {
                quests.push({
                    id: `RESP-${idx}`,
                    difficulty,
                    stage,
                    organ: struct.name,
                    system: "respiratory",
                    promptLatex: `\\text{${t.prompts.structure_function.replace('{function}', struct.function)}}`,
                    expressionLatex: `\\text{${struct.function}} \\rightarrow \\text{?}`,
                    targetLatex: struct.name,
                    slots: [{ id: "ans", labelLatex: "\\text{Structure}", placeholder: "...", expected: struct.name }],
                    correctLatex: struct.name,
                    hintLatex: [`\\text{${t.prompts.hint_structure.replace('{name}', struct.name)}}`]
                });
            });
        }

        return quests;
    }, [t]);

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
        getHint,
        currentStageStats,
    } = useQuestManager<SB202Quest, Stage>({
        buildPool,
        initialStage: "DIGESTIVE",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SB2.02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "DIGESTIVE", label: t.stages.digestive },
        { id: "CIRCULATORY", label: t.stages.circulatory },
        { id: "RESPIRATORY", label: t.stages.respiratory },
    ], [t]);

    // Sync visualization with quest - using the "adjust state during render" pattern to satisfy React Compiler
    const [prevQuestId, setPrevQuestId] = useState<string | undefined>();
    if (currentQuest?.id !== prevQuestId) {
        setPrevQuestId(currentQuest?.id);
        if (currentQuest) {
            if (currentQuest.system) {
                setSelectedSystem(currentQuest.system);
            }
            if (currentQuest.organ) {
                setHighlightedOrgan(currentQuest.organ);
            }
        }
    }

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB2.02"
            title={t.title}
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
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <BodySystemCanvas
                            system={selectedSystem}
                            highlightedOrgan={highlightedOrgan}
                            translations={t}
                        />
                    </div>

                    {/* System Selection */}
                    <div className="grid grid-cols-3 gap-2">
                        {["digestive", "circulatory", "respiratory"].map((sys) => (
                            <button
                                key={sys}
                                onClick={() => setSelectedSystem(sys)}
                                className={`p-2 text-[9px] uppercase tracking-widest font-bold rounded border transition-all ${selectedSystem === sys
                                        ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
                                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                {t.systems[sys as keyof typeof t.systems]}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t.labels.anatomy_score}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0)
                                            ? "bg-neon-cyan shadow-[0_0_5px_cyan]"
                                            : "bg-transparent"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full">
                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                                {t.objective_title}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t.labels.anatomy_display}
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-cyan/30" />
                                    {t.labels.input_terminal}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">ANAT_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-cyan/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-cyan/0 group-focus-within:bg-neon-cyan/20 transition-all blur-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {lastCheck && (
                                        <motion.div
                                            key={lastCheck.ok ? "correct" : "incorrect"}
                                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                            className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${lastCheck.ok
                                                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                                                }`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${lastCheck.ok ? 'border-green-500/50 bg-green-500/20' : 'border-red-500/50 bg-red-500/20'
                                                    }`}>
                                                    {lastCheck.ok ? "✓" : "✗"}
                                                </div>
                                                <div>
                                                    <div className="font-black text-lg tracking-widest uppercase italic">
                                                        {lastCheck.ok ? t.correct : t.incorrect}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t.feedback.correct : t.feedback.incorrect}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Hint:</span>
                                                    <div className="text-white font-bold">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}

                                            {lastCheck.ok && (
                                                <button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                                >
                                                    {t.next}
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ChamberLayout>
    );
}
