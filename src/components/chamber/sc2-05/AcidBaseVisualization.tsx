"use client";

import { useMemo } from "react";

interface AcidBaseQuest {
  id: string;
  stage: string;
  substance?: string;
  concentration?: number;
  volume?: number;
  pH?: number;
  reactionType?: string;
  scenario?: string;
}

interface AcidBaseVisualizationProps {
  quest: AcidBaseQuest | null;
  inputs: Record<string, string>;
  checkStatus: { ok: boolean; correct: string } | null;
}

export default function AcidBaseVisualization({
  quest,
  inputs,
  checkStatus,
}: AcidBaseVisualizationProps) {
  const pH = useMemo(() => {
    if (!quest) return 7.0;
    if (quest.pH !== undefined) return quest.pH;
    return 7.0;
  }, [quest]);

  const pHColor = useMemo(() => {
    if (pH < 3) return "#ef4444"; // red-500
    if (pH < 5) return "#f97316"; // orange-500
    if (pH < 6) return "#eab308"; // yellow-500
    if (pH < 8) return "#22c55e"; // green-500
    if (pH < 10) return "#3b82f6"; // blue-500
    if (pH < 12) return "#6366f1"; // indigo-500
    return "#8b5cf6"; // purple-500
  }, [pH]);

  const pHGradient = useMemo(() => {
    return [
      { offset: "0%", color: "#ef4444" },    // pH 0-2: red
      { offset: "14%", color: "#f97316" },   // pH 2-3: orange
      { offset: "28%", color: "#eab308" },   // pH 4-5: yellow
      { offset: "42%", color: "#84cc16" },   // pH 6: lime
      { offset: "50%", color: "#22c55e" },   // pH 7: green
      { offset: "58%", color: "#14b8a6" },   // pH 8: teal
      { offset: "72%", color: "#3b82f6" },   // pH 9-10: blue
      { offset: "86%", color: "#6366f1" },   // pH 11-12: indigo
      { offset: "100%", color: "#8b5cf6" },  // pH 13-14: purple
    ];
  }, []);

  const pHPosition = useMemo(() => {
    return (pH / 14) * 100;
  }, [pH]);

  if (!quest) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
        No question data available
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      {/* Scenario */}
      {quest.scenario && (
        <div className="text-xs text-white/70 leading-relaxed max-h-24 overflow-y-auto">
          {quest.scenario.substring(0, 200)}...
        </div>
      )}

      {/* pH Scale Bar */}
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div className="text-xs text-white/80 font-mono text-center">
          pH SCALE
        </div>

        <svg width="100%" height="80" viewBox="0 0 400 80">
          <defs>
            <linearGradient id="phGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {pHGradient.map((stop, i) => (
                <stop key={i} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>

          {/* pH scale bar */}
          <rect
            x="50"
            y="20"
            width="300"
            height="30"
            fill="url(#phGradient)"
            stroke="#ffffff40"
            strokeWidth="2"
            rx="4"
          />

          {/* pH markers */}
          {[0, 2, 4, 6, 7, 8, 10, 12, 14].map((value) => {
            const x = 50 + (value / 14) * 300;
            return (
              <g key={value}>
                <line
                  x1={x}
                  y1="50"
                  x2={x}
                  y2="58"
                  stroke="#ffffff80"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y="70"
                  fill="#ffffff80"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {/* Current pH indicator */}
          <g>
            <polygon
              points={`${50 + pHPosition * 3},10 ${50 + pHPosition * 3 - 6},20 ${50 + pHPosition * 3 + 6},20`}
              fill={pHColor}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <line
              x1={50 + pHPosition * 3}
              y1="20"
              x2={50 + pHPosition * 3}
              y2="50"
              stroke={pHColor}
              strokeWidth="2"
              strokeDasharray="4,2"
            />
          </g>
        </svg>

        {/* pH value display */}
        <div className="text-center">
          <div className="text-2xl font-black" style={{ color: pHColor }}>
            pH = {pH.toFixed(1)}
          </div>
          <div className="text-xs text-white/60 mt-1">
            {pH < 7 ? "ACIDIC" : pH > 7 ? "BASIC" : "NEUTRAL"}
          </div>
        </div>

        {/* Molecular representation */}
        {quest.stage === "PH_BASICS" && (
          <div className="flex justify-center gap-8 mt-4">
            {pH < 7 && (
              <div className="text-center">
                <div className="text-red-400 text-lg font-mono">H₃O⁺</div>
                <div className="text-xs text-white/60">Hydronium</div>
              </div>
            )}
            {pH > 7 && (
              <div className="text-center">
                <div className="text-blue-400 text-lg font-mono">OH⁻</div>
                <div className="text-xs text-white/60">Hydroxide</div>
              </div>
            )}
            {pH === 7 && (
              <div className="text-center">
                <div className="text-green-400 text-lg font-mono">H₂O</div>
                <div className="text-xs text-white/60">Water</div>
              </div>
            )}
          </div>
        )}

        {/* Titration curve for TITRATION stage */}
        {quest.stage === "TITRATION" && quest.volume && (
          <svg width="100%" height="120" viewBox="0 0 400 120">
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="70%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>

            {/* Axes */}
            <line x1="50" y1="10" x2="50" y2="100" stroke="#ffffff40" strokeWidth="1" />
            <line x1="50" y1="100" x2="350" y2="100" stroke="#ffffff40" strokeWidth="1" />

            {/* Titration curve (simplified S-curve) */}
            <path
              d="M 50,95 Q 150,90 200,55 T 350,15"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="2"
            />

            {/* Equivalence point marker */}
            <circle
              cx={50 + (quest.volume / 50) * 300}
              cy={55}
              r="4"
              fill={pHColor}
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Labels */}
            <text x="200" y="115" fill="#ffffff60" fontSize="10" textAnchor="middle">
              Volume (mL)
            </text>
            <text x="30" y="55" fill="#ffffff60" fontSize="10" textAnchor="middle">
              pH
            </text>
          </svg>
        )}
      </div>

      {/* Status indicator */}
      <div className="text-xs text-white/60 font-mono text-center">
        {checkStatus ? (
          checkStatus.ok ? (
            <span className="text-green-400">✓ VERIFIED</span>
          ) : (
            <span className="text-red-400">✗ MISMATCH</span>
          )
        ) : (
          "READY"
        )}
      </div>

      {/* Quest info */}
      {quest.substance && (
        <div className="text-xs text-white/50 font-mono text-center">
          {quest.substance}
          {quest.concentration && ` • ${quest.concentration}M`}
          {quest.volume && ` • ${quest.volume}mL`}
        </div>
      )}
    </div>
  );
}
