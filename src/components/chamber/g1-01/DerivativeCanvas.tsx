import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Text, OrthographicCamera, Line, Grid, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function EulerBackdrop({ targetSize = 10 }: { targetSize?: number }) {
    return (
        <group position={[0, 0, -2]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text
                    position={[-6, 4, 0]}
                    fontSize={0.5}
                    color="#fff"
                    fillOpacity={0.06}
                    font="/fonts/Inter-Bold.woff"
                    anchorX="left"
                    maxWidth={8}
                >
                    {`f'(x) = lim [f(x+h) - f(x)] / h\nh → 0`}
                </Text>
            </Float>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
                <Text
                    position={[7, -2, 0]}
                    fontSize={0.4}
                    color="#fff"
                    fillOpacity={0.04}
                    font="/fonts/Inter-Bold.woff"
                    anchorX="right"
                    textAlign="right"
                >
                    {`Newton-Leibniz Notation\nd/dx [xⁿ] = nxⁿ⁻¹\n∫ f'(x)dx = f(x)`}
                </Text>
            </Float>
            <Text
                position={[-7, -4.5, 0]}
                fontSize={0.2}
                color="#fff"
                fillOpacity={0.03}
                font="/fonts/Inter-Bold.woff"
                anchorX="left"
            >
                {`FLUX_DYNAMICS_OBSERVATORY // BASEL_PROTOCOL_1744`}
            </Text>
        </group>
    );
}

function GraphLine({ func, color, xRange = [-10, 10], steps = 200 }: { func: (x: number) => number; color: string; xRange?: [number, number]; steps?: number }) {
    const points = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        const step = (xRange[1] - xRange[0]) / steps;
        for (let x = xRange[0]; x <= xRange[1]; x += step) {
            const y = func(x);
            if (Math.abs(y) < 15) { // Clip very high values
                pts.push(new THREE.Vector3(x, y, 0));
            }
        }
        return pts;
    }, [func, xRange, steps]);

    return (
        <group>
            <Line points={points} color={color} lineWidth={3} />
            <Line points={points} color={color} lineWidth={8} transparent opacity={0.15} />
        </group>
    );
}

function Tangent({ x0, slope, func, color }: { x0: number; slope: number; func: (x: number) => number; color: string }) {
    const y0 = func(x0);
    const points = useMemo(() => {
        const length = 12;
        // Direction vector of the tangent line: (1, slope)
        // Normalized: (1, slope) / sqrt(1 + slope^2)
        const mag = Math.sqrt(1 + slope * slope);
        const dx = (1 / mag) * length / 2;
        const dy = (slope / mag) * length / 2;

        return [
            new THREE.Vector3(x0 - dx, y0 - dy, 0.1),
            new THREE.Vector3(x0 + dx, y0 + dy, 0.1),
        ];
    }, [x0, y0, slope]);

    return (
        <group>
            <Line points={points} color={color} lineWidth={4} />
            <Line points={points} color={color} lineWidth={12} transparent opacity={0.3} />
            {/* The tangent formula indicator */}
            <Text
                position={[x0 + 0.5, y0 + (slope > 0 ? 0.5 : -0.5), 0.2]}
                fontSize={0.3}
                color={color}
                font="/fonts/Inter-Bold.woff"
                anchorX="left"
            >
                {`m = ${slope.toFixed(2)}`}
            </Text>
        </group>
    );
}

function InteractiveNode({ x, y, onDrag, color, xRange = [-5, 5] }: { x: number; y: number; onDrag: (newX: number) => void; color: string; xRange?: [number, number] }) {
    const [isDragging, setIsDragging] = useState(false);
    const [hovered, setHover] = useState(false);

    return (
        <group position={[x, y, 0.3]}>
            <mesh
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    setIsDragging(true);
                    const target = e.target as unknown as { setPointerCapture?: (id: number) => void };
                    target.setPointerCapture?.(e.pointerId);
                }}
                onPointerUp={() => setIsDragging(false)}
                onPointerMove={(e) => {
                    if (isDragging) {
                        onDrag(Math.max(xRange[0], Math.min(xRange[1], e.point.x)));
                    }
                }}
            >
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshPhysicalMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isDragging || hovered ? 2 : 0.5}
                    thickness={1}
                    roughness={0}
                    transmission={0.2}
                />
            </mesh>
            <Text
                position={[0, 0.5, 0]}
                fontSize={0.2}
                color="white"
                fillOpacity={0.6}
            >
                {`(${x.toFixed(2)}, ${y.toFixed(2)})`}
            </Text>
        </group>
    );
}

