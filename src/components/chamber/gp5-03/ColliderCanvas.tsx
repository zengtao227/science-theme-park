"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface ColliderCanvasProps {
  energy: number; // TeV
  magneticField: boolean;
  isColliding: boolean;
}

function ParticleBeam({ direction, energy, isActive }: { direction: 1 | -1; energy: number; isActive: boolean }) {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 20;
  const dummyRef = useRef(new THREE.Object3D());
  const positions = useRef<number[]>([]);

  useEffect(() => {
    positions.current = Array.from({ length: particleCount }, (_, i) => direction * (5 - i * 0.5));
  }, [direction, particleCount]);

  useFrame((state, delta) => {
    if (!particlesRef.current || !isActive) return;

    positions.current = positions.current.map((pos) => {
      let newPos = pos - direction * delta * energy * 2;
      
      // Reset particle when it reaches the center
      if (Math.abs(newPos) < 0.1) {
        newPos = direction * 5;
      }
      
      return newPos;
    });

    positions.current.forEach((pos, i) => {
      dummyRef.current.position.set(pos, 0, 0);
      dummyRef.current.updateMatrix();
      particlesRef.current!.setMatrixAt(i, dummyRef.current.matrix);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  const color = direction === 1 ? "#00e5ff" : "#ff2d7d";

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        metalness={0.9}
        roughness={0.1}
      />
    </instancedMesh>
  );
}

function CollisionPoint({ isColliding, energy }: { isColliding: boolean; energy: number }) {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const jetsRef = useRef<Array<{ position: THREE.Vector3; velocity: THREE.Vector3; life: number }>>([]);
  const dummyRef = useRef(new THREE.Object3D());

  useEffect(() => {
    if (isColliding) {
      const newJets = Array.from({ length: 30 }, () => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const speed = (Math.random() * 0.5 + 0.5) * energy * 0.5;

        return {
          position: new THREE.Vector3(0, 0, 0),
          velocity: new THREE.Vector3(
            speed * Math.sin(phi) * Math.cos(theta),
            speed * Math.sin(phi) * Math.sin(theta),
            speed * Math.cos(phi)
          ),
          life: 1,
        };
      });
      jetsRef.current = newJets;
    }
  }, [isColliding, energy]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const nextJets: Array<{ position: THREE.Vector3; velocity: THREE.Vector3; life: number }> = [];
    jetsRef.current.forEach((jet, i) => {
      const position = jet.position.clone().add(jet.velocity.clone().multiplyScalar(delta));
      const life = jet.life - delta * 0.5;
      if (life > 0) {
        nextJets.push({ position, velocity: jet.velocity, life });
      }
      if (i < 30) {
        dummyRef.current.position.copy(position);
        dummyRef.current.scale.setScalar(Math.max(0, life));
        dummyRef.current.updateMatrix();
        particlesRef.current!.setMatrixAt(i, dummyRef.current.matrix);
      }
    });
    jetsRef.current = nextJets;

    if (particlesRef.current) {
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Collision flash */}
      {isColliding && (
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      )}

      {/* Particle jets */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, 30]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshPhysicalMaterial
          color="#ffd166"
          emissive="#ffd166"
          emissiveIntensity={1}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>
    </>
  );
}

function BeamPipe() {
  return (
    <group>
      {/* Main beam pipe */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 12, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Detector rings */}
      {[-2, 0, 2].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.8, 0.05, 16, 32]} />
          <meshPhysicalMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function MagneticField({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  return (
    <group>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.5;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshPhysicalMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function GridPlane() {
  return (
    <group position={[0, -2, 0]}>
      <gridHelper args={[20, 40, "#00e5ff", "#1a1a1a"]} />
    </group>
  );
}

export default function ColliderCanvas(props: ColliderCanvasProps) {
  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={50} />
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />

        <GridPlane />
        <BeamPipe />
        <ParticleBeam direction={1} energy={props.energy} isActive={!props.isColliding} />
        <ParticleBeam direction={-1} energy={props.energy} isActive={!props.isColliding} />
        <CollisionPoint isColliding={props.isColliding} energy={props.energy} />
        <MagneticField enabled={props.magneticField} />

        {/* Background */}
        <mesh>
          <sphereGeometry args={[50, 32, 32]} />
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
