# Translation and Canvas Size Fixes - February 6, 2026

## Summary
Completed all missing translations for module titles and enlarged canvas sizes across all chamber modules.

## 1. Translation Keys Added

### English (EN)
- `sp1_08_title` / `sp1_08_subtitle` - SP1.08 // OPTICS LAB
- `sp2_03_title` / `sp2_03_subtitle` - SP2.03 // MOTOR LAB (already existed)
- `sp4_01_title` / `sp4_01_subtitle` - SP4.01 // WAVE BASICS
- `sc1_04_title` / `sc1_04_subtitle` - SC1.04 // PERIODIC PUZZLE (already existed)
- `sc2_03_title` / `sc2_03_subtitle` - SC2.03 // AERO LAB (already existed)
- `sc2_04_title` / `sc2_04_subtitle` - SC2.04 // SOLUBILITY LAB (already existed)
- `sc3_01_title` / `sc3_01_subtitle` - SC3.01 // MOLECULE CANVAS
- `sb1_01_title` / `sb1_01_subtitle` - SB1.01 // CELL FACTORY (already existed)
- `sb1_01_met_title` / `sb1_01_met_subtitle` - SB1.01 // METABOLIC PATHWAYS (already existed)
- `sb2_01_title` / `sb2_01_subtitle` - SB2.01 // MENDEL'S GARDEN (already existed)
- `gb3_01_title` / `gb3_01_subtitle` - GB3.01 // DNA FORGE (already existed)

### Chinese (CN)
- `sp1_08_title` / `sp1_08_subtitle` - SP1.08 // 光学实验室
- `sp2_03_title` / `sp2_03_subtitle` - SP2.03 // 电机实验室
- `sp4_01_title` / `sp4_01_subtitle` - SP4.01 // 波动基础
- `sc3_01_title` / `sc3_01_subtitle` - SC3.01 // 分子画布
- `sb1_01_title` / `sb1_01_subtitle` - SB1.01 // 细胞工厂
- `sb1_01_met_title` / `sb1_01_met_subtitle` - SB1.01 // 代谢途径
- `sb2_01_title` / `sb2_01_subtitle` - SB2.01 // 孟德尔花园
- `gb3_01_title` / `gb3_01_subtitle` - GB3.01 // DNA 锻造厂

### German (DE)
- `sp1_08_title` / `sp1_08_subtitle` - SP1.08 // OPTIKLABOR
- `sp2_03_title` / `sp2_03_subtitle` - SP2.03 // MOTORLABOR
- `sp4_01_title` / `sp4_01_subtitle` - SP4.01 // WELLENGRUNDLAGEN
- `sc3_01_title` / `sc3_01_subtitle` - SC3.01 // MOLEKÜL-LEINWAND
- `sb1_01_title` / `sb1_01_subtitle` - SB1.01 // ZELLFABRIK
- `sb1_01_met_title` / `sb1_01_met_subtitle` - SB1.01 // STOFFWECHSELWEGE
- `sb2_01_title` / `sb2_01_subtitle` - SB2.01 // MENDELS GARTEN
- `gb3_01_title` / `gb3_01_subtitle` - GB3.01 // DNA-SCHMIEDE

## 2. Page.tsx Updates
Updated `src/app/page.tsx` to use translation keys instead of hardcoded strings for:
- Physics modules: SP1.08, SP2.03, SP4.01, GP5.04
- Chemistry modules: SC1.04, SC2.03, SC2.04, SC3.01, GC1.01, GC2.01, GC3.02
- Biology modules: SB1.01, SB1.01-MET, SB2.01, GB3.01

## 3. Canvas Size Enlargements (400px → 800px)

### Chemistry Modules
- `sc1-04/AtomBuilder.tsx` - 400px → 800px, camera z: 6→8, FOV: 50→55
- `sc1-03/AtomCanvas.tsx` - 400px → 800px, camera z: 4→5, FOV: 50→55
- `sc1-02/MoleCanvas.tsx` - 500px → 800px, camera z: 8→10, FOV: 50→55
- `sc2-03/GasTankCanvas.tsx` - 400px → 800px, camera: [4,3,4]→[5,4,5], FOV: 50→55
- `sc2-04/BeakerCanvas.tsx` - 400px → 800px, camera z: 3→4, FOV: 50→55
- `gc1-01/GalvanicCell.tsx` - 400px → 800px, camera z: 8→10, FOV: 50→55
- `gc2-01/MoleculeAssembler.tsx` - 400px → 800px, camera: [2,2,2]→[2,2,3], FOV: 50→55
- `gc3-01/EquilibriumCanvas.tsx` - 400px → 800px, camera: [5,3,5]→[6,4,6], FOV: 50→55
- `gc3-02/CrystalCanvas.tsx` - 400px → 800px, camera z: 3→4, FOV: 50→55

### Physics Modules
- `sp1-02/LawsCanvas.tsx` - 500px → 800px, camera: [10,8,12]→[12,10,14], FOV: 40→45
- `gp5-03/ColliderCanvas.tsx` - 400px → 800px, camera z: 8→10, FOV: 50→55
- `gp5-04/TunnellingCanvas.tsx` - 400px → 800px, camera z: 12→14, FOV: 50→55

### Math Modules
- `sm1-02/TesseractCanvas.tsx` - 500px → 800px, camera: [5,4,5]→[6,5,6], FOV: 50→55
- `sm2-03/LaserCanvas.tsx` - 400px → 800px, canvas: 600x400→800x800
- `gm4-01/ComplexPlaneCanvas.tsx` - 400px → 800px, camera: [5,5,5]→[6,6,6], FOV: 50→55

## 4. Build Status
✅ TypeScript compilation: SUCCESS
✅ All 58 pages generated successfully
✅ No errors or warnings

## Files Modified
1. `src/lib/i18n.ts` - Added missing translation keys for EN/CN/DE
2. `src/app/page.tsx` - Updated hardcoded strings to use i18n keys
3. 15 canvas component files - Enlarged from 400px/500px to 800px

## Notes
- All canvas heights now minimum 800px for better visibility
- Camera positions and FOV adjusted proportionally for each module
- All modules now properly support EN/DE/CN languages
- Build completed with 0 errors
