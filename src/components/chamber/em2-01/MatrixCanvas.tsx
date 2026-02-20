"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface MatrixCanvasProps {
    matrix: number[][]; // 3x3 matrix
    showEigenvectors: boolean;
    showGrid: boolean;
    animate: boolean;
}

// Calculate eigenvalues and eigenvectors for 3x3 matrix
function calculateEigen(matrix: number[][]): { values: number[]; vectors: THREE.Vector3[] } {
    // Simplified: only handle 2x2 for demonstration
    // For full 3x3, would need numerical methods
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];
    
    // Characteristic equation: det(A - λI) = 0
    // λ^2 - (a+d)λ + (ad-bc) = 0
    const trace = a + d;
    const det = a * d - b * c;
    
    const discriminant = trace * trace - 4 * det;
    
    if (discriminant < 0) {
        return { values: [], vectors: [] };
    }
    
    const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
    const lambda2 = (trace - Math.sqrt(discriminant)) / 2;
    
    // Eigenvectors
    const v1 = new THREE.Vector3(b, lambda1 - a, 0).normalize();
    const v2 = new THREE.Vector3(b, lambda2 - a, 0).normalize();
    
    return {
        values: [lambda1, lambda2],
        vectors: [v1, v2],
    };
}

// Grid that transforms with matrix
function TransformingGrid({ matrix, animate }: { matrix: number[][]; animate: boolean }) {
    const gridRef = useRef<THREE.Group>(null);
    const gridSize = 10;
    const gridDivisions = 20;
    
    useFrame(({ clock }) => {
        if (!gridRef.current) return;
        
        const t = animate ? (Math.sin(clock.getElapsedTime()) + 1) / 2 : 1;
        
        // Interpolate between identity and target matrix
        const m = new THREE.Matrix4();
        m.set(
            1 + (matrix[0][0] - 1) * t, matrix[0][1] * t, matrix[0][2] * t, 0,
            matrix[1][0] * t, 1 + (matrix[1][1] - 1) * t, matrix[1][2] * t, 0,
            matrix[2][0] * t, matrix[2][1] * t, 1 + (matrix[2][2] - 1) * t, 0,
            0, 0, 0, 1
        );
        
        gridRef.current.matrix.copy(m);
        gridRef.current.matrixAutoUpdate = false;
    });
    
    // Create grid lines
    const gridLines = useMemo(() => {
        const lines: React.ReactElement[] = [];
        const step = gridSize / gridDivisions;
        
        // Horizontal lines
        for (let i = 0; i <= gridDivisions; i++) {
            const y = -gridSize / 2 + i * step;
            const color = i === gridDivisions / 2 ? "#ff2d7d" : "#00e5ff";
            lines.push(
                <line key={`h${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            args={[new Float32Array([
                                -gridSize / 2, y, 0,
                                gridSize / 2, y, 0
                            ]), 3]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color={color} opacity={0.5} transparent />
                </line>
            );
        }
        
        // Vertical lines
        for (let i = 0; i <= gridDivisions; i++) {
            const x = -gridSize / 2 + i * step;
            const color = i === gridDivisions / 2 ? "#39ff14" : "#00e5ff";
            lines.push(
                <line key={`v${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            args={[new Float32Array([
                                x, -gridSize / 2, 0,
                                x, gridSize / 2, 0
                            ]), 3]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color={color} opacity={0.5} transparent />
                </line>
            );
        }
        
        return lines;
    }, [gridSize, gridDivisions]);
    
    return <group ref={gridRef}>{gridLines}</group>;
}

// Eigenvector arrows
function Eigenvectors({ matrix }: { matrix: number[][] }) {
    const eigen = useMemo(() => calculateEigen(matrix), [matrix]);
    
    if (eigen.values.length === 0) return null;
    
    return (
        <group>
            {eigen.vectors.map((vec, i) => {
                const color = i === 0 ? "#ffd166" : "#a855f7";
                const scale = Math.abs(eigen.values[i]);
                const direction = vec.clone().multiplyScalar(scale);
                
                return (
                    <group key={i}>
                        <arrowHelper
                            args={[
                                vec,
                                new THREE.Vector3(0, 0, 0),
                                scale * 2,
                                color,
                                0.3,
                                0.2
                            ]}
                        />
                        <Text
                            position={[direction.x * 1.5, direction.y * 1.5, 0]}
                            fontSize={0.3}
                            color={color}
                            anchorX="center"
                            anchorY="middle"
                        >
                            λ{i + 1} = {eigen.values[i].toFixed(2)}
                        </Text>
                    </group>
                );
            })}
        </group>
    );
}

// Unit vectors showing transformation
function UnitVectors({ matrix, animate }: { matrix: number[][]; animate: boolean }) {
    const i_hatRef = useRef<THREE.Group>(null);
    const j_hatRef = useRef<THREE.Group>(null);
    
    useFrame(({ clock }) => {
        if (!i_hatRef.current || !j_hatRef.current) return;
        
        const t = animate ? (Math.sin(clock.getElapsedTime()) + 1) / 2 : 1;
        
        // Transform i-hat (1, 0, 0)
        const i_transformed = new THREE.Vector3(
            1 + (matrix[0][0] - 1) * t,
            matrix[1][0] * t,
            matrix[2][0] * t
        );
        
        // Transform j-hat (0, 1, 0)
        const j_transformed = new THREE.Vector3(
            matrix[0][1] * t,
            1 + (matrix[1][1] - 1) * t,
            matrix[2][1] * t
        );
        
        i_hatRef.current.position.copy(i_transformed);
        j_hatRef.current.position.copy(j_transformed);
    });
    
    return (
        <group>
            {/* i-hat */}
            <group ref={i_hatRef}>
                <mesh>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial color="#ff2d7d" />
                </mesh>
            </group>
            
            {/* j-hat */}
            <group ref={j_hatRef}>
                <mesh>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial color="#39ff14" />
                </mesh>
            </group>
            
            {/* Original unit vectors */}
            <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 1, "#ff2d7d", 0.2, 0.1]} />
            <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1, "#39ff14", 0.2, 0.1]} />
        </group>
    );
}

function MatrixScene({ matrix, showEigenvectors, showGrid, animate }: MatrixCanvasProps) {
    const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            
            {showGrid && <TransformingGrid matrix={matrix} animate={animate} />}
            
            <UnitVectors matrix={matrix} animate={animate} />
            
            {showEigenvectors && <Eigenvectors matrix={matrix} />}
            
            {/* Matrix display */}
            <Text
                position={[0, 6, 0]}
                fontSize={0.4}
                color="#00e5ff"
                anchorX="center"
                anchorY="middle"
            >
                det(A) = {det.toFixed(2)}
            </Text>
            
            {/* Axes */}
            <axesHelper args={[5]} />
        </>
    );
}

export default function MatrixCanvas(props: MatrixCanvasProps) {
    return (
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
            <color attach="background" args={["#000000"]} />
            <MatrixScene {...props} />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />
        </Canvas>
    );
}
