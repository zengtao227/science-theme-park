"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage, TranslationKeys } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import EvolutionCanvas from "@/components/chamber/gb1-01/EvolutionCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "NATURAL_SELECTION" | "SPECIATION" | "EVIDENCE";

interface GB101Quest extends Quest {
    stage: Stage;
    scenario?: string;
}

function buildStagePool(getT: any, tObj: TranslationKeys['gb1_01'], difficulty: Difficulty, stage: Stage): GB101Quest[] {
    const t = getT;
    const quests: GB101Quest[] = [];
    let idCounter = 0;

    const create = (pIdx: string, promptArgs: any, expr: string, target: string, ans: string, hint: string[], scen?: string) => {
        return {
            id: `gb1-01-${stage}-${difficulty}-${idCounter++}`,
            difficulty,
            stage,
            scenario: scen || "galapagos_study",
            promptLatex: t(`gb1_01.prompts.${pIdx}`, promptArgs),
            expressionLatex: expr,
            targetLatex: target,
            slots: [{ id: "ans", labelLatex: target, placeholder: "?", expected: parseFloat(ans) }],
            correctLatex: ans,
            hintLatex: hint
        } as GB101Quest;
    };

    if (stage === "NATURAL_SELECTION") {
        if (difficulty === "BASIC") {
            quests.push(
                create("fitness_calc", { init: 100, surv: 80 }, "w = 80/100", "w", "0.8", ["Survivors/Init"]),
                create("fitness_calc", { init: 50, surv: 25 }, "w = 25/50", "w", "0.5", ["Half"]),
                create("fitness_calc", { init: 200, surv: 150 }, "w = 150/200", "w", "0.75", ["Ratio"]),
                create("fitness_calc", { init: 10, surv: 9 }, "w = 9/10", "w", "0.9", ["0.9"]),
                create("fitness_calc", { init: 1000, surv: 100 }, "w = 100/1000", "w", "0.1", ["0.1"])
            );
        } else if (difficulty === "CORE") {
            // Selection coefficient s = 1 - w
            quests.push(
                create("fitness_calc", { init: 100, surv: 90 }, "s = 1 - 0.9", "s", "0.1", ["s = 1-w"]),
                create("fitness_calc", { init: 100, surv: 50 }, "s = 1 - 0.5", "s", "0.5", ["s = 1-w"]),
                { ...create("fitness_calc", { init: 100, surv: 100 }, "w=1, s=0", "s", "0", ["No selection"]), promptLatex: "Init 100, Surv 100. Selection coeff s?" },
                { ...create("fitness_calc", { init: 100, surv: 80 }, "w=0.8, s=0.2", "s", "0.2", ["s = 1-w"]), promptLatex: "Init 100, Surv 80. Find s." },
                { ...create("fitness_calc", { init: 20, surv: 10 }, "w=0.5, s=0.5", "s", "0.5", ["s = 1-w"]), promptLatex: "Init 20, Surv 10. Find s." }
            );
        } else if (difficulty === "ADVANCED") {
            // Hardy Weinberg p+q=1, p^2+2pq+q^2=1
            quests.push(
                create("hardy_p", { p: 0.5 }, "2(0.5)(0.5)", "2pq", "0.5", ["2pq"]),
                create("hardy_p", { p: 0.3 }, "2(0.3)(0.7)", "2pq", "0.42", ["q=0.7"]),
                create("hardy_p", { p: 0.1 }, "2(0.1)(0.9)", "2pq", "0.18", ["q=0.9"]),
                create("hardy_q", { q2: 0.04 }, "q = \\sqrt{0.04}", "q", "0.2", ["Sqrt"]),
                create("hardy_q", { q2: 0.16 }, "q = \\sqrt{0.16}", "q", "0.4", ["Sqrt"])
            );
        } else { // ELITE
            // Delta p = spq / (1-sq^2) approx spq
            quests.push(
                { id: `NS-E1`, difficulty, stage, promptLatex: "Selection s=0.1 against recessive. p=0.5, q=0.5. Delta p approx spq^2?", expressionLatex: "0.1(0.5)(0.25)", targetLatex: "\\Delta p", slots: [{ id: "d", labelLatex: "dp", placeholder: "0.0125", expected: 0.0125 }], correctLatex: "0.0125", hintLatex: ["s p q^2"] },
                create("hardy_p", { p: 0.99 }, "2(0.99)(0.01)", "2pq", "0.0198", ["Rare alleles"]),
                { id: `NS-E3`, difficulty, stage, promptLatex: "Fitness wAA=1, wAa=1, waa=0.5. q=0.1. Mean fitness W = 1 - s q^2?", expressionLatex: "1 - 0.5(0.01)", targetLatex: "W", slots: [{ id: "w", labelLatex: "W", placeholder: "0.995", expected: 0.995 }], correctLatex: "0.995", hintLatex: ["Mean fitness"] },
                { id: `NS-E4`, difficulty, stage, promptLatex: "Heterozygote Advantage. wAA=0.8, wAa=1, waa=0.5. Equilibrium q?", expressionLatex: "q = s1/(s1+s2) = 0.2/(0.2+0.5)", targetLatex: "q", slots: [{ id: "q", labelLatex: "q", placeholder: "0.286", expected: 0.286 }], correctLatex: "0.286", hintLatex: ["Balanced poly"] },
                { id: `NS-E5`, difficulty, stage, promptLatex: "Mutation-Selection Balance. u=1e-5, s=0.1. q = sqrt(u/s)?", expressionLatex: "\\\\\sqrt{10^{-4}}", targetLatex: "q", slots: [{ id: "q", labelLatex: "q", placeholder: "0.01", expected: 0.01 }], correctLatex: "0.01", hintLatex: ["Equilibrium"] }
            );
        }
    }

    if (stage === "SPECIATION") {
        if (difficulty === "BASIC") {
            quests.push(
                create("mutation_div", { D: 0, u: 1e-3 }, "t \\times 10^{-3}", "D", "0.1", ["Assume 100 gen"], "genetic_drift"), // Placeholder fix logic below
                { id: `SP-B1`, difficulty, stage, promptLatex: "Gen 100, rate 0.001. Divergence?", expressionLatex: "100 \\times 0.001", targetLatex: "D", slots: [{ id: "d", labelLatex: "D", placeholder: "0.1", expected: 0.1 }], correctLatex: "0.1", hintLatex: ["Mult"] },
                { id: `SP-B2`, difficulty, stage, promptLatex: "Gen 500, rate 0.002. Div?", expressionLatex: "500 \\times 0.002", targetLatex: "D", slots: [{ id: "d", labelLatex: "D", placeholder: "1", expected: 1 }], correctLatex: "1", hintLatex: ["Mult"] },
                { id: `SP-B3`, difficulty, stage, promptLatex: "Gen 1000, rate 1e-4. Div?", expressionLatex: "0.1", targetLatex: "D", slots: [{ id: "d", labelLatex: "D", placeholder: "0.1", expected: 0.1 }], correctLatex: "0.1", hintLatex: ["Mult"] },
                { id: `SP-B4`, difficulty, stage, promptLatex: "Divergence 0.2, Gen 100. Rate?", expressionLatex: "0.2/100", targetLatex: "u", slots: [{ id: "u", labelLatex: "u", placeholder: "0.002", expected: 0.002 }], correctLatex: "0.002", hintLatex: ["Div speed"] },
                { id: `SP-B5`, difficulty, stage, promptLatex: "Rate 0.01. Gen to reach D=1?", expressionLatex: "1/0.01", targetLatex: "t", slots: [{ id: "t", labelLatex: "t", placeholder: "100", expected: 100 }], correctLatex: "100", hintLatex: ["Inverse"] }
            );
        } else if (difficulty === "CORE") {
            quests.push(
                create("drift_time", { N: 100 }, "4 \\times 100", "t", "400", ["4N"]),
                create("drift_time", { N: 50 }, "4 \\times 50", "t", "200", ["4N"]),
                create("drift_time", { N: 1000 }, "4000", "t", "4000", ["4N"]),
                { id: `SP-C4`, difficulty, stage, promptLatex: "Drift: Fixation Prob of new mutation. N=100. P=1/2N. Find P.", expressionLatex: "1/200", targetLatex: "P", slots: [{ id: "p", labelLatex: "P", placeholder: "0.005", expected: 0.005 }], correctLatex: "0.005", hintLatex: ["1/2N"] },
                { id: `SP-C5`, difficulty, stage, promptLatex: "N=500. Fixation Prob?", expressionLatex: "1/1000", targetLatex: "P", slots: [{ id: "p", labelLatex: "P", placeholder: "0.001", expected: 0.001 }], correctLatex: "0.001", hintLatex: ["1/2N"] }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                create("common_ancestor", { n: 10, r: 1 }, "10/2", "T", "5", ["2 branches"]),
                create("common_ancestor", { n: 20, r: 0.5 }, "20/(2 \\times 0.5)", "T", "20", ["2uT=D"]),
                create("common_ancestor", { n: 5, r: 0.1 }, "5/0.2", "T", "25", ["2uT"]),
                { id: `SP-A4`, difficulty, stage, promptLatex: "Bottleneck. N reduces to 10. Heterozygosity loss H_new = (1 - 1/2N) H_old. Factor?", expressionLatex: "1 - 1/20", targetLatex: "F", slots: [{ id: "f", labelLatex: "F", placeholder: "0.95", expected: 0.95 }], correctLatex: "0.95", hintLatex: ["1 - 1/2N"] },
                { id: `SP-A5`, difficulty, stage, promptLatex: "Effective Pop Size. Nm=100, Nf=100. Ne = 4NmNf/(Nm+Nf)?", expressionLatex: "40000/200", targetLatex: "Ne", slots: [{ id: "n", labelLatex: "Ne", placeholder: "200", expected: 200 }], correctLatex: "200", hintLatex: ["Equal sex"] }
            );
        } else { // ELITE
            quests.push(
                { id: `SP-E1`, difficulty, stage, promptLatex: "Drift vs Selection. s=0.01, N=10. Ns=0.1 < 1. Drift dominates?", expressionLatex: "\\\\text{Yes}", targetLatex: "Y/N", slots: [{ id: "a", labelLatex: "Y/N", placeholder: "yes", expected: "yes" }], correctLatex: "Yes", hintLatex: ["Ns<1"] },
                { id: `SP-E2`, difficulty, stage, promptLatex: "Founder Effect. k individuals. Allele lost prob (1-p)^2k. p=0.5, k=1. Prob?", expressionLatex: "0.5^2", targetLatex: "P", slots: [{ id: "p", labelLatex: "P", placeholder: "0.25", expected: 0.25 }], correctLatex: "0.25", hintLatex: ["Sample"] },
                { id: `SP-E3`, difficulty, stage, promptLatex: "Fst Index. Ht=0.5, Hs=0.4. Fst = (Ht-Hs)/Ht?", expressionLatex: "0.1/0.5", targetLatex: "Fst", slots: [{ id: "f", labelLatex: "F", placeholder: "0.2", expected: 0.2 }], correctLatex: "0.2", hintLatex: ["Structure"] },
                { id: `SP-E4`, difficulty, stage, promptLatex: "Coalescence Time. k lineages. Expectation 4N / k(k-1). k=2?", expressionLatex: "4N/2 = 2N", targetLatex: "\\\\text{Coef}", slots: [{ id: "c", labelLatex: "C", placeholder: "2", expected: 2 }], correctLatex: "2N", hintLatex: ["Pairwise"] },
                { id: `SP-E5`, difficulty, stage, promptLatex: "Neutral Theory. Rate of substitution = Mutation rate u?", expressionLatex: "\\\\text{Equal}", targetLatex: "Eq", slots: [{ id: "e", labelLatex: "Eq", placeholder: "yes", expected: "yes" }], correctLatex: "Yes", hintLatex: ["k = u"] }
            );
        }
    }

    if (stage === "EVIDENCE") {
        if (difficulty === "BASIC") {
            quests.push(
                create("decay_age", { f: 0.5, h: 5730 }, "1 \\times 5730", "A", "5730", ["1 Half life"]),
                create("decay_age", { f: 0.25, h: 5730 }, "2 \\times 5730", "A", "11460", ["2 Half lives"]),
                create("decay_age", { f: 0.125, h: 5730 }, "3 \\times 5730", "A", "17190", ["3 Half lives"]),
                create("decay_age", { f: 0.5, h: 100 }, "100", "A", "100", ["1 Half life"]),
                create("decay_age", { f: 0.25, h: 1000 }, "2000", "A", "2000", ["2 Half lives"])
            );
        } else if (difficulty === "CORE") {
            quests.push(
                { id: `EV-C1`, difficulty, stage, promptLatex: "Uranium-238 Lead-206. Half life 4.5B. Ratio 1:1. Age (B years)?", expressionLatex: "4.5", targetLatex: "A", slots: [{ id: "a", labelLatex: "A", placeholder: "4.5", expected: 4.5 }], correctLatex: "4.5 B", hintLatex: ["1 HL"] },
                { id: `EV-C2`, difficulty, stage, promptLatex: "Ratio 1:3 (Parent:Daughter). 25% Parent. Age in HL?", expressionLatex: "2", targetLatex: "N", slots: [{ id: "n", labelLatex: "N", placeholder: "2", expected: 2 }], correctLatex: "2", hintLatex: ["1->1/2->1/4"] },
                { id: `EV-C3`, difficulty, stage, promptLatex: "K-Ar dating. HL=1.25B. 12.5% K remaining. Age?", expressionLatex: "3 \\times 1.25", targetLatex: "A", slots: [{ id: "a", labelLatex: "A", placeholder: "3.75", expected: 3.75 }], correctLatex: "3.75 B", hintLatex: ["3 HL"] },
                { id: `EV-C4`, difficulty, stage, promptLatex: "C-14. 50% left. 5730y. 1HL.", expressionLatex: "5730", targetLatex: "A", slots: [{ id: "a", labelLatex: "A", placeholder: "5730", expected: 5730 }], correctLatex: "5730", hintLatex: ["Def"] },
                { id: `EV-C5`, difficulty, stage, promptLatex: "C-14. 6.25% left. HLs?", expressionLatex: "4", targetLatex: "N", slots: [{ id: "n", labelLatex: "N", placeholder: "4", expected: 4 }], correctLatex: "4", hintLatex: ["1/16"] }
            );
        } else if (difficulty === "ADVANCED") {
            quests.push(
                { id: `EV-A1`, difficulty, stage, promptLatex: "Decay Constant lambda = 0.693 / T. T=6930. Lambda?", expressionLatex: "10^{-4}", targetLatex: "L", slots: [{ id: "l", labelLatex: "L", placeholder: "0.0001", expected: 0.0001 }], correctLatex: "0.0001", hintLatex: ["Div"] },
                { id: `EV-A2`, difficulty, stage, promptLatex: "N(t) = N0 e^{-Lt}. t=1/L. Fraction?", expressionLatex: "e^{-1}", targetLatex: "F", slots: [{ id: "f", labelLatex: "F", placeholder: "0.368", expected: 0.368 }], correctLatex: "0.368", hintLatex: ["1/e"] },
                { id: `EV-A3`, difficulty, stage, promptLatex: "Log decay. 30% remains. HL=100. Age? -100 * log2(0.3).", expressionLatex: "173", targetLatex: "A", slots: [{ id: "a", labelLatex: "A", placeholder: "173", expected: 173 }], correctLatex: "173", hintLatex: ["Calc"] },
                { id: `EV-A4`, difficulty, stage, promptLatex: "Isochron dating. Slope m = e^{Lt} - 1. m=1. Lt?", expressionLatex: "\\ln 2", targetLatex: "Lt", slots: [{ id: "l", labelLatex: "X", placeholder: "0.693", expected: 0.693 }], correctLatex: "0.693", hintLatex: ["Ln 2"] },
                { id: `EV-A5`, difficulty, stage, promptLatex: "Carbon reservoir fluctuation. Correction factor 10%. Age 1000 -> ?", expressionLatex: "1100", targetLatex: "A", slots: [{ id: "a", labelLatex: "A", placeholder: "1100", expected: 1100 }], correctLatex: "~1100", hintLatex: ["Corrected"] }
            );
        } else { // ELITE
            quests.push(
                { id: `EV-E1`, difficulty, stage, promptLatex: "Molecular Phylogeny. Jukes-CantorDist K = -0.75 ln(1 - 4/3 p). p=0.25. K?", expressionLatex: "0.3", targetLatex: "K", slots: [{ id: "k", labelLatex: "K", placeholder: "0.3", expected: 0.3 }], correctLatex: "~0.3", hintLatex: ["Formula"] },
                { id: `EV-E2`, difficulty, stage, promptLatex: "Kimura 2-Parameter. Transition/Transversion ratio R. R=2. Bias?", expressionLatex: "2", targetLatex: "R", slots: [{ id: "r", labelLatex: "R", placeholder: "2", expected: 2 }], correctLatex: "2", hintLatex: ["Def"] },
                { id: `EV-E3`, difficulty, stage, promptLatex: "Synonymous vs Nonsynonymous rates (dS, dN). dN/dS > 1. Selection?", expressionLatex: "\\\\text{Positive}", targetLatex: "Type", slots: [{ id: "t", labelLatex: "Pos/Neg", placeholder: "positive", expected: "positive" }], correctLatex: "Positive", hintLatex: ["Adaptive"] },
                { id: `EV-E4`, difficulty, stage, promptLatex: "Tree parsimony. Min changes 10 vs 12. P(10) > P(12)?", expressionLatex: "Yes", targetLatex: "Y/N", slots: [{ id: "y", labelLatex: "Y/N", placeholder: "yes", expected: "yes" }], correctLatex: "Yes", hintLatex: ["Occam"] },
                { id: `EV-E5`, difficulty, stage, promptLatex: "Bootstrap support. 95/100 trees. Confidence?", expressionLatex: "95\\%", targetLatex: "C", slots: [{ id: "c", labelLatex: "C", placeholder: "95", expected: 95 }], correctLatex: "95%", hintLatex: ["Percentage"] }
            );
        }
    }

    return quests;
}

