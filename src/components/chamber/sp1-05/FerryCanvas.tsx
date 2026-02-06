"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

interface FerryCanvasProps {
    riverSpeed: number; // m/s
    cableAngle: number; // degrees
    ferrySpeed: number; // m/s
}

// Ferry boat component
function Ferry({ position, rotation }: { position: [number, number, number]; rotation: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {/* Ferry hull */}
            <mesh>
                <boxGeometry args={[1.5, 0.4, 0.8]} />
                <meshPhysicalMaterial color="#ff6b35" metalness={0.3} roughness={0.4} />
            </mesh>
            {/* Ferry cabin */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[0.8, 0.3, 0.6]} />
                <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.6} />
            </mesh>
            {/* Emissive glow */}
            <pointLight position={[0, 0.5, 0]} intensity={0.5} color="#ff6b35" distance={3} />
        </group>
    );
}

// River with flow visualization
function River({ speed }: { speed: number }) {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 200;

    const particles = useRef(
        Array.from({ length: particleCount }, () => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 20,
                0.1,
                Math.random() * 30 - 15
            ),
            velocity: speed,
        }))
    );

    useFrame((_, delta) => {
        if (!particlesRef.current) return;

        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

        particles.current.forEach((particle, i) => {
            // Move particle with river flow
            particle.position.z += particle.velocity * delta;

            // Reset particle if it goes too far
            if (particle.position.z > 15) {
                particle.position.z = -15;
                particle.position.x = (Math.random() - 0.5) * 20;
            }

            positions[i * 3] = particle.position.x;
            positions[i * 3 + 1] = particle.position.y;
            positions[i * 3 + 2] = particle.position.z;
        });

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    const particlePositions = new Float32Array(particleCount * 3);
    particles.current.forEach((p, i) => {
        particlePositions[i * 3] = p.position.x;
        particlePositions[i * 3 + 1] = p.position.y;
        particlePositions[i * 3 + 2] = p.position.z;
    });

    return (
        <group>
            {/* River surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[20, 30]} />
                <meshPhysicalMaterial
                    color="#1e90ff"
                    transparent
                    opacity={0.6}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Flow particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={particlePositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.1} color="#00e5ff" transparent opacity={0.8} />
            </points>
        </group>
    );
}

// Cable guide system
function CableSystem({ angle, ferryPos }: { angle: number; ferryPos: [number, number, number] }) {
    const angleRad = (angle * Math.PI) / 180;
    const cableLength = 15;
    const endX = Math.sin(angleRad) * cableLength;
    const endZ = Math.cos(angleRad) * cableLength;

    return (
        <group>
            {/* Cable from left bank to ferry */}
            <Line
                points={[[-10, 2, 0], ferryPos]}
                color="#ffd166"
                lineWidth={2}
            />
            {/* Cable from ferry to right bank */}
            <Line
                points={[ferryPos, [10, 2, 0]]}
                color="#ffd166"
                lineWidth={2}
            />
            {/* Direction indicator */}
            <Line
                points={[ferryPos, [ferryPos[0] + endX, ferryPos[1], ferryPos[2] + endZ]]}
                color="#39ff14"
                lineWidth={3}
            />
        </group>
    );
}

function FerryScene({ riverSpeed, cableAngle, ferrySpeed }: FerryCanvasProps) {
    const [ferryPos, setFerryPos] = useState<[number, number, number]>([-8, 0.5, 0]);
    const [ferryRotation, setFerryRotation] = useState(0);

    useEffect(() => {
        // Calculate ferry trajectory based on vector addition
        const angleRad = (cableAngle * Math.PI) / 180;
        
        // Ferry velocity components
        const vFerryX = Math.sin(angleRad) * ferrySpeed;
        const vFerryZ = Math.cos(angleRad) * ferrySpeed;
        
        // River velocity (only Z component)
        const vRiverZ = riverSpeed;
        
        // Resultant velocity
        const vResultantX = vFerryX;
        const vResultantZ = vFerryZ + vRiverZ;
        
        // Update ferry rotation to face resultant direction
        const resultantAngle = Math.atan2(vResultantX, vResultantZ);
        setFerryRotation(resultantAngle);
        
        // Simulate ferry movement
        const interval = setInterval(() => {
            setFerryPos((prev) => {
                const newX = prev[0] + vResultantX * 0.1;
                const newZ = prev[2] + vResultantZ * 0.1;
                
                // Reset if ferry reaches the other side or goes too far
                if (newX > 10 || newX < -10 || Math.abs(newZ) > 15) {
                    return [-8, 0.5, 0];
                }
                
                return [newX, prev[1], newZ];
            });
        }, 100);
        
        return () => clearInterval(interval);
    }, [riverSpeed, cableAngle, ferrySpeed]);

    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#00e5ff" />

            <River speed={riverSpeed} />
            <Ferry position={ferryPos} rotation={ferryRotation} />
            <CableSystem angle={cableAngle} ferryPos={ferryPos} />

            {/* River banks */}
            <mesh position={[-10, 0, 0]}>
                <boxGeometry args={[1, 3, 30]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>
            <mesh position={[10, 0, 0]}>
                <boxGeometry args={[1, 3, 30]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>

            {/* Grid */}
            <gridHelper args={[30, 30, "#00e5ff", "#003344"]} position={[0, -1, 0]} />
        </>
    );
}

export default function FerryCanvas(props: FerryCanvasProps) {
    return (
        <Canvas camera={{ position: [0, 15, 15], fov: 50 }}>
            <color attach="background" args={["#000814"]} />
            <FerryScene {...props} />
            <OrbitControls
                enablePan={false}
                minDistance={10}
                maxDistance={30}
                maxPolarAngle={Math.PI / 2.2}
            />
        </Canvas>
    );
}
