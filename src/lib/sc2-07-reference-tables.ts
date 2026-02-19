/**
 * SC2.07 Enthalpy & Energetics - Reference Tables
 * 
 * Bond energy and formation enthalpy reference data
 * 
 * Requirements: 4.7, 5.6, 20.3-20.5, 21.3-21.5
 */

import { BondEnergyReference, FormationEnthalpyReference } from './sc2-07-types';

/**
 * Bond Energy Reference Table
 * All values in kJ/mol
 * 
 * Requirements: 4.7, 20.3, 20.4, 20.5
 * Property 44: Bond Energy Reference Table Completeness
 */
export const bondEnergyTable: BondEnergyReference[] = [
  { bondType: 'C-H', energy: 413, description: 'Carbon-Hydrogen single bond' },
  { bondType: 'C-C', energy: 347, description: 'Carbon-Carbon single bond' },
  { bondType: 'C=C', energy: 614, description: 'Carbon-Carbon double bond' },
  { bondType: 'C≡C', energy: 839, description: 'Carbon-Carbon triple bond' },
  { bondType: 'C-O', energy: 358, description: 'Carbon-Oxygen single bond' },
  { bondType: 'C=O', energy: 799, description: 'Carbon-Oxygen double bond' },
  { bondType: 'O-H', energy: 464, description: 'Oxygen-Hydrogen single bond' },
  { bondType: 'N-H', energy: 391, description: 'Nitrogen-Hydrogen single bond' },
  { bondType: 'H-H', energy: 436, description: 'Hydrogen-Hydrogen single bond' },
  { bondType: 'O=O', energy: 498, description: 'Oxygen-Oxygen double bond' },
  { bondType: 'N≡N', energy: 945, description: 'Nitrogen-Nitrogen triple bond' },
  { bondType: 'C≡N', energy: 891, description: 'Carbon-Nitrogen triple bond' },
  { bondType: 'C-N', energy: 305, description: 'Carbon-Nitrogen single bond' },
  { bondType: 'C=N', energy: 615, description: 'Carbon-Nitrogen double bond' },
  { bondType: 'N-N', energy: 163, description: 'Nitrogen-Nitrogen single bond' },
  { bondType: 'N=N', energy: 418, description: 'Nitrogen-Nitrogen double bond' },
  { bondType: 'O-O', energy: 146, description: 'Oxygen-Oxygen single bond' },
  { bondType: 'C-Cl', energy: 328, description: 'Carbon-Chlorine single bond' },
  { bondType: 'C-Br', energy: 276, description: 'Carbon-Bromine single bond' },
  { bondType: 'C-I', energy: 238, description: 'Carbon-Iodine single bond' },
  { bondType: 'H-Cl', energy: 431, description: 'Hydrogen-Chlorine single bond' },
  { bondType: 'H-Br', energy: 366, description: 'Hydrogen-Bromine single bond' },
  { bondType: 'H-I', energy: 299, description: 'Hydrogen-Iodine single bond' },
];

/**
 * Formation Enthalpy Reference Table
 * All values in kJ/mol at standard conditions (25°C, 1 atm)
 * 
 * Requirements: 5.6, 21.3, 21.4, 21.5
 * Property 45: Formation Enthalpy Reference Table Completeness
 * Property 46: Elements Standard State Zero Enthalpy
 */
