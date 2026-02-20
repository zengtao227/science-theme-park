"use client";

import { useEffect, useRef } from "react";

interface CorrosionCanvasProps {
    protectMethod: "sacrificial" | "none";
    isSalty: boolean;
}

export default function CorrosionCanvas({ protectMethod, isSalty }: CorrosionCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let frame = 0;
        let animationFrameId: number;

        const render = () => {
            frame++;
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            // Water
            ctx.fillStyle = isSalty ? "rgba(0, 100, 255, 0.2)" : "rgba(0, 200, 255, 0.1)";
            ctx.fillRect(0, height * 0.3, width, height * 0.7);

            // Support Pillar
            ctx.fillStyle = "#4a4a4a";
            ctx.fillRect(width * 0.45, height * 0.1, 40, height * 0.8);

            // Corrosion effect
            if (protectMethod === "none") {
                ctx.fillStyle = "rgba(139, 69, 19, 0.6)";
                for (let i = 0; i < 20; i++) {
                    const x = width * 0.45 + Math.random() * 40;
                    const y = height * 0.3 + Math.random() * (height * 0.6);
                    ctx.beginPath();
                    ctx.arc(x, y, 2 + Math.random() * 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else {
                // Sacrificial Anode (Zinc)
                ctx.fillStyle = "#8b9dc3";
                ctx.fillRect(width * 0.42, height * 0.6, 15, 30);
                ctx.strokeStyle = "#00e5ff";
                ctx.lineWidth = 2;
                ctx.strokeRect(width * 0.42, height * 0.6, 15, 30);

                // Bubbles at anode
                ctx.fillStyle = "rgba(255,255,255,0.4)";
                for (let i = 0; i < 5; i++) {
                    const by = height * 0.6 - ((frame + i * 20) % 50);
                    ctx.beginPath(); ctx.arc(width * 0.43, by, 2 + i, 0, Math.PI * 2); ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [protectMethod, isSalty]);

    return <canvas ref={canvasRef} width={800} height={600} className="w-full h-full object-contain" />;
}
