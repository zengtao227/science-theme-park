"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Line } from "@react-three/drei";
import * as THREE from "three";

interface RelativityCanvasProps {
  velocity: number; // 0-0.99 (as fraction of c)
  showPhotonClock?: boolean;
}

// Lorentz factor: γ = 1/√(1 - v²/c²)
function calculateGamma(v: number): number {
  return 1 / Math.sqrt(1 - v * v);
}

function PhotonClock({ velocity, moving }: { velocity: number; moving: boolean }) {
  const lightRef = useRef<THREE.Mesh>(null);
  const gamma = calculateGamma(velocity);
  
  // Clock dimensions
  const height = 2;
  const width = 0.3;
  
  // For moving clock, light travels diagonal path (longer)
  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.elapsedTime;
      const period = moving ? 2 * gamma : 2; // Time dilation
      const phase = (t % period) / period;
      
      if (moving) {
        // Diagonal path
        const y = height * (phase < 0.5 ? phase * 2 : 2 - phase * 2) - height / 2;
        const x = velocity * t * 0.5;
        lightRef.current.position.set(x, y, 0);
      } else {
        // Vertical path
        const y = height * (phase < 0.5 ? phase * 2 : 2 - phase * 2) - height / 2;
        lightRef.current.position.set(0, y, 0);
      }
    }
  });

  const xOffset = moving ? 3 : -3;

  return (
    <group position={[xOffset, 0, 0]}>
      {/* Clock mirrors */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, 0.1, width]} />
        <meshPhysicalMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, -height / 2, 0]}>
        <boxGeometry args={[width, 0.1, width]} />
        <meshPhysicalMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Light photon */}
      <mesh ref={lightRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#ffd166"
          emissive="#ffd166"
          emissiveIntensity={2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Clock frame */}
      <Line
        points={[
          new THREE.Vector3(-width / 2, -height / 2, 0),
          new THREE.Vector3(-width / 2, height / 2, 0),
        ]}
        color="#ffffff"
        lineWidth={1}
        transparent
        opacity={0.3}
      />
      <Line
        points={[
          new THREE.Vector3(width / 2, -height / 2, 0),
          new THREE.Vector3(width / 2, height / 2, 0),
        ]}
        color="#ffffff"
        lineWidth={1}
        transparent
        opacity={0.3}
      />

      {/* Label */}
      <mesh position={[0, -height / 2 - 0.5, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={moving ? "#ff2d7d" : "#39ff14"} />
      </mesh>
    </group>
  );
}

function ContractedParticle({ velocity }: { velocity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const gamma = calculateGamma(velocity);
  
  // Length contraction: L = L₀/γ
  const restLength = 2;
  const contractedLength = restLength / gamma;
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
    }
  });

  // Doppler shift color (red/blue shift)
  const dopplerColor = useMemo(() => {
    // Simplified doppler effect visualization
    const redShift = velocity > 0.5;
    return redShift ? "#ff2d7d" : "#00e5ff";
  }, [velocity]);

  return (
    <group position={[0, -3, 0]}>
      {/* Contracted particle */}
      <mesh ref={meshRef}>
        <boxGeometry args={[contractedLength, 0.3, 0.3]} />
        <meshPhysicalMaterial
          color={dopplerColor}
          emissive={dopplerColor}
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Rest frame reference (ghost) */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[restLength, 0.3, 0.3]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Motion trail */}
      <Line
        points={[
          new THREE.Vector3(-5, 0, 0),
          new THREE.Vector3(5, 0, 0),
        ]}
        color="#00e5ff"
        lineWidth={1}
        transparent
        opacity={0.2}
      />
    </group>
  );
}

function CERNTunnel() {
  const tunnelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (tunnelRef.current) {
      tunnelRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={tunnelRef}>
      {/* Tunnel rings */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 8;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              -5,
            ]}
          >
            <torusGeometry args={[0.3, 0.05, 8, 16]} />
            <meshPhysicalMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={0.3}
              metalness={1}
              roughness={0.1}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function GridPlane() {
  return (
    <group position={[0, -5, 0]}>
      <gridHelper args={[20, 40, "#00e5ff", "#1a1a1a"]} />
    </group>
  );
}

export default function RelativityCanvas({ velocity, showPhotonClock = true }: RelativityCanvasProps) {
  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={50} />
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <GridPlane />
        <CERNTunnel />

        {showPhotonClock && (
          <>
            <PhotonClock velocity={0} moving={false} />
            <PhotonClock velocity={velocity} moving={true} />
          </>
        )}

        <ContractedParticle velocity={velocity} />

        {/* Background sphere */}
        <mesh>
          <sphereGeometry args={[30, 32, 32]} />
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
