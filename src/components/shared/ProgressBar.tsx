"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface ProgressBarProps {
    value: number; // 0 to 100
    segments?: number; // Optional: split into discrete blocks
    label?: string;
    subLabel?: string;
    color?: string;
    showValue?: boolean;
    className?: string;
}

export default function ProgressBar({
    value,
    segments,
    label,
    subLabel,
    color = "bg-green-500",
    showValue = true,
    className
}: ProgressBarProps) {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
        <div className={`space-y-2 ${className}`}>
            {(label || showValue) && (
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        {label && <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">{label}</span>}
                        {subLabel && <span className="text-[8px] font-mono text-white/20 uppercase">{subLabel}</span>}
                    </div>
                    {showValue && (
                        <span className="text-xs font-mono font-black text-white/90">
                            {Math.round(clampedValue)}%
                        </span>
                    )}
                </div>
            )}
            <div className="flex gap-1 h-1.5 w-full overflow-hidden">
                {segments ? (
                    Array.from({ length: segments }).map((_, i) => {
                        const threshold = (i / segments) * 100;
                        const isActive = value > threshold;
                        return (
                            <div
                                key={i}
                                className={clsx(
                                    "flex-1 transition-all duration-700 rounded-full",
                                    isActive ? color : "bg-white/5"
                                )}
                            />
                        );
                    })
                ) : (
                    <div className="h-full w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${clampedValue}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full ${color} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
