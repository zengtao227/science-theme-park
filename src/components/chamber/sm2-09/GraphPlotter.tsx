// SM2.09 Inequalities Module - Graph Plotter Component
// Displays two-variable inequality systems on a coordinate plane

import React, { useRef } from 'react';
import { satisfiesInequality } from '@/lib/sm2-09-solvers';

interface GraphPlotterProps {
    inequalities: string[];
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
    showLegend?: boolean;
}

export const GraphPlotter: React.FC<GraphPlotterProps> = ({
    inequalities,
    xMin = -10,
    xMax = 10,
    yMin = -10,
    yMax = 10,
    showLegend = true
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const width = 600;
    const height = 600;
    const padding = 50;

    // Colors for different inequalities
    const colors = [
        { fill: 'rgba(59, 130, 246, 0.2)', stroke: '#3B82F6', name: 'Blue' },
        { fill: 'rgba(239, 68, 68, 0.2)', stroke: '#EF4444', name: 'Red' },
        { fill: 'rgba(34, 197, 94, 0.2)', stroke: '#22C55E', name: 'Green' },
        { fill: 'rgba(168, 85, 247, 0.2)', stroke: '#A855F7', name: 'Purple' },
        { fill: 'rgba(251, 146, 60, 0.2)', stroke: '#FB923C', name: 'Orange' }
    ];

    // Convert coordinate to canvas position
    const xToCanvas = (x: number): number => {
        const range = xMax - xMin;
        const normalized = (x - xMin) / range;
        return padding + normalized * (width - 2 * padding);
    };

    const yToCanvas = (y: number): number => {
        const range = yMax - yMin;
        const normalized = (y - yMin) / range;
        // Flip y-axis (canvas y increases downward)
        return height - padding - normalized * (height - 2 * padding);
    };

    // Parse inequality to extract boundary line equation
    const parseBoundaryLine = (inequality: string): {
        slope: number | null;
        intercept: number;
        isVertical: boolean;
        verticalX?: number;
        inclusive: boolean;
    } | null => {
        try {
            // Determine if inclusive
            const inclusive = inequality.includes('≤') || inequality.includes('≥');

            // Replace inequality with equality to get boundary line
            const equation = inequality
                .replace(/[<>≤≥]/g, '=')
                .replace(/\s+/g, '');

            // Check for vertical line (x = constant)
            const verticalMatch = equation.match(/x=([+-]?\d+\.?\d*)/);
            if (verticalMatch) {
                return {
                    slope: null,
                    intercept: 0,
                    isVertical: true,
                    verticalX: parseFloat(verticalMatch[1]),
                    inclusive
                };
            }

            // Parse y = mx + b or similar forms
            // Handle forms like: y = 2x + 1, y = -x + 5, 2x + y = 6, etc.
            
            // Try to extract slope and intercept
            // Form: y = mx + b
            let slopeIntMatch = equation.match(/y=([+-]?\d*\.?\d*)x([+-]\d+\.?\d*)?/);
            if (slopeIntMatch) {
                const slopeStr = slopeIntMatch[1];
                const slope = slopeStr === '' || slopeStr === '+' ? 1 : 
                             slopeStr === '-' ? -1 : parseFloat(slopeStr);
                const intercept = slopeIntMatch[2] ? parseFloat(slopeIntMatch[2]) : 0;
                return { slope, intercept, isVertical: false, inclusive };
            }

            // Form: y = b (horizontal line)
            const horizontalMatch = equation.match(/y=([+-]?\d+\.?\d*)/);
            if (horizontalMatch) {
                return {
                    slope: 0,
                    intercept: parseFloat(horizontalMatch[1]),
                    isVertical: false,
                    inclusive
                };
            }

            // Form: ax + by = c (convert to y = mx + b)
            const standardMatch = equation.match(/([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)y=([+-]?\d+\.?\d*)/);
            if (standardMatch) {
                const a = parseFloat(standardMatch[1] || '1');
                const b = parseFloat(standardMatch[2] || '1');
                const c = parseFloat(standardMatch[3]);
                
                if (b !== 0) {
                    const slope = -a / b;
                    const intercept = c / b;
                    return { slope, intercept, isVertical: false, inclusive };
                }
            }

            return null;
        } catch (error) {
            console.error('Error parsing boundary line:', error);
            return null;
        }
    };

    // Draw the graph
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;

        // Vertical grid lines
        for (let x = xMin; x <= xMax; x++) {
            const canvasX = xToCanvas(x);
            ctx.beginPath();
            ctx.moveTo(canvasX, padding);
            ctx.lineTo(canvasX, height - padding);
            ctx.stroke();
        }

        // Horizontal grid lines
        for (let y = yMin; y <= yMax; y++) {
            const canvasY = yToCanvas(y);
            ctx.beginPath();
            ctx.moveTo(padding, canvasY);
            ctx.lineTo(width - padding, canvasY);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;

        // X-axis
        const yAxisCanvas = yToCanvas(0);
        ctx.beginPath();
        ctx.moveTo(padding, yAxisCanvas);
        ctx.lineTo(width - padding, yAxisCanvas);
        ctx.stroke();

        // Y-axis
        const xAxisCanvas = xToCanvas(0);
        ctx.beginPath();
        ctx.moveTo(xAxisCanvas, padding);
        ctx.lineTo(xAxisCanvas, height - padding);
        ctx.stroke();

        // Draw axis labels
        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('x', width - padding + 20, yAxisCanvas);
        ctx.fillText('y', xAxisCanvas, padding - 10);

        // Draw tick marks and labels
        for (let x = xMin; x <= xMax; x++) {
            if (x === 0) continue;
            const canvasX = xToCanvas(x);
            ctx.fillText(x.toString(), canvasX, yAxisCanvas + 20);
        }
        for (let y = yMin; y <= yMax; y++) {
            if (y === 0) continue;
            const canvasY = yToCanvas(y);
            ctx.textAlign = 'right';
            ctx.fillText(y.toString(), xAxisCanvas - 10, canvasY + 4);
        }

        // Shade intersection region
        const pixelSize = 2; // Size of each pixel to check
        const imageData = ctx.createImageData(width, height);

        for (let px = 0; px < width; px += pixelSize) {
            for (let py = 0; py < height; py += pixelSize) {
                // Convert pixel to coordinate
                const x = xMin + ((px - padding) / (width - 2 * padding)) * (xMax - xMin);
                const y = yMax - ((py - padding) / (height - 2 * padding)) * (yMax - yMin);

                // Check if point satisfies all inequalities
                const satisfiesAll = inequalities.every(ineq => satisfiesInequality(x, y, ineq));

                if (satisfiesAll) {
                    // Fill pixel with intersection color
                    for (let dx = 0; dx < pixelSize; dx++) {
                        for (let dy = 0; dy < pixelSize; dy++) {
                            const idx = ((py + dy) * width + (px + dx)) * 4;
                            if (idx < imageData.data.length) {
                                imageData.data[idx] = 147;     // R
                                imageData.data[idx + 1] = 51;  // G
                                imageData.data[idx + 2] = 234; // B (purple)
                                imageData.data[idx + 3] = 80;  // A (alpha)
                            }
                        }
                    }
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);

        // Draw boundary lines
        inequalities.forEach((inequality, index) => {
            const boundary = parseBoundaryLine(inequality);
            if (!boundary) return;

            const color = colors[index % colors.length];
            ctx.strokeStyle = color.stroke;
            ctx.lineWidth = 2;

            if (boundary.inclusive) {
                ctx.setLineDash([]);
            } else {
                ctx.setLineDash([5, 5]);
            }

            ctx.beginPath();

            if (boundary.isVertical && boundary.verticalX !== undefined) {
                // Draw vertical line
                const canvasX = xToCanvas(boundary.verticalX);
                ctx.moveTo(canvasX, padding);
                ctx.lineTo(canvasX, height - padding);
            } else if (boundary.slope !== null) {
                // Draw line y = mx + b
                const y1 = boundary.slope * xMin + boundary.intercept;
                const y2 = boundary.slope * xMax + boundary.intercept;

                ctx.moveTo(xToCanvas(xMin), yToCanvas(y1));
                ctx.lineTo(xToCanvas(xMax), yToCanvas(y2));
            }

            ctx.stroke();
            ctx.setLineDash([]);
        });

    }, [inequalities, xMin, xMax, yMin, yMax]);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="border border-gray-300 rounded-lg bg-white"
            />

            {/* Legend */}
            {showLegend && inequalities.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Inequalities:</p>
                    <div className="space-y-2">
                        {inequalities.map((inequality, index) => {
                            const color = colors[index % colors.length];
                            const boundary = parseBoundaryLine(inequality);
                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <div
                                        className="w-8 h-0.5"
                                        style={{
                                            backgroundColor: color.stroke,
                                            borderStyle: boundary?.inclusive ? 'solid' : 'dashed'
                                        }}
                                    />
                                    <span className="text-sm font-mono text-gray-800">
                                        {inequality}
                                    </span>
                                </div>
                            );
                        })}
                        <div className="mt-3 pt-3 border-t border-gray-300">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-purple-500 opacity-30 rounded" />
                                <span className="text-sm text-gray-700">
                                    Intersection (Solution Region)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
