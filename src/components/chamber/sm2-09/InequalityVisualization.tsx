// SM2.09 Inequalities Module - Inequality Visualization Container Component
// Routes to appropriate visualizer based on quest type

import React from 'react';
import { SM209Quest, InequalityVisualizationProps } from '@/lib/sm2-09-types';
import { NumberLineVisualizer } from './NumberLineVisualizer';
import { GraphPlotter } from './GraphPlotter';
import { SolutionSetVisualizer } from './SolutionSetVisualizer';

export const InequalityVisualization: React.FC<InequalityVisualizationProps> = ({
    quest,
    stage,
    onBoundaryDrag,
    translations
}) => {
    // Determine which visualization to show based on quest type and stage
    const renderVisualization = () => {
        // For SYSTEMS stage with two-variable inequalities, show graph plotter
        if (stage === 'SYSTEMS' && quest.systemInequalities && quest.variable?.includes(',')) {
            return (
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {translations.graph}
                        </h3>
                        <GraphPlotter
                            inequalities={quest.systemInequalities}
                            xMin={-10}
                            xMax={10}
                            yMin={-10}
                            yMax={10}
                            showLegend={true}
                        />
                    </div>
                </div>
            );
        }

        // For one-variable inequalities, show number line and solution set
        if (quest.solutionInterval) {
            return (
                <div className="space-y-6">
                    {/* Number Line Visualizer */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {translations.number_line}
                        </h3>
                        <NumberLineVisualizer
                            intervals={quest.solutionInterval}
                            onBoundaryDrag={onBoundaryDrag}
                            minValue={-10}
                            maxValue={10}
                            showIntervalNotation={true}
                            interactive={!!onBoundaryDrag}
                        />
                    </div>

                    {/* Solution Set Visualizer */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {translations.solution_set}
                        </h3>
                        <SolutionSetVisualizer
                            intervals={quest.solutionInterval}
                            solutionType={quest.solutionType}
                            showIntervalNotation={true}
                            showSetBuilder={true}
                            showGraphical={false} // Already shown above
                            variable={quest.variable}
                        />
                    </div>
                </div>
            );
        }

        // For SYSTEMS stage with one-variable compound inequalities
        if (stage === 'SYSTEMS' && quest.systemInequalities && !quest.variable?.includes(',')) {
            return (
                <div className="space-y-6">
                    {/* Number Line Visualizer */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {translations.number_line}
                        </h3>
                        <NumberLineVisualizer
                            intervals={quest.solutionInterval || { start: 0, end: 0, startInclusive: false, endInclusive: false }}
                            onBoundaryDrag={onBoundaryDrag}
                            minValue={-10}
                            maxValue={10}
                            showIntervalNotation={true}
                            interactive={!!onBoundaryDrag}
                        />
                    </div>

                    {/* System Information */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">
                            System of Inequalities:
                        </h4>
                        <div className="space-y-1">
                            {quest.systemInequalities.map((ineq, index) => (
                                <p key={index} className="text-sm font-mono text-blue-800">
                                    {ineq}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Solution Set Visualizer */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {translations.solution_set}
                        </h3>
                        <SolutionSetVisualizer
                            intervals={quest.solutionInterval || { start: 0, end: 0, startInclusive: false, endInclusive: false }}
                            solutionType={quest.solutionType}
                            showIntervalNotation={true}
                            showSetBuilder={true}
                            showGraphical={false}
                            variable={quest.variable}
                        />
                    </div>
                </div>
            );
        }

        // For ABSOLUTE_VALUE stage
        if (stage === 'ABSOLUTE_VALUE') {
            return (
                <div className="space-y-6">
                    {/* Absolute Value Expression */}
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="text-sm font-semibold text-yellow-900 mb-2">
                            Absolute Value Expression:
                        </h4>
                        <p className="text-lg font-mono text-yellow-800">
                            {quest.expression}
                        </p>
                        {quest.absoluteValueExpression && (
                            <p className="text-sm text-yellow-700 mt-2">
                                Inner expression: {quest.absoluteValueExpression}
                            </p>
                        )}
                    </div>

                    {/* Number Line Visualizer */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {translations.number_line}
                        </h3>
                        <NumberLineVisualizer
                            intervals={quest.solutionInterval || { start: 0, end: 0, startInclusive: false, endInclusive: false }}
                            onBoundaryDrag={onBoundaryDrag}
                            minValue={-10}
                            maxValue={10}
                            showIntervalNotation={true}
                            interactive={!!onBoundaryDrag}
                        />
                    </div>

                    {/* Solution Set Visualizer */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {translations.solution_set}
                        </h3>
                        <SolutionSetVisualizer
                            intervals={quest.solutionInterval || { start: 0, end: 0, startInclusive: false, endInclusive: false }}
                            solutionType={quest.solutionType}
                            showIntervalNotation={true}
                            showSetBuilder={true}
                            showGraphical={false}
                            variable={quest.variable}
                        />
                    </div>
                </div>
            );
        }

        // Default: INEQUALITY_BASICS stage
        return (
            <div className="space-y-6">
                {/* Number Line Visualizer */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {translations.number_line}
                    </h3>
                    <NumberLineVisualizer
                        intervals={quest.solutionInterval || { start: 0, end: 0, startInclusive: false, endInclusive: false }}
                        onBoundaryDrag={onBoundaryDrag}
                        minValue={-10}
                        maxValue={10}
                        showIntervalNotation={true}
                        interactive={!!onBoundaryDrag}
                    />
                </div>

                {/* Solution Set Visualizer */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {translations.solution_set}
                    </h3>
                    <SolutionSetVisualizer
                        intervals={quest.solutionInterval || { start: 0, end: 0, startInclusive: false, endInclusive: false }}
                        solutionType={quest.solutionType}
                        showIntervalNotation={true}
                        showSetBuilder={true}
                        showGraphical={false}
                        variable={quest.variable}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto p-6">
                {/* Quest Information */}
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {quest.id}
                            </h2>
                            <div className="flex gap-2 mt-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                    {quest.difficulty}
                                </span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                                    {quest.stage}
                                </span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                    {quest.inequalityType}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Inequality:</p>
                        <p className="text-2xl font-mono font-bold text-gray-800">
                            {quest.expression}
                        </p>
                    </div>
                </div>

                {/* Visualizations */}
                {renderVisualization()}
            </div>
        </div>
    );
};
