"use client";

import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

// Circuit component types
type ComponentType = "resistor" | "capacitor" | "inductor" | "battery" | "wire";

interface CircuitComponent {
    id: string;
    type: ComponentType;
    position: [number, number, number];
    value: number; // R in Ω, C in F, L in H, V in V
    connections: string[]; // IDs of connected components
}

interface CircuitCanvasProps {
    components: CircuitComponent[];
    onComponentClick?: (id: string) => void;
    multimeterMode: "voltage" | "current" | "off";
    selectedPoints: string[];
    time: number;
}

// Component 3D models
function Resistor({ position, selected }: { position: [number, number, number]; selected: boolean }) {
    return (
        <group position={position}>
            <mesh>
                <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
                <meshPhysicalMaterial
                    color={selected ? "#ff2d7d" : "#ffd166"}
                    emissive={selected ? "#ff2d7d" : "#ffd166"}
                    emissiveIntensity={selected ? 0.5 : 0.2}
                />
            </mesh>
            {/* Resistor bands */}
            <mesh position={[-0.2, 0, 0]}>
                <cylinderGeometry args={[0.11, 0.11, 0.05, 16]} />
                <meshBasicMaterial color="#8b4513" />
            </mesh>
            <mesh position={[0.2, 0, 0]}>
                <cylinderGeometry args={[0.11, 0.11, 0.05, 16]} />
                <meshBasicMaterial color="#ff0000" />
            </mesh>
        </group>
    );
}

function Capacitor({ position, selected }: { position: [number, number, number]; selected: boolean }) {
    return (
        <group position={position}>
            <mesh position={[-0.15, 0, 0]}>
                <boxGeometry args={[0.05, 0.6, 0.6]} />
                <meshPhysicalMaterial
                    color={selected ? "#ff2d7d" : "#00e5ff"}
                    emissive={selected ? "#ff2d7d" : "#00e5ff"}
                    emissiveIntensity={selected ? 0.5 : 0.3}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            <mesh position={[0.15, 0, 0]}>
                <boxGeometry args={[0.05, 0.6, 0.6]} />
                <meshPhysicalMaterial
                    color={selected ? "#ff2d7d" : "#00e5ff"}
                    emissive={selected ? "#ff2d7d" : "#00e5ff"}
                    emissiveIntensity={selected ? 0.5 : 0.3}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </group>
    );
}

function Inductor({ position, selected }: { position: [number, number, number]; selected: boolean }) {
    const coils = 8;
    return (
        <group position={position}>
            {Array.from({ length: coils }).map((_, i) => (
                <mesh key={i} position={[(i - coils / 2) * 0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.15, 0.05, 16, 32]} />
                    <meshPhysicalMaterial
                        color={selected ? "#ff2d7d" : "#a855f7"}
                        emissive={selected ? "#ff2d7d" : "#a855f7"}
                        emissiveIntensity={selected ? 0.5 : 0.3}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            ))}
        </group>
    );
}

function Battery({ position, selected }: { position: [number, number, number]; selected: boolean }) {
    return (
        <group position={position}>
            <mesh position={[-0.2, 0, 0]}>
                <boxGeometry args={[0.1, 0.8, 0.4]} />
                <meshPhysicalMaterial
                    color={selected ? "#ff2d7d" : "#39ff14"}
                    emissive={selected ? "#ff2d7d" : "#39ff14"}
                    emissiveIntensity={selected ? 0.5 : 0.4}
                />
            </mesh>
            <mesh position={[0.2, 0, 0]}>
                <boxGeometry args={[0.1, 0.4, 0.4]} />
                <meshPhysicalMaterial
                    color={selected ? "#ff2d7d" : "#39ff14"}
                    emissive={selected ? "#ff2d7d" : "#39ff14"}
                    emissiveIntensity={selected ? 0.5 : 0.4}
                />
            </mesh>
        </group>
    );
}

function Wire({ start, end, selected }: { start: [number, number, number]; end: [number, number, number]; selected: boolean }) {
    return (
        <Line
            points={[start, end]}
            color={selected ? "#ff2d7d" : "#00e5ff"}
            lineWidth={selected ? 3 : 2}
        />
    );
}

// Modified Nodal Analysis (MNA) solver
function solveCircuit(components: CircuitComponent[], time: number) {
    // Simplified RLC circuit solver for demonstration
    // In a full implementation, this would build and solve the MNA matrix
    
    const results: Record<string, { voltage: number; current: number }> = {};
    
    components.forEach((comp) => {
        if (comp.type === "battery") {
            results[comp.id] = { voltage: comp.value, current: 0 };
        } else if (comp.type === "resistor") {
            // Ohm's law: V = IR
            const current = 0.1; // Simplified
            results[comp.id] = { voltage: comp.value * current, current };
        } else if (comp.type === "capacitor") {
            // Capacitor: Q = CV, I = C(dV/dt)
            const omega = 2 * Math.PI * 1; // 1 Hz
            const voltage = 5 * Math.sin(omega * time);
            const current = comp.value * omega * 5 * Math.cos(omega * time);
            results[comp.id] = { voltage, current };
        } else if (comp.type === "inductor") {
            // Inductor: V = L(dI/dt)
            const omega = 2 * Math.PI * 1;
            const current = 0.5 * Math.sin(omega * time);
            const voltage = comp.value * omega * 0.5 * Math.cos(omega * time);
            results[comp.id] = { voltage, current };
        }
    });
    
    return results;
}

function CircuitScene({ components, onComponentClick, multimeterMode, selectedPoints, time }: CircuitCanvasProps) {
    const { camera, raycaster, gl } = useThree();
    solveCircuit(components, time);

    // Raycaster for multimeter picking
    useEffect(() => {
        if (multimeterMode === "off") return;

        const handleClick = (event: MouseEvent) => {
            const rect = gl.domElement.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
            
            // Check intersections with components
            // In full implementation, would check against actual meshes
            if (onComponentClick && components.length > 0) {
                onComponentClick(components[0].id);
            }
        };

        gl.domElement.addEventListener("click", handleClick);
        return () => gl.domElement.removeEventListener("click", handleClick);
    }, [multimeterMode, camera, raycaster, gl, components, onComponentClick]);

    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e5ff" />

            {/* Render components */}
            {components.map((comp) => {
                const selected = selectedPoints.includes(comp.id);
                
                switch (comp.type) {
                    case "resistor":
                        return <Resistor key={comp.id} position={comp.position} selected={selected} />;
                    case "capacitor":
                        return <Capacitor key={comp.id} position={comp.position} selected={selected} />;
                    case "inductor":
                        return <Inductor key={comp.id} position={comp.position} selected={selected} />;
                    case "battery":
                        return <Battery key={comp.id} position={comp.position} selected={selected} />;
                    default:
                        return null;
                }
            })}

            {/* Render wires */}
            {components.map((comp) =>
                comp.connections.map((connId) => {
                    const connComp = components.find((c) => c.id === connId);
                    if (!connComp) return null;
                    
                    const selected = selectedPoints.includes(comp.id) && selectedPoints.includes(connId);
                    return (
                        <Wire
                            key={`${comp.id}-${connId}`}
                            start={comp.position}
                            end={connComp.position}
                            selected={selected}
                        />
                    );
                })
            )}

            {/* Grid */}
            <gridHelper args={[20, 20, "#00e5ff", "#003344"]} />
        </>
    );
}

export default function CircuitCanvas(props: CircuitCanvasProps) {
    return (
        <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
            <color attach="background" args={["#000000"]} />
            <CircuitScene {...props} />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                maxPolarAngle={Math.PI / 2}
            />
        </Canvas>
    );
}
