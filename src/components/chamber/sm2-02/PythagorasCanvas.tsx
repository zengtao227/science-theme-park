"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Grid, Float, Billboard } from "@react-three/drei";
import * as THREE from "three";

interface TriangleCanvasProps {
  a: number;
  b: number;
  c: number;
  highlightRightAngle: boolean;
}

// Animated 3D Voxel Grid using InstancedMesh
function VoxelGrid({
  count,
  color,
  emissive,
  position,
  gridSize,
  animationDelay = 0
}: {
  count: number;
  color: string;
  emissive: string;
  position: [number, number, number];
  gridSize: number;
  animationDelay?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummyRef = useRef(new THREE.Object3D());
  const dummy = dummyRef.current;

  const cubePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const spacing = 0.4;

    for (let i = 0; i < Math.min(count, 100); i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      positions.push(new THREE.Vector3(
        col * spacing,
        row * spacing,
        0
      ));
    }
    return positions;
  }, [count, gridSize]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime() + animationDelay;

    cubePositions.forEach((pos, i) => {
      // Wave animation
      const wave = Math.sin(time * 2 + i * 0.1) * 0.05;
      const pulse = 1 + Math.sin(time * 3 + i * 0.15) * 0.1;

      dummy.position.set(
        position[0] + pos.x,
        position[1] + pos.y,
        position[2] + pos.z + wave
      );
      dummy.scale.setScalar(pulse);
      dummy.rotation.z = Math.sin(time + i * 0.1) * 0.1;
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, Math.min(count, 100)]}>
      <boxGeometry args={[0.35, 0.35, 0.35]} />
      <meshPhysicalMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}

// 3D Pythagorean Theorem with Animated Voxel Grids
function Triangle3D({ a, b, c, highlightRightAngle }: TriangleCanvasProps) {
  // 移除自动旋转动画

  // Calculate positions for the right triangle
  const origin = new THREE.Vector3(0, 0, 0);
  const pointA = new THREE.Vector3(a * 0.8, 0, 0);
  const pointC = new THREE.Vector3(0, b * 0.8, 0);

  // Triangle edges with glow
  const trianglePoints = [origin, pointA, pointC, origin];

  // Grid positions
  const aSquarePos: [number, number, number] = [-a * 0.4, -2, 0];
  const bSquarePos: [number, number, number] = [a * 0.8 + 0.5, -2, 0];
  const cSquarePos: [number, number, number] = [a * 0.8 + 0.5, b * 0.4, 0];

  const mergeGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!mergeGroupRef.current) return;
    const t = clock.getElapsedTime();
    const anim = (Math.sin(t * 0.5) + 1) / 2;

    mergeGroupRef.current.position.set(
      aSquarePos[0] + anim * (cSquarePos[0] - aSquarePos[0]),
      aSquarePos[1] + anim * (cSquarePos[1] - aSquarePos[1]),
      aSquarePos[2] + anim * 0.5
    );
  });

  return (
    <group>
      {/* Triangle frame with neon glow */}
      <Line
        points={trianglePoints}
        color="#00ffff"
        lineWidth={4}
        transparent
        opacity={0.9}
      />

      {/* Glowing tube effect */}
      <Line
        points={trianglePoints}
        color="#00ffff"
        lineWidth={10}
        transparent
        opacity={0.2}
      />

      {/* Right angle marker */}
      {highlightRightAngle && (
        <group>
          <Line
            points={[
              new THREE.Vector3(0.4, 0, 0),
              new THREE.Vector3(0.4, 0.4, 0),
              new THREE.Vector3(0, 0.4, 0)
            ]}
            color="#39ff14"
            lineWidth={3}
          />
          <mesh position={[0.2, 0.2, 0]}>
            <planeGeometry args={[0.4, 0.4]} />
            <meshBasicMaterial color="#39ff14" transparent opacity={0.15} />
          </mesh>
        </group>
      )}

      {/* a² voxel grid (red/orange) */}
      <group position={aSquarePos}>
        <VoxelGrid
          count={a * a}
          color="#ff4444"
          emissive="#ff6600"
          position={[0, 0, 0]}
          gridSize={a}
          animationDelay={0}
        />
        <Text position={[a * 0.2, -0.8, 0]} fontSize={0.4} color="#ff4444" anchorX="center">
          a² = {a * a}
        </Text>
      </group>

      {/* b² voxel grid (blue/cyan) */}
      <group position={bSquarePos}>
        <VoxelGrid
          count={b * b}
          color="#4488ff"
          emissive="#00aaff"
          position={[0, 0, 0]}
          gridSize={b}
          animationDelay={1}
        />
        <Text position={[b * 0.2, -0.8, 0]} fontSize={0.4} color="#4488ff" anchorX="center">
          b² = {b * b}
        </Text>
      </group>

      {/* c² voxel grid (purple/magenta) - animated merge position */}
      <group ref={mergeGroupRef}>
        <VoxelGrid
          count={Math.round(c * c)}
          color="#ff00ff"
          emissive="#ff00aa"
          position={[0, 0, 0]}
          gridSize={Math.round(c)}
          animationDelay={2}
        />
        <Text position={[c * 0.2, -0.8, 0]} fontSize={0.4} color="#ff00ff" anchorX="center">
          c² = {(c * c).toFixed(1)}
        </Text>
      </group>

      {/* Equation display */}
      <Text position={[0, b * 0.8 + 1, 0]} fontSize={0.5} color="#ffffff" anchorX="center">
        a² + b² = c²
      </Text>

      {/* Triangle labels */}
      <Text position={[a * 0.4, -0.5, 0]} fontSize={0.35} color="#00ffff" anchorX="center">
        a = {a}
      </Text>
      <Text position={[-0.5, b * 0.4, 0]} fontSize={0.35} color="#00ffff" anchorX="center">
        b = {b}
      </Text>
      <Text position={[a * 0.4, b * 0.4, 0.5]} fontSize={0.35} color="#00ffff" anchorX="center">
        c = {c.toFixed(2)}
      </Text>
    </group>
  );
}

