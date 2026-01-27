"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, RigidBodyProps } from "@react-three/rapier";
import { OrbitControls, Environment, Text, useTexture, Box } from "@react-three/drei";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { useGesture } from '@use-gesture/react';
import { RefreshCcw, ArrowLeft, Check, AlertTriangle } from 'lucide-react';

// --- PHYSICS COMPONENTS ---

// Draggable Weight Component
// Uses useGesture instead of pure onClick to allow "picking up" logic
// For this MVP, we simplify: Click to Pick Up (Float), Click again to Drop (Fall)
function DraggableWeight({ position, mass, color = "#ffa500", label, onPickup, onDrop }: { position: [number, number, number], mass: number, color?: string, label?: string, onPickup?: () => void, onDrop?: () => void }) {
    const api = useRef<any>(null); // Rapier API
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // When active (picked up), we disable gravity and follow mouse? 
    // For this v1 step, let's keep it simple: Clicking toggles a "levitation" state 
    // or simply informs the parent to remove it from the scale logic simulation.

    // Actually, let's stick to the "Click to Remove" mechanic for now but visualy upgrade it
    // Implementing true 3D drag-and-drop in Rapier+React in one shot is complex.
    // We will improve visuals first.

    return (
        <RigidBody
            ref={api}
            position={position}
            colliders="hull"
            restitution={0.2}
            friction={1}
            canSleep={false}
        >
            <mesh
                castShadow
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            // onClick logic is handled by parent for now to ensure state sync, 
            // but we add visual feedback here
            >
                <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                <meshStandardMaterial
                    color={hovered ? "#ffecb3" : color}
                    emissive={hovered ? color : "#000"}
                    emissiveIntensity={hovered ? 0.5 : 0}
                    roughness={0.2}
                    metalness={0.9}
                />
            </mesh>
            {label && (
                <Text position={[0, 0.6, 0]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
                    {label}
                </Text>
            )}
        </RigidBody>
    );
}

// The Scale Beam Component
function ScaleBeam({ leftCount, rightCount, tilt }: { leftCount: number, rightCount: number, tilt: number }) {
    // Visual only - responding to the React State
    // We use springs for smooth animation

    return (
        <group position={[0, 1, 0]} rotation={[0, 0, tilt]}>
            {/* Main Beam */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 8, 0.4]} />
                <meshStandardMaterial color="#333" roughness={0.5} metalness={0.8} />
            </mesh>

            {/* Cross bar details */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.3]} />
                <meshStandardMaterial color="#555" metalness={1} roughness={0.2} />
            </mesh>

            {/* Left Pan Assembly */}
            <group position={[-3.5, 0, 0]}>
                <mesh position={[0, -1.5, 0]}> {/* The String */}
                    <cylinderGeometry args={[0.02, 0.02, 3]} />
                    <meshStandardMaterial color="#888" />
                </mesh>
                <mesh position={[0, -3, 0]}> {/* The Pan */}
                    <cylinderGeometry args={[1.5, 1.2, 0.2, 32]} />
                    <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} transparent opacity={0.9} />
                </mesh>
                <mesh position={[0, -3.1, 0]}> {/* Glow Ring */}
                    <torusGeometry args={[1.2, 0.02, 16, 32]} />
                    <meshBasicMaterial color="cyan" toneMapped={false} />
                </mesh>
            </group>

            {/* Right Pan Assembly */}
            <group position={[3.5, 0, 0]}>
                <mesh position={[0, -1.5, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 3]} />
                    <meshStandardMaterial color="#888" />
                </mesh>
                <mesh position={[0, -3, 0]}>
                    <cylinderGeometry args={[1.5, 1.2, 0.2, 32]} />
                    <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} transparent opacity={0.9} />
                </mesh>
                <mesh position={[0, -3.1, 0]}>
                    <torusGeometry args={[1.2, 0.02, 16, 32]} />
                    <meshBasicMaterial color="orange" toneMapped={false} />
                </mesh>
            </group>
        </group>
    );
}

