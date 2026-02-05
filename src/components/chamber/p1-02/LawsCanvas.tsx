"use client";

import { useEffect, useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Grid, Line } from "@react-three/drei";
import * as THREE from "three";

interface P102CanvasProps {
  scenario: "friction" | "acceleration" | "collision";
  mass: number;
  friction: number;
  forceX: number;
  initialVelocity?: number;
  gravity?: number;
}

type Telemetry = {
  positionX: number;
  velocity: number;
  acceleration: number;
  netForce: number;
  appliedForce: number;
  frictionForce: number;
  normalForce: number;
  gravityForce: number;
  frictionState: "static" | "kinetic";
};

function ForceVector({
  direction,
  magnitude,
  color,
  label,
  position = [0, 0, 0]
}: {
  direction: [number, number, number];
  magnitude: number;
  color: string;
  label: string;
  position?: [number, number, number];
}) {
  const magnitudeAbs = Math.abs(magnitude);
  if (magnitudeAbs < 0.01) return null;
  const length = Math.min(5, 0.6 + magnitudeAbs * 0.08);
  const dir = new THREE.Vector3(...direction).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

  return (
    <group position={position} quaternion={quaternion}>
      <mesh position={[0, length * 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.06, length * 0.7, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0, length * 0.85, 0]}>
        <coneGeometry args={[0.14, length * 0.3, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} metalness={0.5} roughness={0.2} />
      </mesh>
      <Line points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0)]} color={color} lineWidth={8} transparent opacity={0.18} />
      <Text
        position={[0, length + 0.4, 0]}
        fontSize={0.2}
        color={color}
        font="/fonts/Inter-Bold.woff"
      >
        {label}
      </Text>
    </group>
  );
}

