"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { pseudoRandom } from "@/lib/math";

interface EquilibriumCanvasProps {
  temperature: number; // 0-100
  pressure: number; // 0-100
  concentrationA: number; // 0-100
}

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  type: "A" | "B" | "C" | "D";
}

function ParticleSystem({ temperature, pressure, concentrationA }: EquilibriumCanvasProps) {
  const meshRefA = useRef<THREE.InstancedMesh>(null);
  const meshRefB = useRef<THREE.InstancedMesh>(null);
  const meshRefC = useRef<THREE.InstancedMesh>(null);
  const meshRefD = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Calculate equilibrium based on Le Chatelier's principle
  const volumeScale = 1 + (100 - pressure) / 100; // Higher pressure = smaller volume
  const speedScale = 0.5 + (temperature / 100) * 1.5; // Higher temp = faster particles
  
  // Equilibrium: A + B ⇌ C + D
  // Higher concentration of A shifts equilibrium right (more C, D)
  const equilibriumShift = concentrationA / 100;
  
  const countA = Math.floor(20 * (1 - equilibriumShift * 0.5));
  const countB = Math.floor(20 * (1 - equilibriumShift * 0.5));
  const countC = Math.floor(15 * (1 + equilibriumShift * 0.7));
  const countD = Math.floor(15 * (1 + equilibriumShift * 0.7));

  const particles = useMemo(() => {
    const result: Particle[] = [];
    const bounds = volumeScale * 2;

    const createParticles = (count: number, type: "A" | "B" | "C" | "D") => {
      for (let i = 0; i < count; i++) {
        const seedBase = (result.length + 1) * 13.7;
        const rand = (seed: number) => pseudoRandom(seed) - 0.5;
        result.push({
          position: new THREE.Vector3(
            rand(seedBase + 1) * bounds,
            rand(seedBase + 2) * bounds,
            rand(seedBase + 3) * bounds
          ),
          velocity: new THREE.Vector3(
            rand(seedBase + 4) * speedScale,
            rand(seedBase + 5) * speedScale,
            rand(seedBase + 6) * speedScale
          ),
          type,
        });
      }
    };

    createParticles(countA, "A");
    createParticles(countB, "B");
    createParticles(countC, "C");
    createParticles(countD, "D");

    return result;
  }, [countA, countB, countC, countD, volumeScale, speedScale]);

  useFrame((state, delta) => {
    const bounds = volumeScale * 2;

    particles.forEach((particle, i) => {
      // Update position
      particle.position.add(particle.velocity.clone().multiplyScalar(delta));

      // Bounce off walls
      if (Math.abs(particle.position.x) > bounds) {
        particle.velocity.x *= -1;
        particle.position.x = Math.sign(particle.position.x) * bounds;
      }
      if (Math.abs(particle.position.y) > bounds) {
        particle.velocity.y *= -1;
        particle.position.y = Math.sign(particle.position.y) * bounds;
      }
      if (Math.abs(particle.position.z) > bounds) {
        particle.velocity.z *= -1;
        particle.position.z = Math.sign(particle.position.z) * bounds;
      }

      // Update instance matrix
      dummy.position.copy(particle.position);
      dummy.updateMatrix();

      if (particle.type === "A" && meshRefA.current && i < countA) {
        meshRefA.current.setMatrixAt(i, dummy.matrix);
      } else if (particle.type === "B" && meshRefB.current && i >= countA && i < countA + countB) {
        meshRefB.current.setMatrixAt(i - countA, dummy.matrix);
      } else if (particle.type === "C" && meshRefC.current && i >= countA + countB && i < countA + countB + countC) {
        meshRefC.current.setMatrixAt(i - countA - countB, dummy.matrix);
      } else if (particle.type === "D" && meshRefD.current) {
        meshRefD.current.setMatrixAt(i - countA - countB - countC, dummy.matrix);
      }
    });

    if (meshRefA.current) meshRefA.current.instanceMatrix.needsUpdate = true;
    if (meshRefB.current) meshRefB.current.instanceMatrix.needsUpdate = true;
    if (meshRefC.current) meshRefC.current.instanceMatrix.needsUpdate = true;
    if (meshRefD.current) meshRefD.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Reactants: A (cyan) */}
      <instancedMesh ref={meshRefA} args={[undefined, undefined, countA]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </instancedMesh>

      {/* Reactants: B (purple) */}
      <instancedMesh ref={meshRefB} args={[undefined, undefined, countB]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </instancedMesh>

      {/* Products: C (green) */}
      <instancedMesh ref={meshRefC} args={[undefined, undefined, countC]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#39ff14"
          emissive="#39ff14"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </instancedMesh>

      {/* Products: D (pink) */}
      <instancedMesh ref={meshRefD} args={[undefined, undefined, countD]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#ff2d7d"
          emissive="#ff2d7d"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </instancedMesh>

      {/* Container box */}
      <mesh>
        <boxGeometry args={[volumeScale * 4, volumeScale * 4, volumeScale * 4]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          metalness={0.1}
          roughness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Container edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(volumeScale * 4, volumeScale * 4, volumeScale * 4)]} />
        <lineBasicMaterial color="#00e5ff" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

function GridPlane() {
  return (
    <group position={[0, -2.5, 0]}>
      <gridHelper args={[10, 20, "#00e5ff", "#1a1a1a"]} />
    </group>
  );
}

export default function EquilibriumCanvas(props: EquilibriumCanvasProps) {
  return (
    <div className="w-full h-[800px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[6, 4, 6]} fov={55} />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />

        <GridPlane />
        <ParticleSystem {...props} />

        {/* Background sphere */}
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
