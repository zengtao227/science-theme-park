// SM2.09 Inequalities Module - Solution Set Visualizer Component
// Displays solution sets in multiple representations

import React from 'react';
import { Interval, SolutionType } from '@/lib/sm2-09-types';
import { NumberLineVisualizer } from './NumberLineVisualizer';

interface SolutionSetVisualizerProps {
    intervals: Interval | Interval[];
    solutionType: SolutionType;
    showIntervalNotation?: boolean;
    showSetBuilder?: boolean;
    showGraphical?: boolean;
    variable?: string;
}

export const SolutionSetVisualizer: React.FC<SolutionSetVisualizerProps> = ({
    intervals,
    solutionType,
    showIntervalNotation = true,
    showSetBuilder = true,
    showGraphical = true,
    variable = 'x'
}) => {
    // Convert interval to string notation
    const intervalToString = (interval: Interval): string => {
        const start = interval.start === -Infinity ? '-∞' : 
                     typeof interval.start === 'number' ? interval.start.toFixed(1) : interval.start;
        const end = interval.end === Infinity ? '∞' : 
                   typeof interval.end === 'number' ? interval.end.toFixed(1) : interval.end;
        const startBracket = interval.startInclusive ? '[' : '(';
        const endBracket = interval.endInclusive ? ']' : ')';
        return `${startBracket}${start}, ${end}${endBracket}`;
    };

    // Convert interval to set-builder notation
    const intervalToSetBuilder = (interval: Interval): string => {
        const start = interval.start;
        const end = interval.end;
        const startOp = interval.startInclusive ? '≤' : '<';
        const endOp = interval.endInclusive ? '≤' : '<';

        if (start === -Infinity && end === Infinity) {
            return `{${variable} | ${variable} ∈ ℝ}`;
        } else if (start === -Infinity) {
            return `{${variable} | ${variable} ${endOp} ${end}}`;
        } else if (end === Infinity) {
            return `{${variable} | ${variable} ${startOp === '≤' ? '≥' : '>'} ${start}}`;
        } else {
            return `{${variable} | ${start} ${startOp} ${variable} ${endOp} ${end}}`;
        }
    };

    // Render based on solution type
    const renderSolutionSet = () => {
        switch (solutionType) {
            case 'EMPTY':
                return (
                    <div className="text-center p-8">
                        <div className="text-6xl mb-4">∅</div>
                        <p className="text-lg font-semibold text-gray-700">Empty Set</p>
                        <p className="text-sm text-gray-500 mt-2">No solution exists</p>
                    </div>
                );

            case 'ALL_REALS':
                return (
                    <div className="text-center p-8">
                        <div className="text-6xl mb-4">ℝ</div>
                        <p className="text-lg font-semibold text-gray-700">All Real Numbers</p>
                        <p className="text-sm text-gray-500 mt-2">Every value of {variable} is a solution</p>
                    </div>
                );

            case 'POINT':
                const pointInterval = Array.isArray(intervals) ? intervals[0] : intervals;
                return (
                    <div className="text-center p-8">
                        <div className="text-4xl mb-4">{`{${pointInterval.start}}`}</div>
                        <p className="text-lg font-semibold text-gray-700">Single Point</p>
                        <p className="text-sm text-gray-500 mt-2">
                            {variable} = {pointInterval.start}
                        </p>
                    </div>
                );

            case 'INTERVAL':
            default:
                const intervalArray = Array.isArray(intervals) ? intervals : [intervals];
                
                return (
                    <div className="space-y-6">
                        {/* Interval Notation */}
                        {showIntervalNotation && (
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-sm font-semibold text-blue-900 mb-2">
                                    Interval Notation:
                                </p>
                                <p className="text-xl font-mono font-bold text-blue-800">
                                    {intervalArray.map((interval, index) => (
                                        <span key={index}>
                                            {index > 0 && ' ∪ '}
                                            {intervalToString(interval)}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}

                        {/* Set-Builder Notation */}
                        {showSetBuilder && (
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <p className="text-sm font-semibold text-green-900 mb-2">
                                    Set-Builder Notation:
                                </p>
                                <p className="text-lg font-mono text-green-800">
                                    {intervalArray.length === 1 ? (
                                        intervalToSetBuilder(intervalArray[0])
                                    ) : (
                                        <>
                                            {intervalArray.map((interval, index) => (
                                                <span key={index}>
                                                    {index > 0 && ' ∪ '}
                                                    {intervalToSetBuilder(interval)}
                                                </span>
                                            ))}
                                        </>
                                    )}
                                </p>
                            </div>
                        )}

                        {/* Graphical Representation */}
                        {showGraphical && (
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <p className="text-sm font-semibold text-purple-900 mb-4">
                                    Graphical Representation:
                                </p>
                                <NumberLineVisualizer
                                    intervals={intervals}
                                    showIntervalNotation={false}
                                    interactive={false}
                                />
                            </div>
                        )}

                        {/* Solution Description */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                Solution Description:
                            </p>
                            <p className="text-sm text-gray-600">
                                {intervalArray.length === 1 ? (
                                    <>
                                        The solution includes all values of {variable} from{' '}
                                        {intervalArray[0].start === -Infinity ? 'negative infinity' : intervalArray[0].start}{' '}
                                        {intervalArray[0].startInclusive ? '(inclusive)' : '(exclusive)'} to{' '}
                                        {intervalArray[0].end === Infinity ? 'positive infinity' : intervalArray[0].end}{' '}
                                        {intervalArray[0].endInclusive ? '(inclusive)' : '(exclusive)'}.
                                    </>
                                ) : (
                                    <>
                                        The solution is a union of {intervalArray.length} intervals. 
                                        This means {variable} can be in any of these ranges.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Solution Set</h3>
                <p className="text-sm text-gray-600">
                    Multiple representations of the inequality solution
                </p>
            </div>
            {renderSolutionSet()}
        </div>
    );
};
