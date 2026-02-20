"use client";

import { motion } from "framer-motion";

interface DataPoint {
    label: string | number;
    value: number;
}

interface DataTrackerProps {
    title: string;
    reference: string;
    data: DataPoint[];
    xAxisLabels?: string[];
    color?: string;
    className?: string;
    maxValue?: number;
}

export default function DataTracker({
    title,
    reference,
    data,
    xAxisLabels,
    color = "bg-green-500",
    className,
    maxValue = 100
}: DataTrackerProps) {
    return (
        <div className={`bg-black/40 rounded-xl border border-white/10 p-4 space-y-3 ${className}`}>
            <div className="flex items-center justify-between">
                <span className="text-[9px] font-black tracking-widest text-white/90">{title}</span>
                <span className="text-[8px] font-mono text-white/30 truncate">REF: {reference}</span>
            </div>
            <div className="h-24 flex items-end gap-1">
                {data.map((point, i) => {
                    const heightPercent = Math.min(100, (point.value / maxValue) * 100);
                    return (
                        <div key={i} className="flex-1 group relative">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPercent}%` }}
                                className={`w-full ${color}/40 group-hover:${color} transition-colors`}
                            />
                            <div className="absolute -top-4 left-0 w-full text-center text-[6px] opacity-0 group-hover:opacity-100 font-mono text-white">
                                {point.value}
                            </div>
                        </div>
                    );
                })}
            </div>
            {xAxisLabels && (
                <div className="text-[8px] font-mono text-white/40 flex justify-between uppercase">
                    {xAxisLabels.map((label, i) => (
                        <span key={i}>{label}</span>
                    ))}
                </div>
            )}
        </div>
    );
}
