"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import DnaCanvas from "@/components/chamber/gb3-01/DnaCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "PAIRING" | "BONDS" | "SEQUENCE";

interface GB301Quest extends Quest {
    stage: Stage;
    base?: string;
    b1?: string;
    b2?: string;
    seq?: string;
    highlightIndex?: number;
}

type GB301T = typeof translations.EN.gb3_01;

const DNA_SEQUENCE = ["A", "T", "G", "C", "A", "T", "C", "G", "T", "A"];

export default function GB301Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.gb3_01 || translations.EN.gb3_01) as GB301T;

    const [rotation, setRotation] = useState(0);
    const [showBonds, setShowBonds] = useState(true);
    const [highlightPair, setHighlightPair] = useState<number | null>(null);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GB301Quest[] => {
        const quests: GB301Quest[] = [];

        if (stage === "PAIRING") {
            DNA_SEQUENCE.forEach((base, idx) => {
                const complement = base === "A" ? "T" : base === "T" ? "A" : base === "C" ? "G" : "C";
                quests.push({
                    id: `P-${idx}`,
                    difficulty,
                    stage,
                    base,
                    highlightIndex: idx,
                    promptLatex: t.prompts.pairing_prompt.replace("{base}", base),
                    expressionLatex: t.prompts.pairing_target.replace("{base}", base),
                    targetLatex: complement,
                    slots: [{ id: "ans", labelLatex: "\\text{Base}", placeholder: "A/T/C/G", expected: complement }],
                    correctLatex: complement,
                    hintLatex: [base === "A" || base === "T" ? t.prompts.hint_at : t.prompts.hint_gc]
                });
            });
        }

        if (stage === "BONDS") {
            DNA_SEQUENCE.forEach((base, idx) => {
                const complement = base === "A" ? "T" : base === "T" ? "A" : base === "C" ? "G" : "C";
                const bonds = (base === "A" || base === "T") ? "2" : "3";
                quests.push({
                    id: `B-${idx}`,
                    difficulty,
                    stage,
                    b1: base,
                    b2: complement,
                    highlightIndex: idx,
                    promptLatex: t.prompts.bonds_prompt.replace("{b1}", base).replace("{b2}", complement),
                    expressionLatex: t.prompts.bonds_target,
                    targetLatex: bonds,
                    slots: [{ id: "ans", labelLatex: "\\text{Bonds}", placeholder: "2/3", expected: bonds }],
                    correctLatex: bonds,
                    hintLatex: [base === "A" || base === "T" ? t.prompts.hint_at : t.prompts.hint_gc]
                });
            });
        }

        if (stage === "SEQUENCE") {
            const shortSeqs = ["ATGC", "GCTA", "AATT", "CCGG"];
            shortSeqs.forEach((seq, idx) => {
                const complement = seq.split("").map(b => b === "A" ? "T" : b === "T" ? "A" : b === "C" ? "G" : "C").join("");
                quests.push({
                    id: `S-${idx}`,
                    difficulty,
                    stage,
                    seq,
                    promptLatex: t.prompts.seq_prompt.replace("{seq}", seq),
                    expressionLatex: t.prompts.seq_target,
                    targetLatex: complement,
                    slots: [{ id: "ans", labelLatex: "\\text{Sequence}", placeholder: "...", expected: complement }],
                    correctLatex: complement,
                    hintLatex: ["\\text{Apply Chargaff's rules to each base.}"]
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
    } = useQuestManager<GB301Quest, Stage>({
        buildPool,
        initialStage: "PAIRING",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gb3-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "PAIRING", label: t.stages.pairing },
        { id: "BONDS", label: t.stages.bonds },
        { id: "SEQUENCE", label: t.stages.sequence },
    ], [t]);

    // Sync highlight with quest
    useEffect(() => {
        if (currentQuest && currentQuest.highlightIndex !== undefined) {
            setHighlightPair(currentQuest.highlightIndex);
        } else {
            setHighlightPair(null);
        }
    }, [currentQuest]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="GB3.01"
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
                        <DnaCanvas
                            rotation={rotation}
                            showBonds={showBonds}
                            highlightPair={highlightPair}
                        />
                    </div>

                    {/* Visual Controls */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2 space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.rotation}</label>
                            <input
                                type="range"
                                min="0"
                                max={Math.PI * 2}
                                step="0.01"
                                value={rotation}
                                onChange={(e) => setRotation(Number(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-cyan"
                            />
                        </div>
                        <label className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10 cursor-pointer hover:bg-white/10">
                            <span className="text-[9px] uppercase text-white/60">{t.labels.show_bonds}</span>
                            <input
                                type="checkbox"
                                checked={showBonds}
                                onChange={(e) => setShowBonds(e.target.checked)}
                                className="w-3 h-3 rounded bg-black border-white/20 text-neon-cyan focus:ring-neon-cyan/50"
                            />
                        </label>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>Helix Stability</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? "bg-neon-cyan shadow-[0_0_5px_cyan]" : "bg-transparent"
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
                                Mission Objective
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    Base Pair Analysis
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
                                    Terminal Input [Helix-Forge]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">CODE_0x{slot.id.toUpperCase()}</span>
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
                                                        {lastCheck.ok ? "Bonding Stable" : "Helix Instability"}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? "Nucleotide pairs verified." : "Mismatched sequencing detected."}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Hint:</span>
                                                    <div className="text-white font-bold text-sm">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}

                                            {lastCheck.ok && (
                                                <button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-xs font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                                >
                                                    Forge Next Pair
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
