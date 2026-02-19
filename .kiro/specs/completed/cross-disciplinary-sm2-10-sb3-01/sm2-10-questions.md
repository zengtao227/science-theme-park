# SM2.10 ELITE Questions Design

## Question 1: Rhine River Temperature and Fish Diversity Correlation

**Basel Context:** Rhine River temperature monitoring (1990-2024)
**Statistical Method:** Correlation coefficient, z-score, probability
**Ecological Concept:** Temperature tolerance, species diversity

**Scenario:**
Basel's Rhine River monitoring station has collected 34 years of data. Summer water temperature has mean 21.5°C with standard deviation 2.3°C (assuming normal distribution). Fish species diversity (Shannon index H') shows correlation r = -0.72 with temperature.

**Question:**
Calculate the probability that summer temperature exceeds 24°C, and interpret the impact on fish diversity.

**Solution:**
- z = (24 - 21.5) / 2.3 = 1.087
- P(T > 24°C) = P(z > 1.087) ≈ 0.138 or 13.8%
- Strong negative correlation (r = -0.72) means higher temperatures significantly reduce diversity
- At 24°C, expect ~15% reduction in Shannon index

**Answer:** 0.138 (or 13.8%)

---

## Question 2: Urban Park Biodiversity Statistical Comparison

**Basel Context:** Kannenfeldpark vs. Novartis Campus Green Space
**Statistical Method:** Mean, standard deviation, confidence intervals
**Ecological Concept:** Species richness, habitat quality

**Scenario:**
Kannenfeldpark bird surveys (n=20 surveys): mean 32 species, SD = 4.2
Novartis Campus surveys (n=20 surveys): mean 28 species, SD = 3.8
Calculate 95% confidence interval for the difference in species richness.

**Question:**
What is the 95% confidence interval for the difference in mean bird species between the two parks?

**Solution:**
- Difference in means: 32 - 28 = 4 species
- SE of difference = √[(4.2²/20) + (3.8²/20)] = √[0.882 + 0.722] = √1.604 = 1.267
- 95% CI: 4 ± 1.96(1.267) = 4 ± 2.48
- CI: (1.52, 6.48) species

**Answer:** 1.52 to 6.48 (or 2 to 6 rounded)

---

## Question 3: Climate Data Trend Analysis with Ecological Interpretation

**Basel Context:** Basel temperature records 1990-2024
**Statistical Method:** Linear regression, slope interpretation
**Ecological Concept:** Climate change impact on growing season

**Scenario:**
Basel's mean annual temperature increased from 9.2°C (1990) to 11.0°C (2024), a 34-year period. Growing season length correlates with temperature at r = 0.85. In 1990, growing season was 165 days.

**Question:**
Calculate the rate of temperature increase per decade, and estimate the 2024 growing season length if it increases by 8 days per °C.

**Solution:**
- Temperature increase: 11.0 - 9.2 = 1.8°C over 34 years
- Rate per decade: (1.8 / 34) × 10 = 0.529°C per decade
- Growing season increase: 1.8°C × 8 days/°C = 14.4 days
- 2024 growing season: 165 + 14.4 = 179.4 days

**Answer:** 179 days (or 179.4)

---

## Question 4: Population Dynamics Probability Distribution

**Basel Context:** Urban fox population in Basel parks
**Statistical Method:** Normal distribution, probability calculations
**Ecological Concept:** Carrying capacity, population fluctuations

**Scenario:**
Basel's urban fox population fluctuates around carrying capacity K = 150 individuals with SD = 18 (normal distribution). Wildlife managers consider intervention if population exceeds 180 (resource stress) or falls below 120 (genetic concerns).

**Question:**
What is the probability that the population falls outside the safe range (120-180)?

**Solution:**
- z₁ = (120 - 150) / 18 = -1.667, P(X < 120) = 0.048
- z₂ = (180 - 150) / 18 = 1.667, P(X > 180) = 0.048
- P(outside range) = 0.048 + 0.048 = 0.096

**Answer:** 0.096 (or 9.6%)

---

## Question 5: Ecosystem Data Confidence Interval Calculation

**Basel Context:** Rhine River dissolved oxygen measurements
**Statistical Method:** Confidence intervals, sample statistics
**Ecological Concept:** Water quality, aquatic health

**Scenario:**
Rhine River dissolved oxygen measurements (n=25 samples): mean = 9.8 mg/L, SD = 1.4 mg/L. Fish require minimum 8.0 mg/L for healthy populations. Calculate 90% confidence interval for true mean.

**Question:**
What is the lower bound of the 90% confidence interval? Is the river safe for fish?

**Solution:**
- SE = 1.4 / √25 = 0.28
- 90% CI: 9.8 ± 1.645(0.28) = 9.8 ± 0.461
- CI: (9.34, 10.26) mg/L
- Lower bound = 9.34 mg/L > 8.0 mg/L (safe)

**Answer:** 9.34 mg/L
