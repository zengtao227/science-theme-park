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

## 🧭 Phase 4: Multi-Platform & Analytics Strategy (Long-term)

### 1. 📱 跨平台策略：响应式优先 (Responsive First)
经过战略评估，团队决定采用 **“完全响应式设计”** 作为核心路径，辅以 **“局部模块化切换”**：
- **自适应布局**: 使用 CSS Grid/Flexbox 确保 UI 在移动端自动重排（垂直堆叠）。
- **画质自适应**: 画布 (Canvas) 检测到手机访问时，自动降低模型精度或采用静态预览图提速。
- **交互补偿**: 为触摸屏增大点击目标区域。

### 2. 📊 数据驱动：Vercel Analytics 管理
- **性能监控**: 利用 Vercel 工具链监控移动端的 LCP (最大内容渲染) 和 CLS (累积布局偏移)。
- **优先级排序**: 
  - 统计各设备流量占比。若手机端占比超过 40%，立即启动 `ChamberLayout` 的移动端 UI 专项修补。
  - 通过目标转化率（模块完成度）定位移动端流失严重的环节。

### 3. 🗓️ 四阶段路线图
1. **审计期**: 当前阶段。完成全模块逻辑开发，埋入基础分析。
2. **骨架重组**: 修改 `ChamberLayout` 实现响应式断点（Mobile 16:9 垂直布局）。
3. **分批上线**: 优先发布手机适配良好的线性代数和几何模块。
4. **深度优化**: 为高阶物理模拟开发 PWA (Progressive Web App) 离线模式。

---
*Generated by Antigravity (Enhanced by NVIDIA DeepSeek-V3) - 2026-02-05*
