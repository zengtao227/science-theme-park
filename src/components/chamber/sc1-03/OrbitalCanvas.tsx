"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface OrbitalCanvasProps {
    element: string;
    atomicNumber: number;
    orbitalType: "s" | "p" | "d";
    showTransition: boolean;
}

// Electron configuration data
const electronConfigs: Record<number, string> = {
    1: "1s¹",
    2: "1s²",
    3: "[He] 2s¹",
    4: "[He] 2s²",
    5: "[He] 2s² 2p¹",
    6: "[He] 2s² 2p²",
    7: "[He] 2s² 2p³",
    8: "[He] 2s² 2p⁴",
    9: "[He] 2s² 2p⁵",
    10: "[He] 2s² 2p⁶",
    11: "[Ne] 3s¹",
    12: "[Ne] 3s²",
    13: "[Ne] 3s² 3p¹",
    14: "[Ne] 3s² 3p²",
    15: "[Ne] 3s² 3p³",
    16: "[Ne] 3s² 3p⁴",
    17: "[Ne] 3s² 3p⁵",
    18: "[Ne] 3s² 3p⁶",
    19: "[Ar] 4s¹",
    20: "[Ar] 4s²",
};

// S orbital - spherical probability cloud
function SOrbital({ scale = 1, color = "#00e5ff" }: { scale?: number; color?: string }) {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 5000;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            // Radial probability distribution for 1s orbital: P(r) = 4πr²|ψ|²
            // Using exponential decay: ψ(r) ∝ exp(-r/a₀)
            const r = -Math.log(Math.random()) * 0.5 * scale;
            const theta = Math.acos(2 * Math.random() - 1);
            const phi = Math.random() * Math.PI * 2;
            
            pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
            pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            pos[i * 3 + 2] = r * Math.cos(theta);
        }
        
        return pos;
    }, [scale]);
    
    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
    });
    
    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color={color}
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// P orbital - dumbbell shape
function POrbital({ axis = "z", scale = 1, color = "#a855f7" }: { axis?: "x" | "y" | "z"; scale?: number; color?: string }) {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 5000;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            // P orbital: ψ ∝ r·exp(-r/2a₀)·cos(θ) for pz
            const r = -Math.log(Math.random()) * 0.8 * scale;
            const theta = Math.acos(2 * Math.random() - 1);
            const phi = Math.random() * Math.PI * 2;
            
            // Angular part: cos²(θ) for pz
            const angularProb = Math.abs(Math.cos(theta));
            if (Math.random() > angularProb) continue;
            
            let x = r * Math.sin(theta) * Math.cos(phi);
            let y = r * Math.sin(theta) * Math.sin(phi);
            let z = r * Math.cos(theta);
            
            // Rotate based on axis
            if (axis === "x") {
                [x, y, z] = [z, x, y];
            } else if (axis === "y") {
                [x, y, z] = [y, z, x];
            }
            
            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
        }
        
        return pos;
    }, [axis, scale]);
    
    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
    });
    
    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color={color}
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// D orbital - cloverleaf shape
function DOrbital({ type = "dz2", scale = 1, color = "#ff2d7d" }: { type?: "dz2" | "dxy"; scale?: number; color?: string }) {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 8000;
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            const r = -Math.log(Math.random()) * 1.0 * scale;
            const theta = Math.acos(2 * Math.random() - 1);
            const phi = Math.random() * Math.PI * 2;
            
            let angularProb = 0;
            
            if (type === "dz2") {
                // dz²: (3cos²θ - 1)²
                angularProb = Math.pow(3 * Math.cos(theta) * Math.cos(theta) - 1, 2);
            } else {
                // dxy: sin²θ·sin²(2φ)
                angularProb = Math.pow(Math.sin(theta), 2) * Math.pow(Math.sin(2 * phi), 2);
            }
            
            if (Math.random() > angularProb) continue;
            
            pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
            pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            pos[i * 3 + 2] = r * Math.cos(theta);
        }
        
        return pos;
    }, [type, scale]);
    
    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
    });
    
    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color={color}
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Nucleus
function Nucleus({ atomicNumber }: { atomicNumber: number }) {
    return (
        <mesh>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshPhysicalMaterial
                color="#39ff14"
                emissive="#39ff14"
                emissiveIntensity={0.8}
                metalness={0.5}
                roughness={0.2}
            />
        </mesh>
    );
}

// Electron transition animation
function TransitionElectron({ fromLevel, toLevel }: { fromLevel: number; toLevel: number }) {
    const electronRef = useRef<THREE.Mesh>(null);
    
    useFrame(({ clock }) => {
        if (!electronRef.current) return;
        
        const t = (Math.sin(clock.getElapsedTime() * 2) + 1) / 2; // 0 to 1
        const radius = fromLevel + (toLevel - fromLevel) * t;
        
        electronRef.current.position.x = radius * Math.cos(clock.getElapsedTime() * 3);
        electronRef.current.position.y = radius * Math.sin(clock.getElapsedTime() * 3);
        electronRef.current.position.z = 0;
    });
    
    return (
        <mesh ref={electronRef}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={1} />
        </mesh>
    );
}

function AtomScene({ element, atomicNumber, orbitalType, showTransition }: OrbitalCanvasProps) {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            
            {/* Nucleus */}
            <Nucleus atomicNumber={atomicNumber} />
            
            {/* Orbitals based on type */}
            {orbitalType === "s" && (
                <>
                    <SOrbital scale={1.5} color="#00e5ff" />
                    {atomicNumber > 2 && <SOrbital scale={2.5} color="#00e5ff" />}
                </>
            )}
            
            {orbitalType === "p" && (
                <>
                    <SOrbital scale={1.5} color="#00e5ff" />
                    <POrbital axis="x" scale={2.0} color="#a855f7" />
                    <POrbital axis="y" scale={2.0} color="#ff2d7d" />
                    <POrbital axis="z" scale={2.0} color="#ffd166" />
                </>
            )}
            
            {orbitalType === "d" && (
                <>
                    <SOrbital scale={1.5} color="#00e5ff" />
                    <POrbital axis="x" scale={2.0} color="#a855f7" />
                    <POrbital axis="y" scale={2.0} color="#ff2d7d" />
                    <POrbital axis="z" scale={2.0} color="#ffd166" />
                    <DOrbital type="dz2" scale={2.5} color="#39ff14" />
                    <DOrbital type="dxy" scale={2.5} color="#ff6b35" />
                </>
            )}
            
            {/* Electron transition animation */}
            {showTransition && <TransitionElectron fromLevel={1.5} toLevel={2.5} />}
            
            {/* Element label */}
            <Text
                position={[0, 4, 0]}
                fontSize={0.5}
                color="#00e5ff"
                anchorX="center"
                anchorY="middle"
            >
                {element} (Z={atomicNumber})
            </Text>
            
            {/* Electron configuration */}
            <Text
                position={[0, 3.3, 0]}
                fontSize={0.3}
                color="#a855f7"
                anchorX="center"
                anchorY="middle"
            >
                {electronConfigs[atomicNumber] || ""}
            </Text>
            
            {/* Coordinate axes */}
            <axesHelper args={[5]} />
        </>
    );
}

export default function OrbitalCanvas(props: OrbitalCanvasProps) {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <color attach="background" args={["#000000"]} />
            <AtomScene {...props} />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />
        </Canvas>
    );
}
