"use client";

import { useEffect, useRef, useCallback } from "react";

interface OrganicMoleculeCanvasProps {
    molecule: string;
    show3D: boolean;
    stage: string;
    translations: any;
}

export default function OrganicMoleculeCanvas({ molecule, show3D, stage, translations }: OrganicMoleculeCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawAtom = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, symbol: string, color: string) => {
        // Atom circle
        ctx.fillStyle = color + "40";
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Symbol
        ctx.fillStyle = color;
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(symbol, x, y);
    }, []);

    const drawBond = useCallback((ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
        ctx.strokeStyle = "#ffffff80";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }, []);

    const draw3DBond = useCallback((ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, type: string) => {
        if (type === "wedge") {
            // Wedge bond (coming out of plane)
            ctx.fillStyle = "#ffffff80";
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const perpX = -dy / len * 5;
            const perpY = dx / len * 5;
            ctx.lineTo(x2 + perpX, y2 + perpY);
            ctx.lineTo(x2 - perpX, y2 - perpY);
            ctx.closePath();
            ctx.fill();
        } else if (type === "dash") {
            // Dashed bond (going into plane)
            ctx.strokeStyle = "#ffffff60";
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.setLineDash([]);
        } else {
            // Solid bond (in plane)
            drawBond(ctx, x1, y1, x2, y2);
        }
    }, [drawBond]);

    const draw2DMolecule = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, mol: string) => {
        const centerX = w / 2;
        const centerY = h / 2;

        if (mol === "methane") {
            drawAtom(ctx, centerX, centerY, "C", "#00ff00");
            drawAtom(ctx, centerX, centerY - 40, "H", "#ffffff");
            drawAtom(ctx, centerX + 40, centerY, "H", "#ffffff");
            drawAtom(ctx, centerX, centerY + 40, "H", "#ffffff");
            drawAtom(ctx, centerX - 40, centerY, "H", "#ffffff");

            drawBond(ctx, centerX, centerY, centerX, centerY - 40);
            drawBond(ctx, centerX, centerY, centerX + 40, centerY);
            drawBond(ctx, centerX, centerY, centerX, centerY + 40);
            drawBond(ctx, centerX, centerY, centerX - 40, centerY);
        } else if (mol === "ethane") {
            drawAtom(ctx, centerX - 30, centerY, "C", "#00ff00");
            drawAtom(ctx, centerX + 30, centerY, "C", "#00ff00");
            drawBond(ctx, centerX - 30, centerY, centerX + 30, centerY);

            drawAtom(ctx, centerX - 30, centerY - 35, "H", "#ffffff");
            drawAtom(ctx, centerX - 55, centerY + 20, "H", "#ffffff");
            drawAtom(ctx, centerX - 5, centerY + 35, "H", "#ffffff");
            drawAtom(ctx, centerX + 30, centerY - 35, "H", "#ffffff");
            drawAtom(ctx, centerX + 55, centerY + 20, "H", "#ffffff");
            drawAtom(ctx, centerX + 5, centerY + 35, "H", "#ffffff");

            drawBond(ctx, centerX - 30, centerY, centerX - 30, centerY - 35);
            drawBond(ctx, centerX - 30, centerY, centerX - 55, centerY + 20);
            drawBond(ctx, centerX - 30, centerY, centerX - 5, centerY + 35);
            drawBond(ctx, centerX + 30, centerY, centerX + 30, centerY - 35);
            drawBond(ctx, centerX + 30, centerY, centerX + 55, centerY + 20);
            drawBond(ctx, centerX + 30, centerY, centerX + 5, centerY + 35);
        } else if (mol === "ethanol") {
            drawAtom(ctx, centerX - 40, centerY, "C", "#00ff00");
            drawAtom(ctx, centerX, centerY, "C", "#00ff00");
            drawAtom(ctx, centerX + 40, centerY, "O", "#ff0000");
            drawAtom(ctx, centerX + 70, centerY, "H", "#ffffff");

            drawBond(ctx, centerX - 40, centerY, centerX, centerY);
            drawBond(ctx, centerX, centerY, centerX + 40, centerY);
            drawBond(ctx, centerX + 40, centerY, centerX + 70, centerY);

            ctx.fillStyle = "#ff00ff";
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText("OH", centerX + 55, centerY - 20);
        } else if (mol === "propane") {
            drawAtom(ctx, centerX - 50, centerY + 20, "C", "#00ff00");
            drawAtom(ctx, centerX, centerY - 20, "C", "#00ff00");
            drawAtom(ctx, centerX + 50, centerY + 20, "C", "#00ff00");
            drawBond(ctx, centerX - 50, centerY + 20, centerX, centerY - 20);
            drawBond(ctx, centerX, centerY - 20, centerX + 50, centerY + 20);
        } else if (mol === "butane") {
            drawAtom(ctx, centerX - 60, centerY + 20, "C", "#00ff00");
            drawAtom(ctx, centerX - 20, centerY - 20, "C", "#00ff00");
            drawAtom(ctx, centerX + 20, centerY + 20, "C", "#00ff00");
            drawAtom(ctx, centerX + 60, centerY - 20, "C", "#00ff00");
            drawBond(ctx, centerX - 60, centerY + 20, centerX - 20, centerY - 20);
            drawBond(ctx, centerX - 20, centerY - 20, centerX + 20, centerY + 20);
            drawBond(ctx, centerX + 20, centerY + 20, centerX + 60, centerY - 20);
        } else if (mol === "benzene") {
            for (let i = 0; i < 6; i++) {
                const a = (i * 60) * Math.PI / 180;
                const x = centerX + Math.cos(a) * 50;
                const y = centerY + Math.sin(a) * 50;
                drawAtom(ctx, x, y, "C", "#00ff00");
            }
            for (let i = 0; i < 6; i++) {
                const a1 = (i * 60) * Math.PI / 180;
                const a2 = ((i + 1) * 60) * Math.PI / 180;
                drawBond(ctx, centerX + Math.cos(a1) * 50, centerY + Math.sin(a1) * 50, centerX + Math.cos(a2) * 50, centerY + Math.sin(a2) * 50);
                if (i % 2 === 0) {
                    ctx.setLineDash([2, 5]);
                    drawBond(ctx, centerX + Math.cos(a1) * 45, centerY + Math.sin(a1) * 45, centerX + Math.cos(a2) * 45, centerY + Math.sin(a2) * 45);
                    ctx.setLineDash([]);
                }
            }
        } else {
            drawAtom(ctx, centerX, centerY, "C", "#00ff00");
            ctx.fillStyle = "white";
            ctx.font = "14px monospace";
            ctx.textAlign = "center";
            ctx.fillText(mol.toUpperCase(), centerX, centerY + 50);
        }
    }, [drawAtom, drawBond]);

    const draw3DMolecule = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, mol: string, time: number) => {
        const centerX = w / 2;
        const centerY = h / 2;

        if (mol === "methane") {
            drawAtom(ctx, centerX, centerY, "C", "#00ff00");
            drawAtom(ctx, centerX, centerY - 50, "H", "#ffffff");
            drawAtom(ctx, centerX + 45, centerY + 15, "H", "#ffffff");
            drawAtom(ctx, centerX - 45, centerY + 15, "H", "#ffffff");
            drawAtom(ctx, centerX, centerY + 40, "H", "#ffffff");

            draw3DBond(ctx, centerX, centerY, centerX, centerY - 50, "solid");
            draw3DBond(ctx, centerX, centerY, centerX + 45, centerY + 15, "wedge");
            draw3DBond(ctx, centerX, centerY, centerX - 45, centerY + 15, "dash");
            draw3DBond(ctx, centerX, centerY, centerX, centerY + 40, "solid");
        } else if (mol === "ethane") {
            const angle = time / 1000;
            drawAtom(ctx, centerX - 30, centerY, "C", "#00ff00");
            drawAtom(ctx, centerX + 30, centerY, "C", "#00ff00");
            draw3DBond(ctx, centerX - 30, centerY, centerX + 30, centerY, "solid");

            for (let i = 0; i < 3; i++) {
                const a = (i * 120 + angle * 20) * Math.PI / 180;
                const x = centerX - 30 + Math.cos(a) * 40;
                const y = centerY + Math.sin(a) * 40;
                drawAtom(ctx, x, y, "H", "#ffffff");
                draw3DBond(ctx, centerX - 30, centerY, x, y, i === 0 ? "wedge" : "solid");
            }

            for (let i = 0; i < 3; i++) {
                const a = (i * 120 + 60 + angle * 20) * Math.PI / 180;
                const x = centerX + 30 + Math.cos(a) * 40;
                const y = centerY + Math.sin(a) * 40;
                drawAtom(ctx, x, y, "H", "#ffffff");
                draw3DBond(ctx, centerX + 30, centerY, x, y, i === 1 ? "dash" : "solid");
            }
        } else if (mol === "benzene") {
            for (let i = 0; i < 6; i++) {
                const a = (i * 60 + time / 20) * Math.PI / 180;
                const x = centerX + Math.cos(a) * 60;
                const y = centerY + Math.sin(a) * 30;
                drawAtom(ctx, x, y, "C", "#00ff00");

                const aNext = ((i + 1) * 60 + time / 20) * Math.PI / 180;
                draw3DBond(ctx, x, y, centerX + Math.cos(aNext) * 60, centerY + Math.sin(aNext) * 30, "solid");
            }
        } else {
            drawAtom(ctx, centerX, centerY, "C", "#00ff00");
            ctx.strokeStyle = "#00ff0040";
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, 40 + i * 15, 20 + i * 8, i * Math.PI / 3, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.fillStyle = "white";
            ctx.font = "14px monospace";
            ctx.textAlign = "center";
            ctx.fillText(mol.toUpperCase(), centerX, centerY + 80);
        }
    }, [drawAtom, draw3DBond]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const render = (time: number) => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            const w = rect.width;
            const h = rect.height;

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, w, h);

            if (show3D) {
                draw3DMolecule(ctx, w, h, molecule, time);
            } else {
                draw2DMolecule(ctx, w, h, molecule);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, [molecule, show3D, draw2DMolecule, draw3DMolecule]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
