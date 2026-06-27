"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Grid, Float } from "@react-three/drei";
import * as THREE from "three";

interface TesseractCanvasProps {
  unfoldProgress?: number;
  rotationSpeed?: number;
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  white: "#ffffff",
};

function rotate4D(point: number[], angleXY: number, angleZW: number, angleXZ: number, angleYW: number) {
  const [x0, y0, z0, w0] = point;
  const cosXY = Math.cos(angleXY);
  const sinXY = Math.sin(angleXY);
  const x1 = x0 * cosXY - y0 * sinXY;
  const y1 = x0 * sinXY + y0 * cosXY;

  const cosZW = Math.cos(angleZW);
  const sinZW = Math.sin(angleZW);
  const z1 = z0 * cosZW - w0 * sinZW;
  const w1 = z0 * sinZW + w0 * cosZW;

  const cosXZ = Math.cos(angleXZ);
  const sinXZ = Math.sin(angleXZ);
  const x2 = x1 * cosXZ - z1 * sinXZ;
  const z2 = x1 * sinXZ + z1 * cosXZ;

  const cosYW = Math.cos(angleYW);
  const sinYW = Math.sin(angleYW);
  const y2 = y1 * cosYW - w1 * sinYW;
  const w2 = y1 * sinYW + w1 * cosYW;

  return [x2, y2, z2, w2];
}

function project4Dto3D(point: number[], target: THREE.Vector3, distance = 3) {
  const [x, y, z, w] = point;
  const factor = distance / (distance - w);
  return target.set(x * factor, y * factor, z * factor);
}

function generateTesseractVertices() {
  const vertices: number[][] = [];
  for (let i = 0; i < 16; i++) {
    vertices.push([
      (i & 1) ? 1 : -1,
      (i & 2) ? 1 : -1,
      (i & 4) ? 1 : -1,
      (i & 8) ? 1 : -1,
    ]);
  }
  return vertices;
}

