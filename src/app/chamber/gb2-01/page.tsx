"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import NeuralCanvas from "@/components/chamber/gb2-01/NeuralCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "ANATOMY" | "POTENTIAL" | "SYNAPSE";

interface GB201Quest extends Quest {
    stage: Stage;
    scenario?: string;
    data?: any;
}

export default function GB201Neurobiology() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const gb2_01 = t('gb2_01');
    const [voltage] = useState(-70);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): GB201Quest[] => {
        const quests: GB201Quest[] = [];
        const isAdvanced = difficulty === "ADVANCED" || difficulty === "ELITE";

        if (stage === "ANATOMY") {
            const parts = [
                { id: "axon", func: "signal transmission", name: gb2_01.labels.axon, scenario: "roche_neuroscience" },
                { id: "soma", func: "metabolic processing", name: gb2_01.labels.cell_body, scenario: "basel_biomedicine" },
                { id: "dendrites", func: "signal reception", name: gb2_01.labels.dendrites, scenario: "neural_plasticity" },
                { id: "myelin", func: "insulation and saltatory conduction", name: gb2_01.labels.myelin_sheath, scenario: "roche_neuroscience" },
                { id: "node", func: "ion exchange during propagation", name: gb2_01.labels.node_of_ranvier, scenario: "basel_biomedicine" }
            ];

            const filteredParts = isAdvanced ? parts : parts.slice(0, 3);

            filteredParts.forEach((p, idx) => {
                quests.push({
                    id: `AN-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: p.scenario,
                    promptLatex: `\\text{${gb2_01.prompts.identify_part.replace("{function}", p.func)}}`,
                    expressionLatex: "",
                    targetLatex: `\\text{${p.name}}`,
                    slots: [{ id: "ans", labelLatex: "\\text{Structure}", placeholder: "...", expected: p.name }],
                    correctLatex: p.name,
                    hintLatex: [`\\text{${gb2_01.prompts.hint_anatomy}}`]
                });
            });
        }

        if (stage === "POTENTIAL") {
            const scenarios = isAdvanced ? [
                { k_out: 2.5, k_in: 150, expected: "-108", scenario: "basel_biomedicine" },
                { na_out: 145, na_in: 12, expected: "66", scenario: "roche_neuroscience" },
                { cl_out: 100, cl_in: 10, expected: "-61", scenario: "basel_biomedicine" }
            ] : [
                { k_out: 5, k_in: 140, expected: "-88", scenario: "basel_biomedicine" },
                { k_out: 10, k_in: 140, expected: "-70", scenario: "basel_biomedicine" },
                { na_out: 145, na_in: 15, expected: "60", scenario: "roche_neuroscience" }
            ];

            scenarios.forEach((s, idx) => {
                const ion = s.na_out ? "Na^+" : (s.cl_out ? "Cl^-" : "K^+");
                const cout = (s.na_out || s.cl_out || s.k_out || 0).toString();
                const cin = (s.na_in || s.cl_in || s.k_in || 0).toString();

                quests.push({
                    id: `EP-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: s.scenario,
                    promptLatex: `\\text{${gb2_01.prompts.calc_potential.replace('{ion}', ion).replace('{cout}', cout).replace('{cin}', cin)}}`,
                    expressionLatex: `E = 61 \\log_{10}\\left(\\frac{[C]_{out}}{[C]_{in}}\\right)`,
                    targetLatex: s.expected,
                    slots: [{ id: "ans", labelLatex: "E \\text{ (mV)}", placeholder: "0", expected: s.expected }],
                    correctLatex: `${s.expected}\\text{ mV}`,
                    hintLatex: [`\\text{${gb2_01.prompts.hint_nernst}}`]
                });
            });

            if (isAdvanced) {
                quests.push({
                    id: `AP-ION-ADV`,
                    difficulty,
                    stage,
                    scenario: "roche_neuroscience",
                    promptLatex: `\\text{Identify the ion responsible for repolarization.}`,
                    expressionLatex: "",
                    targetLatex: "K^+",
                    slots: [{ id: "ans", labelLatex: "\\text{Ion}", placeholder: "...", expected: "K+" }],
                    correctLatex: "K^+",
                    hintLatex: ["\\text{Potassium leaves the cell to restore negative potential.}"]
                });
            }
        }

        if (stage === "SYNAPSE") {
            quests.push({
                id: `SYN-ION`,
                difficulty,
                stage,
                scenario: "friedrich_miescher",
                promptLatex: `\\text{${gb2_01.prompts.synapse_mechanism}}`,
                expressionLatex: "",
                targetLatex: "Ca^{2+}",
                slots: [{ id: "ans", labelLatex: "\\text{Ion}", placeholder: "...", expected: "Ca2+" }],
                correctLatex: "Ca^{2+}",
                hintLatex: [`\\text{${gb2_01.prompts.hint_calcium}}`]
            });

            const neurotransmitters = [
                { name: "GABA", type: "Inhibitory", effect: "Cl- influx", scenario: "roche_neuroscience" },
                { name: "Glutamate", type: "Excitatory", effect: "Na+ influx", scenario: "basel_biomedicine" },
                { name: "Acetylcholine", type: "Excitatory", effect: "Muscle contraction", scenario: "friedrich_miescher" }
            ];

            const filteredNT = isAdvanced ? neurotransmitters : neurotransmitters.slice(0, 2);

            filteredNT.forEach((nt, idx) => {
                quests.push({
                    id: `NT-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: nt.scenario,
                    promptLatex: `\\text{Role: } \\text{${nt.effect}}. \\text{Type of } \\text{${nt.name}}?`,
                    expressionLatex: "",
                    targetLatex: `\\text{${nt.type}}`,
                    slots: [{ id: "ans", labelLatex: "\\text{Type}", placeholder: "...", expected: nt.type }],
                    correctLatex: nt.type
                });
            });
        }

        return quests;
    }, [t]);

    const {
        stage,
        difficulty,
        currentQuest,
        handleStageChange,
        handleDifficultyChange,
        currentStageStats,
        pool,
        verify,
        inputs,
        setInputs,
        lastCheck,
        next
    } = useQuestManager<GB201Quest, Stage>({
        buildPool: buildStagePool,
        initialStage: "ANATOMY",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("GB2.01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const successRate = useMemo(() => {
        if (!currentStageStats || pool.length === 0) return 0;
        return (currentStageStats.correct / pool.length) * 100;
    }, [currentStageStats, pool.length]);

    const activeScenario = useMemo(() => {
        if (currentQuest?.scenario && gb2_01.scenarios[currentQuest.scenario as keyof typeof gb2_01.scenarios]) {
            return gb2_01.scenarios[currentQuest.scenario as keyof typeof gb2_01.scenarios];
        }
        const keys = Object.keys(gb2_01.scenarios);
        return gb2_01.scenarios[keys[0] as keyof typeof gb2_01.scenarios];
    }, [t, currentQuest]);

    return (
        <ChamberLayout
            title={gb2_01.title}
            moduleCode="GB2.01"
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            stages={[
                { id: "ANATOMY", label: gb2_01.stages.anatomy },
                { id: "POTENTIAL", label: gb2_01.stages.potential },
                { id: "SYNAPSE", label: gb2_01.stages.synapse },
            ]}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onVerify={verify}
            onNext={lastCheck?.ok ? next : undefined}
            checkStatus={lastCheck}
            footerLeft={gb2_01.footer_left}
            translations={{
                back: gb2_01.back,
                check: gb2_01.check,
                next: gb2_01.next,
                correct: gb2_01.correct,
                incorrect: gb2_01.incorrect,
                ready: gb2_01.ready,
                monitor_title: gb2_01.monitor_title,
                difficulty: {
                    basic: gb2_01.difficulty.basic,
                    core: gb2_01.difficulty.core,
                    advanced: gb2_01.difficulty.advanced,
                    elite: gb2_01.difficulty.elite,
                },
            }}
            monitorContent={[
                <div key="stats" className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest">{gb2_01.monitor_title}</span>
                        <span className="text-xl font-mono text-green-400">
                            {voltage.toFixed(1)} <span className="text-xs text-white/20">mV</span>
                        </span>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="flex flex-col items-end text-sm font-mono">
                        <span className="text-white/40 text-[10px]">{gb2_01.correct}</span>
                        <span className="text-green-500">{currentStageStats?.correct ?? 0}</span>
                    </div>
                </div>
            ]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                {/* Left Column: Mission & Interaction */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md flex-1 overflow-y-auto">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-white/10" />
                            {gb2_01.objective_title}
                        </div>

                        <AnimatePresence mode="wait">
                            {currentQuest && (
                                <motion.div
                                    key={currentQuest.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                        <div className="text-lg text-white/90 leading-relaxed mb-4">
                                            <BlockMath math={currentQuest.promptLatex} />
                                        </div>
                                        {currentQuest.expressionLatex && (
                                            <div className="p-4 bg-black/30 rounded-lg border border-white/5 flex justify-center overflow-x-auto">
                                                <BlockMath math={currentQuest.expressionLatex} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Input Section */}
                                    <div className="space-y-6">
                                        {currentQuest.slots.map((slot) => (
                                            <div key={slot.id} className="space-y-3">
                                                <label className="text-xs uppercase tracking-widest text-white/40 block">
                                                    <InlineMath math={slot.labelLatex} />
                                                </label>
                                                <div className="relative group">
                                                    <input
                                                        type="text"
                                                        value={inputs[slot.id] || ""}
                                                        placeholder={slot.placeholder}
                                                        className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all font-mono"
                                                        onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                verify();
                                                            }
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 rounded-xl bg-purple-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            onClick={verify}
                                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        >
                                            {gb2_01.check}
                                        </button>
                                    </div>

                                    {currentQuest.hintLatex && (
                                        <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-purple-400 font-bold text-xs">?</span>
                                            </div>
                                            <div className="text-sm text-purple-300/80 leading-relaxed italic overflow-x-auto">
                                                <InlineMath math={currentQuest.hintLatex[0]} />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Scenario / Info Section */}
                    <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-medium">Node: Basel_Neuro</div>
                            <div className="h-1 w-12 bg-white/10 rounded-full" />
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed italic">
                            {activeScenario}
                        </p>
                    </div>
                </div>

                {/* Right Column: Visualization */}
                <div className="lg:col-span-7 flex flex-col gap-6 h-full min-h-[500px]">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md relative overflow-hidden flex flex-col p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4 text-xs tracking-widest uppercase font-mono">
                                <span className="text-white/20">system</span>
                                <span className="text-green-400">active</span>
                            </div>
                            <div className="text-[10px] text-white/20 font-mono">GB2.01_VISUALIZATION_GRID</div>
                        </div>

                        <div className="flex-1 relative border border-white/5 rounded-xl bg-black/40 shadow-inner group">
                            <div className="absolute inset-0">
                                <NeuralCanvas
                                    stage={stage}
                                    isActive={true}
                                    voltage={voltage}
                                />
                            </div>

                            {/* Overlay Controls/Readouts */}
                            <div className="absolute top-4 left-4 p-3 bg-black/60 border border-white/10 backdrop-blur-md rounded-lg pointer-events-none">
                                <div className="text-[8px] uppercase tracking-widest text-white/40 mb-1">{gb2_01.labels.voltage}</div>
                                <div className="text-lg font-mono text-cyan-400">{voltage.toFixed(1)}</div>
                            </div>

                            <div className="absolute top-4 right-4 p-3 bg-black/60 border border-white/10 backdrop-blur-md rounded-lg pointer-events-none max-w-[150px]">
                                <div className="text-[8px] uppercase tracking-widest text-white/40 mb-1">STABILITY</div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-green-500"
                                        animate={{ width: `${Math.max(0, 100 - Math.abs(voltage + 70) * 2)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Grid decorations */}
                            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        </div>

                        <div className="mt-8 flex items-center justify-between text-[10px] font-mono tracking-widest">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    <span className="text-white/40 uppercase">{gb2_01.labels.cell_body}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                                    <span className="text-white/40 uppercase">{gb2_01.labels.myelin_sheath}</span>
                                </div>
                            </div>
                            <div className="text-white/20 uppercase tracking-[0.3em]">Neural Link Stable</div>
                        </div>
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
