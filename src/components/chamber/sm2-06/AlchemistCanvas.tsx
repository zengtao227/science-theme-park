"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    OrbitControls,
    Text,
    Float,
    Sparkles,
    MeshWobbleMaterial,
    Html,
    Cylinder,
    Box,
    PerspectiveCamera,
    Environment,
    Grid
} from "@react-three/drei";
import * as THREE from "three";

export interface SystemsVisual {
    eq1: { a: number, b: number, c: number };
    eq2: { a: number, b: number, c: number };
    intersect?: { x: number, y: number };
}

interface AlchemistCanvasProps {
    visual?: SystemsVisual;
    inputs?: Record<string, string>; // From parent page
}

function PotionVat({
    position,
    color,
    label,
    equation,
    x,
    y
}: {
    position: [number, number, number],
    color: string,
    label: string,
    equation: { a: number, b: number, c: number },
    x: number,
    y: number
}) {
    const liquidRef = useRef<THREE.Mesh>(null);
    const currentValue = equation.a * x + equation.b * y;
    const diff = Math.abs(currentValue - equation.c);
    const isBalanced = diff < 0.1;

    // Smooth transition for liquid height
    const targetHeight = Math.min(Math.max(currentValue / equation.c, 0.1), 2) * 1.5;

    useFrame((state, delta) => {
        if (!liquidRef.current) return;
        // Animation for liquid height
        liquidRef.current.scale.y = THREE.MathUtils.lerp(liquidRef.current.scale.y, targetHeight, 0.1);
        liquidRef.current.position.y = (liquidRef.current.scale.y / 2) - 1.5;
    });

    return (
        <group position={position}>
            {/* Glass Container */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[1, 1, 3, 32]} />
                <meshPhysicalMaterial
                    transparent
                    opacity={0.2}
                    transmission={0.9}
                    thickness={0.5}
                    roughness={0}
                    color="#ffffff"
                />
            </mesh>

            {/* Liquid */}
            <mesh ref={liquidRef} position={[0, -0.75, 0]} scale={[0.95, 1, 0.95]}>
                <cylinderGeometry args={[1, 1, 1, 32]} />
                <MeshWobbleMaterial
                    color={isBalanced ? "#ffffff" : color}
                    factor={isBalanced ? 0.2 : 0.5 + diff * 0.2}
                    speed={isBalanced ? 1 : 5}
                    emissive={isBalanced ? "#ffffff" : color}
                    emissiveIntensity={isBalanced ? 2 : 0.5}
                />
            </mesh>

            {/* Glowing Cap */}
            <mesh position={[0, 1.6, 0]}>
                <boxGeometry args={[1.2, 0.2, 1.2]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            <Text
                position={[0, 2.2, 0]}
                fontSize={0.3}
                color={isBalanced ? "#fff" : "#888"}
            >
                {label}
            </Text>

            <Html position={[0, -2, 0]} center>
                <div className={`px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap transition-colors ${isBalanced ? 'bg-green-500 text-black font-bold' : 'bg-black/80 text-white/90'}`}>
                    {equation.a}x + {equation.b}y = {currentValue.toFixed(1)} / {equation.c}
                </div>
            </Html>

            {isBalanced && (
                <Sparkles count={50} scale={2} size={2} speed={0.5} color="#fff" />
            )}
        </group>
    );
}

function GridOverlay({ x, y, visual }: { x: number, y: number, visual: SystemsVisual }) {
    // 2D Projection of the 3D space for the math graph
    return (
        <group position={[0, 0, -5]}>
            <Grid args={[20, 20]} cellSize={1} sectionSize={5} fadeDistance={30} rotation={[Math.PI / 2, 0, 0]} />

            {/* Line 1 */}
            <primitive object={new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(-10, (visual.eq1.c - visual.eq1.a * -10) / visual.eq1.b, 0),
                    new THREE.Vector3(10, (visual.eq1.c - visual.eq1.a * 10) / visual.eq1.b, 0)
                ]),
                new THREE.LineBasicMaterial({ color: "#ff2d7d", linewidth: 2, opacity: 0.5, transparent: true })
            )} />

            {/* Line 2 */}
            <primitive object={new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(-10, (visual.eq2.c - visual.eq2.a * -10) / visual.eq2.b, 0),
                    new THREE.Vector3(10, (visual.eq2.c - visual.eq2.a * 10) / visual.eq2.b, 0)
                ]),
                new THREE.LineBasicMaterial({ color: "#00e5ff", linewidth: 2, opacity: 0.5, transparent: true })
            )} />

            {/* Current Input Point */}
            <mesh position={[x, y, 0.1]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="#fff" />
                <Sparkles count={10} scale={0.5} size={3} speed={2} />
            </mesh>

            {/* Solution Hint */}
            {visual.intersect && (
                <mesh position={[visual.intersect.x, visual.intersect.y, 0]}>
                    <ringGeometry args={[0.3, 0.4, 32]} />
                    <meshBasicMaterial color="#fff" transparent opacity={0.3} />
                </mesh>
            )}
        </group>
    );
}

