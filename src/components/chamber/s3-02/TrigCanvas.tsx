"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface TrigCanvasProps {
    angle: number;
    showSin: boolean;
    showCos: boolean;
    showTan: boolean;
    showWaves: boolean;
}

function UnitCircle({ angle, showSin, showCos, showTan }: Omit<TrigCanvasProps, "showWaves">) {
    const pointRef = useRef<THREE.Mesh>(null);
    const sinLineRef = useRef<THREE.Group>(null);
    const cosLineRef = useRef<THREE.Group>(null);
    const tanLineRef = useRef<THREE.Group>(null);

    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad);
    const y = Math.sin(rad);
    const tanValue = Math.tan(rad);

    // Circle points
    const circlePoints = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 64; i++) {
            const a = (i / 64) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
        }
        return points;
    }, []);

    // Axes
    const xAxisPoints = [new THREE.Vector3(-1.5, 0, 0), new THREE.Vector3(1.5, 0, 0)];
    const yAxisPoints = [new THREE.Vector3(0, -1.5, 0), new THREE.Vector3(0, 1.5, 0)];

    return (
        <group>
            {/* Unit Circle */}
            <Line points={circlePoints} color="#00e5ff" lineWidth={2} />

            {/* Axes */}
            <Line points={xAxisPoints} color="#666666" lineWidth={1} />
            <Line points={yAxisPoints} color="#666666" lineWidth={1} />

            {/* Radius line */}
            <Line
                points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, 0)]}
                color="#a855f7"
                lineWidth={3}
            />

            {/* Point on circle */}
            <mesh ref={pointRef} position={[x, y, 0]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color="#ff2d7d" />
            </mesh>

            {/* Cosine projection (x-axis) */}
            {showCos && (
                <group ref={cosLineRef}>
                    <Line
                        points={[new THREE.Vector3(x, y, 0), new THREE.Vector3(x, 0, 0)]}
                        color="#39ff14"
                        lineWidth={2}
                        dashed
                        dashScale={20}
                    />
                    <Text
                        position={[x / 2, -0.2, 0]}
                        fontSize={0.12}
                        color="#39ff14"
                        anchorX="center"
                    >
                        cos = {x.toFixed(2)}
                    </Text>
                </group>
            )}

            {/* Sine projection (y-axis) */}
            {showSin && (
                <group ref={sinLineRef}>
                    <Line
                        points={[new THREE.Vector3(x, y, 0), new THREE.Vector3(0, y, 0)]}
                        color="#ffd166"
                        lineWidth={2}
                        dashed
                        dashScale={20}
                    />
                    <Text
                        position={[-0.25, y / 2, 0]}
                        fontSize={0.12}
                        color="#ffd166"
                        anchorX="center"
                    >
                        sin = {y.toFixed(2)}
                    </Text>
                </group>
            )}

            {/* Tangent line */}
            {showTan && Math.abs(Math.cos(rad)) > 0.01 && (
                <group ref={tanLineRef}>
                    <Line
                        points={[
                            new THREE.Vector3(1, 0, 0),
                            new THREE.Vector3(1, tanValue, 0),
                        ]}
                        color="#ff2d7d"
                        lineWidth={2}
                    />
                    <Line
                        points={[
                            new THREE.Vector3(x, y, 0),
                            new THREE.Vector3(1, tanValue, 0),
                        ]}
                        color="#a855f7"
                        lineWidth={1}
                        dashed
                        dashScale={20}
                    />
                    <Text
                        position={[1.2, tanValue / 2, 0]}
                        fontSize={0.12}
                        color="#ff2d7d"
                        anchorX="left"
                    >
                        tan = {tanValue.toFixed(2)}
                    </Text>
                </group>
            )}

            {/* Angle arc */}
            <Line
                points={useMemo(() => {
                    const points = [];
                    const steps = Math.max(2, Math.floor(Math.abs(angle) / 5));
                    for (let i = 0; i <= steps; i++) {
                        const a = (i / steps) * rad;
                        points.push(new THREE.Vector3(Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0));
                    }
                    return points;
                }, [angle, rad])}
                color="#00e5ff"
                lineWidth={2}
            />

            {/* Angle label */}
            <Text position={[0.4, 0.15, 0]} fontSize={0.1} color="#00e5ff" anchorX="center">
                {angle}°
            </Text>

            {/* Axis labels */}
            <Text position={[1.6, 0, 0]} fontSize={0.12} color="#666666">
                x
            </Text>
            <Text position={[0, 1.6, 0]} fontSize={0.12} color="#666666">
                y
            </Text>
        </group>
    );
}

function WaveGraphs({ angle, showSin, showCos }: { angle: number; showSin: boolean; showCos: boolean }) {
    const rad = (angle * Math.PI) / 180;

    // Sine wave points
    const sinePoints = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const x = (i / 100) * 4 * Math.PI;
            const y = Math.sin(x);
            points.push(new THREE.Vector3(x - 2 * Math.PI, y, 0));
        }
        return points;
    }, []);

    // Cosine wave points
    const cosinePoints = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const x = (i / 100) * 4 * Math.PI;
            const y = Math.cos(x);
            points.push(new THREE.Vector3(x - 2 * Math.PI, y, 0));
        }
        return points;
    }, []);

    const currentX = rad;
    const sinY = Math.sin(rad);
    const cosY = Math.cos(rad);

    return (
        <group position={[0, -3, 0]}>
            {/* Sine wave */}
            {showSin && (
                <group>
                    <Line points={sinePoints} color="#ffd166" lineWidth={2} />
                    <mesh position={[currentX - 2 * Math.PI, sinY, 0]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshBasicMaterial color="#ffd166" />
                    </mesh>
                    <Text position={[-6, 1.3, 0]} fontSize={0.15} color="#ffd166">
                        sin(θ)
                    </Text>
                </group>
            )}

            {/* Cosine wave */}
            {showCos && (
                <group>
                    <Line points={cosinePoints} color="#39ff14" lineWidth={2} />
                    <mesh position={[currentX - 2 * Math.PI, cosY, 0]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshBasicMaterial color="#39ff14" />
                    </mesh>
                    <Text position={[-6, 0.8, 0]} fontSize={0.15} color="#39ff14">
                        cos(θ)
                    </Text>
                </group>
            )}

            {/* Axes */}
            <Line
                points={[new THREE.Vector3(-6.5, 0, 0), new THREE.Vector3(6.5, 0, 0)]}
                color="#444444"
                lineWidth={1}
            />
        </group>
    );
}

function Scene(props: TrigCanvasProps) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <UnitCircle
                angle={props.angle}
                showSin={props.showSin}
                showCos={props.showCos}
                showTan={props.showTan}
            />

            {props.showWaves && (
                <WaveGraphs angle={props.angle} showSin={props.showSin} showCos={props.showCos} />
            )}

            <OrbitControls enableRotate={false} enablePan={false} />
        </>
    );
}

export default function TrigCanvas(props: TrigCanvasProps) {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Scene {...props} />
            </Canvas>
        </div>
    );
}
