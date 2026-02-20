"use client";

import { useState, useCallback, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import AnimalVisualization from "@/components/chamber/sb1-05/AnimalVisualization";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import { AnimatePresence, motion } from "framer-motion";

type Stage = "ANIMAL_CLASSIFICATION" | "ADAPTATIONS" | "BEHAVIOR_EVOLUTION";

interface SB105Quest extends Quest {
    stage: Stage;
    animalName: string;
    scientificName: string;
    baselContext?: string;
}

export default function SB105AnimalClassification() {
    const { completeStage } = useAppStore();
    const { t } = useLanguage();

    const sb1_05_t = useMemo(() => ({
        title: t("sb1_05.title"),
        back: t("sb1_05.back"),
        difficulty: {
            basic: t("sb1_05.difficulty.basic"),
            core: t("sb1_05.difficulty.core"),
            advanced: t("sb1_05.difficulty.advanced"),
            elite: t("sb1_05.difficulty.elite")
        },
        stages: {
            animal_classification: t("sb1_05.stages.animal_classification"),
            adaptations: t("sb1_05.stages.adaptations"),
            behavior_evolution: t("sb1_05.stages.behavior_evolution")
        },
        scenarios: {
            basel_zoo: t("sb1_05.scenarios.basel_zoo"),
            rhine_river: t("sb1_05.scenarios.rhine_river"),
            alpine_animals: t("sb1_05.scenarios.alpine_animals"),
            wildlife_conservation: t("sb1_05.scenarios.wildlife_conservation")
        },
        footer_left: t("sb1_05.footer_left"),
        check: t("sb1_05.check"),
        next: t("sb1_05.next"),
        correct: t("sb1_05.correct"),
        incorrect: t("sb1_05.incorrect")
    }), [t]);

    const buildStagePool = useCallback((
        tObj: typeof sb1_05_t,
        difficulty: Difficulty,
        stage: Stage
    ): SB105Quest[] => {
        // ANIMAL_CLASSIFICATION stage - 40% of quests per difficulty
        if (stage === "ANIMAL_CLASSIFICATION") {
            const classificationData = {
                BASIC: [
                    { animal: "Dog", scientific: "\\textit{Canis familiaris}", answer: "Mammalia", prompt: "What class does a dog belong to?" },
                    { animal: "Robin", scientific: "\\textit{Erithacus rubecula}", answer: "Aves", prompt: "What class does a robin belong to?" },
                    { animal: "Frog", scientific: "\\textit{Rana temporaria}", answer: "Amphibia", prompt: "What class does a frog belong to?" },
                    { animal: "Snake", scientific: "\\textit{Natrix natrix}", answer: "Reptilia", prompt: "What class does a snake belong to?" },
                    { animal: "Trout", scientific: "\\textit{Salmo trutta}", answer: "Pisces", prompt: "What class does a trout belong to?" },
                    { animal: "Butterfly", scientific: "\\textit{Vanessa atalanta}", answer: "Insecta", prompt: "What class does a butterfly belong to?" },
                    { animal: "Spider", scientific: "\\textit{Araneus diadematus}", answer: "Arachnida", prompt: "What class does a spider belong to?" },
                    { animal: "Snail", scientific: "\\textit{Helix pomatia}", answer: "Gastropoda", prompt: "What class does a snail belong to?" },
                ],
                CORE: [
                    { animal: "Bat", scientific: "\\textit{Myotis myotis}", answer: "Mammalia", prompt: "Despite flying, what class is a bat?" },
                    { animal: "Penguin", scientific: "\\textit{Spheniscus demersus}", answer: "Aves", prompt: "Despite swimming, what class is a penguin?" },
                    { animal: "Salamander", scientific: "\\textit{Salamandra salamandra}", answer: "Amphibia", prompt: "What class has moist skin and metamorphosis?" },
                    { animal: "Turtle", scientific: "\\textit{Testudo hermanni}", answer: "Reptilia", prompt: "What class has a shell and lays eggs on land?" },
                    { animal: "Shark", scientific: "\\textit{Carcharodon carcharias}", answer: "Chondrichthyes", prompt: "What class has a cartilage skeleton?" },
                    { animal: "Crab", scientific: "\\textit{Cancer pagurus}", answer: "Crustacea", prompt: "What class has an exoskeleton and gills?" },
                    { animal: "Octopus", scientific: "\\textit{Octopus vulgaris}", answer: "Cephalopoda", prompt: "What class has eight arms and a beak?" },
                    { animal: "Earthworm", scientific: "\\textit{Lumbricus terrestris}", answer: "Annelida", prompt: "What phylum has segmented bodies?" },
                ],
                ADVANCED: [
                    { animal: "Platypus", scientific: "\\textit{Ornithorhynchus anatinus}", answer: "Mammalia", prompt: "What class lays eggs but produces milk?" },
                    { animal: "Seahorse", scientific: "\\textit{Hippocampus hippocampus}", answer: "Osteichthyes", prompt: "What class has bony fish characteristics?" },
                    { animal: "Newt", scientific: "\\textit{Triturus cristatus}", answer: "Amphibia", prompt: "What class has aquatic larvae and terrestrial adults?" },
                    { animal: "Crocodile", scientific: "\\textit{Crocodylus niloticus}", answer: "Reptilia", prompt: "What class is most closely related to birds?" },
                    { animal: "Jellyfish", scientific: "\\textit{Aurelia aurita}", answer: "Cnidaria", prompt: "What phylum has stinging cells?" },
                    { animal: "Starfish", scientific: "\\textit{Asterias rubens}", answer: "Echinodermata", prompt: "What phylum has radial symmetry and tube feet?" },
                ],
                ELITE: [
                    { animal: "European Lynx", scientific: "\\textit{Lynx lynx}", answer: "Carnivora", prompt: "What order does the lynx belong to?" },
                    { animal: "Alpine Ibex", scientific: "\\textit{Capra ibex}", answer: "Artiodactyla", prompt: "What order has even-toed ungulates?" },
                    { animal: "European Beaver", scientific: "\\textit{Castor fiber}", answer: "Rodentia", prompt: "What order has continuously growing incisors?" },
                    { animal: "Peregrine Falcon", scientific: "\\textit{Falco peregrinus}", answer: "Falconiformes", prompt: "What order includes birds of prey?" },
                ]
            };

            return classificationData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                animalName: item.animal,
                scientificName: item.scientific,
                promptLatex: item.prompt,
                expressionLatex: `${item.scientific}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: "Classification",
                    placeholder: "type answer",
                    expected: item.answer
                }],
                correctLatex: `\\\\text{Answer: } ${item.answer}`,
                answer: item.answer,
                baselContext: idx % 4 === 0 ? tObj.scenarios.basel_zoo : undefined
            }));
        }

        // ADAPTATIONS stage - 35% of quests per difficulty
        if (stage === "ADAPTATIONS") {
            const adaptationData = {
                BASIC: [
                    { animal: "Polar Bear", scientific: "\\textit{Ursus maritimus}", answer: "arctic", prompt: "What environment is the polar bear adapted to?" },
                    { animal: "Camel", scientific: "\\textit{Camelus dromedarius}", answer: "desert", prompt: "What environment is the camel adapted to?" },
                    { animal: "Dolphin", scientific: "\\textit{Tursiops truncatus}", answer: "aquatic", prompt: "What environment is the dolphin adapted to?" },
                    { animal: "Owl", scientific: "\\textit{Strix aluco}", answer: "forest", prompt: "What environment is the owl adapted to?" },
                    { animal: "Alpine Ibex", scientific: "\\textit{Capra ibex}", answer: "alpine", prompt: "What environment is the ibex adapted to?" },
                    { animal: "Seal", scientific: "\\textit{Phoca vitulina}", answer: "aquatic", prompt: "What environment is the seal adapted to?" },
                    { animal: "Fox", scientific: "\\textit{Vulpes vulpes}", answer: "forest", prompt: "What environment is the fox adapted to?" },
                ],
                CORE: [
                    { animal: "Arctic Fox", scientific: "\\textit{Vulpes lagopus}", answer: "white_fur", prompt: "What adaptation helps arctic fox camouflage?" },
                    { animal: "Cactus", scientific: "\\textit{Opuntia ficus-indica}", answer: "water_storage", prompt: "What adaptation helps cacti survive drought?" },
                    { animal: "Fish", scientific: "\\textit{Salmo trutta}", answer: "gills", prompt: "What adaptation allows fish to breathe underwater?" },
                    { animal: "Deer", scientific: "\\textit{Cervus elaphus}", answer: "camouflage", prompt: "What adaptation helps deer hide in forests?" },
                    { animal: "Marmot", scientific: "\\textit{Marmota marmota}", answer: "hibernation", prompt: "What adaptation helps marmots survive winter?" },
                    { animal: "Whale", scientific: "\\textit{Balaenoptera musculus}", answer: "blubber", prompt: "What adaptation insulates whales in cold water?" },
                    { animal: "Eagle", scientific: "\\textit{Aquila chrysaetos}", answer: "keen_vision", prompt: "What adaptation helps eagles hunt?" },
                ],
                ADVANCED: [
                    { animal: "Alpine Ibex", scientific: "\\textit{Capra ibex}", answer: "split_hooves", prompt: "What adaptation helps ibex climb steep rocks?" },
                    { animal: "Rhine Salmon", scientific: "\\textit{Salmo salar}", answer: "osmoregulation", prompt: "What allows salmon to live in fresh and salt water?" },
                    { animal: "European Hedgehog", scientific: "\\textit{Erinaceus europaeus}", answer: "spines", prompt: "What physical defense does a hedgehog have?" },
                    { animal: "Grey Heron", scientific: "\\textit{Ardea cinerea}", answer: "long_legs", prompt: "What adaptation helps herons hunt in water?" },
                    { animal: "European Eel", scientific: "\\textit{Anguilla anguilla}", answer: "migration", prompt: "What behavior helps eels reproduce?" },
                ],
                ELITE: [
                    { animal: "European Beaver", scientific: "\\textit{Castor fiber}", answer: "dam_building", prompt: "What behavior creates beaver habitat?" },
                    { animal: "Peregrine Falcon", scientific: "\\textit{Falco peregrinus}", answer: "urban_adaptation", prompt: "How have falcons adapted to Basel?" },
                    { animal: "European Lynx", scientific: "\\textit{Lynx lynx}", answer: "reintroduction", prompt: "What conservation strategy helped lynx return?" },
                ]
            };

            return adaptationData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                animalName: item.animal,
                scientificName: item.scientific,
                promptLatex: item.prompt,
                expressionLatex: `${item.scientific}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: "Adaptation",
                    placeholder: "type answer",
                    expected: item.answer
                }],
                correctLatex: `\\\\text{Answer: } ${item.answer}`,
                answer: item.answer,
                baselContext: idx % 3 === 0 ? (idx % 2 === 0 ? tObj.scenarios.rhine_river : tObj.scenarios.alpine_animals) : undefined
            }));
        }

        // BEHAVIOR_EVOLUTION stage - 25% of quests per difficulty
        if (stage === "BEHAVIOR_EVOLUTION") {
            const behaviorData = {
                BASIC: [
                    { animal: "Robin", scientific: "\\textit{Erithacus rubecula}", answer: "defense", prompt: "Why do robins sing?" },
                    { animal: "Bee", scientific: "\\textit{Apis mellifera}", answer: "feeding", prompt: "What is the purpose of bee foraging?" },
                    { animal: "Salmon", scientific: "\\textit{Salmo salar}", answer: "reproduction", prompt: "Why do salmon migrate upstream?" },
                    { animal: "Hedgehog", scientific: "\\textit{Erinaceus europaeus}", answer: "defense", prompt: "Why do hedgehogs curl into a ball?" },
                    { animal: "Bird", scientific: "\\textit{Turdus merula}", answer: "migration", prompt: "Why do some birds fly south in winter?" },
                ],
                CORE: [
                    { animal: "European Hedgehog", scientific: "\\textit{Erinaceus europaeus}", answer: "hibernation", prompt: "What behavior conserves energy in winter?" },
                    { animal: "European Bee-eater", scientific: "\\textit{Merops apiaster}", answer: "migration", prompt: "What behavior follows insect availability?" },
                    { animal: "Wolf", scientific: "\\textit{Canis lupus}", answer: "pack_hunting", prompt: "What social behavior helps wolves hunt?" },
                    { animal: "Beaver", scientific: "\\textit{Castor fiber}", answer: "dam_building", prompt: "What behavior modifies beaver habitat?" },
                    { animal: "Owl", scientific: "\\textit{Strix aluco}", answer: "nocturnal", prompt: "What behavior helps owls avoid competition?" },
                ],
                ADVANCED: [
                    { animal: "European Bee-eater", scientific: "\\textit{Merops apiaster}", answer: "10000_km", prompt: "How far do bee-eaters migrate?" },
                    { animal: "Alpine Marmot", scientific: "\\textit{Marmota marmota}", answer: "6_months", prompt: "How long do marmots hibernate?" },
                    { animal: "Grey Heron", scientific: "\\textit{Ardea cinerea}", answer: "patience", prompt: "What hunting strategy do herons use?" },
                    { animal: "European Eel", scientific: "\\textit{Anguilla anguilla}", answer: "Sargasso_Sea", prompt: "Where do European eels spawn?" },
                ],
                ELITE: [
                    { animal: "European Beaver", scientific: "\\textit{Castor fiber}", answer: "ecosystem_engineer", prompt: "What role do beavers play in ecosystems?" },
                    { animal: "Peregrine Falcon", scientific: "\\textit{Falco peregrinus}", answer: "urban_nesting", prompt: "How have falcons adapted to cities?" },
                    { animal: "European Lynx", scientific: "\\textit{Lynx lynx}", answer: "recolonization", prompt: "What process brought lynx back to Switzerland?" },
                ]
            };

            return behaviorData[difficulty].map((item, idx) => ({
                id: `${stage}_${difficulty}_${idx + 1}`,
                difficulty,
                stage,
                animalName: item.animal,
                scientificName: item.scientific,
                promptLatex: item.prompt,
                expressionLatex: `${item.scientific}`,
                targetLatex: "answer",
                slots: [{
                    id: "answer",
                    labelLatex: "Behavior",
                    placeholder: "type answer",
                    expected: item.answer
                }],
                correctLatex: `\\\\text{Answer: } ${item.answer}`,
                answer: item.answer,
                baselContext: idx % 3 === 0 ? tObj.scenarios.wildlife_conservation : undefined
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
      adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<SB105Quest, Stage>({
    moduleCode: "sb1-05",
        buildPool: (d, s) => buildStagePool(sb1_05_t, d, s),
        initialStage: "ANIMAL_CLASSIFICATION",
    });

    if (!currentQuest) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    // Determine which Basel scenario to display
    const getScenarioText = () => {
        if (currentQuest?.baselContext) {
            return currentQuest?.baselContext;
        }
        // Default scenario based on stage
        if (stage === "ANIMAL_CLASSIFICATION") return sb1_05_t.scenarios.basel_zoo;
        if (stage === "ADAPTATIONS") return sb1_05_t.scenarios.rhine_river;
        return sb1_05_t.scenarios.wildlife_conservation;
    };

    return (
        <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={sb1_05_t.title}
            moduleCode="SB1.05"
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            stages={[
                { id: "ANIMAL_CLASSIFICATION", label: sb1_05_t.stages.animal_classification },
                { id: "ADAPTATIONS", label: sb1_05_t.stages.adaptations },
                { id: "BEHAVIOR_EVOLUTION", label: sb1_05_t.stages.behavior_evolution },
            ]}
            currentStage={stage}
            onStageChange={(s) => handleStageChange(s as Stage)}
            onVerify={verify}
            onNext={next}
            checkStatus={lastCheck}
            footerLeft={sb1_05_t.footer_left}
            translations={{
                back: sb1_05_t.back,
                difficulty: sb1_05_t.difficulty,
                check: sb1_05_t.check,
                next: sb1_05_t.next,
                correct: sb1_05_t.correct,
                incorrect: sb1_05_t.incorrect,
            }}
            monitorContent={
                <AnimalVisualization
                    quest={currentQuest}
                    stage={stage}
                    translations={{
                        animal_classification: sb1_05_t.stages.animal_classification,
                        adaptations: sb1_05_t.stages.adaptations,
                        behavior_evolution: sb1_05_t.stages.behavior_evolution,
                    }}
                />
            }
        >
            <div className="flex flex-col gap-6">
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">
                        {stage === "ANIMAL_CLASSIFICATION" && sb1_05_t.stages.animal_classification}
                        {stage === "ADAPTATIONS" && sb1_05_t.stages.adaptations}
                        {stage === "BEHAVIOR_EVOLUTION" && sb1_05_t.stages.behavior_evolution}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                        {getScenarioText()}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuest?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-black/30 rounded-xl p-6 border border-white/10"
                    >
                        <div className="mb-4">
                            <div className="text-white/50 text-sm mb-2">
                                {currentQuest?.animalName} - {currentQuest?.scientificName}
                            </div>
                            <div className="text-white text-lg">{currentQuest?.promptLatex}</div>
                        </div>

                        {currentQuest?.slots.map((slot) => (
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
                                {lastCheck.ok ? sb1_05_t.correct : sb1_05_t.incorrect}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </ChamberLayout>
    );
}
