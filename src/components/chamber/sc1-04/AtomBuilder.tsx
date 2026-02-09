"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface AtomBuilderProps {
  protons: number;
  neutrons: number;
  electrons: number;
}

function Nucleus({ protons, neutrons }: { protons: number; neutrons: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const particles = [];
  const radius = 0.3;

  // Arrange protons and neutrons in nucleus
  for (let i = 0; i < protons; i++) {
    const phi = Math.acos(-1 + (2 * i) / protons);
    const theta = Math.sqrt(protons * Math.PI) * phi;
    particles.push({
      position: new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ),
      color: "#ff2d7d", // Proton (red/pink)
    });
  }

  for (let i = 0; i < neutrons; i++) {
    const phi = Math.acos(-1 + (2 * i) / neutrons);
    const theta = Math.sqrt(neutrons * Math.PI) * phi;
    particles.push({
      position: new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta) * 0.8,
        radius * Math.sin(phi) * Math.sin(theta) * 0.8,
        radius * Math.cos(phi) * 0.8
      ),
      color: "#a855f7", // Neutron (purple)
    });
  }

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function ElectronShell({ shellNumber, electronCount, maxElectrons }: { shellNumber: number; electronCount: number; maxElectrons: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 1 + shellNumber * 0.8;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * (1 / shellNumber);
    }
  });

  const electrons = [];
  for (let i = 0; i < electronCount; i++) {
    const angle = (i / maxElectrons) * Math.PI * 2;
    electrons.push({
      position: new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ),
    });
  }

  return (
    <group ref={groupRef}>
      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 64]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
      </mesh>

      {/* Electrons */}
      {electrons.map((electron, i) => (
        <mesh key={i} position={electron.position}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhysicalMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function AtomVisualization({ protons, neutrons, electrons }: AtomBuilderProps) {
  // Electron shell configuration (2, 8, 8, 18...)
  const shellConfig = [2, 8, 8, 18, 18, 32];
  const shells = [];
  let remainingElectrons = electrons;

  for (let i = 0; i < shellConfig.length && remainingElectrons > 0; i++) {
    const electronsInShell = Math.min(remainingElectrons, shellConfig[i]);
    shells.push({
      shellNumber: i + 1,
      electronCount: electronsInShell,
      maxElectrons: shellConfig[i],
    });
    remainingElectrons -= electronsInShell;
  }

  return (
    <group>
      <Nucleus protons={protons} neutrons={neutrons} />
      {shells.map((shell, i) => (
        <ElectronShell key={i} {...shell} />
      ))}
    </group>
  );
}

function GridPlane() {
  return (
    <group position={[0, -3, 0]}>
      <gridHelper args={[10, 20, "#00e5ff", "#1a1a1a"]} />
    </group>
  );
}

export default function AtomBuilder(props: AtomBuilderProps) {
  return (
    <div className="w-full h-[800px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={55} />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={12}
        />

        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />

        <GridPlane />
        <AtomVisualization {...props} />

        {/* Background */}
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
