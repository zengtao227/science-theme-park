"use client";

import { useState, useCallback, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import PlantVisualization from "@/components/chamber/sb1-04/PlantVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "PLANT_STRUCTURE" | "WATER_TRANSPORT" | "NUTRIENT_TRANSPORT";

interface SB104Quest extends Quest {
    stage: Stage;
    structure?: string;
    function?: string;
}

export default function SB104PlantStructure() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const sb1_04_t = useMemo(() => ({
        title: t("sb1_04.title"),
        back: t("sb1_04.back"),
        difficulty: {
            basic: t("sb1_04.difficulty.basic"),
            core: t("sb1_04.difficulty.core"),
            advanced: t("sb1_04.difficulty.advanced"),
            elite: t("sb1_04.difficulty.elite")
        },
        stages: {
            plant_structure: t("sb1_04.stages.plant_structure"),
            water_transport: t("sb1_04.stages.water_transport"),
            nutrient_transport: t("sb1_04.stages.nutrient_transport")
        },
        scenarios: {
            plant_structure: t("sb1_04.scenarios.plant_structure"),
            water_transport: t("sb1_04.scenarios.water_transport"),
            nutrient_transport: t("sb1_04.scenarios.nutrient_transport")
        },
        footer_left: t("sb1_04.footer_left"),
        check: t("sb1_04.check"),
        next: t("sb1_04.next"),
        correct: t("sb1_04.correct"),
        incorrect: t("sb1_04.incorrect")
    }), [t]);

    const buildStagePool = useCallback((
        tObj: typeof sb1_04_t,
        difficulty: Difficulty,
        stage: Stage
    ): SB104Quest[] => {
        if (stage === "PLANT_STRUCTURE") {
            const structureData = {
                BASIC: [
                    { structure: "root", function: "absorption", prompt: "What absorbs water and minerals?" },
                    { structure: "stem", function: "support", prompt: "What supports the plant and transports materials?" },
                    { structure: "leaf", function: "photosynthesis", prompt: "Where does photosynthesis occur?" },
                    { structure: "flower", function: "reproduction", prompt: "What is the reproductive organ?" },
                    { structure: "root_hair", function: "absorption", prompt: "What increases surface area for absorption?" }
                ],
                CORE: [
                    { structure: "xylem", function: "water", prompt: "Which tissue transports water upward?" },
                    { structure: "phloem", function: "sugar", prompt: "Which tissue transports sugars?" },
                    { structure: "stomata", function: "gas_exchange", prompt: "Where does gas exchange occur in leaves?" },
                    { structure: "chloroplast", function: "photosynthesis", prompt: "Which organelle performs photosynthesis?" },
                    { structure: "epidermis", function: "protection", prompt: "Which layer protects the plant?" }
                ],
                ADVANCED: [
                    { structure: "transpiration", function: "pull", prompt: "What creates the pull for water transport?" },
                    { structure: "cohesion", function: "water_column", prompt: "What keeps water molecules together in xylem?" },
                    { structure: "adhesion", function: "wall_attachment", prompt: "What makes water stick to xylem walls?" },
                    { structure: "guard_cells", function: "stomata_control", prompt: "What controls stomata opening?" },
                    { structure: "mesophyll", function: "photosynthesis", prompt: "Which leaf tissue has most chloroplasts?" }
                ],
                ELITE: [
                    { structure: "casparian_strip", function: "selective", prompt: "What forces selective absorption in roots?" },
                    { structure: "companion_cells", function: "phloem_support", prompt: "What supports sieve tube elements?" },
                    { structure: "apoplast", function: "cell_wall_pathway", prompt: "What is the cell wall transport pathway?" },
                    { structure: "symplast", function: "cytoplasm_pathway", prompt: "What is the cytoplasm transport pathway?" },
                    { structure: "source_sink", function: "phloem_direction", prompt: "What determines phloem transport direction?" }
                ]
            };

            return structureData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                structure: item.structure,
                promptLatex: item.prompt,
                expressionLatex: `\\text{Structure: } ${item.structure}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: "Function",
                    placeholder: "type answer",
                    expected: item.function
                }],
                correctLatex: `\\text{Answer: } ${item.function}`,
                answer: item.function as string
            }));
        }

        if (stage === "WATER_TRANSPORT") {
            const waterData = {
                BASIC: [
                    { process: "absorption", location: "roots", prompt: "Where does water enter the plant?" },
                    { process: "transpiration", location: "leaves", prompt: "Where does water exit the plant?" },
                    { process: "transport", tissue: "xylem", prompt: "Which tissue transports water?" },
                    { process: "evaporation", location: "stomata", prompt: "Where does water evaporate?" },
                    { process: "uptake", structure: "root_hairs", prompt: "What increases water uptake?" }
                ],
                CORE: [
                    { factor: "temperature", effect: "increase", prompt: "High temperature does what to transpiration?" },
                    { factor: "humidity", effect: "decrease", prompt: "High humidity does what to transpiration?" },
                    { factor: "wind", effect: "increase", prompt: "Wind does what to transpiration?" },
                    { factor: "light", effect: "increase", prompt: "Light does what to transpiration?" },
                    { factor: "water_availability", effect: "stomata_close", prompt: "Low water causes stomata to?" }
                ],
                ADVANCED: [
                    { mechanism: "cohesion_tension", force: "negative", prompt: "What type of pressure in xylem?" },
                    { mechanism: "root_pressure", force: "positive", prompt: "What pushes water up at night?" },
                    { mechanism: "capillary_action", force: "adhesion", prompt: "What helps water rise in narrow tubes?" },
                    { mechanism: "transpiration_pull", force: "tension", prompt: "What creates the main pulling force?" },
                    { mechanism: "guttation", condition: "high_humidity", prompt: "When does water droplet formation occur?" }
                ],
                ELITE: [
                    { adaptation: "xerophyte", feature: "thick_cuticle", prompt: "Desert plant adaptation?" },
                    { adaptation: "hydrophyte", feature: "aerenchyma", prompt: "Aquatic plant adaptation?" },
                    { adaptation: "CAM", feature: "night_stomata", prompt: "Cactus stomata opening time?" },
                    { adaptation: "sunken_stomata", benefit: "reduce_transpiration", prompt: "Benefit of sunken stomata?" },
                    { adaptation: "rolled_leaves", benefit: "trap_humidity", prompt: "Why do some grasses roll leaves?" }
                ]
            };

            return waterData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                promptLatex: item.prompt,
                expressionLatex: `\\text{Water Transport Mechanism}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: "Answer",
                    placeholder: "type answer",
                    expected: ('location' in item ? item.location : undefined) || 
                             ('tissue' in item ? item.tissue : undefined) || 
                             ('structure' in item ? item.structure : undefined) || 
                             ('effect' in item ? item.effect : undefined) || 
                             ('force' in item ? item.force : undefined) || 
                             ('condition' in item ? item.condition : undefined) || 
                             ('feature' in item ? item.feature : undefined) || 
                             ('benefit' in item ? item.benefit : undefined) || "unknown"
                }],
                correctLatex: `\\text{Answer: } ${('location' in item ? item.location : undefined) || 
                              ('tissue' in item ? item.tissue : undefined) || 
                              ('structure' in item ? item.structure : undefined) || 
                              ('effect' in item ? item.effect : undefined) || 
                              ('force' in item ? item.force : undefined) || 
                              ('condition' in item ? item.condition : undefined) || 
                              ('feature' in item ? item.feature : undefined) || 
                              ('benefit' in item ? item.benefit : undefined) || "unknown"}`,
                answer: (('location' in item ? item.location : undefined) || 
                        ('tissue' in item ? item.tissue : undefined) || 
                        ('structure' in item ? item.structure : undefined) || 
                        ('effect' in item ? item.effect : undefined) || 
                        ('force' in item ? item.force : undefined) || 
                        ('condition' in item ? item.condition : undefined) || 
                        ('feature' in item ? item.feature : undefined) || 
                        ('benefit' in item ? item.benefit : undefined) || "unknown") as string
            }));
        }

        if (stage === "NUTRIENT_TRANSPORT") {
            const nutrientData = {
                BASIC: [
                    { nutrient: "sugar", tissue: "phloem", prompt: "Which tissue transports sugars?" },
                    { nutrient: "amino_acids", tissue: "phloem", prompt: "Which tissue transports amino acids?" },
                    { source: "leaves", product: "sugar", prompt: "Where are sugars produced?" },
                    { sink: "roots", use: "storage", prompt: "Where are sugars stored?" },
                    { sink: "fruits", use: "growth", prompt: "Where do sugars go for fruit development?" }
                ],
                CORE: [
                    { process: "translocation", direction: "bidirectional", prompt: "Phloem transport direction?" },
                    { process: "loading", location: "source", prompt: "Where are sugars loaded into phloem?" },
                    { process: "unloading", location: "sink", prompt: "Where are sugars unloaded from phloem?" },
                    { mechanism: "pressure_flow", type: "active", prompt: "What type of transport in phloem?" },
                    { cell_type: "sieve_tube", feature: "no_nucleus", prompt: "What is unique about sieve tubes?" }
                ],
                ADVANCED: [
                    { mechanism: "active_loading", energy: "ATP", prompt: "What energy source for phloem loading?" },
                    { mechanism: "symplastic", pathway: "plasmodesmata", prompt: "What connects cells in symplastic pathway?" },
                    { mechanism: "apoplastic", pathway: "cell_walls", prompt: "What is the apoplastic pathway?" },
                    { pressure: "turgor", effect: "flow", prompt: "What pressure drives phloem flow?" },
                    { relationship: "source_sink", factor: "concentration", prompt: "What determines flow direction?" }
                ],
                ELITE: [
                    { hormone: "auxin", transport: "polar", prompt: "Which hormone shows polar transport?" },
                    { hormone: "cytokinin", source: "roots", prompt: "Where are cytokinins produced?" },
                    { hormone: "gibberellin", effect: "growth", prompt: "What promotes stem elongation?" },
                    { signal: "systemic", type: "electrical", prompt: "What type of signal for rapid response?" },
                    { signal: "chemical", type: "hormonal", prompt: "What type of signal for slow response?" }
                ]
            };

            return nutrientData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                promptLatex: item.prompt,
                expressionLatex: `\\text{Nutrient Transport}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: "Answer",
                    placeholder: "type answer",
                    expected: ('tissue' in item ? item.tissue : undefined) || 
                             ('product' in item ? item.product : undefined) || 
                             ('use' in item ? item.use : undefined) || 
                             ('direction' in item ? item.direction : undefined) || 
                             ('location' in item ? item.location : undefined) || 
                             ('type' in item ? item.type : undefined) || 
                             ('feature' in item ? item.feature : undefined) || 
                             ('energy' in item ? item.energy : undefined) || 
                             ('pathway' in item ? item.pathway : undefined) || 
                             ('effect' in item ? item.effect : undefined) || 
                             ('factor' in item ? item.factor : undefined) || 
                             ('transport' in item ? item.transport : undefined) || 
                             ('source' in item ? item.source : undefined) || "unknown"
                }],
                correctLatex: `\\text{Answer: } ${('tissue' in item ? item.tissue : undefined) || 
                              ('product' in item ? item.product : undefined) || 
                              ('use' in item ? item.use : undefined) || 
                              ('direction' in item ? item.direction : undefined) || 
                              ('location' in item ? item.location : undefined) || 
                              ('type' in item ? item.type : undefined) || 
                              ('feature' in item ? item.feature : undefined) || 
                              ('energy' in item ? item.energy : undefined) || 
                              ('pathway' in item ? item.pathway : undefined) || 
                              ('effect' in item ? item.effect : undefined) || 
                              ('factor' in item ? item.factor : undefined) || 
                              ('transport' in item ? item.transport : undefined) || 
                              ('source' in item ? item.source : undefined) || "unknown"}`,
                answer: (('tissue' in item ? item.tissue : undefined) || 
                        ('product' in item ? item.product : undefined) || 
                        ('use' in item ? item.use : undefined) || 
                        ('direction' in item ? item.direction : undefined) || 
                        ('location' in item ? item.location : undefined) || 
                        ('type' in item ? item.type : undefined) || 
                        ('feature' in item ? item.feature : undefined) || 
                        ('energy' in item ? item.energy : undefined) || 
                        ('pathway' in item ? item.pathway : undefined) || 
                        ('effect' in item ? item.effect : undefined) || 
                        ('factor' in item ? item.factor : undefined) || 
                        ('transport' in item ? item.transport : undefined) || 
                        ('source' in item ? item.source : undefined) || "unknown") as string
            }));
        }

        return [];
    }, []);

    const {
        difficulty,
        stage,
        inputs,
        lastCheck,
        currentQuest,
        setInputs,
        verify,
        next,
        handleDifficultyChange,
        handleStageChange,
    } = useQuestManager<SB104Quest, Stage>({
        buildPool: (d, s) => buildStagePool(sb1_04_t, d, s),
        initialStage: "PLANT_STRUCTURE",
    });

    if (!currentQuest) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <ChamberLayout
            title={sb1_04_t.title}
            moduleCode="SB1.04"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "PLANT_STRUCTURE", label: sb1_04_t.stages.plant_structure },
                { id: "WATER_TRANSPORT", label: sb1_04_t.stages.water_transport },
                { id: "NUTRIENT_TRANSPORT", label: sb1_04_t.stages.nutrient_transport },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sb1_04_t.footer_left}
            translations={{
                back: sb1_04_t.back,
                difficulty: sb1_04_t.difficulty,
                check: sb1_04_t.check,
                next: sb1_04_t.next,
                correct: sb1_04_t.correct,
                incorrect: sb1_04_t.incorrect,
            }}
            monitorContent={
                <PlantVisualization
                    quest={currentQuest}
                    stage={stage}
                    translations={{
                        plant_structure: sb1_04_t.stages.plant_structure,
                        water_transport: sb1_04_t.stages.water_transport,
                        nutrient_transport: sb1_04_t.stages.nutrient_transport,
                    }}
                />
            }
        >
            <div className="flex flex-col gap-6">
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">
                        {stage === "PLANT_STRUCTURE" && sb1_04_t.stages.plant_structure}
                        {stage === "WATER_TRANSPORT" && sb1_04_t.stages.water_transport}
                        {stage === "NUTRIENT_TRANSPORT" && sb1_04_t.stages.nutrient_transport}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                        {stage === "PLANT_STRUCTURE" && sb1_04_t.scenarios.plant_structure}
                        {stage === "WATER_TRANSPORT" && sb1_04_t.scenarios.water_transport}
                        {stage === "NUTRIENT_TRANSPORT" && sb1_04_t.scenarios.nutrient_transport}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-black/30 rounded-xl p-6 border border-white/10"
                    >
                        <div className="mb-4">
                            <div className="text-white/50 text-sm mb-2">Question {currentQuest.id}</div>
                            <div className="text-white text-lg">{currentQuest.promptLatex}</div>
                        </div>

                        {currentQuest.slots.map((slot) => (
                            <div key={slot.id} className="flex items-center gap-4">
                                <label className="text-white/70 min-w-[120px]">{slot.labelLatex}:</label>
                                <input
                                    type="text"
                                    value={inputs[slot.id] || ""}
                                    onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                                    placeholder={slot.placeholder}
                                    className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                        ))}

                        {lastCheck && (
                            <div className={`mt-4 p-3 rounded-lg ${lastCheck.ok ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {lastCheck.ok ? sb1_04_t.correct : sb1_04_t.incorrect}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </ChamberLayout>
    );
}
