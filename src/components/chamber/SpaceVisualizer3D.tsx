"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Line, Text } from "@react-three/drei";
import { GeometryData } from "@/lib/gm2-02-types";
import * as THREE from "three";

interface SpaceVisualizer3DProps {
  data: GeometryData;
}

interface SceneBounds {
  center: [number, number, number];
  extent: number;
  cameraOffset: [number, number, number];
  gridSize: number;
  lineExtent: number;
  planeSize: number;
  pointRadius: number;
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
    
    // Find a point on the plane
    let px = 0, py = 0, pz = 0;
    if (Math.abs(C) > 1e-6) {
      pz = -D / C;
    } else if (Math.abs(B) > 1e-6) {
      py = -D / B;
    } else if (Math.abs(A) > 1e-6) {
      px = -D / A;
    }
    
    // Sample multiple points around the plane center to get better bounds
    // Use a temporary size for sampling (will be adjusted later)
    const tempSize = 5;
    const normal = new THREE.Vector3(A, B, C).normalize();
    
    // Find two orthogonal vectors on the plane
    const u = new THREE.Vector3();
    const v = new THREE.Vector3();
    if (Math.abs(normal.x) < 0.9) {
      u.set(1, 0, 0).cross(normal).normalize();
    } else {
      u.set(0, 1, 0).cross(normal).normalize();
    }
    v.crossVectors(normal, u).normalize();
    
    // Sample 5 points: center and 4 corners
    allPoints.push([px, py, pz]); // center
    allPoints.push([px + u.x * tempSize, py + u.y * tempSize, pz + u.z * tempSize]);
    allPoints.push([px - u.x * tempSize, py - u.y * tempSize, pz - u.z * tempSize]);
    allPoints.push([px + v.x * tempSize, py + v.y * tempSize, pz + v.z * tempSize]);
    allPoints.push([px - v.x * tempSize, py - v.y * tempSize, pz - v.z * tempSize]);
  });

  if (allPoints.length === 0) {
    return {
      center: [0, 0, 0],
      extent: 3.0,
      cameraOffset: [1.85, 1.55, 1.95],
      gridSize: 4.8,
      lineExtent: 3.0,
      planeSize: 3.8,
      pointRadius: 0.28,
    };
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
  const extent = Math.max(maxSpan * 1.5, 3.0);
  return {
    center,
    extent,
    cameraOffset: [extent * 0.65, extent * 0.55, extent * 0.70],
    gridSize: extent * 1.2,
    lineExtent: extent * 0.8,
    planeSize: extent * 0.85,
    pointRadius: Math.max(0.15, Math.min(0.35, extent * 0.05)),
  };
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
      <Text position={[extent + 0.5, 0, 0]} fontSize={0.4} color="red">
        x
      </Text>
      
      {/* Y-axis (green) */}
      <Line
        points={[[0, -extent, 0], [0, extent, 0]]}
        color="green"
        lineWidth={2}
      />
      <Text position={[0, extent + 0.5, 0]} fontSize={0.4} color="green">
        y
      </Text>
      
      {/* Z-axis (blue) */}
      <Line
        points={[[0, 0, -extent], [0, 0, extent]]}
        color="blue"
        lineWidth={2}
      />
      <Text position={[0, 0, extent + 0.5]} fontSize={0.4} color="blue">
        z
      </Text>
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
  const labelOffset: [number, number, number] = [
    coordinates[0] + 0.8,
    coordinates[1] + 0.6,
    coordinates[2] + 0.5
  ];
  
  const coordLabelOffset: [number, number, number] = [
    coordinates[0] + 0.8,
    coordinates[1] - 0.3,
    coordinates[2] + 0.5
  ];
  
  return (
    <group position={coordinates}>
      <mesh>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Point label */}
      <Text
        position={labelOffset}
        fontSize={0.35}
        color={color}
        anchorX="left"
        anchorY="middle"
      >
        {label}
      </Text>
      {/* Coordinate label */}
      <Text
        position={coordLabelOffset}
        fontSize={0.22}
        color={color}
        anchorX="left"
        anchorY="middle"
      >
        ({coordinates[0].toFixed(1)}, {coordinates[1].toFixed(1)}, {coordinates[2].toFixed(1)})
      </Text>
      {/* Connection line from point to label */}
      <Line
        points={[
          new THREE.Vector3(...coordinates),
          new THREE.Vector3(...labelOffset)
        ]}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.3}
      />
    </group>
  );
}

export default function SpaceVisualizer3D({ data }: SpaceVisualizer3DProps) {
  const bounds = useMemo(() => buildSceneBounds(data), [data]);

  return (
    <div className="relative w-full h-[720px] border border-white/10 rounded-xl overflow-hidden bg-black">
      <Canvas
        camera={{
          position: [
            bounds.center[0] + bounds.cameraOffset[0],
            bounds.center[1] + bounds.cameraOffset[1],
            bounds.center[2] + bounds.cameraOffset[2],
          ],
          fov: 56,
        }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#000005"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* Grid */}
        <Grid
          args={[bounds.gridSize, bounds.gridSize]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#333333"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#444444"
          fadeDistance={bounds.gridSize * 2}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={false}
        />

        {/* Axes */}
        <Axes extent={bounds.extent} />
        
        {/* Render planes */}
        {data.planes?.map((plane, idx) => (
          <PlaneObject
            key={`plane-${idx}`}
            coefficients={plane.coefficients}
            color={plane.color}
            opacity={plane.opacity}
            size={8}
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
                extent={8}
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
                radius={0.2}
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
          zoomSpeed={0.7}
          minDistance={Math.max(2, bounds.extent * 0.5)}
          maxDistance={bounds.extent * 4}
          target={bounds.center}
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
