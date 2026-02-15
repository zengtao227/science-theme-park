"use client";

import { useEffect, useRef, useState } from "react";

interface MagneticFieldVisualizationProps {
    stage: "MAGNETIC_FORCE" | "MAGNETIC_FIELD" | "APPLICATIONS";
}

export default function MagneticFieldVisualization({ stage }: MagneticFieldVisualizationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => t + 0.05);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        if (stage === "MAGNETIC_FORCE") {
            // Draw particle in circular motion due to magnetic force
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = 80;
            
            // Magnetic field (into page)
            ctx.fillStyle = "#00ffff40";
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 15; j++) {
                    const x = 30 + i * 25;
                    const y = 30 + j * 25;
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(x, y, 6, 0, Math.PI * 2);
                    ctx.strokeStyle = "#00ffff40";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // Particle path
            ctx.strokeStyle = "#00ff00";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();

            // Moving particle
            const angle = time;
            const px = centerX + radius * Math.cos(angle);
            const py = centerY + radius * Math.sin(angle);
            
            ctx.fillStyle = "#ff0000";
            ctx.beginPath();
            ctx.arc(px, py, 8, 0, Math.PI * 2);
            ctx.fill();

            // Velocity vector
            const vx = -Math.sin(angle);
            const vy = Math.cos(angle);
            ctx.strokeStyle = "#00ff00";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + vx * 40, py + vy * 40);
            ctx.stroke();
            
            // Arrowhead for velocity
            const arrowAngle = Math.atan2(vy, vx);
            ctx.beginPath();
            ctx.moveTo(px + vx * 40, py + vy * 40);
            ctx.lineTo(px + vx * 40 - 8 * Math.cos(arrowAngle - 0.3), py + vy * 40 - 8 * Math.sin(arrowAngle - 0.3));
            ctx.moveTo(px + vx * 40, py + vy * 40);
            ctx.lineTo(px + vx * 40 - 8 * Math.cos(arrowAngle + 0.3), py + vy * 40 - 8 * Math.sin(arrowAngle + 0.3));
            ctx.stroke();

            // Force vector (toward center)
            const fx = -Math.cos(angle);
            const fy = -Math.sin(angle);
            ctx.strokeStyle = "#ff00ff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + fx * 30, py + fy * 30);
            ctx.stroke();

            // Labels
            ctx.fillStyle = "#00ff00";
            ctx.font = "14px monospace";
            ctx.fillText("v", px + vx * 45, py + vy * 45);
            ctx.fillStyle = "#ff00ff";
            ctx.fillText("F", px + fx * 35, py + fy * 35);
            ctx.fillStyle = "#00ffff";
            ctx.fillText("B (into page)", 10, 20);

        } else if (stage === "MAGNETIC_FIELD") {
            // Draw magnetic field lines around a wire
            const wireX = width / 2;
            const wireY = height / 2;

            // Current-carrying wire
            ctx.fillStyle = "#ffaa00";
            ctx.beginPath();
            ctx.arc(wireX, wireY, 10, 0, Math.PI * 2);
            ctx.fill();

            // Current direction indicator
            ctx.fillStyle = "#000000";
            ctx.font = "bold 16px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("⊙", wireX, wireY);

            // Circular magnetic field lines
            for (let r = 40; r <= 160; r += 40) {
                ctx.strokeStyle = `rgba(0, 255, 255, ${1 - r / 200})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(wireX, wireY, r, 0, Math.PI * 2);
                ctx.stroke();

                // Field direction arrows
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2 + time * 0.5;
                    const x = wireX + r * Math.cos(angle);
                    const y = wireY + r * Math.sin(angle);
                    const dx = -Math.sin(angle);
                    const dy = Math.cos(angle);

                    ctx.strokeStyle = `rgba(0, 255, 255, ${1 - r / 200})`;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + dx * 15, y + dy * 15);
                    ctx.stroke();

                    // Arrowhead
                    const arrowAngle = Math.atan2(dy, dx);
                    ctx.beginPath();
                    ctx.moveTo(x + dx * 15, y + dy * 15);
                    ctx.lineTo(x + dx * 15 - 6 * Math.cos(arrowAngle - 0.4), y + dy * 15 - 6 * Math.sin(arrowAngle - 0.4));
                    ctx.moveTo(x + dx * 15, y + dy * 15);
                    ctx.lineTo(x + dx * 15 - 6 * Math.cos(arrowAngle + 0.4), y + dy * 15 - 6 * Math.sin(arrowAngle + 0.4));
                    ctx.stroke();
                }
            }

            // Labels
            ctx.fillStyle = "#ffaa00";
            ctx.font = "14px monospace";
            ctx.textAlign = "left";
            ctx.fillText("I (current out)", wireX + 20, wireY - 20);
            ctx.fillStyle = "#00ffff";
            ctx.fillText("B (magnetic field)", 10, 20);

        } else if (stage === "APPLICATIONS") {
            // Draw motor/generator concept
            const centerX = width / 2;
            const centerY = height / 2;

            // Magnetic field (horizontal)
            ctx.strokeStyle = "#00ffff";
            ctx.lineWidth = 2;
            for (let y = 80; y < height - 80; y += 30) {
                ctx.beginPath();
                ctx.moveTo(50, y);
                ctx.lineTo(width - 50, y);
                ctx.stroke();

                // Arrows
                for (let x = 80; x < width - 80; x += 60) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + 15, y);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(x + 15, y);
                    ctx.lineTo(x + 10, y - 4);
                    ctx.moveTo(x + 15, y);
                    ctx.lineTo(x + 10, y + 4);
                    ctx.stroke();
                }
            }

            // Rotating coil
            const angle = time;
            const coilWidth = 60;
            const coilHeight = 100;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);

            // Coil
            ctx.strokeStyle = "#ffaa00";
            ctx.lineWidth = 3;
            ctx.strokeRect(-coilWidth / 2, -coilHeight / 2, coilWidth, coilHeight);

            // Current direction
            ctx.fillStyle = "#ff0000";
            ctx.font = "20px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("⊙", -coilWidth / 4, 0);
            ctx.fillText("⊗", coilWidth / 4, 0);

            ctx.restore();

            // Rotation axis
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY - 80);
            ctx.lineTo(centerX, centerY + 80);
            ctx.stroke();

            // Labels
            ctx.fillStyle = "#00ffff";
            ctx.font = "14px monospace";
            ctx.textAlign = "left";
            ctx.fillText("B field →", 10, 20);
            ctx.fillStyle = "#ffaa00";
            ctx.fillText("Rotating coil", centerX + 50, centerY - 60);
            ctx.fillStyle = "#ff0000";
            ctx.fillText("Current", centerX + 50, centerY - 40);
        }

    }, [stage, time]);

    return (
        <div className="chamber-panel p-6 h-full flex flex-col">
            <h3 className="text-cyan-400 font-bold mb-4">MAGNETIC FIELD VISUALIZATION</h3>
            <div className="flex-1 flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    width={500}
                    height={400}
                    className="border border-cyan-500/30 rounded"
                />
            </div>
            <div className="mt-4 text-sm text-gray-400">
                {stage === "MAGNETIC_FORCE" && "Charged particle in circular motion due to Lorentz force"}
                {stage === "MAGNETIC_FIELD" && "Magnetic field lines around current-carrying wire"}
                {stage === "APPLICATIONS" && "Electric motor: rotating coil in magnetic field"}
            </div>
        </div>
    );
}
