"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface OrganicCanvasProps {
    molecule: "methane" | "ethane" | "benzene" | "glucose" | "alanine";
    showBonds: boolean;
    showHydrogens: boolean;
    rotationSpeed: number;
}

interface Atom {
    element: string;
    position: THREE.Vector3;
    color: string;
    radius: number;
}

interface Bond {
    from: number;
    to: number;
    order: number; // 1=single, 2=double, 3=triple
}

// Molecular data
const molecules: Record<string, { atoms: Atom[]; bonds: Bond[]; formula: string }> = {
    methane: {
        formula: "CH_4",
        atoms: [
            { element: "C", position: new THREE.Vector3(0, 0, 0), color: "#808080", radius: 0.3 },
            { element: "H", position: new THREE.Vector3(0.63, 0.63, 0.63), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(-0.63, -0.63, 0.63), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(-0.63, 0.63, -0.63), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(0.63, -0.63, -0.63), color: "#ffffff", radius: 0.2 },
        ],
        bonds: [
            { from: 0, to: 1, order: 1 },
            { from: 0, to: 2, order: 1 },
            { from: 0, to: 3, order: 1 },
            { from: 0, to: 4, order: 1 },
        ],
    },
    ethane: {
        formula: "C_2H_6",
        atoms: [
            { element: "C", position: new THREE.Vector3(-0.75, 0, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(0.75, 0, 0), color: "#808080", radius: 0.3 },
            { element: "H", position: new THREE.Vector3(-1.2, 0.8, 0.5), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(-1.2, -0.8, 0.5), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(-1.2, 0, -1), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(1.2, 0.8, 0.5), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(1.2, -0.8, 0.5), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(1.2, 0, -1), color: "#ffffff", radius: 0.2 },
        ],
        bonds: [
            { from: 0, to: 1, order: 1 },
            { from: 0, to: 2, order: 1 },
            { from: 0, to: 3, order: 1 },
            { from: 0, to: 4, order: 1 },
            { from: 1, to: 5, order: 1 },
            { from: 1, to: 6, order: 1 },
            { from: 1, to: 7, order: 1 },
        ],
    },
    benzene: {
        formula: "C_6H_6",
        atoms: [
            { element: "C", position: new THREE.Vector3(1, 0, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(0.5, 0.866, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(-0.5, 0.866, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(-1, 0, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(-0.5, -0.866, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(0.5, -0.866, 0), color: "#808080", radius: 0.3 },
            { element: "H", position: new THREE.Vector3(1.5, 0, 0), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(0.75, 1.3, 0), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(-0.75, 1.3, 0), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(-1.5, 0, 0), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(-0.75, -1.3, 0), color: "#ffffff", radius: 0.2 },
            { element: "H", position: new THREE.Vector3(0.75, -1.3, 0), color: "#ffffff", radius: 0.2 },
        ],
        bonds: [
            { from: 0, to: 1, order: 2 },
            { from: 1, to: 2, order: 1 },
            { from: 2, to: 3, order: 2 },
            { from: 3, to: 4, order: 1 },
            { from: 4, to: 5, order: 2 },
            { from: 5, to: 0, order: 1 },
            { from: 0, to: 6, order: 1 },
            { from: 1, to: 7, order: 1 },
            { from: 2, to: 8, order: 1 },
            { from: 3, to: 9, order: 1 },
            { from: 4, to: 10, order: 1 },
            { from: 5, to: 11, order: 1 },
        ],
    },
    glucose: {
        formula: "C_6H_1_2O_6",
        atoms: [
            { element: "C", position: new THREE.Vector3(0, 0, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(1, 0.5, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(1, 1.5, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(0, 2, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(-1, 1.5, 0), color: "#808080", radius: 0.3 },
            { element: "O", position: new THREE.Vector3(-1, 0.5, 0), color: "#ff0000", radius: 0.25 },
            { element: "O", position: new THREE.Vector3(0, -1, 0), color: "#ff0000", radius: 0.25 },
            { element: "O", position: new THREE.Vector3(2, 0, 0), color: "#ff0000", radius: 0.25 },
            { element: "O", position: new THREE.Vector3(2, 2, 0), color: "#ff0000", radius: 0.25 },
            { element: "O", position: new THREE.Vector3(0, 3, 0), color: "#ff0000", radius: 0.25 },
            { element: "O", position: new THREE.Vector3(-2, 2, 0), color: "#ff0000", radius: 0.25 },
        ],
        bonds: [
            { from: 0, to: 1, order: 1 },
            { from: 1, to: 2, order: 1 },
            { from: 2, to: 3, order: 1 },
            { from: 3, to: 4, order: 1 },
            { from: 4, to: 5, order: 1 },
            { from: 5, to: 0, order: 1 },
            { from: 0, to: 6, order: 1 },
            { from: 1, to: 7, order: 1 },
            { from: 2, to: 8, order: 1 },
            { from: 3, to: 9, order: 1 },
            { from: 4, to: 10, order: 1 },
        ],
    },
    alanine: {
        formula: "C_3H_7NO_2",
        atoms: [
            { element: "C", position: new THREE.Vector3(0, 0, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(1.5, 0, 0), color: "#808080", radius: 0.3 },
            { element: "C", position: new THREE.Vector3(-0.5, 1.5, 0), color: "#808080", radius: 0.3 },
            { element: "N", position: new THREE.Vector3(-0.5, -1, 0), color: "#0000ff", radius: 0.28 },
            { element: "O", position: new THREE.Vector3(2.5, 0.5, 0), color: "#ff0000", radius: 0.25 },
            { element: "O", position: new THREE.Vector3(1.5, -1, 0), color: "#ff0000", radius: 0.25 },
        ],
        bonds: [
            { from: 0, to: 1, order: 1 },
            { from: 0, to: 2, order: 1 },
            { from: 0, to: 3, order: 1 },
            { from: 1, to: 4, order: 1 },
            { from: 1, to: 5, order: 2 },
        ],
    },
};

// Atom sphere
function AtomSphere({ atom, showLabel }: { atom: Atom; showLabel: boolean }) {
    return (
        <group position={atom.position.toArray()}>
            <mesh>
                <sphereGeometry args={[atom.radius, 32, 32]} />
                <meshPhysicalMaterial
                    color={atom.color}
                    emissive={atom.color}
                    emissiveIntensity={0.3}
                    metalness={0.5}
                    roughness={0.5}
                />
            </mesh>
            {showLabel && (
                <Text
                    position={[0, atom.radius + 0.3, 0]}
                    fontSize={0.2}
                    color="#00e5ff"
                    anchorX="center"
                    anchorY="bottom"
                >
                    {atom.element}
                </Text>
            )}
        </group>
    );
}

// Bond cylinder
function BondCylinder({ from, to, order }: { from: THREE.Vector3; to: THREE.Vector3; order: number }) {
    const direction = useMemo(() => to.clone().sub(from), [from, to]);
    const length = direction.length();
    const midpoint = useMemo(() => from.clone().add(to).multiplyScalar(0.5), [from, to]);
    
    const quaternion = useMemo(() => {
        const axis = new THREE.Vector3(0, 1, 0);
        return new THREE.Quaternion().setFromUnitVectors(axis, direction.clone().normalize());
    }, [direction]);
    
    const bonds = [];
    const offset = order > 1 ? 0.1 : 0;
    
    for (let i = 0; i < order; i++) {
        const offsetVec = new THREE.Vector3(
            (i - (order - 1) / 2) * offset,
            0,
            0
        ).applyQuaternion(quaternion);
        
        bonds.push(
            <mesh key={i} position={midpoint.clone().add(offsetVec).toArray()} quaternion={quaternion}>
                <cylinderGeometry args={[0.05, 0.05, length, 8]} />
                <meshPhysicalMaterial
                    color="#00e5ff"
                    emissive="#00e5ff"
                    emissiveIntensity={0.2}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        );
    }
    
    return <>{bonds}</>;
}

function MoleculeGroup({ molecule, showBonds, showHydrogens, rotationSpeed }: OrganicCanvasProps) {
    const groupRef = useRef<THREE.Group>(null);
    const molData = molecules[molecule];
    
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * rotationSpeed;
        }
    });
    
    const filteredAtoms = showHydrogens ? molData.atoms : molData.atoms.filter(a => a.element !== "H");
    const filteredBonds = showHydrogens 
        ? molData.bonds 
        : molData.bonds.filter(b => 
            molData.atoms[b.from].element !== "H" && molData.atoms[b.to].element !== "H"
        );
    
    return (
        <group ref={groupRef}>
            {/* Atoms */}
            {filteredAtoms.map((atom, i) => (
                <AtomSphere key={i} atom={atom} showLabel={true} />
            ))}
            
            {/* Bonds */}
            {showBonds && filteredBonds.map((bond, i) => (
                <BondCylinder
                    key={i}
                    from={molData.atoms[bond.from].position}
                    to={molData.atoms[bond.to].position}
                    order={bond.order}
                />
            ))}
        </group>
    );
}

function OrganicScene(props: OrganicCanvasProps) {
    const molData = molecules[props.molecule];
    
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e5ff" />
            
            <MoleculeGroup {...props} />
            
            {/* Formula display */}
            <Text
                position={[0, 3, 0]}
                fontSize={0.5}
                color="#39ff14"
                anchorX="center"
                anchorY="middle"
            >
                {molData.formula}
            </Text>
            
            {/* Grid */}
            <gridHelper args={[10, 10, "#00e5ff", "#003344"]} position={[0, -2, 0]} />
        </>
    );
}

export default function OrganicCanvas(props: OrganicCanvasProps) {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <color attach="background" args={["#000000"]} />
            <OrganicScene {...props} />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />
        </Canvas>
    );
}
