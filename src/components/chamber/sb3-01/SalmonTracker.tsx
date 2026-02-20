"use client";

import { motion } from "framer-motion";

interface SalmonTrackerProps {
    className?: string;
}

export default function SalmonTracker({ className }: SalmonTrackerProps) {
    return (
        <div className={`bg-black/40 rounded-xl border border-white/10 p-4 space-y-3 ${className}`}>
            <div className="flex items-center justify-between">
                <span className="text-[9px] font-black tracking-widest text-green-400">RHINE_SALMON_TRACKER</span>
                <span className="text-[8px] font-mono text-white/30 truncate">REF: BSL_ECO_2026</span>
            </div>
            <div className="h-24 flex items-end gap-1">
                {[2, 5, 8, 12, 18, 25, 35, 42, 60, 85].map((val, i) => (
                    <div key={i} className="flex-1 group relative">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${val}%` }}
                            className="w-full bg-green-500/40 group-hover:bg-green-500 transition-colors"
                        />
                        <div className="absolute -top-4 left-0 w-full text-center text-[6px] opacity-0 group-hover:opacity-100 font-mono text-white">
                            {val * 10}
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-[8px] font-mono text-white/40 flex justify-between uppercase">
                <span>1990</span>
                <span>2010</span>
                <span>2020</span>
                <span>ACTIVE</span>
            </div>
        </div>
    );
}
