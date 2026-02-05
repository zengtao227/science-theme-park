"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text } from "@react-three/drei";
import * as THREE from "three";

type NuclearElement = { symbol?: string; A?: number; Z?: number };
type NuclearQuest = { stage?: string; initialElement?: NuclearElement; resultElement?: NuclearElement; particle?: NuclearElement };

interface NuclearCanvasProps {
    quest: NuclearQuest | null;
    lastCheck: { ok: boolean; correct: string } | null;
}

// Pseudo-random number generator for consistent positioning
const pseudo = (n: number) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
};

// Generate sphere packing positions using Fibonacci sphere distribution
function generateNucleonPositions(count: number, radius: number = 0.8) {
    const positions: THREE.Vector3[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        // Add some randomness for more natural clustering
        const jitter = 0.15;
        positions.push(new THREE.Vector3(
            x * radius + (pseudo(i + 1) - 0.5) * jitter,
            y * radius + (pseudo(i + 11) - 0.5) * jitter,
            z * radius + (pseudo(i + 21) - 0.5) * jitter
        ));
    }

    return positions;
}

function Nucleus({
    /* eslint-disable @typescript-eslint/no-unused-vars */
    protonCount,
    neutronCount,
    position,
    scale = 1,
    breathing = true,
    _decayMode,
    _isDecaying = false
}: {
    protonCount: number;
    neutronCount: number;
    position: [number, number, number];
    scale?: number;
    breathing?: boolean;
    _decayMode?: string;
    _isDecaying?: boolean;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const protonMeshRef = useRef<THREE.InstancedMesh>(null);
    const neutronMeshRef = useRef<THREE.InstancedMesh>(null);

    const { protonPositions, neutronPositions } = useMemo(() => {
        const totalNucleons = protonCount + neutronCount;
        const allPositions = generateNucleonPositions(totalNucleons);

        // Use deterministic randomness based on nucleon counts for shuffling
        const shuffled = [...allPositions].sort((a, b) => {
            const seed = a.x + a.y + a.z + b.x + b.y + b.z;
            return pseudo(seed * 1000) - 0.5;
        });

        return {
            protonPositions: shuffled.slice(0, protonCount),
            neutronPositions: shuffled.slice(protonCount, totalNucleons)
        };
    }, [protonCount, neutronCount]);

    const dummyRef = useRef(new THREE.Object3D());
    const dummy = dummyRef.current;

    useFrame(({ clock }) => {
        if (!groupRef.current) return;

        const time = clock.getElapsedTime();

        // Nuclear breathing/vibration (strong force simulation)
        if (breathing) {
            const breathScale = 1 + Math.sin(time * 4) * 0.05;
            groupRef.current.scale.setScalar(scale * breathScale);
        }

        // Slow rotation
        groupRef.current.rotation.y = time * 0.1;
        groupRef.current.rotation.x = time * 0.05;

        // Update proton instances
        if (protonMeshRef.current) {
            protonPositions.forEach((pos, i) => {
                const vibration = Math.sin(time * 6 + i) * 0.02;
                dummy.position.set(
                    pos.x + vibration,
                    pos.y + Math.cos(time * 5 + i) * 0.02,
                    pos.z + Math.sin(time * 7 + i) * 0.02
                );
                dummy.updateMatrix();
                protonMeshRef.current!.setMatrixAt(i, dummy.matrix);
            });
            protonMeshRef.current.instanceMatrix.needsUpdate = true;
        }

        // Update neutron instances
        if (neutronMeshRef.current) {
            neutronPositions.forEach((pos, i) => {
                const vibration = Math.sin(time * 6 + i + 100) * 0.02;
                dummy.position.set(
                    pos.x + vibration,
                    pos.y + Math.cos(time * 5 + i + 100) * 0.02,
                    pos.z + Math.sin(time * 7 + i + 100) * 0.02
                );
                dummy.updateMatrix();
                neutronMeshRef.current!.setMatrixAt(i, dummy.matrix);
            });
            neutronMeshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Protons - Red/Orange with glow */}
            <instancedMesh ref={protonMeshRef} args={[undefined, undefined, protonCount]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshPhysicalMaterial
                    color="#ff4444"
                    emissive="#ff6600"
                    emissiveIntensity={0.3}
                    metalness={0.1}
                    roughness={0.2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </instancedMesh>

            {/* Neutrons - Blue/Grey metallic */}
            <instancedMesh ref={neutronMeshRef} args={[undefined, undefined, neutronCount]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshPhysicalMaterial
                    color="#4488ff"
                    emissive="#2244aa"
                    emissiveIntensity={0.2}
                    metalness={0.7}
                    roughness={0.3}
                    clearcoat={0.8}
                    clearcoatRoughness={0.2}
                />
            </instancedMesh>

            {/* Nuclear glow effect */}
            <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial
                    color="#00ffff"
                    transparent
                    opacity={0.05}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

function AlphaDecayAnimation({ isActive, startPos }: { isActive: boolean; startPos: [number, number, number] }) {
    const alphaRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!isActive || !alphaRef.current) return;

        const time = clock.getElapsedTime();
        const progress = Math.min((time % 3) / 3, 1);

        // Alpha particle flies away
        alphaRef.current.position.set(
            startPos[0] + progress * 4,
            startPos[1] + Math.sin(progress * Math.PI) * 0.5,
            startPos[2]
        );

        alphaRef.current.rotation.z = progress * Math.PI * 4;

        // Fade out as it moves away
        const opacity = 1 - progress;
        alphaRef.current.children.forEach(child => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
                (child.material as THREE.MeshPhysicalMaterial).opacity = opacity;
            }
        });
    });

    if (!isActive) return null;

    return (
        <group ref={alphaRef}>
            {/* Alpha particle (2 protons + 2 neutrons) */}
            <mesh position={[0.05, 0.05, 0]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshPhysicalMaterial color="#ff4444" emissive="#ff6600" emissiveIntensity={0.5} transparent />
            </mesh>
            <mesh position={[-0.05, 0.05, 0]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshPhysicalMaterial color="#ff4444" emissive="#ff6600" emissiveIntensity={0.5} transparent />
            </mesh>
            <mesh position={[0.05, -0.05, 0]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshPhysicalMaterial color="#4488ff" emissive="#2244aa" emissiveIntensity={0.5} transparent />
            </mesh>
            <mesh position={[-0.05, -0.05, 0]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshPhysicalMaterial color="#4488ff" emissive="#2244aa" emissiveIntensity={0.5} transparent />
            </mesh>
        </group>
    );
}

function BetaDecayAnimation({ isActive, startPos }: { isActive: boolean; startPos: [number, number, number] }) {
    const betaRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!isActive || !betaRef.current) return;

        const time = clock.getElapsedTime();
        const progress = Math.min((time % 2) / 2, 1);

        // Beta particle (electron) moves in a curved path
        betaRef.current.position.set(
            startPos[0] + progress * 3,
            startPos[1] + Math.sin(progress * Math.PI * 3) * 0.8,
            startPos[2] + Math.cos(progress * Math.PI * 2) * 0.3
        );

        const opacity = 1 - progress;
        (betaRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    });

    if (!isActive) return null;

    return (
        <mesh ref={betaRef}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={1}
                transparent
            />
        </mesh>
    );
}

function GammaDecayAnimation({ isActive, startPos }: { isActive: boolean; startPos: [number, number, number] }) {
    const waveRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!isActive || !waveRef.current) return;

        const time = clock.getElapsedTime();
        const progress = (time % 1.5) / 1.5;

        // Expanding gamma wave
        const scale = progress * 3;
        waveRef.current.scale.setScalar(scale);

        const opacity = (1 - progress) * 0.8;
        (waveRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    });

    if (!isActive) return null;

    return (
        <mesh ref={waveRef} position={startPos}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial
                color="#ff00ff"
                emissive="#ff00ff"
                emissiveIntensity={0.8}
                transparent
                wireframe
            />
        </mesh>
    );
}

function FissionAnimation({ isActive, startPos, quest }: { isActive: boolean; startPos: [number, number, number]; quest: NuclearQuest | null }) {
    const fragment1Ref = useRef<THREE.Group>(null);
    const fragment2Ref = useRef<THREE.Group>(null);
    const neutronsRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!isActive) return;

        const time = clock.getElapsedTime();
        const progress = Math.min((time % 4) / 4, 1);

        // Two large fragments fly apart
        if (fragment1Ref.current) {
            fragment1Ref.current.position.set(
                startPos[0] - progress * 2,
                startPos[1] + progress * 0.5,
                startPos[2]
            );
        }

        if (fragment2Ref.current) {
            fragment2Ref.current.position.set(
                startPos[0] + progress * 2.5,
                startPos[1] - progress * 0.3,
                startPos[2]
            );
        }

        // Free neutrons scatter
        if (neutronsRef.current) {
            neutronsRef.current.children.forEach((neutron, i) => {
                const angle = (i / 3) * Math.PI * 2;
                neutron.position.set(
                    startPos[0] + Math.cos(angle) * progress * 1.5,
                    startPos[1] + Math.sin(angle) * progress * 1.5,
                    startPos[2] + (i - 1) * progress * 0.5
                );
            });
        }
    });

    if (!isActive) return null;

    return (
        <group>
            {/* Fragment 1 (Barium-141) */}
            <group ref={fragment1Ref}>
                <Nucleus protonCount={56} neutronCount={85} position={[0, 0, 0]} scale={0.7} breathing={false} />
            </group>

            {/* Fragment 2 (Krypton-92) */}
            <group ref={fragment2Ref}>
                <Nucleus protonCount={36} neutronCount={56} position={[0, 0, 0]} scale={0.6} breathing={false} />
            </group>

            {/* Free neutrons */}
            <group ref={neutronsRef}>
                {[0, 1, 2].map(i => (
                    <mesh key={i}>
                        <sphereGeometry args={[0.06, 12, 12]} />
                        <meshPhysicalMaterial
                            color="#4488ff"
                            emissive="#2244aa"
                            emissiveIntensity={0.4}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

function RadiationFog() {
    const fogRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const count = 500;
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (pseudo(i + 1) - 0.5) * 20;
            positions[i * 3 + 1] = (pseudo(i + 11) - 0.5) * 20;
            positions[i * 3 + 2] = (pseudo(i + 21) - 0.5) * 20;

            velocities[i * 3] = (pseudo(i + 31) - 0.5) * 0.02;
            velocities[i * 3 + 1] = (pseudo(i + 41) - 0.5) * 0.02;
            velocities[i * 3 + 2] = (pseudo(i + 51) - 0.5) * 0.02;
        }

        return { positions, velocities, count };
    }, []);

    useFrame(() => {
        if (!fogRef.current) return;

        const positions = fogRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particles.count; i++) {
            positions[i * 3] += particles.velocities[i * 3];
            positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
            positions[i * 3 + 2] += particles.velocities[i * 3 + 2];

            // Wrap around boundaries
            if (Math.abs(positions[i * 3]) > 10) positions[i * 3] *= -0.9;
            if (Math.abs(positions[i * 3 + 1]) > 10) positions[i * 3 + 1] *= -0.9;
            if (Math.abs(positions[i * 3 + 2]) > 10) positions[i * 3 + 2] *= -0.9;
        }

        fogRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={fogRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.count}
                    array={particles.positions}
                    itemSize={3}
                    args={[particles.positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#00ffaa"
                transparent
                opacity={0.2}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function P501NuclearCanvas({ quest, lastCheck }: NuclearCanvasProps) {
    const isCorrect = lastCheck?.ok;
    const stage = quest?.stage;

    // Calculate nucleon counts
    const initialA = quest?.initialElement?.A || 100;
    const initialZ = quest?.initialElement?.Z || 50;
    const initialN = initialA - initialZ;

    const resultA = quest?.resultElement?.A || initialA;
    const resultZ = quest?.resultElement?.Z || initialZ;
    const resultN = resultA - resultZ;

    return (
        <div className="w-full h-full bg-[#020208] rounded-lg overflow-hidden relative">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true }}>
                <color attach="background" args={["#000005"]} />

                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
                <pointLight position={[-5, -5, 5]} intensity={0.4} color="#00ffff" />

                {/* Controls */}
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={10}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />

                {/* Background */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

                {/* Main nucleus visualization */}
                <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
                    {/* Initial nucleus */}
                    <Nucleus
                        protonCount={initialZ}
                        neutronCount={initialN}
                        position={[-2, 0, 0]}
                        scale={Math.min(1.2, Math.max(0.6, initialA / 200))}
                        _decayMode={stage}
                        _isDecaying={isCorrect}
                    />

                    {/* Result nucleus (if different from initial) */}
                    {stage !== "GAMMA" && (
                        <Nucleus
                            protonCount={resultZ}
                            neutronCount={resultN}
                            position={[2, 0, 0]}
                            scale={Math.min(1.1, Math.max(0.5, resultA / 200))}
                            breathing={isCorrect}
                        />
                    )}

                    {/* Element labels */}
                    <Text
                        position={[-2, -1.5, 0]}
                        fontSize={0.25}
                        color="#00ffff"
                        anchorX="center"
                    >
                        {`${quest?.initialElement?.symbol || "X"}-${initialA}`}
                    </Text>

                    {stage !== "GAMMA" && (
                        <Text
                            position={[2, -1.5, 0]}
                            fontSize={0.25}
                            color="#00ff88"
                            anchorX="center"
                        >
                            {`${quest?.resultElement?.symbol || "Y"}-${resultA}`}
                        </Text>
                    )}
                    {/* Nuclear Core Light */}
                    <pointLight position={[-2, 0, 0]} intensity={2} color="#00ffff" />
                </Float>

                {/* Decay animations */}
                {isCorrect && stage === "ALPHA" && (
                    <AlphaDecayAnimation isActive={true} startPos={[-2, 0, 0]} />
                )}

                {isCorrect && stage === "BETA" && (
                    <BetaDecayAnimation isActive={true} startPos={[-2, 0, 0]} />
                )}

                {isCorrect && stage === "GAMMA" && (
                    <GammaDecayAnimation isActive={true} startPos={[-2, 0, 0]} />
                )}

                {isCorrect && stage === "FISSION" && (
                    <FissionAnimation isActive={true} startPos={[-2, 0, 0]} quest={quest} />
                )}

                {/* Radiation fog */}
                <RadiationFog />
            </Canvas>

            {/* Enhanced HUD */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-mono">
                <div className="space-y-1">
                    <div className="text-[10px] text-white/30 uppercase tracking-widest">Nuclear Data</div>
                    <div className="text-xs text-cyan-400">MODE: {stage || "STANDBY"}</div>
                    <div className="text-xs text-white/60">A: {initialA} | Z: {initialZ} | N: {initialN}</div>
                    {quest?.particle && (
                        <div className="text-xs text-yellow-400">
                            EMISSION: {quest.particle.symbol?.replace(/\\/g, '')}
                        </div>
                    )}
                </div>
                <div className="text-right space-y-1">
                    <div className="text-[10px] text-white/30 uppercase tracking-widest">Core Status</div>
                    <div className={`text-xl font-black ${isCorrect ? "text-green-400" :
                        lastCheck === null ? "text-white/40" : "text-red-400 animate-pulse"
                        }`}>
                        {isCorrect ? "STABLE" : lastCheck === null ? "ANALYZING" : "UNSTABLE"}
                    </div>
                </div>
            </div>

            {/* Quantum simulation label */}
            <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 uppercase tracking-wider">
                Quantum Nuclear Simulator v3.14
            </div>
        </div>
    );
}
