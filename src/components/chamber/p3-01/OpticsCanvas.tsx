"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, OrbitControls, Text, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface P301OpticsCanvasProps {
  scenario: "reflection" | "refraction" | "lens" | "prism";
  angle?: number;
  n1?: number;
  n2?: number;
  focalLength?: number;
  showAnswer?: boolean;
  targetAngle?: number;
}

const palette = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#39ff14",
  pink: "#ff2d7d",
  yellow: "#ffeb3b",
  orange: "#ff9800",
  red: "#ff4444",
  muted: "#4b5a6f",
  white: "#ffffff",
};

// Volumetric Light Beam using TubeGeometry (Glow Ribbon signature)
function VolumetricBeam({
  points,
  color,
  intensity = 1,
  radius = 0.04
}: {
  points: THREE.Vector3[];
  color: string;
  intensity?: number;
  radius?: number;
}) {
  const tubeRef = useRef<THREE.Mesh>(null);
  
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  
  useFrame(({ clock }) => {
    if (!tubeRef.current) return;
    const pulse = 0.7 + Math.sin(clock.getElapsedTime() * 4) * 0.3;
    (tubeRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * intensity;
  });
  
  return (
    <group>
      {/* Main beam tube */}
      <mesh ref={tubeRef}>
        <tubeGeometry args={[curve, 64, radius, 8, false]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.9 * intensity}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh>
        <tubeGeometry args={[curve, 64, radius * 2, 8, false]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2 * intensity}
        />
      </mesh>
      
      {/* Inner core */}
      <mesh>
        <tubeGeometry args={[curve, 64, radius * 0.5, 8, false]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.6 * intensity}
        />
      </mesh>
    </group>
  );
}

// 3D Rainbow Fan using InstancedMesh for prism dispersion
function RainbowFan({
  origin,
  direction,
  spreadAngle = 0.1,
  distance = 3
}: {
  origin: THREE.Vector3;
  direction: THREE.Vector3;
  spreadAngle?: number;
  distance?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  
  // Rainbow colors with real refractive indices
  const colors = [
    { color: palette.red, wavelength: 700, n: 1.514 },      // Red
    { color: palette.orange, wavelength: 620, n: 1.517 },   // Orange
    { color: palette.yellow, wavelength: 580, n: 1.519 },   // Yellow
    { color: palette.green, wavelength: 550, n: 1.520 },    // Green
    { color: palette.cyan, wavelength: 490, n: 1.522 },     // Cyan
    { color: "#4444ff", wavelength: 450, n: 1.524 },        // Blue
    { color: palette.purple, wavelength: 400, n: 1.528 },   // Violet
  ];
  
  const count = colors.length;
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    const dummyObj = dummy.current;
    
    colors.forEach((colorData, i) => {
      // Calculate refraction angle based on refractive index
      const angleOffset = (i - count / 2) * spreadAngle;
      const angle = Math.atan2(direction.y, direction.x) + angleOffset;
      
      const endX = origin.x + Math.cos(angle) * distance;
      const endY = origin.y + Math.sin(angle) * distance;
      
      // Position and scale the beam
      const midX = (origin.x + endX) / 2;
      const midY = (origin.y + endY) / 2;
      const length = Math.sqrt((endX - origin.x) ** 2 + (endY - origin.y) ** 2);
      
      dummyObj.position.set(midX, midY, 0);
      dummyObj.rotation.z = angle;
      dummyObj.scale.set(length, 0.05, 0.05);
      
      // Pulse effect
      const pulse = 1 + Math.sin(time * 3 + i * 0.5) * 0.1;
      dummyObj.scale.y *= pulse;
      dummyObj.scale.z *= pulse;
      
      dummyObj.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummyObj.matrix);
      meshRef.current!.setColorAt(i, new THREE.Color(colorData.color));
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });
  
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent opacity={0.7} />
    </instancedMesh>
  );
}

