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

## 🗺️ Future Expansion Plan (STEM Curriculum)

### 📐 Mathematics (High School / GYM Range)
| Chapter | Topic | Status | Priority |
|:---|:---|:---|:---|
| **G1.01** | **Calculus I: Derivatives** | **REFACTOR** | 🔥 HIGH |
| G1.02 | Calculus II: Integration | Planned | Med |
| G2.01 | Vectors & 3D Geometry | Planned | High |
| G2.02 | Complex Numbers | Planned | Med |
| G3.01 | Advanced Probability | Planned | Low |
| G3.02 | Sequences & Infinite Series | Planned | Med |

### ⚛️ Physics (High School / GYM Range)
| Chapter | Topic | Status | Priority |
|:---|:---|:---|:---|
| P1.01 | Kinematics (Motion Maps) | Planned | Med |
| **P1.02** | **Newtonian Dynamics** | **EXPAND** | High |
| P2.01 | Electrostatics & Fields | Planned | High |
| P3.02 | Wave Interference & Sound | Planned | Med |
| P4.01 | Modern Physics & Relativity | Planned | Low |

### 🧪 Chemistry (Full Laboratory Suite)
| Chapter | Topic | Status | Priority |
|:---|:---|:---|:---|
| **C1.01** | **Qualitative Analysis (Mystery Lab)** | **EXPAND** | Med |
| C1.02 | Titration & pH Measurement | Planned | 🔥 HIGH |
| C2.01 | Gas Laws & Stoichiometry | Planned | High |
| C3.01 | Atomic Structure & Orbitals | Planned | Med |
| C4.01 | Organic Chemistry: Functional Groups | Planned | Med |

---

## 🛠️ Development Log (Phase 7 Summary)

### ✅ Completed
1. **Infrastructure**: Established `useQuestManager` for standardized logic and `ChamberLayout` for premium HUD consistency.
2. **Persistence**: Implemented Zustand + `persist` for cross-session progress tracking.
3. **Analytics**: Integrated Vercel Analytics & Speed Insights for performance monitoring.
4. **Visuals**: Created a dynamic SVG `ConceptIcon` system providing 14 unique interactive icons for the main menu.
5. **Chemistry Sector**: Launched C1.01 with real chemical reaction simulation (gas evolution, color changes).

### 🚧 Critical Next Steps (Technical Debt)
- **Quest Deepening**: Most modules have less than 10 questions. The target is 30+ per module.
- **Calculus Overhaul**: G1.01 needs a full set of derivative rules (Power rule, Product rule, Chain rule) integrated into the HUD.
- **Localization**: Ensure all EN/CN/DE strings are symmetrical in `i18n.ts`.

---
*Document Date: 2026-02-04*
