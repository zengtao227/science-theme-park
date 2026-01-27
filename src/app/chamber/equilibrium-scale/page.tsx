"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { OrbitControls, Environment, Text } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';

// --- COMPONENTS ---

function Floor() {
    return (
        <RigidBody type="fixed" friction={2}>
            <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#202020" roughness={0.8} metalness={0.2} />
            </mesh>
        </RigidBody>
    );
}

function Weight({ position, mass, color = "orange", label }: { position: [number, number, number], mass: number, color?: string, label?: string }) {
    // We use a cylinder for weights
    return (
        <RigidBody colliders="hull" restitution={0.2} friction={1} position={position}>
            <mesh castShadow>
                <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
            </mesh>
            {label && (
                <Text position={[0, 0.5, 0]} fontSize={0.3} color="white">
                    {label}
                </Text>
            )}
        </RigidBody>
    );
}

function Scale({ leftCount, rightCount, setTilt }: { leftCount: number, rightCount: number, setTilt: (val: number) => void }) {
    // A simple visual representation of the scale beam
    // In a real physics sim, we would use joints. For this MVP, we animate based on state to ensure stability for teaching.

    const beamRef = useRef<THREE.Group>(null);

    const targetRotation = (rightCount - (leftCount + 5)) * 0.1; // 5 is the hidden X weight
    // Clamp rotation
    const clampedRotation = Math.max(-0.5, Math.min(0.5, targetRotation));

    useEffect(() => {
        setTilt(clampedRotation);
    }, [clampedRotation, setTilt]);

    return (
        <group>
            {/* Base */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.5, 2, 32]} />
                <meshStandardMaterial color="#444" />
            </mesh>

            {/* Fulcrum */}
            <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
                <meshStandardMaterial color="#888" />
            </mesh>

            {/* Beam (Animated Kinematic) */}
            <group position={[0, 1, 0]} rotation={[0, 0, clampedRotation]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[0.2, 8, 0.5]} /> {/* Length 8 */}
                    <meshStandardMaterial color="#666" />
                </mesh>

                {/* Plates */}
                <mesh position={[-3.5, 1, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
                    <meshStandardMaterial color="#333" transparent opacity={0.8} />
                </mesh>
                <mesh position={[3.5, 1, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
                    <meshStandardMaterial color="#333" transparent opacity={0.8} />
                </mesh>

                {/* Let's visualize the "X" Box on the left */}
                <mesh position={[-3.5, 1.5, 0]}>
                    <boxGeometry args={[0.8, 0.8, 0.8]} />
                    <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.5} />
                </mesh>
                <Text position={[-3.5, 2.2, 0]} fontSize={0.5} color="cyan">X</Text>
            </group>
        </group>
    );
}


export default function EquilibriumScalePage() {
    const { currentLanguage } = useAppStore();
    const t = translations[currentLanguage].scale;

    const [leftWeights, setLeftWeights] = useState(3);
    const [rightWeights, setRightWeights] = useState(8);
    const [tilt, setTilt] = useState(0);
    const [status, setStatus] = useState<'BALANCED' | 'UNBALANCED' | 'SUCCESS'>('BALANCED');

    // Logic Check
    const xValue = 5; // The hidden value
    const totalLeft = xValue + leftWeights;
    const totalRight = rightWeights;

    useEffect(() => {
        if (totalLeft === totalRight) {
            if (leftWeights === 0 && rightWeights === 5) {
                setStatus('SUCCESS');
            } else {
                setStatus('BALANCED');
            }
        } else {
            setStatus('UNBALANCED');
        }
    }, [totalLeft, totalRight, leftWeights, rightWeights]);

    const removeWeight = (side: 'left' | 'right') => {
        if (side === 'left' && leftWeights > 0) setLeftWeights(p => p - 1);
        if (side === 'right' && rightWeights > 0) setRightWeights(p => p - 1);
    };

    const removeBoth = () => {
        if (leftWeights > 0 && rightWeights > 0) {
            setLeftWeights(p => p - 1);
            setRightWeights(p => p - 1);
        }
    };

    return (
        <div className="w-full h-screen bg-black text-white overflow-hidden relative">
            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

                    <Physics gravity={[0, -9.81, 0]}>
                        <Floor />
                        <Scale leftCount={leftWeights} rightCount={rightWeights} setTilt={setTilt} />

                        {/* Dynamic Weights Visualization */}
                        {/* Left Weights */}
                        {Array.from({ length: leftWeights }).map((_, i) => (
                            <Weight key={`l-${i}`} position={[-3.5 + (i * 0.1), 3 + (i * 0.5), 0]} mass={1} />
                        ))}
                        {/* Right Weights */}
                        {Array.from({ length: rightWeights }).map((_, i) => (
                            <Weight key={`r-${i}`} position={[3.5 - (i * 0.1), 3 + (i * 0.5), 0]} mass={1} color="#aaa" />
                        ))}

                    </Physics>
                    <OrbitControls makeDefault />
                </Canvas>
            </div>

            {/* HUD Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none p-8 flex flex-col justify-between">
                {/* Top Header */}
                <div className="flex justify-between items-start">
                    <Link href="/" className="pointer-events-auto text-xs uppercase tracking-widest hover:text-green-500 transition-colors">{t.back}</Link>
                    <div className="text-right">
                        <h1 className="text-2xl font-bold font-mono">{t.title}</h1>
                        <p className="text-xs text-gray-400">
                            {status === 'BALANCED' && t.status_balanced}
                            {status === 'UNBALANCED' && t.status_unbalanced}
                            {status === 'SUCCESS' && t.status_success}
                        </p>
                    </div>
                </div>

                {/* Central Warning if Unbalanced */}
                {status === 'UNBALANCED' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <h2 className="text-4xl font-black text-red-500 tracking-tighter animate-pulse">{t.critical_failure}</h2>
                        <p className="text-sm bg-red-900/50 p-2 mt-2">{t.failure_desc}</p>
                    </div>
                )}

                {status === 'SUCCESS' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
                        <h2 className="text-5xl font-black text-green-500 tracking-tighter mb-4">{t.solved}</h2>
                        <div className="bg-green-900/20 border border-green-500 p-6 backdrop-blur-md">
                            <p className="text-xl font-mono mb-2">X = 5</p>
                            <p className="text-sm text-gray-300">{t.solved_desc}</p>
                        </div>
                    </div>
                )}

                {/* Bottom Controls */}
                <div className="pointer-events-auto flex justify-center gap-8 items-end">
                    <div className="bg-black/50 backdrop-blur-md border border-gray-700 p-4 rounded-lg">
                        <div className="text-xs text-gray-500 mb-2 uppercase text-center">{t.left_pan}</div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-mono mb-2">x + {leftWeights}</span>
                            <button
                                onClick={() => removeWeight('left')}
                                className="bg-red-900/50 hover:bg-red-800 text-red-200 px-4 py-2 text-sm border border-red-700 rounded transition-colors"
                            >
                                {t.remove_one}
                            </button>
                            {/* HINT: This is the trap button! */}
                        </div>
                    </div>

                    <div className="bg-black/80 backdrop-blur-md border border-green-700 p-6 rounded-xl scale-110 shadow-[0_0_30px_rgba(0,255,0,0.2)]">
                        <div className="text-xs text-green-500 mb-2 uppercase text-center tracking-widest">Master Operation</div>
                        <button
                            onClick={removeBoth}
                            className="w-full bg-green-600 hover:bg-green-500 text-black font-bold px-6 py-3 text-lg rounded shadow-lg transition-transform hover:scale-105 active:scale-95"
                        >
                            {t.master_op}
                        </button>
                        <p className="text-[10px] text-gray-400 text-center mt-2">{t.master_desc}</p>
                    </div>

                    <div className="bg-black/50 backdrop-blur-md border border-gray-700 p-4 rounded-lg">
                        <div className="text-xs text-gray-500 mb-2 uppercase text-center">{t.right_pan}</div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-mono mb-2">{rightWeights}</span>
                            <button
                                onClick={() => removeWeight('right')}
                                className="bg-red-900/50 hover:bg-red-800 text-red-200 px-4 py-2 text-sm border border-red-700 rounded transition-colors"
                            >
                                {t.remove_one}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
