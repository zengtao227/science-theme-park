"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { clsx } from 'clsx';

interface ResizableLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  moduleCode?: string; // 用于保存每个模块的独立位置
  defaultLeftWidth?: number; // 默认50%
  minLeftWidth?: number;     // 最小25%
  maxLeftWidth?: number;     // 最大75%
}

export default function ResizableLayout({
  leftContent,
  rightContent,
  moduleCode,
  defaultLeftWidth = 50,
  minLeftWidth = 25,
  maxLeftWidth = 75,
}: ResizableLayoutProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 从localStorage加载保存的位置
  useEffect(() => {
    if (moduleCode) {
      const saved = localStorage.getItem(`module-${moduleCode}-split`);
      if (saved) {
        const width = parseFloat(saved);
        if (width >= minLeftWidth && width <= maxLeftWidth) {
          setLeftWidth(width);
        }
      }
    }
  }, [moduleCode, minLeftWidth, maxLeftWidth]);

  // 保存位置到localStorage
  const savePosition = useCallback((width: number) => {
    if (moduleCode) {
      localStorage.setItem(`module-${moduleCode}-split`, width.toString());
    }
  }, [moduleCode]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const clampedWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, newWidth));
    
    setLeftWidth(clampedWidth);
  }, [isDragging, minLeftWidth, maxLeftWidth]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      savePosition(leftWidth);
    }
  }, [isDragging, leftWidth, savePosition]);

  // 双击重置为默认50/50
  const handleDoubleClick = useCallback(() => {
    setLeftWidth(defaultLeftWidth);
    savePosition(defaultLeftWidth);
  }, [defaultLeftWidth, savePosition]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} className="flex h-full w-full overflow-hidden">
      {/* 左侧内容区 */}
      <div 
        className="overflow-y-auto overflow-x-hidden"
        style={{ width: `${leftWidth}%` }}
      >
        {leftContent}
      </div>

      {/* 可拖动分界线 */}
      <div
        className={clsx(
          "relative flex-shrink-0 w-1 bg-white/10 hover:bg-neon-cyan/50 transition-colors cursor-col-resize group",
          isDragging && "bg-neon-cyan/70"
        )}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        title="拖动调整大小 | 双击重置为50/50"
      >
        {/* 拖动手柄图标 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="flex flex-col gap-1 text-white/60">
            <div className="w-1 h-1 rounded-full bg-current"></div>
            <div className="w-1 h-1 rounded-full bg-current"></div>
            <div className="w-1 h-1 rounded-full bg-current"></div>
          </div>
        </div>
      </div>

      {/* 右侧可视化区 - 响应式缩放 */}
      <div 
        className="overflow-hidden"
        style={{ width: `${100 - leftWidth}%` }}
      >
        {rightContent}
      </div>
    </div>
  );
}
