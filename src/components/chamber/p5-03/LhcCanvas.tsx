"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";
import * as THREE from "three";

interface LhcCanvasProps {
  stage: "CONSTANT_B" | "VARYING_V" | "MASS_SPEC";
  magneticField?: number; // Tesla
  velocity?: number; // m/s
  mass?: number; // kg
  charge?: number; // C
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
};

// LHC Ring
function AcceleratorRing({ radius }: { radius: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = clock.elapsedTime * 0.1;
  });
  
  return (
    <group>
      {/* Main ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.2, 16, 100]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          emissive={palette.cyan}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Ring segments (magnets) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[1, 0.3, 0.3]} />
            <meshPhysicalMaterial
              color={palette.purple}
              emissive={palette.purple}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
      
      {/* Target marker */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial
          color={palette.green}
          emissive={palette.green}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}

// Particle beam
function ParticleBeam({
  velocity,
  mass,
  charge,
  magneticField,
  targetRadius,
}: {
  velocity: number;
  mass: number;
  charge: number;
  magneticField: number;
  targetRadius: number;
}) {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  
  // Calculate actual radius: r = mv/(qB)
  const actualRadius = magneticField > 0 ? (mass * velocity) / (Math.abs(charge) * magneticField) : 100;
  const isOnTarget = Math.abs(actualRadius - targetRadius) < 0.5;
  
  const particleCount = 50;
  
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    const d = dummy.current;
    const time = clock.elapsedTime;
    
    for (let i = 0; i < particleCount; i++) {
      const progress = (time * 0.5 + i / particleCount) % 1;
      const angle = progress * Math.PI * 2;
      
      const x = Math.cos(angle) * actualRadius;
      const y = Math.sin(angle) * actualRadius;
      
      d.position.set(x, y, 0);
      d.scale.setScalar(0.15);
      d.updateMatrix();
      particlesRef.current.setMatrixAt(i, d.matrix);
    }
    
    particlesRef.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <group>
      {/* Particle trail */}
      <mesh>
        <torusGeometry args={[actualRadius, 0.05, 8, 100]} />
        <meshBasicMaterial
          color={isOnTarget ? palette.green : palette.pink}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshPhysicalMaterial
          color={isOnTarget ? palette.green : palette.pink}
          emissive={isOnTarget ? palette.green : palette.pink}
          emissiveIntensity={1}
        />
      </instancedMesh>
      
      {/* Radius indicator */}
      <Line
        points={[
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(Math.min(actualRadius, 15), 0, 0),
        ]}
        color={isOnTarget ? palette.green : palette.pink}
        lineWidth={2}
        dashed
        dashSize={0.3}
        gapSize={0.15}
      />
      
      {/* Radius label */}
      <Text
        position={[Math.min(actualRadius, 15) / 2, -0.5, 0]}
        fontSize={0.3}
        color={isOnTarget ? palette.green : palette.pink}
      >
        r = {actualRadius.toFixed(2)}m
      </Text>
    </group>
  );
}

// Magnetic field visualization
function MagneticField({ strength }: { strength: number }) {
  const fieldLines: THREE.Vector3[][] = [];
  
  // Create field line pattern
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const points: THREE.Vector3[] = [];
    for (let r = 2; r <= 10; r += 0.5) {
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      points.push(new THREE.Vector3(x, y, 0));
    }
    fieldLines.push(points);
  }
  
  return (
    <group>
      {fieldLines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={palette.purple}
          lineWidth={1}
          transparent
          opacity={0.2 + Math.min(strength * 0.1, 0.5)}
        />
      ))}
      
      {/* Field strength indicator */}
      <Text position={[0, -12, 0]} fontSize={0.4} color={palette.purple}>
        B = {strength.toFixed(3)} T
      </Text>
    </group>
  );
}

export default function LhcCanvas({
  stage = "CONSTANT_B",
  magneticField = 1,
  velocity = 1e7,
  mass = 1.67e-27,
  charge = 1.6e-19,
}: LhcCanvasProps) {
  const targetRadius = 5; // meters
  
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
        
        {/* Magnetic field */}
        <MagneticField strength={magneticField} />
        
        {/* Accelerator ring */}
        <AcceleratorRing radius={targetRadius} />
        
        {/* Particle beam */}
        <ParticleBeam
          velocity={velocity}
          mass={mass}
          charge={charge}
          magneticField={magneticField}
          targetRadius={targetRadius}
        />
        
        {/* HUD */}
        <Text position={[0, 13, 0]} fontSize={0.5} color={palette.white}>
          LHC CALIBRATION
        </Text>
        <Text position={[0, 12, 0]} fontSize={0.3} color={palette.cyan}>
          r = mv/(qB)
        </Text>
      </Canvas>
      
      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          {stage === "CONSTANT_B" && "Constant Magnetic Field"}
          {stage === "VARYING_V" && "Variable Velocity"}
          {stage === "MASS_SPEC" && "Mass Spectrometry"}
        </div>
        <div className="text-[11px] font-mono text-white space-y-1">
          <div>v = {(velocity / 1e6).toFixed(2)} × 10⁶ m/s</div>
          <div>B = {magneticField.toFixed(3)} T</div>
          <div>Target r = {targetRadius} m</div>
        </div>
      </div>
      
      {/* Formula */}
      <div className="absolute top-4 right-4 bg-black/70 border border-purple-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-purple-400/60 uppercase tracking-wider mb-1">
          Lorentz Force
        </div>
        <div className="text-[11px] font-mono text-white">
          F = qvB
        </div>
        <div className="text-[9px] text-white/40 mt-1">
          r = mv/(qB)
        </div>
      </div>
      
      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // P5.03<br />
        LHC_SIM: ACTIVE<br />
        MODE: {stage}
      </div>
    </div>
  );
}
