"use client";

import { useEffect, useRef } from "react";

interface ElectrolysisCanvasProps {
    voltage: number;
    electrolyte: string;
    activeStage: string;
    showIons: boolean;
}

export default function ElectrolysisCanvas({ voltage, electrolyte, activeStage, showIons }: ElectrolysisCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let offset = 0;

        const render = () => {
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            // Draw Tank
            ctx.strokeStyle = "#00e5ff";
            ctx.lineWidth = 3;
            ctx.strokeRect(width * 0.2, height * 0.3, width * 0.6, height * 0.5);
            ctx.fillStyle = "rgba(0, 229, 255, 0.1)";
            ctx.fillRect(width * 0.2, height * 0.3, width * 0.6, height * 0.5);

            // Draw Liquid Level
            ctx.beginPath();
            ctx.moveTo(width * 0.2, height * 0.4);
            ctx.lineTo(width * 0.8, height * 0.4);
            ctx.strokeStyle = "rgba(0, 229, 255, 0.5)";
            ctx.stroke();

            // Draw Electrodes
            // Anode (+)
            ctx.fillStyle = "#ff5252";
            ctx.fillRect(width * 0.35, height * 0.2, 20, height * 0.4);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 12px Mono";
            ctx.fillText("ANODE (+)", width * 0.35 - 10, height * 0.18);

            // Cathode (-)
            ctx.fillStyle = "#448aff";
            ctx.fillRect(width * 0.6, height * 0.2, 20, height * 0.4);
            ctx.fillStyle = "#fff";
            ctx.fillText("CATHODE (-)", width * 0.6 - 10, height * 0.18);

            // Power Supply
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(width * 0.35 + 10, height * 0.2);
            ctx.lineTo(width * 0.35 + 10, height * 0.1);
            ctx.lineTo(width * 0.5, height * 0.1);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width * 0.6 + 10, height * 0.2);
            ctx.lineTo(width * 0.6 + 10, height * 0.1);
            ctx.lineTo(width * 0.5, height * 0.1);
            ctx.stroke();

            // DC Source Box
            ctx.fillStyle = "#333";
            ctx.fillRect(width * 0.45, height * 0.05, 50, 40);
            ctx.strokeStyle = "#00e5ff";
            ctx.strokeRect(width * 0.45, height * 0.05, 50, 40);
            ctx.fillStyle = "#00e5ff";
            ctx.font = "10px Mono";
            ctx.fillText("DC", width * 0.45 + 15, height * 0.05 + 15);
            ctx.fillText(`${voltage.toFixed(1)}V`, width * 0.45 + 10, height * 0.05 + 30);

            // Ions and Electrons
            if (voltage > 0) {
                offset += voltage * 0.5;

                // Electrons in wires
                const electronPos = (offset % 100) / 100;
                ctx.fillStyle = "#ffff00";
                // From Anode to Cathode (through power source)
                // Actually in electrolysis, electrons are pumped from anode to cathode by outside source
                // Current flows from Cathode to Anode through the liquid, Electrons flow Anode -> Source -> Cathode
                const x = width * 0.35 + 10 + (width * 0.25) * electronPos;
                if (electronPos < 0.5) {
                    // Rising from Anode
                    const y = height * 0.2 - (height * 0.1) * (electronPos * 2);
                    ctx.beginPath(); ctx.arc(width * 0.35 + 10, y, 3, 0, Math.PI * 2); ctx.fill();
                } else {
                    // Falling to Cathode
                    const y = height * 0.1 + (height * 0.1) * ((electronPos - 0.5) * 2);
                    ctx.beginPath(); ctx.arc(width * 0.6 + 10, y, 3, 0, Math.PI * 2); ctx.fill();
                }

                // Ions in solution
                if (showIons) {
                    const time = Date.now() / 1000;
                    for (let i = 0; i < 10; i++) {
                        // Cations (+) move to Cathode (-)
                        const catX = width * 0.4 + (width * 0.2) * ((Math.sin(time + i) + 1) / 2);
                        const catY = height * 0.45 + (height * 0.2) * ((Math.cos(time * 0.5 + i) + 1) / 2);

                        // Drift towards cathode
                        const driftC = (Math.sin(time + i)) * 10;
                        ctx.fillStyle = "#448aff";
                        ctx.beginPath(); ctx.arc(catX + driftC, catY, 4, 0, Math.PI * 2); ctx.fill();
                        ctx.fillStyle = "#fff"; ctx.font = "8px Mono"; ctx.fillText("+", catX + driftC - 2, catY + 3);

                        // Anions (-) move to Anode (+)
                        const aniX = width * 0.4 + (width * 0.2) * ((Math.cos(time + i) + 1) / 2);
                        const aniY = height * 0.45 + (height * 0.2) * ((Math.sin(time * 0.5 + i) + 1) / 2);

                        // Drift towards anode
                        const driftA = (Math.cos(time + i)) * 10;
                        ctx.fillStyle = "#ff5252";
                        ctx.beginPath(); ctx.arc(aniX - driftA, aniY, 4, 0, Math.PI * 2); ctx.fill();
                        ctx.fillStyle = "#fff"; ctx.font = "8px Mono"; ctx.fillText("-", aniX - driftA - 2, aniY + 3);
                    }
                }

                // Gas bubbles or Plating effect
                if (activeStage === "PRINCIPLES") {
                    // Bubbles at electrodes
                    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                    for (let i = 0; i < 5; i++) {
                        const by = height * 0.6 - ((offset + i * 20) % 60);
                        ctx.beginPath(); ctx.arc(width * 0.35 + 10, by, 3 + i, 0, Math.PI * 2); ctx.fill();
                        ctx.beginPath(); ctx.arc(width * 0.6 + 10, by, 2 + i, 0, Math.PI * 2); ctx.fill();
                    }
                } else if (activeStage === "PLATING") {
                    // Growing layer on cathode
                    const growth = Math.min(20, (offset / 100));
                    ctx.fillStyle = "#cd7f32"; // Copper
                    ctx.fillRect(width * 0.6 - growth / 2, height * 0.2, 20 + growth, height * 0.4);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [voltage, electrolyte, activeStage, showIons]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-full object-contain"
        />
    );
}
