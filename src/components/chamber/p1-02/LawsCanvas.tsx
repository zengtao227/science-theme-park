"use client";

import { PhysicsSimulator, PhysicsBody, Force } from "@/components/PhysicsSimulator";

interface P102CanvasProps {
  scenario: "friction" | "acceleration" | "collision";
  mass: number;
  friction: number;
  forceX: number;
  initialVelocity?: number;
  gravity?: number;
}

export default function P102LawsCanvas({
  scenario,
  mass,
  friction,
  forceX,
  initialVelocity = 0,
  gravity = 1,
}: P102CanvasProps) {
  const bodies: PhysicsBody[] = [
    {
      id: 'ground',
      type: 'ground',
      x: 300,
      y: 380,
      width: 600,
      height: 20,
      isStatic: true,
    },
    {
      id: 'box',
      type: 'box',
      x: 100,
      y: 200,
      width: 50,
      height: 50,
      mass: mass,
      friction: friction,
      restitution: scenario === "collision" ? 0.2 : 0.3,
      color: 'rgba(57, 255, 20, 0.8)',
      initialVelocity: scenario === "collision" ? { x: initialVelocity, y: 0 } : undefined,
    },
  ];

  // Add obstacle for collision scenario
  if (scenario === "collision") {
    bodies.push({
      id: 'obstacle',
      type: 'box',
      x: 450,
      y: 330,
      width: 40,
      height: 80,
      isStatic: true,
      color: 'rgba(255, 0, 85, 0.8)',
    });
  }

  // For collision scenario, use initial velocity instead of continuous force
  const forces: Force[] = (forceX !== 0 && scenario !== "collision") ? [
    {
      bodyId: 'box',
      force: { x: forceX, y: 0 },
    },
  ] : [];

  return (
    <div className="space-y-4">
      <PhysicsSimulator
        width={600}
        height={400}
        gravity={{ x: 0, y: gravity }}
        bodies={bodies}
        forces={forces}
      />
      
      <div className="text-center text-[10px] text-white/40 font-mono uppercase tracking-wider">
        {scenario === "friction" && "Friction Challenge"}
        {scenario === "acceleration" && "F = ma Challenge"}
        {scenario === "collision" && "Collision Prediction"}
      </div>
    </div>
  );
}
