"use client";

export interface SimilarityVisual {
    kind: "rect-scale" | "tri-sim" | "shadow" | "ring";
    a: number;
    b: number;
    k?: number;
    r?: number;
    l?: number;
}

interface S204_SimilarityCanvasProps {
    visual?: SimilarityVisual;
    labels?: {
        tower?: string;
        tower_shadow?: string;
        stick?: string;
        stick_shadow?: string;
    };
}

export default function S204_SimilarityCanvas({ visual, labels }: S204_SimilarityCanvasProps) {
    if (!visual) return null;

    if (visual.kind === "rect-scale") {
        const w1 = 160;
        const h1 = 80;
        const w2 = Math.max(60, Math.min(280, w1 * (visual.k ?? 1)));
        const h2 = Math.max(40, Math.min(200, h1 * (visual.k ?? 1)));
        return (
            <div className="w-full flex justify-center p-4">
                <svg viewBox="0 0 600 240" className="w-full max-w-[600px] border border-white/10 bg-black rounded-xl overflow-visible">
                    <rect x={40} y={80} width={w1} height={h1} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
                    <rect x={260} y={120 - h2 / 2} width={w2} height={h2} fill="rgba(255,255,255,0.06)" stroke="rgba(120,255,220,0.7)" />
                    <text x={40 + w1 / 2} y={70} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace" fontWeight="bold">
                        OLD
                    </text>
                    <text x={260 + w2 / 2} y={70} textAnchor="middle" fill="rgba(120,255,220,0.8)" fontSize="12" fontFamily="monospace" fontWeight="bold">
                        NEW
                    </text>
                </svg>
            </div>
        );
    }

    if (visual.kind === "tri-sim") {
        return (
            <div className="w-full flex justify-center">
                <svg width={420} height={220} className="border border-white/10 bg-black rounded-xl">
                    <polygon points="70,170 160,170 70,80" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
                    <polygon points="250,180 380,180 250,40" fill="rgba(255,255,255,0.06)" stroke="rgba(180,120,255,0.8)" />
                    <text x="115" y="195" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace">
                        small
                    </text>
                    <text x="315" y="205" textAnchor="middle" fill="rgba(180,120,255,0.8)" fontSize="10" fontFamily="monospace">
                        large
                    </text>
                </svg>
            </div>
        );
    }

    if (visual.kind === "shadow") {
        return (
            <div className="w-full flex justify-center p-4">
                <svg viewBox="0 0 600 240" className="w-full max-w-[600px] border border-white/10 bg-black rounded-xl overflow-visible shadow-2xl">
                    {/* Sky */}
                    <rect x="0" y="0" width="600" height="200" fill="rgba(255,255,255,0.02)" />
                    {/* Ground */}
                    <rect x="0" y="200" width="600" height="40" fill="rgba(255,255,255,0.08)" />

                    {/* Sun */}
                    <circle cx="550" cy="40" r="15" fill="#fbbf24" className="animate-pulse" />
                    <line x1="550" y1="40" x2="350" y2="200" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                    <line x1="550" y1="40" x2="150" y2="200" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

                    {/* Clock Tower (Zurich Style Spire) */}
                    <g transform="translate(100, 200)">
                        {/* Tower Shadow */}
                        <rect x="0" y="0" width="200" height="4" fill="rgba(255,255,255,0.2)" />
                        {/* Tower Body */}
                        <rect x="-40" y="-140" width="40" height="140" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="2" />
                        <rect x="-40" y="-160" width="40" height="20" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2" />
                        <path d="M-40,-160 L-20,-190 L0,-160 Z" fill="none" stroke="white" strokeWidth="2" />
                        <circle cx="-20" cy="-145" r="5" fill="none" stroke="white" strokeWidth="1" />

                        <text x="-40" y="-200" fill="white" fontSize="10" fontFamily="monospace" fontWeight="black" textAnchor="middle">
                            {labels?.tower || "TOWER"}
                        </text>
                        <text x="100" y="20" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace" textAnchor="middle">
                            {labels?.tower_shadow || "SHADOW"}: 12m
                        </text>
                    </g>

                    {/* Stick */}
                    <g transform="translate(450, 200)">
                        {/* Stick Shadow */}
                        <rect x="0" y="0" width="40" height="4" fill="rgba(251,191,36,0.3)" />
                        <line x1="0" y1="0" x2="0" y2="-25" stroke="#fbbf24" strokeWidth="4" />
                        <text x="0" y="-40" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="black" textAnchor="middle">
                            {labels?.stick || "STICK"}: 1.5m
                        </text>
                        <text x="20" y="20" fill="rgba(251,191,36,0.8)" fontSize="9" fontFamily="monospace" textAnchor="middle">
                            {labels?.stick_shadow || "SHADOW"}: 2.4m
                        </text>
                    </g>

                    {/* Similar Triangle Visualization */}
                    <path d="M60,200 L100,200 L60,60 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" />
                    <path d="M450,200 L490,200 L450,175 Z" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.3)" strokeDasharray="2 2" />
                </svg>
            </div>
        );
    }

    if (visual.kind === "ring") {
        const outer = 90;
        const inner = outer * 0.6;
        const chordY = 120;
        return (
            <div className="w-full flex justify-center p-4">
                <svg viewBox="0 0 600 260" className="w-full max-w-[600px] border border-white/10 bg-black rounded-xl overflow-visible shadow-2xl">
                    <circle cx="200" cy="130" r={outer} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.3)" />
                    <circle cx="200" cy="130" r={inner} fill="rgba(0,0,0,0.6)" stroke="rgba(120,255,220,0.7)" />
                    <line x1="120" y1={chordY} x2="280" y2={chordY} stroke="rgba(57,255,20,0.9)" strokeWidth="3" />
                    <text x="200" y="230" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace" fontWeight="bold">
                        L
                    </text>
                </svg>
            </div>
        );
    }

    return null;
}
