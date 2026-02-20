"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguage, TranslationKeys } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import ChamberLayout from "@/components/layout/ChamberLayout";
import ThalesTowerCanvas from "@/components/chamber/em1-01/ThalesTowerCanvas";
import { Difficulty, Quest, useQuestManager } from "@/hooks/useQuestManager";

type Stage = "BASICS" | "MEASURE" | "SURVEY";

interface ThalesQuest extends Quest {
  stage: Stage;
  concept?: string;
}

const POLE_HEIGHT = 2; // Fixed pole height for visualization context

function buildStagePool(
  getT: any,
  tObj: TranslationKeys['em1_01'],
  difficulty: Difficulty,
  stage: Stage
): ThalesQuest[] {
  const quests: ThalesQuest[] = [];
  const t = getT;

  if (stage === "BASICS") {
    if (difficulty === "BASIC") {
      quests.push(
        { id: "SIM-B1", difficulty, stage, concept: "ratio", promptLatex: t("em1_01.prompts.sim_ratio", { a: 3, b: 4, c: 5, s: 6 }), expressionLatex: "\\\\text{Ratio } k = 6/3 = 2", targetLatex: "\\\\text{Long}", slots: [{ id: "l", labelLatex: "L", placeholder: "10", expected: 10 }], correctLatex: "10", hintLatex: ["5 * 2"] },
        { id: "SIM-B2", difficulty, stage, concept: "scale", promptLatex: t("em1_01.prompts.sim_scale", { k: 2, l: 5 }), expressionLatex: "L_{new} = k \\times L_{old}", targetLatex: "L_{new}", slots: [{ id: "l", labelLatex: "L", placeholder: "10", expected: 10 }], correctLatex: "10", hintLatex: ["Multiply"] },
        { id: "SIM-B3", difficulty, stage, concept: "missing", promptLatex: t("em1_01.prompts.sim_missing", { ab: 2, de: 6, ac: 3 }), expressionLatex: "DE/AB = 6/2 = 3", targetLatex: "DF", slots: [{ id: "df", labelLatex: "DF", placeholder: "9", expected: 9 }], correctLatex: "9", hintLatex: ["Scale factor 3"] },
        { id: "SIM-B4", difficulty, stage, concept: "ratio", promptLatex: "Triangle 1: 5, 12, 13. Triangle 2 scale 0.5. Hypotenuse?", expressionLatex: "13 \\times 0.5", targetLatex: "H", slots: [{ id: "h", labelLatex: "H", placeholder: "6.5", expected: 6.5 }], correctLatex: "6.5", hintLatex: ["Half"] },
        { id: "SIM-B5", difficulty, stage, concept: "scale", promptLatex: "Map scale 1:100. Real distance 50m. Map distance?", expressionLatex: "50 / 100", targetLatex: "d", slots: [{ id: "d", labelLatex: "d (m)", placeholder: "0.5", expected: 0.5 }], correctLatex: "0.5 m", hintLatex: ["Divide by 100"] }
      );
    } else if (difficulty === "CORE") {
      quests.push(
        { id: "SIM-C1", difficulty, stage, concept: "ratio", promptLatex: t("em1_01.prompts.sim_ratio", { a: 8, b: 15, c: 17, s: 4 }), expressionLatex: "k = 4/8 = 0.5", targetLatex: "\\\\text{Long}", slots: [{ id: "l", labelLatex: "L", placeholder: "8.5", expected: 8.5 }], correctLatex: "8.5", hintLatex: ["17 * 0.5"] },
        { id: "SIM-C2", difficulty, stage, concept: "area", promptLatex: "Scale factor k=3. Area factor?", expressionLatex: "A_{new} = k^2 A_{old}", targetLatex: "k^2", slots: [{ id: "k", labelLatex: "F", placeholder: "9", expected: 9 }], correctLatex: "9", hintLatex: ["Square"] },
        { id: "SIM-C3", difficulty, stage, concept: "missing", promptLatex: "ABC ~ DEF. A=30°, B=60°. Angle F?", expressionLatex: "C = 180-90=90. F=C", targetLatex: "F", slots: [{ id: "f", labelLatex: "F", placeholder: "90", expected: 90 }], correctLatex: "90°", hintLatex: ["Angles match"] },
        { id: "SIM-C4", difficulty, stage, concept: "ratio", promptLatex: "Sides 10, 24, 26. Similar shortest 5. Perimeter?", expressionLatex: "k=0.5. P = (10+24+26)/2", targetLatex: "P", slots: [{ id: "p", labelLatex: "P", placeholder: "30", expected: 30 }], correctLatex: "30", hintLatex: ["Half perimeter"] },
        { id: "SIM-C5", difficulty, stage, concept: "scale", promptLatex: "Model car 1:24. Real length 4.8m. Model length cm?", expressionLatex: "480 / 24", targetLatex: "L", slots: [{ id: "l", labelLatex: "cm", placeholder: "20", expected: 20 }], correctLatex: "20 cm", hintLatex: ["Convert to cm first"] }
      );
    } else if (difficulty === "ADVANCED") {
      quests.push(
        { id: "SIM-A1", difficulty, stage, concept: "area", promptLatex: "Area ratio 1:16. Scale factor k?", expressionLatex: "k = \\\\\sqrt{16}", targetLatex: "k", slots: [{ id: "k", labelLatex: "k", placeholder: "4", expected: 4 }], correctLatex: "4", hintLatex: ["Sqrt area"] },
        { id: "SIM-A2", difficulty, stage, concept: "volume", promptLatex: "Scale factor k=2. Volume factor?", expressionLatex: "V \\propto k^3", targetLatex: "k^3", slots: [{ id: "f", labelLatex: "F", placeholder: "8", expected: 8 }], correctLatex: "8", hintLatex: ["Cube"] },
        { id: "SIM-A3", difficulty, stage, concept: "shadow", promptLatex: "Cone height h, radius r. Cut at h/2. Radius of cut?", expressionLatex: "r/2", targetLatex: "r_{new}", slots: [{ id: "r", labelLatex: "\\times r", placeholder: "0.5", expected: 0.5 }], correctLatex: "0.5 r", hintLatex: ["Linear scale"] },
        { id: "SIM-A4", difficulty, stage, concept: "ratio", promptLatex: "Right Triangle leg 3. Hypotenuse 5. Altitude to hipotenuse splits similar triangles. Ratio?", expressionLatex: "\\\\text{Geometric Mean}", targetLatex: "\\\\text{Prop}", slots: [{ id: "p", labelLatex: "Y/N", placeholder: "yes", expected: "yes" }], correctLatex: "Yes", hintLatex: ["Similarity holds"] },
        { id: "SIM-A5", difficulty, stage, concept: "scale", promptLatex: "Map 1:50000. 2cm on map. km in reality?", expressionLatex: "2 \\times 50000 \\\\text{ cm}", targetLatex: "km", slots: [{ id: "d", labelLatex: "km", placeholder: "1", expected: 1 }], correctLatex: "1 km", hintLatex: ["100000 cm = 1 km"] }
      );
    } else { // ELITE
      quests.push(
        { id: "SIM-E1", difficulty, stage, concept: "fractal", promptLatex: "Sierpinski Triangle. Scale 1/2, 3 copies. Dimension D?", expressionLatex: "3 = 2^D \\implies D = \\ln(3)/\\ln(2)", targetLatex: "D", slots: [{ id: "d", labelLatex: "D", placeholder: "1.585", expected: 1.585 }], correctLatex: "~1.585", hintLatex: ["Fractal dim"] },
        { id: "SIM-E2", difficulty, stage, concept: "volume", promptLatex: "Sphere Volume ratio 1:8. Surface Area ratio?", expressionLatex: "V \\propto r^3 \\to r \\propto 2. A \\propto r^2 \\to 4.", targetLatex: "\\\\text{Ratio}", slots: [{ id: "r", labelLatex: "R", placeholder: "4", expected: 4 }], correctLatex: "1:4", hintLatex: ["Cube root then square"] },
        { id: "SIM-E3", difficulty, stage, concept: "golden", promptLatex: "Golden Triangle. Ratio side/base = 1.618. Base=1. Side?", expressionLatex: "\\phi", targetLatex: "S", slots: [{ id: "s", labelLatex: "S", placeholder: "1.618", expected: 1.618 }], correctLatex: "1.618", hintLatex: ["Phi"] },
        { id: "SIM-E4", difficulty, stage, concept: "complex", promptLatex: "Rotate triangle by i (90 deg) in complex plane. Area change?", expressionLatex: "\\\\text{No change}", targetLatex: "\\\\text{Factor}", slots: [{ id: "f", labelLatex: "F", placeholder: "1", expected: 1 }], correctLatex: "1", hintLatex: ["Isometry"] },
        { id: "SIM-E5", difficulty, stage, concept: "shadow", promptLatex: "Projection area ratio cos(theta). Theta=60. Ratio?", expressionLatex: "0.5", targetLatex: "R", slots: [{ id: "r", labelLatex: "R", placeholder: "0.5", expected: 0.5 }], correctLatex: "0.5", hintLatex: ["Cos(60)"] }
      );
    }
  }

  if (stage === "MEASURE") {
    if (difficulty === "BASIC") {
      quests.push(
        { id: "MEA-B1", difficulty, stage, concept: "shadow", promptLatex: t("em1_01.prompts.shadow_h", { h: 2, s: 3, S: 15 }), expressionLatex: "H/15 = 2/3", targetLatex: "H", slots: [{ id: "h", labelLatex: "H", placeholder: "10", expected: 10 }], correctLatex: "10 m", hintLatex: ["Ratio 5"] },
        { id: "MEA-B2", difficulty, stage, concept: "shadow", promptLatex: t("em1_01.prompts.shadow_s", { h: 1, s: 2, H: 5 }), expressionLatex: "S/5 = 2/1", targetLatex: "S", slots: [{ id: "s", labelLatex: "S", placeholder: "10", expected: 10 }], correctLatex: "10 m", hintLatex: ["Double"] },
        { id: "MEA-B3", difficulty, stage, concept: "thales", promptLatex: t("em1_01.prompts.thales_basic", { a: 2, b: 4, c: 3 }), expressionLatex: "3/d = 2/4", targetLatex: "d", slots: [{ id: "d", labelLatex: "d", placeholder: "6", expected: 6 }], correctLatex: "6", hintLatex: ["Cross multiply"] },
        { id: "MEA-B4", difficulty, stage, concept: "shadow", promptLatex: t("em1_01.prompts.shadow_h", { h: 1.5, s: 1.5, S: 10 }), expressionLatex: "H/10 = 1", targetLatex: "H", slots: [{ id: "h", labelLatex: "H", placeholder: "10", expected: 10 }], correctLatex: "10 m", hintLatex: ["Equal ratio"] },
        { id: "MEA-B5", difficulty, stage, concept: "thales", promptLatex: "Thales: x/2 = 6/3. Find x.", expressionLatex: "x = 2(2)", targetLatex: "x", slots: [{ id: "x", labelLatex: "x", placeholder: "4", expected: 4 }], correctLatex: "4", hintLatex: ["Ratio 2"] }
      );
    } else if (difficulty === "CORE") {
      quests.push(
        { id: "MEA-C1", difficulty, stage, concept: "shadow", promptLatex: "Pole 1m shadow 0.5m. Tree shadow 10m. Tree Height?", expressionLatex: "H/10 = 1/0.5", targetLatex: "H", slots: [{ id: "h", labelLatex: "H", placeholder: "20", expected: 20 }], correctLatex: "20 m", hintLatex: ["Ratio 2"] },
        { id: "MEA-C2", difficulty, stage, concept: "thales", promptLatex: t("em1_01.prompts.thales_prop", { a: 5, b: 3, c: 6 }), expressionLatex: "x/5 = 3/6", targetLatex: "x", slots: [{ id: "x", labelLatex: "x", placeholder: "2.5", expected: 2.5 }], correctLatex: "2.5", hintLatex: ["Half"] },
        { id: "MEA-C3", difficulty, stage, concept: "shadow", promptLatex: "Building 30m, Shadow 10m. Stick shadow 0.5m. Stick height?", expressionLatex: "h/0.5 = 30/10", targetLatex: "h", slots: [{ id: "h", labelLatex: "h", placeholder: "1.5", expected: 1.5 }], correctLatex: "1.5 m", hintLatex: ["Ratio 3"] },
        { id: "MEA-C4", difficulty, stage, concept: "thales", promptLatex: "Ladder 5m touches wall at 4m. Similar ladder 2.5m touches at?", expressionLatex: "h_2 = 4 \\times (2.5/5)", targetLatex: "h", slots: [{ id: "h", labelLatex: "h", placeholder: "2", expected: 2 }], correctLatex: "2 m", hintLatex: ["Half"] },
        { id: "MEA-C5", difficulty, stage, concept: "shadow", promptLatex: "Sun angle 45°. Shadow 20m. Height?", expressionLatex: "H = 20 \\tan(45^\\circ)", targetLatex: "H", slots: [{ id: "h", labelLatex: "H", placeholder: "20", expected: 20 }], correctLatex: "20 m", hintLatex: ["Tan(45)=1"] }
      );
    } else if (difficulty === "ADVANCED") {
      quests.push(
        { id: "MEA-A1", difficulty, stage, concept: "angle", promptLatex: t("em1_01.prompts.shadow_angle", { a: 30, H: 10 }), expressionLatex: "L = 10 / \\tan(30^\\circ) = 10 / 0.577", targetLatex: "L", slots: [{ id: "l", labelLatex: "L", placeholder: "17.32", expected: 17.32 }], correctLatex: "17.32 m", hintLatex: ["Sqrt 3"] },
        { id: "MEA-A2", difficulty, stage, concept: "thales", promptLatex: "Trapezoid parallel cut. Top base 4, Bottom 10. Midsegment?", expressionLatex: "(4+10)/2", targetLatex: "M", slots: [{ id: "m", labelLatex: "M", placeholder: "7", expected: 7 }], correctLatex: "7", hintLatex: ["Average"] },
        { id: "MEA-A3", difficulty, stage, concept: "angle", promptLatex: "Shadow change. Angle 45 to 30. Height 10. Shadow delta?", expressionLatex: "10(\\cot 30 - \\cot 45)", targetLatex: "\\Delta L", slots: [{ id: "d", labelLatex: "D", placeholder: "7.32", expected: 7.32 }], correctLatex: "7.32 m", hintLatex: ["17.32 - 10"] },
        { id: "MEA-A4", difficulty, stage, concept: "thales", promptLatex: "Segment division 2:3. Length 20. Shorter part?", expressionLatex: "20 \\times 2/5", targetLatex: "L", slots: [{ id: "l", labelLatex: "L", placeholder: "8", expected: 8 }], correctLatex: "8", hintLatex: ["Part"] },
        { id: "MEA-A5", difficulty, stage, concept: "shadow", promptLatex: "Moon eclipse. Earth D=12742, Sun D=1.39M. Distance ratio... Similar triangles.", expressionLatex: "\\\\text{Cones}", targetLatex: "\\\\text{Sim}", slots: [{ id: "s", labelLatex: "Y/N", placeholder: "yes", expected: "yes" }], correctLatex: "Yes", hintLatex: ["Umbra"] }
      );
    } else { // ELITE
      quests.push(
        { id: "MEA-E1", difficulty, stage, concept: "thales", promptLatex: "General Thales: Lines cut by 3 parallels. Segments a,b and x,y. a/b = x/y. If a=2, b=3, x+y=10. Find x.", expressionLatex: "x/(10-x) = 2/3", targetLatex: "x", slots: [{ id: "x", labelLatex: "x", placeholder: "4", expected: 4 }], correctLatex: "4", hintLatex: ["Total 5 parts"] },
        { id: "MEA-E2", difficulty, stage, concept: "angle", promptLatex: "Eratosthenes Earth Measure. Angle diff 7.2°. Distance 800km. Circumference?", expressionLatex: "360/7.2 \\times 800", targetLatex: "C", slots: [{ id: "c", labelLatex: "C", placeholder: "40000", expected: 40000 }], correctLatex: "40000 km", hintLatex: ["Ratio"] },
        { id: "MEA-E3", difficulty, stage, concept: "thales", promptLatex: "Projective Geometry: Cross ratio. (A,B;C,D) is invariant. ", expressionLatex: "\\\\text{Invariant}", targetLatex: "\\\\text{Inv}", slots: [{ id: "i", labelLatex: "Inv", placeholder: "yes", expected: "yes" }], correctLatex: "Yes", hintLatex: ["Cross ratio"] },
        { id: "MEA-E4", difficulty, stage, concept: "angle", promptLatex: "Parallax d=1AU, angle p=1 arcsec. Distance (parsec)?", expressionLatex: "1/1", targetLatex: "D", slots: [{ id: "d", labelLatex: "pc", placeholder: "1", expected: 1 }], correctLatex: "1 pc", hintLatex: ["Definition"] },
        { id: "MEA-E5", difficulty, stage, concept: "thales", promptLatex: "Homothety center O, factor k. A->A'. Area triangle factor?", expressionLatex: "k^2", targetLatex: "F", slots: [{ id: "f", labelLatex: "F", placeholder: "k^2", expected: "k^2" }], correctLatex: "k squared", hintLatex: ["Area rule"] }
      );
    }
  }

  if (stage === "SURVEY") {
    if (difficulty === "BASIC") {
      quests.push(
        { id: "SUR-B1", difficulty, stage, concept: "dist", promptLatex: t("em1_01.prompts.tri_dist", { h: 10, a: 45 }), expressionLatex: "10 / \\tan 45 = 10", targetLatex: "d", slots: [{ id: "d", labelLatex: "d", placeholder: "10", expected: 10 }], correctLatex: "10 m", hintLatex: ["Tan 45 = 1"] },
        { id: "SUR-B2", difficulty, stage, concept: "height", promptLatex: t("em1_01.prompts.tri_height", { d: 20, a: 45 }), expressionLatex: "20 \\times 1", targetLatex: "h", slots: [{ id: "h", labelLatex: "h", placeholder: "20", expected: 20 }], correctLatex: "20 m", hintLatex: ["Equal legs"] },
        { id: "SUR-B3", difficulty, stage, concept: "slope", promptLatex: "Rise 3, Run 4. Slope?", expressionLatex: "3/4", targetLatex: "m", slots: [{ id: "m", labelLatex: "m", placeholder: "0.75", expected: 0.75 }], correctLatex: "0.75", hintLatex: ["Ratio"] },
        { id: "SUR-B4", difficulty, stage, concept: "dist", promptLatex: "h=100, tan(a)=0.1. Dist?", expressionLatex: "100/0.1", targetLatex: "d", slots: [{ id: "d", labelLatex: "d", placeholder: "1000", expected: 1000 }], correctLatex: "1000 m", hintLatex: ["Large dist"] },
        { id: "SUR-B5", difficulty, stage, concept: "height", promptLatex: "d=50, slope=0.2. h?", expressionLatex: "50 \\times 0.2", targetLatex: "h", slots: [{ id: "h", labelLatex: "h", placeholder: "10", expected: 10 }], correctLatex: "10 m", hintLatex: ["Multiply"] }
      );
    } else if (difficulty === "CORE") {
      quests.push(
        { id: "SUR-C1", difficulty, stage, concept: "angle", promptLatex: "Height 3, Dist 4. Angle tan(x) = ?", expressionLatex: "3/4", targetLatex: "\\tan(x)", slots: [{ id: "t", labelLatex: "T", placeholder: "0.75", expected: 0.75 }], correctLatex: "0.75", hintLatex: ["Opp/Adj"] },
        { id: "SUR-C2", difficulty, stage, concept: "dist", promptLatex: "h=10, a=60°. Dist?", expressionLatex: "10/1.732", targetLatex: "d", slots: [{ id: "d", labelLatex: "d", placeholder: "5.77", expected: 5.77 }], correctLatex: "5.77 m", hintLatex: ["Tan 60 = 1.73"] },
        { id: "SUR-C3", difficulty, stage, concept: "height", promptLatex: "d=100, a=30°. h?", expressionLatex: "100 \\times 0.577", targetLatex: "h", slots: [{ id: "h", labelLatex: "h", placeholder: "57.7", expected: 57.7 }], correctLatex: "57.7 m", hintLatex: ["Tan 30 = 1/sqrt(3)"] },
        { id: "SUR-C4", difficulty, stage, concept: "pythag", promptLatex: "h=3, d=4. Hypotenuse range?", expressionLatex: "5", targetLatex: "r", slots: [{ id: "r", labelLatex: "r", placeholder: "5", expected: 5 }], correctLatex: "5", hintLatex: ["3-4-5"] },
        { id: "SUR-C5", difficulty, stage, concept: "grade", promptLatex: "Road grade 10%. Dist 1km. Rise?", expressionLatex: "1000 \\times 0.1", targetLatex: "h", slots: [{ id: "h", labelLatex: "h", placeholder: "100", expected: 100 }], correctLatex: "100 m", hintLatex: ["Percentage"] }
      );
    } else if (difficulty === "ADVANCED") {
      quests.push(
        { id: "SUR-A1", difficulty, stage, concept: "two_point", promptLatex: "Two angles. A=30, B=45. h=1. Dist change?", expressionLatex: "1(\\cot 30 - \\cot 45)", targetLatex: "\\Delta d", slots: [{ id: "d", labelLatex: "d", placeholder: "0.732", expected: 0.732 }], correctLatex: "0.732", hintLatex: ["1.732 - 1"] },
        { id: "SUR-A2", difficulty, stage, concept: "tri", promptLatex: "Law of Sines: a/sinA = b/sinB. A=30, B=90, b=10. Find a.", expressionLatex: "10 \\sin 30", targetLatex: "a", slots: [{ id: "a", labelLatex: "a", placeholder: "5", expected: 5 }], correctLatex: "5", hintLatex: ["0.5 * 10"] },
        { id: "SUR-A3", difficulty, stage, concept: "tri", promptLatex: "Cos Law: c^2 = a^2+b^2 ... C=90. Reduces to?", expressionLatex: "\\\\text{Pythag}", targetLatex: "\\\\text{Name}", slots: [{ id: "n", labelLatex: "N", placeholder: "pythagoras", expected: "pythagoras" }], correctLatex: "Pythagoras", hintLatex: ["Theorem"] },
        { id: "SUR-A4", difficulty, stage, concept: "area", promptLatex: "Tri Area 0.5 a b sinC. a=4, b=5, C=30. Area?", expressionLatex: "0.5(4)(5)(0.5)", targetLatex: "A", slots: [{ id: "a", labelLatex: "A", placeholder: "5", expected: 5 }], correctLatex: "5", hintLatex: ["Sine Area"] },
        { id: "SUR-A5", difficulty, stage, concept: "survey", promptLatex: "Theodolite h=1.5. Target 11.5. Dist 10. Angle?", expressionLatex: "\\tan x = 10/10", targetLatex: "x", slots: [{ id: "x", labelLatex: "deg", placeholder: "45", expected: 45 }], correctLatex: "45°", hintLatex: ["Net h = 10"] }
      );
    } else { // ELITE
      quests.push(
        { id: "SUR-E1", difficulty, stage, concept: "geo", promptLatex: "Geodesy: Curvature drop approx 8cm/km^2. Dist 10km. Drop (m)?", expressionLatex: "0.08 \\times 100", targetLatex: "h", slots: [{ id: "h", labelLatex: "h", placeholder: "8", expected: 8 }], correctLatex: "8 m", hintLatex: ["Squared"] },
        { id: "SUR-E2", difficulty, stage, concept: "tri", promptLatex: "Spherical Trig: Sum of angles > 180. Unit sphere, 3 right angles. Area?", expressionLatex: "\\pi/2", targetLatex: "A", slots: [{ id: "a", labelLatex: "A", placeholder: "1.57", expected: 1.57 }], correctLatex: "1.57", hintLatex: ["Eighth sphere"] },
        { id: "SUR-E3", difficulty, stage, concept: "survey", promptLatex: "Triangulation network. Baseline b error e. Propagates...", expressionLatex: "\\\\text{Linearly}", targetLatex: "\\\\text{Prop}", slots: [{ id: "p", labelLatex: "L/E", placeholder: "linearly", expected: "linearly" }], correctLatex: "Linearly", hintLatex: ["Geometric"] },
        { id: "SUR-E4", difficulty, stage, concept: "gps", promptLatex: "GPS Trilateration requires min how many satellites for 3D?", expressionLatex: "4", targetLatex: "N", slots: [{ id: "n", labelLatex: "N", placeholder: "4", expected: 4 }], correctLatex: "4", hintLatex: ["x,y,z,t"] },
        { id: "SUR-E5", difficulty, stage, concept: "geo", promptLatex: "Refraction coeff k. Effect on curvature correction?", expressionLatex: "\\\\text{Reduces}", targetLatex: "\\\\text{Effect}", slots: [{ id: "e", labelLatex: "R/I", placeholder: "reduces", expected: "reduces" }], correctLatex: "Reduces", hintLatex: ["Bends ray down"] }
      );
    }
  }

  return quests;
}

