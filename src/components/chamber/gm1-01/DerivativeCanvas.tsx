"use client";

import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Grid, Float, Line } from "@react-three/drei";
import * as THREE from "three";

interface DerivativeCanvasProps {
    mode: string;
    exploreX: number;
    _onExploreXChange: (x: number) => void;
    questData?: {
        type?: string;
        func?: string;
        xPoint?: number;
        x0?: number;
        y0?: number;
        x1?: number;
        y1?: number;
        x2?: number;
        y2?: number;
        correctSlope?: number;
    };
}

const palette = {
    purple: "#a855f7",
    cyan: "#00e5ff",
    green: "#39ff14",
    pink: "#ff2d7d",
    white: "#ffffff",
    muted: "#1a1a2e"
};

// 3D Riemann Forest: Visualizing integration as 3D columns with subdivision
function RiemannForest({
    func,
    xRange,
    steps = 20,
    subdivisionLevel = 1,
    isGrowing = false
}: {
    func: (x: number) => number;
    xRange: [number, number];
    steps?: number;
    subdivisionLevel?: number;
    isGrowing?: boolean;
}) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummyRef = useRef(new THREE.Object3D());
    const dummy = dummyRef.current;
    const growthProgress = useRef(0);

    // Adaptive subdivision - more steps = thinner slices
    const actualSteps = Math.min(steps * subdivisionLevel, 200);
    const count = actualSteps;
    const width = (xRange[1] - xRange[0]) / actualSteps;

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const time = clock.getElapsedTime();

        // Growth animation
        if (isGrowing) {
            growthProgress.current = Math.min(growthProgress.current + 0.02, 1);
        }

        for (let i = 0; i < count; i++) {
            const x = xRange[0] + i * width + width / 2;
            const h = func(x);

            // Crystallization effect - columns grow from bottom
            const growthFactor = isGrowing ? growthProgress.current : 1;
            const actualHeight = h * growthFactor;

            dummy.position.set(x, actualHeight / 2, 0);
            dummy.scale.set(width * 0.9, actualHeight, width * 0.9);

            // Pulse effect - more subtle as subdivision increases
            const pulseIntensity = 0.05 / Math.sqrt(subdivisionLevel);
            const pulse = 1 + Math.sin(time * 2 + i * 0.5) * pulseIntensity;
            dummy.scale.y *= pulse;

            // Shimmer effect during subdivision
            const shimmer = 1 + Math.sin(time * 5 + i * 0.2) * 0.02;
            dummy.scale.x *= shimmer;
            dummy.scale.z *= shimmer;

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    // Opacity increases as columns get thinner (approaching solid)
    const opacity = Math.min(0.3 + (subdivisionLevel - 1) * 0.1, 0.7);
    const emissiveIntensity = Math.min(0.2 + (subdivisionLevel - 1) * 0.05, 0.5);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial
                color={palette.purple}
                emissive={palette.purple}
                emissiveIntensity={emissiveIntensity}
                transparent
                opacity={opacity}
                transmission={0.5}
                thickness={0.5}
                metalness={0.8}
                roughness={0.2}
            />
        </instancedMesh>
    );
}

