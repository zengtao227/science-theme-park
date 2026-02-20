"use client";

import { useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text, Line, Float, ContactShadows, Stars } from "@react-three/drei";
import * as THREE from "three";

interface OrganicMoleculeCanvasProps {
    molecule: string;
    show3D: boolean; // if false, might show fixed angle
    stage: string;
    translations: any;
}

// Simple procedural builder for alkanes and linear molecules
function generateLinearMolecule(carbons: number, hasDoubleBondAtIdx?: number) {
    const atoms: { pos: [number, number, number], type: string, color: string, radius: number }[] = [];
    const bonds: { start: [number, number, number], end: [number, number, number], double: boolean }[] = [];

    const CC_DIST = 1.5;
    const CH_DIST = 1.0;
    const BOND_ANGLE = Math.PI * 109.5 / 180; // Tetrahedral angle roughly

    for (let i = 0; i < carbons; i++) {
        // Zig-zag pattern in x-y plane
        const x = (i - (carbons - 1) / 2) * CC_DIST;
        const y = (i % 2 === 0 ? 1 : -1) * (CC_DIST / 4);
        const z = 0;

        atoms.push({ pos: [x, y, z], type: "C", color: "#333333", radius: 0.4 });

        if (i > 0) {
            const double = hasDoubleBondAtIdx === i - 1;
            bonds.push({
                start: atoms[i - 1].pos,
                end: [x, y, z],
                double
            });
        }

        // Add Hydrogens (simplified for visualization layout)
        // Up/Down H
        const hY = (i % 2 === 0 ? y + CH_DIST : y - CH_DIST);
        atoms.push({ pos: [x, hY, z], type: "H", color: "#ffffff", radius: 0.25 });
        bonds.push({ start: [x, y, z], end: [x, hY, z], double: false });

        // Front/Back H
        atoms.push({ pos: [x, y, CH_DIST * 0.8], type: "H", color: "#ffffff", radius: 0.25 });
        bonds.push({ start: [x, y, z], end: [x, y, CH_DIST * 0.8], double: false });

        atoms.push({ pos: [x, y, -CH_DIST * 0.8], type: "H", color: "#ffffff", radius: 0.25 });
        bonds.push({ start: [x, y, z], end: [x, y, -CH_DIST * 0.8], double: false });
    }

    return { atoms, bonds };
}

function generateBenzene() {
    const atoms = [];
    const bonds = [];
    const R_C = 1.4;
    const R_H = 2.4;

    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = Math.cos(angle) * R_C;
        const y = Math.sin(angle) * R_C;
        atoms.push({ pos: [x, y, 0], type: "C", color: "#333333", radius: 0.4 });

        const hx = Math.cos(angle) * R_H;
        const hy = Math.sin(angle) * R_H;
        atoms.push({ pos: [hx, hy, 0], type: "H", color: "#ffffff", radius: 0.25 });
        bonds.push({ start: [x, y, 0], end: [hx, hy, 0], double: false });

        if (i > 0) {
            bonds.push({ start: atoms[(i - 1) * 2].pos, end: [x, y, 0], double: i % 2 !== 0 });
        }
    }
    bonds.push({ start: atoms[10].pos, end: atoms[0].pos, double: true }); // Close the ring

    return { atoms, bonds };
}

