"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";

interface OpticsCanvasProps {
    n1: number; // Refractive index of medium 1
    n2: number; // Refractive index of medium 2
    incidentAngle: number; // in degrees
    showPrism: boolean;
    showTotalReflection: boolean;
}

// Snell's law: n1 * sin(θ1) = n2 * sin(θ2)
function calculateRefraction(n1: number, n2: number, theta1Deg: number): { theta2Deg: number; totalReflection: boolean } {
    const theta1 = (theta1Deg * Math.PI) / 180;
    const sinTheta2 = (n1 / n2) * Math.sin(theta1);
    
    if (Math.abs(sinTheta2) > 1) {
        // Total internal reflection
        return { theta2Deg: 0, totalReflection: true };
    }
    
    const theta2 = Math.asin(sinTheta2);
    return { theta2Deg: (theta2 * 180) / Math.PI, totalReflection: false };
}

// Light ray component
function LightRay({ start, end, color = "#ffff00" }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
    return (
        <Line points={[start, end]} color={color} lineWidth={2} />
    );
}

// Interface between two media
function Interface({ n1, n2, incidentAngle }: { n1: number; n2: number; incidentAngle: number }) {
    const { theta2Deg, totalReflection } = calculateRefraction(n1, n2, incidentAngle);
    
    const theta1Rad = (incidentAngle * Math.PI) / 180;
    const theta2Rad = (theta2Deg * Math.PI) / 180;
    
    // Incident ray
    const incidentStart: [number, number, number] = [
        -Math.sin(theta1Rad) * 3,
        Math.cos(theta1Rad) * 3,
        0
    ];
    const incidentEnd: [number, number, number] = [0, 0, 0];
    
    // Refracted or reflected ray
    let refractedEnd: [number, number, number];
    if (totalReflection) {
        // Reflected ray
        refractedEnd = [
            Math.sin(theta1Rad) * 3,
            Math.cos(theta1Rad) * 3,
            0
        ];
    } else {
        // Refracted ray
        refractedEnd = [
            Math.sin(theta2Rad) * 3,
            -Math.cos(theta2Rad) * 3,
            0
        ];
    }
    
    return (
        <group>
            {/* Medium 1 (top) */}
            <mesh position={[0, 1.5, -0.5]}>
                <boxGeometry args={[8, 3, 1]} />
                <meshPhysicalMaterial
                    color="#00e5ff"
                    transparent
                    opacity={0.2}
                    transmission={0.9}
                    thickness={0.5}
                />
            </mesh>
            
            {/* Medium 2 (bottom) */}
            <mesh position={[0, -1.5, -0.5]}>
                <boxGeometry args={[8, 3, 1]} />
                <meshPhysicalMaterial
                    color="#a855f7"
                    transparent
                    opacity={0.3}
                    transmission={0.8}
                    thickness={0.5}
                />
            </mesh>
            
            {/* Interface line */}
            <Line points={[[-4, 0, 0], [4, 0, 0]]} color="#ffffff" lineWidth={2} />
            
            {/* Normal line */}
            <Line points={[[0, -3, 0], [0, 3, 0]]} color="#ffd166" lineWidth={1} dashed dashSize={0.1} gapSize={0.05} />
            
            {/* Incident ray */}
            <LightRay start={incidentStart} end={incidentEnd} color="#ffff00" />
            
            {/* Refracted/Reflected ray */}
            <LightRay 
                start={incidentEnd} 
                end={refractedEnd} 
                color={totalReflection ? "#ff2d7d" : "#39ff14"} 
            />
            
            {/* Angle labels */}
            <Text
                position={[-0.8, 1, 0]}
                fontSize={0.2}
                color="#ffff00"
                anchorX="center"
                anchorY="middle"
            >
                θ_1 = {incidentAngle.toFixed(1)}°
            </Text>
            
            {!totalReflection && (
                <Text
                    position={[0.8, -1, 0]}
                    fontSize={0.2}
                    color="#39ff14"
                    anchorX="center"
                    anchorY="middle"
                >
                    θ_2 = {theta2Deg.toFixed(1)}°
                </Text>
            )}
            
            {totalReflection && (
                <Text
                    position={[0, 2, 0]}
                    fontSize={0.3}
                    color="#ff2d7d"
                    anchorX="center"
                    anchorY="middle"
                >
                    TOTAL REFLECTION
                </Text>
            )}
            
            {/* Refractive indices */}
            <Text
                position={[-3, 2, 0]}
                fontSize={0.25}
                color="#00e5ff"
                anchorX="left"
                anchorY="middle"
            >
                n_1 = {n1.toFixed(2)}
            </Text>
            <Text
                position={[-3, -2, 0]}
                fontSize={0.25}
                color="#a855f7"
                anchorX="left"
                anchorY="middle"
            >
                n_2 = {n2.toFixed(2)}
            </Text>
        </group>
    );
}

// Prism with dispersion
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Prism({ incidentAngle }: { incidentAngle: number }) {
    // Prism vertices (equilateral triangle)
    const prismGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 1);
        shape.lineTo(-0.866, -0.5);
        shape.lineTo(0.866, -0.5);
        shape.closePath();
        
        const extrudeSettings = {
            depth: 0.5,
            bevelEnabled: false,
        };
        
        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }, []);
    
    // Dispersion: different colors refract at different angles
    const colors = [
        { color: "#ff0000", n: 1.514 }, // Red
        { color: "#ff6600", n: 1.517 }, // Orange
        { color: "#ffff00", n: 1.520 }, // Yellow
        { color: "#00ff00", n: 1.523 }, // Green
        { color: "#0000ff", n: 1.528 }, // Blue
        { color: "#a855f7", n: 1.532 }, // Violet
    ];
    
    return (
        <group position={[0, 0, 0]}>
            {/* Prism */}
            <mesh geometry={prismGeometry} rotation={[0, 0, 0]}>
                <meshPhysicalMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.3}
                    transmission={0.95}
                    thickness={0.5}
                    roughness={0}
                    metalness={0}
                />
            </mesh>
            
            {/* Incident white light */}
            <LightRay 
                start={[-3, 0, 0]} 
                end={[-0.866, -0.5, 0]} 
                color="#ffffff" 
            />
            
            {/* Dispersed rays */}
            {colors.map((c, i) => {
                const offset = (i - 2.5) * 0.1;
                const angle = 30 + offset * 10;
                const angleRad = (angle * Math.PI) / 180;
                const endX = 0.866 + Math.cos(angleRad) * 2;
                const endY = -0.5 + Math.sin(angleRad) * 2;
                
                return (
                    <LightRay
                        key={i}
                        start={[0.866, -0.5, 0]}
                        end={[endX, endY, 0]}
                        color={c.color}
                    />
                );
            })}
        </group>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OpticsScene({ n1, n2, incidentAngle, showPrism, showTotalReflection }: OpticsCanvasProps) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            
            {showPrism ? (
                <Prism incidentAngle={incidentAngle} />
            ) : (
                <Interface n1={n1} n2={n2} incidentAngle={incidentAngle} />
            )}
            
            {/* Grid */}
            <gridHelper args={[10, 10, "#00e5ff", "#003344"]} position={[0, -3, 0]} />
        </>
    );
}

export default function OpticsCanvas(props: OpticsCanvasProps) {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <color attach="background" args={["#000000"]} />
            <OpticsScene {...props} />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />
        </Canvas>
    );
}
