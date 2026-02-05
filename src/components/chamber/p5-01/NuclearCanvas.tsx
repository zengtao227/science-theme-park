"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars, Float, Text, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

type NuclearElement = { symbol?: string; A?: number; Z?: number };
type NuclearQuest = { stage?: string; initialElement?: NuclearElement; resultElement?: NuclearElement };

interface NuclearCanvasProps {
    quest: NuclearQuest | null;
    lastCheck: { ok: boolean; correct: string } | null;
}

function CherenkovGlow() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.position.y = -2 + Math.sin(clock.getElapsedTime()) * 0.1;
            (meshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.05 + Math.sin(clock.getElapsedTime()) * 0.02;
        }
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -2]}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.05} />
        </mesh>
    );
}

function RadioactiveParticles({ count = 200 }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        const v = new Float32Array(count * 3);
        const pseudo = (n: number) => {
            const x = Math.sin(n * 12.9898) * 43758.5453;
            return x - Math.floor(x);
        };
        for (let i = 0; i < count; i++) {
            p[i * 3] = (pseudo(i + 1) - 0.5) * 10;
            p[i * 3 + 1] = (pseudo(i + 11) - 0.5) * 10;
            p[i * 3 + 2] = (pseudo(i + 21) - 0.5) * 10;
            v[i * 3] = (pseudo(i + 31) - 0.5) * 0.01;
            v[i * 3 + 1] = (pseudo(i + 41) - 0.5) * 0.01;
            v[i * 3 + 2] = (pseudo(i + 51) - 0.5) * 0.01;
        }
        return { p, v };
    }, [count]);

    const ref = useRef<THREE.Points>(null);
    useFrame(() => {
        if (ref.current) {
            const positions = ref.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < count; i++) {
                positions[i * 3] += points.v[i * 3];
                positions[i * 3 + 1] += points.v[i * 3 + 1];
                positions[i * 3 + 2] += points.v[i * 3 + 2];
                if (Math.abs(positions[i * 3]) > 5) positions[i * 3] *= -0.9;
                if (Math.abs(positions[i * 3 + 1]) > 5) positions[i * 3 + 1] *= -0.9;
                if (Math.abs(positions[i * 3 + 2]) > 5) positions[i * 3 + 2] *= -0.9;
            }
            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.p.length / 3}
                    array={points.p}
                    itemSize={3}
                    args={[points.p, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#00e5ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </points>
    );
}

function Nucleus({ count, color, position, scale = 1 }: { count: number, color: string, position: [number, number, number], scale?: number }) {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        const pseudo = (n: number) => {
            const x = Math.sin(n * 12.9898) * 43758.5453;
            return x - Math.floor(x);
        };
        for (let i = 0; i < count; i++) {
            const theta = pseudo(i + 1) * Math.PI * 2;
            const phi = Math.acos(pseudo(i + 11) * 2 - 1);
            const r = Math.pow(pseudo(i + 21), 0.5) * 0.5;
            p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            p[i * 3 + 2] = r * Math.cos(phi);
        }
        return p;
    }, [count]);

    const ref = useRef<THREE.Group>(null);
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.01;
            ref.current.rotation.z += 0.005;
        }
    });

    return (
        <group ref={ref} position={position} scale={scale}>
            <Points positions={points} stride={3}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
            {/* Bloom core */}
            <Sphere args={[0.3, 16, 16]}>
                <meshBasicMaterial color={color} transparent opacity={0.15} />
            </Sphere>
        </group>
    );
}

function DecayAnimation({ mode, ok }: { mode: string, ok: boolean | null }) {
    const particleRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (particleRef.current) {
            particleRef.current.position.x += 0.05;
            if (particleRef.current.position.x > 5) {
                particleRef.current.position.x = 0;
            }
        }
    });

    if (!ok && ok !== null) return null;

    let particleColor = "#39ff14";
    if (mode === 'ALPHA') particleColor = "#ffeb3b";
    if (mode === 'BETA') particleColor = "#00e5ff";
    if (mode === 'GAMMA') particleColor = "#ff1744";

    return (
        <mesh ref={particleRef} position={[0, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color={particleColor} />
        </mesh>
    );
}

export default function P501_NuclearCanvas({ quest, lastCheck }: NuclearCanvasProps) {
    const isCorrect = lastCheck?.ok;

    return (
        <div className="w-full h-full bg-[#050505] rounded-lg overflow-hidden relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <color attach="background" args={["#000"]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    {/* Initial Nucleus */}
                    <Nucleus
                        count={quest?.initialElement?.A || 100}
                        color={isCorrect ? "#00e5ff" : "#39ff14"}
                        position={[-1.5, 0, 0]}
                    />

                    {/* Transition Arrow / Effect */}
                    <group position={[0, 0, 0]}>
                        <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                            <coneGeometry args={[0.1, 0.3, 16]} />
                            <meshBasicMaterial color="#fff" transparent opacity={0.2} />
                        </mesh>
                    </group>

                    {/* Result Nucleus */}
                    <Nucleus
                        count={quest?.resultElement?.A || 80}
                        color={isCorrect ? "#39ff14" : "#ff1744"}
                        position={[1.5, 0, 0]}
                        scale={0.8}
                    />

                    {/* Label Text */}
                    <Text
                        position={[-1.5, -1, 0]}
                        fontSize={0.2}
                        color="white"
                        font="/fonts/Inter-Bold.woff"
                    >
                        {quest?.initialElement?.symbol || "X"}
                    </Text>
                    <Text
                        position={[1.5, -1, 0]}
                        fontSize={0.2}
                        color="white"
                        font="/fonts/Inter-Bold.woff"
                    >
                        {quest?.resultElement?.symbol || "Y"}
                    </Text>
                </Float>

                {/* Decay Particles if correct */}
                {isCorrect && <DecayAnimation mode={quest?.stage ?? "STANDBY"} ok={isCorrect} />}

                {/* Radioactive Ambient Particles */}
                <RadioactiveParticles count={300} />

                {/* Radiation Pool Glow (Cherenkov Radiation effect) */}
                <CherenkovGlow />
            </Canvas>

            {/* Stability HUD Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-mono">
                <div className="space-y-1">
                    <div className="text-[10px] text-white/30 uppercase tracking-widest">Reactor Core Info</div>
                    <div className="text-xs text-neon-cyan">MODE: {quest?.stage || "STANDBY"}</div>
                    <div className="text-xs text-white/60">Z_INIT: {quest?.initialElement?.Z || 0}</div>
                </div>
                <div className="text-right space-y-1">
                    <div className="text-[10px] text-white/30 uppercase tracking-widest">Stability</div>
                    <div className={`text-xl font-black ${isCorrect ? "text-neon-green" : "text-white/20 animate-pulse"}`}>
                        {isCorrect ? "STABLE" : "UNSTABLE"}
                    </div>
                </div>
            </div>
        </div>
    );
}
