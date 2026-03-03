"use client";

import { useState, useEffect, useCallback } from "react";
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
  const ui = {
    title: {
      en: "Partial Pressure Calculator",
      cn: "分压计算器",
      de: "Partialdruckrechner",
    },
    totalPressure: {
      en: "Total Pressure",
      cn: "总压力",
      de: "Gesamtdruck",
    },
    totalMolesZero: {
      en: "Total moles cannot be zero",
      cn: "总摩尔数不能为 0",
      de: "Die Gesamtstoffmenge darf nicht null sein",
    },
    moleFractionMismatch: {
      en: "Mole fractions sum to {sum}, should be 1.0",
      cn: "摩尔分数之和为 {sum}，应为 1.0",
      de: "Die Summe der Molenbrüche ist {sum}, sollte 1.0 sein",
    },
    gasDefaultName: {
      en: "Gas {index}",
      cn: "气体 {index}",
      de: "Gas {index}",
    },
    remove: {
      en: "Remove",
      cn: "删除",
      de: "Entfernen",
    },
    moles: {
      en: "Moles",
      cn: "物质的量",
      de: "Stoffmenge",
    },
    addGas: {
      en: "Add Gas",
      cn: "添加气体",
      de: "Gas hinzufügen",
    },
    results: {
      en: "Results",
      cn: "结果",
      de: "Ergebnisse",
    },
    totalMoles: {
      en: "Total Moles",
      cn: "总摩尔数",
      de: "Gesamtstoffmenge",
    },
    moleFraction: {
      en: "Mole Fraction",
      cn: "摩尔分数",
      de: "Molenbruch",
    },
    partialPressure: {
      en: "Partial Pressure",
      cn: "分压",
      de: "Partialdruck",
    },
    daltonLaw: {
      en: "Dalton's Law of Partial Pressures",
      cn: "道尔顿分压定律",
      de: "Daltonsches Gesetz der Partialdrücke",
    },
  } as const;

  const [totalPressure, setTotalPressure] = useState(101325); // Pa
  const [gases, setGases] = useState<GasComponent[]>([
    { id: "1", name: "N_2", moles: 0.78, molarMass: 0.028 },
    { id: "2", name: "O_2", moles: 0.21, molarMass: 0.032 },
  ]);
  const [result, setResult] = useState<MixtureResult | null>(null);

  const calculateMixture = useCallback(() => {
    const totalMoles = gases.reduce((sum, gas) => sum + gas.moles, 0);
    
    if (totalMoles === 0) {
      setResult({
        totalPressure,
        totalMoles: 0,
        components: [],
        isValid: false,
        validationErrors: [ui.totalMolesZero[language]],
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
      validationErrors.push(
        ui.moleFractionMismatch[language].replace("{sum}", moleFractionSum.toFixed(3))
      );
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
  }, [gases, totalPressure, onCalculate, language, ui.totalMolesZero, ui.moleFractionMismatch]);

  useEffect(() => {
    calculateMixture();
  }, [calculateMixture]);

  const addGas = () => {
    if (gases.length >= maxGases) return;
    const defaultName = ui.gasDefaultName[language].replace("{index}", String(gases.length + 1));
    setGases([
      ...gases,
      { id: Date.now().toString(), name: defaultName, moles: 0.1 },
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
        {ui.title[language]}
      </h3>

      {/* Total Pressure Input */}
      <div className="mb-4">
        <label className="text-sm text-gray-300 mb-1 block">
          {ui.totalPressure[language]}
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
          aria-label={ui.totalPressure[language]}
        />
      </div>

      {/* Gas Components */}
      <div className="space-y-3 mb-4">
        {gases.map((gas) => (
          <div key={gas.id} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                value={gas.name}
                onChange={(e) => updateGas(gas.id, "name", e.target.value)}
                className="bg-gray-700 text-white px-2 py-1 rounded text-sm w-20"
                aria-label={`${ui.title[language]} ${gas.name}`}
              />
              {gases.length > 1 && (
                <button
                  onClick={() => removeGas(gas.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                  aria-label={`${ui.remove[language]} ${gas.name}`}
                >
                  {ui.remove[language]}
                </button>
              )}
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                {ui.moles[language]}: {gas.moles.toFixed(2)} mol
              </label>
              <input
                type="range"
                min="0.01"
                max="2"
                step="0.01"
                value={gas.moles}
                onChange={(e) => updateGas(gas.id, "moles", Number(e.target.value))}
                className="w-full"
                aria-label={`${gas.name} ${ui.moles[language]}`}
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
          aria-label={ui.addGas[language]}
        >
          + {ui.addGas[language]}
        </button>
      )}

      {/* Results */}
      {result && (
        <div className="mt-4 p-4 bg-black/30 rounded-lg border border-cyan-500/30">
          <h4 className="text-lg font-bold text-cyan-400 mb-3">{ui.results[language]}</h4>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-300">
              {ui.totalMoles[language]}: <span className="text-white font-mono">{result.totalMoles.toFixed(3)} mol</span>
            </p>
            <p className="text-sm text-gray-300">
              {ui.totalPressure[language]}: <span className="text-white font-mono">{(result.totalPressure / 1000).toFixed(1)} kPa</span>
            </p>
          </div>

          <div className="space-y-2">
            {result.components.map((comp, idx) => (
              <div key={idx} className="bg-gray-800/50 p-2 rounded">
                <p className="text-sm font-bold text-cyan-300">{comp.gas.name}</p>
                <p className="text-xs text-gray-400">
                  {ui.moleFraction[language]}: <span className="text-white font-mono">{comp.moleFraction.toFixed(3)}</span>
                </p>
                <p className="text-xs text-gray-400">
                  {ui.partialPressure[language]}: <span className="text-white font-mono">{(comp.partialPressure / 1000).toFixed(1)} kPa</span>
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
          {ui.daltonLaw[language]}
        </p>
      </div>
    </div>
  );
}
