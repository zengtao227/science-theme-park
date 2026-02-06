"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface CalculusCanvasProps {
    mode: "tangent" | "newton";
    xPosition: number;
    functionType: "parabola" | "cubic" | "sine";
}

// Function definitions
const functions = {
    parabola: {
        f: (x: number) => x * x,
        df: (x: number) => 2 * x,
    },
    cubic: {
        f: (x: number) => x * x * x - 3 * x,
        df: (x: number) => 3 * x * x - 3,
    },
    sine: {
        f: (x: number) => Math.sin(x) * 2,
        df: (x: number) => Math.cos(x) * 2,
    },
};

function FunctionCurve({ functionType }: { functionType: "parabola" | "cubic" | "sine" }) {
    const points = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        const func = functions[functionType];
        for (let x = -5; x <= 5; x += 0.1) {
            const y = func.f(x);
            pts.push(new THREE.Vector3(x, y, 0));
        }
        return pts;
    }, [functionType]);

    return <Line points={points} color="#00e5ff" lineWidth={3} />;
}

function TangentLine({ x, functionType }: { x: number; functionType: "parabola" | "cubic" | "sine" }) {
    const func = functions[functionType];
    const y = func.f(x);
    const slope = func.df(x);

    const points = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        for (let dx = -2; dx <= 2; dx += 0.1) {
            const tx = x + dx;
            const ty = y + slope * dx;
            pts.push(new THREE.Vector3(tx, ty, 0));
        }
        return pts;
    }, [x, y, slope]);

    return (
        <>
            <Line points={points} color="#ff2d7d" lineWidth={2} />
            
            {/* Point on curve */}
            <mesh position={[x, y, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#ff2d7d" emissive="#ff2d7d" emissiveIntensity={0.5} />
            </mesh>

            {/* Slope indicator */}
            <Text position={[x + 1.5, y + slope * 1.5 + 0.5, 0]} fontSize={0.3} color="#ff2d7d">
                {`m = ${slope.toFixed(2)}`}
            </Text>
        </>
    );
}

function NewtonIteration({ 
    startX, 
    functionType, 
    iterations 
}: { 
    startX: number; 
    functionType: "parabola" | "cubic" | "sine";
    iterations: number;
}) {
    const func = functions[functionType];
    
    // Calculate Newton's method iterations
    const points = useMemo(() => {
        const pts: Array<{ x: number; y: number }> = [];
        let x = startX;
        
        for (let i = 0; i < iterations && i < 10; i++) {
            const y = func.f(x);
            const slope = func.df(x);
            
            pts.push({ x, y });
            
            // Newton's method: x_new = x - f(x)/f'(x)
            if (Math.abs(slope) > 0.001) {
                x = x - y / slope;
            } else {
                break;
            }
        }
        
        return pts;
    }, [startX, iterations, func]);

    return (
        <>
            {points.map((pt, i) => {
                const nextX = i < points.length - 1 ? points[i + 1].x : pt.x;
                
                return (
                    <group key={i}>
                        {/* Vertical line from x-axis to curve */}
                        <Line
                            points={[
                                new THREE.Vector3(pt.x, 0, 0),
                                new THREE.Vector3(pt.x, pt.y, 0),
                            ]}
                            color="#ffd166"
                            lineWidth={1}
                            dashed
                            dashScale={20}
                        />
                        
                        {/* Tangent line to next x */}
                        {i < points.length - 1 && (
                            <Line
                                points={[
                                    new THREE.Vector3(pt.x, pt.y, 0),
                                    new THREE.Vector3(nextX, 0, 0),
                                ]}
                                color="#a855f7"
                                lineWidth={2}
                            />
                        )}
                        
                        {/* Point on curve */}
                        <mesh position={[pt.x, pt.y, 0]}>
                            <sphereGeometry args={[0.08, 16, 16]} />
                            <meshStandardMaterial 
                                color={i === points.length - 1 ? "#39ff14" : "#ffd166"}
                                emissive={i === points.length - 1 ? "#39ff14" : "#ffd166"}
                                emissiveIntensity={0.5}
                            />
                        </mesh>
                        
                        {/* Iteration label */}
                        <Text position={[pt.x, pt.y + 0.5, 0]} fontSize={0.2} color="#ffd166">
                            {`x${i}`}
                        </Text>
                    </group>
                );
            })}
            
            {/* Final root indicator */}
            {points.length > 0 && (
                <mesh position={[points[points.length - 1].x, 0, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.3]} />
                    <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.5} />
                </mesh>
            )}
        </>
    );
}

function Axes() {
    return (
        <>
            {/* X-axis */}
            <Line
                points={[new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)]}
                color="#666666"
                lineWidth={2}
            />
            <Text position={[6.5, 0, 0]} fontSize={0.3} color="#666666">
                x
            </Text>
            
            {/* Y-axis */}
            <Line
                points={[new THREE.Vector3(0, -6, 0), new THREE.Vector3(0, 6, 0)]}
                color="#666666"
                lineWidth={2}
            />
            <Text position={[0, 6.5, 0]} fontSize={0.3} color="#666666">
                y
            </Text>
            
            {/* Grid */}
            {[-4, -2, 2, 4].map((x) => (
                <Line
                    key={`vgrid-${x}`}
                    points={[new THREE.Vector3(x, -6, 0), new THREE.Vector3(x, 6, 0)]}
                    color="#333333"
                    lineWidth={0.5}
                />
            ))}
            {[-4, -2, 2, 4].map((y) => (
                <Line
                    key={`hgrid-${y}`}
                    points={[new THREE.Vector3(-6, y, 0), new THREE.Vector3(6, y, 0)]}
                    color="#333333"
                    lineWidth={0.5}
                />
            ))}
        </>
    );
}

function Scene({ mode, xPosition, functionType }: CalculusCanvasProps) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            <Axes />
            <FunctionCurve functionType={functionType} />
            
            {mode === "tangent" && (
                <TangentLine x={xPosition} functionType={functionType} />
            )}
            
            {mode === "newton" && (
                <NewtonIteration 
                    startX={xPosition} 
                    functionType={functionType}
                    iterations={5}
                />
            )}
            
            <OrbitControls enableRotate={false} enablePan={false} />
        </>
    );
}

export default function CalculusCanvas(props: CalculusCanvasProps) {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                <Scene {...props} />
            </Canvas>
        </div>
    );
}
