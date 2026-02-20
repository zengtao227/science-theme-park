"use client";

import { motion } from "framer-motion";
import StatCard from "./StatCard";

interface FlowSource {
    label: string;
    value: number;
    color: string;
}

interface MetaData {
    label: string;
    value: string | number;
    color: string;
}

interface FlowMonitorProps {
    title: string;
    hubLabel: string;
    hubSubLabel?: string;
    sources: FlowSource[];
    meta?: MetaData[];
    className?: string;
}

export default function FlowMonitor({
    title,
    hubLabel,
    hubSubLabel = "HUB",
    sources,
    meta,
    className
}: FlowMonitorProps) {
    return (
        <div className={`w-full h-full flex flex-col gap-6 p-6 bg-black/40 rounded-3xl backdrop-blur-md border border-white/10 ${className}`}>
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400">{title}</span>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-white/40">STATUS: ACTIVE</span>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
                {/* Central Hub */}
                <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center relative z-10 bg-black/60 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <div className="text-[10px] font-black text-white text-center leading-tight">
                        {hubLabel}<br /><span className="text-[8px] opacity-40">{hubSubLabel}</span>
                    </div>
                </div>

                {/* Flow Lines */}
                {sources.map((source, i) => {
                    const angle = (i * (360 / sources.length)) - 90;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * 100;
                    const y = Math.sin(rad) * 100;

                    return (
                        <div key={source.label} className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute flex flex-col items-center gap-1"
                                style={{ transform: `translate(${x}px, ${y}px)` }}
                            >
                                <div className={`w-2.5 h-2.5 rounded-full ${source.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
                                <span className="text-[8px] font-mono text-white/60 tracking-tighter">{source.label}</span>
                                <span className="text-[8px] font-black text-white">{source.value}%</span>
                            </motion.div>

                            {/* Flow Path */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                                <motion.path
                                    d={`M 200 200 L ${200 + x} ${200 + y}`}
                                    stroke="url(#flowGradient)"
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            </svg>
                        </div>
                    );
                })}

                <svg className="hidden">
                    <defs>
                        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {meta && (
                <div className="grid grid-cols-2 gap-2">
                    {meta.map((m, i) => (
                        <StatCard
                            key={i}
                            label={m.label}
                            value={m.value}
                            color={m.color}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
