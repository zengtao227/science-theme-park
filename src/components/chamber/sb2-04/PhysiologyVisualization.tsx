"use client";

import { useEffect, useRef, useCallback } from "react";
import { SB204Quest, Stage } from "@/lib/sb2-04-types";

interface PhysiologyVisualizationProps {
  quest: SB204Quest;
  stage: Stage;
  translations: {
    [key: string]: string;
  };
}

export default function PhysiologyVisualization({
  quest,
  stage,
  translations,
}: PhysiologyVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawDigestiveSystem = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, highlightOrgan: string | null) => {
      const centerX = w / 2;
      const isHighlighted = (organ: string) => highlightOrgan === organ;

      // Body outline
      ctx.strokeStyle = "#ffffff20";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, h / 2, 80, h * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Mouth
      ctx.fillStyle = isHighlighted("mouth") ? "#8B4513" : "#654321";
      ctx.beginPath();
      ctx.arc(centerX, h * 0.15, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Esophagus
      ctx.strokeStyle = isHighlighted("esophagus") ? "#00ff00" : "#00aa00";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(centerX, h * 0.18);
      ctx.lineTo(centerX, h * 0.32);
      ctx.stroke();

      // Stomach
      ctx.fillStyle = isHighlighted("stomach") ? "#A0522D" : "#8B4513";
      ctx.beginPath();
      ctx.ellipse(centerX - 10, h * 0.38, 35, 25, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Small intestine
      ctx.strokeStyle = isHighlighted("small_intestine") || isHighlighted("small intestine") ? "#00ff00" : "#00aa00";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(centerX - 20, h * 0.48);
      for (let i = 0; i < 8; i++) {
        ctx.lineTo(centerX - 20 + (i % 2 === 0 ? 40 : 0), h * 0.48 + i * 6);
      }
      ctx.stroke();

      // Large intestine
      ctx.strokeStyle = isHighlighted("large_intestine") || isHighlighted("large intestine") ? "#00ff00" : "#008800";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(centerX + 30, h * 0.5);
      ctx.lineTo(centerX + 30, h * 0.7);
      ctx.lineTo(centerX - 30, h * 0.7);
      ctx.lineTo(centerX - 30, h * 0.5);
      ctx.stroke();

      // Liver
      ctx.fillStyle = isHighlighted("liver") ? "#8B0000" : "#5C0000";
      ctx.beginPath();
      ctx.moveTo(centerX - 60, h * 0.35);
      ctx.lineTo(centerX - 10, h * 0.35);
      ctx.lineTo(centerX - 20, h * 0.28);
      ctx.lineTo(centerX - 50, h * 0.28);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Pancreas
      ctx.fillStyle = isHighlighted("pancreas") ? "#FFD700" : "#DAA520";
      ctx.beginPath();
      ctx.ellipse(centerX + 20, h * 0.4, 25, 10, 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Gallbladder
      ctx.fillStyle = isHighlighted("gallbladder") ? "#9ACD32" : "#6B8E23";
      ctx.beginPath();
      ctx.arc(centerX - 25, h * 0.35, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#00ff00";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(translations.mouth || "MOUTH", centerX, h * 0.12);
      ctx.fillText(translations.stomach || "STOMACH", centerX - 10, h * 0.42);
      ctx.fillText(translations.liver || "LIVER", centerX - 35, h * 0.26);
      ctx.fillText(translations.pancreas || "PANCREAS", centerX + 20, h * 0.45);
      ctx.fillText(translations.intestines || "INTESTINES", centerX, h * 0.75);
    },
    [translations]
  );

  const drawRespiratorySystem = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, highlightOrgan: string | null) => {
      const centerX = w / 2;
      const isHighlighted = (organ: string) => highlightOrgan === organ;

      // Body outline
      ctx.strokeStyle = "#ffffff20";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, h / 2, 80, h * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Nose
      ctx.fillStyle = isHighlighted("nose") ? "#4682B4" : "#2F4F4F";
      ctx.beginPath();
      ctx.moveTo(centerX - 8, h * 0.1);
      ctx.lineTo(centerX + 8, h * 0.1);
      ctx.lineTo(centerX, h * 0.15);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Trachea
      ctx.strokeStyle = isHighlighted("trachea") ? "#00ffff" : "#00aaaa";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(centerX, h * 0.15);
      ctx.lineTo(centerX, h * 0.35);
      ctx.stroke();

      // Bronchi
      ctx.strokeStyle = isHighlighted("bronchi") ? "#00ffff" : "#00aaaa";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(centerX, h * 0.35);
      ctx.lineTo(centerX - 30, h * 0.45);
      ctx.moveTo(centerX, h * 0.35);
      ctx.lineTo(centerX + 30, h * 0.45);
      ctx.stroke();


      // Lungs
      ctx.fillStyle = isHighlighted("lungs") ? "#1E90FF" : "#0A4D68";
      ctx.beginPath();
      ctx.ellipse(centerX - 35, h * 0.5, 28, 45, 0.2, 0, Math.PI * 2);
      ctx.ellipse(centerX + 35, h * 0.5, 28, 45, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Alveoli (small circles in lungs)
      ctx.fillStyle = isHighlighted("alveoli") ? "#87CEEB" : "#4682B4";
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX - 35 + (i - 2) * 8, h * 0.5, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX + 35 + (i - 2) * 8, h * 0.5, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Diaphragm
      ctx.strokeStyle = isHighlighted("diaphragm") ? "#00ffff" : "#008888";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX - 70, h * 0.65);
      ctx.quadraticCurveTo(centerX, h * 0.7, centerX + 70, h * 0.65);
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#00ffff";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(translations.nose || "NOSE", centerX, h * 0.08);
      ctx.fillText(translations.trachea || "TRACHEA", centerX + 25, h * 0.25);
      ctx.fillText(translations.lungs || "LUNGS", centerX, h * 0.52);
      ctx.fillText(translations.diaphragm || "DIAPHRAGM", centerX, h * 0.73);
    },
    [translations]
  );

  const drawCirculatorySystem = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, highlightOrgan: string | null) => {
      const centerX = w / 2;
      const isHighlighted = (organ: string) => highlightOrgan === organ;

      // Body outline
      ctx.strokeStyle = "#ffffff20";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, h / 2, 80, h * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Heart
      ctx.fillStyle = isHighlighted("heart") || isHighlighted("left_ventricle") || isHighlighted("right_atrium") || isHighlighted("left ventricle") || isHighlighted("right atrium") ? "#8B0000" : "#4A0000";
      ctx.beginPath();
      // Simple heart shape
      ctx.moveTo(centerX, h * 0.35);
      ctx.bezierCurveTo(centerX - 15, h * 0.25, centerX - 35, h * 0.28, centerX - 35, h * 0.38);
      ctx.bezierCurveTo(centerX - 35, h * 0.45, centerX, h * 0.5, centerX, h * 0.55);
      ctx.bezierCurveTo(centerX, h * 0.5, centerX + 35, h * 0.45, centerX + 35, h * 0.38);
      ctx.bezierCurveTo(centerX + 35, h * 0.28, centerX + 15, h * 0.25, centerX, h * 0.35);
      ctx.fill();
      ctx.strokeStyle = "#ff0000";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Valves (small lines in heart)
      if (isHighlighted("valves")) {
        ctx.strokeStyle = "#ffff00";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX - 10, h * 0.4);
        ctx.lineTo(centerX + 10, h * 0.4);
        ctx.stroke();
      }

      // Arteries (red, going up and out)
      ctx.strokeStyle = isHighlighted("arteries") ? "#ff0000" : "#cc0000";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(centerX, h * 0.3);
      ctx.lineTo(centerX - 50, h * 0.15);
      ctx.moveTo(centerX, h * 0.3);
      ctx.lineTo(centerX + 50, h * 0.15);
      ctx.moveTo(centerX, h * 0.55);
      ctx.lineTo(centerX, h * 0.75);
      ctx.stroke();

      // Veins (blue, returning to heart)
      ctx.strokeStyle = isHighlighted("veins") ? "#0000ff" : "#000088";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX + 15, h * 0.3);
      ctx.lineTo(centerX + 60, h * 0.15);
      ctx.moveTo(centerX + 15, h * 0.55);
      ctx.lineTo(centerX + 10, h * 0.75);
      ctx.stroke();


      // Capillaries (small network)
      ctx.strokeStyle = isHighlighted("capillaries") ? "#ff00ff" : "#880088";
      ctx.lineWidth = 1;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX - 60 + i * 12, h * 0.6);
        ctx.lineTo(centerX - 60 + i * 12, h * 0.65);
        ctx.stroke();
      }

      // Labels
      ctx.fillStyle = "#ff0000";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(translations.heart || "HEART", centerX, h * 0.42);
      ctx.fillText(translations.arteries || "ARTERIES", centerX - 50, h * 0.12);
      ctx.fillStyle = "#0000ff";
      ctx.fillText(translations.veins || "VEINS", centerX + 60, h * 0.12);
      ctx.fillStyle = "#ff00ff";
      ctx.fillText(translations.capillaries || "CAPILLARIES", centerX, h * 0.68);
    },
    [translations]
  );

  const drawExcretorySystem = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, highlightOrgan: string | null) => {
      const centerX = w / 2;
      const isHighlighted = (organ: string) => highlightOrgan === organ;

      // Body outline
      ctx.strokeStyle = "#ffffff20";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(centerX, h / 2, 80, h * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Kidneys (bean-shaped)
      ctx.fillStyle = isHighlighted("kidneys") ? "#8B4513" : "#654321";
      ctx.beginPath();
      ctx.ellipse(centerX - 40, h * 0.4, 20, 30, 0.2, 0, Math.PI * 2);
      ctx.ellipse(centerX + 40, h * 0.4, 20, 30, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffff00";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Nephron detail (in left kidney)
      if (isHighlighted("nephron")) {
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX - 40, h * 0.4, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX - 40, h * 0.48);
        ctx.lineTo(centerX - 40, h * 0.55);
        ctx.stroke();
      }

      // Ureters
      ctx.strokeStyle = isHighlighted("ureters") ? "#ffff00" : "#cccc00";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX - 40, h * 0.5);
      ctx.lineTo(centerX - 20, h * 0.65);
      ctx.moveTo(centerX + 40, h * 0.5);
      ctx.lineTo(centerX + 20, h * 0.65);
      ctx.stroke();

      // Bladder
      ctx.fillStyle = isHighlighted("bladder") ? "#FFD700" : "#DAA520";
      ctx.beginPath();
      ctx.ellipse(centerX, h * 0.7, 25, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffff00";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Urethra
      ctx.strokeStyle = isHighlighted("urethra") ? "#ffff00" : "#cccc00";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, h * 0.75);
      ctx.lineTo(centerX, h * 0.82);
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#ffff00";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(translations.kidneys || "KIDNEYS", centerX, h * 0.35);
      ctx.fillText(translations.ureters || "URETERS", centerX - 30, h * 0.58);
      ctx.fillText(translations.bladder || "BLADDER", centerX, h * 0.72);
      ctx.fillText(translations.urethra || "URETHRA", centerX + 30, h * 0.78);
    },
    [translations]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    const highlightOrgan = quest.organ || null;

    switch (stage) {
      case "DIGESTIVE_SYSTEM":
        drawDigestiveSystem(ctx, w, h, highlightOrgan);
        break;
      case "RESPIRATORY_SYSTEM":
        drawRespiratorySystem(ctx, w, h, highlightOrgan);
        break;
      case "CIRCULATORY_SYSTEM":
        drawCirculatorySystem(ctx, w, h, highlightOrgan);
        break;
      case "EXCRETORY_SYSTEM":
        drawExcretorySystem(ctx, w, h, highlightOrgan);
        break;
    }
  }, [stage, quest, drawDigestiveSystem, drawRespiratorySystem, drawCirculatorySystem, drawExcretorySystem]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
