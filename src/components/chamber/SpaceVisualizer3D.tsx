"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Line } from "@react-three/drei";
import { GeometryData } from "@/lib/gm2-02-types";
import * as THREE from "three";

interface SpaceVisualizer3DProps {
  data: GeometryData;
}

interface SceneBounds {
  center: [number, number, number];
  extent: number;
}

function buildSceneBounds(data: GeometryData): SceneBounds {
  const allPoints: Array<[number, number, number]> = [];

  data.points?.forEach((point) => {
    if (point.coordinates.length === 3) {
      allPoints.push(point.coordinates as [number, number, number]);
    }
  });

  data.lines?.forEach((line) => {
    if (line.type !== "3D") return;
    const sampleT = 4;
    allPoints.push([line.point.x, line.point.y, line.point.z]);
    allPoints.push([
      line.point.x + line.direction.x * sampleT,
      line.point.y + line.direction.y * sampleT,
      line.point.z + line.direction.z * sampleT,
    ]);
    allPoints.push([
      line.point.x - line.direction.x * sampleT,
      line.point.y - line.direction.y * sampleT,
      line.point.z - line.direction.z * sampleT,
    ]);
  });

  data.planes?.forEach((plane) => {
    const [A, B, C, D] = plane.coefficients;
    if (Math.abs(C) > 1e-6) allPoints.push([0, 0, -D / C]);
    else if (Math.abs(B) > 1e-6) allPoints.push([0, -D / B, 0]);
    else if (Math.abs(A) > 1e-6) allPoints.push([-D / A, 0, 0]);
  });

  if (allPoints.length === 0) {
    return { center: [0, 0, 0], extent: 5 };
  }

  const xs = allPoints.map((p) => p[0]);
  const ys = allPoints.map((p) => p[1]);
  const zs = allPoints.map((p) => p[2]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const minZ = Math.min(...zs);
  const maxZ = Math.max(...zs);

  const center: [number, number, number] = [
    (minX + maxX) / 2,
    (minY + maxY) / 2,
    (minZ + maxZ) / 2,
  ];

  const maxSpan = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
  const extent = Math.max(5, maxSpan * 0.55 + 1.4);
  return { center, extent };
}

// Axes component
function Axes({ extent }: { extent: number }) {
  return (
    <>
      {/* X-axis (red) */}
      <Line
        points={[[-extent, 0, 0], [extent, 0, 0]]}
        color="red"
        lineWidth={2}
      />
      {/* Y-axis (green) */}
      <Line
        points={[[0, -extent, 0], [0, extent, 0]]}
        color="green"
        lineWidth={2}
      />
      {/* Z-axis (blue) */}
      <Line
        points={[[0, 0, -extent], [0, 0, extent]]}
        color="blue"
        lineWidth={2}
      />
    </>
  );
}

// Plane component
function PlaneObject({
  coefficients,
  color,
  opacity,
  size,
}: {
  coefficients: [number, number, number, number];
  color: string;
  opacity: number;
  size: number;
}) {
  const [A, B, C, D] = coefficients;
  
  // Calculate plane orientation and position
  // Plane equation: Ax + By + Cz + D = 0
  // Normal vector: (A, B, C)
  const normal = new THREE.Vector3(A, B, C).normalize();
  
  // Find a point on the plane
  const point = new THREE.Vector3();
  if (Math.abs(C) > 0.01) {
    point.set(0, 0, -D / C);
  } else if (Math.abs(B) > 0.01) {
    point.set(0, -D / B, 0);
  } else if (Math.abs(A) > 0.01) {
    point.set(-D / A, 0, 0);
  }
  
  // Create rotation to align plane with normal
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  
  return (
    <mesh position={point} quaternion={quaternion}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial
        color={color}
        opacity={opacity}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 3D Line component
function Line3D({
  point,
  direction,
  color,
  extent,
}: {
  point: [number, number, number];
  direction: [number, number, number];
  color: string;
  extent: number;
}) {
  // Extend line in both directions
  const t1 = -extent;
  const t2 = extent;
  
  const start = [
    point[0] + t1 * direction[0],
    point[1] + t1 * direction[1],
    point[2] + t1 * direction[2]
  ] as [number, number, number];
  
  const end = [
    point[0] + t2 * direction[0],
    point[1] + t2 * direction[1],
    point[2] + t2 * direction[2]
  ] as [number, number, number];
  
  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={3}
    />
  );
}

// Point component
function PointObject({
  coordinates,
  label,
  color,
  radius,
}: {
  coordinates: [number, number, number];
  label: string;
  color: string;
  radius: number;
}) {
  void label;
  return (
    <group position={coordinates}>
      <mesh>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export default function SpaceVisualizer3D({ data }: SpaceVisualizer3DProps) {
  const sceneBounds = useMemo<SceneBounds>(() => buildSceneBounds(data), [data]);

  const pointRadius = Math.max(0.14, Math.min(0.35, sceneBounds.extent * 0.03));

  return (
    <div className="relative w-full h-full min-h-[560px] border border-white/10 rounded-xl overflow-hidden bg-black">
      <Canvas
        camera={{
          position: [
            sceneBounds.center[0] + sceneBounds.extent * 1.35,
            sceneBounds.center[1] + sceneBounds.extent * 1.15,
            sceneBounds.center[2] + sceneBounds.extent * 1.35,
          ],
          fov: 56,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Grid */}
        <Grid
          args={[sceneBounds.extent * 2.2, sceneBounds.extent * 2.2]}
          cellSize={Math.max(1, sceneBounds.extent / 10)}
          cellThickness={0.5}
          cellColor="#333333"
          sectionSize={Math.max(2, sceneBounds.extent / 4)}
          sectionThickness={1}
          sectionColor="#444444"
          fadeDistance={sceneBounds.extent * 3}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={false}
        />
        
        {/* Axes */}
        <Axes extent={sceneBounds.extent} />
        
        {/* Render planes */}
        {data.planes?.map((plane, idx) => (
          <PlaneObject
            key={`plane-${idx}`}
            coefficients={plane.coefficients}
            color={plane.color}
            opacity={plane.opacity}
            size={sceneBounds.extent * 1.6}
          />
        ))}
        
        {/* Render 3D lines */}
        {data.lines?.map((line, idx) => {
          if (line.type === "3D") {
            return (
              <Line3D
                key={`line-${idx}`}
                point={[line.point.x, line.point.y, line.point.z]}
                direction={[line.direction.x, line.direction.y, line.direction.z]}
                color={line.color}
                extent={sceneBounds.extent * 1.25}
              />
            );
          }
          return null;
        })}
        
        {/* Render points */}
        {data.points?.map((point, idx) => {
          if (point.coordinates.length === 3) {
            return (
              <PointObject
                key={`point-${idx}`}
                coordinates={point.coordinates as [number, number, number]}
                label={point.label}
                color={point.color}
                radius={pointRadius}
              />
            );
          }
          return null;
        })}
        
        {/* Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
          target={sceneBounds.center}
        />
      </Canvas>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 text-xs text-white/60 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-red-500" />
          <span>X-axis</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-green-500" />
          <span>Y-axis</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-500" />
          <span>Z-axis</span>
        </div>
      </div>
    </div>
  );
}
