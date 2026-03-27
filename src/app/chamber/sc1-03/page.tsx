"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useLanguage } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { renderMixedText, KatexTextWrap } from "@/lib/latex-utils";
import { InlineMath } from "react-katex";
import dynamic from "next/dynamic";
import ChamberLayout from "@/components/layout/ChamberLayout";
import { Difficulty, useQuestManager } from "@/hooks/useQuestManager";
import { buildQuestPrintSections, DEFAULT_PRINT_DIFFICULTIES } from "@/components/print/QuestPrintSections";
import { createSC103FeedbackProvider } from "@/lib/sc1-03/provider";
import type { AtomQuest, Stage } from "@/lib/sc1-03/types";

const OrbitalCanvas = dynamic(() => import("@/components/chamber/sc1-03/OrbitalCanvas"), {
    ssr: false,
});

const elements = [
    { symbol: "H", name: "Hydrogen", z: 1, orbital: "s" },
    { symbol: "He", name: "Helium", z: 2, orbital: "s" },
    { symbol: "Li", name: "Lithium", z: 3, orbital: "s" },
    { symbol: "Be", name: "Beryllium", z: 4, orbital: "s" },
    { symbol: "B", name: "Boron", z: 5, orbital: "p" },
    { symbol: "C", name: "Carbon", z: 6, orbital: "p" },
    { symbol: "N", name: "Nitrogen", z: 7, orbital: "p" },
    { symbol: "O", name: "Oxygen", z: 8, orbital: "p" },
    { symbol: "F", name: "Fluorine", z: 9, orbital: "p" },
    { symbol: "Ne", name: "Neon", z: 10, orbital: "p" },
    { symbol: "Na", name: "Sodium", z: 11, orbital: "s" },
    { symbol: "Mg", name: "Magnesium", z: 12, orbital: "s" },
    { symbol: "Al", name: "Aluminum", z: 13, orbital: "p" },
    { symbol: "Si", name: "Silicon", z: 14, orbital: "p" },
    { symbol: "P", name: "Phosphorus", z: 15, orbital: "p" },
    { symbol: "S", name: "Sulfur", z: 16, orbital: "p" },
    { symbol: "Cl", name: "Chlorine", z: 17, orbital: "p" },
    { symbol: "Ar", name: "Argon", z: 18, orbital: "p" },
    { symbol: "K", name: "Potassium", z: 19, orbital: "s" },
    { symbol: "Ca", name: "Calcium", z: 20, orbital: "s" },
];

