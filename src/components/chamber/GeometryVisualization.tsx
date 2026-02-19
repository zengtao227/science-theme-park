"use client";

import { GM202Quest, Stage, GeometryData } from "@/lib/gm2-02-types";
import CoordinatePlotter2D from "./CoordinatePlotter2D";
import SpaceVisualizer3D from "./SpaceVisualizer3D";
import DistanceCalculator from "./DistanceCalculator";

interface GeometryVisualizationProps {
  quest: GM202Quest;
  stage: Stage;
  visualizationType: "2D" | "3D";
  data: GeometryData;
  translations: {
    line_equations: string;
    plane_geometry: string;
    spatial_relationships: string;
  };
}

export default function GeometryVisualization({
  quest,
  stage,
  visualizationType,
  data,
  translations
}: GeometryVisualizationProps) {
  // Determine which visualization to render based on stage and data
  const renderVisualization = () => {
    // If there are distance calculations, show distance calculator
    if (data.distances && data.distances.length > 0) {
      return <DistanceCalculator data={data} />;
    }

    // If stage is LINE_EQUATIONS and data is 2D, show 2D plotter
    if (stage === "LINE_EQUATIONS" && visualizationType === "2D") {
      return <CoordinatePlotter2D data={data} />;
    }

    // Otherwise show 3D visualizer
    return <SpaceVisualizer3D data={data} />;
  };

  return (
    <div className="w-full h-full">
      {renderVisualization()}
    </div>
  );
}
