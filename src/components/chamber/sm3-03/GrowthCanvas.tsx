"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Float } from "@react-three/drei";
import * as THREE from "three";
import { pseudoRandom } from "@/lib/math";

interface GrowthCanvasProps {
  doublingTime?: number; // in hours
  initialCount?: number;
  currentTime?: number;
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
};

// Bacterial cell
function BacteriaCell({ position, scale = 1 }: { position: THREE.Vector3; scale?: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2 + position.x * 10) * 0.1;
    meshRef.current.scale.setScalar(scale * pulse);
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Cell body */}
      <mesh>
        <capsuleGeometry args={[0.15 * scale, 0.3 * scale, 8, 16]} />
        <meshPhysicalMaterial
          color={palette.green}
          emissive={palette.green}
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Nucleus */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.08 * scale, 12, 12]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          emissive={palette.cyan}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}

// Petri dish with bacteria
function PetriDish({ bacteriaCount }: { bacteriaCount: number }) {
  const bacteria = useMemo(() => {
    const items = [];
    const radius = 2.5;

    for (let i = 0; i < bacteriaCount; i++) {
      const seed = i * 1.5;
      const angle = (i / bacteriaCount) * Math.PI * 2 + pseudoRandom(seed) * 0.5;
      const r = pseudoRandom(seed + 1) * radius;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (pseudoRandom(seed + 2) - 0.5) * 0.2;
      const scale = 0.8 + pseudoRandom(seed + 3) * 0.4;
      items.push({
        position: new THREE.Vector3(x, y, z),
        scale
      });
    }

    return items;
  }, [bacteriaCount]);

  return (
    <group position={[0, 0, 0]}>
      {/* Petri dish base */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3, 3, 0.1, 64]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          transparent
          opacity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Petri dish rim */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 64]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          emissive={palette.cyan}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Bacteria */}
      {bacteria.map((item, i) => (
        <BacteriaCell key={i} position={item.position} scale={item.scale} />
      ))}
    </group>
  );
}

// Semi-log coordinate system
function SemiLogGrid({ doublingTime, initialCount, maxTime }: {
  doublingTime: number;
  initialCount: number;
  maxTime: number;
}) {
  // Generate exponential curve points
  const curvePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const steps = 50;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxTime;
      const N = initialCount * Math.pow(2, t / doublingTime);
      const logN = Math.log10(N);

      // Map to 3D space
      const x = (t / maxTime) * 6 - 3;
      const y = logN * 0.5 - 1;

      points.push(new THREE.Vector3(x, y, 0));
    }

    return points;
  }, [doublingTime, initialCount, maxTime]);

  // Grid lines (log scale on Y)
  const gridLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];

    // Horizontal lines (log scale)
    for (let logY = 0; logY <= 6; logY++) {
      const y = logY * 0.5 - 1;
      lines.push([
        new THREE.Vector3(-3, y, -0.1),
        new THREE.Vector3(3, y, -0.1),
      ]);
    }

    // Vertical lines (linear time)
    for (let i = 0; i <= 6; i++) {
      const x = (i / 6) * 6 - 3;
      lines.push([
        new THREE.Vector3(x, -1, -0.1),
        new THREE.Vector3(x, 2, -0.1),
      ]);
    }

    return lines;
  }, []);

  return (
    <group position={[0, -2, -2]}>
      {/* Grid */}
      {gridLines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={palette.white}
          lineWidth={1}
          transparent
          opacity={0.2}
        />
      ))}

      {/* Exponential curve */}
      <Line
        points={curvePoints}
        color={palette.green}
        lineWidth={4}
      />

      {/* Axes labels */}
      <Text position={[0, -1.5, 0]} fontSize={0.15} color={palette.white} anchorX="center">
        Time (hours)
      </Text>

      <Text position={[-3.5, 0.5, 0]} fontSize={0.15} color={palette.white} rotation={[0, 0, Math.PI / 2]}>
        log₁₀(N)
      </Text>

      {/* Y-axis labels */}
      {[0, 1, 2, 3, 4, 5, 6].map((logY) => (
        <Text
          key={logY}
          position={[-3.3, logY * 0.5 - 1, 0]}
          fontSize={0.12}
          color={palette.cyan}
          anchorX="right"
        >
          10^{logY}
        </Text>
      ))}
    </group>
  );
}

// Info HUD
function GrowthHUD({
  doublingTime,
  initialCount,
  currentTime,
}: {
  doublingTime: number;
  initialCount: number;
  currentTime: number;
}) {
  const currentCount = Math.floor(initialCount * Math.pow(2, currentTime / doublingTime));

  return (
    <group position={[0, 3.5, 0]}>
      <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
        <Text fontSize={0.4} color={palette.white} anchorX="center">
          EXPONENTIAL GROWTH LAB
        </Text>
        <Text position={[0, -0.6, 0]} fontSize={0.25} color={palette.green} anchorX="center">
          N(t) = N₀ · 2^(t/d)
        </Text>
        <Text position={[0, -1, 0]} fontSize={0.2} color={palette.cyan} anchorX="center">
          Count: {currentCount.toLocaleString()}
        </Text>
      </Float>
    </group>
  );
}

export default function GrowthCanvas({
  doublingTime = 2,
  initialCount = 10,
  currentTime = 0,
}: GrowthCanvasProps) {
  const [localTime, setLocalTime] = useState(currentTime);
  const maxTime = doublingTime * 6; // Show 6 doublings

  const bacteriaCount = Math.min(
    Math.floor(initialCount * Math.pow(2, localTime / doublingTime)),
    200 // Cap for performance
  );

  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.6} color={palette.green} />
        <pointLight position={[0, 5, -5]} intensity={0.5} color={palette.cyan} />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={12}
          autoRotate={false}
        />

        {/* Petri dish */}
        <PetriDish bacteriaCount={bacteriaCount} />

        {/* Semi-log graph */}
        <SemiLogGrid
          doublingTime={doublingTime}
          initialCount={initialCount}
          maxTime={maxTime}
        />

        {/* HUD */}
        <GrowthHUD
          doublingTime={doublingTime}
          initialCount={initialCount}
          currentTime={localTime}
        />
      </Canvas>

      {/* Time control */}
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-white uppercase tracking-wider">
            Time (hours)
          </span>
          <span className="text-[10px] font-mono text-green-400">
            {localTime.toFixed(1)}h
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={maxTime}
          step="0.1"
          value={localTime}
          onChange={(e) => setLocalTime(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-green-400
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(57,255,20,0.5)]
                     [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-[8px] text-white/70 font-mono">
          <span>0h</span>
          <span>{(maxTime / 2).toFixed(0)}h</span>
          <span>{maxTime.toFixed(0)}h</span>
        </div>
      </div>

      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-green-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-green-400/60 uppercase tracking-wider">
          Growth Parameters
        </div>
        <div className="text-[11px] font-mono text-white space-y-1">
          <div>N₀ = {initialCount}</div>
          <div>d = {doublingTime}h</div>
          <div>N = {bacteriaCount.toLocaleString()}</div>
        </div>
      </div>

      {/* Formula */}
      <div className="absolute top-4 right-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider mb-1">
          Exponential Model
        </div>
        <div className="text-[11px] font-mono text-white">
          N(t) = N₀ · 2^(t/d)
        </div>
        <div className="text-[9px] text-white/90 mt-1">
          Semi-log plot
        </div>
      </div>

      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        CHAMBER // S3.03<br />
        GROWTH_SIM: ACTIVE<br />
        BACTERIA: {bacteriaCount}
      </div>
    </div>
  );
}
