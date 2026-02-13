"use client";

import { useMemo } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface ComplexQuest {
  z1?: { re: number; im: number };
  z2?: { re: number; im: number };
  operation?: "add" | "multiply" | "power" | "polar";
  power?: number;
  expressionLatex: string;
}

interface ComplexVisualizationProps {
  quest: ComplexQuest | null;
  checkStatus: "correct" | "incorrect" | null;
}

function ComplexPlane2D({ quest }: { quest: ComplexQuest }) {
  const canvasSize = 500;
  
  // Calculate bounds based on the complex numbers
  const bounds = useMemo(() => {
    const points: Array<{ re: number; im: number }> = [];
    
    if (quest.z1) points.push(quest.z1);
    if (quest.z2) points.push(quest.z2);
    
    // Calculate result
    if (quest.z1) {
      if (quest.operation === "add" && quest.z2) {
        points.push({
          re: quest.z1.re + quest.z2.re,
          im: quest.z1.im + quest.z2.im,
        });
      } else if (quest.operation === "multiply" && quest.z2) {
        points.push({
          re: quest.z1.re * quest.z2.re - quest.z1.im * quest.z2.im,
          im: quest.z1.re * quest.z2.im + quest.z1.im * quest.z2.re,
        });
      } else if (quest.operation === "power" && quest.power) {
        const r = Math.sqrt(quest.z1.re * quest.z1.re + quest.z1.im * quest.z1.im);
        const theta = Math.atan2(quest.z1.im, quest.z1.re);
        const newR = Math.pow(r, quest.power);
        const newTheta = theta * quest.power;
        points.push({
          re: newR * Math.cos(newTheta),
          im: newR * Math.sin(newTheta),
        });
      }
    }
    
    if (points.length === 0) {
      return { minRe: -5, maxRe: 5, minIm: -5, maxIm: 5 };
    }
    
    const reValues = points.map(p => p.re);
    const imValues = points.map(p => p.im);
    
    const minRe = Math.min(...reValues, 0);
    const maxRe = Math.max(...reValues, 0);
    const minIm = Math.min(...imValues, 0);
    const maxIm = Math.max(...imValues, 0);
    
    // Add MORE padding (50% instead of 30%) to ensure labels don't go outside
    const reRange = Math.max(maxRe - minRe, 2);
    const imRange = Math.max(maxIm - minIm, 2);
    const padding = 0.5; // Increased from 0.3
    
    return {
      minRe: minRe - reRange * padding,
      maxRe: maxRe + reRange * padding,
      minIm: minIm - imRange * padding,
      maxIm: maxIm + imRange * padding,
    };
  }, [quest]);
  
  // Calculate scale to fit all points
  const scale = useMemo(() => {
    const reRange = bounds.maxRe - bounds.minRe;
    const imRange = bounds.maxIm - bounds.minIm;
    const maxRange = Math.max(reRange, imRange, 10); // minimum range of 10
    return (canvasSize * 0.8) / maxRange;
  }, [bounds, canvasSize]);
  
  const origin = canvasSize / 2;

  const result = useMemo(() => {
    if (!quest.z1) return null;

    if (quest.operation === "add" && quest.z2) {
      return {
        re: quest.z1.re + quest.z2.re,
        im: quest.z1.im + quest.z2.im,
      };
    }

    if (quest.operation === "multiply" && quest.z2) {
      return {
        re: quest.z1.re * quest.z2.re - quest.z1.im * quest.z2.im,
        im: quest.z1.re * quest.z2.im + quest.z1.im * quest.z2.re,
      };
    }

    if (quest.operation === "power" && quest.power) {
      const r = Math.sqrt(quest.z1.re * quest.z1.re + quest.z1.im * quest.z1.im);
      const theta = Math.atan2(quest.z1.im, quest.z1.re);
      const newR = Math.pow(r, quest.power);
      const newTheta = theta * quest.power;
      return {
        re: newR * Math.cos(newTheta),
        im: newR * Math.sin(newTheta),
      };
    }

    return null;
  }, [quest]);

  const toCanvas = (re: number, im: number) => ({
    x: origin + re * scale,
    y: origin - im * scale, // flip Y axis
  });
  
  // Smart label positioning to avoid overlapping with lines and axes
  const getLabelOffset = (re: number, im: number, labelType: 'point' | 'side' = 'point') => {
    if (labelType === 'side') {
      // For side labels (a, b), offset perpendicular to the line
      if (Math.abs(im) < 0.5) {
        // Horizontal line, offset vertically
        return { dx: 0, dy: re > 0 ? 20 : -20 };
      } else {
        // Vertical line, offset horizontally
        return { dx: im > 0 ? 25 : -25, dy: 0 };
      }
    }
    
    // For point labels, offset diagonally away from origin
    const angle = Math.atan2(im, re);
    const distance = 25; // pixels
    
    // Adjust angle to avoid axes
    let adjustedAngle = angle;
    const threshold = Math.PI / 12; // 15 degrees
    
    // Avoid horizontal axis
    if (Math.abs(angle) < threshold) {
      adjustedAngle = threshold;
    } else if (Math.abs(angle - Math.PI) < threshold) {
      adjustedAngle = Math.PI - threshold;
    } else if (Math.abs(angle + Math.PI) < threshold) {
      adjustedAngle = -Math.PI + threshold;
    }
    
    // Avoid vertical axis
    if (Math.abs(angle - Math.PI / 2) < threshold) {
      adjustedAngle = Math.PI / 2 + threshold;
    } else if (Math.abs(angle + Math.PI / 2) < threshold) {
      adjustedAngle = -Math.PI / 2 - threshold;
    }
    
    return {
      dx: Math.cos(adjustedAngle) * distance,
      dy: -Math.sin(adjustedAngle) * distance,
    };
  };
  
  // Calculate grid step size based on scale
  const gridStep = useMemo(() => {
    const range = Math.max(bounds.maxRe - bounds.minRe, bounds.maxIm - bounds.minIm);
    if (range > 50) return 10;
    if (range > 20) return 5;
    if (range > 10) return 2;
    return 1;
  }, [bounds]);

  return (
    <svg 
      width={canvasSize} 
      height={canvasSize} 
      className="bg-black/50 rounded-xl border border-white/10"
      viewBox={`0 0 ${canvasSize} ${canvasSize}`}
    >
      {/* Grid lines */}
      {Array.from({ length: 41 }, (_, i) => (i - 20) * gridStep).map((i) => (
        <g key={`grid-${i}`}>
          {/* Vertical lines */}
          <line
            x1={toCanvas(i, 0).x}
            y1={0}
            x2={toCanvas(i, 0).x}
            y2={canvasSize}
            stroke={i === 0 ? "#ff2d7d" : "#00e5ff"}
            strokeWidth={i === 0 ? 2 : 0.5}
            opacity={i === 0 ? 0.5 : 0.1}
          />
          {/* Horizontal lines */}
          <line
            x1={0}
            y1={toCanvas(0, i).y}
            x2={canvasSize}
            y2={toCanvas(0, i).y}
            stroke={i === 0 ? "#39ff14" : "#00e5ff"}
            strokeWidth={i === 0 ? 2 : 0.5}
            opacity={i === 0 ? 0.5 : 0.1}
          />
        </g>
      ))}

      {/* Axis labels */}
      <text x={canvasSize - 30} y={origin - 10} fill="white" fontSize="12" fontWeight="bold">
        Re
      </text>
      <text x={origin + 10} y={20} fill="white" fontSize="12" fontWeight="bold">
        Im
      </text>

      {/* BASICS: Show right triangle for magnitude */}
      {quest.operation === "polar" && quest.z1 && (
        <g>
          {/* Right triangle */}
          <line
            x1={origin}
            y1={origin}
            x2={toCanvas(quest.z1.re, 0).x}
            y2={toCanvas(quest.z1.re, 0).y}
            stroke="#ff2d7d"
            strokeWidth={2}
            strokeDasharray="5,5"
          />
          <line
            x1={toCanvas(quest.z1.re, 0).x}
            y1={toCanvas(quest.z1.re, 0).y}
            x2={toCanvas(quest.z1.re, quest.z1.im).x}
            y2={toCanvas(quest.z1.re, quest.z1.im).y}
            stroke="#39ff14"
            strokeWidth={2}
            strokeDasharray="5,5"
          />
          
          {/* Vector from origin to z */}
          <line
            x1={origin}
            y1={origin}
            x2={toCanvas(quest.z1.re, quest.z1.im).x}
            y2={toCanvas(quest.z1.re, quest.z1.im).y}
            stroke="#00e5ff"
            strokeWidth={3}
            markerEnd="url(#arrowhead-cyan)"
          />

          {/* Point at z */}
          <circle
            cx={toCanvas(quest.z1.re, quest.z1.im).x}
            cy={toCanvas(quest.z1.re, quest.z1.im).y}
            r={6}
            fill="#00e5ff"
          />

          {/* Labels with smart positioning */}
          {(() => {
            const aOffset = getLabelOffset(quest.z1.re / 2, 0, 'side');
            const bOffset = getLabelOffset(quest.z1.re, quest.z1.im / 2, 'side');
            const zOffset = getLabelOffset(quest.z1.re, quest.z1.im);
            
            return (
              <>
                {/* a label */}
                <text
                  x={toCanvas(quest.z1.re / 2, 0).x + aOffset.dx}
                  y={toCanvas(quest.z1.re / 2, 0).y + aOffset.dy}
                  fill="#ff2d7d"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  a = {quest.z1.re}
                </text>
                
                {/* b label */}
                <text
                  x={toCanvas(quest.z1.re, quest.z1.im / 2).x + bOffset.dx}
                  y={toCanvas(quest.z1.re, quest.z1.im / 2).y + bOffset.dy}
                  fill="#39ff14"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  b = {quest.z1.im}
                </text>
                
                {/* |z| label */}
                <text
                  x={toCanvas(quest.z1.re / 2, quest.z1.im / 2).x + zOffset.dx}
                  y={toCanvas(quest.z1.re / 2, quest.z1.im / 2).y + zOffset.dy}
                  fill="#00e5ff"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  |z|
                </text>
              </>
            );
          })()}
        </g>
      )}

      {/* OPERATIONS: Addition - parallelogram */}
      {quest.operation === "add" && quest.z1 && quest.z2 && result && (
        <g>
          {/* z1 vector */}
          <line
            x1={origin}
            y1={origin}
            x2={toCanvas(quest.z1.re, quest.z1.im).x}
            y2={toCanvas(quest.z1.re, quest.z1.im).y}
            stroke="#00e5ff"
            strokeWidth={3}
            markerEnd="url(#arrowhead-cyan)"
          />
          <circle
            cx={toCanvas(quest.z1.re, quest.z1.im).x}
            cy={toCanvas(quest.z1.re, quest.z1.im).y}
            r={5}
            fill="#00e5ff"
          />
          {(() => {
            const offset = getLabelOffset(quest.z1.re, quest.z1.im);
            return (
              <text
                x={toCanvas(quest.z1.re, quest.z1.im).x + offset.dx}
                y={toCanvas(quest.z1.re, quest.z1.im).y + offset.dy}
                fill="#00e5ff"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                z₁
              </text>
            );
          })()}

          {/* z2 vector from origin */}
          <line
            x1={origin}
            y1={origin}
            x2={toCanvas(quest.z2.re, quest.z2.im).x}
            y2={toCanvas(quest.z2.re, quest.z2.im).y}
            stroke="#39ff14"
            strokeWidth={3}
            markerEnd="url(#arrowhead-green)"
          />
          <circle
            cx={toCanvas(quest.z2.re, quest.z2.im).x}
            cy={toCanvas(quest.z2.re, quest.z2.im).y}
            r={5}
            fill="#39ff14"
          />
          {(() => {
            const offset = getLabelOffset(quest.z2.re, quest.z2.im);
            return (
              <text
                x={toCanvas(quest.z2.re, quest.z2.im).x + offset.dx}
                y={toCanvas(quest.z2.re, quest.z2.im).y + offset.dy}
                fill="#39ff14"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                z₂
              </text>
            );
          })()}

          {/* z2 vector from z1 (parallelogram) */}
          <line
            x1={toCanvas(quest.z1.re, quest.z1.im).x}
            y1={toCanvas(quest.z1.re, quest.z1.im).y}
            x2={toCanvas(result.re, result.im).x}
            y2={toCanvas(result.re, result.im).y}
            stroke="#39ff14"
            strokeWidth={2}
            strokeDasharray="5,5"
            opacity={0.5}
          />

          {/* Result vector */}
          <line
            x1={origin}
            y1={origin}
            x2={toCanvas(result.re, result.im).x}
            y2={toCanvas(result.re, result.im).y}
            stroke="#a855f7"
            strokeWidth={4}
            markerEnd="url(#arrowhead-purple)"
          />
          <circle
            cx={toCanvas(result.re, result.im).x}
            cy={toCanvas(result.re, result.im).y}
            r={6}
            fill="#a855f7"
          />
          {(() => {
            const offset = getLabelOffset(result.re, result.im);
            return (
              <text
                x={toCanvas(result.re, result.im).x + offset.dx}
                y={toCanvas(result.re, result.im).y + offset.dy}
                fill="#a855f7"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                z₁ + z₂
              </text>
            );
          })()}
        </g>
      )}

      {/* OPERATIONS: Multiplication - show rotation and scaling */}
      {quest.operation === "multiply" && quest.z1 && quest.z2 && result && (
        <g>
          {/* z1 vector */}
          <line
            x1={origin}
            y1={origin}
            x2={toCanvas(quest.z1.re, quest.z1.im).x}
            y2={toCanvas(quest.z1.re, quest.z1.im).y}
            stroke="#00e5ff"
            strokeWidth={3}
            markerEnd="url(#arrowhead-cyan)"
          />
          <circle
            cx={toCanvas(quest.z1.re, quest.z1.im).x}
            cy={toCanvas(quest.z1.re, quest.z1.im).y}
            r={5}
            fill="#00e5ff"
          />
          {(() => {
            const offset = getLabelOffset(quest.z1.re, quest.z1.im);
            return (
              <text
                x={toCanvas(quest.z1.re, quest.z1.im).x + offset.dx}
                y={toCanvas(quest.z1.re, quest.z1.im).y + offset.dy}
                fill="#00e5ff"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                z₁
              </text>
            );
          })()}
          
          {/* Arc showing angle of z1 */}
          {(() => {
            const r1 = Math.sqrt(quest.z1.re * quest.z1.re + quest.z1.im * quest.z1.im);
            const theta1 = Math.atan2(quest.z1.im, quest.z1.re);
            const arcRadius = Math.min(r1 * scale * 0.4, 40);
            return (
              <path
                d={`M ${origin + arcRadius} ${origin} A ${arcRadius} ${arcRadius} 0 ${theta1 > 0 ? 0 : 1} ${theta1 > 0 ? 0 : 1} ${origin + arcRadius * Math.cos(theta1)} ${origin - arcRadius * Math.sin(theta1)}`}
                stroke="#00e5ff"
                strokeWidth={2}
                fill="none"
              />
            );
          })()}

          {/* z2 vector */}
          <line
            x1={origin}
            y1={origin}
            x2={toCanvas(quest.z2.re, quest.z2.im).x}
            y2={toCanvas(quest.z2.re, quest.z2.im).y}
            stroke="#39ff14"
            strokeWidth={3}
            markerEnd="url(#arrowhead-green)"
          />
          <circle
            cx={toCanvas(quest.z2.re, quest.z2.im).x}
            cy={toCanvas(quest.z2.re, quest.z2.im).y}
            r={5}
            fill="#39ff14"
          />
          {(() => {
            const offset = getLabelOffset(quest.z2.re, quest.z2.im);
            return (
              <text
                x={toCanvas(quest.z2.re, quest.z2.im).x + offset.dx}
                y={toCanvas(quest.z2.re, quest.z2.im).y + offset.dy}
                fill="#39ff14"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                z₂
              </text>
            );
          })()}

          {/* Result vector */}
          <line
            x1={origin}
            y1={origin}
            x2={toCanvas(result.re, result.im).x}
            y2={toCanvas(result.re, result.im).y}
            stroke="#a855f7"
            strokeWidth={4}
            markerEnd="url(#arrowhead-purple)"
          />
          <circle
            cx={toCanvas(result.re, result.im).x}
            cy={toCanvas(result.re, result.im).y}
            r={6}
            fill="#a855f7"
          />
          {(() => {
            const offset = getLabelOffset(result.re, result.im);
            return (
              <text
                x={toCanvas(result.re, result.im).x + offset.dx}
                y={toCanvas(result.re, result.im).y + offset.dy}
                fill="#a855f7"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                z₁ × z₂
              </text>
            );
          })()}
        </g>
      )}

      {/* POLAR: Power - show rotation and scaling */}
      {quest.operation === "power" && quest.z1 && quest.power && result && (
        <g>
          {/* Original z vector */}
          <line
            x1={origin}
            y1={origin}
            x2={toCanvas(quest.z1.re, quest.z1.im).x}
            y2={toCanvas(quest.z1.re, quest.z1.im).y}
            stroke="#00e5ff"
            strokeWidth={3}
            markerEnd="url(#arrowhead-cyan)"
          />
          <circle
            cx={toCanvas(quest.z1.re, quest.z1.im).x}
            cy={toCanvas(quest.z1.re, quest.z1.im).y}
            r={5}
            fill="#00e5ff"
          />
          {(() => {
            const offset = getLabelOffset(quest.z1.re, quest.z1.im);
            return (
              <text
                x={toCanvas(quest.z1.re, quest.z1.im).x + offset.dx}
                y={toCanvas(quest.z1.re, quest.z1.im).y + offset.dy}
                fill="#00e5ff"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                z
              </text>
            );
          })()}

          {/* Arc showing rotation */}
          {(() => {
            const r = Math.sqrt(quest.z1.re * quest.z1.re + quest.z1.im * quest.z1.im);
            const theta = Math.atan2(quest.z1.im, quest.z1.re);
            const newTheta = theta * quest.power;
            const arcRadius = Math.min(r * scale * 0.7, 60);
            
            return (
              <path
                d={`M ${origin + arcRadius * Math.cos(theta)} ${origin - arcRadius * Math.sin(theta)} A ${arcRadius} ${arcRadius} 0 ${Math.abs(newTheta - theta) > Math.PI ? 1 : 0} ${newTheta > theta ? 0 : 1} ${origin + arcRadius * Math.cos(newTheta)} ${origin - arcRadius * Math.sin(newTheta)}`}
                stroke="#ffd166"
                strokeWidth={2}
                fill="none"
                strokeDasharray="3,3"
              />
            );
          })()}

          {/* Result vector z^n */}
          <line
            x1={origin}
            y1={origin}
            x2={toCanvas(result.re, result.im).x}
            y2={toCanvas(result.re, result.im).y}
            stroke="#a855f7"
            strokeWidth={4}
            markerEnd="url(#arrowhead-purple)"
          />
          <circle
            cx={toCanvas(result.re, result.im).x}
            cy={toCanvas(result.re, result.im).y}
            r={6}
            fill="#a855f7"
          />
          {(() => {
            const offset = getLabelOffset(result.re, result.im);
            return (
              <text
                x={toCanvas(result.re, result.im).x + offset.dx}
                y={toCanvas(result.re, result.im).y + offset.dy}
                fill="#a855f7"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                z^{quest.power}
              </text>
            );
          })()}
        </g>
      )}

      {/* Arrow markers */}
      <defs>
        <marker
          id="arrowhead-cyan"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#00e5ff" />
        </marker>
        <marker
          id="arrowhead-green"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#39ff14" />
        </marker>
        <marker
          id="arrowhead-purple"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
        </marker>
      </defs>
    </svg>
  );
}

