"use client";

import { useState, useEffect, useRef } from "react";
import type { GasLawType, Language, GasParameters } from "@/lib/gp2-03-types";
import { GAS_CONSTANT } from "@/lib/gp2-03-types";

interface GasLawSimulatorProps {
  law: GasLawType;
  language: Language;
  onParameterChange?: (params: GasParameters) => void;
}

export default function GasLawSimulator({
  law,
  language,
  onParameterChange,
}: GasLawSimulatorProps) {
  // State for gas parameters
  const [pressure, setPressure] = useState(101325); // Pa
  const [volume, setVolume] = useState(0.0224); // m³
  const [temperature, setTemperature] = useState(273.15); // K
  const [moles, setMoles] = useState(1.0); // mol

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Notify parent of parameter changes
  useEffect(() => {
    if (onParameterChange) {
      onParameterChange({ pressure, volume, temperature, moles });
    }
  }, [pressure, volume, temperature, moles, onParameterChange]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(moles * 50), 200);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * Math.sqrt(temperature / 273.15) * 2,
        vy: (Math.random() - 0.5) * Math.sqrt(temperature / 273.15) * 2,
        radius: 3,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < p.radius || p.x > canvas.width - p.radius) {
          p.vx *= -1;
          p.x = Math.max(p.radius, Math.min(canvas.width - p.radius, p.x));
        }
        if (p.y < p.radius || p.y > canvas.height - p.radius) {
          p.vy *= -1;
          p.y = Math.max(p.radius, Math.min(canvas.height - p.radius, p.y));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#00e5ff";
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [temperature, moles]);

  const getLawTitle = () => {
    if (law === "boyle") {
      return language === "en" ? "Boyle's Law" : language === "cn" ? "波义耳定律" : "Boyle-Gesetz";
    } else if (law === "charles") {
      return language === "en" ? "Charles's Law" : language === "cn" ? "查理定律" : "Charles-Gesetz";
    } else {
      return language === "en" ? "Avogadro's Law" : language === "cn" ? "阿伏伽德罗定律" : "Avogadro-Gesetz";
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900/50 rounded-xl p-4">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">{getLawTitle()}</h3>

      {/* Canvas */}
      <div className="flex-1 mb-4 bg-black/30 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full h-full"
        />
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {(law === "boyle" || law === "charles" || law === "avogadro") && (
          <>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Pressure: {(pressure / 1000).toFixed(1)} kPa
              </label>
              <input
                type="range"
                min="50000"
                max="200000"
                step="1000"
                value={pressure}
                onChange={(e) => setPressure(Number(e.target.value))}
                className="w-full"
                disabled={law === "charles" || law === "avogadro"}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Volume: {(volume * 1000).toFixed(1)} L
              </label>
              <input
                type="range"
                min="0.01"
                max="0.1"
                step="0.001"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full"
                disabled={law === "boyle"}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Temperature: {(temperature - 273.15).toFixed(1)} °C ({temperature.toFixed(1)} K)
              </label>
              <input
                type="range"
                min="200"
                max="500"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full"
                disabled={law === "boyle" || law === "avogadro"}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Moles: {moles.toFixed(2)} mol
              </label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={moles}
                onChange={(e) => setMoles(Number(e.target.value))}
                className="w-full"
                disabled={law === "boyle" || law === "charles"}
              />
            </div>
          </>
        )}
      </div>

      {/* Law Formula */}
      <div className="mt-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
        <p className="text-cyan-300 text-center font-mono">
          {law === "boyle" && "P₁V₁ = P₂V₂ (T constant)"}
          {law === "charles" && "V₁/T₁ = V₂/T₂ (P constant)"}
          {law === "avogadro" && "V₁/n₁ = V₂/n₂ (P, T constant)"}
        </p>
      </div>
    </div>
  );
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}
