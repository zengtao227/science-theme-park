"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";


interface CellCanvasProps {
    selectedOrganelle: string | null;
    onSelectOrganelle: (id: string | null) => void;
    showCutaway: boolean;
    translations: any;
}

function Nucleus({ selected, onClick, translations }: { selected: boolean; onClick: () => void; translations: any }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const data = translations.organelles.nucleus;

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} onClick={onClick}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshPhysicalMaterial
                color="#a855f7"
                emissive="#a855f7"
                emissiveIntensity={selected ? 0.8 : 0.3}
                transparent
                opacity={0.8}
                roughness={0.2}
            />
            {selected && (
                <Html position={[0, 1.8, 0]} center>
                    <div className="bg-purple-900/90 border border-purple-400 px-3 py-2 rounded text-purple-200 text-sm whitespace-nowrap">
                        <div className="font-bold uppercase">{data.name}</div>
                        <div className="text-xs">{data.func}</div>
                    </div>
                </Html>
            )}
        </mesh>
    );
}

function Mitochondria({ position, selected, onClick, translations }: { position: [number, number, number]; selected: boolean; onClick: () => void; translations: any }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const data = translations.organelles.mitochondria;

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} position={position} onClick={onClick}>
            <capsuleGeometry args={[0.2, 0.6, 8, 16]} />
            <meshPhysicalMaterial
                color="#ff2d7d"
                emissive="#ff2d7d"
                emissiveIntensity={selected ? 0.8 : 0.3}
                transparent
                opacity={0.9}
            />
            {selected && (
                <Html position={[0, 0.8, 0]} center>
                    <div className="bg-pink-900/90 border border-pink-400 px-3 py-2 rounded text-pink-200 text-sm whitespace-nowrap">
                        <div className="font-bold uppercase">{data.name}</div>
                        <div className="text-xs">{data.func}</div>
                    </div>
                </Html>
            )}
        </mesh>
    );
}

function Ribosome({ position, selected, onClick, translations }: { position: [number, number, number]; selected: boolean; onClick: () => void; translations: any }) {
    const data = translations.organelles.ribosome;
    return (
        <mesh position={position} onClick={onClick}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshPhysicalMaterial
                color="#39ff14"
                emissive="#39ff14"
                emissiveIntensity={selected ? 1.0 : 0.5}
                transparent
                opacity={0.9}
            />
            {selected && (
                <Html position={[0, 0.4, 0]} center>
                    <div className="bg-green-900/90 border border-green-400 px-3 py-2 rounded text-green-200 text-sm whitespace-nowrap">
                        <div className="font-bold uppercase">{data.name}</div>
                        <div className="text-xs">{data.func}</div>
                    </div>
                </Html>
            )}
        </mesh>
    );
}

function GolgiApparatus({ selected, onClick, translations }: { selected: boolean; onClick: () => void; translations: any }) {
    const data = translations.organelles.golgi;
    return (
        <mesh position={[1.5, -0.5, 1]} onClick={onClick}>
            <boxGeometry args={[0.8, 0.3, 0.6]} />
            <meshPhysicalMaterial
                color="#ffd166"
                emissive="#ffd166"
                emissiveIntensity={selected ? 0.8 : 0.3}
                transparent
                opacity={0.85}
            />
            {selected && (
                <Html position={[0, 0.6, 0]} center>
                    <div className="bg-amber-900/90 border border-amber-400 px-3 py-2 rounded text-amber-200 text-sm whitespace-nowrap">
                        <div className="font-bold uppercase">{data.name}</div>
                        <div className="text-xs">{data.func}</div>
                    </div>
                </Html>
            )}
        </mesh>
    );
}

function EndoplasmicReticulum({ selected, onClick, translations }: { selected: boolean; onClick: () => void; translations: any }) {
    const data = translations.organelles.er;
    return (
        <mesh position={[-1.5, 0.5, 1]} onClick={onClick}>
            <torusGeometry args={[0.5, 0.15, 16, 32]} />
            <meshPhysicalMaterial
                color="#00e5ff"
                emissive="#00e5ff"
                emissiveIntensity={selected ? 0.8 : 0.3}
                transparent
                opacity={0.85}
            />
            {selected && (
                <Html position={[0, 0.8, 0]} center>
                    <div className="bg-cyan-900/90 border border-cyan-400 px-3 py-2 rounded text-cyan-200 text-sm whitespace-nowrap">
                        <div className="font-bold uppercase">{data.name}</div>
                        <div className="text-xs">{data.func}</div>
                    </div>
                </Html>
            )}
        </mesh>
    );
}

function CellMembrane({ showCutaway }: { showCutaway: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[3.5, 64, 64, 0, Math.PI * 2, 0, showCutaway ? Math.PI * 0.7 : Math.PI]} />
            <meshPhysicalMaterial
                color="#00e5ff"
                emissive="#00e5ff"
                emissiveIntensity={0.1}
                transparent
                opacity={0.15}
                side={THREE.DoubleSide}
                roughness={0.1}
            />
        </mesh>
    );
}

function Scene({ selectedOrganelle, onSelectOrganelle, showCutaway, translations }: CellCanvasProps) {
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <CellMembrane showCutaway={showCutaway} />

            <Nucleus
                selected={selectedOrganelle === "nucleus"}
                onClick={() => onSelectOrganelle(selectedOrganelle === "nucleus" ? null : "nucleus")}
                translations={translations}
            />

            <Mitochondria
                position={[2, 0.5, 0.5]}
                selected={selectedOrganelle === "mitochondria1"}
                onClick={() => onSelectOrganelle(selectedOrganelle === "mitochondria1" ? null : "mitochondria1")}
                translations={translations}
            />
            <Mitochondria
                position={[-2, -0.5, -0.5]}
                selected={selectedOrganelle === "mitochondria2"}
                onClick={() => onSelectOrganelle(selectedOrganelle === "mitochondria2" ? null : "mitochondria2")}
                translations={translations}
            />

            <Ribosome
                position={[1, 1, 1]}
                selected={selectedOrganelle === "ribosome1"}
                onClick={() => onSelectOrganelle(selectedOrganelle === "ribosome1" ? null : "ribosome1")}
                translations={translations}
            />
            <Ribosome
                position={[-1, 1, -1]}
                selected={selectedOrganelle === "ribosome2"}
                onClick={() => onSelectOrganelle(selectedOrganelle === "ribosome2" ? null : "ribosome2")}
                translations={translations}
            />
            <Ribosome
                position={[1, -1, -1]}
                selected={selectedOrganelle === "ribosome3"}
                onClick={() => onSelectOrganelle(selectedOrganelle === "ribosome3" ? null : "ribosome3")}
                translations={translations}
            />

            <GolgiApparatus
                selected={selectedOrganelle === "golgi"}
                onClick={() => onSelectOrganelle(selectedOrganelle === "golgi" ? null : "golgi")}
                translations={translations}
            />

            <EndoplasmicReticulum
                selected={selectedOrganelle === "er"}
                onClick={() => onSelectOrganelle(selectedOrganelle === "er" ? null : "er")}
                translations={translations}
            />

            <OrbitControls enablePan={true} enableZoom={true} />
        </>
    );
}

export default function CellCanvas(props: CellCanvasProps) {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Scene {...props} />
            </Canvas>
        </div>
    );
}
