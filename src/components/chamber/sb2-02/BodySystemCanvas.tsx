"use client";

import { useEffect, useRef, useCallback } from "react";

interface BodySystemCanvasProps {
    system: string;
    highlightedOrgan: string | null;
    translations: any;
}

export default function BodySystemCanvas({ system, highlightedOrgan, translations }: BodySystemCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawDigestiveSystem = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, highlight: string | null) => {
        const centerX = w / 2;
        const isHighlighted = (organ: string) => highlight === organ;

        // Body outline
        ctx.strokeStyle = "#ffffff20";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(centerX, h / 2, 80, h * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Stomach
        ctx.fillStyle = isHighlighted("stomach") ? "#0a5d0a" : "#0a3d0a";
        ctx.beginPath();
        ctx.ellipse(centerX, h * 0.4, 40, 30, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Liver
        ctx.fillStyle = isHighlighted("liver") ? "#0a5d0a" : "#0a3d0a";
        ctx.beginPath();
        ctx.moveTo(centerX - 60, h * 0.35);
        ctx.lineTo(centerX - 10, h * 0.35);
        ctx.lineTo(centerX - 35, h * 0.25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Intestines
        ctx.strokeStyle = isHighlighted("intestines") ? "#00ff00" : "#00aa00";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX - 30, h * 0.5);
        for (let i = 0; i < 10; i++) {
            ctx.lineTo(centerX - 30 + (i % 2 === 0 ? 60 : 0), h * 0.5 + i * 5);
        }
        ctx.stroke();

        // Labels
        ctx.fillStyle = "#00ff00";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText("STOMACH", centerX, h * 0.42);
        ctx.fillText("LIVER", centerX - 60, h * 0.32);
    }, []);

    const drawCirculatorySystem = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, highlight: string | null) => {
        const centerX = w / 2;
        const isHighlighted = (organ: string) => highlight === organ;

        // Body outline
        ctx.strokeStyle = "#ffffff20";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(centerX, h / 2, 80, h * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Heart
        ctx.fillStyle = isHighlighted("heart") ? "#3d0a0a" : "#1a0505";
        ctx.beginPath();
        ctx.arc(centerX, h * 0.3, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ff0000";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Arteries (red)
        ctx.strokeStyle = "#ff0000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX, h * 0.3);
        ctx.lineTo(centerX - 60, h * 0.1);
        ctx.moveTo(centerX, h * 0.3);
        ctx.lineTo(centerX + 60, h * 0.1);
        ctx.moveTo(centerX, h * 0.3);
        ctx.lineTo(centerX, h * 0.8);
        ctx.stroke();

        // Veins (blue)
        ctx.strokeStyle = "#0000ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX + 10, h * 0.3);
        ctx.lineTo(centerX + 70, h * 0.1);
        ctx.stroke();

        // Labels
        ctx.fillStyle = "#ff0000";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText("HEART", centerX, h * 0.35);
        ctx.fillText("ARTERIES", centerX - 60, h * 0.08);
        ctx.fillText("VEINS", centerX + 70, h * 0.08);
    }, []);

    const drawRespiratorySystem = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, highlight: string | null) => {
        const centerX = w / 2;
        const isHighlighted = (organ: string) => highlight === organ;

        // Body outline
        ctx.strokeStyle = "#ffffff20";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(centerX, h / 2, 80, h * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Lungs
        ctx.fillStyle = isHighlighted("lungs") ? "#0a2d3d" : "#05161e";
        ctx.beginPath();
        ctx.ellipse(centerX - 35, h * 0.4, 30, 50, 0.2, 0, Math.PI * 2);
        ctx.ellipse(centerX + 35, h * 0.4, 30, 50, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Trachea
        ctx.strokeStyle = "#00ffff";
        ctx.beginPath();
        ctx.moveTo(centerX, h * 0.1);
        ctx.lineTo(centerX, h * 0.3);
        ctx.lineTo(centerX - 20, h * 0.4);
        ctx.moveTo(centerX, h * 0.3);
        ctx.lineTo(centerX + 20, h * 0.4);
        ctx.stroke();

        // Labels
        ctx.fillStyle = "#00ffff";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText("LUNGS", centerX, h * 0.42);
        ctx.fillText("TRACHEA", centerX + 40, h * 0.2);
    }, []);

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

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);

        if (system === "digestive") {
            drawDigestiveSystem(ctx, w, h, highlightedOrgan);
        } else if (system === "circulatory") {
            drawCirculatorySystem(ctx, w, h, highlightedOrgan);
        } else if (system === "respiratory") {
            drawRespiratorySystem(ctx, w, h, highlightedOrgan);
        }

    }, [system, highlightedOrgan, drawDigestiveSystem, drawCirculatorySystem, drawRespiratorySystem]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
