/**
 * Matter.js utility wrapper for physics simulations
 * Provides helper functions for common physics operations
 */

import Matter from 'matter-js';

export type { Engine, World, Body, Bodies, Constraint, Vector } from 'matter-js';

/**
 * Create a Matter.js engine with optimized settings
 */
export function createEngine(options?: Matter.IEngineDefinition): Matter.Engine {
  const engine = Matter.Engine.create(options);
  
  // Optimize for performance
  engine.gravity.y = 1; // Standard gravity
  engine.timing.timeScale = 1;
  
  return engine;
}

/**
 * Create a rectangular container (hollow box)
 */
export function createContainer(
  x: number,
  y: number,
  width: number,
  height: number,
  wallThickness: number = 5
): Matter.Body[] {
  const Bodies = Matter.Bodies;
  
  const walls = [
    // Bottom
    Bodies.rectangle(x, y + height / 2, width, wallThickness, { isStatic: true }),
    // Left
    Bodies.rectangle(x - width / 2, y, wallThickness, height, { isStatic: true }),
    // Right
    Bodies.rectangle(x + width / 2, y, wallThickness, height, { isStatic: true }),
  ];
  
  return walls;
}

/**
 * Create fluid particles within a container
 */
export function createFluidParticles(
  x: number,
  y: number,
  width: number,
  height: number,
  particleRadius: number,
  particleCount: number,
  color: string = '#3b82f6'
): Matter.Body[] {
  const Bodies = Matter.Bodies;
  const particles: Matter.Body[] = [];
  
  const cols = Math.floor(width / (particleRadius * 2.5));
  const rows = Math.ceil(particleCount / cols);
  
  for (let i = 0; i < particleCount; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    
    const px = x - width / 2 + col * (particleRadius * 2.5) + particleRadius;
    const py = y - height / 2 + row * (particleRadius * 2.5) + particleRadius;
    
    if (py < y + height / 2) {
      const particle = Bodies.circle(px, py, particleRadius, {
        restitution: 0.3,
        friction: 0.01,
        density: 0.001,
        render: {
          fillStyle: color,
        },
      });
      
      particles.push(particle);
    }
  }
  
  return particles;
}

/**
 * Apply rotation to a group of bodies around a pivot point
 */
export function rotateBodyGroup(
  bodies: Matter.Body[],
  pivotX: number,
  pivotY: number,
  angle: number
): void {
  const Body = Matter.Body;
  
  bodies.forEach((body) => {
    // Calculate position relative to pivot
    const dx = body.position.x - pivotX;
    const dy = body.position.y - pivotY;
    
    // Rotate around pivot
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    const newX = pivotX + (dx * cos - dy * sin);
    const newY = pivotY + (dx * sin + dy * cos);
    
    Body.setPosition(body, { x: newX, y: newY });
    Body.setAngle(body, body.angle + angle);
  });
}

/**
 * Clean up Matter.js engine and world
 */
export function cleanupEngine(engine: Matter.Engine): void {
  Matter.World.clear(engine.world, false);
  Matter.Engine.clear(engine);
}

/**
 * Get all bodies within a rectangular region
 */
export function getBodiesInRegion(
  world: Matter.World,
  x: number,
  y: number,
  width: number,
  height: number
): Matter.Body[] {
  const bodies = Matter.Composite.allBodies(world);
  
  return bodies.filter((body) => {
    const pos = body.position;
    return (
      pos.x >= x - width / 2 &&
      pos.x <= x + width / 2 &&
      pos.y >= y - height / 2 &&
      pos.y <= y + height / 2
    );
  });
}
