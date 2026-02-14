"use client";

import { useMemo } from "react";

interface ProbabilityVisualizerProps {
  stage: string;
  language: "EN" | "CN" | "DE";
}

export default function ProbabilityVisualizer({ stage, language }: ProbabilityVisualizerProps) {
  const visualizations = useMemo(() => {
    const labels = {
      EN: {
        dice: "Dice (6 outcomes)",
        coin: "Coin (2 outcomes)",
        cards: "Cards (52 total)",
        lottery: "Lottery Draw",
        data_stats: "Data Statistics",
        frequency: "Frequency Data",
        combined: "Combined Events",
      },
      CN: {
        dice: "骰子 (6种结果)",
        coin: "硬币 (2种结果)",
        cards: "扑克牌 (52张)",
        lottery: "彩票抽奖",
        data_stats: "数据统计",
        frequency: "频率数据",
        combined: "组合事件",
      },
      DE: {
        dice: "Würfel (6 Ergebnisse)",
        coin: "Münze (2 Ergebnisse)",
        cards: "Karten (52 gesamt)",
        lottery: "Lotterieziehung",
        data_stats: "Datenstatistik",
        frequency: "Häufigkeitsdaten",
        combined: "Kombinierte Ereignisse",
      },
    };

    const t = labels[language];

    return {
      BASIC_PROB: (
        <svg width="300" height="200" className="mx-auto">
          {/* Dice */}
          <g transform="translate(50, 30)">
            <rect x="0" y="0" width="60" height="60" fill="#00e5ff" fillOpacity="0.2" stroke="#00e5ff" strokeWidth="2" rx="5" />
            {[
              [30, 20],
              [15, 30],
              [45, 30],
              [15, 45],
              [30, 45],
              [45, 45],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="#00e5ff" />
            ))}
            <text x="30" y="80" textAnchor="middle" fill="#00e5ff" fontSize="10">
              {t.dice}
            </text>
          </g>

          {/* Coin */}
          <g transform="translate(190, 30)">
            <circle cx="30" cy="30" r="30" fill="#39ff14" fillOpacity="0.2" stroke="#39ff14" strokeWidth="2" />
            <text x="30" y="35" textAnchor="middle" fill="#39ff14" fontSize="16" fontWeight="bold">
              H/T
            </text>
            <text x="30" y="80" textAnchor="middle" fill="#39ff14" fontSize="10">
              {t.coin}
            </text>
          </g>

          {/* Cards */}
          <g transform="translate(100, 120)">
            <rect x="0" y="0" width="40" height="60" fill="#ff2d7d" fillOpacity="0.2" stroke="#ff2d7d" strokeWidth="2" rx="3" />
            <text x="20" y="35" textAnchor="middle" fill="#ff2d7d" fontSize="20">
              ♥
            </text>
            <text x="50" y="80" textAnchor="middle" fill="#ff2d7d" fontSize="10">
              {t.cards}
            </text>
          </g>
        </svg>
      ),
      LOTTERY: (
        <svg width="300" height="200" className="mx-auto">
          {/* Lottery balls */}
          <g transform="translate(150, 100)">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * Math.PI * 2) / 6;
              const x = Math.cos(angle) * 60;
              const y = Math.sin(angle) * 60;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="20" fill="#ff2d7d" fillOpacity="0.3" stroke="#ff2d7d" strokeWidth="2" />
                  <text x={x} y={y + 5} textAnchor="middle" fill="#ff2d7d" fontSize="16" fontWeight="bold">
                    {i + 1}
                  </text>
                </g>
              );
            })}
            <text x="0" y="100" textAnchor="middle" fill="#ff2d7d" fontSize="12">
              {t.lottery}
            </text>
          </g>
        </svg>
      ),
      DATA_STATS: (
        <svg width="300" height="200" className="mx-auto">
          {/* Bar chart */}
          <g transform="translate(30, 20)">
            {[
              { x: 20, h: 80, label: "Mon" },
              { x: 60, h: 100, label: "Tue" },
              { x: 100, h: 70, label: "Wed" },
              { x: 140, h: 90, label: "Thu" },
              { x: 180, h: 85, label: "Fri" },
            ].map((bar, i) => (
              <g key={i}>
                <rect x={bar.x} y={120 - bar.h} width="30" height={bar.h} fill="#00e5ff" fillOpacity="0.6" stroke="#00e5ff" strokeWidth="1" />
                <text x={bar.x + 15} y="140" textAnchor="middle" fill="#00e5ff" fontSize="10">
                  {bar.label}
                </text>
              </g>
            ))}
            <line x1="10" y1="120" x2="220" y2="120" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
            <text x="120" y="170" textAnchor="middle" fill="#00e5ff" fontSize="12">
              {t.data_stats}
            </text>
          </g>
        </svg>
      ),
      FREQUENCY: (
        <svg width="300" height="200" className="mx-auto">
          {/* Bar chart */}
          <g transform="translate(30, 20)">
            {[
              { x: 20, h: 80, label: "Mon" },
              { x: 60, h: 100, label: "Tue" },
              { x: 100, h: 70, label: "Wed" },
              { x: 140, h: 90, label: "Thu" },
              { x: 180, h: 85, label: "Fri" },
            ].map((bar, i) => (
              <g key={i}>
                <rect x={bar.x} y={120 - bar.h} width="30" height={bar.h} fill="#00e5ff" fillOpacity="0.6" stroke="#00e5ff" strokeWidth="1" />
                <text x={bar.x + 15} y="140" textAnchor="middle" fill="#00e5ff" fontSize="10">
                  {bar.label}
                </text>
              </g>
            ))}
            <line x1="10" y1="120" x2="220" y2="120" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
            <text x="120" y="170" textAnchor="middle" fill="#00e5ff" fontSize="12">
              {t.frequency}
            </text>
          </g>
        </svg>
      ),
      COMBINED: (
        <svg width="300" height="200" className="mx-auto">
          {/* Tree diagram */}
          <g transform="translate(150, 20)">
            {/* Root */}
            <circle cx="0" cy="0" r="5" fill="#ffffff" />

            {/* First level */}
            <line x1="0" y1="0" x2="-60" y2="50" stroke="#00e5ff" strokeWidth="2" />
            <line x1="0" y1="0" x2="60" y2="50" stroke="#00e5ff" strokeWidth="2" />
            <circle cx="-60" cy="50" r="5" fill="#00e5ff" />
            <circle cx="60" cy="50" r="5" fill="#00e5ff" />
            <text x="-60" y="45" textAnchor="middle" fill="#00e5ff" fontSize="12">
              H
            </text>
            <text x="60" y="45" textAnchor="middle" fill="#00e5ff" fontSize="12">
              T
            </text>

            {/* Second level */}
            <line x1="-60" y1="50" x2="-90" y2="100" stroke="#39ff14" strokeWidth="1.5" />
            <line x1="-60" y1="50" x2="-30" y2="100" stroke="#39ff14" strokeWidth="1.5" />
            <line x1="60" y1="50" x2="30" y2="100" stroke="#39ff14" strokeWidth="1.5" />
            <line x1="60" y1="50" x2="90" y2="100" stroke="#39ff14" strokeWidth="1.5" />

            <circle cx="-90" cy="100" r="4" fill="#39ff14" />
            <circle cx="-30" cy="100" r="4" fill="#39ff14" />
            <circle cx="30" cy="100" r="4" fill="#39ff14" />
            <circle cx="90" cy="100" r="4" fill="#39ff14" />

            <text x="-90" y="95" textAnchor="middle" fill="#39ff14" fontSize="10">
              H
            </text>
            <text x="-30" y="95" textAnchor="middle" fill="#39ff14" fontSize="10">
              T
            </text>
            <text x="30" y="95" textAnchor="middle" fill="#39ff14" fontSize="10">
              H
            </text>
            <text x="90" y="95" textAnchor="middle" fill="#39ff14" fontSize="10">
              T
            </text>

            <text x="0" y="140" textAnchor="middle" fill="#ffffff" fontSize="12" opacity="0.7">
              {t.combined}
            </text>
          </g>
        </svg>
      ),
    };
  }, [language]);

  return (
    <div className="bg-black/50 border border-cyan-500/20 rounded-xl p-4">
      {visualizations[stage as keyof typeof visualizations] || visualizations.BASIC_PROB}
    </div>
  );
}
