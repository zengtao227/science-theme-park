"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";

interface NuclearSimProps {
    protons: number;
    neutrons: number;
    showStabilityIsland: boolean;
}

// SEMF coefficients (MeV)
const SEMF = {
    av: 15.8,  // Volume term
    as: 18.3,  // Surface term
    ac: 0.71,  // Coulomb term
    aa: 23.2,  // Asymmetry term
};

// Calculate binding energy using Semi-Empirical Mass Formula
function calculateBindingEnergy(A: number, Z: number): number {
    if (A === 0) return 0;
    
    const N = A - Z;
    
    // Pairing term delta
    let delta = 0;
    if (Z % 2 === 0 && N % 2 === 0) delta = 12 / Math.sqrt(A); // even-even
    else if (Z % 2 === 1 && N % 2 === 1) delta = -12 / Math.sqrt(A); // odd-odd
    // else delta = 0 for even-odd or odd-even
    
    const volumeTerm = SEMF.av * A;
    const surfaceTerm = SEMF.as * Math.pow(A, 2/3);
    const coulombTerm = SEMF.ac * Z * (Z - 1) / Math.pow(A, 1/3);
    const asymmetryTerm = SEMF.aa * Math.pow(A - 2*Z, 2) / A;
    
    const B = volumeTerm - surfaceTerm - coulombTerm - asymmetryTerm + delta;
    
    return B;
}

// Calculate binding energy per nucleon
function calculateBEperNucleon(A: number, Z: number): number {
    if (A === 0) return 0;
    return calculateBindingEnergy(A, Z) / A;
}

// Check if nucleus is stable (simplified model)
function isStable(Z: number, N: number): boolean {
    const A = Z + N;
    if (A === 0) return false;
    
    // Stability band approximation
    const idealN = Z * (1 + 0.015 * Math.pow(Z, 2/3));
    const deviation = Math.abs(N - idealN);
    
    // Allow some deviation based on mass number
    const tolerance = 2 + A * 0.02;
    
    return deviation < tolerance && Z > 0 && N > 0;
}

// Determine decay mode
function getDecayMode(Z: number, N: number): "stable" | "alpha" | "beta-" | "beta+" {
    if (isStable(Z, N)) return "stable";
    
    const A = Z + N;
    
    // Heavy nuclei (A > 200) tend to alpha decay
    if (A > 200 && Z > 82) return "alpha";
    
    // Neutron-rich: beta- decay
    const idealN = Z * (1 + 0.015 * Math.pow(Z, 2/3));
    if (N > idealN + 2) return "beta-";
    
    // Proton-rich: beta+ decay
    if (N < idealN - 2) return "beta+";
    
    return "stable";
}

function StabilityChart({ protons, neutrons, showStabilityIsland }: NuclearSimProps) {
    const maxZ = 100;
    const maxN = 150;
    
    // Generate stability island points
    const stablePoints = useMemo(() => {
        const points: THREE.Vector3[] = [];
        for (let z = 1; z <= maxZ; z++) {
            for (let n = 1; n <= maxN; n++) {
                if (isStable(z, n)) {
                    points.push(new THREE.Vector3(n * 0.1, z * 0.1, 0));
                }
            }
        }
        return points;
    }, []);
    
    return (
        <group position={[-7.5, -5, 0]}>
            {/* Axes */}
            <Line
                points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(15, 0, 0)]}
                color="#666666"
                lineWidth={2}
            />
            <Line
                points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 10, 0)]}
                color="#666666"
                lineWidth={2}
            />
            
            {/* Axis labels */}
            <Text position={[7.5, -0.5, 0]} fontSize={0.3} color="#00e5ff">
                N (Neutrons)
            </Text>
            <Text position={[-1, 5, 0]} fontSize={0.3} color="#a855f7" rotation={[0, 0, Math.PI / 2]}>
                Z (Protons)
            </Text>
            
            {/* Stability island */}
            {showStabilityIsland && stablePoints.map((point, i) => (
                <mesh key={i} position={point}>
                    <boxGeometry args={[0.08, 0.08, 0.02]} />
                    <meshBasicMaterial color="#39ff14" opacity={0.3} transparent />
                </mesh>
            ))}
            
            {/* Current nucleus */}
            <mesh position={[neutrons * 0.1, protons * 0.1, 0.1]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                    color={isStable(protons, neutrons) ? "#39ff14" : "#ff2d7d"}
                    emissive={isStable(protons, neutrons) ? "#39ff14" : "#ff2d7d"}
                    emissiveIntensity={0.5}
                />
            </mesh>
            
            {/* N=Z line */}
            <Line
                points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 10, 0)]}
                color="#ffd166"
                lineWidth={1}
                dashed
                dashScale={20}
            />
        </group>
    );
}

function Nucleus({ protons, neutrons }: { protons: number; neutrons: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const nucleonsRef = useRef<THREE.InstancedMesh>(null);
    
    const A = protons + neutrons;
    const radius = Math.pow(A, 1/3) * 0.3;
    
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
    });
    
    // Position nucleons in a sphere using useEffect instead of useMemo
    useEffect(() => {
        if (!nucleonsRef.current) return;
        
        const dummy = new THREE.Object3D();
        let index = 0;
        
        // Protons (red)
        for (let i = 0; i < protons; i++) {
            const phi = Math.acos(-1 + (2 * i) / protons);
            const theta = Math.sqrt(protons * Math.PI) * phi;
            
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);
            
            dummy.position.set(x, y, z);
            dummy.updateMatrix();
            nucleonsRef.current.setMatrixAt(index++, dummy.matrix);
            nucleonsRef.current.setColorAt(index - 1, new THREE.Color("#ff2d7d"));
        }
        
        // Neutrons (cyan)
        for (let i = 0; i < neutrons; i++) {
            const phi = Math.acos(-1 + (2 * i) / neutrons);
            const theta = Math.sqrt(neutrons * Math.PI) * phi;
            
            const x = radius * Math.cos(theta) * Math.sin(phi) * 0.9;
            const y = radius * Math.sin(theta) * Math.sin(phi) * 0.9;
            const z = radius * Math.cos(phi) * 0.9;
            
            dummy.position.set(x, y, z);
            dummy.updateMatrix();
            nucleonsRef.current.setMatrixAt(index++, dummy.matrix);
            nucleonsRef.current.setColorAt(index - 1, new THREE.Color("#00e5ff"));
        }
        
        nucleonsRef.current.instanceMatrix.needsUpdate = true;
        if (nucleonsRef.current.instanceColor) {
            nucleonsRef.current.instanceColor.needsUpdate = true;
        }
    }, [protons, neutrons, radius]);
    
    return (
        <group ref={groupRef} position={[0, 2, 0]}>
            <instancedMesh ref={nucleonsRef} args={[undefined, undefined, A]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial />
            </instancedMesh>
            
            {/* Nucleus glow */}
            <mesh>
                <sphereGeometry args={[radius + 0.2, 32, 32]} />
                <meshBasicMaterial
                    color="#a855f7"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}

function Scene(props: NuclearSimProps) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <Nucleus protons={props.protons} neutrons={props.neutrons} />
            <StabilityChart {...props} />
            
            <OrbitControls enablePan={true} enableZoom={true} />
        </>
    );
}

export default function NuclearSim(props: NuclearSimProps) {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 2, 12], fov: 50 }}>
                <Scene {...props} />
            </Canvas>
        </div>
    );
}

export { calculateBindingEnergy, calculateBEperNucleon, isStable, getDecayMode };