export default function GB101Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const { t: getT } = useLanguage();
    const t = getT("gb1_01");

    const [generation, setGeneration] = useState(0);
    const [selectionPressure, setSelectionPressure] = useState(0.5);

    const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(getT, t, d, s), [getT, t]);

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
    } = useQuestManager<GB101Quest, Stage>({
    moduleCode: "gb1-01",
        buildPool,
        initialStage: "NATURAL_SELECTION",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("GB1.01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "NATURAL_SELECTION" as Stage, label: t.stages.natural_selection },
        { id: "SPECIATION" as Stage, label: t.stages.speciation },
        { id: "EVIDENCE" as Stage, label: t.stages.evidence },
    ], [t.stages]);

    const hint = getHint();

    const activeScenario = useMemo(() => {
        if (currentQuest?.scenario && t.scenarios[currentQuest?.scenario as keyof typeof t.scenarios]) {
            return t.scenarios[currentQuest?.scenario as keyof typeof t.scenarios];
        }
        const keys = Object.keys(t.scenarios);
        return t.scenarios[keys[0] as keyof typeof t.scenarios];
    }, [t, currentQuest]);

    if (!t || !t.stages) return null;

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      moduleCode="GB1.01"
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
                difficulty: t.difficulty,
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <EvolutionCanvas
                            stage={stage}
                            generation={generation}
                            selectionPressure={selectionPressure}
                            translations={t}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.generation}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={generation}
                                    onChange={(e) => setGeneration(Number(e.target.value))}
                                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-cyan"
                                />
                                <span className="text-[10px] font-mono text-white/60 w-16 text-right">Gen {generation}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t.labels.selection_pressure}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={selectionPressure}
                                    onChange={(e) => setSelectionPressure(Number(e.target.value))}
                                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-amber"
                                />
                                <span className="text-[10px] font-mono text-white/60 w-16 text-right">{(selectionPressure * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t.labels.evolution_score}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0)
                                        ? "bg-neon-cyan shadow-[0_0_5px_cyan]"
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
                            <h3 className="text-[10px] text-neon-cyan uppercase tracking-[0.5em] font-black italic">
                                {t.objective_title}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest?.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-cyan/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t.labels.evolution_display}
                                </span>
                                <div className="text-4xl text-white font-black overflow-x-auto">
                                    <BlockMath math={currentQuest?.expressionLatex || ""} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-cyan font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-cyan/30" />
                                    {t.labels.input_terminal}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest?.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-cyan/30 font-mono">EVO_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-cyan/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner"
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
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0, 255, 255, 0.2)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={lastCheck?.ok ? next : verify}
                                    className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-xl ${lastCheck?.ok
                                        ? "bg-neon-cyan text-black"
                                        : "bg-white/10 text-white hover:bg-white/20 border-2 border-white/5"
                                        }`}
                                >
                                    {lastCheck?.ok ? t.next : t.check}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                )}

                {activeScenario && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-neon-cyan/[0.02] border border-neon-cyan/10 rounded-3xl p-8 backdrop-blur-sm shadow-[0_0_50px_rgba(0,255,255,0.02)]"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-neon-cyan/20 rounded-lg text-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] uppercase tracking-widest text-neon-cyan/60 font-black">Regional Case Study // Basel Node</div>
                                <p className="text-sm text-white/50 leading-relaxed italic">{activeScenario}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </ChamberLayout>
    );
}
