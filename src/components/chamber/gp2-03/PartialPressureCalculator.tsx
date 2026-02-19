"use client";

import { useState, useEffect } from "react";
import type { GasComponent, MixtureResult, Language } from "@/lib/gp2-03-types";

interface PartialPressureCalculatorProps {
  language: Language;
  maxGases?: number;
  onCalculate?: (result: MixtureResult) => void;
}

export default function PartialPressureCalculator({
  language,
  maxGases = 5,
  onCalculate,
}: PartialPressureCalculatorProps) {
  const [totalPressure, setTotalPressure] = useState(101325); // Pa
  const [gases, setGases] = useState<GasComponent[]>([
    { id: "1", name: "N₂", moles: 0.78, molarMass: 0.028 },
    { id: "2", name: "O₂", moles: 0.21, molarMass: 0.032 },
  ]);
  const [result, setResult] = useState<MixtureResult | null>(null);

  useEffect(() => {
    calculateMixture();
  }, [gases, totalPressure]);

  const calculateMixture = () => {
    const totalMoles = gases.reduce((sum, gas) => sum + gas.moles, 0);
    
    if (totalMoles === 0) {
      setResult({
        totalPressure,
        totalMoles: 0,
        components: [],
        isValid: false,
        validationErrors: ["Total moles cannot be zero"],
      });
      return;
    }

    const components = gases.map((gas) => {
      const moleFraction = gas.moles / totalMoles;
      const partialPressure = moleFraction * totalPressure;
      return {
        gas,
        moleFraction,
        partialPressure,
      };
    });

    // Validate mole fractions sum to 1.0 (within tolerance)
    const moleFractionSum = components.reduce((sum, c) => sum + c.moleFraction, 0);
    const isValid = Math.abs(moleFractionSum - 1.0) <= 0.001;

    const validationErrors: string[] = [];
    if (!isValid) {
      validationErrors.push(`Mole fractions sum to ${moleFractionSum.toFixed(3)}, should be 1.0`);
    }

    const mixResult: MixtureResult = {
      totalPressure,
      totalMoles,
      components,
      isValid,
      validationErrors,
    };

    setResult(mixResult);
    if (onCalculate) {
      onCalculate(mixResult);
    }
  };

  const addGas = () => {
    if (gases.length >= maxGases) return;
    setGases([
      ...gases,
      { id: Date.now().toString(), name: `Gas ${gases.length + 1}`, moles: 0.1 },
    ]);
  };

  const removeGas = (id: string) => {
    if (gases.length <= 1) return;
    setGases(gases.filter((g) => g.id !== id));
  };

  const updateGas = (id: string, field: keyof GasComponent, value: string | number) => {
    setGases(gases.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-900/50 rounded-xl p-4 overflow-y-auto">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">
        {language === "en" && "Partial Pressure Calculator"}
        {language === "cn" && "分压计算器"}
        {language === "de" && "Partialdruckrechner"}
      </h3>

      {/* Total Pressure Input */}
      <div className="mb-4">
        <label className="text-sm text-gray-300 mb-1 block">
          {language === "en" && "Total Pressure"}
          {language === "cn" && "总压力"}
          {language === "de" && "Gesamtdruck"}
          : {(totalPressure / 1000).toFixed(1)} kPa
        </label>
        <input
          type="range"
          min="50000"
          max="200000"
          step="1000"
          value={totalPressure}
          onChange={(e) => setTotalPressure(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Gas Components */}
      <div className="space-y-3 mb-4">
        {gases.map((gas, idx) => (
          <div key={gas.id} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                value={gas.name}
                onChange={(e) => updateGas(gas.id, "name", e.target.value)}
                className="bg-gray-700 text-white px-2 py-1 rounded text-sm w-20"
              />
              {gases.length > 1 && (
                <button
                  onClick={() => removeGas(gas.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Moles: {gas.moles.toFixed(2)} mol
              </label>
              <input
                type="range"
                min="0.01"
                max="2"
                step="0.01"
                value={gas.moles}
                onChange={(e) => updateGas(gas.id, "moles", Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Gas Button */}
      {gases.length < maxGases && (
        <button
          onClick={addGas}
          className="mb-4 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
        >
          + Add Gas
        </button>
      )}

      {/* Results */}
      {result && (
        <div className="mt-4 p-4 bg-black/30 rounded-lg border border-cyan-500/30">
          <h4 className="text-lg font-bold text-cyan-400 mb-3">Results</h4>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-300">
              Total Moles: <span className="text-white font-mono">{result.totalMoles.toFixed(3)} mol</span>
            </p>
            <p className="text-sm text-gray-300">
              Total Pressure: <span className="text-white font-mono">{(result.totalPressure / 1000).toFixed(1)} kPa</span>
            </p>
          </div>

          <div className="space-y-2">
            {result.components.map((comp, idx) => (
              <div key={idx} className="bg-gray-800/50 p-2 rounded">
                <p className="text-sm font-bold text-cyan-300">{comp.gas.name}</p>
                <p className="text-xs text-gray-400">
                  Mole Fraction: <span className="text-white font-mono">{comp.moleFraction.toFixed(3)}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Partial Pressure: <span className="text-white font-mono">{(comp.partialPressure / 1000).toFixed(1)} kPa</span>
                </p>
              </div>
            ))}
          </div>

          {!result.isValid && (
            <div className="mt-3 p-2 bg-red-500/20 border border-red-500/30 rounded">
              <p className="text-xs text-red-300">
                {result.validationErrors.join(", ")}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Formula */}
      <div className="mt-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
        <p className="text-cyan-300 text-center font-mono text-sm">
          P<sub>i</sub> = χ<sub>i</sub> × P<sub>total</sub>
        </p>
        <p className="text-gray-400 text-center text-xs mt-1">
          {language === "en" && "Dalton's Law of Partial Pressures"}
          {language === "cn" && "道尔顿分压定律"}
          {language === "de" && "Daltonsches Gesetz der Partialdrücke"}
        </p>
      </div>
    </div>
  );
}
