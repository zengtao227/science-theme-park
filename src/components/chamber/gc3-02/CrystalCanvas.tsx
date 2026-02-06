"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface CrystalCanvasProps {
  latticeType: "SC" | "BCC" | "FCC";
  showVoids?: boolean;
  slicePosition?: number; // 0-1, null means no slice
}

// Lattice positions for different crystal structures
function getLatticePositions(type: "SC" | "BCC" | "FCC"): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const a = 1; // lattice constant

  if (type === "SC") {
    // Simple Cubic: 8 corner atoms
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        for (let z = 0; z <= 1; z++) {
          positions.push(new THREE.Vector3(x * a, y * a, z * a));
        }
      }
    }
  } else if (type === "BCC") {
    // Body-Centered Cubic: 8 corners + 1 center
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        for (let z = 0; z <= 1; z++) {
          positions.push(new THREE.Vector3(x * a, y * a, z * a));
        }
      }
    }
    // Center atom
    positions.push(new THREE.Vector3(0.5 * a, 0.5 * a, 0.5 * a));
  } else if (type === "FCC") {
    // Face-Centered Cubic: 8 corners + 6 face centers
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        for (let z = 0; z <= 1; z++) {
          positions.push(new THREE.Vector3(x * a, y * a, z * a));
        }
      }
    }
    // Face centers
    positions.push(new THREE.Vector3(0.5 * a, 0.5 * a, 0));
    positions.push(new THREE.Vector3(0.5 * a, 0.5 * a, a));
    positions.push(new THREE.Vector3(0.5 * a, 0, 0.5 * a));
    positions.push(new THREE.Vector3(0.5 * a, a, 0.5 * a));
    positions.push(new THREE.Vector3(0, 0.5 * a, 0.5 * a));
    positions.push(new THREE.Vector3(a, 0.5 * a, 0.5 * a));
  }

  return positions;
}

// Get void positions (tetrahedral and octahedral)
function getVoidPositions(type: "SC" | "BCC" | "FCC"): { tetrahedral: THREE.Vector3[]; octahedral: THREE.Vector3[] } {
  const tetrahedral: THREE.Vector3[] = [];
  const octahedral: THREE.Vector3[] = [];
  const a = 1;

  if (type === "FCC") {
    // Octahedral voids at body center and edge centers
    octahedral.push(new THREE.Vector3(0.5 * a, 0.5 * a, 0.5 * a));
    octahedral.push(new THREE.Vector3(0, 0.5 * a, 0));
    octahedral.push(new THREE.Vector3(a, 0.5 * a, 0));
    octahedral.push(new THREE.Vector3(0.5 * a, 0, 0));
    octahedral.push(new THREE.Vector3(0.5 * a, a, 0));

    // Tetrahedral voids
    tetrahedral.push(new THREE.Vector3(0.25 * a, 0.25 * a, 0.25 * a));
    tetrahedral.push(new THREE.Vector3(0.75 * a, 0.75 * a, 0.25 * a));
    tetrahedral.push(new THREE.Vector3(0.75 * a, 0.25 * a, 0.75 * a));
    tetrahedral.push(new THREE.Vector3(0.25 * a, 0.75 * a, 0.75 * a));
  } else if (type === "BCC") {
    // Octahedral voids at face centers
    octahedral.push(new THREE.Vector3(0.5 * a, 0, 0));
    octahedral.push(new THREE.Vector3(0.5 * a, a, 0));
    octahedral.push(new THREE.Vector3(0, 0.5 * a, 0));
    octahedral.push(new THREE.Vector3(a, 0.5 * a, 0));
  }

  return { tetrahedral, octahedral };
}

