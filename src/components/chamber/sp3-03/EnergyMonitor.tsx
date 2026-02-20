"use client";

import { motion } from "framer-motion";

interface EnergyMonitorProps {
    stage: string;
}

export default function EnergyMonitor({ stage }: EnergyMonitorProps) {
    const flows = [
        { label: "SOLAR", value: 45, color: "bg-yellow-400" },
        { label: "HYDRO", value: 30, color: "bg-blue-400" },
        { label: "GRID", value: 25, color: "bg-purple-400" }
    ];

    return (
        <div className="w-full h-full flex flex-col gap-6 p-6 bg-black/40 rounded-3xl backdrop-blur-md border border-white/10">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400">BASEL_ENERGY_AUDIT</span>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-white/40">STATUS: ACTIVE</span>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
                {/* Central Hub */}
                <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center relative z-10 bg-black/60 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <div className="text-[10px] font-black text-white text-center leading-tight">
                        IWB<br /><span className="text-[8px] opacity-40">HUB</span>
                    </div>
                </div>

                {/* Energy Flow Lines */}
                {flows.map((flow, i) => {
                    const angle = (i * 120) - 90;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * 100;
                    const y = Math.sin(rad) * 100;

                    return (
                        <div key={flow.label} className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute flex flex-col items-center gap-2"
                                style={{ transform: `translate(${x}px, ${y}px)` }}
                            >
                                <div className={`w-3 h-3 rounded-full ${flow.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} />
                                <span className="text-[8px] font-mono text-white/60 tracking-tighter">{flow.label}</span>
                                <span className="text-[8px] font-black text-white">{flow.value}%</span>
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

            <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <div className="text-[8px] text-white/40 uppercase tracking-widest">Efficiency</div>
                    <div className="text-sm font-black text-green-400">92.4%</div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <div className="text-[8px] text-white/40 uppercase tracking-widest">Grid_Load</div>
                    <div className="text-sm font-black text-cyan-400">1.2 GW</div>
                </div>
            </div>
        </div>
    );
}
