"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
    PerspectiveCamera,
    Environment,
    Float,
    Line,
    Text,
    ContactShadows,
    Edges,
    Bounds
} from "@react-three/drei";
import * as THREE from "three";

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

function NeonShape({
    scale = 1,
    position = [0, 0, 0],
    color = "#00e5ff",
    label = ""
}: {
    scale?: number | [number, number, number],
    position?: [number, number, number],
    color?: string,
    label?: string
}) {
    return (
        <group position={position}>
            <mesh scale={scale}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.1}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
                <Edges color={color} threshold={15} />
            </mesh>
            {label && (
                <Text
                    position={[0, -1, 0]}
                    fontSize={0.25}
                    color={color}
                    font="/fonts/Inter-Bold.woff"
                >
                    {label}
                </Text>
            )}
        </group>
    );
}

function ShadowScene({ labels }: { labels?: S204_SimilarityCanvasProps["labels"] }) {
    const sunPos: [number, number, number] = [10, 8, 5];

    return (
        <group position={[0, -1, 0]}>
            <ambientLight intensity={0.4} />
            <directionalLight
                position={sunPos}
                intensity={1.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#050505" transparent opacity={0.8} />
            </mesh>
            <GridHelper />

            {/* Tower */}
            <mesh position={[-2, 1.5, 0]} castShadow>
                <boxGeometry args={[0.8, 3, 0.8]} />
                <meshStandardMaterial color="#1d2633" />
                <Edges color="#fff" />
                <Text position={[0, 2, 0]} fontSize={0.3} color="#fff">{labels?.tower || "TOWER"}</Text>
            </mesh>

            {/* Stick */}
            <mesh position={[2, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 1]} />
                <meshStandardMaterial color="#fbbf24" />
                <Edges color="#fbbf24" />
                <Text position={[0, 0.8, 0]} fontSize={0.2} color="#fbbf24">{labels?.stick || "STICK"}</Text>
            </mesh>

            {/* Sunlight Rays */}
            <Line
                points={[new THREE.Vector3(...sunPos), new THREE.Vector3(-2, 3, 0)]}
                color="#fbbf24"
                opacity={0.1}
                transparent
                lineWidth={0.5}
            />
        </group>
    );
}

function GridHelper() {
    return (
        <gridHelper args={[20, 20, "#1a1a1a", "#0a0a0a"]} rotation={[0, 0, 0]} position={[0, 0.01, 0]} />
    );
}

export default function S204_SimilarityCanvas({ visual, labels }: S204_SimilarityCanvasProps) {
    if (!visual) return null;

    return (
        <div className="relative w-full aspect-[2/1] bg-[#050505] rounded-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <Canvas shadows className="w-full h-full">
                <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={35} />
                <color attach="background" args={["#050505"]} />

                <Suspense fallback={null}>
                    <Environment preset="city" />

                    <Bounds fit clip observe margin={1.2}>
                        {visual.kind === "rect-scale" && (
                            <group position={[0, 0, 0]}>
                                <NeonShape
                                    position={[-2.5, 0, 0]}
                                    scale={[1.2, 0.6, 1]}
                                    color="rgba(255,255,255,0.4)"
                                    label="ORIGINAL"
                                />

                                {/* Connecting Path */}
                                <Line
                                    points={[new THREE.Vector3(-1.5, 0, 0), new THREE.Vector3(1, 0, 0)]}
                                    color="#fff"
                                    opacity={0.1}
                                    transparent
                                    dashed
                                />

                                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                                    <NeonShape
                                        position={[2, 0, 0]}
                                        scale={[1.2 * (visual.k ?? 1.5), 0.6 * (visual.k ?? 1.5), visual.k ?? 1.5]}
                                        color="#00e5ff"
                                        label={`k = ${visual.k ?? 1.5}`}
                                    />
                                </Float>
                            </group>
                        )}

                        {visual.kind === "tri-sim" && (
                            <group position={[0, 0, 0]}>
                                {/* Visualizing similarity as shapes in 3D */}
                                <mesh position={[-2, 0, 0]} rotation={[0, 0, 0.2]}>
                                    <coneGeometry args={[0.8, 1.2, 3]} />
                                    <meshStandardMaterial color="#fbbf24" transparent opacity={0.1} />
                                    <Edges color="#fbbf24" />
                                </mesh>

                                <mesh position={[2, 0, 0]} rotation={[0, 0, 0.2]} scale={1.5}>
                                    <coneGeometry args={[0.8, 1.2, 3]} />
                                    <meshStandardMaterial color="#a855f7" transparent opacity={0.2} emissive="#a855f7" emissiveIntensity={0.5} />
                                    <Edges color="#a855f7" />
                                </mesh>
                            </group>
                        )}

                        {visual.kind === "shadow" && (
                            <ShadowScene labels={labels} />
                        )}

                        {visual.kind === "ring" && (
                            <group rotation={[Math.PI / 3, 0, 0]}>
                                <mesh>
                                    <ringGeometry args={[1.5, 1.55, 64]} />
                                    <meshBasicMaterial color="#333" />
                                </mesh>
                                <mesh>
                                    <ringGeometry args={[0.9, 1, 64]} />
                                    <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} />
                                </mesh>
                                <Line
                                    points={[new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0)]}
                                    color="#39ff14"
                                    lineWidth={2}
                                />
                            </group>
                        )}
                    </Bounds>

                    <ContactShadows
                        opacity={0.4}
                        scale={15}
                        blur={2.5}
                        far={4}
                        resolution={256}
                        color="#000000"
                    />
                </Suspense>
            </Canvas>

            {/* HUD Overlay */}
            <div className="absolute top-3 left-4 flex gap-2 items-center pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                <span className="text-[8px] font-mono text-white/30 tracking-[0.3em] uppercase">Sim-Scanner v3.0 // 3D_MATRIX</span>
            </div>

            <div className="absolute bottom-3 left-4 text-[7px] font-mono text-white/10 uppercase tracking-widest">
                Geometric_Similarity_Algorithm: ACTIVE
            </div>
        </div>
    );
}
