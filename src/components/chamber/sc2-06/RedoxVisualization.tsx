"use client";

import { useMemo } from "react";

interface RedoxQuest {
  stage: "OXIDATION_STATE" | "ELECTRON_TRANSFER" | "ELECTROCHEMISTRY";
  reactants: Array<{ formula: string; oxidationState: number }>;
  products: Array<{ formula: string; oxidationState: number }>;
  oxidationStates: Record<string, number>;
  electronsTransferred: number;
  cellPotential?: number;
  expressionLatex?: string;
}

interface RedoxVisualizationProps {
  quest: RedoxQuest | null;
  inputs: Record<string, string>;
  checkStatus: { ok: boolean; correct: string } | null;
}

export default function RedoxVisualization({
  quest,
  inputs,
  checkStatus,
}: RedoxVisualizationProps) {
  const canvasSize = 400;
  const centerX = canvasSize / 2;
  const centerY = canvasSize / 2;

  // Render oxidation state visualization
  const renderOxidationState = useMemo(() => {
    if (!quest || quest.stage !== "OXIDATION_STATE") return null;

    const { oxidationStates } = quest;
    const elements = Object.keys(oxidationStates);
    const angleStep = (2 * Math.PI) / elements.length;
    const radius = 120;

    return (
      <svg width={canvasSize} height={canvasSize} className="w-full h-full">
        {/* Background circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 40}
          fill="none"
          stroke="rgba(168, 85, 247, 0.1)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Central molecule representation */}
        <circle
          cx={centerX}
          cy={centerY}
          r={30}
          fill="rgba(168, 85, 247, 0.2)"
          stroke="rgba(168, 85, 247, 0.5)"
          strokeWidth="2"
        />
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs font-bold fill-white"
        >
          {quest.reactants[0]?.formula || ""}
        </text>

        {/* Oxidation state indicators for each element */}
        {elements.map((element, idx) => {
          const angle = idx * angleStep - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const oxState = oxidationStates[element];
          const color = oxState > 0 ? "#ef4444" : oxState < 0 ? "#3b82f6" : "#10b981";

          return (
            <g key={element}>
              {/* Connection line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />

              {/* Element circle */}
              <circle
                cx={x}
                cy={y}
                r={25}
                fill={`${color}20`}
                stroke={color}
                strokeWidth="2"
              />

              {/* Element symbol */}
              <text
                x={x}
                y={y - 5}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-bold fill-white"
              >
                {element}
              </text>

              {/* Oxidation state */}
              <text
                x={x}
                y={y + 10}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-mono"
                fill={color}
              >
                {oxState > 0 ? `+${oxState}` : oxState}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(20, ${canvasSize - 60})`}>
          <text className="text-[8px] fill-white/60 font-bold" y="0">OXIDATION STATES:</text>
          <circle cx="0" cy="15" r="4" fill="#ef444420" stroke="#ef4444" strokeWidth="1" />
          <text className="text-[8px] fill-white/60" x="10" y="18">Positive (Oxidized)</text>
          <circle cx="0" cy="30" r="4" fill="#3b82f620" stroke="#3b82f6" strokeWidth="1" />
          <text className="text-[8px] fill-white/60" x="10" y="33">Negative (Reduced)</text>
        </g>
      </svg>
    );
  }, [quest, canvasSize, centerX, centerY]);

  // Render electron transfer visualization
  const renderElectronTransfer = useMemo(() => {
    if (!quest || quest.stage !== "ELECTRON_TRANSFER") return null;

    const { electronsTransferred } = quest;
    const leftX = 100;
    const rightX = 300;
    const y = centerY;

    return (
      <svg width={canvasSize} height={canvasSize} className="w-full h-full">
        {/* Oxidation (left side - red) */}
        <g>
          <circle
            cx={leftX}
            cy={y}
            r={50}
            fill="rgba(239, 68, 68, 0.2)"
            stroke="#ef4444"
            strokeWidth="3"
          />
          <text
            x={leftX}
            y={y - 10}
            textAnchor="middle"
            className="text-sm font-bold fill-white"
          >
            OXIDATION
          </text>
          <text
            x={leftX}
            y={y + 10}
            textAnchor="middle"
            className="text-xs fill-red-400"
          >
            (loses e⁻)
          </text>
        </g>

        {/* Reduction (right side - blue) */}
        <g>
          <circle
            cx={rightX}
            cy={y}
            r={50}
            fill="rgba(59, 130, 246, 0.2)"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          <text
            x={rightX}
            y={y - 10}
            textAnchor="middle"
            className="text-sm font-bold fill-white"
          >
            REDUCTION
          </text>
          <text
            x={rightX}
            y={y + 10}
            textAnchor="middle"
            className="text-xs fill-blue-400"
          >
            (gains e⁻)
          </text>
        </g>

        {/* Electron transfer arrows */}
        {Array.from({ length: Math.min(electronsTransferred, 5) }).map((_, idx) => {
          const yOffset = (idx - 2) * 15;
          const arrowY = y + yOffset;

          return (
            <g key={idx}>
              {/* Arrow line */}
              <line
                x1={leftX + 55}
                y1={arrowY}
                x2={rightX - 55}
                y2={arrowY}
                stroke="#a855f7"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              {/* Electron symbol */}
              <circle
                cx={leftX + 100 + idx * 20}
                cy={arrowY}
                r="6"
                fill="#a855f7"
                className="animate-pulse"
              />
              <text
                x={leftX + 100 + idx * 20}
                y={arrowY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[8px] font-bold fill-white"
              >
                e⁻
              </text>
            </g>
          );
        })}

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
          </marker>
        </defs>

        {/* Electron count display */}
        <g transform={`translate(${centerX}, ${canvasSize - 40})`}>
          <rect
            x="-60"
            y="-15"
            width="120"
            height="30"
            rx="5"
            fill="rgba(168, 85, 247, 0.2)"
            stroke="#a855f7"
            strokeWidth="2"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-bold fill-white"
          >
            {electronsTransferred}e⁻ transferred
          </text>
        </g>
      </svg>
    );
  }, [quest, canvasSize, centerX, centerY]);

  // Render electrochemical cell visualization
  const renderElectrochemistry = useMemo(() => {
    if (!quest || quest.stage !== "ELECTROCHEMISTRY") return null;

    const { cellPotential, electronsTransferred } = quest;
    const anodeX = 100;
    const cathodeX = 300;
    const electrodeY = 150;
    const electrodeHeight = 100;

    return (
      <svg width={canvasSize} height={canvasSize} className="w-full h-full">
        {/* Anode (left - oxidation - red) */}
        <g>
          <rect
            x={anodeX - 15}
            y={electrodeY}
            width="30"
            height={electrodeHeight}
            fill="rgba(239, 68, 68, 0.3)"
            stroke="#ef4444"
            strokeWidth="3"
          />
          <text
            x={anodeX}
            y={electrodeY - 10}
            textAnchor="middle"
            className="text-xs font-bold fill-red-400"
          >
            ANODE (−)
          </text>
          <text
            x={anodeX}
            y={electrodeY + electrodeHeight + 20}
            textAnchor="middle"
            className="text-[10px] fill-white/60"
          >
            Oxidation
          </text>
        </g>

        {/* Cathode (right - reduction - blue) */}
        <g>
          <rect
            x={cathodeX - 15}
            y={electrodeY}
            width="30"
            height={electrodeHeight}
            fill="rgba(59, 130, 246, 0.3)"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          <text
            x={cathodeX}
            y={electrodeY - 10}
            textAnchor="middle"
            className="text-xs font-bold fill-blue-400"
          >
            CATHODE (+)
          </text>
          <text
            x={cathodeX}
            y={electrodeY + electrodeHeight + 20}
            textAnchor="middle"
            className="text-[10px] fill-white/60"
          >
            Reduction
          </text>
        </g>

        {/* Electrolyte solution */}
        <rect
          x={anodeX - 40}
          y={electrodeY + 50}
          width="280"
          height="80"
          fill="rgba(168, 85, 247, 0.1)"
          stroke="rgba(168, 85, 247, 0.3)"
          strokeWidth="2"
          rx="5"
        />

        {/* Salt bridge */}
        <g>
          <path
            d={`M ${centerX - 20} ${electrodeY + 40} Q ${centerX} ${electrodeY - 20} ${centerX + 20} ${electrodeY + 40}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <text
            x={centerX}
            y={electrodeY - 30}
            textAnchor="middle"
            className="text-[9px] font-bold fill-green-400"
          >
            SALT BRIDGE
          </text>
        </g>

        {/* Electron flow in external circuit */}
        <g>
          <path
            d={`M ${anodeX} ${electrodeY - 20} L ${anodeX} ${electrodeY - 60} L ${cathodeX} ${electrodeY - 60} L ${cathodeX} ${electrodeY - 20}`}
            fill="none"
            stroke="#a855f7"
            strokeWidth="3"
            markerEnd="url(#arrowhead-ec)"
          />
          {/* Electron symbols */}
          {Array.from({ length: 3 }).map((_, idx) => (
            <g key={idx}>
              <circle
                cx={anodeX + 50 + idx * 50}
                cy={electrodeY - 60}
                r="6"
                fill="#a855f7"
                className="animate-pulse"
              />
              <text
                x={anodeX + 50 + idx * 50}
                y={electrodeY - 60}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[8px] font-bold fill-white"
              >
                e⁻
              </text>
            </g>
          ))}
        </g>

        {/* Arrow marker */}
        <defs>
          <marker
            id="arrowhead-ec"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
          </marker>
        </defs>

        {/* Cell potential display */}
        {cellPotential !== undefined && (
          <g transform={`translate(${centerX}, ${canvasSize - 50})`}>
            <rect
              x="-80"
              y="-20"
              width="160"
              height="40"
              rx="8"
              fill="rgba(0, 255, 255, 0.1)"
              stroke="#0ff"
              strokeWidth="2"
            />
            <text
              x="0"
              y="-5"
              textAnchor="middle"
              className="text-[9px] fill-cyan-400 font-bold"
            >
              CELL POTENTIAL
            </text>
            <text
              x="0"
              y="10"
              textAnchor="middle"
              className="text-lg font-black fill-cyan-300"
            >
              {cellPotential.toFixed(2)} V
            </text>
          </g>
        )}

        {/* Ion flow indicators in solution */}
        <g>
          <text
            x={anodeX + 20}
            y={electrodeY + 90}
            className="text-[10px] fill-white/40"
          >
            Cations →
          </text>
          <text
            x={cathodeX - 50}
            y={electrodeY + 110}
            className="text-[10px] fill-white/40"
          >
            ← Anions
          </text>
        </g>
      </svg>
    );
  }, [quest, canvasSize, centerX, centerY]);

  // Status indicator
  const statusText = useMemo(() => {
    if (!checkStatus) return "READY";
    return checkStatus.ok ? "✓ VERIFIED" : "✗ MISMATCH";
  }, [checkStatus]);

  const statusColor = useMemo(() => {
    if (!checkStatus) return "text-white/60";
    return checkStatus.ok ? "text-green-400" : "text-red-400";
  }, [checkStatus]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Visualization canvas */}
      <div className="flex-1 relative bg-black/30 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
        {quest?.stage === "OXIDATION_STATE" && renderOxidationState}
        {quest?.stage === "ELECTRON_TRANSFER" && renderElectronTransfer}
        {quest?.stage === "ELECTROCHEMISTRY" && renderElectrochemistry}
        {!quest && (
          <div className="text-white/40 text-sm">No question data available</div>
        )}
      </div>

      {/* Status indicator */}
      <div className={`text-xs font-mono ${statusColor} text-center`}>
        {statusText}
      </div>
    </div>
  );
}
