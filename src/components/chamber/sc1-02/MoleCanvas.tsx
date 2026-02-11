"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";

interface MoleCanvasProps {
  stageLabel: string;
  unit: string;
  inputValue: number | null;
  targetValue: number | null;
  status: "idle" | "correct" | "incorrect";
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
  steel: "#1d2633",
};

// Atom colors by element
const atomColors: Record<string, string> = {
  H: "#ffffff",
  C: "#909090",
  O: "#ff2d2d",
  N: "#3050f8",
  S: "#ffff30",
  Cl: "#1ff01f",
  Na: "#ab5cf2",
  Ca: "#3dff00",
  Fe: "#e06633",
  Al: "#bfa6a6",
  K: "#8f40d4",
};

// Atom component with symbol
function Atom({
  symbol,
  position,
  scale = 1,
}: {
  symbol: string;
  position: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = atomColors[symbol] || palette.cyan;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2 + position[0] * 10) * 0.05;
    meshRef.current.scale.setScalar(scale * pulse);
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3 * scale, 24, 24]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <Text
        position={[0, 0, 0.35 * scale]}
        fontSize={0.2 * scale}
        color={palette.white}
        anchorX="center"
        anchorY="middle"
      >
        {symbol}
      </Text>
    </group>
  );
}

// Molecular cluster - random arrangement of atoms
function MolecularCluster({
  atoms,
  position,
}: {
  atoms: string[];
  position: [number, number, number];
}) {
  const positions = useMemo(() => {
    // Determine positions deterministically to avoid hydration mismatch
    return atoms.map((_, i) => {
      const angle = (i / atoms.length) * Math.PI * 2;
      // Use index-based seed for pseudo-randomness
      const radius = 0.4 + (Math.sin(i * 123.45) * 0.5 + 0.5) * 0.2;
      const height = (Math.cos(i * 678.9) * 0.5) * 0.3;
      return [
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      ] as [number, number, number];
    });
  }, [atoms]);

  return (
    <group position={position}>
      {atoms.map((symbol, i) => (
        <Atom
          key={i}
          symbol={symbol}
          position={positions[i]}
          scale={0.8}
        />
      ))}
    </group>
  );
}

// Balance scale
function BalanceScale({
  leftWeight,
  rightWeight,
  status,
}: {
  leftWeight: number;
  rightWeight: number;
  status: "idle" | "correct" | "incorrect";
}) {
  const leftPanRef = useRef<THREE.Group>(null);
  const rightPanRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!leftPanRef.current || !rightPanRef.current || !beamRef.current) return;

    // Calculate tilt based on weight difference
    const diff = rightWeight - leftWeight;
    const maxTilt = 0.3;
    const targetTilt = Math.max(-maxTilt, Math.min(maxTilt, diff * 0.01));

    // Smooth rotation
    const currentTilt = beamRef.current.rotation.z;
    const newTilt = currentTilt + (targetTilt - currentTilt) * 0.05;
    beamRef.current.rotation.z = newTilt;

    // Update pan positions
    const panOffset = Math.sin(newTilt) * 2;
    leftPanRef.current.position.y = -panOffset;
    rightPanRef.current.position.y = panOffset;
  });

  // Status color
  const statusColor = status === "correct" ? palette.green : status === "incorrect" ? palette.pink : palette.cyan;

  return (
    <group>
      {/* Base */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.3, 32]} />
        <meshPhysicalMaterial
          color={palette.steel}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Central pillar */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 3, 16]} />
        <meshPhysicalMaterial
          color={palette.steel}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Beam */}
      <mesh ref={beamRef} position={[0, 1, 0]}>
        <boxGeometry args={[5, 0.15, 0.15]} />
        <meshPhysicalMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Left chain */}
      <mesh position={[-2, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
        <meshPhysicalMaterial
          color={palette.amber}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Right chain */}
      <mesh position={[2, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
        <meshPhysicalMaterial
          color={palette.amber}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Left pan */}
      <group ref={leftPanRef} position={[-2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.5, 0.1, 32]} />
          <meshPhysicalMaterial
            color={palette.purple}
            emissive={palette.purple}
            emissiveIntensity={0.2}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.15}
          color={palette.white}
          anchorX="center"
        >
          INPUT
        </Text>
      </group>

      {/* Right pan */}
      <group ref={rightPanRef} position={[2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.5, 0.1, 32]} />
          <meshPhysicalMaterial
            color={palette.cyan}
            emissive={palette.cyan}
            emissiveIntensity={0.2}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.15}
          color={palette.white}
          anchorX="center"
        >
          TARGET
        </Text>
      </group>
    </group>
  );
}

// Floating atoms decoration
function FloatingAtoms() {
  const atoms = ["H", "C", "O", "N"];
  const positions: [number, number, number][] = [
    [-3, 2, -2],
    [3, 2.5, -1],
    [-2.5, -1, -2],
    [2.8, -0.5, -1.5],
  ];

  return (
    <group>
      {atoms.map((symbol, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.3}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <Atom symbol={symbol} position={positions[i]} scale={0.6} />
        </Float>
      ))}
    </group>
  );
}