export default function AlchemistCanvas({ visual, inputs }: AlchemistCanvasProps) {
    const x = parseFloat(inputs?.x || "0");
    const y = parseFloat(inputs?.y || "0");

    if (!visual) return null;

    const isAllBalanced = visual.intersect &&
        Math.abs(x - visual.intersect.x) < 0.1 &&
        Math.abs(y - visual.intersect.y) < 0.1;

    return (
        <div className="relative w-full aspect-[16/9] bg-[#020205] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={40} />
                <color attach="background" args={["#020208"]} />

                <Suspense fallback={null}>
                    <Environment preset="night" />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1} />

                    <group position={[0, 0, 0]}>
                        <PotionVat
                            position={[-4, 0, 0]}
                            color="#ff2d7d"
                            label="FORMULA A"
                            equation={visual.eq1}
                            x={x}
                            y={y}
                        />

                        <PotionVat
                            position={[4, 0, 0]}
                            color="#00e5ff"
                            label="FORMULA B"
                            equation={visual.eq2}
                            x={x}
                            y={y}
                        />

                        <GridOverlay x={x} y={y} visual={visual} />

                        {isAllBalanced && (
                            <Float speed={5} rotationIntensity={2} floatIntensity={1}>
                                <mesh position={[0, 3, 0]}>
                                    <sphereGeometry args={[1, 32, 32]} />
                                    <meshStandardMaterial
                                        color="#ffaa00"
                                        emissive="#ffaa00"
                                        emissiveIntensity={4}
                                    />
                                    <Sparkles count={200} scale={4} size={4} speed={1} />
                                </mesh>
                            </Float>
                        )}
                    </group>

                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 4}
                    />
                </Suspense>
            </Canvas>

            {/* Header Overlay */}
            <div className="absolute top-4 left-6 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isAllBalanced ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 'bg-red-500 animate-pulse'}`} />
                <span className="text-[10px] font-mono text-white/90 tracking-[0.4em] uppercase">
                    Alchemy_Stabilizer v1.2 //
                    <span className={isAllBalanced ? 'text-green-400' : 'text-red-400'}>
                        {isAllBalanced ? ' STABLE' : ' UNSTABLE'}
                    </span>
                </span>
            </div>

            <div className="absolute bottom-6 right-6 text-right space-y-1">
                <div className="text-[12px] font-black text-white italic tracking-tighter">THE ALCHEMIST LAB</div>
                <div className="text-[8px] font-mono text-white/60 uppercase tracking-widest">Equilibrium Finder</div>
            </div>

            {isAllBalanced && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="text-white text-[120px] font-black italic opacity-5 animate-pulse">
                        GOLD
                    </div>
                </div>
            )}
        </div>
    );
}

function Suspense(props: { fallback: React.ReactNode, children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    if (!isClient) return <>{props.fallback}</>;
    return <React.Suspense fallback={props.fallback}>{props.children}</React.Suspense>;
}
