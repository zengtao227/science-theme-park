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
  const [source, setSource] = useState({ x: 140, y: 120 });
  const [lensX, setLensX] = useState(320);
  const [lensOverride, setLensOverride] = useState<"convex" | "concave" | null>(null);
  const dragRef = useRef<null | "source" | "lens">(null);
  const hitTarget = showAnswer && Math.abs(angle - targetAngle) < 2;
  const lensKind = lensOverride ?? (focalLength >= 0 ? "convex" : "concave");
  const effectiveFocal = lensKind === "concave" ? -Math.abs(focalLength) : Math.abs(focalLength);

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
      drawReflectionScene(ctx, w, h, source, showAnswer, targetAngle);
    } else if (scenario === "refraction") {
      drawRefractionScene(ctx, w, h, source, n1, n2, showAnswer);
    } else if (scenario === "lens") {
      drawLensScene(ctx, w, h, source, lensX, effectiveFocal, lensKind, showAnswer);
    }

  }, [scenario, angle, n1, n2, effectiveFocal, lensKind, lensX, showAnswer, source, targetAngle]);

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
        onPointerDown={(e) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;
          const x = (e.clientX - rect.left) * scaleX;
          const y = (e.clientY - rect.top) * scaleY;
          const sourceHit = Math.hypot(x - source.x, y - source.y) < 16;
          if (sourceHit) {
            dragRef.current = "source";
            return;
          }
          if (scenario === "lens" && Math.abs(x - lensX) < 14 && Math.abs(y - 200) < 110) {
            dragRef.current = "lens";
          }
        }}
        onPointerMove={(e) => {
          if (!dragRef.current) return;
          const canvas = canvasRef.current;
          if (!canvas) return;
          const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;
          const x = (e.clientX - rect.left) * scaleX;
          const y = (e.clientY - rect.top) * scaleY;
          if (dragRef.current === "source") {
            setSource({
              x: Math.max(40, Math.min(560, x)),
              y: Math.max(40, Math.min(360, y)),
            });
          } else if (dragRef.current === "lens") {
            setLensX(Math.max(200, Math.min(500, x)));
          }
        }}
        onPointerUp={() => {
          dragRef.current = null;
        }}
        onPointerLeave={() => {
          dragRef.current = null;
        }}
        onDoubleClick={() => {
          if (scenario === "lens") {
            setLensOverride((prev) => (prev === "concave" ? "convex" : "concave"));
          }
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

function normalize(v: { x: number; y: number }) {
  const len = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / len, y: v.y / len };
}

function reflect(direction: { x: number; y: number }, normal: { x: number; y: number }) {
  const dot = direction.x * normal.x + direction.y * normal.y;
  return {
    x: direction.x - 2 * dot * normal.x,
    y: direction.y - 2 * dot * normal.y,
  };
}

function refract(direction: { x: number; y: number }, normal: { x: number; y: number }, n1: number, n2: number) {
  const cosi = -(direction.x * normal.x + direction.y * normal.y);
  const eta = n1 / n2;
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null;
  return {
    x: eta * direction.x + (eta * cosi - Math.sqrt(k)) * normal.x,
    y: eta * direction.y + (eta * cosi - Math.sqrt(k)) * normal.y,
  };
}

function drawPoint(ctx: CanvasRenderingContext2D, point: { x: number; y: number }, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawReflectionScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  source: { x: number; y: number },
  showAnswer: boolean,
  targetAngle: number
) {
  const centerX = w / 2;
  const centerY = h / 2;
  const mirrorLength = 300;

  ctx.strokeStyle = "rgba(200, 200, 255, 0.8)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX - mirrorLength / 2, centerY);
  ctx.lineTo(centerX + mirrorLength / 2, centerY);
  ctx.stroke();

  ctx.fillStyle = "rgba(200, 200, 255, 0.8)";
  ctx.font = "bold 12px monospace";
  ctx.fillText("MIRROR", centerX - 30, centerY + 20);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 150);
  ctx.lineTo(centerX, centerY + 150);
  ctx.stroke();
  ctx.setLineDash([]);

  const hitPoint = { x: centerX, y: centerY };
  const direction = normalize({ x: hitPoint.x - source.x, y: hitPoint.y - source.y });
  drawLaserBeam(ctx, source.x, source.y, hitPoint.x, hitPoint.y, "rgba(255, 0, 85, 0.9)");
  drawPoint(ctx, source, "rgba(255, 0, 85, 0.9)");

  const normal = { x: 0, y: source.y < centerY ? -1 : 1 };
  const reflected = reflect(direction, normal);
  const reflectedEnd = { x: hitPoint.x + reflected.x * 180, y: hitPoint.y + reflected.y * 180 };
  if (showAnswer) {
    drawLaserBeam(ctx, hitPoint.x, hitPoint.y, reflectedEnd.x, reflectedEnd.y, "rgba(57, 255, 20, 0.9)");
  }

  if (!showAnswer && targetAngle > 0) {
    const targetRad = (targetAngle * Math.PI) / 180;
    const targetX = centerX + Math.sin(targetRad) * 140;
    const targetY = centerY - Math.cos(targetRad) * 140;
    ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(targetX, targetY, 15, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawRefractionScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  source: { x: number; y: number },
  n1: number,
  n2: number,
  showAnswer: boolean
) {
  const centerX = w / 2;
  const centerY = h / 2;
  const interfaceLength = 400;

  ctx.strokeStyle = "rgba(0, 210, 255, 0.8)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX - interfaceLength / 2, centerY);
  ctx.lineTo(centerX + interfaceLength / 2, centerY);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 14px monospace";
  ctx.fillText(`n₁ = ${n1.toFixed(2)}`, 20, 30);
  ctx.fillText(`n₂ = ${n2.toFixed(2)}`, 20, h - 20);

  ctx.fillStyle = "rgba(0, 210, 255, 0.05)";
  ctx.fillRect(0, centerY, w, h - centerY);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 150);
  ctx.lineTo(centerX, centerY + 150);
  ctx.stroke();
  ctx.setLineDash([]);

  const hitPoint = { x: centerX, y: centerY };
  const direction = normalize({ x: hitPoint.x - source.x, y: hitPoint.y - source.y });
  drawLaserBeam(ctx, source.x, source.y, hitPoint.x, hitPoint.y, "rgba(255, 0, 85, 0.9)");
  drawPoint(ctx, source, "rgba(255, 0, 85, 0.9)");

  const enteringFromTop = source.y < centerY;
  const normal = { x: 0, y: enteringFromTop ? -1 : 1 };
  const nIn = enteringFromTop ? n1 : n2;
  const nOut = enteringFromTop ? n2 : n1;
  const refracted = refract(direction, normal, nIn, nOut);
  if (showAnswer) {
    const outgoing = refracted ?? reflect(direction, normal);
    const refractedEnd = { x: hitPoint.x + outgoing.x * 220, y: hitPoint.y + outgoing.y * 220 };
    drawLaserBeam(ctx, hitPoint.x, hitPoint.y, refractedEnd.x, refractedEnd.y, "rgba(57, 255, 20, 0.9)");
  }
}

function drawLensScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  source: { x: number; y: number },
  lensX: number,
  focalLength: number,
  lensKind: "convex" | "concave",
  showAnswer: boolean
) {
  const centerX = lensX;
  const centerY = h / 2;
  const lensHeight = 200;

  ctx.strokeStyle = "rgba(0, 210, 255, 0.9)";
  ctx.lineWidth = 4;
  const lensOffset = lensKind === "convex" ? 24 : -24;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - lensHeight / 2);
  ctx.quadraticCurveTo(centerX + lensOffset, centerY, centerX, centerY + lensHeight / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - lensHeight / 2);
  ctx.quadraticCurveTo(centerX - lensOffset, centerY, centerX, centerY + lensHeight / 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(50, centerY);
  ctx.lineTo(w - 50, centerY);
  ctx.stroke();
  ctx.setLineDash([]);

  const f1X = centerX - focalLength;
  const f2X = centerX + focalLength;
  ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
  ctx.beginPath();
  ctx.arc(f1X, centerY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(f2X, centerY, 5, 0, Math.PI * 2);
  ctx.fill();

  const objectX = source.x;
  const objectHeight = Math.max(30, Math.min(120, centerY - source.y));
  ctx.strokeStyle = "rgba(255, 0, 85, 0.9)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(objectX, centerY);
  ctx.lineTo(objectX, centerY - objectHeight);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(objectX, centerY - objectHeight);
  ctx.lineTo(objectX - 5, centerY - objectHeight + 10);
  ctx.moveTo(objectX, centerY - objectHeight);
  ctx.lineTo(objectX + 5, centerY - objectHeight + 10);
  ctx.stroke();
  drawPoint(ctx, source, "rgba(255, 0, 85, 0.9)");

  if (showAnswer) {
    drawLaserBeam(ctx, objectX, centerY - objectHeight, centerX, centerY - objectHeight, "rgba(57, 255, 20, 0.6)");
    const focusPoint = { x: f2X, y: centerY };
    const hitPoint = { x: centerX, y: centerY - objectHeight };
    const afterDir = lensKind === "convex"
      ? normalize({ x: focusPoint.x - hitPoint.x, y: focusPoint.y - hitPoint.y })
      : normalize({ x: hitPoint.x - focusPoint.x, y: hitPoint.y - focusPoint.y });
    drawLaserBeam(
      ctx,
      hitPoint.x,
      hitPoint.y,
      hitPoint.x + afterDir.x * 240,
      hitPoint.y + afterDir.y * 240,
      "rgba(57, 255, 20, 0.6)"
    );

    drawLaserBeam(ctx, objectX, centerY - objectHeight, centerX, centerY, "rgba(0, 210, 255, 0.6)");
    drawLaserBeam(ctx, centerX, centerY, centerX + 240, centerY + (objectHeight * 240) / (centerX - objectX), "rgba(0, 210, 255, 0.6)");

    const u = centerX - objectX;
    const v = Math.abs(u) < 1 ? 0 : (focalLength * u) / (u - focalLength);
    if (Math.abs(v) < 500 && v !== 0) {
      const imageX = centerX + v;
      const imageHeight = -objectHeight * (v / u);
      ctx.strokeStyle = "rgba(57, 255, 20, 0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(imageX, centerY);
      ctx.lineTo(imageX, centerY - imageHeight);
      ctx.stroke();
    }
  }
}

function drawLaserBeam(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string
) {
  ctx.shadowBlur = 15;
  ctx.shadowColor = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

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
