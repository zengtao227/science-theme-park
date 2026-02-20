"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Trail, Float, Text, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface AtomProps {
    type: string;
    position: [number, number, number];
    velocity: THREE.Vector3;
}

const ATOM_CONFIG: Record<string, { color: string; radius: number }> = {
    H: { color: "#ffffff", radius: 0.25 },
    O: { color: "#ff0000", radius: 0.45 },
    C: { color: "#444444", radius: 0.5 },
    N: { color: "#3050ff", radius: 0.45 },
    Cl: { color: "#1ff01f", radius: 0.55 },
    Br: { color: "#a62929", radius: 0.65 },
    Na: { color: "#ab5cf2", radius: 0.6 },
    S: { color: "#ffff30", radius: 0.55 },
    Ca: { color: "#3dff00", radius: 0.65 },
    P: { color: "#ff8000", radius: 0.55 },
    Fe: { color: "#ffa500", radius: 0.65 },
    Al: { color: "#bfa6a6", radius: 0.6 },
    Mg: { color: "#8aff00", radius: 0.55 },
    F: { color: "#90e050", radius: 0.35 },
    I: { color: "#940094", radius: 0.75 },
    default: { color: "#cccccc", radius: 0.4 },
};

function Atom({ type, initialPosition, velocity }: { type: string; initialPosition: [number, number, number]; velocity: THREE.Vector3 }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const config = ATOM_CONFIG[type] || ATOM_CONFIG.default;
    const pos = useRef(new THREE.Vector3(...initialPosition));

    useFrame((state, delta) => {
        pos.current.add(velocity.clone().multiplyScalar(delta));

        // Bounce off walls (container size roughly 4x4x4)
        if (Math.abs(pos.current.x) > 3) velocity.x *= -1;
        if (Math.abs(pos.current.y) > 3) velocity.y *= -1;
        if (Math.abs(pos.current.z) > 3) velocity.z *= -1;

        meshRef.current.position.copy(pos.current);
    });

    return (
        <group>
            <Trail width={0.5} length={4} color={config.color} attenuation={(t) => t * t}>
                <Sphere ref={meshRef} args={[config.radius, 32, 32]}>
                    <meshStandardMaterial color={config.color} roughness={0.3} metalness={0.2} emissive={config.color} emissiveIntensity={0.2} />
                </Sphere>
            </Trail>
        </group>
    );
}

function ReactionBox({ reactants, products, isReacted }: { reactants: string[]; products: string[]; isReacted: boolean }) {
    const atomList = useMemo(() => {
        const list: string[] = [];
        // Extract atoms from formulas (simple heuristic)
        const currentList = isReacted ? products : reactants;
        currentList.forEach(formula => {
            // Very simple parsing: split by capital letters
            const matches = formula.match(/[A-Z][a-z]?/g);
            if (matches) list.push(...matches);
        });
        return list;
    }, [reactants, products, isReacted]);

    const atoms = useMemo(() => {
        return atomList.map((type, i) => ({
            id: i,
            type,
            position: [
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            ] as [number, number, number],
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            )
        }));
    }, [atomList]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#blue" />

            {atoms.map((atom) => (
                <Atom key={atom.id} type={atom.type} initialPosition={atom.position} velocity={atom.velocity} />
            ))}

            {/* Container Visualization */}
            <mesh>
                <boxGeometry args={[7, 7, 7]} />
                <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.1} />
            </mesh>

            <Environment preset="city" />
            <ContactShadows opacity={0.4} scale={10} blur={2} far={10} resolution={256} color="#000000" />
        </>
    );
}

export default function ChemicalReaction3D({
    reactants,
    products,
    isReacted = false
}: {
    reactants: string[];
    products: string[];
    isReacted?: boolean
}) {
    return (
        <div className="w-full h-full min-h-[400px] relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ReactionBox reactants={reactants} products={products} isReacted={isReacted} />
            </Canvas>

            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <span className="text-[10px] font-black tracking-widest uppercase text-white/80">
                    {isReacted ? "POST-REACTION STATE" : "SYSTEM STABILIZING..."}
                </span>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="px-3 py-1 bg-white/10 rounded border border-white/20 text-[9px] font-mono">
                    TEMP: 298.15 K
                </div>
                <div className="px-3 py-1 bg-white/10 rounded border border-white/20 text-[9px] font-mono">
                    PRESSURE: 101.3 kPa
                </div>
            </div>
        </div>
    );
}
