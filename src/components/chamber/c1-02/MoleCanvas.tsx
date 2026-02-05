"use client";

import { useEffect, useRef } from "react";

type Status = "idle" | "correct" | "incorrect";

interface MoleCanvasProps {
    stageLabel: string;
    unit: string;
    inputValue: number | null;
    targetValue: number | null;
    status: Status;
}

const statusColors: Record<Status, string> = {
    idle: "#00e5ff",
    correct: "#39ff14",
    incorrect: "#ff9f43",
};

export default function MoleCanvas({
    stageLabel,
    unit,
    inputValue,
    targetValue,
    status
}: MoleCanvasProps) {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        const width = Math.max(320, parent?.clientWidth ?? 480);
        const height = Math.max(220, Math.round(width * 0.62));
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "rgba(8, 10, 18, 0.9)";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 8; i += 1) {
            const y = (height / 8) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        const color = statusColors[status];
        const ratio = targetValue && targetValue > 0 && inputValue !== null ? Math.min(1, Math.max(0, inputValue / targetValue)) : 0;

        const centerX = width / 2;
        const baseY = height * 0.78;
        const standHeight = height * 0.35;
        const plateWidth = width * 0.52;
        const plateHeight = 10;

        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(centerX - plateWidth / 2, baseY - plateHeight, plateWidth, plateHeight);

        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.fillRect(centerX - 12, baseY - standHeight, 24, standHeight);

        const beakerWidth = width * 0.26;
        const beakerHeight = height * 0.32;
        const beakerX = centerX - beakerWidth / 2;
        const beakerY = baseY - beakerHeight - plateHeight - 4;

        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 2;
        ctx.strokeRect(beakerX, beakerY, beakerWidth, beakerHeight);

        const fillHeight = beakerHeight * ratio;
        if (fillHeight > 0) {
            const gradient = ctx.createLinearGradient(0, beakerY + beakerHeight, 0, beakerY + beakerHeight - fillHeight);
            gradient.addColorStop(0, `${color}55`);
            gradient.addColorStop(1, `${color}aa`);
            ctx.fillStyle = gradient;
            ctx.fillRect(beakerX + 2, beakerY + beakerHeight - fillHeight + 2, beakerWidth - 4, fillHeight - 4);
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - plateWidth / 2, baseY - plateHeight);
        ctx.lineTo(centerX + plateWidth / 2, baseY - plateHeight);
        ctx.stroke();

        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(centerX - 90, baseY + 10, 180, 42);
        ctx.strokeStyle = color;
        ctx.strokeRect(centerX - 90, baseY + 10, 180, 42);

        const displayValue = inputValue !== null ? inputValue : targetValue ?? 0;
        const displayText = `${displayValue.toFixed(2)} ${unit}`.trim();
        ctx.fillStyle = color;
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.fillText(displayText, centerX, baseY + 38);

        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.font = "bold 10px monospace";
        ctx.fillText(stageLabel, centerX, 20);

        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.font = "10px monospace";
        ctx.fillText(`Fill ${(ratio * 100).toFixed(0)}%`, centerX, 36);
    }, [stageLabel, unit, inputValue, targetValue, status]);

    return (
        <div className="w-full rounded-xl border border-white/10 bg-black/60 overflow-hidden">
            <canvas ref={ref} />
        </div>
    );
}
