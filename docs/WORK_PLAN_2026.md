# Science Theme Park - 2026 Master Work Plan

**Current Status**: Phase 7 Scenario Compliance Remediation / Phase 6 Curriculum Audit
**Last Updated**: 2026-03-02 (GC1.01/GC3.01/GC3.02/SC1.01/SC1.02 prompt wrapper cleanup, full QA passed)
**Plan Version**: 5.4 (Batch C wrapper cleanup extension)

---

## 🚨 Phase 7: Scenario Compliance Remediation (2026-03-01)

### 7.0 Objective
- Enforce `docs/SCENARIO_GENERATION_REQUIREMENTS.md` as a hard standard for all Math/Physics/Chemistry/Biology scenario content.
- Complete remediation in three tracks:
  1. Fill empty `scenario_desc` baseline.
  2. Rewrite bare-formula prompts into scenario-based prompts with four mandatory elements.
  3. Eliminate hardcoded prompt text and ensure i18n-based prompt pipeline.

### 7.1 Immediate Sprint (SP1.01 Baseline)
- [x] Fill `SP1.01` empty `scenario_desc` in EN/CN/DE.
  Result: EN/CN/DE now all `65/65` non-empty.
- [x] Keep existing four non-empty anchors (`SP1.01.035`, `SP1.01.038`, `SP1.01.051`, `SP1.01.056`) consistent in DE.
- [x] Verify UI rendering path remains stable (`sp1-01-adapter.ts` -> `sp1-01/page.tsx` context block).
  Result: `npm run validate:translations` passed after merge.

### 7.2 Remediation Method (Batch by Violation Type)
- [ ] **Batch A**: Empty scenario text completion (all modules).
- [ ] **Batch B**: Bare formula / parameter-only prompt rewrite (e.g. `x+3=7`, `a=35,b=120` style).
- [ ] **Batch C**: Hardcoded prompt extraction into i18n keys and tri-language sync.
- [x] Produce per-batch audit snapshot under `temp/` before merge.

### 7.3 Priority Queue (First 10 high-risk modules)
- [x] `sm2-08` (scenarios merged + Batch C prompt migration complete: 63 hardcoded `promptLatex` -> i18n, 53 tri-language keys aligned)
- [x] `sm1-04` (applications/scenarios text aligned to 4-element structure in EN/CN/DE)
- [x] `sc2-05` (60 context literals migrated to i18n in EN/CN/DE; page hardcoding removed)
- [x] `em1-01` (79 hardcoded prompt/render violations removed; EN/CN/DE prompts aligned)
- [x] `gp2-02` (q_* prompt placeholders translated and synchronized in EN/CN/DE)
- [x] `gb1-01` (36 hardcoded promptLatex migrated to i18n; key symmetry verified)
- [x] `gm1-01-advanced` (66 hardcoded promptLatex migrated to `gm1_01_advanced.prompts.*`; 27 keys tri-language aligned)
- [x] `gp2-01` (23 remaining hardcoded promptLatex migrated; `gp2_01.prompts` EN/CN/DE aligned to 43 keys)
- [x] `sm1-03` (59 promptLatex violations cleared: 56 wrappers + 3 hardcoded strings; `sm1_03.prompts` EN/CN/DE = 26)
- [x] `sm3-05` (remaining 32 template-literal `promptLatex` migrated to `sm3_05.prompts.*`; EN/CN/DE prompts keys aligned = 60)
- [x] `sm1-01` (60 `promptLatex` wrapper shells removed: `` `\\text{${...}}` `` -> direct i18n text refs)
- [x] `sm1-05` (60 `promptLatex` wrapper shells removed: `` `\\text{${...}}` `` -> direct i18n text refs)
- [x] `sc3-01` (20 hardcoded `promptLatex` migrated to `sc3_01.prompts.*`; EN/CN/DE prompts aligned and hint hardcoding removed)
- [x] `sp3-01` (audit check: no hardcoded promptLatex / no wrapper violations)
- [x] `sp3-04` (EN/DE prompt TODO placeholders replaced with pedagogical prompts; physics i18n TODO = 0)
- [x] `sc2-01` (60 hardcoded `promptLatex` migrated to `sc2_01.prompts.*`; EN/CN/DE prompts keys aligned = 45)
- [x] `sc2-02` (60 stage prompts + monitor labels fully migrated to i18n; zero hardcoded `promptLatex` wrappers)
- [x] `sm2-02` (all template-literal `promptLatex` migrated to `sm2_02.prompts.*` with parameterized tri-language keys)
- [x] `sc2-03` (3 residual hardcoded stage `promptLatex` removed from quest generator; EN/CN/DE `sc2_03.prompts` keys aligned)
- [x] `sm2-03` (audit pass: stage `promptLatex` already i18n-sourced; no migration delta required)
- [x] `sc2-04` (hardcoded `promptLatex` removed from quest generator; EN/CN/DE `sc2_04.prompts` keys aligned)
- [x] `sm2-04` (audit pass: stage prompts remain i18n-driven; no quest-logic migration required)
- [x] `sm2-13` (all stage `promptLatex` migrated to i18n templates with EN/CN/DE symmetry; module UI hardcoded literals localized)
- [x] `gc1-01` + `gc3-01` + `gc3-02` + `sc1-01` + `sc1-02` (removed residual `\\text{${t(...)}}` wrappers from quest `promptLatex`; prompt pipeline now direct i18n)

### 7.4 Quality Gates (must pass before merge)
- [x] `npm run lint` (passed after SC2.02 + SM2.02 Batch C migration, 2026-03-02)
- [x] `npm run build` (passed after SC2.02 + SM2.02 Batch C migration, 2026-03-02)
- [x] `npm run validate:translations` (passed after SC2.02 + SM2.02 Batch C migration, 2026-03-02)
- [x] `bash scripts/audit-rendering.sh` (passed after SC2.02 + SM2.02 Batch C migration, 2026-03-02)
- [ ] Scenario 4-element compliance check completed for touched content.

