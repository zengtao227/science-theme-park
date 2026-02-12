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

// 1. 2D Coordinate Grid with Axes
function Grid2D() {
    return (
        <group>
            {/* Background Grid Lines (Gray) */}
            <gridHelper args={[20, 20, 0x333333, 0x222222]} rotation={[Math.PI / 2, 0, 0]} />

            {/* X Axis (White, Thick) */}
            <Line
                points={[[-10, 0, 0], [10, 0, 0]]}
                color="white"
                lineWidth={2}
            />
            <Text position={[9.5, -0.5, 0]} fontSize={0.4} color="white">x</Text>

            {/* Y Axis (White, Thick) */}
            <Line
                points={[[0, -10, 0], [0, 10, 0]]}
                color="white"
                lineWidth={2}
            />
            <Text position={[0.5, 9.5, 0]} fontSize={0.4} color="white">y</Text>

            {/* Origin Label */}
            <Text position={[-0.3, -0.3, 0]} fontSize={0.3} color="#888">0</Text>
        </group>
    );
}

// 2. Linear Equation Renderer (2D Line)
function LinearEquation2D({
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
            pts.push(new THREE.Vector3(x, -10, 0));
            pts.push(new THREE.Vector3(x, 10, 0));
        } else {
            // y = (c - ax) / b
            // Calculate y at x = -10 and x = 10
            pts.push(new THREE.Vector3(-10, (c - a * -10) / b, 0));
            pts.push(new THREE.Vector3(10, (c - a * 10) / b, 0));
        }
        return pts;
    }, [equation]);

    // Calculate a position for the label (e.g., at x=5 or near center)
    const labelPos = useMemo(() => {
        const p1 = points[0];
        const p2 = points[1];
        // Interpolate to find a visible spot, e.g., 70% along the visible segment
        const t = 0.7;
        return new THREE.Vector3(
            p1.x + (p2.x - p1.x) * t,
            p1.y + (p2.y - p1.y) * t,
            0
        );
    }, [points]);

    // Construct equation string: ax + by = c
    const eqString = `${equation.a}x + ${equation.b < 0 ? `(${equation.b})` : equation.b}y = ${equation.c}`;

    return (
        <group>
            <Line points={points} color={color} lineWidth={3} />

            {/* Tag on line */}
            <group position={labelPos}>
                <mesh>
                    <boxGeometry args={[3.2, 0.6, 0.01]} />
                    <meshBasicMaterial color="black" transparent opacity={0.6} />
                </mesh>
                <Text position={[0, 0, 0.1]} fontSize={0.35} color={color} anchorX="center" anchorY="middle">
                    {eqString}
                </Text>
            </group>
        </group>
    );
}

// 3. User Input Point & Intersection Highlight
function Point2D({ x, y, color, label, isSolution }: { x: number, y: number, color: string, label?: string, isSolution?: boolean }) {
    return (
        <group position={[x, y, 0.1]}>
            {/* The Point */}
            <mesh>
                <circleGeometry args={[isSolution ? 0.3 : 0.15, 32]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Pulse Effect for Solution */}
            {isSolution && (
                <mesh>
                    <ringGeometry args={[0.3, 0.4, 32]} />
                    <meshBasicMaterial color={color} transparent opacity={0.5} />
                </mesh>
            )}

            {/* High-Contrast Coordinate Label */}
            <group position={[0, 0.6, 0]}>
                <mesh>
                    <boxGeometry args={[isSolution ? 2.5 : 1.8, 0.6, 0.01]} />
                    <meshBasicMaterial color="black" transparent opacity={0.8} />
                </mesh>
                <Text position={[0, 0, 0.1]} fontSize={0.35} color="white" fontWeight="bold">
                    {label || `(${x.toFixed(1)}, ${y.toFixed(1)})`}
                </Text>
            </group>
        </group>
    );
}

// --- Main Canvas ---
export default function AlchemistCanvas({ visual, inputs }: AlchemistCanvasProps) {
    const inputX = parseFloat(inputs?.x || "0") || 0;
    const inputY = parseFloat(inputs?.y || "0") || 0;

    if (!visual) return null;

    const isSolved = visual.intersect &&
        Math.abs(inputX - visual.intersect.x) < 0.1 &&
        Math.abs(inputY - visual.intersect.y) < 0.1;

    return (
        <div className="relative w-full aspect-[16/9] bg-[#111] rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
            <Canvas>
                <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={25} />
                <color attach="background" args={["#111"]} />

                <ClientOnlySuspense fallback={null}>
                    {/* 2D Coordinate System */}
                    <Grid2D />

                    {/* Equation 1: Neon Magenta (#FF00FF) */}
                    <LinearEquation2D
                        equation={visual.eq1}
                        color="#FF00FF"
                        label="EQ 1"
                    />

                    {/* Equation 2: Neon Cyan (#00FFFF) */}
                    <LinearEquation2D
                        equation={visual.eq2}
                        color="#00FFFF"
                        label="EQ 2"
                    />

                    {/* True Intersection (Ghost Hint) */}
                    {visual.intersect && (
                        <Point2D
                            x={visual.intersect.x}
                            y={visual.intersect.y}
                            color="#FFFFFF"
                            label="SOLUTION"
                            isSolution={true}
                        />
                    )}

                    {/* User Input Cursor */}
                    <Point2D
                        x={inputX}
                        y={inputY}
                        color={isSolved ? "#00FF00" : "#FFFF00"}
                        label={isSolved ? "MATCH!" : "CURSOR"}
                    />

                    {/* Simple Pan/Zoom for exploration */}
                    <OrbitControls
                        enableRotate={false}
                        enableZoom={true}
                        minZoom={15}
                        maxZoom={50}
                    />
                </ClientOnlySuspense>
            </Canvas>

            {/* HTML Overlay for Legend */}
            <div className="absolute top-4 left-4 p-3 bg-black/80 border border-white/20 rounded-lg pointer-events-none">
                <div className="text-[10px] font-mono text-white/90 mb-2 uppercase tracking-widest font-bold">LEGEND</div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-1 bg-[#FF00FF]" />
                    <span className="text-[10px] text-white">Eq 1 (Magenta)</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-1 bg-[#00FFFF]" />
                    <span className="text-[10px] text-white">Eq 2 (Cyan)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-[10px] text-white">Your Input</span>
                </div>
            </div>

            {/* Coordinates Display */}
            <div className="absolute bottom-4 right-4 text-right pointer-events-none">
                <div className="text-2xl font-mono font-bold text-white">
                    ({inputX.toFixed(1)}, {inputY.toFixed(1)})
                </div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest">CURRENT COORDINATES</div>
            </div>
        </div>
    );
}

// Internal wrapper to avoid React naming conflict
function ClientOnlySuspense(props: { fallback: React.ReactNode, children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    if (!isClient) return <>{props.fallback}</>;
    return <React.Suspense fallback={props.fallback}>{props.children}</React.Suspense>;
}
