# SB3.01 ELITE Questions Design

## Question 1: Energy Transfer Efficiency with Statistical Data

**Basel Context:** Kannenfeldpark ecosystem energy flow
**Ecological Concept:** Trophic levels, energy transfer efficiency
**Statistical Method:** Mean, percentage calculations

**Scenario:**
Kannenfeldpark primary productivity: 8,500 kcal/m²/year. Herbivore consumption measured over 12 months: mean = 850 kcal/m²/year, SD = 95 kcal/m²/year. Secondary consumers (carnivores) consume mean = 85 kcal/m²/year.

**Question:**
Calculate the energy transfer efficiency from producers to herbivores, and from herbivores to carnivores. Compare to the theoretical 10% rule.

**Solution:**
- Producer → Herbivore efficiency: (850 / 8500) × 100% = 10.0%
- Herbivore → Carnivore efficiency: (85 / 850) × 100% = 10.0%
- Both match the theoretical 10% rule perfectly

**Answer:** 10.0% (both levels)

---

## Question 2: Species Diversity Index Calculation with Data Analysis

**Basel Context:** Rhine River macroinvertebrate diversity
**Ecological Concept:** Shannon diversity index, biodiversity assessment
**Statistical Method:** Logarithmic calculations, proportions

**Scenario:**
Rhine River macroinvertebrate survey (n=200 individuals):
- Mayfly larvae: 80 individuals (p₁ = 0.40)
- Caddisfly larvae: 60 individuals (p₂ = 0.30)
- Stonefly larvae: 40 individuals (p₃ = 0.20)
- Dragonfly larvae: 20 individuals (p₄ = 0.10)

**Question:**
Calculate Shannon diversity index H' = -Σ(pᵢ × ln(pᵢ)). Round to 2 decimal places.

**Solution:**
- H' = -[0.40×ln(0.40) + 0.30×ln(0.30) + 0.20×ln(0.20) + 0.10×ln(0.10)]
- H' = -[0.40×(-0.916) + 0.30×(-1.204) + 0.20×(-1.609) + 0.10×(-2.303)]
- H' = -[-0.366 - 0.361 - 0.322 - 0.230]
- H' = 1.28

**Answer:** 1.28

---

## Question 3: Population Growth Rate with Statistical Variation

**Basel Context:** Urban bird population in Basel parks
**Ecological Concept:** Exponential growth, population dynamics
**Statistical Method:** Growth rate calculation, confidence intervals

**Scenario:**
Basel's urban blackbird population: 2020 = 450 individuals, 2024 = 520 individuals (4 years). Assuming exponential growth: Nₜ = N₀ × e^(rt), where r is growth rate.

**Question:**
Calculate the annual population growth rate r. Round to 3 decimal places.

**Solution:**
- 520 = 450 × e^(4r)
- 520/450 = e^(4r)
- 1.156 = e^(4r)
- ln(1.156) = 4r
- 0.145 = 4r
- r = 0.036 or 3.6% per year

**Answer:** 0.036

---

## Question 4: Trophic Level Biomass with Confidence Intervals

**Basel Context:** Rhine River food web biomass
**Ecological Concept:** Biomass pyramid, trophic structure
**Statistical Method:** Ratios, statistical inference

**Scenario:**
Rhine River biomass measurements (kg/hectare, n=15 sites):
- Producers (algae/plants): mean = 12,000 kg/ha, SD = 1,800
- Primary consumers (herbivorous fish): mean = 1,200 kg/ha, SD = 180
- Secondary consumers (predatory fish): mean = 120 kg/ha, SD = 25

**Question:**
Calculate the biomass ratio between producers and secondary consumers. Is this consistent with the expected 100:1 ratio?

**Solution:**
- Biomass ratio = 12,000 / 120 = 100:1
- This exactly matches the theoretical expectation
- Energy loss at each trophic level (90%) results in 10× biomass reduction per level
- Two levels: 10 × 10 = 100× reduction

**Answer:** 100 (or 100:1)

---

## Question 5: Ecosystem Carrying Capacity with Probability Analysis

**Basel Context:** Urban deer population in Basel green corridors
**Ecological Concept:** Carrying capacity, logistic growth
**Statistical Method:** Logistic equation, equilibrium analysis

**Scenario:**
Basel's urban deer population follows logistic growth: dN/dt = rN(1 - N/K), where r = 0.18 per year, K = 200 individuals. Current population N = 150 individuals.

**Question:**
Calculate the current population growth rate dN/dt (individuals per year). Round to 1 decimal place.

**Solution:**
- dN/dt = rN(1 - N/K)
- dN/dt = 0.18 × 150 × (1 - 150/200)
- dN/dt = 0.18 × 150 × (1 - 0.75)
- dN/dt = 0.18 × 150 × 0.25
- dN/dt = 6.75 ≈ 6.8 individuals/year

**Answer:** 6.8
