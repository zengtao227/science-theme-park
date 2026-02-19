'use client';

/**
 * SP1.01 - Forces Basics Module
 * Force Vector Diagram - Interactive visualization
 */

import React, { useState, useRef, useEffect } from 'react';
import { Force } from '@/lib/sp1-01/domain/types';
import { decomposeVector } from '@/lib/sp1-01/domain/physics';

interface ForceVectorDiagramProps {
  initialForce?: Force;
  onForceChange?: (force: Force) => void;
  interactive?: boolean;
  width?: number;
  height?: number;
  showGrid?: boolean;
  showComponents?: boolean;
}

/**
 * Interactive Force Vector Diagram
 * Displays a force vector with magnitude, direction, and components
 */
export function ForceVectorDiagram({
  initialForce = { magnitude: 100, angle: 45 },
  onForceChange,
  interactive = true,
  width = 400,
  height = 400,
  showGrid = true,
  showComponents = true,
}: ForceVectorDiagramProps) {
  const [force, setForce] = useState<Force>(initialForce);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 2; // pixels per Newton

  // Update force and notify parent
  const updateForce = (newForce: Force) => {
    setForce(newForce);
    if (onForceChange) {
      onForceChange(newForce);
    }
  };

  // Draw the diagram
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    if (showGrid) {
      drawGrid(ctx);
    }

    // Draw axes
    drawAxes(ctx);

    // Draw force vector
    drawForceVector(ctx, force);

    // Draw components
    if (showComponents) {
      drawComponents(ctx, force);
    }
  }, [force, width, height, showGrid, showComponents]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;

    // Vertical lines
    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Arrowheads
    drawArrowhead(ctx, width - 10, centerY, 0);
    drawArrowhead(ctx, centerX, 10, 90);

    // Labels
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.fillText('x', width - 20, centerY + 20);
    ctx.fillText('y', centerX + 10, 20);
  };

  const drawForceVector = (ctx: CanvasRenderingContext2D, f: Force) => {
    const angleRad = (f.angle * Math.PI) / 180;
    const endX = centerX + f.magnitude * scale * Math.cos(angleRad);
    const endY = centerY - f.magnitude * scale * Math.sin(angleRad);

    // Draw vector line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Draw arrowhead
    ctx.fillStyle = '#2563eb';
    drawArrowhead(ctx, endX, endY, f.angle);

    // Draw magnitude label
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 14px Arial';
    const labelX = centerX + (f.magnitude * scale * Math.cos(angleRad)) / 2;
    const labelY = centerY - (f.magnitude * scale * Math.sin(angleRad)) / 2;
    ctx.fillText(`F = ${f.magnitude.toFixed(1)} N`, labelX + 10, labelY - 10);
  };

  const drawComponents = (ctx: CanvasRenderingContext2D, f: Force) => {
    const components = decomposeVector(f);
    const endX = centerX + components.x * scale;
    const endY = centerY - components.y * scale;

    // X component (red)
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, centerY);
    ctx.stroke();

    // Y component (green)
    ctx.strokeStyle = '#16a34a';
    ctx.beginPath();
    ctx.moveTo(endX, centerY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Component labels
    ctx.font = '12px Arial';
    ctx.fillStyle = '#dc2626';
    ctx.fillText(`Fx = ${components.x.toFixed(1)} N`, endX / 2 + centerX / 2, centerY + 20);
    ctx.fillStyle = '#16a34a';
    ctx.fillText(`Fy = ${components.y.toFixed(1)} N`, endX + 10, (endY + centerY) / 2);
  };

  const drawArrowhead = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number
  ) => {
    const angleRad = (angle * Math.PI) / 180;
    const size = 10;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-angleRad);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, -size / 2);
    ctx.lineTo(-size, size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive || !isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - centerX;
    const y = centerY - (e.clientY - rect.top);

    const magnitude = Math.sqrt(x * x + y * y) / scale;
    const angle = (Math.atan2(y, x) * 180) / Math.PI;

    updateForce({
      ...force,
      magnitude: Math.max(0, Math.min(magnitude, 150)),
      angle: angle < 0 ? angle + 360 : angle,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="flex gap-4 text-sm">
        <div>
          <strong>Magnitude:</strong> {force.magnitude.toFixed(1)} N
        </div>
        <div>
          <strong>Angle:</strong> {force.angle.toFixed(1)}°
        </div>
      </div>
    </div>
  );
}
