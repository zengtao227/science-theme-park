"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    subValue?: string;
    icon?: LucideIcon;
    color?: string;
    trend?: "up" | "down" | "neutral";
    className?: string;
}

export default function StatCard({
    label,
    value,
    subValue,
    icon: Icon,
    color = "text-white",
    trend,
    className
}: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 bg-white/[0.03] border border-white/10 rounded-2xl space-y-2 backdrop-blur-sm hover:bg-white/[0.05] transition-all group ${className}`}
        >
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">{label}</span>
                {Icon && <Icon className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors" />}
            </div>

            <div className="flex items-baseline gap-2">
                <span className={`text-xl font-black ${color} tracking-tight`}>{value}</span>
                {subValue && <span className="text-[10px] font-mono text-white/40">{subValue}</span>}
            </div>

            {trend && (
                <div className="flex items-center gap-1">
                    <div className={`w-1 h-1 rounded-full ${trend === "up" ? "bg-green-400" : trend === "down" ? "bg-red-400" : "bg-white/40"
                        }`} />
                    <span className="text-[8px] font-mono text-white/30 uppercase tracking-tighter">
                        {trend === "up" ? "Positive Trend" : trend === "down" ? "Negative Delta" : "Stable Baseline"}
                    </span>
                </div>
            )}
        </motion.div>
    );
}