export const formationEnthalpyTable: FormationEnthalpyReference[] = [
  // Common compounds
  {
    formula: 'H2O(l)',
    formulaLatex: '\\text{H}_2\\text{O}(l)',
    name: 'water (liquid)',
    deltaHf: -286,
    state: 'l'
  },
  {
    formula: 'H2O(g)',
    formulaLatex: '\\text{H}_2\\text{O}(g)',
    name: 'water (gas)',
    deltaHf: -242,
    state: 'g'
  },
  {
    formula: 'CO2(g)',
    formulaLatex: '\\text{CO}_2(g)',
    name: 'carbon dioxide',
    deltaHf: -394,
    state: 'g'
  },
  {
    formula: 'CH4(g)',
    formulaLatex: '\\text{CH}_4(g)',
    name: 'methane',
    deltaHf: -75,
    state: 'g'
  },
  {
    formula: 'C2H5OH(l)',
    formulaLatex: '\\text{C}_2\\text{H}_5\\text{OH}(l)',
    name: 'ethanol',
    deltaHf: -278,
    state: 'l'
  },
  {
    formula: 'NH3(g)',
    formulaLatex: '\\text{NH}_3(g)',
    name: 'ammonia',
    deltaHf: -46,
    state: 'g'
  },
  {
    formula: 'HCl(g)',
    formulaLatex: '\\text{HCl}(g)',
    name: 'hydrogen chloride',
    deltaHf: -92,
    state: 'g'
  },
  {
    formula: 'NO(g)',
    formulaLatex: '\\text{NO}(g)',
    name: 'nitrogen monoxide',
    deltaHf: 90,
    state: 'g'
  },
  {
    formula: 'NO2(g)',
    formulaLatex: '\\text{NO}_2(g)',
    name: 'nitrogen dioxide',
    deltaHf: 33,
    state: 'g'
  },
  {
    formula: 'SO2(g)',
    formulaLatex: '\\text{SO}_2(g)',
    name: 'sulfur dioxide',
    deltaHf: -297,
    state: 'g'
  },
  {
    formula: 'H2S(g)',
    formulaLatex: '\\text{H}_2\\text{S}(g)',
    name: 'hydrogen sulfide',
    deltaHf: -21,
    state: 'g'
  },
  {
    formula: 'CaCO3(s)',
    formulaLatex: '\\text{CaCO}_3(s)',
    name: 'calcium carbonate',
    deltaHf: -1207,
    state: 's'
  },
  {
    formula: 'CaO(s)',
    formulaLatex: '\\text{CaO}(s)',
    name: 'calcium oxide',
    deltaHf: -635,
    state: 's'
  },
  {
    formula: 'Fe2O3(s)',
    formulaLatex: '\\text{Fe}_2\\text{O}_3(s)',
    name: 'iron(III) oxide',
    deltaHf: -824,
    state: 's'
  },
  {
    formula: 'Al2O3(s)',
    formulaLatex: '\\text{Al}_2\\text{O}_3(s)',
    name: 'aluminum oxide',
    deltaHf: -1676,
    state: 's'
  },
  // Elements in standard states (ΔH°f = 0)
  {
    formula: 'H2(g)',
    formulaLatex: '\\text{H}_2(g)',
    name: 'hydrogen',
    deltaHf: 0,
    state: 'g'
  },
  {
    formula: 'O2(g)',
    formulaLatex: '\\text{O}_2(g)',
    name: 'oxygen',
    deltaHf: 0,
    state: 'g'
  },
  {
    formula: 'N2(g)',
    formulaLatex: '\\text{N}_2(g)',
    name: 'nitrogen',
    deltaHf: 0,
    state: 'g'
  },
  {
    formula: 'C(s)',
    formulaLatex: '\\text{C}(s)',
    name: 'carbon (graphite)',
    deltaHf: 0,
    state: 's'
  },
  {
    formula: 'S(s)',
    formulaLatex: '\\text{S}(s)',
    name: 'sulfur (rhombic)',
    deltaHf: 0,
    state: 's'
  },
  {
    formula: 'Fe(s)',
    formulaLatex: '\\text{Fe}(s)',
    name: 'iron',
    deltaHf: 0,
    state: 's'
  },
  {
    formula: 'Al(s)',
    formulaLatex: '\\text{Al}(s)',
    name: 'aluminum',
    deltaHf: 0,
    state: 's'
  },
  {
    formula: 'Cu(s)',
    formulaLatex: '\\text{Cu}(s)',
    name: 'copper',
    deltaHf: 0,
    state: 's'
  },
  {
    formula: 'Zn(s)',
    formulaLatex: '\\text{Zn}(s)',
    name: 'zinc',
    deltaHf: 0,
    state: 's'
  },
  {
    formula: 'Br2(l)',
    formulaLatex: '\\text{Br}_2(l)',
    name: 'bromine',
    deltaHf: 0,
    state: 'l'
  },
  {
    formula: 'Hg(l)',
    formulaLatex: '\\text{Hg}(l)',
    name: 'mercury',
    deltaHf: 0,
    state: 'l'
  },
];

/**
 * Get bond energy by bond type
 */
export function getBondEnergy(bondType: string): number | undefined {
  const bond = bondEnergyTable.find(b => b.bondType === bondType);
  return bond?.energy;
}

/**
 * Get formation enthalpy by formula
 */
export function getFormationEnthalpy(formula: string): number | undefined {
  const compound = formationEnthalpyTable.find(c => c.formula === formula);
  return compound?.deltaHf;
}

/**
 * Check if a compound is an element in standard state
 */
export function isElementStandardState(formula: string): boolean {
  const compound = formationEnthalpyTable.find(c => c.formula === formula);
  return compound?.deltaHf === 0;
}
