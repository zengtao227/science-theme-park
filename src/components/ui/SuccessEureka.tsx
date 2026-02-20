"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

interface SuccessEurekaProps {
    show: boolean;
    onComplete?: () => void;
}

export default function SuccessEureka({ show, onComplete }: SuccessEurekaProps) {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);

    useEffect(() => {
        if (show) {
            const colors = ["#00f2ff", "#7000ff", "#ff00d0", "#ffffff"];
            const newParticles = Array.from({ length: 40 }).map((_, i) => ({
                id: i,
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 4 + 2,
            }));
            setParticles(newParticles);

            const timer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 2500);
            return () => clearTimeout(timer);
        } else {
            setParticles([]);
        }
    }, [show, onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
                    {/* Central Burst */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                        transition={{ duration: 1, times: [0, 0.5, 1] }}
                        className="absolute w-64 h-64 bg-neon-cyan/20 blur-[100px] rounded-full"
                    />

                    {/* Particles */}
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                            animate={{
                                x: p.x,
                                y: p.y,
                                scale: [0, 1, 0.5, 0],
                                opacity: [1, 1, 0]
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            style={{
                                backgroundColor: p.color,
                                width: p.size,
                                height: p.size,
                            }}
                        />
                    ))}

                    {/* Floating HUD Message */}
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        className="relative flex flex-col items-center gap-4"
                    >
                        <div className="bg-black/80 backdrop-blur-xl border border-neon-cyan/40 px-8 py-4 rounded-2xl shadow-[0_0_50px_rgba(0,242,255,0.2)] flex items-center gap-4">
                            <div className="p-3 bg-neon-cyan/20 rounded-xl">
                                <Star className="w-6 h-6 text-neon-cyan animate-spin-slow" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black tracking-[0.4em] uppercase text-neon-cyan/60 mb-1">Module_Status</div>
                                <div className="text-2xl font-black text-white tracking-widest uppercase italic">EUREKA! VAL_OK</div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-1.5 h-1.5 bg-neon-cyan rounded-full"
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
