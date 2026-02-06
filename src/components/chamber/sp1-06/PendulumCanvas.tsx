"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface PendulumCanvasProps {
  length: number; // meters
  gravity: number; // m/s^2
  initialAngle: number; // degrees
  onEnergyUpdate?: (kinetic: number, potential: number) => void;
}

function Pendulum({
  length,
  gravity,
  initialAngle,
  onEnergyUpdate,
}: PendulumCanvasProps) {
  const pivotRef = useRef<THREE.Group>(null);
  const bobRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  // Physics calculations
  const omega = Math.sqrt(gravity / length); // Angular frequency
  const thetaMax = (initialAngle * Math.PI) / 180; // Convert to radians

  useFrame((_, delta) => {
    timeRef.current += delta;
    
    if (pivotRef.current && bobRef.current) {
      // Angular displacement: θ(t) = θ_max * cos(ωt)
      const theta = thetaMax * Math.cos(omega * timeRef.current);
      pivotRef.current.rotation.z = theta;

      // Energy calculations
      const mass = 1; // kg (normalized)
      const height = length * (1 - Math.cos(theta)); // Height above lowest point
      const velocity = length * omega * thetaMax * Math.sin(omega * timeRef.current); // v = L * dθ/dt
      
      const potentialEnergy = mass * gravity * height;
      const kineticEnergy = 0.5 * mass * velocity * velocity;

      if (onEnergyUpdate) {
        onEnergyUpdate(kineticEnergy, potentialEnergy);
      }
    }
  });

  return (
    <group ref={pivotRef} position={[0, 2, 0]}>
      {/* Rod */}
      <mesh position={[0, -length / 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, length, 8]} />
        <meshPhysicalMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Bob (pendulum mass) */}
      <mesh ref={bobRef} position={[0, -length, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshPhysicalMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
        <pointLight color="#a855f7" intensity={2} distance={3} />
      </mesh>
    </group>
  );
}

function ClockMechanism() {
  const gearRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (gearRef.current) {
      gearRef.current.rotation.z = clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={[2, 1, 0]}>
      {/* Main gear */}
      <group ref={gearRef}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 12]} />
          <meshPhysicalMaterial
            color="#ffd166"
            emissive="#ffd166"
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        {/* Gear teeth */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.45, 0, Math.sin(angle) * 0.45]}
              rotation={[0, angle, 0]}
            >
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshPhysicalMaterial
                color="#ffd166"
                emissive="#ffd166"
                emissiveIntensity={0.3}
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>
          );
        })}
      </group>

      {/* Clock frame */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[1.2, 1.2, 0.1]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function Pivot() {
  return (
    <group position={[0, 2, 0]}>
      {/* Pivot point */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
        <pointLight color="#00e5ff" intensity={3} distance={2} />
      </mesh>

      {/* Support beam */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.05]} />
        <meshPhysicalMaterial
          color="#666666"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function Grid() {
  return (
    <group position={[0, 0, 0]}>
      <gridHelper args={[10, 20, "#00e5ff", "#1a1a1a"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function PendulumCanvas({
  length,
  gravity,
  initialAngle,
  onEnergyUpdate,
}: PendulumCanvasProps) {
  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[4, 2, 4]} fov={50} />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />

        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />

        <Grid />
        <Pivot />
        <Pendulum
          length={length}
          gravity={gravity}
          initialAngle={initialAngle}
          onEnergyUpdate={onEnergyUpdate}
        />
        <ClockMechanism />
      </Canvas>
    </div>
  );
}
