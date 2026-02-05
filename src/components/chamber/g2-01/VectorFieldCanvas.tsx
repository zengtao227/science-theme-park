"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text, Grid, Float } from "@react-three/drei";
import * as THREE from "three";

interface VectorFieldCanvasProps {
  fieldFunction?: (x: number, y: number, z: number) => [number, number, number];
  showDivergence?: boolean;
  showCurl?: boolean;
}

// Temporary objects for calculations to avoid GC pressure
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();
const _q1 = new THREE.Quaternion();
const _yAxis = new THREE.Vector3(0, 1, 0);

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  amber: "#ffd166",
  white: "#ffffff",
};

// Default field: F(x,y,z) = [y, -x, sin(z)]
const defaultField = (x: number, y: number, z: number): [number, number, number] => {
  return [y, -x, Math.sin(z)];
};

// Calculate divergence: ∇·F = ∂Fx/∂x + ∂Fy/∂y + ∂Fz/∂z
function calculateDivergence(
  field: (x: number, y: number, z: number) => [number, number, number],
  x: number,
  y: number,
  z: number,
  h = 0.01
): number {
  const [fx1] = field(x + h, y, z);
  const [fx0] = field(x - h, y, z);
  const [, fy1] = field(x, y + h, z);
  const [, fy0] = field(x, y - h, z);
  const [, , fz1] = field(x, y, z + h);
  const [, , fz0] = field(x, y, z - h);

  return ((fx1 - fx0) + (fy1 - fy0) + (fz1 - fz0)) / (2 * h);
}

// Calculate curl: ∇×F
function calculateCurl(
  field: (x: number, y: number, z: number) => [number, number, number],
  x: number,
  y: number,
  z: number,
  h = 0.01
): [number, number, number] {
  const [, fy1z, fz1y] = field(x, y + h, z);
  const [, fy0z, fz0y] = field(x, y - h, z);
  const [fx1z, , fz1x] = field(x, y, z + h);
  const [fx0z, , fz0x] = field(x, y, z - h);
  const [fx1y, fy1x] = field(x + h, y, z);
  const [fx0y, fy0x] = field(x - h, y, z);

  const curlX = (fz1y - fz0y - fy1z + fy0z) / (2 * h);
  const curlY = (fx1z - fx0z - fz1x + fz0x) / (2 * h);
  const curlZ = (fy1x - fy0x - fx1y + fx0y) / (2 * h);

  return [curlX, curlY, curlZ];
}

// Particle tracer that follows the field
interface Particle {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

// Flow arrows using InstancedMesh
function FlowArrows({
  field,
  gridSize = 5,
  spacing = 1.5,
}: {
  field: (x: number, y: number, z: number) => [number, number, number];
  gridSize?: number;
  spacing?: number;
}) {
  const arrowMeshRef = useRef<THREE.InstancedMesh>(null);
  const coneMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());

  const arrowCount = gridSize * gridSize * gridSize;

  // Generate grid positions
  const gridPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const offset = ((gridSize - 1) * spacing) / 2;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        for (let k = 0; k < gridSize; k++) {
          positions.push([
            i * spacing - offset,
            j * spacing - offset,
            k * spacing - offset,
          ]);
        }
      }
    }
    return positions;
  }, [gridSize, spacing]);

  useFrame(({ clock }) => {
    if (!arrowMeshRef.current || !coneMeshRef.current) return;

    const time = clock.getElapsedTime();
    const d = dummy.current;

    gridPositions.forEach(([x, y, z], i) => {
      // Get field vector at this position
      const [fx, fy, fz] = field(x, y, z);
      const magnitude = Math.sqrt(fx * fx + fy * fy + fz * fz);

      if (magnitude < 0.001) {
        d.scale.setScalar(0);
        d.updateMatrix();
        arrowMeshRef.current!.setMatrixAt(i, d.matrix);
        coneMeshRef.current!.setMatrixAt(i, d.matrix);
        return;
      }

      _v1.set(fx, fy, fz).normalize();

      const shaftLength = Math.min(magnitude * 0.4, 0.8);
      _v2.set(x, y, z).addScaledVector(_v1, shaftLength / 2);

      d.position.copy(_v2);
      d.quaternion.setFromUnitVectors(_yAxis, _v1);
      d.scale.set(1, shaftLength, 1);
      d.updateMatrix();
      arrowMeshRef.current!.setMatrixAt(i, d.matrix);

      _v2.set(x, y, z).addScaledVector(_v1, shaftLength);
      d.position.copy(_v2);
      d.quaternion.setFromUnitVectors(_yAxis, _v1);
      const pulse = 1 + Math.sin(time * 2 + i * 0.1) * 0.1;
      d.scale.set(pulse, pulse, pulse);
      d.updateMatrix();
      coneMeshRef.current!.setMatrixAt(i, d.matrix);
    });

    arrowMeshRef.current.instanceMatrix.needsUpdate = true;
    coneMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Arrow shafts */}
      <instancedMesh ref={arrowMeshRef} args={[undefined, undefined, arrowCount]}>
        <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          emissive={palette.cyan}
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>

      {/* Arrow heads */}
      <instancedMesh ref={coneMeshRef} args={[undefined, undefined, arrowCount]}>
        <coneGeometry args={[0.12, 0.25, 8]} />
        <meshPhysicalMaterial
          color={palette.green}
          emissive={palette.green}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </instancedMesh>
    </group>
  );
}

