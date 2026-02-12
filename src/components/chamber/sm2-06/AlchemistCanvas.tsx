"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    OrbitControls,
    Text,
    Line,
    OrthographicCamera,
    Html
} from "@react-three/drei";
import * as THREE from "three";

// --- Types ---
export interface SystemsVisual {
    eq1: { a: number, b: number, c: number };
    eq2: { a: number, b: number, c: number };
    intersect?: { x: number, y: number };
}

interface AlchemistCanvasProps {
    visual?: SystemsVisual;
    inputs?: Record<string, string>;
}

// --- Components ---

// 1. Professional Graph Paper Grid with Ticks and Labels
function GridSystem() {
    const range = 10;
    const ticks = useMemo(() => {
        const t = [];
        for (let i = -range; i <= range; i++) {
            if (i === 0) continue; // Skip origin
            t.push(i);
        }
        return t;
    }, []);

    return (
        <group>
            {/* Minor Grid Lines (Every 1 unit) */}
            <gridHelper args={[20, 20, 0x333333, 0x222222]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.1]} />

            {/* Major Grid Lines (Every 5 units) - Manually drawn for clarity */}
            <Line points={[[-10, 5, -0.05], [10, 5, -0.05]]} color="#444" lineWidth={1} />
            <Line points={[[-10, -5, -0.05], [10, -5, -0.05]]} color="#444" lineWidth={1} />
            <Line points={[[5, -10, -0.05], [5, 10, -0.05]]} color="#444" lineWidth={1} />
            <Line points={[[-5, -10, -0.05], [-5, 10, -0.05]]} color="#444" lineWidth={1} />

            {/* X Axis (Thick White) */}
            <Line points={[[-11, 0, 0], [11, 0, 0]]} color="white" lineWidth={3} />
            <Text position={[11.5, 0, 0]} fontSize={0.6} color="white" font="/fonts/Inter-Bold.woff">x</Text>

            {/* Y Axis (Thick White) */}
            <Line points={[[0, -11, 0], [0, 11, 0]]} color="white" lineWidth={3} />
            <Text position={[0, 11.5, 0]} fontSize={0.6} color="white" font="/fonts/Inter-Bold.woff">y</Text>

            {/* Ticks & Numbers */}
            {ticks.map(val => (
                <group key={`tick-${val}`}>
                    {/* X-Axis Tick */}
                    <Line points={[[val, -0.2, 0], [val, 0.2, 0]]} color="white" lineWidth={1.5} />
                    {val % 2 === 0 && (
                        <Text position={[val, -0.8, 0]} fontSize={0.35} color="#aaa">
                            {val}
                        </Text>
                    )}

                    {/* Y-Axis Tick */}
                    <Line points={[[-0.2, val, 0], [0.2, val, 0]]} color="white" lineWidth={1.5} />
                    {val % 2 === 0 && (
                        <Text position={[-0.8, val, 0]} fontSize={0.35} color="#aaa">
                            {val}
                        </Text>
                    )}
                </group>
            ))}

            {/* Origin Label */}
            <Text position={[-0.5, -0.5, 0]} fontSize={0.35} color="#fff">0</Text>
        </group>
    );
}

// 2. High-Visibility Equation Line
function GlowingLine({
    equation,
    color,
    label
}: {
    equation: { a: number, b: number, c: number },
    color: string,
    label: string
}) {
    const points = useMemo(() => {
        const { a, b, c } = equation;
        const pts: THREE.Vector3[] = [];

        // Handle vertical line case (b=0)
        if (Math.abs(b) < 0.001) {
            const x = c / a;
            pts.push(new THREE.Vector3(x, -12, 0));
            pts.push(new THREE.Vector3(x, 12, 0));
        } else {
            // y = (c - ax) / b
            pts.push(new THREE.Vector3(-12, (c - a * -12) / b, 0));
            pts.push(new THREE.Vector3(12, (c - a * 12) / b, 0));
        }
        return pts;
    }, [equation]);

    // Label position (dynamic)
    const labelPos = useMemo(() => {
        const p1 = points[0];
        const p2 = points[1];
        const t = 0.8; // Place label towards one end
        return new THREE.Vector3(
            p1.x + (p2.x - p1.x) * t,
            p1.y + (p2.y - p1.y) * t,
            0
        );
    }, [points]);

    const eqString = `${equation.a}x + ${equation.b < 0 ? `(${equation.b})` : equation.b}y = ${equation.c}`;

    return (
        <group>
            {/* Glow Layer (Thick, Transparent) */}
            <Line points={points} color={color} lineWidth={10} transparent opacity={0.2} />

            {/* Core Line (Solid) */}
            <Line points={points} color={color} lineWidth={3} />

            {/* Equation Label Box */}
            <group position={labelPos}>
                <Html center transform sprite>
                    <div className="px-2 py-1 bg-black/80 border border-white/20 rounded text-[10px] font-mono text-white whitespace-nowrap shadow-xl backdrop-blur-sm" style={{ borderColor: color }}>
                        <span style={{ color }} className="font-bold mr-2">{label}</span>
                        <span>{eqString}</span>
                    </div>
                </Html>
            </group>
        </group>
    );
}

