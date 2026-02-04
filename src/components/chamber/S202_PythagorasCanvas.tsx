"use client";

import { useRef, useEffect } from "react";

interface TriangleCanvasProps {
  a: number;
  b: number;
  c: number;
  highlightRightAngle: boolean;
}

function TriangleCanvas({ a, b, c, highlightRightAngle }: TriangleCanvasProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pad = 48;
    const maxLeg = Math.max(a, b);
    const scale = (Math.min(w, h) - pad * 2) / maxLeg;
    const ax = a * scale;
    const by = b * scale;

    const origin = { x: pad, y: h - pad };
    const pA = origin;
    const pB = { x: origin.x + ax, y: origin.y };
    const pC = { x: origin.x, y: origin.y - by };

    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pB.x, pB.y);
    ctx.lineTo(pC.x, pC.y);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = highlightRightAngle ? "rgba(57,255,20,0.9)" : "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.lineTo(pA.x + 22, pA.y);
    ctx.lineTo(pA.x + 22, pA.y - 22);
    ctx.lineTo(pA.x, pA.y - 22);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "16px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillText(`a=${a}`, (pA.x + pB.x) / 2 - 20, pA.y + 24);
    ctx.fillText(`b=${b}`, pA.x - 44, (pA.y + pC.y) / 2 + 8);
    ctx.fillText(`c=${c}`, (pB.x + pC.x) / 2 + 10, (pB.y + pC.y) / 2 - 8);
  }, [a, b, c, highlightRightAngle]);

  return <canvas ref={ref} width={480} height={480} className="w-full h-auto block" />;
}

interface SpaceCanvasProps {
  a: number;
  b: number;
  c: number;
}

function SpaceCanvas({ a, b, c }: SpaceCanvasProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const scale = (Math.min(w, h) * 0.5) / Math.max(a, b, c);
    const cx = w / 2;
    const cy = h * 0.7;

    const iso = (lx: number, ly: number, lz: number) => {
      const ang = Math.PI / 6;
      const u = (lx - ly) * Math.cos(ang);
      const v = (lx + ly) * Math.sin(ang) - lz;
      return { x: cx + u * scale, y: cy + v * scale };
    };

    const O = iso(0, 0, 0);
    const A = iso(a, 0, 0);
    const B = iso(a, b, 0);
    const C = iso(a, b, c);
    const D = iso(0, b, 0);

    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(O.x, O.y);
    ctx.lineTo(D.x, D.y);
    ctx.lineTo(B.x, B.y);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.strokeStyle = "#00ff9d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(O.x, O.y);
    ctx.lineTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.stroke();

    ctx.strokeStyle = "#00d2ff";
    ctx.beginPath();
    ctx.moveTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.stroke();

    ctx.strokeStyle = "#ff0055";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(O.x, O.y);
    ctx.lineTo(C.x, C.y);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    const Az = iso(a, 0, c);
    const Oz = iso(0, 0, c);
    const Dz = iso(0, b, c);
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(Az.x, Az.y);
    ctx.lineTo(C.x, C.y);
    ctx.moveTo(Az.x, Az.y);
    ctx.lineTo(Oz.x, Oz.y);
    ctx.lineTo(Dz.x, Dz.y);
    ctx.lineTo(C.x, C.y);
    ctx.moveTo(Oz.x, Oz.y);
    ctx.lineTo(O.x, O.y);
    ctx.moveTo(Dz.x, Dz.y);
    ctx.lineTo(D.x, D.y);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "bold 14px monospace";
    ctx.fillText(`a=${a}`, (O.x + A.x) / 2, (O.y + A.y) / 2 + 20);
    ctx.fillText(`b=${b}`, (A.x + B.x) / 2 + 10, (A.y + B.y) / 2 + 10);
    ctx.fillText(`c=${c}`, B.x + 10, (B.y + C.y) / 2);
  }, [a, b, c]);

  return <canvas ref={ref} width={480} height={480} className="w-full h-auto block" />;
}

interface DistanceCanvasProps {
  p1: { x: number; y: number };
  p2: { x: number; y: number };
}

function DistanceCanvas({ p1, p2 }: DistanceCanvasProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pad = 36;
    const range = 12;
    const gridSize = (Math.min(w, h) - pad * 2) / (range * 2);
    const origin = { x: w / 2, y: h / 2 };

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    for (let i = -range; i <= range; i++) {
      ctx.beginPath();
      ctx.moveTo(origin.x + i * gridSize, pad);
      ctx.lineTo(origin.x + i * gridSize, h - pad);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pad, origin.y + i * gridSize);
      ctx.lineTo(w - pad, origin.y + i * gridSize);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pad, origin.y);
    ctx.lineTo(w - pad, origin.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(origin.x, pad);
    ctx.lineTo(origin.x, h - pad);
    ctx.stroke();

    const toPx = (p: { x: number; y: number }) => ({
      x: origin.x + p.x * gridSize,
      y: origin.y - p.y * gridSize,
    });

    const P1 = toPx(p1);
    const P2 = toPx(p2);
    const corner = toPx({ x: p2.x, y: p1.y });

    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(P1.x, P1.y);
    ctx.lineTo(corner.x, corner.y);
    ctx.lineTo(P2.x, P2.y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = "rgba(57,255,20,0.85)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(P1.x, P1.y);
    ctx.lineTo(P2.x, P2.y);
    ctx.stroke();

    const dot = (p: { x: number; y: number }, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
    };

    dot(P1, "rgba(255,255,255,0.95)");
    dot(P2, "rgba(255,255,255,0.95)");

    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "14px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillText(`(${p1.x},${p1.y})`, P1.x + 10, P1.y - 10);
    ctx.fillText(`(${p2.x},${p2.y})`, P2.x + 10, P2.y - 10);
  }, [p1, p2]);

  return <canvas ref={ref} width={520} height={520} className="w-full h-auto block" />;
}

export interface S202CanvasProps {
  visual: {
    kind: "triangle" | "space" | "distance";
    a?: number;
    b?: number;
    c?: number;
    highlightRightAngle?: boolean;
    p1?: { x: number; y: number };
    p2?: { x: number; y: number };
  };
}

export default function S202PythagorasCanvas({ visual }: S202CanvasProps) {
  if (visual.kind === "triangle" && visual.a !== undefined && visual.b !== undefined && visual.c !== undefined) {
    return <TriangleCanvas a={visual.a} b={visual.b} c={visual.c} highlightRightAngle={visual.highlightRightAngle ?? false} />;
  }

  if (visual.kind === "space" && visual.a !== undefined && visual.b !== undefined && visual.c !== undefined) {
    return <SpaceCanvas a={visual.a} b={visual.b} c={visual.c} />;
  }

  if (visual.kind === "distance" && visual.p1 && visual.p2) {
    return <DistanceCanvas p1={visual.p1} p2={visual.p2} />;
  }

  return <div className="text-white/40 text-center p-8">No visualization available</div>;
}
