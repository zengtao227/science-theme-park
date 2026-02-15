"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface Atom {
  id: string;
  element: "C" | "H" | "O" | "N";
  position: THREE.Vector3;
}

interface Bond {
  from: string;
  to: string;
}

interface MoleculeCanvasProps {
  target: "ASPIRIN" | "CAFFEINE" | "ADRENALINE";
  onComplete?: () => void;
}

const palette = {
  carbon: "#1a1a1a",
  hydrogen: "#ffffff",
  oxygen: "#ff2d2d",
  nitrogen: "#2d7dff",
  bond: "#888888",
  cyan: "#00e5ff",
  green: "#39ff14",
};

const atomColors = {
  C: palette.carbon,
  H: palette.hydrogen,
  O: palette.oxygen,
  N: palette.nitrogen,
};

const atomRadii = {
  C: 0.3,
  H: 0.2,
  O: 0.28,
  N: 0.28,
};

// Aspirin structure: C9H8O4 (Using EXPERT GUIDANCE coordinates)
// Benzene ring center at [0, 2.4, 0] as per DeepSeek specification
const aspirinAtoms: Atom[] = [
  // Benzene ring (6 carbons) - centered at [0, 2.4, 0]
  { id: "C1", element: "C", position: new THREE.Vector3(0, 2.4, 0) }, // Snap socket point
  { id: "C2", element: "C", position: new THREE.Vector3(1.2, 2.4, 0) },
  { id: "C3", element: "C", position: new THREE.Vector3(1.8, 3.6, 0) },
  { id: "C4", element: "C", position: new THREE.Vector3(1.2, 4.8, 0) },
  { id: "C5", element: "C", position: new THREE.Vector3(0, 4.8, 0) },
  { id: "C6", element: "C", position: new THREE.Vector3(-0.6, 3.6, 0) },
  // Carboxyl group
  { id: "C7", element: "C", position: new THREE.Vector3(-1.8, 3.6, 0) },
  { id: "O1", element: "O", position: new THREE.Vector3(-2.4, 2.6, 0) },
  { id: "O2", element: "O", position: new THREE.Vector3(-2.4, 4.6, 0) },
  { id: "H1", element: "H", position: new THREE.Vector3(-3.2, 4.6, 0) },
  // Acetyl group - O10 is the key snap point
  { id: "C8", element: "C", position: new THREE.Vector3(1.8, 5.8, 0) },
  { id: "O10", element: "O", position: new THREE.Vector3(1.2, 6.8, 0) }, // KEY SNAP POINT
  { id: "C9", element: "C", position: new THREE.Vector3(3.0, 5.8, 0) },
  { id: "H2", element: "H", position: new THREE.Vector3(3.4, 6.6, 0) },
  { id: "H3", element: "H", position: new THREE.Vector3(3.4, 5.0, 0) },
  { id: "H4", element: "H", position: new THREE.Vector3(3.6, 5.8, 0.6) },
  // Ring hydrogens
  { id: "H5", element: "H", position: new THREE.Vector3(1.6, 1.6, 0) },
  { id: "H6", element: "H", position: new THREE.Vector3(2.8, 3.6, 0) },
  { id: "H7", element: "H", position: new THREE.Vector3(-0.4, 5.6, 0) },
  { id: "H8", element: "H", position: new THREE.Vector3(0, 1.6, 0) },
];

const aspirinBonds: Bond[] = [
  // Benzene ring
  { from: "C1", to: "C2" },
  { from: "C2", to: "C3" },
  { from: "C3", to: "C4" },
  { from: "C4", to: "C5" },
  { from: "C5", to: "C6" },
  { from: "C6", to: "C1" },
  // Carboxyl
  { from: "C6", to: "C7" },
  { from: "C7", to: "O1" },
  { from: "C7", to: "O2" },
  { from: "O2", to: "H1" },
  // Acetyl - O10 is key snap point
  { from: "C4", to: "C8" },
  { from: "C8", to: "O10" }, // KEY BOND
  { from: "C8", to: "C9" },
  { from: "C9", to: "H2" },
  { from: "C9", to: "H3" },
  { from: "C9", to: "H4" },
  // Ring H
  { from: "C2", to: "H5" },
  { from: "C3", to: "H6" },
  { from: "C5", to: "H7" },
  { from: "C1", to: "H8" },
];

