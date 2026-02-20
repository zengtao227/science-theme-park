"use client";

import { useEffect, useRef } from "react";

interface PressureBuoyancyCanvasProps {
    stage: string;
    depth: number;
    objectDensity: number;
    pistonForce: number;
    translations: any;
}

export default function PressureBuoyancyCanvas({
    stage,
    depth,
    objectDensity,
    pistonForce,
    translations
}: PressureBuoyancyCanvasProps) {
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

        if (stage === "PRESSURE") {
            drawPressureDemo(ctx, w, h, depth);
        } else if (stage === "BUOYANCY") {
            drawBuoyancyDemo(ctx, w, h, objectDensity);
        } else if (stage === "HYDRAULICS") {
            drawHydraulicsDemo(ctx, w, h, pistonForce);
        }

    }, [stage, depth, objectDensity, pistonForce]);

    const drawPressureDemo = (ctx: CanvasRenderingContext2D, w: number, h: number, depth: number) => {
        const waterLevel = h * 0.2;
        const maxDepth = 20;
        const depthPixels = (depth / maxDepth) * (h * 0.6);

        // Water
        const gradient = ctx.createLinearGradient(0, waterLevel, 0, h);
        gradient.addColorStop(0, "#0066ff40");
        gradient.addColorStop(1, "#003388");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, waterLevel, w, h - waterLevel);

        // Water surface
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, waterLevel);
        ctx.lineTo(w, waterLevel);
        ctx.stroke();

        // Depth marker
        const markerY = waterLevel + depthPixels;
        ctx.strokeStyle = "#ffff00";
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, markerY);
        ctx.lineTo(w, markerY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Depth label
        ctx.fillStyle = "#ffff00";
        ctx.font = "14px monospace";
        ctx.textAlign = "right";
        ctx.fillText(`${depth}m`, w - 10, markerY - 5);

        // Pressure arrows (increasing with depth)
        const arrowCount = Math.floor(depth / 2) + 1;
        for (let i = 0; i < arrowCount; i++) {
            const y = waterLevel + (depthPixels / arrowCount) * (i + 0.5);
            const arrowLength = 20 + i * 5;
            
            // Left arrow
            ctx.strokeStyle = "#ff0000";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(20 + arrowLength, y);
            ctx.stroke();
            
            // Arrowhead
            ctx.beginPath();
            ctx.moveTo(20 + arrowLength, y);
            ctx.lineTo(20 + arrowLength - 5, y - 3);
            ctx.lineTo(20 + arrowLength - 5, y + 3);
            ctx.closePath();
            ctx.fillStyle = "#ff0000";
            ctx.fill();

            // Right arrow
            ctx.beginPath();
            ctx.moveTo(w - 20, y);
            ctx.lineTo(w - 20 - arrowLength, y);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w - 20 - arrowLength, y);
            ctx.lineTo(w - 20 - arrowLength + 5, y - 3);
            ctx.lineTo(w - 20 - arrowLength + 5, y + 3);
            ctx.closePath();
            ctx.fill();
        }

        // Pressure gauge
        const gaugeX = w / 2;
        const gaugeY = markerY;
        ctx.fillStyle = "#00000080";
        ctx.fillRect(gaugeX - 60, gaugeY - 30, 120, 60);
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 2;
        ctx.strokeRect(gaugeX - 60, gaugeY - 30, 120, 60);

        const pressure = 100000 + depth * 10000; // Simplified
        ctx.fillStyle = "#00ffff";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`P = ${(pressure / 1000).toFixed(0)}kPa`, gaugeX, gaugeY);
    };

    const drawBuoyancyDemo = (ctx: CanvasRenderingContext2D, w: number, h: number, density: number) => {
        const waterLevel = h * 0.3;
        const waterDensity = 1000;

        // Water
        const gradient = ctx.createLinearGradient(0, waterLevel, 0, h);
        gradient.addColorStop(0, "#0066ff40");
        gradient.addColorStop(1, "#003388");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, waterLevel, w, h - waterLevel);

        // Water surface
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, waterLevel);
        ctx.lineTo(w, waterLevel);
        ctx.stroke();

        // Object
        const objectSize = 60;
        const floats = density < waterDensity;
        const objectY = floats ? waterLevel - objectSize / 2 : waterLevel + objectSize;

        // Object color based on density
        const objectColor = floats ? "#00ff00" : "#ff0000";
        ctx.fillStyle = objectColor + "80";
        ctx.fillRect(w / 2 - objectSize / 2, objectY, objectSize, objectSize);
        ctx.strokeStyle = objectColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(w / 2 - objectSize / 2, objectY, objectSize, objectSize);

        // Buoyant force arrow (up)
        const buoyantForce = 100; // Simplified
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w / 2, objectY + objectSize);
        ctx.lineTo(w / 2, objectY + objectSize - buoyantForce);
        ctx.stroke();

        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(w / 2, objectY + objectSize - buoyantForce);
        ctx.lineTo(w / 2 - 5, objectY + objectSize - buoyantForce + 10);
        ctx.lineTo(w / 2 + 5, objectY + objectSize - buoyantForce + 10);
        ctx.closePath();
        ctx.fillStyle = "#00ffff";
        ctx.fill();

        // Weight arrow (down)
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w / 2 + 30, objectY);
        ctx.lineTo(w / 2 + 30, objectY + buoyantForce * (density / waterDensity));
        ctx.stroke();

        // Arrowhead
        const weightEnd = objectY + buoyantForce * (density / waterDensity);
        ctx.beginPath();
        ctx.moveTo(w / 2 + 30, weightEnd);
        ctx.lineTo(w / 2 + 25, weightEnd - 10);
        ctx.lineTo(w / 2 + 35, weightEnd - 10);
        ctx.closePath();
        ctx.fillStyle = "#ff00ff";
        ctx.fill();

        // Labels
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#00ffff";
        ctx.fillText("F_b", w / 2 - 15, objectY + objectSize - buoyantForce / 2);
        ctx.fillStyle = "#ff00ff";
        ctx.fillText("F_g", w / 2 + 50, objectY + 30);

        // Density display
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px monospace";
        ctx.fillText(`ρ = ${density} kg/m^{3}`, w / 2, objectY - 20);
        ctx.fillText(floats ? "FLOATS" : "SINKS", w / 2, objectY - 40);
    };

    const drawHydraulicsDemo = (ctx: CanvasRenderingContext2D, w: number, h: number, force: number) => {
        const baseY = h * 0.7;
        
        // Hydraulic system base
        ctx.fillStyle = "#333333";
        ctx.fillRect(w * 0.1, baseY, w * 0.8, h * 0.2);
        ctx.strokeStyle = "#666666";
        ctx.lineWidth = 2;
        ctx.strokeRect(w * 0.1, baseY, w * 0.8, h * 0.2);

        // Fluid
        ctx.fillStyle = "#0066ff80";
        ctx.fillRect(w * 0.1, baseY, w * 0.8, h * 0.15);

        // Small piston (left)
        const smallPistonX = w * 0.25;
        const smallPistonWidth = 40;
        const smallPistonHeight = 80;
        const smallPistonY = baseY - smallPistonHeight;

        ctx.fillStyle = "#888888";
        ctx.fillRect(smallPistonX - smallPistonWidth / 2, smallPistonY, smallPistonWidth, smallPistonHeight);
        ctx.strokeStyle = "#aaaaaa";
        ctx.lineWidth = 2;
        ctx.strokeRect(smallPistonX - smallPistonWidth / 2, smallPistonY, smallPistonWidth, smallPistonHeight);

        // Large piston (right)
        const largePistonX = w * 0.75;
        const largePistonWidth = 80;
        const largePistonHeight = 100;
        const largePistonY = baseY - largePistonHeight;

        ctx.fillStyle = "#888888";
        ctx.fillRect(largePistonX - largePistonWidth / 2, largePistonY, largePistonWidth, largePistonHeight);
        ctx.strokeStyle = "#aaaaaa";
        ctx.lineWidth = 2;
        ctx.strokeRect(largePistonX - largePistonWidth / 2, largePistonY, largePistonWidth, largePistonHeight);

        // Force arrows
        // Input force (down on small piston)
        ctx.strokeStyle = "#ff0000";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(smallPistonX, smallPistonY - 40);
        ctx.lineTo(smallPistonX, smallPistonY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(smallPistonX, smallPistonY);
        ctx.lineTo(smallPistonX - 7, smallPistonY - 15);
        ctx.lineTo(smallPistonX + 7, smallPistonY - 15);
        ctx.closePath();
        ctx.fillStyle = "#ff0000";
        ctx.fill();

        // Output force (up on large piston)
        const outputForce = force * (largePistonWidth / smallPistonWidth) ** 2;
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(largePistonX, largePistonY);
        ctx.lineTo(largePistonX, largePistonY - 60);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(largePistonX, largePistonY - 60);
        ctx.lineTo(largePistonX - 7, largePistonY - 45);
        ctx.lineTo(largePistonX + 7, largePistonY - 45);
        ctx.closePath();
        ctx.fillStyle = "#00ff00";
        ctx.fill();

        // Labels
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff0000";
        ctx.fillText(`F_1 = ${force}N`, smallPistonX, smallPistonY - 50);
        ctx.fillStyle = "#00ff00";
        ctx.fillText(`F_2 = ${outputForce.toFixed(0)}N`, largePistonX, largePistonY - 70);

        // Area labels
        ctx.fillStyle = "#ffffff";
        ctx.font = "10px monospace";
        ctx.fillText(`A_1`, smallPistonX, baseY + 30);
        ctx.fillText(`A_2`, largePistonX, baseY + 30);
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
