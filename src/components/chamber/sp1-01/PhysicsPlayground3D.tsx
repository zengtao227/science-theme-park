"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Box,
    Environment,
    ContactShadows,
    OrbitControls,
    Html,
    Grid
} from "@react-three/drei";
import { Physics, RigidBody, RapierRigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";
import { Play, RotateCcw, Box as BoxIcon, Info } from "lucide-react";
import { Force } from "@/lib/sp1-01/domain/types";

interface PhysicsPlayground3DProps {
    forces: Force[];
    onImpact?: (velocity: number) => void;
}

function ForceArrow({ magnitude, angle, color = "#00f2ff", label }: { magnitude: number; angle: number; color?: string; label?: string }) {
    const angleRad = (angle * Math.PI) / 180;
    const length = Math.max(0.5, magnitude / 25);
    const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -angleRad, 0));

    return (
        <group position={[0, 1, 0]}>
            <group quaternion={quaternion}>
                <mesh rotation={[0, 0, Math.PI / 2]} position={[-length / 2, 0, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, length, 12]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.8} />
                </mesh>
                <mesh rotation={[0, 0, -Math.PI / 2]} position={[-length, 0, 0]}>
                    <coneGeometry args={[0.12, 0.3, 12]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </mesh>
                <Html position={[-length * 0.7, 0.3, 0]} center distanceFactor={8}>
                    <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/20 text-[9px] text-white font-mono whitespace-nowrap shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                        {label || `${magnitude}N`}
                    </div>
                </Html>
            </group>
        </group>
    );
}

function PhysicalCrate({ forces, isApplying, position, onWake }: { forces: Force[]; isApplying: boolean; position: [number, number, number]; onWake: () => void }) {
    const rigidBodyRef = useRef<RapierRigidBody>(null!);
    const [speed, setSpeed] = useState(0);

    // Reset physics state when position changes (reset requested)
    useEffect(() => {
        if (rigidBodyRef.current) {
            rigidBodyRef.current.setTranslation({ x: position[0], y: position[1], z: position[2] }, true);
            rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
            rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
            rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
            onWake();
        }
    }, [position, onWake]);

    useFrame((state, delta) => {
        if (rigidBodyRef.current && isApplying) {
            forces.forEach(f => {
                const angleRad = (f.angle * Math.PI) / 180;
                const impulseMultiplier = 8;
                const ix = Math.cos(angleRad) * f.magnitude * impulseMultiplier;
                const iz = -Math.sin(angleRad) * f.magnitude * impulseMultiplier;
                rigidBodyRef.current.applyImpulse({ x: ix * delta, y: 0, z: iz * delta }, true);
            });
        }
        if (rigidBodyRef.current) {
            const v = rigidBodyRef.current.linvel();
            const s = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            setSpeed(s);
        }
    });

    return (
        <RigidBody
            ref={rigidBodyRef}
            colliders="cuboid"
            restitution={0.2}
            friction={0.8}
            mass={1}
            position={position}
            linearDamping={0.5}
            angularDamping={0.5}
        >
            <Box args={[1, 1, 1]} castShadow receiveShadow>
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
                <Box args={[1.02, 1.02, 1.02]}>
                    <meshStandardMaterial color={isApplying ? "#00f2ff" : "#444"} wireframe transparent opacity={0.3} />
                </Box>
            </Box>
            {isApplying && (
                <Html position={[0, 1.5, 0]} center distanceFactor={10}>
                    <div className="bg-black/60 backdrop-blur text-neon-green text-[10px] font-mono px-2 py-1 rounded border border-neon-green/30">
                        v: {speed.toFixed(1)} m/s
                    </div>
                </Html>
            )}
        </RigidBody>
    );
}

export default function PhysicsPlayground3D({ forces }: PhysicsPlayground3DProps) {
    const [isApplying, setIsApplying] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    const handleReset = () => {
        setIsApplying(false);
        setResetKey(prev => prev + 1);
    };

    return (
        <div className="w-full h-[400px] sm:h-[500px] relative rounded-2xl overflow-hidden bg-gradient-to-b from-black to-slate-900 border border-white/10 shadow-[0_0_50px_rgba(0,242,255,0.05)]">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-xl p-3 flex flex-col gap-2 shadow-2xl">
                    <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                        <BoxIcon className="w-3 h-3" /> Physics Engine
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <button
                            onClick={() => setIsApplying(!isApplying)}
                            className={`flex items-center gap-2 px-4 py-2 rounded shadow-lg transition-all text-[10px] font-black uppercase tracking-widest ${isApplying ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30'}`}
                        >
                            <Play className={`w-3 h-3 ${isApplying ? 'animate-pulse' : ''}`} />
                            {isApplying ? "Pause Forces" : "Apply Forces"}
                        </button>
                        <button
                            onClick={handleReset}
                            className="p-2 bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors"
                            title="Reset Position"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex items-center gap-2">
                    <Info className="w-3 h-3 text-white/40" />
                    <span className="text-[9px] text-white/50 uppercase tracking-widest font-mono">Drag to rotate • Scroll to zoom</span>
                </div>
            </div>

            <Canvas camera={{ position: [5, 4, 5], fov: 45 }} shadows>
                <Suspense fallback={null}>
                    <color attach="background" args={['#050505']} />
                    <fog attach="fog" args={['#050505', 10, 30]} />

                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
                    <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00f2ff" />

                    <Environment preset="city" background blur={0.8} />

                    <Physics gravity={[0, -9.81, 0]}>
                        <PhysicalCrate
                            key={`crate-${resetKey}`}
                            forces={forces}
                            isApplying={isApplying}
                            position={[0, 0.5, 0]}
                            onWake={() => { }}
                        />

                        {/* Interactive Floor */}
                        <RigidBody type="fixed" friction={1} restitution={0.1}>
                            <mesh position={[0, -0.1, 0]} receiveShadow>
                                <boxGeometry args={[20, 0.2, 20]} />
                                <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
                            </mesh>
                        </RigidBody>
                    </Physics>

                    {/* Reference Grid */}
                    <Grid infiniteGrid fadeDistance={20} sectionColor="#00f2ff" cellColor="#ffffff" cellThickness={0.5} />

                    {/* Vector Overlays */}
                    {!isApplying && forces.map((f, i) => (
                        <ForceArrow key={`force-${i}`} magnitude={f.magnitude} angle={f.angle} label={f.label} />
                    ))}

                    <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                    <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.05} minDistance={3} maxDistance={15} enableDamping dampingFactor={0.05} />
                </Suspense>
            </Canvas>
        </div>
    );
}