// Caffeine structure: C8H10N4O2
const caffeineAtoms: Atom[] = [
  // Imidazole ring
  { id: "C1", element: "C", position: new THREE.Vector3(0, 0, 0) },
  { id: "N1", element: "N", position: new THREE.Vector3(1.2, 0, 0) },
  { id: "C2", element: "C", position: new THREE.Vector3(1.8, 1.2, 0) },
  { id: "N2", element: "N", position: new THREE.Vector3(1.2, 2.4, 0) },
  { id: "C3", element: "C", position: new THREE.Vector3(0, 2.4, 0) },
  // Pyrimidine ring
  { id: "C4", element: "C", position: new THREE.Vector3(-0.6, 1.2, 0) },
  { id: "N3", element: "N", position: new THREE.Vector3(-1.8, 1.2, 0) },
  { id: "C5", element: "C", position: new THREE.Vector3(-2.4, 0, 0) },
  { id: "N4", element: "N", position: new THREE.Vector3(-1.8, -1.2, 0) },
  { id: "C6", element: "C", position: new THREE.Vector3(-0.6, -1.2, 0) },
  // Carbonyl oxygens
  { id: "O1", element: "O", position: new THREE.Vector3(-0.6, 3.4, 0) },
  { id: "O2", element: "O", position: new THREE.Vector3(-3.6, 0, 0) },
  // Methyl groups
  { id: "C7", element: "C", position: new THREE.Vector3(1.8, -1.2, 0) },
  { id: "C8", element: "C", position: new THREE.Vector3(-2.4, -2.4, 0) },
  // Hydrogens
  { id: "H1", element: "H", position: new THREE.Vector3(2.8, 1.2, 0) },
  { id: "H2", element: "H", position: new THREE.Vector3(2.4, -1.2, 0.6) },
  { id: "H3", element: "H", position: new THREE.Vector3(2.4, -1.2, -0.6) },
  { id: "H4", element: "H", position: new THREE.Vector3(1.8, -2.0, 0) },
  { id: "H5", element: "H", position: new THREE.Vector3(-3.0, -2.4, 0.6) },
  { id: "H6", element: "H", position: new THREE.Vector3(-3.0, -2.4, -0.6) },
  { id: "H7", element: "H", position: new THREE.Vector3(-2.4, -3.2, 0) },
  { id: "H8", element: "H", position: new THREE.Vector3(-2.4, 1.2, 0) },
  { id: "H9", element: "H", position: new THREE.Vector3(-0.6, -2.0, 0) },
  { id: "H10", element: "H", position: new THREE.Vector3(1.8, 3.2, 0) },
];

const caffeineBonds: Bond[] = [
  // Imidazole ring
  { from: "C1", to: "N1" },
  { from: "N1", to: "C2" },
  { from: "C2", to: "N2" },
  { from: "N2", to: "C3" },
  { from: "C3", to: "C4" },
  { from: "C4", to: "C1" },
  // Pyrimidine ring
  { from: "C4", to: "N3" },
  { from: "N3", to: "C5" },
  { from: "C5", to: "N4" },
  { from: "N4", to: "C6" },
  { from: "C6", to: "C1" },
  // Carbonyls
  { from: "C3", to: "O1" },
  { from: "C5", to: "O2" },
  // Methyls
  { from: "N1", to: "C7" },
  { from: "N4", to: "C8" },
  // Hydrogens
  { from: "C2", to: "H1" },
  { from: "C7", to: "H2" },
  { from: "C7", to: "H3" },
  { from: "C7", to: "H4" },
  { from: "C8", to: "H5" },
  { from: "C8", to: "H6" },
  { from: "C8", to: "H7" },
  { from: "N3", to: "H8" },
  { from: "C6", to: "H9" },
  { from: "N2", to: "H10" },
];