// Ghost Probe at x+h with dynamic secant beam
function GhostProbe({
    x,
    h,
    func,
    color = palette.pink
}: {
    x: number;
    h: number;
    func: (x: number) => number;
    color?: string;
}) {
    const probeRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!probeRef.current) return;
        const pulse = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.15;
        probeRef.current.scale.setScalar(pulse);
    });

    const y1 = func(x);
    const y2 = func(x + h);

    // Secant slope
    const secantSlope = h !== 0 ? (y2 - y1) / h : 0;

    // Opacity based on h - more transparent as h approaches 0
    const opacity = Math.min(Math.abs(h) * 2, 0.8);

    return (
        <group>
            {/* Ghost probe sphere */}
            <group ref={probeRef} position={[x + h, y2, 0.35]}>
                <mesh>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshPhysicalMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={1.5}
                        transparent
                        opacity={opacity}
                    />
                </mesh>

                {/* Ghost glow */}
                <mesh>
                    <sphereGeometry args={[0.25, 16, 16]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={opacity * 0.2}
                    />
                </mesh>
            </group>

            {/* Secant beam connecting the two points */}
            <Line
                points={[
                    new THREE.Vector3(x, y1, 0.2),
                    new THREE.Vector3(x + h, y2, 0.2)
                ]}
                color={color}
                lineWidth={3}
                transparent
                opacity={opacity}
            />

            {/* Secant glow */}
            <Line
                points={[
                    new THREE.Vector3(x, y1, 0.2),
                    new THREE.Vector3(x + h, y2, 0.2)
                ]}
                color={color}
                lineWidth={8}
                transparent
                opacity={opacity * 0.3}
            />

            {/* Vertical drop lines */}
            <Line
                points={[
                    new THREE.Vector3(x, 0, 0),
                    new THREE.Vector3(x, y1, 0)
                ]}
                color={palette.cyan}
                lineWidth={1}
                transparent
                opacity={0.3}
                dashed
                dashScale={2}
            />
            <Line
                points={[
                    new THREE.Vector3(x + h, 0, 0),
                    new THREE.Vector3(x + h, y2, 0)
                ]}
                color={color}
                lineWidth={1}
                transparent
                opacity={opacity * 0.3}
                dashed
                dashScale={2}
            />

            {/* h distance indicator */}
            {Math.abs(h) > 0.1 && (
                <group>
                    <Line
                        points={[
                            new THREE.Vector3(x, -0.5, 0),
                            new THREE.Vector3(x + h, -0.5, 0)
                        ]}
                        color={palette.white}
                        lineWidth={2}
                        transparent
                        opacity={0.5}
                    />
                    <Text
                        position={[x + h / 2, -0.8, 0]}
                        fontSize={0.2}
                        color={palette.white}
                        anchorX="center"
                    >
                        h = {h.toFixed(3)}
                    </Text>
                </group>
            )}

            {/* Secant slope label */}
            {Math.abs(h) > 0.05 && (
                <Text
                    position={[x + h / 2, (y1 + y2) / 2 + 0.5, 0]}
                    fontSize={0.2}
                    color={color}
                    anchorX="center"
                >
                    m = {secantSlope.toFixed(3)}
                </Text>
            )}
        </group>
    );
}

// Precision Lock Effect - Spatial ripple when correct slope is achieved
function PrecisionLockEffect({
    x,
    y,
    isLocked
}: {
    x: number;
    y: number;
    isLocked: boolean;
}) {
    const ringsRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!isLocked || !ringsRef.current || !coreRef.current) return;

        const time = clock.getElapsedTime();

        // Pulsing core
        const pulse = 1 + Math.sin(time * 6) * 0.3;
        coreRef.current.scale.setScalar(pulse);

        // Expanding ripple rings
        ringsRef.current.children.forEach((ring, i) => {
            const offset = i * 0.4;
            const scale = 1 + ((time * 3 + offset) % 3);
            const opacity = 1 - ((time * 3 + offset) % 3) / 3;
            ring.scale.setScalar(scale);
            (ring as THREE.Mesh).material = new THREE.MeshBasicMaterial({
                color: palette.green,
                transparent: true,
                opacity: opacity * 0.5,
                side: THREE.DoubleSide
            });
        });
    });

    if (!isLocked) return null;

    return (
        <group position={[x, y, 0.5]}>
            {/* Core flash */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.3, 24, 24]} />
                <meshBasicMaterial
                    color={palette.green}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Expanding ripple rings */}
            <group ref={ringsRef}>
                {[0, 1, 2, 3].map((i) => (
                    <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[0.5, 0.55, 32]} />
                        <meshBasicMaterial
                            color={palette.green}
                            transparent
                            opacity={0.5}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ))}
            </group>

            {/* Particle burst */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 0.8;
                return (
                    <Float key={i} speed={3} rotationIntensity={0} floatIntensity={0.5}>
                        <mesh position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
                            <sphereGeometry args={[0.08, 12, 12]} />
                            <meshBasicMaterial color={palette.green} />
                        </mesh>
                    </Float>
                );
            })}

            {/* Success label */}
            <Float speed={2} rotationIntensity={0} floatIntensity={0.2}>
                <Text
                    position={[0, 1.2, 0]}
                    fontSize={0.3}
                    color={palette.green}
                    anchorX="center"
                >
                    PRECISION LOCKED
                </Text>
            </Float>

            <pointLight color={palette.green} intensity={3} distance={5} />
        </group>
    );
}

