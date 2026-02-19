"use client";

import { useEffect, useRef } from "react";
import { GeometryData } from "@/lib/gm2-02-types";

interface CoordinatePlotter2DProps {
  data: GeometryData;
}

export default function CoordinatePlotter2D({ data }: CoordinatePlotter2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Set up coordinate system
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const scale = 30; // pixels per unit

    // Draw grid
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 0.5;
    for (let i = -10; i <= 10; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(centerX + i * scale, 0);
      ctx.lineTo(centerX + i * scale, rect.height);
      ctx.stroke();

      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, centerY + i * scale);
      ctx.lineTo(rect.width, centerY + i * scale);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(rect.width, centerY);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, rect.height);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = "#ffffff";
    ctx.font = "12px monospace";
    ctx.fillText("x", rect.width - 20, centerY - 10);
    ctx.fillText("y", centerX + 10, 20);

    // Draw lines
    if (data.lines) {
      data.lines.forEach(line => {
        if (line.type === "2D") {
          ctx.strokeStyle = line.color;
          ctx.lineWidth = 2;
          ctx.beginPath();

          // Draw line from left to right edge
          const x1 = -rect.width / (2 * scale);
          const y1 = line.point.y + (line.direction.y / line.direction.x) * (x1 - line.point.x);
          const x2 = rect.width / (2 * scale);
          const y2 = line.point.y + (line.direction.y / line.direction.x) * (x2 - line.point.x);

          ctx.moveTo(centerX + x1 * scale, centerY - y1 * scale);
          ctx.lineTo(centerX + x2 * scale, centerY - y2 * scale);
          ctx.stroke();
        }
      });
    }

    // Draw points
    if (data.points) {
      data.points.forEach(point => {
        if (point.coordinates.length === 2) {
          const [x, y] = point.coordinates;
          ctx.fillStyle = point.color;
          ctx.beginPath();
          ctx.arc(centerX + x * scale, centerY - y * scale, 5, 0, 2 * Math.PI);
          ctx.fill();

          // Draw label
          ctx.fillStyle = "#ffffff";
          ctx.font = "10px monospace";
          ctx.fillText(point.label, centerX + x * scale + 8, centerY - y * scale - 8);
        }
      });
    }
  }, [data]);

  return (
    <div className="w-full h-full min-h-[400px] border border-white/10 rounded-xl overflow-hidden bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
