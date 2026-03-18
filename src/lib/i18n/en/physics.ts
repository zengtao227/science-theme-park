/**
 * EN - PHYSICS translations
 * COMPLETE VERSION - Reorganized from Git history assets.
 * Aligning with Basel Sek 3 (SP3.01 - SP3.08) while preserving all legacy global modules.
 */

export const enPhysics = {


        /* SP1.01_DATA_START */
        sp1_01: {
                "title": "SP1.01 // Forces Basics",
                "back": "Back",
                "check": "Verify Force",
                "next": "Next Task",
                "correct": "Models Match",
                "incorrect": "Deviation",
                "monitor_title": "VECTOR SCAN",
                "difficulty": {
                        "basic": "Basic",
                        "core": "Core",
                        "advanced": "Advanced",
                        "elite": "Elite"
                },
                "stages": {
                        "concepts": "Concepts",
                        "composition": "Composition",
                        "equilibrium": "Equilibrium"
                },
                "labels": {
                        "answer": "Answer",
                        "select": "Select",
                        "value": "Value",
                        "progress": "Progress",
                        "previous": "Previous",
                        "skip": "Skip"
                },
                "placeholders": {
                        "ellipsis": "...",
                        "decimal": "0.0"
                },
                "SP1.01.001": {
                        "prompt": "What is a force?",
                        "feedback": {
                                "correct": "Correct! A force is a push or pull that can change motion.",
                                "incorrect": "Not quite. Think about what happens when you push or pull something."
                        },
                        "options": [
                                { "id": "A", "text": "A push or pull that can change an object's motion" },
                                { "id": "B", "text": "A form of energy" },
                                { "id": "C", "text": "A type of speed" },
                                { "id": "D", "text": "A measure of mass" }
                        ],
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": ""
                },
                "SP1.01.002": {
                        "prompt": "What is the SI unit of force?",
                        "feedback": {
                                "correct": "Correct! The Newton (N) is the SI unit of force.",
                                "incorrect": "The SI unit of force is the Newton (N)."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.003": {
                        "prompt": "Convert 5000 N to kN.",
                        "feedback": {
                                "correct": "Excellent! 5000 N = 5 kN",
                                "incorrect": "Remember: 1 kN = 1000 N"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "kN"
                },
                "SP1.01.004": {
                        "prompt": "Convert 2.5 MN to N.",
                        "feedback": {
                                "correct": "Perfect! 2.5 MN = 2,500,000 N",
                                "incorrect": "Remember: 1 MN = 1,000,000 N"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.005": {
                        "prompt": "What are the three elements that define a force?",
                        "feedback": {
                                "correct": "Correct! A force has magnitude, direction, and point of application.",
                                "incorrect": "A force is defined by its magnitude, direction, and point of application."
                        },
                        "options": [
                                { "id": "A", "text": "Magnitude, direction, and point of application" },
                                { "id": "B", "text": "Mass, acceleration, and velocity" },
                                { "id": "C", "text": "Time, distance, and displacement" },
                                { "id": "D", "text": "Energy, work, and power" }
                        ],
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": ""
                },
                "SP1.01.006": {
                        "prompt": "A force of 50 N acts on an object. What is the magnitude of this force?",
                        "feedback": {
                                "correct": "Correct! The magnitude is 50 N.",
                                "incorrect": "The magnitude is the numerical value: 50 N."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.007": {
                        "prompt": "Convert 750 kN to MN.",
                        "feedback": {
                                "correct": "Great! 750 kN = 0.75 MN",
                                "incorrect": "Remember: 1000 kN = 1 MN"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "MN"
                },
                "SP1.01.008": {
                        "prompt": "A book rests on a table. If the book weighs 20 N, what is the magnitude of the normal force from the table?",
                        "feedback": {
                                "correct": "Correct! The normal force equals the weight: 20 N.",
                                "incorrect": "The table pushes up with the same force as the book's weight."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.009": {
                        "prompt": "Convert 0.025 MN to kN.",
                        "feedback": {
                                "correct": "Excellent! 0.025 MN = 25 kN",
                                "incorrect": "Remember: 1 MN = 1000 kN"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "kN"
                },
                "SP1.01.010": {
                        "prompt": "You push a box with a force of 100 N to the right. What is the direction of the force?",
                        "feedback": {
                                "correct": "Correct! The force is directed to the right.",
                                "incorrect": "The direction is to the right (0 degrees from horizontal)."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": ""
                },
                "SP1.01.011": {
                        "prompt": "Convert 3500 N to kN.",
                        "feedback": {
                                "correct": "Perfect! 3500 N = 3.5 kN",
                                "incorrect": "Divide by 1000 to convert N to kN."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "kN"
                },
                "SP1.01.012": {
                        "prompt": "A force acts vertically upward. What angle does it make with the horizontal?",
                        "feedback": {
                                "correct": "Correct! Vertical upward is 90 degrees from horizontal.",
                                "incorrect": "Vertical upward is perpendicular to horizontal: 90 degrees."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "degrees"
                },
                "SP1.01.013": {
                        "prompt": "Convert 1.2 MN to N.",
                        "feedback": {
                                "correct": "Great! 1.2 MN = 1,200,000 N",
                                "incorrect": "Multiply by 1,000,000 to convert MN to N."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.014": {
                        "prompt": "Two people push a car. Person A applies 200 N and Person B applies 150 N in the same direction. What is the total force?",
                        "feedback": {
                                "correct": "Correct! 200 N + 150 N = 350 N",
                                "incorrect": "Add the forces when they act in the same direction."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.015": {
                        "prompt": "Convert 450 kN to MN.",
                        "feedback": {
                                "correct": "Excellent! 450 kN = 0.45 MN",
                                "incorrect": "Divide by 1000 to convert kN to MN."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "MN"
                },
                "SP1.01.016": {
                        "prompt": "A force of 80 N acts at an angle of 30° above the horizontal. What is the horizontal component of this force?",
                        "feedback": {
                                "correct": "Correct! F_x = F × cos(30°) = 80 × 0.866 = 69.28 N",
                                "incorrect": "Use F_x = F × cos(θ) to find the horizontal component."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.017": {
                        "prompt": "A force of 80 N acts at an angle of 30° above the horizontal. What is the vertical component of this force?",
                        "feedback": {
                                "correct": "Correct! F_y = F × sin(30°) = 80 × 0.5 = 40 N",
                                "incorrect": "Use F_y = F × sin(θ) to find the vertical component."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.018": {
                        "prompt": "A force has components F_x = 60 N and F_y = 80 N. What is the magnitude of the force?",
                        "feedback": {
                                "correct": "Correct! F = √(60^{2} + 80^{2}) = √10000 = 100 N",
                                "incorrect": "Use the Pythagorean theorem: F = √(F_x^{2} + F_y^{2})"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.019": {
                        "prompt": "A force has components F_x = 60 N and F_y = 80 N. What angle does it make with the horizontal?",
                        "feedback": {
                                "correct": "Correct! θ = arctan(80/60) = arctan(1.333) = 53.13°",
                                "incorrect": "Use θ = arctan(F_y/F_x) to find the angle."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "degrees"
                },
                "SP1.01.020": {
                        "prompt": "A 50 N force acts at 45° above the horizontal. What is its horizontal component?",
                        "feedback": {
                                "correct": "Correct! F_x = 50 × cos(45°) = 50 × 0.707 = 35.36 N",
                                "incorrect": "At 45°, cos(45°) = sin(45°) = 0.707"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.021": {
                        "prompt": "A 50 N force acts at 45° above the horizontal. What is its vertical component?",
                        "feedback": {
                                "correct": "Correct! F_y = 50 × sin(45°) = 50 × 0.707 = 35.36 N",
                                "incorrect": "At 45°, the horizontal and vertical components are equal."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.022": {
                        "prompt": "A force of 100 N acts at 60° above the horizontal. What is its vertical component?",
                        "feedback": {
                                "correct": "Correct! F_y = 100 × sin(60°) = 100 × 0.866 = 86.60 N",
                                "incorrect": "Remember: sin(60°) = 0.866"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.023": {
                        "prompt": "A force of 100 N acts at 60° above the horizontal. What is its horizontal component?",
                        "feedback": {
                                "correct": "Correct! F_x = 100 × cos(60°) = 100 × 0.5 = 50 N",
                                "incorrect": "Remember: cos(60°) = 0.5"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.024": {
                        "prompt": "Two forces act on an object: 30 N to the right and 40 N upward. What is the magnitude of the resultant force?",
                        "feedback": {
                                "correct": "Correct! F = √(30^{2} + 40^{2}) = 50 N",
                                "incorrect": "Use the Pythagorean theorem for perpendicular forces."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.042": {
                        "prompt": "Two forces of 50 N each act at right angles. What is the magnitude of the resultant?",
                        "feedback": {
                                "correct": "Correct! F = √(50^{2} + 50^{2}) = 70.71 N",
                                "incorrect": "For equal perpendicular forces, F = F_1√2"
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.043": {
                        "prompt": "A force of 20 N acts east and another 15 N acts north. What is the magnitude of the resultant?",
                        "feedback": {
                                "correct": "Correct! F = √(20^{2} + 15^{2}) = 25 N",
                                "incorrect": "This is a 3-4-5 triangle scaled by 5."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.044": {
                        "prompt": "Two forces act in the same direction: 80 N and 120 N. What is the magnitude of the resultant?",
                        "feedback": {
                                "correct": "Correct! Forces in the same direction add: 80 + 120 = 200 N",
                                "incorrect": "When forces act in the same direction, simply add them."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.045": {
                        "prompt": "Two forces act in opposite directions: 150 N to the right and 90 N to the left. What is the magnitude of the resultant?",
                        "feedback": {
                                "correct": "Correct! Forces in opposite directions subtract: 150 - 90 = 60 N",
                                "incorrect": "When forces oppose each other, subtract the smaller from the larger."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.026": {
                        "prompt": "Two forces of 60 N and 80 N act at right angles to each other. What is the magnitude of the resultant force?",
                        "feedback": {
                                "correct": "Correct! F = √(60^{2} + 80^{2}) = 100 N",
                                "incorrect": "Use the Pythagorean theorem for perpendicular forces."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.027": {
                        "prompt": "A force of 100 N acts at 0° and another force of 100 N acts at 90°. What angle does the resultant make with the horizontal?",
                        "feedback": {
                                "correct": "Correct! θ = arctan(100/100) = 45°",
                                "incorrect": "Use θ = arctan(F_y/F_x) to find the angle."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "degrees"
                },
                "SP1.01.028": {
                        "prompt": "Three forces act on an object: 20 N east, 30 N north, and 10 N west. What is the magnitude of the resultant force?",
                        "feedback": {
                                "correct": "Correct! Net horizontal: 20-10=10 N, vertical: 30 N. F = √(10^{2} + 30^{2}) = 31.62 N",
                                "incorrect": "First find the net force in each direction, then use Pythagorean theorem."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.029": {
                        "prompt": "Two forces of equal magnitude act at 60° to each other. If each force is 50 N, what is the magnitude of the resultant?",
                        "feedback": {
                                "correct": "Correct! For equal forces at 60°: F = 2F_1cos(30°) = 2(50)(0.866) = 86.60 N",
                                "incorrect": "Use the parallelogram law or resolve into components."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.030": {
                        "prompt": "A force of 40 N acts at 30° above horizontal and another 60 N acts horizontally. What is the horizontal component of the resultant?",
                        "feedback": {
                                "correct": "Correct! F_x = 40cos(30°) + 60 = 34.64 + 60 = 94.64 N",
                                "incorrect": "Add the horizontal components of both forces."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.031": {
                        "prompt": "Two forces act on a point: 100 N at 0° and 100 N at 120°. What is the magnitude of the resultant force?",
                        "feedback": {
                                "correct": "Correct! F_x = 100 + 100cos(120°) = 50 N, F_y = 100sin(120°) = 86.6 N. F = √(50^{2} + 86.6^{2}) = 100 N",
                                "incorrect": "Resolve each force into components, then add and find the magnitude."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.032": {
                        "prompt": "Four forces act on an object: 50 N north, 30 N south, 40 N east, and 20 N west. What is the magnitude of the resultant?",
                        "feedback": {
                                "correct": "Correct! Net: 20 N north, 20 N east. F = √(20^{2} + 20^{2}) = 28.28 N",
                                "incorrect": "Find the net force in each direction first."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.033": {
                        "prompt": "A force of 80 N acts at 45° and another 60 N acts at 135°. What is the vertical component of the resultant?",
                        "feedback": {
                                "correct": "Correct! F_y = 80sin(45°) + 60sin(135°) = 56.57 + 42.43 = 98.99 N",
                                "incorrect": "Add the vertical components of both forces."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.034": {
                        "prompt": "Three forces act on an object: 100 N at 0°, 80 N at 60°, and 60 N at 150°. What is the magnitude of the resultant force?",
                        "feedback": {
                                "correct": "Correct! F_x = 100 + 80cos(60°) + 60cos(150°) = 88.04 N, F_y = 80sin(60°) + 60sin(150°) = 99.28 N. F = 118.32 N",
                                "incorrect": "Resolve all forces into x and y components, sum them, then find the magnitude."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.035": {
                        "prompt": "A Basel tram brakes with a force of 5000 N. If the track is inclined at 5° downward, what is the component of the braking force parallel to the track?",
                        "feedback": {
                                "correct": "Correct! F_parallel = 5000 × cos(5°) = 4981.13 N",
                                "incorrect": "The parallel component is F × cos(θ) where θ is the angle of inclination."
                        },
                        "scenario": "Basel Tram Braking",
                        "scenario_desc": "Basel's iconic green trams navigate the city's hilly terrain, requiring careful force management. When a tram descends the slope near Barfüsserplatz, the driver must apply brakes to control speed. The braking force acts horizontally against the tram's motion, but the inclined track means only part of this force effectively opposes the tram's movement down the slope. Understanding force components is crucial for safe tram operation in Basel's urban landscape, where tracks wind through historic streets with varying gradients. The tram system, serving over 100,000 passengers daily, relies on precise force calculations to ensure smooth, safe stops at each station, from Aeschenplatz to Claraplatz.",
                        "unit": "N"
                },
                "SP1.01.036": {
                        "prompt": "Five forces act on a point: 40 N at 0°, 30 N at 72°, 30 N at 144°, 30 N at 216°, and 30 N at 288°. What is the magnitude of the resultant?",
                        "feedback": {
                                "correct": "Correct! The four 30 N forces are symmetrically arranged and cancel out, leaving only the 40 N force.",
                                "incorrect": "Look for symmetry in the force arrangement."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.037": {
                        "prompt": "A force of 200 N acts at 30° above horizontal and another 150 N acts at 45° below horizontal. What is the magnitude of the resultant?",
                        "feedback": {
                                "correct": "Correct! F_x = 200cos(30°) + 150cos(-45°) = 279.28 N, F_y = 200sin(30°) + 150sin(-45°) = -6.07 N. F = 199.25 N",
                                "incorrect": "Remember that angles below horizontal are negative."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.038": {
                        "prompt": "A cable on the Mittlere Brücke supports a load with a tension of 50 kN at 60° from horizontal. What is the vertical component of this tension?",
                        "feedback": {
                                "correct": "Correct! F_y = 50 × sin(60°) = 43.30 kN",
                                "incorrect": "The vertical component is F × sin(θ)."
                        },
                        "scenario": "Rhine Bridge Cable Tension",
                        "scenario_desc": "The Mittlere Brücke, Basel's oldest Rhine crossing dating back to 1226, is an engineering marvel that relies on careful force distribution. Modern maintenance equipment suspended from cables must be analyzed for safety. When workers install temporary cables at various angles to support inspection platforms, understanding the vertical and horizontal components of cable tension becomes critical. The bridge spans 192 meters across the Rhine, connecting Grossbasel and Kleinbasel. Each cable must support not only the weight of equipment but also withstand wind forces from the river valley. Engineers calculate these force components to ensure the historic structure's integrity while accommodating modern maintenance needs. The bridge carries thousands of pedestrians, cyclists, and trams daily, making safety calculations paramount.",
                        "unit": "kN"
                },
                "SP1.01.039": {
                        "prompt": "Three forces of 100 N each act at 0°, 120°, and 240°. What is the magnitude of the resultant force?",
                        "feedback": {
                                "correct": "Correct! These three equal forces are symmetrically arranged at 120° intervals and cancel out completely.",
                                "incorrect": "Three equal forces at 120° intervals form a balanced system."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.040": {
                        "prompt": "A force of 120 N acts at 25° and another 80 N acts at 155°. What angle does the resultant make with the horizontal?",
                        "feedback": {
                                "correct": "Correct! F_x = 120cos(25°) + 80cos(155°) = 36.29 N, F_y = 120sin(25°) + 80sin(155°) = 84.51 N. θ = arctan(84.51/36.29) = 52.13°",
                                "incorrect": "Find the x and y components, then use arctan(F_y/F_x)."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "degrees"
                },
                "SP1.01.041": {
                        "prompt": "Six forces of 20 N each act at 0°, 60°, 120°, 180°, 240°, and 300°. What is the magnitude of the resultant?",
                        "feedback": {
                                "correct": "Correct! Six equal forces at 60° intervals form a perfectly balanced system with zero resultant.",
                                "incorrect": "Look for symmetry - forces arranged at equal intervals around a circle cancel out."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.025": {
                        "prompt": "Three forces act on an object in equilibrium: 50 N to the right, 30 N upward, and an unknown force. What is the magnitude of the unknown force?",
                        "feedback": {
                                "correct": "Correct! The unknown force must balance the other two: √(50^{2} + 30^{2}) = 58.31 N",
                                "incorrect": "For equilibrium, the sum of all forces must be zero."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.046": {
                        "prompt": "Two forces of 40 N each act at 60° to each other. What is the magnitude of the third force needed for equilibrium?",
                        "feedback": {
                                "correct": "Correct! The resultant of the two forces is 69.28 N, so the equilibrant must be equal and opposite.",
                                "incorrect": "First find the resultant of the two forces, then the equilibrant equals it in magnitude."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.047": {
                        "prompt": "An object is in equilibrium under three forces: 100 N at 0°, 80 N at 90°, and a third force. What is the magnitude of the third force?",
                        "feedback": {
                                "correct": "Correct! F = √(100^{2} + 80^{2}) = 128.06 N",
                                "incorrect": "The third force must balance the resultant of the first two."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.048": {
                        "prompt": "A sign hangs from two cables making 30° angles with the horizontal. If each cable has a tension of 200 N, what is the weight of the sign?",
                        "feedback": {
                                "correct": "Correct! Weight = 2 × 200 × sin(30°) = 2 × 200 × 0.5 = 200 N",
                                "incorrect": "The vertical components of both cables must equal the weight."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.049": {
                        "prompt": "Four forces act on a point in equilibrium: 60 N at 0°, 40 N at 90°, 50 N at 180°, and an unknown force. What is the magnitude of the unknown force?",
                        "feedback": {
                                "correct": "Correct! Net x: 60-50=10 N, Net y: 40 N. Unknown force: √(10^{2} + 40^{2}) = 41.23 N",
                                "incorrect": "Find the net force in x and y directions, then calculate the equilibrant."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.050": {
                        "prompt": "A traffic light hangs from two cables: one at 45° with tension T_1 and another at 60° with tension 150 N. If the system is in equilibrium, what is T_1?",
                        "feedback": {
                                "correct": "Correct! For horizontal equilibrium: T_1cos(45°) = 150cos(60°), so T_1 = 150×0.5/0.707 = 183.71 N",
                                "incorrect": "Use horizontal equilibrium: the horizontal components must balance."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.051": {
                        "prompt": "The Basel Münster tower experiences wind forces. If a 2000 N wind force acts horizontally and structural forces of 1500 N at 120° and F at 240° maintain equilibrium, what is F?",
                        "feedback": {
                                "correct": "Correct! By symmetry and equilibrium analysis, F = 1500 N",
                                "incorrect": "Analyze the x and y components separately for equilibrium."
                        },
                        "scenario": "Basel Münster Tower Forces",
                        "scenario_desc": "The Basel Münster, with its distinctive red sandstone towers rising 64.5 meters above the Rhine, has stood since 1019. The Gothic cathedral's twin towers must withstand significant wind forces from the Rhine valley. Engineers analyze the equilibrium of forces acting on the tower structure, where wind loads are balanced by internal structural forces distributed through the ancient masonry. The towers' stability depends on careful force distribution through buttresses and walls. Modern structural analysis ensures the medieval architecture can safely handle wind gusts exceeding 100 km/h that funnel through the Rhine valley. Understanding force equilibrium is essential for preserving this UNESCO World Heritage site while allowing visitors to climb the towers and enjoy panoramic views of Basel, the Rhine, and the Black Forest beyond.",
                        "unit": "N"
                },
                "SP1.01.052": {
                        "prompt": "Three forces maintain equilibrium: 100 N at 30°, 120 N at 150°, and F at 270°. What is F?",
                        "feedback": {
                                "correct": "Correct! Sum of y-components: 100sin(30°) + 120sin(150°) - F = 0, so F = 110 N",
                                "incorrect": "The force at 270° acts purely in the negative y-direction."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.053": {
                        "prompt": "A beam is supported by two cables at 40° and 50° from vertical. If the beam weighs 500 N, what is the tension in the cable at 40°?",
                        "feedback": {
                                "correct": "Correct! Using equilibrium equations: T_1 = 281.91 N",
                                "incorrect": "Set up equilibrium equations for both horizontal and vertical components."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.054": {
                        "prompt": "Four forces act on a ring: 80 N at 0°, 60 N at 90°, 70 N at 180°, and F at an unknown angle. If the system is in equilibrium, what is F?",
                        "feedback": {
                                "correct": "Correct! Net x: 80-70=10 N, Net y: 60 N. F = √(10^{2} + 60^{2}) = 60.83 N",
                                "incorrect": "Find the resultant of the known forces, then F must equal it in magnitude."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.055": {
                        "prompt": "A chandelier weighing 300 N hangs from three cables at 120° intervals. What is the tension in each cable?",
                        "feedback": {
                                "correct": "Correct! By symmetry, each cable carries 300/3 = 100 N",
                                "incorrect": "For symmetric arrangement, the load is distributed equally."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.056": {
                        "prompt": "A Basel Marathon runner's foot strikes the ground with 2400 N. The ground reaction force acts at 15° from vertical. What is the horizontal component that propels the runner forward?",
                        "feedback": {
                                "correct": "Correct! F_horizontal = 2400 × sin(15°) = 621.18 N",
                                "incorrect": "The horizontal component is F × sin(θ) where θ is from vertical."
                        },
                        "scenario": "Basel Marathon Biomechanics",
                        "scenario_desc": "The Basel Marathon, attracting over 10,000 runners annually, showcases the physics of human locomotion through Basel's streets. When a runner's foot strikes the pavement near Marktplatz, complex force interactions occur. The ground reaction force, typically 2-3 times body weight, acts at an angle determined by running technique. Elite runners optimize this angle to maximize forward propulsion while minimizing vertical oscillation. The force components must be carefully balanced: too much vertical force wastes energy bouncing up and down, while insufficient horizontal force limits speed. Sports scientists analyze these forces to improve running efficiency and prevent injuries. Understanding force equilibrium and decomposition helps runners maintain optimal form through Basel's varied terrain, from the flat Rhine promenade to the challenging hills of Bruderholz, ensuring they can complete the 42.195 km course efficiently.",
                        "unit": "N"
                },
                "SP1.01.057": {
                        "prompt": "Five forces act on a complex structure: 200 N at 36°, 150 N at 108°, 180 N at 180°, 120 N at 252°, and F at 324°. For equilibrium, what is F?",
                        "feedback": {
                                "correct": "Correct! By analyzing x and y components separately and solving equilibrium equations, F = 200 N",
                                "incorrect": "Sum all x-components and y-components separately, then solve for F."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.058": {
                        "prompt": "A suspended platform is held by four cables. Three cables have tensions: 400 N at 30°, 350 N at 120°, and 380 N at 210°. What is the tension in the fourth cable at 300°?",
                        "feedback": {
                                "correct": "Correct! Solving the equilibrium equations yields T_4 = 350 N",
                                "incorrect": "Set up two equilibrium equations (x and y) and solve for the unknown tension."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.059": {
                        "prompt": "A truss joint experiences forces: 500 N compression at 0°, 400 N tension at 60°, 450 N compression at 180°, and two unknown forces at 240° and 300°. If the forces at 240° and 300° are equal, what is their magnitude?",
                        "feedback": {
                                "correct": "Correct! Using symmetry and equilibrium equations, each unknown force is 200 N",
                                "incorrect": "Use the fact that the two unknown forces are equal to simplify the equilibrium equations."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.060": {
                        "prompt": "A complex cable system has six cables meeting at a point. Five cables have known tensions: 300 N at 0°, 250 N at 72°, 280 N at 144°, 260 N at 216°, and 270 N at 288°. What is the tension in the sixth cable at an optimal angle for equilibrium?",
                        "feedback": {
                                "correct": "Correct! The resultant of the five forces is 89.44 N, so the sixth cable must provide this force.",
                                "incorrect": "Find the resultant of all known forces, then the sixth cable must balance it."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.061": {
                        "prompt": "A bridge support experiences wind load of 3000 N horizontally, dead load of 8000 N vertically, and three support reactions at 45°, 135°, and 225°. If the reactions at 45° and 225° are equal, what is their magnitude?",
                        "feedback": {
                                "correct": "Correct! Using equilibrium equations with symmetry, each equal reaction is 4242.64 N",
                                "incorrect": "Set up equilibrium equations for x and y, using the symmetry of the two equal reactions."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.062": {
                        "prompt": "An architectural sculpture in Basel has eight support cables arranged symmetrically at 45° intervals. If the sculpture weighs 2400 N, what is the tension in each cable?",
                        "feedback": {
                                "correct": "Correct! By symmetry, each cable carries 2400/8 = 300 N",
                                "incorrect": "For symmetric arrangement, the load is distributed equally among all cables."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.063": {
                        "prompt": "A crane hook supports a load with four chains at angles 20°, 110°, 200°, and 290° from horizontal. If three chains have tensions 800 N, 750 N, and 820 N respectively, what is the tension in the fourth chain?",
                        "feedback": {
                                "correct": "Correct! Solving the equilibrium equations yields T_4 = 750 N",
                                "incorrect": "Calculate the x and y components of all known forces, then solve for the unknown."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.064": {
                        "prompt": "A space frame node has seven members meeting at angles 0°, 51.43°, 102.86°, 154.29°, 205.71°, 257.14°, and 308.57°. Six members have forces of 500 N each. What force must the seventh member carry for equilibrium?",
                        "feedback": {
                                "correct": "Correct! By symmetry (7 equal angles), the seventh member also carries 500 N",
                                "incorrect": "Look for symmetry - seven equal forces at equal angular intervals form a balanced system."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                },
                "SP1.01.065": {
                        "prompt": "A complex rigging system has forces: 600 N at 15°, 550 N at 75°, 580 N at 135°, 520 N at 195°, 590 N at 255°, and F at 315°. What is F for equilibrium?",
                        "feedback": {
                                "correct": "Correct! Comprehensive equilibrium analysis yields F = 550 N",
                                "incorrect": "Sum all x-components and y-components of known forces, then solve for F."
                        },
                        "scenario": "",
                        "scenario_desc": "",
                        "unit": "N"
                }
        },
        /* SP1.01_DATA_END */

        // --- Global Physics Modules ---
        gp1_01: {
            placeholders: {
                xxx: "xxx",
                xx: "xx",
                minus_4: "-4",
                x: "x",
                v_1: "1",
                v_0: "0"
            },
                back: "Back to Nexus",
                title: "GP1.01 // THE ATOMIC CORE",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Active Mission Objective",
                target_title: "Isotope / Decay",
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                monitor_title: "GP1.01_NUCLEAR_MONITOR",
                labels: {
                        input: "INPUT PARAMETERS",
                        hints: "HINTS",
                        balancing: "NUCLEAR EQUATION",
                        mass: "Mass Number (A)",
                        atomic: "Atomic Number (Z)",
                        nucleus_info: "NUCLEUS INFO",
                        protons_z: "Protons (Z):",
                        neutrons_n: "Neutrons (N):",
                        mass_number_a: "Mass Number (A):",
                        status: "Status:",
                        stable: "STABLE",
                        unstable: "UNSTABLE",
                        binding_energy_semf: "BINDING ENERGY (SEMF)",
                        total_be: "Total B.E.:",
                        be_per_nucleon: "B.E. per nucleon:",
                        decay_mode: "DECAY MODE",
                        decay_alpha_desc: "Emits α particle (He-4 nucleus)",
                        decay_beta_minus_desc: "Neutron → Proton + electron + antineutrino",
                        decay_beta_plus_desc: "Proton → Neutron + positron + neutrino",
                        decay_chain: "DECAY CHAIN",
                        presets: "PRESETS",
                        show_stability_island: "Show Stability Island",
                        companion_quiz: "COMPANION QUIZ"
                },
                mission: {
                        title: "STABILIZE THE CORE",
                        description: "Explore the stability of the atomic core. Understand binding energy and decay modes for various isotopes."
                },
                stages: {
                        alpha: "ALPHA DECAY",
                        beta: "BETA DECAY",
                        gamma: "GAMMA EMISSION",
                        fission: "NUCLEAR FISSION"
                },
                prompts: {
                        alpha_a_daughter: "Alpha-decay bookkeeping: determine daughter mass number A_daughter.",
                        alpha_z_daughter: "Alpha-decay charge balance: determine daughter atomic number Z_daughter.",
                        alpha_delta_a: "Alpha-decay rule check: determine the change in mass number Delta A.",
                        beta_z_daughter: "Beta-minus decay balance: determine daughter atomic number Z_daughter.",
                        beta_a_daughter: "Beta-minus conservation check: determine daughter mass number A_daughter.",
                        beta_delta_z: "Beta-minus rule check: determine the change in atomic number Delta Z.",
                        gamma_a_daughter: "Gamma emission check: determine daughter mass number A_daughter.",
                        gamma_z_daughter: "Gamma emission check: determine daughter atomic number Z_daughter.",
                        gamma_delta_sum: "Gamma transition check: determine Delta A + Delta Z for the nucleus."
                }
        },
        gp1_02: {
            placeholders: {
                x_dot_xx: "x.xx",
                x: "x",
                x_dot_x: "x.x"
            },
                back: "Back to Nexus",
                title: "GP5.02 // RELATIVITY LAB",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Active Mission Objective",
                target_title: "Relativistic Effects",
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                monitor_title: "GP5.02_RELATIVITY_MONITOR",
                labels: {
                        velocity: "Velocity (v/c)",
                        lorentz_factor: "Lorentz Factor (γ)",
                        time_dilation: "Time Dilation",
                        length_contraction: "Length Contraction",
                        formulas: "Formulas",
                        velocity_value: "{value}% c",
                        gamma_value: "γ = {value}",
                        lorentz_factor_title: "LORENTZ FACTOR",
                        velocity_label: "Velocity (v/c)",
                        toggle_doppler: "Show Doppler Shift",
                        toggle_contraction: "Show Length Contraction",
                        companion_quiz: "COMPANION QUIZ"
                },
                effects: {
                        title: "RELATIVISTIC EFFECTS",
                        time_dilation_label: "Time Dilation:",
                        time_dilation_value: "{value}x",
                        length_contraction_label: "Length Contraction:",
                        length_contraction_value: "{value}x"
                },
                formulas: {
                        title: "FORMULAS",
                        gamma: "γ = 1/√(1-v²/c²)",
                        time: "Δt = γΔt₀",
                        length: "L = L₀/γ",
                        energy: "E = γmc²"
                },
                mission: {
                        title: "MISSION: SPECIAL RELATIVITY",
                        description: "Explore Einstein's special relativity at CERN. Observe time dilation and length contraction at near-light speeds."
                },
                stages: {
                        lorentz: "LORENTZ FACTOR",
                        contraction: "LENGTH CONTRACTION",
                        dilation: "TIME DILATION"
                },
                prompts: {
                        lorentz_l1: "Relativity checkpoint: compute Lorentz factor gamma for the given speed.",
                        lorentz_l2: "Beam-speed verification: compute gamma from the velocity ratio v/c.",
                        lorentz_l3: "Near-light-speed case: compute gamma for precision timing analysis.",
                        contraction_c1: "Length-contraction task: determine the contracted length L.",
                        contraction_c2: "High-gamma contraction check: compute L from L_0 and gamma.",
                        contraction_c3: "Relativistic geometry check: compute contracted length L in the lab frame.",
                        dilation_d1: "Time-dilation baseline: compute observed time interval Delta t.",
                        dilation_d2: "Clock comparison task: compute Delta t for a moving frame.",
                        dilation_d3: "Relativistic timing check: determine Delta t from gamma and Delta t_0."
                }
        },
        gp1_03: {
            placeholders: {
                x_dot_xx: "x.xx",
                xxxx: "xxxx",
                xx_dot_x: "xx.x",
                v_0_dot_xxxxx: "0.xxxxx",
                xxx: "xxx",
                minus_x_dot_x: "-x.x"
            },
                back: "Back to Nexus",
                title: "GP5.03 // PARTICLE COLLIDER",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Active Mission Objective",
                target_title: "LHC ATLAS DETECTOR",
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                monitor_title: "GP5.03_LHC_MONITOR",
                labels: {
                        beam_energy: "BEAM ENERGY",
                        relativistic_effects: "RELATIVISTIC EFFECTS",
                        formulas: "FORMULAS",
                        magnetic_field: "Enable Magnetic Field (Bending Magnets)",
                        colliding: "COLLIDING...",
                        initiate_collision: "INITIATE COLLISION"
                },
                mission: {
                        title: "MISSION: PARTICLE PHYSICS",
                        description: "Explore particle collisions at CERN's Large Hadron Collider. Discover the Higgs boson."
                },
                stages: {
                        acceleration: "ACCELERATION",
                        collision: "COLLISION",
                        detection: "DETECTION",
                        acceleration_desc: "Accelerate protons to near light speed",
                        collision_desc: "Collide proton beams at 13 TeV",
                        detection_desc: "Detect particle jets and tracks",
                        acceleration_hint: "Protons reach 99.9999991% speed of light",
                        collision_hint: "Collision energy: 13 TeV = 13,000 GeV",
                        detection_hint: "Magnetic field bends charged particle tracks"
                },
                prompts: {
                        acc_gamma_basic: "LHC injector check: compute the Lorentz factor from the given beam speed.",
                        acc_beam_energy_core: "ATLAS pre-run setup: compute single-beam energy in GeV for magnet tuning.",
                        acc_gamma_advanced: "High-speed calibration: compute gamma for the near-light proton beam.",
                        acc_momentum_elite: "Momentum diagnostics: estimate proton momentum p from relativistic parameters.",
                        col_sqrts_basic: "Collision setup: compute center-of-mass energy sqrt(s) from two beam energies.",
                        col_event_core: "Luminosity run: compute expected event count N from L, sigma, and run time.",
                        col_ecm_advanced: "Ultra-relativistic approximation: compute E_cm from opposing beam momenta.",
                        col_beta_elite: "Velocity fraction check: compute beta=v/c from the given gamma value.",
                        det_radius_basic: "Tracker geometry: compute bending radius r in magnetic field B.",
                        det_mass_core: "Invariant-mass reconstruction: compute m from measured E and p.",
                        det_eta_advanced: "Forward detector mapping: compute pseudorapidity eta from theta.",
                        det_delta_m_elite: "Higgs channel fit: compute mass residual Delta m = m_reco - m_H."
                }
        },
        gp1_04: {
            placeholders: {
                v_1: "1",
                v_0: "0",
                x_dot_xx: "x.xx",
                x_dot_xe_minus_16: "x.xe-16",
                v_0_dot_xxx: "0.xxx",
                v_2: "2",
                x_dot_x: "x.x",
                x_dot_xe14: "x.xe14"
            },
                back: "Back to Nexus",
                title: "GP1.04 // QUANTUM TUNNEL",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Active Mission Objective",
                target_title: "Wave Function",
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                monitor_title: "GP1.04_QUANTUM_MONITOR",
                labels: {
                        particle_energy: "PARTICLE ENERGY (E)",
                        barrier_height: "BARRIER HEIGHT (V₀)",
                        barrier_width: "BARRIER WIDTH (a)",
                        transmission: "TRANSMISSION COEFFICIENT",
                        wave_function: "WAVE FUNCTION",
                        probability_density: "PROBABILITY DENSITY |ψ|^{2}",
                        incident: "Incident",
                        reflected: "Reflected",
                        transmitted: "Transmitted",
                        formulas: "FORMULAS"
                },
                mission: {
                        title: "MISSION: QUANTUM TUNNELING",
                        description: "Explore quantum tunneling through potential barriers. Observe wave function behavior."
                },
                stages: {
                        classical: "CLASSICAL LIMIT",
                        tunneling: "QUANTUM TUNNELING",
                        resonance: "RESONANCE"
                },
                prompts: {
                        cl_transmission_basic: "Classical barrier check: since E > V_0, determine transmission coefficient T.",
                        cl_reflection_core: "Classical limit consistency: with T=1, compute reflection coefficient R.",
                        cl_wave_number_advanced: "Free-region wave analysis: compute wave number k from particle energy.",
                        cl_de_broglie_elite: "High-energy beamline: compute de Broglie wavelength lambda.",
                        tu_transmission_basic: "Quantum tunneling baseline: compute T using exponential decay model.",
                        tu_kappa_core: "Barrier-penetration parameter: compute kappa from V_0 and E.",
                        tu_transmission_advanced: "Thicker barrier test: compute tunneling probability T for given kappa and a.",
                        tu_barrier_width_elite: "Barrier design inversion: solve for width a at target transmission T.",
                        re_mode_basic: "Resonance mode condition: solve integer mode number n in 2a = n lambda.",
                        re_energy_level_core: "Quantized states: compute E_n from n^2 E_1.",
                        re_delta_energy_advanced: "Transition analysis: compute energy gap Delta E between two levels.",
                        re_frequency_elite: "Photon emission check: compute frequency f = Delta E / h."
                }
        },

        // --- Basel Sek 1 Series (SP1 - Mechanics) ---

        // SP1.02: Newton's Laws
        sp1_02: {
                title: "SP1.02 // NEWTON'S LAWS",
                back: "Back to Nexus",
                check: "Verify",
                next: "Next",
                correct: "Law Verified",
                incorrect: "Law Error",
                monitor_title: "NEWTON_PHYSICS_V1",
                difficulty: {
                        basic: "BASIC",
                        core: "CORE",
                        advanced: "ADVANCED",
                        elite: "ELITE"
                },
                stages: {
                        first_law: "FIRST LAW (INERTIA)",
                        second_law: "SECOND LAW (F=ma)",
                        third_law: "THIRD LAW (ACTION-REACTION)"
                },
                placeholders: {
                        value: "value",
                        acceleration_ms2: "m/s^2",
                        force_n: "N"
                },

                prompts: {
                        first_law_basic: "Basel inertia check: object speed is {v} m/s and net force is zero. Task: state F_net.",
                        first_law_core: "Balanced-force setup: friction is {f_friction} N. Task: state the applied force for F_net=0.",
                        first_law_adv: "Counterforce task: applied force is {f_applied} N. Task: state friction needed for constant velocity.",
                        first_law_elite: "Heavy-system equilibrium: opposing force is {f_friction} N. Task: give the balancing force.",
                        second_law: "Motion model: m={m} kg, F_applied={f} N, F_friction={friction} N. Task: compute acceleration a.",
                        third_law: "Action-reaction check: object A exerts {f1} N on object B. Task: give the reaction-force magnitude on A.",
                        "FIRST_LAW": {
                                "BASIC": [
                                        "Object at rest with no external force. Task: decide whether it will start moving.",
                                        "Object moving at 5 m/s with zero net force. Task: decide whether the motion state changes.",
                                        "Car is at rest and the driver applies no force. Task: decide whether the car starts moving.",
                                        "Ball rolls at 3 m/s on a frictionless surface. Task: determine the net force.",
                                        "A book rests on a table. Task: decide whether the system is in equilibrium.",
                                        "A puck slides across ice at constant speed. Task: determine the net force.",
                                        "Concept check: an object at rest stays at rest unless acted on by what?"
                                ],
                                "CORE": [
                                        "Basel tram runs at 15 m/s with braking force -3000 N and mass 10000 kg. Task: find velocity after 5 s.",
                                        "Fasnacht float is at rest with push 500 N and friction 500 N. Task: decide whether it moves.",
                                        "Rhine boat moves at 2 m/s; engine is off, friction is 100 N, mass is 500 kg. Task: find time to stop.",
                                        "Object moves at 10 m/s with net force 0 N. Task: find velocity after 10 s.",
                                        "Car moves at 20 m/s with friction 2000 N and mass 1000 kg. Task: compute deceleration.",
                                        "Tram moves at constant 12 m/s and applied force equals friction. Task: determine net force.",
                                        "Puck on ice has speed 5 m/s with no friction. Task: find velocity after 20 s.",
                                        "Basel bus is at rest with engine force 3000 N and friction 3000 N. Task: compute acceleration."
                                ],
                                "ADVANCED": [
                                        "Basel SBB train has mass 50000 kg and speed 25 m/s; brakes apply -10000 N. Task: compute stopping distance.",
                                        "Fasnacht parade float has mass 2000 kg with push 1000 N and friction 800 N. Task: compute acceleration.",
                                        "Rhine boat has mass 1000 kg and speed 5 m/s with water resistance 200 N. Task: find time to reach 3 m/s.",
                                        "Tram has mass 15000 kg at 20 m/s with emergency braking -12000 N. Task: compute stopping distance.",
                                        "Object of mass 500 kg moves at 8 m/s with friction 100 N. Task: find distance traveled before stopping.",
                                        "Car of mass 1200 kg moves at 30 m/s with brake force -4000 N. Task: compute time to stop."
                                ],
                                "ELITE": [
                                        "Basel tram system has three trams (10000, 12000, 15000 kg), each at 15 m/s. Task: compute total momentum.",
                                        "Fasnacht float has mass 3000 kg at rest with forces 500 N, 300 N, and -200 N. Task: compute net force.",
                                        "Rhine boat has mass 2000 kg at 4 m/s with engine thrust 1000 N and water resistance 800 N. Task: find velocity after 10 s."
                                ]
                        },
                        "SECOND_LAW": {
                                "BASIC": [
                                        "Workbench acceleration drill: given F=10 N and m=2 kg. Task: compute a (m/s^{2}). Use Newton's second law F=ma.",
                                        "Classroom force check: given F=20 N and m=5 kg. Task: find a (m/s^{2}). Use a=F/m.",
                                        "Dynamics starter: given F=15 N and m=3 kg. Task: calculate acceleration a. Use F=ma.",
                                        "Load-calculation practice: given m=10 kg and a=2 m/s^{2}. Task: determine force F (N). Use F=ma.",
                                        "Actuation sizing task: given m=5 kg and a=4 m/s^{2}. Task: determine required force F (N).",
                                        "Mass-identification drill: given F=30 N and a=6 m/s^{2}. Task: compute m (kg). Use m=F/a.",
                                        "System-ID check: given F=40 N and a=8 m/s^{2}. Task: compute mass m (kg)."
                                ],
                                "CORE": [
                                        "Basel tram launch case: m=10000 kg and target a=1.5 m/s^{2}. Task: compute traction force F (N). Use F=ma for controller setup.",
                                        "Fasnacht float push test: m=2000 kg with applied force 1000 N. Task: compute acceleration a (m/s^{2}). Use a=F/m.",
                                        "Rhine boat thrust estimate: m=1500 kg and engine thrust 3000 N. Task: compute acceleration a. Use Newton's second law.",
                                        "SBB braking analysis: m=50000 kg with brake force -10000 N. Task: compute deceleration a (m/s^{2}).",
                                        "Tram upgrade planning: m=12000 kg needs a=2 m/s^{2}. Task: compute required net force F (N).",
                                        "Urban car dynamics: m=1000 kg with net force 2000 N. Task: compute acceleration a (m/s^{2}).",
                                        "Basel bus schedule test: m=8000 kg accelerates at 1 m/s^{2}. Task: compute force F (N).",
                                        "Cycling sprint model: m=80 kg with force 160 N. Task: compute acceleration a (m/s^{2}).",
                                        "Freight truck sizing: m=5000 kg with a=0.5 m/s^{2}. Task: compute force F (N)."
                                ],
                                "ADVANCED": [
                                        "Basel tram: m=10000 kg, applied force 18000 N, friction 3000 N. Task: compute a (m/s^{2}).",
                                        "Fasnacht float: m=3000 kg, push 2000 N, friction 500 N. Task: compute a (m/s^{2}).",
                                        "Rhine boat: m=2000 kg, thrust 4000 N, water resistance 1000 N. Task: compute a (m/s^{2}).",
                                        "SBB train: m=60000 kg, braking force -15000 N, friction -3000 N. Task: compute a (m/s^{2}).",
                                        "Tram case: m=15000 kg needs a=1.8 m/s^{2} with friction 2000 N. Task: compute applied force (N).",
                                        "Car case: m=1200 kg, engine force 5000 N, air resistance 800 N. Task: compute a (m/s^{2}).",
                                        "Basel bus case: m=8000 kg, engine force 10000 N, friction 2000 N. Task: compute a (m/s^{2})."
                                ],
                                "ELITE": [
                                        "Basel tram system: three trams (10000, 12000, 15000 kg) each accelerate at 1.5 m/s^{2}. Task: compute total force.",
                                        "Fasnacht parade: 5 floats, each 2000 kg, each pushed with 1000 N. Task: compute system acceleration.",
                                        "Rhine boat: m=2500 kg, thrust 5000 N, water resistance is 20% of thrust. Task: compute a (m/s^{2})."
                                ]
                        },
                        "THIRD_LAW": {
                                "BASIC": [
                                        "Wall interaction demo: you push the wall with 50 N. Task: give the reaction-force magnitude from the wall. Use Newton's third law.",
                                        "Rocket exhaust example: rocket pushes gas with 1000 N. Task: state gas-on-rocket reaction magnitude.",
                                        "Gravity pair check: Earth pulls you with 600 N. Task: state your force on Earth.",
                                        "Tool-impact case: hammer hits nail with 200 N. Task: state nail-on-hammer reaction force.",
                                        "Concept check: action-reaction force pairs act on the same object or different objects?",
                                        "Direction check: action force is 100 N east. Task: state reaction-force direction."
                                ],
                                "CORE": [
                                        "Basel tram-track interaction: tram pushes track with 15000 N. Task: compute track-on-tram reaction magnitude.",
                                        "Rhine propeller case: propeller pushes water backward with 3000 N. Task: compute water-on-boat reaction magnitude.",
                                        "Fasnacht float-ground contact: float pushes ground with 20000 N. Task: state ground-on-float reaction force.",
                                        "SBB wheel-rail system: wheels push track with 50000 N. Task: state track-on-wheel reaction magnitude.",
                                        "Swimming propulsion check: swimmer pushes water backward with 500 N. Task: give water-on-swimmer reaction force.",
                                        "Tire-road traction case: tire pushes road with 4000 N. Task: give road-on-tire reaction magnitude.",
                                        "Rocket plume analysis: rocket pushes exhaust gas with 100000 N. Task: give gas-on-rocket reaction force.",
                                        "Human-wall interaction: person pushes wall with 200 N. Task: state wall-on-person reaction magnitude."
                                ],
                                "ADVANCED": [
                                        "Basel tram with m=10000 kg accelerates at 1.5 m/s^{2}. Task: find force on the track.",
                                        "Rhine boat with m=2000 kg accelerates at 2 m/s^{2}. Task: find force on the water.",
                                        "Fasnacht float with m=3000 kg, friction 500 N, and acceleration 0.5 m/s^{2}. Task: find force on the ground.",
                                        "SBB train with m=50000 kg decelerates at -0.2 m/s^{2}. Task: find force on the track.",
                                        "Rocket with m=5000 kg accelerates at 10 m/s^{2}. Task: find force on the exhaust gas.",
                                        "Car with m=1200 kg accelerates at 3 m/s^{2}. Task: find force on the road.",
                                        "Basel bus with m=8000 kg accelerates at 1 m/s^{2}. Task: find force on the road."
                                ],
                                "ELITE": [
                                        "Collision case: Basel tram (10000 kg) and car (1000 kg); tram exerts 50000 N on car. Task: find car-on-tram reaction force.",
                                        "Rhine boat case: m=2000 kg pushes water with 4000 N and accelerates at 2 m/s^{2}. Task: estimate pushed water mass.",
                                        "Fasnacht float case: m=3000 kg, ground force 2000 N, acceleration 0.5 m/s^{2}. Task: determine friction force.",
                                        "SBB verification case: train m=50000 kg, track force 10000 N, deceleration -0.2 m/s^{2}. Task: verify whether F=ma is satisfied."
                                ]
                        }
                },
                labels: {
                        "ans": "Answer",
                        "placeholder": "type here"
                },
                scenarios: {
                        first_law: "Basel Fasnacht Parade Float Motion: During Basel's famous Fasnacht carnival at Marktplatz, elaborately decorated parade floats demonstrate Newton's First Law of inertia. A massive float with 3,000 kg mass sits at rest before the parade begins. Despite its colorful appearance, it stubbornly resists motion—it will remain at rest unless acted upon by an external force. When parade participants push with 2,000 N while friction opposes with 500 N, the net 1,500 N force overcomes inertia and accelerates the float at 0.5 m/s^{2}. Once moving at constant velocity through the parade route, if pushers maintain force equal to friction, the float continues at steady speed—demonstrating that objects in motion stay in motion with constant velocity when net force is zero.",
                        second_law: "Basel Tram Acceleration and Braking: Basel's iconic green trams navigate the city's streets, demonstrating Newton's Second Law in action. At Barfüsserplatz, a tram with mass 10,000 kg accelerates from rest to reach cruising speed. The electric motors apply a forward force of 15,000 N while friction and air resistance provide 3,000 N of opposing force. Using F=ma, we calculate the net force (12,000 N) produces an acceleration of 1.2 m/s^{2}. When approaching the next stop, the driver applies brakes generating -10,000 N, combined with -3,000 N friction, creating -13,000 N net force and -1.3 m/s^{2} deceleration. This daily dance of forces and motion keeps Basel's public transport running smoothly.",
                        third_law: "Rhine River Boat Propulsion: Along Basel's Rhine River near Mittlere Brücke, passenger boats demonstrate Newton's Third Law through their propulsion systems. When a boat's propeller rotates, it pushes water backward with tremendous force—perhaps 3,000 N for a typical Rhine ferry. According to Newton's Third Law, the water simultaneously pushes the boat forward with an equal 3,000 N force in the opposite direction. This action-reaction pair acts on different objects: the propeller acts on the water, while the water acts on the boat. The boat's 1,500 kg mass accelerates forward at 2 m/s^{2} as a result. This same principle powers everything from swimming to rocket propulsion."
                }
        },

        // SP1.06: Pendulum & Oscillations
        sp1_06: {
                back: "Back to Nexus",
                title: "SP1.06 // PENDULUM & OSCILLATIONS",
                canvas_labels: {
                        ke: "KE",
                        pe: "PE",
                        total: "Total"
                }
        },

        // --- Basel Sek 2 Series (SP2 - Electricity) ---

        // SP2.01: Circuit Basics
        sp2_01: {
                back: "Back to Nexus",
                title: "SP2.01 // CIRCUIT BASICS",
                check: "Verify",
                next: "Next",
                correct: "Circuit Verified",
                incorrect: "Circuit Error",
                monitor_title: "SP2.01_CIRCUIT_LAB",
                labels: {
                        quest: "Quest"
                },
                objective_title: "Circuit Objective",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                stages: {
                        components: "COMPONENTS",
                        simple_circuits: "SIMPLE CIRCUITS",
                        circuit_diagrams: "CIRCUIT DIAGRAMS"
                },
                placeholders: {
                        type_name: "type name",
                        describe_function: "describe function",
                        select_symbol: "select symbol",
                        type_answer: "type answer",
                        identify_fault: "identify fault"
                },
                visualization: {
                        diagram_drawer: {
                                title: "Circuit Diagram Drawer",
                                description: "Draw circuit diagrams using IEC standard symbols",
                                battery: "Battery",
                                bulb: "Bulb",
                                switch: "Switch",
                                wire: "Wire",
                                resistor: "Resistor",
                                place_symbols: "Click to place symbols on the grid",
                                draw: "Draw",
                                clear: "Clear"
                        },
                        circuit_builder: {
                                title: "Circuit Builder",
                                description: "Interactive circuit building coming soon",
                                battery: "Battery",
                                bulb: "Bulb",
                                switch: "Switch",
                                wire: "Wire",
                                resistor: "Resistor",
                                workspace: "Drag components here to build your circuit"
                        }
                },
                scenarios: {
                        components: "Basel Home Electrical Safety: You are a trainee electrician at Basel's vocational school (Gewerbeschule Basel). Today you're learning to identify circuit components for home electrical installations. Understanding each component's function is critical for safety - a misidentified component could cause fires or electrical shocks. In Basel's historic buildings, electrical systems must meet strict Swiss safety standards (NIV 2020). You'll work with batteries (power sources providing voltage), bulbs (converting electrical energy to light), switches (controlling current flow), wires (conducting electricity), and resistors (limiting current). Each component has a specific role in protecting homes and ensuring reliable power delivery. This knowledge is essential for Basel's 170,000 residents who depend on safe electrical systems every day.",
                        simple_circuits: "Basel Christmas Light Installation: You're helping install Christmas lights along Basel's Freie Strasse shopping district. The city requires energy-efficient LED strings that can be controlled independently. You need to understand series circuits (where bulbs are in a single path - if one fails, all go dark) versus parallel circuits (where bulbs are in separate paths - each can be controlled independently). Series circuits are simpler but less reliable. Parallel circuits use more wire but provide redundancy. For Basel's 2km of Christmas lights, parallel circuits with individual switches allow sections to be turned off during the day to save energy. The Basel Christmas market uses over 50,000 LED bulbs, and proper circuit design ensures they operate safely at 230V AC while consuming minimal power.",
                        circuit_diagrams: "Basel Electrical Engineering Apprenticeship: At ABB Switzerland's Basel training center, you're learning to read and draw circuit diagrams - the universal language of electricians worldwide. Circuit symbols are standardized by IEC (International Electrotechnical Commission) so engineers in Basel can collaborate with colleagues in Tokyo or New York. A battery is shown as two parallel lines (long positive, short negative). A bulb is a circle with an X inside. A switch is a gap in the line (open) or continuous line (closed). Resistors are rectangles or zigzags. Ammeters (measuring current in amperes) and voltmeters (measuring voltage in volts) are circles with A or V inside. These symbols appear in every electrical schematic from simple home circuits to complex industrial systems at Basel's Roche and Novartis pharmaceutical plants. Mastering circuit diagrams is essential for your Swiss Federal Certificate of Proficiency (Eidgenössisches Fähigkeitszeugnis EFZ) in electrical engineering."
                },
                prompts: {
                        component_battery: "Battery",
                        component_bulb: "Light Bulb",
                        component_switch: "Switch",
                        component_wire: "Wire",
                        component_resistor: "Resistor",
                        component_name: "During a Basel home-safety inspection, the plan shows symbol {symbol}. Identify the component name so the electrician can approve the installation.",
                        component_function: "In vocational lab training, explain what {component} does in the circuit so the team can place it correctly and safely.",
                        component_symbol: "At the ABB training center, choose the correct symbol for {component} so everyone wires from the same standard diagram.",
                        terminal_question_battery: "Backup-power check in a Basel apartment: a standard battery is used. How many terminals does it have, so polarity can be connected correctly?",
                        terminal_question_bulb: "While testing corridor lighting, decide whether the bulb has polarity (+/- terminals), so wiring mistakes can be avoided.",
                        terminal_question_switch: "For a hallway control loop, what are the two switch states, so operation and fault procedures can be documented?",
                        terminal_question_wire: "When replacing wiring in a historic Basel building, what key property must a wire have to conduct safely?",
                        terminal_question_resistor: "On the lab bench, what information do resistor color bands represent, so current can be calculated and limited?",
                        build_simple_circuit: "In the school lab you must light a test lamp. Given one battery and one bulb, build the closed circuit and verify the basic lighting loop works.",
                        build_series_bulbs: "Christmas-window task: given {count} bulbs, build a series circuit and use the result to evaluate brightness and reliability trade-offs.",
                        build_parallel_bulbs: "Campus display task: given {count} bulbs, build a parallel circuit and use the result to verify that one failure does not black out all lights.",
                        build_switch_control: "Home-lighting retrofit: build a battery-bulb-switch circuit where the switch controls the lamp, then use it for safety acceptance.",
                        draw_iec_diagram: "In ABB apprentice assessment, draw an IEC-standard diagram of a battery connected to a bulb so technicians can implement it consistently.",
                        compare_series_three: "You are comparing lighting options. Build a 3-bulb series circuit and record brightness to decide whether this layout is acceptable.",
                        compare_parallel_three: "You are comparing lighting options. Build a 3-bulb parallel circuit and record brightness to choose the more robust city-display setup.",
                        troubleshoot_not_working: "A field circuit fails and the bulb stays dark. Identify and fix the fault so the festival installation can resume safely.",
                        design_two_switches_one_bulb: "Station stairwell project: design a circuit where two switches independently control one bulb to satisfy two-end control requirements.",
                        design_three_bulbs_independent: "Laboratory zoning project: design a 3-bulb circuit with independent switches so one zone can be changed without affecting others.",
                        design_efficient_four_bulbs: "Municipal energy retrofit: design a circuit that keeps 4 bulbs at full brightness with the fewest components to reduce cost and maintenance.",
                        design_emergency_backup: "Hospital emergency-lighting task: design backup power so if one battery fails, at least one bulb remains on for evacuation guidance.",
                        design_mixed_series_parallel: "Integration exercise: design a mixed circuit where Switch 1 controls 2 bulbs in series and Switch 2 controls 2 bulbs in parallel, and both groups run independently."
                },
                feedback: { correct: "Circuit analysis confirmed.", incorrect: "Circuit configuration error detected." }
        },

        // --- Basel Sek 3 Series (Aligned SP3 Key Map) ---

        // SP3.01: Measurement (from sp1_01)
        sp3_01: {
            placeholders: {
                ellipsis: "..."
            },
                back: "Back to Nexus",
                title: "SP3.01 // MEASUREMENT & UNITS",
                check: "Verify",
                next: "Next",
                correct: "Measurement Verified",
                incorrect: "Measurement Error",
                monitor_title: "SP3.01_MEASUREMENT_LAB",
                objective_title: "Measurement Objective",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                stages: { si_units: "SI UNITS", conversion: "CONVERSION", precision: "PRECISION" },
                tools: { ruler: "Ruler", scale: "Scale", timer: "Timer" },
                labels: {
                        precision: "Measurement Precision",
                        measurement_display: "Measurement Display",
                        input_terminal: "Terminal Input",
                        unit: "\\text{Unit}",
                        sig_figs: "\\text{Sig Figs}",
                        percent: "\\text{Percent}"
                },
                canvas_labels: {
                        ruler: "RULER",
                        ruler_unit: "cm",
                        scale: "DIGITAL SCALE",
                        scale_unit: "kg",
                        stopwatch: "STOPWATCH",
                        stopwatch_unit: "s"
                },
                prompts: {
                        si_unit: "What is the SI unit for {measurement}?",
                        convert: "Convert {value} {from} to {to}",
                        sigfigs: "How many significant figures in {value}?",
                        equivalent_unit: "What unit is equivalent to {expr}?",
                        round_sigfigs: "Round {value} to {sigfigs} significant figures",
                        calculate_with_sigfigs: "Calculate {expr} with proper sig figs",
                        percent_uncertainty: "What is the percent uncertainty of {measurement} {unit}?",
                        hint_si: "The SI unit is {name}",
                        hint_factor: "Multiply by {factor}",
                        hint_sigfigs: "Count all non-zero digits and zeros between them"
                },
                scenarios: {
                        lab_pharma: "Novartis Quality Control: In Basel's pharmaceutical labs, measuring mass correctly is critical. A tiny error can change the entire chemical reaction.",
                        basel_watch: "Swiss Watchmaking Precision: Crafting luxury watches in Basel requires measurements in micrometers. Precision is the soul of Basel's industry."
                },
                feedback: { correct: "Measurement confirmed.", incorrect: "Calibration error detected." },
                hints: {
                        use_metric_prefixes: "Use metric prefixes",
                        simplify_base_units: "Simplify the base units",
                        multiple_steps_needed: "Multiple steps needed",
                        square_or_cube_factor: "Square or cube the conversion factor",
                        convert_num_denom: "Convert numerator and denominator separately",
                        count_sig_figs: "Count non-zero digits and trapped zeros",
                        divide_uncertainty: "Divide uncertainty by measurement"
                }
        },

        // SP3.02: Mechanics - Forces (Existing)
        sp3_02: {
                back: "Return to Hub",
                title: "SP3.02 // FORCES & MOTION",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Active Dynamics Data",
                next: "Proceed to Stage",
                check: "Analyze Force",
                correct: "Equilibrium Reached",
                incorrect: "Force Mismatch",
                monitor_title: "SP3.02_DYNAMICS_MONITOR",
                stages: {
                        newton_1: "INERTIA",
                        newton_2: "F = ma",
                        friction: "FRICTIONAL FORCES"
                },
                placeholders: {
                        force_n: "N",
                        acceleration_ms2: "m/s^2"
                },
                labels: {
                        input: "FORCE PARAMETERS",
                        mass: "Mass (m)",
                        acc: "Acceleration (a)",
                        force: "Force (F)",
                        friction: "Friction (f)",
                        coeff: "Coefficient (μ)",
                        net_force: "Net Force (ΣF)",
                        normal_force: "Normal Force (N)"
                },
                prompts: {
                        // NEWTON 1 - Inertia & Equilibrium
                        rest: "Object (m={m}kg) is at rest. Net force ΣF?",
                        const_v: "Object (m={m}kg) moves at constant velocity {v}m/s. Net force ΣF?",
                        equilibrium: "Forces F_1={f1}N (right) and F_2={f2}N (left) act on object. For equilibrium, F_3?",
                        space: "In deep space (no friction), object (m={m}kg) is pushed with F={f}N for {t}s, then released. Force after release?",
                        inertia: "Object (m={m}kg) at rest. What property resists change in motion?",
                        "2d_balance": "Two perpendicular forces act on object (m={m}kg). Resultant force magnitude?",
                        vector_add: "Forces F_1={f}N (east) and F_2={f}N (north) act on object. Net force magnitude?",
                        slope: "Object (m={m}kg) on slope (θ={theta}°) with friction μ={mu}. Normal force component?",
                        space_friction: "In space, object (m={m}kg) experiences friction μ={mu}. Is this realistic?",
                        complex: "Object (m={m}kg) pulled by F={f}N against friction μ={mu}. Net force?",

                        // NEWTON 2 - F=ma
                        find_f: "Mass m={m}kg accelerates at a={a}m/s^{2}. Find net force F.",
                        find_a: "Net force F={f}N acts on mass m={m}kg. Find acceleration a.",
                        gravity: "Object m={m}kg on planet (g={g}m/s^{2}). Weight force W=mg?",
                        net_force: "Force F={f}N acts on m={m}kg. Friction f={fr}N opposes. Net acceleration?",
                        friction: "Force F={f}N pulls m={m}kg with friction μ={mu}. Acceleration?",
                        pulley: "Pulley system: mass m={m}kg, applied force F={f}N, friction μ={mu}. Acceleration?",
                        variable_mass: "Force F={f}N acts on variable mass system m={m}kg. Effective acceleration?",
                        coupled: "Two masses coupled: m_1={m}kg, applied F={f}N. System acceleration?",

                        // FRICTION
                        static: "Box m={m}kg on floor (μs={mu}). Max static friction force?",
                        kinetic: "Box m={m}kg sliding (μk={mu}). Kinetic friction force?",
                        max_static: "Box m={m}kg on surface (μs={mu}). Maximum static friction before sliding?",
                        kinetic_vs_static: "Box m={m}kg: μs={mu}, μk={mu}. Which friction is larger?",
                        slope_friction: "Box m={m}kg on slope (θ={theta}°) with μ={mu}. Friction force?",
                        critical: "Box m={m}kg pulled by F={f}N with μ={mu}. At critical point, net force?",

                        // Cross-disciplinary ELITE scenarios with vector mathematics
                        rhine_bridge_3d: "Rhine Bridge structural analysis: Cable system supports mass m={m}kg with tension F={f}N at angle θ={theta}° from horizontal. Friction coefficient μ={mu} at anchor point. Calculate the net force component along the bridge deck using 3D vector decomposition (\\\\vec{{F}} = F_x\\\\hat{{i}} + F_y\\\\hat{{j}} + F_z\\\\hat{{k}}).",
                        basel_tram_equilibrium: "Basel Tram BVB Line 8: Tram car m={m}kg on inclined track (θ={theta}°) experiences motor force F={f}N upward along track. Track friction μ={mu}. For equilibrium on the slope, calculate the net force. Use 3D vector analysis with \\\\vec{{F}}_{{net}} = \\\\vec{{F}}_{{motor}} + \\\\vec{{F}}_{{gravity}} + \\\\vec{{f}}_{{friction}}.",
                        roche_tower_structural: "Roche Tower structural load: Building component m={m}kg experiences wind force F={f}N at angle θ={theta}° from vertical. Structural friction μ={mu} at connection joint. Calculate acceleration using vector force decomposition F = ma with \\\\vec{{F}} = (F\\\\cos\\\\theta, F\\\\sin\\\\theta, 0).",
                        basel_port_crane: "Basel Port Rhine crane: Cargo container m={m}kg lifted by crane cable with tension F={f}N at angle θ={theta}° from vertical. Cable friction μ={mu} at pulley. Find acceleration using 3D vector analysis: \\\\vec{{a}} = \\\\vec{{F}}_{{net}}/m where \\\\vec{{F}}_{{net}} = \\\\vec{{T}} + \\\\vec{{W}} + \\\\vec{{f}}.",
                        hospital_equipment_3d: "University Hospital Basel equipment: Medical device m={m}kg on inclined ramp (θ={theta}°) with friction μ={mu}. Applied force F={f}N parallel to ramp surface. Calculate friction force using 3D vector decomposition: \\\\vec{{f}} = \\\\mu\\\\vec{{N}} where \\\\vec{{N}} = mg\\\\cos\\\\theta\\\\hat{{n}}.",

                        // Legacy keys for compatibility
                        n1_const_vel: "Object (m={m}kg) moves at constant velocity {v}m/s. Net force ΣF?",
                        n1_equilibrium: "Forces F_1={f1}N (right) and F_2={f2}N (left) act on object. For equilibrium, F_3?",
                        n1_rest: "Object (m={m}kg) is at rest. Force F={f}N pushes right. Friction f={fr}N acts left. Acceleration?",
                        n1_space: "In deep space (no friction), object (m={m}kg) is pushed with F={f}N for {t}s, then released. Force after release?",
                        n1_inertia: "Which property resists change in motion for a {m}kg object?",
                        n2_find_f: "Mass m={m}kg accelerates at a={a}m/s^{2}. Find net force F.",
                        n2_find_a: "Net force F={f}N acts on mass m={m}kg. Find acceleration a.",
                        n2_find_m: "Net force F={f}N causes acceleration a={a}m/s^{2}. Find mass m.",
                        n2_complex: "Force F={f}N pulls mass m={m}kg against friction f={fr}N. Find acceleration.",
                        n2_gravity: "Object m={m}kg falls on planet (g={g}m/s^{2}). Weight force Fg?",
                        fr_static: "Box m={m}kg on floor (μs={mu}). Max static friction force?",
                        fr_kinetic: "Box m={m}kg sliding (μk={mu}). Kinetic friction force?",
                        fr_norm: "Box m={m}kg pressed against wall with F={f}N. Normal force?",
                        fr_slide: "Box m={m}kg slides on level floor. Friction f={f}N. Coefficient μk?",
                        fr_bank: "Car turns on banked road (θ={theta}°). Friction required?"
                },
                hints: {
                        // NEWTON 1
                        rest: "At rest means v=0, so ΣF=0 (Newton's First Law)",
                        const_v: "Constant velocity means a=0, so ΣF=0",
                        equilibrium: "For equilibrium, all forces must balance: F_1 + F_3 = F_2",
                        space: "After release, no force acts (F=0 in space)",
                        inertia: "Inertia is the property that resists changes in motion",
                        "2d_balance": "Use Pythagorean theorem for perpendicular forces",
                        vector_add: "Use vector addition: |F_net| = √(F_1^{2} + F_2^{2})",
                        slope: "Normal force N = mg cos(θ)",
                        space_friction: "No friction in space (no atmosphere)",
                        complex: "F_net = F_applied - f_friction",

                        // NEWTON 2
                        find_f: "Use F = ma",
                        find_a: "Use a = F/m",
                        gravity: "Weight W = mg",
                        net_force: "F_net = F_applied - f, then a = F_net/m",
                        friction: "f = μN = μmg, then a = (F - f)/m",
                        pulley: "Consider tension and friction forces",
                        variable_mass: "Use F = ma with effective mass",
                        coupled: "Total mass moves together: a = F/m_total",

                        // FRICTION
                        static: "f_s,max = μs × N = μs × mg",
                        kinetic: "f_k = μk × N = μk × mg",
                        max_static: "Maximum static friction before motion starts",
                        kinetic_vs_static: "Static friction is usually larger than kinetic",
                        slope_friction: "f = μN = μ(mg cos θ)",
                        critical: "At critical point, F_applied = f_max",

                        // Cross-disciplinary ELITE hints
                        rhine_bridge_3d: "Decompose tension into components: F_x = F cos θ, F_y = F sin θ. Consider friction force f = μN. Net force: F_net = F_x - f - mg sin θ (along deck).",
                        basel_tram_equilibrium: "For equilibrium on slope: ΣF = 0. Decompose forces into parallel and perpendicular components. F_motor must balance mg sin θ + f where f = μN = μ(mg cos θ).",
                        roche_tower_structural: "Use F = ma with vector decomposition. F_net = F - f where f = μN. Decompose wind force: F_x = F sin θ, F_y = F cos θ. Then a = F_net/m.",
                        basel_port_crane: "Vector sum: F_net = T - W - f. Decompose tension at angle θ: T_y = T cos θ (vertical), T_x = T sin θ (horizontal). Friction f = μT. Acceleration a = F_net/m.",
                        hospital_equipment_3d: "On inclined plane: N = mg cos θ (normal force perpendicular to surface). Friction force f = μN = μ(mg cos θ) acts parallel to surface, opposing motion."
                }
        },

        // SP3.03: Mechanics - Energy (from sp1_03)
        sp3_03: {
                back: "Nexus Exit",
                title: "SP3.03 // ENERGY & WORK",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Energy Conservation Goal",
                next: "Next Transformation",
                check: "Calculate Joules",
                correct: "Energy Conserved",
                incorrect: "Energy Leakage",
                monitor_title: "SP3.03_ENERGY_HUB",
                stages: { potential: "POTENTIAL ENERGY", kinetic: "KINETIC ENERGY", work: "POWER OUTPUT" },
                monitor: {
                        title: "BASEL ENERGY AUDIT",
                        hub_label: "IWB",
                        sources: {
                                solar: "SOLAR",
                                hydro: "HYDRO",
                                grid: "GRID"
                        },
                        meta: {
                                efficiency: "Efficiency",
                                grid_load: "Grid Load"
                        }
                },
                placeholders: {
                        joules: "Joules",
                        value: "value",
                        j_or_w: "J or W"
                },
                scenarios: {
                        rhein_hydro: "Rhine Hydroelectric Power: The flow of the Rhine at the Basel power station converts potential energy into clean electricity for the city.",
                        tram_braking: "Basel Tram Energy Recovery: BVB trams use regenerative braking to feed kinetic energy back into the power grid."
                },
                prompts: {
                        // POTENTIAL ENERGY
                        basic_ep: "Object m={m}kg at height h={h}m. Calculate potential energy Ep (g={g}m/s^{2}).",
                        rhine_hydro: "Rhine water m={m}kg flows from height h={h}m. Potential energy Ep?",
                        total_energy: "Object m={m}kg at h={h}m with velocity v={v}m/s. Total mechanical energy?",
                        conservation: "Object m={m}kg falls from h={h}m, reaching v={v}m/s. Total energy at any point?",

                        // KINETIC ENERGY
                        basic_ek: "Object m={m}kg moves at v={v}m/s. Calculate kinetic energy Ek.",
                        tram_braking: "Basel tram m={m}kg brakes from v={v}m/s. Kinetic energy recovered?",
                        velocity_at_bottom: "Object m={m}kg falls from h={h}m with initial v={v}m/s. Final velocity at bottom?",
                        work_energy: "Object m={m}kg at v={v}m/s. Force F={f}N acts over d={d}m. Final kinetic energy?",

                        // WORK & POWER
                        basic_work: "Force F={f}N moves object d={d}m. Calculate work W.",
                        basic_power: "Force F={f}N moves object d={d}m in t={t}s. Calculate power P.",
                        power_lifting: "Crane lifts m={m}kg to height h={h}m in t={t}s. Power output P?",
                        rhine_power_station: "Rhine station lifts water m={m}kg by h={h}m in t={t}s. Power P?"
                },
                hints: {
                        // POTENTIAL ENERGY
                        basic_ep: "Use Ep = mgh",
                        rhine_hydro: "Potential energy Ep = mgh, where g=9.8m/s^{2}",
                        total_energy: "Total E = Ep + Ek = mgh + ½mv^{2}",
                        conservation: "Energy is conserved: E_total = Ep + Ek = constant",

                        // KINETIC ENERGY
                        basic_ek: "Use Ek = ½mv^{2}",
                        tram_braking: "Kinetic energy Ek = ½mv^{2}",
                        velocity_at_bottom: "Use energy conservation: mgh + ½mv₀^{2} = ½mv^{2}",
                        work_energy: "Work-energy theorem: W = ΔEk, so Ek_final = Ek_initial + W",

                        // WORK & POWER
                        basic_work: "Work W = Fs (force × distance)",
                        basic_power: "Power P = W/t = Fs/t",
                        power_lifting: "P = W/t = mgh/t",
                        rhine_power_station: "Power P = mgh/t"
                }
        },

        // SP3.04: Fluids & Pressure (from sp1_07)
        sp3_04: {
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                monitor_title: "SP3.04_FLUID_MONITOR",
                objective_title: "Active Mission Objective",
                stages: { pressure: "PRESSURE", buoyancy: "BUOYANCY", hydraulics: "HYDRAULICS" },
            placeholders: {
                yes: "yes",
                            v_98000: "98000",
                v_50000: "50000",
                v_50: "50",
                v_400: "400",
                v_20000: "20000",
                v_248000: "248000",
                v_156800: "156800",
                v_1009400: "1009400",
                v_450800: "450800",
                v_10000: "10000",
                v_0_dot_735: "0.735",
                v_1000: "1000",
                v_2119800: "2119800",
                v_113_dot_1: "113.1",
                v_100: "100",
                v_168880: "168880",
                v_40000: "40000",
                v_10_dot_09: "10.09",
                v_980: "980",
                v_490: "490",
                v_2_dot_35: "2.35",
                v_98: "98",
                v_4900: "4900",
                minus_520: "-520",
                v_0_dot_9: "0.9",
                v_500: "500",
                v_2940: "2940",
                v_0_dot_00005: "0.00005",
                v_15: "15",
                v_179_dot_34: "179.34",
                v_100000: "100000",
                v_882: "882",
                v_0_dot_126: "0.126",
                v_0_dot_52: "0.52",
                v_6667: "6667",
                v_2000: "2000",
                v_3000: "3000",
                v_0_dot_5: "0.5",
                v_0_dot_1: "0.1",
                v_1800: "1800",
                v_7_dot_5: "7.5",
                v_5000: "5000",
                v_1900: "1900",
                v_300: "300"
},
                prompts: {
                        pressure_depth: "A swimmer dives to {depth} m in the Rhine. Calculate total pressure.",
                        buoyant_force: "An object with {volume} m^{3} is submerged in the Rhine. Calculate buoyancy.",
                        hint_pressure: "Use P = P₀ + ρgh",
                        hint_archimedes: "Use F_b = ρ_water × V × g",
                        buoyancy: "Buoyancy",

                        buoyancy_basic_1: "\\text{An object of volume } V = 0.1 \\text{ m}^{3} \\text{ is fully submerged in water } (\\rho = 1000 \\text{ kg/m}^{3},\\; g = 9.8 \\text{ m/s}^{2}). \\text{ Calculate the buoyant force } F_b.",
                        buoyancy_basic_2: "\\text{A solid block with volume } V = 0.05 \\text{ m}^{3} \\text{ is fully submerged in water } (\\rho = 1000,\\; g = 9.8). \\text{ Find the buoyant force } F_b.",
                        buoyancy_basic_3: "\\text{A weather balloon of volume } V = 0.2 \\text{ m}^{3} \\text{ floats in air } (\\rho_{air} = 1.2 \\text{ kg/m}^{3},\\; g = 9.8). \\text{ Calculate the buoyant force.}",
                        buoyancy_basic_4: "\\text{A rock of volume } V = 0.01 \\text{ m}^{3} \\text{ is fully submerged in water } (\\rho = 1000,\\; g = 9.8). \\text{ Find the buoyant force } F_b.",
                        buoyancy_basic_5: "\\text{A boat displaces } V = 0.5 \\text{ m}^{3} \\text{ of river water } (\\rho = 1000 \\text{ kg/m}^{3},\\; g = 9.8). \\text{ What buoyant force keeps it afloat?}",

                        buoyancy_core_1: "\\text{A wooden block has mass } m = 10 \\text{ kg} \\text{ and volume } V = 0.02 \\text{ m}^{3}. \\text{ Calculate its density and determine: does it float in water?}",
                        buoyancy_core_2: "\\text{An object weighs } W = 1500 \\text{ N} \\text{ and has volume } V = 0.1 \\text{ m}^{3} \\text{ (fully submerged in water). Find the net force } F_{net} = F_b - W.",
                        buoyancy_core_3: "\\text{Ice has density } \\rho_{ice} = 900 \\text{ kg/m}^{3} \\text{ floating in fresh water } (\\rho_w = 1000). \\text{ What fraction } f \\text{ of its volume is submerged?}",
                        buoyancy_core_4: "\\text{An aluminium block: } m = 81 \\text{ kg},\\; V = 0.03 \\text{ m}^{3} \\text{ is suspended in water. Find its apparent weight } W_{app} = W - F_b.",
                        buoyancy_core_5: "\\text{Hot-air balloon volume } V = 1000 \\text{ m}^{3},\\; \\rho_{air} = 1.2 \\text{ kg/m}^{3},\\; \\rho_{hot} = 0.9. \\text{ Calculate the net lift force } F_{lift}.",

                        buoyancy_advanced_1: "\\text{A hydrometer of mass } m = 50 \\text{ g} \\text{ floats at equilibrium in water } (\\rho_w = 1000 \\text{ kg/m}^{3}). \\text{ At equilibrium } W = F_b. \\text{ Find the submerged volume } V_{sub}.",
                        buoyancy_advanced_2: "\\text{A cargo ship of total mass } m = 50{,}000 \\text{ kg} \\text{ floats in fresh water } (\\rho = 1000 \\text{ kg/m}^{3}). \\text{ Calculate the volume of water displaced.}",
                        buoyancy_advanced_3: "\\text{Cork block: } \\rho_{cork} = 250 \\text{ kg/m}^{3},\\; V = 0.02 \\text{ m}^{3} \\text{ floating in water. What maximum extra mass } m_{load} \\text{ can it carry before sinking?}",
                        buoyancy_advanced_4: "\\text{A gold block: } m = 19.3 \\text{ kg},\\; V = 0.001 \\text{ m}^{3} \\text{ is held by a string while fully submerged. Find string tension } T = W - F_b.",
                        buoyancy_advanced_5: "\\text{Submarine: hull volume } V = 500 \\text{ m}^{3},\\text{ dry mass } m_{sub} = 400{,}000 \\text{ kg}. \\text{ How much ballast water } m_{ballast} \\text{ must flood the tanks to achieve neutral buoyancy?}",

                        buoyancy_elite_1: "\\text{Object of total volume } V = 0.1 \\text{ m}^{3}: \\text{ half submerged in water } (\\rho_w = 1000), \\text{ half in oil } (\\rho_o = 800). \\text{ Find total buoyant force } F_b.",
                        buoyancy_elite_2: "\\text{Hollow sphere: outer radius } R = 0.2 \\text{ m},\\; \\text{inner radius } r = 0.15 \\text{ m},\\; m = 10 \\text{ kg}. \\text{ Compute average density. Will it float in water?}",
                        buoyancy_elite_3: "\\text{Iceberg } (\\rho_{ice} = 900 \\text{ kg/m}^{3}) \\text{ floats in seawater } (\\rho_{sea} = 1030). \\text{ Find fraction } f_{above} = 1 - \\rho_{ice}/\\rho_{sea} \\text{ above the surface.}",
                        buoyancy_elite_4: "\\text{Helium balloon: } V = 1 \\text{ m}^{3},\\; \\rho_{He} = 0.18,\\; \\rho_{air} = 1.2 \\text{ kg/m}^{3},\\text{ envelope mass } = 0.5 \\text{ kg}. \\text{ Find maximum payload } m_{payload}.",
                        buoyancy_elite_5: "\\text{Crown test: weight in air } W_{air} = 10 \\text{ N},\\text{ weight in water } W_{water} = 8.5 \\text{ N}. \\text{ Use Archimedes to find the crown density } \\rho.",

                        hydraulics: "Hydraulics",

                        hydraulics_basic_1: "\\text{A force } F = 100 \\text{ N} \\text{ acts on a piston of area } A = 0.01 \\text{ m}^{2}. \\text{ Using } P = F/A, \\text{ calculate the hydraulic pressure transmitted.}",
                        hydraulics_basic_2: "\\text{A hydraulic piston of area } A = 0.02 \\text{ m}^{2} \\text{ is pushed with force } F = 200 \\text{ N}. \\text{ Find the resulting pressure } P.",
                        hydraulics_basic_3: "\\text{A piston of area } A = 0.05 \\text{ m}^{2} \\text{ receives force } F = 500 \\text{ N}. \\text{ What fluid pressure does it generate?}",
                        hydraulics_basic_4: "\\text{Hydraulic cylinder: piston area } A = 0.1 \\text{ m}^{2},\\text{ applied force } F = 1000 \\text{ N}. \\text{ Calculate the fluid pressure.}",
                        hydraulics_basic_5: "\\text{Small input piston: } A = 0.005 \\text{ m}^{2},\\; F = 50 \\text{ N}. \\text{ What pressure } P \\text{ is transmitted through the hydraulic fluid?}",

                        hydraulics_core_1: "\\text{Hydraulic lift: } A_1 = 0.01 \\text{ m}^{2},\\; A_2 = 0.1 \\text{ m}^{2},\\; F_1 = 100 \\text{ N}. \\text{ Using Pascal's law, find output force } F_2.",
                        hydraulics_core_2: "\\text{Hydraulic brake: } A_1 = 0.005 \\text{ m}^{2},\\; A_2 = 0.05 \\text{ m}^{2},\\; F_1 = 50 \\text{ N}. \\text{ Find the braking force } F_2 \\text{ at the wheel.}",
                        hydraulics_core_3: "\\text{Hydraulic jack: } A_1 = 0.02 \\text{ m}^{2},\\; A_2 = 0.2 \\text{ m}^{2},\\; F_1 = 200 \\text{ N}. \\text{ Find lifting force } F_2.",
                        hydraulics_core_4: "\\text{Hydraulic press: } A_1 = 0.001 \\text{ m}^{2},\\; A_2 = 0.1 \\text{ m}^{2},\\; F_1 = 10 \\text{ N}. \\text{ Calculate output force } F_2.",
                        hydraulics_core_5: "\\text{Hydraulic system: } A_1 = 0.03 \\text{ m}^{2},\\; A_2 = 0.3 \\text{ m}^{2},\\; F_1 = 300 \\text{ N}. \\text{ Find } F_2.",

                        hydraulics_advanced_1: "\\text{Hydraulic lift design: } A_1 = 0.01 \\text{ m}^{2},\\; F_1 = 100 \\text{ N}. \\text{ Required output force } F_2 = 5000 \\text{ N}. \\text{ Find necessary output piston area } A_2.",
                        hydraulics_advanced_2: "\\text{Volume conservation: } A_1 = 0.002 \\text{ m}^{2},\\; A_2 = 0.2 \\text{ m}^{2}. \\text{ Input piston moves } d_1 = 10 \\text{ cm}. \\text{ How far does output piston move?}",
                        hydraulics_advanced_3: "\\text{Hydraulic press at 90\\% efficiency: } A_1 = 0.01 \\text{ m}^{2},\\; A_2 = 0.1 \\text{ m}^{2},\\; F_1 = 200 \\text{ N}. \\text{ Find actual output force } F_2.",
                        hydraulics_advanced_4: "\\text{Hydraulic jack: } A_1 = 0.005 \\text{ m}^{2},\\; A_2 = 0.5 \\text{ m}^{2},\\; F_1 = 100 \\text{ N}. \\text{ Calculate mechanical advantage } MA = A_2/A_1.",
                        hydraulics_advanced_5: "\\text{Hydraulic brake: } A_1 = 0.01 \\text{ m}^{2},\\; F_1 = 150 \\text{ N}, \\text{ piston 1 moves } d_1 = 5 \\text{ cm}. \\text{ Calculate work done } W = F_1 \\cdot d_1.",

                        hydraulics_elite_1: "\\text{Three-stage hydraulic system: } A_1 = 0.001,\\; A_2 = 0.01,\\; A_3 = 0.1 \\text{ m}^{2},\\; F_1 = 50 \\text{ N}. \\text{ Find final output force } F_3.",
                        hydraulics_elite_2: "\\text{Hydraulic system with friction: } A_1 = 0.01,\\; A_2 = 0.1 \\text{ m}^{2},\\; F_1 = 200 \\text{ N}, \\text{ friction} = 100 \\text{ N}. \\text{ Find net output force } F_2.",
                        hydraulics_elite_3: "\\text{Hydraulic accumulator at pressure } P = 2 \\times 10^{6} \\text{ Pa}. \\text{ Output piston area } A_2 = 0.05 \\text{ m}^{2}. \\text{ Find the output force.}",
                        hydraulics_elite_4: "\\text{Hydraulic damper: applied force } F_{applied} = 500 \\text{ N}, \\text{ viscous resistance } F_{res} = 200 \\text{ N}. \\text{ Find net output force } F_{net}.",
                        hydraulics_elite_5: "\\text{Series hydraulic circuit: } A_1 = 0.002,\\; A_2 = 0.02,\\; A_3 = 0.2 \\text{ m}^{2}. \\text{ Find total mechanical advantage } MA_{total} = A_3/A_1.",

                        pressure: "Pressure",

                        pressure_basic_1: "\\text{A diver descends to } h = 10 \\text{ m} \\text{ in fresh water } (\\rho = 1000 \\text{ kg/m}^{3},\\; g = 9.8 \\text{ m/s}^{2}). \\text{ Calculate the gauge pressure } P = \\rho g h.",
                        pressure_basic_2: "\\text{A water tank is filled to depth } h = 5 \\text{ m}. \\text{ Given } \\rho = 1000 \\text{ kg/m}^{3} \\text{ and } g = 10 \\text{ m/s}^{2}, \\text{ find the pressure at the bottom.}",
                        pressure_basic_3: "\\text{A force of } F = 100 \\text{ N} \\text{ acts uniformly on a surface of area } A = 2 \\text{ m}^{2}. \\text{ Calculate the resulting pressure } P = F/A.",
                        pressure_basic_4: "\\text{A hydraulic piston exerts force } F = 200 \\text{ N} \\text{ on fluid over area } A = 0.5 \\text{ m}^{2}. \\text{ What pressure is transmitted?}",
                        pressure_basic_5: "\\text{A swimmer is } h = 2 \\text{ m} \\text{ below the surface } (\\rho = 1000 \\text{ kg/m}^{3},\\; g = 10 \\text{ m/s}^{2}). \\text{ Find the gauge pressure at that depth.}",

                        pressure_core_1: "\\text{A submarine at depth } h = 15 \\text{ m} \\text{ in water } (\\rho = 1000 \\text{ kg/m}^{3}). \\text{ Given } P_{atm} = 101{,}000 \\text{ Pa}, \\text{ find total absolute pressure.}",
                        pressure_core_2: "\\text{Hydraulic press: force } F = 500 \\text{ N} \\text{ acts on piston area } A = 0.01 \\text{ m}^{2}. \\text{ What pressure is developed in the fluid?}",
                        pressure_core_3: "\\text{Oil tank filled to depth } h = 20 \\text{ m} \\;(\\rho_{oil} = 800 \\text{ kg/m}^{3},\\; g = 9.8). \\text{ Calculate the gauge pressure at the tank base.}",
                        pressure_core_4: "\\text{Piston of area } A = 0.02 \\text{ m}^{2} \\text{ transmits force } F = 1000 \\text{ N}. \\text{ What pressure is delivered through the hydraulic circuit?}",
                        pressure_core_5: "\\text{Ocean depth } h = 100 \\text{ m} \\text{ in seawater } (\\rho = 1030 \\text{ kg/m}^{3},\\; g = 9.8). \\text{ Calculate the gauge pressure at that depth.}",

                        pressure_advanced_1: "\\text{Two-fluid column: 30 m of water } (\\rho_w = 1000) \\text{ above 20 m of oil } (\\rho_o = 800). \\text{ Find the total pressure at the bottom of the oil layer.}",
                        pressure_advanced_2: "\\text{Hydraulic lift: } A_1 = 0.001 \\text{ m}^{2},\\; A_2 = 0.1 \\text{ m}^{2},\\; F_1 = 100 \\text{ N}. \\text{ Apply Pascal's law to find output force } F_2.",
                        pressure_advanced_3: "\\text{U-tube manometer: water column } h_w = 10 \\text{ m} \\text{ on left, mercury } (\\rho_{Hg} = 13{,}600) \\text{ on right. Find mercury height } h_{Hg} \\text{ at pressure balance.}",
                        pressure_advanced_4: "\\text{Hydraulic brake: master cylinder } A_1 = 0.01 \\text{ m}^{2},\\text{ slave cylinder } A_2 = 0.05 \\text{ m}^{2},\\text{ pedal force } F_1 = 200 \\text{ N}. \\text{ Find braking force } F_2.",
                        pressure_advanced_5: "\\text{Deep-sea submersible at } h = 200 \\text{ m} \\;(\\rho = 1030 \\text{ kg/m}^{3},\\; P_{atm} = 101{,}000 \\text{ Pa}). \\text{ Find total absolute pressure.}",

                        pressure_elite_1: "\\text{Mariana Trench depth } h = 11{,}000 \\text{ m} \\;(\\rho = 1050 \\text{ kg/m}^{3},\\; P_{atm} = 101{,}000 \\text{ Pa}). \\text{ Calculate total pressure in MPa.}",
                        pressure_elite_2: "\\text{Hydraulic amplifier: input piston } A_1 = 0.0001 \\text{ m}^{2},\\text{ output piston } A_2 = 0.01 \\text{ m}^{2}. \\text{ Calculate mechanical advantage } MA = A_2/A_1.",
                        pressure_elite_3: "\\text{Three-layer fluid column: 2 m water } (\\rho = 1000), \\text{ 2 m oil } (\\rho = 800), \\text{ 1 m mercury } (\\rho = 13{,}600). \\text{ Find total pressure at the base.}",
                        pressure_elite_4: "\\text{Hydraulic jack at 80\\% efficiency: } F_1 = 500 \\text{ N},\\; A_1 = 0.002 \\text{ m}^{2},\\; A_2 = 0.2 \\text{ m}^{2}. \\text{ Find actual output force } F_2.",
                        pressure_elite_5: "\\text{Submarine hatch area } A = 1 \\text{ m}^{2} \\text{ at depth } h = 1000 \\text{ m} \\;(\\rho = 1030). \\text{ Find the net water force on the hatch in MN.}",

                        energy_audit: "Energy Audit",
                        energy_audit_heatpump: "Energy Audit - Heat Pump",
                        energy_audit_solar: "Energy Audit - Solar Panel",
                        iwb_grid_load: "Grid Load",
                        sp1_03_q1: "Question 1",
                        sp1_03_q2: "Question 2",
                        sp1_03_q3: "Question 3",
                        sp1_04_q1: "Question 1",
                        sp1_04_q2: "Question 2",
                        sp1_04_q3: "Question 3"
                },
                scenarios: {
                        rhine_swimming: "Rhine River Swimming: Divers explore the Rhine bed near Mittlere Brücke. Water pressure increases with depth.",
                        rhine_boat: "Rhine Cargo: Understanding buoyancy is critical for the barges navigating between Basel and Rotterdam."
                },
                feedback: { correct: "Fluid mechanics mastered!", incorrect: "Review Archimedes' principle." },

                hints: {
                        archimedes_principle: "\\text{Archimedes' Principle}",
                        compare_densities: "\\text{Compare densities}",
                        at_equilibrium: "\\text{At equilibrium: } W = F_b",
                        weight_equals_buoyancy: "\\text{Weight = Buoyant force}",
                        pressure_force_per_area: "\\text{Pressure is force per unit area}"
                },
                        labels: {
                        float_q: "\\text{Float?}"
                },
                        targets: {
                        answer: "\\text{Answer}"
                },
                        corrects: {
                        yes_density_less_water: "\\text{Yes (density < water)}",
                        yes_rho_avg_less_1000: "\\text{Yes (} \\rho_{avg} < 1000 \\text{)}"
                }
        }
,

        // SP3.05: Simple Machines (from sp1_04 - Full Version)
        sp3_05: {
            placeholders: {
                ellipsis: "..."
            },
                back: "Return to Nexus",
                title: "SP3.05 // SIMPLE MACHINES",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                monitor_title: "SP3.05_MECHANICS_MONITOR",
                objective_title: "Active Mission Objective",
                stages: {
                        levers: "LEVERS",
                        pulleys: "PULLEYS",
                        inclined_planes: "INCLINED PLANES"
                },
                labels: {
                        machine_display: "Machine Display",
                        input_terminal: "Input Terminal",
                        force_ratio: "Mechanical Advantage (MA)",
                        show_forces: "Show Forces",
                        mechanics_score: "Mechanics Score"
                },
                prompts: {
                        lever: "A lever lifts a {load} N load. If effort arm is {effortArm} m and load arm is {loadArm} m, what effort force is needed?",
                        lever_class: "Class {class} lever: load {load} N, effort arm {effortArm} m, load arm {loadArm} m. Effort?",
                        lever_efficiency: "Lever with {efficiency}% efficiency: load {load} N, MA = {ma}. Actual effort?",
                        lever_two_stage: "Two-stage lever system: each stage MA = {ma}, load {load} N. Input effort?",
                        pulley: "A pulley system lifts a {load} N load with {strands} supporting strands. What effort force is needed?",
                        pulley_fixed_movable: "Pulley: {movable} movable, {fixed} fixed. Load {load} N. Effort?",
                        pulley_efficiency: "Pulley: {strands} strands, {efficiency}% efficiency, load {load} N. Actual effort?",
                        pulley_block_tackle: "Block and tackle: {blocks} blocks, {strands} strands, load {load} N. Effort?",
                        inclined_plane: "An inclined plane lifts a {load} N load to height {height} m over length {length} m. What effort force is needed?",
                        inclined_angle: "Inclined plane: angle {angle}°, load {load} N. Effort parallel to plane?",
                        inclined_friction: "Inclined plane: h={height} m, l={length} m, load {load} N, friction μ={friction}. Effort?",
                        screw_jack: "Screw jack: pitch {pitch} cm, handle radius {radius} cm, load {load} N. Effort?",
                        hint_lever: "Use MA = effort arm / load arm, then F_effort = F_load / MA",
                        hint_pulley: "Use MA = number of strands, then F_effort = F_load / MA",
                        hint_inclined: "Use MA = length / height, then F_effort = F_load / MA"
                },
                scenarios: {
                        basel_construction: "Basel Construction Site: Workers at Basel's Roche Tower construction site use levers, pulleys, and ramps to move heavy materials efficiently.",
                        lever_crowbar: "Crowbar at Basel Renovation: Renovating historic buildings requires careful use of levers to lift heavy stones.",
                        pulley_crane: "Construction Crane Pulley: Basel's cranes use multiple pulley strands to lift steel beams at the port.",
                        ramp_loading: "Loading Ramp at Basel Port: Rhine port workers use inclined planes to load cargo onto barges.",
                        compound_machine: "Compound Machines: Real construction equipment in Basel combines these principles for massive lifting tasks."
                },
                feedback: {
                        correct: "Mechanical advantage calculated correctly!",
                        incorrect: "Check your mechanical advantage calculation."
                },
                hints: {
                        for_friction_losses: "Account for friction losses",
                        pulleys_double_ma: "Movable pulleys double MA",
                        for_friction: "Account for friction",
                        all_supporting_strands: "Count all supporting strands",
                        friction_component: "Add friction component",
                        is_inclined_plane_wrapped_around_cylinder: "Screw is inclined plane wrapped around cylinder"
                }
        },

        // SP3.07: Navigation & Vectors - Rhine Ferry (60 questions: 3 stages × 4 difficulties × 5 questions)
        sp3_07: {
                back: "Return to Hub",
                title: "SP3.07 // NAVIGATION & VECTORS",
                difficulty: {
                        basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE"
                },
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                monitor_title: "SP3.07_FERRY_MONITOR",
                stages: {
                        composition: "VECTOR ADDITION",
                        drift: "DRIFT ANALYSIS",
                        navigation: "PRECISION NAV"
                },
                labels: {
                        river_speed: "River Speed (v_r)",
                        ferry_speed: "Ferry Speed (v_f)",
                        cable_angle: "Cable Angle (θ)",
                        resultant_speed: "Net Velocity (v_net)",
                        drift_speed: "Drift Speed",
                        angle: "Angle",
                        mission_objective: "MISSION OBJECTIVE",
                        terminal_input: "TERMINAL INPUT",
                        hint: "HINT",
                        next_mission: "NEXT MISSION"
                },
                mission: {
                        title: "RHINE CROSSING MISSION",
                        description: "Navigate the Basel Rhine ferry across the Rhine River. Master vector addition to compensate for the river's current using cable angles and ferry speed."
                },
            placeholders: {
                m_s: "m/s",
                deg: "deg",
                s: "s",
                m: "m",
                j: "J"
            },
                prompts: {
                        // COMPOSITION - BASIC (5 questions)
                        c_b1: "\\text{Ferry: } 2\\text{ m/s north, River: } 1\\text{ m/s north. Net speed?}",
                        c_b2: "\\text{Ferry: } 1.5\\text{ m/s south, River: } 1.5\\text{ m/s north. Net speed?}",
                        c_b3: "\\text{Ferry: } 3\\text{ m/s north, River: } 0.5\\text{ m/s north. Net speed?}",
                        c_b4: "\\text{Ferry: } 3\\text{ m/s south, River: } 2\\text{ m/s north. Net speed?}",
                        c_b5: "\\text{Ferry: } 4\\text{ m/s north, River: } 1\\text{ m/s north. Net speed?}",
                        // COMPOSITION - CORE (5 questions)
                        c_c1: "\\text{Ferry: } 4\\text{ m/s east, River: } 3\\text{ m/s north (perpendicular). Net speed?}",
                        c_c2: "\\text{Ferry: } 1\\text{ m/s east, River: } 1\\text{ m/s north. Net speed?}",
                        c_c3: "\\text{Ferry: } 2\\text{ m/s east, River: } 2\\text{ m/s north. Net speed?}",
                        c_c4: "\\text{Ferry: } 2\\text{ m/s east, River: } 1.5\\text{ m/s north. Net speed?}",
                        c_c5: "\\text{Ferry: } 12\\text{ m/s east, River: } 5\\text{ m/s north. Net speed?}",
                        // COMPOSITION - ADVANCED (5 questions)
                        c_a1: "\\text{Ferry: } 4\\text{ m/s at } 60^\\circ\\text{. Find horizontal component.}",
                        c_a2: "\\text{Ferry: } 2\\text{ m/s at } 30^\\circ\\text{, River: } 1\\text{ m/s north. Net vertical?}",
                        c_a3: "\\text{Ferry: } 3\\text{ m/s at } 45^\\circ\\text{. Find horizontal component.}",
                        c_a4: "\\text{Ferry: } 6\\text{ m/s at } 30^\\circ\\text{, River: } 2\\text{ m/s north. Net vertical?}",
                        c_a5: "\\text{Ferry: } 4\\text{ m/s at } 60^\\circ\\text{, River: } 1\\text{ m/s north. Net vertical?}",
                        // COMPOSITION - ELITE (5 questions)
                        c_e1: "\\text{Ferry: } 5\\text{ m/s at } 53^\\circ\\text{, River: } 2\\text{ m/s north. Net magnitude?}",
                        c_e2: "\\text{Ferry: } 4\\text{ m/s at } 37^\\circ\\text{, River: } 1.5\\text{ m/s north. Net magnitude?}",
                        c_e3: "\\text{Ferry: } 8\\text{ m/s at } 45^\\circ\\text{, River: } 3\\text{ m/s north. Net angle?}",
                        c_e4: "\\text{Ferry: } 6\\text{ m/s at } 60^\\circ\\text{, River: } 2.5\\text{ m/s north. Net magnitude?}",
                        c_e5: "\\text{Ferry: } 5\\text{ m/s at } 30^\\circ\\text{, River: } 1\\text{ m/s north. Net angle?}",
                        // DRIFT - BASIC (5 questions)
                        d_b1: "\\text{River: } 1\\text{ m/s, Ferry: } 2\\text{ m/s. Angle for zero drift?}",
                        d_b2: "\\text{River: } 1.5\\text{ m/s, Ferry: } 3\\text{ m/s. Angle for zero drift?}",
                        d_b3: "\\text{River: } 2\\text{ m/s, Ferry: } 4\\text{ m/s. Angle for zero drift?}",
                        d_b4: "\\text{River: } 0.5\\text{ m/s, Ferry: } 1\\text{ m/s. Angle for zero drift?}",
                        d_b5: "\\text{River: } 3\\text{ m/s, Ferry: } 6\\text{ m/s. Angle for zero drift?}",
                        // DRIFT - CORE (5 questions)
                        d_c1: "\\text{River: } 1\\text{ m/s, Ferry: } 1.73\\text{ m/s. Angle for zero drift?}",
                        d_c2: "\\text{River: } 2\\text{ m/s, Ferry: } 2.83\\text{ m/s. Angle for zero drift?}",
                        d_c3: "\\text{River: } 1.5\\text{ m/s, Ferry: } 2.12\\text{ m/s. Angle for zero drift?}",
                        d_c4: "\\text{River: } 3\\text{ m/s, Ferry: } 5\\text{ m/s. Angle for zero drift?}",
                        d_c5: "\\text{River: } 2.5\\text{ m/s, Ferry: } 3.54\\text{ m/s. Angle for zero drift?}",
                        // DRIFT - ADVANCED (5 questions)
                        d_a1: "\\text{River: } 1.2\\text{ m/s, Ferry: } 2\\text{ m/s. Angle for zero drift?}",
                        d_a2: "\\text{River: } 1.8\\text{ m/s, Ferry: } 3.6\\text{ m/s. Angle for zero drift?}",
                        d_a3: "\\text{River: } 2.4\\text{ m/s, Ferry: } 4\\text{ m/s. Angle for zero drift?}",
                        d_a4: "\\text{River: } 3.5\\text{ m/s, Ferry: } 7\\text{ m/s. Angle for zero drift?}",
                        d_a5: "\\text{River: } 1.6\\text{ m/s, Ferry: } 3.2\\text{ m/s. Angle for zero drift?}",
                        // DRIFT - ELITE (5 questions)
                        d_e1: "\\text{River: } 2.7\\text{ m/s, Ferry: } 4.5\\text{ m/s. Angle for zero drift?}",
                        d_e2: "\\text{River: } 3.2\\text{ m/s, Ferry: } 6.4\\text{ m/s. Angle for zero drift?}",
                        d_e3: "\\text{River: } 1.4\\text{ m/s, Ferry: } 2.8\\text{ m/s. Angle for zero drift?}",
                        d_e4: "\\text{River: } 2.1\\text{ m/s, Ferry: } 4.2\\text{ m/s. Angle for zero drift?}",
                        d_e5: "\\text{River: } 4\\text{ m/s, Ferry: } 8\\text{ m/s. Angle for zero drift?}",
                        // NAVIGATION - BASIC (5 questions)
                        n_b1: "\\text{Cross 20m river at } 2\\text{ m/s perpendicular. Time?}",
                        n_b2: "\\text{Cross 30m river at } 3\\text{ m/s perpendicular. Time?}",
                        n_b3: "\\text{Cross 40m river at } 4\\text{ m/s perpendicular. Time?}",
                        n_b4: "\\text{Cross 25m river at } 5\\text{ m/s perpendicular. Time?}",
                        n_b5: "\\text{Cross 50m river at } 2.5\\text{ m/s perpendicular. Time?}",
                        // NAVIGATION - CORE (5 questions)
                        n_c1: "\\text{Cross 20m river, ferry } 2\\text{ m/s at } 60^\\circ\\text{. Time?}",
                        n_c2: "\\text{Cross 30m river, ferry } 3\\text{ m/s at } 30^\\circ\\text{. Time?}",
                        n_c3: "\\text{Cross 40m river, ferry } 4\\text{ m/s at } 45^\\circ\\text{. Time?}",
                        n_c4: "\\text{Cross 25m river, ferry } 2.5\\text{ m/s at } 60^\\circ\\text{. Time?}",
                        n_c5: "\\text{Cross 50m river, ferry } 5\\text{ m/s at } 30^\\circ\\text{. Time?}",
                        // NAVIGATION - ADVANCED (5 questions)
                        n_a1: "\\text{Cross 20m river, ferry } 2.4\\text{ m/s at } 120^\\circ\\text{. Time?}",
                        n_a2: "\\text{Ferry crosses in 7.7s at } 120^\\circ\\text{, river } 1.5\\text{ m/s. Drift distance?}",
                        n_a3: "\\text{Cross 30m river, ferry } 4\\text{ m/s at } 120^\\circ\\text{. Time?}",
                        n_a4: "\\text{Cross 25m river, ferry } 2\\text{ m/s at } 135^\\circ\\text{. Time?}",
                        n_a5: "\\text{Cross 40m river, ferry } 3.6\\text{ m/s at } 120^\\circ\\text{, river } 1.8\\text{ m/s. Drift?}",
                        // NAVIGATION - ELITE (5 questions)
                        n_e1: "\\text{Ferry } 5\\text{ m/s at } 120^\\circ\\text{, river } 2.5\\text{ m/s. Net velocity magnitude?}",
                        n_e2: "\\text{Cross 30m + return, ferry } 4\\text{ m/s at } 135^\\circ\\text{, river } 1.5\\text{ m/s. Total time?}",
                        n_e3: "\\text{Cross 40m, ferry } 6\\text{ m/s at } 120^\\circ\\text{, river } 3\\text{ m/s. Total path length?}",
                        n_e4: "\\text{Cross 30m, ferry } 5\\text{ m/s at } 126.9^\\circ\\text{, river } 2\\text{ m/s. Path angle?}",
                        n_e5: "\\text{Ferry mass 1kg, } 3\\text{ m/s at } 110^\\circ\\text{, river } 1\\text{ m/s. Kinetic energy?}"
                },
                hints: {
                        // COMPOSITION hints
                        c_b1: "\\text{Add velocities: } 2 + 1 = 3",
                        c_b2: "\\text{Opposite directions cancel: } 1.5 - 1.5 = 0",
                        c_b3: "\\text{Add velocities: } 3 + 0.5 = 3.5",
                        c_b4: "\\text{Subtract: } 3 - 2 = 1",
                        c_b5: "\\text{Add velocities: } 4 + 1 = 5",
                        c_c1: "\\text{Pythagorean: } \\sqrt{4^{2} + 3^2} = 5",
                        c_c2: "\\text{Pythagorean: } \\sqrt{1^{2} + 1^2} = \\sqrt{2} \\approx 1.41",
                        c_c3: "\\text{Pythagorean: } \\sqrt{2^{2} + 2^2} = 2\\sqrt{2} \\approx 2.83",
                        c_c4: "\\text{Pythagorean: } \\sqrt{2^{2} + 1.5^2} = 2.5",
                        c_c5: "\\text{Pythagorean: } \\sqrt{12^{2} + 5^2} = 13",
                        c_a1: "\\cos(60^\\circ) = 0.5, \\text{ so } 4 \\times 0.5 = 2",
                        c_a2: "\\sin(30^\\circ) = 0.5, \\text{ so } 2 \\times 0.5 + 1 = 2",
                        c_a3: "\\cos(45^\\circ) = 0.707, \\text{ so } 3 \\times 0.707 \\approx 2.12",
                        c_a4: "\\sin(30^\\circ) = 0.5, \\text{ so } 6 \\times 0.5 + 2 = 5",
                        c_a5: "\\sin(60^\\circ) = 0.866, \\text{ so } 4 \\times 0.866 + 1 \\approx 4.46",
                        c_e1: "\\text{Use components: } v_x = 5\\cos(53^\\circ), v_y = 5\\sin(53^\\circ) + 2",
                        c_e2: "\\text{Use components: } v_x = 4\\cos(37^\\circ), v_y = 4\\sin(37^\\circ) + 1.5",
                        c_e3: "\\theta = \\arctan\\left(\\frac{8\\sin(45^\\circ) + 3}{8\\cos(45^\\circ)}\\right)",
                        c_e4: "\\text{Use components: } v_x = 6\\cos(60^\\circ), v_y = 6\\sin(60^\\circ) + 2.5",
                        c_e5: "\\theta = \\arctan\\left(\\frac{5\\sin(30^\\circ) + 1}{5\\cos(30^\\circ)}\\right)",
                        // DRIFT hints
                        d_b1: "\\cos(\\theta) = -\\frac{1}{2} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_b2: "\\cos(\\theta) = -\\frac{1.5}{3} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_b3: "\\cos(\\theta) = -\\frac{2}{4} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_b4: "\\cos(\\theta) = -\\frac{0.5}{1} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_b5: "\\cos(\\theta) = -\\frac{3}{6} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_c1: "\\cos(\\theta) = -\\frac{1}{1.73} \\approx -0.578 \\Rightarrow \\theta \\approx 125.3^\\circ",
                        d_c2: "\\cos(\\theta) = -\\frac{2}{2.83} \\approx -0.707 \\Rightarrow \\theta = 135^\\circ",
                        d_c3: "\\cos(\\theta) = -\\frac{1.5}{2.12} \\approx -0.707 \\Rightarrow \\theta = 135^\\circ",
                        d_c4: "\\cos(\\theta) = -\\frac{3}{5} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
                        d_c5: "\\cos(\\theta) = -\\frac{2.5}{3.54} \\approx -0.707 \\Rightarrow \\theta = 135^\\circ",
                        d_a1: "\\cos(\\theta) = -\\frac{1.2}{2} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
                        d_a2: "\\cos(\\theta) = -\\frac{1.8}{3.6} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_a3: "\\cos(\\theta) = -\\frac{2.4}{4} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
                        d_a4: "\\cos(\\theta) = -\\frac{3.5}{7} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_a5: "\\cos(\\theta) = -\\frac{1.6}{3.2} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_e1: "\\cos(\\theta) = -\\frac{2.7}{4.5} = -0.6 \\Rightarrow \\theta \\approx 126.9^\\circ",
                        d_e2: "\\cos(\\theta) = -\\frac{3.2}{6.4} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_e3: "\\cos(\\theta) = -\\frac{1.4}{2.8} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_e4: "\\cos(\\theta) = -\\frac{2.1}{4.2} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        d_e5: "\\cos(\\theta) = -\\frac{4}{8} = -0.5 \\Rightarrow \\theta = 120^\\circ",
                        // NAVIGATION hints
                        n_b1: "t = \\frac{20}{2} = 10\\text{ s}",
                        n_b2: "t = \\frac{30}{3} = 10\\text{ s}",
                        n_b3: "t = \\frac{40}{4} = 10\\text{ s}",
                        n_b4: "t = \\frac{25}{5} = 5\\text{ s}",
                        n_b5: "t = \\frac{50}{2.5} = 20\\text{ s}",
                        n_c1: "t = \\frac{20}{2 \\times \\sin(60^\\circ)} = \\frac{20}{1.732} \\approx 11.55\\text{ s}",
                        n_c2: "t = \\frac{30}{3 \\times 0.5} = 20\\text{ s}",
                        n_c3: "t = \\frac{40}{4 \\times \\sin(45^\\circ)} \\approx 14.14\\text{ s}",
                        n_c4: "t = \\frac{25}{2.5 \\times \\sin(60^\\circ)} \\approx 11.55\\text{ s}",
                        n_c5: "t = \\frac{50}{5 \\times 0.5} = 20\\text{ s}",
                        n_a1: "t = \\frac{20}{2.4 \\times \\sin(120^\\circ)} \\approx 9.62\\text{ s}",
                        n_a2: "d = 1.5 \\times 7.7 \\approx 11.55\\text{ m}",
                        n_a3: "t = \\frac{30}{4 \\times \\sin(120^\\circ)} \\approx 8.66\\text{ s}",
                        n_a4: "t = \\frac{25}{2 \\times \\sin(135^\\circ)} \\approx 17.68\\text{ s}",
                        n_a5: "t = \\frac{40}{3.6 \\times \\sin(120^\\circ)}, d = 1.8 \\times t \\approx 23.09\\text{ m}",
                        n_e1: "v_{net} = \\sqrt{(5\\sin(120^\\circ))^{2} + (5\\cos(120^\\circ) + 2.5)^2} \\approx 4.33\\text{ m/s}",
                        n_e2: "\\text{Calculate crossing time, then return time, sum both}",
                        n_e3: "d_{total} = \\sqrt{40^{2} + (3 \\times t)^2} \\text{ where } t = \\frac{40}{6\\sin(120^\\circ)}",
                        n_e4: "\\theta = \\arctan\\left(\\frac{d_{drift}}{30}\\right) \\text{ where drift from river current}",
                        n_e5: "E = \\frac{1}{2} \\times 1 \\times v_{net}^{2}, \\text{ find } v_{net} \\text{ first}"
                },
                results: {
                        valid: "Calculation Valid",
                        invalid: "Vector Mismatch",
                        valid_desc: "Physics confirmed. Proceeding to next objective.",
                        invalid_desc: "Recalculate vector components.",
                        stability: "Vector Stability"
                }
        },

        // SP3.06: Acoustics (Existing full content)
        sp3_06: {
                back: "Back to Nexus",
                title: "SP3.06 // ACOUSTICS",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Sonic Signature Analysis",
                monitor_title: "Acoustics Monitor",
                check: "Verify",
                next: "Next Challenge",
                correct: "Correct",
                incorrect: "Incorrect",
                stages: { sound_waves: "SOUND WAVES", frequency_pitch: "FREQUENCY & PITCH", loudness_intensity: "LOUDNESS & INTENSITY" },
                visualization: {
                        sound_waves: {
                                title: "Sound Wave",
                                compression: "Compression",
                                rarefaction: "Rarefaction",
                                speed_frequency_wavelength: "Speed = Frequency × Wavelength",
                                medium_speeds: "Air: 343 m/s | Water: 1480 m/s"
                        },
                        frequency_pitch: {
                                title: "Frequency & Pitch",
                                low_frequency: "Low Frequency",
                                low_frequency_detail: "220 Hz (Low Pitch)",
                                high_frequency: "High Frequency",
                                high_frequency_detail: "880 Hz (High Pitch)",
                                musical_notes: "Musical Notes",
                                a4: "A4: 440 Hz",
                                a5: "A5: 880 Hz (octave)",
                                human_range: "Human: 20-20,000 Hz"
                        },
                        loudness_intensity: {
                                title: "Sound Intensity (dB)",
                                threshold_of_hearing: "Threshold of hearing",
                                whisper: "Whisper",
                                conversation: "Conversation",
                                safety_limit: "Safety limit",
                                rock_concert: "Rock concert",
                                jet_engine: "Jet engine (pain)",
                                distance_effect: "Distance Effect:",
                                double_distance: "2× distance → -6 dB",
                                tenfold_distance: "10× distance → -20 dB",
                                inverse_square_law: "(Inverse square law)"
                        }
                },
                scenarios: {
                        stadtcasino_basel: "Basel Symphony Orchestra - Sound Wave Physics: You are working at the Stadtcasino Basel, one of Europe's finest concert halls, known for its perfect sound reflection.",
                        euroairport_noise: "Basel Airport - Sound Intensity: Monitoring decibel levels at EuroAirport Basel-Mulhouse to protect the surrounding neighborhoods."
                },
                hints: {
                        sw_b3: "\\text{Water is denser than air}",
                        sw_b4: "\\text{Sound travels to wall and back: } 2 \\times 343 \\div 2 = 343",
                        sw_b5: "\\text{Sound is mechanical wave}",
                        sw_a1: "\\text{Approaching source = compressed waves}",
                        sw_a2: "\\text{Waves cancel = destructive}",
                        sw_a3: "\\text{Speed change causes bending}",
                        sw_a4: "\\text{Waves spread around obstacles}",
                        sw_a5: "\\text{Resonance = matching frequencies}",
                        sw_e4: "\\text{Supersonic = shock wave}",
                        sw_e5: "\\text{Different densities = impedance difference}",
                        fp_b1: "\\text{20 Hz to 20 kHz}",
                        fp_b2: "\\text{More vibrations = higher pitch}",
                        fp_b4: "\\text{Ultra = beyond human hearing}",
                        fp_b5: "\\text{Infra = below human hearing}",
                        fp_c3: "\\text{2nd harmonic = 2} \\times \\text{fundamental}",
                        fp_a2: "\\text{Harmonic mix = timbre}",
                        fp_a5: "50 \\text{ Hz difference is distinguishable}",
                        fp_e3: "\\text{Resonant peaks = formants}",
                        fp_e5: "\\text{Loud tone hides nearby frequencies}",
                        li_b2: "\\text{Reference intensity}",
                        li_b4: "\\text{Inverse square law: } 2\\times \\text{ distance} = -6 \\text{ dB}",
                        li_b5: "85 \\text{ dB is safety threshold}",
                        li_c1: "10 \\text{ dB difference} = 10\\times \\text{ intensity}",
                        li_a1: "10\\times \\text{ distance} = -20 \\text{ dB}, \\quad 60 - 20 = 40",
                        li_e1: "\\text{Phon = perceived loudness}",
                        li_e2: "\\text{Sone is linear scale}",
                        li_e3: "\\text{A-weighted decibels}",
                        li_e4: "+3 \\text{ dB doubles intensity, halves safe time}",
                        li_e5: "\\text{Emphasizes ear's most sensitive region}"
                },
                labels: {
                        label_yes_no: "\\text{Yes/No}",
                        label_ratio: "\\text{Ratio}",
                        label_name: "\\text{Name}",
                        label_tf: "\\text{T/F}",
                        label_hl: "\\text{H/L}",
                        label_type: "\\text{Type}",
                        label_reason: "\\text{Reason}",
                        label_property: "\\text{Property}",
                        label_above_below: "\\text{Above/Below}",
                        label_just_equal: "\\text{Just/Equal}",
                        label_term: "\\text{Term}",
                        label_effect: "\\text{Effect}",
                        label_safe: "\\text{Safe?}",
                        label_unit: "\\text{Unit}",
                        label_symbol: "\\text{Symbol}",
                        label_dose: "\\text{Dose (\\%)}",
                        label_application: "\\text{Application}"
                },
                expressions: {
                        fp_a2: "\\text{Different harmonic content}",
                        fp_a5: "\\Delta f > \\text{critical bandwidth}",
                        fp_b1: "\\text{Upper limit of human hearing}",
                        fp_b2: "\\text{Frequency} \\uparrow \\Rightarrow \\text{Pitch} \\uparrow",
                        fp_b3: "\\text{Octave} \\rightarrow \\text{double frequency}",
                        fp_b4: "\\text{Above hearing range}",
                        fp_b5: "\\text{Below hearing range}",
                        fp_e3: "\\text{Vocal tract resonances}",
                        fp_e4: "\\text{GCD of harmonics}",
                        fp_e5: "\\text{Frequency masking}",
                        li_a1: "10\\times \\text{ distance} \\Rightarrow -20 \\text{ dB}",
                        li_a2: "2\\times \\text{ intensity} \\Rightarrow +3 \\text{ dB}",
                        li_a5: "4\\times \\text{ intensity} \\Rightarrow +6 \\text{ dB}",
                        li_b3: "> 85 \\text{ dB} \\rightarrow \\text{damage risk}",
                        li_c3: "2\\times \\text{ distance} \\Rightarrow -6 \\text{ dB}",
                        li_e1: "\\text{Perceived loudness unit}",
                        li_e2: "\\text{Linear loudness scale}",
                        li_e3: "\\text{Weighted decibel}",
                        li_e4: "+3 \\text{ dB} \\Rightarrow \\text{half time}",
                        li_e5: "\\text{Noise measurement standard}",
                        sw_a1: "\\text{Doppler effect: approaching} \\rightarrow \\text{higher}",
                        sw_a2: "\\text{Cancellation} = \\text{destructive interference}",
                        sw_a3: "\\text{Bending at boundary} = \\text{refraction}",
                        sw_a4: "\\text{Bending around obstacles} = \\text{diffraction}",
                        sw_a5: "\\text{Resonance occurs at natural frequency}",
                        sw_b3: "\\text{Denser medium} \\rightarrow \\text{faster sound}",
                        sw_b5: "\\text{Sound needs medium}",
                        sw_c5: "\\text{Ratio} = \\frac{v_{\\text{steel}}}{v_{\\text{air}}}",
                        sw_e4: "v > v_{\\text{sound}} \\rightarrow \\text{shock wave}",
                        sw_e5: "\\text{Large impedance mismatch} \\rightarrow \\text{strong reflection}"
                },
                targets: {
                        answer: "\\text{Answer}",
                        phenomenon: "\\text{Phenomenon}"
                },
                corrects: {
                        correct_true: "\\text{True}",
                        correct_no: "\\text{No}",
                        sw_b5: "\\text{No (needs medium)}",
                        sw_c5: "\\approx 17\\text{ times}",
                        sw_a1: "\\text{Higher (Doppler effect)}",
                        sw_a2: "\\text{Destructive}",
                        sw_a3: "\\text{Refraction}",
                        sw_a4: "\\text{Diffraction}",
                        sw_e4: "\\text{Sonic boom}",
                        sw_e5: "\\text{Acoustic impedance mismatch}",
                        fp_b2: "\\text{Higher pitch}",
                        fp_c4: "\\text{Yes (ultrasound)}",
                        fp_a2: "\\text{Timbre (tone quality)}",
                        fp_a3: "\\text{Far above (ultrasound)}",
                        fp_a4: "\\text{No (infrasound)}",
                        fp_a5: "\\text{Yes (beyond critical band)}",
                        fp_e2: "\\text{Just intonation (1.5 > 1.498)}",
                        fp_e3: "\\text{Formants}",
                        fp_e4: "200\\text{ Hz (missing fundamental)}",
                        fp_e5: "\\text{Auditory masking}",
                        li_b3: "\\text{No (causes pain and damage)}",
                        li_e1: "\\text{Phon}",
                        li_e2: "2\\times \\text{ louder}",
                        li_e3: "\\text{dB(A) or dBA}",
                        li_e5: "\\text{Audio noise/hiss}"
                },
                prompts: {
                // SOUND_WAVES
                sound_waves_b1: "Sound speed in air at 20°C is 343 m/s. A sound wave has frequency 686 Hz. Find the wavelength.",
                sound_waves_b2: "A sound wave has wavelength 0.5 m and speed 340 m/s. What is the frequency?",
                sound_waves_b3: "Sound travels faster in water (1480 m/s) than in air (343 m/s). True or false?",
                sound_waves_b4: "An echo returns after 2 seconds. The wall is 343 m away. What is the sound speed?",
                sound_waves_b5: "Can sound travel through a vacuum?",
                sound_waves_c1: "Sound in water: speed 1480 m/s, frequency 740 Hz. What is the wavelength?",
                sound_waves_c2: "Thunder is heard 3 seconds after lightning. How far away is the storm? ($v = 343$ m/s)",
                sound_waves_c3: "Sound in steel: speed 5960 m/s, wavelength 2 m. What is the frequency?",
                sound_waves_c4: "Sound reflects off a wall 171.5 m away. What is the echo time? ($v = 343$ m/s)",
                sound_waves_c5: "Sound travels at 5960 m/s in steel and 343 m/s in air. How many times faster is sound in steel?",
                sound_waves_a1: "An ambulance siren at 500 Hz approaches at 30 m/s. Is the observed frequency higher or lower?",
                sound_waves_a2: "Two speakers emit the same frequency in phase. At some point, the waves cancel. What type of interference?",
                sound_waves_a3: "Sound bends when entering water from air. What is this phenomenon called?",
                sound_waves_a4: "Sound bends around corners. What is this phenomenon called?",
                sound_waves_a5: "A tuning fork vibrating at 512 Hz is held near an open tube. The tube resonates. What is the tube's natural frequency?",
                sound_waves_e1: "Two tuning forks: 440 Hz and 444 Hz. What is the beat frequency?",
                sound_waves_e2: "A pipe of length 0.5 m is closed at one end. What is the fundamental frequency? ($v = 340$ m/s)",
                sound_waves_e3: "An open pipe is 1 m long. What is the fundamental frequency? ($v = 340$ m/s)",
                sound_waves_e4: "An aircraft exceeds the speed of sound. What phenomenon occurs?",
                sound_waves_e5: "Sound reflects strongly at an air-water boundary. Why?",
                // FREQUENCY_PITCH
                frequency_pitch_b1: "Human hearing range is approximately 20 Hz to how many Hz?",
                frequency_pitch_b2: "Higher frequency sounds have higher or lower pitch?",
                frequency_pitch_b3: "Concert pitch A4 has frequency 440 Hz. A5 is one octave higher. What is the frequency of A5?",
                frequency_pitch_b4: "Ultrasound is sound above 20,000 Hz. Can humans hear it?",
                frequency_pitch_b5: "Infrasound is sound below 20 Hz. Can humans hear it?",
                frequency_pitch_c1: "C4 is 262 Hz. C5 is one octave higher. What is the frequency of C5?",
                frequency_pitch_c2: "A4 is 440 Hz. A#4 (one semitone up) is 440 × 1.0595. What is the frequency of A#4?",
                frequency_pitch_c3: "A violin plays A4 (440 Hz). What is the second harmonic frequency?",
                frequency_pitch_c4: "Bats use ultrasound at 50,000 Hz for echolocation. Is this above human hearing?",
                frequency_pitch_c5: "A guitar string has a fundamental frequency of 200 Hz. What is the third harmonic frequency?",
                frequency_pitch_a1: "A perfect fifth has frequency ratio 3:2. If C4 is 262 Hz, what is the frequency of G4?",
                frequency_pitch_a2: "Two instruments play the same note (440 Hz) but sound different. What property differs?",
                frequency_pitch_a3: "Medical ultrasound uses 2–10 MHz. Is this above or below human hearing?",
                frequency_pitch_a4: "An earthquake produces infrasound at 5 Hz. Can humans hear it?",
                frequency_pitch_a5: "Two tones at 100 Hz and 150 Hz are played together. Can the ear distinguish them?",
                frequency_pitch_e1: "Equal temperament divides an octave into 12 semitones. What is the frequency ratio per semitone?",
                frequency_pitch_e2: "Just intonation perfect fifth: ratio 3:2. Equal temperament: $2^{7/12}$. Which is larger?",
                frequency_pitch_e3: "Vowel sounds differ by resonant frequencies. What are these called?",
                frequency_pitch_e4: "Harmonics at 400, 600, and 800 Hz are present. What fundamental frequency does the brain perceive?",
                frequency_pitch_e5: "A loud 1000 Hz tone masks a nearby 1100 Hz tone. What is this effect called?",
                // LOUDNESS_INTENSITY
                loudness_intensity_b1: "A whisper is about 30 dB. Normal conversation is 60 dB. How many times more intense?",
                loudness_intensity_b2: "The threshold of hearing is 0 dB. What is the intensity in W/m²?",
                loudness_intensity_b3: "The threshold of pain is about 140 dB. Is this safe for hearing?",
                loudness_intensity_b4: "Double the distance from a sound source. Intensity becomes 1/4. By how many dB does loudness decrease?",
                loudness_intensity_b5: "Prolonged exposure above 85 dB can cause hearing damage. True or false?",
                loudness_intensity_c1: "Sound A is 60 dB, sound B is 70 dB. How many times more intense is B?",
                loudness_intensity_c2: "The sound intensity is $10^{-10}$ W/m². What is the loudness level in dB?",
                loudness_intensity_c3: "At 1 m: 80 dB. At 2 m: how many dB?",
                loudness_intensity_c4: "Rock concert: 110 dB. Vacuum cleaner: 70 dB. How many times more intense is the concert?",
                loudness_intensity_c5: "The loudness level is 30 dB. What is the intensity in W/m²?",
                loudness_intensity_a1: "At 10 m: 60 dB. At 100 m: how many dB?",
                loudness_intensity_a2: "Two identical 60 dB sources are combined. What is the total loudness?",
                loudness_intensity_a3: "Sound intensity halves due to air absorption. By how many dB does loudness decrease?",
                loudness_intensity_a4: "Jet engine at 100 m: 130 dB. At 1 km: how many dB?",
                loudness_intensity_a5: "Four identical 50 dB sources are combined. What is the total loudness?",
                loudness_intensity_e1: "Equal loudness curves show perceived loudness varies with frequency. What is the unit of perceived loudness?",
                loudness_intensity_e2: "The sone is a unit where doubling sones doubles perceived loudness. How much louder is 2 sones than 1 sone?",
                loudness_intensity_e3: "A-weighting adjusts dB measurements to match human hearing sensitivity. What is the symbol?",
                loudness_intensity_e4: "85 dB for 8 hours equals 100% noise dose. What is the dose for 88 dB over 4 hours?",
                loudness_intensity_e5: "ITU-R 468 weighting emphasises the 6 kHz region. It is used to measure what?"
                },
                placeholders: {
                        true: "true",
                        no: "no",
                        yes: "yes",
                
                    higher: "higher",
                    destructive: "destructive",
                    refraction: "refraction",
                    diffraction: "diffraction",
                    sonic_boom: "sonic boom",
                    impedance: "impedance",
                    timbre: "timbre",
                    above: "above",
                    just: "just",
                    formants: "formants",
                    masking: "masking",
                    phon: "phon",
                    dba: "dBA",
                    noise: "noise",                    v_0_dot_5: "0.5",
                    v_680: "680",
                    v_343: "343",
                    v_2: "2",
                    v_1029: "1029",
                    v_2980: "2980",
                    v_1: "1",
                    v_17: "17",
                    v_512: "512",
                    v_4: "4",
                    v_170: "170",
                    v_20000: "20000",
                    v_880: "880",
                    v_524: "524",
                    v_466: "466",
                    v_600: "600",
                    v_393: "393",
                    v_1_dot_06: "1.06",
                    v_200: "200",
                    v_1000: "1000",
                    v_1e_minus_12: "1e-12",
                    minus_6: "-6",
                    v_10: "10",
                    v_20: "20",
                    v_74: "74",
                    v_10000: "10000",
                    v_1e_minus_9: "1e-9",
                    v_40: "40",
                    v_63: "63",
                    minus_3: "-3",
                    v_110: "110",
                    v_56: "56",
                    v_100: "100"
}
        },

        // SP3.08: Geometrical Optics (from sp1_08)
        sp3_08: {
                title: "SP3.08 // GEOMETRICAL OPTICS",
                back: "Back to Nexus",
                monitor_title: "SP3.08_OPTICS_MONITOR",
                objective_title: "Photon Path Calibration",
                target_title: "Target",
                check: "Verify",
                next: "Next Challenge",
                correct: "Verified",
                incorrect: "Mismatch",
                difficulty: {
                        basic: "BASIC",
                        core: "CORE",
                        advanced: "ADVANCED",
                        elite: "ELITE"
                },
                stages: {
                        reflection: "REFLECTION",
                        refraction: "REFRACTION",
                        lenses: "LENSES"
                },
                labels: {
                        show_prism: "Show Prism Dispersion",
                        medium_1: "MEDIUM 1 (n_1)",
                        medium_2: "MEDIUM 2 (n_2)",
                        incident_angle: "Incident Angle",
                        focal_length: "Focal Length",
                        refraction_title: "REFRACTION",
                        refracted_angle: "Refracted Angle (θ_2):",
                        critical_angle: "Critical Angle:",
                        total_internal_reflection: "TOTAL INTERNAL REFLECTION",
                        angle_value: "{value}°",
                        light_path_correct: "Light Path Correct!",
                        formula: "Formula",
                        hint: "Hint"
                },
                prompts: {
                        reflection_law: "\\text{Law of Reflection: } \\theta_i = {angle}^\\circ",
                        refraction_setup: "\\text{Refraction in } {material}:\\; n_1={n1},\\; n_2={n2},\\; \\theta_1={theta1}^\\circ",
                        lens_setup: "\\text{Lens: } f={f}\\text{mm},\\; u={u}\\text{mm}"
                },
                hints: {
                        refraction: "Light bends toward the normal when entering a denser medium (n_2 > n_1)"
                },
                snell: { title: "SNELL'S LAW", line_1: "n_1 sin(θ_1) = n_2 sin(θ_2)", line_2: "θ_c = arcsin(n_2/n_1)", line_3: "v = c/n" },
                mission: { title: "MISSION: RAY OPTICS", description: "Master the physics of light refraction and reflection using Basel's laboratory models." },
                placeholders: {
                        deg: "deg",
                        mm: "mm",
                        mag: "mag"
                }
        },

        // SP2.02: Ohm's Law & Circuits
        sp2_02: {
                title: "SP2.02 // OHM'S LAW & CIRCUITS",
                back: "Back to Nexus",
                check: "Verify",
                next: "Next",
                correct: "Circuit Verified",
                incorrect: "Circuit Error",
                difficulty: {
                        basic: "BASIC",
                        core: "CORE",
                        advanced: "ADVANCED",
                        elite: "ELITE"
                },
                stages: {
                        ohms_law: "OHM'S LAW",
                        series_circuits: "SERIES CIRCUITS",
                        parallel_circuits: "PARALLEL CIRCUITS"
                },
            placeholders: {
                type_value: "type value"
            },
                visualization: {
                        ohms_law_formula: "Ohm's Law: U = I × R",
                        voltage: "Voltage",
                        current: "Current",
                        resistance: "Resistance",
                        current_flow: "Current Flow →",
                        series_formula: "Series Circuit: R_total = R_1 + R_2 + ...",
                        total: "Total",
                        series_summary: "Voltage: {voltage}V → Current: {current}A",
                        parallel_formula: "Parallel Circuit: 1/R_total = 1/R_1 + 1/R_2 + ...",
                        total_resistance: "Total R",
                        total_current: "Total Current"
                },
                scenarios: {
                        ohms_law: "Basel Electrical Engineering Lab at University of Basel: You are a first-year electrical engineering student learning circuit fundamentals. Today's lab focuses on Ohm's Law (U = I × R), the foundation of all circuit analysis. Your task is to calculate voltage, current, or resistance in simple circuits. Professor Schmidt emphasizes: 'Understanding Ohm's Law is like learning the alphabet - it's essential for everything that follows.' You'll use digital multimeters to measure real circuits and verify your calculations. This knowledge is crucial for designing everything from smartphone circuits to Basel's tram electrical systems.",
                        series_circuits: "Novartis Pharmaceutical Equipment Design: You are working with the electrical engineering team at Novartis Basel, designing power distribution for new laboratory equipment. In series circuits, components share the same current, but voltage divides across them. Your task is to calculate total resistance (R_total = R_1 + R_2 + ...) and current flow. This is critical for ensuring that sensitive analytical instruments receive correct voltage levels. A miscalculation could damage equipment worth millions of Swiss Francs or compromise drug quality testing results.",
                        parallel_circuits: "Roche Tower Lighting System: You are designing the emergency lighting system for Roche Tower in Basel. In parallel circuits, components share the same voltage, but current divides among branches. Your task is to calculate total current and equivalent resistance (1/R_total = 1/R_1 + 1/R_2 + ...). This design ensures that if one light fails, others continue working - critical for safety during power outages. The system must handle the building's 41 floors with thousands of LED lights operating efficiently."
                },
                prompts: {
                        ohms_find_current: "Basel bench test: determine branch current. Given U = {voltage} V and R = {resistance} Ω, apply I = U/R and report I in A.",
                        ohms_find_voltage: "Tram controller calibration: find supply voltage. Given I = {current} A and R = {resistance} Ω, apply U = I×R and report U in V.",
                        ohms_find_resistance: "Lab safety check: identify resistor value. Given I = {current} A and U = {voltage} V, apply R = U/I and report R in Ω.",
                        series_find_current: "Novartis instrument chain (series): {components}, source voltage U = {voltage} V. Compute R_total then find current I.",
                        parallel_find_total_current: "Roche emergency lighting branches (parallel): {components}, source voltage U = {voltage} V. Compute branch currents and total current I_total."
                }
        },

        // SP2.03: Electric Power & Energy
        sp2_03: {
                title: "SP2.03 // ELECTRIC POWER & ENERGY",
                back: "Back to Nexus",
                check: "Verify",
                next: "Next",
                correct: "Power Verified",
                incorrect: "Power Error",
                difficulty: {
                        basic: "BASIC",
                        core: "CORE",
                        advanced: "ADVANCED",
                        elite: "ELITE"
                },
                stages: {
                        power_basics: "POWER BASICS",
                        energy_consumption: "ENERGY CONSUMPTION",
                        efficiency: "EFFICIENCY"
                },
            placeholders: {
                type_value: "type value"
            },
                scenarios: {
                        power_basics: "Basel Household Electricity: You are helping Basel's energy consulting company calculate power consumption for residential customers. Electric power (P = U × I) determines how much energy devices use per second, measured in Watts. Your task is to calculate power for various household appliances. Understanding this helps families reduce electricity bills and carbon footprint. For example, a typical Basel household uses about 4,500 kWh per year, costing around 1,125 CHF at 0.25 CHF/kWh. Accurate power calculations help identify energy-wasting devices.",
                        energy_consumption: "IWB Basel Energy Management: You work for IWB (Industrielle Werke Basel), Basel's main electricity provider. Your task is to calculate energy consumption (E = P × t) and costs for commercial customers. Energy is measured in kilowatt-hours (kWh), and Basel's electricity rate is approximately 0.25 CHF/kWh for households and 0.20 CHF/kWh for businesses. You're analyzing a Novartis laboratory that runs equipment 24/7. Accurate calculations ensure correct billing and help customers optimize energy usage to reduce costs and environmental impact.",
                        efficiency: "Basel Solar Panel Installation: You are an engineer at Solarville Basel, installing solar panels on residential rooftops. Efficiency (η = P_out/P_in × 100%) determines how much sunlight energy converts to electricity. Modern panels achieve 18-22% efficiency. Your task is to calculate power output, energy losses, and cost savings. A typical Basel home with 20 m^{2} of panels (4 kW capacity) generates about 3,800 kWh/year, saving approximately 950 CHF annually. Understanding efficiency helps customers make informed investment decisions."
                },
                prompts: {
                        power_find_power: "Basel appliance audit: given U = {voltage} V and I = {current} A, compute electric power P = U×I.",
                        power_find_power_three_phase: "Industrial feeder check (3-phase context): given U = {voltage} V and I = {current} A, estimate electric power P.",
                        power_find_current: "IWB diagnostics: given P = {power} W and U = {voltage} V, compute current I = P/U.",
                        power_find_voltage: "Equipment commissioning: given P = {power} W and I = {current} A, compute voltage U = P/I.",
                        energy_find_wh: "Device runtime log: power P = {power} W over t = {time} h. Compute consumed energy E in Wh.",
                        energy_find_kwh: "Billing estimate: power P = {power} W over t = {time} h. Convert and report energy E in kWh.",
                        energy_find_cost: "Commercial billing case: power P = {power} W, runtime {days} h, tariff {rate} CHF/kWh. Compute total cost.",
                        efficiency_find_percent: "Conversion test: input {input} W, useful output {output} W. Compute efficiency η in %.",
                        efficiency_find_output: "Output planning: input {input} W at η = {efficiency}%. Compute useful output power.",
                        efficiency_find_input: "Supply planning: required output {output} W at η = {efficiency}%. Compute required input power.",
                        efficiency_find_loss_io: "Thermal loss audit: input {input} W and output {output} W. Compute power loss P_loss.",
                        efficiency_find_loss_input_eff: "Loss audit: input {input} W at η = {efficiency}%. Compute power loss P_loss.",
                        efficiency_find_loss_output_eff: "Loss audit: output {output} W at η = {efficiency}%. Compute power loss P_loss.",
                        efficiency_device: "{device} performance check: input {input} W and useful output {output} W. Compute efficiency η.",
                        e1: "IWB household billing case: heat pump runs at P=3 kW for 500 h with tariff 0.28 CHF/kWh. Task: compute total cost.",
                        e2: "Summer cooling budget case: AC runs at P=1.5 kW for 100 h with tariff 0.28 CHF/kWh. Task: compute total cost.",
                        e3: "Bakery energy check: Basler Lackerli oven runs at P=2 kW for 5 h with tariff 0.28 CHF/kWh. Task: compute total cost.",
                        e4: "EV off-peak charging audit: charger runs at P=11 kW for 50 h with tariff 0.24 CHF/kWh. Task: compute total cost.",
                        e5: "Fasnacht lighting estimate: lantern system runs at P=0.5 kW for 72 h with tariff 0.28 CHF/kWh. Task: compute total cost."
                }
        },

        // --- Thermodynamics (Legacy GP2 series) ---
        gp2_01: {
                back: "Return to Nexus",
                title: "GP2.01 // GAS LAWS",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Kinetic Theory Analysis",
                target_title: "Ideal Gas State",
                next: "Next Transformation",
                check: "Analyze State",
                correct: "State Balanced",
                incorrect: "Equation Mismatch",
                monitor_title: "GP2.01_THERMO_MONITOR",
                stages: { ideal_gas: "IDEAL GAS", boyles: "BOYLE'S LAW", charles: "CHARLES'S LAW" },
                prompts: {
                        find_p: "Ideal-gas state task: given n={n} mol, T={T} K, and V={V} m^{3}. Task: compute pressure P using PV=nRT.",
                        find_v: "State inversion task: given n={n} mol, P={P} Pa, and T={T} K. Task: compute volume V from PV=nRT.",
                        find_n: "Mole-count estimation: given P={P} Pa, V={V} m^{3}, and T={T} K. Task: compute amount n via ideal-gas law.",
                        find_t: "Temperature recovery task: given P={P} Pa, V={V} m^{3}, and n={n} mol. Task: compute T from PV=nRT.",
                        relation_pt: "Proportionality check: temperature doubles while volume stays constant. Task: determine pressure-change factor.",
                        relation_vn: "Mole-volume relation check: moles double at constant P and T. Task: determine volume-change factor.",
                        boyle_find_p2: "Boyle-law calculation: P_1={p1} kPa, V_1={v1} L, V_2={v2} L at constant T. Task: compute P_2.",
                        boyle_find_v2: "Boyle-law calculation: P_1={p1} kPa, V_1={v1} L, and P_2={p2} kPa at constant T. Task: compute V_2.",
                        boyle_relation: "Compression-ratio check: gas volume changes from {v1} L to {v2} L at constant T. Task: determine pressure multiplier.",
                        boyle_condition: "Law-condition concept check: task is to identify which quantity must remain constant for Boyle's law.",
                        charles_find_v2: "Charles-law calculation: V_1={v1} L, T_1={t1} K, T_2={t2} K at constant pressure. Task: compute V_2.",
                        charles_find_t2: "Charles-law inversion: V_1={v1} L, T_1={t1} K, and V_2={v2} L at constant pressure. Task: compute T_2.",
                        charles_relation: "Thermal expansion check: absolute temperature doubles at constant pressure. Task: determine volume-change factor.",
                        charles_condition: "Law-condition concept check: task is to identify which quantity must remain constant for Charles's law.",
                        combined_law: "Combined Gas Law provided P, V, T changes. Solving for {target}.",
                        iwb_steam: "IWB District Heating: Steam at T={T} K, V={V} m^{3}, n={n} mol. Calculate Pressure P (Ideal Gas assumption).",
                        roche_tower: "Roche Tower Floor 40: Room V={V} m^{3}, T={T} K, P={P} Pa. Calculate moles of air n.",
                        rhine_bubble: "Rhine Diver at depth (P1={p1} kPa) exhales bubble V1={v1} mL. Volume at surface (P2={p2} kPa)?",
                        weather_balloon: "Basel Weather Balloon: Ground V={v1} m^{3}, T1={t1} K. Stratosphere T2={t2} K (assume constant P for Charles' Law). New Volume?",
                        novartis_reactor: "Novartis Reactor V={V} m^{3}. Purge with N2 at P={P} Pa, T={T} K. Calculate mass of N2 (M=0.028 kg/mol).",
                        boyle_k_find_v: "PV-constant exercise: k=2400 kPa·L and P=600 kPa under isothermal conditions. Task: compute volume V.",
                        boyle_p_increase_factor: "Isothermal scaling check: pressure increases by 25%. Task: determine the corresponding volume-change factor.",
                        boyle_energy_density: "Energy-density form task: PV=5000 J and V=0.01 m^{3}. Task: compute pressure P.",
                        boyle_hyperbola: "Hyperbola model check: P(V)=k/V with k=100. Task: evaluate pressure at V=5.",
                        boyle_isothermal_work: "Isothermal work case: use W=nRT·ln(V_2/V_1) with P_1V_1=1000 J and expansion to 2V. Task: compute W.",
                        boyle_compress_v3: "Sign-convention check: gas is compressed isothermally to V/3. Task: state the sign of work done on the gas.",
                        boyle_real_gas_limit: "Model-validity concept check: task is to identify conditions where real gases deviate most from Boyle's law.",
                        boyle_compress_atm: "Compression calculation: P_1=1 atm, V_1=10 L, compressed to P_2=10 atm (ideal gas). Task: compute V_2.",
                        boyle_two_bulbs: "Two-bulb equilibration case: P_1=2, V_1=1; P_2=0, V_2=1; then valve opens. Task: compute final pressure P.",
                        charles_celsius_find_v2: "Charles-law temperature-rise case: V_1=3 L, T_1=27 degC (300 K), T_2=127 degC (400 K). Task: compute V_2.",
                        charles_find_t2_c2: "Charles-law inversion case: V_1=2 L, T_1=200 K, V_2=3 L at constant pressure. Task: compute T_2.",
                        charles_cool_factor: "Cooling-factor check: gas cools from 400 K to 100 K at constant pressure. Task: determine volume-change factor.",
                        charles_abs_zero: "Thermodynamics concept check: task is to express absolute zero in degrees Celsius.",
                        charles_20c_to_80c: "Heating case at constant pressure: V_1=5 L at 20 degC (293 K). Task: compute V_2 at 80 degC (353 K).",
                        charles_ke_proportional: "Kinetic-theory concept check: when gas is heated, mean kinetic energy increases. Task: identify the proportional variable.",
                        charles_find_t2_a3: "Charles-law inversion: V_1=10 L, T_1=500 K, V_2=5 L at constant pressure. Task: compute T_2.",
                        charles_combined_reduces: "Equation-link check: task is to identify which law the combined gas law reduces to when pressure is constant.",
                        charles_isobaric_work: "Isobaric-work calculation: W=P(V_2-V_1), with P=100 Pa and V changing from 1 to 2 m^{3}. Task: compute W.",
                        charles_density_factor: "Density-temperature relation check: for ideal gas at constant pressure, \\rho \\propto 1/T. Task: find density factor when T doubles.",
                        charles_vt_slope: "V-T graph interpretation: slope=nR/P with n=1 mol and P=8.314 Pa. Task: compute the slope.",
                        charles_piston_work: "Piston expansion case: T_1=300 K, V_1=1 m^{3}, isobaric work W=300 J at P=100 Pa. Task: compute V_2.",
                        charles_find_t2_piston: "Follow-up ratio task: T_1/V_1=T_2/V_2 with T_1=300 K, V_1=1 m^{3}, V_2=4 m^{3}. Task: compute T_2.",
                        charles_carnot_ke: "Kinetic-theory scaling check: temperature is proportional to mean kinetic energy. Task: determine exponent change of v_{rms} when T doubles."
                },
                scenarios: {
                        ideal_gas: "The Ideal Gas Law (PV=nRT) describes the behavior of many gases under various conditions.",
                        boyles_law: "Boyle's Law: At constant temperature, volume is inversely proportional to pressure.",
                        charles_law: "Charles's Law: At constant pressure, volume is directly proportional to temperature."
                },
                hints: {
                        stp_conditions: "STP conditions"
                },
                labels: {
                        factor: "Factor",
                        symbol: "Symbol",
                        constant: "Constant"
                },
                placeholders: {
                        temperature: "temperature",
                        pressure: "pressure",
                        charles: "charles",
                
                    high: "high",                    v_99768: "99768",
                    v_3_dot_01: "3.01",
                    v_0_dot_0224: "0.0224",
                    v_240_dot_56: "240.56",
                    v_145495: "145495",
                    v_123878: "123878",
                    v_0_dot_166: "0.166",
                    v_360_dot_8: "360.8",
                    v_2: "2",
                    v_415700: "415700",
                    v_24_dot_06: "24.06",
                    v_0_dot_00025: "0.00025",
                    p2: "P2",
                    v_149652: "149652",
                    v_20046: "20046",
                    v_40: "40",
                    v_8: "8",
                    v_22_dot_45: "22.45",
                    v_200: "200",
                    v_100: "100",
                    v_1: "1",
                    v_300: "300",
                    v_3: "3",
                    v_5: "5",
                    v_202_dot_6: "202.6",
                    v_4: "4",
                    v_1500: "1500",
                    v_0_dot_8: "0.8",
                    v_500000: "500000",
                    v_20: "20",
                    v_693: "693",
                    plus: "+",
                    v_400: "400",
                    v_500: "500",
                    v_0_dot_25: "0.25",
                    minus_273_dot_15: "-273.15",
                    v_6_dot_02: "6.02",
                    v_250: "250",
                    v_0_dot_5: "0.5",
                    v_1200: "1200"
}
        }
,
        gp2_02: {
                back: "Return to Nexus",
                title: "GP2.02 // THERMODYNAMICS I",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Thermal Energy Analysis",
                next: "Next Phase",
                check: "Verify Energy",
                correct: "Verified",
                incorrect: "Mismatch",
                monitor_title: "GP2.02_THERMO_MONITOR",
                stages: { first_law: "FIRST LAW", internal_energy: "INTERNAL ENERGY", work_heat: "WORK & HEAT" },
                prompts: {
                        fl_calc_du: "Basel lab energy audit: the system absorbs Q={q} J and does W={w} J on surroundings. Task: compute internal-energy change. Use ΔU=Q-W.",
                        fl_calc_q: "Thermal-process report: ΔU={du} J and system work W={w} J are measured. Task: recover exchanged heat. Use Q=ΔU+W.",
                        fl_calc_w: "Engine-cycle check: the system absorbs Q={q} J and gains internal energy ΔU={du} J. Task: find system work output W. Use W=Q-ΔU.",
                        fl_adiabatic: "Insulated-cylinder test (adiabatic): Q=0 and work done on system is {w} J. Task: determine ΔU with sign convention.",
                        fl_cycle: "Closed-cycle audit in Basel: net work over one loop is W={w} J. Task: determine net heat over the cycle from first-law balance.",
                        fl_sign_conv: "Sign-convention checkpoint: the system releases heat to surroundings. Task: decide whether Q is positive or negative.",
                        ie_ideal_u: "Monatomic ideal-gas state check: n={n} mol and T={t} K. Task: compute internal energy from U=1.5nRT.",
                        ie_delta_u: "Isothermal ideal-gas step in a thermostat bath. Task: determine ΔU for this temperature-constant process.",
                        ie_diatomic: "Diatomic-gas storage tank: n={n} mol at T={t} K with f=5 active modes. Task: compute U using degree-of-freedom model.",
                        ie_change_t: "Heating log: ideal gas with n={n} mol and Cv={cv} J/(mol·K) warms from {t1} K to {t2} K. Task: find ΔU via nCvΔT.",
                        ie_state_func: "Theory checkpoint: internal energy is a state function. Task: state ΔU for a complete thermodynamic cycle.",
                        wh_isobaric: "Constant-pressure piston run: P={p} Pa and volume change ΔV={dv} m^{3}. Task: compute boundary work W=PΔV.",
                        wh_isochoric: "Rigid-container heating (constant volume). Task: determine mechanical work W for an isochoric process.",
                        wh_isothermal_w: "Isothermal ideal-gas expansion with measured heat input Q={q} J. Task: infer work W from first-law relation for ΔU=0.",
                        wh_area: "PV-graph interpretation task: identify the physical quantity represented by the area under the process curve.",
                        wh_adiabatic_rel: "Adiabatic-expansion reasoning: internal energy decreases during expansion. Task: determine the temperature trend.",
                        q_fl_b5: "First-law sign audit: the system absorbs 50 J heat and 20 J is done on the system (W=-20 in by-system sign). Task: compute ΔU.",
                        q_fl_c3: "Rigid-vessel cooling case: Q=-100 J and W=0 for an isochoric step. Task: determine ΔU from first-law balance.",
                        q_ie_b3: "Temperature-scaling check: for an ideal gas, temperature doubles. Task: determine the multiplication factor of internal energy U.",
                        q_ie_b5: "Cooling-process reasoning: gas temperature decreases. Task: determine the qualitative change of internal energy U.",
                        q_ie_c3: "State-function concept check: Task: decide whether ΔU depends on process path or only thermodynamic state.",
                        q_ie_a1: "Real-gas extension task: U can depend on both T and V. Task: explain why volume dependence appears beyond the ideal model.",
                        q_wh_b4: "Sign-convention checkpoint: Task: determine the sign used when work is done on the thermodynamic system.",
                        q_wh_c2: "Constant-pressure expansion case: volume changes from 1 m^{3} to 3 m^{3} at 200 Pa. Task: compute boundary work.",
                        q_fl_c4: "Constant-pressure expansion checkpoint: Q=500 J, P=100 Pa, and ΔV=2 m^{3}. Task: compute ΔU after evaluating work.",
                        q_fl_c5: "Compression-and-cooling case: W=-100 J and Q=-50 J. Task: determine resulting ΔU with consistent signs.",
                        q_fl_a1: "Cycle decomposition task: path A has W=10 J and Q=50 J, then path B returns to start. Task: use ΔU_cycle=0 to infer missing balance.",
                        q_fl_a2: "Heat-capacity application: ΔU=nCvΔT with n=1, Cv=12.5, ΔT=10 and W=0. Task: determine Q from first law.",
                        q_fl_a3: "Adiabatic expansion check: process work is W=200 J (by system convention). Task: compute ΔU when Q=0.",
                        q_fl_a4: "Free-expansion benchmark: ideal gas expands into vacuum with Q=0 and W=0. Task: determine ΔU.",
                        q_fl_a5: "Phase-change energy audit: boiling gives Q=L_v m and boundary work W=PΔV. Task: judge whether ΔU is smaller than Q and why.",
                        q_fl_e1: "Enthalpy relation checkpoint: with H=U+PV at constant pressure. Task: identify dH in terms of heat transfer.",
                        q_fl_e2: "Heat-capacity identity task: given Cp-Cv=R and monatomic Cv=1.5R. Task: compute Cp.",
                        q_fl_e3: "Adiabatic scaling task: TV^{g-1}=const, g=1.67 (monatomic), and V is halved. Task: determine temperature factor.",
                        q_fl_e4: "Polytropic-process review: PV^{n}=C with n≠1. Task: identify how work is obtained from the integral ∫PdV.",
                        q_fl_e5: "Entropy principle check: dS=dQ/T. Task: determine dS for a reversible adiabatic process.",
                        q_ie_a2: "Equipartition theorem checkpoint: Task: state the average energy contribution per active degree of freedom.",
                        q_ie_a3: "Low-temperature mode-freezing scenario: vibrational modes of a diatomic gas are suppressed. Task: identify the resulting trend of Cv.",
                        q_ie_a4: "Ideal-gas property transfer: U depends only on T. Task: determine whether the same temperature-only dependence applies to enthalpy H.",
                        q_ie_a5: "Mixing benchmark: two ideal gases at the same initial temperature are mixed. Task: determine ΔU of the combined system.",
                        q_ie_e1: "Joule free-expansion reference (vacuum, ideal gas). Task: determine the temperature change dT.",
                        q_ie_e2: "Real-gas Joule expansion analysis: Task: state the typical sign/trend of dT compared with ideal-gas behavior.",
                        q_ie_e3: "High-temperature CO2 model: linear triatomic with translational, rotational, and vibrational modes. Task: determine total active degrees of freedom.",
                        q_ie_e4: "Radiation thermodynamics task: with u=U/V=aT^{4} and P=u/3 for a photon gas, identify the resulting equation-of-state relation.",
                        q_ie_e5: "Heat-capacity-ratio linkage: given g=Cp/Cv. Task: express g in terms of active degrees of freedom f.",
                        q_wh_b5: "Graph-meaning check: Task: identify in which thermodynamic diagram the area under a process curve equals mechanical work.",
                        q_wh_c3: "Compression calculation: gas volume decreases from 5 L to 2 L at 100 kPa. Task: determine work sign and magnitude for system work.",
                        q_wh_c4: "Cycle-direction interpretation: a loop is clockwise on a PV diagram. Task: determine the sign of total net work.",
                        q_wh_c5: "Unit-consistency check: Task: convert P×V units and identify what physical energy unit Pa·m^{3} corresponds to.",
                        q_wh_a1: "Isothermal-work benchmark: n=1, T=300 K, and V changes 1 → 2.718 (e). Task: compute W using logarithmic form.",
                        q_wh_a2: "Adiabatic first-law linkage: given ΔU=-500 J. Task: determine work W with Q=0.",
                        q_wh_a3: "Cycle-work aggregation: path A→B has W=100 J and return B→A has W=-40 J. Task: compute net cyclic work.",
                        q_wh_a4: "Isobaric-heating application: 1 mol ideal gas is heated by 10 K at constant pressure. Task: determine work done by system.",
                        q_wh_a5: "Function-type concept check: Task: classify work as path function or state function.",
                        q_wh_e1: "Polytropic-limit analysis: W=(P2V2-P1V1)/(1-n). Task: determine what special treatment is needed when n=1.",
                        q_wh_e2: "Real-gas work setup: for van der Waals form P=nRT/(V-nb)-... (ignore attraction term a), isothermal expansion V1→V2. Task: identify work-evaluation approach.",
                        q_wh_e3: "Stirling-cycle structure check: Task: complete the process pair after two isotherms in the ideal Stirling cycle.",
                        q_wh_e4: "Adiabatic-work substitution: W=(P1V1-P2V2)/(g-1), monatomic g=1.67, P1V1=100, P2V2=50. Task: compute W.",
                        q_wh_e5: "Irreversibility principle check: Task: determine entropy-production behavior during irreversible work processes."
                },
                scenarios: {
                        first_law: "The First Law of Thermodynamics is the law of conservation of energy.",
                        internal_energy: "Internal energy depends on the temperature and state of the system.",
                        work_heat: "Heat and work are the two ways energy is transferred."
                },
                labels: {
                        yes_no: "Yes/No",
                        label_yn: "Y/N",
                        factor: "Factor",
                        sign: "Sign",
                        type: "Type",
                        label_type: "Type",
                        label_ps: "Path/State",
                        label_symbol: "Symbol",
                        limit: "Limit",
                        corr: "Correction",
                        procs: "Process",
                        cv_r: "Cv/R"
                },
                placeholders: {
                        isothermal: "isothermal",
                        constant: "constant",
                        state: "state",
                        yes: "yes"
                }
        },
        gp2_03: {
                title: "GP2.03 // HEAT ENGINES",
                stages: { efficiency: "EFFICIENCY", carnot: "CARNOT CYCLE", heat_flow: "HEAT FLOW" }
        },
        gp2_04: {
                title: "GP2.04 // ENTROPY",
                stages: { entropy_concept: "ENTROPY", second_law: "SECOND LAW", arrow_of_time: "TIME ARROW" }
        },

        // GP3.01: Wave Physics
        gp3_01: {
                back: "Back to Nexus",
                title: "GP3.01 // WAVE PHYSICS",
                difficulty: {
                        basic: "BASIC",
                        core: "CORE",
                        advanced: "ADVANCED",
                        elite: "ELITE"
                },
                stages: {
                        wave_properties: "WAVE PROPERTIES",
                        superposition: "SUPERPOSITION",
                        optics: "OPTICS"
                },
                scenarios: {
                        wave_properties: "You are analyzing wave motion on the Rhine River near Basel's Mittlere Brücke. The river generates surface waves with varying frequencies and wavelengths. Understanding wave properties is crucial for Basel's river navigation safety and the design of the new Rhine harbor facilities. The fundamental wave equation v = fλ relates velocity, frequency, and wavelength. Sound waves in air travel at 340 m/s, while in water they travel at 1500 m/s. This difference affects underwater communication systems used by Basel's river monitoring stations. Wave period T = 1/f describes oscillation time. These principles apply to all wave phenomena from water waves to electromagnetic radiation.",
                        superposition: "At Basel's Stadtcasino concert hall, acoustic engineers study wave interference patterns to optimize sound quality. When two waves meet, they superpose - their amplitudes add algebraically. Constructive interference occurs when waves are in phase, creating louder sound. Destructive interference happens when waves are out of phase, causing cancellation. Standing waves form in the concert hall when reflected waves interfere with incident waves, creating nodes (zero amplitude) and antinodes (maximum amplitude). The double-slit experiment demonstrates wave interference with light, producing bright and dark fringes. Thin film interference creates colorful patterns in soap bubbles and oil slicks, phenomena studied at Basel University's physics department.",
                        optics: "CERN's Basel collaboration uses advanced optical systems for particle detection. Light obeys the law of reflection (θᵢ = θᵣ) and Snell's law of refraction (n_1sinθ_1 = n_2sinθ_2). Total internal reflection occurs when light travels from denser to less dense medium at angles exceeding the critical angle, enabling fiber optic communication in Basel's telecommunications infrastructure. Single-slit diffraction creates characteristic patterns with minima at asinθ = mλ. Diffraction gratings with equation d·sinθ = mλ are used in spectrometers at Roche and Novartis for chemical analysis. The Rayleigh criterion determines optical resolution limits for Basel's astronomical observatory telescopes."
                },
                objective_title: "Wave Analysis",
                complete: "Module Complete!",
                check: "Verify",
                next: "Next Challenge",
                correct: "Wave Verified",
                incorrect: "Check calculation",
                monitor_title: "GP3.01_WAVE_MONITOR",
                prompts: {
                        find_velocity: "Rhine wave monitoring task: compute propagation speed for navigation timing. Given f={f} Hz and λ={lambda} m. Use v=fλ.",
                        find_wavelength: "Basel acoustic calibration: determine wavelength from known source speed and frequency. Given f={f} Hz and v={v} m/s. Use λ=v/f.",
                        find_frequency: "Signal diagnostics task: recover oscillation frequency from speed and spacing. Given v={v} m/s and λ={lambda} m. Use f=v/λ.",
                        verify_wave_eq: "Engineering consistency check: confirm the wave-equation result. Given f={f} Hz, λ={lambda} m, and candidate v={v} m/s. Verify whether v=fλ.",
                        water_wave: "Rhine surface-wave briefing: estimate travel speed for dock response planning. Given f={f} Hz and λ={lambda} m. Apply v=fλ.",
                        find_period: "Oscillation timing task: convert frequency to period for sensor sampling. Given f={f} Hz. Use T=1/f.",
                        period_to_freq: "Control-loop setup: convert period to frequency for waveform generation. Given T={T} s. Use f=1/T.",
                        sound_in_air: "Concert-hall sound check: compute wavelength in air propagation. Given v=340 m/s and f={f} Hz. Use λ=v/f.",
                        sound_in_water: "Underwater communication check: compute wavelength in water propagation. Given v=1500 m/s and f={f} Hz. Use λ=v/f.",
                        speed_ratio: "Medium-comparison task: evaluate transmission speed advantage in water vs air. Given vwater=1500 m/s and vair=340 m/s. Compute vwater/vair.",
                        doppler_approach: "Basel emergency-siren analysis: the source moves toward the observer. Task: decide whether observed frequency shifts up or down. Use: Doppler approach rule.",
                        doppler_recede: "Roadside acoustics check: the siren source moves away from the observer. Task: determine whether observed frequency increases or decreases. Use: Doppler recession rule.",
                        constructive_interference: "Concert-hall superposition test: two waves each have amplitude A = 2 m and meet in phase. Task: compute total amplitude. Use: constructive addition.",
                        destructive_interference: "Noise-cancellation demo: two waves each have amplitude A = 3 m and meet in opposite phase. Task: compute resulting amplitude. Use: destructive subtraction.",
                        beat_frequency: "Instrument tuning at rehearsal: two forks are 440 Hz and 444 Hz. Task: compute beat frequency. Use: |f₁-f₂| for modulation rate.",
                        de_broglie: "Quantum calibration task: for an electron with m = 9.1×10^{-31} kg and v = 1 m/s, determine de Broglie wavelength. Given h = 6.63×10^{-34}. Use: λ = h/(mv).",
                        wave_particle_duality: "Concept verification in optics lab: evaluate whether light shows both wave and particle behavior. Task: choose true or false. Use: wave-particle duality model.",
                        photon_energy: "Photon-energy check: frequency is f = 5×10^14 Hz and Planck constant is h = 6.63×10^{-34}. Task: compute E. Use: E = hf.",
                        matter_wave: "Electron-wave estimation: apply λ = h/(mv) to a typical electron. Task: select the approximate wavelength scale. Use: matter-wave relation.",
                        uncertainty: "Measurement-limit review: Heisenberg relation is ΔxΔp ≥ h/4π. Task: decide whether position and momentum can both be exact. Use: uncertainty principle.",
                        same_phase_add: "Wave-stack test: two waves with A = 2 m are perfectly in phase. Task: compute combined amplitude. Use: direct amplitude addition.",
                        opposite_phase_cancel: "Phase-opposition test: two waves with A = 3 m are 180° out of phase. Task: compute net amplitude. Use: amplitude difference rule.",
                        constructive_max: "Peak-amplitude check: two waves with A = 1 m interfere constructively. Task: determine maximum resultant amplitude. Use: in-phase superposition.",
                        partial_destructive: "Partial-cancellation case: wave amplitudes are A_1 = 5 m and A_2 = 3 m with destructive interference. Task: compute final amplitude. Use: subtract magnitudes.",
                        interference_type: "Interference classification task: two waves combine with zero phase difference. Task: identify the interference type. Use: phase-interference mapping.",
                        standing_wave_node: "String-resonance setup: standing wave has λ=2 m. Task: find first node position x_1. Use node-position relation.",
                        standing_wave_antinode: "Resonance mode check: standing wave has λ=4 m. Task: find first antinode position x_1. Use antinode-position relation.",
                        node_count: "String mapping task: string length is 5 m and λ=2 m. Task: determine number of nodes. Use λ/2 spacing.",
                        string_fundamental: "Fundamental string mode: relation is L=λ/2. Given λ=1 m, task: compute L for the base mode.",
                        harmonic_wavelength: "Harmonic conversion task: fundamental wavelength is λ_1=2 m. Task: compute second-harmonic wavelength λ_2.",
                        double_slit_spacing: "Double-slit calibration: λ=500 nm, L=2 m, d=1 mm. Task: compute fringe spacing Δy using Δy=λL/d.",
                        fringe_order: "Interference-screen task: λ=600 nm, L=2 m, d=1.2 mm. Task: compute third bright fringe position y_3.",
                        slit_separation: "Setup inversion task: λ=500 nm, L=1 m, Δy=1 mm. Task: compute slit separation d from fringe data.",
                        wavelength_from_fringes: "Optical measurement task: Δy=0.8 mm, d=0.5 mm, L=1 m. Task: compute wavelength λ.",
                        central_maximum: "Double-slit reference check: task is to identify central-maximum position y_0 on the screen.",
                        thin_film_constructive: "Thin-film design (n=2): λ=500 nm, order m=1 constructive case. Task: compute required thickness t.",
                        thin_film_destructive: "Thin-film design (n=2): λ=600 nm, order m=0 destructive case. Task: compute required thickness t.",
                        newton_rings: "Newton-rings lab: λ=500 nm and curvature radius R=1 m. Task: compute first bright-ring radius r_1.",
                        soap_bubble: "Soap-film observation: n=1.33 and thickness t=300 nm. Task: identify strongly reflected color by interference.",
                        anti_reflection: "Coating optimization: anti-reflection layer has n=2 and target λ=400 nm. Task: compute minimum thickness t.",
                        reflection_angle: "Mirror-alignment check: light incidence angle is 30 deg. Task: determine reflection angle θ_r.",
                        refraction_basic: "Refraction task: light goes from air (n=1) to glass (n=1.5) at 30 deg incidence. Task: compute θ_2.",
                        light_speed_medium: "Medium-speed check: glass has n=1.5. Task: compute light speed v using v=c/n.",
                        refractive_index: "Material-ID task: measured light speed is v=2×10^8 m/s. Task: compute refractive index n.",
                        normal_incidence: "Boundary-condition check: light enters perpendicular to the surface. Task: state refraction angle θ_r.",
                        critical_angle: "Total-reflection threshold task: light passes from glass (n=1.5) to air (n=1). Task: compute critical angle θ_c.",
                        total_internal_reflection: "Fiber-entry check: incidence is 50 deg from glass to air with θ_c=42 deg. Task: decide whether TIR occurs.",
                        fiber_optics: "Communication-systems concept check: task is to identify which optical principle keeps light trapped in fibers.",
                        prism_dispersion: "Prism spectroscopy concept check: task is to name the effect that splits white light into colors.",
                        brewster_angle: "Polarization setup: glass-to-air boundary with tan θ_B=n_2/n_1. Task: compute Brewster angle θ_B for n=1.5 to 1.",
                        single_slit_minima: "Diffraction-screen task: single slit has a=1 mm and λ=500 nm. Task: compute first-minimum angle θ_1.",
                        diffraction_width: "Single-slit pattern sizing: a=0.6 mm, λ=600 nm, L=1 m. Task: compute central-maximum width w.",
                        rayleigh_criterion: "Telescope-resolution check: D=0.5 m and λ=500 nm. Task: compute minimum resolvable angle θ_min.",
                        circular_aperture: "Aperture-imaging task: D=10 mm, f=100 mm, λ=500 nm. Task: compute Airy-disk radius r.",
                        resolving_power: "Observatory optics check: telescope diameter D=0.5 m at λ=500 nm. Task: compute resolving power R.",
                        grating_equation: "Spectrometer setup: grating spacing d=1 μm, λ=500 nm, order m=1. Task: compute diffraction angle θ_1.",
                        grating_order: "Order-limit check: grating spacing d=2 μm and λ=600 nm. Task: compute maximum observable order m_max.",
                        grating_spacing: "Grating calibration inversion: λ=500 nm, θ_1=30 deg, m=1. Task: compute line spacing d.",
                        spectral_resolution: "Spectral-analysis planning: grating order m=2 with N=5000 lines. Task: compute resolution R.",
                        blazed_grating: "Instrumentation concept check: task is to state the purpose of a blazed grating in spectrometer design."
                },
                hints: {
                        wave_equation: "Use v = fλ",
                        wavelength_calc: "λ = v/f",
                        frequency_calc: "f = v/λ",
                        period_calc: "T = 1/f",
                        frequency_from_period: "f = 1/T",
                        sound_speed_air: "Sound in air: 340 m/s",
                        sound_speed_water: "Sound in water: 1500 m/s",
                        speed_comparison: "Divide velocities",
                        doppler_effect: "Approaching source: higher frequency",
                        doppler_recede: "Receding source: lower frequency",
                        constructive: "In phase: amplitudes add",
                        destructive: "Out of phase: amplitudes subtract",
                        beats: "Beat frequency = |f_1 - f_2|",
                        de_broglie: "λ = h/mv",
                        duality: "Light is both wave and particle",
                        photon_energy: "E = hf",
                        matter_wave: "All matter has wave properties",
                        uncertainty: "Cannot know both exactly",
                        in_phase: "Same phase: add amplitudes",
                        out_of_phase: "Opposite phase: subtract",
                        max_amplitude: "Constructive: A_1 + A_2",
                        partial_cancel: "Partial destructive: |A_1 - A_2|",
                        interference_types: "In phase = constructive",
                        node_position: "Node: x = nλ/2",
                        antinode_position: "Antinode: x = (n + 1/2)λ/2",
                        node_count: "Count λ/2 intervals",
                        fundamental_mode: "Fundamental: L = λ/2",
                        second_harmonic: "Second harmonic: λ_2 = λ_1/2",
                        double_slit: "Δy = λL/d",
                        fringe_position: "ym = mλL/d",
                        slit_distance: "d = λL/Δy",
                        wavelength_measurement: "λ = Δy·d/L",
                        central_bright: "Central maximum at y = 0",
                        thin_film: "Constructive: 2nt = mλ",
                        destructive_film: "Destructive: 2nt = (m + 1/2)λ",
                        newton_rings: "rm = √(mλR)",
                        soap_colors: "Interference creates colors",
                        anti_reflection: "Quarter-wave coating: t = λ/4n",
                        law_of_reflection: "θᵢ = θᵣ",
                        snells_law: "n_1sinθ_1 = n_2sinθ_2",
                        light_speed: "v = c/n",
                        index_calc: "n = c/v",
                        normal_ray: "Perpendicular: no bending",
                        critical_angle: "sinθc = n_2/n_1",
                        tir_condition: "θ > θc causes TIR",
                        fiber_principle: "Total internal reflection",
                        dispersion: "Different λ refract differently",
                        brewster: "tanθB = n_2/n_1",
                        single_slit: "Minima: asinθ = mλ",
                        central_width: "w = 2λL/a",
                        rayleigh: "θmin = 1.22λ/D",
                        airy_disk: "r = 1.22λf/D",
                        resolution: "R = D/(1.22λ)",
                        grating: "d·sinθ = mλ",
                        max_order: "mmax = d/λ",
                        line_spacing: "d = mλ/sinθ",
                        grating_resolution: "R = mN",
                        blaze_angle: "Optimizes efficiency"
                },
                labels: {
                        answer: "\\text{Answer}",
                        type: "\\text{Type}",
                        color: "\\text{Color}",
                        yes_no: "\\text{Yes/No}",
                        principle: "\\text{Principle}",
                        effect: "\\text{Effect}",
                        purpose: "\\text{Purpose}",
                        higher: "\\text{Higher}",
                        lower: "\\text{Lower}",
                        both_wave_particle: "\\text{Both wave and particle}",
                        yes_heisenberg: "\\text{Yes (Heisenberg)}",
                        constructive: "\\text{Constructive}",
                        green_500nm: "\\text{Green (500 nm)}",
                        yes_tir: "\\text{Yes (TIR occurs)}",
                        total_internal_reflection: "\\text{Total Internal Reflection}",
                        dispersion: "\\text{Dispersion}",
                        maximize_efficiency: "\\text{Maximize efficiency}"
                },
                placeholders: {
                        yes: "yes",
                
                    higher: "higher",
                    lower: "lower",
                    both: "both",
                    constructive: "constructive",
                    green: "green",
                    tir: "TIR",
                    dispersion: "dispersion",
                    efficiency: "efficiency",                    v_6: "6",
                    v_2: "2",
                    v_4: "4",
                    v_30: "30",
                    v_32: "32",
                    v_0_dot_5: "0.5",
                    v_5: "5",
                    v_0_dot_68: "0.68",
                    v_3: "3",
                    v_4_dot_4: "4.4",
                    v_0: "0",
                    v_6_dot_63e_minus_34: "6.63e-34",
                    v_3_dot_31e_minus_19: "3.31e-19",
                    v_1e_minus_10: "1e-10",
                    v_1: "1",
                    v_400: "400",
                    v_250: "250",
                    v_150: "150",
                    v_100: "100",
                    v_22: "22",
                    v_2e8: "2e8",
                    v_1_dot_5: "1.5",
                    v_42: "42",
                    v_53: "53",
                    v_1e_minus_6: "1e-6",
                    v_1000: "1000",
                    v_10000: "10000"
},
                expr: {
                        same_phase_constructive: "\\text{Same phase} \\rightarrow \\text{constructive}",
                        blaze_angle_efficiency: "\\text{Blaze angle} \\rightarrow \\text{max efficiency}"
                }
        },

        // GP3.02: Electromagnetism Basics
        gp3_02: {
                back: "Back to Nexus",
                title: "GP3.02 // ELECTROMAGNETISM BASICS",
                difficulty: {
                        basic: "BASIC",
                        core: "CORE",
                        advanced: "ADVANCED",
                        elite: "ELITE"
                },
                stages: {
                        electric_field: "ELECTRIC FIELDS",
                        magnetic_field: "MAGNETIC FIELDS",
                        particle_motion: "PARTICLE MOTION"
                },
                scenarios: {
                        electric_field: "You are a research engineer at Roche Tower Basel, designing an advanced electrostatic precipitator for air purification in pharmaceutical clean rooms. The system uses electric fields to remove airborne particles, ensuring sterile production environments for life-saving medications. Electric field strength E = kQ/r^{2} (where k = 8.99×10^9 N·m^{2}/C^{2}) determines the force on charged particles. A point charge Q creates an electric field that radiates outward, with field lines showing direction and strength. The force on a test charge q in this field is F = qE. Understanding electric fields is crucial for designing medical equipment, particle accelerators at CERN's Basel collaboration, and semiconductor manufacturing at local tech companies. These principles also explain lightning protection systems on Basel's historic buildings and the operation of touchscreens in smartphones.",
                        magnetic_field: "At Basel University Hospital's MRI department, you are calibrating magnetic field systems for medical imaging. Magnetic fields are created by electric currents and are measured in Tesla (T). A straight current-carrying wire produces a circular magnetic field with strength B = μ₀I/(2πr), where μ₀ = 4π×10^{-7} T·m/A is the permeability of free space. The right-hand rule determines field direction: thumb points along current, fingers curl in field direction. Solenoids (coils) create uniform fields B = μ₀nI inside, used in MRI machines to align hydrogen atoms in patients' bodies. The force on a current-carrying wire in a magnetic field is F = BILsinθ, enabling electric motors in Basel's trams and trains. Magnetic levitation (maglev) trains use these principles, and Basel's connection to the Swiss rail network relies on electromagnetic systems.",
                        particle_motion: "You are a physicist at CERN's Basel research facility, analyzing charged particle trajectories in electromagnetic fields for the Large Hadron Collider experiments. When a charged particle (charge q, mass m) enters an electric field E, it experiences force F = qE and acceleration a = qE/m, following a parabolic path like projectile motion. In a magnetic field B, a moving charged particle experiences the Lorentz force F = qvB perpendicular to both velocity and field, causing circular motion with radius r = mv/(qB). This principle enables mass spectrometers at Novartis and Roche quality control laboratories to identify molecular masses of pharmaceutical compounds. Velocity selectors use crossed electric and magnetic fields where particles travel straight only when v = E/B, separating ions by speed. Cyclotrons accelerate particles in spiral paths for cancer radiation therapy at Basel University Hospital. Understanding particle motion is essential for designing particle detectors, analyzing cosmic rays, and developing next-generation medical imaging technologies."
                },
                objective_title: "Electromagnetic Analysis",
                complete: "Module Complete!",
                check: "Verify",
                next: "Next Challenge",
                correct: "Field Verified",
                incorrect: "Check calculation",
                monitor_title: "GP3.02_EM_MONITOR",
                labels: {
                        loading: "Loading...",
                        question: "Question",
                        formula: "Formula",
                        placeholder_value: "type value",
                        answer_field: "Field (N/C or T)",
                        answer_force: "Force (N)",
                        answer_radius: "Radius (m)",
                        answer_velocity: "Velocity (m/s)"
                },
                prompts: {
                        ef_field_from_qr: "Basel clean-room electrostatics: compute electric field strength for particle filtering. Given Q={Q} C and r={r} m. Use E=kQ/r^2 and report E in N/C.",
                        ef_force_from_qr: "CERN detector calibration: estimate force on a test charge in a point-charge field. Given source charge Q={Q} C, distance r={r} m, and test charge q={q} C. First find E, then use F=qE.",
                        mf_wire_field: "MRI cable safety check: estimate magnetic field around a straight current wire. Given I={I} A and r={r} m. Use B=μ₀I/(2πr).",
                        mf_solenoid_field: "Hospital coil design: compute uniform magnetic field inside a solenoid. Given N={N}, I={I} A, and L={L} m. Use B=μ₀NI/L.",
                        pm_electric_force: "Charged-particle injector setup: find electric force in a uniform field. Given q={q} C and E={E} N/C. Use F=qE.",
                        pm_magnetic_force: "Beam steering check in a magnetic channel: compute Lorentz force magnitude. Given q={q} C, v={v} m/s, and B={B} T (perpendicular). Use F=qvB.",
                        pm_radius: "Cyclotron trajectory estimate: compute circular radius of a charged particle. Given m={m} kg, v={v} m/s, q={q} C, and B={B} T. Use r=mv/(qB).",
                        pm_velocity_from_voltage: "Acceleration tube commissioning: find particle exit speed after voltage gain. Given q={q} C, V={V} V, and m={m} kg. Use v=sqrt(2qV/m)."
                }
        },

        // GP3.03: Electromagnetic Induction
        gp3_03: {
                back: "Back to Nexus",
                title: "GP3.03 // ELECTROMAGNETIC INDUCTION",
                difficulty: {
                        basic: "BASIC",
                        core: "CORE",
                        advanced: "ADVANCED",
                        elite: "ELITE"
                },
                stages: {
                        faradays_law: "FARADAY'S LAW",
                        lenzs_law: "LENZ'S LAW",
                        generators: "GENERATORS & MOTORS"
                },
                scenarios: {
                        faradays_law: "You are an electrical engineer at Kraftwerk Birsfelden, a hydroelectric power plant on the Rhine River near Basel, analyzing electromagnetic induction in the facility's generators. Faraday's Law of Electromagnetic Induction states that a changing magnetic flux through a coil induces an electromotive force (EMF): ε = -N(ΔΦ/Δt), where N is the number of turns, Φ is magnetic flux (Φ = BA), B is magnetic field strength, and A is the coil area. When a magnet moves through a coil or a coil rotates in a magnetic field, the changing flux induces a current. The faster the change, the greater the induced EMF. This principle powers Basel's electrical grid, converting the Rhine's kinetic energy into electricity for homes, hospitals, and industries. Understanding Faraday's Law is essential for designing transformers at ABB Switzerland, wireless charging systems for electric vehicles, and induction cooktops in modern Basel kitchens. The same physics enables metal detectors at Basel Airport and magnetic card readers in public transportation.",
                        lenzs_law: "At Basel University's physics laboratory, you are demonstrating Lenz's Law, which determines the direction of induced current. Lenz's Law states that the induced current flows in a direction to oppose the change in magnetic flux that caused it, conserving energy. When a magnet's north pole approaches a coil, the induced current creates a magnetic field with a north pole facing the magnet, repelling it. When the magnet moves away, the induced field's south pole faces the magnet, attracting it. This opposition requires work, converting mechanical energy to electrical energy. Lenz's Law explains electromagnetic braking in Basel's trams: when brakes engage, induced currents in metal discs create opposing magnetic forces, slowing the vehicle without friction. Eddy currents in aluminum sheets demonstrate this principle, used in recycling facilities to separate metals. Understanding Lenz's Law is crucial for designing regenerative braking systems in electric vehicles, magnetic dampers in Basel's modern buildings for earthquake protection, and non-contact braking systems in high-speed trains.",
                        generators: "You are a power systems engineer at Axpo Energy, designing and maintaining generators for Switzerland's electrical grid connected to Basel. Electric generators convert mechanical energy to electrical energy using electromagnetic induction. In an AC generator, a coil rotates in a magnetic field, continuously changing the flux and inducing a sinusoidal EMF: ε = NABω sin(ωt), where ω is angular velocity. The Rhine River's hydroelectric plants use turbines to rotate generator coils, producing alternating current at 50 Hz for Basel's power grid. DC generators use commutators to produce direct current, powering Basel's tram system. Electric motors work in reverse: electrical energy creates magnetic forces that produce rotation, used in everything from Basel's industrial machinery to household appliances. Transformers use mutual induction to change voltage levels: step-up transformers increase voltage for long-distance transmission from Birsfelden to Basel, while step-down transformers reduce voltage for safe household use. Understanding generators and motors is essential for renewable energy systems, electric vehicle design, and maintaining Basel's sustainable energy infrastructure."
                },
                objective_title: "Induction Analysis",
                complete: "Module Complete!",
                check: "Verify",
                next: "Next Challenge",
                correct: "Induction Verified",
                incorrect: "Check calculation",
                monitor_title: "GP3.03_INDUCTION_MONITOR",
                labels: {
                        direction_effect: "Direction/Effect",
                        answer: "Answer",
                        emf: "EMF (V)",
                        voltage: "Voltage (V)",
                        value: "Value",
                        output_power: "Output Power (W)",
                        type_value: "type value",
                        type_answer: "type answer",
                        loading: "Loading...",
                        question_id: "Question {id}"
                },
                expressions: {
                        lenz_law: "\\text{Lenz's Law: induced effects oppose the change}",
                        generator_principles: "\\text{Generator principles}"
                },
                prompts: {
                        faraday_basic: "Rhine generator check: magnetic flux changes by {flux} Wb in {time} s. Task: compute induced EMF ε with Faraday's law. Use: estimate output response.",
                        faraday_core: "Coil test at Basel grid lab: N={turns}, flux change {flux} Wb in {time} s. Task: calculate induced EMF ε. Use: validate winding performance.",
                        faraday_advanced: "Turbine-rig calibration: N={turns}, A={area} m^{2}, field change {field} T over {time} s. Task: compute induced EMF ε. Use: check design margin.",
                        faraday_elite: "Generator mission run: N={turns}, A={area} m^{2}, B={field} T, frequency {freq} Hz. Task: determine induced EMF scale. Use: predict high-load behavior.",
                        lenz_magnet_approaching: "Tram-brake demo: a north pole approaches the coil. Task: state induced current direction by Lenz's law. Use: identify how the system opposes flux increase.",
                        lenz_magnet_leaving: "Lab magnet test: a north pole moves away from the coil. Task: determine induced current direction. Use: explain opposition to decreasing flux.",
                        lenz_field_increasing: "Field ramp-up scenario: external B-field through the loop is increasing. Task: give induced field direction. Use: apply opposition rule correctly.",
                        lenz_field_decreasing: "Field ramp-down scenario: external B-field through the loop is decreasing. Task: give induced field direction. Use: justify the restoring response.",
                        lenz_coil_entering: "Conveyor coil experiment: the loop enters a magnetic region. Task: identify induced current behavior. Use: infer direction from changing flux.",
                        lenz_falling_magnet: "Drop-tube setup: a magnet falls through a sensing coil. Task: describe the induced effect. Use: link energy conversion to magnetic opposition.",
                        lenz_rotating_coil: "Rotor observation run: a coil rotates in a magnetic field. Task: identify the current type generated. Use: connect periodic flux change to output form.",
                        lenz_moving_conductor: "Rail-conductor trial: a conductor moves across a magnetic field. Task: determine force/current direction. Use: apply motion-induced flux logic.",
                        lenz_changing_current: "Inductor startup test: current in a coil is increasing. Task: state the induced EMF tendency. Use: explain why the circuit resists rapid change.",
                        lenz_transformer: "Transformer bench test: AC enters the primary coil. Task: identify the effect in the secondary coil. Use: describe induction-based transfer.",
                        lenz_eddy_currents: "Metal-screening station: a plate moves in a magnetic field. Task: identify the induced effect. Use: connect eddy currents to drag/heating behavior.",
                        lenz_self_inductance: "Single-coil pulse test: current changes in the same coil. Task: identify self-induced response. Use: apply Lenz opposition within one circuit.",
                        lenz_mutual_inductance: "Dual-coil coupling test: current in coil A varies. Task: state impact on coil B. Use: explain mutual induction direction/effect.",
                        lenz_lenz_brake: "Electromagnetic brake rig: a conducting disk rotates in B-field. Task: determine rotation effect. Use: connect induced currents to braking torque.",
                        lenz_induction_heating: "Induction-cooktop model: AC coil placed near metal. Task: describe resulting effect. Use: relate induced currents to thermal output.",
                        lenz_maglev_train: "Maglev track prototype: moving magnet passes over conductor. Task: determine force direction/effect. Use: explain lift/drag from induced currents.",
                        lenz_induction_motor: "Motor trainer setup: rotating magnetic field applied to rotor. Task: state rotor behavior. Use: infer induced torque direction.",
                        lenz_wireless_charging: "Wireless charger trial: transmitter coil carries AC. Task: identify receiver-side effect. Use: describe energy transfer by induction.",
                        lenz_metal_detector: "Security gate test: metal approaches sensing coil. Task: identify what changes in the signal. Use: link perturbation to induced currents.",
                        lenz_regenerative_braking: "EV braking analysis: motor switches to generator mode. Task: state energy-flow direction. Use: explain recovery during deceleration.",
                        generator_basic_ac: "Generator fundamentals quiz: a coil rotates in a magnetic field. Task: identify the output type. Use: classify AC generation.",
                        generator_basic_dc: "Commutator design check: generator includes a commutator. Task: identify output type. Use: distinguish DC from AC configurations.",
                        generator_basic_frequency: "Grid-synchronization review: generator output frequency is monitored. Task: identify the dominant dependency. Use: connect speed/poles to frequency.",
                        generator_basic_voltage: "Station commissioning quiz: generator terminal voltage is evaluated. Task: identify what it depends on most. Use: map design parameters to voltage.",
                        generator_basic_power: "Plant operation briefing: generator electrical power is assessed. Task: identify the main dependency. Use: relate output to voltage/current/loading.",
                        generator_core: "Rated-generator calculation: N={turns}, A={area} m^{2}, B={field} T, speed {speed} rpm. Task: compute output voltage V. Use: verify commissioning target.",
                        generator_adv_find_current: "Power-delivery check: P={power} W and V={voltage} V are measured. Task: compute current I. Use: validate cable loading.",
                        generator_adv_find_voltage: "Output-bus check: P={power} W and I={current} A are measured. Task: compute voltage V. Use: confirm operating setpoint.",
                        generator_adv_find_power: "Load assessment: V={voltage} V and I={current} A are measured. Task: compute electrical power P. Use: evaluate production status.",
                        generator_elite: "Efficiency audit: a {type} generator runs at {efficiency}% efficiency with {input} W input. Task: determine output power. Use: benchmark plant performance.",
                        generator_type_hydro: "Hydro",
                        generator_type_wind: "Wind",
                        generator_type_thermal: "Thermal",
                        generator_type_solar: "Solar",
                        generator_type_nuclear: "Nuclear"
                }
        },
        // SP1.03: Weather & Climate
        sp1_03: {
                title: "SP1.03 // Weather & Climate",
                back: "Back",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                placeholders: {
                        name: "Name",
                        hpa: "hPa",
                        formula: "Formula"
                },
        stages: {
                atmosphere: "ATMOSPHERE",
                weather: "WEATHER",
                climate: "CLIMATE"
        },
        check: "Verify",
        next: "Next Challenge",
        correct: "Data Validated",
        incorrect: "Check parameters",
        monitor_title: "METEOROLOGY_V1",
        loading: "Loading...",
        labels: { mission_objective: "METEOROLOGICAL ANALYSIS", terminal_input: "DATA INPUT", hint: "HINT", sensor_feed: "SENSOR FEED" },
        prompts: {}
        },

        // SP1.04: Astronomy Basics
        sp1_04: {
                title: "SP1.04 // Astronomy Basics",
                back: "Back",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                placeholders: {
                        name: "Name",
                        degrees: "Degrees"
                },
        stages: {
                solar_system: "SOLAR SYSTEM",
                moon_phases: "MOON PHASES",
                seasons: "SEASONS"
        },
        check: "Verify",
        next: "Next Challenge",
        correct: "Coordinates Validated",
        incorrect: "Check orbital data",
        monitor_title: "ASTRONOMY_V1",
        loading: "Loading...",
        labels: { mission_objective: "ORBITAL ANALYSIS", terminal_input: "TELEMETRY INPUT", hint: "HINT", sensor_feed: "SENSOR FEED" },
        prompts: {}
        }
};
