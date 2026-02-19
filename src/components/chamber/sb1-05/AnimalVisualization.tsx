"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimalVisualizationProps {
    quest: any;
    stage: string;
    translations: {
        animal_classification: string;
        adaptations: string;
        behavior_evolution: string;
    };
}

export default function AnimalVisualization({
    quest,
    stage,
    translations
}: AnimalVisualizationProps) {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [quest]);

    // Classification Tree View
    const renderClassificationTree = () => {
        const isVertebrate = ["Mammalia", "Aves", "Reptilia", "Amphibia", "Pisces", "Osteichthyes", "Chondrichthyes"].includes(quest.answer);
        const isInvertebrate = ["Insecta", "Arachnida", "Gastropoda", "Crustacea", "Cephalopoda", "Annelida", "Cnidaria", "Echinodermata"].includes(quest.answer);

        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Animal Classification Tree
                </div>
                
                <div className="relative w-full max-w-md h-96">
                    {/* Kingdom */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-purple-500/30 border-2 border-purple-500 rounded-lg text-purple-300 text-sm font-bold">
                        Animalia
                    </div>

                    {/* Branches */}
                    <svg className="absolute top-12 left-0 w-full h-32">
                        <line x1="50%" y1="0" x2="25%" y2="100%" stroke={isVertebrate ? "#3b82f6" : "#ffffff40"} strokeWidth="2" />
                        <line x1="50%" y1="0" x2="75%" y2="100%" stroke={isInvertebrate ? "#10b981" : "#ffffff40"} strokeWidth="2" />
                    </svg>

                    {/* Vertebrates */}
                    <motion.div 
                        className={`absolute top-44 left-[10%] px-4 py-2 rounded-lg text-sm font-bold ${
                            isVertebrate ? "bg-blue-500/30 border-2 border-blue-500 text-blue-300" : "bg-white/10 border border-white/20 text-white/40"
                        }`}
                        animate={isVertebrate ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        Vertebrates
                    </motion.div>

                    {/* Invertebrates */}
                    <motion.div 
                        className={`absolute top-44 right-[10%] px-4 py-2 rounded-lg text-sm font-bold ${
                            isInvertebrate ? "bg-green-500/30 border-2 border-green-500 text-green-300" : "bg-white/10 border border-white/20 text-white/40"
                        }`}
                        animate={isInvertebrate ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        Invertebrates
                    </motion.div>

                    {/* Example Classes */}
                    <div className="absolute bottom-0 left-0 w-full flex justify-around text-xs">
                        <div className={`px-2 py-1 rounded ${quest.answer === "Mammalia" ? "bg-blue-500/50 text-blue-200" : "text-white/30"}`}>
                            Mammalia
                        </div>
                        <div className={`px-2 py-1 rounded ${quest.answer === "Aves" ? "bg-blue-500/50 text-blue-200" : "text-white/30"}`}>
                            Aves
                        </div>
                        <div className={`px-2 py-1 rounded ${quest.answer === "Insecta" ? "bg-green-500/50 text-green-200" : "text-white/30"}`}>
                            Insecta
                        </div>
                        <div className={`px-2 py-1 rounded ${quest.answer === "Cephalopoda" ? "bg-green-500/50 text-green-200" : "text-white/30"}`}>
                            Cephalopoda
                        </div>
                    </div>
                </div>

                {/* Animal Info */}
                <div className="mt-4 p-4 bg-black/30 rounded-lg border border-white/10 w-full max-w-md">
                    <div className="text-white font-bold mb-2">{quest.animalName}</div>
                    <div className="text-white/60 text-sm italic mb-2">{quest.scientificName}</div>
                    <div className="text-cyan-400 text-sm">Class: {quest.answer}</div>
                </div>
            </div>
        );
    };

    // Adaptation Comparison View
    const renderAdaptationComparison = () => {
        const environments = {
            arctic: { color: "cyan", icon: "❄️", name: "Arctic" },
            desert: { color: "yellow", icon: "🌵", name: "Desert" },
            aquatic: { color: "blue", icon: "🌊", name: "Aquatic" },
            forest: { color: "green", icon: "🌲", name: "Forest" },
            alpine: { color: "purple", icon: "⛰️", name: "Alpine" }
        };

        const env = environments[quest.answer as keyof typeof environments] || environments.forest;

        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Adaptation Analysis
                </div>
                
                <div className="relative w-full max-w-md">
                    {/* Environment Display */}
                    <div className={`p-6 bg-${env.color}-500/20 border-2 border-${env.color}-500 rounded-lg mb-4`}>
                        <div className="text-4xl text-center mb-2">{env.icon}</div>
                        <div className={`text-${env.color}-300 text-center font-bold text-lg`}>
                            {env.name} Environment
                        </div>
                    </div>

                    {/* Animal Card */}
                    <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                        <div className="text-white font-bold mb-2">{quest.animalName}</div>
                        <div className="text-white/60 text-sm italic mb-3">{quest.scientificName}</div>
                        
                        {/* Adaptation Features */}
                        <div className="space-y-2">
                            <div className="flex items-start gap-2">
                                <div className="text-green-400 mt-1">✓</div>
                                <div className="text-white/80 text-sm">
                                    Adapted to {env.name.toLowerCase()} conditions
                                </div>
                            </div>
                            {quest.answer.includes("_") && (
                                <div className="flex items-start gap-2">
                                    <div className="text-green-400 mt-1">✓</div>
                                    <div className="text-white/80 text-sm">
                                        Special feature: {quest.answer.replace(/_/g, " ")}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Environmental Challenges */}
                    <div className="mt-4 p-3 bg-black/20 rounded-lg border border-white/5">
                        <div className="text-white/50 text-xs uppercase mb-2">Environmental Challenges</div>
                        <div className="text-white/70 text-sm">
                            {env.name === "Arctic" && "Extreme cold, ice, limited food"}
                            {env.name === "Desert" && "Extreme heat, water scarcity, temperature fluctuations"}
                            {env.name === "Aquatic" && "Breathing underwater, pressure, buoyancy"}
                            {env.name === "Forest" && "Competition, predators, seasonal changes"}
                            {env.name === "Alpine" && "Low oxygen, cold, steep terrain, limited food"}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Behavior Simulator View
    const renderBehaviorSimulator = () => {
        const behaviors = {
            defense: { color: "red", icon: "🛡️", description: "Protective behavior against threats" },
            feeding: { color: "yellow", icon: "🍽️", description: "Obtaining and consuming food" },
            reproduction: { color: "pink", icon: "💕", description: "Mating and offspring production" },
            migration: { color: "blue", icon: "✈️", description: "Seasonal movement for resources" },
            hibernation: { color: "purple", icon: "😴", description: "Winter dormancy to conserve energy" },
            pack_hunting: { color: "orange", icon: "🐺", description: "Cooperative hunting strategy" },
            dam_building: { color: "brown", icon: "🏗️", description: "Habitat modification behavior" },
            nocturnal: { color: "indigo", icon: "🌙", description: "Active during night hours" }
        };

        const behavior = behaviors[quest.answer as keyof typeof behaviors] || behaviors.defense;

        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Behavior Simulator
                </div>
                
                <div className="relative w-full max-w-md">
                    {/* Behavior Display */}
                    <div className="p-6 bg-black/30 rounded-lg border border-white/10 mb-4">
                        <div className="text-4xl text-center mb-3">{behavior.icon}</div>
                        <div className="text-white text-center font-bold text-lg mb-2">
                            {quest.answer.replace(/_/g, " ").toUpperCase()}
                        </div>
                        <div className="text-white/60 text-center text-sm">
                            {behavior.description}
                        </div>
                    </div>

                    {/* Animal Info */}
                    <div className="p-4 bg-black/30 rounded-lg border border-white/10 mb-4">
                        <div className="text-white font-bold mb-2">{quest.animalName}</div>
                        <div className="text-white/60 text-sm italic">{quest.scientificName}</div>
                    </div>

                    {/* Animated Behavior Indicator */}
                    <div className="relative h-32 bg-black/20 rounded-lg border border-white/5 overflow-hidden">
                        <motion.div
                            className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-${behavior.color}-500/50 rounded-full flex items-center justify-center text-2xl`}
                            animate={{
                                x: [20, 280, 20],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {behavior.icon}
                        </motion.div>
                    </div>

                    {/* Survival Benefit */}
                    <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                        <div className="text-green-400 text-xs uppercase mb-1">Survival Benefit</div>
                        <div className="text-white/80 text-sm">
                            This behavior increases survival and reproductive success in the animal's environment.
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-black/20 rounded-lg">
            {stage === "ANIMAL_CLASSIFICATION" && renderClassificationTree()}
            {stage === "ADAPTATIONS" && renderAdaptationComparison()}
            {stage === "BEHAVIOR_EVOLUTION" && renderBehaviorSimulator()}
        </div>
    );
}
