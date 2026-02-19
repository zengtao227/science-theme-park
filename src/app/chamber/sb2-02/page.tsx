"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
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

export default function SB202Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
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

            organs.forEach(o => {
                quests.push({
                    id: `D-${o.name}`, difficulty, stage, organ: o.name,
                    promptLatex: t("sb2_02.prompts.organ_function", { function: o.function }),
                    expressionLatex: `\\text{${o.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}}`,
                    targetLatex: t("sb2_02.labels.anatomy_display"),
                    slots: [{ id: "organ", labelLatex: "\\\\text{Organ}", placeholder: o.name, expected: o.name }],
                    correctLatex: o.name,
                    hintLatex: [t("sb2_02.prompts.hint_organ", { name: o.name })]
                });
            });
        }

        if (stage === "CIRCULATORY") {
            const components = [
                { name: "heart", function: "pumping blood" },
                { name: "arteries", function: "oxygen transport" },
                { name: "veins", function: "deoxygenated transport" },
                { name: "capillaries", function: "gas exchange" }
            ];

            components.forEach(c => {
                quests.push({
                    id: `C-${c.name}`, difficulty, stage, organ: c.name,
                    promptLatex: t("sb2_02.prompts.component_function", { function: c.function }),
                    expressionLatex: `\\\\text{${c.name.charAt(0).toUpperCase() + c.name.slice(1)}}`,
                    targetLatex: t("sb2_02.labels.anatomy_display"),
                    slots: [{ id: "comp", labelLatex: "\\\\text{Component}", placeholder: c.name, expected: c.name }],
                    correctLatex: c.name,
                    hintLatex: [t("sb2_02.prompts.hint_component", { name: c.name })]
                });
            });
        }

        if (stage === "RESPIRATORY") {
            const structures = [
                { name: "trachea", function: "air conduit" },
                { name: "lungs", function: "gas exchange surface" },
                { name: "diaphragm", function: "breathing mechanism" },
                { name: "alveoli", function: "diffusion site" }
            ];

            structures.forEach(s => {
                quests.push({
                    id: `R-${s.name}`, difficulty, stage, organ: s.name,
                    promptLatex: t("sb2_02.prompts.structure_function", { function: s.function }),
                    expressionLatex: `\\\\text{${s.name.charAt(0).toUpperCase() + s.name.slice(1)}}`,
                    targetLatex: t("sb2_02.labels.anatomy_display"),
                    slots: [{ id: "struct", labelLatex: "\\\\text{Structure}", placeholder: s.name, expected: s.name }],
                    correctLatex: s.name,
                    hintLatex: [t("sb2_02.prompts.hint_structure", { name: s.name })]
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
    } = useQuestManager<SB202Quest, Stage>({
        buildPool,
        initialStage: "DIGESTIVE",
    });

    useEffect(() => {
        if (stage === "DIGESTIVE") setSelectedSystem("digestive");
        if (stage === "CIRCULATORY") setSelectedSystem("circulatory");
        if (stage === "RESPIRATORY") setSelectedSystem("respiratory");
    }, [stage]);

    useEffect(() => {
        if (currentQuest?.organ) {
            setHighlightedOrgan(currentQuest.organ);
        }
    }, [currentQuest]);

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb2-02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "DIGESTIVE" as Stage, label: t("sb2_02.stages.digestive") },
        { id: "CIRCULATORY" as Stage, label: t("sb2_02.stages.circulatory") },
        { id: "RESPIRATORY" as Stage, label: t("sb2_02.stages.respiratory") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB2.02"
            title={t("sb2_02.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb2_02.footer_left")}
            translations={{
                back: t("sb2_02.back"),
                check: t("sb2_02.check"),
                next: t("sb2_02.next"),
                correct: t("sb2_02.correct"),
                incorrect: t("sb2_02.incorrect"),
                ready: t("sb2_02.ready"),
                monitor_title: t("sb2_02.monitor_title"),
                difficulty: {
                    basic: t("sb2_02.difficulty.basic"),
                    core: t("sb2_02.difficulty.core"),
                    advanced: t("sb2_02.difficulty.advanced"),
                    elite: t("sb2_02.difficulty.elite"),
                },
            }}
            monitorContent={
                <BodySystemCanvas
                    system={selectedSystem}
                    highlightedOrgan={highlightedOrgan}
                    translations={{
                        stomach: t("sb2_02.labels.stomach"),
                        liver: t("sb2_02.labels.liver"),
                        intestines: t("sb2_02.labels.intestines"),
                        heart: t("sb2_02.labels.heart"),
                        arteries: t("sb2_02.labels.arteries"),
                        veins: t("sb2_02.labels.veins"),
                        lungs: t("sb2_02.labels.lungs"),
                        trachea: t("sb2_02.labels.trachea")
                    }}
                />
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full">
                {/* Scenario Description */}
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                    <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic mb-4">
                        {t("sb2_02.objective_title")}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed font-medium">
                        {t(`sb2_02.scenarios.${stage.toLowerCase()}` as any)}
                    </p>
                </div>

                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-neon-green uppercase tracking-[0.5em] font-black italic">
                                {t("sb2_02.labels.analysis")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-green/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,0,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-green/40 animate-pulse" />
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-green/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-green font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-green/30" />
                                    {t("sb2_02.labels.input_terminal")}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-green/30 font-mono">SYS_REG_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-green/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-green/0 group-focus-within:bg-neon-green/20 transition-all blur-sm" />
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
                                                        {lastCheck.ok ? t("sb2_02.results.valid") : t("sb2_02.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sb2_02.results.valid_desc") : t("sb2_02.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("sb2_02.labels.hint")}:</span>
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
                                                    {t("sb2_02.results.next")}
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
