"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface OrganicReactionCanvasProps {
    stage: "COMBUSTION" | "SUBSTITUTION" | "ADDITION";
    animationSpeed: number;
    showMechanism: boolean;
    translations: any;
}

export default function OrganicReactionCanvas({
    stage,
    animationSpeed,
    showMechanism,
    translations
}: OrganicReactionCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [animationFrame, setAnimationFrame] = useState(0);

    const drawMolecule = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, formula: string, color: string) => {
        // Molecule circle
        ctx.fillStyle = color + "40";
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Formula text
        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(formula, x, y);
    }, []);

    const drawArrow = useCallback((ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) => {
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
            x2 - 12 * Math.cos(angle - Math.PI / 6),
            y2 - 12 * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            x2 - 12 * Math.cos(angle + Math.PI / 6),
            y2 - 12 * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
    }, []);

    const drawCombustion = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, frame: number, showMech: boolean) => {
        const centerY = h / 2;

        // Methane molecule (CH4)
        const ch4X = w * 0.2;
        drawMolecule(ctx, ch4X, centerY, "CH_4", "#00ff00");

        // Oxygen molecules
        const o2X = w * 0.4;
        drawMolecule(ctx, o2X, centerY - 30, "O_2", "#00ffff");
        drawMolecule(ctx, o2X, centerY + 30, "O_2", "#00ffff");

        // Reaction arrow
        const arrowX = w * 0.5;
        drawArrow(ctx, arrowX - 30, centerY, arrowX + 30, centerY, "#ffff00");

        // Flame animation
        if (showMech) {
            const flameY = centerY - 40 + Math.sin(frame * 0.2) * 5;
            ctx.fillStyle = `rgba(255, ${100 + Math.sin(frame * 0.3) * 50}, 0, 0.8)`;
            ctx.beginPath();
            ctx.moveTo(arrowX, flameY);
            ctx.lineTo(arrowX - 10, flameY + 20);
            ctx.lineTo(arrowX + 10, flameY + 20);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "#fff";
            ctx.font = "10px monospace";
            ctx.textAlign = "center";
            ctx.fillText("Heat", arrowX, flameY - 10);
        }

        // Products
        const co2X = w * 0.7;
        drawMolecule(ctx, co2X, centerY - 30, "CO_2", "#ff0000");
        const h2oX = w * 0.75;
        drawMolecule(ctx, h2oX, centerY + 30, "H_2O", "#0088ff");

        // Energy release
        if (showMech) {
            const energyAlpha = (Math.sin(frame * 0.1) + 1) / 2;
            ctx.strokeStyle = `rgba(255, 200, 0, ${energyAlpha})`;
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.arc(w * 0.8, centerY, 30 + i * 15, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    }, [drawMolecule, drawArrow]);

    const drawSubstitution = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, frame: number, showMech: boolean) => {
        const centerY = h / 2;

        // Alkane (CH4)
        const alkaneX = w * 0.2;
        drawMolecule(ctx, alkaneX, centerY, "CH_4", "#00ff00");

        // Halogen (Cl2)
        const halogenX = w * 0.4;
        drawMolecule(ctx, halogenX, centerY, "Cl_2", "#ffff00");

        // Light/UV
        if (showMech) {
            const lightY = centerY - 50;
            const lightAlpha = (Math.sin(frame * 0.2) + 1) / 2;
            ctx.strokeStyle = `rgba(255, 255, 0, ${lightAlpha})`;
            ctx.lineWidth = 3;
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI / 2) + frame * 0.05;
                ctx.beginPath();
                ctx.moveTo(w * 0.5, lightY);
                ctx.lineTo(w * 0.5 + Math.cos(angle) * 20, lightY + Math.sin(angle) * 20);
                ctx.stroke();
            }

            ctx.fillStyle = "#fff";
            ctx.font = "10px monospace";
            ctx.textAlign = "center";
            ctx.fillText("UV Light", w * 0.5, lightY - 15);
        }

        // Reaction arrow
        drawArrow(ctx, w * 0.5 - 20, centerY, w * 0.5 + 20, centerY, "#ff00ff");

        // Products
        const productX = w * 0.7;
        drawMolecule(ctx, productX, centerY - 25, "CH_3Cl", "#ff00ff");
        drawMolecule(ctx, productX, centerY + 25, "HCl", "#00ffff");

        // Free radical mechanism
        if (showMech) {
            const radicalX = w * 0.5;
            const radicalY = centerY + 60;
            ctx.fillStyle = "#ff0000";
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText("Cl• + CH_4 → CH_3• + HCl", radicalX, radicalY);
            ctx.fillText("CH_3• + Cl_2 → CH_3Cl + Cl•", radicalX, radicalY + 15);
        }
    }, [drawMolecule, drawArrow]);

    const drawAddition = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, frame: number, showMech: boolean) => {
        const centerY = h / 2;

        // Alkene (C2H4) with double bond
        const alkeneX = w * 0.25;
        drawMolecule(ctx, alkeneX, centerY, "C_2H_4", "#00ff00");

        // Double bond indicator
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(alkeneX - 15, centerY);
        ctx.lineTo(alkeneX + 15, centerY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(alkeneX - 15, centerY + 5);
        ctx.lineTo(alkeneX + 15, centerY + 5);
        ctx.stroke();

        // Reagent (H2 or Br2)
        const reagentX = w * 0.45;
        drawMolecule(ctx, reagentX, centerY, "H_2", "#00ffff");

        // Reaction arrow
        const arrowX = w * 0.55;
        drawArrow(ctx, arrowX - 30, centerY, arrowX + 30, centerY, "#ff00ff");

        // Catalyst
        if (showMech) {
            ctx.fillStyle = "#ffff00";
            ctx.font = "10px monospace";
            ctx.textAlign = "center";
            ctx.fillText("Ni catalyst", arrowX, centerY - 20);
        }

        // Product (C2H6) - single bond
        const productX = w * 0.75;
        drawMolecule(ctx, productX, centerY, "C_2H_6", "#ff00ff");

        // Single bond indicator
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(productX - 15, centerY);
        ctx.lineTo(productX + 15, centerY);
        ctx.stroke();

        // Mechanism animation
        if (showMech) {
            const mechY = centerY + 60;
            const progress = (frame % 50) / 50;

            // Show electron movement
            ctx.fillStyle = `rgba(0, 255, 255, ${1 - progress})`;
            ctx.beginPath();
            ctx.arc(
                alkeneX + (reagentX - alkeneX) * progress,
                centerY - 20,
                5,
                0,
                Math.PI * 2
            );
            ctx.fill();

            ctx.fillStyle = "#fff";
            ctx.font = "10px monospace";
            ctx.textAlign = "center";
            ctx.fillText("π bond breaks, σ bonds form", w * 0.5, mechY);
        }
    }, [drawMolecule, drawArrow]);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationFrame((prev) => (prev + 1) % 100);
        }, 50 / animationSpeed);

        return () => clearInterval(interval);
    }, [animationSpeed]);

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

        if (stage === "COMBUSTION") {
            drawCombustion(ctx, w, h, animationFrame, showMechanism);
        } else if (stage === "SUBSTITUTION") {
            drawSubstitution(ctx, w, h, animationFrame, showMechanism);
        } else if (stage === "ADDITION") {
            drawAddition(ctx, w, h, animationFrame, showMechanism);
        }
    }, [stage, animationFrame, showMechanism, drawAddition, drawCombustion, drawSubstitution]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
