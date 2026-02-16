"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import CellCanvas from "@/components/chamber/sb1-01/CellCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "IDENTIFICATION" | "FUNCTION" | "ORGANELLES";

interface SB101Quest extends Quest {
    stage: Stage;
    targetOrganelleId: string;
    organelleName: string;
}

const ORGANELLE_LIST = [
    { id: "nucleus", key: "nucleus" },
    { id: "mitochondria1", key: "mitochondria" },
    { id: "ribosome1", key: "ribosome" },
    { id: "golgi", key: "golgi" },
    { id: "er", key: "er" }
];

export default function SB101Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null);
    const [showCutaway, setShowCutaway] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB101Quest[] => {
        const quests: SB101Quest[] = [];

        if (stage === "IDENTIFICATION") {
            ORGANELLE_LIST.forEach((org) => {
                quests.push({
                    id: `id-${org.id}`,
                    difficulty,
                    stage,
                    targetOrganelleId: org.id,
                    organelleName: org.key,
                    promptLatex: t("sb1_01.prompts.id_prompt"),
                    expressionLatex: t("sb1_01.prompts.id_target"),
                    targetLatex: org.key,
                    slots: [{ id: "ans", labelLatex: t("sb1_01.prompts.id_target"), placeholder: "...", expected: org.key }],
                    correctLatex: org.key,
                    hintLatex: [t("sb1_01.prompts.hint_start", { char: org.key[0].toUpperCase() })]
                });
            });
        }

        if (stage === "FUNCTION") {
            ORGANELLE_LIST.forEach((org) => {
                // In a real app we'd fetch localized function text from translations.EN.sb1_01.organelles[org.key].func
                // For now, since we're in buildPool, we can use the key and translate it later or pull from translations
                // Let's pull from translations directly
                const organelleData = t(`sb1_01.organelles.${org.key}`) as any;
                const funcText = typeof organelleData === 'object' ? organelleData.func : org.key;

                quests.push({
                    id: `fn-${org.id}`,
                    difficulty,
                    stage,
                    targetOrganelleId: org.id,
                    organelleName: org.key,
                    promptLatex: t("sb1_01.prompts.fn_prompt").replace("{func}", funcText),
                    expressionLatex: t("sb1_01.prompts.fn_target").replace("{func}", funcText),
                    targetLatex: org.key,
                    slots: [{ id: "ans", labelLatex: "Organelle", placeholder: "...", expected: org.key }],
                    correctLatex: org.key,
                    hintLatex: [t("sb1_01.prompts.hint_name").replace("{name}", organelleData.name || org.key)]
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
    } = useQuestManager<SB101Quest, Stage>({
        buildPool,
        initialStage: "IDENTIFICATION",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb1-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "IDENTIFICATION" as Stage, label: t("sb1_01.stages.identification") },
        { id: "FUNCTION" as Stage, label: t("sb1_01.stages.function") },
        { id: "ORGANELLES" as Stage, label: t("sb1_01.stages.organelles") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SB1.01"
            title={t("sb1_01.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb1_01.footer_left")}
            translations={{
                back: t("sb1_01.back"),
                check: t("sb1_01.check"),
                next: t("sb1_01.next"),
                correct: t("sb1_01.correct"),
                incorrect: t("sb1_01.incorrect"),
                ready: t("sb1_01.ready"),
                monitor_title: t("sb1_01.monitor_title"),
                difficulty: {
                    basic: t("sb1_01.difficulty.basic"),
                    core: t("sb1_01.difficulty.core"),
                    advanced: t("sb1_01.difficulty.advanced"),
                    elite: t("sb1_01.difficulty.elite"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <CellCanvas
                            selectedOrganelle={currentQuest?.targetOrganelleId || selectedOrganelle}
                            onSelectOrganelle={setSelectedOrganelle}
                            showCutaway={showCutaway}
                            translations={t("sb1_01")}
                        />
                    </div>
                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setShowCutaway(!showCutaway)}
                            className={`p-3 rounded-lg border transition-all text-[10px] font-black tracking-widest uppercase ${showCutaway
                                ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                }`}
                        >
                            {t("sb1_01.labels.cutaway_view")}
                        </button>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex flex-col justify-center">
                            <div className="text-[8px] uppercase text-white/40 tracking-widest">{t("sb1_01.labels.selected")}</div>
                            <div className="text-xs font-mono text-neon-cyan truncate uppercase">
                                {selectedOrganelle || "NONE"}
                            </div>
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
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("sb1_01.results.analysis")}
                                </span>
                                <div className="text-4xl text-white font-black uppercase">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-cyan/30" />
                                    {t("labels.terminal_input")} [Bio-Node]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">SEQ_0x{slot.id.toUpperCase()}</span>
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
                                                        {lastCheck.ok ? t("sb1_01.results.valid") : t("sb1_01.results.invalid")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sb1_01.results.valid_desc") : t("sb1_01.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("labels.hint")}:</span>
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
                                                    {t("sb1_01.results.next")}
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
