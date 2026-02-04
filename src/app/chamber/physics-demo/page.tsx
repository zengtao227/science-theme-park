"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PhysicsSimulator, PhysicsBody, Force, PhysicsState } from "@/components/PhysicsSimulator";

export default function PhysicsDemoPage() {
  const [mass, setMass] = useState(2);
  const [forceX, setForceX] = useState(0.01);
  const [friction, setFriction] = useState(0.3);
  const [restitution, setRestitution] = useState(0.5);
  const [physicsState, setPhysicsState] = useState<PhysicsState | null>(null);

  const bodies: PhysicsBody[] = [
    {
      id: 'ground',
      type: 'ground',
      x: 300,
      y: 380,
      width: 600,
      height: 20,
      isStatic: true
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
      restitution: restitution,
      color: 'rgba(57, 255, 20, 0.8)'
    }
  ];

  const forces: Force[] = forceX !== 0 ? [
    {
      bodyId: 'box',
      force: { x: forceX, y: 0 }
    }
  ] : [];

  const boxState = physicsState?.bodies.find(b => b.id === 'box');

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col font-mono">
      <header className="relative p-4 border-b-2 border-white flex justify-between items-center bg-black z-30 shadow-2xl h-20">
        <Link href="/" className="flex items-center gap-2 px-3 py-1.5 hover:text-white text-white/70 transition-all group z-10">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black tracking-[0.2em] uppercase">Back</span>
        </Link>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-lg font-black tracking-[0.35em] uppercase text-white shadow-neon text-nowrap">
            PHYSICS ENGINE DEMO
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 p-6 flex flex-col gap-4 bg-black z-10 overflow-y-auto">
          <div className="w-full max-w-5xl mx-auto space-y-6">
            <div className="text-center">
              <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">Objective</h3>
              <p className="text-2xl text-white font-black max-w-3xl mx-auto leading-tight">
                Explore Newton&apos;s Second Law: F = ma
              </p>
            </div>

            <div className="flex justify-center">
              <PhysicsSimulator
                width={600}
                height={400}
                gravity={{ x: 0, y: 1 }}
                bodies={bodies}
                forces={forces}
                onUpdate={setPhysicsState}
                showVectors={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">Control Panel</div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-white/70 block mb-2">Mass (kg): {mass.toFixed(1)}</label>
                    <input
                      type="range"
                      min="0.5"
                      max="10"
                      step="0.5"
                      value={mass}
                      onChange={(e) => setMass(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/70 block mb-2">Force X (N): {(forceX * 1000).toFixed(1)}</label>
                    <input
                      type="range"
                      min="0"
                      max="0.05"
                      step="0.001"
                      value={forceX}
                      onChange={(e) => setForceX(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/70 block mb-2">Friction: {friction.toFixed(2)}</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={friction}
                      onChange={(e) => setFriction(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/70 block mb-2">Restitution: {restitution.toFixed(2)}</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={restitution}
                      onChange={(e) => setRestitution(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">Physics Data</div>
                
                {boxState && (
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-white/50">Position X:</span>
                      <span className="text-white">{boxState.position.x.toFixed(2)} px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Position Y:</span>
                      <span className="text-white">{boxState.position.y.toFixed(2)} px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Velocity X:</span>
                      <span className="text-white">{boxState.velocity.x.toFixed(2)} m/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Velocity Y:</span>
                      <span className="text-white">{boxState.velocity.y.toFixed(2)} m/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Angle:</span>
                      <span className="text-white">{(boxState.angle * 180 / Math.PI).toFixed(1)}°</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="p-3 border-t-2 border-white bg-black text-[10px] font-black flex justify-between tracking-[0.4em] text-white/80 uppercase">
        <span>Physics Engine Demo</span>
        <span>Matter.js Integration</span>
      </footer>
    </div>
  );
}
