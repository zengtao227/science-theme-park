"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Box,
    Sphere,
    Environment,
    ContactShadows,
    OrbitControls,
    Html
} from "@react-three/drei";
import { Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { Zap, Move, Activity } from "lucide-react";
import { clsx } from "clsx";
import { Force } from "@/lib/sp1-01/domain/types";

interface PhysicsPlayground3DProps {
    forces: Force[];
    onImpact?: (velocity: number) => void;
}

function ForceArrow({ magnitude, angle, color = "#00f2ff", label }: { magnitude: number; angle: number; color?: string; label?: string }) {
    const angleRad = (angle * Math.PI) / 180;
    // Scale arrow length based on magnitude (e.g., 50N = 2 units)
    const length = Math.max(0.5, magnitude / 25);

    // Create a quaternion for rotation toward the force direction
    // In our 3D scene, x is right, z is deep, and y is up.
    // We'll map the 2D physics angle (CCW from positive X) to the 3D XZ plane.
    const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -angleRad, 0));

    return (
        <group position={[0, 1, 0]}>
            <group quaternion={quaternion}>
                {/* Base Cylinder */}
                <mesh rotation={[0, 0, Math.PI / 2]} position={[-length / 2, 0, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, length, 12]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.8} />
                </mesh>
                {/* Tip Cone */}
                <mesh rotation={[0, 0, -Math.PI / 2]} position={[-length, 0, 0]}>
                    <coneGeometry args={[0.12, 0.3, 12]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </mesh>

                {/* Label */}
                <Html position={[-length * 0.7, 0.3, 0]} center distanceFactor={8}>
                    <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/20 text-[9px] text-white font-mono whitespace-nowrap shadow-xl">
                        {label || `${magnitude}N`}
                    </div>
                </Html>
            </group>
        </group>
    );
}

function PhysicalCrate({ forces, isApplying }: { forces: Force[]; isApplying: boolean }) {
    const rigidBodyRef = useRef<RapierRigidBody>(null!);
    const [velocity, setVelocity] = useState(0);

    useFrame((state, delta) => {
        if (rigidBodyRef.current && isApplying) {
            forces.forEach(f => {
                const angleRad = (f.angle * Math.PI) / 180;
                // Map 2D angle to 3D impulse (X and Z components)
                // CCW from X: x = cos, z = -sin (since -Z is forward in Three.js)
                const impulseMultiplier = 8;
                const ix = Math.cos(angleRad) * f.magnitude * impulseMultiplier;
                const iz = -Math.sin(angleRad) * f.magnitude * impulseMultiplier;

                rigidBodyRef.current.applyImpulse({ x: ix * delta, y: 0, z: iz * delta }, true);
            });
        }

        if (rigidBodyRef.current) {
            const v = rigidBodyRef.current.linvel();
            const speed = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            setVelocity(speed);
        }
    });

    return (
        <group>
            <RigidBody
                ref={rigidBodyRef}
                colliders="cuboid"
                restitution={0.3}
                friction={0.7}
                position={[0, 1.5, 0]}
                angularDamping={0.5}
                linearDamping={0.2}
            >
                <Box args={[1, 1, 1]}>
                    <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
                    {/* Internal Glow for 'Tech' look */}
                    <Box args={[1.02, 1.02, 1.02]}>
                        <meshStandardMaterial color="#00f2ff" wireframe transparent opacity={0.15} />
                    </Box>
                </Box>

                <Html position={[0, 1.2, 0]} center distanceFactor={10}>
                    <div className="flex flex-col items-center gap-1">
                        <div className="bg-black/90 backdrop-blur-xl px-2 py-1 rounded-lg border border-cyan-500/40 text-[10px] text-cyan-400 font-mono shadow-2xl">
                            SPEED: {velocity.toFixed(2)} m/s
                        </div>
                        {isApplying && (
                            <div className="text-[8px] text-cyan-500/60 font-black animate-pulse uppercase tracking-widest">
                                Impact Processing...
                            </div>
                        )}
                    </div>
                </Html>
            </RigidBody>

            {/* Visualize Force Vectors */}
            {forces.map((f, i) => (
                <ForceArrow
                    key={i}
                    magnitude={f.magnitude}
                    angle={f.angle}
                    color={i === 0 ? "#00f2ff" : i === 1 ? "#ff0080" : "#a0ff00"}
                    label={f.label}
                />
            ))}
        </group>
    );
}