export default function G101_DerivativeCanvas({
    mode,
    exploreX,
    onExploreXChange,
    questData
}: {
    mode: string;
    exploreX: number;
    onExploreXChange: (x: number) => void;
    questData?: any;
}) {
    const defaultFunc = (x: number) => x * x;
    const defaultDeriv = (x: number) => 2 * x;

    const currentFunc = useMemo(() => {
        if (questData?.type === 'TANGENT' || questData?.type === 'SLOPE') {
            if (questData.func === 'x2') return (x: number) => x * x;
            if (questData.func === '2x2') return (x: number) => 2 * x * x;
            if (questData.func === 'x3') return (x: number) => x * x * x;
        }
        return defaultFunc;
    }, [questData]);

    const currentDeriv = useMemo(() => {
        if (questData?.func === 'x2') return (x: number) => 2 * x;
        if (questData?.func === '2x2') return (x: number) => 4 * x;
        if (questData?.func === 'x3') return (x: number) => 3 * x * x;
        return defaultDeriv;
    }, [questData]);

    return (
        <div className="w-full aspect-square md:aspect-video bg-[#030303] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <Canvas dpr={[1, 2]}>
                <OrthographicCamera makeDefault position={[0, 2, 10]} zoom={45} />
                <Suspense fallback={null}>
                    <color attach="background" args={["#030303"]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#a855f7" />

                    <Grid
                        infiniteGrid
                        fadeDistance={25}
                        cellColor="#1a1a1a"
                        sectionColor="#2a2a2a"
                        position={[0, 0, -0.1]}
                        rotation={[Math.PI / 2, 0, 0]}
                    />

                    <EulerBackdrop />

                    {mode === 'EXPLORE' && (
                        <>
                            <GraphLine func={defaultFunc} color="#a855f7" />
                            <Tangent x0={exploreX} slope={defaultDeriv(exploreX)} func={defaultFunc} color="#00e5ff" />
                            <InteractiveNode x={exploreX} y={defaultFunc(exploreX)} onDrag={onExploreXChange} color="#00e5ff" xRange={[-4, 4]} />
                        </>
                    )}

                    {questData?.type === 'SLOPE' && (
                        <>
                            <GraphLine func={currentFunc} color="#a855f7" />
                            <InteractiveNode x={questData.x1} y={questData.y1} onDrag={() => { }} color="#fff" />
                            <InteractiveNode x={questData.x2} y={questData.y2} onDrag={() => { }} color="#fff" />
                            <Line
                                points={[
                                    new THREE.Vector3(questData.x1 - 1, questData.y1 - questData.correctSlope, 0),
                                    new THREE.Vector3(questData.x2 + 1, questData.y2 + questData.correctSlope, 0)
                                ]}
                                color="#00e5ff"
                                lineWidth={3}
                            />
                        </>
                    )}

                    {questData?.type === 'TANGENT' && (
                        <>
                            <GraphLine func={currentFunc} color="#a855f7" />
                            <Tangent x0={questData.x0} slope={questData.correctSlope} func={currentFunc} color="#00e5ff" />
                            <InteractiveNode x={questData.x0} y={questData.y0} onDrag={() => { }} color="#fff" />
                        </>
                    )}

                    <ContactShadows opacity={0.4} scale={20} blur={2.4} far={4.5} />
                </Suspense>
            </Canvas>

            <div className="absolute top-4 left-4 flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Flux_Sentinel_System // v4.0.1</div>
            </div>
            <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right uppercase">
                Node: Basel<br />
                Sector: Analysis
            </div>
        </div>
    );
}
