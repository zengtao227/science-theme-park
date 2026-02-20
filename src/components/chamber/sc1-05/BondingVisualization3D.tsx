"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Sphere,
    OrbitControls,
    Float,
    Html,
    Environment,
    ContactShadows,
    PerspectiveCamera,
    Trail,
    Text
} from "@react-three/drei";
import * as THREE from "three";
import { Zap, Share2, Waves, Activity } from "lucide-react";
import { clsx } from "clsx";

interface BondingVisualization3DProps {
    type: "IONIC" | "COVALENT" | "METALLIC";
}

function IonicBonding() {
    const electronRef = useRef<THREE.Mesh>(null!);
    const [stage, setStage] = useState<'approaching' | 'transfer' | 'balanced'>('approaching');

    useFrame((state) => {
        const t = state.clock.elapsedTime % 6;
        if (t < 2) setStage('approaching');
        else if (t < 4) setStage('transfer');
        else setStage('balanced');

        if (electronRef.current) {
            if (t < 2) {
                electronRef.current.position.set(-1.5 + (t / 2) * 0.5, 0, 0);
                electronRef.current.scale.setScalar(1);
            } else if (t < 4) {
                const progress = (t - 2) / 2;
                electronRef.current.position.set(-1 + progress * 2, Math.sin(progress * Math.PI) * 0.5, 0);
            } else {
                electronRef.current.position.set(1, 0, 0);
                electronRef.current.scale.setScalar(0.8);
            }
        }
    });

    return (
        <group>
            {/* Sodium Ion */}
            <group position={[-2, 0, 0]}>
                <Sphere args={[0.7, 32, 32]}>
                    <meshPhongMaterial color="#ab5cf2" emissive="#ab5cf2" emissiveIntensity={0.2} transparent opacity={0.9} />
                </Sphere>
                <Html position={[0, 1, 0]} center>
                    <div className="text-[10px] font-black text-purple-400 font-mono">Na+</div>
                </Html>
            </group>

            {/* Chlorine Ion */}
            <group position={[2, 0, 0]}>
                <Sphere args={[1.1, 32, 32]}>
                    <meshPhongMaterial color="#1ff01f" emissive="#1ff01f" emissiveIntensity={0.1} transparent opacity={0.8} />
                </Sphere>
                <Html position={[0, 1.4, 0]} center>
                    <div className="text-[10px] font-black text-green-400 font-mono">Cl-</div>
                </Html>
            </group>

            {/* Transferring Electron */}
            <Sphere ref={electronRef} args={[0.1, 16, 16]} position={[-1.5, 0, 0]}>
                <meshBasicMaterial color="#fff" />
                <pointLight intensity={1} distance={2} color="#fff" />
            </Sphere>

            <Text position={[0, -2, 0]} fontSize={0.2} color="white">
                ELECTROSTATIC ATTRACTION
            </Text>
        </group>
    );
}

function CovalentBonding() {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    });

    return (
        <group ref={groupRef}>
            {/* Two Oxygen Atoms */}
            <group position={[-1.2, 0, 0]}>
                <Sphere args={[0.8, 32, 32]}>
                    <meshStandardMaterial color="#ff0000" roughness={0.3} metalness={0.2} />
                </Sphere>
            </group>
            <group position={[1.2, 0, 0]}>
                <Sphere args={[0.8, 32, 32]}>
                    <meshStandardMaterial color="#ff0000" roughness={0.3} metalness={0.2} />
                </Sphere>
            </group>

            {/* Shared Electron Cloud */}
            <mesh position={[0, 0, 0]} scale={[2.5, 1.2, 1.2]}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.1} wireframe />
            </mesh>

            {/* Orbiting shared electrons */}
            <Float speed={5} rotationIntensity={2} floatIntensity={1}>
                <Sphere args={[0.1, 16, 16]} position={[0, 0.5, 0.5]}>
                    <meshBasicMaterial color="#00e5ff" />
                </Sphere>
                <Sphere args={[0.1, 16, 16]} position={[0, -0.5, -0.5]}>
                    <meshBasicMaterial color="#00e5ff" />
                </Sphere>
            </Float>
        </group>
    );
}

function MetallicBonding() {
    const electrons = useMemo(() => {
        return Array.from({ length: 40 }).map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            ),
            speed: 1 + Math.random() * 2
        }));
    }, []);

    return (
        <group>
            {/* Grid of Ions */}
            {Array.from({ length: 9 }).map((_, i) => (
                <group key={i} position={[(i % 3 - 1) * 2, (Math.floor(i / 3) % 3 - 1) * 2, 0]}>
                    <Sphere args={[0.4, 16, 16]}>
                        <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
                    </Sphere>
                    <Html center>
                        <div className="text-[8px] font-black text-white/40">+</div>
                    </Html>
                </group>
            ))}

            {/* Electron Sea */}
            {electrons.map((e, i) => (
                <ElectronParticle key={i} {...e} />
            ))}
        </group>
    );
}

function ElectronParticle({ position, speed }: { position: THREE.Vector3; speed: number }) {
    const ref = useRef<THREE.Mesh>(null!);
    const pos = useRef(position.clone());

    useFrame((state, delta) => {
        pos.current.x += speed * delta;
        if (pos.current.x > 4) pos.current.x = -4;
        ref.current.position.copy(pos.current);
    });

    return (
        <Sphere ref={ref} args={[0.04, 8, 8]}>
            <meshBasicMaterial color="#00e5ff" />
        </Sphere>
    );
}

function Scene({ type }: { type: "IONIC" | "COVALENT" | "METALLIC" }) {
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[0, 10, 0]} intensity={2} angle={0.3} penumbra={1} castShadow />

            {type === "IONIC" && <IonicBonding />}
            {type === "COVALENT" && <CovalentBonding />}
            {type === "METALLIC" && <MetallicBonding />}

            <OrbitControls enablePan={false} minDistance={4} maxDistance={12} />
            <Environment preset="night" />
            <ContactShadows opacity={0.6} scale={15} blur={1} far={10} resolution={256} color="#000000" />
        </>
    );
}

export default function BondingVisualization3D({ type }: BondingVisualization3DProps) {
    return (
        <div className="w-full h-full min-h-[400px] relative rounded-3xl overflow-hidden bg-[#050505] border border-white/5 shadow-2xl group transition-all duration-700">
            <Canvas shadows camera={{ position: [0, 2, 8], fov: 40 }}>
                <Scene type={type} />
            </Canvas>

            {/* HUD Info */}
            <div className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-2xl px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-4">
                    <div className={clsx(
                        "p-2 rounded-xl transition-all duration-500",
                        "bg-neon-cyan/20 animate-pulse"
                    )}>
                        {type === "IONIC" && <Zap className="w-4 h-4 text-neon-cyan" />}
                        {type === "COVALENT" && <Share2 className="w-4 h-4 text-neon-cyan" />}
                        {type === "METALLIC" && <Waves className="w-4 h-4 text-neon-cyan" />}
                    </div>
                    <div>
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-white/30 block mb-0.5">Bonding_Matrix_v1</span>
                        <span className="text-xs font-bold text-white font-mono uppercase tracking-tighter">
                            {type} Interaction Active
                        </span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 right-6">
                <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest text-right">
                    Bsl_Chem_Engine_Render<br />
                    V_Bond_v4.2
                </div>
            </div>
        </div>
    );
}
