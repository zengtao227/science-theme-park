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
    Bounds,
    useBounds,
    OrbitControls
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
                >
                    {label}
                </Text>
            )}
        </group>
    );
}

function GridHelper() {
    return (
        <gridHelper args={[20, 20, "#1a1a1a", "#0a0a0a"]} rotation={[0, 0, 0]} position={[0, 0.01, 0]} />
    );
}

function ShadowScene({ labels }: { labels?: S204_SimilarityCanvasProps["labels"] }) {
    const sunPos: [number, number, number] = [10, 15, 10]; // Higher sun for better shadows

    return (
        <group position={[0, -2, 0]}>
            <ambientLight intensity={1.5} />
            <directionalLight
                position={sunPos}
                intensity={2}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
            />

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.2} />
            </mesh>
            <GridHelper />

            {/* Tower Group */}
            <group position={[-4, 0, 0]}>
                <mesh position={[0, 4, 0]} castShadow>
                    <boxGeometry args={[1.5, 8, 1.5]} />
                    <meshStandardMaterial color="#475569" emissive="#1e293b" emissiveIntensity={0.5} />
                    <Edges color="#fff" />
                </mesh>
                <Text position={[0, 8.5, 0]} fontSize={0.5} color="#fff" anchorY="bottom">
                    {labels?.tower || "CLOCK TOWER"}
                </Text>
                {/* Shadow Measurement */}
                <Line
                    points={[new THREE.Vector3(0.75, 0.1, 0), new THREE.Vector3(8, 0.1, 4)]}
                    color="#00e5ff"
                    lineWidth={3}
                    transparent
                    opacity={0.6}
                />
                <Text position={[4, 0.5, 2]} fontSize={0.4} color="#00e5ff" rotation={[-Math.PI / 2, 0, 0]}>
                    SHADOW: 12m
                </Text>
            </group>

            {/* Stick Group */}
            <group position={[4, 0, 3]}>
                <mesh position={[0, 0.75, 0]} castShadow>
                    <cylinderGeometry args={[0.05, 0.05, 1.5]} />
                    <meshStandardMaterial color="#fbbf24" />
                </mesh>
                <Text position={[0, 1.8, 0]} fontSize={0.3} color="#fbbf24" anchorY="bottom">
                    {labels?.stick || "STICK (1.5m)"}
                </Text>
                {/* Shadow Measurement */}
                <Line
                    points={[new THREE.Vector3(0, 0.1, 0), new THREE.Vector3(1.4, 0.1, 0.8)]}
                    color="#fbbf24"
                    lineWidth={3}
                    transparent
                    opacity={0.6}
                />
                <Text position={[0.7, 0.3, 0.4]} fontSize={0.25} color="#fbbf24" rotation={[-Math.PI / 2, 0, 0]}>
                    shadow: 2.4m
                </Text>
            </group>

            {/* Sun Rays visualization */}
            <Line
                points={[new THREE.Vector3(10, 15, 10), new THREE.Vector3(-4, 8, 0)]}
                color="#fbbf24"
                opacity={0.1}
                transparent
                lineWidth={1}
            />
        </group>
    );
}

function InitialCamera({ kind }: { kind: SimilarityVisual["kind"] }) {
    // Determine best camera position based on kind
    let pos: [number, number, number] = [0, 2, 10];
    let fov = 45;

    if (kind === "shadow") {
        pos = [0, 10, 24]; // Look down from further away to see everything
        fov = 45;
    } else if (kind === "rect-scale") {
        pos = [0, 1, 10];
        fov = 35;
    } else if (kind === "tri-sim") {
        pos = [0, 1, 16]; // Lifted y slightly to center better
        fov = 40;
    } else if (kind === "ring") {
        pos = [0, 0, 10];
        fov = 45;
    }

    return <PerspectiveCamera makeDefault position={pos} fov={fov} />;
}

export default function S204_SimilarityCanvas({ visual, labels }: S204_SimilarityCanvasProps) {
    if (!visual) return null;

    return (
        <div className="relative w-full aspect-[2/1] min-h-[300px] bg-[#050505] rounded-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <Canvas shadows className="w-full h-full" dpr={[1, 2]}>
                <color attach="background" args={["#050505"]} />
                <InitialCamera kind={visual.kind} />
                <ambientLight intensity={0.5} />

                <Suspense fallback={null}>
                    {visual.kind === "rect-scale" && (
                        <group position={[0, -0.5, 0]}>
                            <NeonShape
                                position={[-2.5, 0, 0]}
                                scale={[1.2, 0.6, 1]}
                                color="rgba(255,255,255,0.4)"
                                label="ORIGINAL (4)"
                            />

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
                                    label={`NEW (${Math.round(4 * (visual.k ?? 1.5))})`}
                                />
                            </Float>
                            <Text position={[0, 1, 0]} fontSize={0.3} color="white">
                                {`Scale Factor k = ${visual.k ?? 1.5}`}
                            </Text>
                        </group>
                    )}

                    {visual.kind === "tri-sim" && (
                        <group position={[0, 1.5, 0]}>
                            <group position={[-2.5, 0, 0]}>
                                <mesh rotation={[0, 0, 0]}>
                                    <coneGeometry args={[1, 2, 3]} />
                                    <meshStandardMaterial color="#fbbf24" transparent opacity={0.2} />
                                    <Edges color="#fbbf24" />
                                </mesh>
                                <Text position={[0, -1.5, 0]} fontSize={0.3} color="#fbbf24">Original</Text>
                            </group>

                            <Text position={[0, 0, 0]} fontSize={0.5} color="white">→</Text>

                            <group position={[2.5, 0, 0]}>
                                <mesh scale={visual.k ?? 1.5}>
                                    <coneGeometry args={[1, 2, 3]} />
                                    <meshStandardMaterial color="#a855f7" transparent opacity={0.2} />
                                    <Edges color="#a855f7" />
                                </mesh>
                                <Text position={[0, -1.5 * (visual.k ?? 1.5) - 0.5, 0]} fontSize={0.3} color="#a855f7">Scaled</Text>
                            </group>
                        </group>
                    )}

                    {visual.kind === "shadow" && (
                        <ShadowScene labels={labels} />
                    )}

                    {visual.kind === "ring" && (
                        <group rotation={[Math.PI / 4, 0, 0]} position={[0, -1, 0]}>
                            {/* Outer Ring */}
                            <mesh>
                                <ringGeometry args={[1.8, 2, 64]} />
                                <meshStandardMaterial color="#333" />
                            </mesh>
                            {/* Inner Ring (Visualizing width) */}
                            <mesh>
                                <ringGeometry args={[1.2, 1.8, 64]} />
                                <meshStandardMaterial color="#00e5ff" transparent opacity={0.3} side={THREE.DoubleSide} />
                            </mesh>

                            <Text position={[0, 2.5, 0]} fontSize={0.4} color="white">
                                {`Radius R = ${visual.r ?? 0}`}
                            </Text>
                            <Text position={[0, -2.5, 0]} fontSize={0.4} color="#00e5ff">
                                {`Width w = ?`}
                            </Text>
                        </group>
                    )}

                    <OrbitControls
                        makeDefault
                        enablePan={true}
                        enableZoom={true}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 1.8}
                    />

                    <ContactShadows
                        opacity={0.4}
                        scale={20}
                        blur={2}
                        far={5}
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
