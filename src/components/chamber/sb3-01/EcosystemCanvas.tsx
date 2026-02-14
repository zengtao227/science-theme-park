"use client";

import { useEffect, useRef } from "react";

interface EcosystemCanvasProps {
    stage: "FOOD_CHAINS" | "ENERGY_FLOW" | "CYCLES";
    selectedLevel: number;
    showEnergyFlow: boolean;
    translations: any;
}

export default function EcosystemCanvas({
    stage,
    selectedLevel,
    showEnergyFlow,
    translations
}: EcosystemCanvasProps) {
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

        if (stage === "FOOD_CHAINS") {
            drawFoodChain(ctx, w, h);
        } else if (stage === "ENERGY_FLOW") {
            drawEnergyPyramid(ctx, w, h, selectedLevel, showEnergyFlow);
        } else if (stage === "CYCLES") {
            drawBiogeochemicalCycle(ctx, w, h);
        }
    }, [stage, selectedLevel, showEnergyFlow]);

    const drawFoodChain = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        // Rhine River Food Chain
        const levels = [
            { name: "Algae", y: h * 0.8, color: "#00ff00" },
            { name: "Zooplankton", y: h * 0.6, color: "#00ffff" },
            { name: "Fish", y: h * 0.4, color: "#ff00ff" },
            { name: "Bird", y: h * 0.2, color: "#ffff00" }
        ];

        levels.forEach((level, i) => {
            // Draw organism
            ctx.fillStyle = level.color;
            ctx.beginPath();
            ctx.arc(w / 2, level.y, 20, 0, Math.PI * 2);
            ctx.fill();

            // Draw label
            ctx.fillStyle = "#fff";
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText(level.name, w / 2, level.y + 40);

            // Draw arrow to next level
            if (i < levels.length - 1) {
                ctx.strokeStyle = level.color + "80";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(w / 2, level.y - 20);
                ctx.lineTo(w / 2, levels[i + 1].y + 20);
                ctx.stroke();

                // Arrow head
                ctx.beginPath();
                ctx.moveTo(w / 2, levels[i + 1].y + 20);
                ctx.lineTo(w / 2 - 5, levels[i + 1].y + 30);
                ctx.lineTo(w / 2 + 5, levels[i + 1].y + 30);
                ctx.closePath();
                ctx.fill();
            }
        });

        // Rhine River background
        ctx.strokeStyle = "#0088ff40";
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, h * 0.85 + i * 5);
            ctx.lineTo(w, h * 0.85 + i * 5);
            ctx.stroke();
        }
    };

    const drawEnergyPyramid = (
        ctx: CanvasRenderingContext2D,
        w: number,
        h: number,
        level: number,
        showFlow: boolean
    ) => {
        const pyramidLevels = [
            { name: "Producers", energy: 10000, width: 0.8, color: "#00ff00" },
            { name: "Primary", energy: 1000, width: 0.6, color: "#00ffff" },
            { name: "Secondary", energy: 100, width: 0.4, color: "#ff00ff" },
            { name: "Tertiary", energy: 10, width: 0.2, color: "#ffff00" }
        ];

        pyramidLevels.forEach((lvl, i) => {
            const y = h - (i + 1) * (h / 5);
            const levelWidth = w * lvl.width;
            const x = (w - levelWidth) / 2;

            // Highlight selected level
            if (i + 1 === level) {
                ctx.fillStyle = lvl.color + "40";
            } else {
                ctx.fillStyle = lvl.color + "20";
            }

            ctx.fillRect(x, y, levelWidth, h / 6);

            // Border
            ctx.strokeStyle = lvl.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, levelWidth, h / 6);

            // Label
            ctx.fillStyle = "#fff";
            ctx.font = "bold 14px monospace";
            ctx.textAlign = "center";
            ctx.fillText(lvl.name, w / 2, y + 20);

            // Energy value
            if (showFlow) {
                ctx.font = "12px monospace";
                ctx.fillText(`${lvl.energy} kJ`, w / 2, y + 40);
            }
        });

        // 10% rule annotation
        if (showFlow && level > 1 && level <= 4) {
            const fromLevel = pyramidLevels[level - 2];
            const toLevel = pyramidLevels[level - 1];
            
            ctx.strokeStyle = "#00ff0080";
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 5]);
            
            const fromY = h - (level - 1) * (h / 5) + h / 12;
            const toY = h - level * (h / 5) + h / 12;
            
            ctx.beginPath();
            ctx.moveTo(w * 0.85, fromY);
            ctx.lineTo(w * 0.85, toY);
            ctx.stroke();
            ctx.setLineDash([]);

            // 10% label
            ctx.fillStyle = "#00ff00";
            ctx.font = "bold 12px monospace";
            ctx.textAlign = "left";
            ctx.fillText("10%", w * 0.87, (fromY + toY) / 2);
        }
    };

    const drawBiogeochemicalCycle = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        // Carbon Cycle simplified
        const centerX = w / 2;
        const centerY = h / 2;
        const radius = Math.min(w, h) * 0.3;

        const nodes = [
            { name: "CO₂", angle: 0, color: "#ff0000" },
            { name: "Plants", angle: Math.PI / 2, color: "#00ff00" },
            { name: "Animals", angle: Math.PI, color: "#00ffff" },
            { name: "Decomposers", angle: (3 * Math.PI) / 2, color: "#ffff00" }
        ];

        // Draw cycle arrows
        nodes.forEach((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            
            const x1 = centerX + radius * Math.cos(node.angle);
            const y1 = centerY + radius * Math.sin(node.angle);
            const x2 = centerX + radius * Math.cos(nextNode.angle);
            const y2 = centerY + radius * Math.sin(nextNode.angle);

            // Curved arrow
            ctx.strokeStyle = node.color + "80";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, node.angle, nextNode.angle);
            ctx.stroke();

            // Arrow head
            ctx.fillStyle = node.color;
            const arrowAngle = nextNode.angle - 0.2;
            const arrowX = centerX + radius * Math.cos(arrowAngle);
            const arrowY = centerY + radius * Math.sin(arrowAngle);
            
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(
                arrowX - 10 * Math.cos(arrowAngle + Math.PI / 6),
                arrowY - 10 * Math.sin(arrowAngle + Math.PI / 6)
            );
            ctx.lineTo(
                arrowX - 10 * Math.cos(arrowAngle - Math.PI / 6),
                arrowY - 10 * Math.sin(arrowAngle - Math.PI / 6)
            );
            ctx.closePath();
            ctx.fill();
        });

        // Draw nodes
        nodes.forEach((node) => {
            const x = centerX + radius * Math.cos(node.angle);
            const y = centerY + radius * Math.sin(node.angle);

            // Node circle
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.fill();

            // Node border
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label
            ctx.fillStyle = "#fff";
            ctx.font = "bold 12px monospace";
            ctx.textAlign = "center";
            ctx.fillText(node.name, x, y + 50);
        });

        // Center label
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.fillText("Carbon Cycle", centerX, centerY);
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