// Particle tracers
function ParticleTracers({
  particles,
  field,
}: {
  particles: Particle[];
  field: (x: number, y: number, z: number) => [number, number, number];
}) {
  const particleMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());

  useFrame((_, delta) => {
    if (!particleMeshRef.current || particles.length === 0) return;

    const d = dummy.current;
    const dt = Math.min(delta, 0.1);
    const aliveCount = particles.length;
    particles.forEach((particle, i) => {
      const [fx, fy, fz] = field(
        particle.position.x,
        particle.position.y,
        particle.position.z
      );

      particle.velocity.set(fx, fy, fz);
      particle.position.addScaledVector(particle.velocity, dt * 0.5);
      particle.life -= dt;

      const lifeFactor = Math.max(0, particle.life / particle.maxLife);
      const scale = 0.08 * lifeFactor;

      d.position.copy(particle.position);
      d.scale.setScalar(scale);
      d.updateMatrix();
      particleMeshRef.current!.setMatrixAt(i, d.matrix);
    });

    // Hide unused instances
    for (let i = aliveCount; i < 100; i++) {
      d.scale.setScalar(0);
      d.updateMatrix();
      particleMeshRef.current!.setMatrixAt(i, d.matrix);
    }
  });

  return (
    <instancedMesh ref={particleMeshRef} args={[undefined, undefined, 100]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshPhysicalMaterial
        color={palette.pink}
        emissive={palette.pink}
        emissiveIntensity={2}
        transparent
        opacity={0.9}
        metalness={0.5}
        roughness={0.3}
      />
    </instancedMesh>
  );
}

// Main scene
function VectorFieldScene({
  field,
  particles,
  onSpawnParticle,
}: {
  field: (x: number, y: number, z: number) => [number, number, number];
  particles: Particle[];
  onSpawnParticle: (position: THREE.Vector3) => void;
}) {
  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      const point = event.point;
      onSpawnParticle(point);
    },
    [onSpawnParticle]
  );

  return (
    <group>
      {/* Clickable plane for spawning particles */}
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleClick}
        visible={false}
      >
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Flow arrows */}
      <FlowArrows field={field} gridSize={5} spacing={1.5} />

      {/* Particle tracers */}
      <ParticleTracers particles={particles} field={field} />

      {/* Axis labels */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.1}>
        <Text position={[4, 0, 0]} fontSize={0.3} color={palette.cyan}>
          X
        </Text>
      </Float>
      <Float speed={1.7} rotationIntensity={0} floatIntensity={0.1}>
        <Text position={[0, 4, 0]} fontSize={0.3} color={palette.green}>
          Y
        </Text>
      </Float>
      <Float speed={1.9} rotationIntensity={0} floatIntensity={0.1}>
        <Text position={[0, 0, 4]} fontSize={0.3} color={palette.pink}>
          Z
        </Text>
      </Float>
    </group>
  );
}