// Adrenaline (Epinephrine): C9H13NO3
const adrenalineAtoms: Atom[] = [
  // Catechol ring (benzene with two -OH)
  { id: "C1", element: "C", position: new THREE.Vector3(0, 0, 0) },
  { id: "C2", element: "C", position: new THREE.Vector3(1.2, 0, 0) },
  { id: "C3", element: "C", position: new THREE.Vector3(1.8, 1.2, 0) },
  { id: "C4", element: "C", position: new THREE.Vector3(1.2, 2.4, 0) },
  { id: "C5", element: "C", position: new THREE.Vector3(0, 2.4, 0) },
  { id: "C6", element: "C", position: new THREE.Vector3(-0.6, 1.2, 0) },
  // -OH on ring C3, C4 (Catechol)
  { id: "O1", element: "O", position: new THREE.Vector3(3.0, 1.2, 0) },
  { id: "H1", element: "H", position: new THREE.Vector3(3.4, 2.0, 0) },
  { id: "O2", element: "O", position: new THREE.Vector3(1.8, 3.4, 0) },
  { id: "H2", element: "H", position: new THREE.Vector3(2.6, 3.4, 0) },
  // Ethanolamine side chain on C1
  { id: "C7", element: "C", position: new THREE.Vector3(0, -1.2, 0) },
  { id: "O3", element: "O", position: new THREE.Vector3(-0.8, -1.8, 0) }, // OH on side chain
  { id: "H3", element: "H", position: new THREE.Vector3(-0.4, -2.6, 0) },
  { id: "C8", element: "C", position: new THREE.Vector3(1.2, -1.8, 0) },
  { id: "N1", element: "N", position: new THREE.Vector3(1.2, -3.0, 0) },
  { id: "C9", element: "C", position: new THREE.Vector3(2.4, -3.6, 0) }, // N-methyl
  // Hydrogens
  { id: "H4", element: "H", position: new THREE.Vector3(-1.4, 1.2, 0) },
  { id: "H5", element: "H", position: new THREE.Vector3(-0.6, 3.2, 0) },
  { id: "H6", element: "H", position: new THREE.Vector3(2.0, -0.6, 0) },
  { id: "H7", element: "H", position: new THREE.Vector3(-0.8, -1.0, 0.4) },
  { id: "H8", element: "H", position: new THREE.Vector3(2.0, -1.2, 0.4) },
  { id: "H9", element: "H", position: new THREE.Vector3(2.0, -1.2, -0.4) },
  { id: "H10", element: "H", position: new THREE.Vector3(0.4, -3.4, 0) }, // N-H
  { id: "H11", element: "H", position: new THREE.Vector3(3.2, -3.0, 0.4) },
  { id: "H12", element: "H", position: new THREE.Vector3(3.2, -3.0, -0.4) },
  { id: "H13", element: "H", position: new THREE.Vector3(2.4, -4.6, 0) },
];

const adrenalineBonds: Bond[] = [
  { from: "C1", to: "C2" }, { from: "C2", to: "C3" }, { from: "C3", to: "C4" },
  { from: "C4", to: "C5" }, { from: "C5", to: "C6" }, { from: "C6", to: "C1" },
  { from: "C3", to: "O1" }, { from: "O1", to: "H1" },
  { from: "C4", to: "O2" }, { from: "O2", to: "H2" },
  { from: "C1", to: "C7" }, { from: "C7", to: "O3" }, { from: "O3", to: "H3" },
  { from: "C7", to: "C8" }, { from: "C8", to: "N1" }, { from: "N1", to: "C9" },
  { from: "C6", to: "H4" }, { from: "C5", to: "H5" }, { from: "C2", to: "H6" },
  { from: "C7", to: "H7" }, { from: "C8", to: "H8" }, { from: "C8", to: "H9" },
  { from: "N1", to: "H10" }, { from: "C9", to: "H11" }, { from: "C9", to: "H12" }, { from: "C9", to: "H13" },
];

function AtomSphere({ atom, isPlaced }: { atom: Atom; isPlaced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || isPlaced) return;
    meshRef.current.position.y += Math.sin(clock.elapsedTime * 2) * 0.002;
  });

  return (
    <Sphere ref={meshRef} args={[atomRadii[atom.element], 16, 16]} position={atom.position}>
      <meshPhysicalMaterial
        color={atomColors[atom.element]}
        metalness={0.3}
        roughness={0.4}
        emissive={atomColors[atom.element]}
        emissiveIntensity={isPlaced ? 0.2 : 0.5}
      />
    </Sphere>
  );
}

function BondCylinder({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const midpoint = useMemo(() => {
    return new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
  }, [from, to]);

  const direction = useMemo(() => {
    return new THREE.Vector3().subVectors(to, from);
  }, [from, to]);

  const length = direction.length();

  const quaternion = useMemo(() => {
    const axis = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion();
    quat.setFromUnitVectors(axis, direction.clone().normalize());
    return quat;
  }, [direction]);

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.08, 0.08, length, 8]} />
      <meshPhysicalMaterial
        color={palette.bond}
        metalness={0.5}
        roughness={0.3}
      />
    </mesh>
  );
}

