"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import React from "react";

interface TissueVisualizationProps {
    quest: any;
    stage: string;
}

export default function TissueVisualization({ quest, stage }: TissueVisualizationProps) {
    const canvasSize = 400;
    const [animationKey, setAnimationKey] = useState(0);

    // Trigger animation when quest or stage changes
    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [quest, stage]);

    const tissueColors: Record<string, string> = {
        epithelial: "#10b981", // neon-green
        connective: "#06b6d4", // neon-cyan
        muscle: "#f59e0b", // amber
        nervous: "#eab308", // yellow
        blood: "#ef4444", // red
    };

    const tissuePatterns: Record<string, React.JSX.Element> = {
        epithelial: (
            <g>
                {/* Tightly packed cells forming a barrier */}
                {Array.from({ length: 4 }).map((_, row) =>
                    Array.from({ length: 4 }).map((_, col) => (
                        <motion.rect
                            key={`${row}-${col}`}
                            x={canvasSize / 2 - 80 + col * 40}
                            y={canvasSize / 2 - 80 + row * 40}
                            width={38}
                            height={38}
                            fill={tissueColors.epithelial}
                            opacity={0.6}
                            rx={2}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.6 }}
                            transition={{ delay: (row * 4 + col) * 0.05, duration: 0.3 }}
                        />
                    ))
                )}
            </g>
        ),
        connective: (
            <g>
                {/* Scattered cells in extracellular matrix */}
                {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const radius = 60 + ((Math.sin(i) + 1) / 2) * 30;
                    return (
                        <motion.circle
                            key={i}
                            cx={canvasSize / 2 + Math.cos(angle) * radius}
                            cy={canvasSize / 2 + Math.sin(angle) * radius}
                            r={8}
                            fill={tissueColors.connective}
                            opacity={0.7}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.7 }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                        />
                    );
                })}
                {/* Extracellular matrix fibers */}
                {Array.from({ length: 6 }).map((_, i) => {
                    const angle = (i / 6) * Math.PI * 2;
                    return (
                        <motion.line
                            key={`fiber-${i}`}
                            x1={canvasSize / 2}
                            y1={canvasSize / 2}
                            x2={canvasSize / 2 + Math.cos(angle) * 90}
                            y2={canvasSize / 2 + Math.sin(angle) * 90}
                            stroke={tissueColors.connective}
                            strokeWidth={2}
                            opacity={0.3}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        />
                    );
                })}
            </g>
        ),
        muscle: (
            <g>
                {/* Parallel muscle fibers */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.rect
                        key={i}
                        x={canvasSize / 2 - 90}
                        y={canvasSize / 2 - 80 + i * 20}
                        width={180}
                        height={15}
                        fill={tissueColors.muscle}
                        opacity={0.6}
                        rx={3}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 0.6 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                    />
                ))}
                {/* Striations */}
                {Array.from({ length: 8 }).map((_, i) =>
                    Array.from({ length: 9 }).map((_, j) => (
                        <motion.line
                            key={`${i}-${j}`}
                            x1={canvasSize / 2 - 90 + j * 20}
                            y1={canvasSize / 2 - 80 + i * 20}
                            x2={canvasSize / 2 - 90 + j * 20}
                            y2={canvasSize / 2 - 80 + i * 20 + 15}
                            stroke="#000"
                            strokeWidth={1}
                            opacity={0.3}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: 0.8 + j * 0.05, duration: 0.2 }}
                        />
                    ))
                )}
            </g>
        ),
        nervous: (
            <g>
                {/* Neuron with dendrites and axon */}
                <motion.circle
                    cx={canvasSize / 2}
                    cy={canvasSize / 2}
                    r={25}
                    fill={tissueColors.nervous}
                    opacity={0.7}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                />
                {/* Dendrites */}
                {Array.from({ length: 6 }).map((_, i) => {
                    const angle = (i / 6) * Math.PI * 2;
                    return (
                        <motion.path
                            key={`dendrite-${i}`}
                            d={`M ${canvasSize / 2 + Math.cos(angle) * 25} ${canvasSize / 2 + Math.sin(angle) * 25} Q ${canvasSize / 2 + Math.cos(angle) * 50} ${canvasSize / 2 + Math.sin(angle) * 40}, ${canvasSize / 2 + Math.cos(angle) * 70} ${canvasSize / 2 + Math.sin(angle) * 60}`}
                            stroke={tissueColors.nervous}
                            strokeWidth={3}
                            fill="none"
                            opacity={0.6}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                        />
                    );
                })}
                {/* Axon */}
                <motion.line
                    x1={canvasSize / 2}
                    y1={canvasSize / 2 + 25}
                    x2={canvasSize / 2}
                    y2={canvasSize / 2 + 100}
                    stroke={tissueColors.nervous}
                    strokeWidth={4}
                    opacity={0.7}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                />
                {/* Myelin sheath segments */}
                {Array.from({ length: 3 }).map((_, i) => (
                    <motion.rect
                        key={`myelin-${i}`}
                        x={canvasSize / 2 - 6}
                        y={canvasSize / 2 + 35 + i * 25}
                        width={12}
                        height={18}
                        fill={tissueColors.nervous}
                        opacity={0.5}
                        rx={2}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.15, duration: 0.3 }}
                    />
                ))}
            </g>
        ),
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/60 to-gray-900/40 rounded-xl p-4 border border-white/5">
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${stage}-${animationKey}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                >
                    <svg width={canvasSize} height={canvasSize} className="bg-black/30 rounded-lg border border-neon-green/10">
                        <defs>
                            {/* Glow filter for premium feel */}
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            {/* Arrow marker */}
                            <marker
                                id="arrowhead"
                                markerWidth="10"
                                markerHeight="10"
                                refX="9"
                                refY="3"
                                orient="auto"
                            >
                                <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
                            </marker>
                        </defs>

                        {/* Title with glow effect */}
                        <motion.text
                            x={canvasSize / 2}
                            y={30}
                            textAnchor="middle"
                            fill="#10b981"
                            fontSize="14"
                            fontWeight="bold"
                            filter="url(#glow)"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 30 }}
                            transition={{ duration: 0.5 }}
                        >
                            {stage.replace('_', ' ')} ANALYSIS
                        </motion.text>

                        {/* Stage-specific visualizations */}
                        {stage === "TISSUES" && quest?.tissueType && (
                            <g>
                                {/* Background container */}
                                <motion.rect
                                    x={canvasSize / 2 - 100}
                                    y={canvasSize / 2 - 100}
                                    width={200}
                                    height={200}
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    opacity={0.3}
                                    rx={10}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 0.3 }}
                                    transition={{ duration: 0.5 }}
                                />

                                {/* Tissue pattern */}
                                {tissuePatterns[quest.tissueType] || tissuePatterns.epithelial}

                                {/* Label */}
                                <motion.text
                                    x={canvasSize / 2}
                                    y={canvasSize - 40}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                >
                                    {quest.tissueType.toUpperCase()}
                                </motion.text>
                                <motion.text
                                    x={canvasSize / 2}
                                    y={canvasSize - 20}
                                    textAnchor="middle"
                                    fill="#10b981"
                                    fontSize="12"
                                    fontWeight="bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                >
                                    TISSUE TYPE
                                </motion.text>
                            </g>
                        )}

                        {stage === "ORGANS" && quest?.organName && (
                            <g>
                                {/* Organ representation with multiple tissue layers */}
                                <motion.circle
                                    cx={canvasSize / 2}
                                    cy={canvasSize / 2}
                                    r={110}
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    opacity={0.4}
                                    filter="url(#glow)"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 0.4 }}
                                    transition={{ duration: 0.6 }}
                                />

                                {/* Tissue layers with labels */}
                                {[
                                    { name: "Epithelial", color: tissueColors.epithelial, r: 90 },
                                    { name: "Connective", color: tissueColors.connective, r: 65 },
                                    { name: "Muscle", color: tissueColors.muscle, r: 40 },
                                    { name: "Nervous", color: tissueColors.nervous, r: 15 }
                                ].map((layer, i) => (
                                    <g key={i}>
                                        <motion.circle
                                            cx={canvasSize / 2}
                                            cy={canvasSize / 2}
                                            r={layer.r}
                                            fill={layer.color}
                                            opacity={0.4}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 0.4 }}
                                            transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                                        />
                                        <motion.text
                                            x={canvasSize / 2 + layer.r + 15}
                                            y={canvasSize / 2 + 5}
                                            fill={layer.color}
                                            fontSize="10"
                                            fontWeight="bold"
                                            initial={{ opacity: 0, x: canvasSize / 2 }}
                                            animate={{ opacity: 1, x: canvasSize / 2 + layer.r + 15 }}
                                            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                                        >
                                            {layer.name}
                                        </motion.text>
                                    </g>
                                ))}

                                {/* Organ name */}
                                <motion.text
                                    x={canvasSize / 2}
                                    y={canvasSize / 2}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="20"
                                    fontWeight="bold"
                                    filter="url(#glow)"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                >
                                    {quest.organName.toUpperCase()}
                                </motion.text>
                                <motion.text
                                    x={canvasSize / 2}
                                    y={canvasSize - 30}
                                    textAnchor="middle"
                                    fill="#10b981"
                                    fontSize="12"
                                    fontWeight="bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5, duration: 0.5 }}
                                >
                                    MULTI-TISSUE ORGAN
                                </motion.text>
                            </g>
                        )}

                        {stage === "SYSTEMS" && (
                            <g>
                                {/* System hierarchy visualization with improved layout */}
                                {[
                                    { name: "CELL", x: 80, y: 200, size: 25, color: "#ef4444", shape: "circle" },
                                    { name: "TISSUE", x: 160, y: 200, size: 35, color: "#10b981", shape: "rect" },
                                    { name: "ORGAN", x: 250, y: 200, size: 45, color: "#06b6d4", shape: "circle" },
                                    { name: "SYSTEM", x: 340, y: 200, size: 55, color: "#eab308", shape: "rect" }
                                ].map((level, i) => (
                                    <g key={i}>
                                        {level.shape === "circle" ? (
                                            <motion.circle
                                                cx={level.x}
                                                cy={level.y}
                                                r={level.size}
                                                fill={level.color}
                                                opacity={0.6}
                                                filter="url(#glow)"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 0.6 }}
                                                transition={{ delay: i * 0.3, duration: 0.5 }}
                                            />
                                        ) : (
                                            <motion.rect
                                                x={level.x - level.size / 2}
                                                y={level.y - level.size / 2}
                                                width={level.size}
                                                height={level.size}
                                                fill={level.color}
                                                opacity={0.6}
                                                rx={5}
                                                filter="url(#glow)"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 0.6 }}
                                                transition={{ delay: i * 0.3, duration: 0.5 }}
                                            />
                                        )}
                                        <motion.text
                                            x={level.x}
                                            y={level.y + level.size + 25}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize="11"
                                            fontWeight="bold"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.3 + 0.3, duration: 0.4 }}
                                        >
                                            {level.name}
                                        </motion.text>

                                        {/* Arrows between levels */}
                                        {i < 3 && (
                                            <motion.path
                                                d={`M ${level.x + level.size + 5} ${level.y} L ${[80, 160, 250, 340][i + 1] - [25, 35, 45, 55][i + 1] - 5} ${level.y}`}
                                                stroke="#10b981"
                                                strokeWidth={2}
                                                markerEnd="url(#arrowhead)"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{ delay: i * 0.3 + 0.5, duration: 0.5 }}
                                            />
                                        )}
                                    </g>
                                ))}

                                {/* Hierarchy label */}
                                <motion.text
                                    x={canvasSize / 2}
                                    y={canvasSize - 30}
                                    textAnchor="middle"
                                    fill="#10b981"
                                    fontSize="12"
                                    fontWeight="bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5, duration: 0.5 }}
                                >
                                    BIOLOGICAL HIERARCHY
                                </motion.text>
                            </g>
                        )}
                    </svg>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
