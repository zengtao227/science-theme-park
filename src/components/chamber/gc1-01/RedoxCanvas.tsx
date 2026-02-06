"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface RedoxCanvasProps {
    znConcentration: number; // [Zn²⁺] in M
    cuConcentration: number; // [Cu²⁺] in M
    temperature: number; // in K
    showElectrons: boolean;
    showIons: boolean;
}

// Nernst equation: E = E° - (0.0592/n) * log(Q)
function calculateCellPotential(znConc: number, cuConc: number, temp: number) {
    const E0_Zn = -0.76; // V (Zn²⁺/Zn)
    const E0_Cu = 0.34; // V (Cu²⁺/Cu)
    const E0_cell = E0_Cu - E0_Zn; // 1.10 V
    const n = 2; // electrons transferred
    const R = 8.314; // J/(mol·K)
    const F = 96485; // C/mol
    
    // Q = [Zn²⁺]/[Cu²⁺]
    const Q = znConc / cuConc;
    
    // Nernst equation: E = E° - (RT/nF) * ln(Q)
    // At 298K: E = E° - (0.0592/n) * log(Q)
    const E = E0_cell - (R * temp / (n * F)) * Math.log(Q);
    
    return { E, E0_cell };
}

// Beaker component
function Beaker({ position, color, concentration }: { position: [number, number, number]; color: string; concentration: number }) {
    // Solution color intensity based on concentration
    const solutionColor = useMemo(() => {
        const intensity = Math.min(concentration / 2, 1); // Normalize to 0-1
        if (color === "blue") {
            return new THREE.Color(0, intensity * 0.5, intensity);
        } else {
            return new THREE.Color(intensity * 0.3, intensity * 0.3, intensity * 0.3);
        }
    }, [color, concentration]);

    return (
        <group position={position}>
            {/* Beaker glass */}
            <mesh>
                <cylinderGeometry args={[1.5, 1.5, 4, 32, 1, true]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.2}
                    roughness={0.1}
                    metalness={0.1}
                    transmission={0.9}
                    thickness={0.5}
                />
            </mesh>
            
            {/* Solution */}
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[1.4, 1.4, 3, 32]} />
                <meshPhysicalMaterial
                    color={solutionColor}
                    transparent
                    opacity={0.6}
                    emissive={solutionColor}
                    emissiveIntensity={0.2}
                />
            </mesh>
            
            {/* Bottom */}
            <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.5, 32]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.3}
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>
        </group>
    );
}

// Electrode component
function Electrode({ position, material, label }: { position: [number, number, number]; material: "Zn" | "Cu"; label: string }) {
    const color = material === "Zn" ? "#c0c0c0" : "#ff6b35";
    
    return (
        <group position={position}>
            {/* Electrode rod */}
            <mesh>
                <cylinderGeometry args={[0.2, 0.2, 3.5, 16]} />
                <meshPhysicalMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.2}
                    emissive={color}
                    emissiveIntensity={0.1}
                />
            </mesh>
            
            {/* Label */}
            <Text
                position={[0, 2.5, 0]}
                fontSize={0.3}
                color="#00e5ff"
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>
        </group>
    );
}

// Salt bridge
function SaltBridge({ showIons }: { showIons: boolean }) {
    return (
        <group position={[0, 1.5, 0]}>
            {/* Bridge tube */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 8, 16]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.3}
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>
            
            {/* Salt solution */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.25, 0.25, 7.8, 16]} />
                <meshPhysicalMaterial
                    color="#a855f7"
                    transparent
                    opacity={0.4}
                    emissive="#a855f7"
                    emissiveIntensity={0.2}
                />
            </mesh>
            
            {showIons && <SaltBridgeIons />}
        </group>
    );
}