export default function EM101Page() {
  const { t: getT, currentLanguage } = useLanguage();
  const t = getT("em1_01");
  const { completeStage } = useAppStore();

  const [sunAngle, setSunAngle] = useState(35);
  const [towerShadow, setTowerShadow] = useState(18);

  const buildPool = useCallback((d: Difficulty, s: Stage) => buildStagePool(getT, t, d, s), [getT, t]);

  const {
    currentQuest,
    difficulty,
    stage,
    lastCheck,
    inputs,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
    handleStageChange,
    adaptiveRecommendation,
      aiFeedback,
      isRequestingAi,
      requestAiFeedback
    } = useQuestManager<ThalesQuest, Stage>({
    moduleCode: "em1-01",
    buildPool,
    initialStage: "MEASURE", // Default to Measure (Middle stage) or Basics? Let's sticky to existing default if logical, or Basics
  });

  // Reset sun/shadow for visual variety on next
  const handleNext = () => {
    const nextAngle = 25 + Math.round(Math.random() * 30);
    const nextShadow = 12 + Math.round(Math.random() * 12);
    setSunAngle(nextAngle);
    setTowerShadow(nextShadow);
    next();
  };

  useEffect(() => {
    if (lastCheck?.ok) {
      completeStage("em1-01", stage);
    }
  }, [lastCheck, completeStage, stage]);

  const stagesProps = useMemo(() => [
    { id: "BASICS" as Stage, label: t.stages.basics || "BASICS" },
    { id: "MEASURE" as Stage, label: t.stages.measure || "MEASURE" },
    { id: "SURVEY" as Stage, label: t.stages.survey || "SURVEY" },
  ], [t.stages]);

  // Fallback if translations not loaded
  if (!t || !t.stages) return null;

  if (!currentQuest) {
    return (
      <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t.title}
        moduleCode="EM1.01"
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        stages={stagesProps}
        currentStage={stage}
        onStageChange={(s) => handleStageChange(s as Stage)}
        footerLeft={t.footer_left}
        translations={{
          back: t.back,
          check: t.check,
          next: t.next,
          correct: t.correct,
          incorrect: t.incorrect,
          difficulty: t.difficulty,
        }}
        monitorContent={<ThalesTowerCanvas sunAngle={sunAngle} poleHeight={POLE_HEIGHT} towerShadow={towerShadow} />}
      >
        <div className="text-center text-green-400 text-xl">Module Complete!</div>
      </ChamberLayout>
    );
  }

  return (
    <ChamberLayout
      adaptiveRecommendation={adaptiveRecommendation}
      aiFeedback={aiFeedback}
      isRequestingAi={isRequestingAi}
      onAiDiagnosisRequested={requestAiFeedback}
      title={t.title}
      moduleCode="EM1.01"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={stagesProps}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={verify}
      onNext={handleNext}
      checkStatus={lastCheck}
      footerLeft={t.footer_left}
      translations={{
        back: t.back,
        check: t.check,
        next: t.next,
        correct: t.correct,
        incorrect: t.incorrect,
        difficulty: t.difficulty,
      }}
      monitorContent={
        <div className="space-y-4">
          <ThalesTowerCanvas sunAngle={sunAngle} poleHeight={POLE_HEIGHT} towerShadow={towerShadow} />
          {/* Optional visual overlay based on stage? */}
          <div className="text-xs text-white/50 text-center uppercase tracking-widest">{t.monitor_title}</div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Monitor controls for exploration if desired, or simplified inputs for quest */}
        <div className="bg-gray-800/50 p-4 rounded-lg border border-orange-500/30">
          <h3 className="text-orange-400 font-bold mb-2">{t.objective_title}</h3>
          <div className="text-gray-300 text-sm leading-relaxed">
            {currentQuest?.promptLatex.includes("{")
              ? <InlineMath math={currentQuest?.promptLatex || ""} /> // LateX usually handles text inside
              : <InlineMath math={currentQuest?.promptLatex || ""} />
            }
          </div>
        </div>

        <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
          <div className="text-orange-300 text-lg">
            <InlineMath math={currentQuest?.expressionLatex || ""} />
          </div>

          <div className="space-y-3">
            {currentQuest?.slots.map((slot) => (
              <div key={slot.id} className="flex items-center gap-3">
                <InlineMath math={slot.labelLatex} />
                <input
                  type="text"
                  value={inputs[slot.id] || ""}
                  onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                  placeholder={slot.placeholder}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white active:border-orange-500 focus:border-orange-500"
                  disabled={lastCheck?.ok}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
