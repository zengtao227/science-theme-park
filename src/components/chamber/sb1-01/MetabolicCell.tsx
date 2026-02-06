"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface MetabolicCellProps {
    osmolarity: number; // -1 to 1: negative = hypertonic, positive = hypotonic
    showATP: boolean;
}

function ATPParticles({ count = 50 }: { count?: number }) {
    const particlesRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    
    // ATP particle paths (from mitochondria to cell membrane)
    const paths = useMemo(() => {
        return Array.from({ length: count }, () => {
            const angle = Math.random() * Math.PI * 2;
            const startRadius = 0.5 + Math.random() * 0.5;
            const endRadius = 3.0 + Math.random() * 0.3;
            
            return {
                start: new THREE.Vector3(
                    Math.cos(angle) * startRadius,
                    Math.sin(angle) * startRadius,
                    (Math.random() - 0.5) * 0.5
                ),
                end: new THREE.Vector3(
                    Math.cos(angle) * endRadius,
                    Math.sin(angle) * endRadius,
                    (Math.random() - 0.5) * 0.5
                ),
                phase: Math.random() * Math.PI * 2,
                speed: 0.5 + Math.random() * 0.5,
            };
        });
    }, [count]);
    
    useFrame((state) => {
        if (!particlesRef.current) return;
        
        paths.forEach((path, i) => {
            const t = (Math.sin(state.clock.elapsedTime * path.speed + path.phase) + 1) / 2;
            
            dummy.position.lerpVectors(path.start, path.end, t);
            dummy.scale.setScalar(0.05 + Math.sin(t * Math.PI) * 0.03);
            dummy.updateMatrix();
            
            particlesRef.current!.setMatrixAt(i, dummy.matrix);
        });
        
        particlesRef.current.instanceMatrix.needsUpdate = true;
    });
    
    return (
        <instancedMesh ref={particlesRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
                color="#ffd166"
                emissive="#ffd166"
                emissiveIntensity={0.8}
            />
        </instancedMesh>
    );
}

function CellMembrane({ osmolarity }: { osmolarity: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (!meshRef.current) return;
        
        const geometry = meshRef.current.geometry as THREE.SphereGeometry;
        const positions = geometry.attributes.position;
        
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = positions.getZ(i);
            
            const length = Math.sqrt(x * x + y * y + z * z);
            const nx = x / length;
            const ny = y / length;
            const nz = z / length;
            
            // Osmotic deformation
            const baseRadius = 3.5;
            let deformation = 1.0;
            
            if (osmolarity > 0) {
                // Hypotonic: cell swells
                deformation = 1.0 + osmolarity * 0.3;
            } else if (osmolarity < 0) {
                // Hypertonic: cell shrinks with wrinkles
                deformation = 1.0 + osmolarity * 0.2;
                const noise = Math.sin(x * 5 + state.clock.elapsedTime) * 
                             Math.cos(y * 5 + state.clock.elapsedTime) * 
                             Math.abs(osmolarity) * 0.1;
                deformation += noise;
            }
            
            positions.setXYZ(
                i,
                nx * baseRadius * deformation,
                ny * baseRadius * deformation,
                nz * baseRadius * deformation
            );
        }
        
        positions.needsUpdate = true;
        geometry.computeVertexNormals();
    });
    
    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[3.5, 64, 64]} />
            <meshPhysicalMaterial
                color="#00e5ff"
                emissive="#00e5ff"
                emissiveIntensity={0.1}
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
                roughness={0.1}
            />
        </mesh>
    );
}

function Mitochondria({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.01;
        }
    });
    
    return (
        <mesh ref={meshRef} position={position}>
            <capsuleGeometry args={[0.2, 0.6, 8, 16]} />
            <meshPhysicalMaterial
                color="#ff2d7d"
                emissive="#ff2d7d"
                emissiveIntensity={0.5}
                transparent
                opacity={0.9}
            />
        </mesh>
    );
}

function Nucleus() {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });
    
    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshPhysicalMaterial
                color="#a855f7"
                emissive="#a855f7"
                emissiveIntensity={0.4}
                transparent
                opacity={0.8}
            />
        </mesh>
    );
}

function Scene({ osmolarity, showATP }: MetabolicCellProps) {
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <CellMembrane osmolarity={osmolarity} />
            <Nucleus />
            
            <Mitochondria position={[2, 0.5, 0.5]} />
            <Mitochondria position={[-2, -0.5, -0.5]} />
            <Mitochondria position={[0, 2, 0]} />
            
            {showATP && <ATPParticles count={50} />}
            
            <OrbitControls enablePan={true} enableZoom={true} />
        </>
    );
}

export default function MetabolicCell(props: MetabolicCellProps) {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Scene {...props} />
            </Canvas>
        </div>
    );
}
