"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface AtomCanvasProps {
  protons: number;
  neutrons: number;
  electrons: number;
}

function Nucleus({ protons, neutrons }: { protons: number; neutrons: number }) {
  const nucleusRef = useRef<THREE.Group>(null);
  const protonMeshRef = useRef<THREE.InstancedMesh>(null);
  const neutronMeshRef = useRef<THREE.InstancedMesh>(null);

  const dummyRef = useRef(new THREE.Object3D());

  // Arrange nucleons in a sphere
  useEffect(() => {
    const dummy = dummyRef.current;
    if (protonMeshRef.current) {
      const totalNucleons = protons + neutrons;
      const radius = Math.max(0.3, Math.cbrt(totalNucleons) * 0.15);

      for (let i = 0; i < protons; i++) {
        const phi = Math.acos(-1 + (2 * i) / protons);
        const theta = Math.sqrt(protons * Math.PI) * phi;

        dummy.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );
        dummy.updateMatrix();
        protonMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      protonMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (neutronMeshRef.current) {
      const totalNucleons = protons + neutrons;
      const radius = Math.max(0.3, Math.cbrt(totalNucleons) * 0.15);

      for (let i = 0; i < neutrons; i++) {
        const phi = Math.acos(-1 + (2 * (i + protons)) / totalNucleons);
        const theta = Math.sqrt(totalNucleons * Math.PI) * phi;

        dummy.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        );
        dummy.updateMatrix();
        neutronMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      neutronMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [protons, neutrons]);

  useFrame(() => {
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={nucleusRef}>
      {/* Protons */}
      <instancedMesh ref={protonMeshRef} args={[undefined, undefined, protons]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#ff2d7d"
          emissive="#ff2d7d"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>

      {/* Neutrons */}
      <instancedMesh ref={neutronMeshRef} args={[undefined, undefined, neutrons]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>

      {/* Nucleus glow */}
      <pointLight color="#ff2d7d" intensity={2} distance={3} />
    </group>
  );
}

function ElectronShell({
  shellIndex,
  electronCount,
}: {
  shellIndex: number;
  electronCount: number;
}) {
  const shellRef = useRef<THREE.Group>(null);
  const electronMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummyRef = useRef(new THREE.Object3D());

  const radius = 0.8 + shellIndex * 0.6;

  // Position electrons evenly around the shell
  useEffect(() => {
    const dummy = dummyRef.current;
    if (electronMeshRef.current && electronCount > 0) {
      for (let i = 0; i < electronCount; i++) {
        const angle = (i / electronCount) * Math.PI * 2;
        const tilt = shellIndex * 0.3;

        dummy.position.set(
          radius * Math.cos(angle),
          radius * Math.sin(angle) * Math.sin(tilt),
          radius * Math.sin(angle) * Math.cos(tilt)
        );
        dummy.updateMatrix();
        electronMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      electronMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [electronCount, radius, shellIndex]);

  useFrame((state) => {
    if (shellRef.current) {
      const speed = 0.5 + shellIndex * 0.2;
      shellRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  if (electronCount === 0) return null;

  return (
    <group ref={shellRef}>
      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.01, 16, 64]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Electrons */}
      <instancedMesh ref={electronMeshRef} args={[undefined, undefined, electronCount]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshPhysicalMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
      </instancedMesh>
    </group>
  );
}

function ElectronShells({ electrons }: { electrons: number }) {
  // Electron shell filling: K(2), L(8), M(18)
  const shells = [
    { max: 2, count: Math.min(electrons, 2) },
    { max: 8, count: Math.min(Math.max(0, electrons - 2), 8) },
    { max: 18, count: Math.min(Math.max(0, electrons - 10), 18) },
  ];

  return (
    <>
      {shells.map((shell, index) => (
        <ElectronShell
          key={index}
          shellIndex={index}
          electronCount={shell.count}
        />
      ))}
    </>
  );
}

export default function AtomCanvas({ protons, neutrons, electrons }: AtomCanvasProps) {
  return (
    <div className="w-full h-[800px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={55} />
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />

        {/* Atom */}
        <Nucleus protons={protons} neutrons={neutrons} />
        <ElectronShells electrons={electrons} />

        {/* Background particles */}
        <mesh>
          <sphereGeometry args={[10, 32, 32]} />
          <meshBasicMaterial
            color="#000000"
            side={THREE.BackSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
