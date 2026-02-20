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

        // Each stage × difficulty = 5 questions (60 total)
        const questData: Record<Stage, Record<Difficulty, Array<{
            part?: string;
            func?: string;
            name?: string;
            ion?: string;
            cout?: number;
            cin?: number;
            expected: string;
            scenario: string;
            nt_name?: string;
            nt_type?: string;
            nt_effect?: string;
        }>>> = {
            ANATOMY: {
                BASIC: [
                    { part: "axon", func: "signal transmission", name: "axon", expected: "axon", scenario: "roche_neuroscience" },
                    { part: "soma", func: "metabolic processing", name: "cell body", expected: "cell body", scenario: "basel_biomedicine" },
                    { part: "dendrites", func: "signal reception", name: "dendrites", expected: "dendrites", scenario: "neural_plasticity" },
                    { part: "axon", func: "long-distance transmission", name: "axon", expected: "axon", scenario: "roche_neuroscience" },
                    { part: "soma", func: "protein synthesis", name: "cell body", expected: "cell body", scenario: "basel_biomedicine" }
                ],
                CORE: [
                    { part: "myelin", func: "insulation", name: "myelin sheath", expected: "myelin sheath", scenario: "roche_neuroscience" },
                    { part: "node", func: "ion exchange", name: "node of Ranvier", expected: "node of Ranvier", scenario: "basel_biomedicine" },
                    { part: "dendrites", func: "synaptic input", name: "dendrites", expected: "dendrites", scenario: "neural_plasticity" },
                    { part: "axon", func: "action potential propagation", name: "axon", expected: "axon", scenario: "roche_neuroscience" },
                    { part: "myelin", func: "saltatory conduction", name: "myelin sheath", expected: "myelin sheath", scenario: "basel_biomedicine" }
                ],
                ADVANCED: [
                    { part: "node", func: "voltage-gated channel clustering", name: "node of Ranvier", expected: "node of Ranvier", scenario: "basel_biomedicine" },
                    { part: "myelin", func: "capacitance reduction", name: "myelin sheath", expected: "myelin sheath", scenario: "roche_neuroscience" },
                    { part: "axon hillock", func: "action potential initiation", name: "axon hillock", expected: "axon hillock", scenario: "neural_plasticity" },
                    { part: "dendrites", func: "dendritic integration", name: "dendrites", expected: "dendrites", scenario: "basel_biomedicine" },
                    { part: "soma", func: "gene expression regulation", name: "cell body", expected: "cell body", scenario: "roche_neuroscience" }
                ],
                ELITE: [
                    { part: "node", func: "Na+ channel regeneration", name: "node of Ranvier", expected: "node of Ranvier", scenario: "basel_biomedicine" },
                    { part: "myelin", func: "oligodendrocyte wrapping", name: "myelin sheath", expected: "myelin sheath", scenario: "roche_neuroscience" },
                    { part: "axon terminal", func: "neurotransmitter vesicle docking", name: "axon terminal", expected: "axon terminal", scenario: "friedrich_miescher" },
                    { part: "dendrites", func: "spine plasticity", name: "dendrites", expected: "dendrites", scenario: "neural_plasticity" },
                    { part: "soma", func: "retrograde signaling", name: "cell body", expected: "cell body", scenario: "basel_biomedicine" }
                ]
            },
            POTENTIAL: {
                BASIC: [
                    { ion: "K+", cout: 5, cin: 140, expected: "-88", scenario: "basel_biomedicine" },
                    { ion: "K+", cout: 10, cin: 140, expected: "-70", scenario: "basel_biomedicine" },
                    { ion: "Na+", cout: 145, cin: 15, expected: "60", scenario: "roche_neuroscience" },
                    { ion: "K+", cout: 4, cin: 120, expected: "-90", scenario: "basel_biomedicine" },
                    { ion: "Na+", cout: 150, cin: 12, expected: "67", scenario: "roche_neuroscience" }
                ],
                CORE: [
                    { ion: "K+", cout: 2.5, cin: 150, expected: "-108", scenario: "basel_biomedicine" },
                    { ion: "Na+", cout: 145, cin: 12, expected: "66", scenario: "roche_neuroscience" },
                    { ion: "Cl-", cout: 100, cin: 10, expected: "-61", scenario: "basel_biomedicine" },
                    { ion: "K+", cout: 3, cin: 135, expected: "-100", scenario: "basel_biomedicine" },
                    { ion: "Na+", cout: 140, cin: 10, expected: "70", scenario: "roche_neuroscience" }
                ],
                ADVANCED: [
                    { ion: "K+", cout: 2, cin: 160, expected: "-118", scenario: "basel_biomedicine" },
                    { ion: "Na+", cout: 150, cin: 8, expected: "76", scenario: "roche_neuroscience" },
                    { ion: "Cl-", cout: 120, cin: 8, expected: "-71", scenario: "basel_biomedicine" },
                    { ion: "K+", cout: 1.5, cin: 150, expected: "-122", scenario: "basel_biomedicine" },
                    { ion: "Na+", cout: 145, cin: 10, expected: "71", scenario: "roche_neuroscience" }
                ],
                ELITE: [
                    { ion: "K+", cout: 1, cin: 150, expected: "-133", scenario: "basel_biomedicine" },
                    { ion: "Na+", cout: 150, cin: 5, expected: "90", scenario: "roche_neuroscience" },
                    { ion: "Cl-", cout: 110, cin: 5, expected: "-80", scenario: "basel_biomedicine" },
                    { ion: "K+", cout: 0.5, cin: 140, expected: "-146", scenario: "basel_biomedicine" },
                    { ion: "Na+", cout: 145, cin: 6, expected: "84", scenario: "roche_neuroscience" }
                ]
            },
            SYNAPSE: {
                BASIC: [
                    { nt_name: "Acetylcholine", nt_type: "Excitatory", nt_effect: "Muscle contraction", expected: "Excitatory", scenario: "friedrich_miescher" },
                    { nt_name: "GABA", nt_type: "Inhibitory", nt_effect: "Cl- influx", expected: "Inhibitory", scenario: "roche_neuroscience" },
                    { nt_name: "Glutamate", nt_type: "Excitatory", nt_effect: "Na+ influx", expected: "Excitatory", scenario: "basel_biomedicine" },
                    { nt_name: "Glycine", nt_type: "Inhibitory", nt_effect: "Cl- influx", expected: "Inhibitory", scenario: "roche_neuroscience" },
                    { nt_name: "Dopamine", nt_type: "Excitatory", nt_effect: "Reward signaling", expected: "Excitatory", scenario: "basel_biomedicine" }
                ],
                CORE: [
                    { nt_name: "Serotonin", nt_type: "Excitatory", nt_effect: "Mood regulation", expected: "Excitatory", scenario: "roche_neuroscience" },
                    { nt_name: "Norepinephrine", nt_type: "Excitatory", nt_effect: "Alertness", expected: "Excitatory", scenario: "basel_biomedicine" },
                    { nt_name: "GABA", nt_type: "Inhibitory", nt_effect: "Anxiety reduction", expected: "Inhibitory", scenario: "roche_neuroscience" },
                    { nt_name: "Glutamate", nt_type: "Excitatory", nt_effect: "Learning and memory", expected: "Excitatory", scenario: "friedrich_miescher" },
                    { nt_name: "Acetylcholine", nt_type: "Excitatory", nt_effect: "Attention", expected: "Excitatory", scenario: "basel_biomedicine" }
                ],
                ADVANCED: [
                    { nt_name: "Endorphins", nt_type: "Inhibitory", nt_effect: "Pain relief", expected: "Inhibitory", scenario: "roche_neuroscience" },
                    { nt_name: "Histamine", nt_type: "Excitatory", nt_effect: "Wakefulness", expected: "Excitatory", scenario: "basel_biomedicine" },
                    { nt_name: "Substance P", nt_type: "Excitatory", nt_effect: "Pain transmission", expected: "Excitatory", scenario: "friedrich_miescher" },
                    { nt_name: "Adenosine", nt_type: "Inhibitory", nt_effect: "Sleep promotion", expected: "Inhibitory", scenario: "roche_neuroscience" },
                    { nt_name: "Nitric oxide", nt_type: "Excitatory", nt_effect: "Retrograde signaling", expected: "Excitatory", scenario: "basel_biomedicine" }
                ],
                ELITE: [
                    { nt_name: "Anandamide", nt_type: "Inhibitory", nt_effect: "Cannabinoid signaling", expected: "Inhibitory", scenario: "roche_neuroscience" },
                    { nt_name: "Orexin", nt_type: "Excitatory", nt_effect: "Arousal maintenance", expected: "Excitatory", scenario: "basel_biomedicine" },
                    { nt_name: "Neuropeptide Y", nt_type: "Inhibitory", nt_effect: "Appetite regulation", expected: "Inhibitory", scenario: "friedrich_miescher" },
                    { nt_name: "CCK", nt_type: "Excitatory", nt_effect: "Satiety signaling", expected: "Excitatory", scenario: "roche_neuroscience" },
                    { nt_name: "Dynorphin", nt_type: "Inhibitory", nt_effect: "Stress response", expected: "Inhibitory", scenario: "basel_biomedicine" }
                ]
            }
        };

        const dataList = questData[stage][difficulty];
        dataList.forEach((data, idx) => {
            if (stage === "ANATOMY") {
                quests.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    scenario: data.scenario,
                    promptLatex: `\\text{${t('gb2_01.prompts.identify_part').replace("{function}", data.func!)}}`,
                    expressionLatex: "",
                    targetLatex: `\\\\text{${data.expected}}`,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Structure}", placeholder: "...", expected: data.expected }],
                    correctLatex: data.expected,
                    hintLatex: [`\\text{${t('gb2_01.prompts.hint_anatomy')}}`]
                });
            } else if (stage === "POTENTIAL") {
                quests.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    scenario: data.scenario,
                    promptLatex: `\\text{${t('gb2_01.prompts.calc_potential').replace('{ion}', data.ion!).replace('{cout}', data.cout!.toString()).replace('{cin}', data.cin!.toString())}}`,
                    expressionLatex: `E = 61 \\log_{10}\\left(\\\\frac{[C]_{out}}{[C]_{in}}\\right)`,
                    targetLatex: data.expected,
                    slots: [{ id: "ans", labelLatex: "E \\\\text{ (mV)}", placeholder: "0", expected: data.expected }],
                    correctLatex: `${data.expected}\\\\text{ mV}`,
                    hintLatex: [`\\text{${t('gb2_01.prompts.hint_nernst')}}`]
                });
            } else {
                const promptText = t('gb2_01.prompts.nt_role_type', { effect: data.nt_effect || '', name: data.nt_name || '' });
                quests.push({
                    id: `${stage}_${difficulty[0]}${idx + 1}`,
                    difficulty,
                    stage,
                    scenario: data.scenario,
                    promptLatex: `\\\\text{${promptText}}`,
                    expressionLatex: "",
                    targetLatex: `\\\\text{${data.expected}}`,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Type}", placeholder: "...", expected: data.expected }],
                    correctLatex: data.expected,
                    hintLatex: [`\\text{${t('gb2_01.prompts.hint_synapse')}}`]
                });
            }
        });

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
        next, adaptiveRecommendation,
    } = useQuestManager<GB201Quest, Stage>({
    moduleCode: "gb2-01",
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
        if (currentQuest?.scenario && gb2_01.scenarios[currentQuest?.scenario as keyof typeof gb2_01.scenarios]) {
            return gb2_01.scenarios[currentQuest?.scenario as keyof typeof gb2_01.scenarios];
        }
        const keys = Object.keys(gb2_01.scenarios);
        return gb2_01.scenarios[keys[0] as keyof typeof gb2_01.scenarios];
    }, [t, currentQuest]);

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
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
                                    key={currentQuest?.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                                        <div className="text-lg text-white/90 leading-relaxed mb-4">
                                            <BlockMath math={currentQuest?.promptLatex || ""} />
                                        </div>
                                        {currentQuest?.expressionLatex && (
                                            <div className="p-4 bg-black/30 rounded-lg border border-white/5 flex justify-center overflow-x-auto">
                                                <BlockMath math={currentQuest?.expressionLatex || ""} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Input Section */}
                                    <div className="space-y-6">
                                        {currentQuest?.slots.map((slot) => (
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

                                    {currentQuest?.hintLatex && (
                                        <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-purple-400 font-bold text-xs">?</span>
                                            </div>
                                            <div className="text-sm text-purple-300/80 leading-relaxed italic overflow-x-auto">
                                                <InlineMath math={currentQuest?.hintLatex[0]} />
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
