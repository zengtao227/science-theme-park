"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import FunctionalGroupCanvas from "@/components/chamber/sc3-04/FunctionalGroupCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "ALCOHOLS" | "ACIDS" | "ESTERS";

interface SC304Quest extends Quest {
    stage: Stage;
    molecule?: string;
    propA?: string;
    propB?: string;
}

type SC304T = typeof translations.EN.sc3_04;

export default function SC304Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sc3_04 || translations.EN.sc3_04) as SC304T;
    const [selectedMolecule, setSelectedMolecule] = useState<string>("methanol");
    const [showHighlight, setShowHighlight] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SC304Quest[] => {
        const quests: SC304Quest[] = [];

        if (stage === "ALCOHOLS") {
            const molecules = [
                { id: "methanol", name: "Methanol", group: "Hydroxyl", formula: "CH3OH", expected: "hydroxyl" },
                { id: "ethanal", name: "Ethanal", group: "Aldehyde", formula: "CH3CHO", expected: "aldehyde" },
                { id: "propan-1-ol", name: "Propan-1-ol", group: "Hydroxyl", formula: "C3H7OH", expected: "hydroxyl" },
                { id: "methanal", name: "Methanal", group: "Aldehyde", formula: "HCHO", expected: "aldehyde" },
                { id: "ethanol", name: "Ethanol", group: "Hydroxyl", formula: "C2H5OH", expected: "hydroxyl" }
            ];

            molecules.forEach((m, idx) => {
                quests.push({
                    id: `ALC-${idx}`,
                    difficulty,
                    stage,
                    molecule: m.id,
                    promptLatex: `\\text{${t.prompts.identify_group.replace('{molecule}', m.name)}}`,
                    expressionLatex: `\\text{${m.name}} \\rightarrow \\text{?}`,
                    targetLatex: m.expected,
                    slots: [{ id: "ans", labelLatex: "\\text{Group}", placeholder: "...", expected: m.expected.toLowerCase() }],
                    correctLatex: m.expected,
                    hintLatex: [`\\text{Look for the characteristic group in } ${m.formula}`]
                });
            });
        }

        if (stage === "ACIDS") {
            const molecules = [
                { id: "ethanoic_acid", name: "Ethanoic Acid", group: "Carboxyl", formula: "CH3COOH", expected: "carboxyl" },
                { id: "propanone", name: "Propanone", group: "Ketone", formula: "CH3COCH3", expected: "ketone" },
                { id: "methanoic_acid", name: "Methanoic Acid", group: "Carboxyl", formula: "HCOOH", expected: "carboxyl" },
                { id: "butanone", name: "Butanone", group: "Ketone", formula: "C2H5COCH3", expected: "ketone" },
                { id: "propanoic_acid", name: "Propanoic Acid", group: "Carboxyl", formula: "C2H5COOH", expected: "carboxyl" }
            ];

            molecules.forEach((m, idx) => {
                quests.push({
                    id: `ACD-${idx}`,
                    difficulty,
                    stage,
                    molecule: m.id,
                    promptLatex: `\\text{${t.prompts.identify_group.replace('{molecule}', m.name)}}`,
                    expressionLatex: `\\text{${m.name}} \\rightarrow \\text{?}`,
                    targetLatex: m.expected,
                    slots: [{ id: "ans", labelLatex: "\\text{Group}", placeholder: "...", expected: m.expected.toLowerCase() }],
                    correctLatex: m.expected,
                    hintLatex: [`\\text{Characteristic ending: -oic acid or -one}`]
                });
            });
        }

        if (stage === "ESTERS") {
            const comparisons = [
                { a: "Ethanol", b: "Ethanoic Acid", type: "bp", expected: "ethanoic acid", q: t.prompts.predict_bp },
                { a: "Ethanal", b: "Ethanol", type: "bp", expected: "ethanol", q: t.prompts.predict_bp },
                { a: "Methane", b: "Methanol", type: "sol", expected: "methanol", q: t.prompts.solubility_check.replace('{molecule}', 'methanol') },
                { a: "Propanone", b: "Propan-1-ol", type: "bp", expected: "propan-1-ol", q: t.prompts.predict_bp },
                { a: "Methyl Ethanoate", b: "Ethanoic Acid", type: "bp", expected: "ethanoic acid", q: t.prompts.predict_bp }
            ];

            comparisons.forEach((c, idx) => {
                quests.push({
                    id: `EST-${idx}`,
                    difficulty,
                    stage,
                    propA: c.a,
                    propB: c.b,
                    promptLatex: `\\text{${c.q.replace('{a}', c.a).replace('{b}', c.b)}}`,
                    expressionLatex: `\\text{A: } ${c.a} \\text{ vs B: } ${c.b}`,
                    targetLatex: c.expected,
                    slots: [{ id: "ans", labelLatex: "\\text{Result}", placeholder: "...", expected: c.expected.toLowerCase() }],
                    correctLatex: c.expected,
                    hintLatex: [`\\text{Consider hydrogen bonding potential.}`]
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
        pool,
    } = useQuestManager<SC304Quest, Stage>({
        buildPool,
        initialStage: "ALCOHOLS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SC3.04", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "ALCOHOLS", label: t.stages.alcohols },
        { id: "ACIDS", label: t.stages.acids },
        { id: "ESTERS", label: t.stages.esters },
    ], [t]);

    useEffect(() => {
        if (currentQuest?.molecule) {
            setSelectedMolecule(currentQuest.molecule);
        } else if (currentQuest?.propA) {
            setSelectedMolecule(currentQuest.propA.toLowerCase().replace(" ", "_"));
        }
    }, [currentQuest]);

    const hint = getHint();

    return (
        <ChamberLayout
            moduleCode="SC3.04"
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
                        <FunctionalGroupCanvas
                            molecule={selectedMolecule}
                            highlight={showHighlight}
                            stage={stage}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                            <span className="text-[10px] uppercase text-white/60 tracking-widest">{t.labels.group_display}</span>
                            <input
                                type="checkbox"
                                checked={showHighlight}
                                onChange={(e) => setShowHighlight(e.target.checked)}
                                className="w-4 h-4 rounded border-white/20 bg-black text-neon-blue focus:ring-neon-blue/50"
                            />
                        </label>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t.labels.property_stats}</span>
                            <span>{currentStageStats?.correct || 0} / {pool.length}</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0)
                                        ? "bg-neon-blue shadow-[0_0_5px_#00ffff]"
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
                            <h3 className="text-[10px] text-neon-blue uppercase tracking-[0.5em] font-black italic">
                                {t.objective_title}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-blue/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-blue/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    MOLECULAR SYSTEM
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-blue/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-blue font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-blue/30" />
                                    TERMINAL INPUT
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-blue/30 font-mono">ID: {slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-blue/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-blue/0 group-focus-within:bg-neon-blue/20 transition-all blur-sm" />
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
