"use client";

import { useEffect, useRef, useState } from "react";

interface ThermodynamicsCanvasProps {
    stage: "HEAT_TRANSFER" | "SPECIFIC_HEAT" | "PHASE_CHANGES";
    temperature: number;
    showParticles: boolean;
    translations: any;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export default function ThermodynamicsCanvas({
    stage,
    temperature,
    showParticles,
    translations
}: ThermodynamicsCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [particles, setParticles] = useState<Particle[]>([]);
    const animationRef = useRef<number | null>(null);

    // Initialize particles
    useEffect(() => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 50; i++) {
            newParticles.push({
                x: Math.random() * 400,
                y: Math.random() * 300,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
        }
        setParticles(newParticles);
    }, []);

    // Update particle velocities based on temperature
    useEffect(() => {
        const speedFactor = Math.max(0.1, (temperature + 20) / 50);
        setParticles(prev => prev.map(p => ({
            ...p,
            vx: p.vx * speedFactor / Math.max(0.1, Math.sqrt(p.vx * p.vx + p.vy * p.vy)) * speedFactor,
            vy: p.vy * speedFactor / Math.max(0.1, Math.sqrt(p.vx * p.vx + p.vy * p.vy)) * speedFactor
        })));
    }, [temperature]);

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

        const animate = () => {
            // Clear canvas
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, w, h);

            if (stage === "HEAT_TRANSFER") {
                drawHeatTransfer(ctx, w, h, temperature);
            } else if (stage === "SPECIFIC_HEAT") {
                drawSpecificHeat(ctx, w, h, temperature, showParticles ? particles : []);
            } else if (stage === "PHASE_CHANGES") {
                drawPhaseChanges(ctx, w, h, temperature);
            }

            // Update particles
            if (showParticles && stage === "SPECIFIC_HEAT") {
                const newParticles = particles.map(p => {
                    let newX = p.x + p.vx;
                    let newY = p.y + p.vy;
                    let newVx = p.vx;
                    let newVy = p.vy;

                    // Bounce off walls
                    if (newX < 0 || newX > w) newVx = -newVx;
                    if (newY < 0 || newY > h) newVy = -newVy;

                    return {
                        x: Math.max(0, Math.min(w, newX)),
                        y: Math.max(0, Math.min(h, newY)),
                        vx: newVx,
                        vy: newVy
                    };
                });
                setParticles(newParticles);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [stage, temperature, showParticles, particles]);

    const drawHeatTransfer = (ctx: CanvasRenderingContext2D, w: number, h: number, temp: number) => {
        // Hot object (left)
        const hotX = w * 0.2;
        const hotY = h / 2;
        const hotTemp = Math.max(temp, 50);
        
        ctx.fillStyle = `rgb(${Math.min(255, hotTemp * 2)}, ${Math.max(0, 100 - hotTemp)}, 0)`;
        ctx.beginPath();
        ctx.arc(hotX, hotY, 40, 0, Math.PI * 2);
        ctx.fill();

        // Cold object (right)
        const coldX = w * 0.8;
        const coldY = h / 2;
        const coldTemp = Math.min(temp, 20);
        
        ctx.fillStyle = `rgb(0, ${Math.max(0, 100 - Math.abs(coldTemp))}, ${Math.min(255, Math.abs(coldTemp) * 10)})`;
        ctx.beginPath();
        ctx.arc(coldX, coldY, 40, 0, Math.PI * 2);
        ctx.fill();

        // Heat flow arrows
        for (let i = 0; i < 5; i++) {
            const progress = (Date.now() / 1000 + i * 0.2) % 1;
            const arrowX = hotX + (coldX - hotX) * progress;
            const arrowY = hotY + Math.sin(progress * Math.PI * 2) * 20;
            
            ctx.fillStyle = `rgba(255, 100, 0, ${1 - progress})`;
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowX - 10, arrowY - 5);
            ctx.lineTo(arrowX - 10, arrowY + 5);
            ctx.closePath();
            ctx.fill();
        }

        // Labels
        ctx.fillStyle = "#fff";
        ctx.font = "14px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${hotTemp.toFixed(0)}°C`, hotX, hotY - 60);
        ctx.fillText(`${coldTemp.toFixed(0)}°C`, coldX, coldY - 60);
        ctx.fillText("Heat Flow →", w / 2, h / 2 - 40);
    };

    const drawSpecificHeat = (ctx: CanvasRenderingContext2D, w: number, h: number, temp: number, parts: Particle[]) => {
        // Container
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 3;
        ctx.strokeRect(w * 0.1, h * 0.1, w * 0.8, h * 0.8);

        // Particles
        if (parts.length > 0) {
            const speedFactor = Math.max(0.1, (temp + 20) / 50);
            parts.forEach(p => {
                const size = 3 + speedFactor * 2;
                const brightness = Math.min(255, 100 + temp * 1.5);
                ctx.fillStyle = `rgb(${brightness}, ${brightness / 2}, 0)`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // Temperature display
        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`T = ${temp}°C`, w / 2, h * 0.95);

        // Energy indicator
        const energy = Math.max(0, (temp + 20) / 140);
        ctx.fillStyle = "#ffaa00";
        ctx.fillRect(w * 0.1, h * 0.05, w * 0.8 * energy, 10);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(w * 0.1, h * 0.05, w * 0.8, 10);
    };

    const drawPhaseChanges = (ctx: CanvasRenderingContext2D, w: number, h: number, temp: number) => {
        const centerX = w / 2;
        const centerY = h / 2;

        // Determine phase
        let phase = "solid";
        let phaseColor = "#00ffff";
        if (temp > 0 && temp < 100) {
            phase = "liquid";
            phaseColor = "#0088ff";
        } else if (temp >= 100) {
            phase = "gas";
            phaseColor = "#ff8800";
        }

        // Draw phase representation
        if (phase === "solid") {
            // Crystalline structure
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    ctx.fillStyle = phaseColor;
                    ctx.beginPath();
                    ctx.arc(centerX - 80 + i * 40, centerY - 80 + j * 40, 8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        } else if (phase === "liquid") {
            // Flowing particles
            for (let i = 0; i < 30; i++) {
                const angle = (i / 30) * Math.PI * 2 + Date.now() / 1000;
                const radius = 60 + Math.sin(angle * 3) * 20;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                ctx.fillStyle = phaseColor;
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Dispersed gas particles
            for (let i = 0; i < 20; i++) {
                const angle = (i / 20) * Math.PI * 2;
                const radius = 80 + Math.sin(Date.now() / 500 + i) * 40;
                const x = centerX + Math.cos(angle + Date.now() / 1000) * radius;
                const y = centerY + Math.sin(angle + Date.now() / 1000) * radius;
                
                ctx.fillStyle = phaseColor + "80";
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Phase label
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px monospace";
        ctx.textAlign = "center";
        ctx.fillText(phase.toUpperCase(), centerX, h * 0.9);
        ctx.fillText(`${temp}°C`, centerX, h * 0.95);

        // Phase transition markers
        ctx.strokeStyle = "#ffffff40";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        // Melting point
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h * 0.1);
        ctx.lineTo(w * 0.1, h * 0.9);
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.font = "10px monospace";
        ctx.textAlign = "left";
        ctx.fillText("0°C", w * 0.12, h * 0.15);
        
        // Boiling point
        ctx.beginPath();
        ctx.moveTo(w * 0.9, h * 0.1);
        ctx.lineTo(w * 0.9, h * 0.9);
        ctx.stroke();
        ctx.textAlign = "right";
        ctx.fillText("100°C", w * 0.88, h * 0.15);
        
        ctx.setLineDash([]);
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
