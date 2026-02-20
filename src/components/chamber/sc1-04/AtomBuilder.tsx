"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Float,
  Sphere,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Text,
  Html,
  ContactShadows
} from "@react-three/drei";
import * as THREE from "three";
import { Activity, Zap, Cpu } from "lucide-react";
import { clsx } from "clsx";

interface AtomBuilderProps {
  protons: number;
  neutrons: number;
  electrons: number;
}

function Nucleus({ protons, neutrons }: { protons: number; neutrons: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const particles = useMemo(() => {
    const list = [];
    const radius = 0.4;
    for (let i = 0; i < protons; i++) {
      const phi = Math.acos(-1 + (2 * i) / (protons + neutrons || 1));
      const theta = Math.sqrt((protons + neutrons) * Math.PI) * phi;
      list.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        color: "#ff2d7d",
        type: 'p'
      });
    }
    for (let i = 0; i < neutrons; i++) {
      const phi = Math.acos(-1 + (2 * (i + protons)) / (protons + neutrons || 1));
      const theta = Math.sqrt((protons + neutrons) * Math.PI) * phi;
      list.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        color: "#a855f7",
        type: 'n'
      });
    }
    return list;
  }, [protons, neutrons]);

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {particles.map((particle: { position: THREE.Vector3; color: string }, i: number) => (
          <mesh key={i} position={particle.position}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshPhysicalMaterial
              color={particle.color}
              emissive={particle.color}
              emissiveIntensity={1.5}
              roughness={0}
              metalness={1}
            />
          </mesh>
        ))}
      </Float>
      {/* Core Glow */}
      <Sphere args={[0.6, 16, 16]}>
        <meshBasicMaterial color="#ff2d7d" transparent opacity={0.05} />
      </Sphere>
    </group>
  );
}

function OrbitalCloud({ type, radius }: { type: 's' | 'p', radius: number }) {
  if (type === 's') {
    return (
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.05} wireframe />
      </mesh>
    );
  }
  return (
    <group>
      {/* 3 Lobes for p orbital */}
      <mesh position={[0, radius, 0]}>
        <sphereGeometry args={[radius * 0.6, 32, 32]} />
        <meshBasicMaterial color="#ff00e5" transparent opacity={0.05} wireframe />
      </mesh>
      <mesh position={[0, -radius, 0]}>
        <sphereGeometry args={[radius * 0.6, 32, 32]} />
        <meshBasicMaterial color="#ff00e5" transparent opacity={0.05} wireframe />
      </mesh>
    </group>
  );
}

function ElectronShell({ shellNumber, electronCount, maxElectrons }: { shellNumber: number; electronCount: number; maxElectrons: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 1.2 + shellNumber * 1.2;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * (0.8 / shellNumber);
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const electrons = useMemo(() => {
    const list = [];
    for (let i = 0; i < electronCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / (electronCount || 1));
      const theta = Math.sqrt(electronCount * Math.PI) * phi;
      list.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
      });
    }
    return list;
  }, [electronCount, radius]);

  return (
    <group ref={groupRef}>
      {/* Orbital Shell Visualization */}
      <OrbitalCloud type={shellNumber === 1 ? 's' : 'p'} radius={radius} />

      {/* Electrons */}
      {electrons.map((electron: { position: THREE.Vector3 }, i: number) => (
        <group key={i} position={electron.position}>
          <Sphere args={[0.08, 16, 16]}>
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={4} />
          </Sphere>
          <pointLight color="#00e5ff" intensity={0.5} distance={2} />
        </group>
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
    <div className="w-full h-[600px] relative rounded-3xl overflow-hidden bg-[#050505] border border-white/5 shadow-28xl group">
      <Canvas shadows camera={{ position: [6, 4, 6], fov: 40 }}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <color attach="background" args={["#020202"]} />
        <fog attach="fog" args={["#020202", 5, 20]} />

        <ambientLight intensity={0.4} />
        <spotLight position={[5, 10, 5]} intensity={2} angle={0.3} penumbra={1} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#3d00cc" />

        <AtomVisualization {...props} />
        <ContactShadows opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>

      {/* Floating UI HUD */}
      <div className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-2xl px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-4">
          <div className="p-2 bg-neon-cyan/20 rounded-xl animate-pulse">
            <Activity className="w-4 h-4 text-neon-cyan" />
          </div>
          <div>
            <span className="text-[9px] font-black tracking-[0.2em] uppercase text-white/30 block mb-0.5">Atm_Field_v1</span>
            <span className="text-xs font-bold text-white font-mono uppercase">Stability: {props.protons === props.electrons ? "Optimal" : "Ionized"}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[9px] font-mono text-neon-pink">
            P: {props.protons}
          </div>
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[9px] font-mono text-neon-purple">
            N: {props.neutrons}
          </div>
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[9px] font-mono text-neon-cyan">
            E: {props.electrons}
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 text-right">
        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
          Scanning_Subject:<br />
          Valence_Shell_L{Math.ceil(props.electrons / 2)}
        </div>
      </div>

      {/* Tech Grid Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-neon-cyan/10 to-transparent pointer-events-none" />
    </div>
  );
}
