"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Grid, Float } from "@react-three/drei";
import * as THREE from "three";

export interface PowerVisual {
  base: number;
  exponent: number;
  mode: 'dimension' | 'growth' | 'root';
}

// n^0: Quantum Dot
function QuantumDot() {
  const dotRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!dotRef.current) return;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.3;
    dotRef.current.scale.setScalar(pulse);
  });

  return (
    <Float speed={3} rotationIntensity={0} floatIntensity={0.5}>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          metalness={0.9}
          roughness={0.1}
        />
        <pointLight color="#ffffff" intensity={2} distance={3} />
      </mesh>

      {/* Outer glow rings */}
      {[1, 2, 3].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4 * i, 0.42 * i, 32]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.3 / i}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      <Text position={[0, -1, 0]} fontSize={0.3} color="#ffffff" anchorX="center">
        n⁰ = 1
      </Text>
    </Float>
  );
}

// n^1: Linear Voxel Chain
function VoxelChain({ base }: { base: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummyRef = useRef(new THREE.Object3D());
  const dummy = dummyRef.current;

  const count = Math.min(base, 20);
  const spacing = 0.5;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const offset = i - count / 2;
      const wave = Math.sin(time * 2 + i * 0.3) * 0.1;

      dummy.position.set(offset * spacing, wave, 0);
      // dummy.rotation.y = time + i * 0.2; // Removed auto-rotation
      dummy.scale.setScalar(1 + Math.sin(time * 3 + i * 0.5) * 0.1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshPhysicalMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </instancedMesh>

      {/* Connecting lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(
              Array.from({ length: count }, (_, i) => {
                const offset = (i - count / 2) * spacing;
                return [offset, 0, 0];
              }).flat()
            ), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </lineSegments>

      <Text position={[0, -1.5, 0]} fontSize={0.3} color="#00ffff" anchorX="center">
        n¹ = {base}
      </Text>
    </group>
  );
}

// n^2: 2D Voxel Grid
function VoxelGrid2D({ base }: { base: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummyRef = useRef(new THREE.Object3D());
  const dummy = dummyRef.current;

  const size = Math.min(base, 12);
  const count = size * size;
  const spacing = 0.45;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / size);
      const col = i % size;
      const x = (col - size / 2) * spacing;
      const y = (row - size / 2) * spacing;
      const wave = Math.sin(time * 2 + i * 0.1) * 0.05;
      const pulse = 1 + Math.sin(time * 3 + i * 0.15) * 0.1;

      dummy.position.set(x, y, wave);
      dummy.scale.setScalar(pulse);
      // dummy.rotation.z = Math.sin(time + i * 0.1) * 0.1; // Removed auto-rotation
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.4, 0.4, 0.1]} />
        <meshPhysicalMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </instancedMesh>

      {/* Grid frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(size * spacing, size * spacing)]} />
        <lineBasicMaterial color="#00ff88" transparent opacity={0.5} linewidth={2} />
      </lineSegments>

      <Text position={[0, -size * spacing / 2 - 0.8, 0]} fontSize={0.3} color="#00ff88" anchorX="center">
        n² = {base * base}
      </Text>
    </group>
  );
}

// n^3: 3D Voxel Cube with split and rotate
function VoxelCube3D({ base }: { base: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummyRef = useRef(new THREE.Object3D());
  const dummy = dummyRef.current;

  const size = Math.min(base, 8);
  const count = size * size * size;
  const spacing = 0.4;

  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current) return;

    const time = clock.getElapsedTime();

    // Rotate the whole cube - DISABLED
    // groupRef.current.rotation.y = time * 0.3;
    // groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;

    // Split animation
    const splitFactor = (Math.sin(time * 0.5) + 1) / 2; // 0 to 1

    for (let i = 0; i < count; i++) {
      const layer = Math.floor(i / (size * size));
      const inLayer = i % (size * size);
      const row = Math.floor(inLayer / size);
      const col = inLayer % size;

      const x = (col - size / 2) * spacing;
      const y = (row - size / 2) * spacing;
      const z = (layer - size / 2) * spacing;

      // Split effect - push voxels outward
      const centerDist = Math.sqrt(
        Math.pow(col - size / 2, 2) +
        Math.pow(row - size / 2, 2) +
        Math.pow(layer - size / 2, 2)
      );
      const splitOffset = splitFactor * centerDist * 0.15;

      const dx = (col - size / 2) / size;
      const dy = (row - size / 2) / size;
      const dz = (layer - size / 2) / size;

      dummy.position.set(
        x + dx * splitOffset,
        y + dy * splitOffset,
        z + dz * splitOffset
      );

      const pulse = 1 + Math.sin(time * 3 + i * 0.05) * 0.05;
      dummy.scale.setScalar(pulse);
      dummy.rotation.set(
        Math.sin(time + i * 0.1) * 0.1,
        Math.cos(time + i * 0.1) * 0.1,
        0
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshPhysicalMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </instancedMesh>

      {/* Outer cube frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(size * spacing, size * spacing, size * spacing)]} />
        <lineBasicMaterial color="#a855f7" transparent opacity={0.4} linewidth={2} />
      </lineSegments>

      <Text position={[0, -size * spacing / 2 - 1, 0]} fontSize={0.35} color="#a855f7" anchorX="center">
        n³ = {base * base * base}
      </Text>
    </group>
  );
}

// Root Extraction: Mechanical Peel Animation
function RootExtraction({ base }: { base: number }) {
  const cubeRef = useRef<THREE.Mesh>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const extractedRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!cubeRef.current || !planeRef.current || !extractedRef.current) return;

    const time = clock.getElapsedTime();

    // Rotate cube - DISABLED
    // cubeRef.current.rotation.y = time * 0.3;
    // cubeRef.current.rotation.x = time * 0.2;

    // Peel animation - extract plane
    const peelProgress = (Math.sin(time * 0.8) + 1) / 2; // 0 to 1
    extractedRef.current.position.z = peelProgress * 3;
    extractedRef.current.rotation.y = peelProgress * Math.PI * 0.5;

    // Plane glow pulse
    const pulse = 0.5 + Math.sin(time * 3) * 0.3;
    (planeRef.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity = pulse;
  });

  const cubeSize = Math.min(base, 8) * 0.4;
  const planeSize = cubeSize;

  return (
    <group>
      {/* Original cube (being peeled) */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
        <meshPhysicalMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          metalness={0.9}
          roughness={0.1}
          transmission={0.6}
          thickness={0.5}
        />
      </mesh>

      {/* Extracted plane (the root) */}
      <group ref={extractedRef}>
        <mesh ref={planeRef}>
          <planeGeometry args={[planeSize, planeSize]} />
          <meshPhysicalMaterial
            color="#39ff14"
            emissive="#39ff14"
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
            metalness={0.8}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Plane edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(planeSize, planeSize)]} />
          <lineBasicMaterial color="#39ff14" linewidth={3} />
        </lineSegments>

        <Text position={[0, -planeSize / 2 - 0.5, 0]} fontSize={0.3} color="#39ff14" anchorX="center">
          ∛{base ** 3} = {base}
        </Text>
      </group>

      {/* Mechanical arms (visual effect) */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = cubeSize / 2;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh position={[radius, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
              <meshPhysicalMaterial
                color="#ffffff"
                emissive="#00ffff"
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        );
      })}

      {/* Radical symbol */}
      <Text position={[-cubeSize - 1, cubeSize / 2, 0]} fontSize={0.8} color="#39ff14" anchorX="center">
        ∛
      </Text>

      <Text position={[0, -cubeSize - 1.5, 0]} fontSize={0.25} color="#ffffff" anchorX="center" fillOpacity={0.6}>
        EXTRACTING ROOT
      </Text>
    </group>
  );
}

