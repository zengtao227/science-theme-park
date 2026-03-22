"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Line } from "@react-three/drei";
import { GeometryData } from "@/lib/gm2-02-types";
import * as THREE from "three";

interface DistanceCalculatorProps {
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

// Axes component
function Axes({ extent }: { extent: number }) {
  return (
    <>
      <Line points={[[-extent, 0, 0], [extent, 0, 0]]} color="red" lineWidth={2} />
      <Line points={[[0, -extent, 0], [0, extent, 0]]} color="green" lineWidth={2} />
      <Line points={[[0, 0, -extent], [0, 0, extent]]} color="blue" lineWidth={2} />
    </>
  );
}

// Point component
function PointObject({ coordinates, label, color, radius }: { coordinates: [number, number, number]; label: string; color: string; radius: number }) {
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

// 3D Line component
function Line3D({ point, direction, color, extent }: { point: [number, number, number]; direction: [number, number, number]; color: string; extent: number }) {
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
  
  return <Line points={[start, end]} color={color} lineWidth={3} />;
}

// Plane component
function PlaneObject({ coefficients, color, opacity, size }: { coefficients: [number, number, number, number]; color: string; opacity: number; size: number }) {
  const [A, B, C, D] = coefficients;
  const normal = new THREE.Vector3(A, B, C).normalize();
  
  const point = new THREE.Vector3();
  if (Math.abs(C) > 0.01) {
    point.set(0, 0, -D / C);
  } else if (Math.abs(B) > 0.01) {
    point.set(0, -D / B, 0);
  } else if (Math.abs(A) > 0.01) {
    point.set(-D / A, 0, 0);
  }
  
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  
  return (
    <mesh position={point} quaternion={quaternion}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color={color} opacity={opacity} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

// Distance segment component
function DistanceSegment({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  return (
    <>
      <Line points={[from, to]} color="yellow" lineWidth={4} />
      {/* Perpendicular indicator at the closest point */}
      <mesh position={to}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
    </>
  );
}

export default function DistanceCalculator({ data }: DistanceCalculatorProps) {
  const sceneBounds = useMemo<SceneBounds>(() => {
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
      return {
        center: [0, 0, 0],
        extent: 3.0,
        cameraOffset: [2.15, 1.8, 2.3],
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
    const extent = Math.max(3.0, maxSpan * 0.38 + 0.75);
    return {
      center,
      extent,
      cameraOffset: [extent * 0.66, extent * 0.54, extent * 0.72],
      gridSize: extent * 1.35,
      lineExtent: extent * 0.8,
      planeSize: extent * 0.96,
      pointRadius: Math.max(0.24, Math.min(0.46, extent * 0.065)),
    };
  }, [data]);

  return (
    <div className="w-full h-full min-h-[560px] border border-white/10 rounded-xl overflow-hidden bg-black relative">
      <Canvas
        camera={{
          position: [
            sceneBounds.center[0] + sceneBounds.cameraOffset[0],
            sceneBounds.center[1] + sceneBounds.cameraOffset[1],
            sceneBounds.center[2] + sceneBounds.cameraOffset[2],
          ],
          fov: 56,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Grid
          args={[sceneBounds.gridSize, sceneBounds.gridSize]}
          cellSize={Math.max(0.75, sceneBounds.extent / 7.5)}
          cellThickness={0.5}
          cellColor="#333333"
          sectionSize={Math.max(1.5, sceneBounds.extent / 3.2)}
          sectionThickness={1}
          sectionColor="#444444"
          fadeDistance={sceneBounds.gridSize * 1.35}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={false}
        />
        
        <Axes extent={sceneBounds.extent} />
        
        {/* Render planes */}
        {data.planes?.map((plane, idx) => (
          <PlaneObject
            key={`plane-${idx}`}
            coefficients={plane.coefficients}
            color={plane.color}
            opacity={plane.opacity}
            size={sceneBounds.planeSize}
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
                extent={sceneBounds.lineExtent}
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
                radius={sceneBounds.pointRadius}
              />
            );
          }
          return null;
        })}
        
        {/* Render distance segments */}
        {data.distances?.map((dist, idx) => {
          if (dist.showSegment && dist.from.coordinates.length === 3) {
            // For now, we'll just show the from point
            // In a full implementation, we'd calculate the closest point on the line/plane
            const fromCoords = dist.from.coordinates as [number, number, number];
            // Simplified: assume 'to' is also a point for visualization
            const toCoords = fromCoords; // This should be calculated based on the actual geometry
            
            return (
              <DistanceSegment
                key={`distance-${idx}`}
                from={fromCoords}
                to={toCoords}
              />
            );
          }
          return null;
        })}
        
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.7}
          minDistance={sceneBounds.extent * 0.72}
          maxDistance={sceneBounds.extent * 2.8}
          target={sceneBounds.center}
        />
      </Canvas>
      
      {/* Distance value display */}
      {data.distances && data.distances.length > 0 && (
        <div className="absolute top-4 right-4 space-y-2">
          {data.distances.map((dist, idx) => (
            <div key={idx} className="p-3 border border-yellow-500/30 rounded bg-black/80 backdrop-blur">
              <div className="text-[8px] uppercase tracking-[0.3em] text-yellow-400/60 font-black mb-1">
                DISTANCE {idx + 1}
              </div>
              <div className="text-2xl font-black text-yellow-400">
                {dist.value.toFixed(2)}
              </div>
              <div className="text-[8px] text-yellow-400/60 mt-1">
                units
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 text-xs text-white/60 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-yellow-500" />
          <span>Distance Segment</span>
        </div>
      </div>
    </div>
  );
}
