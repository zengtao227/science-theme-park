"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface ReactionCanvasProps {
  temperature?: number; // in Kelvin
  concentrationA?: number; // 0-1
  concentrationB?: number; // 0-1
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
  red: "#ff0000",
  blue: "#0000ff",
};

// Particle system with collision detection
function ReactionParticles({
  temperature,
  concentrationA,
  concentrationB,
}: {
  temperature: number;
  concentrationA: number;
  concentrationB: number;
}) {
  const totalParticles = 200;
  const particlesA = Math.floor(totalParticles * concentrationA * 0.4);
  const particlesB = Math.floor(totalParticles * concentrationB * 0.4);
  const particlesC = totalParticles - particlesA - particlesB;
  
  const meshRefA = useRef<THREE.InstancedMesh>(null);
  const meshRefB = useRef<THREE.InstancedMesh>(null);
  const meshRefC = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  
  // Initialize particle data
  const particles = useMemo(() => {
    const data: Array<{
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      type: "A" | "B" | "C";
      energy: number;
    }> = [];
    
    // Type A particles
    for (let i = 0; i < particlesA; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        type: "A",
        energy: Math.random(),
      });
    }
    
    // Type B particles
    for (let i = 0; i < particlesB; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        type: "B",
        energy: Math.random(),
      });
    }
    
    // Type C particles (products)
    for (let i = 0; i < particlesC; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
        type: "C",
        energy: 0,
      });
    }
    
    return data;
  }, [particlesA, particlesB, particlesC]);
  
  useFrame(() => {
    if (!meshRefA.current || !meshRefB.current || !meshRefC.current) return;
    
    const d = dummy.current;
    const speedFactor = Math.sqrt(temperature / 300); // Temperature affects speed
    const activationThreshold = 0.5 / speedFactor; // Lower threshold at higher temp
    
    let indexA = 0;
    let indexB = 0;
    let indexC = 0;
    
    // Update particle positions and check collisions
    particles.forEach((particle, i) => {
      // Update velocity based on temperature
      particle.velocity.multiplyScalar(0.99);
      particle.velocity.add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.01 * speedFactor,
          (Math.random() - 0.5) * 0.01 * speedFactor,
          (Math.random() - 0.5) * 0.01 * speedFactor
        )
      );
      
      // Update position
      particle.position.add(particle.velocity);
      
      // Boundary collision
      const bound = 4;
      if (Math.abs(particle.position.x) > bound) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > bound) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > bound) particle.velocity.z *= -1;
      
      // Check collision with other particles (simple reaction)
      if (particle.type === "A" || particle.type === "B") {
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          if (
            (particle.type === "A" && other.type === "B") ||
            (particle.type === "B" && other.type === "A")
          ) {
            const distance = particle.position.distanceTo(other.position);
            if (distance < 0.3) {
              const relativeSpeed = particle.velocity.distanceTo(other.velocity);
              if (relativeSpeed > activationThreshold) {
                // Reaction occurs!
                particle.type = "C";
                other.type = "C";
                particle.energy = 0;
                other.energy = 0;
              }
            }
          }
        }
      }
      
      // Render based on type
      d.position.copy(particle.position);
      d.scale.setScalar(0.15);
      d.updateMatrix();
      
      if (particle.type === "A") {
        meshRefA.current!.setMatrixAt(indexA++, d.matrix);
      } else if (particle.type === "B") {
        meshRefB.current!.setMatrixAt(indexB++, d.matrix);
      } else {
        meshRefC.current!.setMatrixAt(indexC++, d.matrix);
      }
    });
    
    meshRefA.current.count = indexA;
    meshRefB.current.count = indexB;
    meshRefC.current.count = indexC;
    
    meshRefA.current.instanceMatrix.needsUpdate = true;
    meshRefB.current.instanceMatrix.needsUpdate = true;
    meshRefC.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <group>
      {/* Type A particles (red) */}
      <instancedMesh ref={meshRefA} args={[undefined, undefined, totalParticles]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshPhysicalMaterial
          color={palette.red}
          emissive={palette.red}
          emissiveIntensity={0.5}
        />
      </instancedMesh>
      
      {/* Type B particles (blue) */}
      <instancedMesh ref={meshRefB} args={[undefined, undefined, totalParticles]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshPhysicalMaterial
          color={palette.blue}
          emissive={palette.blue}
          emissiveIntensity={0.5}
        />
      </instancedMesh>
      
      {/* Type C particles (green - product) */}
      <instancedMesh ref={meshRefC} args={[undefined, undefined, totalParticles]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshPhysicalMaterial
          color={palette.green}
          emissive={palette.green}
          emissiveIntensity={0.8}
        />
      </instancedMesh>
    </group>
  );
}

// Container box
function ReactionContainer() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[8, 8, 8]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          transparent
          opacity={0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Container edges */}
      {[
        [-4, -4, -4, 4, -4, -4],
        [-4, 4, -4, 4, 4, -4],
        [-4, -4, 4, 4, -4, 4],
        [-4, 4, 4, 4, 4, 4],
        [-4, -4, -4, -4, 4, -4],
        [4, -4, -4, 4, 4, -4],
        [-4, -4, 4, -4, 4, 4],
        [4, -4, 4, 4, 4, 4],
        [-4, -4, -4, -4, -4, 4],
        [4, -4, -4, 4, -4, 4],
        [-4, 4, -4, -4, 4, 4],
        [4, 4, -4, 4, 4, 4],
      ].map((coords, i) => {
        const [x1, y1, z1, x2, y2, z2] = coords;
        const length = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
        );
        return (
          <mesh
            key={i}
            position={[(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2]}
          >
            <cylinderGeometry args={[0.02, 0.02, length, 8]} />
            <meshBasicMaterial color={palette.cyan} transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ReactionCanvas({
  temperature = 300,
  concentrationA = 0.5,
  concentrationB = 0.5,
}: ReactionCanvasProps) {
  const [localTemp, setLocalTemp] = useState(temperature);
  const [localConcA, setLocalConcA] = useState(concentrationA);
  const [localConcB, setLocalConcB] = useState(concentrationB);
  
  // Arrhenius equation: k = A * exp(-Ea/RT)
  const R = 8.314; // J/(mol·K)
  const Ea = 50000; // J/mol (activation energy)
  const A = 1e10; // pre-exponential factor
  const rateConstant = A * Math.exp(-Ea / (R * localTemp));
  
  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [10, 8, 10], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color={palette.cyan} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={10}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        {/* Container */}
        <ReactionContainer />
        
        {/* Particles */}
        <ReactionParticles
          temperature={localTemp}
          concentrationA={localConcA}
          concentrationB={localConcB}
        />
        
        {/* HUD */}
        <Text position={[0, 5, 0]} fontSize={0.4} color={palette.white}>
          REACTION KINETICS LAB
        </Text>
        <Text position={[0, 4.3, 0]} fontSize={0.25} color={palette.cyan}>
          A + B → C
        </Text>
      </Canvas>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 space-y-4">
        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
              Temperature (K)
            </span>
            <span className="text-[10px] font-mono text-red-400">
              {localTemp.toFixed(0)}K
            </span>
          </div>
          <input
            type="range"
            min="250"
            max="500"
            step="10"
            value={localTemp}
            onChange={(e) => setLocalTemp(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-red-400
                       [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,0,0,0.5)]
                       [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
        
        {/* Concentration A */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
              [A] Concentration
            </span>
            <span className="text-[10px] font-mono text-red-400">
              {(localConcA * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={localConcA}
            onChange={(e) => setLocalConcA(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-red-400
                       [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
        
        {/* Concentration B */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
              [B] Concentration
            </span>
            <span className="text-[10px] font-mono text-blue-400">
              {(localConcB * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={localConcB}
            onChange={(e) => setLocalConcB(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-blue-400
                       [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      </div>
      
      {/* Info panel */}
      <div className="absolute top-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          Arrhenius Equation
        </div>
        <div className="text-[11px] font-mono text-white">
          k = A·e^(-Ea/RT)
        </div>
        <div className="text-[9px] text-white/40 mt-1">
          k = {rateConstant.toExponential(2)} s⁻¹
        </div>
      </div>
      
      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // C2.01<br />
        KINETICS_SIM: ACTIVE<br />
        PARTICLES: 200
      </div>
    </div>
  );
}
