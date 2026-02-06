"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface GalvanicCellProps {
  anodeMetal: "Zn" | "Mg" | "Cu" | "Ag";
  cathodeMetal: "Zn" | "Mg" | "Cu" | "Ag";
  anodeConcentration: number; // 0.1 to 2.0 M
  cathodeConcentration: number; // 0.1 to 2.0 M
}

// Standard reduction potentials (V)
const STANDARD_POTENTIALS = {
  "Ag": 0.80,
  "Cu": 0.34,
  "Zn": -0.76,
  "Mg": -2.37,
};

const METAL_COLORS = {
  "Ag": "#c0c0c0", // Silver
  "Cu": "#ff6b35", // Copper
  "Zn": "#8b9dc3", // Zinc (bluish)
  "Mg": "#d3d3d3", // Magnesium (light gray)
};

function Electrode({ 
  position, 
  metal, 
  isAnode 
}: { 
  position: [number, number, number]; 
  metal: string; 
  isAnode: boolean;
}) {
  return (
    <group position={position}>
      {/* Electrode rod */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 3, 16]} />
        <meshPhysicalMaterial
          color={METAL_COLORS[metal as keyof typeof METAL_COLORS]}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.3}
        color={isAnode ? "#ff2d7d" : "#00e5ff"}
        anchorX="center"
        anchorY="middle"
      >
        {metal} {isAnode ? "(−)" : "(+)"}
      </Text>
    </group>
  );
}

function ElectronFlow({ flowing }: { flowing: boolean }) {
  const electronRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    if (!flowing) return;
    
    electronRefs.current.forEach((electron, i) => {
      if (electron) {
        const t = state.clock.elapsedTime + i * 0.3;
        const progress = (t % 3) / 3;
        
        // Path: anode (-2, 2) → wire → cathode (2, 2)
        const x = -2 + progress * 4;
        const y = 2.5 + Math.sin(progress * Math.PI) * 0.2;
        
        electron.position.set(x, y, 0);
      }
    });
  });

  return (
    <group>
      {/* Wire */}
      <Line
        points={[
          new THREE.Vector3(-2, 2.5, 0),
          new THREE.Vector3(-2, 3, 0),
          new THREE.Vector3(2, 3, 0),
          new THREE.Vector3(2, 2.5, 0),
        ]}
        color="#ffd166"
        lineWidth={3}
      />

      {/* Electrons */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) electronRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial
            color="#39ff14"
            emissive="#39ff14"
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* LED indicator */}
      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshPhysicalMaterial
          color={flowing ? "#39ff14" : "#333333"}
          emissive={flowing ? "#39ff14" : "#000000"}
          emissiveIntensity={flowing ? 2 : 0}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}

function IonParticles({ 
  position, 
  ionType, 
  count 
}: { 
  position: [number, number, number]; 
  ionType: "cation" | "anion"; 
  count: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const t = state.clock.elapsedTime + i * 0.5;
      const x = position[0] + (Math.random() - 0.5) * 0.8;
      const y = position[1] + Math.sin(t + i) * 0.3;
      const z = position[2] + (Math.random() - 0.5) * 0.8;

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const color = ionType === "cation" ? "#ff2d7d" : "#00e5ff";

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}

function SaltBridge() {
  return (
    <group position={[0, 0, 0]}>
      {/* Bridge tube */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 4.5, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Ions moving through bridge */}
      <IonParticles position={[-1, 0, 0]} ionType="anion" count={8} />
      <IonParticles position={[1, 0, 0]} ionType="cation" count={8} />

      {/* Label */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Salt Bridge
      </Text>
    </group>
  );
}

function Beaker({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      {/* Beaker walls */}
      <mesh>
        <cylinderGeometry args={[1, 1, 2, 32, 1, true]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.15}
          metalness={0.1}
          roughness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Solution */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 1, 32]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.3}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

function GalvanicCellScene(props: GalvanicCellProps) {
  const { anodeMetal, cathodeMetal, anodeConcentration, cathodeConcentration } = props;

  // Determine which is actually anode (lower potential)
  const anodePotential = STANDARD_POTENTIALS[anodeMetal];
  const cathodePotential = STANDARD_POTENTIALS[cathodeMetal];
  
  const isFlowing = anodePotential < cathodePotential;

  return (
    <>
      {/* Anode (left) */}
      <Beaker position={[-2, -1, 0]} color={METAL_COLORS[anodeMetal]} />
      <Electrode position={[-2, -1, 0]} metal={anodeMetal} isAnode={true} />
      <IonParticles position={[-2, 0, 0]} ionType="cation" count={Math.floor(anodeConcentration * 5)} />

      {/* Cathode (right) */}
      <Beaker position={[2, -1, 0]} color={METAL_COLORS[cathodeMetal]} />
      <Electrode position={[2, -1, 0]} metal={cathodeMetal} isAnode={false} />
      <IonParticles position={[2, 0, 0]} ionType="cation" count={Math.floor(cathodeConcentration * 5)} />

      {/* Salt bridge */}
      <SaltBridge />

      {/* Electron flow */}
      <ElectronFlow flowing={isFlowing} />
    </>
  );
}

export default function GalvanicCell(props: GalvanicCellProps) {
  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />

        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, 5, 5]} intensity={0.6} />

        <GalvanicCellScene {...props} />

        {/* Grid */}
        <gridHelper args={[10, 20, "#00e5ff", "#1a1a1a"]} position={[0, -2.5, 0]} />

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
