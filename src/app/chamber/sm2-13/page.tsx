"use client";

import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager } from "@/hooks/useQuestManager";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { Stage, SM213Quest, buildStagePool } from "@/lib/sm2-13-quest-data";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import clsx from "clsx";
import { HelpCircle, BrainCircuit } from "lucide-react";

export default function SM213Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const sm2_13_t = {
        title: t("home.sm2_13_title") || "SM2.13 // GEOMETRIC TRANSFORMATIONS",
        stages: {
            reflection: "REFLECTION",
            translation: "TRANSLATION",
            rotation: "ROTATION",
            composition: "COMPOSITION"
        },
        translations: {
            back: t("gp1_01.back") || "Back",
            check: t("common.check") || "Verify",
            next: t("common.next") || "Next",
            correct: t("common.correct") || "Correct",
            incorrect: t("common.incorrect") || "Incorrect",
            difficulty: {
                basic: t("gp1_01.basic") || "BASIC",
                core: t("gp1_01.core") || "CORE",
                advanced: t("gp1_01.advanced") || "ADVANCED",
                elite: t("gp1_01.elite") || "ELITE"
            }
        }
    };

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        nonce,
        progress,
        canPrevious,
        canNext,
        getHint,
        setInputs,
        verify,
        next,
        previous,
        handleDifficultyChange,
        handleStageChange,
    } = useQuestManager<SM213Quest, Stage>({
        moduleCode: "SM2.13",
        buildPool: (diff, s) => buildStagePool(diff, s),
        initialStage: "reflection",
        tolerance: 0.1
    });

    // Mark stage complete when verified
    React.useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SM2.13", stage);
        }
    }, [lastCheck, stage, completeStage]);

    const hint = getHint();

    return (
        <ChamberLayout
            title={sm2_13_t.title}
            moduleCode="SM2.13"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "reflection", label: sm2_13_t.stages.reflection },
                { id: "translation", label: sm2_13_t.stages.translation },
                { id: "rotation", label: sm2_13_t.stages.rotation },
                { id: "composition", label: sm2_13_t.stages.composition }
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            translations={sm2_13_t.translations}
        >
            <div className="flex-1 flex flex-col h-full bg-black/40 backdrop-blur-sm overflow-y-auto">
                <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12 space-y-8 flex flex-col lg:flex-row gap-8">
                    {/* Left: Interactive Quest Area */}
                    <div className="flex-1 min-w-0">
                        {currentQuest ? (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuest.id + nonce}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] font-black tracking-widest text-amber-500 uppercase">
                                            {stage}
                                        </div>
                                        <div className="h-px flex-1 bg-white/10" />
                                        <div className="text-[10px] font-mono text-white/40 uppercase">
                                            ID: {currentQuest.id}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="text-xl md:text-2xl font-bold leading-tight text-white/90">
                                            {(() => {
                                                const latex = currentQuest.promptLatex || "";
                                                if (latex.startsWith("\\\\text{") && latex.endsWith("}")) {
                                                    const clean = latex.replace(/^\\\\text\{/, "").replace(/\}$/, "");
                                                    return <span className="font-sans font-black not-italic whitespace-pre-wrap">{clean.replace(/\\\\n/g, "\n")}</span>;
                                                }
                                                if (!latex.includes("\\\\") && !latex.includes("$") && !latex.includes("$")) {
                                                    return <span className="font-sans font-black not-italic whitespace-pre-wrap">{latex}</span>;
                                                }
                                                return <InlineMath math={latex} />;
                                            })()}
                                        </div>

                                        <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl relative group overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                                            <div className="text-xs font-black tracking-widest text-amber-500 uppercase mb-4 opacity-50">
                                                CONTEXT
                                            </div>
                                            <div className="text-lg font-mono text-white/60">
                                                <BlockMath math={currentQuest.expressionLatex} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                                <BrainCircuit className="w-4 h-4 text-white/60" />
                                            </div>
                                            <h3 className="text-xs font-black tracking-[0.2em] uppercase text-white/40">
                                                SOLUTION INPUT
                                            </h3>
                                        </div>

                                        <div className="flex flex-wrap gap-4">
                                            {currentQuest.targetLatex && (
                                                <div className="flex items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10 text-white mr-2">
                                                    <InlineMath math={currentQuest.targetLatex} />
                                                </div>
                                            )}
                                            {currentQuest.slots.map((slot) => (
                                                <div key={slot.id} className="space-y-2 flex-1 min-w-[120px]">
                                                    <div className="text-xs font-bold text-white/60 flex items-center gap-2">
                                                        <InlineMath math={slot.labelLatex} />
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={inputs[slot.id] || ""}
                                                            onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                            placeholder={slot.placeholder || ""}
                                                            disabled={lastCheck?.ok}
                                                            className={clsx(
                                                                "w-full bg-black/50 border border-white/20 px-4 py-3 rounded-lg text-lg font-mono focus:border-amber-500 focus:outline-none transition-all placeholder:text-white/20",
                                                                lastCheck?.ok === false && "border-red-500/50 bg-red-500/5",
                                                                lastCheck?.ok === true && "border-green-500/50 bg-green-500/5 text-green-400"
                                                            )}
                                                        />
                                                        {slot.unit && (
                                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-mono text-sm pointer-events-none">
                                                                <InlineMath math={slot.unit} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Solution / Result info if needed */}
                                    {lastCheck?.ok && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                                            <div className="text-green-400 font-bold mb-2">Answer Confirmed</div>
                                            {currentQuest.correctLatex && <BlockMath math={currentQuest.correctLatex} />}
                                        </div>
                                    )}

                                    {hint && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl mt-4"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <HelpCircle className="w-4 h-4 text-amber-500" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Hint</span>
                                            </div>
                                            <div className="text-white/70 font-mono text-sm">
                                                <InlineMath math={hint} />
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <div className="animate-pulse text-white/40 uppercase tracking-widest text-sm">Loading Data...</div>
                            </div>
                        )}
                    </div>

                    {/* Right: Matrix Cheat Sheet */}
                    <div className="w-full lg:w-64 border border-amber-500/20 bg-black/60 backdrop-blur rounded-xl p-5 h-fit sticky top-6">
                        <h3 className="text-xs font-black tracking-[0.2em] text-amber-500 uppercase border-b border-amber-500/30 pb-3 mb-4">
                            TRANSFORMATION MATRIX
                        </h3>
                        <div className="text-sm font-mono text-white/70 space-y-6">
                            <div>
                                <div className="text-white/50 mb-1 tracking-wider uppercase text-[10px]">Reflection</div>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                        <InlineMath math="\text{x-axis}" />
                                        <InlineMath math="(x, -y)" />
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                        <InlineMath math="\text{y-axis}" />
                                        <InlineMath math="(-x, y)" />
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                        <InlineMath math="y = x" />
                                        <InlineMath math="(y, x)" />
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                        <InlineMath math="y = -x" />
                                        <InlineMath math="(-y, -x)" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="text-white/50 mb-1 tracking-wider uppercase text-[10px]">Translation</div>
                                <div className="bg-white/5 px-2 py-1 rounded">
                                    <InlineMath math="(x{+}dx, y{+}dy)" />
                                </div>
                            </div>
                            <div>
                                <div className="text-white/50 mb-1 tracking-wider uppercase text-[10px]">Rotation (Origin)</div>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                        <InlineMath math="90^\circ\text{ CCW}" />
                                        <InlineMath math="(-y, x)" />
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                                        <InlineMath math="180^\circ" />
                                        <InlineMath math="(-x, -y)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Progress HUD */}
                <div className="p-6 border-t border-white/10 bg-black/60 backdrop-blur-md">
                    <div className="max-w-4xl mx-auto flex items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={previous}
                                disabled={!canPrevious}
                                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all text-white"
                            >
                                <span className="rotate-180">➜</span>
                            </button>
                            <button
                                onClick={next}
                                disabled={!canNext}
                                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all font-bold text-white"
                            >
                                ➜
                            </button>
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between text-[10px] font-black tracking-widest text-white/40 uppercase">
                                <span>Sequence Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-amber-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
