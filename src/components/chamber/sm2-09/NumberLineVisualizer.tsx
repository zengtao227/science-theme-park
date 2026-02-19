// SM2.09 Inequalities Module - Number Line Visualizer Component
// Displays inequality solutions on an interactive number line

import React, { useState, useRef, useEffect } from 'react';
import { Interval } from '@/lib/sm2-09-types';

interface NumberLineVisualizerProps {
    intervals: Interval | Interval[];
    onBoundaryDrag?: (value: number, boundaryType: 'start' | 'end', intervalIndex: number) => void;
    minValue?: number;
    maxValue?: number;
    showIntervalNotation?: boolean;
    interactive?: boolean;
}

export const NumberLineVisualizer: React.FC<NumberLineVisualizerProps> = ({
    intervals,
    onBoundaryDrag,
    minValue = -10,
    maxValue = 10,
    showIntervalNotation = true,
    interactive = false
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [dragging, setDragging] = useState<{
        intervalIndex: number;
        boundaryType: 'start' | 'end';
    } | null>(null);

    const width = 800;
    const height = 150;
    const padding = 60;
    const lineY = height / 2;
    const tickHeight = 10;

    // Normalize intervals to array
    const intervalArray = Array.isArray(intervals) ? intervals : [intervals];

    // Convert value to x coordinate
    const valueToX = (value: number): number => {
        if (value === -Infinity) return padding;
        if (value === Infinity) return width - padding;
        const range = maxValue - minValue;
        const normalized = (value - minValue) / range;
        return padding + normalized * (width - 2 * padding);
    };

    // Convert x coordinate to value
    const xToValue = (x: number): number => {
        const range = maxValue - minValue;
        const normalized = (x - padding) / (width - 2 * padding);
        return minValue + normalized * range;
    };

    // Handle mouse down on boundary point
    const handleMouseDown = (intervalIndex: number, boundaryType: 'start' | 'end') => {
        if (!interactive) return;
        setDragging({ intervalIndex, boundaryType });
    };

    // Handle mouse move
    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!dragging || !onBoundaryDrag || !svgRef.current) return;

        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const value = xToValue(x);

        // Clamp value to min/max
        const clampedValue = Math.max(minValue, Math.min(maxValue, value));
        
        onBoundaryDrag(clampedValue, dragging.boundaryType, dragging.intervalIndex);
    };

    // Handle mouse up
    const handleMouseUp = () => {
        setDragging(null);
    };

    // Add global mouse up listener
    useEffect(() => {
        const handleGlobalMouseUp = () => setDragging(null);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, []);

    // Generate tick marks
    const ticks = [];
    const tickInterval = Math.ceil((maxValue - minValue) / 10);
    for (let i = minValue; i <= maxValue; i += tickInterval) {
        ticks.push(i);
    }

    // Convert interval to string notation
    const intervalToString = (interval: Interval): string => {
        const start = interval.start === -Infinity ? '-∞' : interval.start.toFixed(1);
        const end = interval.end === Infinity ? '∞' : interval.end.toFixed(1);
        const startBracket = interval.startInclusive ? '[' : '(';
        const endBracket = interval.endInclusive ? ']' : ')';
        return `${startBracket}${start}, ${end}${endBracket}`;
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <svg
                ref={svgRef}
                width={width}
                height={height}
                className="border border-gray-300 rounded-lg bg-white"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Main number line */}
                <line
                    x1={padding}
                    y1={lineY}
                    x2={width - padding}
                    y2={lineY}
                    stroke="#374151"
                    strokeWidth={2}
                />

                {/* Arrow heads */}
                <polygon
                    points={`${width - padding},${lineY} ${width - padding - 8},${lineY - 4} ${width - padding - 8},${lineY + 4}`}
                    fill="#374151"
                />
                <polygon
                    points={`${padding},${lineY} ${padding + 8},${lineY - 4} ${padding + 8},${lineY + 4}`}
                    fill="#374151"
                />

                {/* Tick marks and labels */}
                {ticks.map((tick) => {
                    const x = valueToX(tick);
                    return (
                        <g key={tick}>
                            <line
                                x1={x}
                                y1={lineY - tickHeight}
                                x2={x}
                                y2={lineY + tickHeight}
                                stroke="#374151"
                                strokeWidth={1}
                            />
                            <text
                                x={x}
                                y={lineY + tickHeight + 20}
                                textAnchor="middle"
                                fontSize={12}
                                fill="#374151"
                            >
                                {tick}
                            </text>
                        </g>
                    );
                })}

                {/* Solution intervals */}
                {intervalArray.map((interval, index) => {
                    const startX = valueToX(interval.start as number);
                    const endX = valueToX(interval.end as number);
                    const isValid = interval.start < interval.end;

                    if (!isValid) return null;

                    return (
                        <g key={index}>
                            {/* Shaded region */}
                            <rect
                                x={startX}
                                y={lineY - 8}
                                width={endX - startX}
                                height={16}
                                fill="#3B82F6"
                                fillOpacity={0.3}
                            />

                            {/* Start boundary point */}
                            {interval.start !== -Infinity && (
                                <g>
                                    <circle
                                        cx={startX}
                                        cy={lineY}
                                        r={6}
                                        fill={interval.startInclusive ? '#3B82F6' : 'white'}
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        className={interactive ? 'cursor-pointer hover:r-8' : ''}
                                        onMouseDown={() => handleMouseDown(index, 'start')}
                                    />
                                </g>
                            )}

                            {/* End boundary point */}
                            {interval.end !== Infinity && (
                                <g>
                                    <circle
                                        cx={endX}
                                        cy={lineY}
                                        r={6}
                                        fill={interval.endInclusive ? '#3B82F6' : 'white'}
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        className={interactive ? 'cursor-pointer hover:r-8' : ''}
                                        onMouseDown={() => handleMouseDown(index, 'end')}
                                    />
                                </g>
                            )}

                            {/* Arrows for infinite bounds */}
                            {interval.start === -Infinity && (
                                <line
                                    x1={padding}
                                    y1={lineY}
                                    x2={endX}
                                    y2={lineY}
                                    stroke="#3B82F6"
                                    strokeWidth={4}
                                />
                            )}
                            {interval.end === Infinity && (
                                <line
                                    x1={startX}
                                    y1={lineY}
                                    x2={width - padding}
                                    y2={lineY}
                                    stroke="#3B82F6"
                                    strokeWidth={4}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Interval notation display */}
            {showIntervalNotation && (
                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Solution Set:</p>
                    <p className="text-lg font-mono font-semibold text-gray-800">
                        {intervalArray.map((interval, index) => (
                            <span key={index}>
                                {index > 0 && ' ∪ '}
                                {intervalToString(interval)}
                            </span>
                        ))}
                    </p>
                </div>
            )}
        </div>
    );
};