### 7.5 Batch A Wave-1 Results (2026-03-01)
- [x] `SP1.01`: `scenario_desc` EN/CN/DE = `65/65` non-empty.
- [x] `SM1.04`: `APPLICATIONS` stage audit reached `20/20` four-element heuristic in EN/CN/DE.
- [x] `SM2.08`: merged `sm2_08.scenarios` from Claude deliverables; `problems` preserved byte-level.
- [x] `SC2.05`: migrated all 60 hardcoded `context` strings from `page.tsx` into i18n keys (`sc2_05.contexts.*`) across EN/CN/DE.
- [x] `SM2.08 Batch B`: TODO placeholders / bare-label problem text cleaned; `two_dice` vs `dice_two` scenario key usage unified.
- [x] `EM1.01 Batch B`: TODO placeholders removed and prompt path unified to i18n.
- [x] `GP2.02 Batch B`: q_* prompts localized in CN/DE and aligned with EN keys.
- [x] `GB1.01 Batch B`: 36 promptLatex hardcoding removed, tri-language key symmetry maintained.
- [x] `GM1.01-ADV Batch C`: 66 promptLatex hardcoding removed, rendering pipeline unchanged.
- [x] `GP2.01 Batch C`: 23 residual hardcoded promptLatex removed; no quest structure changes.
- [x] `SP3.04 Batch C`: EN/DE 60+ prompt placeholders replaced; key structure preserved.
- [x] `SM1.03 Batch C`: 59 promptLatex issues removed (`\\text{${tObj.labels...}}` wrappers + hardcoded prompt strings), i18n keys synchronized in EN/CN/DE.
- [x] `SM2.08 Batch C`: 63 hardcoded `promptLatex` removed from `page.tsx`; `sm2_08.prompts` EN/CN/DE +53 keys and DATA_STATS residual 3 migrated.
- [x] `SC2.01 Batch C`: 60 hardcoded `promptLatex` removed from `page.tsx`; `sc2_01.prompts` EN/CN/DE +45 keys, zero wrapper violations.
- [x] `SM3.05 Batch C`: 32 template-literal hardcoded `promptLatex` removed; `sm3_05.prompts` EN/CN/DE aligned to 60 keys.
- [x] `SC3.01 Batch C`: 20 hardcoded prompt strings removed from `page.tsx`; `sc3_01.prompts` EN/CN/DE +20 keys, dynamic molecule placeholders enabled.
- [x] `SC3.05 Batch C continuation`: final 3 hardcoded `promptLatex` removed from `page.tsx` (VSEPR/HYBRIDIZATION/MO_THEORY), now using existing `sc3_05.prompts.*`.
- [x] `SM1.01 wrapper cleanup`: 60 prompt wrappers removed (`\\text{${...}}` -> direct i18n string), render path unchanged.
- [x] `SM1.05 wrapper cleanup`: 60 prompt wrappers removed (`\\text{${...}}` -> direct i18n string), render path unchanged.
- [x] `SC2.02 Batch C`: migrated stage question prompts and monitor labels to i18n (EN/CN/DE), removed remaining prompt template hardcoding.
- [x] `SM2.02 Batch C`: migrated all prompt template literals to parameterized `sm2_02.prompts.*` in EN/CN/DE, preserving quest math logic.
- [x] `SC2.03 Batch C`: migrated 3 hardcoded quest prompts in `src/lib/sc2-03/quests.ts` to `t.prompts.*` and added tri-language keys (`boyle_given`, `charles_given`, `combined_given`).
- [x] `SM2.03 Batch C`: completed audit; no hardcoded `promptLatex` remained, existing i18n path retained.
- [x] `SC2.04 Batch C`: migrated residual hardcoded `promptLatex` in `src/lib/sc2-04/quests.ts` to i18n, added tri-language keys (`solubility_given`, `elite_rhine_sample`), and localized elite page labels.
- [x] `SM2.04 Batch C`: completed audit; `promptLatex` pipeline already i18n-based, no structural quest changes required.
- [x] `SC2.06 + SM2.06 hardcoded residue cleanup`: removed page-level hardcoded `READY` and migrated `Total e^-` label into tri-language `sc2_06.labels.total_electrons`.
- [x] `SM2.07 prompt wrapper cleanup`: removed `\\text{${...}}` wrappers from stage/dynamic prompt assignment; prompt rendering now uses direct i18n strings through `renderMixedText`.
- [x] `SC2.07 placeholder i18n cleanup`: migrated hardcoded input fallback (`Enter value`) to `sc2_07.prompts.enter_value_placeholder` in EN/CN/DE.
- [x] `SC3.01 + SC3.05 + SM1.01 + SM1.05 residue cleanup`: removed remaining hardcoded/wrapper `promptLatex` strings and legacy English fallback literals in active quest prompts/placeholders; rendering and i18n audits remain clean.
- [x] `SM1.02 + SC3.04 wrapper cleanup`: removed residual `\\text{${t(...)}}` prompt wrappers and switched to direct i18n prompt text for `renderMixedText` path consistency.
- [x] `SP3.01 prompt i18n cleanup`: replaced remaining English hardcoded prompt templates with `sp3_01.prompts.*` i18n keys; synchronized new keys (`equivalent_unit`, `round_sigfigs`, `calculate_with_sigfigs`, `percent_uncertainty`) in EN/CN/DE.
- [x] `SM2.13 Batch C`: migrated all 16 stage prompt templates in `sm2-13-quest-data.ts` to `sm2_13.prompts.*`, localized module page UI labels/stage strings, and aligned EN/CN/DE key sets.
- [x] `GC1.02 residue cleanup`: replaced 3 remaining hardcoded `promptLatex` values in `src/lib/gc1-02/quests.ts` with existing `gc1_02.prompts.*` i18n keys.
- [x] `GC1.01 + GC3.01 + GC3.02 + SC1.01 + SC1.02 wrapper cleanup`: removed residual `promptLatex` wrapper shells (`\\text{${t(...)}}`) in quest builders and switched to direct i18n prompt strings.
- [ ] Next wave target: Batch B 题干语义改写（裸公式/裸参数）+ 四要素场景质量复核（跨模块抽检）。

---

## 📋 Phase 6: Systematic Curriculum Audit (2026-02-21)

### 6.0 Audit Methodology

This audit compares all chamber modules against:
1. **Lehrplan 21, Zyklus 3** (Sekundarstufe I, Grades 7–9) — the official Swiss curriculum framework adopted by Basel-Stadt.
2. **Basel-Stadt Gymnasium Lehrplan** — upper secondary (Grades 10–12) requirements.
3. **Baselland Stoffinhalte und Themen Mathematik** — the cantonal content specification for Sek I.

The audit checks TWO dimensions:
- **A) Module Coverage**: Are all Lehrplan 21 competency areas represented by at least one chamber module?
- **B) Quest Density**: Does each module contain sufficient practice quests (target: ≥20 quests per module with BASIC/CORE/ADVANCED/ELITE tiers)?

---

### 6.1 Module Inventory (97 Chambers Total)

