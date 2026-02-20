"use client";

import ChamberLayout from "@/components/layout/ChamberLayout";
import { useLanguage } from "@/lib/i18n";
import { useQuestManager } from "@/hooks/useQuestManager";
import { buildOlympiadPool, OlympiadQuest } from "@/lib/ext/olympiad-data";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, HelpCircle, BrainCircuit, Sparkles } from "lucide-react";
import clsx from "clsx";

export default function OlympiadChallenge() {
    const { t } = useLanguage();

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
    } = useQuestManager<OlympiadQuest, "logic">({
        moduleCode: "EM3.01",
        buildPool: buildOlympiadPool,
        initialStage: "logic",
    });

    const translations = {
        back: t("common.back"),
        check: t("common.check"),
        next: t("common.next"),
        correct: t("common.correct"),
        incorrect: t("common.incorrect"),
        difficulty: {
            BASIC: "TRAINING",
            CORE: "COMPETITION",
            ADVANCED: "OLYMPIAD",
            ELITE: "LEGENDARY",
        }
    };

    const hint = getHint();

    return (
        <ChamberLayout
            title={t("home.em3_01_title")}
            moduleCode="EM3.01"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[{ id: "logic", label: "Logic & Induction" }]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as "logic")}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            translations={translations}
        >
            <div className="flex-1 flex flex-col h-full bg-black/40 backdrop-blur-sm overflow-y-auto">
                <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12 space-y-12 print-content">
                    {currentQuest ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuest.id + nonce}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-12"
                            >
                                {/* Category Badge */}
                                <div className="flex items-center gap-3 no-print">
                                    <div className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded-full text-[10px] font-black tracking-widest text-neon-purple uppercase">
                                        {currentQuest.category} Challenge
                                    </div>
                                    <div className="h-px flex-1 bg-white/10" />
                                    <div className="text-[10px] font-mono text-white/40 uppercase">
                                        Q-UID: {currentQuest.id}
                                    </div>
                                </div>

                                {/* Prompt Section */}
                                <div className="space-y-6">
                                    <div className="text-2xl md:text-3xl font-bold leading-tight text-white/90">
                                        <InlineMath math={currentQuest.promptLatex} />
                                    </div>

                                    <div className="p-8 bg-white/[0.03] border border-white/10 rounded-2xl relative group overflow-hidden no-print">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan" />
                                        <div className="text-xs font-black tracking-widest text-neon-cyan uppercase mb-4 opacity-50">
                                            Logical Context
                                        </div>
                                        <div className="text-xl font-mono text-white/60 group-hover:text-white/80 transition-colors">
                                            <BlockMath math={currentQuest.expressionLatex} />
                                        </div>
                                    </div>
                                </div>

                                {/* Thinking Area */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 no-print">
                                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                            <BrainCircuit className="w-5 h-5 text-white/60" />
                                        </div>
                                        <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/40">
                                            Formal Solution Entry
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {currentQuest.slots.map((slot) => (
                                            <div key={slot.id} className="space-y-4">
                                                <div className="text-xs font-bold text-white/60 flex items-center gap-2">
                                                    <InlineMath math={slot.labelLatex} />
                                                </div>
                                                <div className="relative group">
                                                    <input
                                                        type="text"
                                                        value={inputs[slot.id] || ""}
                                                        onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                        placeholder={slot.placeholder}
                                                        className={clsx(
                                                            "w-full bg-white/[0.05] border-2 border-white/20 px-6 py-4 rounded-xl text-xl font-mono focus:border-neon-cyan focus:outline-none transition-all placeholder:opacity-20",
                                                            lastCheck?.ok === false && "border-neon-red/50 bg-neon-red/5",
                                                            lastCheck?.ok === true && "border-neon-green/50 bg-neon-green/5"
                                                        )}
                                                    />
                                                    {slot.unit && (
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 font-mono text-sm pointer-events-none">
                                                            {slot.unit}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Hint System */}
                                {hint && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="p-6 bg-neon-amber/5 border border-neon-amber/20 rounded-2xl no-print"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <HelpCircle className="w-4 h-4 text-neon-amber" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-neon-amber">Technical Insight</span>
                                        </div>
                                        <div className="text-white/70 font-mono text-sm leading-relaxed">
                                            <InlineMath math={hint} />
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-white/40 font-mono text-sm animate-pulse uppercase tracking-widest">
                                Loading Simulation sequence...
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer Progress HUD */}
                <div className="p-6 border-t border-white/10 bg-black/60 backdrop-blur-md no-print">
                    <div className="max-w-4xl mx-auto flex items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={previous}
                                disabled={!canPrevious}
                                className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all"
                            >
                                <span className="rotate-180">➜</span>
                            </button>
                            <button
                                onClick={next}
                                disabled={!canNext}
                                className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all font-bold"
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
                                    className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                                />
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-1">Status</div>
                                <div className="text-xs font-mono text-white/80">READY_FOR_DEPLOYMENT</div>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-neon-green" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
