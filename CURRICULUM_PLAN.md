# 🎡 Science Theme Park: STEM Curriculum & Development Roadmap

## 📊 Current Status: Quest Inventory (v2.1)

| Module Code | Module Title | Quest Count | Status |
|:---:|:---|:---:|:---:|
| **S1.01** | Geometry: Areas & Volumes | 21 | ✅ Production |
| **S1.02** | Data Analysis | 24 | ✅ Production |
| **S2.01** | Binomial Formulas | 22 | ✅ Production |
| **S2.02** | Pythagoras Theorem | 41 | ✅ Production |
| **S2.03** | Linear Functions | 10 | ⚠️ Needs Fill |
| **S2.04** | Similarity | 17 | ✅ Production |
| **S2.05** | Powers & Roots | 7 | ⚠️ Low Content |
| **S2.06** | Linear Systems | 6 | ⚠️ Low Content |
| **S3.01** | Quadratics | 98 | 🏆 Gold Standard |
| **G1.01** | **Calculus (High School)** | 1 | 🚨 Critical: Empty |
| **P1.02** | Newton's Laws | 7 | ⚠️ Low Content |
| **P2.02** | Circuit Sandbox | 10 | ✅ Functional |
| **P3.01** | Geometrical Optics | 7 | ⚠️ Low Content |
| **C1.01** | Mystery Lab | 8 | ✅ Functional |

---

## 🗺️ Future Expansion Plan (BS/BL Regional Alignment)
*Aligned with Lehrplan 21 (Sek I P-Zug) and Gymnasium Lehrplan (BS/BL).*

### 📐 Mathematics (Sek I P-Zug & Gymnasium)
| Chapter | Topic | Basel Focus | Priority |
|:---|:---|:---|:---|
| **G1.01** | **Calculus I: Derivatives** | Standard Gymnasium BS/BL | 🔥 HIGH |
| G2.01 | Vector Geometry (2D/3D) | **Core Maturität Topic** | 🔥 HIGH |
| G3.01 | Probability & Statistics | Lehrplan 21 (3. Zyklus) | High |
| S1.03 | Trigonometry (Sine/Cosine) | Standard Sek I P-Zug | Med |
| G2.02 | Complex Numbers | Gymnasium Focus (BS) | Med |

### ⚛️ Physics (Sek I & Gymnasium)
| Chapter | Topic | Basel Focus | Priority |
|:---|:---|:---|:---|
| P1.03 | Energy, Work & Power | Core Sek I (BL Natur & Technik) | 🔥 HIGH |
| P4.01 | Thermodynamics/Heat | Intro Physics (BS/BL) | High |
| **P1.02** | **Newtonian Dynamics** | **Expanded for Vectors** | Med |
| P2.01 | Electrostatics & Fields | Gymnasium Level | Med |

### 🧪 Chemistry (Sek I & Gymnasium)
| Chapter | Topic | Basel Focus | Priority |
|:---|:---|:---|:---|
| C1.02 | **Stoichiometry (The Mole)** | **The "Backbone" of CH (Gym)** | 🔥 HIGH |
| C1.03 | Atomic Models & Bonding | Intro Sek I (BS/BL) | High |
| C1.04 | Acids, Bases & pH | Brönsted Concept (Gym) | Med |
| C4.01 | Organic Chemistry | Alkanes/Alcohols | Med |

---

## 🛠️ Development Log (Phase 7 Summary)

### ✅ Basel-Specific Adjustments
1. **Curriculum Mapping**: Conducted a full audit of Basel-Stadt (eduBS) and Basel-Landschaft (P-Zug) requirements.
2. **Quest Logic**: Identified that current Geometry and Algebra modules align well with BL P-Zug levels.
3. **Missing Criticals**: Highlighted **Vector Geometry** and **Stoichiometry** as the most critical missing pillars for Swiss Maturität prep.

### ✅ Infrastructure & Productization
1. **Visual Icons**: Created unique SVG icons for all 14 modules.
2. **Analytics**: Integrated Vercel Analytics for user tracking.
3. **Persistence**: Progress is now saved to local storage, allowing Swiss students to track their long-term study success.


### 🚧 Critical Next Steps (Technical Debt)
- **Quest Deepening**: Most modules have less than 10 questions. The target is 30+ per module.
- **Calculus Overhaul**: G1.01 needs a full set of derivative rules (Power rule, Product rule, Chain rule) integrated into the HUD.
- **Localization**: Ensure all EN/CN/DE strings are symmetrical in `i18n.ts`.

---
*Document Date: 2026-02-04*
