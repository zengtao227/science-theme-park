"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";

type AtomType = "C" | "H" | "O" | "N";

interface Atom {
  id: string;
  type: AtomType;
  position: THREE.Vector3;
  bonds: string[]; // IDs of connected atoms
  maxBonds: number;
}

interface MoleculeAssemblerProps {
  onMoleculeChange?: (formula: string, atoms: Atom[], iupacName: string) => void;
}

const atomColors: Record<AtomType, string> = {
  C: "#1a1a1a", // Carbon - dark gray
  H: "#ffffff", // Hydrogen - white
  O: "#ff2d7d", // Oxygen - red/pink
  N: "#00e5ff", // Nitrogen - cyan
};

const atomSizes: Record<AtomType, number> = {
  C: 0.15,
  H: 0.1,
  O: 0.13,
  N: 0.14,
};

const maxBonds: Record<AtomType, number> = {
  C: 4,
  H: 1,
  O: 2,
  N: 3,
};

const pseudo = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const calculateFormula = (atomList: Atom[]): string => {
  const counts: Record<string, number> = {};
  atomList.forEach((atom) => {
    counts[atom.type] = (counts[atom.type] || 0) + 1;
  });

  // Order: C, H, O, N
  const order: AtomType[] = ["C", "H", "O", "N"];
  return order
    .filter((type) => counts[type])
    .map((type) => `${type}${counts[type] > 1 ? counts[type] : ""}`)
    .join("");
};

const calculateIupacName = (atomList: Atom[]): string => {
  const atomsById = new Map(atomList.map((atom) => [atom.id, atom]));
  const carbons = atomList.filter((atom) => atom.type === "C");
  if (!carbons.length) return "unknown";

  const carbonAdj: Record<string, string[]> = {};
  carbons.forEach((atom) => {
    carbonAdj[atom.id] = atom.bonds.filter((bondId) => atomsById.get(bondId)?.type === "C");
  });

  const bfsFarthest = (startId: string) => {
    const visited = new Set<string>();
    const queue: Array<{ id: string; dist: number }> = [{ id: startId, dist: 0 }];
    visited.add(startId);
    let farthest = { id: startId, dist: 0 };

    while (queue.length) {
      const node = queue.shift()!;
      if (node.dist > farthest.dist) {
        farthest = node;
      }
      (carbonAdj[node.id] || []).forEach((nextId) => {
        if (!visited.has(nextId)) {
          visited.add(nextId);
          queue.push({ id: nextId, dist: node.dist + 1 });
        }
      });
    }

    return farthest;
  };

  let longest = 1;
  if (carbons.length > 1) {
    carbons.forEach((atom) => {
      const first = bfsFarthest(atom.id);
      const second = bfsFarthest(first.id);
      longest = Math.max(longest, second.dist + 1);
    });
  }

  const roots = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec"];
  const root = roots[longest - 1] || "alk";

  const hasAlcohol = atomList.some((atom) => {
    if (atom.type !== "O") return false;
    const bondTypes = atom.bonds.map((id) => atomsById.get(id)?.type).filter(Boolean);
    return bondTypes.includes("H") && bondTypes.includes("C");
  });

  const hasAmine = atomList.some((atom) => {
    if (atom.type !== "N") return false;
    const bondTypes = atom.bonds.map((id) => atomsById.get(id)?.type).filter(Boolean);
    return bondTypes.includes("H") && bondTypes.includes("C");
  });

  if (hasAlcohol) return `${root}anol`;
  if (hasAmine) return `${root}amine`;
  return `${root}ane`;
};

function AtomSphere({
  atom,
  onClick,
  isSelected,
}: {
  atom: Atom;
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={atom.position}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <sphereGeometry args={[atomSizes[atom.type], 32, 32]} />
      <meshPhysicalMaterial
        color={atomColors[atom.type]}
        emissive={atomColors[atom.type]}
        emissiveIntensity={isSelected ? 0.8 : 0.3}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.9}
      />
      <Html distanceFactor={10}>
        <div className="text-white text-xs font-black pointer-events-none">
          {atom.type}
        </div>
      </Html>
    </mesh>
  );
}

function Bond({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const direction = useMemo(() => {
    return new THREE.Vector3().subVectors(end, start);
  }, [start, end]);

  const length = direction.length();
  const midpoint = useMemo(() => {
    return new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  }, [start, end]);

  const quaternion = useMemo(() => {
    const axis = new THREE.Vector3(0, 1, 0);
    return new THREE.Quaternion().setFromUnitVectors(axis, direction.clone().normalize());
  }, [direction]);

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.02, 0.02, length, 8]} />
      <meshPhysicalMaterial
        color="#00e5ff"
        emissive="#00e5ff"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function MoleculeScene({
  atoms,
  selectedAtomId,
  onAtomClick,
}: {
  atoms: Atom[];
  selectedAtomId: string | null;
  onAtomClick: (id: string) => void;
}) {
  return (
    <>
      {/* Atoms */}
      {atoms.map((atom) => (
        <AtomSphere
          key={atom.id}
          atom={atom}
          onClick={() => onAtomClick(atom.id)}
          isSelected={atom.id === selectedAtomId}
        />
      ))}

      {/* Bonds */}
      {atoms.map((atom) =>
        atom.bonds.map((bondedId) => {
          const bondedAtom = atoms.find((a) => a.id === bondedId);
          if (!bondedAtom || atom.id > bondedId) return null; // Avoid duplicate bonds
          return (
            <Bond
              key={`${atom.id}-${bondedId}`}
              start={atom.position}
              end={bondedAtom.position}
            />
          );
        })
      )}
    </>
  );
}

