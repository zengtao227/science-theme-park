"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface VectorFieldCanvasProps {
    vectorA: [number, number, number];
    vectorB: [number, number, number];
    showDotProduct: boolean;
    showCrossProduct: boolean;
    showProjection: boolean;
}

// Arrow helper component
function Vector({ start, end, color, label }: { start: [number, number, number]; end: [number, number, number]; color: string; label: string }) {
    const direction = useMemo(() => {
        const dir = new THREE.Vector3(...end).sub(new THREE.Vector3(...start));
        return dir.normalize();
    }, [start, end]);
    
    const length = useMemo(() => {
        return new THREE.Vector3(...end).sub(new THREE.Vector3(...start)).length();
    }, [start, end]);
    
    const origin = useMemo(() => new THREE.Vector3(...start), [start]);
    
    return (
        <group>
            <arrowHelper args={[direction, origin, length, color, length * 0.2, length * 0.15]} />
            <Text
                position={end}
                fontSize={0.3}
                color={color}
                anchorX="center"
                anchorY="bottom"
            >
                {label}
            </Text>
        </group>
    );
}

// Projection visualization
function Projection({ vectorA, vectorB }: { vectorA: [number, number, number]; vectorB: [number, number, number] }) {
    const vA = useMemo(() => new THREE.Vector3(...vectorA), [vectorA]);
    const vB = useMemo(() => new THREE.Vector3(...vectorB), [vectorB]);
    
    // Project A onto B: proj_B(A) = (A·B / |B|²) * B
    const dotProduct = vA.dot(vB);
    const bLengthSq = vB.lengthSq();
    const projectionScalar = dotProduct / bLengthSq;
    const projection = vB.clone().multiplyScalar(projectionScalar);
    
    return (
        <group>
            {/* Projection vector */}
            <Vector
                start={[0, 0, 0]}
                end={[projection.x, projection.y, projection.z]}
                color="#ffd166"
                label="proj"
            />
            
            {/* Perpendicular line from A to projection */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        args={[new Float32Array([
                            vectorA[0], vectorA[1], vectorA[2],
                            projection.x, projection.y, projection.z
                        ]), 3]}
                    />
                </bufferGeometry>
                <lineDashedMaterial color="#ffffff" dashSize={0.1} gapSize={0.05} opacity={0.5} transparent />
            </line>
        </group>
    );
}

// Cross product visualization with right-hand rule animation
function CrossProduct({ vectorA, vectorB, animate }: { vectorA: [number, number, number]; vectorB: [number, number, number]; animate: boolean }) {
    const vA = useMemo(() => new THREE.Vector3(...vectorA), [vectorA]);
    const vB = useMemo(() => new THREE.Vector3(...vectorB), [vectorB]);
    const crossProduct = useMemo(() => vA.clone().cross(vB), [vA, vB]);
    
    const handRef = useRef<THREE.Group>(null);
    
    useFrame(({ clock }) => {
        if (!animate || !handRef.current) return;
        
        const t = (Math.sin(clock.getElapsedTime() * 2) + 1) / 2;
        
        // Animate rotation from A to B
        const angle = t * Math.acos(vA.clone().normalize().dot(vB.clone().normalize()));
        const axis = vA.clone().cross(vB).normalize();
        
        const rotatedA = vA.clone().applyAxisAngle(axis, angle);
        handRef.current.position.copy(rotatedA);
    });
    
    // Parallelogram area visualization
    const parallelogramPoints = useMemo(() => {
        return [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(...vectorA),
            new THREE.Vector3(vectorA[0] + vectorB[0], vectorA[1] + vectorB[1], vectorA[2] + vectorB[2]),
            new THREE.Vector3(...vectorB),
        ];
    }, [vectorA, vectorB]);
    
    return (
        <group>
            {/* Cross product vector */}
            <Vector
                start={[0, 0, 0]}
                end={[crossProduct.x, crossProduct.y, crossProduct.z]}
                color="#39ff14"
                label="A×B"
            />
            
            {/* Parallelogram */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={5}
                        args={[new Float32Array([
                            ...parallelogramPoints[0].toArray(),
                            ...parallelogramPoints[1].toArray(),
                            ...parallelogramPoints[2].toArray(),
                            ...parallelogramPoints[3].toArray(),
                            ...parallelogramPoints[0].toArray(),
                        ]), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#a855f7" opacity={0.5} transparent />
            </line>
            
            {/* Parallelogram fill */}
            <mesh>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={6}
                        args={[new Float32Array([
                            ...parallelogramPoints[0].toArray(),
                            ...parallelogramPoints[1].toArray(),
                            ...parallelogramPoints[2].toArray(),
                            ...parallelogramPoints[0].toArray(),
                            ...parallelogramPoints[2].toArray(),
                            ...parallelogramPoints[3].toArray(),
                        ]), 3]}
                    />
                </bufferGeometry>
                <meshBasicMaterial color="#a855f7" opacity={0.2} transparent side={THREE.DoubleSide} />
            </mesh>
            
            {/* Animated hand indicator */}
            {animate && (
                <group ref={handRef}>
                    <mesh>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshBasicMaterial color="#ffff00" />
                    </mesh>
                </group>
            )}
        </group>
    );
}

// Dot product visualization
function DotProductVisualization({ vectorA, vectorB }: { vectorA: [number, number, number]; vectorB: [number, number, number] }) {
    const vA = useMemo(() => new THREE.Vector3(...vectorA), [vectorA]);
    const vB = useMemo(() => new THREE.Vector3(...vectorB), [vectorB]);
    
    const angle = useMemo(() => {
        const dot = vA.dot(vB);
        const lengthProduct = vA.length() * vB.length();
        return Math.acos(dot / lengthProduct);
    }, [vA, vB]);
    
    // Arc showing angle
    const arcPoints = useMemo(() => {
        const points = [];
        const radius = Math.min(vA.length(), vB.length()) * 0.3;
        const steps = 20;
        
        const startDir = vA.clone().normalize();
        const axis = vA.clone().cross(vB).normalize();
        
        for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * angle;
            const point = startDir.clone().applyAxisAngle(axis, t).multiplyScalar(radius);
            points.push(point);
        }
        
        return points;
    }, [vA, vB, angle]);
    
    return (
        <group>
            {/* Angle arc */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={arcPoints.length}
                        args={[new Float32Array(arcPoints.flatMap(p => p.toArray())), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#00e5ff" linewidth={2} />
            </line>
            
            {/* Angle label */}
            <Text
                position={arcPoints[Math.floor(arcPoints.length / 2)].toArray()}
                fontSize={0.25}
                color="#00e5ff"
                anchorX="center"
                anchorY="middle"
            >
                {(angle * 180 / Math.PI).toFixed(1)}°
            </Text>
        </group>
    );
}

function VectorScene({ vectorA, vectorB, showDotProduct, showCrossProduct, showProjection }: VectorFieldCanvasProps) {
    const vA = useMemo(() => new THREE.Vector3(...vectorA), [vectorA]);
    const vB = useMemo(() => new THREE.Vector3(...vectorB), [vectorB]);
    
    const dotProduct = vA.dot(vB);
    const crossProduct = vA.clone().cross(vB);
    const angle = Math.acos(vA.clone().normalize().dot(vB.clone().normalize())) * 180 / Math.PI;
    
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e5ff" />
            
            {/* Main vectors */}
            <Vector start={[0, 0, 0]} end={vectorA} color="#00e5ff" label="A" />
            <Vector start={[0, 0, 0]} end={vectorB} color="#ff2d7d" label="B" />
            
            {/* Dot product visualization */}
            {showDotProduct && <DotProductVisualization vectorA={vectorA} vectorB={vectorB} />}
            
            {/* Projection */}
            {showProjection && <Projection vectorA={vectorA} vectorB={vectorB} />}
            
            {/* Cross product */}
            {showCrossProduct && <CrossProduct vectorA={vectorA} vectorB={vectorB} animate={true} />}
            
            {/* Origin */}
            <mesh>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            
            {/* Coordinate axes */}
            <axesHelper args={[5]} />
            
            {/* Grid */}
            <gridHelper args={[10, 10, "#00e5ff", "#003344"]} />
            
            {/* Info display */}
            <Html position={[0, 5, 0]} center>
                <div className="bg-black/80 border border-cyan-500 p-2 text-cyan-300 font-mono text-xs">
                    <div>A·B = {dotProduct.toFixed(3)}</div>
                    <div>|A×B| = {crossProduct.length().toFixed(3)}</div>
                    <div>θ = {angle.toFixed(1)}°</div>
                </div>
            </Html>
        </>
    );
}

export default function VectorFieldCanvas(props: VectorFieldCanvasProps) {
    return (
        <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
            <color attach="background" args={["#000000"]} />
            <VectorScene {...props} />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />
        </Canvas>
    );
}
