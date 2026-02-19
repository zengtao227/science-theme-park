"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import OrganicMoleculeCanvas from "@/components/chamber/sc3-02/OrganicMoleculeCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "HYDROCARBONS" | "FUNCTIONAL_GROUPS" | "ISOMERS";

interface SC302Quest extends Quest {
    stage: Stage;
    molecule?: string;
    formula?: string;
    scenario?: string;
}

export default function SC302Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [selectedMolecule, setSelectedMolecule] = useState<string>("methane");
    const [show3D, setShow3D] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SC302Quest[] => {
        const quests: SC302Quest[] = [];

        if (stage === "HYDROCARBONS") {
            const allHydrocarbons = [
                // BASIC (5 questions)
                { name: "methane", formula: "CH4", carbons: "1", scenario: "lonza_feedstock" },
                { name: "ethane", formula: "C2H6", carbons: "2", scenario: "basel_polymer_research" },
                { name: "propane", formula: "C3H8", carbons: "3", scenario: "green_chemistry" },
                { name: "butane", formula: "C4H10", carbons: "4", scenario: "fragrance_design" },
                { name: "ethene", formula: "C2H4", carbons: "2", scenario: "lonza_feedstock" },
                // CORE (5 questions)
                { name: "pentane", formula: "C5H12", carbons: "5", scenario: "basel_polymer_research" },
                { name: "hexane", formula: "C6H14", carbons: "6", scenario: "green_chemistry" },
                { name: "propene", formula: "C3H6", carbons: "3", scenario: "fragrance_design" },
                { name: "butene", formula: "C4H8", carbons: "4", scenario: "lonza_feedstock" },
                { name: "ethyne", formula: "C2H2", carbons: "2", scenario: "basel_polymer_research" },
                // ADVANCED (5 questions)
                { name: "heptane", formula: "C7H16", carbons: "7", scenario: "green_chemistry" },
                { name: "octane", formula: "C8H18", carbons: "8", scenario: "fragrance_design" },
                { name: "pentene", formula: "C5H10", carbons: "5", scenario: "lonza_feedstock" },
                { name: "hexene", formula: "C6H12", carbons: "6", scenario: "basel_polymer_research" },
                { name: "propyne", formula: "C3H4", carbons: "3", scenario: "green_chemistry" },
                // ELITE (5 questions)
                { name: "nonane", formula: "C9H20", carbons: "9", scenario: "fragrance_design" },
                { name: "decane", formula: "C10H22", carbons: "10", scenario: "lonza_feedstock" },
                { name: "heptene", formula: "C7H14", carbons: "7", scenario: "basel_polymer_research" },
                { name: "octene", formula: "C8H16", carbons: "8", scenario: "green_chemistry" },
                { name: "butyne", formula: "C4H6", carbons: "4", scenario: "fragrance_design" },
            ];

            const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
            const activeList = allHydrocarbons.slice(startIdx, startIdx + 5);

            activeList.forEach((hc, idx) => {
                quests.push({
                    id: `HC-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    molecule: hc.name,
                    formula: hc.formula,
                    scenario: hc.scenario,
                    promptLatex: `\\text{${t("sc3_02.prompts.name_formula", { name: hc.name })}}`,
                    expressionLatex: `\\\\text{${hc.name}} \\rightarrow \\\\text{?}`,
                    targetLatex: hc.formula,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Formula}", placeholder: "CxHy", expected: hc.formula }],
                    correctLatex: hc.formula,
                    hintLatex: [`\\text{${t("sc3_02.prompts.hint_carbons", { count: hc.carbons })}}`]
                });
            });
        }

        if (stage === "FUNCTIONAL_GROUPS") {
            const groups = [
                // BASIC (5 questions)
                { name: "alcohol", group: "OH", example: "ethanol", scenario: "fragrance_design" },
                { name: "aldehyde", group: "CHO", example: "methanal", scenario: "lonza_feedstock" },
                { name: "ketone", group: "CO", example: "propanone", scenario: "basel_polymer_research" },
                { name: "ether", group: "O", example: "dimethyl ether", scenario: "green_chemistry" },
                { name: "ester", group: "COO", example: "ethyl acetate", scenario: "fragrance_design" },
                // CORE (5 questions)
                { name: "carboxylic acid", group: "COOH", example: "ethanoic acid", scenario: "lonza_feedstock" },
                { name: "amine", group: "NH2", example: "methylamine", scenario: "green_chemistry" },
                { name: "amide", group: "CONH2", example: "ethanamide", scenario: "basel_polymer_research" },
                { name: "nitrile", group: "CN", example: "ethanenitrile", scenario: "fragrance_design" },
                { name: "halide", group: "Cl", example: "chloromethane", scenario: "lonza_feedstock" },
                // ADVANCED (5 questions)
                { name: "benzene", group: "C6H6", example: "benzene", scenario: "basel_polymer_research" },
                { name: "phenol", group: "C6H5OH", example: "phenol", scenario: "green_chemistry" },
                { name: "aniline", group: "C6H5NH2", example: "aniline", scenario: "fragrance_design" },
                { name: "nitro", group: "NO2", example: "nitrobenzene", scenario: "lonza_feedstock" },
                { name: "sulfonic acid", group: "SO3H", example: "benzenesulfonic acid", scenario: "basel_polymer_research" },
                // ELITE (5 questions)
                { name: "acyl chloride", group: "COCl", example: "ethanoyl chloride", scenario: "green_chemistry" },
                { name: "anhydride", group: "COOCO", example: "ethanoic anhydride", scenario: "fragrance_design" },
                { name: "thiol", group: "SH", example: "ethanethiol", scenario: "lonza_feedstock" },
                { name: "sulfide", group: "S", example: "dimethyl sulfide", scenario: "basel_polymer_research" },
                { name: "phosphate", group: "PO4", example: "trimethyl phosphate", scenario: "green_chemistry" },
            ];

            const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
            const activeList = groups.slice(startIdx, startIdx + 5);

            activeList.forEach((g, idx) => {
                quests.push({
                    id: `FG-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    molecule: g.example,
                    scenario: g.scenario,
                    promptLatex: `\\text{${t("sc3_02.prompts.functional_group", { name: g.name === 'benzene' ? 'Benzene' : g.name })}}`,
                    expressionLatex: `\\\\text{${g.name}} \\rightarrow \\\\text{?}`,
                    targetLatex: g.group,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Formula/Group}", placeholder: "...", expected: g.group }],
                    correctLatex: g.group,
                    hintLatex: [`\\text{${t("sc3_02.prompts.hint_group", { example: g.example })}}`]
                });
            });
        }

        if (stage === "ISOMERS") {
            const isomers = [
                // BASIC (5 questions)
                { formula: "C4H10", count: "2", type: "structural", scenario: "lonza_feedstock" },
                { formula: "C5H12", count: "3", type: "structural", scenario: "basel_polymer_research" },
                { formula: "C3H8O", count: "2", type: "structural", scenario: "green_chemistry" },
                { formula: "C4H8", count: "3", type: "structural", scenario: "fragrance_design" },
                { formula: "C2H6O", count: "2", type: "structural", scenario: "lonza_feedstock" },
                // CORE (5 questions)
                { formula: "C6H14", count: "5", type: "structural", scenario: "basel_polymer_research" },
                { formula: "C4H10O", count: "4", type: "structural", scenario: "green_chemistry" },
                { formula: "C5H10", count: "5", type: "structural", scenario: "fragrance_design" },
                { formula: "C3H6O", count: "2", type: "structural", scenario: "lonza_feedstock" },
                { formula: "C4H8O", count: "4", type: "structural", scenario: "basel_polymer_research" },
                // ADVANCED (5 questions)
                { formula: "C7H16", count: "9", type: "structural", scenario: "green_chemistry" },
                { formula: "C5H12O", count: "8", type: "structural", scenario: "fragrance_design" },
                { formula: "C6H12", count: "13", type: "structural", scenario: "lonza_feedstock" },
                { formula: "C4H9Cl", count: "4", type: "structural", scenario: "basel_polymer_research" },
                { formula: "C5H10O", count: "8", type: "structural", scenario: "green_chemistry" },
                // ELITE (5 questions)
                { formula: "C8H18", count: "18", type: "structural", scenario: "fragrance_design" },
                { formula: "C6H14O", count: "17", type: "structural", scenario: "lonza_feedstock" },
                { formula: "C7H14", count: "27", type: "structural", scenario: "basel_polymer_research" },
                { formula: "C5H11Cl", count: "8", type: "structural", scenario: "green_chemistry" },
                { formula: "C6H12O", count: "20", type: "structural", scenario: "fragrance_design" },
            ];

            const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
            const activeList = isomers.slice(startIdx, startIdx + 5);

            activeList.forEach((iso, idx) => {
                quests.push({
                    id: `ISO-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    formula: iso.formula,
                    scenario: iso.scenario,
                    promptLatex: `\\text{${t("sc3_02.prompts.isomer_count", { formula: iso.formula })}}`,
                    expressionLatex: `${iso.formula} \\rightarrow \\\\text{? isomers}`,
                    targetLatex: iso.count,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Count}", placeholder: "...", expected: iso.count }],
                    correctLatex: iso.count,
                    hintLatex: [`\\text{${t("sc3_02.prompts.hint_isomer", { type: iso.type })}}`]
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
    } = useQuestManager<SC302Quest, Stage>({
        buildPool,
        initialStage: "HYDROCARBONS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SC3.02", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "HYDROCARBONS", label: t("sc3_02.stages.hydrocarbons") },
        { id: "FUNCTIONAL_GROUPS", label: t("sc3_02.stages.functional_groups") },
        { id: "ISOMERS", label: t("sc3_02.stages.isomers") },
    ], [t]);

    useEffect(() => {
        if (currentQuest?.molecule) {
            setSelectedMolecule(currentQuest.molecule);
        }
    }, [currentQuest]);

    const hint = getHint();

    const activeScenario = useMemo(() => {
        if (!currentQuest?.scenario) return null;
        const scenario = t(`sc3_02.scenarios.${currentQuest.scenario}`, { defaultValue: "" });
        return scenario || null;
    }, [currentQuest, t]);

    return (
        <ChamberLayout
            moduleCode="SC3.02"
            title={t("sc3_02.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sc3_02.footer_left")}
            translations={{
                back: t("sc3_02.back"),
                check: t("sc3_02.check"),
                next: t("sc3_02.next"),
                correct: t("sc3_02.correct"),
                incorrect: t("sc3_02.incorrect"),
                difficulty: {
                    BASIC: t("sc3_02.difficulty.BASIC"),
                    CORE: t("sc3_02.difficulty.CORE"),
                    ADVANCED: t("sc3_02.difficulty.ADVANCED"),
                    ELITE: t("sc3_02.difficulty.ELITE"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <OrganicMoleculeCanvas
                            molecule={selectedMolecule}
                            show3D={show3D}
                            stage={stage}
                            translations={t}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                            <span className="text-[10px] uppercase text-white/60 tracking-widest">{t("sc3_02.labels.view_3d")}</span>
                            <input
                                type="checkbox"
                                checked={show3D}
                                onChange={(e) => setShow3D(e.target.checked)}
                                className="w-4 h-4 rounded border-white/20 bg-black text-neon-purple focus:ring-neon-purple/50"
                            />
                        </label>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t("sc3_02.labels.organic_mastery")}</span>
                            <span>{currentStageStats?.correct || 0} PTS</span>
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-all duration-1000 ${i < (currentStageStats ? currentStageStats.correct % 6 : 0)
                                        ? "bg-neon-purple shadow-[0_0_5px_#ff00ff]"
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
                            <h3 className="text-[10px] text-neon-purple uppercase tracking-[0.5em] font-black italic">
                                {t("sc3_02.objective_title")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-purple/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(255,0,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-purple/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("sc3_02.labels.molecule_display")}
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest.expressionLatex} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-purple/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-purple font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-purple/30" />
                                    {t("sc3_02.labels.input_terminal")}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-purple/30 font-mono">ORG_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-purple/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner"
                                                    placeholder={slot.placeholder}
                                                    value={inputs[slot.id] || ""}
                                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') verify();
                                                    }}
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-purple/0 group-focus-within:bg-neon-purple/20 transition-all blur-sm" />
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
                                                        {lastCheck.ok ? t("sc3_02.correct") : t("sc3_02.incorrect")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sc3_02.feedback.correct") : t("sc3_02.feedback.incorrect")}
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
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255, 0, 255, 0.2)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={lastCheck?.ok ? next : verify}
                                    className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-xl ${lastCheck?.ok
                                        ? "bg-neon-purple text-black"
                                        : "bg-white/10 text-white hover:bg-white/20 border-2 border-white/5"
                                        }`}
                                >
                                    {lastCheck?.ok ? t("sc3_02.next") : t("sc3_02.check")}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                )}

                {activeScenario && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-neon-purple/[0.02] border border-neon-purple/10 rounded-3xl p-8 backdrop-blur-sm"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-neon-purple/20 rounded-lg text-neon-purple">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] uppercase tracking-widest text-neon-purple/60 font-black">Regional Case Study // Basel Node</div>
                                <p className="text-sm text-white/50 leading-relaxed italic">{activeScenario}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </ChamberLayout>
    );
}
