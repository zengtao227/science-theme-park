"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PlantVisualizationProps {
    quest: any;
    stage: string;
    translations: {
        plant_structure: string;
        water_transport: string;
        nutrient_transport: string;
    };
}

export default function PlantVisualization({
    quest,
    stage,
    translations
}: PlantVisualizationProps) {
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [quest]);

    const renderPlantStructure = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Plant Structure
                </div>
                
                <div className="relative w-48 h-64">
                    {/* Leaf */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-16 bg-green-500/30 rounded-full border-2 border-green-500 flex items-center justify-center text-green-400 text-xs">
                        Leaf
                    </div>
                    
                    {/* Stem */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-32 bg-green-600/50 border-2 border-green-600" />
                    
                    {/* Root */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-24">
                        <svg className="w-full h-full">
                            <path d="M 64 0 L 64 20 M 64 20 L 40 40 M 64 20 L 88 40 M 40 40 L 20 60 M 88 40 L 108 60" 
                                  stroke="#8B4513" strokeWidth="3" fill="none" />
                        </svg>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-yellow-600 text-xs">
                            Root
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderWaterTransport = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Water Transport (Xylem)
                </div>
                
                <div className="relative w-48 h-64 bg-black/30 rounded-lg border border-white/10 p-4">
                    {/* Xylem vessel */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-8 h-56 bg-blue-500/20 border-2 border-blue-500 rounded">
                        {/* Water molecules moving up */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full"
                                animate={{
                                    y: [200, -20],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.6,
                                    ease: "linear",
                                }}
                            />
                        ))}
                    </div>
                    
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-blue-400 text-xs">
                        Root → Leaf
                    </div>
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-cyan-400 text-xs">
                        Transpiration
                    </div>
                </div>
            </div>
        );
    };

    const renderNutrientTransport = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
                <div className="text-white/60 text-sm uppercase tracking-wider">
                    Nutrient Transport (Phloem)
                </div>
                
                <div className="relative w-48 h-64 bg-black/30 rounded-lg border border-white/10 p-4">
                    {/* Phloem vessel */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 w-8 h-56 bg-yellow-500/20 border-2 border-yellow-500 rounded">
                        {/* Sugar molecules moving bidirectionally */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={`down-${i}`}
                                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"
                                animate={{
                                    y: [-20, 200],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 1,
                                    ease: "linear",
                                }}
                            />
                        ))}
                    </div>
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-yellow-400 text-xs">
                        Source (Leaf)
                    </div>
                    
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-yellow-400 text-xs">
                        Sink (Root/Fruit)
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-black/20 rounded-lg">
            {stage === "PLANT_STRUCTURE" && renderPlantStructure()}
            {stage === "WATER_TRANSPORT" && renderWaterTransport()}
            {stage === "NUTRIENT_TRANSPORT" && renderNutrientTransport()}
        </div>
    );
}
