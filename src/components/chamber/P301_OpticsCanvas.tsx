"use client";

import { useRef, useEffect, useState } from "react";

interface P301OpticsCanvasProps {
  scenario: "reflection" | "refraction" | "lens";
  angle?: number;
  n1?: number; // Refractive index 1
  n2?: number; // Refractive index 2
  focalLength?: number;
  showAnswer?: boolean;
  targetAngle?: number;
}

export default function P301OpticsCanvas({
  scenario,
  angle = 30,
  n1 = 1.0,
  n2 = 1.5,
  focalLength = 100,
  showAnswer = false,
  targetAngle = 0,
}: P301OpticsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hitTarget, setHitTarget] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Dark background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (scenario === "reflection") {
      drawReflectionScene(ctx, w, h, angle, showAnswer, targetAngle);
    } else if (scenario === "refraction") {
      drawRefractionScene(ctx, w, h, angle, n1, n2, showAnswer, targetAngle);
    } else if (scenario === "lens") {
      drawLensScene(ctx, w, h, focalLength, showAnswer);
    }

    // Check if target is hit
    if (showAnswer && Math.abs(angle - targetAngle) < 2) {
      setHitTarget(true);
    } else {
      setHitTarget(false);
    }

  }, [scenario, angle, n1, n2, focalLength, showAnswer, targetAngle]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-auto border border-white/10 rounded-lg"
        style={{
          filter: hitTarget ? "drop-shadow(0 0 20px rgba(57, 255, 20, 0.6))" : "none"
        }}
      />
      
      {hitTarget && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="text-neon-green text-4xl font-black animate-pulse">
            ✨ TARGET HIT! ✨
          </div>
        </div>
      )}

      <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30 uppercase tracking-wider">
        Optics Simulator
      </div>
    </div>
  );
}

// Draw reflection scene
function drawReflectionScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  incidentAngle: number,
  showAnswer: boolean,
  targetAngle: number
) {
  const centerX = w / 2;
  const centerY = h / 2;
  const mirrorLength = 300;

  // Draw mirror (horizontal line)
  ctx.strokeStyle = "rgba(200, 200, 255, 0.8)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX - mirrorLength / 2, centerY);
  ctx.lineTo(centerX + mirrorLength / 2, centerY);
  ctx.stroke();

  // Mirror label
  ctx.fillStyle = "rgba(200, 200, 255, 0.8)";
  ctx.font = "bold 12px monospace";
  ctx.fillText("MIRROR", centerX - 30, centerY + 20);

  // Normal line (dashed)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 150);
  ctx.lineTo(centerX, centerY + 150);
  ctx.stroke();
  ctx.setLineDash([]);

  // Incident ray
  const incidentRad = (incidentAngle * Math.PI) / 180;
  const rayLength = 150;
  const incidentStartX = centerX - Math.sin(incidentRad) * rayLength;
  const incidentStartY = centerY - Math.cos(incidentRad) * rayLength;

  drawLaserBeam(ctx, incidentStartX, incidentStartY, centerX, centerY, "rgba(255, 0, 85, 0.9)");

  // Reflected ray (Law of Reflection: angle_i = angle_r)
  const reflectedAngle = incidentAngle;
  const reflectedRad = (reflectedAngle * Math.PI) / 180;
  const reflectedEndX = centerX + Math.sin(reflectedRad) * rayLength;
  const reflectedEndY = centerY - Math.cos(reflectedRad) * rayLength;

  if (showAnswer) {
    drawLaserBeam(ctx, centerX, centerY, reflectedEndX, reflectedEndY, "rgba(57, 255, 20, 0.9)");
  }

  // Angle labels
  ctx.fillStyle = "rgba(255, 0, 85, 0.8)";
  ctx.font = "bold 14px monospace";
  ctx.fillText(`θᵢ = ${incidentAngle}°`, centerX - 80, centerY - 80);

  if (showAnswer) {
    ctx.fillStyle = "rgba(57, 255, 20, 0.8)";
    ctx.fillText(`θᵣ = ${reflectedAngle}°`, centerX + 50, centerY - 80);
  }

  // Target indicator
  if (!showAnswer && targetAngle > 0) {
    const targetRad = (targetAngle * Math.PI) / 180;
    const targetX = centerX + Math.sin(targetRad) * (rayLength * 0.8);
    const targetY = centerY - Math.cos(targetRad) * (rayLength * 0.8);
    
    ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(targetX, targetY, 15, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
    ctx.fill();
  }
}

// Draw refraction scene
function drawRefractionScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  incidentAngle: number,
  n1: number,
  n2: number,
  showAnswer: boolean,
  targetAngle: number
) {
  const centerX = w / 2;
  const centerY = h / 2;
  const interfaceLength = 400;

  // Draw interface (horizontal line)
  ctx.strokeStyle = "rgba(0, 210, 255, 0.8)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX - interfaceLength / 2, centerY);
  ctx.lineTo(centerX + interfaceLength / 2, centerY);
  ctx.stroke();

  // Medium labels
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 14px monospace";
  ctx.fillText(`n₁ = ${n1.toFixed(2)} (Air)`, 20, 30);
  ctx.fillText(`n₂ = ${n2.toFixed(2)} (Glass)`, 20, h - 20);

  // Shade lower medium
  ctx.fillStyle = "rgba(0, 210, 255, 0.05)";
  ctx.fillRect(0, centerY, w, h - centerY);

  // Normal line
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 150);
  ctx.lineTo(centerX, centerY + 150);
  ctx.stroke();
  ctx.setLineDash([]);

  // Incident ray
  const incidentRad = (incidentAngle * Math.PI) / 180;
  const rayLength = 150;
  const incidentStartX = centerX - Math.sin(incidentRad) * rayLength;
  const incidentStartY = centerY - Math.cos(incidentRad) * rayLength;

  drawLaserBeam(ctx, incidentStartX, incidentStartY, centerX, centerY, "rgba(255, 0, 85, 0.9)");

  // Refracted ray (Snell's Law: n1*sin(θ1) = n2*sin(θ2))
  const sinTheta2 = (n1 * Math.sin(incidentRad)) / n2;
  const refractedAngle = Math.asin(Math.min(sinTheta2, 1)) * (180 / Math.PI);
  const refractedRad = (refractedAngle * Math.PI) / 180;
  const refractedEndX = centerX + Math.sin(refractedRad) * rayLength;
  const refractedEndY = centerY + Math.cos(refractedRad) * rayLength;

  if (showAnswer) {
    drawLaserBeam(ctx, centerX, centerY, refractedEndX, refractedEndY, "rgba(57, 255, 20, 0.9)");
  }

  // Angle labels
  ctx.fillStyle = "rgba(255, 0, 85, 0.8)";
  ctx.font = "bold 14px monospace";
  ctx.fillText(`θ₁ = ${incidentAngle}°`, centerX - 80, centerY - 80);

  if (showAnswer) {
    ctx.fillStyle = "rgba(57, 255, 20, 0.8)";
    ctx.fillText(`θ₂ = ${refractedAngle.toFixed(1)}°`, centerX + 50, centerY + 100);
  }
}