// Growth mode: Exponential multiplication
function GrowthVisualization({ base, exponent }: { base: number; exponent: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummyRef = useRef(new THREE.Object3D());
  const dummy = dummyRef.current;

  const count = Math.min(Math.pow(base, Math.abs(exponent)), 200);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Spiral pattern
      const angle = i * 0.5;
      const radius = Math.sqrt(i) * 0.3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (i / count) * 2 - 1;

      dummy.position.set(x, y, z);
      dummy.rotation.set(time + i * 0.1, time * 0.5 + i * 0.1, 0);

      const pulse = 1 + Math.sin(time * 4 + i * 0.1) * 0.2;
      dummy.scale.setScalar(0.15 * pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>

      <Text position={[0, -3, 0]} fontSize={0.35} color="#00ffff" anchorX="center">
        {base}^{exponent} = {Math.pow(base, exponent)}
      </Text>
    </group>
  );
}

// Main scene component
function PowerScene({ visual }: { visual: PowerVisual }) {
  const { base, exponent, mode } = visual;

  if (mode === 'root') {
    return <RootExtraction base={base} />;
  }

  if (mode === 'growth') {
    return <GrowthVisualization base={base} exponent={exponent} />;
  }

  // Dimension mode
  if (exponent === 0) {
    return <QuantumDot />;
  } else if (exponent === 1) {
    return <VoxelChain base={base} />;
  } else if (exponent === 2) {
    return <VoxelGrid2D base={base} />;
  } else {
    return <VoxelCube3D base={base} />;
  }
}

export default function S205PowerCanvas({ visual }: { visual?: PowerVisual }) {
  if (!visual) {
    return (
      <div className="relative w-full aspect-square max-w-[500px] bg-[#020208] rounded-2xl border border-white/10 flex items-center justify-center">
        <div className="text-white/40 text-center p-8">No power data</div>
      </div>
    );
  }

  const getModeLabel = () => {
    if (visual.mode === 'root') return 'ROOT EXTRACTION';
    if (visual.mode === 'growth') return 'EXPONENTIAL GROWTH';
    if (visual.exponent === 0) return '0D: POINT';
    if (visual.exponent === 1) return '1D: LINE';
    if (visual.exponent === 2) return '2D: PLANE';
    return '3D: VOLUME';
  };

  return (
    <div className="relative w-full aspect-square max-w-[500px] bg-[#020208] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [5, 4, 5], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 5]} intensity={0.6} color="#00ffff" />
        <pointLight position={[0, 10, -10]} intensity={0.5} color="#ff00ff" />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={15}
        />

        {/* Grid floor */}
        <Grid
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#ffffff"
          sectionSize={2.5}
          sectionThickness={1}
          sectionColor="#00ffff"
          fadeDistance={20}
          fadeStrength={1}
          position={[0, -3, 0]}
        />

        {/* Main scene */}
        <PowerScene visual={visual} />
      </Canvas>

      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 flex gap-2 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase">
          Dimensional_Transformer v3.0
        </span>
      </div>

      <div className="absolute bottom-4 left-4 space-y-1 font-mono text-[9px] text-white/50">
        <div className="text-purple-400">Base: {visual.base}</div>
        <div className="text-cyan-400">Exponent: {visual.exponent}</div>
        <div className="text-white font-bold">
          Result: {visual.mode === 'root' ? `∛${visual.base ** 3} = ${visual.base}` : `${visual.base}^${visual.exponent} = ${Math.pow(visual.base, visual.exponent)}`}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // S2.05<br />
        MODE: {getModeLabel()}<br />
        DIMENSION: {visual.mode === 'root' ? '3D→2D' : `${visual.exponent}D`}
      </div>

      <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 uppercase tracking-wider">
        Powers & Roots 3D
      </div>
    </div>
  );
}
