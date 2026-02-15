"use client";

import ChamberLayout from "@/components/layout/ChamberLayout";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";
import GeometryVisualization from "@/components/chamber/sm3-05/GeometryVisualization";

type Stage = "POLYHEDRA" | "CROSS_SECTIONS" | "SPATIAL_REASONING";

interface SM305Quest extends Quest {
  stage: Stage;
}

function buildPool(difficulty: Difficulty, stage: Stage): SM305Quest[] {
  return [
    {
      id: `${stage}_${difficulty}_1`,
      stage,
      difficulty,
      promptLatex: "Geometry question placeholder",
      expressionLatex: "",
      targetLatex: "",
      slots: [],
      correctLatex: "answer",
    },
  ];
}

export default function SM305Page() {
  const questManager = useQuestManager<SM305Quest, Stage>({
    buildPool,
    initialStage: "POLYHEDRA",
  });

  return (
    <ChamberLayout
      questManager={questManager}
      visualizationComponent={<GeometryVisualization stage={questManager.stage} />}
    />
  );
}
