"use client";

import { useEffect, useRef } from "react";

interface PhotosynthesisCanvasProps {
    lightIntensity: number;
    co2Level: number;
    temperature: number;
    stage: string;
    translations: any;
}

export default function PhotosynthesisCanvas({
    lightIntensity,
    co2Level,
    temperature,
    stage,
    translations
}: PhotosynthesisCanvasProps) {
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

        if (stage === "EQUATION") {
            drawEquationFlow(ctx, w, h, lightIntensity);
        } else if (stage === "FACTORS") {
            drawFactorsGraph(ctx, w, h, lightIntensity, co2Level, temperature);
        } else if (stage === "CHLOROPLAST") {
            drawChloroplast(ctx, w, h);
        }

    }, [lightIntensity, co2Level, temperature, stage]);

    const drawEquationFlow = (ctx: CanvasRenderingContext2D, w: number, h: number, light: number) => {
        const centerY = h / 2;
        
        // Reactants (left)
        ctx.font = "14px monospace";
        ctx.fillStyle = "#00ffff";
        ctx.textAlign = "center";
        ctx.fillText("6CO₂", w * 0.15, centerY - 20);
        ctx.fillText("6H₂O", w * 0.15, centerY + 20);

        // Light arrow
        const lightAlpha = light / 100;
        ctx.strokeStyle = `rgba(255, 255, 0, ${lightAlpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w * 0.25, centerY - 40);
        ctx.lineTo(w * 0.45, centerY);
        ctx.stroke();

        // Arrow label
        ctx.fillStyle = `rgba(255, 255, 0, ${lightAlpha})`;
        ctx.font = "10px monospace";
        ctx.fillText("LIGHT", w * 0.35, centerY - 45);

        // Chloroplast (center)
        ctx.fillStyle = "#0a4d0a";
        ctx.beginPath();
        ctx.ellipse(w * 0.5, centerY, 60, 40, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(w * 0.5, centerY, 60, 40, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Grana (stacks)
        for (let i = 0; i < 3; i++) {
            const x = w * 0.5 - 20 + i * 20;
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(x - 8, centerY - 10, 16, 4);
            ctx.fillRect(x - 8, centerY - 4, 16, 4);
            ctx.fillRect(x - 8, centerY + 2, 16, 4);
        }

        // Products (right)
        ctx.fillStyle = "#00ff00";
        ctx.font = "14px monospace";
        ctx.fillText("C₆H₁₂O₆", w * 0.85, centerY - 20);
        ctx.fillText("6O₂", w * 0.85, centerY + 20);

        // Arrow to products
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w * 0.6, centerY);
        ctx.lineTo(w * 0.75, centerY);
        ctx.stroke();

        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(w * 0.75, centerY);
        ctx.lineTo(w * 0.72, centerY - 5);
        ctx.lineTo(w * 0.72, centerY + 5);
        ctx.closePath();
        ctx.fill();
    };

    const drawFactorsGraph = (ctx: CanvasRenderingContext2D, w: number, h: number, light: number, co2: number, temp: number) => {
        const graphH = h * 0.6;
        const graphY = h * 0.2;
        const barWidth = w * 0.2;
        const spacing = w * 0.05;

        // Axes
        ctx.strokeStyle = "#ffffff40";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(spacing, graphY);
        ctx.lineTo(spacing, graphY + graphH);
        ctx.lineTo(w - spacing, graphY + graphH);
        ctx.stroke();

        // Bars
        const bars = [
            { x: spacing * 2, value: light, color: "#ffff00", label: "Light" },
            { x: spacing * 2 + barWidth + spacing, value: co2, color: "#00ffff", label: "CO₂" },
            { x: spacing * 2 + (barWidth + spacing) * 2, value: temp * 2, color: "#ff8800", label: "Temp" }
        ];

        bars.forEach(bar => {
            const barH = (bar.value / 100) * graphH;
            
            // Bar
            ctx.fillStyle = bar.color + "40";
            ctx.fillRect(bar.x, graphY + graphH - barH, barWidth, barH);
            
            ctx.strokeStyle = bar.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(bar.x, graphY + graphH - barH, barWidth, barH);

            // Label
            ctx.fillStyle = bar.color;
            ctx.font = "10px monospace";
            ctx.textAlign = "center";
            ctx.fillText(bar.label, bar.x + barWidth / 2, graphY + graphH + 20);
            
            // Value
            ctx.fillText(`${Math.round(bar.value)}%`, bar.x + barWidth / 2, graphY + graphH - barH - 5);
        });

        // Rate indicator
        const avgRate = (light + co2 + temp * 2) / 3;
        ctx.fillStyle = "#00ff00";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`Rate: ${Math.round(avgRate)}%`, w / 2, h * 0.9);
    };

    const drawChloroplast = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        const centerX = w / 2;
        const centerY = h / 2;

        // Outer membrane
        ctx.fillStyle = "#0a3d0a";
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 120, 80, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 120, 80, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Stroma (background)
        ctx.fillStyle = "#0a2d0a";
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 110, 70, 0, 0, Math.PI * 2);
        ctx.fill();

        // Grana stacks (thylakoids)
        const granaPositions = [
            { x: centerX - 50, y: centerY - 20 },
            { x: centerX, y: centerY - 30 },
            { x: centerX + 50, y: centerY - 20 },
            { x: centerX - 30, y: centerY + 20 },
            { x: centerX + 30, y: centerY + 20 }
        ];

        granaPositions.forEach(pos => {
            // Stack of thylakoids
            for (let i = 0; i < 4; i++) {
                ctx.fillStyle = i % 2 === 0 ? "#00ff00" : "#00cc00";
                ctx.fillRect(pos.x - 15, pos.y + i * 5, 30, 4);
                
                ctx.strokeStyle = "#00ff00";
                ctx.lineWidth = 1;
                ctx.strokeRect(pos.x - 15, pos.y + i * 5, 30, 4);
            }
        });

        // Labels
        ctx.fillStyle = "#00ff00";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        
        // Thylakoid label
        ctx.fillText("THYLAKOID", centerX, centerY - 55);
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 50);
        ctx.lineTo(centerX, centerY - 35);
        ctx.stroke();

        // Stroma label
        ctx.fillText("STROMA", centerX + 70, centerY + 50);
        ctx.beginPath();
        ctx.moveTo(centerX + 70, centerY + 45);
        ctx.lineTo(centerX + 40, centerY + 10);
        ctx.stroke();
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
