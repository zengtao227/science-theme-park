"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Line } from "@react-three/drei";
import { GeometryData } from "@/lib/gm2-02-types";
import * as THREE from "three";

interface DistanceCalculatorProps {
  data: GeometryData;
}

// Axes component
function Axes() {
  return (
    <>
      <Line points={[[-10, 0, 0], [10, 0, 0]]} color="red" lineWidth={2} />
      <Line points={[[0, -10, 0], [0, 10, 0]]} color="green" lineWidth={2} />
      <Line points={[[0, 0, -10], [0, 0, 10]]} color="blue" lineWidth={2} />
    </>
  );
}

// Point component
function PointObject({ coordinates, label, color }: { coordinates: [number, number, number]; label: string; color: string }) {
  return (
    <group position={coordinates}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// 3D Line component
function Line3D({ point, direction, color }: { point: [number, number, number]; direction: [number, number, number]; color: string }) {
  const t1 = -10;
  const t2 = 10;
  
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
function PlaneObject({ coefficients, color, opacity }: { coefficients: [number, number, number, number]; color: string; opacity: number }) {
  const [A, B, C, D] = coefficients;
  const normal = new THREE.Vector3(A, B, C).normalize();
  
  let point = new THREE.Vector3();
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
      <planeGeometry args={[10, 10]} />
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
  return (
    <div className="w-full h-full min-h-[400px] border border-white/10 rounded-xl overflow-hidden bg-black relative">
      <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#333333"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#444444"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={false}
        />
        
        <Axes />
        
        {/* Render planes */}
        {data.planes?.map((plane, idx) => (
          <PlaneObject
            key={`plane-${idx}`}
            coefficients={plane.coefficients}
            color={plane.color}
            opacity={plane.opacity}
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
        
        <OrbitControls enableDamping dampingFactor={0.05} rotateSpeed={0.5} zoomSpeed={0.5} />
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
