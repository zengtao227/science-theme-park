"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { rmsVelocity } from "@/lib/physics";

interface GasTankCanvasProps {
  volume: number; // L
  temperature: number; // K
  moles: number; // mol
  particleCount?: number;
}

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

const pseudo = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function GasParticles(props: GasTankCanvasProps) {
  const { volume, temperature, particleCount = 100 } = props;
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particles = useRef<Particle[]>([]);
  const dummyRef = useRef(new THREE.Object3D());

  // Container dimensions based on volume
  const containerSize = useMemo(() => {
    const side = Math.cbrt(volume);
    return { x: side, y: side, z: side };
  }, [volume]);

  // Initialize particles
  useEffect(() => {
    particles.current = Array.from({ length: particleCount }, (_, i) => {
      const seed = i * 13.7 + temperature * 0.1;
      const pos = new THREE.Vector3(
        (pseudo(seed) - 0.5) * containerSize.x,
        (pseudo(seed + 1) - 0.5) * containerSize.y,
        (pseudo(seed + 2) - 0.5) * containerSize.z
      );

      // Calculate velocity from temperature (Maxwell-Boltzmann)
      const m = 0.029; // kg (air molecule mass)
      const speed = rmsVelocity(temperature, m) * 0.001; // Scale for visualization
      const theta = pseudo(seed + 3) * Math.PI * 2;
      const phi = Math.acos(2 * pseudo(seed + 4) - 1);

      const vel = new THREE.Vector3(
        speed * Math.sin(phi) * Math.cos(theta),
        speed * Math.sin(phi) * Math.sin(theta),
        speed * Math.cos(phi)
      );

      return { position: pos, velocity: vel };
    });
  }, [particleCount, temperature, containerSize]);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const halfX = containerSize.x / 2;
    const halfY = containerSize.y / 2;
    const halfZ = containerSize.z / 2;

    particles.current.forEach((particle, i) => {
      // Update position
      particle.position.add(particle.velocity.clone().multiplyScalar(delta * 10));

      // Bounce off walls
      if (Math.abs(particle.position.x) > halfX) {
        particle.velocity.x *= -1;
        particle.position.x = Math.sign(particle.position.x) * halfX;
      }
      if (Math.abs(particle.position.y) > halfY) {
        particle.velocity.y *= -1;
        particle.position.y = Math.sign(particle.position.y) * halfY;
      }
      if (Math.abs(particle.position.z) > halfZ) {
        particle.velocity.z *= -1;
        particle.position.z = Math.sign(particle.position.z) * halfZ;
      }

      // Update instance matrix
      dummyRef.current.position.copy(particle.position);
      dummyRef.current.updateMatrix();
      particlesRef.current!.setMatrixAt(i, dummyRef.current.matrix);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]} frustumCulled={true}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshPhysicalMaterial
        color="#00e5ff"
        emissive="#00e5ff"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

function Container({ volume }: { volume: number }) {
  const size = useMemo(() => {
    const side = Math.cbrt(volume);
    return { x: side, y: side, z: side };
  }, [volume]);

  const edges = useMemo(() => {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    return new THREE.EdgesGeometry(geometry);
  }, [size]);

  return (
    <group>
      {/* Container walls (transparent) */}
      <mesh>
        <boxGeometry args={[size.x, size.y, size.z]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Container edges */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#00e5ff" transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}

function Piston({ volume }: { volume: number }) {
  const position = useMemo(() => {
    const side = Math.cbrt(volume);
    return new THREE.Vector3(0, side / 2 + 0.1, 0);
  }, [volume]);

  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
      <meshPhysicalMaterial
        color="#ffd166"
        emissive="#ffd166"
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

function GridPlane() {
  return (
    <group position={[0, -3, 0]}>
      <gridHelper args={[10, 20, "#00e5ff", "#1a1a1a"]} />
    </group>
  );
}

export default function GasTankCanvas(props: GasTankCanvasProps) {
  return (
    <div className="w-full h-[800px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 4, 5]} fov={55} />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />

        <GridPlane />
        <Container volume={props.volume} />
        <GasParticles {...props} />
        <Piston volume={props.volume} />

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
