"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, RigidBodyProps, useRapier } from "@react-three/rapier";
import { OrbitControls, Environment, Text, useTexture, Box, useCursor } from "@react-three/drei";
import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/i18n';
import { useGesture } from '@use-gesture/react';
import { RefreshCcw, ArrowLeft, Check, AlertTriangle } from 'lucide-react';

// --- PHYSICS COMPONENTS ---

// Draggable Weight Component
// Uses useGesture + Plane raycasting to follow mouse
function DraggableWeight({ position, mass, color = "#ffa500", label, onDrop, isX = false }: {
    position: [number, number, number],
    mass: number,
    color?: string,
    label?: string,
    onDrop?: (droppedPos: THREE.Vector3) => void,
    isX?: boolean
}) {
    const rigidBodyRef = useRef<any>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useCursor(hovered, 'grab', 'auto');

    // Create an invisible plane at the object's height for raycasting during drag
    // Or simply map mouse movement to 3D world coordinates on a plane facing camera

    const bind = useGesture({
        onDragStart: () => {
            setActive(true);
            // Wake up body and set to kinematic to follow mouse
            if (rigidBodyRef.current) {
                rigidBodyRef.current.setBodyType(2); // KinematicPosition based
                rigidBodyRef.current.wakeUp();
            }
        },
        onDrag: ({ offset: [x, y], event }) => {
            // This is 2D drag. We need 3D projection.
            // Let's rely on standard r3f raycaster logic via event.point in onPointerMove?
            // Actually, combining useGesture with R3F events is tricky for beginners.
            // Better approach: use Three.js DragControls or a simple Plane intersection logic.
            // Let's try the simple R3F event way:
        },
        onDragEnd: () => {
            setActive(false);
            if (rigidBodyRef.current) {
                rigidBodyRef.current.setBodyType(0); // Dynamic again
                rigidBodyRef.current.wakeUp();
                // Check drop position logic handled by physics or specific callback?
                // For now, let physics handle the fall!
            }
        }
    });

    // Simplified Drag Logic using R3F events
    // We use a ref to track if we are dragging
    const isDragging = useRef(false);

    // We need a plane to drag along. Let's assume a plane at z=0 for simplicity in this view?
    // But the camera is at z=12. 

    return (
        <RigidBody
            ref={rigidBodyRef}
            position={position}
            colliders="hull"
            restitution={0.2}
            friction={1}
            canSleep={false}
            // Physics properties
            linearDamping={0.5}
            angularDamping={0.5}
        >
            <mesh
                ref={meshRef}
                castShadow
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onPointerDown={(e) => {
                    // Start Drag
                    e.target.setPointerCapture(e.pointerId);
                    isDragging.current = true;
                    if (rigidBodyRef.current) rigidBodyRef.current.setBodyType(2); // Kinematic
                }}
                onPointerUp={(e) => {
                    // End Drag
                    e.target.releasePointerCapture(e.pointerId);
                    isDragging.current = false;
                    if (rigidBodyRef.current) {
                        rigidBodyRef.current.setBodyType(0); // Dynamic
                        rigidBodyRef.current.setLinvel({ x: 0, y: -1, z: 0 }, true); // Slight drop impulse
                    }

                    // Check if dropped out of bounds (simple y check?)
                    if (onDrop) onDrop(new THREE.Vector3(e.point.x, e.point.y, e.point.z));
                }}
                onPointerMove={(e) => {
                    if (isDragging.current && rigidBodyRef.current) {
                        // Determine new position: Intersection with a plane at z=0
                        // We just use the point of intersection with the "invisible drag plane" 
                        // But e.point is on the object surface if not captured carefully.

                        // Better: Direct manipulation
                        // Since camera is static, we can map mouse roughly

                        // Let's use the provided point but lock z? 
                        // Or better, just follow the event point but add an offset?

                        // Simplified "Magic Magnet" movement
                        const newPos = e.point;
                        // We lift it up slightly towards camera to avoid clipping
                        rigidBodyRef.current.setNextKinematicTranslation({ x: newPos.x, y: newPos.y, z: 0 });
                    }
                }}
            >
                {isX ? <boxGeometry args={[1, 1, 1]} /> : <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />}
                <meshStandardMaterial
                    color={isDragging.current ? "#fff" : (hovered ? "#ffecb3" : color)}
                    emissive={isDragging.current || hovered ? color : "#000"}
                    emissiveIntensity={isDragging.current ? 1 : (hovered ? 0.5 : 0)}
                    roughness={0.2}
                    metalness={0.9}
                    transparent={active}
                    opacity={active ? 0.8 : 1}
                />
            </mesh>
            {label && (
                <Text position={[0, 0.6, 0]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
                    {label}
                </Text>
            )}
        </RigidBody>
    );
}

// Draggable Helper wrapper:
// We need a plane to catch mouse events for smooth dragging when cursor leaves the object
function DragPlane() {
    return (
        <mesh visible={false} position={[0, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial transparent opacity={0} />
        </mesh>
    )
}

// The Scale Beam Component with Physics Joints??
// For the "Click to remove" version, we faked it.
// For "True Drag & Drop", we need REAl PHYSICS or a very clever fake.
// Writing a stable physics scale in Rapier in 5 mins is risky (instability).
// STRATEGY: 
// We keep the "Cinematic" Scale that reacts to strict logic states (count of weights).
// BUT we make the weights "Physical" when dropped.
// 
// When a weight is "In the Pan" (by logic), it is Kinematically attached or simply rendered there.
// When "Dragged", it becomes dynamic.
// 
// Actually, let's try a Hybrid:
// The Pans are Sensor Zones.
// If a weight is dropped inside Zone Left, we increment Left Count and snap it to a grid.
// If dragged out, we decrement.
// This is robust and satisfying.

function SnapZone({ position, onEnter, onLeave }: { position: [number, number, number], onEnter: () => void, onLeave: () => void }) {
    return (
        <CuboidCollider
            position={position}
            args={[1.5, 2, 0.5]}
            sensor
            onIntersectionEnter={(payload) => {
                // If weight enters?
                // We identify weights by userData or name?
                // For MVP, assume anything entering is a weight
                // console.log("Enter", payload);
                onEnter();
            }}
            onIntersectionExit={(payload) => {
                //   console.log("Exit", payload);
                onLeave();
            }}
        />
    )
}

// --- MAIN PAGE REFACTOR ---

export default function EquilibriumScalePage() {
    const { currentLanguage } = useAppStore();
    const t = translations[currentLanguage].scale;

    // State
    const [leftWeights, setLeftWeights] = useState(3);
    const [rightWeights, setRightWeights] = useState(8);
    const [status, setStatus] = useState<'BALANCED' | 'UNBALANCED' | 'SUCCESS'>('BALANCED');

    // We need to track WHICH specific items are where?
    // Let's assume we have a pool of weights.
    // 3 on left, 8 on right.
    // We render them.
    // When one is dragged OUT of the zone, count decreases. 
    // If dropped IN, count increases.

    // Actually, for this specific puzzle (Equation), we only need "Remove". 
    // Adding weights back isn't the primary mechanic to solve X + 3 = 8.
    // But for a sandbox feel, we should allow it.

    // Let's implement the VISUAL only first with the "click to remove" logic, 
    // but now add the "Drag to Remove" logic:
    // User drags weight -> raycaster detects it -> weight follows mouse -> 
    // If mouse released outside pan -> remove weight from count -> weight falls into abyss -> respawn in "trash" or just disappear.

    // Simpler: 
    // Weights are just visuals generated by the state counts.
    // But we want to drag them.
    // So we map: Array of IDs.

    const [leftItems, setLeftItems] = useState<number[]>([1, 1, 1]); // 3 weights
    const [rightItems, setRightItems] = useState<number[]>([1, 1, 1, 1, 1, 1, 1, 1]); // 8 weights

    // Calculate Balance
    useEffect(() => {
        const leftMass = 5 + leftItems.length; // X=5
        const rightMass = rightItems.length;

        if (leftMass === rightMass) {
            if (leftItems.length === 0 && rightItems.length === 5) {
                setStatus('SUCCESS');
            } else {
                setStatus('BALANCED');
            }
        } else {
            setStatus('UNBALANCED');
        }
    }, [leftItems, rightItems]);

    const handleDropLeft = (index: number) => {
        // Remove from array
        const newItems = [...leftItems];
        newItems.splice(index, 1);
        setLeftItems(newItems);
    };

    const handleDropRight = (index: number) => {
        // Remove from array
        const newItems = [...rightItems];
        newItems.splice(index, 1);
        setRightItems(newItems);
    };

    const reset = () => {
        setLeftItems([1, 1, 1]);
        setRightItems([1, 1, 1, 1, 1, 1, 1, 1]);
    };

    // Purely visual tilt
    const tilt = useMemo(() => {
        const diff = rightItems.length - (leftItems.length + 5);
        return Math.max(-0.4, Math.min(0.4, diff * 0.05));
    }, [leftItems, rightItems]);

    return (
        <div className="w-full h-screen bg-black text-white overflow-hidden relative font-sans">

            {/* 3D Viewport */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 to-black">
                <Canvas shadows camera={{ position: [0, 2, 12], fov: 45 }}>
                    <Suspense fallback={null}>
                        <LabEnvironment />
                        <Physics gravity={[0, -9.81, 0]}>

                            {/* The Scale Rig */}
                            <ScaleBeam leftCount={leftItems.length} rightCount={rightItems.length} tilt={tilt} />

                            {/* The X Box (Left Pan) */}
                            <RigidBody position={[-3.5, (tilt * -3.5) - 2, 0]} type="kinematicPosition">
                                <mesh>
                                    <boxGeometry args={[1, 1, 1]} />
                                    <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.8} />
                                </mesh>
                                <Text position={[0, 1.2, 0]} fontSize={0.5} color="cyan">X</Text>
                            </RigidBody>

                            {/* Left Weights */}
                            {leftItems.map((_, i) => (
                                <DraggableWeight
                                    key={`l-${i}`}
                                    position={[-3.5 + (i * 0.2), (tilt * -3.5) - 1.5 + (i * 0.4), 0]}
                                    mass={1}
                                    onDrop={() => handleDropLeft(i)}
                                />
                            ))}

                            {/* Right Weights */}
                            {rightItems.map((_, i) => (
                                <DraggableWeight
                                    key={`r-${i}`}
                                    position={[3.5 - (i * 0.2), (tilt * 3.5) - 1.5 + (i * 0.4), 0]}
                                    mass={1}
                                    color="#ffa500"
                                    onDrop={() => handleDropRight(i)}
                                />
                            ))}

                            {/* Floor to catch falling weights */}
                            <RigidBody type="fixed" position={[0, -10, 0]}>
                                <mesh visible={false}><boxGeometry args={[100, 1, 100]} /></mesh>
                            </RigidBody>

                        </Physics>
                        <OrbitControls makeDefault minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} maxDistance={20} minDistance={5} />
                    </Suspense>
                </Canvas>
            </div>

            {/* --- HUD OVERLAY --- */}
            <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">

                {/* Top Bar */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <Link href="/" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-green-500 transition-colors uppercase tracking-widest group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        {t.back}
                    </Link>
                    <button onClick={reset} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-cyan-500 transition-colors uppercase tracking-widest group">
                        <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                        RESET SIMULATION
                    </button>
                </div>

                {/* Center Messages */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center pointer-events-none flex flex-col items-center gap-4">
                    <h1 className="text-3xl font-bold tracking-tighter text-white neon-text-green bg-black/50 px-4 py-1 rounded backdrop-blur-sm">{t.title}</h1>

                    {status === 'UNBALANCED' && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-red-900/40 border border-red-500 text-red-400 rounded animate-pulse">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-xs font-mono tracking-widest uppercase">{t.status_unbalanced}</span>
                        </div>
                    )}

                    {status === 'SUCCESS' && (
                        <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
                            <div className="px-8 py-6 bg-green-900/40 border border-green-500 rounded-lg backdrop-blur-xl shadow-[0_0_100px_rgba(0,255,157,0.3)]">
                                <h2 className="text-6xl font-black text-white tracking-tighter mb-2">X = 5</h2>
                                <div className="h-px w-full bg-green-500/50 mb-2" />
                                <p className="font-mono text-green-400 text-sm">EQUILIBRIUM RESTORED</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Tip */}
                <div className="w-full text-center pb-8 opacity-50">
                    <p className="text-[10px] uppercase tracking-widest font-mono text-gray-400">
                        DRAG WEIGHTS OFF THE PAN TO REMOVE THEM
                    </p>
                </div>

            </div>
        </div>
    );
}


// --- Helper Components copied from previous file (Need to ensure they exist) ---
function ScaleBeam({ leftCount, rightCount, tilt }: { leftCount: number, rightCount: number, tilt: number }) {
    return (
        <group position={[0, 1, 0]} rotation={[0, 0, tilt]}>
            {/* Main Beam */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 8, 0.4]} />
                <meshStandardMaterial color="#333" roughness={0.5} metalness={0.8} />
            </mesh>

            {/* Cross bar details */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.3]} />
                <meshStandardMaterial color="#555" metalness={1} roughness={0.2} />
            </mesh>

            {/* Left Pan Assembly */}
            <group position={[-3.5, 0, 0]}>
                <mesh position={[0, -1.5, 0]}> {/* The String */}
                    <cylinderGeometry args={[0.02, 0.02, 3]} />
                    <meshStandardMaterial color="#888" />
                </mesh>
                <mesh position={[0, -3, 0]}> {/* The Pan */}
                    <cylinderGeometry args={[1.5, 1.2, 0.2, 32]} />
                    <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} transparent opacity={0.9} />
                </mesh>
                <mesh position={[0, -3.1, 0]}> {/* Glow Ring */}
                    <torusGeometry args={[1.2, 0.02, 16, 32]} />
                    <meshBasicMaterial color="cyan" toneMapped={false} />
                </mesh>
            </group>

            {/* Right Pan Assembly */}
            <group position={[3.5, 0, 0]}>
                <mesh position={[0, -1.5, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 3]} />
                    <meshStandardMaterial color="#888" />
                </mesh>
                <mesh position={[0, -3, 0]}>
                    <cylinderGeometry args={[1.5, 1.2, 0.2, 32]} />
                    <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} transparent opacity={0.9} />
                </mesh>
                <mesh position={[0, -3.1, 0]}>
                    <torusGeometry args={[1.2, 0.02, 16, 32]} />
                    <meshBasicMaterial color="orange" toneMapped={false} />
                </mesh>
            </group>
        </group>
    );
}

function LabEnvironment() {
    return (
        <>
            <Environment preset="city" />
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff9d" distance={50} />
            <pointLight position={[-10, 5, -10]} intensity={1} color="#00d2ff" distance={50} />
            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} castShadow shadowBias={-0.0001} />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
            </mesh>

            <gridHelper args={[100, 50, 0x333333, 0x111111]} position={[0, -4.99, 0]} />
        </>
    );
}