// Spatial Pulse Effect (Precision Lock style)
function SpatialPulse({
  position,
  isActive,
  color = palette.green
}: {
  position: THREE.Vector3;
  isActive: boolean;
  color?: string;
}) {
  const ringsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  // Create materials once using useMemo
  const ringMaterials = useMemo(() => {
    return [0, 1, 2, 3].map(() => new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    }));
  }, [color]);
  
  useFrame(({ clock }) => {
    if (!isActive || !ringsRef.current || !coreRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Pulsing core
    const pulse = 1 + Math.sin(time * 6) * 0.3;
    coreRef.current.scale.setScalar(pulse);
    
    // Expanding ripple rings - only update opacity
    ringsRef.current.children.forEach((ring, i) => {
      const offset = i * 0.4;
      const scale = 1 + ((time * 3 + offset) % 3);
      const opacity = 1 - ((time * 3 + offset) % 3) / 3;
      ring.scale.setScalar(scale);
      
      // Update existing material opacity instead of creating new material
      const material = ringMaterials[i];
      if (material) {
        material.opacity = opacity * 0.5;
      }
    });
  });
  
  if (!isActive) return null;
  
  return (
    <group position={position}>
      {/* Core flash */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Expanding ripple rings */}
      <group ref={ringsRef}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]} material={ringMaterials[i]}>
            <ringGeometry args={[0.3, 0.35, 32]} />
          </mesh>
        ))}
      </group>
      
      {/* Particle burst */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.5;
        return (
          <Float key={i} speed={3} rotationIntensity={0} floatIntensity={0.4}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial color={color} />
            </mesh>
          </Float>
        );
      })}
      
      <pointLight color={color} intensity={2} distance={4} />
    </group>
  );
}

// High-poly glass mirror with metallic finish
function GlassMirror() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[6, 0.3, 32, 32]} />
      <meshPhysicalMaterial
        color="#e1e7ff"
        metalness={0.95}
        roughness={0.05}
        emissive={palette.cyan}
        emissiveIntensity={0.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

// Glass prism with transmission material
function GlassPrism() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1.5, 0);
    shape.lineTo(0.75, 1.3);
    shape.closePath();
    
    const extrudeSettings = {
      depth: 0.8,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 5
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);
  
  return (
    <mesh geometry={geometry} rotation={[0, 0, Math.PI / 2]} position={[0, 0.65, 0]}>
      <MeshTransmissionMaterial
        thickness={1.2}
        roughness={0.02}
        transmission={0.98}
        ior={1.52}
        chromaticAberration={0.05}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.2}
        temporalDistortion={0.1}
        color={palette.cyan}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