export default function MoleculeAssembler({ onMoleculeChange }: MoleculeAssemblerProps) {
  const [atoms, setAtoms] = useState<Atom[]>([
    {
      id: "atom-0",
      type: "C",
      position: new THREE.Vector3(0, 0, 0),
      bonds: [],
      maxBonds: 4,
    },
  ]);
  const atomCounter = useRef(1);
  const [selectedAtomId, setSelectedAtomId] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<AtomType>("C");

  const addAtom = useCallback((type: AtomType) => {
    if (!selectedAtomId) return;

    const selectedAtom = atoms.find((a) => a.id === selectedAtomId);
    if (!selectedAtom) return;

    // Check if selected atom can form more bonds
    if (selectedAtom.bonds.length >= selectedAtom.maxBonds) {
      return;
    }

    // Calculate position for new atom (offset from selected atom)
    const seed = atomCounter.current * 13.7;
    const offset = new THREE.Vector3(
      (pseudo(seed) - 0.5) * 0.5,
      (pseudo(seed + 1) - 0.5) * 0.5,
      (pseudo(seed + 2) - 0.5) * 0.5
    ).normalize().multiplyScalar(0.4);

    const newPosition = selectedAtom.position.clone().add(offset);
    const newId = `atom-${atomCounter.current++}`;

    const newAtom: Atom = {
      id: newId,
      type,
      position: newPosition,
      bonds: [selectedAtomId],
      maxBonds: maxBonds[type],
    };

    // Update selected atom's bonds
    const updatedAtoms = atoms.map((atom) =>
      atom.id === selectedAtomId
        ? { ...atom, bonds: [...atom.bonds, newAtom.id] }
        : atom
    );

    const newAtoms = [...updatedAtoms, newAtom];
    setAtoms(newAtoms);
    setSelectedAtomId(newAtom.id);

    // Calculate molecular formula
    const formula = calculateFormula(newAtoms);
    if (onMoleculeChange) {
      onMoleculeChange(formula, newAtoms, calculateIupacName(newAtoms));
    }
  }, [atoms, selectedAtomId, onMoleculeChange]);

  const deleteSelectedAtom = useCallback(() => {
    if (!selectedAtomId || atoms.length === 1) return;

    const atomToDelete = atoms.find((a) => a.id === selectedAtomId);
    if (!atomToDelete) return;

    // Remove bonds from connected atoms
    const updatedAtoms = atoms
      .filter((atom) => atom.id !== selectedAtomId)
      .map((atom) => ({
        ...atom,
        bonds: atom.bonds.filter((bondId) => bondId !== selectedAtomId),
      }));

    setAtoms(updatedAtoms);
    setSelectedAtomId(null);

    const formula = calculateFormula(updatedAtoms);
    if (onMoleculeChange) {
      onMoleculeChange(formula, updatedAtoms, calculateIupacName(updatedAtoms));
    }
  }, [atoms, selectedAtomId, onMoleculeChange]);

  const resetMolecule = useCallback(() => {
    const initialAtom: Atom = {
      id: "atom-0",
      type: "C",
      position: new THREE.Vector3(0, 0, 0),
      bonds: [],
      maxBonds: 4,
    };
    setAtoms([initialAtom]);
    setSelectedAtomId(null);
    if (onMoleculeChange) {
      onMoleculeChange("C", [initialAtom], calculateIupacName([initialAtom]));
    }
  }, [onMoleculeChange]);

  return (
    <div className="space-y-4">
      <div className="w-full h-[800px] bg-black rounded-xl overflow-hidden border border-white/10">
        <Canvas>
          <PerspectiveCamera makeDefault position={[2, 2, 3]} fov={55} />
          <OrbitControls enablePan={true} minDistance={1} maxDistance={10} />

          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.3} />

          <MoleculeScene
            atoms={atoms}
            selectedAtomId={selectedAtomId}
            onAtomClick={setSelectedAtomId}
          />

          {/* Grid */}
          <gridHelper args={[5, 20, "#00e5ff", "#1a1a1a"]} />
        </Canvas>
      </div>

      {/* Atom Toolbar */}
      <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
          ATOM TOOLS
        </div>
        <div className="flex gap-2">
          {(["C", "H", "O", "N"] as AtomType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedTool(type);
                addAtom(type);
              }}
              className={`px-4 py-2 rounded border font-black transition-all ${selectedTool === type
                ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
                : "border-white/20 bg-white/5 text-white/60 hover:border-white/40"
                }`}
              disabled={!selectedAtomId}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <button
          onClick={deleteSelectedAtom}
          disabled={!selectedAtomId || atoms.length === 1}
          className="px-4 py-2 rounded border border-neon-pink/40 bg-neon-pink/10 text-neon-pink font-black hover:bg-neon-pink/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          DELETE
        </button>
        <button
          onClick={resetMolecule}
          className="px-4 py-2 rounded border border-white/20 bg-white/5 text-white/60 font-black hover:border-white/40 transition-all"
        >
          RESET
        </button>
      </div>

      {/* Info */}
      {selectedAtomId && (
        <div className="text-xs text-white/60 font-mono text-center">
          Selected: {atoms.find((a) => a.id === selectedAtomId)?.type} | Bonds:{" "}
          {atoms.find((a) => a.id === selectedAtomId)?.bonds.length} /{" "}
          {atoms.find((a) => a.id === selectedAtomId)?.maxBonds}
        </div>
      )}
    </div>
  );
}