function MoleculeStructure({ target }: { target: "ASPIRIN" | "CAFFEINE" | "ADRENALINE" }) {
  const atoms = target === "ASPIRIN" ? aspirinAtoms : target === "CAFFEINE" ? caffeineAtoms : adrenalineAtoms;
  const bonds = target === "ASPIRIN" ? aspirinBonds : target === "CAFFEINE" ? caffeineBonds : adrenalineBonds;

  const atomMap = useMemo(() => {
    const map = new Map<string, THREE.Vector3>();
    atoms.forEach(atom => map.set(atom.id, atom.position));
    return map;
  }, [atoms]);

  return (
    <group>
      {atoms.map((atom: Atom) => (
        <AtomSphere key={atom.id} atom={atom} isPlaced={true} />
      ))}
      {bonds.map((bond: Bond, i: number) => {
        const from = atomMap.get(bond.from);
        const to = atomMap.get(bond.to);
        if (!from || !to) return null;
        return <BondCylinder key={i} from={from} to={to} />;
      })}
    </group>
  );
}

export default function MoleculeCanvas({ target }: MoleculeCanvasProps) {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="relative w-full h-[600px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 1, 8], fov: 50 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000005"]} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color={palette.cyan} />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          minDistance={5}
          maxDistance={15}
          autoRotate={false}
        />

        {/* Molecule */}
        <group rotation={[0, rotation, 0]}>
          <MoleculeStructure target={target} />
        </group>

        {/* Title */}
        <Text position={[0, 5, 0]} fontSize={0.4} color={palette.cyan}>
          {target === "ASPIRIN" ? "ASPIRIN (C₉H₈O₄)" : target === "CAFFEINE" ? "CAFFEINE (C₈H₁₀N₄O₂)" : "ADRENALINE (C₉H₁₃NO₃)"}
        </Text>

        {/* Legend */}
        <group position={[-6, 3, 0]}>
          <Sphere args={[0.15, 16, 16]} position={[0, 0, 0]}>
            <meshBasicMaterial color={palette.carbon} />
          </Sphere>
          <Text position={[0.5, 0, 0]} fontSize={0.2} color="#ffffff" anchorX="left">
            Carbon
          </Text>

          <Sphere args={[0.15, 16, 16]} position={[0, -0.5, 0]}>
            <meshBasicMaterial color={palette.hydrogen} />
          </Sphere>
          <Text position={[0.5, -0.5, 0]} fontSize={0.2} color="#ffffff" anchorX="left">
            Hydrogen
          </Text>

          <Sphere args={[0.15, 16, 16]} position={[0, -1, 0]}>
            <meshBasicMaterial color={palette.oxygen} />
          </Sphere>
          <Text position={[0.5, -1, 0]} fontSize={0.2} color="#ffffff" anchorX="left">
            Oxygen
          </Text>

          {(target === "CAFFEINE" || target === "ADRENALINE") && (
            <>
              <Sphere args={[0.15, 16, 16]} position={[0, -1.5, 0]}>
                <meshBasicMaterial color={palette.nitrogen} />
              </Sphere>
              <Text position={[0.5, -1.5, 0]} fontSize={0.2} color="#ffffff" anchorX="left">
                Nitrogen
              </Text>
            </>
          )}
        </group>
      </Canvas>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 bg-black/70 border border-cyan-400/30 rounded-lg px-4 py-3 space-y-2">
        <div className="text-[9px] text-cyan-400/60 uppercase tracking-wider">
          Rotation Control
        </div>
        <input
          type="range"
          min="0"
          max={Math.PI * 2}
          step="0.1"
          value={rotation}
          onChange={(e) => setRotation(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Info */}
      <div className="absolute top-4 right-4 bg-black/70 border border-purple-400/30 rounded-lg px-4 py-3">
        <div className="text-[9px] text-purple-400/60 uppercase tracking-wider mb-1">
          Molecular Formula
        </div>
        <div className="text-[11px] font-mono text-white">
          {target === "ASPIRIN" ? "C₉H₈O₄" : target === "CAFFEINE" ? "C₈H₁₀N₄O₂" : "C₉H₁₃NO₃"}
        </div>
      </div>

      {/* Status */}
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/60 text-right">
        CHAMBER // C3.01<br />
        MOLECULE_SIM: ACTIVE<br />
        MODE: {target}
      </div>
    </div>
  );
}
