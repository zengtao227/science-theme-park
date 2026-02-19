// GM2.02 Analytical Geometry - Type Definitions

export type Difficulty = "BASIC" | "CORE" | "ADVANCED" | "ELITE";

export type Stage = "LINE_EQUATIONS" | "PLANE_GEOMETRY" | "SPATIAL_RELATIONSHIPS";

export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Line2D {
  type: "2D";
  point: Point2D;
  direction: Vector2D;
  color: string;
}

export interface Line3D {
  type: "3D";
  point: Point3D;
  direction: Vector3D;
  color: string;
}

export type Line = Line2D | Line3D;

export interface Plane {
  coefficients: [number, number, number, number]; // [A, B, C, D] for Ax+By+Cz+D=0
  color: string;
  opacity: number;
}

export interface Point {
  coordinates: [number, number] | [number, number, number];
  label: string;
  color: string;
}

export interface Distance {
  from: Point;
  to: Point | Line | Plane;
  value: number;
  showSegment: boolean;
}

export interface GeometryData {
  lines?: Line[];
  planes?: Plane[];
  points?: Point[];
  distances?: Distance[];
}

export interface QuestSlot {
  id: string;
  labelLatex: string;
  placeholder: string;
  expected: string | number;
  type: "number" | "expression";
}

export interface GM202Quest {
  id: string;
  difficulty: Difficulty;
  stage: Stage;
  
  // For line equation quests
  points?: Array<[number, number] | [number, number, number]>;
  slope?: number;
  yIntercept?: number;
  
  // For plane equation quests
  normalVector?: [number, number, number];
  planePoint?: [number, number, number];
  
  // For distance quests
  distanceFrom?: [number, number] | [number, number, number];
  distanceTo?: {
    type: "line" | "plane";
    equation: string;
    coefficients?: number[];
  };
  
  // Common fields
  promptLatex: string;
  expressionLatex: string;
  targetLatex: string;
  slots: QuestSlot[];
  correctLatex: string;
  answer: string | number;
  visualizationData: GeometryData;
}

export interface LineEquation {
  slope: number;
  yIntercept: number;
  equation: string;
}

export interface PlaneEquation {
  A: number;
  B: number;
  C: number;
  D: number;
  equation: string;
}

export type RelationshipType = "parallel" | "perpendicular" | "intersecting" | "skew";
