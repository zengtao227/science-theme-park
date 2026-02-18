"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface GeometryVisualizationProps {
  quest: any;
  inputs: Record<string, string>;
  checkStatus: { ok: boolean; correct: string } | null;
}

export default function GeometryVisualization({
  quest,
  inputs,
  checkStatus,
}: GeometryVisualizationProps) {
  const shapeData = useMemo(() => {
    if (!quest) return null;
    
    // Determine shape type from quest
    const stage = quest.stage || "ANGLES";
    
    return {
      stage,
      type: stage === "ANGLES" ? "triangle" : stage === "AREAS" ? "rectangle" : "circle"
    };
  }, [quest]);

  const renderShape = () => {
    if (!shapeData) return null;

    switch (shapeData.type) {
      case "triangle":
        return (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <polygon
              points="300,100 150,350 450,350"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="3"
            />
            {/* Angle markers */}
            <circle cx="300" cy="100" r="20" fill="none" stroke="#39ff14" strokeWidth="2" />
            <circle cx="150" cy="350" r="20" fill="none" stroke="#39ff14" strokeWidth="2" />
            <circle cx="450" cy="350" r="20" fill="none" stroke="#39ff14" strokeWidth="2" />
            
            {/* Labels */}
            <text x="300" y="90" fill="#00e5ff" fontSize="16" textAnchor="middle">A</text>
            <text x="140" y="370" fill="#00e5ff" fontSize="16" textAnchor="middle">B</text>
            <text x="460" y="370" fill="#00e5ff" fontSize="16" textAnchor="middle">C</text>
          </motion.g>
        );

      case "rectangle":
        return (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <rect
              x="150"
              y="100"
              width="300"
              height="200"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="3"
            />
            {/* Dimension lines */}
            <line x1="150" y1="320" x2="450" y2="320" stroke="#39ff14" strokeWidth="2" />
            <line x1="470" y1="100" x2="470" y2="300" stroke="#39ff14" strokeWidth="2" />
            
            {/* Labels */}
            <text x="300" y="340" fill="#39ff14" fontSize="14" textAnchor="middle">width</text>
            <text x="490" y="200" fill="#39ff14" fontSize="14" textAnchor="middle">height</text>
          </motion.g>
        );

      case "circle":
        return (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <circle
              cx="300"
              cy="200"
              r="120"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="3"
            />
            {/* Radius line */}
            <line x1="300" y1="200" x2="420" y2="200" stroke="#39ff14" strokeWidth="2" />
            <circle cx="300" cy="200" r="4" fill="#ff2d7d" />
            
            {/* Labels */}
            <text x="360" y="195" fill="#39ff14" fontSize="14" textAnchor="middle">r</text>
          </motion.g>
        );

      default:
        return null;
    }
  };

  if (!quest) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
        No data
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex-1 relative bg-black/20 rounded-lg border border-white/10 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 600 400" className="absolute inset-0">
          {/* Grid */}
          {Array.from({ length: 13 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * 50}
              y1={0}
              x2={i * 50}
              y2={400}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 50}
              x2={600}
              y2={i * 50}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          ))}

          {/* Shape */}
          {renderShape()}

          {/* Success indicator */}
          {checkStatus?.ok && (
            <motion.circle
              cx="550"
              cy="50"
              r="20"
              fill="#39ff14"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </motion.circle>
          )}
        </svg>
      </div>

      <div className="text-xs text-white/60 font-mono text-center">
        {checkStatus ? (
          checkStatus.ok ? (
            <span className="text-green-400">✓ GEOMETRY VERIFIED</span>
          ) : (
            <span className="text-pink-400">✗ CHECK CALCULATION</span>
          )
        ) : (
          "ANALYZE SHAPE"
        )}
      </div>
    </div>
  );
}
