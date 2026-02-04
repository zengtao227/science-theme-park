"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export type PhysicsBody = {
  id: string;
  type: 'box' | 'circle' | 'ground';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  mass?: number;
  friction?: number;
  restitution?: number;
  isStatic?: boolean;
  color?: string;
};

export type Force = {
  bodyId: string;
  force: { x: number; y: number };
  point?: { x: number; y: number };
};

export type PhysicsState = {
  bodies: Array<{
    id: string;
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    angle: number;
  }>;
};

interface PhysicsSimulatorProps {
  width?: number;
  height?: number;
  gravity?: { x: number; y: number };
  bodies: PhysicsBody[];
  forces?: Force[];
  onUpdate?: (state: PhysicsState) => void;
  showVectors?: boolean;
}

export function PhysicsSimulator({
  width = 600,
  height = 400,
  gravity = { x: 0, y: 1 },
  bodies,
  forces = [],
  onUpdate,
  showVectors = true
}: PhysicsSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const bodyMapRef = useRef<Map<string, Matter.Body>>(new Map());
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = Matter.Engine.create();
    engine.gravity.x = gravity.x;
    engine.gravity.y = gravity.y;
    engineRef.current = engine;

    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: '#0a0a0a',
      }
    });
    renderRef.current = render;

    bodyMapRef.current.clear();
    bodies.forEach(bodyDef => {
      let body: Matter.Body;

      if (bodyDef.type === 'box') {
        body = Matter.Bodies.rectangle(
          bodyDef.x,
          bodyDef.y,
          bodyDef.width || 50,
          bodyDef.height || 50,
          {
            mass: bodyDef.mass || 1,
            friction: bodyDef.friction || 0.3,
            restitution: bodyDef.restitution || 0.5,
            isStatic: bodyDef.isStatic || false,
            render: {
              fillStyle: bodyDef.color || 'rgba(57, 255, 20, 0.8)',
              strokeStyle: 'rgba(255, 255, 255, 0.5)',
              lineWidth: 2
            }
          }
        );
      } else if (bodyDef.type === 'circle') {
        body = Matter.Bodies.circle(
          bodyDef.x,
          bodyDef.y,
          bodyDef.radius || 25,
          {
            mass: bodyDef.mass || 1,
            friction: bodyDef.friction || 0.3,
            restitution: bodyDef.restitution || 0.5,
            isStatic: bodyDef.isStatic || false,
            render: {
              fillStyle: bodyDef.color || 'rgba(57, 255, 20, 0.8)',
              strokeStyle: 'rgba(255, 255, 255, 0.5)',
              lineWidth: 2
            }
          }
        );
      } else if (bodyDef.type === 'ground') {
        body = Matter.Bodies.rectangle(
          bodyDef.x,
          bodyDef.y,
          bodyDef.width || width,
          bodyDef.height || 20,
          {
            isStatic: true,
            render: {
              fillStyle: 'rgba(255, 255, 255, 0.1)',
              strokeStyle: 'rgba(255, 255, 255, 0.3)',
              lineWidth: 2
            }
          }
        );
      } else {
        return;
      }

      bodyMapRef.current.set(bodyDef.id, body);
      Matter.World.add(engine.world, body);
    });

    forces.forEach(force => {
      const body = bodyMapRef.current.get(force.bodyId);
      if (body) {
        Matter.Body.applyForce(
          body,
          force.point || body.position,
          force.force
        );
      }
    });

    Matter.Render.run(render);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    Matter.Events.on(engine, 'afterUpdate', () => {
      if (onUpdate && !isPaused) {
        const state: PhysicsState = {
          bodies: Array.from(bodyMapRef.current.entries()).map(([id, body]) => ({
            id,
            position: { x: body.position.x, y: body.position.y },
            velocity: { x: body.velocity.x, y: body.velocity.y },
            angle: body.angle
          }))
        };
        onUpdate(state);
      }
    });

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [bodies, forces, gravity, width, height, onUpdate, isPaused]);

  useEffect(() => {
    if (!engineRef.current) return;

    forces.forEach(force => {
      const body = bodyMapRef.current.get(force.bodyId);
      if (body) {
        Matter.Body.applyForce(
          body,
          force.point || body.position,
          force.force
        );
      }
    });
  }, [forces]);

  const handleReset = () => {
    if (!engineRef.current) return;

    bodies.forEach(bodyDef => {
      const body = bodyMapRef.current.get(bodyDef.id);
      if (body && !bodyDef.isStatic) {
        Matter.Body.setPosition(body, { x: bodyDef.x, y: bodyDef.y });
        Matter.Body.setVelocity(body, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(body, 0);
        Matter.Body.setAngle(body, 0);
      }
    });
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    if (engineRef.current) {
      engineRef.current.timing.timeScale = isPaused ? 1 : 0;
    }
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="border border-white/10 rounded-lg"
      />

      <div className="absolute top-2 left-2 flex gap-2">
        <button
          onClick={togglePause}
          className="px-3 py-1 bg-black/80 border border-white/30 text-white text-[10px] font-black uppercase tracking-wider hover:border-white/50 transition-all"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-black/80 border border-white/30 text-white text-[10px] font-black uppercase tracking-wider hover:border-white/50 transition-all"
        >
          Reset
        </button>
      </div>

      <div className="absolute top-2 right-2 text-[9px] font-mono text-white/30 pointer-events-none">
        PHYSICS ENGINE
      </div>
    </div>
  );
}
