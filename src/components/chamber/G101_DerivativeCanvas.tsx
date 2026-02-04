"use client";

import React, { Suspense, useMemo, useState, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { Text, OrthographicCamera, Line, Grid } from "@react-three/drei";
import * as THREE from "three";

// --- Sub-components ---
function Parabola({ func, color, xRange = [-5, 5] }: { func: (x: number) => number; color: string; xRange?: [number, number] }) {
    const points = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        for (let x = xRange[0]; x <= xRange[1]; x += 0.1) {
            pts.push(new THREE.Vector3(x, func(x), 0));
        }
        return pts;
    }, [func, xRange]);
    return <Line points={points} color={color} lineWidth={3} />;
}

function TangentLine({ x0, slope, func, color }: { x0: number; slope: number; func: (x: number) => number; color: string }) {
    const y0 = func(x0);
    const points = useMemo(() => {
        const length = 4;
        return [
            new THREE.Vector3(x0 - length / 2, y0 - (slope * length) / 2, 0.1),
            new THREE.Vector3(x0 + length / 2, y0 + (slope * length) / 2, 0.1),
        ];
    }, [x0, y0, slope]);
    return <Line points={points} color={color} lineWidth={2} dashed dashScale={0.5} />;
}

function DraggablePoint({ x, y, onDrag, color, xRange }: { x: number; y: number; onDrag: (newX: number) => void; color: string; xRange: [number, number] }) {
    const [isDragging, setIsDragging] = useState(false);
    return (
        <mesh
            position={[x, y, 0.2]}
            onPointerDown={(e) => { e.stopPropagation(); setIsDragging(true); (e.target as any).setPointerCapture(e.pointerId); }}
            onPointerUp={() => setIsDragging(false)}
            onPointerMove={(e) => isDragging && onDrag(Math.max(xRange[0], Math.min(xRange[1], e.point.x)))}
        >
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isDragging ? 0.8 : 0.4} />
        </mesh>
    );
}

// --- Main Canvas ---
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
    const func = (x: number) => x * x;
    const derivative = (x: number) => 2 * x;

    const getFunc = () => {
        if (questData?.type === 'TANGENT') {
            if (questData.func === 'x2') return (x: number) => x * x;
            if (questData.func === '2x2') return (x: number) => 2 * x * x;
            if (questData.func === '3x2') return (x: number) => 3 * x * x;
            if (questData.func === 'x3') return (x: number) => x * x * x;
        }
        return func;
    };

    return (
        <div className="w-full aspect-square md:aspect-video bg-[#050505] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
            <Canvas>
                <OrthographicCamera makeDefault position={[0, 2, 10]} zoom={40} />
                <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <Grid infiniteGrid fadeDistance={30} cellColor="#111" sectionColor="#222" position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]} />

                    {mode === 'EXPLORE' && (
                        <>
                            <Parabola func={func} color="#00ff9d" />
                            <TangentLine x0={exploreX} slope={derivative(exploreX)} func={func} color="#ffa500" />
                            <DraggablePoint x={exploreX} y={func(exploreX)} onDrag={onExploreXChange} color="#00d2ff" xRange={[-3, 3]} />
                            <Text position={[exploreX + 0.8, func(exploreX) + 0.3, 0]} fontSize={0.25} color="#ffa500">
                                {`m = ${derivative(exploreX).toFixed(2)}`}
                            </Text>
                        </>
                    )}

                    {questData?.type === 'SLOPE' && (
                        <>
                            <Parabola func={getFunc()} color="#00ff9d" />
                            <mesh position={[questData.x1, questData.y1, 0.1]}><sphereGeometry args={[0.12]} /><meshStandardMaterial color="#00d2ff" /></mesh>
                            <mesh position={[questData.x2, questData.y2, 0.1]}><sphereGeometry args={[0.12]} /><meshStandardMaterial color="#00d2ff" /></mesh>
                            <Line points={[new THREE.Vector3(questData.x1 - 1, questData.y1 - questData.correctSlope, 0), new THREE.Vector3(questData.x2 + 1, questData.y2 + questData.correctSlope, 0)]} color="#ffa500" lineWidth={2} />
                        </>
                    )}

                    {questData?.type === 'TANGENT' && (
                        <>
                            <Parabola func={getFunc()} color="#00ff9d" />
                            <TangentLine x0={questData.x0} slope={questData.correctSlope} func={getFunc()} color="#ffa500" />
                        </>
                    )}
                </Suspense>
            </Canvas>
            <div className="absolute top-4 left-4 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Calculus-Monitor v4.0</div>
        </div>
    );
}
