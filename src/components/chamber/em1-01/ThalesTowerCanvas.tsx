"use client";

import { useMemo } from "react";

interface ThalesTowerCanvasProps {
  sunAngle: number;
  poleHeight: number;
  towerShadow: number;
}

export default function ThalesTowerCanvas({ sunAngle, poleHeight, towerShadow }: ThalesTowerCanvasProps) {
  const { poleShadow, towerHeight } = useMemo(() => {
    const rad = (sunAngle * Math.PI) / 180;
    const poleShadowValue = poleHeight / Math.tan(rad);
    const towerHeightValue = poleHeight * (towerShadow / poleShadowValue);
    return { poleShadow: poleShadowValue, towerHeight: towerHeightValue };
  }, [poleHeight, sunAngle, towerShadow]);

  const scale = 18;
  const towerHeightPx = towerHeight * scale;
  const poleHeightPx = poleHeight * scale;
  const towerShadowPx = towerShadow * scale;
  const poleShadowPx = poleShadow * scale;

  return (
    <div className="w-full aspect-[800/320] bg-black rounded-xl border border-white/10 overflow-hidden">
      <svg viewBox="0 0 800 320" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <rect x="0" y="0" width="100%" height="100%" fill="#05050a" />
        <rect x="60" y="240" width="680" height="6" fill="#1d2633" />
        <circle cx="680" cy="60" r="18" fill="#ffd166" />
        <line x1="680" y1="60" x2="120" y2="240" stroke="#ffd166" strokeWidth="2" opacity="0.7" />
        <rect x="160" y={240 - towerHeightPx} width="60" height={towerHeightPx} fill="#00e5ff" opacity="0.8" />
        <rect x="420" y={240 - poleHeightPx} width="20" height={poleHeightPx} fill="#39ff14" opacity="0.9" />
        <rect x="220" y="240" width={towerShadowPx} height="6" fill="#00e5ff" opacity="0.5" />
        <rect x="440" y="240" width={poleShadowPx} height="6" fill="#39ff14" opacity="0.5" />
        <text x="160" y={240 - towerHeightPx - 12} fill="#ffffff" fontSize="12">Tower</text>
        <text x="420" y={240 - poleHeightPx - 12} fill="#ffffff" fontSize="12">Pole</text>
        <text x="220" y="270" fill="#7dd3fc" fontSize="12">L</text>
        <text x="440" y="270" fill="#86efac" fontSize="12">l</text>
      </svg>
    </div>
  );
}