// Value display above pans
function ValueDisplay({
  position,
  value,
  unit,
  label,
}: {
  position: [number, number, number];
  value: number | null;
  unit: string;
  label: string;
}) {
  const displayValue = value !== null ? value.toFixed(2) : "---";

  return (
    <group position={position}>
      <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
        <Text fontSize={0.2} color={palette.white} anchorX="center">
          {label}
        </Text>
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.35}
          color={palette.cyan}
          anchorX="center"
        >
          {displayValue}
        </Text>
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.15}
          color={palette.white}
          anchorX="center"
          fillOpacity={0.6}
        >
          {unit}
        </Text>
      </Float>
    </group>
  );
}

export default function MoleCanvas({
  stageLabel,
  unit,
  inputValue,
  targetValue,
  status,
}: MoleCanvasProps) {
  // Generate sample molecules for decoration
  const leftMolecules = useMemo(() => {
    if (inputValue === null) return [];
    const count = Math.min(Math.floor(inputValue / 10), 5);
    return Array.from({ length: count }, () => ["H", "O", "H"]);
  }, [inputValue]);

  const rightMolecules = useMemo(() => {
    if (targetValue === null) return [];
    const count = Math.min(Math.floor(targetValue / 10), 5);
    return Array.from({ length: count }, () => ["C", "O", "O"]);
  }, [targetValue]);

  return (
    <div className="relative w-full h-[800px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 2, 10], fov: 55 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, 3, 3]} intensity={0.8} color={palette.purple} />
        <pointLight position={[0, -2, 5]} intensity={0.6} color={palette.cyan} />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
        />

        {/* Balance scale */}
        <BalanceScale
          leftWeight={inputValue || 0}
          rightWeight={targetValue || 0}
          status={status}
        />

        {/* Molecular clusters on pans */}
        {leftMolecules.map((atoms, i) => (
          <MolecularCluster
            key={`left-${i}`}
            atoms={atoms}
            position={[-2, 0.3 + i * 0.4, 0]}
          />
        ))}

        {rightMolecules.map((atoms, i) => (
          <MolecularCluster
            key={`right-${i}`}
            atoms={atoms}
            position={[2, 0.3 + i * 0.4, 0]}
          />
        ))}

        {/* Value displays */}
        <ValueDisplay
          position={[-2, 2.5, 0]}
          value={inputValue}
          unit={unit}
          label="INPUT"
        />

        <ValueDisplay
          position={[2, 2.5, 0]}
          value={targetValue}
          unit={unit}
          label="TARGET"
        />

        {/* Floating decoration atoms */}
        <FloatingAtoms />

        {/* Title */}
        <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
          <Text
            position={[0, 4, 0]}
            fontSize={0.4}
            color={palette.white}
            anchorX="center"
          >
            MOLECULAR BALANCE
          </Text>
        </Float>

        {/* Stage label */}
        <Text
          position={[0, 3.5, 0]}
          fontSize={0.2}
          color={palette.cyan}
          anchorX="center"
        >
          {stageLabel}
        </Text>
      </Canvas>

      {/* Cyber-Euler HUD */}
      <div className="absolute top-4 left-4 flex gap-2 items-center">
        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${status === "correct" ? "bg-green-400" : status === "incorrect" ? "bg-pink-400" : "bg-cyan-400"
          }`} />
        <span className="text-[8px] font-mono text-white/90 tracking-[0.3em] uppercase">
          Mole_Master v2.0
        </span>
      </div>

      {/* Status indicator */}
      {status !== "idle" && (
        <div className={`absolute top-4 right-4 px-4 py-2 rounded-lg border ${status === "correct"
            ? "bg-green-500/20 border-green-400/50 text-green-400"
            : "bg-pink-500/20 border-pink-400/50 text-pink-400"
          }`}>
          <div className="text-[10px] font-mono uppercase tracking-wider">
            {status === "correct" ? "✓ BALANCED" : "✗ UNBALANCED"}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/70 border border-white/60 rounded-lg px-4 py-3">
        <div className="text-[10px] text-white uppercase tracking-wider mb-2">
          Stoichiometry Lab
        </div>
        <div className="text-[9px] text-white/70 space-y-1">
          <div>• Balance shows <span className="text-purple-400">INPUT</span> vs <span className="text-cyan-400">TARGET</span> values</div>
          <div>• Scale tilts based on mass/mole difference</div>
          <div>• Atoms appear as molecular clusters on pans</div>
        </div>
      </div>

      {/* Module info */}
      <div className="absolute top-4 right-4 text-[8px] font-mono text-white/60 text-right">
        CHAMBER // C1.02<br />
        MOLE_BALANCE: ACTIVE<br />
        STATUS: {status.toUpperCase()}
      </div>
    </div>
  );
}
