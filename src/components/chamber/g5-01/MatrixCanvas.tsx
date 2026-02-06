"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Line } from "@react-three/drei";
import * as THREE from "three";

interface MatrixCanvasProps {
  matrix: number[][]; // 3x3 matrix
  showOriginal?: boolean;
}

function TransformedCube({ matrix, color, opacity = 1 }: { matrix: number[][]; color: string; opacity?: number }) {
  const vertices = useMemo(() => {
    // Unit cube vertices
    const original = [
      [-0.5, -0.5, -0.5],
      [0.5, -0.5, -0.5],
      [0.5, 0.5, -0.5],
      [-0.5, 0.5, -0.5],
      [-0.5, -0.5, 0.5],
      [0.5, -0.5, 0.5],
      [0.5, 0.5, 0.5],
      [-0.5, 0.5, 0.5],
    ];

    // Apply matrix transformation
    return original.map(([x, y, z]) => {
      const newX = matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z;
      const newY = matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z;
      const newZ = matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z;
      return new THREE.Vector3(newX, newY, newZ);
    });
  }, [matrix]);

  // Cube edges
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Bottom face
    [4, 5], [5, 6], [6, 7], [7, 4], // Top face
    [0, 4], [1, 5], [2, 6], [3, 7], // Vertical edges
  ];

  return (
    <group>
      {edges.map(([start, end], index) => (
        <Line
          key={index}
          points={[vertices[start], vertices[end]]}
          color={color}
          lineWidth={2}
          transparent
          opacity={opacity}
        />
      ))}
      {/* Vertices */}
      {vertices.map((vertex, index) => (
        <mesh key={index} position={vertex}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={opacity}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Eigenvectors({ matrix }: { matrix: number[][] }) {
  // Simplified eigenvector visualization (for demonstration)
  // In a real implementation, you'd calculate actual eigenvectors
  const vectors = useMemo(() => {
    // For now, show the transformed basis vectors
    const i = new THREE.Vector3(matrix[0][0], matrix[1][0], matrix[2][0]);
    const j = new THREE.Vector3(matrix[0][1], matrix[1][1], matrix[2][1]);
    const k = new THREE.Vector3(matrix[0][2], matrix[1][2], matrix[2][2]);
    return [i, j, k];
  }, [matrix]);

  const colors = ["#ff2d7d", "#39ff14", "#00e5ff"];

  return (
    <group>
      {vectors.map((vec, index) => (
        <group key={index}>
          <Line
            points={[new THREE.Vector3(0, 0, 0), vec]}
            color={colors[index]}
            lineWidth={3}
          />
          <mesh position={vec}>
            <coneGeometry args={[0.08, 0.2, 8]} />
            <meshPhysicalMaterial
              color={colors[index]}
              emissive={colors[index]}
              emissiveIntensity={0.8}
              metalness={1}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function GridPlane() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[10, 20, "#00e5ff", "#1a1a1a"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function AxisLines() {
  return (
    <group>
      {/* X axis - Red */}
      <Line
        points={[new THREE.Vector3(-3, 0, 0), new THREE.Vector3(3, 0, 0)]}
        color="#ff2d7d"
        lineWidth={1}
        transparent
        opacity={0.3}
      />
      {/* Y axis - Green */}
      <Line
        points={[new THREE.Vector3(0, -3, 0), new THREE.Vector3(0, 3, 0)]}
        color="#39ff14"
        lineWidth={1}
        transparent
        opacity={0.3}
      />
      {/* Z axis - Cyan */}
      <Line
        points={[new THREE.Vector3(0, 0, -3), new THREE.Vector3(0, 0, 3)]}
        color="#00e5ff"
        lineWidth={1}
        transparent
        opacity={0.3}
      />
    </group>
  );
}

export default function MatrixCanvas({ matrix, showOriginal = true }: MatrixCanvasProps) {
  const identityMatrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 3, 3]} fov={50} />
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />

        <GridPlane />
        <AxisLines />

        {/* Original cube (ghost) */}
        {showOriginal && (
          <TransformedCube
            matrix={identityMatrix}
            color="#ffffff"
            opacity={0.2}
          />
        )}

        {/* Transformed cube */}
        <TransformedCube matrix={matrix} color="#a855f7" opacity={1} />

        {/* Eigenvectors */}
        <Eigenvectors matrix={matrix} />

        {/* Background sphere */}
        <mesh>
          <sphereGeometry args={[15, 32, 32]} />
          <meshBasicMaterial
            color="#000000"
            side={THREE.BackSide}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