export default function SC1_03_AtomsForge() {
    const { t } = useLanguage();
  const feedbackContentProvider = useMemo(() => createSC103FeedbackProvider(t), [t]);
    const { completeStage } = useAppStore();

    const [selectedElement, setSelectedElement] = useState(elements[5]);
    const [orbitalType, setOrbitalType] = useState<"s" | "p" | "d">("p");
    const [showTransition, setShowTransition] = useState(false);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): AtomQuest[] => {
        const bank: Record<Stage, Record<Difficulty, AtomQuest[]>> = {
            build: {
                BASIC: [{
                    id: "B-B-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.build_mass_number"),
                    expressionLatex: "p=8,\\;n=8,\\;A=p+n",
                    targetLatex: "A",
                    slots: [{ id: "A", labelLatex: "A", placeholder: t("sc1_03.placeholders.xx"), expected: 16 }],
                    correctLatex: "A=16",
                }],
                CORE: [{
                    id: "B-C-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.build_charge"),
                    expressionLatex: "p=11,\\;e=10,\\;q=p-e",
                    targetLatex: "q",
                    slots: [{ id: "q", labelLatex: "q", placeholder: t("sc1_03.placeholders.x"), expected: 1 }],
                    correctLatex: "q=+1",
                }],
                ADVANCED: [{
                    id: "B-A-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.build_electrons"),
                    expressionLatex: "Z=17",
                    targetLatex: "e",
                    slots: [{ id: "e", labelLatex: "e", placeholder: t("sc1_03.placeholders.xx"), expected: 17 }],
                    correctLatex: "e=17",
                }],
                ELITE: [{
                    id: "B-E-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.build_neutrons"),
                    expressionLatex: "A=56,\\;Z=26,\\;n=A-Z",
                    targetLatex: "n",
                    slots: [{ id: "n", labelLatex: "n", placeholder: t("sc1_03.placeholders.xx"), expected: 30 }],
                    correctLatex: "n=30",
                }],
            },
            elements: {
                BASIC: [{
                    id: "E-B-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.elements_atomic_number_basic"),
                    expressionLatex: "\\mathrm{C}",
                    targetLatex: "Z",
                    slots: [{ id: "Z", labelLatex: "Z", placeholder: t("sc1_03.placeholders.x"), expected: 6 }],
                    correctLatex: "Z=6",
                }],
                CORE: [{
                    id: "E-C-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.elements_atomic_number_core"),
                    expressionLatex: "\\mathrm{Mg}",
                    targetLatex: "Z",
                    slots: [{ id: "Z", labelLatex: "Z", placeholder: t("sc1_03.placeholders.xx"), expected: 12 }],
                    correctLatex: "Z=12",
                }],
                ADVANCED: [{
                    id: "E-A-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.elements_symbol_from_z"),
                    expressionLatex: "Z=19",
                    targetLatex: "X",
                    slots: [{ id: "sym", labelLatex: "X", placeholder: t("sc1_03.placeholders.k"), expected: "K" }],
                    correctLatex: "X=K",
                }],
                ELITE: [{
                    id: "E-E-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.elements_period"),
                    expressionLatex: "Z=18\\;(Ar)",
                    targetLatex: "P",
                    slots: [{ id: "period", labelLatex: "P", placeholder: t("sc1_03.placeholders.x"), expected: 3 }],
                    correctLatex: "P=3",
                }],
            },
            isotopes: {
                BASIC: [{
                    id: "I-B-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.isotope_neutrons"),
                    expressionLatex: "^{14}_{6}C",
                    targetLatex: "n",
                    slots: [{ id: "n", labelLatex: "n", placeholder: t("sc1_03.placeholders.x"), expected: 8 }],
                    correctLatex: "n=14-6=8",
                }],
                CORE: [{
                    id: "I-C-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.isotope_mass_number"),
                    expressionLatex: "Z=8,\\;n=10",
                    targetLatex: "A",
                    slots: [{ id: "A", labelLatex: "A", placeholder: t("sc1_03.placeholders.xx"), expected: 18 }],
                    correctLatex: "A=18",
                }],
                ADVANCED: [{
                    id: "I-A-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.isotope_delta_neutrons"),
                    expressionLatex: "^{35}_{17}Cl,\\;^{37}_{17}Cl",
                    targetLatex: "\\Delta n",
                    slots: [{ id: "dn", labelLatex: "\\Delta n", placeholder: t("sc1_03.placeholders.x"), expected: 2 }],
                    correctLatex: "\\Delta n=2",
                }],
                ELITE: [{
                    id: "I-E-1", difficulty, stage,
                    promptLatex: t("sc1_03.prompts.isotope_average_mass"),
                    expressionLatex: "^{35}Cl:75\\%,\\;^{37}Cl:25\\%",
                    targetLatex: "A_{avg}",
                    slots: [{ id: "Aavg", labelLatex: "A_{avg}", placeholder: t("sc1_03.placeholders.xx_dot_x"), expected: 35.5 }],
                    correctLatex: "A_{avg}=35\\times0.75+37\\times0.25=35.5",
                }],
            },
        };
        return bank[stage][difficulty] ?? [];
    }, [t]);

    const buildPool = useCallback((difficulty: Difficulty, stage: Stage) => {
        return buildStagePool(difficulty, stage);
    }, [buildStagePool]);

    const {
        currentQuest: quest,
        stage,
        inputs,
        setInputs,
        lastCheck,
        verify,
        next,
        handleStageChange,
        difficulty,
        handleDifficultyChange,
        adaptiveRecommendation,
        aiFeedback,
        isRequestingAi,
        requestAiFeedback,
    feedbackLevel,
    feedbackContent,
    feedbackAvailability,
    showHintLevel,
    showStepsLevel,
    showFullSolution,
    policy,
    } = useQuestManager<AtomQuest, Stage>({
        moduleCode: "sc1-03",
        buildPool,
        initialStage: "build",
    feedbackContentProvider,
        tolerance: 0.02,
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sc1-03", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stages = useMemo(() => [
        { id: "build" as Stage, label: t("sc1_03.stages.build") },
        { id: "elements" as Stage, label: t("sc1_03.stages.elements") },
        { id: "isotopes" as Stage, label: t("sc1_03.stages.isotopes") },
    ], [t]);

    const printSections = useMemo(() => buildQuestPrintSections<AtomQuest, Stage>({
        moduleTitle: t("sc1_03.title"),
        stages,
        difficultyOrder: DEFAULT_PRINT_DIFFICULTIES,
        difficultyLabels: {
            BASIC: t("sc1_03.difficulty.basic"),
            CORE: t("sc1_03.difficulty.core"),
            ADVANCED: t("sc1_03.difficulty.advanced"),
            ELITE: t("sc1_03.difficulty.elite"),
        },
        buildPool,
    }), [buildPool, stages, t]);

    return (
        <ChamberLayout
            adaptiveRecommendation={adaptiveRecommendation}
            aiFeedback={aiFeedback}
            isRequestingAi={isRequestingAi}
            onAiDiagnosisRequested={requestAiFeedback}
            feedbackContent={feedbackContent}
            feedbackLevel={feedbackLevel}
            feedbackAvailability={feedbackAvailability}
            feedbackPolicy={policy}
            onShowHint={showHintLevel}
            onShowSteps={showStepsLevel}
            onShowFull={showFullSolution}
            title={t("sc1_03.title")}
            moduleCode="SC1.03"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stages}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            printSections={printSections}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            translations={{
                back: t("sc1_03.back"),
                difficulty: {
                    basic: t("sc1_03.difficulty.basic"),
                    core: t("sc1_03.difficulty.core"),
                    advanced: t("sc1_03.difficulty.advanced"),
                    elite: t("sc1_03.difficulty.elite"),
                },
                check: t("sc1_03.check"),
                next: t("sc1_03.next"),
                correct: t("sc1_03.correct"),
                incorrect: t("sc1_03.incorrect"),
                monitor_title: t("sc1_03.monitor_title"),
            }}
            monitorContent={
                <OrbitalCanvas
                    element={selectedElement.symbol}
                    atomicNumber={selectedElement.z}
                    orbitalType={orbitalType}
                    showTransition={showTransition}
                />
            }
        >
            <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                        {t("sc1_03_orbitals.labels.selected_element")}
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-6xl text-cyan-400 font-black italic">{selectedElement.symbol}</div>
                        <div>
                            <div className="text-xl text-white font-black">{selectedElement.name}</div>
                            <div className="text-white/40 font-mono">{t("sc1_03.labels.atomic_number")}: {selectedElement.z}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                            {t("sc1_03_orbitals.labels.orbital_type")}
                        </div>
                        <div className="flex gap-2">
                            {["s", "p", "d"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setOrbitalType(type as "s" | "p" | "d")}
                                    aria-label={`${t("sc1_03_orbitals.labels.orbital_type")} ${type.toUpperCase()}`}
                                    className={`w-10 h-10 rounded-lg border-2 font-black transition-all ${orbitalType === type
                                            ? "bg-white text-black border-white"
                                            : "border-white/20 text-white/40 hover:border-white/60"
                                        }`}
                                >
                                    {type.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                        <span className="text-xs text-white/60 font-black tracking-widest uppercase">
                            {t("sc1_03_orbitals.labels.show_transition")}
                        </span>
                        <button
                            onClick={() => setShowTransition(!showTransition)}
                            aria-label={t("sc1_03_orbitals.labels.show_transition")}
                            className={`w-12 h-6 rounded-full transition-all relative ${showTransition ? "bg-cyan-500" : "bg-white/10"}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${showTransition ? "left-7" : "left-1"}`} />
                        </button>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                        {t("sc1_03_orbitals.labels.periodic_table")}
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {elements.map((elem) => (
                            <button
                                key={elem.z}
                                onClick={() => {
                                    setSelectedElement(elem);
                                    if (elem.orbital !== orbitalType) setOrbitalType(elem.orbital as "s" | "p" | "d");
                                }}
                                aria-label={`${t("sc1_03_orbitals.labels.selected_element")} ${elem.name} (${elem.symbol})`}
                                className={`p-2 border rounded-lg flex flex-col items-center transition-all ${selectedElement.z === elem.z
                                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                        : "border-white/10 text-white/40 hover:border-white/30"
                                    }`}
                            >
                                <span className="text-sm font-black">{elem.symbol}</span>
                                <span className="text-[8px] font-mono">{elem.z}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {quest && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black text-center">
                            {t("sc1_03.check")}
                        </div>
                        <div className="text-center text-2xl text-white font-black">{renderMixedText(quest.promptLatex)}</div>
                        <div className="text-center p-3 bg-white/5 border border-white/10 rounded-xl">
                            <KatexTextWrap math={quest.expressionLatex || ""} />
                        </div>
                        {quest.slots.map((slot) => (
                            <div key={slot.id} className="space-y-2">
                                <label className="text-sm text-white/70 font-mono">
                                    <InlineMath math={slot.labelLatex} />
                                </label>
                                <input
                                    value={inputs[slot.id] ?? ""}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, [slot.id]: e.target.value }))}
                                    aria-label={slot.id}
                                    className="w-full bg-black border-2 border-cyan-500/50 p-4 text-center outline-none focus:border-cyan-400 placeholder:text-white/40 font-black text-2xl text-white rounded-lg"
                                    placeholder={slot.placeholder}
                                />
                            </div>
                        ))}
                        {lastCheck?.ok && (
                            <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                                <InlineMath math={quest.correctLatex} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ChamberLayout>
    );
}
