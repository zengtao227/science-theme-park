"use client";

import { useEffect, useRef } from "react";

interface MeasurementCanvasProps {
    tool: string;
    value: number;
    stage: string;
    translations: any;
}

export default function MeasurementCanvas({ tool, value, stage, translations }: MeasurementCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;

        // Clear
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);

        // Draw based on tool
        if (tool === "ruler") {
            drawRuler(ctx, w, h);
        } else if (tool === "scale") {
            drawScale(ctx, w, h, value);
        } else if (tool === "timer") {
            drawTimer(ctx, w, h, value);
        }

    }, [tool, value, stage]);

    const drawRuler = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const centerY = h / 2;
        const rulerLength = w * 0.8;
        const startX = (w - rulerLength) / 2;

        // Ruler body
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(startX, centerY - 20, rulerLength, 40);

        // Border
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, centerY - 20, rulerLength, 40);

        // Markings
        ctx.strokeStyle = "#00ff00";
        ctx.fillStyle = "#00ff00";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";

        for (let i = 0; i <= 10; i++) {
            const x = startX + (rulerLength / 10) * i;
            const tickHeight = i % 5 === 0 ? 15 : 8;
            
            ctx.beginPath();
            ctx.moveTo(x, centerY - 20);
            ctx.lineTo(x, centerY - 20 + tickHeight);
            ctx.stroke();

            if (i % 5 === 0) {
                ctx.fillText(`${i}`, x, centerY + 5);
            }
        }

        // Label
        ctx.font = "12px monospace";
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "center";
        ctx.fillText("RULER [cm]", w / 2, centerY + 35);
    };

    const drawScale = (ctx: CanvasRenderingContext2D, w: number, h: number, value: number) => {
        const centerX = w / 2;
        const centerY = h / 2;

        // Scale platform
        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(centerX - 80, centerY + 20, 160, 15);
        
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.strokeRect(centerX - 80, centerY + 20, 160, 15);

        // Support
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 35);
        ctx.lineTo(centerX, centerY + 60);
        ctx.stroke();

        // Display
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(centerX - 60, centerY - 40, 120, 40);
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.strokeRect(centerX - 60, centerY - 40, 120, 40);

        // Value
        ctx.font = "bold 20px monospace";
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${value.toFixed(2)} kg`, centerX, centerY - 20);

        // Label
        ctx.font = "12px monospace";
        ctx.fillText("DIGITAL SCALE", centerX, centerY + 80);
    };

    const drawTimer = (ctx: CanvasRenderingContext2D, w: number, h: number, value: number) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const radius = 60;

        // Clock face
        ctx.fillStyle = "#0a0a0a";
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Hour marks
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const x1 = centerX + Math.cos(angle) * (radius - 10);
            const y1 = centerY + Math.sin(angle) * (radius - 10);
            const x2 = centerX + Math.cos(angle) * (radius - 5);
            const y2 = centerY + Math.sin(angle) * (radius - 5);
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        // Second hand
        const seconds = value % 60;
        const secondAngle = (seconds * 6 - 90) * Math.PI / 180;
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(secondAngle) * (radius - 15),
            centerY + Math.sin(secondAngle) * (radius - 15)
        );
        ctx.stroke();

        // Center dot
        ctx.fillStyle = "#00ff00";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Digital display
        ctx.font = "14px monospace";
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "center";
        ctx.fillText(`${value.toFixed(1)} s`, centerX, centerY + radius + 25);

        // Label
        ctx.font = "12px monospace";
        ctx.fillText("STOPWATCH", centerX, centerY + radius + 45);
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
