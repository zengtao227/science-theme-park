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
| **C1.02** | Mole Master | 21 | ✅ Production |
| **P1.03** | Energy: Turbine Quest | 21 | ✅ Production |
| **G2.01** | Vector Pilot 3D | 21 | ✅ Production |

---

## 🗺️ The "Basilea 2026" Nexus: Mission-Led Development
*Where Swiss Academic Excellence meets Premium Gamified Simulations.*

### ⚛️ Section A: High-Energy Physics (CERN / Rhine Hub)
| Code | Mission Title | Learning Goal (Basel KLT) | Gamification Mechanic |
|:---:|:---|:---|:---|
| **P5.01** | **The Atomic Core** | Nuclear Decay & Stability | **Nuclear Balancer**: Balance equations to stabilize the reactor. |
| **P1.03** | **Rhine Power Grid** | Energy & Efficiency ($\eta$) | **Sluice Control**: Match energy output to Basel city demand. |
| **P1.04** | **The Gierseil-Fähri**| Vector Force Analysis | **Ferry Pilot**: Adjust cable angle to cross the Rhine using current. |
| **P2.01** | **LHC Calibration** | Lorentz Force & Induction | **Vector Steering**: Use $F=qvB$ to guide particles to targets. |

### 🧪 Section B: Pharma Synthesis Lab (Novartis / Roche)
| Code | Mission Title | Learning Goal (Basel KLT) | Gamification Mechanic |
|:---:|:---|:---|:---|
| **C2.01** | **Rhine pH Sentinel** | Titration & Acid-Base | **Virtual Pipette**: Perform precision titration with real-time curves. |
| **C3.01** | **Molecular Architect** | Organic Functional Groups | **3D Assembler**: Build medicinal molecules like Aspirin or Vitamin C. |
| **C1.02** | **Stoichiometry Hub** | Molar Mass & Concentration | **Synthesis Rate**: Calculate reagents for 100% yield drug batches. |

### 📐 Section C: Higher Mathematics (Euler / Bernoulli)
| Code | Mission Title | Learning Goal (Basel KLT) | Gamification Mechanic |
|:---:|:---|:---|:---|
| **G2.01** | **Barfüsser Cruiser** | 3D Vector Geometry | **Drone Pilot**: Input $[x,y,z]$ to navigate a 3D scan of Basel city. |
| **G1.01** | **Calculus Coast** | Derivatives & Slopes | **Tangent Surfer**: Adjust surfboard angle based on $f'(x)$. |
| **G3.01** | **The Probability Vault**| Bernoulli & Distribution | **Vault Breaker**: Predict code sequences using stochastics. |

**Scientist Spotlight**: Integration of Euler & Bernoulli biography cards in the HUD sidebars for all math modules.

---

## 🛠️ Development Log: Basel 2026 Strategy

### ✅ Basel-Specific Compliance (BS/BL)
1. **Lehrplan 21 (Sek I P-Zug)**: Strictly aligned with the "Lehrplan 21 Gesamtausgabe Basel-Stadt" and "Lehrplan 21 Baselland". Focus on high-demand algebraic manipulation and descriptive geometry.
2. **Gymnasium KLT (BS/BL)**: Content follows the "Kantonalen Lehrplanteile (KLT) 2018/2020", specifically for the *Grundlagenfächer* (Core Subjects).
3. **Local Setting**: Missions are contextualized in **CERN** (Physics link to Geneva but core research topic in Basel), **Novartis/Roche** (Chemistry), and the **Rhine River** (Physics/Hydro).

### ✅ Infrastructure & Productization
1. **Visual Icons**: Premium SVG animated icons for all 14 nodes.
2. **Analytics**: Real-time study-flow monitoring enabled.
3. **Persistence**: "Science Career" progress tracking via local storage.



### 🚧 Critical Next Steps (Technical Debt & Strategy)
- **Quest Deepening**: Most modules have less than 10 questions. The target is 30+ per module.
- **Calculus Overhaul**: G1.01 needs a full set of derivative rules (Power rule, Product rule, Chain rule) integrated into the HUD.
- **Logic First + English Priority**: To avoid efficiency traps, stop multi-language translation during development. Focus on implementing physics/math logic first, using only English in `i18n.ts`. 
- **Localization (Deferred)**: Batch translate to CN/DE only after a module's logic is 100% complete and verified.

---
*Document Date: 2026-02-05 (Updated for BS/BL Alignment & Development Strategy)*
