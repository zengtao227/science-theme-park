"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface KineticsCanvasProps {
    temperature: number; // Kelvin
    activationEnergy: number; // kJ/mol
    showCollisions: boolean;
}

// Arrhenius equation: k = A * exp(-Ea / RT)
function calculateRateConstant(Ea: number, T: number): number {
    const R = 8.314; // J/(mol·K)
    const A = 1e13; // Pre-exponential factor (frequency factor)
    const EaJoules = Ea * 1000; // Convert kJ to J
    return A * Math.exp(-EaJoules / (R * T));
}

// Molecule particle system
function Molecules({ temperature, activationEnergy, showCollisions }: KineticsCanvasProps) {
    const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
    const collisionMeshRef = useRef<THREE.InstancedMesh>(null);
    const particleCount = 100;
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useRef(
        Array.from({ length: particleCount }, () => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1
            ),
            energy: Math.random() * 100, // kJ/mol
            reacted: false,
        }))
    );

    const collisions = useRef<Array<{ position: THREE.Vector3; life: number }>>([]);

    useFrame((_, delta) => {
        if (!instancedMeshRef.current) return;

        // Update particle velocities based on temperature
        const speedFactor = Math.sqrt(temperature / 300);

        particles.current.forEach((particle, i) => {
            // Update velocity magnitude based on temperature
            const currentSpeed = particle.velocity.length();
            const targetSpeed = 0.1 * speedFactor;
            particle.velocity.normalize().multiplyScalar(targetSpeed);

            // Update position
            particle.position.add(particle.velocity.clone().multiplyScalar(delta * 10));

            // Bounce off walls
            if (Math.abs(particle.position.x) > 5) {
                particle.velocity.x *= -1;
                particle.position.x = Math.sign(particle.position.x) * 5;
            }
            if (Math.abs(particle.position.y) > 5) {
                particle.velocity.y *= -1;
                particle.position.y = Math.sign(particle.position.y) * 5;
            }
            if (Math.abs(particle.position.z) > 5) {
                particle.velocity.z *= -1;
                particle.position.z = Math.sign(particle.position.z) * 5;
            }

            // Check for collisions with other particles
            if (showCollisions) {
                for (let j = i + 1; j < particles.current.length; j++) {
                    const other = particles.current[j];
                    const distance = particle.position.distanceTo(other.position);

                    if (distance < 0.3) {
                        // Collision detected
                        const combinedEnergy = particle.energy + other.energy;

                        // Check if collision has enough energy to overcome activation barrier
                        if (combinedEnergy > activationEnergy && !particle.reacted && !other.reacted) {
                            // Reaction occurs!
                            particle.reacted = true;
                            other.reacted = true;

                            // Add collision effect
                            collisions.current.push({
                                position: particle.position.clone(),
                                life: 1.0,
                            });
                        }

                        // Elastic collision (simplified)
                        const temp = particle.velocity.clone();
                        particle.velocity.copy(other.velocity);
                        other.velocity.copy(temp);
                    }
                }
            }

            // Update instance matrix
            dummy.position.copy(particle.position);
            dummy.scale.setScalar(particle.reacted ? 0.15 : 0.2);
            dummy.updateMatrix();
            instancedMeshRef.current!.setMatrixAt(i, dummy.matrix);

            // Color based on energy and reaction state
            const color = particle.reacted
                ? new THREE.Color("#39ff14") // Green for products
                : particle.energy > activationEnergy
                ? new THREE.Color("#ff2d7d") // Pink for high energy
                : new THREE.Color("#00e5ff"); // Cyan for low energy

            instancedMeshRef.current!.setColorAt(i, color);
        });

        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
        if (instancedMeshRef.current.instanceColor) {
            instancedMeshRef.current.instanceColor.needsUpdate = true;
        }

        // Update collision effects
        if (collisionMeshRef.current && showCollisions) {
            collisions.current = collisions.current.filter((c) => c.life > 0);

            collisions.current.forEach((collision, i) => {
                collision.life -= delta * 2;

                dummy.position.copy(collision.position);
                dummy.scale.setScalar(0.5 * (1 - collision.life));
                dummy.updateMatrix();
                collisionMeshRef.current!.setMatrixAt(i, dummy.matrix);

                const color = new THREE.Color("#ffd166");
                color.multiplyScalar(collision.life);
                collisionMeshRef.current!.setColorAt(i, color);
            });

            collisionMeshRef.current.instanceMatrix.needsUpdate = true;
            if (collisionMeshRef.current.instanceColor) {
                collisionMeshRef.current.instanceColor.needsUpdate = true;
            }
        }
    });

    return (
        <group>
            {/* Reactant/Product molecules */}
            <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, particleCount]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshPhysicalMaterial
                    metalness={0.3}
                    roughness={0.4}
                    emissive="#00e5ff"
                    emissiveIntensity={0.5}
                />
            </instancedMesh>

            {/* Collision effects */}
            {showCollisions && (
                <instancedMesh ref={collisionMeshRef} args={[undefined, undefined, 50]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshBasicMaterial transparent opacity={0.8} />
                </instancedMesh>
            )}
        </group>
    );
}

// Energy diagram
function EnergyDiagram({ activationEnergy }: { activationEnergy: number }) {
    const points = useMemo(() => {
        const curve: THREE.Vector3[] = [];
        const steps = 50;

        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = t * 8 - 4;

            // Energy profile: reactants -> transition state -> products
            let y;
            if (t < 0.5) {
                // Going up to transition state
                y = -2 + (activationEnergy / 50) * Math.sin(t * Math.PI);
            } else {
                // Going down to products
                y = -2 + (activationEnergy / 50) * Math.sin(t * Math.PI) - 1;
            }

            curve.push(new THREE.Vector3(x, y, -6));
        }

        return curve;
    }, [activationEnergy]);

    return (
        <group>
            {/* Energy curve */}
            <mesh>
                <tubeGeometry args={[new THREE.CatmullRomCurve3(points), 50, 0.05, 8, false]} />
                <meshBasicMaterial color="#a855f7" />
            </mesh>

            {/* Activation energy label */}
            <mesh position={[0, -2 + activationEnergy / 100, -6]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshBasicMaterial color="#ff2d7d" />
            </mesh>
        </group>
    );
}

function KineticsScene(props: KineticsCanvasProps) {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

            {/* Reaction chamber */}
            <mesh>
                <boxGeometry args={[10, 10, 10]} />
                <meshPhysicalMaterial
                    color="#001122"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            <Molecules {...props} />
            <EnergyDiagram activationEnergy={props.activationEnergy} />

            {/* Grid */}
            <gridHelper args={[10, 10, "#00e5ff", "#003344"]} position={[0, -5, 0]} />
        </>
    );
}

export default function KineticsCanvas(props: KineticsCanvasProps) {
    return (
        <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
            <color attach="background" args={["#000000"]} />
            <KineticsScene {...props} />
            <OrbitControls enablePan={false} minDistance={5} maxDistance={20} />
        </Canvas>
    );
}
