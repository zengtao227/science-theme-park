"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

interface PythagorasFluidCanvasProps {
  a: number;
  b: number;
  c: number;
  highlightRightAngle?: boolean;
}

/**
 * Fluid-based Pythagoras visualization using Matter.js
 * Demonstrates a² + b² = c² through liquid flow between containers
 */
export default function PythagorasFluidCanvas({
  a,
  b,
  c,
  highlightRightAngle = true,
}: PythagorasFluidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [fps, setFps] = useState(60);
  const [isRotating, setIsRotating] = useState(false);
  const rotationRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = 800;
    const height = 800;

    // Create engine with optimized settings
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });
    
    // Optimize collision detection
    engine.constraintIterations = 2;
    engine.positionIterations = 6;
    engine.velocityIterations = 4;
    
    engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });
    renderRef.current = render;

    // Scale factor for visualization
    const scale = Math.min(width, height) / (Math.max(a, b, c) * 3.5);
    const centerX = width / 2;
    const centerY = height / 2;

    // Container dimensions
    const aSize = a * scale;
    const bSize = b * scale;
    const cSize = c * scale;
    const wallThickness = 5;

    // Position containers to show Pythagorean relationship
    // Container A (left side, representing a²)
    const containerAX = centerX - cSize / 2 - aSize / 2 - 20;
    const containerAY = centerY;
    
    // Container B (bottom, representing b²)
    const containerBX = centerX;
    const containerBY = centerY + cSize / 2 + bSize / 2 + 20;
    
    // Container C (center-right, representing c²)
    const containerCX = centerX + cSize / 2 + 20;
    const containerCY = centerY;

    // Create containers (hollow squares)
    const createContainer = (x: number, y: number, size: number, color: string) => {
      const walls = [
        // Bottom
        Matter.Bodies.rectangle(x, y + size / 2, size, wallThickness, {
          isStatic: true,
          render: { fillStyle: color },
          collisionFilter: { category: 0x0001, mask: 0x0002 },
        }),
        // Left
        Matter.Bodies.rectangle(x - size / 2, y, wallThickness, size, {
          isStatic: true,
          render: { fillStyle: color },
          collisionFilter: { category: 0x0001, mask: 0x0002 },
        }),
        // Right
        Matter.Bodies.rectangle(x + size / 2, y, wallThickness, size, {
          isStatic: true,
          render: { fillStyle: color },
          collisionFilter: { category: 0x0001, mask: 0x0002 },
        }),
        // Top (initially open for filling)
        Matter.Bodies.rectangle(x, y - size / 2, size, wallThickness, {
          isStatic: true,
          render: { fillStyle: color, opacity: 0.3 },
          collisionFilter: { category: 0x0001, mask: 0x0002 },
        }),
      ];
      return walls;
    };

    // Position containers around triangle vertices
    // Container A (left, vertical)
    const containerA = createContainer(
      containerAX,
      containerAY,
      aSize,
      "#ff3131"
    );
    // Container B (bottom, horizontal)
    const containerB = createContainer(
      containerBX,
      containerBY,
      bSize,
      "#3b82f6"
    );
    // Container C (right, diagonal position)
    const containerC = createContainer(
      containerCX,
      containerCY,
      cSize,
      "#a855f7"
    );

    // Create fluid particles
    const createParticles = (
      x: number,
      y: number,
      size: number,
      count: number,
      color: string
    ) => {
      const particles: Matter.Body[] = [];
      const particleRadius = 3;
      const cols = Math.floor(size / (particleRadius * 3));
      const rows = Math.ceil(count / cols);

      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const px = x - size / 2 + col * (particleRadius * 3) + particleRadius * 2;
        const py = y - size / 2 + row * (particleRadius * 3) + particleRadius * 2;

        if (py < y + size / 2 - particleRadius * 2) {
          const particle = Matter.Bodies.circle(px, py, particleRadius, {
            restitution: 0.2,
            friction: 0.01,
            density: 0.001,
            render: { fillStyle: color },
            collisionFilter: { category: 0x0002, mask: 0x0001 | 0x0002 },
          });
          particles.push(particle);
        }
      }
      return particles;
    };

    // Calculate particle counts based on area
    const totalParticles = 150;
    const areaTotal = a * a + b * b;
    const particlesA = Math.floor((a * a / areaTotal) * totalParticles);
    const particlesB = totalParticles - particlesA;

    const particlesInA = createParticles(
      containerAX,
      containerAY,
      aSize,
      particlesA,
      "#ff6b6b"
    );

    const particlesInB = createParticles(
      containerBX,
      containerBY,
      bSize,
      particlesB,
      "#4dabf7"
    );

    // Add all bodies to world
    Matter.Composite.add(engine.world, [
      ...containerA,
      ...containerB,
      ...containerC,
      ...particlesInA,
      ...particlesInB,
    ]);

    // Create runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // FPS counter
    let lastTime = performance.now();
    let frameCount = 0;
    const fpsInterval = setInterval(() => {
      const now = performance.now();
      const delta = now - lastTime;
      const currentFps = Math.round((frameCount * 1000) / delta);
      setFps(currentFps);
      frameCount = 0;
      lastTime = now;
    }, 1000);

    Matter.Events.on(engine, "afterUpdate", () => {
      frameCount++;
    });

    // Cleanup
    return () => {
      clearInterval(fpsInterval);
      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
      }
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, [a, b, c]);

  // Rotation handler
  const handleMouseDown = () => {
    setIsRotating(true);
  };

  const handleMouseUp = () => {
    setIsRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isRotating || !engineRef.current) return;

    const deltaX = e.movementX;
    rotationRef.current += deltaX * 0.01;

    // Apply rotation to gravity
    const angle = rotationRef.current;
    engineRef.current.gravity.x = Math.sin(angle);
    engineRef.current.gravity.y = Math.cos(angle);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full h-auto cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      
      {/* Container Labels */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 text-white/60 text-xs font-mono">
        a²
      </div>
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono">
        b²
      </div>
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 text-white/60 text-xs font-mono">
        c²
      </div>
      
      {/* FPS Counter */}
      <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white font-mono">
        {fps} FPS
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-2 bg-black/50 px-3 py-2 rounded text-xs text-white/80">
        Drag to rotate • Watch fluid flow prove a² + b² = c²
      </div>
    </div>
  );
}
