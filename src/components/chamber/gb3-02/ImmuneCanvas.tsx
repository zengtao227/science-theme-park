"use client";

import { useEffect, useRef } from "react";

interface ImmuneCanvasProps {
    stage: "INNATE" | "ADAPTIVE" | "VACCINES";
    isActive: boolean;
}

export default function ImmuneCanvas({ stage, isActive }: ImmuneCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const particles: { x: number; y: number; type: "pathogen" | "cell" | "antibody"; id: number }[] = [];
        for (let i = 0; i < 20; i++) {
            particles.push({
                x: Math.random() * 800,
                y: Math.random() * 400,
                type: Math.random() > 0.5 ? "pathogen" : "cell",
                id: i
            });
        }

        const drawImmuneSystem = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();

            const scale = Math.min(canvas.width / 800, canvas.height / 400);
            ctx.scale(scale, scale);

            // Draw Background Cells
            ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(100 + i * 150, 200 + Math.sin(time * 0.01 + i) * 50, 60, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw Particles
            particles.forEach(p => {
                p.x += Math.cos(time * 0.02 + p.id) * 0.5;
                p.y += Math.sin(time * 0.02 + p.id) * 0.5;

                if (p.type === "pathogen") {
                    ctx.fillStyle = "rgba(239, 68, 68, 0.6)"; // Red for pathogen
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                    ctx.fill();
                    // Spikes
                    for (let j = 0; j < 6; j++) {
                        const angle = (j * Math.PI * 2) / 6 + time * 0.05;
                        ctx.beginPath();
                        ctx.strokeStyle = "rgba(239, 68, 68, 0.8)";
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p.x + Math.cos(angle) * 8, p.y + Math.sin(angle) * 8);
                        ctx.stroke();
                    }
                } else if (p.type === "cell") {
                    ctx.fillStyle = "rgba(34, 197, 94, 0.3)"; // Green for immune cell
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
                    ctx.fill();

                    if (stage === "INNATE") {
                        // Macrophage pseudopodia
                        ctx.strokeStyle = "rgba(34, 197, 94, 0.6)";
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 12 + Math.sin(time * 0.1) * 2, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
            });

            if (stage === "ADAPTIVE") {
                // Draw Antibodies (Y-shape)
                ctx.strokeStyle = "rgba(0, 243, 255, 0.8)";
                ctx.lineWidth = 2;
                for (let i = 0; i < 10; i++) {
                    const x = 400 + Math.cos(time * 0.03 + i) * 150;
                    const y = 200 + Math.sin(time * 0.03 + i) * 100;

                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + 10);
                    ctx.moveTo(x, y);
                    ctx.lineTo(x - 5, y - 5);
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + 5, y - 5);
                    ctx.stroke();
                }
            }

            if (stage === "VACCINES") {
                // Draw Memory formation (Golden glow)
                ctx.shadowBlur = 15;
                ctx.shadowColor = "gold";
                ctx.fillStyle = "rgba(255, 215, 0, 0.4)";
                ctx.beginPath();
                ctx.arc(400, 200, 80 + Math.sin(time * 0.05) * 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            ctx.restore();
        };

        const render = () => {
            time++;
            drawImmuneSystem();
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
