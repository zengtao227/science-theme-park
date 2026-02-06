"use client";

import { useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import MatrixCanvas from "@/components/chamber/g5-01/MatrixCanvas";

type Stage = "ROTATION" | "SCALE" | "SHEAR";

export default function G501Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].g5_01 || translations.EN.g5_01;

  const [stage, setStage] = useState<Stage>("ROTATION");
  const [angle, setAngle] = useState(45);
  const [scaleX, setScaleX] = useState(1.5);
  const [scaleY, setScaleY] = useState(1.5);
  const [scaleZ, setScaleZ] = useState(1.5);
  const [shearXY, setShearXY] = useState(0.5);
  const [shearXZ, setShearXZ] = useState(0);

  const getMatrix = (): number[][] => {
    if (stage === "ROTATION") {
      const rad = (angle * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return [
        [cos, -sin, 0],
        [sin, cos, 0],
        [0, 0, 1],
      ];
    } else if (stage === "SCALE") {
      return [
        [scaleX, 0, 0],
        [0, scaleY, 0],
        [0, 0, scaleZ],
      ];
    } else {
      // SHEAR
      return [
        [1, shearXY, shearXZ],
        [0, 1, 0],
        [0, 0, 1],
      ];
    }
  };

  const matrix = getMatrix();
  const det = 
    matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
    matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
    matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);

  const handleStageChange = (newStage: Stage) => {
    setStage(newStage);
  };

  return (
    <ChamberLayout
      title={t?.title || "G5.01 // MATRIX RELOADED"}
      moduleCode="G5.01"
      difficulty="ELITE"
      onDifficultyChange={() => {}}
      stages={[
        { id: "ROTATION", label: t?.stages?.rotation || "ROTATION" },
        { id: "SCALE", label: t?.stages?.scale || "SCALE" },
        { id: "SHEAR", label: t?.stages?.shear || "SHEAR" },
      ]}
      currentStage={stage}
      onStageChange={(s) => handleStageChange(s as Stage)}
      onVerify={() => {}}
      onNext={() => {}}
      checkStatus={null}
      footerLeft={t?.footer_left || "G5.01_MATRIX_RELOADED // NODE: BASEL"}
      translations={{
        back: t?.back || "Back to Nexus",
        check: t?.check || "Verify",
        next: t?.next || "Next",
        correct: t?.correct || "Verified",
        incorrect: t?.incorrect || "Mismatch",
        ready: t?.ready || "Ready",
        monitor_title: t?.monitor_title || "G5.01_MATRIX_MONITOR",
        difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE",
        },
      }}
      monitorContent={
        <div className="space-y-4">
          <MatrixCanvas matrix={matrix} showOriginal={true} />
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">
            {t?.target_title || "TRANSFORMATION MATRIX"}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.matrix || "MATRIX A"}
            </div>
            <div className="text-lg text-white font-black text-center font-mono">
              <InlineMath
                math={`A = \\begin{bmatrix} ${matrix[0][0].toFixed(2)} & ${matrix[0][1].toFixed(2)} & ${matrix[0][2].toFixed(2)} \\\\ ${matrix[1][0].toFixed(2)} & ${matrix[1][1].toFixed(2)} & ${matrix[1][2].toFixed(2)} \\\\ ${matrix[2][0].toFixed(2)} & ${matrix[2][1].toFixed(2)} & ${matrix[2][2].toFixed(2)} \\end{bmatrix}`}
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.properties || "PROPERTIES"}
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.determinant || "Determinant"}:</span>
                <span className="text-neon-cyan font-black">{det.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 font-mono">{t?.labels?.volume_scale || "Volume Scale"}:</span>
                <span className="text-neon-purple font-black">{Math.abs(det).toFixed(3)}×</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">
              {t?.labels?.formulas || "FORMULAS"}
            </div>
            <div className="text-white font-black text-sm space-y-2">
              <div><InlineMath math="Ax = b" /></div>
              <div><InlineMath math="\det(A) = \text{volume scaling factor}" /></div>
              {stage === "ROTATION" && <div><InlineMath math="R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}" /></div>}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">
            {t?.mission?.title || "MISSION: MATRIX GEOMETRY"}
          </h3>
          <p className="text-base text-white/70 font-mono">
            {t?.mission?.description ||
              "Visualize how matrices transform 3D space. Master rotation, scaling, and shear."}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black mb-4">
            {t?.objective_title || "ACTIVE MISSION OBJECTIVE"}
          </h3>
          <p className="text-3xl text-white font-black italic">
            {stage === "ROTATION" && (t?.stages?.rotation_desc || "Rotate the unit cube around the Z-axis")}
            {stage === "SCALE" && (t?.stages?.scale_desc || "Scale the cube along each axis independently")}
            {stage === "SHEAR" && (t?.stages?.shear_desc || "Shear the cube to create parallelograms")}
          </p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl max-w-3xl mx-auto w-full space-y-6">
          {stage === "ROTATION" && (
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                {t?.labels?.angle || "ROTATION ANGLE (θ)"}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/60 font-mono">θ =</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={angle}
                  onChange={(e) => setAngle(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xl font-black text-white min-w-[60px]">
                  {angle}°
                </span>
              </div>
            </div>
          )}

          {stage === "SCALE" && (
            <>
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  {t?.labels?.scale_x || "SCALE X-AXIS"}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white/60 font-mono">sx =</span>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scaleX}
                    onChange={(e) => setScaleX(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xl font-black text-white min-w-[60px]">
                    {scaleX.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  {t?.labels?.scale_y || "SCALE Y-AXIS"}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white/60 font-mono">sy =</span>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scaleY}
                    onChange={(e) => setScaleY(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xl font-black text-white min-w-[60px]">
                    {scaleY.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  {t?.labels?.scale_z || "SCALE Z-AXIS"}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white/60 font-mono">sz =</span>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scaleZ}
                    onChange={(e) => setScaleZ(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xl font-black text-white min-w-[60px]">
                    {scaleZ.toFixed(1)}
                  </span>
                </div>
              </div>
            </>
          )}

          {stage === "SHEAR" && (
            <>
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  {t?.labels?.shear_xy || "SHEAR X BY Y"}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white/60 font-mono">kxy =</span>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={shearXY}
                    onChange={(e) => setShearXY(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xl font-black text-white min-w-[60px]">
                    {shearXY.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-black">
                  {t?.labels?.shear_xz || "SHEAR X BY Z"}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white/60 font-mono">kxz =</span>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={shearXZ}
                    onChange={(e) => setShearXZ(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xl font-black text-white min-w-[60px]">
                    {shearXZ.toFixed(1)}
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="text-center pt-4 border-t border-white/10">
            <div className="text-[10px] text-white/40 font-mono italic">
              {stage === "ROTATION" && (t?.stages?.rotation_hint || "Rotation preserves distances and angles")}
              {stage === "SCALE" && (t?.stages?.scale_hint || "Determinant = sx × sy × sz")}
              {stage === "SHEAR" && (t?.stages?.shear_hint || "Shear preserves volume (det = 1)")}
            </div>
          </div>
        </div>
      </div>
    </ChamberLayout>
  );
}
