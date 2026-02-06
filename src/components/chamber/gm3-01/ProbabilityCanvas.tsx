"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface ProbabilityCanvasProps {
    rows: number;
    ballCount: number;
    showDistribution: boolean;
}

interface Ball {
    id: number;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    bin: number;
    active: boolean;
}

const pseudo = (seed: number) => {
    const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
};

// Galton Board (Bean Machine)
function GaltonBoard({ rows, ballCount, onBallLanded }: ProbabilityCanvasProps & { onBallLanded: (bin: number) => void }) {
    const ballsRef = useRef<Ball[]>([]);
    const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
    const [nextBallId, setNextBallId] = useState(0);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const tickRef = useRef(0);
    
    // Initialize balls array in useEffect instead of during render
    useEffect(() => {
        if (ballsRef.current.length === 0) {
            ballsRef.current = Array.from({ length: ballCount }, (_, i) => ({
                id: i,
                position: new THREE.Vector3(0, rows + 2, 0),
                velocity: new THREE.Vector3(0, 0, 0),
                bin: -1,
                active: false,
            }));
        }
    }, [ballCount, rows]);
    
    // Peg positions
    const pegs = useMemo(() => {
        const pegArray: THREE.Vector3[] = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col <= row; col++) {
                const x = (col - row / 2) * 0.5;
                const y = rows - row;
                pegArray.push(new THREE.Vector3(x, y, 0));
            }
        }
        return pegArray;
    }, [rows]);
    
    useFrame((_, delta) => {
        if (!instancedMeshRef.current) return;
        
        const dt = Math.min(delta, 0.016);
        const gravity = -9.8;
        
        tickRef.current += 1;
        const releaseSeed = tickRef.current + nextBallId * 31;
        if (nextBallId < ballCount && pseudo(releaseSeed) < 0.05) {
            const ball = ballsRef.current[nextBallId];
            ball.active = true;
            ball.position.set(0, rows + 2, 0);
            ball.velocity.set((pseudo(releaseSeed + 1) - 0.5) * 0.1, 0, 0);
            ball.bin = -1;
            setNextBallId((id) => id + 1);
        }
        
        // Update active balls
        ballsRef.current.forEach((ball, i) => {
            if (!ball.active) {
                // Hide inactive balls
                dummy.position.set(0, -100, 0);
                dummy.updateMatrix();
                instancedMeshRef.current!.setMatrixAt(i, dummy.matrix);
                return;
            }
            
            // Apply gravity
            ball.velocity.y += gravity * dt;
            ball.position.add(ball.velocity.clone().multiplyScalar(dt));
            
            // Check collision with pegs
            pegs.forEach((peg) => {
                const dist = ball.position.distanceTo(peg);
                if (dist < 0.2) {
                    const direction = pseudo(ball.id * 13 + tickRef.current * 0.7) < 0.5 ? -1 : 1;
                    ball.velocity.x = direction * 2;
                    ball.velocity.y = Math.abs(ball.velocity.y) * 0.5;
                }
            });
            
            // Check if ball reached bottom
            if (ball.position.y < 0 && ball.bin === -1) {
                ball.active = false;
                ball.velocity.set(0, 0, 0);
                
                // Determine bin
                const binIndex = Math.round(ball.position.x / 0.5) + Math.floor(rows / 2);
                ball.bin = Math.max(0, Math.min(rows, binIndex));
                onBallLanded(ball.bin);
                
                // Position in bin
                ball.position.y = -rows + (ballsRef.current.filter(b => b.bin === ball.bin).length * 0.2);
            }
            
            // Update instance matrix
            dummy.position.copy(ball.position);
            dummy.updateMatrix();
            instancedMeshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        
        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    });
    
    return (
        <group>
            {/* Pegs */}
            {pegs.map((peg, i) => (
                <mesh key={i} position={peg.toArray()}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshPhysicalMaterial
                        color="#ffd166"
                    emissive="#ffd166"
                    emissiveIntensity={0.4}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
            ))}
            
            {/* Balls */}
            <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, ballCount]} frustumCulled={true}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshPhysicalMaterial
                    color="#ff2d7d"
                    emissive="#ff2d7d"
                    emissiveIntensity={0.3}
                    metalness={0.5}
                    roughness={0.5}
                />
            </instancedMesh>
            
            {/* Bins */}
            {Array.from({ length: rows + 1 }).map((_, i) => {
                const x = (i - rows / 2) * 0.5;
                return (
                    <line key={i}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                args={[new Float32Array([x, 0, 0, x, -rows, 0]), 3]}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color="#00e5ff" opacity={0.5} transparent />
                    </line>
                );
            })}
        </group>
    );
}

function ProbabilityScene(props: ProbabilityCanvasProps) {
    const [distribution, setDistribution] = useState<number[]>(Array(props.rows + 1).fill(0));
    
    const handleBallLanded = (bin: number) => {
        setDistribution((prev) => {
            const newDist = [...prev];
            newDist[bin] = (newDist[bin] || 0) + 1;
            return newDist;
        });
    };
    
    // Calculate normal distribution curve
    const mean = props.rows / 2;
    const stdDev = Math.sqrt(props.rows / 4);
    
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e5ff" />
            
            <GaltonBoard {...props} onBallLanded={handleBallLanded} />
            
            {/* Distribution bars */}
            {props.showDistribution && distribution.map((count, i) => {
                const x = (i - props.rows / 2) * 0.5;
                const height = count * 0.1;
                
                return (
                    <mesh key={i} position={[x, -props.rows - height / 2, 0]}>
                        <boxGeometry args={[0.4, height, 0.2]} />
                        <meshPhysicalMaterial
                            color="#39ff14"
                            emissive="#39ff14"
                            emissiveIntensity={0.3}
                            transparent
                            opacity={0.7}
                        />
                    </mesh>
                );
            })}
            
            {/* Normal curve overlay */}
            {props.showDistribution && (
                <Text
                    position={[0, props.rows + 3, 0]}
                    fontSize={0.3}
                    color="#00e5ff"
                    anchorX="center"
                    anchorY="middle"
                >
                    μ = {mean.toFixed(1)}, σ = {stdDev.toFixed(2)}
                </Text>
            )}
            
            {/* Grid */}
            <gridHelper args={[20, 20, "#00e5ff", "#003344"]} position={[0, -props.rows - 5, 0]} />
        </>
    );
}

export default function ProbabilityCanvas(props: ProbabilityCanvasProps) {
    return (
        <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
            <color attach="background" args={["#000000"]} />
            <ProbabilityScene {...props} />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />
        </Canvas>
    );
}