function LaserTangent({ x, y, slope, color }: { x: number, y: number, slope: number, color: string }) {
    const angle = Math.atan(slope);
    const length = 6;
    const hudPoint = new THREE.Vector3(5, 3.5, 2);

    return (
        <group position={[x, y, 0.2]}>
            <group rotation={[0, 0, angle]}>
                <Line
                    points={[new THREE.Vector3(-length / 2, 0, 0), new THREE.Vector3(length / 2, 0, 0)]}
                    color={color}
                    lineWidth={4}
                />
                <Line
                    points={[new THREE.Vector3(-length / 2, 0, 0), new THREE.Vector3(length / 2, 0, 0)]}
                    color={palette.cyan}
                    lineWidth={12}
                    transparent
                    opacity={0.2}
                />
            </group>

            <mesh>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>

            <pointLight distance={3} intensity={2} color={color} />

            <Line points={[new THREE.Vector3(0, 0, 0), hudPoint]} color={palette.pink} lineWidth={2} transparent opacity={0.45} />

            <Float speed={2} floatIntensity={0.5}>
                <Text
                    position={hudPoint}
                    fontSize={0.25}
                    color={palette.green}
                    font="/fonts/Inter-Bold.woff"
                    anchorX="left"
                >
                    {`f'(x) = ${slope.toFixed(3)}`}
                </Text>
            </Float>
        </group>
    );
}

// 3D Grid Floor with Pulse
function ScanGrid() {
    return (
        <group rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <Grid
                infiniteGrid
                cellSize={1}
                sectionSize={5}
                fadeDistance={30}
                cellColor="#1a1a2e"
                sectionColor={palette.cyan}
                fadeStrength={1}
            />
        </group>
    );
}

