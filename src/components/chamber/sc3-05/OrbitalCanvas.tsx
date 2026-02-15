"use client";

import { useEffect, useRef } from "react";

interface OrbitalCanvasProps {
    stage: "VSEPR" | "HYBRIDIZATION" | "MO_THEORY";
    isActive: boolean;
}

export default function OrbitalCanvas({ stage, isActive }: OrbitalCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const drawBonding = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);

            const scale = Math.min(canvas.width / 800, canvas.height / 400);
            ctx.scale(scale, scale);

            if (stage === "VSEPR") {
                // Draw a Central Atom
                ctx.fillStyle = "#A855F7";
                ctx.beginPath();
                ctx.arc(0, 0, 20, 0, Math.PI * 2);
                ctx.fill();

                // Draw electron domains (Tetrahedral as example)
                const angles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
                angles.forEach(angle => {
                    const rotAngle = angle + time * 0.01;
                    const x = Math.cos(rotAngle) * 80;
                    const y = Math.sin(rotAngle) * 80;

                    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                    ctx.setLineDash([5, 5]);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.fillStyle = "#6366F1";
                    ctx.beginPath();
                    ctx.arc(x, y, 10, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            if (stage === "HYBRIDIZATION") {
                // sp3 Hybrid Orbitals (Lobe shapes)
                ctx.fillStyle = "rgba(236, 72, 153, 0.4)";
                ctx.strokeStyle = "rgba(236, 72, 153, 0.8)";

                for (let i = 0; i < 4; i++) {
                    ctx.save();
                    ctx.rotate((i * Math.PI) / 2 + time * 0.005);

                    ctx.beginPath();
                    // Custom lobe path
                    ctx.moveTo(0, 0);
                    ctx.bezierCurveTo(40, -40, 100, -20, 100, 0);
                    ctx.bezierCurveTo(100, 20, 40, 40, 0, 0);
                    ctx.fill();
                    ctx.stroke();

                    ctx.restore();
                }
            }

            if (stage === "MO_THEORY") {
                // Draw MO Energy Diagram
                const centerX = 0;
                const offset = 100;

                // Levels
                ctx.strokeStyle = "white";
                ctx.lineWidth = 2;

                // Atomic Orbitals (Left/Right)
                ctx.beginPath();
                ctx.moveTo(-offset - 20, 50); ctx.lineTo(-offset + 20, 50);
                ctx.moveTo(offset - 20, 50); ctx.lineTo(offset + 20, 50);
                ctx.stroke();

                // Bonding (Below)
                ctx.beginPath();
                ctx.moveTo(-20, 100); ctx.lineTo(20, 100);
                ctx.stroke();

                // Antibonding (Above)
                ctx.beginPath();
                ctx.moveTo(-20, 0); ctx.lineTo(20, 0);
                ctx.stroke();

                // Connecting lines
                ctx.strokeStyle = "rgba(255,255,255,0.2)";
                ctx.setLineDash([2, 4]);
                ctx.beginPath();
                ctx.moveTo(-offset + 20, 50); ctx.lineTo(-20, 100);
                ctx.moveTo(-offset + 20, 50); ctx.lineTo(-20, 0);
                ctx.moveTo(offset - 20, 50); ctx.lineTo(20, 100);
                ctx.moveTo(offset - 20, 50); ctx.lineTo(20, 0);
                ctx.stroke();
                ctx.setLineDash([]);

                // Electrons (Half arrows)
                ctx.fillStyle = "cyan";
                // In bonding
                ctx.beginPath(); ctx.moveTo(-5, 100); ctx.lineTo(-5, 85); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(5, 100); ctx.lineTo(5, 115); ctx.stroke();
            }

            ctx.restore();
        };

        const render = () => {
            time++;
            drawBonding();
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [stage, isActive]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-full bg-black/20 rounded-xl"
        />
    );
}