| Domain | Sek I Count | Gymnasium Count | Enrichment | Total |
|--------|-----------|----------------|------------|-------|
| Math (SM/GM) | 22 + GM1.01-ADV | 8 | 3 (EM) | 34 |
| Physics (SP/GP) | 10 | 10 | 0 | 20 |
| Chemistry (SC/GC) | 18 | 5 | 0 | 23 |
| Biology (SB/GB) | 12 + variants | 5 | 0 | 20 |
| **TOTAL** | | | | **97** |

---

### 6.2 AUDIT A — Lehrplan 21 Zyklus 3 Coverage Analysis

#### 6.2.1 Mathematics (MA) — Lehrplan 21 Kompetenzbereiche

| LP21 Kompetenzbereich | Sub-Area | Our Modules | Status |
|---|---|---|---|
| **MA.1 Zahl und Variable** | Natürliche Zahlen, Brüche, Dezimalzahlen | SM1.01 (Areas), SM1.03 (Below Zero), SM1.05 (Ratio) | ✅ Covered |
| | Negative Zahlen, rationale Zahlen | SM1.03 (Below Zero) | ✅ Covered |
| | Terme, Variablen, Gleichungen | SM1.02 (Algebra), SM1.04 (Equations) | ✅ Covered |
| | Potenzen, Wurzeln | SM2.05 (Powers & Roots) | ✅ Covered |
| | Binomische Formeln | SM2.01 (Binomial Factory) | ✅ Covered |
| | Lineare Gleichungssysteme | SM2.06 (Linear Systems) | ✅ Covered |
| | **Quadratische Gleichungen** | SM3.01 (Quadratic Equations) | ✅ Covered |
| | Ungleichungen | SM2.09 (Inequalities) | ✅ Covered |
| | Logarithmen, Exponentialfunktionen | SM3.03, SM3.04 | ✅ Covered |
| **MA.2 Form und Raum** | Pythagoras / Wurzeln | SM2.02 (Pythagoras & Roots) | ✅ Covered |
| | Ähnlichkeit, Massstab | SM2.04 (Similarity & Scaling) | ✅ Covered |
| | Koordinatensystem | SM2.07 (Coordinate Recon) | ✅ Covered |
| | Trigonometrie | SM3.02 (Trigonometry Array) | ✅ Covered |
| | 3D-Geometrie (Volumen, Oberfläche) | SM1.01 (Areas & Volumes), SM3.05 (Advanced 3D) | ✅ Covered |
| | **Kongruenzabbildungen (Spiegelung, Drehung, Verschiebung)** | ❌ **MISSING** | ⚠️ Gap |
| **MA.3 Grössen, Funktionen, Daten, Zufall** | Proportionalität, Prozente | SM1.05 (Ratio Lab) | ✅ Covered |
| | Lineare Funktionen | SM2.03 (Lines & Functions) | ✅ Covered |
| | Wahrscheinlichkeit | SM2.08 (Probability Basics), GM3.01 (Probability Vault) | ✅ Covered |
| | Datenanalyse, Statistik | SM2.10 (Data Analysis) | ✅ Covered |
| | Folgen und Reihen | SM2.11 (Sequences & Series) | ✅ Covered |
| | Kombinatorik | SM2.12 (Combinatorics) | ✅ Covered |

**⚠️ Math Gap Found**: **Kongruenzabbildungen** (Congruence Transformations: Reflection, Rotation, Translation, and their composition) — This is a core Lehrplan 21 geometry topic for Zyklus 3 that is NOT covered by any existing module. SM2.07 covers coordinate systems but NOT geometric transformations (Spiegelung, Drehung, Verschiebung).

---

#### 6.2.2 Physics (NT — Natur und Technik, Physics strand)

| LP21 Kompetenzbereich (NT) | Sub-Area | Our Modules | Status |
|---|---|---|---|
| **NT.4 Energie** | Energieformen, -umwandlung | SP3.03 (Energy & Work) | ✅ Covered |
| | Wärme, Temperatur | GP2.01, GP2.02 (Thermodynamics) | ✅ Covered |
| **NT.5 Mechanik & Elektrizität** | Kräfte, Newton'sche Gesetze | SP1.02 (Newton's Laws), SP3.02 (Forces) | ✅ Covered |
| | Einfache Maschinen | SP3.05 (Simple Machines) | ✅ Covered |
| | Druck, Auftrieb | SP3.04 (Fluids & Pressure) | ✅ Covered |
| | Elektrische Schaltkreise | SP2.01, SP2.02 (Circuit Basics/Sandbox) | ✅ Covered |
| | Elektromagnetismus | SP2.03 (Electromagnetism) | ✅ Covered |
| **NT.6 Sinne & Signale** | Optik, Licht, Schatten | SP1.01 (Light & Shadows), SP3.08 (Geometrical Optics) | ✅ Covered |
| | Akustik, Schall | SP3.06 (Acoustics) | ✅ Covered |
| **NT (additional)** | Messung, SI-Einheiten | SP3.01 (Measurement & Units) | ✅ Covered |
| | Navigation, Vektoren | SP3.07 (Navigation & Vectors) | ✅ Covered |
| | Wetter & Klima (Atmosphäre) | SP1.03 (Weather & Climate) | ✅ Covered |
| | Astronomie (Sonnensystem, Planetenbewegung - Sek I level) | SP1.04 (Astronomy Basics) | ✅ Covered |

**⚠️ Physics Gaps Found**:
1. ~~**Wetter und Klima**~~: Addressed via SP1.03 (Weather & Climate).
2. ~~**Astronomie/Weltraum (Sek I)**~~: Addressed via SP1.04 (Astronomy Basics).

---

#### 6.2.3 Chemistry (NT — Chemistry strand)

| LP21 Kompetenzbereich (NT) | Sub-Area | Our Modules | Status |
|---|---|---|---|
| **NT.2 Stoffe** | Stoffeigenschaften, Trennung | SC1.01 (Mystery Lab) | ✅ Covered |
| | Atombau, Periodensystem | SC1.03 (Atoms Forge), SC1.04 (Periodic Puzzle) | ✅ Covered |
| | Chemische Bindung | SC1.05 (Bonding Bridge), SC1.06 (Chemical Bonding II) | ✅ Covered |
| **NT.3 Chemische Reaktionen** | Stöchiometrie | SC1.02 (Mole Master) | ✅ Covered |
| | Reaktionstypen | SC2.01 (Kinetics), SC2.06 (Redox) | ✅ Covered |
| | Säuren/Basen | SC2.02 (pH Sentinel), SC2.05 (Acid-Base) | ✅ Covered |
| | Gasgesetze | SC2.03 (Aero Lab) | ✅ Covered |
| | Löslichkeit | SC2.04 (Solubility Lab) | ✅ Covered |
| | Organische Chemie | SC3.02–SC3.05 | ✅ Covered |
| | Enthalpie/Thermochemie | SC2.07 (Enthalpy Lab) | ✅ Covered |
| | Nachhaltigkeit / Recycling / Ressourcenmgmt | SC1.07 (Sustainability) | ✅ Covered |

