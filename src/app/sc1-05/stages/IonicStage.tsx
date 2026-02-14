"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const IonicStage: React.FC = () => {
    const [hasTransferred, setHasTransferred] = useState(false);

    const handleTransfer = () => {
        setHasTransferred(true);
    };

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center gap-20">
            {/* Sodium Atom */}
            <motion.div
                className={`relative w-32 h-32 rounded-full border-4 flex items-center justify-center transition-colors duration-500
                    ${hasTransferred ? 'border-cyan-400 bg-cyan-900/20' : 'border-gray-500 bg-gray-800/50'}`}
                animate={hasTransferred ? { x: 50, scale: 0.9 } : { x: 0, scale: 1 }}
            >
                <div className="text-2xl font-bold font-mono text-white">Na{hasTransferred ? '+' : ''}</div>

                {/* Electron Shell */}
                <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin-slow" />

                {/* Valence Electron (Draggable if not transferred) */}
                {!hasTransferred && (
                    <motion.div
                        className="absolute -top-4 left-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15] cursor-pointer z-10"
                        drag
                        dragConstraints={{ left: 0, right: 300, top: 0, bottom: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.point.x > 100) handleTransfer();
                        }}
                        whileHover={{ scale: 1.2 }}
                    />
                )}
            </motion.div>

            {/* Chlorine Atom */}
            <motion.div
                className={`relative w-40 h-40 rounded-full border-4 flex items-center justify-center transition-colors duration-500
                    ${hasTransferred ? 'border-green-400 bg-green-900/20' : 'border-gray-500 bg-gray-800/50'}`}
                animate={hasTransferred ? { x: -50, scale: 1.1 } : { x: 0, scale: 1 }}
            >
                <div className="text-2xl font-bold font-mono text-white">Cl{hasTransferred ? '-' : ''}</div>

                {/* Electron Shell */}
                <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin-slow-reverse" />

                {/* Existing Electrons (7) */}
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="absolute w-4 h-4 bg-green-400 rounded-full shadow-[0_0_5px_#4ade80]"
                        style={{
                            top: `${50 + 45 * Math.sin(i * (Math.PI * 2 / 7))}%`,
                            left: `${50 + 45 * Math.cos(i * (Math.PI * 2 / 7))}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                ))}

                {/* Transferred Electron Arriving */}
                {hasTransferred && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-[0_0_15px_#facc15]"
                    />
                )}
            </motion.div>

            {/* Success Message */}
            {hasTransferred && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-10 text-cyan-400 font-mono text-xl tracking-wider"
                >
                    Ionic Bond Formed: NaCl
                </motion.div>
            )}
        </div>
    );
};