function ImpactPulse({ positionX, trigger, color }: { positionX: number; trigger: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();
  }, [trigger]);

  useFrame(() => {
    if (!ringRef.current) return;
    const elapsed = (performance.now() - startRef.current) / 1000;
    const scale = Math.min(1.8, 0.4 + elapsed * 2.2);
    ringRef.current.scale.set(scale, scale, scale);
    const material = ringRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = Math.max(0, 0.6 - elapsed * 0.8);
  });

  return (
    <mesh ref={ringRef} position={[positionX, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.3, 0.5, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

// 3D Physics Body (The Crate)
function PhysicsCrate({
  scenario,
  mass,
  friction,
  forceX,
  initialVelocity = 0,
  gravity = 1,
  onTelemetry,
  onImpact,
  obstacleX,
  obstacleWidth = 1.2
}: P102CanvasProps & {
  onTelemetry?: (telemetry: Telemetry) => void;
  onImpact?: (x: number, color: string) => void;
  obstacleX?: number;
  obstacleWidth?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const velocity = useRef(initialVelocity);
  const acceleration = useRef(0);
  const posX = useRef(-4);
  const lastImpact = useRef(0);
  const g = 9.8 * gravity;
  const halfSize = 0.55;
  const restitution = scenario === "collision" ? 0.35 : 0.2;
  const boundary = 10;
  const kineticMu = friction;
  const staticMu = Math.min(1, friction * 1.25);
  const forcesRef = useRef({
    appliedForce: 0,
    frictionForce: 0,
    normalForce: mass * g,
    gravityForce: -mass * g
  });
  const [forces, setForces] = useState(forcesRef.current);

  useEffect(() => {
    const id = setInterval(() => {
      setForces({ ...forcesRef.current });
    }, 120);
    return () => clearInterval(id);
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    const appliedForceN = scenario === "acceleration" ? forceX * 1000 : (forceX > 0 ? forceX * 1000 : 0);
    const normalForce = mass * g;
    const maxStatic = staticMu * normalForce;
    const maxKinetic = kineticMu * normalForce;
    const gravityForce = -normalForce;
    let frictionForce = 0;
    let frictionState: "static" | "kinetic" = "kinetic";

    if (Math.abs(velocity.current) < 0.02 && Math.abs(appliedForceN) < maxStatic) {
      frictionForce = -appliedForceN;
      frictionState = "static";
      velocity.current = 0;
    } else {
      const direction = velocity.current !== 0 ? -Math.sign(velocity.current) : -Math.sign(appliedForceN);
      frictionForce = Math.min(Math.abs(appliedForceN), maxKinetic) * direction;
      frictionState = "kinetic";
    }

    const netForce = appliedForceN + frictionForce;
    acceleration.current = netForce / mass;
    velocity.current += acceleration.current * delta;
    posX.current += velocity.current * delta;

    if (posX.current > boundary - halfSize) {
      posX.current = boundary - halfSize;
      velocity.current = -Math.abs(velocity.current) * restitution;
      const now = performance.now();
      if (now - lastImpact.current > 200) {
        lastImpact.current = now;
        onImpact?.(posX.current, "#00e5ff");
      }
    }
    if (posX.current < -boundary + halfSize) {
      posX.current = -boundary + halfSize;
      velocity.current = Math.abs(velocity.current) * restitution;
      const now = performance.now();
      if (now - lastImpact.current > 200) {
        lastImpact.current = now;
        onImpact?.(posX.current, "#00e5ff");
      }
    }

    if (scenario === "collision" && obstacleX !== undefined) {
      const obstacleHalf = obstacleWidth / 2;
      const crateLeft = posX.current - halfSize;
      const crateRight = posX.current + halfSize;
      const obstacleLeft = obstacleX - obstacleHalf;
      const obstacleRight = obstacleX + obstacleHalf;
      if (crateRight > obstacleLeft && crateLeft < obstacleRight) {
        posX.current = obstacleLeft - halfSize;
        velocity.current = -Math.abs(velocity.current) * (restitution + 0.1);
        const now = performance.now();
        if (now - lastImpact.current > 200) {
          lastImpact.current = now;
          onImpact?.(obstacleX, "#ff2d7d");
        }
      }
    }

    groupRef.current.position.x = posX.current;

    forcesRef.current = {
      appliedForce: appliedForceN,
      frictionForce,
      normalForce,
      gravityForce
    };

    onTelemetry?.({
      positionX: posX.current,
      velocity: velocity.current,
      acceleration: acceleration.current,
      netForce,
      appliedForce: appliedForceN,
      frictionForce,
      normalForce,
      gravityForce,
      frictionState
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshPhysicalMaterial
          color="#1e2a3b"
          metalness={0.9}
          roughness={0.2}
          emissive="#00e5ff"
          emissiveIntensity={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color="#0b111a" metalness={0.6} roughness={0.4} />
      </mesh>

      <ForceVector
        direction={[1, 0, 0]}
        magnitude={forces.appliedForce}
        color="#00e5ff"
        label={`Applied ${Math.abs(forces.appliedForce).toFixed(0)}N`}
        position={[0, 1.3, 0]}
      />
      <ForceVector
        direction={[0, 1, 0]}
        magnitude={forces.normalForce}
        color="#39ff14"
        label={`Normal ${forces.normalForce.toFixed(0)}N`}
        position={[0, 0.2, 0]}
      />
      <ForceVector
        direction={[0, -1, 0]}
        magnitude={forces.normalForce}
        color="#ff2d7d"
        label={`Gravity ${forces.normalForce.toFixed(0)}N`}
        position={[0, 0.2, 0]}
      />
      <ForceVector
        direction={[forces.frictionForce >= 0 ? 1 : -1, 0, 0]}
        magnitude={Math.abs(forces.frictionForce)}
        color="#ffd166"
        label={`Friction ${Math.abs(forces.frictionForce).toFixed(0)}N`}
        position={[0, 0.8, 0]}
      />

      <ForceVector
        direction={[velocity.current >= 0 ? 1 : -1, 0, 0]}
        magnitude={Math.abs(velocity.current) * 120}
        color="#7dd3fc"
        label={`v ${velocity.current.toFixed(2)} m/s`}
        position={[0, 1.8, 0]}
      />
      <ForceVector
        direction={[acceleration.current >= 0 ? 1 : -1, 0, 0]}
        magnitude={Math.abs(acceleration.current) * 120}
        color="#c4b5fd"
        label={`a ${acceleration.current.toFixed(2)} m/s²`}
        position={[0, 2.4, 0]}
      />
    </group>
  );
}

// 3D Physics Scene
function PhysicsScene({
  scenario,
  mass,
  friction,
  forceX,
  initialVelocity,
  gravity,
  onTelemetry
}: P102CanvasProps & {
  onTelemetry?: (telemetry: Telemetry) => void;
}) {
  const [impact, setImpact] = useState({ id: 0, x: 0, color: "#00e5ff" });
  const obstacleX = 6;

  return (
    <group>
      <PhysicsCrate
        scenario={scenario}
        mass={mass}
        friction={friction}
        forceX={forceX}
        initialVelocity={initialVelocity}
        gravity={gravity}
        onTelemetry={onTelemetry}
        obstacleX={scenario === "collision" ? obstacleX : undefined}
        obstacleWidth={1.2}
        onImpact={(x, color) => setImpact((prev) => ({ id: prev.id + 1, x, color }))}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#05060e" metalness={0.2} roughness={0.8} />
      </mesh>

      <Grid
        args={[40, 40]}
        cellSize={1}
        cellColor="#141b2a"
        sectionColor="#39ff14"
        fadeDistance={30}
        fadeStrength={1}
        position={[0, 0.01, 0]}
      />

      <ImpactPulse positionX={impact.x} trigger={impact.id} color={impact.color} />

      {scenario === "collision" && (
        <mesh position={[obstacleX, 1, 0]}>
          <boxGeometry args={[1.2, 2.2, 1.2]} />
          <meshPhysicalMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={0.5} metalness={0.7} roughness={0.2} />
        </mesh>
      )}
    </group>
  );
}

export default function P102LawsCanvas(props: P102CanvasProps) {
  const initialTelemetry = {
    positionX: 0,
    velocity: 0,
    acceleration: 0,
    netForce: 0,
    appliedForce: 0,
    frictionForce: 0,
    normalForce: props.mass * 9.8 * (props.gravity ?? 1),
    gravityForce: -props.mass * 9.8 * (props.gravity ?? 1),
    frictionState: "kinetic" as const
  };
  const telemetryRef = useRef<Telemetry>(initialTelemetry);
  const [telemetry, setTelemetry] = useState(initialTelemetry);

  useEffect(() => {
    const id = setInterval(() => {
      setTelemetry({ ...telemetryRef.current });
    }, 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const g = 9.8 * (props.gravity ?? 1);
    telemetryRef.current = {
      ...telemetryRef.current,
      normalForce: props.mass * g,
      gravityForce: -props.mass * g
    };
  }, [props.mass, props.gravity]);

  return (
    <div className="w-full h-[500px] relative bg-[#020208] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <Canvas shadows camera={{ position: [10, 8, 12], fov: 40 }}>
        <color attach="background" args={["#000005"]} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <PhysicsScene
            {...props}
            onTelemetry={(data) => {
              telemetryRef.current = data;
            }}
          />
          <OrbitControls enablePan={false} minDistance={5} maxDistance={30} />
        </Suspense>
      </Canvas>

      {/* HUD OVERLAY */}
      <div className="absolute top-4 left-4 flex gap-2 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase">
          Newton_Dynamics_Lab v3.0
        </span>
      </div>

      <div className="absolute bottom-4 left-4 space-y-2 font-mono text-[9px] text-white/60 bg-black/40 p-4 rounded border border-white/5 backdrop-blur-sm min-w-[220px]">
        <div className="text-cyan-400">Mass: {props.mass} kg</div>
        <div className="text-green-400">μ: {props.friction}</div>
        <div className="text-purple-300">x: {telemetry.positionX.toFixed(2)} m</div>
        <div className="text-purple-300">v: {telemetry.velocity.toFixed(2)} m/s</div>
        <div className="text-purple-300">a: {telemetry.acceleration.toFixed(2)} m/s²</div>
        <div className="text-cyan-300">F = ma: {telemetry.netForce.toFixed(2)} N</div>
        <div className="text-yellow-300">Friction: {Math.abs(telemetry.frictionForce).toFixed(0)} N</div>
        <div className="text-yellow-300">State: {telemetry.frictionState}</div>
        <div className="text-pink-300">Gravity: {telemetry.normalForce.toFixed(0)} N</div>
        <div className="text-purple-400 mt-1 font-bold tracking-widest uppercase border-t border-white/10 pt-1">
          Scenario: {props.scenario}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 space-y-2 font-mono text-[9px] text-white/60 bg-black/40 p-4 rounded border border-white/5 backdrop-blur-sm min-w-[220px]">
        <div className="text-cyan-300 uppercase tracking-[0.2em]">Vector Analytics</div>
        <div className="text-blue-300">v⃗ = [{telemetry.velocity.toFixed(2)}, 0, 0]</div>
        <div className="text-purple-300">a⃗ = [{telemetry.acceleration.toFixed(2)}, 0, 0]</div>
        <div className="text-green-300">F⃗ = [{telemetry.netForce.toFixed(2)}, 0, 0]</div>
        <div className="text-white/40">m = {props.mass} kg</div>
      </div>

      <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 uppercase text-right">
        Newtonian Mechanics<br />
        3D Vector Field Analysis
      </div>
    </div>
  );
}