function generateTesseractEdges() {
  const edges: [number, number][] = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      const diff = (i ^ j);
      if (diff && !(diff & (diff - 1))) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

function RotatingTesseract({
  unfoldProgress = 0,
  rotationSpeed = 1
}: {
  unfoldProgress?: number;
  rotationSpeed?: number;
}) {
  const vertexMeshRef = useRef<THREE.InstancedMesh>(null);
  const edgeMeshRef = useRef<THREE.InstancedMesh>(null);
  const vertexDummy = useRef(new THREE.Object3D());
  const edgeDummy = useRef(new THREE.Object3D());
  const projectedVerticesRef = useRef(Array.from({ length: 16 }, () => new THREE.Vector3()));
  const midpointRef = useRef(new THREE.Vector3());
  const directionRef = useRef(new THREE.Vector3());
  const quaternionRef = useRef(new THREE.Quaternion());
  const yAxisRef = useRef(new THREE.Vector3(0, 1, 0));

  const vertices4D = useMemo(() => generateTesseractVertices(), []);
  const edges = useMemo(() => generateTesseractEdges(), []);

  useFrame(({ clock }) => {
    if (!vertexMeshRef.current || !edgeMeshRef.current) return;

    const time = clock.getElapsedTime() * rotationSpeed;
    const angleXY = time * 0.3;
    const angleZW = time * 0.2;
    const angleXZ = time * 0.15;
    const angleYW = time * 0.25;
    const projectedVertices = projectedVerticesRef.current;

    vertices4D.forEach((v, i) => {
      const vertex = [...v];
      if (unfoldProgress > 0) {
        vertex[0] += ((i & 1) ? 1 : -1) * unfoldProgress * 2;
        vertex[1] += ((i & 2) ? 1 : -1) * unfoldProgress * 2;
        vertex[2] += ((i & 4) ? 1 : -1) * unfoldProgress * 2;
      }

      const rotated = rotate4D(vertex, angleXY, angleZW, angleXZ, angleYW);
      project4Dto3D(rotated, projectedVertices[i]);
    });

    const vDummy = vertexDummy.current;
    projectedVertices.forEach((pos, i) => {
      vDummy.position.copy(pos);
      const pulse = 1 + Math.sin(time * 4 + i * 0.5) * 0.15;
      vDummy.scale.setScalar(pulse);
      vDummy.updateMatrix();
      vertexMeshRef.current!.setMatrixAt(i, vDummy.matrix);
    });
    vertexMeshRef.current.instanceMatrix.needsUpdate = true;

    const eDummy = edgeDummy.current;
    const midpoint = midpointRef.current;
    const direction = directionRef.current;
    const quaternion = quaternionRef.current;
    const yAxis = yAxisRef.current;

    edges.forEach(([v1Idx, v2Idx], i) => {
      const start = projectedVertices[v1Idx];
      const end = projectedVertices[v2Idx];
      midpoint.addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      direction.subVectors(end, start).normalize();
      quaternion.setFromUnitVectors(yAxis, direction);

      eDummy.position.copy(midpoint);
      eDummy.quaternion.copy(quaternion);
      eDummy.scale.set(1, distance, 1);
      eDummy.updateMatrix();
      edgeMeshRef.current!.setMatrixAt(i, eDummy.matrix);
    });
    edgeMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={vertexMeshRef} args={[undefined, undefined, 16]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color={palette.cyan}
          emissive={palette.cyan}
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
        />
      </instancedMesh>

      <instancedMesh ref={edgeMeshRef} args={[undefined, undefined, 32]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshBasicMaterial
          color={palette.purple}
          transparent
          opacity={0.6}
        />
      </instancedMesh>
    </group>
  );
}

function DimensionLabels() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.2}>
        <Text position={[3, 0, 0]} fontSize={0.3} color={palette.cyan}>X</Text>
      </Float>
      <Float speed={1.7} rotationIntensity={0} floatIntensity={0.2}>
        <Text position={[0, 3, 0]} fontSize={0.3} color={palette.green}>Y</Text>
      </Float>
      <Float speed={1.9} rotationIntensity={0} floatIntensity={0.2}>
        <Text position={[0, 0, 3]} fontSize={0.3} color={palette.pink}>Z</Text>
      </Float>
      <Float speed={2.1} rotationIntensity={0} floatIntensity={0.2}>
        <Text position={[-3, -3, 0]} fontSize={0.3} color={palette.purple}>W (4th)</Text>
      </Float>
    </group>
  );
}

function InfoPanel({ unfoldProgress }: { unfoldProgress: number }) {
  return (
    <group position={[0, 4, 0]}>
      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.15}>
        <Text fontSize={0.4} color={palette.white} anchorX="center">
          TESSERACT (4D Hypercube)
        </Text>
      </Float>
      <Text position={[0, -0.6, 0]} fontSize={0.2} color={palette.cyan} anchorX="center">
        16 Vertices • 32 Edges • 24 Faces • 8 Cells
      </Text>
      <Text position={[0, -1, 0]} fontSize={0.18} color={palette.purple} anchorX="center">
        Unfold: {(unfoldProgress * 100).toFixed(0)}%
      </Text>
    </group>
  );
}

export default function TesseractCanvas({
  unfoldProgress = 0,
  rotationSpeed = 1
}: TesseractCanvasProps) {
  const [localUnfold, setLocalUnfold] = useState(unfoldProgress);

  return (
    <div className="relative w-full h-[800px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [6, 5, 6], fov: 55 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.6} color={palette.cyan} />
        <pointLight position={[0, 5, -5]} intensity={0.5} color={palette.purple} />

        <OrbitControls enablePan={false} minDistance={4} maxDistance={15} autoRotate={false} />

        <Grid
          infiniteGrid
          cellSize={1}
          sectionSize={5}
          cellColor="#0c1624"
          sectionColor="#1b2a44"
          fadeDistance={20}
          fadeStrength={1.2}
          position={[0, -3, 0]}
        />

        <RotatingTesseract unfoldProgress={localUnfold} rotationSpeed={rotationSpeed} />
        <DimensionLabels />
        <InfoPanel unfoldProgress={localUnfold} />

        <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
          <Text position={[-4, -2, -2]} fontSize={0.2} color={palette.white} fillOpacity={0.08}>
            4D_HYPERCUBE_PROJECTION
          </Text>
        </Float>
      </Canvas>

      <div className="absolute top-4 left-4 flex gap-2 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-[8px] font-mono text-white/90 tracking-[0.3em] uppercase">
          Hyper_Geometry v4.0
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-white uppercase tracking-wider">
            Unfold (展开)
          </span>
          <span className="text-[10px] font-mono text-cyan-400">
            {(localUnfold * 100).toFixed(0)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={localUnfold}
          onChange={(e) => setLocalUnfold(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
        />
      </div>

      <div className="absolute top-4 right-4 text-[9px] font-mono text-white/60 uppercase tracking-wider">
        Tesseract Lab 4D
      </div>
    </div>
  );
}
