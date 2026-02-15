"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import EcosystemVisualization from "@/components/chamber/sb3-01/EcosystemVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "FOOD_CHAINS" | "ENERGY_FLOW" | "CYCLES";

interface SB301Quest extends Quest {
    stage: Stage;
    scenario?: string;
    data?: any;
}

type SB301T = typeof translations.EN.sb3_01;

export default function SB301Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sb3_01 || translations.EN.sb3_01) as SB301T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB301Quest[] => {
        const quests: SB301Quest[] = [];
        const isAdvanced = difficulty === "ADVANCED" || difficulty === "ELITE";

        if (stage === "FOOD_CHAINS") {
            const scenarios = [
                { p: "Algae", c: "Zooplankton", next: "Silver Carp", scenario: "rhine_river" },
                { p: "Waterweed", c: t.labels?.snails || "Snails", next: "Tench", scenario: "rhine_river" },
                { p: "Detritus", c: "Benthic Invertebrates", next: "Eel", scenario: "rhine_river" },
                { p: "Phytoplankton", c: "Mussels", next: "Cormorant", scenario: "rhine_river" }
            ];

            const filtered = isAdvanced ? scenarios : scenarios.slice(0, 2);

            filtered.forEach((item, idx) => {
                quests.push({
                    id: `FC-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: item.scenario,
                    promptLatex: `\\text{${t.prompts.food_chain.replace("{producer}", item.p).replace("{consumer}", item.c)}}`,
                    expressionLatex: `\\text{${item.p}} \\rightarrow \\text{${item.c}} \\rightarrow ?`,
                    targetLatex: `\\text{${item.next}}`,
                    slots: [{ id: "ans", labelLatex: "\\text{Level 3}", placeholder: "...", expected: item.next.toLowerCase() }],
                    correctLatex: item.next,
                    hintLatex: [`\\text{Think of common species in the Rhine.}`]
                });
            });
        }

        if (stage === "ENERGY_FLOW") {
            const scenarios = isAdvanced ? [
                { level: "Secondary", energy: 1250, expected: "125" },
                { level: "Tertiary", energy: 85, expected: "8.5" }
            ] : [
                { level: "Primary", energy: 10000, expected: "1000" },
                { level: "Primary", energy: 25000, expected: "2500" }
            ];

            scenarios.forEach((item, idx) => {
                quests.push({
                    id: `EF-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: "energy_pyramid",
                    promptLatex: `\\text{${t.prompts.energy_transfer.replace("{level}", item.level).replace("{energy}", item.energy.toString())}}`,
                    expressionLatex: `E_{next} = E_{current} \\times 10\\%`,
                    targetLatex: item.expected,
                    slots: [{ id: "ans", labelLatex: "\\text{Energy (kJ)}", placeholder: "0", expected: item.expected }],
                    correctLatex: `${item.expected}\\text{ kJ}`,
                    hintLatex: [`\\text{${t.prompts.hint_10percent}}`]
                });
            });
        }

        if (stage === "CYCLES") {
            const scenarios = [
                { cycle: "Carbon", process: "Photosynthesis", out: "Oxygen", scenario: "carbon_cycle" },
                { cycle: "Carbon", process: "Respiration", out: "CO2", scenario: "carbon_cycle" },
                { cycle: "Nitrogen", process: "Nitrogen Fixation", out: "Ammonia", scenario: "nitrogen_cycle" },
                { cycle: "Water", process: "Evaporation", out: "Water Vapor", scenario: "water_cycle" }
            ];

            const filtered = isAdvanced ? scenarios : scenarios.slice(0, 2);

            filtered.forEach((item, idx) => {
                quests.push({
                    id: `CYC-${difficulty}-${idx}`,
                    difficulty,
                    stage,
                    scenario: item.scenario,
                    promptLatex: `\\text{${t.prompts.cycle_process.replace("{cycle}", item.cycle).replace("{process}", item.process)}}`,
                    expressionLatex: `\\text{${item.process}} \\rightarrow ?`,
                    targetLatex: `\\text{${item.out}}`,
                    slots: [{ id: "ans", labelLatex: "\\text{Product}", placeholder: "...", expected: item.out.toLowerCase() }],
                    correctLatex: item.out,
                    hintLatex: [`\\text{${t.prompts.hint_cycle}}`]
                });
            });
        }

        return quests;
    }, [t]);

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
    } = useQuestManager<SB301Quest, Stage>({
        buildPool: buildStagePool,
        initialStage: "FOOD_CHAINS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb3-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "FOOD_CHAINS" as Stage, label: t.stages.food_chains },
        { id: "ENERGY_FLOW" as Stage, label: t.stages.energy_flow },
        { id: "CYCLES" as Stage, label: t.stages.cycles },
    ], [t.stages]);

    const activeScenario = useMemo(() => {
        if (currentQuest?.scenario && t.scenarios[currentQuest.scenario as keyof typeof t.scenarios]) {
            return t.scenarios[currentQuest.scenario as keyof typeof t.scenarios];
        }
        const keys = Object.keys(t.scenarios);
        return t.scenarios[keys[0] as keyof typeof t.scenarios];
    }, [t, currentQuest]);

    if (!currentQuest) {
        return (
            <ChamberLayout
                title={t.title}
                moduleCode="SB3.01"
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                stages={stagesProps}
                currentStage={stage}
                onStageChange={(s) => handleStageChange(s as Stage)}
                footerLeft={t.footer_left}
                translations={{
                    back: t.back,
                    check: t.check,
                    next: t.next,
                    correct: t.correct,
                    incorrect: t.incorrect,
                    difficulty: t.difficulty,
                }}
                monitorContent={<EcosystemVisualization quest={null} stage={stage} />}
            >
                <div className="text-center text-green-400 text-xl">Module Complete!</div>
            </ChamberLayout>
        );
    }

    return (
        <ChamberLayout
            title={t.title}
            moduleCode="SB3.01"
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
                difficulty: t.difficulty,
            }}
            monitorContent={<EcosystemVisualization quest={currentQuest} stage={stage} />}
        >
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/30">
                    <h3 className="text-green-400 font-bold mb-2">{t.objective_title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {activeScenario}
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
                    <div className="text-lg">
                        <InlineMath math={currentQuest.promptLatex} />
                    </div>

                    <div className="text-green-300">
                        <InlineMath math={currentQuest.expressionLatex} />
                    </div>

                    <div className="space-y-3">
                        {currentQuest.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-3">
                                <InlineMath math={slot.labelLatex} />
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    placeholder={slot.placeholder}
                                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                                    disabled={lastCheck?.ok}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