// Glass lens with transmission material
function GlassLens({ focalLength }: { focalLength: number }) {
  const curve = focalLength >= 0 ? 0.8 : -0.6;
  
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -1.4);
    s.quadraticCurveTo(curve, 0, 0, 1.4);
    s.quadraticCurveTo(-curve, 0, 0, -1.4);
    return s;
  }, [curve]);
  
  return (
    <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
      <extrudeGeometry args={[shape, { depth: 0.6, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 5 }]} />
      <MeshTransmissionMaterial
        thickness={1.0}
        roughness={0.03}
        transmission={0.95}
        ior={1.5}
        chromaticAberration={0.03}
        anisotropy={0.2}
        distortion={0.15}
        distortionScale={0.15}
        color={palette.cyan}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Helper functions
function reflect(dir: THREE.Vector2, normal: THREE.Vector2) {
  const dot = dir.dot(normal);
  return dir.clone().sub(normal.clone().multiplyScalar(2 * dot));
}

function refract(dir: THREE.Vector2, normal: THREE.Vector2, n1: number, n2: number) {
  const cosi = -dir.dot(normal);
  const eta = n1 / n2;
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null;
  return dir.clone().multiplyScalar(eta).add(normal.clone().multiplyScalar(eta * cosi - Math.sqrt(k)));
}

// Main optical workbench
function OpticalWorkbench({
  scenario,
  angle,
  n1,
  n2,
  focalLength,
  showAnswer,
  targetAngle
}: {
  scenario: "reflection" | "refraction" | "lens" | "prism";
  angle: number;
  n1: number;
  n2: number;
  focalLength: number;
  showAnswer: boolean;
  targetAngle?: number;
}) {
  const rayData = useMemo(() => {
    const hit = new THREE.Vector3(0, 0, 0);
    const theta = (angle * Math.PI) / 180;
    const incidentDir = new THREE.Vector2(Math.sin(theta), -Math.cos(theta));
    const source = new THREE.Vector3(-incidentDir.x * 3, -incidentDir.y * 3, 0);
    
    const incidentPoints = [source, hit];
    
    const reflectedDir = reflect(incidentDir, new THREE.Vector2(0, 1));
    const reflectedPoints = [hit, new THREE.Vector3(reflectedDir.x * 3.5, reflectedDir.y * 3.5, 0)];
    
    const normal = new THREE.Vector2(0, 1);
    const refracted = refract(incidentDir, normal, n1, n2) ?? reflect(incidentDir, normal);
    const refractionPoints = [hit, new THREE.Vector3(refracted.x * 4, refracted.y * 4, 0)];
    
    return { 
      incidentPoints, 
      reflectedPoints, 
      refractionPoints, 
      source, 
      hit, 
      refracted,
      reflectedDir
    };
  }, [angle, n1, n2]);
  
  // Derive isAligned from rayData during render, not in useMemo
  const isAligned = useMemo(() => {
    if (targetAngle === undefined) return false;
    const reflectedAngle = Math.atan2(rayData.reflectedDir.y, rayData.reflectedDir.x) * 180 / Math.PI;
    return Math.abs(reflectedAngle - targetAngle) < 2;
  }, [rayData.reflectedDir, targetAngle]);
  
  const lensScene = useMemo(() => {
    const scale = 0.02;
    const f = focalLength * scale;
    const u = 2.4;
    const v = Math.abs(u - f) < 0.1 ? 5 : (f * u) / (u - f);
    const objectTop = new THREE.Vector3(-u, 1, 0);
    const parallelHit = new THREE.Vector3(0, 1, 0);
    const focalPoint = new THREE.Vector3(f, 0, 0);
    const throughCenter = new THREE.Vector3(0, 0, 0);
    const imageTop = new THREE.Vector3(v, -1 * (v / u), 0);
    
    return {
      f, u, v,
      objectTop, parallelHit, focalPoint, throughCenter, imageTop,
    };
  }, [focalLength]);
  
  return (
    <group>
      {/* Reflection scenario */}
      {scenario === "reflection" && (
        <>
          <VolumetricBeam points={rayData.incidentPoints} color={palette.pink} />
          {showAnswer && (
            <>
              <VolumetricBeam points={rayData.reflectedPoints} color={palette.green} />
              <SpatialPulse position={rayData.hit} isActive={isAligned} color={palette.green} />
            </>
          )}
          <GlassMirror />
        </>
      )}
      
      {/* Refraction scenario */}
      {scenario === "refraction" && (
        <>
          <VolumetricBeam points={rayData.incidentPoints} color={palette.pink} />
          {showAnswer && (
            <VolumetricBeam points={rayData.refractionPoints} color={palette.green} />
          )}
          
          {/* Water/glass medium */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, -0.1]}>
            <planeGeometry args={[8, 5, 32, 32]} />
            <MeshTransmissionMaterial
              thickness={0.5}
              roughness={0.1}
              transmission={0.8}
              ior={n2}
              color={palette.cyan}
              transparent
              opacity={0.3}
            />
          </mesh>
          
          {/* Interface line */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[8, 0.08]} />
            <meshStandardMaterial
              color={palette.cyan}
              emissive={palette.cyan}
              emissiveIntensity={0.5}
            />
          </mesh>
        </>
      )}
      
      {/* Prism dispersion scenario */}
      {scenario === "prism" && (
        <>
          <VolumetricBeam 
            points={[
              new THREE.Vector3(-3, 0.65, 0),
              new THREE.Vector3(-0.5, 0.65, 0)
            ]} 
            color={palette.white}
            radius={0.06}
          />
          
          <GlassPrism />
          
          {showAnswer && (
            <RainbowFan
              origin={new THREE.Vector3(0.5, 0.65, 0)}
              direction={new THREE.Vector3(1, -0.3, 0)}
              spreadAngle={0.08}
              distance={3.5}
            />
          )}
        </>
      )}
      
      {/* Lens scenario */}
      {scenario === "lens" && (
        <>
          <GlassLens focalLength={focalLength} />
          
          {/* Object */}
          <mesh position={[-lensScene.u, 0.5, 0]}>
            <boxGeometry args={[0.12, 1, 0.12]} />
            <meshPhysicalMaterial
              color={palette.pink}
              emissive={palette.pink}
              emissiveIntensity={0.8}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          <Text position={[-lensScene.u, -1.2, 0]} fontSize={0.2} color={palette.pink}>
            Object
          </Text>
          
          {showAnswer && (
            <>
              <VolumetricBeam
                points={[lensScene.objectTop, lensScene.parallelHit, lensScene.focalPoint]}
                color={palette.green}
                radius={0.03}
              />
              <VolumetricBeam
                points={[lensScene.objectTop, lensScene.throughCenter, lensScene.imageTop]}
                color={palette.cyan}
                radius={0.03}
              />
              
              {/* Image */}
              <mesh position={[lensScene.imageTop.x, lensScene.imageTop.y / 2, 0]}>
                <boxGeometry args={[0.1, Math.abs(lensScene.imageTop.y), 0.1]} />
                <meshPhysicalMaterial
                  color={palette.green}
                  emissive={palette.green}
                  emissiveIntensity={0.6}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
              
              <Text position={[lensScene.imageTop.x, -1.2, 0]} fontSize={0.18} color={palette.green}>
                Image
              </Text>
            </>
          )}
          
          {/* Focal points */}
          <Float speed={2} rotationIntensity={0} floatIntensity={0.2}>
            <mesh position={[lensScene.f, 0, 0]}>
              <sphereGeometry args={[0.1, 20, 20]} />
              <meshPhysicalMaterial
                color={palette.cyan}
                emissive={palette.cyan}
                emissiveIntensity={1.5}
                metalness={0.9}
                roughness={0.1}
              />
              <pointLight color={palette.cyan} intensity={1} distance={2} />
            </mesh>
          </Float>
          
          <Float speed={2.5} rotationIntensity={0} floatIntensity={0.2}>
            <mesh position={[-lensScene.f, 0, 0]}>
              <sphereGeometry args={[0.1, 20, 20]} />
              <meshPhysicalMaterial
                color={palette.cyan}
                emissive={palette.cyan}
                emissiveIntensity={1.5}
                metalness={0.9}
                roughness={0.1}
              />
              <pointLight color={palette.cyan} intensity={1} distance={2} />
            </mesh>
          </Float>
        </>
      )}
    </group>
  );
}

