"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface CalculusCanvasProps {
  mode: "tangent" | "newton";
  xPosition: number;
  yPosition: number;
  functionType: "parabola" | "cubic" | "sine";
}

const functions = {
  parabola: {
    f: (x: number, y: number) => 0.12 * (x * x + y * y),
    fx: (x: number) => 0.24 * x,
    fy: (_x: number, y: number) => 0.24 * y,
  },
  cubic: {
    f: (x: number, y: number) => 0.08 * (x * x * x - 3 * x) + 0.05 * y * y,
    fx: (x: number) => 0.24 * x * x - 0.24,
    fy: (_x: number, y: number) => 0.1 * y,
  },
  sine: {
    f: (x: number, y: number) => Math.sin(x) * 0.8 + Math.cos(y) * 0.6,
    fx: (x: number) => Math.cos(x) * 0.8,
    fy: (_x: number, y: number) => -Math.sin(y) * 0.6,
  },
};

function SurfaceMesh({ functionType }: { functionType: CalculusCanvasProps["functionType"] }) {
  const geometry = useMemo(() => {
    const size = 6;
    const segments = 70;
    const mesh = new THREE.PlaneGeometry(size * 2, size * 2, segments, segments);
    const position = mesh.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const z = position.getY(i);
      const y = functions[functionType].f(x, z);
      position.setXYZ(i, x, y, z);
    }
    mesh.computeVertexNormals();
    return mesh;
  }, [functionType]);

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        color="#00e5ff"
        emissive="#00e5ff"
        emissiveIntensity={0.2}
        metalness={0.6}
        roughness={0.2}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

function TangentPlane({
  x,
  y,
  functionType,
}: {
  x: number;
  y: number;
  functionType: CalculusCanvasProps["functionType"];
}) {
  const fx = functions[functionType].fx(x);
  const fy = functions[functionType].fy(x, y);
  const z0 = functions[functionType].f(x, y);
  const normal = useMemo(() => new THREE.Vector3(-fx, 1, -fy).normalize(), [fx, fy]);
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    return q;
  }, [normal]);

  return (
    <group>
      <mesh position={[x, z0, y]} quaternion={quaternion}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshStandardMaterial color="#ff2d7d" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[x, z0, y]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function NewtonIterations({
  xStart,
  functionType,
}: {
  xStart: number;
  functionType: CalculusCanvasProps["functionType"];
}) {
  const steps = useMemo(() => {
    const points: Array<{ x: number; y: number; next: number }> = [];
    let x = xStart;
    for (let i = 0; i < 6; i += 1) {
      const y = functions[functionType].f(x, 0);
      const slope = functions[functionType].fx(x);
      if (Math.abs(slope) < 0.001) break;
      const next = x - y / slope;
      points.push({ x, y, next });
      x = next;
    }
    return points;
  }, [xStart, functionType]);

  return (
    <group>
      {steps.map((step, i) => (
        <group key={`${step.x}-${i}`}>
          <Line
            points={[
              new THREE.Vector3(step.x, 0, 0),
              new THREE.Vector3(step.x, step.y, 0),
            ]}
            color="#ffd166"
            lineWidth={1}
          />
          <Line
            points={[
              new THREE.Vector3(step.x, step.y, 0),
              new THREE.Vector3(step.next, 0, 0),
            ]}
            color="#a855f7"
            lineWidth={2}
          />
          <mesh position={[step.x, step.y, 0]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}
      {steps.length > 0 && (
        <mesh position={[steps[steps.length - 1].next, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.3]} />
          <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={1} />
        </mesh>
      )}
    </group>
  );
}

function Axes() {
  return (
    <group>
      <Line points={[new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)]} color="#444" lineWidth={2} />
      <Line points={[new THREE.Vector3(0, 0, -6), new THREE.Vector3(0, 0, 6)]} color="#444" lineWidth={2} />
      <Line points={[new THREE.Vector3(0, -2, 0), new THREE.Vector3(0, 3, 0)]} color="#666" lineWidth={2} />
      <Text position={[6.3, 0, 0]} fontSize={0.3} color="#666">
        x
      </Text>
      <Text position={[0, 0, 6.3]} fontSize={0.3} color="#666">
        y
      </Text>
      <Text position={[0, 3.2, 0]} fontSize={0.3} color="#666">
        z
      </Text>
    </group>
  );
}

function Scene({ mode, xPosition, yPosition, functionType }: CalculusCanvasProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={1.2} />
      <pointLight position={[-6, 6, -6]} intensity={0.6} />
      <Axes />
      <SurfaceMesh functionType={functionType} />
      {mode === "tangent" && (
        <TangentPlane x={xPosition} y={yPosition} functionType={functionType} />
      )}
      {mode === "newton" && (
        <NewtonIterations xStart={xPosition} functionType={functionType} />
      )}
      <OrbitControls enablePan={false} minDistance={6} maxDistance={16} />
    </>
  );
}

export default function CalculusCanvas(props: CalculusCanvasProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [7, 6, 8], fov: 50 }}>
        <Scene {...props} />
      </Canvas>
    </div>
  );
}
