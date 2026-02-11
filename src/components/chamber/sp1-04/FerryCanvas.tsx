"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Text, Stars } from "@react-three/drei";
import * as THREE from "three";

interface FerryCanvasProps {
    angle: number; // in degrees
    velocity: number;
    positionX: number; // 0 to 1 (progress across river)
}

function Water() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.MeshStandardMaterial).normalMap?.offset.set(0, clock.getElapsedTime() * 0.05);
        }
    });

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#001a33" roughness={0.1} metalness={0.5} />
        </mesh>
    );
}

function Ferry({ angle, positionX }: { angle: number; positionX: number }) {
    const ferryRef = useRef<THREE.Group>(null);

    // Scale positionX to world coordinates
    const worldX = (positionX - 0.5) * 8;

    return (
        <group ref={ferryRef} position={[worldX, 0, 0]} rotation={[0, -THREE.MathUtils.degToRad(angle), 0]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Boat Hull */}
                <mesh>
                    <boxGeometry args={[1.5, 0.4, 0.6]} />
                    <meshStandardMaterial color="#5d4037" />
                </mesh>
                {/* Rudder/Direction Indicator */}
                <mesh position={[-0.7, -0.1, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.3, 0.2, 0.05]} />
                    <meshStandardMaterial color="#ff5722" />
                </mesh>
            </Float>
        </group>
    );
}

function Cable({ positionX }: { positionX: number }) {
    const worldX = (positionX - 0.5) * 8;
    const points = useMemo(() => [
        new THREE.Vector3(0, 5, 0), // Top anchor (simplification)
        new THREE.Vector3(worldX, 0.3, 0), // Connection to ferry
    ], [worldX]);

    return <Line points={points} color="#888" lineWidth={1} />;
}

export default function P104_FerryCanvas({ angle, positionX }: FerryCanvasProps) {
    return (
        <div className="w-full h-full bg-[#050505] rounded-lg overflow-hidden relative">
            <Canvas camera={{ position: [0, 8, 8], fov: 45 }}>
                <color attach="background" args={["#000"]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={null}>
                    <Water />
                    <Cable positionX={positionX} />
                    <Ferry angle={angle} positionX={positionX} />

                    {/* River Banks */}
                    <mesh position={[-5, -0.4, 0]}>
                        <boxGeometry args={[2, 0.3, 20]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    <mesh position={[5, -0.4, 0]}>
                        <boxGeometry args={[2, 0.3, 20]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>

                    {/* Labels */}
                    <Text position={[-5.5, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.3} color="white">
                        GROSSBASEL
                    </Text>
                    <Text position={[5.5, 0, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.3} color="white">
                        KLEINBASEL
                    </Text>
                </Suspense>
            </Canvas>

            {/* HUD Overlay */}
            <div className="absolute top-4 right-4 text-right font-mono space-y-1">
                <div className="text-[10px] text-white/70 uppercase tracking-widest">Hydraulic Monitor</div>
                <div className="text-xs text-neon-cyan">CURRENT: 2.4 m/s</div>
                <div className="text-xs text-neon-green">LIFT: {(Math.sin(THREE.MathUtils.degToRad(angle)) * 1.5).toFixed(2)} kN</div>
            </div>

            <div className="absolute bottom-4 left-4 font-mono">
                <div className="text-xs text-white/60 uppercase">Progress</div>
                <div className="w-48 h-1 bg-white/10 mt-1 relative">
                    <div
                        className="h-full bg-neon-green transition-all duration-300"
                        style={{ width: `${positionX * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