export default function VectorFieldCanvas({
  fieldFunction = defaultField,
  showDivergence = true,
  showCurl = true,
}: VectorFieldCanvasProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextParticleId = useRef(0);

  // Calculate field properties at origin
  const divergence = useMemo(
    () => calculateDivergence(fieldFunction, 0, 0, 0),
    [fieldFunction]
  );

  const curl = useMemo(
    () => calculateCurl(fieldFunction, 0, 0, 0),
    [fieldFunction]
  );

  const curlMagnitude = useMemo(
    () => Math.sqrt(curl[0] ** 2 + curl[1] ** 2 + curl[2] ** 2),
    [curl]
  );

  // Spawn particle at clicked position
  const handleSpawnParticle = useCallback((position: THREE.Vector3) => {
    const newParticle: Particle = {
      id: nextParticleId.current++,
      position: position.clone(),
      velocity: new THREE.Vector3(0, 0, 0),
      life: 5,
      maxLife: 5,
    };

    setParticles((prev) => {
      // Keep only alive particles + new one
      const alive = prev.filter((p) => p.life > 0);
      return [...alive.slice(-99), newParticle];
    });
  }, []);

  // Clean up dead particles (throttle this update)
  useFrame((_, delta) => {
    setParticles((prev) => {
      if (prev.length === 0) return prev;
      const filtered = prev.filter((p) => {
        p.life -= delta; // sync life deduction on state as well for cleanup
        return p.life > 0;
      });
      if (filtered.length === prev.length) return prev;
      return filtered;
    });
  });

  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [8, 6, 8], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.6} color={palette.cyan} />
        <pointLight position={[0, 5, -5]} intensity={0.5} color={palette.purple} />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          minDistance={5}
          maxDistance={20}
          autoRotate={false}
        />

        {/* Grid floor */}
        <Grid
          infiniteGrid
          cellSize={1}
          sectionSize={5}
          cellColor="#0c1624"
          sectionColor="#1b2a44"
          fadeDistance={25}
          fadeStrength={1.2}
          position={[0, -4, 0]}
        />

        {/* Main scene */}
        <VectorFieldScene
          field={fieldFunction}
          particles={particles}
          onSpawnParticle={handleSpawnParticle}
        />

        {/* Title */}
        <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
          <Text
            position={[0, 5, 0]}
            fontSize={0.4}
            color={palette.white}
            anchorX="center"
          >
            VECTOR FIELD ANALYTICS
          </Text>
        </Float>
      </Canvas>

      {/* Cyber-Euler HUD */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="flex gap-2 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase">
            Field_Active v3.0
          </span>
        </div>

        {showDivergence && (
          <div className="bg-black/60 border border-cyan-400/30 rounded px-3 py-2">
            <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider mb-1">
              Divergence (∇·F)
            </div>
            <div className="text-lg font-mono text-cyan-400 font-black">
              {divergence.toFixed(3)}
            </div>
          </div>
        )}

        {showCurl && (
          <div className="bg-black/60 border border-purple-400/30 rounded px-3 py-2">
            <div className="text-[9px] text-purple-400/60 uppercase tracking-wider mb-1">
              Curl (|∇×F|)
            </div>
            <div className="text-lg font-mono text-purple-400 font-black">
              {curlMagnitude.toFixed(3)}
            </div>
            <div className="text-[8px] text-purple-400/40 font-mono mt-1">
              [{curl[0].toFixed(2)}, {curl[1].toFixed(2)}, {curl[2].toFixed(2)}]
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/70 border border-white/20 rounded-lg px-4 py-3">
        <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">
          Controls
        </div>
        <div className="text-[9px] text-white/70 space-y-1">
          <div>• <span className="text-pink-400">Click</span> in space to spawn particle tracers (発光粒子)</div>
          <div>• <span className="text-cyan-400">Drag</span> to rotate • <span className="text-green-400">Scroll</span> to zoom</div>
          <div>• Field: <span className="font-mono text-amber-400">F(x,y,z) = [y, -x, sin(z)]</span></div>
        </div>
      </div>

      {/* Status */}
      <div className="absolute top-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // G2.01<br />
        VECTOR_FIELD: ACTIVE<br />
        PARTICLES: {particles.length}/100
      </div>

      <div className="absolute bottom-4 right-4 text-[9px] font-mono text-white/20 uppercase tracking-wider">
        Hyper-Flow Analytics
      </div>
    </div>
  );
}