**⚠️ Chemistry Gap Found**:
~~**Nachhaltigkeit und Ressourcen**~~: Addressed via SC1.07 (Sustainability).

---

#### 6.2.4 Biology (NT — Biology strand + NMG)

| LP21 Kompetenzbereich | Sub-Area | Our Modules | Status |
|---|---|---|---|
| **NT.7 Körperfunktionen** | Zelle, Organellen | SB1.01 (Cell Factory) | ✅ Covered |
| | Stoffwechsel | SB1.01-M (Metabolic Pathways) | ✅ Covered |
| | Fortpflanzung, Mitose/Meiose | SB1.03 (Reproduction Hub) | ✅ Covered |
| | Sinne, Nervensystem | GB2.01 (Neurobiology Lab) | ✅ Covered |
| | Verdauung, Kreislauf, Atmung | SB2.02 (Body Systems) | ✅ Covered |
| | Bewegungsapparat | SB2.04 (Anatomy Atlas) | ✅ Covered |
| | Immunsystem | GB3.02 (Immunology Lab) | ✅ Covered |
| | Hormonsystem | GB2.02 (Endocrine System) | ✅ Covered |
| **NT.8 Fortpflanzung** | Genetik (Mendel) | SB2.01 (Mendel's Garden) | ✅ Covered |
| | Nicht-Mendel, Variation | SB2.03 (Genetic Variation) | ✅ Covered |
| | DNA, Molekularbiologie | GB3.01 (DNA Forge), SB3.02 (Biotech Core) | ✅ Covered |
| **NT.9 Ökosysteme** | Nahrungsketten, Energiefluss | SB3.01 (Ecosystem Dynamics) | ✅ Covered |
| | Biodiversität | SB3.02 (Biotech — partial) | ✅ Covered |
| | Photosynthese | SB1.02 (Photosynthesis Lab) | ✅ Covered |
| | Evolution | GB1.01 (Evolution Lab) | ✅ Covered |
| | **Gesundheit & Prävention (Ernährung, Sucht, Erste Hilfe)** | ❌ **MISSING** | ⚠️ Gap |
| | **Sexualkunde / Pubertät** | ❌ **MISSING** | ⚠️ Gap |

**⚠️ Biology Gaps Found**:
1. **Gesundheit und Prävention**: LP21 NMG includes health education (nutrition, substance abuse, first aid) as a cross-cutting theme. Currently no module covers this explicitly.
2. **Sexualkunde / Pubertät**: LP21 explicitly includes developmental biology and puberty education at Zyklus 3. Not covered.

*Note: These are sensitive educational topics. The project may deliberately choose NOT to implement interactive quizzes for sexual education, and that is an acceptable pedagogical decision. This should be documented.*

---

### 6.3 AUDIT B — Quest Density per Module

Modules are classified by their quest density:
- 🟢 **Rich** (≥40 inline quests OR external quest pool with ≥20 quests)
- 🟡 **Adequate** (10–39 quests)
- 🔴 **Sparse** (<10 quests, may be simulation-only or placeholder)

#### Mathematics Modules
| Module | Inline Quests | External Data | Classification |
|--------|-------------|---------------|----------------|
| SM1.01 | 62 | — | 🟢 Rich |
| SM1.02 | 9 | — | 🔴 Sparse |
| SM1.03 | 61 | — | 🟢 Rich |
| SM1.04 | 81 | — | 🟢 Rich |
| SM1.05 | 61 | — | 🟢 Rich |
| SM2.01 | 11 | — | 🔴 Sparse |
| SM2.02 | 18 | — | 🟡 Adequate |
| SM2.03 | — | inline | 🟢 Rich (440 lines) |
| SM2.04 | 62 | — | 🟢 Rich |
| SM2.05 | 61 | — | 🟢 Rich |
| SM2.06 | 61 | — | 🟢 Rich |
| SM2.07 | 15 | — | 🟡 Adequate |
| SM2.08 | 81 | — | 🟢 Rich |
| SM2.09 | 1 (inline) | 75 (external) | 🟢 Rich |
| SM2.10 | 66 | — | 🟢 Rich |
| SM2.11 | — | inline | 🟡 Adequate (383 lines) |
| SM2.12 | — | inline | 🟡 Adequate (394 lines) |
| SM3.01 | 2 | — | 🔴 Sparse |
| SM3.02 | 2 | — | 🔴 Sparse |
| SM3.03 | 14 | — | 🟡 Adequate |
| SM3.04 | 6 | — | 🔴 Sparse |
| SM3.05 | 61 | — | 🟢 Rich |
| GM1.01 | 7 | — | 🔴 Sparse |
| GM1.01-ADV | 66 | — | 🟢 Rich |
| GM1.02 | 4 | — | 🔴 Sparse |
| GM1.03 | 1 (inline) | 60 (external) | 🟢 Rich |
| GM2.01 | 4 | — | 🔴 Sparse |
| GM2.02 | 1 (inline) | 101 (external) | 🟢 Rich |
| GM3.01 | 5 | — | 🔴 Sparse |
| GM4.01 | 5 | — | 🔴 Sparse |

#### Physics Modules
| Module | Inline Quests | External Data | Classification |
|--------|-------------|---------------|----------------|
| SP1.01 | 1 (ref) | 65 (JSON files) | 🟢 Rich |
| SP1.02 | 1 (ref) | 6+ (external) | 🔴 Sparse |
| SP2.01 | 1 (ref) | 28 (external) | 🟡 Adequate |
| SP2.02 | 64 | — | 🟢 Rich |
| SP2.03 | 64 | — | 🟢 Rich |
| SP3.01 | 13 | — | 🟡 Adequate |
| SP3.02 | 2 | — | 🔴 Sparse |
| SP3.03 | 2 | — | 🔴 Sparse |
| SP3.04 | 61 | — | 🟢 Rich |
| SP3.05 | 13 | — | 🟡 Adequate |
| SP3.06 | 61 | — | 🟢 Rich |
| SP3.07 | 61 | — | 🟢 Rich |
| SP3.08 | 4 | — | 🔴 Sparse |
| GP1.01 | 0 (simulation) | — | 🔴 Simulation-only |
| GP1.02 | 0 (simulation) | — | 🔴 Simulation-only |
| GP1.03 | 0 (simulation) | — | 🔴 Simulation-only |
| GP1.04 | 0 (simulation) | — | 🔴 Simulation-only |
| GP2.01 | 61 | — | 🟢 Rich |
| GP2.02 | 61 | — | 🟢 Rich |
| GP2.03 | 0 (component-based) | 60 (external) | 🟢 Rich |
| GP3.01 | 61 | — | 🟢 Rich |
| GP3.02 | 64 | — | 🟢 Rich |
| GP3.03 | 64 | — | 🟢 Rich |

#### Chemistry Modules
| Module | Inline Quests | External Data | Classification |
|--------|-------------|---------------|----------------|
| SC1.01 | 6 | — | 🔴 Sparse |
| SC1.02 | 4 | — | 🔴 Sparse |
| SC1.03 | 0 (simulation) | — | 🔴 Simulation-only |
| SC1.04 | 0 (simulation) | — | 🔴 Simulation-only |
| SC1.05 | 0 (simulation) | — | 🔴 Simulation-only |
| SC1.06 | 0 (ref) | 61 (external) | 🟢 Rich |
| SC2.01 | 62 | — | 🟢 Rich |
| SC2.02 | — | inline | 🟢 Rich (413 lines) |
| SC2.03 | 8 | — | 🔴 Sparse |
| SC2.04 | 8 | — | 🔴 Sparse |
| SC2.05 | 62 | — | 🟢 Rich |
| SC2.06 | 13 | — | 🟡 Adequate |
| SC2.07 | 1 (ref) | 63 (external) | 🟢 Rich |
| SC3.01 | 21 | — | 🟡 Adequate |
| SC3.02–SC3.05 | ~4–21 each | — | 🟡 Mixed |
| GC1.01–GC3.02 | 2–3 each | — | 🔴 Sparse |

#### Biology Modules
| Module | Inline Quests | External Data | Classification |
|--------|-------------|---------------|----------------|
| SB1.01 | 4 | — | 🔴 Sparse |
| SB1.01-M | 4 | — | 🔴 Sparse |
| SB1.02 | 4 | — | 🔴 Sparse |
| SB1.03 | 4 | — | 🔴 Sparse |
| SB1.04 | 64 | — | 🟢 Rich |
| SB1.05 | 69 | — | 🟢 Rich |
| SB2.01 | — | inline | 🟢 Rich (555 lines) |
| SB2.02 | 4 | — | 🔴 Sparse |
| SB2.02-Body | 61 | — | 🟢 Rich |
| SB2.03 | 6 | — | 🔴 Sparse |
| SB2.04 | 1 (ref) | 1074 (external) | 🟢 Rich |
| SB3.01 | 11 | — | 🟡 Adequate |
| SB3.02 | 0 (ref) | 18+ (external modules) | 🟡 Adequate |
| GB1.01 | 38 | — | 🟡 Adequate |
| GB2.01 | 5 | — | 🔴 Sparse |
| GB2.02 | 1 (ref) | 26+ (external) | 🟡 Adequate |
| GB3.01 | 4 | — | 🔴 Sparse |
| GB3.02 | 4 | — | 🔴 Sparse |

---

### 6.4 Summary of Findings

#### A) Curriculum Coverage Gaps (Lehrplan 21)

| # | Missing Topic | LP21 Reference | Priority | Recommendation |
|---|---|---|---|---|
| 1 | **Kongruenzabbildungen** (Geometric Transformations: Reflection, Rotation, Translation) | MA.2.C.1 | 🔴 HIGH | Create **SM2.13** or **SM3.06** module |
| 2 | **Wetter und Klima** (Weather & Climate basics) | NT.4 / NMG | 🟡 MEDIUM | Create **SP1.03** or integrate into SP3.01 |
| 3 | **Astronomie Sek I** (Moon phases, Solar system, Seasons) | NT / NMG.5 | 🟡 MEDIUM | Create **SP1.04** (simplified version of GP3.03) |
| 4 | **Nachhaltigkeit / Recycling** (Sustainability) | NT.3 | 🟡 MEDIUM | Add stage to SC2.06 or create **SC1.07** |
| 5 | **Gesundheit / Ernährung** (Health & Nutrition) | NMG.1 | 🟠 LOW | Create **SB1.06** (optional, sensitive topic) |
| 6 | **Sexualkunde / Pubertät** (Sex Education) | NMG.1 | ⚪ DEFERRED | Pedagogical decision: not suitable for quiz format |

#### B) Quest Density Issues

**Modules needing quest enrichment (currently 🔴 Sparse):**

| Priority | Modules | Current State | Action Needed |
|---|---|---|---|
| 🔴 HIGH | SM1.02, SM2.01, SM3.01, SM3.02, SM3.04 | 2–11 quests | Add 40+ quests per module |
| 🔴 HIGH | GM1.01, GM1.02, GM2.01, GM3.01, GM4.01 | 4–7 quests | Add 40+ quests per module |
| 🔴 HIGH | SP1.02, SP3.02, SP3.03, SP3.08 | 1–4 quests | Add 40+ quests per module |
| 🔴 HIGH | SC1.01, SC1.02, SC2.03, SC2.04 | 4–8 quests | Add 40+ quests per module |
| 🔴 HIGH | SB1.01–SB1.03, SB2.02, SB2.03 | 4–6 quests | Add 40+ quests per module |
| 🔴 HIGH | GB2.01, GB3.01, GB3.02 | 4–5 quests | Add 40+ quests per module |
| 🔴 HIGH | GC1.01, GC1.02, GC2.01, GC3.01, GC3.02 | 2–3 quests | Add 40+ quests per module |
| 🟡 MEDIUM | GP1.01–GP1.04 | Simulation-only | Add companion quiz quests alongside simulations |
| 🟡 MEDIUM | SC1.03–SC1.05 | Simulation-only | Add companion quiz quests alongside simulations |
| 🟡 MEDIUM | EM3.01 | 7 quests (initial) | Expand to 40+ Kangaroo/Olympiad quests |

**Total sparse modules: ~35 out of 97** (36%)

---

### 6.5 Recommended Action Plan (Phase 6 Remediation)

#### Phase 6.1: Critical Curriculum Gap Fix (Priority: HIGH)
- [x] **6.1.1: SM2.13 — Geometric Transformations** (Kongruenzabbildungen)
  - Reflection (Spiegelung), Rotation (Drehung), Translation (Verschiebung)
  - Composition of transformations
  - Interactive coordinate-based exercises
  - Target: 60 quests across BASIC/CORE/ADVANCED/ELITE (Completed with generative matrix pattern)

#### Phase 6.2: Quest Density Sprint (Priority: HIGH)
- [x] **6.2.1: Math Sprint** 
  - [x] SM1.02 (Algebraic Expressions) — Refactored to generative (240+ dynamic quests)
  - [x] SM2.01 (Euclidean/Binomial Equations) — Refactored to localized random generation, separated tightly by 4 difficulty tiers
  - [x] SM3.01 (Quadratic Wizardry) — Refactored to localized random generation across Terms, Factorize, Fractions, Equations
  - [x] SM3.02, [x] SM3.04
- [x] **6.2.2: Gymnasium Math Sprint** — Refactored GM1.01, GM1.02, GM2.01, GM3.01, GM4.01 to generative pools (1200+ dynamic quests)
- [x] **6.2.3: Physics Sprint** — Refactored SP1.02, SP3.02, SP3.03, SP3.08 to generative pools (960+ dynamic quests)
- [x] **6.2.4: Chemistry Sprint** — Refactored SC1.01, SC1.02, SC2.03, SC2.04, and GC modules to generative pools (540+ dynamic quests)
- [x] **Legacy Phase 7: Universal LaTeX Stabilization (URGENT)** ✅ 2026-02-20
  - [x] Automated fix of 1003+ bare `^2/^3/^4` → `^{2}/^{3}/^{4}` across 114 files (all chamber pages, lib quests, i18n, components)
  - [x] Fixed under-escaped `\\text` in unit fields, bare `sqrt()` → `\\sqrt{}`
  - [x] Removed hardcoded English shape names (`Cylinder`, `Cube`, `Prism`) from `expressionLatex`
  - [x] Expanded `ENGINEERING_STANDARDS.md` §4 with rendering rules table, anti-patterns, generative quest constraints
  - [x] Added §7 QA Checklist (Math Rendering, Generative Quest, i18n, Component, Build audit)
  - [x] Created reusable auto-fix scripts: `scripts/fix-latex-v2.js`, `scripts/fix-latex-v3.js`
  - [x] All 100+ routes pass `npm run build` verification
- [x] **6.2.5: Biology Sprint** ✅ 2026-02-20 (Audit confirmed)
  - All 18 biology modules (SB1.01–SB3.02, GB1.01–GB3.02) verified: 3 stages × 4 difficulties × 5 quests = 60+ quests per module
  - SB2.02-body-systems: 123 quests (12 stage×difficulty pools)
  - All use `useQuestManager` + `useLanguage` (i18n compliant)
  - Note: SB3.02 (230L), GB2.02 (197L) are thinner modules — could be enriched in future iteration
- [x] **6.2.6: Enrichment Sprint** ✅ 2026-02-20
  - Rewrote `olympiad-data.ts`: 9 quests → 40 quests (10 per difficulty)
  - Covers 4 categories: Logic, Geometry, Arithmetic, Combinatorics
  - BASIC: Kangaroo Junior (Grade 5-6), CORE: Kangaroo Standard (Grade 7-8)
  - ADVANCED: AMC/SMO style (Grade 9-10), ELITE: IMO/Putnam level
  - All with proper LaTeX, hints, and verified correct answers

#### Phase 6.3: Secondary Curriculum Gaps (Priority: MEDIUM)
- [ ] **6.3.1: SP1.03 — Weather & Climate** (Wetter & Klima)
- [ ] **6.3.2: SP1.04 — Astronomy Basics** (Sonnensystem, Mondphasen)
- [ ] **6.3.3: SC1.07 — Sustainability & Recycling** (Nachhaltigkeit)

#### Phase 6.4: Companion Quests for Simulation Modules (Priority: MEDIUM)
- [ ] **6.4.1: GP1.01–GP1.04** — Add computational quiz stages to Nuclear, Relativity, Collider, Quantum modules
- [ ] **6.4.2: SC1.03–SC1.05** — Add quiz stages to Atoms, Periodic Table, Bonding visualization modules

---

## 📈 Recent Achievements

### SC1.06 Deep Optimization (2026-02-20)
- ✅ **Translation Unification**: 100% i18n key consistency (sc1_06 format across all files).
- ✅ **UI Overhaul**: Glassmorphism design + Lucide icons + Framer Motion animations.
- ✅ **Component Refactoring**: EquationBalancer & ReactionTypeSelector with auto-reset on quest change.
- ✅ **Enhanced Feedback**: Dual-module design (System Verification + Scientific Explanation).
- ✅ **Build Verification**: Zero type errors, all tests passing.

### SP1.01 Integrity Restoration (2026-02-20)
- ✅ **Full Data Recovery**: All 65 quests restored with 100% trilingual i18n coverage.
- ✅ **Infrastructure Upgrade**: Integrated `useQuestManager` with nonce persistence.
- ✅ **UX Enhancement**: Progressive hints and mastery statistics implemented.
- ✅ **Build Verification**: Zero type errors, all tests passing.

### Phase 4.2.1 & 4.2.3 Completion (2026-02-19)
- ✅ **Cross-disciplinary ELITE Questions**: 35 questions across 4 module pairs.
- ✅ **Real-world Data Integration**: Basel energy consumption and Rhine water quality data.
- ✅ **Code Quality**: All modules refactored with `useQuestManager` hook.

---

## 🎯 Phase 4.2: Quality & Excellence Optimization — COMPLETED ✅

### 4.2.1 Advanced Logic & Pedagogy (P1) — 6/6 ✅
### 4.2.2 Visualization & Interaction (P1) — 3/3 ✅
### 4.2.3 Real-World Data Integration (P2) — 6/6 ✅
### 4.2.4 Documentation & Standardization (P3) — 3/3 ✅
### Overall Phase 4.2 Progress: 18/18 tasks (100%) ✅

---

## 🚀 Phase 5: Intelligent Ecosystem & Scaling — COMPLETED ✅

### 5.1 AI-Driven Personalization (P1) ✅
- [x] **5.1.1: Adaptive Difficulty Engine**
- [x] **5.1.2: Personalized Feedback**

### 5.2 Social & Gamification (P2) ✅
- [x] **5.2.1: The Nexus Hub** ✅ (2026-02-20)
- [x] **5.2.2: Laboratory Collaboration** ✅ (2026-02-20)

### 5.3 Study Guides & PDF Export (P2) ✅ (2026-02-21)
- [x] **5.3.1: Lesson Plan PDF Export**
- [x] **5.3.2: Offline Worksheets**

### 5.4 Global Performance & Access (P3)
- [ ] **5.4.1: Edge Optimization**
- [ ] **5.4.2: Universal Accessibility**

### 5.5 Extra / Enrichment Challenges (P3) ✅ (2026-02-21)
- [x] **5.5.1: Olympiad-level Module Sandbox**

---

## 📊 Key Metrics

- ✅ **Total Modules**: 97 chamber pages
- ✅ **Rich Modules (≥40 quests)**: ~40 modules (41%)
- ⚠️ **Sparse Modules (<10 quests)**: ~35 modules (36%)
- ⚠️ **Curriculum Gaps**: 1 HIGH-priority (Geometric Transformations), 3 MEDIUM-priority
- ✅ **Build Status**: Zero type errors (Verified Feb 21)
- ✅ **i18n Coverage**: EN, CN, DE across all modules

---

## 🛠️ Execution Strategy

4. ~~**P3**: Secondary curriculum gaps (Weather, Astronomy, Sustainability)~~ ✅ (Implemented FE & Quests Feb 21)
5. **P1 (NEW)**: Internationalization (i18n) & LaTeX Quality Sprint (Systematic Audit)
    - **Step 1**: Text & Meta Audit (Left Side) - Module by module, ensure 100% translation & zero duplicate keys.
    - **Step 2**: Visualization Audit (Right Side) - Canvas/SVG internal text localization.
    - **Step 3**: LaTeX Formula Check - Standardize escapes (`\\`) and rendering.

### Quality Gates
- ✅ TypeScript compilation with zero errors
- ✅ All existing tests passing
- ✅ i18n coverage for all new content (CN, EN, DE)
- ✅ Each module must have ≥20 quests with BASIC/CORE/ADVANCED/ELITE tiers

---

## 📅 Timeline & Milestones

### February 2026
- [x] Week 3 (Feb 15-21): Phase 4.2 & 5 completion ✅
- [x] Feb 21: Full Curriculum Audit completed ✅
- [x] Feb 21: Fixed LaTeX rendering issues and implemented secondary gaps (SP1.03, SP1.04, SC1.07) ✅

### February/March 2026 (Quality Sprint)
- [ ] **Phase 6.0: Internationalization & LaTeX Systematic Audit**
    - [ ] 6.0.1: Left-Side Metadata & Content (SM1.01-SM3.12, SP/SB/SC)
    - [ ] 6.0.2: Right-Side Canvas/SVG Localization
    - [ ] 6.0.3: LaTeX Formula Standardization Sprint

### March 2026
- [x] Week 1: Phase 7.1 SP1.01 baseline completion (scenario_desc EN/CN/DE)
- [x] Week 1-2: Phase 7.2 Batch A on top-risk modules (`sm2-08`, `sm1-04`, `sc2-05`) completed
- [x] Week 1-2: Phase 6.1 (SM2.13 Geometric Transformations) — prompt i18n + module UI localization completed (2026-03-02)

### April 2026
- [ ] Phase 6.2.3–6.2.5 (Physics/Chemistry/Biology Quest Sprint)
- [ ] Phase 6.3 (Secondary curriculum gaps)

### May 2026
- [ ] Phase 6.4 (Companion quests for simulation modules)
- [ ] Phase 5.4 (Edge Optimization & Accessibility)

---

## 🔄 Version History

### v5.4 (2026-03-02)
- **Cross-module Wrapper Cleanup**: Removed residual `promptLatex` wrappers (`\\text{${t(...)}}`) in `gc1-01`, `gc3-01`, `gc3-02`, `sc1-01`, and `sc1-02` quest builders; all switched to direct i18n prompt strings.
- **No Logic Drift**: Preserved quest IDs, stage flow, formulas, slot structures, and expected answers.
- **Quality Gate Pass**: `validate:translations`, `audit-rendering`, `lint`, and `build` all pass after cleanup.

### v5.3 (2026-03-02)
- **GC1.02 Prompt Cleanup**: Replaced the last 3 hardcoded prompts in `gc1-02/quests.ts` with localized keys (`gc1_02.prompts.calc_mass`, `plating_setup`, `corrosion_protection`) using existing EN/CN/DE translation packs.
- **No Logic Drift**: Quest structure, numeric calculations, and expected answers remain unchanged.
- **Quality Gate Pass**: `validate:translations`, `audit-rendering`, `lint`, and `build` all pass after cleanup.

### v5.2 (2026-03-02)
- **SM2.13 Prompt i18n Closure**: Replaced all 16 hardcoded `promptLatex` templates in `sm2-13-quest-data.ts` with `t("sm2_13.prompts.*", params)` while preserving quest math/expected values.
- **SM2.13 UI Localization**: Removed residual hardcoded stage/UI literals in `sm2-13/page.tsx` and switched to `sm2_13.*` translation keys.
- **Tri-language Sync**: Added full `sm2_13` translation block (stages/labels/prompts) in EN/CN/DE `math.ts`, including localized direction params (`cw`, `ccw`).
- **Quality Gate Pass**: `validate:translations`, `audit-rendering`, `lint`, and `build` all pass after migration.

### v5.1 (2026-03-02)
- **GP3.03 Prompt i18n Migration**: Replaced all in-file hardcoded `prompt` strings in `gp3-03/page.tsx` with `t("gp3_03.prompts.*")` templates/keys across FARADAY/LENZ/GENERATOR stages.
- **Tri-language Prompt Pack Added**: Added full `gp3_03.prompts` + required `labels`/`expressions` to EN/CN/DE `physics.ts` so module-local strings no longer depend on accidental duplicates from `math.ts`.
- **UI Residual Cleanup**: Localized remaining hardcoded UI text (`Loading...`, `Question {id}`, input placeholders) in the same module.

### v5.0 (2026-03-02)
- **SM2.04 Prompt Consolidation**: Replaced mission-stage prompt template concatenations in `sm2-04/page.tsx` with dedicated i18n keys (`sm2_04.mission.tower_prompt`, `sm2_04.mission.ring_prompt`) and synced EN/CN/DE math translations.
- **SM2.07 Fallback Prompt Cleanup**: Replaced 11 elite/reverse-case `promptLatex: ""` placeholders in `sm2-07/page.tsx` with stage-localized fallback prompts (`distance/midpoint/slope`) while preserving dynamic `promptKey` rendering path.
- **Quality Gate Target**: Keep `validate:translations`, `audit-rendering`, `lint`, and `build` green after final cleanup batch.

### v4.9 (2026-03-02)
- **SC2.03 UI i18n Cleanup**: Removed remaining hardcoded English strings in `sc2-03/page.tsx` (`Simulation Control`, `Regional Case Study // Basel Node`, elite scenario label) and migrated them to `sc2_03.labels.*`.
- **Tri-language Sync**: Added `simulation_control`, `regional_case_study`, `elite_integration` under `sc2_03.labels` in EN/CN/DE chemistry i18n files.
- **Quality Gate Pass**: `validate:translations`, `audit-rendering`, `lint`, and `build` all pass after the cleanup.

### v4.8 (2026-03-02)
- **SC2.05 Closed (Prompt i18n)**: Migrated all 60 `promptLatex` hardcoded entries in `sc2-05/page.tsx` to `t("sc2_05.prompts.*")` keys.
- **Tri-language Symmetry Maintained**: Added matching `sc2_05.prompts.ph_* / nt_* / tt_*` keys in EN/CN/DE chemistry i18n files.
- **Global Scan Update**: Repository prompt-hardcode scan now only shows `t()`-composed template literals or intentional empty placeholders; no remaining direct hardcoded `promptLatex` strings in active migration scope.
- **Quality Gate Pass**: `validate:translations`, `audit-rendering`, `lint`, and `build` all passed after migration.

### v4.7 (2026-03-02)
- **SP3.05 Closed (Prompt i18n)**: 12 hardcoded `promptLatex` templates migrated to `sp3_05.prompts.*` with EN/CN/DE key symmetry.
- **SB3.01 Elite Prompt Migration**: 7 ELITE hardcoded `promptLatex` entries moved to `sb3_01.prompts.elite_*` in EN/CN/DE.
- **SM2.09 Prompt Hardcode Removed**: `Solve: ${expression}` replaced by `sm2_09.prompts.solve_expression` in EN/CN/DE.
- **Quality Gate Pass**: `validate:translations`, `audit-rendering`, `lint`, and `build` all pass after migration.

### v4.6 (2026-03-02)
- **SC2.02 Closed**: 60 stage prompts moved to `sc2_02.prompts.*` in EN/CN/DE; monitor labels and answer/indicator slot labels localized.
- **SM2.02 Closed**: All template-literal `promptLatex` converted to parameterized `sm2_02.prompts.*` keys in EN/CN/DE.
- **Rendering Guardrail Verified**: `promptLatex` hardcoding scan clean on `sc2-02/page.tsx` and `sm2-02/page.tsx`; `validate:translations` + `audit-rendering` + `build` + `lint` all pass.

### v3.6 (2026-03-01)
- **SC2.05 Integrated**: Merged EN/CN/DE `contexts` block and replaced 60 inline `context` literals in `sc2-05/page.tsx` with i18n keys.
- **Batch A Wave-1 Completed**: Top three risk modules (`SP1.01`, `SM1.04`, `SM2.08`, `SC2.05`) now merged with validation and build pass.
- **SM2.08 Batch B Closed**: Removed TODO/bare-label placeholders in `sm2_08.problems`; unified scenario key usage (`dice_two`).
- **Build Guardrail Added**: `temp/` excluded from TypeScript compilation to prevent handoff snippets from breaking production builds.

### v3.5 (2026-03-01)
- **Wave-1 Expanded**: Completed first two Batch A high-risk modules beyond SP1.01 (`SM1.04`, `SM2.08`).
- **SM2.08 Merge Guardrail**: Applied `scenarios`-only merge into `src/lib/i18n/*/math.ts`; `problems` unchanged.
- **Validation Passed**: `npm run validate:translations` passed after cross-language merge.
- **Next Focus Locked**: `SC2.05` as immediate next module, then Batch B cleanup on TODO/bare-label problem text.

### v3.4 (2026-03-01)
- **SP1.01 Delivered**: Completed scenario baseline for EN/CN/DE with zero empty `scenario_desc`.
- **Source Merge Completed**: Applied CN/DE SP1.01 scenario content to `src/lib/i18n/cn/physics.ts` and `src/lib/i18n/de/physics.ts`.
- **Validation Completed**: `npm run validate:translations` passed on merged source.

### v3.3 (2026-03-01)
- **Scenario Compliance Sprint Added**: Introduced Phase 7 as the highest-priority execution track.
- **SP1.01 Baseline Defined**: Locked initial remediation target on `scenario_desc` completion (EN/CN/DE).
- **Batch Strategy Formalized**: Shifted remediation order from module-by-module to violation-type batches (empty scenario -> bare formula -> i18n hardcoding).

### v3.2 (2026-02-21)
- **Quality Sprint Initiation**: Defined Phase 6.0 for systematic i18n and LaTeX formula rectification.
- **Enhanced Localization Strategy**: Split work into "Left Side" (content/meta) and "Right Side" (visualizations/canvas) to ensure 100% coverage.
- **Standardized Component**: Refactored `EquationBalance` (SM1.04) as a benchmark for multi-language SVG rendering.

### v3.1 (2026-02-21)
- **LaTeX Rendering Hotfix**: Fixed double-escaped backslashes in math chambers (e.g., `\\text`).
- **Secondary Gaps Closed**: Implemented SP1.03 (Weather & Climate), SP1.04 (Astronomy Basics), and SC1.07 (Sustainability & Recycling) with multi-language (EN, CN, DE) quest support.
- **Audit Refinement**: Updated work plan to track closed modules.

### v3.0 (2026-02-21)
- **Full Curriculum Audit** against Lehrplan 21 (Zyklus 3) and Basel-Stadt Gymnasium requirements.
- Identified 1 HIGH-priority curriculum gap (Geometric Transformations) and 3 MEDIUM-priority gaps.
- Identified 35 modules with sparse quest density (<10 quests).
- Created Phase 6 remediation plan with Quest Density Sprint roadmap.

### v2.5 (2026-02-20)
- Fully implemented Phase 5.2: Social & Gamification.
- Built the Nexus Hub and PeerJS cooperative system.

### v2.4 (2026-02-21)
- Detailed closeout plan for Phase 4.2.
- Defined Phase 5: Intelligent Ecosystem & Scaling.

### v2.3 (2026-02-21)
- Completed Phase 4.2.1 and 4.2.3.
- Implemented Prerequisite System UI and Eureka celebration effect.

### v2.2 (2026-02-20)
- Updated with completed tasks from Phase 4.2.1 and 4.2.3

### v2.1 (2026-02-15)
- Refined for Quality Excellence

### v2.0 (2026-02-01)
- Initial Phase 4.2 planning

---

**Plan Version**: 5.4 (Cross-module Prompt i18n Cleanup Ongoing)
**Next Review**: 2026-03-05
