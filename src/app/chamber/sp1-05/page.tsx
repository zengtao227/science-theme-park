"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const FerryCanvas = dynamic(() => import("@/components/chamber/sp1-05/FerryCanvas"), {
    ssr: false,
});

export default function SP1_05_RhineFerry() {
    const [riverSpeed, setRiverSpeed] = useState(2.0); // m/s
    const [cableAngle, setCableAngle] = useState(30); // degrees
    const [ferrySpeed, setFerrySpeed] = useState(3.0); // m/s

    // Calculate resultant velocity
    const angleRad = (cableAngle * Math.PI) / 180;
    const vFerryX = Math.sin(angleRad) * ferrySpeed;
    const vFerryZ = Math.cos(angleRad) * ferrySpeed;
    const vResultantX = vFerryX;
    const vResultantZ = vFerryZ + riverSpeed;
    const resultantSpeed = Math.sqrt(vResultantX ** 2 + vResultantZ ** 2);
    const resultantAngle = (Math.atan2(vResultantX, vResultantZ) * 180) / Math.PI;

    // Calculate drift
    const drift = Math.abs(vResultantZ - vFerryZ);

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono p-4 relative overflow-hidden">
            {/* Cyber grid background */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(#00e5ff 1px, transparent 1px),
                            linear-gradient(90deg, #00e5ff 1px, transparent 1px)
                        `,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center mb-6 border-b border-cyan-500 pb-4">
                <Link
                    href="/"
                    className="px-4 py-2 border border-cyan-500 hover:bg-cyan-500 hover:text-black transition-colors"
                >
                    Back to Nexus
                </Link>
                <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
                    SP1.05 // RHINE FERRY
                </h1>
                <div className="w-32" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Canvas */}
                <div className="lg:col-span-2 border border-cyan-500 p-4 bg-black/50">
                    <div className="aspect-video w-full">
                        <FerryCanvas
                            riverSpeed={riverSpeed}
                            cableAngle={cableAngle}
                            ferrySpeed={ferrySpeed}
                        />
                    </div>
                </div>

                {/* Control Panel */}
                <div className="space-y-4">
                    <div className="border border-cyan-500 p-4 bg-black/50">
                        <div className="text-sm text-cyan-400 mb-4">SP1.05_FERRY_MONITOR</div>

                        <div className="space-y-4">
                            {/* River Speed */}
                            <div>
                                <label className="block text-xs text-cyan-300 mb-2">
                                    River Current (v_river): {riverSpeed.toFixed(1)} m/s
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={riverSpeed}
                                    onChange={(e) => setRiverSpeed(parseFloat(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* Cable Angle */}
                            <div>
                                <label className="block text-xs text-cyan-300 mb-2">
                                    Cable Angle (θ): {cableAngle}°
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="90"
                                    step="1"
                                    value={cableAngle}
                                    onChange={(e) => setCableAngle(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* Ferry Speed */}
                            <div>
                                <label className="block text-xs text-cyan-300 mb-2">
                                    Ferry Speed (v_ferry): {ferrySpeed.toFixed(1)} m/s
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="6"
                                    step="0.1"
                                    value={ferrySpeed}
                                    onChange={(e) => setFerrySpeed(parseFloat(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vector Analysis */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">VECTOR ANALYSIS</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-purple-300">Ferry X-component:</span>
                                <span className="text-purple-200 font-bold">{vFerryX.toFixed(2)} m/s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">Ferry Z-component:</span>
                                <span className="text-purple-200 font-bold">{vFerryZ.toFixed(2)} m/s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">Resultant Speed:</span>
                                <span className="text-purple-200 font-bold">{resultantSpeed.toFixed(2)} m/s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">Resultant Angle:</span>
                                <span className="text-purple-200 font-bold">{resultantAngle.toFixed(1)}°</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">Drift:</span>
                                <span className="text-purple-200 font-bold">{drift.toFixed(2)} m/s</span>
                            </div>
                        </div>
                    </div>

                    {/* Formulas */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">VECTOR ADDITION</div>
                        <div className="text-xs space-y-1 text-amber-300/80">
                            <div>v⃗_resultant = v⃗_ferry + v⃗_river</div>
                            <div>v_x = v_ferry × sin(θ)</div>
                            <div>v_z = v_ferry × cos(θ) + v_river</div>
                            <div>|v⃗| = √(v_x² + v_z²)</div>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">MISSION: RHINE CROSSING</div>
                        <div className="text-xs text-green-300/80">
                            Navigate the Basel Rhine ferry across the river current. Adjust the cable angle and ferry speed to compensate for river drift. Master vector addition in real-world navigation.
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 border-t border-cyan-500 bg-black/90 p-4 text-xs">
                <div className="flex justify-between items-center">
                    <div className="text-cyan-400">SP1.05_RHINE_FERRY // NODE: BASEL</div>
                    <div className="text-cyan-300">VECTOR_NAVIGATION: ACTIVE</div>
                </div>
            </div>
        </div>
    );
}