// Draw lens scene
function drawLensScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  focalLength: number,
  showAnswer: boolean
) {
  const centerX = w / 2;
  const centerY = h / 2;
  const lensHeight = 200;

  // Draw converging lens
  ctx.strokeStyle = "rgba(0, 210, 255, 0.9)";
  ctx.lineWidth = 4;
  
  // Lens shape (biconvex)
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - lensHeight / 2);
  ctx.quadraticCurveTo(centerX + 20, centerY, centerX, centerY + lensHeight / 2);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - lensHeight / 2);
  ctx.quadraticCurveTo(centerX - 20, centerY, centerX, centerY + lensHeight / 2);
  ctx.stroke();

  // Optical axis
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(50, centerY);
  ctx.lineTo(w - 50, centerY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Focal points
  const f1X = centerX - focalLength;
  const f2X = centerX + focalLength;

  ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
  ctx.beginPath();
  ctx.arc(f1X, centerY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(f2X, centerY, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "bold 12px monospace";
  ctx.fillText("F", f1X - 5, centerY - 15);
  ctx.fillText("F", f2X - 5, centerY - 15);

  // Object
  const objectX = centerX - 180;
  const objectHeight = 60;
  ctx.strokeStyle = "rgba(255, 0, 85, 0.9)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(objectX, centerY);
  ctx.lineTo(objectX, centerY - objectHeight);
  ctx.stroke();

  // Arrow head
  ctx.beginPath();
  ctx.moveTo(objectX, centerY - objectHeight);
  ctx.lineTo(objectX - 5, centerY - objectHeight + 10);
  ctx.moveTo(objectX, centerY - objectHeight);
  ctx.lineTo(objectX + 5, centerY - objectHeight + 10);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 0, 85, 0.8)";
  ctx.fillText("Object", objectX - 20, centerY + 20);

  if (showAnswer) {
    // Ray 1: Parallel to axis, through focal point
    drawLaserBeam(ctx, objectX, centerY - objectHeight, centerX, centerY - objectHeight, "rgba(57, 255, 20, 0.6)");
    drawLaserBeam(ctx, centerX, centerY - objectHeight, f2X + 100, centerY + ((f2X + 100 - centerX) * objectHeight / focalLength), "rgba(57, 255, 20, 0.6)");

    // Ray 2: Through center, straight
    drawLaserBeam(ctx, objectX, centerY - objectHeight, centerX, centerY, "rgba(0, 210, 255, 0.6)");
    drawLaserBeam(ctx, centerX, centerY, centerX + 200, centerY + ((200 * objectHeight) / 180), "rgba(0, 210, 255, 0.6)");

    // Image formation indicator
    ctx.fillStyle = "rgba(57, 255, 20, 0.8)";
    ctx.font = "bold 12px monospace";
    ctx.fillText(`f = ${focalLength}px`, centerX + 10, centerY - 120);
  }
}

// Draw laser beam with glow effect
function drawLaserBeam(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string
) {
  // Glow effect
  ctx.shadowBlur = 15;
  ctx.shadowColor = color;
  
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Arrow head
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const arrowLength = 10;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - arrowLength * Math.cos(angle - Math.PI / 6),
    y2 - arrowLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - arrowLength * Math.cos(angle + Math.PI / 6),
    y2 - arrowLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();

  ctx.shadowBlur = 0;
}