// Animated ions in salt bridge
function SaltBridgeIons() {
    const cationsRef = useRef<THREE.InstancedMesh>(null);
    const anionsRef = useRef<THREE.InstancedMesh>(null);
    const count = 30;
    
    const dummy = useMemo(() => new THREE.Object3D(), []);
    
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        
        // Cations (K⁺) moving right
        if (cationsRef.current) {
            for (let i = 0; i < count; i++) {
                const offset = (i / count) * 7.8;
                const x = -3.9 + ((offset + time * 0.5) % 7.8);
                const y = Math.sin(i * 0.5 + time) * 0.1;
                const z = Math.cos(i * 0.7 + time) * 0.1;
                
                dummy.position.set(x, y, z);
                dummy.updateMatrix();
                cationsRef.current.setMatrixAt(i, dummy.matrix);
            }
            cationsRef.current.instanceMatrix.needsUpdate = true;
        }
        
        // Anions (NO₃⁻) moving left
        if (anionsRef.current) {
            for (let i = 0; i < count; i++) {
                const offset = (i / count) * 7.8;
                const x = 3.9 - ((offset + time * 0.5) % 7.8);
                const y = Math.sin(i * 0.5 + time + Math.PI) * 0.1;
                const z = Math.cos(i * 0.7 + time + Math.PI) * 0.1;
                
                dummy.position.set(x, y, z);
                dummy.updateMatrix();
                anionsRef.current.setMatrixAt(i, dummy.matrix);
            }
            anionsRef.current.instanceMatrix.needsUpdate = true;
        }
    });
    
    return (
        <>
            {/* Cations (purple) */}
            <instancedMesh ref={cationsRef} args={[undefined, undefined, count]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color="#a855f7" />
            </instancedMesh>
            
            {/* Anions (pink) */}
            <instancedMesh ref={anionsRef} args={[undefined, undefined, count]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color="#ff2d7d" />
            </instancedMesh>
        </>
    );
}

// Wire connecting electrodes
function Wire({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
    const points = useMemo(() => {
        // Create curved wire path
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(...start),
            new THREE.Vector3(start[0], start[1] + 2, start[2]),
            new THREE.Vector3((start[0] + end[0]) / 2, start[1] + 3, start[2]),
            new THREE.Vector3(end[0], end[1] + 2, end[2]),
            new THREE.Vector3(...end),
        ]);
        return curve.getPoints(50);
    }, [start, end]);
    
    const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
    
    return (
        <line geometry={geometry}>
            <lineBasicMaterial color="#ffd166" linewidth={3} />
        </line>
    );
}

// Electrons flowing through wire
function ElectronFlow({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
    const electronsRef = useRef<THREE.InstancedMesh>(null);
    const count = 20;
    
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(...start),
            new THREE.Vector3(start[0], start[1] + 2, start[2]),
            new THREE.Vector3((start[0] + end[0]) / 2, start[1] + 3, start[2]),
            new THREE.Vector3(end[0], end[1] + 2, end[2]),
            new THREE.Vector3(...end),
        ]);
    }, [start, end]);
    
    const dummy = useMemo(() => new THREE.Object3D(), []);
    
    useFrame(({ clock }) => {
        if (!electronsRef.current) return;
        
        const time = clock.getElapsedTime();
        
        for (let i = 0; i < count; i++) {
            const t = ((i / count) + time * 0.2) % 1;
            const pos = curve.getPoint(t);
            
            dummy.position.copy(pos);
            dummy.scale.setScalar(0.8 + Math.sin(time * 5 + i) * 0.2);
            dummy.updateMatrix();
            electronsRef.current.setMatrixAt(i, dummy.matrix);
        }
        electronsRef.current.instanceMatrix.needsUpdate = true;
    });
    
    return (
        <instancedMesh ref={electronsRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={1} />
        </instancedMesh>
    );
}

function GalvanicCellScene({ znConcentration, cuConcentration, temperature, showElectrons, showIons }: RedoxCanvasProps) {
    const { E } = calculateCellPotential(znConcentration, cuConcentration, temperature);
    
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, 10, -10]} intensity={0.5} color="#00e5ff" />
            
            {/* Anode (Zn) - Left */}
            <Beaker position={[-4, 0, 0]} color="gray" concentration={znConcentration} />
            <Electrode position={[-4, 0.5, 0]} material="Zn" label="Zn (Anode)" />
            
            {/* Cathode (Cu) - Right */}
            <Beaker position={[4, 0, 0]} color="blue" concentration={cuConcentration} />
            <Electrode position={[4, 0.5, 0]} material="Cu" label="Cu (Cathode)" />
            
            {/* Salt Bridge */}
            <SaltBridge showIons={showIons} />
            
            {/* External Circuit Wire */}
            <Wire start={[-4, 2, 0]} end={[4, 2, 0]} />
            
            {/* Electron Flow */}
            {showElectrons && E > 0 && <ElectronFlow start={[-4, 2, 0]} end={[4, 2, 0]} />}
            
            {/* Voltage Label */}
            <Text
                position={[0, 5, 0]}
                fontSize={0.5}
                color="#39ff14"
                anchorX="center"
                anchorY="middle"
            >
                {`E = ${E.toFixed(3)} V`}
            </Text>
            
            {/* Grid */}
            <gridHelper args={[20, 20, "#00e5ff", "#003344"]} position={[0, -2.5, 0]} />
        </>
    );
}

export default function RedoxCanvas(props: RedoxCanvasProps) {
    return (
        <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
            <color attach="background" args={["#000000"]} />
            <GalvanicCellScene {...props} />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                maxPolarAngle={Math.PI / 2}
            />
        </Canvas>
    );
}
