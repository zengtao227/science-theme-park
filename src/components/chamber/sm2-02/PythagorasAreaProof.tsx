"use client";

import { InlineMath } from "react-katex";

interface PythagorasAreaProofProps {
  a: number;
  b: number;
  c: number;
  labels?: {
    sideA?: string;
    sideB?: string;
    hyp?: string;
  };
}

type Pt = { x: number; y: number };

function centroid(points: Pt[]): Pt {
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  return { x: sum.x / points.length, y: sum.y / points.length };
}

export default function PythagorasAreaProof({ a, b, c, labels }: PythagorasAreaProofProps) {
  const safeA = Math.max(1, a);
  const safeB = Math.max(1, b);
  const safeC = Math.max(1, c);
  const maxSide = Math.max(safeA, safeB, safeC);
  const scale = 24 / maxSide;
  const drawA = Math.max(8, safeA * scale);
  const drawB = Math.max(8, safeB * scale);

  const A: Pt = { x: 0, y: 0 };
  const B: Pt = { x: drawA, y: 0 };
  const C: Pt = { x: 0, y: drawB };

  const squareA = [A, B, { x: B.x, y: B.y - drawA }, { x: A.x, y: A.y - drawA }];
  const squareB = [A, C, { x: C.x - drawB, y: C.y }, { x: A.x - drawB, y: A.y }];
  const squareC = [B, C, { x: C.x + drawB, y: C.y + drawA }, { x: B.x + drawB, y: B.y + drawA }];

  const allPts = [...squareA, ...squareB, ...squareC, A, B, C];
  const minX = Math.min(...allPts.map((p) => p.x));
  const maxX = Math.max(...allPts.map((p) => p.x));
  const minY = Math.min(...allPts.map((p) => p.y));
  const maxY = Math.max(...allPts.map((p) => p.y));

  const size = Math.max(maxX - minX, maxY - minY);
  const pad = Math.max(2, size * 0.18);
  const viewBox = `${minX - pad} ${minY - pad} ${size + pad * 2} ${size + pad * 2}`;

  const mAB = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
  const mAC = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
  const mBC = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };

  const textA = centroid(squareA);
  const textB = centroid(squareB);
  const textC = centroid(squareC);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#020208] p-3 space-y-3">
      <svg viewBox={viewBox} className="w-full h-[360px] md:h-[420px]" preserveAspectRatio="xMidYMid meet">
        <polygon points={squareA.map((p) => `${p.x},${p.y}`).join(" ")} fill="#ff6b6b" fillOpacity="0.28" stroke="#ff6b6b" strokeWidth={0.8} />
        <polygon points={squareB.map((p) => `${p.x},${p.y}`).join(" ")} fill="#51cf66" fillOpacity="0.28" stroke="#51cf66" strokeWidth={0.8} />
        <polygon points={squareC.map((p) => `${p.x},${p.y}`).join(" ")} fill="#339af0" fillOpacity="0.26" stroke="#339af0" strokeWidth={0.8} />

        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#ffffff" fillOpacity="0.04" stroke="#e9ecef" strokeWidth={1.1} />

        <line x1={A.x} y1={A.y} x2={A.x + Math.min(safeA, safeB) * 0.16} y2={A.y} stroke="#f8f9fa" strokeWidth={1} />
        <line x1={A.x} y1={A.y} x2={A.x} y2={A.y + Math.min(safeA, safeB) * 0.16} stroke="#f8f9fa" strokeWidth={1} />

        <text x={mAB.x} y={mAB.y - 1} fill="#ffd8a8" fontSize={4.5} textAnchor="middle">{labels?.sideA ?? "a"}</text>
        <text x={mAC.x - 1.4} y={mAC.y} fill="#d3f9d8" fontSize={4.5} textAnchor="end">{labels?.sideB ?? "b"}</text>
        <text x={mBC.x + 1.4} y={mBC.y + 1.2} fill="#a5d8ff" fontSize={4.5} textAnchor="start">{labels?.hyp ?? "c"}</text>

        <circle cx={textA.x} cy={textA.y} r={2.2} fill="#ff6b6b" fillOpacity={0.24} />
        <circle cx={textB.x} cy={textB.y} r={2.2} fill="#51cf66" fillOpacity={0.24} />
        <circle cx={textC.x} cy={textC.y} r={2.2} fill="#339af0" fillOpacity={0.2} />
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-[#ff6b6b]/40 bg-[#ff6b6b]/10 py-2 text-white">
          <InlineMath math={`a^{2}=${Math.round(safeA * safeA)}`} />
        </div>
        <div className="rounded-lg border border-[#51cf66]/40 bg-[#51cf66]/10 py-2 text-white">
          <InlineMath math={`b^{2}=${Math.round(safeB * safeB)}`} />
        </div>
        <div className="rounded-lg border border-[#339af0]/40 bg-[#339af0]/10 py-2 text-white">
          <InlineMath math={`c^{2}=${Math.round(safeC * safeC)}`} />
        </div>
      </div>
      <div className="rounded-lg border border-white/15 bg-white/5 py-2 text-center text-white">
        <InlineMath math={`${Math.round(safeA * safeA)}+${Math.round(safeB * safeB)}=${Math.round(safeC * safeC)}`} />
      </div>
    </div>
  );
}
