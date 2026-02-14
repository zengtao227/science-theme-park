"use client";

import { useMemo } from "react";

interface EquationBalanceProps {
  stage: string;
  quest: any;
  language: "EN" | "CN" | "DE";
}

export default function EquationBalance({ stage, quest, language }: EquationBalanceProps) {
  const canvasSize = 400;
  
  const renderBalance = () => {
    // Parse equation to get left and right sides
    const equation = quest?.equation || "x + 3 = 7";
    const [left, right] = equation.split("=").map((s: string) => s.trim());
    
    return (
      <svg width={canvasSize} height={300} className="mx-auto bg-black/50 rounded-xl border border-white/10">
        {/* Balance beam */}
        <line x1="100" y1="150" x2="300" y2="150" stroke="#ffffff" strokeWidth="4" />
        
        {/* Fulcrum (triangle) */}
        <polygon points="200,150 180,180 220,180" fill="#00e5ff" stroke="#ffffff" strokeWidth="2" />
        
        {/* Left pan */}
        <g>
          <line x1="120" y1="150" x2="120" y2="120" stroke="#ffffff" strokeWidth="2" />
          <rect x="80" y="120" width="80" height="60" fill="#ff2d7d" fillOpacity="0.3" stroke="#ff2d7d" strokeWidth="2" rx="5" />
          <text x="120" y="155" textAnchor="middle" fill="#ff2d7d" fontSize="18" fontWeight="bold">
            {left}
          </text>
        </g>
        
        {/* Right pan */}
        <g>
          <line x1="280" y1="150" x2="280" y2="120" stroke="#ffffff" strokeWidth="2" />
          <rect x="240" y="120" width="80" height="60" fill="#39ff14" fillOpacity="0.3" stroke="#39ff14" strokeWidth="2" rx="5" />
          <text x="280" y="155" textAnchor="middle" fill="#39ff14" fontSize="18" fontWeight="bold">
            {right}
          </text>
        </g>
        
        {/* Labels */}
        <text x="120" y="210" textAnchor="middle" fill="#ff2d7d" fontSize="14">
          Left Side
        </text>
        <text x="280" y="210" textAnchor="middle" fill="#39ff14" fontSize="14">
          Right Side
        </text>
        
        {/* Operation hint */}
        {quest?.operation && (
          <text x="200" y="250" textAnchor="middle" fill="#00e5ff" fontSize="16" fontWeight="bold">
            Operation: {quest.operation}
          </text>
        )}
      </svg>
    );
  };
  
  const renderSteps = () => {
    const steps = [
      { step: 1, desc: "Identify the equation" },
      { step: 2, desc: "Isolate the variable" },
      { step: 3, desc: "Solve for x" },
    ];
    
    return (
      <svg width={canvasSize} height={250} className="mx-auto bg-black/50 rounded-xl border border-white/10">
        {steps.map((item, i) => {
          const y = 50 + i * 70;
          return (
            <g key={i}>
              <circle cx="50" cy={y} r="20" fill="#00e5ff" fillOpacity="0.3" stroke="#00e5ff" strokeWidth="2" />
              <text x="50" y={y + 7} textAnchor="middle" fill="#00e5ff" fontSize="18" fontWeight="bold">
                {item.step}
              </text>
              <text x="90" y={y + 7} fill="#ffffff" fontSize="14">
                {item.desc}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };
  
  const renderApplication = () => {
    return (
      <svg width={canvasSize} height={250} className="mx-auto bg-black/50 rounded-xl border border-white/10">
        {/* Basel scene illustration */}
        <g>
          {/* Bus */}
          <rect x="50" y="100" width="100" height="60" fill="#ff2d7d" fillOpacity="0.3" stroke="#ff2d7d" strokeWidth="2" rx="5" />
          <circle cx="80" cy="170" r="15" fill="#ffffff" fillOpacity="0.3" stroke="#ffffff" strokeWidth="2" />
          <circle cx="120" cy="170" r="15" fill="#ffffff" fillOpacity="0.3" stroke="#ffffff" strokeWidth="2" />
          <text x="100" y="135" textAnchor="middle" fill="#ff2d7d" fontSize="16" fontWeight="bold">
            BUS
          </text>
          
          {/* Rhine Ferry */}
          <path d="M 250 120 L 280 120 L 290 140 L 240 140 Z" fill="#00e5ff" fillOpacity="0.3" stroke="#00e5ff" strokeWidth="2" />
          <line x1="265" y1="120" x2="265" y2="100" stroke="#00e5ff" strokeWidth="2" />
          <text x="265" y="170" textAnchor="middle" fill="#00e5ff" fontSize="14">
            Ferry
          </text>
          
          {/* Title */}
          <text x="200" y="40" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
            Basel Applications
          </text>
        </g>
      </svg>
    );
  };
  
  const visualization = useMemo(() => {
    if (stage === "BALANCE") {
      return renderBalance();
    } else if (stage === "SOLVE" || stage === "TRANSFORM") {
      return renderSteps();
    } else if (stage === "APPLICATIONS") {
      return renderApplication();
    }
    return renderBalance();
  }, [stage, quest]);
  
  return (
    <div className="space-y-4">
      {visualization}
      <div className="text-center text-xs text-white/50 uppercase tracking-wider">
        {stage === "BALANCE" && "EQUATION BALANCE MODEL"}
        {stage === "SOLVE" && "SOLVING STEPS"}
        {stage === "TRANSFORM" && "TRANSFORMATION STEPS"}
        {stage === "APPLICATIONS" && "BASEL REAL-WORLD PROBLEMS"}
      </div>
    </div>
  );
}
