"use client";

import { useMemo } from "react";

interface ExponentialChartProps {
    mode: "exponential" | "logarithm" | "halflife" | "compound";
    initialCount: number;
    doublingTime: number;
    time?: number;          // Current time t
    finalCount?: number;    // For logarithm mode
    labels: {
        xAxis: string;        // "Time (t)"
        yAxis: string;        // "Population N"
    };
}

export default function ExponentialChart({
    mode = "exponential",
    initialCount,
    doublingTime,
    time,
    finalCount,
    labels,
}: ExponentialChartProps) {
    const W = 400, H = 280, PAD = { top: 20, right: 20, bottom: 40, left: 55 };
    const plotW = W - PAD.left - PAD.right;
    const plotH = H - PAD.top - PAD.bottom;

    // Calculate curve parameters
    const isDecay = mode === "halflife";
    const base = isDecay ? 0.5 : 2;

    // Dynamic scaling
    const periods = useMemo(() => {
        let p = 6; // Minimum periods
        if (time && doublingTime) p = Math.max(p, time / doublingTime);
        if (finalCount && initialCount && !isDecay && finalCount > initialCount) {
            p = Math.max(p, Math.log2(finalCount / initialCount));
        }
        return Math.ceil(p * 1.05); // Add 5% padding
    }, [time, doublingTime, finalCount, initialCount, isDecay]);

    const maxTime = doublingTime * periods;
    const maxN = isDecay ? initialCount : (initialCount * Math.pow(2, periods));

    // Generate curve path
    const curvePath = useMemo(() => {
        const points: string[] = [];
        const steps = 100;
        for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * maxTime;
            let N: number;
            if (mode === "compound") {
                N = initialCount * Math.pow(2, t / doublingTime);
            } else {
                N = initialCount * Math.pow(base, t / doublingTime);
            }

            const x = PAD.left + (t / maxTime) * plotW;
            const y = PAD.top + plotH - (N / maxN) * plotH;
            // Clamp y
            const clampedY = Math.max(PAD.top, Math.min(PAD.top + plotH, y));
            points.push(`${i === 0 ? "M" : "L"}${x},${clampedY}`);
        }
        return points.join(" ");
    }, [mode, initialCount, doublingTime, base, maxTime, maxN, plotW, plotH, PAD.left, PAD.top]);

    const refLines = useMemo(() => {
        const lines = [];
        const steps = isDecay ? 4 : Math.min(periods, 7); // Cap grid lines to avoid crowding

        for (let i = 0; i <= steps; i++) {
            let val: number;
            let label: string;

            if (isDecay) {
                val = initialCount / Math.pow(2, i);
                label = i === 0 ? "N₀" : `N₀/${Math.pow(2, i)}`;
            } else {
                val = initialCount * Math.pow(2, i);
                label = i === 0 ? "N₀" : `${Math.pow(2, i)}N₀`;
            }

            const y = PAD.top + plotH - (val / maxN) * plotH;
            if (y >= PAD.top && y <= PAD.top + plotH) {
                lines.push({ y, label, val });
            }
        }
        return lines;
    }, [initialCount, isDecay, maxN, plotH, PAD.top, periods]);

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full select-none">
            {/* Background */}
            <rect width={W} height={H} fill="transparent" />

            {/* Grid Lines (Reference Lines) */}
            {refLines.map((line, i) => (
                <g key={i}>
                    <line x1={PAD.left} y1={line.y} x2={W - PAD.right} y2={line.y}
                        stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                    <text x={PAD.left - 5} y={line.y + 3} fill="rgba(0,229,255,0.5)"
                        fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">
                        {line.label}
                    </text>
                </g>
            ))}

            {/* Axes */}
            <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={H - PAD.bottom} stroke="white" strokeOpacity="0.3" strokeWidth="2" />
            <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom} stroke="white" strokeOpacity="0.3" strokeWidth="2" />

            {/* Axis Labels */}
            <text x={W / 2} y={H - 10} fill="rgba(255,255,255,0.7)" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                {labels.xAxis}
            </text>
            <text x={15} y={H / 2} fill="rgba(255,255,255,0.7)" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="bold"
                transform={`rotate(-90, 15, ${H / 2})`}>
                {labels.yAxis}
            </text>

            {/* Curve */}
            <path d={curvePath} fill="none" stroke="#39ff14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {/* Current Time Indicator */}
            {time != null && (
                <g>
                    <line
                        x1={PAD.left + (time / maxTime) * plotW}
                        y1={PAD.top}
                        x2={PAD.left + (time / maxTime) * plotW}
                        y2={H - PAD.bottom}
                        stroke="#00e5ff"
                        strokeDasharray="4 4"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                    />
                    {/* Intersection Point */}
                    <circle
                        cx={PAD.left + (time / maxTime) * plotW}
                        cy={PAD.top + plotH - ((initialCount * Math.pow(base, time / doublingTime)) / maxN) * plotH}
                        r="4"
                        fill="#00e5ff"
                        stroke="white"
                        strokeWidth="1"
                    />
                </g>
            )}

            {/* Logarithm Goal Indicator */}
            {mode === 'logarithm' && finalCount && (
                <g>
                    {/* Horizontal line from N */}
                    <line
                        x1={PAD.left}
                        y1={PAD.top + plotH - (finalCount / maxN) * plotH}
                        x2={W - PAD.right}
                        y2={PAD.top + plotH - (finalCount / maxN) * plotH}
                        stroke="#ff2d7d"
                        strokeDasharray="2 2"
                        strokeOpacity="0.8"
                    />
                    <text x={W - PAD.right + 5} y={PAD.top + plotH - (finalCount / maxN) * plotH + 3} fill="#ff2d7d"
                        fontSize="10" textAnchor="start" fontFamily="monospace">
                        N={finalCount}
                    </text>
                </g>
            )}
        </svg>
    );
}
