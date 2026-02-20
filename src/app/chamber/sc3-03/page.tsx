"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import OrganicReactionCanvas from "@/components/chamber/sc3-03/OrganicReactionCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "COMBUSTION" | "SUBSTITUTION" | "ADDITION";

interface SC303Quest extends Quest {
    stage: Stage;
    reactionType?: string;
    scenario?: string;
}

export default function SC303Page() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();
    const [animationSpeed, setAnimationSpeed] = useState(1);
    const [showMechanism, setShowMechanism] = useState(true);

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SC303Quest[] => {
        const quests: SC303Quest[] = [];

        if (stage === "COMBUSTION") {
            const allCombustions = [
                // BASIC (5 questions)
                { reactant: "CH_4", co2: 1, h2o: 2, scenario: "novartis_combustion" },
                { reactant: "C_2H_6", co2: 2, h2o: 3, scenario: "reaction_control" },
                { reactant: "C_3H_8", co2: 3, h2o: 4, scenario: "novartis_combustion" },
                { reactant: "C_4H_{10}", co2: 4, h2o: 5, scenario: "reaction_control" },
                { reactant: "C_2H_4", co2: 2, h2o: 2, scenario: "novartis_combustion" },
                // CORE (5 questions)
                { reactant: "C_5H_{12}", co2: 5, h2o: 6, scenario: "reaction_control" },
                { reactant: "C_6H_{14}", co2: 6, h2o: 7, scenario: "novartis_combustion" },
                { reactant: "C_3H_6", co2: 3, h2o: 3, scenario: "reaction_control" },
                { reactant: "C_4H_8", co2: 4, h2o: 4, scenario: "novartis_combustion" },
                { reactant: "C_2H_2", co2: 2, h2o: 1, scenario: "reaction_control" },
                // ADVANCED (5 questions)
                { reactant: "C_7H_{16}", co2: 7, h2o: 8, scenario: "novartis_combustion" },
                { reactant: "C_8H_{18}", co2: 8, h2o: 9, scenario: "reaction_control" },
                { reactant: "C_5H_{10}", co2: 5, h2o: 5, scenario: "novartis_combustion" },
                { reactant: "C_6H_{12}", co2: 6, h2o: 6, scenario: "reaction_control" },
                { reactant: "C_3H_4", co2: 3, h2o: 2, scenario: "novartis_combustion" },
                // ELITE (5 questions)
                { reactant: "C_9H_{20}", co2: 9, h2o: 10, scenario: "reaction_control" },
                { reactant: "C_{10}H_{22}", co2: 10, h2o: 11, scenario: "novartis_combustion" },
                { reactant: "C_7H_{14}", co2: 7, h2o: 7, scenario: "reaction_control" },
                { reactant: "C_8H_{16}", co2: 8, h2o: 8, scenario: "novartis_combustion" },
                { reactant: "C_4H_6", co2: 4, h2o: 3, scenario: "reaction_control" },
            ];

            const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
            const activeList = allCombustions.slice(startIdx, startIdx + 5);

            activeList.forEach((comb, idx) => {
                quests.push({
                    id: `COMB-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    reactionType: "combustion",
                    scenario: comb.scenario,
                    promptLatex: `\\text{${t("sc3_03.prompts.combustion", { reactant: comb.reactant })}}`,
                    expressionLatex: `\\ce{${comb.reactant} + O2 -> CO2 + H2O}`,
                    targetLatex: comb.co2.toString(),
                    slots: [{ id: "ans", labelLatex: "\\ce{CO2}\\\\text{ molecules}", placeholder: "...", expected: comb.co2.toString() }],
                    correctLatex: `${comb.co2}\\ce{CO2}`,
                    hintLatex: [`\\text{${t("sc3_03.prompts.hint_combustion")}}`]
                });
            });
        }

        if (stage === "SUBSTITUTION") {
            const substitutions = [
                // BASIC (5 questions)
                { alkane: "CH_4", halogen: "Cl", product: "CH3Cl", scenario: "basel_chemical_plant" },
                { alkane: "C_2H_6", halogen: "Br", product: "C2H5Br", scenario: "free_radical_mechanism" },
                { alkane: "C_3H_8", halogen: "Cl", product: "C3H7Cl", scenario: "basel_chemical_plant" },
                { alkane: "CH_4", halogen: "Br", product: "CH3Br", scenario: "free_radical_mechanism" },
                { alkane: "C_2H_6", halogen: "Cl", product: "C2H5Cl", scenario: "basel_chemical_plant" },
                // CORE (5 questions)
                { alkane: "C_4H_{10}", halogen: "Cl", product: "C4H9Cl", scenario: "free_radical_mechanism" },
                { alkane: "C_5H_{12}", halogen: "Br", product: "C5H11Br", scenario: "basel_chemical_plant" },
                { alkane: "C_3H_8", halogen: "Br", product: "C3H7Br", scenario: "free_radical_mechanism" },
                { alkane: "C_4H_{10}", halogen: "Br", product: "C4H9Br", scenario: "basel_chemical_plant" },
                { alkane: "C_2H_6", halogen: "I", product: "C2H5I", scenario: "free_radical_mechanism" },
                // ADVANCED (5 questions)
                { alkane: "C_6H_{14}", halogen: "Cl", product: "C6H13Cl", scenario: "basel_chemical_plant" },
                { alkane: "C_7H_{16}", halogen: "Br", product: "C7H15Br", scenario: "free_radical_mechanism" },
                { alkane: "C_5H_{12}", halogen: "Cl", product: "C5H11Cl", scenario: "basel_chemical_plant" },
                { alkane: "C_6H_{14}", halogen: "Br", product: "C6H13Br", scenario: "free_radical_mechanism" },
                { alkane: "C_3H_8", halogen: "I", product: "C3H7I", scenario: "basel_chemical_plant" },
                // ELITE (5 questions)
                { alkane: "C_8H_{18}", halogen: "Cl", product: "C8H17Cl", scenario: "free_radical_mechanism" },
                { alkane: "C_9H_{20}", halogen: "Br", product: "C9H19Br", scenario: "basel_chemical_plant" },
                { alkane: "C_7H_{16}", halogen: "Cl", product: "C7H15Cl", scenario: "free_radical_mechanism" },
                { alkane: "C_8H_{18}", halogen: "Br", product: "C8H17Br", scenario: "basel_chemical_plant" },
                { alkane: "C_4H_{10}", halogen: "I", product: "C4H9I", scenario: "free_radical_mechanism" },
            ];

            const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
            const activeList = substitutions.slice(startIdx, startIdx + 5);

            activeList.forEach((sub, idx) => {
                quests.push({
                    id: `SUB-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    reactionType: "substitution",
                    scenario: sub.scenario,
                    promptLatex: `\\text{${t("sc3_03.prompts.substitution", { alkane: sub.alkane, halogen: sub.halogen })}}`,
                    expressionLatex: `\\ce{${sub.alkane} + ${sub.halogen}2 ->[light] ? + H${sub.halogen}}`,
                    targetLatex: sub.product,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Product}", placeholder: "Formula", expected: sub.product }],
                    correctLatex: `\\ce{${sub.product}}`,
                    hintLatex: [`\\text{${t("sc3_03.prompts.hint_substitution")}}`]
                });
            });
        }

        if (stage === "ADDITION") {
            const additions = [
                // BASIC (5 questions)
                { alkene: "C_2H_4", reagent: "H_2", product: "C2H6", scenario: "polymer_production" },
                { alkene: "C_3H_6", reagent: "H_2", product: "C3H8", scenario: "reaction_control" },
                { alkene: "C_2H_4", reagent: "Cl_2", product: "C2H4Cl2", scenario: "polymer_production" },
                { alkene: "C_3H_6", reagent: "Br_2", product: "C3H6Br2", scenario: "reaction_control" },
                { alkene: "C_4H_8", reagent: "H_2", product: "C4H10", scenario: "polymer_production" },
                // CORE (5 questions)
                { alkene: "C_5H_{10}", reagent: "H_2", product: "C5H12", scenario: "reaction_control" },
                { alkene: "C_4H_8", reagent: "Cl_2", product: "C4H8Cl2", scenario: "polymer_production" },
                { alkene: "C_5H_{10}", reagent: "Br_2", product: "C5H10Br2", scenario: "reaction_control" },
                { alkene: "C_2H_4", reagent: "HCl", product: "C2H5Cl", scenario: "polymer_production" },
                { alkene: "C_3H_6", reagent: "HBr", product: "C3H7Br", scenario: "reaction_control" },
                // ADVANCED (5 questions)
                { alkene: "C_6H_{12}", reagent: "H_2", product: "C6H14", scenario: "polymer_production" },
                { alkene: "C_7H_{14}", reagent: "Cl_2", product: "C7H14Cl2", scenario: "reaction_control" },
                { alkene: "C_6H_{12}", reagent: "Br_2", product: "C6H12Br2", scenario: "polymer_production" },
                { alkene: "C_4H_8", reagent: "HCl", product: "C4H9Cl", scenario: "reaction_control" },
                { alkene: "C_5H_{10}", reagent: "HBr", product: "C5H11Br", scenario: "polymer_production" },
                // ELITE (5 questions)
                { alkene: "C_8H_{16}", reagent: "H_2", product: "C8H18", scenario: "reaction_control" },
                { alkene: "C_9H_{18}", reagent: "Cl_2", product: "C9H18Cl2", scenario: "polymer_production" },
                { alkene: "C_8H_{16}", reagent: "Br_2", product: "C8H16Br2", scenario: "reaction_control" },
                { alkene: "C_6H_{12}", reagent: "HCl", product: "C6H13Cl", scenario: "polymer_production" },
                { alkene: "C_7H_{14}", reagent: "HBr", product: "C7H15Br", scenario: "reaction_control" },
            ];

            const startIdx = difficulty === "BASIC" ? 0 : difficulty === "CORE" ? 5 : difficulty === "ADVANCED" ? 10 : 15;
            const activeList = additions.slice(startIdx, startIdx + 5);

            activeList.forEach((add, idx) => {
                quests.push({
                    id: `ADD-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    reactionType: "addition",
                    scenario: add.scenario,
                    promptLatex: `\\text{${t("sc3_03.prompts.addition", { alkene: add.alkene, reagent: add.reagent })}}`,
                    expressionLatex: `\\ce{${add.alkene} + ${add.reagent} -> ?}`,
                    targetLatex: add.product,
                    slots: [{ id: "ans", labelLatex: "\\\\text{Product}", placeholder: "Formula", expected: add.product }],
                    correctLatex: `\\ce{${add.product}}`,
                    hintLatex: [`\\text{${t("sc3_03.prompts.hint_addition")}}`]
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
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<SC303Quest, Stage>({
    moduleCode: "sc3-03",
        buildPool,
        initialStage: "COMBUSTION",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("SC3.03", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "COMBUSTION", label: t("sc3_03.stages.combustion") },
        { id: "SUBSTITUTION", label: t("sc3_03.stages.substitution") },
        { id: "ADDITION", label: t("sc3_03.stages.addition") },
    ], [t]);

    const hint = getHint();

    const activeScenario = useMemo(() => {
        if (!currentQuest?.scenario) return null;
        const scenario = t(`sc3_03.scenarios.${currentQuest?.scenario}`, { defaultValue: "" });
        return scenario || null;
    }, [currentQuest, t]);

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      moduleCode="SC3.03"
            title={t("sc3_03.title")}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={stagesProps}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={t("sc3_03.footer_left")}
            translations={{
                back: t("sc3_03.back"),
                check: t("sc3_03.check"),
                next: t("sc3_03.next"),
                correct: t("sc3_03.correct"),
                incorrect: t("sc3_03.incorrect"),
                difficulty: {
                    BASIC: t("sc3_03.difficulty.BASIC"),
                    CORE: t("sc3_03.difficulty.CORE"),
                    ADVANCED: t("sc3_03.difficulty.ADVANCED"),
                    ELITE: t("sc3_03.difficulty.ELITE"),
                },
            }}
            monitorContent={
                <div className="flex flex-col h-full gap-4">
                    <div className="flex-1 min-h-[300px] bg-black/50 rounded-xl border border-white/10 overflow-hidden relative">
                        <OrganicReactionCanvas
                            stage={stage}
                            animationSpeed={animationSpeed}
                            showMechanism={showMechanism}
                            translations={t}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">{t("sc3_03.labels.animation_speed")}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.5"
                                    value={animationSpeed}
                                    onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-neon-purple"
                                />
                                <span className="text-[10px] font-mono text-white/60 w-16 text-right">{animationSpeed}x</span>
                            </div>
                        </div>
                        <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                            <span className="text-[10px] uppercase text-white/60 tracking-widest">{t("sc3_03.labels.show_mechanism")}</span>
                            <input
                                type="checkbox"
                                checked={showMechanism}
                                onChange={(e) => setShowMechanism(e.target.checked)}
                                className="w-4 h-4 rounded border-white/20 bg-black text-neon-purple focus:ring-neon-purple/50"
                            />
                        </label>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 flex justify-between">
                            <span>{t("sc3_03.labels.chemistry_score")}</span>
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
                                {t("sc3_03.objective_title")}
                            </h3>
                            <div className="text-3xl text-white font-black leading-tight max-w-2xl mx-auto">
                                <BlockMath>{currentQuest?.promptLatex}</BlockMath>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="p-8 bg-white/[0.03] border-2 border-neon-purple/30 rounded-3xl text-center relative shadow-[0_0_30px_rgba(255,0,255,0.05)]">
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-purple/40 animate-pulse" />
                                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black block mb-6">
                                    {t("sc3_03.labels.reaction_display")}
                                </span>
                                <div className="text-4xl text-white font-black">
                                    <InlineMath math={currentQuest?.expressionLatex || ""} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-10 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-neon-purple/50 group-hover:h-0 transition-all duration-700" />
                            <div className="space-y-8">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-neon-purple font-black flex items-center gap-2">
                                    <span className="w-8 h-px bg-neon-purple/30" />
                                    {t("sc3_03.labels.input_terminal")}
                                </div>

                                <div className="grid grid-cols-1 gap-8 justify-items-center">
                                    {currentQuest?.slots.map((slot: any) => (
                                        <div key={slot.id} className="w-full max-w-md space-y-3">
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/60">
                                                <InlineMath>{slot.labelLatex}</InlineMath>
                                                <span className="text-neon-purple/30 font-mono">CHEM_0x{slot.id.toUpperCase()}</span>
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    className="w-full bg-white/5 border-2 border-white/10 group-focus-within:border-neon-purple/50 p-6 text-center outline-none transition-all font-mono text-3xl text-white rounded-2xl shadow-inner uppercase"
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
                                                        {lastCheck.ok ? t("sc3_03.correct") : t("sc3_03.incorrect")}
                                                    </div>
                                                    <div className="text-sm font-medium opacity-70">
                                                        {lastCheck.ok ? t("sc3_03.feedback.correct") : t("sc3_03.feedback.incorrect")}
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
                                    {lastCheck?.ok ? t("sc3_03.next") : t("sc3_03.check")}
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
                            <div className="p-2 bg-neon-purple/20 rounded-lg text-neon-purple shadow-[0_0_15px_rgba(255,0,255,0.1)]">
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