interface SpaceCanvasProps {
  a: number;
  b: number;
  c: number;
}

// Elite Space: Glassy 3D Cuboid with Glowing Body Diagonal
function Space3D({ a, b, c }: SpaceCanvasProps) {
  const diagonalRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    // Pulsing diagonal glow
    if (diagonalRef.current) {
      const pulse = 0.8 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
      (diagonalRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  // Box vertices
  const O = new THREE.Vector3(0, 0, 0);
  const A = new THREE.Vector3(a, 0, 0);
  const B = new THREE.Vector3(a, b, 0);
  const C = new THREE.Vector3(0, b, 0);
  const D = new THREE.Vector3(0, 0, c);
  const E = new THREE.Vector3(a, 0, c);
  const F = new THREE.Vector3(a, b, c);
  const G = new THREE.Vector3(0, b, c);

  const diagonal = Math.sqrt(a * a + b * b + c * c);

  return (
    <group position={[-a / 2, -b / 2, -c / 2]}>
      {/* Glassy cuboid faces */}
      {/* Bottom face */}
      <mesh position={[a / 2, 0, c / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[a, c]} />
        <meshPhysicalMaterial
          color="#00ffff"
          transparent
          opacity={0.02}
          side={THREE.DoubleSide}
          metalness={0.1}
          roughness={0}
          transmission={1}
          thickness={0.01}
        />
      </mesh>

      {/* Top face */}
      <mesh position={[a / 2, b, c / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[a, c]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>

      {/* Front face */}
      <mesh position={[a / 2, b / 2, 0]}>
        <planeGeometry args={[a, b]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>

      {/* Back face */}
      <mesh position={[a / 2, b / 2, c]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[a, b]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>

      {/* Left face */}
      <mesh position={[0, b / 2, c / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[c, b]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>

      {/* Right face */}
      <mesh position={[a, b / 2, c / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[c, b]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>

      {/* Metallic edges */}
      <Line points={[O, A, B, C, O]} color="#ffffff" lineWidth={2.5} transparent opacity={0.6} />
      <Line points={[D, E, F, G, D]} color="#ffffff" lineWidth={2.5} transparent opacity={0.6} />
      <Line points={[O, D]} color="#ffffff" lineWidth={2.5} transparent opacity={0.6} />
      <Line points={[A, E]} color="#ffffff" lineWidth={2.5} transparent opacity={0.6} />
      <Line points={[B, F]} color="#ffffff" lineWidth={2.5} transparent opacity={0.6} />
      <Line points={[C, G]} color="#ffffff" lineWidth={2.5} transparent opacity={0.6} />

      {/* Dimension lines with glow */}
      <Line points={[O, A]} color="#39ff14" lineWidth={3} />
      <Line points={[O, A]} color="#39ff14" lineWidth={9} transparent opacity={0.25} />

      <Line points={[A, B]} color="#00e5ff" lineWidth={3} />
      <Line points={[A, B]} color="#00e5ff" lineWidth={9} transparent opacity={0.25} />

      <Line points={[B, F]} color="#a855f7" lineWidth={3} />
      <Line points={[B, F]} color="#a855f7" lineWidth={9} transparent opacity={0.25} />

      {/* GLOWING BODY DIAGONAL - The Star Feature */}
      <Line points={[O, F]} color="#ff0080" lineWidth={5} />
      <Line points={[O, F]} color="#ff0080" lineWidth={15} transparent opacity={0.4} />

      {/* Diagonal tube with inner glow */}
      <mesh ref={diagonalRef}>
        <tubeGeometry args={[
          new THREE.LineCurve3(O, F),
          64,
          0.08,
          8,
          false
        ]} />
        <meshBasicMaterial
          color="#ff0080"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Glowing spheres at vertices */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.2}>
        <mesh position={O}>
          <sphereGeometry args={[0.18, 20, 20]} />
          <meshPhysicalMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1}
            metalness={0.8}
            roughness={0.2}
          />
          <pointLight color="#ffffff" intensity={0.5} distance={2} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0} floatIntensity={0.2}>
        <mesh position={F}>
          <sphereGeometry args={[0.18, 20, 20]} />
          <meshPhysicalMaterial
            color="#ff0080"
            emissive="#ff0080"
            emissiveIntensity={1.5}
            metalness={0.8}
            roughness={0.2}
          />
          <pointLight color="#ff0080" intensity={1} distance={3} />
        </mesh>
      </Float>

      {/* Corner vertex markers */}
      {[A, B, C, D, E, G].map((vertex, i) => (
        <mesh key={i} position={vertex}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshPhysicalMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Labels with enhanced styling - Billboard ensures they always face the camera */}
      <Billboard position={[a / 2, 0.8, -0.5]}>
        <Text fontSize={0.5} color="#39ff14" anchorX="center" renderOrder={100} material-depthTest={false} material-depthWrite={false}>
          a = {a}
        </Text>
      </Billboard>

      <Billboard position={[a + 0.8, b / 2, -0.5]}>
        <Text fontSize={0.5} color="#00e5ff" anchorX="center" renderOrder={100} material-depthTest={false} material-depthWrite={false}>
          b = {b}
        </Text>
      </Billboard>

      <Billboard position={[a + 0.8, b + 0.5, c / 2]}>
        <Text fontSize={0.5} color="#a855f7" anchorX="center" renderOrder={100} material-depthTest={false} material-depthWrite={false}>
          c = {c}
        </Text>
      </Billboard>

      <Billboard position={[a / 2, b + 1.8, c / 2]}>
        <Text fontSize={0.6} color="#ff0080" anchorX="center" renderOrder={100} material-depthTest={false} material-depthWrite={false}>
          d = ?
        </Text>
      </Billboard>
    </group>
  );
}

interface DistanceCanvasProps {
  p1: { x: number; y: number };
  p2: { x: number; y: number };
}

// 3D Coordinate Distance with Voxel Path
function Distance3D({ p1, p2 }: DistanceCanvasProps) {
  // 移除自动旋转

  const distance = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  const dx = Math.abs(p2.x - p1.x);
  const dy = Math.abs(p2.y - p1.y);

  const P1 = new THREE.Vector3(p1.x, p1.y, 0);
  const P2 = new THREE.Vector3(p2.x, p2.y, 0);
  const corner = new THREE.Vector3(p2.x, p1.y, 0);

  return (
    <group>
      {/* Grid plane */}
      <Grid
        args={[24, 24]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#ffffff"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#00ffff"
        fadeDistance={30}
        fadeStrength={1}
        position={[0, 0, -0.1]}
      />

      {/* Axes */}
      <Line points={[new THREE.Vector3(-12, 0, 0), new THREE.Vector3(12, 0, 0)]} color="#ffffff" lineWidth={2} transparent opacity={0.3} />
      <Line points={[new THREE.Vector3(0, -12, 0), new THREE.Vector3(0, 12, 0)]} color="#ffffff" lineWidth={2} transparent opacity={0.3} />

      {/* Right triangle helper lines */}
      <Line points={[P1, corner, P2]} color="#ffffff" lineWidth={2} transparent opacity={0.4} dashed dashScale={2} />

      {/* Distance line (main feature) */}
      <Line points={[P1, P2]} color="#d946ef" lineWidth={5} />
      <Line points={[P1, P2]} color="#d946ef" lineWidth={12} transparent opacity={0.35} />

      {/* Dimension indicators */}
      <Line points={[P1, corner]} color="#39ff14" lineWidth={3} />
      <Line points={[P1, corner]} color="#39ff14" lineWidth={8} transparent opacity={0.25} />

      <Line points={[corner, P2]} color="#00e5ff" lineWidth={3} />
      <Line points={[corner, P2]} color="#00e5ff" lineWidth={8} transparent opacity={0.25} />

      {/* Points */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
        <mesh position={P1}>
          <sphereGeometry args={[0.25, 20, 20]} />
          <meshPhysicalMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.2}
          />
          <pointLight color="#ffffff" intensity={0.5} distance={2} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0} floatIntensity={0.3}>
        <mesh position={P2}>
          <sphereGeometry args={[0.25, 20, 20]} />
          <meshPhysicalMaterial
            color="#39ff14"
            emissive="#39ff14"
            emissiveIntensity={1}
            metalness={0.8}
            roughness={0.2}
          />
          <pointLight color="#39ff14" intensity={0.8} distance={2} />
        </mesh>
      </Float>

      {/* Corner marker */}
      <mesh position={corner}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      <Billboard position={[p1.x, p1.y + 1, 0.5]}>
        <Text fontSize={0.5} color="#ffffff" anchorX="center" renderOrder={100} material-depthTest={false} material-depthWrite={false}>
          ({p1.x}, {p1.y})
        </Text>
      </Billboard>

      <Billboard position={[p2.x, p2.y + 1, 0.5]}>
        <Text fontSize={0.5} color="#39ff14" anchorX="center" renderOrder={100} material-depthTest={false} material-depthWrite={false}>
          ({p2.x}, {p2.y})
        </Text>
      </Billboard>

      <Billboard position={[(p1.x + p2.x) / 2, (p1.y + p2.y) / 2 + 1.5, 0.5]}>
        <Text fontSize={0.6} color="#d946ef" anchorX="center" renderOrder={100} material-depthTest={false} material-depthWrite={false}>
          d = ?
        </Text>
      </Billboard>
      <Text position={[(p1.x + corner.x) / 2, p1.y - 0.7, 0]} fontSize={0.35} color="#39ff14" anchorX="center">
        Δx = {dx}
      </Text>
      <Text position={[p2.x + 0.9, (p1.y + p2.y) / 2, 0]} fontSize={0.35} color="#00e5ff" anchorX="center">
        Δy = {dy}
      </Text>
    </group>
  );
}

export interface S202CanvasProps {
  visual: {
    kind: "triangle" | "space" | "distance";
    a?: number;
    b?: number;
    c?: number;
    highlightRightAngle?: boolean;
    p1?: { x: number; y: number };
    p2?: { x: number; y: number };
  };
}

export default function S202PythagorasCanvas({ visual }: S202CanvasProps) {
  if (visual.kind === "triangle" && visual.a !== undefined && visual.b !== undefined && visual.c !== undefined) {
    return (
      <div className="relative w-full h-[800px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden">
        <Canvas camera={{ position: [8, 6, 12], fov: 55 }} gl={{ antialias: true }}>
          <color attach="background" args={["#000005"]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, 5]} intensity={0.5} color="#00ffff" />
          <pointLight position={[0, 10, -5]} intensity={0.4} color="#ff00ff" />

          <OrbitControls
            enablePan={false}
            minDistance={6}
            maxDistance={25}
            autoRotate={false}
          />

          <Triangle3D
            a={visual.a}
            b={visual.b}
            c={visual.c}
            highlightRightAngle={visual.highlightRightAngle ?? false}
          />

          <Grid
            args={[30, 30]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#ffffff"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#00ffff"
            fadeDistance={30}
            fadeStrength={1}
            position={[0, -3, 0]}
          />
        </Canvas>

        <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 uppercase tracking-wider">
          Voxel Pythagorean Proof
        </div>
      </div>
    );
  }

  if (visual.kind === "space" && visual.a !== undefined && visual.b !== undefined && visual.c !== undefined) {
    return (
      <div className="relative w-full h-[800px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden">
        <Canvas camera={{ position: [12, 10, 14], fov: 55 }} gl={{ antialias: true }}>
          <color attach="background" args={["#050510"]} />
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, 10]} intensity={0.6} color="#ff0080" />
          <pointLight position={[0, 15, 0]} intensity={0.5} color="#00ffff" />

          <OrbitControls
            enablePan={false}
            minDistance={6}
            maxDistance={30}
            autoRotate={false}
          />

          <Space3D a={visual.a} b={visual.b} c={visual.c} />

          <Grid
            args={[30, 30]}
            cellSize={1}
            cellThickness={0.3}
            cellColor="#222222"
            sectionSize={5}
            sectionThickness={0.8}
            sectionColor="#444444"
            fadeDistance={30}
            fadeStrength={1}
            position={[0, -visual.b / 2 - 3, 0]}
          />
        </Canvas>

        <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 uppercase tracking-wider">
          Elite Space Diagonal
        </div>
      </div>
    );
  }

  if (visual.kind === "distance" && visual.p1 && visual.p2) {
    return (
      <div className="relative w-full h-[800px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden">
        <Canvas camera={{ position: [0, 0, 18], fov: 55 }} gl={{ antialias: true }}>
          <color attach="background" args={["#000005"]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, 5]} intensity={0.5} color="#d946ef" />

          <OrbitControls
            enablePan={true}
            enableRotate={false}
            minDistance={8}
            maxDistance={30}
          />

          <Distance3D p1={visual.p1} p2={visual.p2} />
        </Canvas>

        <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 uppercase tracking-wider">
          Distance Formula 3D
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[800px] bg-[#020208] rounded-xl border border-white/10 flex items-center justify-center">
      <div className="text-white/40 text-center p-8">No visualization available</div>
    </div>
  );
}