// 3. Interactive Cursor & Solution Highlight
function InteractiveCursor({ x, y, visual }: { x: number, y: number, visual: SystemsVisual }) {
    const isSolved = visual.intersect &&
        Math.abs(x - visual.intersect.x) < 0.1 &&
        Math.abs(y - visual.intersect.y) < 0.1;

    return (
        <group position={[x, y, 0.1]}>
            {/* Crosshair Guides */}
            <Line points={[[-20, 0, -0.01], [20, 0, -0.01]]} color={isSolved ? "#4ade80" : "#fbbf24"} lineWidth={1} dashed dashScale={0.5} opacity={0.5} transparent />
            <Line points={[[0, -20, -0.01], [0, 20, -0.01]]} color={isSolved ? "#4ade80" : "#fbbf24"} lineWidth={1} dashed dashScale={0.5} opacity={0.5} transparent />

            {/* The Cursor Point */}
            <mesh>
                <ringGeometry args={[0.3, 0.5, 32]} />
                <meshBasicMaterial color={isSolved ? "#4ade80" : "#fbbf24"} />
            </mesh>
            <mesh>
                <circleGeometry args={[0.15, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>

            {/* Coordinates Bubble */}
            <Html position={[0, 0.8, 0]} center transform sprite>
                <div className={`px-2 py-1 rounded text-xs font-mono font-bold whitespace-nowrap shadow-lg ${isSolved ? 'bg-green-500 text-black' : 'bg-yellow-500 text-black'}`}>
                    ({x.toFixed(1)}, {y.toFixed(1)})
                    {isSolved && <span className="ml-2">✓ LOCKED</span>}
                </div>
            </Html>
        </group>
    );
}

// 4. Ghost Solution (Hint)
function SolutionHint({ x, y }: { x: number, y: number }) {
    return (
        <group position={[x, y, 0]}>
            <mesh>
                <circleGeometry args={[0.2, 32]} />
                <meshBasicMaterial color="white" transparent opacity={0.3} />
            </mesh>
            <mesh>
                <ringGeometry args={[0.4, 0.5, 32]} />
                <meshBasicMaterial color="white" transparent opacity={0.2} />
            </mesh>
        </group>
    );
}


// --- Main Canvas ---
export default function AlchemistCanvas({ visual, inputs }: AlchemistCanvasProps) {
    const inputX = parseFloat(inputs?.x || "0") || 0;
    const inputY = parseFloat(inputs?.y || "0") || 0;

    if (!visual) return null;

    return (
        <div className="relative w-full aspect-[16/9] bg-[#050505] rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
            <Canvas>
                <OrthographicCamera makeDefault position={[0, 0, 50]} zoom={22} />
                <color attach="background" args={["#050505"]} />

                <ClientOnlySuspense fallback={null}>
                    {/* The Grid System */}
                    <GridSystem />

                    {/* Equations */}
                    <GlowingLine
                        equation={visual.eq1}
                        color="#d946ef" // Fuchsia-500 (Neon Magenta)
                        label="EQ 1"
                    />
                    <GlowingLine
                        equation={visual.eq2}
                        color="#06b6d4" // Cyan-500 (Neon Cyan)
                        label="EQ 2"
                    />

                    {/* Hint for the True Intersection */}
                    {visual.intersect && (
                        <SolutionHint x={visual.intersect.x} y={visual.intersect.y} />
                    )}

                    {/* Interactive User Cursor */}
                    <InteractiveCursor x={inputX} y={inputY} visual={visual} />

                    {/* Controls (Pan/Zoom restricted) */}
                    <OrbitControls
                        enableRotate={false}
                        enableZoom={true}
                        minZoom={10}
                        maxZoom={40}
                    />
                </ClientOnlySuspense>
            </Canvas>

            {/* Static UI Legend */}
            <div className="absolute top-4 left-4 p-3 bg-black/80 border border-white/10 rounded-lg pointer-events-none backdrop-blur-sm">
                <div className="text-[9px] font-mono text-white/50 mb-2 uppercase tracking-widest font-bold">LEGEND</div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-1 bg-[#d946ef] rounded-full" />
                    <span className="text-[10px] text-white">Equation 1</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-1 bg-[#06b6d4] rounded-full" />
                    <span className="text-[10px] text-white">Equation 2</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full border-2 border-[#fbbf24]" />
                    <span className="text-[10px] text-white">Target Cursor</span>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 text-[9px] text-white/30 font-mono">
                GRAPH_VIEW: ORTHOGRAPHIC_2D // GRID_01
            </div>
        </div>
    );
}

// Internal wrapper
function ClientOnlySuspense(props: { fallback: React.ReactNode, children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    if (!isClient) return <>{props.fallback}</>;
    return <React.Suspense fallback={props.fallback}>{props.children}</React.Suspense>;
}
