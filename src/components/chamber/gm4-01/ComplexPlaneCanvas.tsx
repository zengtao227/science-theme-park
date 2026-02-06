"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";
import { complexPow, complexPowSteps } from "@/lib/math";

interface ComplexPlaneCanvasProps {
  real: number;
  imaginary: number;
  power: number;
}

function ComplexVector({ real, imaginary, power }: ComplexPlaneCanvasProps) {
  const vectorRef = useRef<THREE.Group>(null);

  const result = useMemo(() => {
    const computed = complexPow({ re: real, im: imaginary }, power);
    return {
      real: computed.re,
      imaginary: computed.im,
      magnitude: computed.r,
      angle: computed.theta,
    };
  }, [real, imaginary, power]);

  useFrame((state) => {
    if (vectorRef.current) {
      vectorRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const trailPoints = useMemo(() => {
    const steps = 50;
    return complexPowSteps({ re: real, im: imaginary }, power, steps).map(
      (point) => new THREE.Vector3(point.re, 0, point.im)
    );
  }, [real, imaginary, power]);

  return (
    <group ref={vectorRef}>
      {/* Original vector z */}
      <group>
        <mesh position={[real / 2, 0, imaginary / 2]}>
          <cylinderGeometry args={[0.02, 0.02, Math.sqrt(real * real + imaginary * imaginary), 8]} />
          <meshPhysicalMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[real, 0, imaginary]} rotation={[0, Math.atan2(imaginary, real), 0]}>
          <coneGeometry args={[0.08, 0.2, 8]} />
          <meshPhysicalMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={0.8}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[real, 0, imaginary]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhysicalMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={0.8}
            metalness={1}
            roughness={0.1}
          />
          <pointLight color="#00e5ff" intensity={2} distance={3} />
        </mesh>
      </group>

      {/* Result vector z^n */}
      {power > 1 && (
        <group>
          <mesh position={[result.real / 2, 0, result.imaginary / 2]}>
            <cylinderGeometry args={[0.02, 0.02, result.magnitude, 8]} />
            <meshPhysicalMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[result.real, 0, result.imaginary]} rotation={[0, result.angle, 0]}>
            <coneGeometry args={[0.08, 0.2, 8]} />
            <meshPhysicalMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={0.8}
              metalness={1}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[result.real, 0, result.imaginary]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshPhysicalMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={0.8}
              metalness={1}
              roughness={0.1}
            />
            <pointLight color="#a855f7" intensity={2} distance={3} />
          </mesh>
        </group>
      )}

      {/* Trail */}
      {power > 1 && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(trailPoints.flatMap((p) => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ffd166" transparent opacity={0.5} linewidth={2} />
        </line>
      )}
    </group>
  );
}

function PolarGrid() {
  const circles = [1, 2, 3, 4, 5];
  const rays = 12;

  return (
    <group>
      {/* Concentric circles */}
      {circles.map((radius) => (
        <mesh key={`circle-${radius}`} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.01, 16, 64]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.2} />
        </mesh>
      ))}

      {/* Radial lines */}
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (i / rays) * Math.PI * 2;
        return (
          <mesh
            key={`ray-${i}`}
            position={[Math.cos(angle) * 2.5, 0, Math.sin(angle) * 2.5]}
            rotation={[0, angle, 0]}
          >
            <cylinderGeometry args={[0.005, 0.005, 5, 8]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.1} />
          </mesh>
        );
      })}

      {/* Axes */}
      <mesh position={[2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 5, 8]} />
        <meshBasicMaterial color="#ff2d7d" />
      </mesh>
      <mesh position={[0, 0, 2.5]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 5, 8]} />
        <meshBasicMaterial color="#39ff14" />
      </mesh>

      {/* Axis labels */}
      <Html position={[5.5, 0, 0]}>
        <div className="text-white text-xs font-black pointer-events-none">Re</div>
      </Html>
      <Html position={[0, 0, 5.5]}>
        <div className="text-white text-xs font-black pointer-events-none">Im</div>
      </Html>
    </group>
  );
}

export default function ComplexPlaneCanvas({ real, imaginary, power }: ComplexPlaneCanvasProps) {
  return (
    <div className="w-full h-[800px] bg-black rounded-xl overflow-hidden border border-white/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[6, 6, 6]} fov={55} />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={15}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />

        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />

        <PolarGrid />
        <ComplexVector real={real} imaginary={imaginary} power={power} />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.5} />
        </mesh>
      </Canvas>
    </div>
  );
}
