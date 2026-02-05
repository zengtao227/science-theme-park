"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, MeshTransmissionMaterial, Environment, ContactShadows, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

export type TitrationPoint = { v: number; ph: number };

interface C201TitrationCanvasProps {
  curve: TitrationPoint[];
  probeVolume: number;
  maxVolume: number;
  targetVolume: number;
  phValue: number;
  status?: { ok: boolean } | null;
}

function phToColor(ph: number) {
  // Enhanced PH color gradient: Red (Acid) -> Green (Neutral) -> Purple (Base)
  const clamped = Math.max(0, Math.min(14, ph));
  if (clamped < 7) {
    // Red to Yellow/Green
    const t = clamped / 7;
    return new THREE.Color().lerpColors(new THREE.Color("#ff0055"), new THREE.Color("#00ff9d"), t);
  } else {
    // Green to Purple
    const t = (clamped - 7) / 7;
    return new THREE.Color().lerpColors(new THREE.Color("#00ff9d"), new THREE.Color("#a855f7"), t);
  }
}

function Liquid({ height, color }: { height: number; color: THREE.Color }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.position.y = -1.2 + height / 2;
      // Subtle liquid wobble
      mesh.current.scale.x = 1 + Math.sin(clock.elapsedTime * 2) * 0.01;
      mesh.current.scale.z = 1 + Math.cos(clock.elapsedTime * 1.5) * 0.01;
    }
  });

  return (
    <mesh ref={mesh}>
      <cylinderGeometry args={[0.95, 0.85, height, 32]} />
      <meshPhysicalMaterial
        color={color}
        transmission={0.4}
        thickness={1}
        roughness={0.1}
        ior={1.33}
        emissive={color}
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

function Beaker() {
  return (
    <group>
      {/* Glass Container */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.0, 0.9, 2.6, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.2}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.0}
          iridescence={0.5}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#ffffff"
          roughness={0.05}
        />
      </mesh>
      {/* Rim */}
      <mesh position={[0, 1.3, 0]}>
        <torusGeometry args={[1.0, 0.05, 16, 32]} />
        <meshStandardMaterial color="#fff" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Measurement Marks */}
      {[0.5, 0, -0.5, -1.0].map((y, i) => (
        <mesh key={i} position={[0.96, y, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.1, 0.02, 0.05]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function DropletSystem({ active, color }: { active: boolean, color: THREE.Color }) {
  const drops = useMemo(() => Array.from({ length: 5 }), []);

  return (
    <group position={[0, 2, 0]}>
      {drops.map((_, i) => (
        <SingleDroplet key={i} index={i} color={color} active={active} />
      ))}
    </group>
  );
}

const pseudo = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function SingleDroplet({ index, color, active }: { index: number, color: THREE.Color, active: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.5 + pseudo(index * 2) * 0.5, [index]);
  const initialY = useMemo(() => 0.5 + pseudo(index * 2 + 1) * 1, [index]);

  useFrame(({ clock }) => {
    if (ref.current && active) {
      const time = clock.elapsedTime * speed + index;
      const y = initialY - (time % 2.5) * 2; // Fall down

      if (y < -1) {
        ref.current.scale.setScalar(0); // Disappear when hitting liquid
      } else {
        ref.current.position.y = y;
        ref.current.scale.setScalar(0.08);
      }
    } else if (ref.current) {
      ref.current.scale.setScalar(0);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default function C201_TitrationCanvas({
  probeVolume,
  maxVolume,
  targetVolume,
  phValue,
}: C201TitrationCanvasProps) {
  const fillRatio = Math.max(0.1, Math.min(0.9, probeVolume / maxVolume));
  const liquidHeight = fillRatio * 2.4;
  const liquidColor = phToColor(phValue);
  const isTargetMet = Math.abs(probeVolume - targetVolume) < 1;

  return (
    <div className="w-full h-full bg-[#050505] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl">
      <Canvas dpr={[1, 2]}>
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={60} />
        <Environment preset="city" />

        <color attach="background" args={["#050505"]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.2} penumbra={1} castShadow />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <group rotation={[0.1, 0, 0]}>
            <Beaker />
            <Liquid height={liquidHeight} color={liquidColor} />
            <DropletSystem active={true} color={liquidColor} />
          </group>
        </Float>

        <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} color={liquidColor} />

        <Text
          position={[0, 2, 0]}
          fontSize={0.3}
          color="white"
          font="/fonts/Inter-Bold.woff"
          anchorY="bottom"
        >
          {`pH ${phValue.toFixed(2)}`}
        </Text>

        {isTargetMet && (
          <Text
            position={[0, -2, 0]}
            fontSize={0.2}
            color="#39ff14"
            font="/fonts/Inter-Bold.woff"
          >
            EQUILIBRIUM
          </Text>
        )}
      </Canvas>

      <div className="absolute top-4 left-4 flex gap-2 items-center">
        <div className={`w-2 h-2 rounded-full ${isTargetMet ? 'bg-neon-green animate-pulse' : 'bg-neon-cyan'}`} />
        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Rhine_Sentinel // Buffer_Mon</div>
      </div>

      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right uppercase">
        Vol: {probeVolume.toFixed(1)}mL<br />
        Target: {targetVolume}mL
      </div>
    </div>
  );
}

