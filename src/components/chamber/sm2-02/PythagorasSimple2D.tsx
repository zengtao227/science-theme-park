"use client";

import { useState } from "react";
import { clsx } from "clsx";

interface PythagorasSimple2DProps {
  a: number;
  b: number;
  c: number;
  highlightRightAngle?: boolean;
}

export default function PythagorasSimple2D({ a, b, c, highlightRightAngle }: PythagorasSimple2DProps) {
  const [showProof, setShowProof] = useState(false);
  
  // 缩放因子，让图形适合显示
  const scale = 35;
  const centerX = 250;
  const centerY = 400;
  
  // 三角形顶点
  const trianglePoints = `${centerX},${centerY} ${centerX + a * scale},${centerY} ${centerX},${centerY - b * scale}`;
  
  // 正方形位置 - 调整以确保都在可视范围内
  const aSquareX = centerX + 10;
  const aSquareY = centerY + 20;
  
  const bSquareX = centerX - b * scale - 10;
  const bSquareY = centerY - b * scale;
  
  // c²正方形放在右上方，确保不超出边界
  const cSquareX = centerX + a * scale + 30;
  const cSquareY = centerY - c * scale - 20;
  
  return (
    <div className="relative w-full h-[800px] bg-[#020208] rounded-xl border border-white/10 overflow-hidden">
      <svg viewBox="0 0 800 800" className="w-full h-full">
        <defs>
          {/* 渐变定义 */}
          <linearGradient id="gradA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff4444" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4488ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4488ff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradC" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39ff14" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#39ff14" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* 背景网格 */}
        <g opacity="0.05">
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={i}>
              <line x1={i * 40} y1="0" x2={i * 40} y2="800" stroke="white" strokeWidth="0.5" />
              <line x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="white" strokeWidth="0.5" />
            </g>
          ))}
        </g>
        
        {/* 直角三角形 */}
        <g>
          {/* 三角形填充 */}
          <polygon
            points={trianglePoints}
            fill="url(#gradC)"
            stroke="#00ffff"
            strokeWidth="3"
          />
          
          {/* 直角标记 */}
          {highlightRightAngle && (
            <>
              <rect
                x={centerX}
                y={centerY - 15}
                width="15"
                height="15"
                fill="none"
                stroke="#39ff14"
                strokeWidth="2"
              />
              <rect
                x={centerX}
                y={centerY - 15}
                width="15"
                height="15"
                fill="#39ff14"
                opacity="0.2"
              />
            </>
          )}
          
          {/* 边长标签 */}
          <text
            x={centerX + a * scale / 2}
            y={centerY + 35}
            textAnchor="middle"
            fill="#ff4444"
            fontSize="20"
            fontWeight="bold"
          >
            a = {a}
          </text>
          
          <text
            x={centerX - 35}
            y={centerY - b * scale / 2}
            textAnchor="middle"
            fill="#4488ff"
            fontSize="20"
            fontWeight="bold"
          >
            b = {b}
          </text>
          
          <text
            x={centerX + a * scale / 2 + 40}
            y={centerY - b * scale / 2 - 10}
            textAnchor="middle"
            fill="#39ff14"
            fontSize="20"
            fontWeight="bold"
          >
            c = {c.toFixed(1)}
          </text>
        </g>
        
        {/* a² 正方形 (红色) */}
        <g>
          <rect
            x={aSquareX}
            y={aSquareY}
            width={a * scale}
            height={a * scale}
            fill="url(#gradA)"
            stroke="#ff4444"
            strokeWidth="3"
          />
          
          {/* 网格线显示单位方块 */}
          {Array.from({ length: a }).map((_, i) => (
            <g key={`a-${i}`}>
              <line
                x1={aSquareX + i * scale}
                y1={aSquareY}
                x2={aSquareX + i * scale}
                y2={aSquareY + a * scale}
                stroke="#ff4444"
                strokeWidth="1"
                opacity="0.3"
              />
              <line
                x1={aSquareX}
                y1={aSquareY + i * scale}
                x2={aSquareX + a * scale}
                y2={aSquareY + i * scale}
                stroke="#ff4444"
                strokeWidth="1"
                opacity="0.3"
              />
            </g>
          ))}
          
          <text
            x={aSquareX + a * scale / 2}
            y={aSquareY + a * scale / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ff4444"
            fontSize="24"
            fontWeight="bold"
          >
            a² = {a * a}
          </text>
        </g>
        
        {/* b² 正方形 (蓝色) */}
        <g>
          <rect
            x={bSquareX}
            y={bSquareY}
            width={b * scale}
            height={b * scale}
            fill="url(#gradB)"
            stroke="#4488ff"
            strokeWidth="3"
          />
          
          {/* 网格线 */}
          {Array.from({ length: b }).map((_, i) => (
            <g key={`b-${i}`}>
              <line
                x1={bSquareX + i * scale}
                y1={bSquareY}
                x2={bSquareX + i * scale}
                y2={bSquareY + b * scale}
                stroke="#4488ff"
                strokeWidth="1"
                opacity="0.3"
              />
              <line
                x1={bSquareX}
                y1={bSquareY + i * scale}
                x2={bSquareX + b * scale}
                y2={bSquareY + i * scale}
                stroke="#4488ff"
                strokeWidth="1"
                opacity="0.3"
              />
            </g>
          ))}
          
          <text
            x={bSquareX + b * scale / 2}
            y={bSquareY + b * scale / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#4488ff"
            fontSize="24"
            fontWeight="bold"
          >
            b² = {b * b}
          </text>
        </g>
        
        {/* c² 正方形 (绿色) */}
        <g>
          <rect
            x={cSquareX}
            y={cSquareY}
            width={c * scale}
            height={c * scale}
            fill="url(#gradC)"
            stroke="#39ff14"
            strokeWidth="3"
          />
          
          {/* 网格线 - 显示c²的面积 */}
          {Array.from({ length: Math.ceil(c) }).map((_, i) => (
            <g key={`c-${i}`}>
              <line
                x1={cSquareX + i * scale}
                y1={cSquareY}
                x2={cSquareX + i * scale}
                y2={cSquareY + c * scale}
                stroke="#39ff14"
                strokeWidth="1"
                opacity="0.3"
              />
              <line
                x1={cSquareX}
                y1={cSquareY + i * scale}
                x2={cSquareX + c * scale}
                y2={cSquareY + i * scale}
                stroke="#39ff14"
                strokeWidth="1"
                opacity="0.3"
              />
            </g>
          ))}
          
          <text
            x={cSquareX + c * scale / 2}
            y={cSquareY + c * scale / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#39ff14"
            fontSize="24"
            fontWeight="bold"
          >
            c² = {(c * c).toFixed(1)}
          </text>
        </g>
        
        {/* 公式显示 */}
        <text
          x="400"
          y="50"
          textAnchor="middle"
          fill="white"
          fontSize="32"
          fontWeight="bold"
        >
          a² + b² = c²
        </text>
        
        <text
          x="400"
          y="85"
          textAnchor="middle"
          fill="white"
          fontSize="20"
          opacity="0.7"
        >
          {a * a} + {b * b} = {(c * c).toFixed(1)}
        </text>
      </svg>
      
      {/* 控制按钮 */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setShowProof(!showProof)}
          className="px-4 py-2 bg-black/80 border border-white/20 rounded text-white/80 hover:text-white hover:border-neon-cyan/50 transition-all text-xs font-mono backdrop-blur-sm"
        >
          {showProof ? "隐藏证明" : "显示证明"}
        </button>
      </div>
      
      {/* 说明文字 */}
      <div className="absolute bottom-4 left-4 bg-black/90 p-4 rounded border border-white/20 backdrop-blur-md max-w-md">
        <div className="text-white font-mono text-sm space-y-2">
          <div className="text-neon-cyan font-bold">勾股定理</div>
          <div className="text-white/80 text-xs">
            在直角三角形中，两条直角边的平方和等于斜边的平方。
          </div>
          <div className="text-white/60 text-xs mt-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-[#ff4444] rounded"></div>
              <span>红色正方形：a² = {a * a} 个单位方块</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-[#4488ff] rounded"></div>
              <span>蓝色正方形：b² = {b * b} 个单位方块</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#39ff14] rounded"></div>
              <span>绿色正方形：c² = {(c * c).toFixed(1)} 个单位方块</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 证明说明（可选显示） */}
      {showProof && (
        <div className="absolute top-20 right-4 bg-black/95 p-5 rounded border border-neon-cyan/50 backdrop-blur-md max-w-xs">
          <div className="text-white font-mono text-xs space-y-3">
            <div className="text-neon-cyan font-bold text-sm">面积证明法</div>
            <div className="text-white/80">
              1. 红色正方形有 {a * a} 个单位方块
            </div>
            <div className="text-white/80">
              2. 蓝色正方形有 {b * b} 个单位方块
            </div>
            <div className="text-white/80">
              3. 总共：{a * a} + {b * b} = {a * a + b * b} 个方块
            </div>
            <div className="text-neon-green font-bold mt-2">
              4. 绿色正方形也有 {(c * c).toFixed(1)} 个方块
            </div>
            <div className="text-white/60 text-[10px] mt-3 pt-3 border-t border-white/20">
              因此：a² + b² = c²
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
