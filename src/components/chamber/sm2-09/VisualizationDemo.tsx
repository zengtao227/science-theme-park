// SM2.09 Inequalities Module - Visualization Demo Component
// Demo component to test and showcase the visualization components

import React, { useState } from 'react';
import { NumberLineVisualizer } from './NumberLineVisualizer';
import { GraphPlotter } from './GraphPlotter';
import { SolutionSetVisualizer } from './SolutionSetVisualizer';
import { InequalityVisualization } from './InequalityVisualization';
import { SM209Quest, Interval } from '@/lib/sm2-09-types';

export const VisualizationDemo: React.FC = () => {
    const [activeDemo, setActiveDemo] = useState<'numberLine' | 'graph' | 'solutionSet' | 'full'>('numberLine');

    // Sample intervals for demos
    const singleInterval: Interval = {
        start: -3,
        end: 5,
        startInclusive: false,
        endInclusive: true
    };

    const unionIntervals: Interval[] = [
        { start: -Infinity, end: -2, startInclusive: false, endInclusive: true },
        { start: 3, end: Infinity, startInclusive: true, endInclusive: false }
    ];

    // Sample quest for full visualization
    const sampleQuest: SM209Quest = {
        id: 'DEMO_QUEST_1',
        difficulty: 'CORE',
        stage: 'INEQUALITY_BASICS',
        inequalityType: 'LINEAR',
        expression: '2x + 3 < 11',
        variable: 'x',
        coefficients: [2],
        constants: [3, 11],
        promptLatex: 'Solve: $2x + 3 < 11$',
        expressionLatex: '2x + 3 < 11',
        targetLatex: 'x',
        solutionType: 'INTERVAL',
        solutionInterval: { start: -Infinity, end: 4, startInclusive: false, endInclusive: false },
        solutionSet: '{x | x < 4}',
        slots: [{
            id: 'answer',
            labelLatex: 'Solution:',
            placeholder: 'Enter interval notation',
            expected: '(-∞, 4)',
            acceptedFormats: ['interval', 'set-builder', 'inequality']
        }],
        correctLatex: '(-\\infty, 4)',
        answer: '(-∞, 4)'
    };

    const systemQuest: SM209Quest = {
        ...sampleQuest,
        id: 'DEMO_QUEST_2',
        stage: 'SYSTEMS',
        inequalityType: 'SYSTEM',
        expression: 'y > x + 1 AND y < -x + 5',
        variable: 'x,y',
        targetLatex: 'x, y',
        systemInequalities: ['y > x + 1', 'y < -x + 5']
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    SM2.09 Visualization Components Demo
                </h1>

                {/* Demo Selector */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveDemo('numberLine')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                            activeDemo === 'numberLine'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Number Line
                    </button>
                    <button
                        onClick={() => setActiveDemo('graph')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                            activeDemo === 'graph'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Graph Plotter
                    </button>
                    <button
                        onClick={() => setActiveDemo('solutionSet')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                            activeDemo === 'solutionSet'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Solution Set
                    </button>
                    <button
                        onClick={() => setActiveDemo('full')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                            activeDemo === 'full'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Full Visualization
                    </button>
                </div>

                {/* Demo Content */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {activeDemo === 'numberLine' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Number Line Visualizer
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Displays inequality solutions on an interactive number line with proper boundary markers.
                                </p>
                                
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                            Single Interval: (-3, 5]
                                        </h3>
                                        <NumberLineVisualizer
                                            intervals={singleInterval}
                                            minValue={-10}
                                            maxValue={10}
                                            showIntervalNotation={true}
                                            interactive={false}
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                            Union of Intervals: (-∞, -2] ∪ [3, ∞)
                                        </h3>
                                        <NumberLineVisualizer
                                            intervals={unionIntervals}
                                            minValue={-10}
                                            maxValue={10}
                                            showIntervalNotation={true}
                                            interactive={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeDemo === 'graph' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Graph Plotter
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Visualizes systems of two-variable linear inequalities with shaded solution regions.
                            </p>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                        System: y &gt; x + 1 AND y &lt; -x + 5
                                    </h3>
                                    <GraphPlotter
                                        inequalities={['y > x + 1', 'y < -x + 5']}
                                        xMin={-5}
                                        xMax={5}
                                        yMin={-5}
                                        yMax={8}
                                        showLegend={true}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeDemo === 'solutionSet' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Solution Set Visualizer
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Displays solutions in multiple representations: interval notation, set-builder notation, and graphical.
                            </p>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                        Single Interval Solution
                                    </h3>
                                    <SolutionSetVisualizer
                                        intervals={singleInterval}
                                        solutionType="INTERVAL"
                                        showIntervalNotation={true}
                                        showSetBuilder={true}
                                        showGraphical={true}
                                        variable="x"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                        Union of Intervals
                                    </h3>
                                    <SolutionSetVisualizer
                                        intervals={unionIntervals}
                                        solutionType="INTERVAL"
                                        showIntervalNotation={true}
                                        showSetBuilder={true}
                                        showGraphical={true}
                                        variable="x"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                        Empty Set
                                    </h3>
                                    <SolutionSetVisualizer
                                        intervals={{ start: 0, end: 0, startInclusive: false, endInclusive: false }}
                                        solutionType="EMPTY"
                                        showIntervalNotation={true}
                                        showSetBuilder={true}
                                        showGraphical={false}
                                        variable="x"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeDemo === 'full' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Full Inequality Visualization
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Complete visualization container that routes to appropriate visualizers based on quest type.
                                </p>
                                
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                            Linear Inequality (INEQUALITY_BASICS)
                                        </h3>
                                        <InequalityVisualization
                                            quest={sampleQuest}
                                            stage="INEQUALITY_BASICS"
                                            translations={{
                                                number_line: 'Number Line',
                                                graph: 'Graph',
                                                solution_set: 'Solution Set'
                                            }}
                                        />
                                    </div>

                                    <div className="mt-12">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                            System of Inequalities (SYSTEMS)
                                        </h3>
                                        <InequalityVisualization
                                            quest={systemQuest}
                                            stage="SYSTEMS"
                                            translations={{
                                                number_line: 'Number Line',
                                                graph: 'Graph',
                                                solution_set: 'Solution Set'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