export default function G101_DerivativeCanvas({
    mode,
    exploreX,
    questData
}: DerivativeCanvasProps) {
    const [hValue, setHValue] = useState(1.0);
    const [isScanning, setIsScanning] = useState(false);

    // Derived subdivision level based on h convergence
    const subdivisionLevel = useMemo(() => {
        if (hValue < 0.05) return 5;
        if (hValue < 0.1) return 4;
        if (hValue < 0.2) return 3;
        if (hValue < 0.5) return 2;
        return 1;
    }, [hValue]);
    const userSlope = null; // Placeholder for future logic if needed

    const currentFunc = useMemo(() => {
        if (questData?.func === 'x2') return (x: number) => x * x;
        if (questData?.func === '2x2') return (x: number) => 2 * x * x;
        if (questData?.func === 'x3') return (x: number) => 0.5 * x * x * x;
        return (x: number) => 0.5 * x * x;
    }, [questData]);

    const currentDeriv = useMemo(() => {
        if (questData?.func === 'x2') return (x: number) => 2 * x;
        if (questData?.func === '2x2') return (x: number) => 4 * x;
        if (questData?.func === 'x3') return (x: number) => 1.5 * x * x;
        return (x: number) => x;
    }, [questData]);

    const curvePoints = useMemo(() => {
        const pts = [];
        for (let x = -6; x <= 6; x += 0.1) {
            pts.push(new THREE.Vector3(x, currentFunc(x), 0));
        }
        return pts;
    }, [currentFunc]);

    // Check if user slope is correct (within tolerance)
    const correctSlope = questData?.correctSlope ?? currentDeriv(exploreX);
    const isPrecisionLocked = userSlope !== null && Math.abs(userSlope - correctSlope) < 0.05;

    // Auto-animate h value collapse
    useEffect(() => {
        const interval = setInterval(() => {
            setHValue(prev => {
                const newH = prev * 0.95;
                return newH > 0.01 ? newH : 0.01;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full aspect-square md:aspect-video bg-[#020205] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <Canvas camera={{ position: [8, 6, 12], fov: 45 }}>
                <color attach="background" args={["#010103"]} />
                <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color={palette.purple} />

                    <ScanGrid />

                    {/* Main Function Path */}
                    <Line points={curvePoints} color={palette.cyan} lineWidth={3} />
                    <Line points={curvePoints} color={palette.cyan} lineWidth={10} transparent opacity={0.15} />

                    {/* Riemann Integration View with subdivision */}
                    <RiemannForest
                        func={currentFunc}
                        xRange={[-4, exploreX]}
                        steps={Math.max(5, Math.floor(Math.abs(exploreX + 4) * 4))}
                        subdivisionLevel={subdivisionLevel}
                        isGrowing={isScanning}
                    />

                    {/* Ghost Probe showing limit as h→0 */}
                    {mode === 'EXPLORE' && hValue > 0.02 && (
                        <GhostProbe
                            x={exploreX}
                            h={hValue}
                            func={currentFunc}
                            color={palette.pink}
                        />
                    )}

                    {/* Dynamic Calculus HUD elements */}
                    {mode === 'EXPLORE' && (
                        <>
                            <LaserTangent
                                x={exploreX}
                                y={currentFunc(exploreX)}
                                slope={currentDeriv(exploreX)}
                                color={palette.green}
                            />

                            {/* Show precision lock when h is very small */}
                            {hValue < 0.05 && (
                                <PrecisionLockEffect
                                    x={exploreX}
                                    y={currentFunc(exploreX)}
                                    isLocked={true}
                                />
                            )}
                        </>
                    )}

                    {/* Quest Mode specific visualizations */}
                    {(questData?.type === 'TANGENT' || questData?.type === 'SLOPE') && (
                        <>
                            <LaserTangent
                                x={exploreX}
                                y={currentFunc(exploreX)}
                                slope={currentDeriv(exploreX)}
                                color={palette.cyan}
                            />

                            {/* Precision lock effect when correct */}
                            <PrecisionLockEffect
                                x={exploreX}
                                y={currentFunc(exploreX)}
                                isLocked={isPrecisionLocked}
                            />
                        </>
                    )}

                    {/* Background Tech Branding */}
                    <Float speed={1.5}>
                        <Text
                            position={[-6, 4, -2]}
                            fontSize={0.6}
                            color={palette.white}
                            fillOpacity={0.05}
                            font="/fonts/Inter-Bold.woff"
                        >
                            CALCULUS_FLUX_DYNAMICS
                        </Text>
                        <Text
                            position={[6, -2, -2]}
                            fontSize={0.4}
                            color={palette.white}
                            fillOpacity={0.03}
                            font="/fonts/Inter-Bold.woff"
                            textAlign="right"
                        >
                            NEWTON_LEIBNIZ_PROTOCOLS
                        </Text>
                    </Float>

                    <OrbitControls makeDefault enableDamping dampingFactor={0.05} rotateSpeed={0.5} />
                </Suspense>
            </Canvas>

            {/* Matrix HUD Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Flux_Sentinel // Analysis</span>
                </div>
                <div className="text-[12px] font-mono text-cyan-400/80">
                    MOD: {mode}<br />
                    VAL: {exploreX.toFixed(2)}<br />
                    h: {hValue.toFixed(4)}<br />
                    SUBDIV: {subdivisionLevel}x
                </div>
                {isPrecisionLocked && (
                    <div className="text-[11px] font-mono text-green-400 font-bold animate-pulse">
                        ✓ LOCKED
                    </div>
                )}
            </div>

            {/* Interactive controls */}
            <div className="absolute top-4 right-4 space-y-2">
                <button
                    onClick={() => setHValue(1.0)}
                    className="px-3 py-1 text-[10px] font-mono bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded hover:bg-purple-500/30 transition-colors uppercase tracking-wider"
                >
                    Reset h
                </button>
                <button
                    onClick={() => setIsScanning(!isScanning)}
                    className="px-3 py-1 text-[10px] font-mono bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded hover:bg-cyan-500/30 transition-colors uppercase tracking-wider block w-full"
                >
                    {isScanning ? 'Stop Scan' : 'Start Scan'}
                </button>
            </div>

            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-white/20 text-right uppercase leading-relaxed">
                Basel_Protocol_1744<br />
                Temporal_Subdivision: {subdivisionLevel}x<br />
                Integration_Engine: {isScanning ? 'ACTIVE' : 'STANDBY'}<br />
                Limit_Status: {hValue < 0.05 ? 'CONVERGED' : 'APPROACHING'}
            </div>

            {/* Limit visualization indicator */}
            <div className="absolute bottom-4 left-4 space-y-1">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
                    Limit Visualization
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-pink-500 to-green-500 transition-all duration-300"
                            style={{ width: `${Math.max(0, 100 - (hValue / 1.0) * 100)}%` }}
                        />
                    </div>
                    <span className="text-[9px] font-mono text-white/50">
                        {hValue < 0.05 ? 'h→0' : `h=${hValue.toFixed(3)}`}
                    </span>
                </div>
            </div>
        </div>
    );
}
