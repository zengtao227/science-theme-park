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

    const Container = ({ children }: { children: React.ReactNode }) => (
        <div className="relative w-full aspect-[2/1] bg-[#050505] rounded-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center" />
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 opacity-30" />
            {children}
            <div className="absolute top-3 left-4 flex gap-2">
                <div className="w-1 h-1 rounded-full bg-neon-cyan animate-pulse" />
                <span className="text-[7px] font-mono text-white/30 tracking-[0.3em] uppercase">Sim-Scanner v2.4</span>
            </div>
        </div>
    );

    if (visual.kind === "rect-scale") {
        const w1 = 120;
        const h1 = 60;
        const k = visual.k ?? 1.5;
        const w2 = w1 * k;
        const h2 = h1 * k;
        return (
            <Container>
                <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {/* Old Rect */}
                    <rect x={100} y={120 - h1 / 2} width={w1} height={h1} rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    <text x={100 + w1 / 2} y={120 + h1 / 2 + 20} textAnchor="middle" fill="white" fontSize="10" className="font-mono opacity-40">ORIGINAL [1:1]</text>

                    {/* Scaling Lines */}
                    <line x1={100 + w1} y1={120} x2={300} y2={120} stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.1" />

                    {/* New Rect */}
                    <g filter="url(#glow)">
                        <rect x={300} y={120 - h2 / 2} width={w2} height={h2} rx="4" fill="rgba(0, 229, 255, 0.05)" stroke="#00e5ff" strokeWidth="3" />
                        <text x={300 + w2 / 2} y={120} textAnchor="middle" dominantBaseline="middle" fill="#00e5ff" fontSize="14" className="font-black">k={k}</text>
                    </g>
                    <text x={300 + w2 / 2} y={120 + h2 / 2 + 25} textAnchor="middle" fill="#00e5ff" fontSize="10" className="font-mono font-bold uppercase tracking-wider">Scaled Result</text>
                </svg>
            </Container>
        );
    }

    if (visual.kind === "tri-sim") {
        return (
            <Container>
                <svg viewBox="0 0 500 250" className="w-full h-full overflow-visible">
                    {/* Small Triangle */}
                    <g transform="translate(80, 50)">
                        <polygon points="0,150 120,150 0,60" fill="rgba(251, 191, 36, 0.05)" stroke="#fbbf24" strokeWidth="2" />
                        <text x="60" y="170" textAnchor="middle" fill="#fbbf24" fontSize="10" className="font-mono">Reference</text>
                    </g>

                    {/* Comparison Arrows */}
                    <path d="M220,125 Q250,125 280,125" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />

                    {/* Large Triangle */}
                    <g transform="translate(300, 30)">
                        <polygon points="0,170 180,170 0,40" fill="rgba(168, 85, 247, 0.05)" stroke="#a855f7" strokeWidth="3" />
                        <text x="90" y="190" textAnchor="middle" fill="#a855f7" fontSize="10" className="font-mono font-bold">Similar & Target</text>
                    </g>
                </svg>
            </Container>
        );
    }

    if (visual.kind === "shadow") {
        return (
            <Container>
                <svg viewBox="0 0 600 260" className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Ground */}
                    <line x1="0" y1="220" x2="600" y2="220" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                    {/* Sun Rays */}
                    <path d="M550,40 L150,220 M550,40 L450,220" stroke="url(#sunGradient)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                    <circle cx="550" cy="40" r="10" fill="#fbbf24">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinity" />
                    </circle>

                    {/* Tower */}
                    <g transform="translate(150, 220)">
                        {/* Shadow */}
                        <path d="M0,0 L120,0 L0,0" stroke="white" strokeWidth="4" opacity="0.2" strokeLinecap="round" />
                        <rect x="-30" y="-140" width="30" height="140" fill="rgba(255,255,255,0.03)" stroke="white" strokeWidth="2" />
                        <path d="M-30,-140 L-15,-170 L0,-140" fill="none" stroke="white" strokeWidth="2" />
                        <text x="-15" y="-185" textAnchor="middle" fill="white" fontSize="10" className="font-black uppercase tracking-tighter">{labels?.tower || "Tower"}</text>
                        <text x="60" y="15" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" className="font-mono">Shadow: 12.0m</text>
                    </g>

                    {/* Pointer / Stick */}
                    <g transform="translate(450, 220)">
                        <path d="M0,0 L20,0 L0,0" stroke="#fbbf24" strokeWidth="4" opacity="0.4" strokeLinecap="round" />
                        <line x1="0" y1="0" x2="0" y2="-25" stroke="#fbbf24" strokeWidth="3" />
                        <text x="0" y="-35" textAnchor="middle" fill="#fbbf24" fontSize="9" className="font-bold uppercase">{labels?.stick || "Stick"}</text>
                        <text x="10" y="15" textAnchor="middle" fill="rgba(251, 191, 36, 0.5)" fontSize="8" className="font-mono">Shadow: 2.0m</text>
                    </g>
                </svg>
            </Container>
        );
    }

    if (visual.kind === "ring") {
        return (
            <Container>
                <svg viewBox="0 0 400 240" className="w-full h-full overflow-visible">
                    <circle cx="200" cy="120" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 2" />
                    <circle cx="200" cy="120" r="50" fill="rgba(0, 229, 255, 0.03)" stroke="#00e5ff" strokeWidth="2" />
                    {/* Measuring line */}
                    <line x1="140" y1="120" x2="260" y2="120" stroke="#39ff14" strokeWidth="2" />
                    <circle cx="140" cy="120" r="3" fill="#39ff14" />
                    <circle cx="260" cy="120" r="3" fill="#39ff14" />
                    <text x="200" y="110" textAnchor="middle" fill="#39ff14" fontSize="12" className="font-black">L</text>
                </svg>
            </Container>
        );
    }

    return null;
}
