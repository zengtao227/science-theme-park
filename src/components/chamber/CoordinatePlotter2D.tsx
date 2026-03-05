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

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, rect.width, rect.height);

    const points2D = (data.points || [])
      .filter((point) => point.coordinates.length === 2)
      .map((point) => ({
        x: point.coordinates[0],
        y: point.coordinates[1],
      }));
    const lines2D = (data.lines || []).filter((line) => line.type === "2D");

    const sampledLinePoints = lines2D.flatMap((line) => {
      const baseT = Math.max(
        8,
        Math.abs(line.point.x) + Math.abs(line.point.y) + Math.abs(line.direction.x) + Math.abs(line.direction.y)
      );
      return [
        { x: line.point.x - line.direction.x * baseT, y: line.point.y - line.direction.y * baseT },
        { x: line.point.x + line.direction.x * baseT, y: line.point.y + line.direction.y * baseT },
      ];
    });

    const worldPoints = [...points2D, ...sampledLinePoints];
    const fallbackBounds = { minX: -10, maxX: 10, minY: -10, maxY: 10 };
    const rawBounds = worldPoints.length
      ? {
          minX: Math.min(...worldPoints.map((p) => p.x)),
          maxX: Math.max(...worldPoints.map((p) => p.x)),
          minY: Math.min(...worldPoints.map((p) => p.y)),
          maxY: Math.max(...worldPoints.map((p) => p.y)),
        }
      : fallbackBounds;

    const rangeX = Math.max(2, rawBounds.maxX - rawBounds.minX);
    const rangeY = Math.max(2, rawBounds.maxY - rawBounds.minY);
    const paddingFactor = 0.2;
    const expanded = {
      minX: rawBounds.minX - rangeX * paddingFactor,
      maxX: rawBounds.maxX + rangeX * paddingFactor,
      minY: rawBounds.minY - rangeY * paddingFactor,
      maxY: rawBounds.maxY + rangeY * paddingFactor,
    };

    const worldCenterX = (expanded.minX + expanded.maxX) / 2;
    const worldCenterY = (expanded.minY + expanded.maxY) / 2;
    const worldRangeX = Math.max(2, expanded.maxX - expanded.minX);
    const worldRangeY = Math.max(2, expanded.maxY - expanded.minY);
    const scale = Math.min(rect.width / worldRangeX, rect.height / worldRangeY) * 0.82;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const toCanvas = (x: number, y: number) => ({
      x: centerX + (x - worldCenterX) * scale,
      y: centerY - (y - worldCenterY) * scale,
    });

    const chooseGridStep = (span: number) => {
      const rough = span / 10;
      const magnitude = Math.pow(10, Math.floor(Math.log10(Math.max(rough, 1e-6))));
      const normalized = rough / magnitude;
      if (normalized <= 1) return 1 * magnitude;
      if (normalized <= 2) return 2 * magnitude;
      if (normalized <= 5) return 5 * magnitude;
      return 10 * magnitude;
    };

    const gridStep = chooseGridStep(Math.max(worldRangeX, worldRangeY));

    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 0.5;
    for (
      let x = Math.ceil(expanded.minX / gridStep) * gridStep;
      x <= expanded.maxX;
      x += gridStep
    ) {
      const canvasX = toCanvas(x, 0).x;
      ctx.beginPath();
      ctx.moveTo(canvasX, 0);
      ctx.lineTo(canvasX, rect.height);
      ctx.stroke();
    }

    for (
      let y = Math.ceil(expanded.minY / gridStep) * gridStep;
      y <= expanded.maxY;
      y += gridStep
    ) {
      const canvasY = toCanvas(0, y).y;
      ctx.beginPath();
      ctx.moveTo(0, canvasY);
      ctx.lineTo(rect.width, canvasY);
      ctx.stroke();
    }

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;

    const xAxisVisible = expanded.minY <= 0 && expanded.maxY >= 0;
    const yAxisVisible = expanded.minX <= 0 && expanded.maxX >= 0;
    const originCanvas = toCanvas(0, 0);

    if (xAxisVisible) {
      const y0 = originCanvas.y;
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.lineTo(rect.width, y0);
      ctx.stroke();
    }
    if (yAxisVisible) {
      const x0 = originCanvas.x;
      ctx.beginPath();
      ctx.moveTo(x0, 0);
      ctx.lineTo(x0, rect.height);
      ctx.stroke();
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "12px monospace";
    if (xAxisVisible) {
      const y0 = originCanvas.y;
      ctx.fillText("x", rect.width - 20, Math.max(16, Math.min(rect.height - 8, y0 - 8)));
    }
    if (yAxisVisible) {
      const x0 = originCanvas.x;
      ctx.fillText("y", Math.max(8, Math.min(rect.width - 16, x0 + 8)), 18);
    }

    for (
      let x = Math.ceil(expanded.minX / gridStep) * gridStep;
      x <= expanded.maxX;
      x += gridStep
    ) {
      if (Math.abs(x) < 1e-10) continue;
      const canvasPoint = toCanvas(x, 0);
      ctx.fillStyle = "#a3a3a3";
      ctx.font = "10px monospace";
      const labelY = Math.max(12, Math.min(rect.height - 4, originCanvas.y + 14));
      ctx.fillText(String(Number(x.toFixed(3))), canvasPoint.x + 2, labelY);
    }

    for (
      let y = Math.ceil(expanded.minY / gridStep) * gridStep;
      y <= expanded.maxY;
      y += gridStep
    ) {
      if (Math.abs(y) < 1e-10) continue;
      const canvasPoint = toCanvas(0, y);
      ctx.fillStyle = "#a3a3a3";
      ctx.font = "10px monospace";
      const labelX = Math.max(2, Math.min(rect.width - 36, originCanvas.x + 6));
      ctx.fillText(String(Number(y.toFixed(3))), labelX, canvasPoint.y - 2);
    }

    lines2D.forEach((line) => {
      const directionNorm = Math.max(Math.abs(line.direction.x), Math.abs(line.direction.y), 1e-6);
      const extend = (Math.max(worldRangeX, worldRangeY) * 1.5) / directionNorm;
      const start = {
        x: line.point.x - line.direction.x * extend,
        y: line.point.y - line.direction.y * extend,
      };
      const end = {
        x: line.point.x + line.direction.x * extend,
        y: line.point.y + line.direction.y * extend,
      };
      const canvasStart = toCanvas(start.x, start.y);
      const canvasEnd = toCanvas(end.x, end.y);

      ctx.strokeStyle = line.color;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(canvasStart.x, canvasStart.y);
      ctx.lineTo(canvasEnd.x, canvasEnd.y);
      ctx.stroke();
    });

    (data.points || []).forEach((point) => {
      if (point.coordinates.length !== 2) return;
      const [x, y] = point.coordinates;
      const canvasPoint = toCanvas(x, y);

      ctx.fillStyle = point.color;
      ctx.beginPath();
      ctx.arc(canvasPoint.x, canvasPoint.y, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "10px monospace";
      ctx.fillText(point.label, canvasPoint.x + 8, canvasPoint.y - 8);
    });
  }, [data]);

  return (
    <div className="w-full h-full min-h-[560px] border border-white/10 rounded-xl overflow-hidden bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