export default function P301OpticsCanvas({
  scenario = "reflection",
  angle = 30,
  n1 = 1.0,
  n2 = 1.5,
  focalLength = 100,
  showAnswer = false,
  targetAngle,
}: P301OpticsCanvasProps) {
  return (
    <div className="relative w-full h-[420px] border border-white/10 rounded-lg bg-[#020208] overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 3, 7], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -3, 3]} intensity={0.8} color={palette.cyan} />
        <pointLight position={[0, 5, -5]} intensity={0.6} color={palette.purple} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          autoRotate={false}
        />
        
        {/* Grid floor */}
        <Grid
          infiniteGrid
          cellSize={1}
          sectionSize={4}
          cellColor="#0c1624"
          sectionColor="#1b2a44"
          fadeDistance={15}
          fadeStrength={1.2}
          position={[0, -2, 0]}
        />
        
        {/* Main optical workbench */}
        <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.12}>
          <OpticalWorkbench
            scenario={scenario}
            angle={angle}
            n1={n1}
            n2={n2}
            focalLength={focalLength}
            showAnswer={showAnswer}
            targetAngle={targetAngle}
          />
        </Float>
        
        {/* 3D Branding */}
        <Float speed={1.2} rotationIntensity={0} floatIntensity={0.15}>
          <Text
            position={[-4, 2.5, -1]}
            fontSize={0.25}
            color={palette.white}
            fillOpacity={0.08}
          >
            OPTICAL_RAY_TRACER
          </Text>
        </Float>
      </Canvas>
      
      {/* Cyber-Euler HUD */}
      <div className="absolute top-4 left-4 flex gap-2 items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase">
          Photon_Tracer v3.0
        </span>
      </div>
      
      <div className="absolute bottom-4 left-4 space-y-1 font-mono text-[9px] text-white/50">
        <div className="text-cyan-400">Mode: {scenario.toUpperCase()}</div>
        {scenario !== "lens" && scenario !== "prism" && (
          <>
            <div className="text-pink-400">Angle: {angle}°</div>
            <div className="text-white">n₁: {n1} | n₂: {n2}</div>
          </>
        )}
        {scenario === "lens" && (
          <div className="text-purple-400">f: {focalLength}mm</div>
        )}
      </div>
      
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 text-right">
        CHAMBER // P3.01<br />
        RAY_TRACING: ACTIVE<br />
        GLASS_PHYSICS: ENABLED
      </div>
      
      <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 uppercase tracking-wider">
        Optics Lab 3D
      </div>
    </div>
  );
}
