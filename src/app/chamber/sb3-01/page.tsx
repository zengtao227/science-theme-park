"use client";

import { useEffect, useCallback, useMemo } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import EcosystemVisualization from "@/components/chamber/sb3-01/EcosystemVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "FOOD_CHAINS" | "NUTRIENT_CYCLES" | "POPULATION_DYNAMICS";

interface SB301Quest extends Quest {
    stage: Stage;
    ecosystemType?: string;
}

type SB301T = typeof translations.EN.sb3_01;

export default function SB301Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = (translations[currentLanguage]?.sb3_01 || translations.EN.sb3_01) as SB301T;

    const buildStagePool = useCallback((difficulty: Difficulty, stage: Stage): SB301Quest[] => {
        const quests: SB301Quest[] = [];

        if (stage === "FOOD_CHAINS") {
            if (difficulty === "BASIC") {
                quests.push(
                    {
                        id: "FC-B1", difficulty, stage, ecosystemType: "forest",
                        promptLatex: `\\text{In a food chain: Grass} \\to \\text{Rabbit} \\to \\text{Fox, what is the rabbit?}`,
                        expressionLatex: `\\text{Producer, Consumer, or Decomposer?}`,
                        targetLatex: `\\text{Role}`,
                        slots: [{ id: "role", labelLatex: `\\text{Rabbit is}`, placeholder: "consumer", expected: "consumer" }],
                        correctLatex: `\\text{Primary Consumer (herbivore)}`,
                        hintLatex: [`\\text{Rabbit eats plants}`]
                    },
                    {
                        id: "FC-B2", difficulty, stage, ecosystemType: "aquatic",
                        promptLatex: `\\text{Energy flows from sun to algae to fish. What percentage reaches fish?}`,
                        expressionLatex: `\\text{Typically } 10\\% \\text{ per trophic level}`,
                        targetLatex: `\\text{Percent}`,
                        slots: [{ id: "percent", labelLatex: `\\%`, placeholder: "10", expected: 10 }],
                        correctLatex: `10\\% \\text{ (10\\% rule)}`,
                        hintLatex: [`\\text{Only 10\\% energy transfers up}`]
                    },
                    {
                        id: "FC-B3", difficulty, stage, ecosystemType: "forest",
                        promptLatex: `\\text{Which organism is a producer: Oak tree, Deer, or Mushroom?}`,
                        expressionLatex: `\\text{Producers make their own food via photosynthesis}`,
                        targetLatex: `\\text{Organism}`,
                        slots: [{ id: "producer", labelLatex: `\\text{Producer}`, placeholder: "oak", expected: "oak" }],
                        correctLatex: `\\text{Oak tree (photosynthesis)}`,
                        hintLatex: [`\\text{Trees use sunlight to make food}`]
                    },
                    {
                        id: "FC-B4", difficulty, stage, ecosystemType: "decomposer",
                        promptLatex: `\\text{Bacteria break down dead leaves. What are they called?}`,
                        expressionLatex: `\\text{Decomposers recycle nutrients}`,
                        targetLatex: `\\text{Role}`,
                        slots: [{ id: "role", labelLatex: `\\text{Role}`, placeholder: "decomposer", expected: "decomposer" }],
                        correctLatex: `\\text{Decomposers}`,
                        hintLatex: [`\\text{They decompose dead matter}`]
                    },
                    {
                        id: "FC-B5", difficulty, stage, ecosystemType: "pyramid",
                        promptLatex: `\\text{In energy pyramid, which level has most energy: producers or top predators?}`,
                        expressionLatex: `\\text{Energy decreases up the pyramid}`,
                        targetLatex: `\\text{Level}`,
                        slots: [{ id: "level", labelLatex: `\\text{Most energy}`, placeholder: "producers", expected: "producers" }],
                        correctLatex: `\\text{Producers (bottom level)}`,
                        hintLatex: [`\\text{Energy is lost at each level}`]
                    }
                );
            }
        }

        if (stage === "NUTRIENT_CYCLES") {
            if (difficulty === "CORE") {
                quests.push(
                    {
                        id: "NC-C1", difficulty, stage, ecosystemType: "carbon",
                        promptLatex: `\\text{Plants absorb CO}_2\\text{ during photosynthesis. What do they release?}`,
                        expressionLatex: `\\text{Photosynthesis: } 6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\to \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2`,
                        targetLatex: `\\text{Gas}`,
                        slots: [{ id: "gas", labelLatex: `\\text{Released}`, placeholder: "oxygen", expected: "oxygen" }],
                        correctLatex: `\\text{Oxygen (O}_2\\text{)}`,
                        hintLatex: [`\\text{Look at the products}`]
                    },
                    {
                        id: "NC-C2", difficulty, stage, ecosystemType: "nitrogen",
                        promptLatex: `\\text{Nitrogen-fixing bacteria convert N}_2\\text{ gas into what usable form?}`,
                        expressionLatex: `\\text{Plants need nitrogen in compound form}`,
                        targetLatex: `\\text{Compound}`,
                        slots: [{ id: "compound", labelLatex: `\\text{Form}`, placeholder: "nitrate", expected: "nitrate" }],
                        correctLatex: `\\text{Nitrate (NO}_3^-\\text{) or Ammonia (NH}_3\\text{)}`,
                        hintLatex: [`\\text{Nitrate or ammonia}`]
                    },
                    {
                        id: "NC-C3", difficulty, stage, ecosystemType: "water",
                        promptLatex: `\\text{Water evaporates from Rhine River. What process is this?}`,
                        expressionLatex: `\\text{Liquid} \\to \\text{Gas}`,
                        targetLatex: `\\text{Process}`,
                        slots: [{ id: "process", labelLatex: `\\text{Process}`, placeholder: "evaporation", expected: "evaporation" }],
                        correctLatex: `\\text{Evaporation}`,
                        hintLatex: [`\\text{Water becomes vapor}`]
                    },
                    {
                        id: "NC-C4", difficulty, stage, ecosystemType: "carbon",
                        promptLatex: `\\text{Animals release CO}_2\\text{ during which process?}`,
                        expressionLatex: `\\text{Cellular respiration releases CO}_2`,
                        targetLatex: `\\text{Process}`,
                        slots: [{ id: "process", labelLatex: `\\text{Process}`, placeholder: "respiration", expected: "respiration" }],
                        correctLatex: `\\text{Cellular respiration}`,
                        hintLatex: [`\\text{Breathing releases CO}_2`]
                    },
                    {
                        id: "NC-C5", difficulty, stage, ecosystemType: "decomposition",
                        promptLatex: `\\text{Dead organisms return nutrients to soil. What role do decomposers play?}`,
                        expressionLatex: `\\text{Decomposers recycle nutrients}`,
                        targetLatex: `\\text{Role}`,
                        slots: [{ id: "role", labelLatex: `\\text{Role}`, placeholder: "recycling", expected: "recycling" }],
                        correctLatex: `\\text{Nutrient recycling}`,
                        hintLatex: [`\\text{They break down and recycle}`]
                    }
                );
            }
        }

        if (stage === "POPULATION_DYNAMICS") {
            if (difficulty === "ADVANCED") {
                quests.push(
                    {
                        id: "PD-A1", difficulty, stage, ecosystemType: "growth",
                        promptLatex: `\\text{Population grows from 100 to 200 in 1 year. What is growth rate?}`,
                        expressionLatex: `\\text{Growth rate} = \\frac{\\Delta N}{N \\cdot \\Delta t}`,
                        targetLatex: `\\text{Rate}`,
                        slots: [{ id: "rate", labelLatex: `\\text{Rate}`, placeholder: "1", expected: 1 }],
                        correctLatex: `1.0 \\text{ or } 100\\%`,
                        hintLatex: [`\\text{(200-100)/100 = 1}`]
                    },
                    {
                        id: "PD-A2", difficulty, stage, ecosystemType: "carrying",
                        promptLatex: `\\text{Maximum population an ecosystem can support is called?}`,
                        expressionLatex: `\\text{Limited by resources}`,
                        targetLatex: `\\text{Term}`,
                        slots: [{ id: "term", labelLatex: `\\text{Term}`, placeholder: "carrying capacity", expected: "carrying capacity" }],
                        correctLatex: `\\text{Carrying capacity (K)}`,
                        hintLatex: [`\\text{Carrying capacity}`]
                    },
                    {
                        id: "PD-A3", difficulty, stage, ecosystemType: "predator",
                        promptLatex: `\\text{If prey population increases, what happens to predator population?}`,
                        expressionLatex: `\\text{More food} \\to \\text{More predators}`,
                        targetLatex: `\\text{Change}`,
                        slots: [{ id: "change", labelLatex: `\\text{Change}`, placeholder: "increase", expected: "increase" }],
                        correctLatex: `\\text{Increases (with delay)}`,
                        hintLatex: [`\\text{More food supports more predators}`]
                    },
                    {
                        id: "PD-A4", difficulty, stage, ecosystemType: "competition",
                        promptLatex: `\\text{Two species compete for same food. What is this called?}`,
                        expressionLatex: `\\text{Competition for resources}`,
                        targetLatex: `\\text{Type}`,
                        slots: [{ id: "type", labelLatex: `\\text{Type}`, placeholder: "competition", expected: "competition" }],
                        correctLatex: `\\text{Interspecific competition}`,
                        hintLatex: [`\\text{Competition between species}`]
                    },
                    {
                        id: "PD-A5", difficulty, stage, ecosystemType: "limiting",
                        promptLatex: `\\text{Factor that limits population growth is called?}`,
                        expressionLatex: `\\text{Food, water, space, etc.}`,
                        targetLatex: `\\text{Factor}`,
                        slots: [{ id: "factor", labelLatex: `\\text{Factor}`, placeholder: "limiting factor", expected: "limiting factor" }],
                        correctLatex: `\\text{Limiting factor}`,
                        hintLatex: [`\\text{Limits growth}`]
                    }
                );
            }
        }

        return quests;
    }, []);

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
    } = useQuestManager<SB301Quest, Stage>({
        buildPool,
        initialStage: "FOOD_CHAINS",
    });

    useEffect(() => {
        if (lastCheck?.ok) {
            completeStage("sb3-01", stage);
        }
    }, [lastCheck, completeStage, stage]);

    const stagesProps = useMemo(() => [
        { id: "FOOD_CHAINS" as Stage, label: t.stages.food_chains },
        { id: "NUTRIENT_CYCLES" as Stage, label: t.stages.nutrient_cycles },
        { id: "POPULATION_DYNAMICS" as Stage, label: t.stages.population_dynamics },
    ], [t.stages]);

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
                        {t.scenarios[stage.toLowerCase() as keyof typeof t.scenarios]}
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
