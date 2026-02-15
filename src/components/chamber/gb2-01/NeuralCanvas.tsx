"use client";

import { useEffect, useRef } from "react";

interface NeuralCanvasProps {
    stage: "ANATOMY" | "POTENTIAL" | "SYNAPSE";
    isActive: boolean;
    voltage?: number; // for potential stage
}

export default function NeuralCanvas({ stage, isActive, voltage = -70 }: NeuralCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const drawNeuron = (progress: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);

            const scale = Math.min(canvas.width / 800, canvas.height / 600);
            ctx.scale(scale, scale);

            // Draw Soma
            ctx.beginPath();
            ctx.fillStyle = "rgba(147, 51, 234, 0.2)";
            ctx.strokeStyle = "rgba(147, 51, 234, 0.8)";
            ctx.lineWidth = 3;
            ctx.moveTo(-150, 0);
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI * 2) / 6;
                const r = 50 + Math.sin(time * 0.05 + i) * 5;
                ctx.lineTo(Math.cos(angle) * r - 150, Math.sin(angle) * r);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Draw Nucleus
            ctx.beginPath();
            ctx.fillStyle = "rgba(147, 51, 234, 0.6)";
            ctx.arc(-150, 0, 15, 0, Math.PI * 2);
            ctx.fill();

            // Draw Dendrites
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI * 2) / 8 + Math.PI;
                ctx.beginPath();
                ctx.strokeStyle = "rgba(147, 51, 234, 0.4)";
                ctx.moveTo(Math.cos(angle) * 40 - 150, Math.sin(angle) * 40);
                const r2 = 120 + Math.sin(time * 0.03 + i) * 10;
                ctx.lineTo(Math.cos(angle) * r2 - 150, Math.sin(angle) * r2);
                ctx.stroke();
            }

            // Draw Axon
            ctx.beginPath();
            ctx.strokeStyle = "rgba(147, 51, 234, 0.8)";
            ctx.moveTo(-100, 0);
            ctx.lineTo(200, 0);
            ctx.stroke();

            // Draw Myelin Sheaths
            for (let i = 0; i < 4; i++) {
                const x = -70 + i * 70;
                ctx.fillStyle = "rgba(236, 72, 153, 0.2)";
                ctx.strokeStyle = "rgba(236, 72, 153, 0.6)";
                ctx.fillRect(x, -10, 50, 20);
                ctx.strokeRect(x, -10, 50, 20);
            }

            // Stage specific animations
            if (stage === "POTENTIAL" && isActive) {
                // Moving "signal"
                const signalX = -100 + (progress % 400);
                const gradient = ctx.createRadialGradient(signalX, 0, 0, signalX, 0, 20);
                gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.5)");
                gradient.addColorStop(1, "transparent");
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(signalX, 0, 20, 0, Math.PI * 2);
                ctx.fill();
            }

            if (stage === "SYNAPSE") {
                // Terminal Button
                ctx.beginPath();
                ctx.arc(220, 0, 30, -Math.PI / 2, Math.PI / 2);
                ctx.strokeStyle = "rgba(147, 51, 234, 0.8)";
                ctx.stroke();

                // Vesicles
                for (let i = 0; i < 5; i++) {
                    const vx = 210 + Math.sin(time * 0.02 + i) * 5;
                    const vy = -15 + i * 8;
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                    ctx.arc(vx, vy, 3, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Cleft and Post-synaptic membrane
                ctx.beginPath();
                ctx.moveTo(260, -50);
                ctx.lineTo(260, 50);
                ctx.strokeStyle = "rgba(0, 243, 255, 0.5)";
                ctx.stroke();
            }

            ctx.restore();
        };

        const render = () => {
            time++;
            drawNeuron(time * 2);
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [stage, isActive, voltage]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-full bg-black/20 rounded-xl"
        />
    );
}
