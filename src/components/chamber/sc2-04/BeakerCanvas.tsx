"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface BeakerCanvasProps {
  temperature: number; // °C
  soluteAmount: number; // g
  solubility: number; // g/100mL at current temperature
  isSaturated: boolean;
}

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  dissolved: boolean;
}

function SoluteParticles(props: BeakerCanvasProps) {
  const { soluteAmount, solubility, isSaturated } = props;
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particles = useRef<Particle[]>([]);
  const dummyRef = useRef(new THREE.Object3D());
  const particleCount = Math.min(Math.floor(soluteAmount * 5), 100);

  // Initialize particles
  useEffect(() => {
    const dissolvedCount = Math.floor((solubility / soluteAmount) * particleCount);
    
    particles.current = Array.from({ length: particleCount }, (_, i) => {
      const dissolved = i < dissolvedCount;
      
      if (dissolved) {
        // Dissolved particles float in solution
        return {
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 1.5
          ),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
          ),
          dissolved: true,
        };
      } else {
        // Precipitated particles settle at bottom
        return {
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 1.2,
            -0.9 + Math.random() * 0.3,
            (Math.random() - 0.5) * 1.2
          ),
          velocity: new THREE.Vector3(0, 0, 0),
          dissolved: false,
        };
      }
    });
  }, [soluteAmount, solubility, particleCount]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    particles.current.forEach((particle, i) => {
      if (particle.dissolved) {
        // Brownian motion for dissolved particles
        particle.position.add(particle.velocity.clone().multiplyScalar(delta * 10));

        // Bounce off beaker walls
        if (Math.abs(particle.position.x) > 0.75) {
          particle.velocity.x *= -1;
          particle.position.x = Math.sign(particle.position.x) * 0.75;
        }
        if (Math.abs(particle.position.z) > 0.75) {
          particle.velocity.z *= -1;
          particle.position.z = Math.sign(particle.position.z) * 0.75;
        }
        if (particle.position.y > 1 || particle.position.y < -1) {
          particle.velocity.y *= -1;
          particle.position.y = Math.max(-1, Math.min(1, particle.position.y));
        }

        // Random velocity changes (Brownian motion)
        if (Math.random() < 0.05) {
          particle.velocity.add(
            new THREE.Vector3(
              (Math.random() - 0.5) * 0.01,
              (Math.random() - 0.5) * 0.01,
              (Math.random() - 0.5) * 0.01
            )
          );
        }
      }

      // Update instance matrix
      dummyRef.current.position.copy(particle.position);
      dummyRef.current.scale.setScalar(particle.dissolved ? 1 : 1.2);
      dummyRef.current.updateMatrix();
      particlesRef.current!.setMatrixAt(i, dummyRef.current.matrix);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshPhysicalMaterial
        color={isSaturated ? "#ffd166" : "#a855f7"}
        emissive={isSaturated ? "#ffd166" : "#a855f7"}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

function Beaker() {
  return (
    <group>
      {/* Beaker body */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.8, 2.5, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      {/* Beaker bottom */}
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      {/* Water level */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 2, 32]} />
        <meshPhysicalMaterial
          color="#00e5ff"
          transparent
          opacity={0.3}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      {/* Measurement marks */}
      {[0.5, 0, -0.5].map((y, i) => (
        <mesh key={i} position={[0.85, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
      ))}
    </group>
  );
}

function Thermometer({ temperature }: { temperature: number }) {
  const mercuryHeight = (temperature / 100) * 1.5;

  return (
    <group position={[1.2, 0, 0]}>
      {/* Thermometer tube */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 2, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      {/* Mercury */}
      <mesh position={[0, -1 + mercuryHeight / 2, 0]}>
        <cylinderGeometry args={[0.06, 0.06, mercuryHeight, 16]} />
        <meshPhysicalMaterial
          color="#ff2d7d"
          emissive="#ff2d7d"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Bulb */}
      <mesh position={[0, -1.2, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshPhysicalMaterial
          color="#ff2d7d"
          emissive="#ff2d7d"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

function GridPlane() {
  return (
    <group position={[0, -2, 0]}>
      <gridHelper args={[10, 20, "#00e5ff", "#1a1a1a"]} />
    </group>
  );
}

export default function BeakerCanvas(props: BeakerCanvasProps) {
  return (
    <div className="w-full h-[800px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 1, 4]} fov={55} />
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />

        <GridPlane />
        <Beaker />
        <SoluteParticles {...props} />
        <Thermometer temperature={props.temperature} />

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
