"use client";

import { useEffect, useRef } from "react";

interface BodySystemCanvasProps {
    system: string;
    highlightedOrgan: string | null;
    translations: any;
}

export default function BodySystemCanvas({ system, highlightedOrgan, translations }: BodySystemCanvasProps) {
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

        if (system === "digestive") {
            drawDigestiveSystem(ctx, w, h, highlightedOrgan);
        } else if (system === "circulatory") {
            drawCirculatorySystem(ctx, w, h, highlightedOrgan);
        } else if (system === "respiratory") {
            drawRespiratorySystem(ctx, w, h, highlightedOrgan);
        }

    }, [system, highlightedOrgan]);

    const drawDigestiveSystem = (ctx: CanvasRenderingContext2D, w: number, h: number, highlight: string | null) => {
        const centerX = w / 2;
        
        // Body outline
        ctx.strokeStyle = "#ffffff20";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(centerX, h / 2, 80, h * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Mouth
        const isHighlighted = (organ: string) => highlight === organ;
        
        ctx.fillStyle = isHighlighted("mouth") ? "#00ffff" : "#00ffff40";
        ctx.beginPath();
        ctx.arc(centerX, h * 0.15, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Esophagus
        ctx.strokeStyle = "#00ffff80";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(centerX, h * 0.17);
        ctx.lineTo(centerX, h * 0.28);
        ctx.stroke();

        // Stomach
        ctx.fillStyle = isHighlighted("stomach") ? "#ff00ff" : "#ff00ff40";
        ctx.beginPath();
        ctx.ellipse(centerX - 20, h * 0.35, 30, 40, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Small intestine (coiled)
        ctx.strokeStyle = isHighlighted("small intestine") || isHighlighted("small_intestine") ? "#00ff00" : "#00ff0040";
        ctx.lineWidth = 12;
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            const y = h * 0.5 + i * 30;
            ctx.moveTo(centerX - 40, y);
            ctx.bezierCurveTo(centerX - 60, y + 10, centerX + 60, y + 10, centerX + 40, y);
        }
        ctx.stroke();

        // Liver (right side)
        ctx.fillStyle = isHighlighted("liver") ? "#ff8800" : "#ff880040";
        ctx.beginPath();
        ctx.ellipse(centerX + 40, h * 0.32, 35, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ff8800";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pancreas (behind stomach)
        ctx.fillStyle = isHighlighted("pancreas") ? "#ffff00" : "#ffff0040";
        ctx.beginPath();
        ctx.ellipse(centerX + 10, h * 0.38, 40, 15, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffff00";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Labels
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#00ffff";
        ctx.fillText("MOUTH", centerX, h * 0.1);
        ctx.fillStyle = "#ff00ff";
        ctx.fillText("STOMACH", centerX - 50, h * 0.35);
        ctx.fillStyle = "#00ff00";
        ctx.fillText("INTESTINE", centerX, h * 0.75);
        ctx.fillStyle = "#ff8800";
        ctx.fillText("LIVER", centerX + 70, h * 0.32);
    };

    const drawCirculatorySystem = (ctx: CanvasRenderingContext2D, w: number, h: number, highlight: string | null) => {
        const centerX = w / 2;
        const isHighlighted = (organ: string) => highlight === organ;

        // Body outline
        ctx.strokeStyle = "#ffffff20";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(centerX, h / 2, 80, h * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Heart
        ctx.fillStyle = isHighlighted("heart") ? "#ff0000" : "#ff000040";
        ctx.beginPath();
        ctx.moveTo(centerX, h * 0.35);
        ctx.bezierCurveTo(centerX - 20, h * 0.25, centerX - 40, h * 0.3, centerX, h * 0.45);
        ctx.bezierCurveTo(centerX + 40, h * 0.3, centerX + 20, h * 0.25, centerX, h * 0.35);
        ctx.fill();
        ctx.strokeStyle = "#ff0000";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Arteries (red - oxygenated)
        ctx.strokeStyle = isHighlighted("arteries") ? "#ff0000" : "#ff000080";
        ctx.lineWidth = 6;
        
        // To head
        ctx.beginPath();
        ctx.moveTo(centerX, h * 0.35);
        ctx.lineTo(centerX, h * 0.1);
        ctx.stroke();

        // To arms
        ctx.beginPath();
        ctx.moveTo(centerX, h * 0.38);
        ctx.lineTo(centerX - 60, h * 0.4);
        ctx.moveTo(centerX, h * 0.38);
        ctx.lineTo(centerX + 60, h * 0.4);
        ctx.stroke();

        // To legs
        ctx.beginPath();
        ctx.moveTo(centerX, h * 0.45);
        ctx.lineTo(centerX - 20, h * 0.85);
        ctx.moveTo(centerX, h * 0.45);
        ctx.lineTo(centerX + 20, h * 0.85);
        ctx.stroke();

        // Veins (blue - deoxygenated)
        ctx.strokeStyle = isHighlighted("veins") ? "#0000ff" : "#0000ff80";
        ctx.lineWidth = 5;
        
        // From head
        ctx.beginPath();
        ctx.moveTo(centerX + 10, h * 0.1);
        ctx.lineTo(centerX + 10, h * 0.35);
        ctx.stroke();

        // From arms
        ctx.beginPath();
        ctx.moveTo(centerX - 55, h * 0.42);
        ctx.lineTo(centerX + 5, h * 0.4);
        ctx.moveTo(centerX + 55, h * 0.42);
        ctx.lineTo(centerX + 5, h * 0.4);
        ctx.stroke();

        // Capillaries (purple - exchange sites)
        if (isHighlighted("capillaries")) {
            ctx.strokeStyle = "#ff00ff";
            ctx.lineWidth = 2;
            
            // Head capillaries
            ctx.beginPath();
            ctx.arc(centerX, h * 0.08, 8, 0, Math.PI * 2);
            ctx.stroke();
            
            // Arm capillaries
            ctx.beginPath();
            ctx.arc(centerX - 60, h * 0.42, 6, 0, Math.PI * 2);
            ctx.arc(centerX + 60, h * 0.42, 6, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Labels
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff0000";
        ctx.fillText("HEART", centerX, h * 0.5);
        ctx.fillStyle = "#ff0000";
        ctx.fillText("ARTERIES", centerX - 70, h * 0.25);
        ctx.fillStyle = "#0000ff";
        ctx.fillText("VEINS", centerX + 70, h * 0.25);
    };

    const drawRespiratorySystem = (ctx: CanvasRenderingContext2D, w: number, h: number, highlight: string | null) => {
        const centerX = w / 2;
        const isHighlighted = (organ: string) => highlight === organ;

        // Body outline
        ctx.strokeStyle = "#ffffff20";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(centerX, h / 2, 80, h * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Nose/Mouth
        ctx.fillStyle = "#00ffff40";
        ctx.beginPath();
        ctx.arc(centerX, h * 0.12, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Trachea
        ctx.strokeStyle = isHighlighted("trachea") ? "#00ffff" : "#00ffff80";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(centerX, h * 0.15);
        ctx.lineTo(centerX, h * 0.35);
        ctx.stroke();

        // Bronchi
        ctx.strokeStyle = isHighlighted("bronchi") ? "#00ff00" : "#00ff0080";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(centerX, h * 0.35);
        ctx.lineTo(centerX - 30, h * 0.45);
        ctx.moveTo(centerX, h * 0.35);
        ctx.lineTo(centerX + 30, h * 0.45);
        ctx.stroke();

        // Lungs
        ctx.fillStyle = isHighlighted("lungs") ? "#ff00ff" : "#ff00ff40";
        
        // Left lung
        ctx.beginPath();
        ctx.ellipse(centerX - 35, h * 0.5, 30, 60, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Right lung
        ctx.beginPath();
        ctx.ellipse(centerX + 35, h * 0.5, 30, 60, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Alveoli (small circles in lungs)
        if (isHighlighted("alveoli")) {
            ctx.fillStyle = "#ffff00";
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const x = centerX - 35 + Math.cos(angle) * 20;
                const y = h * 0.5 + Math.sin(angle) * 40;
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const x = centerX + 35 + Math.cos(angle) * 20;
                const y = h * 0.5 + Math.sin(angle) * 40;
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Diaphragm
        ctx.strokeStyle = isHighlighted("diaphragm") ? "#ff8800" : "#ff880080";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(centerX - 70, h * 0.7);
        ctx.quadraticCurveTo(centerX, h * 0.75, centerX + 70, h * 0.7);
        ctx.stroke();

        // Labels
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#00ffff";
        ctx.fillText("TRACHEA", centerX + 30, h * 0.25);
        ctx.fillStyle = "#00ff00";
        ctx.fillText("BRONCHI", centerX, h * 0.4);
        ctx.fillStyle = "#ff00ff";
        ctx.fillText("LUNGS", centerX, h * 0.65);
        ctx.fillStyle = "#ff8800";
        ctx.fillText("DIAPHRAGM", centerX, h * 0.8);
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
