"use client";

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

  const A: Pt = { x: 0, y: 0 };
  const B: Pt = { x: safeA, y: 0 };
  const C: Pt = { x: 0, y: safeB };

  const squareA = [A, B, { x: B.x, y: B.y - safeA }, { x: A.x, y: A.y - safeA }];
  const squareB = [A, C, { x: C.x - safeB, y: C.y }, { x: A.x - safeB, y: A.y }];
  const squareC = [B, C, { x: C.x + safeB, y: C.y + safeA }, { x: B.x + safeB, y: B.y + safeA }];

  const allPts = [...squareA, ...squareB, ...squareC, A, B, C];
  const minX = Math.min(...allPts.map((p) => p.x));
  const maxX = Math.max(...allPts.map((p) => p.x));
  const minY = Math.min(...allPts.map((p) => p.y));
  const maxY = Math.max(...allPts.map((p) => p.y));

  const size = Math.max(maxX - minX, maxY - minY);
  const pad = Math.max(1, size * 0.16);
  const viewBox = `${minX - pad} ${minY - pad} ${size + pad * 2} ${size + pad * 2}`;

  const mAB = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
  const mAC = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
  const mBC = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };

  const textA = centroid(squareA);
  const textB = centroid(squareB);
  const textC = centroid(squareC);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#020208] p-3">
      <svg viewBox={viewBox} className="w-full h-[420px]" preserveAspectRatio="xMidYMid meet">
        <polygon points={squareA.map((p) => `${p.x},${p.y}`).join(" ")} fill="#ff6b6b" fillOpacity="0.28" stroke="#ff6b6b" strokeWidth={0.8} />
        <polygon points={squareB.map((p) => `${p.x},${p.y}`).join(" ")} fill="#51cf66" fillOpacity="0.28" stroke="#51cf66" strokeWidth={0.8} />
        <polygon points={squareC.map((p) => `${p.x},${p.y}`).join(" ")} fill="#339af0" fillOpacity="0.26" stroke="#339af0" strokeWidth={0.8} />

        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="#ffffff" fillOpacity="0.04" stroke="#e9ecef" strokeWidth={1.1} />

        <line x1={A.x} y1={A.y} x2={A.x + Math.min(safeA, safeB) * 0.16} y2={A.y} stroke="#f8f9fa" strokeWidth={1} />
        <line x1={A.x} y1={A.y} x2={A.x} y2={A.y + Math.min(safeA, safeB) * 0.16} stroke="#f8f9fa" strokeWidth={1} />

        <text x={mAB.x} y={mAB.y - 0.9} fill="#ffd8a8" fontSize={3.8} textAnchor="middle">{labels?.sideA ?? "a"}</text>
        <text x={mAC.x - 1.2} y={mAC.y} fill="#d3f9d8" fontSize={3.8} textAnchor="end">{labels?.sideB ?? "b"}</text>
        <text x={mBC.x + 1} y={mBC.y + 1} fill="#a5d8ff" fontSize={3.8} textAnchor="start">{labels?.hyp ?? "c"}</text>

        <text x={textA.x} y={textA.y} fill="#ffd8a8" fontSize={4.2} textAnchor="middle">{`a^{2} = ${Math.round(safeA * safeA)}`}</text>
        <text x={textB.x} y={textB.y} fill="#d3f9d8" fontSize={4.2} textAnchor="middle">{`b^{2} = ${Math.round(safeB * safeB)}`}</text>
        <text x={textC.x} y={textC.y} fill="#a5d8ff" fontSize={4.2} textAnchor="middle">{`c^{2} = ${Math.round(safeC * safeC)}`}</text>

        <text x={(minX + maxX) / 2} y={maxY + pad * 0.55} fill="#f8f9fa" fontSize={4.8} textAnchor="middle">
          {`${Math.round(safeA * safeA)} + ${Math.round(safeB * safeB)} = ${Math.round(safeC * safeC)}`}
        </text>
      </svg>
    </div>
  );
}
