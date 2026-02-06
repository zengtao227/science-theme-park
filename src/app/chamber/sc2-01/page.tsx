"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";

const KineticsCanvas = dynamic(() => import("@/components/chamber/sc2-01/KineticsCanvas"), {
    ssr: false,
});

// Arrhenius equation: k = A * exp(-Ea / RT)
function calculateRateConstant(Ea: number, T: number): number {
    const R = 8.314; // J/(mol·K)
    const A = 1e13; // Pre-exponential factor
    const EaJoules = Ea * 1000; // Convert kJ to J
    return A * Math.exp(-EaJoules / (R * T));
}

export default function SC2_01_KineticsCrash() {
    const { t } = useLanguage();
    const [temperature, setTemperature] = useState(300); // Kelvin
    const [activationEnergy, setActivationEnergy] = useState(50); // kJ/mol
    const [showCollisions, setShowCollisions] = useState(true);

    const rateConstant = calculateRateConstant(activationEnergy, temperature);
    const tempCelsius = temperature - 273.15;

    // Calculate collision frequency (simplified)
    const collisionFrequency = Math.sqrt(temperature / 300) * 1e10;

    // Fraction of molecules with E >= Ea
    const R = 8.314;
    const fractionActive = Math.exp(-activationEnergy * 1000 / (R * temperature));

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
                    SC2.01 // KINETICS CRASH
                </h1>
                <div className="w-32" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Canvas */}
                <div className="lg:col-span-2 border border-cyan-500 p-4 bg-black/50">
                    <div className="aspect-video w-full">
                        <KineticsCanvas
                            temperature={temperature}
                            activationEnergy={activationEnergy}
                            showCollisions={showCollisions}
                        />
                    </div>
                </div>

                {/* Control Panel */}
                <div className="space-y-4">
                    <div className="border border-cyan-500 p-4 bg-black/50">
                        <div className="text-sm text-cyan-400 mb-4">SC2.01_KINETICS_MONITOR</div>

                        <div className="space-y-4">
                            {/* Temperature */}
                            <div>
                                <label className="block text-xs text-cyan-300 mb-2">
                                    Temperature (T): {temperature} K ({tempCelsius.toFixed(1)}°C)
                                </label>
                                <input
                                    type="range"
                                    min="250"
                                    max="500"
                                    step="5"
                                    value={temperature}
                                    onChange={(e) => setTemperature(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* Activation Energy */}
                            <div>
                                <label className="block text-xs text-cyan-300 mb-2">
                                    Activation Energy (Ea): {activationEnergy} kJ/mol
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="150"
                                    step="5"
                                    value={activationEnergy}
                                    onChange={(e) => setActivationEnergy(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* Show Collisions */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="collisions"
                                    checked={showCollisions}
                                    onChange={(e) => setShowCollisions(e.target.checked)}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="collisions" className="text-xs text-cyan-300">
                                    Show Collision Effects
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Arrhenius Analysis */}
                    <div className="border border-purple-500 p-3 space-y-2">
                        <div className="text-sm text-purple-400">ARRHENIUS ANALYSIS</div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                                <span className="text-purple-300">Rate Constant (k):</span>
                                <span className="text-purple-200 font-bold">{rateConstant.toExponential(2)} s⁻¹</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">Collision Frequency:</span>
                                <span className="text-purple-200 font-bold">{collisionFrequency.toExponential(2)} s⁻¹</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-300">Active Fraction:</span>
                                <span className="text-purple-200 font-bold">{(fractionActive * 100).toExponential(2)}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Formulas */}
                    <div className="border border-amber-500 p-3 space-y-2">
                        <div className="text-sm text-amber-400">ARRHENIUS EQUATION</div>
                        <div className="text-xs space-y-1 text-amber-300/80">
                            <div>k = A × exp(-Ea / RT)</div>
                            <div>ln(k) = ln(A) - Ea/RT</div>
                            <div>R = 8.314 J/(mol·K)</div>
                            <div>A = frequency factor</div>
                        </div>
                    </div>

                    {/* Collision Theory */}
                    <div className="border border-pink-500 p-3 space-y-2">
                        <div className="text-sm text-pink-400">COLLISION THEORY</div>
                        <div className="text-xs text-pink-300/80">
                            <div className="mb-2">For a reaction to occur:</div>
                            <div>1. Molecules must collide</div>
                            <div>2. E_collision ≥ Ea</div>
                            <div>3. Proper orientation</div>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="border border-green-500 p-3 space-y-2">
                        <div className="text-sm text-green-400">MISSION: REACTION KINETICS</div>
                        <div className="text-xs text-green-300/80">
                            Study the Arrhenius equation and collision theory. Observe how temperature and activation energy affect reaction rates. Master chemical kinetics at the molecular level.
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 border-t border-cyan-500 bg-black/90 p-4 text-xs">
                <div className="flex justify-between items-center">
                    <div className="text-cyan-400">SC2.01_KINETICS_CRASH // NODE: BASEL</div>
                    <div className="text-cyan-300">ARRHENIUS_ENGINE: ACTIVE</div>
                </div>
            </div>
        </div>
    );
}
