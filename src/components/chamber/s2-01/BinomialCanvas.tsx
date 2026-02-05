import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { Text, useCursor, OrthographicCamera, Grid, Float, ContactShadows } from "@react-three/drei";
import { useState, useRef, useEffect, Suspense } from "react";
import * as THREE from "three";

const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

interface BlockProps {
  id: string;
  width: number;
  height: number;
  color: string;
  label: string;
  locked: boolean;
  initialPos: [number, number, number];
  targetPos: [number, number, number];
  containerSize: number;
  onSnap: (id: string, isSnapped: boolean) => void;
}

function DraggableBlock({
  id,
  width,
  height,
  color,
  label,
  locked,
  initialPos,
  targetPos,
  containerSize,
  onSnap,
}: BlockProps) {
  const [pos, setPos] = useState<[number, number, number]>(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHover] = useState(false);

  const dragOffset = useRef(new THREE.Vector3());
  const intersectionPoint = new THREE.Vector3();

  useCursor(hovered && !locked, "grab", "auto");

  useEffect(() => {
    if (locked) return;
    const raf = requestAnimationFrame(() => setPos(initialPos));
    return () => cancelAnimationFrame(raf);
  }, [initialPos, locked]);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (locked) return;
    e.stopPropagation();
    const target = e.target as unknown as { setPointerCapture?: (pointerId: number) => void };
    target.setPointerCapture?.(e.pointerId);
    dragOffset.current.set(pos[0] - e.point.x, pos[1] - e.point.y, 0);
    setIsDragging(true);
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (locked) return;
    setIsDragging(false);
    const target = e.target as unknown as { releasePointerCapture?: (pointerId: number) => void };
    target.releasePointerCapture?.(e.pointerId);

    const S = containerSize;
    const w = width;
    const h = height;

    const corners = [
      new THREE.Vector2(-S / 2 + w / 2, S / 2 - h / 2), // TL
      new THREE.Vector2(S / 2 - w / 2, S / 2 - h / 2), // TR
      new THREE.Vector2(-S / 2 + w / 2, -S / 2 + h / 2), // BL
      new THREE.Vector2(S / 2 - w / 2, -S / 2 + h / 2), // BR
    ];

    let closestDist = Infinity;
    let snapPos = null;
    const currentVec = new THREE.Vector2(pos[0], pos[1]);

    for (const corner of corners) {
      const d = currentVec.distanceTo(corner);
      if (d < closestDist) {
        closestDist = d;
        snapPos = corner;
      }
    }

    if (closestDist < 3.5 && snapPos) {
      setPos([snapPos.x, snapPos.y, targetPos[2]]);
      onSnap(id, true);
    } else {
      onSnap(id, false);
      setPos([pos[0], pos[1], 0]);
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging || locked) return;
    e.ray.intersectPlane(dragPlane, intersectionPoint);
    setPos([intersectionPoint.x + dragOffset.current.x, intersectionPoint.y + dragOffset.current.y, 0.1]);
  };

  return (
    <group position={[pos[0], pos[1], isDragging ? 0.5 : hovered ? 0.2 : pos[2]]}>
      <mesh
        scale={hovered && !locked && !isDragging ? 1.05 : 1}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={() => setHover(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry args={[width, height]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.4}
          thickness={1}
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={isDragging ? 0.6 : locked ? 0.95 : 0.8}
          emissive={color}
          emissiveIntensity={hovered && !locked ? 0.5 : 0.1}
        />
        <Text position={[0, 0, 0.11]} fontSize={Math.max(0.2, Math.min(width, height) * 0.25)} color="white" font="/fonts/Inter-Bold.woff">
          {label}
        </Text>
        <lineSegments position={[0, 0, 0.01]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
          <lineBasicMaterial color="white" transparent opacity={0.3} />
        </lineSegments>
      </mesh>
      {/* Glow shadow for a more 3D feel */}
      {!locked && (
        <ContactShadows resolution={256} scale={Math.max(width, height) * 3} blur={2} opacity={0.2} far={1} color={color} position={[0, 0, -0.1]} />
      )}
    </group>
  );
}

interface S201BinomialCanvasProps {
  a: number;
  b: number;
  locked: boolean;
  targetSize: number;
  initialPositions: {
    a2: [number, number, number];
    b2: [number, number, number];
    ab1: [number, number, number];
    ab2: [number, number, number];
  };
  targetPositions: {
    a2: [number, number, number];
    b2: [number, number, number];
    ab1: [number, number, number];
    ab2: [number, number, number];
  };
  labels: {
    a2: string;
    b2: string;
    ab: string;
  };
  titleText: string;
  onSnap: (id: string, isSnapped: boolean) => void;
}

export default function S201BinomialCanvas({
  a,
  b,
  locked,
  targetSize,
  initialPositions,
  targetPositions,
  labels,
  titleText,
  onSnap,
}: S201BinomialCanvasProps) {
  return (
    <div className="w-full h-full relative bg-[#030303] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <Canvas dpr={[1, 2]}>
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={35} />
        <Suspense fallback={null}>
          <color attach="background" args={["#030303"]} />
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          <Grid
            infiniteGrid
            fadeDistance={30}
            cellColor="#1a1a1a"
            sectionColor="#333"
            position={[0, 0, -0.2]}
            rotation={[Math.PI / 2, 0, 0]}
          />

          {/* Background Branding */}
          <Float speed={1.5} rotationIntensity={0} floatIntensity={0.2}>
            <Text position={[-targetSize, targetSize, -0.5]} fontSize={0.8} color="white" fillOpacity={0.02} font="/fonts/Inter-Bold.woff" anchorX="left">
              (a+b)² = a² + 2ab + b²
            </Text>
          </Float>

          {/* Blueprint Frame */}
          <group position={[0, 0, -0.1]}>
            <mesh>
              <planeGeometry args={[targetSize, targetSize]} />
              <meshBasicMaterial color="#111" transparent opacity={0.5} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(targetSize, targetSize)]} />
              <lineBasicMaterial color="white" transparent opacity={0.15} />
            </lineSegments>
          </group>

          <Text position={[0, targetSize / 2 + 1, 0]} fontSize={0.4} color="white" font="/fonts/Inter-Bold.woff">
            {titleText}
          </Text>

          <DraggableBlock
            id="a2"
            width={a}
            height={a}
            color="#00ff9d"
            label={labels.a2}
            initialPos={initialPositions.a2}
            targetPos={targetPositions.a2}
            containerSize={targetSize}
            locked={!locked}
            onSnap={onSnap}
          />
          <DraggableBlock
            id="b2"
            width={b}
            height={b}
            color="#00d2ff"
            label={labels.b2}
            initialPos={initialPositions.b2}
            targetPos={targetPositions.b2}
            containerSize={targetSize}
            locked={!locked}
            onSnap={onSnap}
          />
          <DraggableBlock
            id="ab1"
            width={b}
            height={a}
            color="#ffa500"
            label={labels.ab}
            initialPos={initialPositions.ab1}
            targetPos={targetPositions.ab1}
            containerSize={targetSize}
            locked={!locked}
            onSnap={onSnap}
          />
          <DraggableBlock
            id="ab2"
            width={a}
            height={b}
            color="#ffa500"
            label={labels.ab}
            initialPos={initialPositions.ab2}
            targetPos={targetPositions.ab2}
            containerSize={targetSize}
            locked={!locked}
            onSnap={onSnap}
          />
        </Suspense>
      </Canvas>
      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/30 tracking-widest uppercase">
        Algebra_Visualizer_Node: Zurich
      </div>
    </div>
  );
}
