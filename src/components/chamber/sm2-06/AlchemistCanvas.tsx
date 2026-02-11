"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    OrbitControls,
    Text,
    Float,
    Sparkles,
    PerspectiveCamera,
    Grid,
    Center,
    Line
} from "@react-three/drei";
import * as THREE from "three";

export interface SystemsVisual {
    eq1: { a: number, b: number, c: number };
    eq2: { a: number, b: number, c: number };
    intersect?: { x: number, y: number };
}

interface AlchemistCanvasProps {
    visual?: SystemsVisual;
    inputs?: Record<string, string>;
}

// Renders a laser beam based on equation ax + by = c
function LaserBeam({
    equation,
    color,
    currentPos,
    label
}: {
    equation: { a: number, b: number, c: number },
    color: string,
    currentPos: [number, number],
    label: string
}) {
    // Generate points for the line within a visible range [-10, 10]
    const points = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        const { a, b, c } = equation;

        // Handle vertical line case (b=0)
        if (Math.abs(b) < 0.001) {
            const x = c / a;
            pts.push(new THREE.Vector3(x, -10, 0));
            pts.push(new THREE.Vector3(x, 10, 0));
        } else {
            // y = (c - ax) / b
            pts.push(new THREE.Vector3(-10, (c - a * -10) / b, 0));
            pts.push(new THREE.Vector3(10, (c - a * 10) / b, 0));
        }
        return pts;
    }, [equation]);

    // Check if the current user position is on this line
    const [x, y] = currentPos;
    const error = Math.abs(equation.a * x + equation.b * y - equation.c);
    const isOnLine = error < 0.2;

    return (
        <group>
            {/* The Beam */}
            <Line
                points={points}
                color={color}
                lineWidth={isOnLine ? 5 : 1}
                transparent
                opacity={isOnLine ? 1 : 0.3}
            />

            {/* Label Emitter at one end */}
            <group position={[points[0].x, points[0].y, 0]}>
                <mesh>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </mesh>
                <Text position={[0, 0.5, 0]} fontSize={0.3} color={color}>
                    {label}
                </Text>
            </group>

            {/* Glow if active */}
            {isOnLine && (
                <Sparkles
                    count={20}
                    scale={[10, 10, 1]}
                    size={2}
                    speed={0.5}
                    color={color}
                />
            )}
        </group>
    );
}

// User's current input position as a 3D core
function EnergyCore({ x, y, active }: { x: number, y: number, active: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.02;
        meshRef.current.rotation.z += 0.01;
    });

    return (
        <group position={[x, y, 0.1]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef}>
                    <octahedronGeometry args={[0.4, 0]} />
                    <meshStandardMaterial
                        color={active ? "#fff" : "#444"}
                        emissive={active ? "#00e5ff" : "#222"}
                        emissiveIntensity={active ? 5 : 0.5}
                        wireframe
                    />
                </mesh>
            </Float>

            <Sparkles count={active ? 50 : 10} scale={1} size={active ? 4 : 1} color="#00e5ff" />

            <Text position={[0, -0.6, 0]} fontSize={0.25} color="white">
                {`(${x.toFixed(1)}, ${y.toFixed(1)})`}
            </Text>
        </group>
    );
}

export default function AlchemistCanvas({ visual, inputs }: AlchemistCanvasProps) {
    const x = parseFloat(inputs?.x || "0") || 0;
    const y = parseFloat(inputs?.y || "0") || 0;

    if (!visual) return null;

    const isSolved = visual.intersect &&
        Math.abs(x - visual.intersect.x) < 0.1 &&
        Math.abs(y - visual.intersect.y) < 0.1;

    return (
        <div className="relative w-full aspect-[16/9] bg-[#020205] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={35} />
                <color attach="background" args={["#010103"]} />

                <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />

                    {/* Dark Sci-Fi Environment */}
                    <Grid
                        position={[0, 0, -0.1]}
                        args={[20, 20]}
                        cellSize={1}
                        sectionSize={5}
                        fadeDistance={25}
                        infiniteGrid
                        cellColor="#111"
                        sectionColor="#222"
                    />

                    {/* Coordinate Axes */}
                    <Line points={[new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]} color="#333" lineWidth={1} />
                    <Line points={[new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]} color="#333" lineWidth={1} />

                    <group>
                        {/* Equation 1 Beam (Red) */}
                        <LaserBeam
                            equation={visual.eq1}
                            color="#ff2d7d"
                            currentPos={[x, y]}
                            label="EQ_1"
                        />

                        {/* Equation 2 Beam (Blue) */}
                        <LaserBeam
                            equation={visual.eq2}
                            color="#00e5ff"
                            currentPos={[x, y]}
                            label="EQ_2"
                        />

                        {/* User Data Core */}
                        <EnergyCore x={x} y={y} active={isSolved} />

                        {/* Solving Visual Feedback */}
                        {isSolved && (
                            <Float speed={10} rotationIntensity={5} floatIntensity={2}>
                                <mesh position={[x, y, 0]}>
                                    <sphereGeometry args={[0.8, 32, 32]} />
                                    <meshStandardMaterial
                                        color="#fff"
                                        emissive="#fff"
                                        emissiveIntensity={10}
                                        transparent
                                        opacity={0.3}
                                    />
                                </mesh>
                            </Float>
                        )}
                    </group>

                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        maxDistance={25}
                        minDistance={5}
                    />
                </Suspense>
            </Canvas>

            {/* Clear UI Labels */}
            <div className="absolute top-6 left-6 space-y-2 pointer-events-none">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isSolved ? 'bg-green-400 shadow-[0_0_15px_#4ade80]' : 'bg-red-500 animate-pulse'}`} />
                    <span className="text-xs font-mono text-white tracking-[0.4em] uppercase font-black">
                        Alignment_Matrix: {isSolved ? 'LOCKED' : 'SEARCHING'}
                    </span>
                </div>
                {!isSolved && (
                    <div className="text-[10px] font-mono text-white/60 tracking-wider">
                        Target Intersection Center...
                    </div>
                )}
            </div>

            {/* Status Feedback */}
            <div className="absolute bottom-6 left-6 p-4 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md">
                <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
                    <div className="space-y-1">
                        <div className="text-[#ff2d7d] font-bold">EQA_STATUS</div>
                        <div className="text-white">
                            {Math.abs(visual.eq1.a * x + visual.eq1.b * y - visual.eq1.c) < 0.2 ? "✓ ALIGNED" : "× DRIFTING"}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[#00e5ff] font-bold">EQB_STATUS</div>
                        <div className="text-white">
                            {Math.abs(visual.eq2.a * x + visual.eq2.b * y - visual.eq2.c) < 0.2 ? "✓ ALIGNED" : "× DRIFTING"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 right-6 text-right">
                <div className="text-[14px] font-black text-white italic tracking-tighter">LINEAR_SYSTEMS_VISUALIZER</div>
                <div className="text-[8px] font-mono text-white/40 uppercase tracking-[0.5em]">Nexus_Protocol // Geometric_Solver</div>
            </div>
        </div>
    );
}

// Simple internal client check for R3F
function Suspense(props: { fallback: React.ReactNode, children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    if (!isClient) return <>{props.fallback}</>;
    return <React.Suspense fallback={props.fallback}>{props.children}</React.Suspense>;
}
