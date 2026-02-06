"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface LogarithmicCanvasProps {
  stage: "PH" | "DECIBEL" | "RICHTER";
  value?: number;
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
};

// pH Scale visualization
function PHScale({ value }: { value: number }) {
  const barRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!barRef.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2) * 0.05;
    barRef.current.scale.y = pulse;
  });
  
  // pH scale from 0 to 14
  const logPosition = value; // 0-14
  
  return (
    <group>
      {/* pH scale bar */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 14, 0.2]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* pH markers */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((ph) => (
        <group key={ph} position={[0, ph - 7, 0]}>
          <mesh>
            <boxGeometry args={[0.7, 0.1, 0.1]} />
            <meshBasicMaterial color={palette.white} />
          </mesh>
          <Text position={[-1.2, 0, 0]} fontSize={0.3} color={palette.white}>
            {ph}
          </Text>
          <Text position={[1.2, 0, 0]} fontSize={0.2} color={palette.cyan}>
            10^{-ph}
          </Text>
        </group>
      ))}
      
      {/* Current value indicator */}
      <mesh ref={barRef} position={[0, logPosition - 7, 0.3]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial
          color={palette.green}
          emissive={palette.green}
          emissiveIntensity={1}
        />
      </mesh>
      
      {/* Labels */}
      <Text position={[0, 8, 0]} fontSize={0.4} color={palette.white}>
        pH SCALE
      </Text>
      <Text position={[0, -8, 0]} fontSize={0.3} color={palette.cyan}>
        pH = -log₁₀[H⁺]
      </Text>
    </group>
  );
}

// Decibel Scale visualization
function DecibelScale({ value }: { value: number }) {
  const waveRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!waveRef.current) return;
    waveRef.current.rotation.z = clock.elapsedTime * 0.5;
  });
  
  // dB = 10 * log10(I/I0)
  const intensity = Math.pow(10, value / 10); // relative to I0
  
  return (
    <group>
      {/* dB scale */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 12, 32]} />
        <meshPhysicalMaterial
          color={palette.purple}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* dB markers */}
      {[0, 20, 40, 60, 80, 100, 120].map((db, i) => (
        <group key={db} position={[0, (i - 3) * 2, 0]}>
          <mesh>
            <torusGeometry args={[0.5, 0.05, 8, 32]} />
            <meshBasicMaterial color={palette.white} />
          </mesh>
          <Text position={[1, 0, 0]} fontSize={0.3} color={palette.white}>
            {db} dB
          </Text>
        </group>
      ))}
      
      {/* Sound wave visualization */}
      <group ref={waveRef} position={[0, (value / 20 - 3) * 2, 0]}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 0.5 + (intensity / 1000) * 0.5;
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshPhysicalMaterial
                color={palette.amber}
                emissive={palette.amber}
                emissiveIntensity={0.8}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Labels */}
      <Text position={[0, 7, 0]} fontSize={0.4} color={palette.white}>
        DECIBEL SCALE
      </Text>
      <Text position={[0, -7, 0]} fontSize={0.3} color={palette.purple}>
        L = 10·log₁₀(I/I₀)
      </Text>
    </group>
  );
}

// Richter Scale visualization
function RichterScale({ value }: { value: number }) {
  const quakeRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!quakeRef.current) return;
    const shake = Math.sin(clock.elapsedTime * 10) * (value / 10) * 0.1;
    quakeRef.current.position.x = shake;
  });
  
  // Amplitude is 10^magnitude
  
  return (
    <group>
      {/* Richter scale */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 10, 0.2]} />
        <meshPhysicalMaterial
          color={palette.pink}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Magnitude markers */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((mag) => (
        <group key={mag} position={[0, mag - 5, 0]}>
          <mesh>
            <boxGeometry args={[0.7, 0.1, 0.1]} />
            <meshBasicMaterial color={palette.white} />
          </mesh>
          <Text position={[-1.2, 0, 0]} fontSize={0.3} color={palette.white}>
            {mag}
          </Text>
          <Text position={[1.5, 0, 0]} fontSize={0.2} color={palette.pink}>
            10^{mag}
          </Text>
        </group>
      ))}
      
      {/* Earthquake visualization */}
      <group ref={quakeRef} position={[0, value - 5, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshPhysicalMaterial
            color={palette.pink}
            emissive={palette.pink}
            emissiveIntensity={1}
          />
        </mesh>
        
        {/* Shockwaves */}
        {[1, 2, 3].map((i) => (
          <mesh key={i} position={[0, 0, 0]}>
            <torusGeometry args={[0.3 * i, 0.05, 8, 32]} />
            <meshBasicMaterial
              color={palette.pink}
              transparent
              opacity={0.5 / i}
            />
          </mesh>
        ))}
      </group>
      
      {/* Labels */}
      <Text position={[0, 6, 0]} fontSize={0.4} color={palette.white}>
        RICHTER SCALE
      </Text>
      <Text position={[0, -6, 0]} fontSize={0.3} color={palette.pink}>
        M = log₁₀(A)
      </Text>
    </group>
  );
}

export default function LogarithmicCanvas({
  stage = "PH",
  value = 7,
}: LogarithmicCanvasProps) {
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [8, 0, 8], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color={palette.cyan} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={15}
          autoRotate={false}
        />
        
        {/* Stage-specific visualization */}
        {stage === "PH" && <PHScale value={value} />}
        {stage === "DECIBEL" && <DecibelScale value={value} />}
        {stage === "RICHTER" && <RichterScale value={value} />}
      </Canvas>
      
      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          {stage === "PH" && "pH Scale (Acidity)"}
          {stage === "DECIBEL" && "Decibel Scale (Sound)"}
          {stage === "RICHTER" && "Richter Scale (Earthquake)"}
        </div>
        <div className="text-[11px] font-mono text-white">
          {stage === "PH" && `pH = ${value.toFixed(1)}`}
          {stage === "DECIBEL" && `${value.toFixed(0)} dB`}
          {stage === "RICHTER" && `Magnitude ${value.toFixed(1)}`}
        </div>
      </div>
      
      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // S3.04<br />
        LOG_SCALE_SIM: ACTIVE<br />
        MODE: {stage}
      </div>
    </div>
  );
}
