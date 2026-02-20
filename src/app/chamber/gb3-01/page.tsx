"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
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

const DNA_SEQUENCE = ["A", "T", "G", "C", "A", "T", "C", "G", "T", "A"];

export default function GB301Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const [rotation, setRotation] = useState(0);
    const [showBonds, setShowBonds] = useState(true);
    const [highlightPair, setHighlightPair] = useState<number | null>(null);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GB301Quest[] => {
        const quests: GB301Quest[] = [];

        // Each stage × difficulty = 5 questions (60 total)
        const questData: Record<Stage, Record<Difficulty, Array<{
            base?: string;
            b1?: string;
            b2?: string;
            seq?: string;
            expected: string;
            highlightIndex?: number;
        }>>> = {
            PAIRING: {
                BASIC: [
                    { base: "A", expected: "T", highlightIndex: 0 },
                    { base: "T", expected: "A", highlightIndex: 1 },
                    { base: "G", expected: "C", highlightIndex: 2 },
                    { base: "C", expected: "G", highlightIndex: 3 },
                    { base: "A", expected: "T", highlightIndex: 4 }
                ],
                CORE: [
                    { base: "T", expected: "A", highlightIndex: 5 },
                    { base: "C", expected: "G", highlightIndex: 6 },
                    { base: "G", expected: "C", highlightIndex: 7 },
                    { base: "T", expected: "A", highlightIndex: 8 },
                    { base: "A", expected: "T", highlightIndex: 9 }
                ],
                ADVANCED: [
                    { base: "G", expected: "C", highlightIndex: 0 },
                    { base: "C", expected: "G", highlightIndex: 1 },
                    { base: "A", expected: "T", highlightIndex: 2 },
                    { base: "T", expected: "A", highlightIndex: 3 },
                    { base: "G", expected: "C", highlightIndex: 4 }
                ],
                ELITE: [
                    { base: "C", expected: "G", highlightIndex: 5 },
                    { base: "G", expected: "C", highlightIndex: 6 },
                    { base: "T", expected: "A", highlightIndex: 7 },
                    { base: "A", expected: "T", highlightIndex: 8 },
                    { base: "C", expected: "G", highlightIndex: 9 }
                ]
            },
            BONDS: {
                BASIC: [
                    { b1: "A", b2: "T", expected: "2" },
                    { b1: "T", b2: "A", expected: "2" },
                    { b1: "G", b2: "C", expected: "3" },
                    { b1: "C", b2: "G", expected: "3" },
                    { b1: "A", b2: "T", expected: "2" }
                ],
                CORE: [
                    { b1: "G", b2: "C", expected: "3" },
                    { b1: "C", b2: "G", expected: "3" },
                    { b1: "T", b2: "A", expected: "2" },
                    { b1: "A", b2: "T", expected: "2" },
                    { b1: "G", b2: "C", expected: "3" }
                ],
                ADVANCED: [
                    { b1: "C", b2: "G", expected: "3" },
                    { b1: "G", b2: "C", expected: "3" },
                    { b1: "A", b2: "T", expected: "2" },
                    { b1: "T", b2: "A", expected: "2" },
                    { b1: "C", b2: "G", expected: "3" }
                ],
                ELITE: [
                    { b1: "G", b2: "C", expected: "3" },
                    { b1: "A", b2: "T", expected: "2" },
                    { b1: "C", b2: "G", expected: "3" },
                    { b1: "T", b2: "A", expected: "2" },
                    { b1: "G", b2: "C", expected: "3" }
                ]
            },
            SEQUENCE: {
                BASIC: [
                    { seq: "ATGC", expected: "TACG" },
                    { seq: "CGTA", expected: "GCAT" },
                    { seq: "AATT", expected: "TTAA" },
                    { seq: "GGCC", expected: "CCGG" },
                    { seq: "ATCG", expected: "TAGC" }
                ],
                CORE: [
                    { seq: "ATGCAT", expected: "TACGTA" },
                    { seq: "CGTACG", expected: "GCATGC" },
                    { seq: "AATTGG", expected: "TTAACC" },
                    { seq: "GGCCAA", expected: "CCGGTT" },
                    { seq: "ATCGAT", expected: "TAGCTA" }
                ],
                ADVANCED: [
                    { seq: "ATGCATGC", expected: "TACGTACG" },
                    { seq: "CGTACGTA", expected: "GCATGCAT" },
                    { seq: "AATTGGCC", expected: "TTAACCGG" },
                    { seq: "GGCCAATT", expected: "CCGGTTAA" },
                    { seq: "ATCGATCG", expected: "TAGCTAGC" }
                ],
                ELITE: [
                    { seq: "ATGCATGCAT", expected: "TACGTACGTA" },
                    { seq: "CGTACGTACG", expected: "GCATGCATGC" },
                    { seq: "AATTGGCCAA", expected: "TTAACCGGTT" },
                    { seq: "GGCCAATTGG", expected: "CCGGTTAACC" },
                    { seq: "ATCGATCGAT", expected: "TAGCTAGCTA" }
                ]
            }
        };

        const dataList = questData[stage][difficulty];
        dataList.forEach((data, idx) => {
            if (stage === "PAIRING") {
                const base = data.base!;
                quests.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    base,
                    highlightIndex: data.highlightIndex,
                    promptLatex: t("gb3_01.prompts.pairing_prompt", { base }),
                    expressionLatex: t("gb3_01.prompts.pairing_target", { base }),
                    targetLatex: data.expected,
                    slots: [{ id: "ans", labelLatex: t("gb3_01.prompts.pairing_target", { base }), placeholder: "...", expected: data.expected }],
                    correctLatex: data.expected,
                    hintLatex: [base === "A" || base === "T" ? t("gb3_01.prompts.hint_at") : t("gb3_01.prompts.hint_gc")]
                });
            } else if (stage === "BONDS") {
                const b1 = data.b1!;
                const b2 = data.b2!;
                quests.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    b1,
                    b2,
                    promptLatex: t("gb3_01.prompts.bonds_prompt", { b1, b2 }),
                    expressionLatex: t("gb3_01.prompts.bonds_target"),
                    targetLatex: data.expected,
                    slots: [{ id: "ans", labelLatex: "n_{H}", placeholder: "2-3", expected: data.expected }],
                    correctLatex: data.expected,
                    hintLatex: [b1 === "A" || b1 === "T" ? t("gb3_01.prompts.hint_at") : t("gb3_01.prompts.hint_gc")]
                });
            } else {
                const seq = data.seq!;
                quests.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    seq,
                    promptLatex: t("gb3_01.prompts.sequence_prompt", { seq }),
                    expressionLatex: t("gb3_01.prompts.sequence_target"),
                    targetLatex: data.expected,
                    slots: [{ id: "ans", labelLatex: t("gb3_01.prompts.sequence_label"), placeholder: "...", expected: data.expected }],
                    correctLatex: data.expected,
                    hintLatex: [t("gb3_01.prompts.hint_sequence")]
                });
            }
        });

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
      adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<GB301Quest, Stage>({
    moduleCode: "gb3-01",
        buildPool,
        initialStage: "PAIRING",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("gb3-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    useEffect(() => {
        if (currentQuest?.highlightIndex !== undefined) {
            setHighlightPair(currentQuest?.highlightIndex);
        } else {
            setHighlightPair(null);
        }
    }, [currentQuest]);

    const stagesProps = useMemo(() => [
        { id: "PAIRING" as Stage, label: t("gb3_01.stages.pairing") },
        { id: "BONDS" as Stage, label: t("gb3_01.stages.bonds") },
        { id: "SEQUENCE" as Stage, label: t("gb3_01.stages.sequence") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      moduleCode="GB3.01"
            title={t("gb3_01.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("gb3_01.footer_left")}
            translations={{
                back: t("gb3_01.back"),
                check: t("gb3_01.check"),
                next: t("gb3_01.next"),
                correct: t("gb3_01.correct"),
                incorrect: t("gb3_01.incorrect"),
                ready: t("gb3_01.ready"),
                monitor_title: t("gb3_01.monitor_title"),
                difficulty: {
                    basic: t("gb3_01.difficulty.basic"),
                    core: t("gb3_01.difficulty.core"),
                    advanced: t("gb3_01.difficulty.advanced"),
                    elite: t("gb3_01.difficulty.elite"),
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
                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setShowBonds(!showBonds)}
                            className={`p-3 rounded-lg border transition-all text-[10px] font-black tracking-widest uppercase ${showBonds
                                ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                }`}
                        >
                            {t("gb3_01.labels.show_bonds")}
                        </button>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex flex-col justify-center">
                            <div className="text-[8px] uppercase text-white/40 tracking-widest">{t("gb3_01.labels.highlight_pair")}</div>
                            <div className="text-xs font-mono text-neon-cyan truncate uppercase">
                                {highlightPair !== null ? `INDEX_0x${highlightPair}` : "AUTO_SCAN"}
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>Helix Integrity</span>
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
                                {t("labels.mission_objective")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest?.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("gb3_01.labels.analysis")}
                                </span>
                                <div className="text-4xl text-white font-black uppercase">
                                    <InlineMath math={currentQuest?.expressionLatex || ""} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-cyan/30" />
                                    {t("labels.terminal_input")} [Helix-Forge]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest?.slots.map((slot) => (
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
                                                        {lastCheck.ok ? t("gb3_01.results.valid") : t("gb3_01.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("gb3_01.results.valid_desc") : t("gb3_01.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("labels.hint")}:</span>
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
                                                    {t("gb3_01.results.next")}
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
