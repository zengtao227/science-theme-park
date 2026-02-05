"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { pseudoRandom } from "@/lib/math";

interface ThermalCanvasProps {
  temperature: number; // in Celsius
  phase: "solid" | "liquid" | "gas";
  mass?: number;
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
  ice: "#a0d8ff",
  water: "#4da6ff",
  steam: "#ff6b9d",
};

// Particle system with phase-dependent behavior
function ParticleSystem({
  temperature,
  phase,
}: {
  temperature: number;
  phase: "solid" | "liquid" | "gas";
}) {
  const particleCount = 200;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());

  // Initialize particle positions based on phase
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      let x, y, z;
      const seed = i * 2;

      if (phase === "solid") {
        // Cubic lattice structure
        const gridSize = Math.ceil(Math.pow(particleCount, 1 / 3));
        const spacing = 0.3;
        const ix = i % gridSize;
        const iy = Math.floor(i / gridSize) % gridSize;
        const iz = Math.floor(i / (gridSize * gridSize));
        x = (ix - gridSize / 2) * spacing;
        y = (iy - gridSize / 2) * spacing;
        z = (iz - gridSize / 2) * spacing;
      } else if (phase === "liquid") {
        // Clustered but mobile
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 1 + pseudoRandom(seed) * 0.5;
        x = Math.cos(angle) * radius + (pseudoRandom(seed + 1) - 0.5) * 0.3;
        y = (pseudoRandom(seed + 2) - 0.5) * 2;
        z = Math.sin(angle) * radius + (pseudoRandom(seed + 1) - 0.5) * 0.3;
      } else {
        // Gas - dispersed
        x = (pseudoRandom(seed) - 0.5) * 4;
        y = (pseudoRandom(seed + 1) - 0.5) * 4;
        z = (pseudoRandom(seed + 2) - 0.5) * 4;
      }

      return {
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (pseudoRandom(seed + 3) - 0.5) * 0.02,
          (pseudoRandom(seed + 4) - 0.5) * 0.02,
          (pseudoRandom(seed + 5) - 0.5) * 0.02
        ),
        phase: i,
      };
    });
  }, [phase, particleCount]);

  useFrame(() => {
    if (!meshRef.current) return;

    const d = dummy.current;
    const tempFactor = Math.max(0, temperature / 100);

    particles.forEach((particle, i) => {
      // Vibration intensity based on temperature
      const vibrationIntensity = tempFactor * (phase === "solid" ? 0.05 : phase === "liquid" ? 0.1 : 0.3);

      // Update velocity based on phase
      if (phase === "solid") {
        // Vibrate around fixed position
        const offset = new THREE.Vector3(
          Math.sin(Date.now() * 0.01 + i) * vibrationIntensity,
          Math.cos(Date.now() * 0.01 + i * 1.3) * vibrationIntensity,
          Math.sin(Date.now() * 0.01 + i * 0.7) * vibrationIntensity
        );
        d.position.copy(particle.position).add(offset);
      } else if (phase === "liquid") {
        // Flow with deterministic "noise"
        const noiseX = Math.sin(Date.now() * 0.005 + i) * 0.005;
        const noiseY = Math.cos(Date.now() * 0.005 + i * 1.2) * 0.005;
        const noiseZ = Math.sin(Date.now() * 0.005 + i * 0.8) * 0.005;

        particle.velocity.multiplyScalar(0.98);
        particle.velocity.add(new THREE.Vector3(noiseX, noiseY, noiseZ));
        particle.position.add(particle.velocity);

        if (particle.position.length() > 2) {
          particle.velocity.multiplyScalar(-0.5);
        }

        d.position.copy(particle.position);
      } else {
        // Gas - deterministic free movement
        const noiseX = Math.sin(Date.now() * 0.008 + i) * 0.01;
        const noiseY = Math.cos(Date.now() * 0.008 + i * 1.5) * 0.01;
        const noiseZ = Math.sin(Date.now() * 0.008 + i * 0.9) * 0.01;

        particle.velocity.multiplyScalar(0.99);
        particle.velocity.add(new THREE.Vector3(noiseX, noiseY, noiseZ));
        particle.position.add(particle.velocity);

        const bound = 3;
        if (Math.abs(particle.position.x) > bound) particle.velocity.x *= -1;
        if (Math.abs(particle.position.y) > bound) particle.velocity.y *= -1;
        if (Math.abs(particle.position.z) > bound) particle.velocity.z *= -1;

        d.position.copy(particle.position);
      }

      // Scale based on temperature
      const scale = 0.08 + tempFactor * 0.02;
      d.scale.setScalar(scale);
      d.updateMatrix();
      meshRef.current!.setMatrixAt(i, d.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Color based on phase
  const color = phase === "solid" ? palette.ice : phase === "liquid" ? palette.water : palette.steam;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={phase === "gas" ? 0.8 : 0.3}
        metalness={0.5}
        roughness={0.3}
        transparent
        opacity={phase === "gas" ? 0.6 : 0.9}
      />
    </instancedMesh>
  );
}

// Container
function HolographicContainer() {
  return (
    <group>
      {/* Container walls */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 6, 6]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          transparent
          opacity={0.1}
          metalness={0.9}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* Container edges */}
      {[
        [-3, -3, -3, 3, -3, -3],
        [-3, 3, -3, 3, 3, -3],
        [-3, -3, 3, 3, -3, 3],
        [-3, 3, 3, 3, 3, 3],
        [-3, -3, -3, -3, 3, -3],
        [3, -3, -3, 3, 3, -3],
        [-3, -3, 3, -3, 3, 3],
        [3, -3, 3, 3, 3, 3],
        [-3, -3, -3, -3, -3, 3],
        [3, -3, -3, 3, -3, 3],
        [-3, 3, -3, -3, 3, 3],
        [3, 3, -3, 3, 3, 3],
      ].map((coords, i) => (
        <mesh key={i} position={[
          (coords[0] + coords[3]) / 2,
          (coords[1] + coords[4]) / 2,
          (coords[2] + coords[5]) / 2,
        ]}>
          <cylinderGeometry args={[0.02, 0.02, Math.sqrt(
            Math.pow(coords[3] - coords[0], 2) +
            Math.pow(coords[4] - coords[1], 2) +
            Math.pow(coords[5] - coords[2], 2)
          ), 8]} />
          <meshBasicMaterial color={palette.cyan} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// Temperature display
function TemperatureHUD({ temperature, phase }: { temperature: number; phase: string }) {
  return (
    <group position={[0, 4, 0]}>
      <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
        <Text fontSize={0.4} color={palette.white} anchorX="center">
          THERMAL DYNAMICS LAB
        </Text>
        <Text position={[0, -0.6, 0]} fontSize={0.3} color={palette.cyan} anchorX="center">
          {temperature.toFixed(1)}°C
        </Text>
        <Text position={[0, -1, 0]} fontSize={0.2} color={palette.amber} anchorX="center">
          Phase: {phase.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export default function ThermalCanvas({
  temperature = 25,
  phase = "liquid",
  mass = 1,
}: ThermalCanvasProps) {
  const [localTemp, setLocalTemp] = useState(temperature);
  const [localPhase, setLocalPhase] = useState<"solid" | "liquid" | "gas">(phase);

  // Auto-update phase based on temperature
  const updatePhase = (temp: number) => {
    if (temp < 0) return "solid";
    if (temp < 100) return "liquid";
    return "gas";
  };

  const handleTempChange = (newTemp: number) => {
    setLocalTemp(newTemp);
    setLocalPhase(updatePhase(newTemp));
  };

  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [8, 6, 8], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.6} color={palette.cyan} />
        <pointLight position={[0, 5, -5]} intensity={0.5} color={palette.purple} />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />

        {/* Container */}
        <HolographicContainer />

        {/* Particle system */}
        <ParticleSystem temperature={localTemp} phase={localPhase} />

        {/* HUD */}
        <TemperatureHUD temperature={localTemp} phase={localPhase} />
      </Canvas>

      {/* Temperature control */}
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
            Temperature (°C)
          </span>
          <span className="text-[10px] font-mono text-cyan-400">
            {localTemp.toFixed(1)}°C
          </span>
        </div>
        <input
          type="range"
          min="-50"
          max="150"
          step="1"
          value={localTemp}
          onChange={(e) => handleTempChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-cyan-400
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,229,255,0.5)]
                     [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-[8px] text-white/30 font-mono">
          <span>ICE (-50°C)</span>
          <span>WATER (0-100°C)</span>
          <span>STEAM (150°C)</span>
        </div>
      </div>

      {/* Phase info */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          Current Phase
        </div>
        <div className="text-lg font-mono text-white font-black">
          {localPhase.toUpperCase()}
        </div>
        <div className="text-[8px] text-white/50">
          {localPhase === "solid" && "Cubic lattice structure"}
          {localPhase === "liquid" && "Fluid dynamics active"}
          {localPhase === "gas" && "High-energy chaos"}
        </div>
      </div>

      {/* Formula */}
      <div className="absolute top-4 right-4 bg-black/70 border border-purple-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-purple-400/60 uppercase tracking-wider mb-1">
          Heat Transfer
        </div>
        <div className="text-[11px] font-mono text-white">
          Q = mcΔT
        </div>
        <div className="text-[9px] text-white/40 mt-1">
          m = {mass}kg
        </div>
      </div>

      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // P2.01<br />
        THERMAL_SIM: ACTIVE<br />
        PARTICLES: 200
      </div>
    </div>
  );
}
