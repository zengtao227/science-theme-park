# SB1.03 // CELL DIVISION SPECIFICATION

## 1. Overview
**Title**: Cell Division
**Module Code**: SB1.03
**Theme**: The "Replication Hub"
**Goal**: Master the mechanics of cellular reproduction (Mitosis) and genetic diversity (Meiosis). This is the critical bridge between **SB1.01 (Cell Structure)** and **SB2.01 (Genetics)**.

## 2. Learning Objectives
- Understand the cell cycle (Interphase -> M-Phase).
- Distinct phases of Mitosis (Prophase, Metaphase, Anaphase, Telophase).
- Meiosis as a reduction division for gametes.
- Visualizing chromosome behavior (chromatids, centromeres).

## 3. Stages

### Stage 1: MITOSIS (The Cloner)
- **Objective**: Create two identical daughter cells from one parent cell.
- **Interaction**:
  - Drag chromosomes to the metaphase plate.
  - Pull sister chromatids apart to opposite poles.
  - Trigger cytokinesis.
- **Outcome**: 2 Diploid (2n) cells.

### Stage 2: MEIOSIS I (The Reducer)
- **Objective**: Separate homologous pairs to reduce chromosome number.
- **Interaction**:
  - Pair homologous chromosomes (Crossing over event).
  - Align pairs at the center.
  - Separate homologous chromosomes.
- **Outcome**: 2 Haploid (n) cells (with replicated DNA).

### Stage 3: MEIOSIS II (The Divider)
- **Objective**: Separate sister chromatids to form gametes.
- **Interaction**:
  - Similar to Mitosis but with haploid cells.
  - Final separation.
- **Outcome**: 4 Haploid (n) gametes.

## 4. Visual & UI Design
- **Color Palette**:
  - DNA/Chromosomes: Neon Blue (Paternal) & Neon Pink (Maternal).
  - Spindle Fibers: Electric Green.
  - Centrioles: Yellow.
  - Background: Dark cell interior (Cytoplasm).

- **Components**:
  - `CellDivisionLab.tsx`: Main container.
  - `MitosisCanvas.tsx`: Interactive canvas for Stage 1.
  - `MeiosisCanvas.tsx`: Interactive canvas for Stages 2 & 3.

## 5. Locales (i18n)
- **EN**: Mitosis, Meiosis, Chromosome, Chromatid, Spindle Fiber.
- **DE**: Mitose, Meiose, Chromosom, Chromatid, Spindelfaser.
- **CN**: 有丝分裂, 减数分裂, 染色体, 染色单体, 纺锤丝.
