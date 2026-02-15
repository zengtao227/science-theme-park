/**
 * EN - MATH translations
 * Auto-generated from i18n.ts refactoring
 * Last updated: 2026-02-15
 */

export const enMath = {
  em1_01: {
          back: "Back to Nexus",
          title: "EM1.01 // THALES TOWER",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Tower Height",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "EM1.01_THALES_MONITOR",
          footer_left: "EM1.01_THALES_TOWER // NODE: BASEL",
          stages: {
              measure: "MEASURE"
          },
          measure_prompt_latex: "\\text{Use }\\frac{h}{H}=\\frac{l}{L}\\text{ to solve tower height.}",
          labels: {
              input: "INPUT",
              hints: "HINTS",
              readings: "READINGS",
              pole_height: "Pole Height (h)",
              pole_shadow: "Pole Shadow (l)",
              tower_shadow: "Tower Shadow (L)",
              sun_angle: "Sun Angle",
              solve_height: "Solve Tower Height (H)",
              height_placeholder: "height in meters",
              hint_ratio: "Hint: h/H = l/L"
          },
          mission: {
              title: "MISSION: BASEL CATHEDRAL SURVEY",
              description: "Measure the tower height using Thales' theorem and shadow ratios."
          }
      },
  em2_01: {
              back: "Back to Nexus",
              title: "EM2.01 // MATRIX GEOMETRY",
              difficulty: {
                  basic: "BASIC",
                  core: "CORE",
                  advanced: "ADVANCED",
                  elite: "ELITE"
              },
              objective_title: "Active Mission Objective",
              target_title: "Transformation Matrix",
              next: "Execute Next Sequence",
              check: "Verify",
              correct: "Verified",
              incorrect: "Mismatch",
              ready: "Ready",
              monitor_title: "EM2.01_MATRIX_MONITOR",
              footer_left: "EM2.01_MATRIX_GEOMETRY // NODE: BASEL",
              labels: {
                  matrix: "MATRIX A",
                  properties: "PROPERTIES",
                  determinant: "Determinant",
                  volume_scale: "Volume Scale",
                  formulas: "FORMULAS",
                  angle: "ROTATION ANGLE (θ)",
                  scale_x: "SCALE X-AXIS",
                  scale_y: "SCALE Y-AXIS",
                  scale_z: "SCALE Z-AXIS",
                  shear_xy: "SHEAR X BY Y",
                  shear_xz: "SHEAR X BY Z",
                  matrix_title: "MATRIX A",
                  det_value: "det(A) = {value}",
                  show_eigenvectors: "Show Eigenvectors",
                  show_grid: "Show Grid",
                  animate: "Animate"
              },
              presets: {
                  title: "PRESETS",
                  scale: "Scale",
                  rotate: "Rotate 90°",
                  shear: "Shear",
                  reflect: "Reflect"
              },
              linear: {
                  title: "LINEAR ALGEBRA",
                  line_1: "Ax = λx (eigenvalue equation)",
                  line_2: "det(A - λI) = 0",
                  line_3: "T(v) = Av"
              },
              mission: {
                  title: "MISSION: LINEAR TRANSFORMATIONS",
                  description: "Visualize linear algebra in 3D space. Explore matrix transformations, eigenvectors, and geometric intuition."
              },
              stages: {
                  basic_transforms: "TRANSFORMS",
                  determinant: "DETERMINANT",
                  composition: "COMPOSITION"
              },
              scenario_title: "BASEL ENGINEERING MISSION",
              scenarios: {
                  basic_transforms: "Roche Pharmaceutical Molecular Analysis: You are working in Roche Basel's computational chemistry department, using linear transformations to analyze protein molecule symmetry. Each matrix represents a symmetry operation (rotation, reflection, scaling). Identifying transformation types is critical for predicting molecular optical properties.",
                  determinant: "Novartis Crystal Structure: You are analyzing drug crystal unit cell structures at Novartis Basel. The determinant represents lattice volume change. det(A)=0 indicates crystal structure collapse, det(A)<0 indicates chirality inversion. Accurate determinant calculation is crucial for predicting drug bioactivity.",
                  composition: "University of Basel Robotics: You are programming a robotic arm at Basel University robotics lab. Each joint's motion is represented by a transformation matrix. Composite transformation AB means executing joint A's motion first, then joint B's motion. Matrix multiplication order determines the robot arm's final position."
              },
              explanation_label: "EXPLANATION"
          },
  gm1_01: {
          back: "Back to Nexus",
          title: "GM1.01 // CALCULUS INTRO",
          tabs: {
              explore: "EXPLORE",
              slope: "SLOPE",
              tangent: "TANGENT",
              rate: "RATE",
              elite: "ELITE"
          },
          explore_title: "00 // Interactive Exploration",
          explore_instruction: "Drag the point P along the parabola y = x² and observe how the tangent line changes. The slope m represents the instantaneous rate of change.",
          explore_hint: "Drag point P in the visual monitor →",
          current_point: "Current Point",
          slope_label: "Tangent Slope",
          mission: {
              title: "DERIVATIVE ROAD SIMULATOR",
              description: "Master calculus by driving a car on mathematical curves. The derivative tells you the road's slope at each point. Match the car's angle to the road perfectly!"
          },
          spotlight: {
              title: "Scientist Spotlight",
              euler_name: "Leonhard Euler",
              euler_bio: "Basel-born master of analysis. Euler gave calculus its modern symbols and showed how motion, curves, and series can be governed by elegant laws.",
              bernoulli_name: "Johann Bernoulli",
              bernoulli_bio: "The Bernoulli dynasty forged calculus through challenge and rivalry. Johann advanced differential methods that map acceleration to form."
          },
          objective_title: "Active Mission Objective",
          target_title: "Target",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          hints_title: "Formula Reference",
          monitor_title: "GM1.01_VISUAL_MONITOR",
          status: "STATUS: OPERATIONAL",
          footer_left: "GM1.01_CALCULUS // NODE: BASEL",
          footer_right: "DERIVATIVE_SIMULATOR",
          stages: {
              intro: "INTRO",
              differentiation: "DERIVATIVES",
              application: "APPLICATIONS",
              power_rule: "POWER RULE",
              factor_rule: "FACTOR RULE",
              sum_rule: "SUM RULE",
              product_rule: "PRODUCT RULE",
              quotient_rule: "QUOTIENT RULE",
              chain_rule: "CHAIN RULE",
              intro_prompt_latex: "\\text{Calculate the derivative of }x^n.",
              differentiation_prompt_latex: "\\text{Apply the differentiation rules.}",
              application_prompt_latex: "\\text{Apply calculus to solve problems.}",
              power_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ at the given point.}",
              factor_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ using factor rule.}",
              sum_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ using sum rule.}",
              product_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ using product rule.}",
              quotient_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ using quotient rule.}",
              chain_rule_prompt_latex: "\\text{Calculate }f'(x)\\text{ using chain rule.}"
          },
          labels: {
              secant_slope: "Secant Slope m",
              tangent_slope: "Tangent Slope m",
              velocity: "Velocity v",
              x_coordinate: "x-coordinate",
              hints: "HINTS"
          },
          formulas: {
              power_rule: "f'(x) = n\\cdot x^{n-1}",
              factor_rule: "(a\\cdot f)' = a\\cdot f'",
              sum_rule: "(f+g)' = f' + g'",
              product_rule: "(uv)' = u'v + uv'",
              quotient_rule: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
              chain_rule: "\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}"
          },
          scenarios: {
              power_rule: "🚗 SCENARIO: Car Acceleration on a Hill — You're driving a Tesla up a curved hill. The road height follows h(x) = x². The derivative h'(x) tells you the road's steepness at each point. If you tilt the car at the wrong angle, it will scrape the ground or tip over! Calculate the correct slope (derivative) so the car's chassis aligns perfectly with the road surface. This is exactly how self-driving cars calculate terrain angles in real-time.",
              factor_rule: "🏗️ SCENARIO: Construction Scaling — An architect designs a building with height h(x) = x². When the city requires all dimensions to be scaled by factor 3, the new height becomes H(x) = 3x². The derivative tells you how the scaled building's slope changes. Use the factor rule: if f(x) = a·g(x), then f'(x) = a·g'(x). The constant factor 3 stays outside the derivative, making calculations easier!",
              sum_rule: "🌊 SCENARIO: Ocean Wave Superposition — Two ocean waves combine: wave A has height h₁(x) = x² and wave B has height h₂(x) = 3x. The total wave height is H(x) = x² + 3x. To predict how fast the combined wave rises, use the sum rule: (f + g)' = f' + g'. Calculate each wave's slope separately, then add them. This is how oceanographers predict tsunami wave behavior!",
              product_rule: "🌊 SCENARIO: Surfboard on a Wave — A surfer rides a wave described by h(x) = x·sin(x). The wave height depends on both position (x) and the sine wave pattern. To stay balanced, the surfer needs to know the wave's slope at each point. Use the product rule: if f(x) = u(x)·v(x), then f'(x) = u'·v + u·v'. This tells you how fast the wave is rising or falling, helping the surfer adjust their stance.",
              quotient_rule: "📊 SCENARIO: Stock Market Efficiency Ratio — A financial analyst tracks a company's efficiency ratio: profit(x) / cost(x). As market conditions change (x = time in months), both profit and cost change. To predict if efficiency is improving or declining, you need the derivative of this ratio. Use the quotient rule: if f(x) = u(x)/v(x), then f'(x) = [u'·v - u·v'] / v². This tells investors whether the company is becoming more or less efficient over time.",
              chain_rule: "⚙️ SCENARIO: Bicycle Gear System — You're cycling up a mountain. The pedal rotation creates a chain motion: pedal angle → chain speed → wheel rotation. If the chain wraps around the gear twice as fast (factor of 2), then f(x) = sin(2x). The chain rule tells you: if the outer function changes, multiply by the inner function's rate. This is how bicycle computers calculate your actual speed from pedal rotations!"
          },
          canvas: {
              title: "DERIVATIVE ROAD",
              subtitle_power: "f(x) = x²",
              subtitle_factor: "f(x) = ax²",
              subtitle_sum: "f(x) = x² + x",
              subtitle_product: "f(x) = x·sin(x)",
              subtitle_quotient: "f(x) = x/sin(x)",
              subtitle_chain: "f(x) = sin(2x)",
              x_label: "x",
              y_label: "f(x)",
              slope_label: "ROAD SLOPE",
              your_slope: "Your slope",
              correct_slope: "Correct slope",
              status_chamber: "CHAMBER",
              status_sim: "DERIVATIVE_SIM: ACTIVE",
              status_mode: "MODE"
          },
          integral_preview_title: "COMING SOON: INTEGRATION",
          integral_preview_desc: "Master the inverse operation of differentiation. Calculate areas under curves.",
          integral_preview_hint: "Unlock after mastering derivatives →",
          input_tip_2dp: "Tip: Enter result rounded to 2 decimal places."
      },
  gm1_01_advanced: {
          back: "Back to Nexus",
          title: "GM1.01-ADV // ADVANCED CALCULUS",
          monitor_title: "GM1.01_ADVANCED_MONITOR",
          footer_left: "GM1.01_ADVANCED // NODE: BASEL",
          input_tip_2dp: "Tip: Enter result rounded to 2 decimal places.",
          check: "Verify",
          next: "Next Challenge",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          mission: {
              title: "ADVANCED DERIVATIVE CHALLENGES",
              description: "Master complex derivatives by combining multiple rules. Apply calculus to real-world problems."
          },
          challenges: {
              composite: "COMPOSITE",
              modeling: "MODELING",
              optimization: "OPTIMIZATION",
              analysis: "ANALYSIS"
          },
          scenarios: {
              composite_1: "🎢 SCENARIO: Roller Coaster Design — An engineer designs a roller coaster section where the height follows h(t) = (2t² + 3t)·sin(t). The velocity is the derivative h'(t). At t=2 seconds, calculate the velocity to ensure passenger safety. This requires both the product rule AND the power rule!",
              composite_2: "📡 SCENARIO: Signal Processing — A radio signal's amplitude is A(t) = (t² + 1)/sin(t). The rate of amplitude change is A'(t). At t=1 second, calculate this rate to adjust the receiver. This requires the quotient rule combined with power rule!",
              composite_3: "🌊 SCENARIO: Wave Interference — Two ocean waves combine: h(x) = (x³ - 2x)·cos(x). At x=1, find the rate of height change h'(1) to predict wave behavior. Use product rule with trigonometric functions!",
              modeling_1: "🚗 SCENARIO: Car Acceleration — A Tesla accelerates from rest. Its position is s(t) = 2t³ - 3t² + 5t meters. Find the velocity v(t) = s'(t) at t=3 seconds to check if it's within speed limits.",
              modeling_2: "🎈 SCENARIO: Balloon Launch — A weather balloon rises with height h(t) = -5t² + 20t + 2 meters. At t=2 seconds, calculate the velocity v(t) = h'(t) to ensure safe ascent rate.",
              optimization_1: "📦 SCENARIO: Box Design — A company makes boxes from rectangular cardboard. The area is A(x) = x(10-x). Find the value of x that maximizes the area for optimal material usage.",
              optimization_2: "💰 SCENARIO: Profit Maximization — A Basel bakery's daily profit is P(x) = -2x² + 12x - 10 (in hundreds of CHF), where x is production hours. Find x that maximizes profit.",
              analysis_1: "📊 SCENARIO: Market Analysis — A stock price follows f(x) = x³ - 3x² + 2. Find all critical points (where f'(x) = 0) to identify potential buy/sell moments.",
              analysis_2: "🚀 SCENARIO: Rocket Trajectory — A rocket's height is f(x) = 2x³ - 6x + 1. At x=1, find the second derivative f''(1) to determine if the rocket is accelerating or decelerating."
          },
          questions: {
              find_derivative: "Calculate the derivative at the given point",
              find_velocity: "Calculate velocity v(t) = s'(t)",
              find_acceleration: "Calculate acceleration a(t) = v'(t)",
              find_maximum: "Find the value that maximizes the function",
              find_critical_point: "Find the critical point (where derivative = 0)",
              find_critical_points: "Find all critical points (where f'(x) = 0)"
          },
          hints: {
              use_product_rule: "Use product rule: (uv)' = u'v + uv'. First find u' and v' separately.",
              use_quotient_rule: "Use quotient rule: (u/v)' = (u'v - uv')/v². Remember to square the denominator!",
              use_chain_rule: "Use chain rule: (f(g(x)))' = f'(g(x))·g'(x). Work from outside to inside.",
              take_first_derivative: "Take the first derivative: if s(t) is position, then v(t) = s'(t) is velocity.",
              take_second_derivative: "First find f'(x), then differentiate again to get f''(x).",
              set_derivative_zero: "Set f'(x) = 0 and solve for x. This gives critical points where function may have max/min."
          },
          function_label: "FUNCTION",
          question_label: "CHALLENGE",
          hint_label: "STRATEGY",
          visualization_title: "FUNCTION GRAPH",
          visualization: {
              title: "FUNCTION VISUALIZATION",
              x_label: "x",
              y_label: "f(x)",
              function_label: "FUNCTION",
              point_label: "POINT"
          },
          progress: "Progress"
      },
  gm2_01: {
          back: "Back to Nexus",
          title: "GM2.01 // VECTOR PILOT 3D",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Vector HUD",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "GM2.01_VECTOR_HUD",
          footer_left: "GM2.01_VECTOR_PILOT // NODE: BASEL",
          stages: {
              navigation: "NAVIGATION",
              dot: "DOT PRODUCT",
              mission: "MISSION",
              navigation_prompt_latex: "\\text{Compute }\\vec v\\text{ from A to B and its magnitude.}",
              dot_prompt_latex: "\\text{Compute }\\vec v\\text{ and }\\vec v\\cdot\\vec w.",
              mission_prompt_latex: "\\text{Mission: compute }\\vec v,\\;\\vec v\\cdot\\vec s,\\;|\\vec v|."
          },
          labels: {
              input: "INPUT"
          },
          mission: {
              title: "MISSION: RHINE AIRSPACE",
              description: "Navigate a drone corridor above the Rhine. Enter the 3D vector and validate alignment with dot products."
          },
          scenarios: {
              navigation: "Basel Drone Delivery Network: You are programming the navigation system for Basel's autonomous medical supply drones. The drones must calculate precise 3D vectors between hospital rooftops and delivery points across the city. Given coordinates A (departure helipad at Basel University Hospital) and B (arrival point at Claraspital), compute the displacement vector v and its magnitude. The magnitude represents the direct flight distance in meters. Accurate vector calculation is critical for battery management and flight time estimation.",
              dot: "Solar Panel Optimization at Roche Tower: The Roche Tower in Basel is installing adjustable solar panels on its facade. Each panel's orientation is represented by a normal vector v, and the sun's direction at noon is vector w. The dot product v·w determines how much sunlight the panel receives - maximum when parallel (dot product = |v||w|), zero when perpendicular. Calculate the dot product to determine the optimal panel angle. Engineers use this to maximize energy capture throughout the day.",
              mission: "Rhine Navigation System: Basel Port Authority is developing an automated barge navigation system for the Rhine River. A cargo barge must travel from point A (current position) to point B (destination dock). The river current is represented by vector s. Calculate: (1) displacement vector v from A to B, (2) dot product v·s to determine if the current helps or hinders (positive = helps, negative = hinders, zero = perpendicular), and (3) magnitude |v| for the direct distance. This data optimizes fuel consumption and arrival time predictions."
          }
      },
  gm3_01: {
          back: "Back to Nexus",
          title: "GM3.01 // PROBABILITY VAULT",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Probability Matrix",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "GM3.01_PROBABILITY_MONITOR",
          footer_left: "GM3.01_PROBABILITY_VAULT // NODE: BASEL",
          stages: {
              basic_prob: "BASIC PROBABILITY",
              binomial: "BINOMIAL",
              conditional: "CONDITIONAL",
              mission: "MISSION",
              basic_prob_prompt_latex: "\\text{Calculate the probability }P(E).",
              binomial_prompt_latex: "\\text{Calculate }P(X=k)\\text{ for binomial distribution.}",
              conditional_prompt_latex: "\\text{Calculate the conditional probability }P(A|B).",
              mission_prompt_latex: "\\text{Mission: Calculate the probability }P."
          },
          labels: {
              input: "INPUT",
              hints: "HINTS"
          },
          mission: {
              title: "MISSION: BASEL PROBABILITY LAB",
              description: "Apply probability theory to real-world scenarios in Basel. Calculate probabilities for quality control, insurance, and lottery systems."
          },
          scenarios: {
              basic_prob: "Basel Quality Control at Novartis: You are working in the quality control department at Novartis pharmaceutical manufacturing in Basel. Each batch of medication undergoes random sampling inspection. Given that a sample contains a certain number of favorable outcomes (passing quality tests) out of total samples, calculate the probability P(E) that a randomly selected item passes inspection. This probability determines whether the entire batch is approved for distribution to Swiss hospitals.",
              binomial: "Swiss Lottery System Analysis: The Swiss Lotto operates from Basel headquarters. In each draw, players select numbers with a fixed probability p of matching. For n independent trials (lottery draws), calculate the probability P(X=k) of exactly k successes using the binomial distribution formula: P(X=k) = C(n,k) × p^k × (1-p)^(n-k). This helps lottery officials predict payout frequencies and set prize structures for Swiss players.",
              conditional: "Basel Insurance Risk Assessment: Basler Versicherungen (Basel Insurance) needs to calculate conditional probabilities for risk assessment. Given P(A) = probability of an event occurring, P(B) = probability of a condition being met, and P(A∩B) = probability of both occurring, calculate P(A|B) = P(A∩B)/P(B). This conditional probability helps determine insurance premiums for Basel residents based on specific risk factors.",
              mission: "Basel Integrated Probability Mission: You are consulting for multiple Basel companies - Novartis (pharmaceuticals), Swiss Lotto (lottery), and Basler Versicherungen (insurance). Each company presents a different probability problem: basic probability for quality control, binomial distribution for lottery analysis, or conditional probability for insurance risk. Apply the appropriate probability formula to solve each company's specific challenge and provide accurate probability calculations."
          },
          problems: {
              // BASIC PROBABILITY - BASIC
              // BASIC_PROB - BASIC: Direct sample space
              single_die_one: "You roll a standard six-sided die once. What is the probability of rolling exactly a 1?\n\nGiven: 1 favorable outcome, 6 total outcomes\nFind: P(E) = favorable / total\nConcept: Direct observation of sample space",
              single_die_odd: "You roll a standard six-sided die once. What is the probability of rolling an odd number (1, 3, or 5)?\n\nGiven: 3 favorable outcomes (1, 3, 5), 6 total outcomes\nFind: P(E) = favorable / total\nConcept: Direct observation",
              coin_heads: "You flip a fair coin once. What is the probability of getting heads?\n\nGiven: 1 favorable outcome (heads), 2 total outcomes\nFind: P(E) = favorable / total\nConcept: Simplest sample space",
              spinner_8_sections: "You spin a wheel divided into 8 equal sections numbered 1-8. What is the probability of landing on section 3?\n\nGiven: 1 favorable outcome, 8 total outcomes\nFind: P(E) = favorable / total\nConcept: Direct observation",
  
              // BASIC_PROB - CORE: Understanding combinations
              two_dice_sum_7: "You roll two standard dice. What is the probability that their sum equals 7?\n\nGiven: 6 favorable outcomes (1+6, 2+5, 3+4, 4+3, 5+2, 6+1), 36 total outcomes\nFind: P(E) = favorable / total\nConcept: Understanding that (1,6) and (6,1) are different outcomes",
              two_dice_sum_10: "You roll two standard dice. What is the probability that their sum equals 10?\n\nGiven: 3 favorable outcomes (4+6, 5+5, 6+4), 36 total outcomes\nFind: P(E) = favorable / total\nConcept: Counting combinations correctly",
              two_dice_sum_gt_7: "You roll two standard dice. What is the probability that their sum is greater than 7?\n\nGiven: 15 favorable outcomes (sum of 8,9,10,11,12), 36 total outcomes\nFind: P(E) = favorable / total\nConcept: Counting multiple favorable outcomes",
              deck_one_suit: "You draw one card from a standard 52-card deck. What is the probability of drawing a heart?\n\nGiven: 13 hearts, 52 total cards\nFind: P(E) = favorable / total\nConcept: Understanding suit structure",
              deck_honors: "You draw one card from a standard 52-card deck. What is the probability of drawing an honor card (A, K, Q, or J)?\n\nGiven: 16 honor cards (4 of each rank), 52 total cards\nFind: P(E) = favorable / total\nConcept: Counting across all suits",
  
              // BASIC_PROB - ADVANCED: Conditional probability (implicit)
              die_even_given_gt3: "You roll a die and observe that the result is greater than 3. What is the probability that it's an even number?\n\nGiven: Among outcomes {4,5,6}, two are even {4,6}\nFind: P(even | >3) = 2/3\nConcept: The condition '>3' changes the sample space from 6 to 3 outcomes",
              die_multiple_of_3: "You roll a standard die. What is the probability of rolling a multiple of 3?\n\nGiven: 2 favorable outcomes (3, 6), 6 total outcomes\nFind: P(E) = 2/6\nConcept: Identifying favorable outcomes with a condition",
              card_face_given_spade: "You draw a card and it's a spade. What is the probability it's a face card (J, Q, K)?\n\nGiven: Among 13 spades, 3 are face cards\nFind: P(face | spade) = 3/13\nConcept: Conditional probability within a suit",
              card_not_face_not_ace: "You draw a card from a standard deck. What is the probability it's neither a face card nor an ace?\n\nGiven: 52 total - 12 face cards - 4 aces = 36 favorable, 52 total\nFind: P(E) = 36/52\nConcept: Using complement to count",
              card_king_given_face: "You draw a card and it's a face card. What is the probability it's a King?\n\nGiven: Among 12 face cards (J,Q,K of 4 suits), 4 are Kings\nFind: P(King | face) = 4/12\nConcept: Conditional probability within face cards",
              // BASIC_PROB - ELITE: Compound events
              at_least_one_six_two_dice: "You roll two dice. What is the probability that at least one shows a 6?\n\nGiven: Use complement - P(at least one 6) = 1 - P(no 6)\nP(no 6) = (5/6) × (5/6) = 25/36\nFind: P(E) = 1 - 25/36 = 11/36\nConcept: Using complement for 'at least one'",
              sum_not_2_or_12: "You roll two dice. What is the probability that the sum is neither 2 nor 12?\n\nGiven: P(sum=2) = 1/36, P(sum=12) = 1/36\nFavorable = 36 - 1 - 1 = 34\nFind: P(E) = 34/36\nConcept: Using complement for 'neither...nor'",
              at_least_one_even: "You roll two dice. What is the probability that at least one shows an even number?\n\nGiven: P(both odd) = (3/6) × (3/6) = 9/36\nFind: P(at least one even) = 1 - 9/36 = 27/36\nConcept: Complement strategy",
              card_ace_or_king: "You draw one card. What is the probability it's an Ace OR a King?\n\nGiven: 4 Aces + 4 Kings = 8 favorable, 52 total\nFind: P(A or K) = 8/52\nConcept: Addition principle for mutually exclusive events",
              card_red_or_face: "You draw one card. What is the probability it's red OR a face card?\n\nGiven: 26 red + 12 face - 6 (red face) = 32 favorable\nFind: P(red or face) = 32/52\nConcept: Addition principle with overlap (inclusion-exclusion)",
  
              // BASIC PROBABILITY - ELITE
              quality_control_427: "Novartis Basel large-scale quality control: In a production run of 500 medication samples, 427 passed all comprehensive safety and efficacy tests. Calculate the probability that a randomly selected sample from this production run passes all tests.\n\nGiven: 427 samples passed, 500 total samples\nFind: P(E) = favorable / total\nSignificance: This probability determines whether 50,000 units can be released to European markets.",
              quality_control_683: "Novartis Basel large-scale quality control: In a production run of 800 medication samples, 683 passed all tests. Calculate P(E).\n\nGiven: 683 samples passed, 800 total samples\nFind: P(E) = favorable / total",
              quality_control_891: "Novartis Basel large-scale quality control: In a production run of 1000 medication samples, 891 passed all tests. Calculate P(E).\n\nGiven: 891 samples passed, 1000 total samples\nFind: P(E) = favorable / total",
              quality_control_1456: "Novartis Basel large-scale quality control: In a production run of 1600 medication samples, 1456 passed all tests. Calculate P(E).\n\nGiven: 1456 samples passed, 1600 total samples\nFind: P(E) = favorable / total",
              quality_control_1789: "Novartis Basel large-scale quality control: In a production run of 2000 medication samples, 1789 passed all tests. Calculate P(E).\n\nGiven: 1789 samples passed, 2000 total samples\nFind: P(E) = favorable / total",
  
              // BINOMIAL - BASIC: Understanding basic concept
              coin_3_2: "You flip a fair coin 3 times. What is the probability of getting exactly 2 heads?\n\nGiven: n=3 trials, k=2 successes, p=0.5\nFind: P(X=2) = C(3,2) × 0.5² × 0.5¹\nConcept: Understanding 'exactly k successes'",
              coin_4_2: "You flip a fair coin 4 times. What is the probability of getting exactly 2 heads?\n\nGiven: n=4 trials, k=2 successes, p=0.5\nFind: P(X=2) = C(4,2) × 0.5² × 0.5²\nConcept: Basic binomial calculation",
              coin_3_all: "You flip a fair coin 3 times. What is the probability of getting all heads?\n\nGiven: n=3 trials, k=3 successes, p=0.5\nFind: P(X=3) = C(3,3) × 0.5³ × 0.5⁰\nConcept: Understanding C(n,n) = 1",
              coin_4_none: "You flip a fair coin 4 times. What is the probability of getting no heads (all tails)?\n\nGiven: n=4 trials, k=0 successes, p=0.5\nFind: P(X=0) = C(4,0) × 0.5⁰ × 0.5⁴\nConcept: Understanding C(n,0) = 1",
  
              // BINOMIAL - CORE: Understanding C(n,k) meaning
              lottery_5_3: "Swiss Lotto: You play 5 lottery draws with 50% win probability each. What is the probability of winning exactly 3 times?\n\nGiven: n=5, k=3, p=0.5\nFind: P(X=3) = C(5,3) × 0.5³ × 0.5²\nConcept: C(5,3) = 10 represents the 10 different ways to choose which 3 draws you win",
              lottery_6_3: "Swiss Lotto: You play 6 draws with 50% win probability. What is the probability of winning exactly 3 times?\n\nGiven: n=6, k=3, p=0.5\nFind: P(X=3), where C(6,3) = 20\nConcept: Understanding why we multiply by C(n,k)",
              lottery_5_2: "Swiss Lotto: You play 5 draws with 50% win probability. What is the probability of winning exactly 2 times?\n\nGiven: n=5, k=2, p=0.5\nFind: P(X=2), where C(5,2) = 10\nConcept: Binomial coefficient represents arrangements",
              lottery_6_4: "Swiss Lotto: You play 6 draws with 50% win probability. What is the probability of winning exactly 4 times?\n\nGiven: n=6, k=4, p=0.5\nFind: P(X=4), where C(6,4) = 15\nConcept: Counting favorable arrangements",
              lottery_7_3: "Swiss Lotto: You play 7 draws with 50% win probability. What is the probability of winning exactly 3 times?\n\nGiven: n=7, k=3, p=0.5\nFind: P(X=3), where C(7,3) = 35\nConcept: Larger n means more arrangements",
  
              // BINOMIAL - ADVANCED: Asymmetric probability (p ≠ 0.5)
              lottery_5_3_biased: "Swiss Lotto: You play 5 draws with 60% win probability per draw. What is the probability of winning exactly 3 times?\n\nGiven: n=5, k=3, p=0.6 (biased probability)\nFind: P(X=3) = C(5,3) × 0.6³ × 0.4²\nConcept: Distribution is skewed when p ≠ 0.5",
              lottery_6_2_low: "Swiss Lotto: You play 6 draws with only 30% win probability per draw. What is the probability of winning exactly 2 times?\n\nGiven: n=6, k=2, p=0.3 (low probability)\nFind: P(X=2) = C(6,2) × 0.3² × 0.7⁴\nConcept: Low p means distribution skewed left",
              lottery_8_6_high: "Swiss Lotto: You play 8 draws with 70% win probability per draw. What is the probability of winning exactly 6 times?\n\nGiven: n=8, k=6, p=0.7 (high probability)\nFind: P(X=6) = C(8,6) × 0.7⁶ × 0.3²\nConcept: High p means distribution skewed right",
              lottery_7_4_biased: "Swiss Lotto: You play 7 draws with 60% win probability. What is the probability of winning exactly 4 times?\n\nGiven: n=7, k=4, p=0.6\nFind: P(X=4)\nConcept: Understanding asymmetric distributions",
              lottery_10_7_biased: "Swiss Lotto: You play 10 draws with 65% win probability. What is the probability of winning exactly 7 times?\n\nGiven: n=10, k=7, p=0.65\nFind: P(X=7)\nConcept: Calculating with non-standard probabilities",
  
              // BINOMIAL - ELITE: Cumulative probability
              at_least_3_of_5: "Swiss Lotto: You play 5 draws with 60% win probability. What is the probability of winning AT LEAST 3 times?\n\nGiven: n=5, k≥3, p=0.6\nFind: P(X≥3) = P(X=3) + P(X=4) + P(X=5)\nConcept: Cumulative probability - sum multiple outcomes",
              at_most_4_of_6: "Swiss Lotto: You play 6 draws with 50% win probability. What is the probability of winning AT MOST 4 times?\n\nGiven: n=6, k≤4, p=0.5\nFind: P(X≤4) = P(X=0) + P(X=1) + P(X=2) + P(X=3) + P(X=4)\nConcept: Or use 1 - P(X>4) = 1 - P(X=5) - P(X=6)",
              more_than_half: "Swiss Lotto: You play 8 draws with 60% win probability. What is the probability of winning MORE THAN HALF the time?\n\nGiven: n=8, k>4, p=0.6\nFind: P(X>4) = P(X=5) + P(X=6) + P(X=7) + P(X=8)\nConcept: Understanding 'more than half' means k≥5",
              at_least_7_of_10: "Swiss Lotto: You play 10 draws with 70% win probability. What is the probability of winning AT LEAST 7 times?\n\nGiven: n=10, k≥7, p=0.7\nFind: P(X≥7) = P(X=7) + P(X=8) + P(X=9) + P(X=10)\nConcept: Cumulative probability with high p",
              at_least_8_of_12: "Swiss Lotto: You play 12 draws with 60% win probability. What is the probability of winning AT LEAST 8 times?\n\nGiven: n=12, k≥8, p=0.6\nFind: P(X≥8) = sum from k=8 to 12\nConcept: Multiple terms in cumulative probability",
  
              // CONDITIONAL - BASIC
              insurance_basic_1: "Basler Versicherungen (Basel Insurance): For a simple insurance case, we know P(A) = 0.5 (probability of claim), P(B) = 0.6 (probability of risk factor present), and P(A∩B) = 0.3 (probability of both). Calculate P(A|B), the probability of a claim given the risk factor is present.\n\nGiven: P(A) = 0.5, P(B) = 0.6, P(A∩B) = 0.3\nFind: P(A|B) = P(A∩B) / P(B)\nSignificance: Determines insurance premiums for Basel residents.",
              insurance_basic_2: "Basler Versicherungen: Given P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2, calculate P(A|B).\n\nGiven: P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2\nFind: P(A|B) = P(A∩B) / P(B)",
              insurance_basic_3: "Basler Versicherungen: Given P(A) = 0.6, P(B) = 0.7, P(A∩B) = 0.4, calculate P(A|B).\n\nGiven: P(A) = 0.6, P(B) = 0.7, P(A∩B) = 0.4\nFind: P(A|B) = P(A∩B) / P(B)",
              insurance_basic_4: "Basler Versicherungen: Given P(A) = 0.3, P(B) = 0.4, P(A∩B) = 0.15, calculate P(A|B).\n\nGiven: P(A) = 0.3, P(B) = 0.4, P(A∩B) = 0.15\nFind: P(A|B) = P(A∩B) / P(B)",
  
              // CONDITIONAL - CORE: Extracting condition from description
              card_heart_given_red: "You draw a card and observe it's red. What is the probability it's a heart?\n\nGiven: P(heart) = 13/52, P(red) = 26/52, P(heart AND red) = 13/52\nFind: P(heart|red) = (13/52) / (26/52) = 13/26 = 0.5\nConcept: Identifying condition from description",
              die_six_given_even: "You roll a die and observe it's even. What is the probability it's a 6?\n\nGiven: P(6) = 1/6, P(even) = 3/6, P(6 AND even) = 1/6\nFind: P(6|even) = (1/6) / (3/6) = 1/3\nConcept: Condition changes sample space",
              card_face_given_red: "You draw a card and it's red. What is the probability it's a face card?\n\nGiven: P(face) = 12/52, P(red) = 26/52, P(face AND red) = 6/52\nFind: P(face|red) = 6/26\nConcept: Extracting probabilities from card structure",
              die_one_given_odd: "You roll a die and it's odd. What is the probability it's a 1?\n\nGiven: P(1) = 1/6, P(odd) = 3/6, P(1 AND odd) = 1/6\nFind: P(1|odd) = (1/6) / (3/6) = 1/3\nConcept: Understanding conditional sample space",
              card_spade_given_black: "You draw a card and it's black. What is the probability it's a spade?\n\nGiven: P(spade) = 13/52, P(black) = 26/52, P(spade AND black) = 13/52\nFind: P(spade|black) = 13/26 = 0.5\nConcept: Symmetry in conditional probability",
  
              // CONDITIONAL - ADVANCED: Bayesian thinking
              disease_test_positive: "A disease affects 1% of the population. A test is 90% accurate (detects disease when present). If you test positive, what's the probability you actually have the disease?\n\nGiven: P(disease) = 0.01, P(positive|disease) = 0.9, P(positive|no disease) = 0.1\nP(positive) = 0.01×0.9 + 0.99×0.1 = 0.108\nFind: P(disease|positive) = (0.01×0.9) / 0.108 = 0.083\nConcept: P(A|B) ≠ P(B|A) - Bayesian reversal",
              disease_test_positive_2: "A rare disease affects 2% of population. Test is 80% accurate. If positive, what's P(disease)?\n\nGiven: P(disease) = 0.02, P(+|disease) = 0.8\nFind: P(disease|+) using Bayes' theorem\nConcept: Understanding false positives",
              quality_defect_given_batch: "15% of products are defective. A batch test detects 80% of defects. If batch fails, what's P(defective)?\n\nGiven: P(defect) = 0.15, P(fail|defect) = 0.8\nFind: P(defect|fail)\nConcept: Bayesian inference in quality control",
              fraud_given_alert: "5% of transactions are fraudulent. Alert system catches 80% of fraud. If alert triggers, what's P(fraud)?\n\nGiven: P(fraud) = 0.05, P(alert|fraud) = 0.8\nFind: P(fraud|alert)\nConcept: Understanding alarm reliability",
              accident_given_weather: "10% of days have accidents. 80% of accident days have bad weather. If bad weather, what's P(accident)?\n\nGiven: P(accident) = 0.1, P(bad weather|accident) = 0.8\nFind: P(accident|bad weather)\nConcept: Reversing conditional probability",
  
              // CONDITIONAL - ELITE: Independence testing
              independence_test_1: "Events A and B have P(A)=0.4, P(B)=0.5, P(A∩B)=0.2. Are A and B independent?\n\nGiven: P(A)=0.4, P(B)=0.5, P(A∩B)=0.2\nTest: If independent, P(A∩B) should equal P(A)×P(B) = 0.4×0.5 = 0.2 ✓\nFind: P(A|B) = 0.2/0.5 = 0.4 = P(A) ✓\nConcept: A and B are INDEPENDENT",
              independence_test_2: "Events A and B have P(A)=0.3, P(B)=0.6, P(A∩B)=0.18. Are they independent?\n\nGiven: P(A)=0.3, P(B)=0.6, P(A∩B)=0.18\nTest: P(A)×P(B) = 0.3×0.6 = 0.18 ✓\nFind: P(A|B) = 0.18/0.6 = 0.3 = P(A) ✓\nConcept: Testing independence",
              multiple_condition_1: "P(A)=0.25, P(B)=0.4, P(A∩B)=0.15. Find P(A|B) and determine if independent.\n\nGiven: P(A)=0.25, P(B)=0.4, P(A∩B)=0.15\nFind: P(A|B) = 0.15/0.4 = 0.375\nTest: P(A|B) = 0.375 ≠ P(A) = 0.25\nConcept: NOT independent - condition changes probability",
              independence_test_3: "P(A)=0.35, P(B)=0.7, P(A∩B)=0.245. Are A and B independent?\n\nGiven: P(A)=0.35, P(B)=0.7, P(A∩B)=0.245\nTest: P(A)×P(B) = 0.35×0.7 = 0.245 ✓\nFind: P(A|B) = 0.245/0.7 = 0.35 = P(A) ✓\nConcept: Independence verification",
              multiple_condition_2: "P(A)=0.2, P(B)=0.5, P(A∩B)=0.12. Find P(A|B) and test independence.\n\nGiven: P(A)=0.2, P(B)=0.5, P(A∩B)=0.12\nFind: P(A|B) = 0.12/0.5 = 0.24\nTest: P(A|B) = 0.24 ≠ P(A) = 0.2\nConcept: NOT independent",
  
              // MISSION - Mixed problems (reuse context keys from above stages)
              mission_basic_1: "Novartis Mission: Roll a die once. What is the probability of rolling a 1?\n\nGiven: 1 favorable, 6 total\nFind: P(E)",
              mission_basic_2: "Swiss Lotto Mission: Flip a coin 3 times. What is the probability of exactly 2 heads?\n\nGiven: n=3, k=2, p=0.5\nFind: P(X=2)",
              mission_basic_3: "Insurance Mission: Given P(A)=0.5, P(B)=0.6, P(A∩B)=0.3, find P(A|B).\n\nGiven: P(A)=0.5, P(B)=0.6, P(A∩B)=0.3\nFind: P(A|B)",
              mission_basic_4: "Novartis Mission: Roll a die. What is the probability of rolling an even number?\n\nGiven: 2 favorable (2,4,6), 6 total\nFind: P(E)",
  
              mission_core_1: "Novartis Mission: Draw a card from a 52-card deck. What is the probability of drawing a heart?\n\nGiven: 13 favorable, 52 total\nFind: P(E)",
              mission_core_2: "Swiss Lotto Mission: Play 6 lottery draws with 50% win probability. What is P(X=4)?\n\nGiven: n=6, k=4, p=0.5\nFind: P(X=4)",
              mission_core_3: "Insurance Mission: Given P(A)=0.45, P(B)=0.55, P(A∩B)=0.25, find P(A|B).\n\nGiven: P(A)=0.45, P(B)=0.55, P(A∩B)=0.25\nFind: P(A|B)",
              mission_core_4: "Novartis Mission: Draw a card. What is the probability of drawing a red card?\n\nGiven: 26 favorable, 52 total\nFind: P(E)",
              mission_core_5: "Swiss Lotto Mission: Play 5 draws with 60% win probability. What is P(X=3)?\n\nGiven: n=5, k=3, p=0.6\nFind: P(X=3)",
  
              mission_adv_1: "Novartis Mission: In 100 samples, 85 passed. Calculate P(E).\n\nGiven: 85 favorable, 100 total\nFind: P(E)",
              mission_adv_2: "Swiss Lotto Mission: In 10 draws with 50% win probability, calculate P(X=6).\n\nGiven: n=10, k=6, p=0.5\nFind: P(X=6)",
              mission_adv_3: "Insurance Mission: Given P(A)=0.37, P(B)=0.63, P(A∩B)=0.21, find P(A|B).\n\nGiven: P(A)=0.37, P(B)=0.63, P(A∩B)=0.21\nFind: P(A|B)",
              mission_adv_4: "Novartis Mission: In 120 samples, 92 passed. Calculate P(E).\n\nGiven: 92 favorable, 120 total\nFind: P(E)",
              mission_adv_5: "Swiss Lotto Mission: In 8 draws with 60% win probability, calculate P(X=5).\n\nGiven: n=8, k=5, p=0.6\nFind: P(X=5)",
  
              mission_elite_1: "Novartis Mission: In 500 samples, 427 passed. Calculate P(E).\n\nGiven: 427 favorable, 500 total\nFind: P(E)",
              mission_elite_2: "Swiss Lotto Mission: In 15 draws with 55% win probability, calculate P(X=9).\n\nGiven: n=15, k=9, p=0.55\nFind: P(X=9)",
              mission_elite_3: "Insurance Mission: Given P(A)=0.365, P(B)=0.625, P(A∩B)=0.215, find P(A|B).\n\nGiven: P(A)=0.365, P(B)=0.625, P(A∩B)=0.215\nFind: P(A|B)",
              mission_elite_4: "Novartis Mission: In 800 samples, 683 passed. Calculate P(E).\n\nGiven: 683 favorable, 800 total\nFind: P(E)",
              mission_elite_5: "Swiss Lotto Mission: In 18 draws with 60% win probability, calculate P(X=11).\n\nGiven: n=18, k=11, p=0.6\nFind: P(X=11)"
          },
          input_tip_4dp: "Tip: Enter result rounded to 4 decimal places."
      },
  gm4_01: {
              back: "Back to Nexus",
              title: "GM4.01 // COMPLEX HORIZON",
              difficulty: {
                  basic: "BASIC",
                  core: "CORE",
                  advanced: "ADVANCED",
                  elite: "ELITE"
              },
              next: "Execute Next Sequence",
              check: "Verify",
              correct: "Verified",
              incorrect: "Mismatch",
              ready: "Ready",
              monitor_title: "GM4.01_COMPLEX_MONITOR",
              footer_left: "GM4.01_COMPLEX_HORIZON // NODE: BASEL",
              scenario_title: "BASEL ENGINEERING MISSION",
              scenarios: {
                  basics: "Roche Pharmaceutical Signal Processing: You are calibrating medical imaging equipment at Roche Basel that uses complex number analysis for MRI signal processing. Each complex number z = a + bi represents a signal with real component (amplitude) and imaginary component (phase). Calculate the magnitude |z| to determine signal strength. Accurate magnitude calculation is critical for detecting tissue abnormalities in patient scans.",
                  operations: "Novartis Quantum Chemistry Simulation: You are running molecular orbital calculations at Novartis Basel using complex number arithmetic. Wave functions are represented as complex numbers, and their interactions require addition and multiplication in the complex plane. Calculate the result of complex operations to predict molecular behavior. These calculations determine drug binding efficiency.",
                  polar: "Basel University Electrical Engineering: You are analyzing AC circuit behavior in power systems for Basel's smart grid. Complex impedances are raised to powers when calculating resonance frequencies. Use polar form (r·e^(iθ)) to compute z^n efficiently. The result determines optimal power distribution across Basel's renewable energy network."
              },
              stages: {
                  basics: "BASICS",
                  operations: "OPERATIONS",
                  polar: "POLAR FORM",
                  basics_prompt: "Calculate magnitude",
                  basics_target: "Find |z|",
                  operations_add: "Add complex numbers",
                  operations_multiply: "Multiply complex numbers",
                  operations_target: "Find real and imaginary parts",
                  polar_prompt: "Calculate power using polar form",
                  polar_target: "Find z^n in rectangular form"
              },
              visualization: {
                  pythagorean: "PYTHAGOREAN THEOREM",
                  vector_addition: "VECTOR ADDITION",
                  complex_multiplication: "COMPLEX MULTIPLICATION",
                  polar_power: "POLAR FORM POWER",
                  complex_data: "COMPLEX NUMBER DATA",
                  magnitude: "Magnitude |z|",
                  argument: "Argument arg(z)",
                  power: "Power",
                  verified: "VERIFIED",
                  mismatch: "MISMATCH",
                  geometric_meaning: "Geometric meaning: magnitudes multiply, angles add",
                  polar_meaning: "Magnitude becomes r^n, angle becomes n·θ",
                  parallelogram_rule: "Parallelogram rule: from origin to z₁, then translate z₂ from z₁"
              }
          },
  sm1_01: {
          back: "Back to Nexus",
          title: "SM1.01 // AREAS & VOLUMES",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Geometry Task",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "SM1.01_MONITOR",
          footer_left: "SM1.01_GEOMETRY // NODE: BASEL",
          input_tip_2dp: "Tip: Enter result as a fraction (e.g. 4/3) or rounded to 2 decimal places.",
          base_twice_height: "base is twice the height",
          stages: {
              areas: "AREAS",
              volumes: "VOLUMES",
              complex: "COMPLEX",
              areas_prompt_latex: "\\text{Read the scenario and calculate the required area.}",
              volumes_prompt_latex: "\\text{Read the scenario and calculate the required volume.}"
          },
  
          mission: {
              title: "MISSION: RHINE FLOOD GATE",
              protocol: "Nexus Protocol // Node Geneva",
              description: "In Basel, engineers model a Rhine flood gate cross-section as a trapezoid.",
              cube_title: "CERN CUBE VAULT",
              cube_desc: "In CERN, identify the space diagonal of a cubic vault and compute its length."
          },
          labels: {
              input: "INPUT",
              hints: "HINTS",
              length: "Length",
              width: "Width",
              height: "Height",
              base: "Base",
              radius: "Radius",
              side: "Side",
              area: "Area",
              volume: "Volume",
              calculate_area: "Calculate the area.",
              calculate_volume: "Calculate the volume.",
          },
          quests: {
              ski: "An Alpine ski slope needs new snow. The slope is rectangular.",
              sail: "The Zurich Sailing Club needs custom canvas. The sail is triangular.",
              gate: "A Rhine flood gate cross-section is trapezoidal.",
              cheese: "A circular mold for Gruyère cheese factory.",
              attic: "A Swiss chalet attic is a cubic space, needing an air purifier.",
              crate: "CERN lab needs a storage box for precision instruments.",
              pylon: "St. Moritz ski cable pylons are cylindrical.",
  
              // Structural Templates
              rect_core: "The width is ${w}, and the length is ${diff} more than the width.",
              rect_advanced: "The length is ${l}, and the width is exactly half of the length.",
              rect_elite: "The total perimeter is ${p}, and the length is ${ratio} times the width.",
              tri_elite: "An isosceles right-angled sail with a hypotenuse of ${c}.",
              circle_elite: "The total circumference of the mold is ${c}.",
              cube_elite: "The total surface area of the cubic space is ${sa}.",
              prism_elite: "The base is a square with perimeter ${p}, and the height is ${h}.",
              cyl_elite: "The lateral surface area is ${la}, and the radius is ${r}."
          },
      },
  sm1_02: {
      back: "Back to Nexus",
      title: "SM1.02 // ALGEBRA QUEST",
      difficulty: {
          basic: "BASIC",
          core: "CORE",
          advanced: "ADVANCED",
          elite: "ELITE"
      },
      modes: {
          containers: "CONTAINERS",
          sorting: "SORTING",
          machine: "MACHINE"
      },
      labels: {
          variable: "Variable",
          value: "Value",
          expression: "Expression",
          simplify: "Simplify",
          evaluate: "Evaluate",
          input: "Input",
          output: "Output"
      },
      stages: {
          variables: "VARIABLES",
          terms: "TERMS",
          substitution: "SUBSTITUTION",
          vars_prompt: "Identify the value inside the container.",
          terms_prompt: "Combine like terms to simplify the expression.",
          sub_prompt: "Evaluate the expression for the given value."
      },
      scenarios: {
          variables: "Basel Rhybadhüsli Locker: You are managing lockers at the famous Rhine swim house. Each locker (variable 'x') contains a specific value (towel, bag). Understand that 'x' is just a placeholder.",
          terms: "Marktplatz Fruit Stand: You are sorting deliveries at the Basel Market. You cannot mix apples and pears directly. Group same items together: 3 apples + 2 apples = 5 apples.",
          substitution: "BVB Tram Ticket Machine: You are testing the ticket machine logic. Insert a zone value (x) into the price formula to calculate the correct fare in CHF."
      }
      },
  sm1_03: {
      back: "Back to Nexus",
      title: "SM1.03 // BELOW ZERO",
      difficulty: {
          basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
      },
      next: "Execute Next Sequence",
      check: "Verify",
      correct: "Verified",
      incorrect: "Mismatch",
      ready: "Ready",
      monitor_title: "SM1.03_INTEGER_MONITOR",
      footer_left: "SM1.03_BELOW_ZERO // NODE: BASEL",
      basel_scenario: "BASEL WINTER SCENARIO",
      scenario_title: "PROBLEM CONTEXT",
      calculate_title: "CALCULATE",
      answer_title: "YOUR ANSWER",
      solution_title: "SOLUTION",
      stages: {
          number_line: "NUMBER LINE",
          rationals: "RATIONALS",
          quadrants: "QUADRANTS"
      },
      scenarios: {
          number_line: "Basel Winter Temperatures: You are monitoring temperatures at EuroAirport Basel during winter. Temperatures often drop below zero. Understanding negative numbers is essential for reading thermometers and comparing temperatures. The number line helps visualize integers and their relationships.",
          rationals: "Rhine River Water Levels: The Rhine River 'Pegel' (water level gauge) at Basel shows water depth. Normal level is +5m. During drought, it drops. Divers measure depth below surface as negative values. Rational numbers (fractions and decimals) give precise measurements.",
          quadrants: "Basel City Grid Navigation: Map Basel landmarks on a coordinate grid. Grossbasel (Q1: +,+), Kleinbasel (Q2: -,+), Klybeck (Q3: -,-), St. Alban (Q4: +,-). Understanding quadrants helps navigate the city and locate positions precisely."
      },
      problems: {
          nl_identify_neg3: "Locate -3 on the number line.",
          nl_identify_5: "Locate 5 on the number line.",
          nl_temp_neg2: "Temperature is -2°C. Mark this on the thermometer.",
          nl_depth_neg4: "A diver is 4 meters below the surface. Mark -4m.",
          nl_identify_0: "Locate zero (the origin) on the number line.",
          nl_compare_neg5_neg2: "Which is colder: -5°C or -2°C?",
          nl_compare_neg3_1: "Which is smaller: -3 or 1?",
          nl_order_three: "Order these numbers: -4, 0, 3. What is the middle value?",
          nl_rhine_level: "Rhine level drops from +5m to -3m. What is the new level?",
          nl_temp_drop: "Temperature drops from 2°C by 7 degrees. What is the final temperature?",
          nl_distance_abs: "What is the distance between -5 and 2 on the number line?",
          nl_abs_value: "What is the absolute value of -8?",
          nl_distance_neg_neg: "What is the distance between -7 and -3?",
          nl_midpoint: "What is the midpoint between -6 and 4?",
          nl_temp_range: "Temperature ranges from -8°C to 5°C. What is the range?",
          nl_operation_add: "Calculate: -5 + 3",
          nl_operation_sub: "Calculate: -3 - 4",
          nl_operation_mult: "Calculate: -4 × 2",
          nl_multi_step: "Calculate: -6 + 8 - 5",
          nl_complex_op: "Calculate: (-2 + 5) - (3 - 7)",
          r_place_half: "Locate 0.5 on the number line.",
          r_place_neg_half: "Locate -0.5 on the number line.",
          r_place_1_5: "Locate 1.5 on the number line.",
          r_place_neg2_5: "Locate -2.5 on the number line.",
          r_fraction_third: "Convert 1/3 to decimal (round to 2 places).",
          r_compare_fractions: "Which is larger: -1/2 or -1/3?",
          r_compare_decimals: "Which is smaller: -0.75 or -0.5?",
          r_order_mixed: "Order: -1.5, -0.5, 0.5. What is the smallest?",
          r_add_decimals: "Calculate: 0.5 + 0.25",
          r_sub_decimals: "Calculate: 1.5 - 2.25",
          r_compare_neg_decimals: "Which is colder: -0.75°C or -0.8°C?",
          r_fraction_to_decimal: "Convert -3/4 to decimal.",
          r_mult_decimals: "Calculate: 0.5 × 1.5",
          r_div_decimals: "Calculate: 1.5 ÷ 0.5",
          r_mixed_operations: "Calculate: 0.5 + 1.25 - 0.75",
          r_order_complex: "Order from smallest: -1.5, -3/2, 0, 1.2. What is the first?",
          r_fraction_operations: "Calculate: 1/2 + 1/4 (as decimal)",
          r_neg_fraction_ops: "Calculate: -1/2 - 1/4 (as decimal)",
          r_complex_decimal: "Calculate: (0.5 - 1.25) × 2",
          r_repeating_decimal: "Convert 2/3 to decimal (round to 2 places).",
          q_identify_point: "What is the x-coordinate of point (2, 3)?",
          q_identify_y: "What is the y-coordinate of point (3, 4)?",
          q_plot_positive: "Plot point (1, 2). What is x?",
          q_origin: "What is the x-coordinate at the origin?",
          q_axis_point: "Point (3, 0) is on which axis? What is y?",
          q_quadrant_2: "Point (-2, 5) is in which quadrant?",
          q_quadrant_3: "Point (-3, -4) is in which quadrant?",
          q_quadrant_4: "Point (4, -2) is in which quadrant?",
          q_basel_landmarks: "Kleinbasel is at (-3, 2). What is x?",
          q_distance_horizontal: "Distance between (2, 0) and (5, 0)?",
          q_reflect_x_axis: "Reflect (3, 4) across x-axis. What is y'?",
          q_reflect_y_axis: "Reflect (5, 2) across y-axis. What is x'?",
          q_reflect_origin: "Reflect (3, 4) across origin. What is x'?",
          q_translate: "Translate (2, 3) by (4, 0). What is x'?",
          q_midpoint_2d: "Midpoint between (2, 3) and (6, 3). What is x?",
          q_distance_vertical: "Distance between (0, 5) and (0, -3)?",
          q_perimeter_rectangle: "Rectangle with corners at (0,0) and (4,3). Perimeter?",
          q_area_rectangle: "Rectangle with corners at (0,0) and (4,3). Area?",
          q_diagonal_distance: "Horizontal distance from (2, 3) to (6, 5)?",
          q_complex_translation: "Start at (2, 3), move right 3, left 1. Final x?"
      }
      },
  sm1_04: {
      back: "Back to Nexus",
      title: "SM1.04 // EQUATION BALANCE",
      difficulty: {
          basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
      },
      next: "Execute Next Sequence",
      check: "Verify",
      correct: "Verified",
      incorrect: "Mismatch",
      ready: "Ready",
      monitor_title: "SM1.04_EQUATION_MONITOR",
      footer_left: "SM1.04_EQUATION_BALANCE // NODE: BASEL",
      basel_scenario: "BASEL EQUATION SCENARIO",
      scenario_title: "PROBLEM CONTEXT",
      solve_title: "SOLVE THE EQUATION",
      answer_title: "YOUR ANSWER",
      solution_title: "SOLUTION",
      stages: {
          balance: "BALANCE",
          solve: "SOLVE",
          transform: "TRANSFORM",
          applications: "APPLICATIONS"
      },
      scenarios: {
          balance: "Understanding Equation Balance: Like a scale, equations must stay balanced. Whatever you do to one side, you must do to the other. This fundamental principle is the key to solving all equations.",
          solve: "Solving Linear Equations: Use inverse operations to isolate the variable. Add/subtract to move constants, multiply/divide to remove coefficients. Each step brings you closer to finding x.",
          transform: "Transforming Equations: Master the art of moving terms across the equals sign. Combine like terms, expand parentheses, and simplify fractions. Transform complex equations into simple ones.",
          applications: "Basel Real-World Problems: Apply equations to solve real problems in Basel. Calculate bus ticket prices, Rhine ferry times, Novartis lab measurements, and Roche pharmaceutical concentrations."
      },
      problems: {
          bal_add_both: "Add 2 to both sides of x + 3 = 7",
          bal_subtract_both: "Subtract 5 from both sides of x + 5 = 8",
          bal_multiply_both: "Multiply both sides by 2",
          bal_divide_both: "Divide both sides by 2",
          bal_simple_check: "Solve by moving the constant",
          bal_two_steps: "First subtract 3, then divide by 2",
          bal_negative_result: "Result will be negative",
          bal_fraction_coeff: "First subtract 2, then multiply by 3",
          bal_both_sides_x: "Move x terms to one side",
          bal_distribute: "First expand the parentheses",
          bal_complex_both: "Variables on both sides",
          bal_fractions: "Find common denominator",
          bal_parentheses_both: "Expand both sides first",
          bal_decimal_coeff: "Work with decimals",
          bal_negative_coeff: "Negative coefficient",
          bal_nested_parens: "Simplify inner parentheses first",
          bal_three_fractions: "Three fractions with different denominators",
          bal_complex_distribute: "Multiple distribution steps",
          bal_reciprocal: "Reciprocal fractions",
          bal_proportion: "Proportion equation",
          sol_one_step_add: "One-step: subtract 3",
          sol_one_step_sub: "One-step: add 5",
          sol_one_step_mult: "One-step: divide by 3",
          sol_one_step_div: "One-step: multiply by 4",
          sol_negative_simple: "Result is negative",
          sol_two_step_1: "Two steps: subtract then divide",
          sol_two_step_2: "Two steps: add then multiply",
          sol_negative_coeff: "Negative coefficient",
          sol_fraction_result: "Answer is a fraction",
          sol_decimal_coeff: "Decimal coefficient",
          sol_combine_like: "Combine like terms first",
          sol_distribute_simple: "Distribute then solve",
          sol_x_both_sides: "Variables on both sides",
          sol_fraction_both: "Add fractions",
          sol_negative_both: "Negative terms on both sides",
          sol_complex_distribute: "Complex distribution",
          sol_nested_parens: "Nested parentheses",
          sol_three_terms: "Three fraction terms",
          sol_decimal_complex: "Decimal with parentheses",
          sol_proportion_eq: "Proportion equation",
          tra_move_constant: "Move constant to right side",
          tra_move_variable: "Move variable term",
          tra_isolate_x: "Isolate x by dividing",
          tra_two_moves: "Two transformation steps",
          tra_negative_move: "Moving negative term",
          tra_collect_terms: "Collect like terms",
          tra_move_both: "Move terms from both sides",
          tra_expand_first: "Expand before moving",
          tra_fraction_clear: "Clear fraction first",
          tra_negative_coeff: "Handle negative coefficient",
          tra_multi_step: "Multiple transformation steps",
          tra_both_expand: "Expand both sides",
          tra_fractions_lcd: "Find LCD for fractions",
          tra_decimal_expand: "Expand decimal expression",
          tra_complex_collect: "Complex term collection",
          tra_nested_complex: "Nested parentheses transformation",
          tra_three_fractions: "Three fractions to combine",
          tra_double_expand: "Double expansion",
          tra_proportion_cross: "Cross multiplication",
          tra_mixed_complex: "Mixed fractions and decimals",
          app_bus_ticket: "Basel BVB bus: Adult ticket costs x CHF. Child ticket is 2 CHF less. If adult ticket is 5 CHF, find x.",
          app_rhine_time: "Rhine Ferry: Crossing takes 2x minutes. Round trip is 10 minutes. Find x.",
          app_age_simple: "Age problem: In 5 years, you'll be 12. How old are you now?",
          app_distance_simple: "Basel to Zurich: Half the distance is 6 km. Find total distance.",
          app_price_discount: "Roche cafeteria: After 10 CHF discount, meal costs 40 CHF. Original price?",
          app_tram_tickets: "Basel tram: 3 adult tickets at x CHF each, plus 2 child tickets at 2 CHF each, total 13 CHF. Find x.",
          app_novartis_samples: "Novartis lab: 5 boxes with x samples each, plus 10 extra samples, total 60. Find x.",
          app_age_sum: "Father and son: Son is x years old, father is 30 years older. Together they are 50. Find son's age.",
          app_rectangle_perimeter: "Basel park: Rectangular garden, length 8m, width x m, perimeter 28m. Find width.",
          app_speed_distance: "Basel to Liestal: Travel 2 hours at x km/h, distance 80 km. Find speed.",
          app_roche_concentration: "Roche lab: Mix 50ml of x% solution with 100ml of 30% solution to get 150ml of 40% solution. Find x.",
          app_consecutive_numbers: "Three consecutive numbers sum to 48. Find the first number.",
          app_work_rate: "Basel construction: Worker A finishes in x hours, Worker B in 6 hours. Together they finish in 2 hours. Find x.",
          app_mixture_problem: "Novartis: Mix x liters of 20% solution with 10 liters of 50% solution to get 30% solution. Find x.",
          app_investment_interest: "Basel bank: Invest x CHF at 5% interest. After 1 year, total is 2100 CHF. Find x.",
          app_train_meeting: "Basel-Zurich trains: Train A at 80 km/h, Train B at 100 km/h, 360 km apart. When do they meet?",
          app_age_ratio: "Age ratio: In 5 years, your age to your brother's age will be 2:3. You're x years old now. Find x.",
          app_compound_mixture: "Roche: Add x liters of pure acid to 20 liters of 30% acid to get 50% solution. Find x.",
          app_boat_current: "Rhine boat: 30 km downstream and back takes 5 hours. Current is 2 km/h. Find boat speed in still water.",
          app_profit_loss: "Basel shop: Sell at 20% profit or 10% loss, difference is 60 CHF. Find cost price."
      }
      },
  sm1_05: {
      back: "Back to Nexus",
      title: "SM1.05 // RATIO LAB",
      difficulty: {
          basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
      },
      next: "Execute Next Sequence",
      check: "Verify",
      correct: "Verified",
      incorrect: "Mismatch",
      ready: "Ready",
      monitor_title: "SM1.05_RATIO_MONITOR",
      footer_left: "SM1.05_RATIO_LAB // NODE: BASEL",
      stages: {
          recipes: "RECIPES",
          percent: "PERCENT",
          mixtures: "MIXTURES"
      },
      labels: {
          ratio: "Ratio",
          proportion: "Proportion",
          percentage: "Percentage",
          concentration: "Concentration",
          solute: "Solute",
          solvent: "Solvent"
      }
      },
  sm2_01: {
          back: "← Back to Nexus",
          back_short: "Back to Nexus",
          title: "SM2.01 // BINOMIAL FACTORY",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          mode_1: "1st Formula: (a+b)²",
          mode_2: "2nd Formula: (a-b)²",
          param_a: "Parameter a",
          param_b: "Parameter b",
          lock: "LOCK PARAMETERS",
          unlock: "UNLOCK PARAMETERS",
          instruction_setup: "Adjust sliders to define lengths a and b.",
          instruction_solve: "Drag and snap areas to fill the target $(a+b)²$.",
          solve_success: "IDENTITY PROVED",
          solve_fail: "AREA MISMATCH",
          terms: {
              a2: "a²",
              b2: "b²",
              ab: "ab",
              target_plus: "(a+b)²",
              target_minus: "(a-b)²",
          },
          scenarios: {
              architect_title: "Scenario A: Garden Extension",
              architect_desc: "Your lakeside garden (a×a) is being extended by b meters on each side. Calculate the new total area.",
              architect_context: "You own a square garden plot by Lake Zurich with side length 'a' meters. The city allows you to extend it by 'b' meters on two sides. To buy the right amount of soil and seeds, you need to know the new total area. Notice: the total area is NOT simply a² + b² — the two rectangular strips and the corner square matter!",
              scrapper_title: "Scenario B: Tile Factory",
              scrapper_desc: "A factory produced tiles in three shapes. Reassemble them into a perfect square.",
              scrapper_context: "A Swiss tile factory produces three types of tiles: one large square (a²), two rectangular strips (a×b each), and one small square (b²). Your job is to verify that these four pieces can be perfectly assembled into a single large square of side (a+b). This proves the binomial identity geometrically.",
              speedster_title: "Scenario C: Mental Math Sprint",
              speedster_desc: "Compute large squares instantly by splitting them into (round + offset)².",
              speedster_context: "In a Swiss math olympiad, you need to square numbers like 103 or 47 in your head. The trick: split 103 into (100+3), then use (a+b)² = a² + 2ab + b² = 10000 + 600 + 9 = 10609. Much faster than multiplying 103×103 directly!",
              voyager_context: "Two square fields share a common boundary. One has side 'a', the other side 'b'. A surveyor measures the combined area vs the individual areas to verify the difference formula (a+b)(a-b) = a² - b².",
              architect_mission: "Task: Calculate the expanded garden area using (a+b)² = a² + 2ab + b².",
              architect_advanced_prompt: "Term Identification & Factoring Practice",
              architect_elite_prompt: "Two-Variable Factoring Challenge",
              scrapper_mission: "Task: Identify a and b from the expanded form and reconstruct the perfect square.",
              speedster_mission: "Task: Break the number into (round ± offset) and use binomial expansion to compute instantly.",
              voyager_mission: "Task: Use the difference of squares formula to find the area difference.",
              elite_mission: "Task: Factor the complex polynomial into binomial product form."
          },
          speedster_hint: "Use binomial expansion (a±b)² to simplify calculation",
          elite_tips_title: "TIPS: Binomial Isolation Strategy",
          elite_tips_target: "Target format:",
          scrapper_step01: "STEP 01: Isolate root (a)",
          active_objective: "Active Mission Objective",
          target_expression: "Target Identity Expression",
          params_config: "00 // Parameters Configuration",
          units: "UNITS",
          tabs: {
              explore: "EXPLORE",
              architect: "GARDEN",
              scrapper: "TILE LAB",
              speedster: "SPRINT",
              voyager: "VOYAGER",
              elite: "ELITE"
          },
          ui: {
              part_1_a2: "Part 1 (a²)",
              part_2_2ab: "Part 2 (2ab)",
              part_3_b2: "Part 3 (b²)",
              identify_root_a: "Identify Root a",
              identify_root_b: "Identify Root b",
              elite_step_1: "Step 1: Isolate Binomial Square",
              elite_step_2: "Step 2: Balance Equation",
              execute_next_sequence: "Next Question",
              continue_operation: "Continue Practice",
              logic_lattice_title: "Logic Lattice // Decomposition",
              logic_architect_step_1: "STEP_01: Distribute outer terms",
              logic_architect_step_2: "STEP_02: Expand partial segments",
              logic_scrapper_step_1: "STEP_01: Isolate root (a)",
              logic_scrapper_step_2: "STEP_02: Verify linear (2ab)",
              logic_voyager_axiom_title: "AXIOM: Conjugate Dualism",
              logic_voyager_axiom_body: "Product of (A+B)(A-B) eliminates linear cross-terms (±AB).",
              logic_voyager_derivation_title: "DERIVATION:",
              link_established: "LINK_ESTABLISHED",
              axiomatic_constraints_title: "Axiomatic Constraints",
              constraints_architect: "The corner 'b²' is the offset required to complete the major quadratic square. Its value is critical for blueprint precision.",
              constraints_scrapper: "Factoring decomposes global entropy back into ordered symbolic structures. Root isolation is the primary objective.",
              constraints_speedster: "Mental approximation relies on binary base decomposition. Shift the problem into a (Base+N)² framework.",
              constraints_elite: "Advanced Refactoring handles multi-dimensional coefficients where C is a composite scaling factor.",
              constraints_voyager: "Identity symmetry requires strict sign adherence. The difference represents the net loss of area in 1D projection.",
              visual_reference_position: "Visual_Reference_Position [FIX_REF.01]",
              status_operational: "STATUS: OPERATIONAL",
              fps: "FPS",
              latency: "LATENCY",
              footer_left: "SM2.01_ALGEBRA_SYNC // NODE: ZURICH",
              verified: "Verified",
              simulating: "Simulating",
              coeff: "Coefficient",
              const: "Constant"
          },
          placeholders: {
              ax: "ax",
              b: "b",
              a_squared: "a²",
              two_ab: "2ab",
              b_squared: "b²",
              cxy: "Cxy",
              v: "V",
              two_cvxy: "2CVxy",
              v_squared: "V²",
              by: "by",
              question: "?"
          },
          decomposition_pattern: "Decomposition Pattern: a² + 2ab + b²"
      },
  sm2_02: {
          back: "Back to Nexus",
          title: "SM2.02 // PYTHAGORAS & ROOTS",
          tabs: {
              pythagoras: "PYTHAGORAS",
              sqrt: "SQUARE ROOT",
              explorer: "EXPLORER LAB",
              quest_mode: "QUEST MODES"
          },
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Target",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          yes: "YES",
          no: "NO",
          monitor_title: "SM2.02_VISUAL_MONITOR",
          footer_left: "SM2.02_SQRT_PYTHAGORAS // NODE: ZURICH",
          input_radical: "Answer as k√m",
          input_k: "k",
          input_m: "m",
          input_number: "Answer",
          pythagoras: {
              solve_hyp: "Fire rescue: Find the ladder length",
              solve_hyp_params: "horizontal distance a={a}m, vertical height b={b}m",
              solve_leg: "Mountain climb: Find the vertical height",
              solve_leg_params: "rope length c={c}m, {known_label} {known_var}={known}m",
              known_horizontal: "horizontal movement",
              known_given: "given",
              check_right: "📐 Engineering check: Is this a right triangle?",
              distance: "🚁 Drone delivery: Calculate flight distance",
              elite_space: " CERN lab: Find the space diagonal",
              explorer_mission: "PYTHAGOREAN EXPLORER: Adjust scale and witness similarity constants.",
              fluid_title: "Fluid Volume Conservation",
              fluid_desc: "Tilt to see A² + B² flow into C². This visualizes area conservation: the geometry sum remains constant."
          },
          sqrt: {
              perfect: "Perfect squares",
              simplify: "Simplify radicals",
              estimate: "Estimate"
          },
          mission: {
              title: "MISSION",
              protocol: "NEXUS PROTOCOL // SWISS NODE LIVE",
              cern_title: "CERN CALIBRATION ARRAY",
              cern_desc: "Calibrate a 16:9 observation array. Height=9s, Width=16s. Find the diagonal.",
              roof_title: "GRINDELWALD SNOW ROOF",
              roof_desc: "Design the snow roof brace with half-span 6m and height 6m.",
              ladder_title: "LUCERNE LADDER DOCK",
              ladder_desc: "A ladder is 5m from the wall and reaches 12m high. Find the ladder length.",
              grid_title: "BASEL GRID DISTANCE",
              grid_desc: "Compute the distance between two navigation nodes on the Basel grid.",
              chain_title: "CERN TRANSFER TUNNEL",
              chain_desc: "A transfer tunnel spans a rectangular bay and rises to a higher platform. Find the full diagonal."
          },
          mental: {
              title: "MENTAL",
              triples: "Pythagorean Triples",
              chain: "Segment Chain"
          }
      },
  sm2_03: {
          back: "Back to Nexus",
          title: "SM2.03 // LINE NAVIGATOR",
          difficulty: {
              basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Target Intercept",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "SM2.03_LASER_MONITOR",
          footer_left: "SM2.03_LINE_NAVIGATOR // NODE: BASEL",
          labels: {
              input: "INPUT",
              hints: "HINTS",
              emitter: "Emitter",
              target: "Target",
              slope: "Cost per km (m)",
              intercept: "Base fare (c)"
          },
          prompts: {
              level1: "Calculate the ticket price for the given destination",
              level2: "Find the distance where two fare plans cost the same",
              level3: "Find the threshold distance where Plan A becomes cheaper"
          },
          hints: {
              level1: "Slope m = cost per km. Intercept c = base fare (standing charge). Total fare y = m × distance + c.",
              level2: "Two fare plans have different m and c. Find the intersection point — that's where they cost the same!",
              level3: "Design the slope and intercept so your plan is cheapest beyond a certain distance.",
              drag: "Adjust the slider to change the slope (cost/km) and intercept (base fare)."
          },
          ui: {
              current_function: "Fare Formula",
              reflections: "Fare Plans",
              target_position: "Destination (km)",
              hit_badge: "FARE MATCHED",
              chamber: "STATION",
              laser_sim: "FARE_CALC",
              level: "LEVEL",
              hits: "Matches"
          },
          mission: {
              title: "SWISS RAILWAY FARE CALCULATOR",
              description: "Model railway ticket prices as linear functions. Slope = cost per km, intercept = base fare. Find the break-even point between fare plans!"
          },
          stages: {
              level1: "LEVEL 1",
              level2: "LEVEL 2",
              level3: "LEVEL 3"
          },
          placeholders: {
              question: "?"
          }
      },
  sm2_04: {
          back: "Back to Nexus",
          title: "SM2.04 // SIMILARITY & SCALING",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Target",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "SM2.04_MONITOR",
          footer_left: "SM2.04_SIMILARITY // NODE: BASEL",
          stages: {
              scale_factor: "SCALE",
              similar_triangles: "SIMILAR",
              application: "APPLY",
              stages_prompt_latex: "Use proportionality to find the missing value."
          },
          labels: {
              input: "INPUT",
              hints: "HINTS"
          },
          hints: {
              rules: {
                  proportional_latex: "\\frac{a}{b}=\\frac{c}{d}",
                  scale_factor_latex: "\\text{Scale factor }k=\\frac{\\text{new}}{\\text{old}}",
                  cross_multiply_latex: "\\text{Cross-multiply to solve for the unknown.}"
              }
          },
          mission: {
              title: "MISSION: SHADOW MEASURE",
              protocol: "NEXUS PROTOCOL // SWISS NODE LIVE",
              tower_title: "ZURICH CLOCK TOWER",
              description: "In Zurich, an architect needs to measure a historic clock tower using its shadow. Similar triangles are the key.",
              ring_title: "LUCERNE OBSERVATION RING",
              ring_desc: "In Lucerne, a concentric sensor ring is cut by a chord touching the inner circle. Find the ring width.",
              labels: {
                  tower: "Clock Tower",
                  tower_shadow: "Tower Shadow",
                  stick: "Stick (1.5m)",
                  stick_shadow: "Stick Shadow",
                  calculate_height: "Calculate Tower Height"
              }
          }
      },
  sm2_05: {
          back: "Back to Nexus",
          title: "SM2.05 // POWERS & ROOTS",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Operation",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "SM2.05_MONITOR",
          footer_left: "SM2.05_POWERS_ROOTS // NODE: BASEL",
          stages: {
              rules: "LAWS",
              negative: "NEGATIVE",
              scientific: "SCI-NOTATION",
              rules_prompt_latex: "\\text{Apply power laws to simplify.}",
              negative_prompt_latex: "\\text{Simplify terms with negative exponents (find n in the denominator).}",
              scientific_prompt_latex: "\\text{Convert to or calculate in scientific notation.}"
          },
          labels: {
              input: "INPUT",
              hints: "HINTS"
          }
      },
  sm2_06: {
          back: "Back to Nexus",
          title: "SM2.06 // LINEAR SYSTEMS",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "System of Equations",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "SM2.06_MONITOR",
          footer_left: "SM2.06_LINEAR_SYSTEMS // NODE: BASEL",
          stages: {
              substitution: "SUBSTITUTION",
              elimination: "ELIMINATION",
              mission: "MISSION",
              substitution_prompt_latex: "\\text{Solve by substitution method.}",
              elimination_prompt_latex: "\\text{Solve by elimination (addition/subtraction).}",
              mission_prompt_latex: "\\text{Translate and solve the word problem.}"
          },
          labels: {
              input: "INPUT",
              hints: "HINTS"
          },
          hints: {
              rules: {
                  substitution_latex: "\\text{Substitute one equation into the other.}",
                  elimination_add_latex: "\\text{Add equations to eliminate a variable.}",
                  elimination_sub_latex: "\\text{Subtract equations to eliminate a variable.}",
                  elimination_multiply_latex: "\\text{Multiply one equation to match coefficients, then eliminate.}"
              }
          },
          mission: {
              apples: "Apples",
              oranges: "Oranges",
              adult: "Adults",
              child: "Children"
          },
          canvas_translations: {
              legend: "LEGEND",
              eq1: "Equation 1",
              eq2: "Equation 2",
              cursor: "Target Cursor",
              locked: "LOCKED",
              view: "VIEW: ORTHOGRAPHIC_2D"
          }
      },
  sm2_07: {
      back: "Back to Nexus",
      title: "SM2.07 // COORDINATE GEOMETRY",
      difficulty: {
          basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
      },
      objective_title: "Active Mission Objective",
      target_title: "Precision Mapping",
      next: "Execute Next Sequence",
      check: "Verify",
      correct: "Verified",
      incorrect: "Mismatch",
      ready: "Ready",
      monitor_title: "SM2.07_COORDINATE_MONITOR",
      footer_left: "SM2.07_COORD_GEOM // NODE: ZURICH",
      labels: {
          input: "INPUT",
          hints: "HINTS",
          distance: "Distance (d)",
          midpoint: "Midpoint (M)",
          slope: "Slope (m)"
      },
      mission: {
          title: "ZURICH NODE MAPPING",
          description: "Zurich coordinate mapping requires precision geometry. Calculate distance, midpoint and slope between city nodes."
      },
      stages: {
          distance: "DISTANCE",
          midpoint: "MIDPOINT",
          slope: "SLOPE",
          distance_prompt_latex: "\\text{Calculate the distance }d\\text{ between points A and B.}",
          midpoint_prompt_latex: "\\text{Calculate the midpoint coordinates }M(x,y).",
          slope_prompt_latex: "\\text{Calculate the slope }m\\text{ of the line passing through A and B.}"
      },
      formulas: {
          distance: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
          midpoint: "M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})",
          slope: "m = \\frac{y_2-y_1}{x_2-x_1}"
      },
      canvas_translations: {
          distance_formula: "Distance Formula",
          midpoint_formula: "Midpoint Formula",
          slope_formula: "Slope Formula",
          line_eq: "Line Equation",
          hide_formula: "Hide Formula",
          show_formula: "Show Formula"
      },
      dynamic_prompts: {
          dist_rev_y: "Distance d=${d}. Find y for B(3,y) (y>0).",
          dist_rev_x: "Distance d=${d}. Find x for B(x,5) (x>1).",
          mid_rev: "M is midpoint. Find B(x,y).",
          collinear: "Points A, B, C are collinear. Find ${target}."
      },
      input_tip_2dp: "Tip: Enter result rounded to 2 decimal places."
      },
  sm2_08: {
      back: "Back to Nexus",
      title: "SM2.08 // PROBABILITY BASICS",
      difficulty: {
          basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
      },
      next: "Execute Next Sequence",
      check: "Verify",
      correct: "Verified",
      incorrect: "Mismatch",
      ready: "Ready",
      monitor_title: "SM2.08_PROBABILITY_MONITOR",
      footer_left: "SM2.08_PROBABILITY // NODE: BASEL",
      formula_title: "PROBABILITY FORMULA",
      scenario_title: "PROBLEM",
      basel_scenario: "BASEL LIFE SCENARIO",
      calculate_title: "CALCULATE",
      answer_title: "YOUR ANSWER",
      solution_title: "SOLUTION",
      stages: {
          basic_prob: "BASIC PROBABILITY",
          lottery: "LOTTERY & GAMES",
          combined: "COMBINED EVENTS",
          data_stats: "DATA STATISTICS"
      },
      scenarios: {
          bus_punctuality: "Basel Public Transport: You take the #8 bus to school every day.",
          weather_basel: "Basel Weather Station: Meteorological data for decision making.",
          school_cafeteria: "School Cafeteria: Weekly menu planning.",
          exam_results: "Class Performance: Exam results analysis.",
          dice_game: "Probability Game: Understanding fair dice.",
          card_game: "Card Game: Standard 52-card deck.",
          dice_advanced: "Advanced Dice: Prime numbers and special outcomes.",
          school_raffle: "School Charity Raffle: Supporting local community.",
          fasnacht_game: "Basel Fasnacht Carnival: Game booth at the festival.",
          swiss_lotto_simple: "Swiss Lotto Simplified: Understanding lottery odds (6 choose 3).",
          dice_win_condition: "Carnival Dice Game: Win on sum of 7 or 11.",
          two_buses: "Daily Commute: Morning and evening bus reliability.",
          fc_basel: "FC Basel Matches: Home and away game predictions.",
          novartis_qc: "Novartis Quality Control: Pharmaceutical sample testing.",
          three_events: "Multiple Coin Flips: Understanding combinations.",
          temperature: "Basel Weather: Weekly temperature tracking.",
          test_scores: "Class Grades: Statistical analysis of exam results.",
          pocket_money: "Personal Finance: Monthly spending breakdown.",
          data_comparison: "Data Analysis: Comparing mean and median.",
          tram_punctuality: "Basel Tram System: Tram #3 reliability.",
          coin_flip: "Coin Flip: Basic probability experiment.",
          dice_two: "Two Dice: Understanding combined outcomes.",
          two_coins: "Two Coins: Independent events.",
          three_buses: "Three Bus Lines: Multiple independent events.",
          four_buses: "Four Bus Lines: Extended probability chains.",
          complex_event: "Complex Probability: Advanced scenarios.",
      },
      problems: {
          bus_ontime_16_20: "In the past 20 days, the bus arrived on time 16 times. What is the probability it arrives on time tomorrow?",
          bus_ontime_18_20: "In the past 20 days, the bus arrived on time 18 times. What is the probability it arrives on time tomorrow?",
          weather_rain_12_30: "Basel weather station recorded rain on 12 out of 30 days. What is the probability of rain this weekend?",
          weather_sunny_21_30: "Basel weather station recorded sunny weather on 21 out of 30 days. What is the probability of sunny weather tomorrow?",
          dice_roll_3: "Roll a standard die. What is the probability of rolling exactly a 3?",
          coin_heads: "Flip a fair coin once. What is the probability of getting heads?",
          cafeteria_pizza: "The school cafeteria serves pizza 3 days out of 5 each week. If you randomly go to the cafeteria, what is the probability of getting pizza?",
          exam_pass: "In a class of 100 students, 85 passed the exam. What is the probability a randomly selected student passed?",
          tram_ontime_17_20: "Tram #3 arrived on time 17 out of 20 days. What is the probability it arrives on time today?",
          dice_greater_4: "Roll a die. What is the probability of rolling a number greater than 4?",
          dice_even: "Roll a standard die. What is the probability of rolling an even number (2, 4, or 6)?",
          card_heart: "Draw one card from a standard 52-card deck. What is the probability of drawing a heart?",
          card_red: "Draw one card from a standard deck. What is the probability of drawing a red card?",
          two_dice_sum_8: "Roll two dice. What is the probability the sum equals 8?",
          card_face: "Draw one card. What is the probability of drawing a face card (J, Q, or K)?",
          dice_prime: "Roll a die. What is the probability of rolling a prime number (2, 3, or 5)?",
          two_dice_sum_10: "Roll two dice. What is the probability the sum equals 10?",
          card_ace_or_king: "Draw one card. What is the probability of drawing an Ace or King?",
          two_dice_doubles: "Roll two dice. What is the probability of rolling doubles (same number on both)?",
          card_spade_face: "Draw one card. What is the probability of drawing a spade face card?",
          school_raffle_win: "The school sold 100 raffle tickets for charity. You bought 3 tickets. What is the probability you win?",
          school_raffle_5_tickets: "The school sold 100 raffle tickets. You bought 5 tickets. What is the probability you win?",
          coin_two_heads: "Flip two coins. What is the probability both are heads?",
          dice_not_six: "Roll a die. What is the probability of NOT rolling a 6?",
          school_raffle_2_tickets: "The school sold 50 raffle tickets. You bought 2 tickets. What is the probability you win?",
          dice_sum_7: "Roll two dice at the Basel Fasnacht game booth. What is the probability the sum equals 7?",
          dice_sum_9: "Roll two dice. What is the probability the sum equals 9?",
          coin_three_all_heads: "Flip three coins. What is the probability all three are heads?",
          dice_sum_6: "Roll two dice. What is the probability the sum equals 6?",
          card_two_red: "Draw two cards without replacement. What is the probability both are red?",
          lotto_simple: "Simplified Swiss Lotto: Choose 3 numbers from 6. There are 20 possible combinations. What is your winning probability?",
          lotto_4_from_8: "Simplified lottery: Choose 4 numbers from 8. There are 70 combinations. What is your winning probability?",
          dice_sum_less_5: "Roll two dice. What is the probability the sum is less than 5?",
          coin_four_at_least_3_heads: "Flip four coins. What is the probability of getting at least 3 heads?",
          card_three_hearts: "Draw three cards without replacement. What is the probability all three are hearts?",
          dice_sum_7_or_11: "Carnival game: Roll two dice. You win if the sum is 7 OR 11. What is the probability of winning?",
          dice_sum_2_3_12: "Carnival game: Roll two dice. You lose if the sum is 2, 3, or 12. What is the probability of losing?",
          lotto_5_from_10: "Lottery: Choose 5 numbers from 10. There are 252 combinations. What is your winning probability?",
          coin_five_exactly_2_heads: "Flip five coins. What is the probability of getting exactly 2 heads?",
          card_poker_pair: "Draw 5 cards. What is the probability of getting at least one pair? (Simplified: approximately 42.3%)",
          two_buses_ontime: "Morning bus #8 has 80% on-time rate. Evening bus #15 has 70% on-time rate. What is the probability both are on time?",
          two_coins_both_heads: "Flip two coins. What is the probability both are heads?",
          two_dice_both_even: "Roll two dice. What is the probability both show even numbers?",
          two_days_both_sunny: "Basel has 70% sunny days. What is the probability both today and tomorrow are sunny?",
          two_students_both_pass: "Two students take an exam with 85% pass rate. What is the probability both pass?",
          fc_basel_wins: "FC Basel has 60% home win rate and 30% away win rate. What is the probability they win both matches this week?",
          three_buses_all_ontime: "Three buses have on-time rates of 80%, 75%, and 90%. What is the probability all three are on time?",
          three_days_all_sunny: "Basel has 70% sunny days. What is the probability the next 3 days are all sunny?",
          three_dice_all_six: "Roll three dice. What is the probability all three show 6?",
          fc_basel_at_least_one_win: "FC Basel has 60% home win rate and 30% away win rate. What is the probability they win at least one match?",
          quality_all_pass: "Novartis quality control: Each sample has 95% pass rate. If you test 5 samples, what is the probability all 5 pass?",
          quality_at_least_4_pass: "Novartis: 5 samples, 95% pass rate each. What is the probability at least 4 pass?",
          four_buses_all_ontime: "Four buses each have 80% on-time rate. What is the probability all four are on time?",
          week_no_rain: "Basel has 40% rain probability daily. What is the probability of no rain for 7 consecutive days?",
          five_students_all_pass: "Five students take an exam with 85% pass rate. What is the probability all five pass?",
          three_coins_two_heads: "Flip three coins. What is the probability of getting exactly 2 heads?",
          four_coins_exactly_3_heads: "Flip four coins. What is the probability of getting exactly 3 heads?",
          quality_exactly_4_pass: "Novartis: 5 samples, 95% pass rate each. What is the probability exactly 4 pass?",
          five_coins_at_least_4_heads: "Flip five coins. What is the probability of getting at least 4 heads?",
          birthday_paradox_simple: "Two people: What is the probability they share the same birthday? (Ignore leap years)",
          avg_temperature: "Basel temperatures this week: 18°C, 22°C, 20°C, 19°C, 21°C, 23°C, 20°C. Calculate the average temperature.",
          simple_average_5: "Test scores: 80, 85, 90, 75, 95. Calculate the average.",
          simple_sum: "Monthly spending: Food CHF 40, Transport CHF 25, Entertainment CHF 20, Savings CHF 15. What is the total?",
          avg_temperature_5_days: "Temperatures: 15°C, 18°C, 20°C, 17°C, 20°C. Calculate the average.",
          median_5_values: "Data set: 10, 12, 15, 18, 20. Find the median value.",
          class_average: "Class test scores: 85, 72, 90, 68, 78, 82, 75, 88, 70, 92. Calculate the class average.",
          spending_analysis: "Monthly spending: Food CHF 40, Transport CHF 25, Entertainment CHF 20, Savings CHF 15. What percentage is spent on food?",
          median_even_count: "Test scores: 70, 75, 80, 85. Find the median.",
          range_calculation: "Weekly temperatures: 15°C, 18°C, 20°C, 17°C, 23°C. Calculate the range (max - min).",
          percentage_transport: "Monthly budget CHF 100: Food CHF 40, Transport CHF 25, Entertainment CHF 20, Savings CHF 15. What percentage is transport?",
          weighted_average: "Two tests: Test 1 (weight 2): 80 points, Test 2 (weight 3): 90 points. Calculate weighted average.",
          median_vs_mean: "Data set: 10, 12, 15, 18, 20. Find the median value.",
          mode_calculation: "Test scores: 80, 85, 85, 90, 85, 75. Find the mode (most frequent value).",
          budget_remaining: "Monthly budget CHF 100. Spent: Food CHF 40, Transport CHF 25, Entertainment CHF 20. How much remains?",
          quartile_calculation: "Temperatures: 15°C, 17°C, 18°C, 20°C, 23°C. Find Q1 (25th percentile).",
          standard_deviation_simple: "Data: 10, 15, 20. Mean = 15. Calculate variance: average of squared deviations.",
          outlier_effect: "Data: 10, 12, 15, 18, 100. Calculate the mean. Notice how the outlier (100) affects it.",
          interquartile_range: "Data: 10, 15, 20, 25, 30. Q1=15, Q3=25. Calculate IQR = Q3 - Q1.",
          percentage_change: "Last month: CHF 100. This month: CHF 120. Calculate percentage change.",
          correlation_direction: "As study time increases, test scores increase. Is the correlation positive (1) or negative (-1)?",
      }
      },
  sm3_01: {
          back: "Back to Nexus",
          title: "SM3.01 // QUADRATIC EQUATIONS",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Target Equation",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "SM3.01_MONITOR",
          footer_left: "SM3.01_QUADRATICS // NODE: ZURICH",
          stages: {
              terms: "TERMS",
              factorize: "FACTORIZE",
              fractions: "FRACTIONS",
              equations: "EQUATIONS",
              terms_prompt_latex: "\\text{Simplify the expression (combine like terms).}",
              factor_prompt_latex: "\\text{Factorize the expression (show a product form).}",
              fractions_prompt_latex: "\\text{Simplify the fraction.}",
              equations_prompt_latex: "\\text{Solve the equation step by step.}"
          },
          modes: {
              factor: "FACTOR",
              formula: "FORMULA",
              complete_square: "COMPLETE SQUARE",
              factor_prompt: "Factorize first: find A,B so that (x+A)(x+B)=0.",
              formula_prompt: "Solve with the quadratic formula.",
              complete_square_prompt: "Convert to vertex form and identify (h,k)."
          },
          labels: {
              input: "INPUT",
              numerator: "NUMERATOR",
              denominator: "DENOMINATOR",
              hints: "HINTS",
              roots: "Solutions x₁, x₂",
              vertex: "Vertex (h,k)",
              factor: "Factoring",
              factor_slots: "Build factors (A,B)",
              formula: "Quadratic Formula",
              complete_square: "Completing the Square",
              elite_hint_latex: "Hint: \\; x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}",
              fraction_hint: "Tip: Enter result as an integer or fraction (e.g. 4/3)."
          },
          hints: {
              identities: {
                  trinomial_expand_latex: "(x+A)(x+B)=x^2+(A+B)x+AB",
                  diff_squares_latex: "u^2-v^2=(u-v)(u+v)"
              },
              rules: {
                  factor_common_latex: "\\text{Factor out the common factor.}",
                  cancel_common_latex: "\\text{Factor numerator/denominator, then cancel the common factor.}",
                  simplify_both_sides_latex: "\\text{Simplify both sides step by step.}",
                  square_root_pm_latex: "\\text{Take square roots with }\\pm\\text{.}",
                  zero_product_latex: "\\text{If }pq=0\\text{ then }p=0\\text{ or }q=0."
              }
          }
      },
  sm3_02: {
          back: "Back to Nexus",
          title: "SM3.02 // TRIG CIRCLE",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Trigonometric Values",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "SM3.02_TRIG_MONITOR",
          footer_left: "SM3.02_TRIG_CIRCLE // NODE: BASEL",
          labels: {
              angle: "ANGLE (θ)",
              values: "TRIGONOMETRIC VALUES",
              display: "DISPLAY OPTIONS",
              show_waves: "Show Wave Functions",
              formulas: "FORMULAS",
              special_angles: "SPECIAL ANGLES",
              exact_value: "EXACT VALUE",
              decimal_value: "DECIMAL",
              quadrant: "QUADRANT"
          },
          mission: {
              title: "MISSION: UNIT CIRCLE",
              description: "Master the unit circle and trigonometric functions. Understand sin, cos, and tan relationships."
          },
          stages: {
              unit_circle: "UNIT CIRCLE",
              projections: "PROJECTIONS",
              waves: "WAVE FUNCTIONS",
              unit_circle_desc: "Explore the unit circle and angle rotation",
              projections_desc: "Understand sine and cosine as projections",
              waves_desc: "Visualize sine and cosine as wave functions",
              unit_circle_hint: "Point on circle: (cos θ, sin θ)",
              projections_hint: "sin = y-projection, cos = x-projection",
              waves_hint: "Sine and cosine create periodic waves",
              unit_circle_prompt_latex: "\\text{Determine the quadrant or sign.}",
              projections_prompt_latex: "\\text{Calculate the exact trigonometric value.}",
              waves_prompt_latex: "\\text{Find the amplitude or period.}"
          }
      },
  sm3_03: {
          back: "Back to Nexus",
          title: "SM3.03 // GROWTH & LOGS",
          difficulty: {
              basic: "BASIC",
              core: "CORE",
              advanced: "ADVANCED",
              elite: "ELITE"
          },
          objective_title: "Active Mission Objective",
          target_title: "Exponential Growth",
          next: "Execute Next Sequence",
          check: "Verify",
          correct: "Verified",
          incorrect: "Mismatch",
          ready: "Ready",
          monitor_title: "SM3.03_GROWTH_MONITOR",
          footer_left: "SM3.03_EXPONENTIAL // NODE: BASEL",
          labels: {
              input: "INPUT",
              hints: "HINTS",
              population: "Population (N)",
              time: "Time (t)",
              doubling_time: "Doubling Time (d)",
              initial: "Initial Count (N₀)",
              formula_ref: "FORMULA REFERENCE",
              parameters: "CURRENT PARAMETERS",
              growth_rate: "Growth Rate (k)",
              half_life: "Half-life",
              principal: "Principal (P)",
              rate: "Interest Rate (r)"
          },
          hints: {
              exp_rule1: "Each doubling multiplies the population by 2",
              exp_rule2: "After n doublings: N = N₀ × 2ⁿ",
              log_rule1: "log₂(2ⁿ) = n",
              log_rule2: "Change of base: logₐ(x) = ln(x)/ln(a)",
              app_rule1: "Half-life: N(t) = N₀ × (½)^(t/h)",
              app_rule2: "Compound interest: A = P(1+r)^t"
          },
          input_tip: "Tip: Enter result as integer or rounded to 1 decimal place.",
          mission: {
              title: "BACTERIAL GROWTH LAB",
              description: "Novartis biolab requires exponential growth modeling. Calculate bacterial populations and logarithmic scales."
          },
          stages: {
              exponential: "EXPONENTIAL",
              logarithm: "LOGARITHM",
              applications: "APPLICATIONS",
              exponential_prompt_latex: "\\text{Calculate population using }N(t)=N_0\\cdot 2^{t/d}.",
              logarithm_prompt_latex: "\\text{Solve for time using logarithms.}",
              applications_prompt_latex: "\\text{Apply exponential models to real scenarios.}",
              exp_basic_prompt: "\\text{Calculate the population at time } t.",
              exp_advanced_prompt: "\\text{Find the number of doublings.}",
              exp_elite_prompt: "\\text{Find the continuous growth rate } k.",
              log_basic_prompt: "\\text{Solve for time using } t = d \\cdot \\log_2(N/N_0).",
              log_core_prompt: "\\text{Evaluate the logarithm.}",
              log_advanced_prompt: "\\text{Use the change of base formula.}",
              log_elite_prompt: "\\text{Solve the logarithmic equation.}",
              app_half_prompt: "\\text{Calculate remaining quantity after half-life decay.}",
              app_compound_prompt: "\\text{Calculate compound interest: } A=P(1+r)^t.",
              app_rate_prompt: "\\text{Find the growth rate from data.}",
              app_ph_prompt: "\\text{Calculate pH from hydrogen ion concentration.}"
          },
          formulas: {
              exponential: "N(t) = N_0 \\cdot 2^{t/d}",
              logarithm: "t = d \\cdot \\log_2(N/N_0)",
              applications: "N(t) = N_0 \\cdot e^{kt}"
          },
          scenarios: {
              exp_bac: "🦠 SCENARIO: Novartis Lab Bacterial Culture — A research team at Novartis in Basel is studying bacterial growth. They place 100 bacteria in a petri dish at 8:00 AM. Under optimal conditions, the bacteria population doubles every 20 minutes. The lab needs to predict when the population will reach 10,000 to harvest samples at the right moment. Your task: calculate the population at any given time using exponential growth.",
              exp_social: "📱 SCENARIO: TikTok Challenge Goes Viral — Your friend posts a dance challenge video at noon. Initially, 50 people watch it. Every hour, each viewer shares it with 2 friends who haven't seen it yet (doubling effect). By evening, the view count explodes exponentially. The school principal wants to know: at what time will 10,000 students have seen it? This models real viral spread on social media.",
              exp_virus: "🦠 SCENARIO: School Flu Outbreak Modeling — It's Monday morning. 3 students in your school of 1,200 have the flu. Health authorities know that without intervention, each infected person spreads the flu to 2 others every 2 days (doubling time = 2 days). The school nurse needs to predict: how many will be sick by Friday? When will 100 students be infected? This helps decide whether to close the school.",
              exp_moore: "💻 SCENARIO: Smartphone Performance Prediction — In 2000, your dad's Nokia phone had 4 MB of RAM. According to Moore's Law, computing power doubles roughly every 2 years. Your current iPhone has 8 GB (8,000 MB) of RAM. Question: how many 'doublings' occurred between 2000 and 2024? Can you verify Moore's Law held true? This exponential growth drives all modern technology.",
              log_invest: "💰 SCENARIO: Your Pocket Money Investment Plan — You saved 1,000 CHF from birthday gifts. Your parents offer a deal: they'll act as your 'bank' and pay 8% annual interest, compounded yearly (meaning each year, you earn interest on your previous interest too). You want to buy a gaming PC that costs 2,000 CHF. Question: how many years until your money doubles? Use logarithms to solve: t = log₂(2000/1000) / log₂(1.08). This is how real investment planning works!",
              log_sound: "🔊 SCENARIO: School Concert Sound Check — The music teacher is setting up for the school concert. A whisper measures 30 dB, normal conversation is 60 dB, and a rock concert is 120 dB. But here's the trick: the decibel scale is logarithmic! 60 dB isn't 'twice as loud' as 30 dB — it's actually 1,000 times more intense (because 10^(60/10) / 10^(30/10) = 1,000). Your task: if the current sound level is 80 dB and the safe limit is 85 dB, how many times more intense can the sound get before it's unsafe?",
              log_ph: "🧪 SCENARIO: Chemistry Lab pH Testing — In chemistry class, you're testing the pH of different liquids. Lemon juice has pH 2, water has pH 7, and soap has pH 12. Your teacher explains: pH is a logarithmic scale measuring hydrogen ion concentration [H⁺]. pH = -log₁₀[H⁺]. This means pH 2 is 100,000 times more acidic than pH 7 (not just '5 units more')! Question: if a solution has [H⁺] = 0.001 mol/L, what's its pH? Is it acidic or basic?",
              log_security: "🔐 SCENARIO: Password Cracking Time — Your IT teacher explains password security. A 4-digit PIN (0000-9999) has 10,000 combinations. A hacker's computer can try 1,000 passwords per second, so it takes 10 seconds to crack. But if you use an 8-character password with letters and numbers (62 options per character), there are 62^8 = 218 trillion combinations! At 1 billion tries per second, it takes 218,000 seconds (2.5 days). Question: how many characters needed for 1 year of protection? Use logarithms to solve: n = log₆₂(seconds × tries_per_second).",
              app_med: "💊 SCENARIO: Medicine Dosage Timing — Your doctor prescribes a painkiller. You take 400 mg at 8:00 AM. The drug has a half-life of 6 hours, meaning every 6 hours, half of it is eliminated from your body. At 2:00 PM (6 hours later), 200 mg remains. At 8:00 PM, 100 mg remains. The doctor says the drug stops working below 50 mg. Question: at what time can you safely take the next dose? Use the formula: N(t) = N₀ × (1/2)^(t/6).",
              app_bank: "🏦 SCENARIO: Comparing Savings Accounts — You have 5,000 CHF to save for university. Bank A offers 3% simple interest (you earn 150 CHF per year, always). Bank B offers 3% compound interest (each year, you earn interest on your interest too). After 10 years: Bank A gives you 5,000 + 10×150 = 6,500 CHF. Bank B gives you 5,000 × (1.03)^10 = 6,720 CHF. Question: after how many years does Bank B give you 1,000 CHF more than Bank A? Use exponential equations to solve!",
              app_pop: "🏙️ SCENARIO: Zurich Population Growth — In 2000, Zurich had 340,000 residents. The city grows at 1.2% per year (exponential growth). By 2020, the population reached 420,000. Urban planners need to predict: when will Zurich reach 500,000? This determines when to build new schools, trams, and housing. Use the formula: P(t) = P₀ × (1.012)^t. Solve for t when P(t) = 500,000.",
              app_carbon: "🦴 SCENARIO: Archaeological Dating — Archaeologists find a wooden tool in a Swiss cave. All living things contain Carbon-14 (¹⁴C), which decays with a half-life of 5,730 years. When the tree died, it stopped absorbing new ¹⁴C. By measuring how much ¹⁴C remains, scientists can calculate the age. If the tool has 25% of the original ¹⁴C, how old is it? Use: 0.25 = (1/2)^(t/5730). Solve for t using logarithms. This is how we know the age of ancient artifacts!"
          }
      },
  sm3_04: {
      back: "Back to Nexus",
      title: "SM3.04 // LOGARITHMIC SCALES",
      difficulty: {
          basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
      },
      objective_title: "Active Mission Objective",
      target_title: "Logarithmic Measurement",
      next: "Execute Next Sequence",
      check: "Verify",
      correct: "Verified",
      incorrect: "Mismatch",
      ready: "Ready",
      monitor_title: "SM3.04_LOG_MONITOR",
      footer_left: "SM3.04_LOGARITHMS // NODE: BASEL",
      input_tip_2dp: "Tip: Enter result rounded to 2 decimal places.",
      labels: {
          input: "INPUT",
          hints: "HINTS",
          ph: "pH Value",
          decibel: "Decibels (dB)",
          richter: "Richter Scale"
      },
      mission: {
          title: "LOGARITHMIC MEASUREMENT LAB",
          description: "Master three real-world logarithmic scales: pH (chemistry), decibels (sound), and Richter (earthquakes). Each scale compresses huge ranges into manageable numbers."
      },
      stages: {
          ph: "pH SCALE",
          decibel: "DECIBELS",
          richter: "RICHTER",
          ph_prompt_latex: "\\text{Calculate pH using }pH=-\\log_{10}[H^+].",
          decibel_prompt_latex: "\\text{Calculate decibels using }L=10\\log_{10}(I/I_0).",
          richter_prompt_latex: "\\text{Calculate magnitude using }M=\\log_{10}(A).",
          decibel_reduction: "Calculate decibel reduction: L_1 - L_2",
          magnitude_difference: "Calculate magnitude difference: M_1 - M_2"
      },
      formulas: {
          ph: "pH = -\\log_{10}[H^+]",
          decibel: "L = 10\\log_{10}(I/I_0)",
          richter: "M = \\log_{10}(A)"
      },
      scenarios: {
          ph_basic: "🧪 SCENARIO: School Chemistry Lab — Your chemistry teacher gives you a clear liquid to test. You use a pH meter and find the hydrogen ion concentration [H⁺] = 0.001 mol/L (which is 10⁻³ in scientific notation). To report the acidity properly, you need to calculate the pH value. Remember: pH = -log₁₀[H⁺]. A pH below 7 is acidic, pH 7 is neutral (pure water), and above 7 is basic. This liquid turns out to be lemon juice!",
          ph_core: "🧪 SCENARIO: Swimming Pool Water Quality — You work part-time at the Basel public pool. The health inspector requires daily pH testing. Today's water sample shows [H⁺] = 10⁻⁸ mol/L. You need to calculate the pH to verify it's in the safe range (7.2-7.8). If pH is too low (acidic), it irritates swimmers' eyes. If too high (basic), chlorine doesn't work properly. Your calculation determines whether the pool can open today!",
          ph_advanced: "🧪 SCENARIO: Pharmaceutical Quality Control — You're an intern at Roche in Basel. A new drug formulation must have precise pH control for stability. The lab measures [H⁺] = 3.16 × 10⁻⁵ mol/L. Calculate the pH to 2 decimal places. If pH drifts outside the target range (4.3-4.7), the entire batch (worth millions) must be discarded. Logarithmic precision matters in pharma!",
          ph_elite: "🧪 SCENARIO: Environmental Acid Rain Study — University of Basel researchers are studying acid rain effects on Swiss forests. Rainwater samples show [H⁺] = 10⁻⁴·⁵ mol/L (note the fractional exponent!). Calculate the pH. Normal rain is pH 5.6, but acid rain can be pH 4.0 or lower. Each pH unit represents a 10× change in acidity, so pH 4 rain is 100× more acidic than pH 6 rain. Your calculation helps assess environmental damage.",
          decibel_basic: "🔊 SCENARIO: School Library Noise Check — The librarian asks you to measure if the study area is quiet enough. You use a sound meter: the intensity is I = 10⁻¹⁰ W/m². The reference intensity (threshold of hearing) is I₀ = 10⁻¹² W/m². Calculate the sound level in decibels using L = 10·log₁₀(I/I₀). For reference: whisper = 30 dB, normal conversation = 60 dB, library should be under 40 dB.",
          decibel_core: "🔊 SCENARIO: Concert Sound Engineer — You're setting up for a school rock concert in the auditorium. The sound system produces intensity I = 10⁻⁴ W/m² at the front row. Calculate the decibel level. Safety regulations require ear protection above 85 dB, and prolonged exposure above 100 dB causes hearing damage. Your calculation determines whether you need to reduce the volume or provide earplugs to the audience.",
          decibel_advanced: "🔊 SCENARIO: Airport Noise Pollution Study — Basel-Mulhouse Airport is expanding, and residents complain about noise. You measure a jet taking off: I = 1 W/m² at 100 meters distance. Calculate the decibel level. City regulations limit airport noise to 65 dB during daytime. At 120 dB (jet engine), sound is painful. The logarithmic scale means 120 dB is not 'twice as loud' as 60 dB — it's 1,000,000 times more intense!",
          decibel_elite: "🔊 SCENARIO: Acoustic Engineering Challenge — A Basel concert hall is being designed. The architect needs to calculate sound absorption. If the original intensity is I₁ = 10⁻³ W/m² and after acoustic panels it drops to I₂ = 10⁻⁶ W/m², what's the decibel reduction? Calculate L₁ - L₂. This involves understanding that decibel differences represent intensity ratios: a 10 dB drop means 10× less intense, 20 dB drop means 100× less intense.",
          richter_basic: "🌍 SCENARIO: Earthquake Monitoring Station — You volunteer at University of Basel's seismology lab. A small earthquake hits near Basel. The seismograph records ground motion amplitude A = 100 micrometers. Calculate the Richter magnitude using M = log₁₀(A). For reference: M < 2 is not felt, M 3-4 is minor, M 5-6 is moderate, M 7+ is major. Your calculation helps classify the earthquake severity.",
          richter_core: "🌍 SCENARIO: Historical Earthquake Analysis — In 1356, Basel experienced Switzerland's strongest recorded earthquake. Modern analysis estimates the ground amplitude was A = 100,000 micrometers. Calculate the Richter magnitude. Compare this to the 2011 Japan earthquake (M 9.0) which had amplitude 1,000,000,000 micrometers. The logarithmic scale compresses this billion-fold range into manageable numbers (1 to 9).",
          richter_advanced: "🌍 SCENARIO: Earthquake Early Warning System — Switzerland is developing an earthquake alert app. Two earthquakes occur: Earthquake A has amplitude 31,600 μm, Earthquake B has amplitude 1,000 μm. Calculate both magnitudes to 2 decimal places. The app needs to distinguish between 'minor tremor' (M < 4.0) and 'significant quake' (M ≥ 4.0) to decide whether to send emergency alerts to millions of phones.",
          richter_elite: "🌍 SCENARIO: Seismic Energy Comparison — Advanced seismology: The energy released by an earthquake increases by 31.6× for each magnitude unit. If Earthquake A is M 5.0 and Earthquake B is M 7.0, how many times more energy does B release? First, understand that M 7.0 means amplitude is 100× larger than M 5.0 (because 10² = 100). But energy scales as amplitude^1.5, so energy ratio is 100^1.5 = 1,000×. This is why M 7 quakes are catastrophic while M 5 are just 'moderate'."
      },
      canvas: {
          ph_title: "pH SCALE",
          ph_formula: "pH = -log₁₀[H⁺]",
          decibel_title: "DECIBEL SCALE",
          decibel_formula: "L = 10·log₁₀(I/I₀)",
          richter_title: "RICHTER SCALE",
          richter_formula: "M = log₁₀(A)",
          ph_subtitle: "Acidity",
          decibel_subtitle: "Sound",
          richter_subtitle: "Earthquake",
          status_chamber: "CHAMBER",
          status_sim: "LOG_SCALE_SIM: ACTIVE",
          status_mode: "MODE"
      }
      },
};
