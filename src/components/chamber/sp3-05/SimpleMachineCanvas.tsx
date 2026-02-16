"use client";

import { useEffect, useRef } from "react";

interface SimpleMachineCanvasProps {
    stage: "LEVERS" | "PULLEYS" | "INCLINED_PLANES";
    forceRatio: number;
    showForces: boolean;
    translations: any;
}

export default function SimpleMachineCanvas({
    stage,
    forceRatio,
    showForces,
    translations
}: SimpleMachineCanvasProps) {
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

        // Clear canvas
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);

        if (stage === "LEVERS") {
            drawLever(ctx, w, h, forceRatio, showForces);
        } else if (stage === "PULLEYS") {
            drawPulley(ctx, w, h, showForces);
        } else if (stage === "INCLINED_PLANES") {
            drawInclinedPlane(ctx, w, h, showForces);
        }
    }, [stage, forceRatio, showForces]);

    const drawLever = (ctx: CanvasRenderingContext2D, w: number, h: number, ma: number, showForces: boolean) => {
        const centerX = w / 2;
        const centerY = h / 2;
        
        // Fulcrum
        ctx.fillStyle = "#888";
        ctx.beginPath();
        ctx.moveTo(centerX - 15, centerY + 20);
        ctx.lineTo(centerX, centerY);
        ctx.lineTo(centerX + 15, centerY + 20);
        ctx.closePath();
        ctx.fill();

        // Lever bar
        const leverLength = 200;
        const effortArmLength = leverLength * (ma / (ma + 1));
        const loadArmLength = leverLength - effortArmLength;

        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(centerX - effortArmLength, centerY);
        ctx.lineTo(centerX + loadArmLength, centerY);
        ctx.stroke();

        // Effort side (left)
        ctx.fillStyle = "#00ff00";
        ctx.beginPath();
        ctx.arc(centerX - effortArmLength, centerY, 12, 0, Math.PI * 2);
        ctx.fill();

        // Load side (right)
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.arc(centerX + loadArmLength, centerY, 12, 0, Math.PI * 2);
        ctx.fill();

        if (showForces) {
            // Effort force arrow (down)
            drawArrow(ctx, centerX - effortArmLength, centerY + 15, centerX - effortArmLength, centerY + 60, "#00ff00", "Fe");
            
            // Load force arrow (down)
            drawArrow(ctx, centerX + loadArmLength, centerY + 15, centerX + loadArmLength, centerY + 80, "#ff0000", "Fl");

            // Labels
            ctx.fillStyle = "#fff";
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText(`MA = ${ma}`, centerX, centerY - 30);
            ctx.fillText(`de = ${effortArmLength.toFixed(0)}`, centerX - effortArmLength / 2, centerY - 10);
            ctx.fillText(`dl = ${loadArmLength.toFixed(0)}`, centerX + loadArmLength / 2, centerY - 10);
        }

        // Basel construction site background
        ctx.strokeStyle = "#ffff0040";
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            ctx.strokeRect(w * 0.1 + i * 30, h * 0.8, 20, 40);
        }
    };

    const drawPulley = (ctx: CanvasRenderingContext2D, w: number, h: number, showForces: boolean) => {
        const centerX = w / 2;
        const topY = h * 0.2;
        const bottomY = h * 0.7;
        const pulleyRadius = 30;

        // Fixed pulley at top
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(centerX, topY, pulleyRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Movable pulley at bottom
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(centerX, bottomY, pulleyRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Rope
        ctx.strokeStyle = "#ffff00";
        ctx.lineWidth = 3;
        
        // Left strand
        ctx.beginPath();
        ctx.moveTo(centerX - pulleyRadius, topY);
        ctx.lineTo(centerX - pulleyRadius, bottomY);
        ctx.stroke();

        // Right strand
        ctx.beginPath();
        ctx.moveTo(centerX + pulleyRadius, topY);
        ctx.lineTo(centerX + pulleyRadius, bottomY);
        ctx.stroke();

        // Load
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(centerX - 25, bottomY + pulleyRadius + 10, 50, 40);

        if (showForces) {
            // Effort force
            drawArrow(ctx, centerX - pulleyRadius - 30, topY - 40, centerX - pulleyRadius - 30, topY - 10, "#00ff00", "Fe");
            
            // Load force
            drawArrow(ctx, centerX, bottomY + pulleyRadius + 55, centerX, bottomY + pulleyRadius + 90, "#ff0000", "Fl");

            // Labels
            ctx.fillStyle = "#fff";
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText("n = 2 strands", centerX, topY - 50);
            ctx.fillText("MA = 2", centerX, topY - 35);
        }
    };

    const drawInclinedPlane = (ctx: CanvasRenderingContext2D, w: number, h: number, showForces: boolean) => {
        const baseX = w * 0.2;
        const baseY = h * 0.7;
        const topX = w * 0.8;
        const topY = h * 0.3;
        const planeLength = Math.sqrt((topX - baseX) ** 2 + (topY - baseY) ** 2);
        const height = baseY - topY;

        // Ground
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        ctx.lineTo(w, baseY);
        ctx.stroke();

        // Inclined plane
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.lineTo(topX, topY);
        ctx.stroke();

        // Vertical support
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(topX, topY);
        ctx.lineTo(topX, baseY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Box on plane
        const boxX = (baseX + topX) / 2;
        const boxY = (baseY + topY) / 2;
        ctx.fillStyle = "#ff0000";
        ctx.save();
        ctx.translate(boxX, boxY);
        const angle = Math.atan2(topY - baseY, topX - baseX);
        ctx.rotate(angle);
        ctx.fillRect(-20, -20, 40, 40);
        ctx.restore();

        if (showForces) {
            // Effort force (parallel to plane)
            const effortEndX = boxX + 60 * Math.cos(angle);
            const effortEndY = boxY + 60 * Math.sin(angle);
            drawArrow(ctx, boxX, boxY, effortEndX, effortEndY, "#00ff00", "Fe");

            // Weight force (vertical down)
            drawArrow(ctx, boxX, boxY, boxX, boxY + 70, "#ff0000", "Fl");

            // Dimensions
            ctx.fillStyle = "#fff";
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText(`h = ${height.toFixed(0)}`, topX + 30, (topY + baseY) / 2);
            ctx.fillText(`l = ${planeLength.toFixed(0)}`, (baseX + topX) / 2, baseY + 30);
            ctx.fillText(`MA = l/h`, w * 0.5, h * 0.15);
        }
    };

    const drawArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, label: string) => {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        
        // Arrow line
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Arrow head
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(
            x2 - 10 * Math.cos(angle - Math.PI / 6),
            y2 - 10 * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            x2 - 10 * Math.cos(angle + Math.PI / 6),
            y2 - 10 * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();

        // Label
        ctx.fillStyle = "#fff";
        ctx.font = "bold 12px monospace";
        ctx.textAlign = "center";
        ctx.fillText(label, x2 + 20 * Math.cos(angle), y2 + 20 * Math.sin(angle));
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
