"use client";

import { useEffect, useRef } from "react";

interface FunctionalGroupCanvasProps {
    molecule: string;
    highlight: boolean;
    stage: string;
}

export default function FunctionalGroupCanvas({ molecule, highlight, stage }: FunctionalGroupCanvasProps) {
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

        drawMolecule(ctx, w, h, molecule, highlight);

    }, [molecule, highlight, stage]);

    const drawAtom = (ctx: CanvasRenderingContext2D, x: number, y: number, symbol: string, color: string, isHighlighted: boolean = false) => {
        const radius = 18;

        // Highlight glow
        if (isHighlighted) {
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
            gradient.addColorStop(0, color + "60");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Atom circle
        ctx.fillStyle = color + (isHighlighted ? "80" : "40");
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isHighlighted ? "#fff" : color;
        ctx.lineWidth = isHighlighted ? 3 : 2;
        ctx.stroke();

        // Symbol
        ctx.fillStyle = isHighlighted ? "#fff" : color;
        ctx.font = `bold ${isHighlighted ? "16" : "14"}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(symbol, x, y);
    };

    const drawBond = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string = "#ffffff80", width: number = 3) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    const drawMolecule = (ctx: CanvasRenderingContext2D, w: number, h: number, mol: string, hl: boolean) => {
        const cx = w / 2;
        const cy = h / 2;

        if (mol === "methanol") {
            // CH3OH
            drawAtom(ctx, cx - 20, cy, "C", "#00ff00");
            drawAtom(ctx, cx + 25, cy, "O", "#ff0000", hl);
            drawAtom(ctx, cx + 60, cy, "H", "#ffffff", hl);

            drawBond(ctx, cx - 20, cy, cx + 25, cy, hl ? "#00ffff80" : "#ffffff80");
            drawBond(ctx, cx + 25, cy, cx + 60, cy, hl ? "#00ffff80" : "#ffffff80");

            drawAtom(ctx, cx - 45, cy, "H", "#ffffff");
            drawAtom(ctx, cx - 20, cy - 35, "H", "#ffffff");
            drawAtom(ctx, cx - 20, cy + 35, "H", "#ffffff");

            drawBond(ctx, cx - 20, cy, cx - 45, cy);
            drawBond(ctx, cx - 20, cy, cx - 20, cy - 35);
            drawBond(ctx, cx - 20, cy, cx - 20, cy + 35);
        } else if (mol === "ethanol" || mol === "ethanoic_acid") {
            const isAcid = mol === "ethanoic_acid";
            // C-C chain
            drawAtom(ctx, cx - 40, cy, "C", "#00ff00");
            drawAtom(ctx, cx, cy, "C", "#00ff00");
            drawBond(ctx, cx - 40, cy, cx, cy);

            if (isAcid) {
                // -COOH
                drawAtom(ctx, cx + 30, cy - 30, "O", "#ff0000", hl);
                drawAtom(ctx, cx + 30, cy + 30, "O", "#ff0000", hl);
                drawAtom(ctx, cx + 60, cy + 30, "H", "#ffffff", hl);

                // Double bond to O
                ctx.lineWidth = 3;
                ctx.strokeStyle = hl ? "#00ffff80" : "#ffffff80";
                ctx.beginPath();
                ctx.moveTo(cx + 5, cy - 5); ctx.lineTo(cx + 25, cy - 25);
                ctx.moveTo(cx - 5, cy + 5); ctx.lineTo(cx + 15, cy + 25);
                ctx.stroke();

                drawBond(ctx, cx, cy, cx + 30, cy + 30, hl ? "#00ffff80" : "#ffffff80");
                drawBond(ctx, cx + 30, cy + 30, cx + 60, cy + 30, hl ? "#00ffff80" : "#ffffff80");
            } else {
                // -OH
                drawAtom(ctx, cx + 40, cy, "O", "#ff0000", hl);
                drawAtom(ctx, cx + 75, cy, "H", "#ffffff", hl);
                drawBond(ctx, cx, cy, cx + 40, cy, hl ? "#00ffff80" : "#ffffff80");
                drawBond(ctx, cx + 40, cy, cx + 75, cy, hl ? "#00ffff80" : "#ffffff80");
            }
            // Hydrogens on first C
            drawAtom(ctx, cx - 75, cy, "H", "#ffffff");
            drawAtom(ctx, cx - 40, cy - 35, "H", "#ffffff");
            drawAtom(ctx, cx - 40, cy + 35, "H", "#ffffff");
            drawBond(ctx, cx - 40, cy, cx - 75, cy);
            drawBond(ctx, cx - 40, cy, cx - 40, cy - 35);
            drawBond(ctx, cx - 40, cy, cx - 40, cy + 35);
        } else if (mol === "ethanal") {
            // CH3CHO
            drawAtom(ctx, cx - 40, cy, "C", "#00ff00");
            drawAtom(ctx, cx, cy, "C", "#00ff00");
            drawBond(ctx, cx - 40, cy, cx, cy);

            // -CHO
            drawAtom(ctx, cx + 30, cy - 30, "O", "#ff0000", hl);
            drawAtom(ctx, cx + 40, cy + 10, "H", "#ffffff", hl);

            // Double bond C=O
            ctx.lineWidth = 4;
            ctx.strokeStyle = hl ? "#00ffff80" : "#ffffff80";
            ctx.beginPath();
            ctx.moveTo(cx + 5, cy - 5); ctx.lineTo(cx + 25, cy - 25);
            ctx.stroke();

            drawBond(ctx, cx, cy, cx + 40, cy + 10, hl ? "#00ffff80" : "#ffffff80");
        } else if (mol === "propanone") {
            // CH3COCH3
            drawAtom(ctx, cx - 50, cy, "C", "#00ff00");
            drawAtom(ctx, cx, cy, "C", "#00ff00");
            drawAtom(ctx, cx + 50, cy, "C", "#00ff00");

            drawBond(ctx, cx - 50, cy, cx, cy);
            drawBond(ctx, cx, cy, cx + 50, cy);

            // C=O
            drawAtom(ctx, cx, cy - 50, "O", "#ff0000", hl);
            ctx.lineWidth = 4;
            ctx.strokeStyle = hl ? "#00ffff80" : "#ffffff80";
            ctx.beginPath(); ctx.moveTo(cx - 5, cy - 10); ctx.lineTo(cx - 5, cy - 40); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx + 5, cy - 10); ctx.lineTo(cx + 5, cy - 40); ctx.stroke();
        } else {
            // Placeholder
            drawAtom(ctx, cx, cy, "?", "#ffffff");
            ctx.fillStyle = "#ffffff";
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText(mol.toUpperCase(), cx, cy + 40);
        }
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
