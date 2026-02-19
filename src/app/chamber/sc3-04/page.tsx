"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
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

export default function SC304Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [selectedMolecule, setSelectedMolecule] = useState<string>("methanol");
    const [showHighlight, setShowHighlight] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SC304Quest[] => {
        const quests: SC304Quest[] = [];

        if (stage === "ALCOHOLS") {
            const molecules = [
                // BASIC (5 questions)
                { id: "methanol", name: "Methanol", group: "Hydroxyl", formula: "CH3OH", expected: "hydroxyl" },
                { id: "ethanol", name: "Ethanol", group: "Hydroxyl", formula: "C2H5OH", expected: "hydroxyl" },
                { id: "propan-1-ol", name: "Propan-1-ol", group: "Hydroxyl", formula: "C3H7OH", expected: "hydroxyl" },
                { id: "butan-1-ol", name: "Butan-1-ol", group: "Hydroxyl", formula: "C4H9OH", expected: "hydroxyl" },
                { id: "propan-2-ol", name: "Propan-2-ol", group: "Hydroxyl", formula: "C3H7OH", expected: "hydroxyl" },
                // CORE (5 questions)
                { id: "pentan-1-ol", name: "Pentan-1-ol", group: "Hydroxyl", formula: "C5H11OH", expected: "hydroxyl" },
                { id: "hexan-1-ol", name: "Hexan-1-ol", group: "Hydroxyl", formula: "C6H13OH", expected: "hydroxyl" },
                { id: "butan-2-ol", name: "Butan-2-ol", group: "Hydroxyl", formula: "C4H9OH", expected: "hydroxyl" },
                { id: "2-methylpropan-1-ol", name: "2-Methylpropan-1-ol", group: "Hydroxyl", formula: "C4H9OH", expected: "hydroxyl" },
                { id: "2-methylpropan-2-ol", name: "2-Methylpropan-2-ol", group: "Hydroxyl", formula: "C4H9OH", expected: "hydroxyl" },
                // ADVANCED (5 questions)
                { id: "heptan-1-ol", name: "Heptan-1-ol", group: "Hydroxyl", formula: "C7H15OH", expected: "hydroxyl" },
                { id: "octan-1-ol", name: "Octan-1-ol", group: "Hydroxyl", formula: "C8H17OH", expected: "hydroxyl" },
                { id: "pentan-2-ol", name: "Pentan-2-ol", group: "Hydroxyl", formula: "C5H11OH", expected: "hydroxyl" },
                { id: "3-methylbutan-1-ol", name: "3-Methylbutan-1-ol", group: "Hydroxyl", formula: "C5H11OH", expected: "hydroxyl" },
                { id: "2-methylbutan-2-ol", name: "2-Methylbutan-2-ol", group: "Hydroxyl", formula: "C5H11OH", expected: "hydroxyl" },
                // ELITE (5 questions)
                { id: "nonan-1-ol", name: "Nonan-1-ol", group: "Hydroxyl", formula: "C9H19OH", expected: "hydroxyl" },
                { id: "decan-1-ol", name: "Decan-1-ol", group: "Hydroxyl", formula: "C10H21OH", expected: "hydroxyl" },
                { id: "hexan-3-ol", name: "Hexan-3-ol", group: "Hydroxyl", formula: "C6H13OH", expected: "hydroxyl" },
                { id: "2,2-dimethylpropan-1-ol", name: "2,2-Dimethylpropan-1-ol", group: "Hydroxyl", formula: "C5H11OH", expected: "hydroxyl" },
                { id: "3-methylpentan-2-ol", name: "3-Methylpentan-2-ol", group: "Hydroxyl", formula: "C6H13OH", expected: "hydroxyl" },
            ];

            const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
            const activeList = molecules.slice(startIdx, startIdx + 5);

            activeList.forEach((m, idx) => {
                quests.push({
                    id: `ALC-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    molecule: m.id,
                    promptLatex: `\\text{${t("sc3_04.prompts.identify_group", { molecule: m.name })}}`,
                    expressionLatex: `\\\\text{${m.name}} \\rightarrow \\\\text{?}`,
                    targetLatex: m.expected,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Group}", placeholder: "...", expected: m.expected.toLowerCase() }],
                    correctLatex: m.expected,
                    hintLatex: [`\\\\text{Look for the characteristic group in } ${m.formula}`]
                });
            });
        }

        if (stage === "ACIDS") {
            const molecules = [
                // BASIC (5 questions)
                { id: "methanoic_acid", name: "Methanoic Acid", group: "Carboxyl", formula: "HCOOH", expected: "carboxyl" },
                { id: "ethanoic_acid", name: "Ethanoic Acid", group: "Carboxyl", formula: "CH3COOH", expected: "carboxyl" },
                { id: "propanoic_acid", name: "Propanoic Acid", group: "Carboxyl", formula: "C2H5COOH", expected: "carboxyl" },
                { id: "butanoic_acid", name: "Butanoic Acid", group: "Carboxyl", formula: "C3H7COOH", expected: "carboxyl" },
                { id: "methanal", name: "Methanal", group: "Aldehyde", formula: "HCHO", expected: "aldehyde" },
                // CORE (5 questions)
                { id: "pentanoic_acid", name: "Pentanoic Acid", group: "Carboxyl", formula: "C4H9COOH", expected: "carboxyl" },
                { id: "hexanoic_acid", name: "Hexanoic Acid", group: "Carboxyl", formula: "C5H11COOH", expected: "carboxyl" },
                { id: "ethanal", name: "Ethanal", group: "Aldehyde", formula: "CH3CHO", expected: "aldehyde" },
                { id: "propanal", name: "Propanal", group: "Aldehyde", formula: "C2H5CHO", expected: "aldehyde" },
                { id: "propanone", name: "Propanone", group: "Ketone", formula: "CH3COCH3", expected: "ketone" },
                // ADVANCED (5 questions)
                { id: "heptanoic_acid", name: "Heptanoic Acid", group: "Carboxyl", formula: "C6H13COOH", expected: "carboxyl" },
                { id: "octanoic_acid", name: "Octanoic Acid", group: "Carboxyl", formula: "C7H15COOH", expected: "carboxyl" },
                { id: "butanal", name: "Butanal", group: "Aldehyde", formula: "C3H7CHO", expected: "aldehyde" },
                { id: "butanone", name: "Butanone", group: "Ketone", formula: "C2H5COCH3", expected: "ketone" },
                { id: "pentanone", name: "Pentanone", group: "Ketone", formula: "C3H7COCH3", expected: "ketone" },
                // ELITE (5 questions)
                { id: "nonanoic_acid", name: "Nonanoic Acid", group: "Carboxyl", formula: "C8H17COOH", expected: "carboxyl" },
                { id: "decanoic_acid", name: "Decanoic Acid", group: "Carboxyl", formula: "C9H19COOH", expected: "carboxyl" },
                { id: "pentanal", name: "Pentanal", group: "Aldehyde", formula: "C4H9CHO", expected: "aldehyde" },
                { id: "hexanone", name: "Hexanone", group: "Ketone", formula: "C4H9COCH3", expected: "ketone" },
                { id: "heptanone", name: "Heptanone", group: "Ketone", formula: "C5H11COCH3", expected: "ketone" },
            ];

            const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
            const activeList = molecules.slice(startIdx, startIdx + 5);

            activeList.forEach((m, idx) => {
                quests.push({
                    id: `ACD-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    molecule: m.id,
                    promptLatex: `\\text{${t("sc3_04.prompts.identify_group", { molecule: m.name })}}`,
                    expressionLatex: `\\\\text{${m.name}} \\rightarrow \\\\text{?}`,
                    targetLatex: m.expected,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Group}", placeholder: "...", expected: m.expected.toLowerCase() }],
                    correctLatex: m.expected,
                    hintLatex: [`\\\\text{Characteristic ending: -oic acid, -al, or -one}`]
                });
            });
        }

        if (stage === "ESTERS") {
            const comparisons = [
                // BASIC (5 questions)
                { a: "Methanol", b: "Methanoic Acid", type: "bp", expected: "methanoic acid", q: t("sc3_04.prompts.predict_bp") },
                { a: "Ethanol", b: "Ethanoic Acid", type: "bp", expected: "ethanoic acid", q: t("sc3_04.prompts.predict_bp") },
                { a: "Ethanal", b: "Ethanol", type: "bp", expected: "ethanol", q: t("sc3_04.prompts.predict_bp") },
                { a: "Methane", b: "Methanol", type: "sol", expected: "methanol", q: t("sc3_04.prompts.solubility_check", { molecule: 'methanol' }) },
                { a: "Propanone", b: "Propan-1-ol", type: "bp", expected: "propan-1-ol", q: t("sc3_04.prompts.predict_bp") },
                // CORE (5 questions)
                { a: "Propanol", b: "Propanoic Acid", type: "bp", expected: "propanoic acid", q: t("sc3_04.prompts.predict_bp") },
                { a: "Butanol", b: "Butanoic Acid", type: "bp", expected: "butanoic acid", q: t("sc3_04.prompts.predict_bp") },
                { a: "Propanal", b: "Propanol", type: "bp", expected: "propanol", q: t("sc3_04.prompts.predict_bp") },
                { a: "Ethane", b: "Ethanol", type: "sol", expected: "ethanol", q: t("sc3_04.prompts.solubility_check", { molecule: 'ethanol' }) },
                { a: "Butanone", b: "Butan-1-ol", type: "bp", expected: "butan-1-ol", q: t("sc3_04.prompts.predict_bp") },
                // ADVANCED (5 questions)
                { a: "Pentanol", b: "Pentanoic Acid", type: "bp", expected: "pentanoic acid", q: t("sc3_04.prompts.predict_bp") },
                { a: "Hexanol", b: "Hexanoic Acid", type: "bp", expected: "hexanoic acid", q: t("sc3_04.prompts.predict_bp") },
                { a: "Butanal", b: "Butanol", type: "bp", expected: "butanol", q: t("sc3_04.prompts.predict_bp") },
                { a: "Propane", b: "Propanol", type: "sol", expected: "propanol", q: t("sc3_04.prompts.solubility_check", { molecule: 'propanol' }) },
                { a: "Pentanone", b: "Pentan-1-ol", type: "bp", expected: "pentan-1-ol", q: t("sc3_04.prompts.predict_bp") },
                // ELITE (5 questions)
                { a: "Heptanol", b: "Heptanoic Acid", type: "bp", expected: "heptanoic acid", q: t("sc3_04.prompts.predict_bp") },
                { a: "Octanol", b: "Octanoic Acid", type: "bp", expected: "octanoic acid", q: t("sc3_04.prompts.predict_bp") },
                { a: "Pentanal", b: "Pentanol", type: "bp", expected: "pentanol", q: t("sc3_04.prompts.predict_bp") },
                { a: "Butane", b: "Butanol", type: "sol", expected: "butanol", q: t("sc3_04.prompts.solubility_check", { molecule: 'butanol' }) },
                { a: "Hexanone", b: "Hexan-1-ol", type: "bp", expected: "hexan-1-ol", q: t("sc3_04.prompts.predict_bp") },
            ];

            const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
            const activeList = comparisons.slice(startIdx, startIdx + 5);

            activeList.forEach((c, idx) => {
                quests.push({
                    id: `EST-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    propA: c.a,
                    propB: c.b,
                    promptLatex: `\\text{${c.q.replace('{a}', c.a).replace('{b}', c.b)}}`,
                    expressionLatex: `\\\\text{A: } ${c.a} \\\\text{ vs B: } ${c.b}`,
                    targetLatex: c.expected,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Result}", placeholder: "...", expected: c.expected.toLowerCase() }],
                    correctLatex: c.expected,
                    hintLatex: [`\\\\text{Consider hydrogen bonding potential.}`]
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
        { id: "ALCOHOLS", label: t("sc3_04.stages.alcohols") },
        { id: "ACIDS", label: t("sc3_04.stages.acids") },
        { id: "ESTERS", label: t("sc3_04.stages.esters") },
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
            title={t("sc3_04.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sc3_04.footer_left")}
            translations={{
                back: t("sc3_04.back"),
                check: t("sc3_04.check"),
                next: t("sc3_04.next"),
                correct: t("sc3_04.correct"),
                incorrect: t("sc3_04.incorrect"),
                ready: t("sc3_04.ready"),
                monitor_title: t("sc3_04.monitor_title"),
                difficulty: {
                    basic: t("sc3_04.difficulty.basic"),
                    core: t("sc3_04.difficulty.core"),
                    advanced: t("sc3_04.difficulty.advanced"),
                    elite: t("sc3_04.difficulty.elite"),
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
                            <span className="text-[10px] uppercase text-white/60 tracking-widest">{t("sc3_04.labels.group_display")}</span>
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
                            <span>{t("sc3_04.labels.property_stats")}</span>
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
                                {t("sc3_04.objective_title")}
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
                                                        {lastCheck.ok ? t("sc3_04.correct") : t("sc3_04.incorrect")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sc3_04.feedback.correct") : t("sc3_04.feedback.incorrect")}
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
                                                    {t("sc3_04.next")}
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