function Scene({ forces, isApplying }: { forces: Force[]; isApplying: boolean }) {
    return (
        <>
            <Physics gravity={[0, -9.81, 0]}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
                <spotLight position={[0, 10, 0]} intensity={2} angle={0.3} penumbra={1} castShadow />

                <PhysicalCrate forces={forces} isApplying={isApplying} />

                {/* Floor */}
                <RigidBody type="fixed">
                    <Box args={[30, 0.5, 30]} position={[0, -0.25, 0]}>
                        <meshStandardMaterial color="#050505" metalness={1} roughness={0} />
                    </Box>
                </RigidBody>

                {/* Grid and Decorations */}
                <gridHelper args={[30, 30, 0x00f2ff, 0x111111]} position={[0, 0.01, 0]}>
                    <meshBasicMaterial transparent opacity={0.2} />
                </gridHelper>
            </Physics>

            <OrbitControls
                makeDefault
                maxPolarAngle={Math.PI / 2.1}
                minDistance={3}
                maxDistance={15}
            />
            <Environment preset="night" />
            <ContactShadows position={[0, 0, 0]} opacity={0.8} scale={30} blur={2} far={5} />
        </>
    );
}

export default function PhysicsPlayground3D({
    forces = []
}: PhysicsPlayground3DProps) {
    const [isApplying, setIsApplying] = useState(false);

    // Derived stats
    const totalMagnitude = forces.reduce((sum, f) => sum + f.magnitude, 0);

    return (
        <div className="w-full h-full min-h-[500px] relative rounded-[2.5rem] overflow-hidden bg-[#050505] border border-white/5 shadow-2xl group transition-all duration-700">
            <Canvas shadows camera={{ position: [6, 4, 6], fov: 40 }}>
                <Scene forces={forces} isApplying={isApplying} />
            </Canvas>

            {/* Floating UI HUD */}
            <div className="absolute top-8 left-8 flex flex-col gap-4 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-2xl px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-4 shadow-2xl transition-all duration-500 hover:border-cyan-500/30">
                    <div className={clsx(
                        "p-2.5 rounded-xl transition-all duration-500",
                        isApplying ? "bg-cyan-500/20 animate-pulse" : "bg-white/5"
                    )}>
                        <Activity className={clsx("w-5 h-5", isApplying ? "text-cyan-400" : "text-white/20")} />
                    </div>
                    <div>
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-white/30 block mb-0.5">Vector Integration</span>
                        <span className="text-sm font-bold text-white font-mono uppercase tracking-tighter">
                            {isApplying ? "Real-time Processing" : "System Standby"}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    {forces.map((f, i) => (
                        <div key={i} className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i === 0 ? "#00f2ff" : i === 1 ? "#ff0080" : "#a0ff00" }} />
                            <span className="text-[10px] font-mono text-white/60 tracking-tight">{f.magnitude}N</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
                <div className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full backdrop-blur-md">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                        Module SP1.01_v3D
                    </span>
                </div>
                <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest text-right">
                    Bsl_Phys_Engine_Init<br />
                    Rpr_Solver_v22.0
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
                <button
                    onMouseDown={() => setIsApplying(true)}
                    onMouseUp={() => setIsApplying(false)}
                    onMouseLeave={() => setIsApplying(false)}
                    className={clsx(
                        "px-14 py-5 rounded-full text-[11px] font-black tracking-[0.5em] uppercase transition-all duration-300 transform shadow-2xl border",
                        isApplying
                            ? "bg-cyan-400 border-cyan-300 text-black shadow-[0_0_50px_rgba(34,211,238,0.4)] scale-95"
                            : "bg-white text-black hover:bg-cyan-400 hover:border-cyan-300 hover:scale-105 active:scale-95 cursor-pointer"
                    )}
                >
                    {isApplying ? "Simulating Impact" : "Initialize Force"}
                </button>

                <div className="flex items-center gap-12 text-white/20">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Physics Mode</span>
                        <span className="text-[10px] font-bold text-white/40">Continuous CCD</span>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Mass Model</span>
                        <span className="text-[10px] font-bold text-white/40">1.0 kg Uni-Crate</span>
                    </div>
                </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-[2.5rem] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-cyan-500/20 rounded-br-[2.5rem] pointer-events-none" />
        </div>
    );
}
