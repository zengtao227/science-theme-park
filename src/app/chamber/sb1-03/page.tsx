"use client";

import { useEffect, useCallback, useMemo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import CellDivisionVisualization from "@/components/chamber/sb1-03/CellDivisionVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "MITOSIS" | "MEIOSIS_I" | "MEIOSIS_II";

interface SB103Quest extends Quest {
    stage: Stage;
    phase: string;
    chromosomeCount: number;
    [key: string]: any; // Allow additional properties
}

export default function SB103Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB103Quest[] => {
        const quests: SB103Quest[] = [];

        // MITOSIS stage: 5 questions per difficulty
        if (stage === "MITOSIS") {
            const scenarios = {
                BASIC: [
                    { phase: "Prophase", chromatids: 46, answer: "46", desc: "Chromatin condenses" },
                    { phase: "Metaphase", chromatids: 46, answer: "46", desc: "Chromosomes align" },
                    { phase: "Anaphase", chromatids: 92, answer: "92", desc: "Sister chromatids separate" },
                    { phase: "Telophase", chromatids: 46, answer: "46", desc: "Two nuclei form" },
                    { phase: "Cytokinesis", cells: 2, answer: "2", desc: "Cell division completes" }
                ],
                CORE: [
                    { phase: "Interphase", chromatids: 46, answer: "46", desc: "DNA replication" },
                    { phase: "Prophase", spindle: "forming", answer: "forming", desc: "Spindle apparatus" },
                    { phase: "Metaphase", plate: "equator", answer: "equator", desc: "Metaphase plate" },
                    { phase: "Anaphase", movement: "poles", answer: "poles", desc: "Chromatids to poles" },
                    { phase: "Telophase", envelope: "reforms", answer: "reforms", desc: "Nuclear envelope" }
                ],
                ADVANCED: [
                    { phase: "G1_phase", chromatids: 46, answer: "46", desc: "Before DNA replication" },
                    { phase: "S_phase", chromatids: 46, answer: "46", desc: "During DNA replication" },
                    { phase: "G2_phase", chromatids: 92, answer: "92", desc: "After DNA replication" },
                    { phase: "Prometaphase", kinetochore: "attached", answer: "attached", desc: "Kinetochore attachment" },
                    { phase: "Anaphase_A", movement: "kinetochore", answer: "kinetochore", desc: "Kinetochore movement" }
                ],
                ELITE: [
                    { phase: "Checkpoint_G1", protein: "cyclin_D", answer: "cyclin_D", desc: "G1/S checkpoint" },
                    { phase: "Checkpoint_G2", protein: "cyclin_B", answer: "cyclin_B", desc: "G2/M checkpoint" },
                    { phase: "Checkpoint_M", protein: "APC", answer: "APC", desc: "Metaphase checkpoint" },
                    { phase: "Cohesion", protein: "cohesin", answer: "cohesin", desc: "Sister chromatid cohesion" },
                    { phase: "Separation", protein: "separase", answer: "separase", desc: "Cohesin cleavage" }
                ]
            };

            const scenarioList = scenarios[difficulty];
            scenarioList.forEach((item, idx) => {
                const count = (item as any).chromatids || (item as any).cells || 46;
                quests.push({
                    id: `MIT_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    phase: item.phase,
                    chromosomeCount: count,
                    promptLatex: t(`sb1_03.prompts.mit_${item.phase.toLowerCase()}`, { desc: item.desc }),
                    expressionLatex: `\\text{${item.phase.replace(/_/g, ' ')}} \\rightarrow ?`,
                    targetLatex: item.answer,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Answer}", placeholder: "...", expected: item.answer }],
                    correctLatex: item.answer,
                    hintLatex: [t(`sb1_03.prompts.hint_mit_${item.phase.toLowerCase()}`)]
                });
            });
        }

        // MEIOSIS_I stage: 5 questions per difficulty
        if (stage === "MEIOSIS_I") {
            const scenarios = {
                BASIC: [
                    { phase: "Prophase_I", pairs: 23, answer: "23", desc: "Homologous pairing" },
                    { phase: "Metaphase_I", pairs: 23, answer: "23", desc: "Bivalents align" },
                    { phase: "Anaphase_I", chromosomes: 46, answer: "46", desc: "Homologs separate" },
                    { phase: "Telophase_I", chromosomes: 23, answer: "23", desc: "Two haploid cells" },
                    { phase: "Result", cells: 2, answer: "2", desc: "Number of cells" }
                ],
                CORE: [
                    { phase: "Leptotene", synapsis: "beginning", answer: "beginning", desc: "Chromosome condensation" },
                    { phase: "Zygotene", synapsis: "pairing", answer: "pairing", desc: "Synapsis begins" },
                    { phase: "Pachytene", crossing: "occurs", answer: "occurs", desc: "Crossing over" },
                    { phase: "Diplotene", chiasmata: "visible", answer: "visible", desc: "Chiasmata visible" },
                    { phase: "Diakinesis", condensation: "maximum", answer: "maximum", desc: "Maximum condensation" }
                ],
                ADVANCED: [
                    { phase: "Crossing_over", exchange: "genetic", answer: "genetic", desc: "Genetic recombination" },
                    { phase: "Chiasmata", number: "variable", answer: "variable", desc: "Crossover points" },
                    { phase: "Bivalent", structure: "tetrad", answer: "tetrad", desc: "Four chromatids" },
                    { phase: "Reduction", ploidy: "haploid", answer: "haploid", desc: "Chromosome number halves" },
                    { phase: "Genetic_variation", source: "recombination", answer: "recombination", desc: "Variation source" }
                ],
                ELITE: [
                    { phase: "Synaptonemal_complex", protein: "SC", answer: "SC", desc: "Synapsis structure" },
                    { phase: "Recombination_nodules", enzyme: "recombinase", answer: "recombinase", desc: "Crossover enzyme" },
                    { phase: "Cohesion_removal", timing: "anaphase_I", answer: "anaphase_I", desc: "Arm cohesin removal" },
                    { phase: "Centromere_cohesion", timing: "anaphase_II", answer: "anaphase_II", desc: "Centromeric cohesin" },
                    { phase: "Independent_assortment", combinations: "8388608", answer: "8388608", desc: "2^23 combinations" }
                ]
            };

            const scenarioList = scenarios[difficulty];
            scenarioList.forEach((item, idx) => {
                const count = (item as any).pairs || (item as any).chromosomes || (item as any).cells || 23;
                quests.push({
                    id: `MEI1_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    phase: item.phase,
                    chromosomeCount: count,
                    promptLatex: t(`sb1_03.prompts.mei1_${item.phase.toLowerCase()}`, { desc: item.desc }),
                    expressionLatex: `\\text{${item.phase.replace(/_/g, ' ')}} \\rightarrow ?`,
                    targetLatex: item.answer,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Answer}", placeholder: "...", expected: item.answer }],
                    correctLatex: item.answer,
                    hintLatex: [t(`sb1_03.prompts.hint_mei1_${item.phase.toLowerCase()}`)]
                });
            });
        }

        // MEIOSIS_II stage: 5 questions per difficulty
        if (stage === "MEIOSIS_II") {
            const scenarios = {
                BASIC: [
                    { phase: "Prophase_II", chromosomes: 23, answer: "23", desc: "Chromosomes condense" },
                    { phase: "Metaphase_II", chromosomes: 23, answer: "23", desc: "Chromosomes align" },
                    { phase: "Anaphase_II", chromatids: 46, answer: "46", desc: "Sister chromatids separate" },
                    { phase: "Telophase_II", chromosomes: 23, answer: "23", desc: "Four haploid cells" },
                    { phase: "Result", cells: 4, answer: "4", desc: "Total cells produced" }
                ],
                CORE: [
                    { phase: "Interkinesis", replication: "no", answer: "no", desc: "No DNA replication" },
                    { phase: "Spindle_II", orientation: "perpendicular", answer: "perpendicular", desc: "Spindle orientation" },
                    { phase: "Equatorial_plate", alignment: "single", answer: "single", desc: "Single file alignment" },
                    { phase: "Chromatid_separation", mechanism: "cohesin", answer: "cohesin", desc: "Cohesin cleavage" },
                    { phase: "Gamete_formation", type: "haploid", answer: "haploid", desc: "Gamete ploidy" }
                ],
                ADVANCED: [
                    { phase: "Male_meiosis", product: "sperm", answer: "sperm", desc: "Spermatogenesis" },
                    { phase: "Female_meiosis", product: "egg", answer: "egg", desc: "Oogenesis" },
                    { phase: "Polar_bodies", number: "3", answer: "3", desc: "Polar body count" },
                    { phase: "Functional_gametes_male", number: "4", answer: "4", desc: "Functional sperm" },
                    { phase: "Functional_gametes_female", number: "1", answer: "1", desc: "Functional egg" }
                ],
                ELITE: [
                    { phase: "Nondisjunction", result: "aneuploidy", answer: "aneuploidy", desc: "Chromosome error" },
                    { phase: "Trisomy_21", syndrome: "Down", answer: "Down", desc: "Down syndrome" },
                    { phase: "Monosomy_X", syndrome: "Turner", answer: "Turner", desc: "Turner syndrome" },
                    { phase: "XXY", syndrome: "Klinefelter", answer: "Klinefelter", desc: "Klinefelter syndrome" },
                    { phase: "Meiotic_drive", bias: "segregation", answer: "segregation", desc: "Biased segregation" }
                ]
            };

            const scenarioList = scenarios[difficulty];
            scenarioList.forEach((item, idx) => {
                const count = (item as any).chromosomes || (item as any).chromatids || (item as any).cells || (item as any).number || 23;
                quests.push({
                    id: `MEI2_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    phase: item.phase,
                    chromosomeCount: count,
                    promptLatex: t(`sb1_03.prompts.mei2_${item.phase.toLowerCase()}`, { desc: item.desc }),
                    expressionLatex: `\\text{${item.phase.replace(/_/g, ' ')}} \\rightarrow ?`,
                    targetLatex: item.answer,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Answer}", placeholder: "...", expected: item.answer }],
                    correctLatex: item.answer,
                    hintLatex: [t(`sb1_03.prompts.hint_mei2_${item.phase.toLowerCase()}`)]
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
      adaptiveRecommendation,
    } = useQuestManager<SB103Quest, Stage>({
    moduleCode: "sb1-03",
        buildPool,
        initialStage: "MITOSIS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb1-03", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "MITOSIS" as Stage, label: t("sb1_03.stages.mitosis") },
        { id: "MEIOSIS_I" as Stage, label: t("sb1_03.stages.meiosis_i") },
        { id: "MEIOSIS_II" as Stage, label: t("sb1_03.stages.meiosis_ii") },
    ], [t]);

    const hint = getHint();

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      moduleCode="SB1.03"
            title={t("sb1_03.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sb1_03.footer_left")}
            translations={{
                back: t("sb1_03.back"),
                check: t("sb1_03.check"),
                next: t("sb1_03.next"),
                correct: t("sb1_03.correct"),
                incorrect: t("sb1_03.incorrect"),
                ready: t("sb1_03.ready"),
                monitor_title: t("sb1_03.monitor_title"),
                difficulty: {
                    basic: t("sb1_03.difficulty.basic"),
                    core: t("sb1_03.difficulty.core"),
                    advanced: t("sb1_03.difficulty.advanced"),
                    elite: t("sb1_03.difficulty.elite"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <CellDivisionVisualization
                        quest={currentQuest}
                        stage={stage}
                        translations={t("sb1_03")}
                    />
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between font-black">
                            <span>{t("sb1_03.labels.analysis")}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0) ? "bg-neon-emerald shadow-[0_0_5px_#10b981]" : "bg-transparent"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-10 max-w-4xl mx-auto w-full">
                {/* Scenario Description */}
                {currentQuest && (
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                        <h3 className="text-[10px] text-neon-emerald uppercase tracking-[0.5em] font-black italic mb-4">
                            {t("sb1_03.objective_title")}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed font-medium">
                            {t(`sb1_03.scenarios.${stage.toLowerCase()}` as any)}
                        </p>
                    </div>
                )}

                {currentQuest && (
                    <div className="space-y-12">
                        <div className="text-center space-y-6">
                            <h3 className="text-[10px] text-neon-emerald uppercase tracking-[0.5em] font-black italic">
                                {t("sb1_03.labels.phase_analysis")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto drop-shadow-sm">
                                <BlockMath>{currentQuest?.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-emerald-500/[0.03] border-2 border-emerald-500/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("sb1_03.labels.chromosome_count")}
                                </span>
                                <div className="text-3xl text-white font-black">
                                    <InlineMath math={currentQuest?.expressionLatex || ""} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-emerald font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-emerald-500/30" />
                                    {t("sb1_03.labels.analysis")} [Cell-Tracker]
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest?.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-emerald-500/30 font-mono">CELL_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-emerald-500/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500/0 group-focus-within:bg-emerald-500/20 transition-all blur-sm" />
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
                                                    <div className="font-black text-lg tracking-widest uppercase italic leading-none mb-1">
                                                        {lastCheck.ok ? t("sb1_03.results.valid") : t("sb1_03.results.invalid")}
                                                    </div>
                                                    <div className="text-xs font-bold opacity-70">
                                                        {lastCheck.ok ? t("sb1_03.results.valid_desc") : t("sb1_03.results.invalid_desc")}
                                                    </div>
                                                </div>
                                            </div>

                                            {!lastCheck.ok && hint && (
                                                <div className="bg-black/40 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t("sb1_03.labels.hint")}:</span>
                                                    <div className="text-white font-bold text-sm">
                                                        <InlineMath>{hint}</InlineMath>
                                                    </div>
                                                </div>
                                            )}

                                            {lastCheck.ok && (
                                                <button
                                                    onClick={next}
                                                    className="w-full md:w-auto px-10 py-4 bg-white text-black text-[10px] font-black tracking-[0.3em] uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                                >
                                                    {t("sb1_03.results.next")}
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
