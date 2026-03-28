"use client";

import { GM202Quest, Stage, GeometryData } from "@/lib/gm2-02-types";
import CoordinatePlotter2D from "./CoordinatePlotter2D";
import SpaceVisualizer3D from "./SpaceVisualizer3D";

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
  void quest;
  void stage;
  void translations;

  const renderVisualization = () => {
    if (visualizationType === "2D") {
      return <CoordinatePlotter2D data={data} />;
    }
    return <SpaceVisualizer3D data={data} />;
  };

  return (
    <div className="w-full h-full flex">
      {renderVisualization()}
    </div>
  );
}
