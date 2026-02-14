"use client";

import { useEffect, useRef, useMemo } from "react";

interface EvolutionCanvasProps {
    stage: "NATURAL_SELECTION" | "SPECIATION" | "EVIDENCE";
    generation: number;
    selectionPressure: number;
    translations: any;
}

export default function EvolutionCanvas({
    stage,
    generation,
    selectionPressure,
    translations,
}: EvolutionCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Generate population based on stage and parameters
    const population = useMemo(() => {
        const popSize = 50;
        const individuals = [];
        
        for (let i = 0; i < popSize; i++) {
            // Trait value evolves over generations
            const baseValue = Math.random();
            const evolutionFactor = generation / 100;
            const trait = baseValue + (selectionPressure - 0.5) * evolutionFactor;
            
            individuals.push({
                x: Math.random() * 100,
                y: Math.random() * 100,
                trait: Math.max(0, Math.min(1, trait)),
                fitness: Math.max(0, Math.min(1, trait * selectionPressure + (1 - trait) * (1 - selectionPressure))),
            });
        }
        
        return individuals;
    }, [generation, selectionPressure]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        if (stage === "NATURAL_SELECTION") {
            // Draw population with color representing trait
            population.forEach((ind) => {
                const x = (ind.x / 100) * width;
                const y = (ind.y / 100) * height;
                const size = 4 + ind.fitness * 6;
                
                // Color gradient from red (low trait) to green (high trait)
                const r = Math.floor((1 - ind.trait) * 255);
                const g = Math.floor(ind.trait * 255);
                const b = 50;
                
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
                
                // Highlight high fitness individuals
                if (ind.fitness > 0.7) {
                    ctx.strokeStyle = "#00ff00";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(x, y, size + 3, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });
            
            // Draw legend
            ctx.fillStyle = "#ffffff";
            ctx.font = "12px monospace";
            ctx.fillText("Red = Low Trait | Green = High Trait", 10, height - 10);
            
        } else if (stage === "SPECIATION") {
            // Draw two diverging populations
            const midpoint = width / 2;
            
            population.forEach((ind) => {
                const divergence = (generation / 100) * 100;
                const offset = ind.trait > 0.5 ? divergence : -divergence;
                const x = midpoint + offset + (ind.x / 100) * 50 - 25;
                const y = (ind.y / 100) * height;
                const size = 5;
                
                // Color by species
                ctx.fillStyle = ind.trait > 0.5 ? "#00e5ff" : "#ff00e5";
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Draw separation line
            ctx.strokeStyle = "#ffffff40";
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(midpoint, 0);
            ctx.lineTo(midpoint, height);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Draw labels
            ctx.fillStyle = "#00e5ff";
            ctx.font = "14px monospace";
            ctx.fillText("Species A", midpoint + 80, 30);
            ctx.fillStyle = "#ff00e5";
            ctx.fillText("Species B", midpoint - 120, 30);
            
        } else if (stage === "EVIDENCE") {
            // Draw fossil record timeline
            const timelineY = height / 2;
            const timelineLength = width - 40;
            
            // Timeline axis
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(20, timelineY);
            ctx.lineTo(20 + timelineLength, timelineY);
            ctx.stroke();
            
            // Draw fossils at different time points
            const fossilCount = Math.min(generation, 20);
            for (let i = 0; i < fossilCount; i++) {
                const x = 20 + (i / 20) * timelineLength;
                const age = i * 5;
                const decay = Math.pow(0.5, age / 5730); // Carbon-14 decay
                const opacity = Math.max(0.2, decay);
                
                // Fossil marker
                ctx.fillStyle = `rgba(255, 200, 100, ${opacity})`;
                ctx.beginPath();
                ctx.arc(x, timelineY, 6, 0, Math.PI * 2);
                ctx.fill();
                
                // Age label every 5 fossils
                if (i % 5 === 0) {
                    ctx.fillStyle = "#ffffff80";
                    ctx.font = "10px monospace";
                    ctx.fillText(`${age}y`, x - 10, timelineY + 25);
                }
            }
            
            // Legend
            ctx.fillStyle = "#ffffff";
            ctx.font = "12px monospace";
            ctx.fillText("Fossil Age Timeline (years)", 20, 30);
            ctx.fillText("Opacity = C-14 Remaining", 20, 50);
        }
        
    }, [stage, population, generation]);

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="w-full h-full"
            style={{ imageRendering: "crisp-edges" }}
        />
    );
}