function MappedMolecule({ molecule }: { molecule: string }) {
    const { atoms, bonds } = useMemo(() => {
        const name = molecule.toLowerCase();

        if (name.includes("benzene") || name.includes("phenol") || name.includes("aniline")) {
            return generateBenzene();
        }

        // Very basic parsing for alkanes to show visual scale
        const alkaneMap: Record<string, number> = {
            "methane": 1, "ethane": 2, "propane": 3, "butane": 4, "pentane": 5,
            "hexane": 6, "heptane": 7, "octane": 8, "nonane": 9, "decane": 10
        };

        const alkeneMap: Record<string, number> = {
            "ethene": 2, "propene": 3, "butene": 4, "pentene": 5, "hexene": 6,
            "heptene": 7, "octene": 8
        };

        if (alkaneMap[name]) return generateLinearMolecule(alkaneMap[name]);
        if (alkeneMap[name]) return generateLinearMolecule(alkeneMap[name], 0);

        // Fallback generic representation
        return generateLinearMolecule(3);
    }, [molecule]);

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group>
                {/* Atoms */}
                {atoms.map((atom, i) => (
                    <mesh key={`atom-${i}`} position={new THREE.Vector3(...atom.pos)}>
                        <sphereGeometry args={[atom.radius, 32, 32]} />
                        <meshPhysicalMaterial
                            color={atom.color}
                            roughness={atom.type === 'C' ? 0.4 : 0.2}
                            metalness={0.1}
                            transmission={0.1}
                            thickness={1.5}
                        />
                        <Text
                            position={[0, 0, atom.radius + 0.05]}
                            fontSize={atom.radius * 0.8}
                            color={atom.type === 'C' ? "#aaaaaa" : "#444"}
                            anchorX="center"
                            anchorY="middle"
                        >
                            {atom.type}
                        </Text>
                    </mesh>
                ))}

                {/* Bonds */}
                {bonds.map((bond, i) => {
                    const start = new THREE.Vector3(...bond.start);
                    const end = new THREE.Vector3(...bond.end);
                    const distance = start.distanceTo(end);
                    const position = start.clone().lerp(end, 0.5);

                    // Rotate cylinder to match bond direction
                    const quaternion = new THREE.Quaternion().setFromUnitVectors(
                        new THREE.Vector3(0, 1, 0),
                        end.clone().sub(start).normalize()
                    );

                    return (
                        <group key={`bond-${i}`} position={position} quaternion={quaternion}>
                            {bond.double ? (
                                <group>
                                    <mesh position={[0.1, 0, 0]}>
                                        <cylinderGeometry args={[0.08, 0.08, distance, 12]} />
                                        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.6} transparent opacity={0.6} />
                                    </mesh>
                                    <mesh position={[-0.1, 0, 0]}>
                                        <cylinderGeometry args={[0.08, 0.08, distance, 12]} />
                                        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.6} transparent opacity={0.6} />
                                    </mesh>
                                </group>
                            ) : (
                                <mesh>
                                    <cylinderGeometry args={[0.1, 0.1, distance, 12]} />
                                    <meshStandardMaterial color="#bbbbbb" roughness={0.3} metalness={0.6} transparent opacity={0.6} />
                                </mesh>
                            )}
                        </group>
                    );
                })}
            </group>
        </Float>
    );
}

export default function OrganicMoleculeCanvas({ molecule, show3D, stage, translations }: OrganicMoleculeCanvasProps) {
    return (
        <div className="w-full h-full relative group">
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 pointer-events-none">
                <div className="bg-neon-purple/20 text-neon-purple border border-neon-purple/50 px-2 py-1 rounded text-[8px] uppercase tracking-widest font-black inline-block backdrop-blur-md">
                    Target: {molecule.toUpperCase()}
                </div>
                {show3D && (
                    <div className="text-[8px] text-white/40 uppercase tracking-widest font-mono">
                        Interactive 3D Assembly
                    </div>
                )}
            </div>

            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#050505']} />
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
                    <pointLight position={[-10, -5, -10]} intensity={2} color="#ff00ff" />
                    <pointLight position={[10, -5, 10]} intensity={1} color="#00ffff" />

                    <Environment preset="studio" blur={1} background />

                    <MappedMolecule molecule={molecule} />

                    <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={15} blur={1.5} far={4} />

                    {show3D ? (
                        <OrbitControls
                            autoRotate={true}
                            autoRotateSpeed={0.5}
                            enableDamping
                            dampingFactor={0.05}
                            minDistance={3}
                            maxDistance={15}
                        />
                    ) : (
                        // Fixed camera angle if 3D rotation toggle is off
                        <OrbitControls enableRotate={false} enableZoom={true} enablePan={false} />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}