// Scene Environment
function LabEnvironment() {
    return (
        <>
            <Environment preset="city" />
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff9d" distance={50} />
            <pointLight position={[-10, 5, -10]} intensity={1} color="#00d2ff" distance={50} />
            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-bias={-0.0001} />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
            </mesh>

            {/* Grid Helper */}
            <gridHelper args={[100, 50, 0x333333, 0x111111]} position={[0, -4.99, 0]} />
        </>
    );
}

// --- MAIN PAGE ---

export default function EquilibriumScalePage() {
    const { currentLanguage } = useAppStore();
    const t = translations[currentLanguage].scale;

    const [leftWeights, setLeftWeights] = useState(3);
    const [rightWeights, setRightWeights] = useState(8);
    const [status, setStatus] = useState<'BALANCED' | 'UNBALANCED' | 'SUCCESS'>('BALANCED');

    // Animation Refs
    const currentTilt = useRef(0);

    // Simulation Logic
    // X = 5.
    // Left Mass = 5 + leftWeights
    // Right Mass = rightWeights
    // Balanced if (5 + leftWeights) === rightWeights

    const targetTilt = useMemo(() => {
        const leftTotal = 5 + leftWeights;
        const rightTotal = rightWeights;
        const diff = rightTotal - leftTotal;
        // specific visual clamping
        return Math.max(-0.4, Math.min(0.4, diff * 0.05));
    }, [leftWeights, rightWeights]);

    // Game Loop updates tilt smoothly
    useEffect(() => {
        let animId: number;
        const animate = () => {
            // Simple lerp
            currentTilt.current += (targetTilt - currentTilt.current) * 0.1;
            animId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animId);
    }, [targetTilt]);

    // Status check
    useEffect(() => {
        const leftTotal = 5 + leftWeights;
        const rightTotal = rightWeights;
        if (leftTotal === rightTotal) {
            if (leftWeights === 0 && rightWeights === 5) {
                setStatus('SUCCESS');
            } else {
                setStatus('BALANCED');
            }
        } else {
            setStatus('UNBALANCED');
        }
    }, [leftWeights, rightWeights]);

    // Handlers
    const handleRemoveLeft = () => { if (leftWeights > 0) setLeftWeights(p => p - 1); };
    const handleRemoveRight = () => { if (rightWeights > 0) setRightWeights(p => p - 1); };
    const handleMasterOp = () => {
        if (leftWeights > 0 && rightWeights > 0) {
            setLeftWeights(p => p - 1);
            setRightWeights(p => p - 1);
        }
    };

    return (
        <div className="w-full h-screen bg-black text-white overflow-hidden relative font-sans">

            {/* 3D Viewport */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 to-black">
                <Canvas shadows camera={{ position: [0, 2, 12], fov: 45 }}>
                    <LabEnvironment />
                    <Physics gravity={[0, -9.81, 0]}>
                        {/* Pass animated tilt down to the component via a standard prop for now (forcing re-render is okay for this prototype FPS) */}
                        <ScaleBeam leftCount={leftWeights} rightCount={rightWeights} tilt={targetTilt} />

                        {/* "X" Box */}
                        <RigidBody position={[-3.5, (targetTilt * -3.5) - 2, 0]} type="kinematicPosition">
                            <mesh>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.8} />
                            </mesh>
                            <Text position={[0, 1.2, 0]} fontSize={0.5} color="cyan">X</Text>
                        </RigidBody>

                        {/* Render weights relative to pans - simplified for prototype visual */}
                        {/* Left Side */}
                        {Array.from({ length: leftWeights }).map((_, i) => (
                            <group key={`l-${i}`} position={[-3.5 + (i * 0.2), (targetTilt * -3.5) - 1.5 + (i * 0.4), 0]}>
                                <mesh castShadow>
                                    <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
                                    <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
                                </mesh>
                            </group>
                        ))}

                        {/* Right Side */}
                        {Array.from({ length: rightWeights }).map((_, i) => (
                            <group key={`r-${i}`} position={[3.5 - (i * 0.2), (targetTilt * 3.5) - 1.5 + (i * 0.4), 0]}>
                                <mesh castShadow>
                                    <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
                                    <meshStandardMaterial color="#ffa500" metalness={0.8} roughness={0.2} />
                                </mesh>
                            </group>
                        ))}
                    </Physics>
                    <OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} maxDistance={20} minDistance={5} />
                </Canvas>
            </div>

            {/* --- HUD OVERLAY --- */}
            <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">

                {/* Top Bar */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <Link href="/" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-green-500 transition-colors uppercase tracking-widest group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        {t.back}
                    </Link>
                    <div className="flex flex-col items-end">
                        <h1 className="text-3xl font-bold tracking-tighter text-white neon-text-green">{t.title}</h1>
                        <div className={translateStatusColor(status)}>
                            {status === 'UNBALANCED' && <AlertTriangle className="w-3 h-3" />}
                            {status === 'SUCCESS' && <Check className="w-3 h-3" />}
                            <span className="text-[10px] uppercase tracking-widest font-mono">
                                {status === 'BALANCED' && t.status_balanced}
                                {status === 'UNBALANCED' && t.status_unbalanced}
                                {status === 'SUCCESS' && t.status_success}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status Messages */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg text-center pointer-events-none">
                    {status === 'UNBALANCED' && (
                        <div className="backdrop-blur-md bg-red-900/20 border border-red-500/50 p-8 rounded-lg animate-pulse">
                            <h2 className="text-4xl font-black text-red-500 tracking-tighter mb-2">{t.critical_failure}</h2>
                            <p className="font-mono text-sm text-red-300">{t.failure_desc}</p>
                        </div>
                    )}
                    {status === 'SUCCESS' && (
                        <div className="backdrop-blur-xl bg-green-900/20 border border-green-500 p-8 rounded-lg shadow-[0_0_50px_rgba(0,255,157,0.2)]">
                            <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">X = 5</h2>
                            <p className="font-mono text-sm text-green-400">{t.solved_desc}</p>
                            <button className="pointer-events-auto mt-6 px-6 py-2 bg-green-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Proceed to Next Chamber
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Control Deck */}
                <div className="pointer-events-auto flex items-end justify-center gap-4 md:gap-12 pb-8">

                    {/* Left Controls */}
                    <div className="hud-panel p-4 flex flex-col items-center gap-4 w-48 transition-opacity duration-300 hover:border-green-500/30">
                        <div className="hud-text text-center border-b border-white/10 w-full pb-2">{t.left_pan}</div>
                        <div className="text-4xl font-bold text-white font-mono">x + {leftWeights}</div>
                        <button onClick={handleRemoveLeft} className="w-full py-2 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all uppercase">
                            {t.remove_one}
                        </button>
                    </div>

                    {/* Master Control */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
                        <button
                            onClick={handleMasterOp}
                            className="relative w-64 h-24 bg-black border border-green-500/50 flex flex-col items-center justify-center gap-1 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
                            <span className="text-lg font-bold text-white tracking-[0.2em] group-hover:text-green-400 transition-colors z-10">{t.master_op}</span>
                            <span className="text-[9px] text-gray-500 font-mono uppercase z-10">{t.master_desc}</span>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-green-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        </button>
                    </div>

                    {/* Right Controls */}
                    <div className="hud-panel p-4 flex flex-col items-center gap-4 w-48 transition-opacity duration-300 hover:border-orange-500/30">
                        <div className="hud-text text-center border-b border-white/10 w-full pb-2">{t.right_pan}</div>
                        <div className="text-4xl font-bold text-white font-mono">{rightWeights}</div>
                        <button onClick={handleRemoveRight} className="w-full py-2 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all uppercase">
                            {t.remove_one}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

function translateStatusColor(status: string) {
    if (status === 'BALANCED') return 'flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full';
    if (status === 'UNBALANCED') return 'flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full animate-pulse';
    if (status === 'SUCCESS') return 'flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full';
    return '';
}
