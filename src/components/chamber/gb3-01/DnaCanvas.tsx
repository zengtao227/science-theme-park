"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface DnaCanvasProps {
    rotation: number;
    showBonds: boolean;
    highlightPair: number | null;
}

type Base = "A" | "T" | "C" | "G";

const sequence: Base[] = ["A", "T", "G", "C", "A", "T", "C", "G", "T", "A"];

const getComplementaryBase = (base: Base): Base => {
    const pairs: Record<Base, Base> = { A: "T", T: "A", C: "G", G: "C" };
    return pairs[base];
};

const getBaseColor = (base: Base): string => {
    const colors: Record<Base, string> = {
        A: "#00e5ff", // Cyan
        T: "#ff2d7d", // Pink
        C: "#39ff14", // Green
        G: "#ffd166", // Amber
    };
    return colors[base];
};

function BasePair({ index, base, rotation, showBonds, highlighted }: {
    index: number;
    base: Base;
    rotation: number;
    showBonds: boolean;
    highlighted: boolean;
}) {
    const y = index * 0.6 - 2.7;
    const angle = (index * Math.PI) / 5 + rotation;
    const radius = 1.2;

    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;

    const complementary = getComplementaryBase(base);

    return (
        <group>
            {/* Base 1 */}
            <mesh position={[x1, y, z1]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color={getBaseColor(base)}
                    emissive={getBaseColor(base)}
                    emissiveIntensity={highlighted ? 0.8 : 0.3}
                />
            </mesh>
            <Text
                position={[x1, y, z1]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {base}
            </Text>

            {/* Base 2 (complementary) */}
            <mesh position={[x2, y, z2]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color={getBaseColor(complementary)}
                    emissive={getBaseColor(complementary)}
                    emissiveIntensity={highlighted ? 0.8 : 0.3}
                />
            </mesh>
            <Text
                position={[x2, y, z2]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {complementary}
            </Text>

            {/* Hydrogen bonds */}
            {showBonds && (
                <Line
                    points={[new THREE.Vector3(x1, y, z1), new THREE.Vector3(x2, y, z2)]}
                    color={highlighted ? "#ffffff" : "#666666"}
                    lineWidth={highlighted ? 3 : 1}
                    dashed
                    dashScale={10}
                />
            )}

            {highlighted && (
                <Html position={[0, y, 0]} center>
                    <div className="bg-black/95 backdrop-blur-md border border-cyan-400/50 px-4 py-3 rounded-xl text-cyan-200 text-sm whitespace-nowrap shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        <div className="font-black tracking-tighter text-base flex items-center gap-2">
                            <span style={{ color: getBaseColor(base) }}>{base}</span>
                            <span className="text-white/40">⟷</span>
                            <span style={{ color: getBaseColor(complementary) }}>{complementary}</span>
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1 font-bold">
                            {base === "A" || base === "T" ? "2 Hydrogen Bonds" : "3 Hydrogen Bonds"}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}

function SugarPhosphateBackbone({ rotation }: { rotation: number }) {
    const points1: THREE.Vector3[] = [];
    const points2: THREE.Vector3[] = [];

    for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const index = t * 9;
        const y = index * 0.6 - 2.7;
        const angle = (index * Math.PI) / 5 + rotation;
        const radius = 1.2;

        points1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
        points2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
    }

    return (
        <>
            <Line points={points1} color="#a855f7" lineWidth={3} />
            <Line points={points2} color="#a855f7" lineWidth={3} />
        </>
    );
}

function Scene({ rotation, showBonds, highlightPair }: DnaCanvasProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y = rotation;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <group ref={groupRef}>
                <SugarPhosphateBackbone rotation={0} />

                {sequence.map((base, index) => (
                    <BasePair
                        key={index}
                        index={index}
                        base={base}
                        rotation={0}
                        showBonds={showBonds}
                        highlighted={highlightPair === index}
                    />
                ))}
            </group>

            <OrbitControls enablePan={false} enableZoom={true} />
        </>
    );
}

export default function DnaCanvas(props: DnaCanvasProps) {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <Scene {...props} />
            </Canvas>
        </div>
    );
}