function Atom({ position, color, opacity = 1 }: { position: THREE.Vector3; color: string; opacity?: number }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function UnitCellEdges() {
  const a = 1;
  const edges = [
    // Bottom face
    [new THREE.Vector3(0, 0, 0), new THREE.Vector3(a, 0, 0)],
    [new THREE.Vector3(a, 0, 0), new THREE.Vector3(a, 0, a)],
    [new THREE.Vector3(a, 0, a), new THREE.Vector3(0, 0, a)],
    [new THREE.Vector3(0, 0, a), new THREE.Vector3(0, 0, 0)],
    // Top face
    [new THREE.Vector3(0, a, 0), new THREE.Vector3(a, a, 0)],
    [new THREE.Vector3(a, a, 0), new THREE.Vector3(a, a, a)],
    [new THREE.Vector3(a, a, a), new THREE.Vector3(0, a, a)],
    [new THREE.Vector3(0, a, a), new THREE.Vector3(0, a, 0)],
    // Vertical edges
    [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, a, 0)],
    [new THREE.Vector3(a, 0, 0), new THREE.Vector3(a, a, 0)],
    [new THREE.Vector3(a, 0, a), new THREE.Vector3(a, a, a)],
    [new THREE.Vector3(0, 0, a), new THREE.Vector3(0, a, a)],
  ];

  return (
    <group>
      {edges.map((edge, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              args={[new Float32Array([...edge[0].toArray(), ...edge[1].toArray()]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00e5ff" transparent opacity={0.4} />
        </line>
      ))}
    </group>
  );
}

function VoidMarker({ position, type }: { position: THREE.Vector3; type: "tetrahedral" | "octahedral" }) {
  const color = type === "tetrahedral" ? "#ffd166" : "#ff2d7d";
  const size = type === "tetrahedral" ? 0.08 : 0.1;

  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0.6}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
}

function SlicePlane({ position }: { position: number }) {
  const a = 1;
  return (
    <mesh position={[0.5 * a, position * a, 0.5 * a]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[a * 1.2, a * 1.2]} />
      <meshBasicMaterial
        color="#00e5ff"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function CrystalStructure({ latticeType, showVoids, slicePosition }: CrystalCanvasProps) {
  const groupRef = useRef<THREE.Group>(null);
  const atomPositions = useMemo(() => getLatticePositions(latticeType), [latticeType]);
  const voids = useMemo(() => getVoidPositions(latticeType), [latticeType]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  // Center the structure
  const offset = new THREE.Vector3(-0.5, -0.5, -0.5);

  return (
    <group ref={groupRef}>
      <UnitCellEdges />
      
      {/* Atoms */}
      {atomPositions.map((pos, i) => {
        const adjustedPos = pos.clone().add(offset);
        const opacity = slicePosition !== undefined && slicePosition !== null
          ? (pos.y < slicePosition ? 0.3 : 1)
          : 1;
        return (
          <Atom
            key={i}
            position={adjustedPos}
            color="#a855f7"
            opacity={opacity}
          />
        );
      })}

      {/* Voids */}
      {showVoids && (
        <>
          {voids.tetrahedral.map((pos, i) => (
            <VoidMarker
              key={`tet-${i}`}
              position={pos.clone().add(offset)}
              type="tetrahedral"
            />
          ))}
          {voids.octahedral.map((pos, i) => (
            <VoidMarker
              key={`oct-${i}`}
              position={pos.clone().add(offset)}
              type="octahedral"
            />
          ))}
        </>
      )}

      {/* Slice plane */}
      {slicePosition !== undefined && slicePosition !== null && (
        <SlicePlane position={slicePosition} />
      )}
    </group>
  );
}

function GridPlane() {
  return (
    <group position={[0, -1, 0]}>
      <gridHelper args={[10, 20, "#00e5ff", "#1a1a1a"]} />
    </group>
  );
}

export default function CrystalCanvas(props: CrystalCanvasProps) {
  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[2, 2, 3]} fov={50} />
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={1}
        />

        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />

        <GridPlane />
        <CrystalStructure {...props} />

        {/* Background sphere */}
        <mesh>
          <sphereGeometry args={[20, 32, 32]} />
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
