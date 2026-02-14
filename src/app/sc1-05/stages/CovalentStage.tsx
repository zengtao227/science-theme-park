"use client";

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export const CovalentStage: React.FC = () => {
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);
    const overlap = useTransform(x, [-50, 50], [0, 1]); // Simplified overlap logic for visual

    return (
        <div className="w-full h-[600px] flex flex-col items-center justify-center relative">
            <h2 className="absolute top-10 text-cyan-400 font-mono text-xl tracking-wider">H2 Molecule Formulation</h2>

            <div className="flex items-center justify-center gap-20">
                {/* Hydrogen Atom 1 */}
                <motion.div
                    drag="x"
                    dragConstraints={{ left: -50, right: 50 }}
                    style={{ x, opacity }}
                    className="w-32 h-32 rounded-full border-4 border-cyan-500 bg-cyan-900/30 flex items-center justify-center relative hover:cursor-grab active:cursor-grabbing"
                >
                    <span className="text-white font-bold text-2xl">H</span>
                    {/* Electron */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]" />
                </motion.div>

                {/* Hydrogen Atom 2 (Static Target) */}
                <motion.div
                    className="w-32 h-32 rounded-full border-4 border-cyan-500 bg-cyan-900/30 flex items-center justify-center relative"
                >
                    <span className="text-white font-bold text-2xl">H</span>
                    {/* Electron */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]" />
                </motion.div>

                {/* Shared Electron Cloud (appears when close) */}
                <motion.div
                    style={{ opacity: overlap }}
                    className="absolute w-40 h-20 bg-cyan-400/20 rounded-full blur-xl pointer-events-none"
                />
            </div>

            <div className="absolute bottom-10 text-gray-400 font-mono text-sm">
                Drag the left Hydrogen closer to share electrons.
            </div>
        </div>
    );
};