export default function ComplexVisualization({ quest, checkStatus }: ComplexVisualizationProps) {
  if (!quest || !quest.z1) {
    return (
      <div className="w-full h-[600px] bg-black rounded-xl border border-white/10 flex items-center justify-center">
        <div className="text-white/40 text-sm font-mono">NO DATA</div>
      </div>
    );
  }

  const r = Math.sqrt(quest.z1.re * quest.z1.re + quest.z1.im * quest.z1.im);
  const theta = Math.atan2(quest.z1.im, quest.z1.re);
  const thetaDeg = (theta * 180 / Math.PI).toFixed(1);

  return (
    <div className="space-y-4">
      {/* 2D Complex Plane */}
      <div className="flex justify-center">
        <ComplexPlane2D quest={quest} />
      </div>

      {/* Explanation based on operation */}
      {quest.operation === "polar" && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
            勾股定理 / PYTHAGOREAN THEOREM
          </div>
          <div className="text-white font-mono text-sm">
            <BlockMath math={`|z|^2 = a^2 + b^2 = ${quest.z1.re}^2 + ${quest.z1.im}^2 = ${(quest.z1.re * quest.z1.re + quest.z1.im * quest.z1.im).toFixed(2)}`} />
            <BlockMath math={`|z| = \\sqrt{${(quest.z1.re * quest.z1.re + quest.z1.im * quest.z1.im).toFixed(2)}} = ${r.toFixed(3)}`} />
          </div>
        </div>
      )}

      {quest.operation === "add" && quest.z2 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
            向量加法 / VECTOR ADDITION
          </div>
          <div className="text-white font-mono text-sm">
            <BlockMath math={`z_1 + z_2 = (${quest.z1.re} + ${quest.z2.re}) + (${quest.z1.im} + ${quest.z2.im})i`} />
            <div className="text-white/60 text-xs mt-2">
              <InlineMath math="\\text{平行四边形法则：从原点到 } z_1\\text{，再从 } z_1 \\text{ 平移 } z_2" />
            </div>
          </div>
        </div>
      )}

      {quest.operation === "multiply" && quest.z2 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
            复数乘法 / COMPLEX MULTIPLICATION
          </div>
          <div className="text-white font-mono text-sm">
            <BlockMath math={`z_1 \\times z_2 = (a_1 + b_1 i)(a_2 + b_2 i)`} />
            <BlockMath math={`= (a_1 a_2 - b_1 b_2) + (a_1 b_2 + b_1 a_2)i`} />
            <div className="text-white/60 text-xs mt-2">
              <InlineMath math="\\text{几何意义：模长相乘，角度相加}" />
            </div>
          </div>
        </div>
      )}

      {quest.operation === "power" && quest.power && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
            极坐标幂运算 / POLAR FORM POWER
          </div>
          <div className="text-white font-mono text-sm">
            <BlockMath math={`z = r e^{i\\theta} = ${r.toFixed(3)} e^{i \\cdot ${thetaDeg}°}`} />
            <BlockMath math={`z^{${quest.power}} = r^{${quest.power}} e^{i \\cdot ${quest.power}\\theta} = ${Math.pow(r, quest.power).toFixed(3)} e^{i \\cdot ${(parseFloat(thetaDeg) * quest.power).toFixed(1)}°}`} />
            <div className="text-white/60 text-xs mt-2">
              <InlineMath math="\\text{模长变为 } r^n\\text{，角度变为 } n\\cdot\\theta" />
            </div>
          </div>
        </div>
      )}

      {/* Data panel */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
          复数数据 / COMPLEX NUMBER DATA
        </div>
        
        {quest.z1 && (
          <div className="space-y-2">
            <div className="text-lg text-white font-black">
              <InlineMath math={`z${quest.z2 ? "_1" : ""} = ${quest.z1.re} + ${quest.z1.im}i`} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">模长 |z|:</span>
                <span className="text-neon-cyan font-black">{r.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">辐角 arg(z):</span>
                <span className="text-neon-green font-black">{thetaDeg}°</span>
              </div>
            </div>
          </div>
        )}

        {quest.z2 && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="text-lg text-white font-black">
              <InlineMath math={`z_2 = ${quest.z2.re} + ${quest.z2.im}i`} />
            </div>
          </div>
        )}

        {quest.power && (
          <div className="pt-2 border-t border-white/10">
            <div className="text-sm text-white/60 font-mono">
              幂次 Power: n = {quest.power}
            </div>
          </div>
        )}
      </div>

      {/* Status indicator */}
      {checkStatus && (
        <div className={`rounded-xl border p-4 text-center font-black text-sm ${
          checkStatus === "correct"
            ? "border-neon-green bg-neon-green/10 text-neon-green"
            : "border-red-500 bg-red-500/10 text-red-500"
        }`}>
          {checkStatus === "correct" ? "✓ 验证成功 VERIFIED" : "✗ 答案错误 MISMATCH"}
        </div>
      )}
    </div>
  );
}
