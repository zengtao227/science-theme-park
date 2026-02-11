"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";

interface WaveOpticsCanvasProps {
  stage: "INTERFERENCE" | "DIFFRACTION" | "POLARIZATION";
  wavelength?: number; // in nm
  slitSeparation?: number; // in μm
  slitWidth?: number; // in μm
  angle?: number; // polarization angle in degrees
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
  red: "#ff0000",
  blue: "#0000ff",
};

// Double-slit interference pattern
function InterferencePattern({ wavelength, slitSeparation }: { wavelength: number; slitSeparation: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  
  const patternData = useMemo(() => {
    const points: { x: number; y: number; intensity: number }[] = [];
    const lambda = wavelength / 1000; // nm to μm
    const d = slitSeparation;
    const screenDistance = 100; // μm
    
    // Calculate interference pattern
    for (let i = 0; i < 100; i++) {
      const y = (i - 50) * 2; // screen position
      const theta = Math.atan(y / screenDistance);
      const pathDiff = d * Math.sin(theta);
      const phase = (2 * Math.PI * pathDiff) / lambda;
      const intensity = Math.pow(Math.cos(phase / 2), 2);
      
      points.push({ x: screenDistance / 10, y: y / 10, intensity });
    }
    
    return points;
  }, [wavelength, slitSeparation]);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const d = dummy.current;
    patternData.forEach((point, i) => {
      d.position.set(point.x, point.y, 0);
      const pulse = 1 + Math.sin(clock.elapsedTime * 2 + point.y * 0.1) * 0.1;
      d.scale.setScalar(point.intensity * 0.3 * pulse);
      d.updateMatrix();
      meshRef.current!.setMatrixAt(i, d.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <group>
      {/* Double slits */}
      <mesh position={[-5, 1.5, 0]}>
        <boxGeometry args={[0.2, 2, 0.1]} />
        <meshPhysicalMaterial color={palette.cyan} emissive={palette.cyan} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-5, -1.5, 0]}>
        <boxGeometry args={[0.2, 2, 0.1]} />
        <meshPhysicalMaterial color={palette.cyan} emissive={palette.cyan} emissiveIntensity={0.5} />
      </mesh>
      
      {/* Screen */}
      <mesh position={[10, 0, 0]}>
        <planeGeometry args={[0.1, 20]} />
        <meshPhysicalMaterial color={palette.white} transparent opacity={0.3} />
      </mesh>
      
      {/* Interference pattern */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, 100]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshPhysicalMaterial
          color={palette.amber}
          emissive={palette.amber}
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </instancedMesh>
      
      {/* Light rays */}
      <Line
        points={[[-5, 1.5, 0], [10, 5, 0]]}
        color={palette.amber}
        lineWidth={2}
        transparent
        opacity={0.3}
      />
      <Line
        points={[[-5, -1.5, 0], [10, -5, 0]]}
        color={palette.amber}
        lineWidth={2}
        transparent
        opacity={0.3}
      />
    </group>
  );
}

// Single-slit diffraction pattern
function DiffractionPattern({ wavelength, slitWidth }: { wavelength: number; slitWidth: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  
  const patternData = useMemo(() => {
    const points: { x: number; y: number; intensity: number }[] = [];
    const lambda = wavelength / 1000; // nm to μm
    const a = slitWidth;
    const screenDistance = 100; // μm
    
    // Calculate diffraction pattern
    for (let i = 0; i < 100; i++) {
      const y = (i - 50) * 2;
      const theta = Math.atan(y / screenDistance);
      const beta = (Math.PI * a * Math.sin(theta)) / lambda;
      
      let intensity = 1;
      if (Math.abs(beta) > 0.001) {
        intensity = Math.pow(Math.sin(beta) / beta, 2);
      }
      
      points.push({ x: screenDistance / 10, y: y / 10, intensity });
    }
    
    return points;
  }, [wavelength, slitWidth]);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const d = dummy.current;
    patternData.forEach((point, i) => {
      d.position.set(point.x, point.y, 0);
      const pulse = 1 + Math.sin(clock.elapsedTime * 2 + point.y * 0.1) * 0.1;
      d.scale.setScalar(point.intensity * 0.4 * pulse);
      d.updateMatrix();
      meshRef.current!.setMatrixAt(i, d.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <group>
      {/* Single slit */}
      <mesh position={[-5, 0, 0]}>
        <boxGeometry args={[0.2, 4, 0.1]} />
        <meshPhysicalMaterial color={palette.purple} emissive={palette.purple} emissiveIntensity={0.5} />
      </mesh>
      
      {/* Screen */}
      <mesh position={[10, 0, 0]}>
        <planeGeometry args={[0.1, 20]} />
        <meshPhysicalMaterial color={palette.white} transparent opacity={0.3} />
      </mesh>
      
      {/* Diffraction pattern */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, 100]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshPhysicalMaterial
          color={palette.pink}
          emissive={palette.pink}
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </instancedMesh>
    </group>
  );
}

// Polarization visualization
function PolarizationPattern({ angle }: { angle: number }) {
  const waveRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!waveRef.current) return;
    waveRef.current.rotation.z = (angle * Math.PI) / 180;
  });
  
  const intensity = Math.pow(Math.cos((angle * Math.PI) / 180), 2);
  
  return (
    <group>
      {/* Polarizer 1 (vertical) */}
      <mesh position={[-8, 0, 0]}>
        <planeGeometry args={[0.1, 6]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          transparent
          opacity={0.5}
          emissive={palette.cyan}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Polarizer 2 (rotatable) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, (angle * Math.PI) / 180]}>
        <planeGeometry args={[0.1, 6]} />
        <meshPhysicalMaterial
          color={palette.purple}
          transparent
          opacity={0.5}
          emissive={palette.purple}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Wave before polarizer 1 */}
      <group position={[-10, 0, 0]} ref={waveRef}>
        {Array.from({ length: 20 }).map((_, i) => {
          const x = (i - 10) * 0.3;
          const y = Math.sin(i * 0.5) * 2;
          return (
            <mesh key={i} position={[x, y, 0]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshPhysicalMaterial
                color={palette.amber}
                emissive={palette.amber}
                emissiveIntensity={1}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Wave after polarizer 2 */}
      <group position={[2, 0, 0]}>
        {Array.from({ length: 20 }).map((_, i) => {
          const x = (i - 10) * 0.3;
          const y = 0;
          return (
            <mesh key={i} position={[x, y, 0]}>
              <sphereGeometry args={[0.1 * intensity, 8, 8]} />
              <meshPhysicalMaterial
                color={palette.green}
                emissive={palette.green}
                emissiveIntensity={intensity}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Intensity indicator */}
      <Text position={[8, 0, 0]} fontSize={0.5} color={palette.white}>
        I = I₀ cos²θ
      </Text>
      <Text position={[8, -1, 0]} fontSize={0.4} color={palette.green}>
        {(intensity * 100).toFixed(0)}%
      </Text>
    </group>
  );
}

export default function WaveOpticsCanvas({
  stage = "INTERFERENCE",
  wavelength = 550,
  slitSeparation = 50,
  slitWidth = 20,
  angle = 0,
}: WaveOpticsCanvasProps) {
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color={palette.cyan} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={15}
          maxDistance={30}
          autoRotate={false}
        />
        
        {/* Stage-specific visualization */}
        {stage === "INTERFERENCE" && (
          <InterferencePattern wavelength={wavelength} slitSeparation={slitSeparation} />
        )}
        {stage === "DIFFRACTION" && (
          <DiffractionPattern wavelength={wavelength} slitWidth={slitWidth} />
        )}
        {stage === "POLARIZATION" && <PolarizationPattern angle={angle} />}
      </Canvas>
      
      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          {stage === "INTERFERENCE" && "Double-Slit Interference"}
          {stage === "DIFFRACTION" && "Single-Slit Diffraction"}
          {stage === "POLARIZATION" && "Polarization (Malus' Law)"}
        </div>
        <div className="text-[11px] font-mono text-white">
          {stage === "INTERFERENCE" && `λ = ${wavelength}nm, d = ${slitSeparation}μm`}
          {stage === "DIFFRACTION" && `λ = ${wavelength}nm, a = ${slitWidth}μm`}
          {stage === "POLARIZATION" && `θ = ${angle}°`}
        </div>
      </div>
      
      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        CHAMBER // P3.02<br />
        WAVE_OPTICS: ACTIVE<br />
        MODE: {stage}
      </div>
    </div>
  );
}
