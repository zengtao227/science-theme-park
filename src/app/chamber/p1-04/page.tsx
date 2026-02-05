"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/i18n";
import ChamberLayout from "@/components/layout/ChamberLayout";
import P104_FerryCanvas from "@/components/chamber/p1-04/FerryCanvas";
import { RotateCw, Wind } from "lucide-react";

export default function P104Page() {
    const { currentLanguage, completeStage } = useAppStore();
    const t = translations[currentLanguage];

    // Physics State
    const [angle, setAngle] = useState(0);
    const [positionX, setPositionX] = useState(0); // 0 to 1
    const [isSimulating, setIsSimulating] = useState(false);
    const [status, setStatus] = useState<"IDLE" | "CROSSING" | "ARRIVED">("IDLE");

    const riverSpeed = 2.5; // m/s
    const liftCoefficient = 0.05;

    useEffect(() => {
        let frame: number;
        const update = () => {
            if (isSimulating && status === "CROSSING") {
                const angleRad = (angle * Math.PI) / 180;
                const thrust = Math.sin(angleRad) * riverSpeed * liftCoefficient;

                setPositionX(prev => {
                    const next = prev + thrust;
                    if (next >= 1) {
                        setStatus("ARRIVED");
                        setIsSimulating(false);
                        completeStage("p1-04", "BASEL_CROSSING");
                        return 1;
                    }
                    if (next <= 0 && prev > 0) return 0;
                    return next;
                });
            }
            frame = requestAnimationFrame(update);
        };
        frame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frame);
    }, [isSimulating, status, angle, completeStage]);

    const startCrossing = () => {
        if (status === "ARRIVED") setPositionX(0);
        setStatus("CROSSING");
        setIsSimulating(true);
    };

    const reset = () => {
        setPositionX(0);
        setStatus("IDLE");
        setIsSimulating(false);
    };

    return (
        <ChamberLayout
            title={t.p1_04.title}
            moduleCode="P1.04"
            difficulty="CORE"
            onDifficultyChange={() => { }}
            stages={[{ id: "BASEL_CROSSING", label: t.p1_04.stage_label }]}
            currentStage="BASEL_CROSSING"
            onStageChange={() => { }}
            onVerify={startCrossing}
            onNext={reset}
            checkStatus={status === "ARRIVED" ? { ok: true, correct: "SUCCESS" } : null}
            translations={{
                back: t.p1_04.back,
                check: status === "CROSSING" ? t.p1_04.crossing : t.p1_04.start,
                next: t.p1_04.reset,
                correct: t.p1_04.arrived,
                incorrect: t.p1_04.drifting,
                ready: t.p1_04.ready,
                difficulty: { core: "CORE" }
            }}
            monitorContent={
                <P104_FerryCanvas
                    angle={angle}
                    velocity={riverSpeed}
                    positionX={positionX}
                />
            }
        >
            <div className="space-y-12">
                <div className="text-center space-y-2">
                    <h3 className="text-[10px] text-white/60 uppercase tracking-[0.5em] font-black">{t.p1_04.header}</h3>
                    <p className="text-base text-white/70 font-mono">
                        {t.p1_04.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Control Panel */}
                    <div className="hud-panel p-8 space-y-8 bg-white/[0.02] border-white/10">
                        <div className="space-y-4">
                            <label className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-neon-cyan">
                                <span className="flex items-center gap-2"><RotateCw className="w-4 h-4" /> {t.p1_04.rudder_angle}</span>
                                <span className="text-xl">{angle}°</span>
                            </label>
                            <input
                                type="range"
                                min="-45"
                                max="45"
                                value={angle}
                                onChange={(e) => setAngle(parseInt(e.target.value))}
                                className="w-full accent-neon-cyan bg-white/10"
                            />
                            <div className="flex justify-between text-[10px] text-white/20 font-mono">
                                <span>{t.p1_04.port}</span>
                                <span>{t.p1_04.center}</span>
                                <span>{t.p1_04.starboard}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 space-y-4">
                            <div className="flex items-center justify-between text-[10px] text-white/40 uppercase tracking-widest">
                                <span>{t.p1_04.environment}</span>
                                <Wind className="w-3 h-3" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40 font-mono">{t.p1_04.river_velocity}:</span>
                                    <span className="text-white font-black">{riverSpeed} m/s</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40 font-mono">{t.p1_04.cable_tension}:</span>
                                    <span className="text-white font-black">{t.p1_04.optimal}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simulation Info */}
                    <div className="space-y-6">
                        <div className="p-6 bg-neon-green/5 border border-neon-green/20 rounded-2xl">
                            <h4 className="text-[10px] text-neon-green font-black tracking-widest uppercase mb-4">{t.p1_04.mechanism_title}</h4>
                            <p className="text-xs text-white/60 leading-relaxed font-mono">
                                {t.p1_04.mechanism_desc}
                            </p>
                            <div className="mt-4 p-3 bg-black/40 rounded border border-white/5 text-[10px] font-mono text-neon-green">
                                F_thrust = F_river * sin(θ) * k
                            </div>
                        </div>

                        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-2xl">
                                🚢
                            </div>
                            <div>
                                <div className="text-[10px] text-white/30 uppercase tracking-widest font-black">{t.p1_04.active_ship}</div>
                                <div className="text-sm text-white font-black">{t.p1_04.ship_name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ChamberLayout>
    );
}
