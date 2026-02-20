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
                "footer_left": "SP1.01_Mechanics // Node: Basel",
                "check": "Verify Force",
                "next": "Next Task",
                "correct": "Models Match",
                "incorrect": "Deviation",
                "ready": "READY",
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
                back: "Back to Nexus",
                title: "GP1.01 // THE ATOMIC CORE",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Active Mission Objective",
                target_title: "Isotope / Decay",
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                ready: "Ready",
                monitor_title: "GP1.01_NUCLEAR_MONITOR",
                footer_left: "GP1.01_MODERN_PHYSICS // NODE: BASEL",
                labels: {
                        input: "INPUT PARAMETERS",
                        hints: "HINTS",
                        balancing: "NUCLEAR EQUATION",
                        mass: "Mass Number (A)",
                        atomic: "Atomic Number (Z)"
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
                }
        },
        gp1_02: {
                back: "Back to Nexus",
                title: "GP5.02 // RELATIVITY LAB",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Active Mission Objective",
                target_title: "Relativistic Effects",
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                ready: "Ready",
                monitor_title: "GP5.02_RELATIVITY_MONITOR",
                footer_left: "GP5.02_SPECIAL_RELATIVITY // NODE: CERN",
                labels: {
                        velocity: "Velocity (v/c)",
                        lorentz_factor: "Lorentz Factor (γ)",
                        time_dilation: "Time Dilation",
                        length_contraction: "Length Contraction",
                        formulas: "Formulas"
                },
                mission: {
                        title: "MISSION: SPECIAL RELATIVITY",
                        description: "Explore Einstein's special relativity at CERN. Observe time dilation and length contraction at near-light speeds."
                },
                stages: {
                        lorentz: "LORENTZ FACTOR",
                        contraction: "LENGTH CONTRACTION",
                        dilation: "TIME DILATION"
                }
        },
        gp1_03: {
                back: "Back to Nexus",
                title: "GP5.03 // PARTICLE COLLIDER",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Active Mission Objective",
                target_title: "LHC ATLAS DETECTOR",
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                ready: "Ready",
                monitor_title: "GP5.03_LHC_MONITOR",
                footer_left: "GP5.03_PARTICLE_COLLIDER // NODE: CERN",
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
                }
        },
        gp1_04: {
                back: "Back to Nexus",
                title: "GP1.04 // QUANTUM TUNNEL",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Active Mission Objective",
                target_title: "Wave Function",
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                ready: "Ready",
                monitor_title: "GP1.04_QUANTUM_MONITOR",
                footer_left: "GP1.04_QUANTUM_TUNNEL // NODE: CERN",
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
                }
        },

        // --- Basel Sek 1 Series (SP1 - Mechanics) ---

        // SP1.02: Newton's Laws
        sp1_02: {
                title: "SP1.02 // NEWTON'S LAWS",
                back: "Back to Nexus",
                footer_left: "SP1.02_MECHANICS // NODE: BASEL",
                check: "Verify",
                next: "Next",
                correct: "Law Verified",
                incorrect: "Law Error",
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

                prompts: {
                        "FIRST_LAW": {
                                "BASIC": [
                                        "Object at rest, no force applied. Will it move?",
                                        "Object moving at 5 m/s, no net force. What happens?",
                                        "Car at rest. Driver applies no force. Does it move?",
                                        "Ball rolling at 3 m/s on frictionless surface. Net force?",
                                        "Book on table. Is it in equilibrium?",
                                        "Puck sliding on ice at constant speed. Net force?",
                                        "Object at rest stays at rest unless acted upon by?"
                                ],
                                "CORE": [
                                        "Basel tram at 15 m/s. Brakes apply -3000 N. Mass 10000 kg. Final velocity after 5s?",
                                        "Fasnacht float at rest. Push with 500 N. Friction 500 N. Does it move?",
                                        "Rhine boat moving at 2 m/s. Engine off. Friction 100 N. Mass 500 kg. Time to stop?",
                                        "Object moving at 10 m/s. Net force 0 N. Velocity after 10s?",
                                        "Car at 20 m/s. Friction 2000 N. Mass 1000 kg. Deceleration?",
                                        "Tram at constant 12 m/s. Applied force equals friction. Net force?",
                                        "Puck on ice at 5 m/s. No friction. Velocity after 20s?",
                                        "Basel bus at rest. Engine force 3000 N. Friction 3000 N. Acceleration?"
                                ],
                                "ADVANCED": [
                                        "Basel SBB train 50000 kg at 25 m/s. Brakes apply -10000 N. Distance to stop?",
                                        "Fasnacht parade float 2000 kg. Push 1000 N, friction 800 N. Acceleration?",
                                        "Rhine boat 1000 kg at 5 m/s. Water resistance 200 N. Time to reach 3 m/s?",
                                        "Tram 15000 kg at 20 m/s. Emergency brake -12000 N. Stopping distance?",
                                        "Object 500 kg moving at 8 m/s. Friction 100 N. Distance traveled before stopping?",
                                        "Car 1200 kg at 30 m/s. Brake force -4000 N. Time to stop?"
                                ],
                                "ELITE": [
                                        "Basel tram system: 3 trams, masses 10000, 12000, 15000 kg, all at 15 m/s. Total momentum?",
                                        "Fasnacht float 3000 kg at rest. Multiple pushes: 500 N, 300 N, -200 N. Net force?",
                                        "Rhine boat 2000 kg at 4 m/s. Engine thrust 1000 N, water resistance 800 N. Final velocity after 10s?"
                                ]
                        },
                        "SECOND_LAW": {
                                "BASIC": [
                                        "F=10 N, m=2 kg. Find a (m/s^{2})",
                                        "F=20 N, m=5 kg. Find a (m/s^{2})",
                                        "F=15 N, m=3 kg. Find a (m/s^{2})",
                                        "m=10 kg, a=2 m/s^{2}. Find F (N)",
                                        "m=5 kg, a=4 m/s^{2}. Find F (N)",
                                        "F=30 N, a=6 m/s^{2}. Find m (kg)",
                                        "F=40 N, a=8 m/s^{2}. Find m (kg)"
                                ],
                                "CORE": [
                                        "Basel tram 10000 kg accelerates at 1.5 m/s^{2}. Find F (N)",
                                        "Fasnacht float 2000 kg pushed with 1000 N. Find a (m/s^{2})",
                                        "Rhine boat 1500 kg, engine thrust 3000 N. Find a (m/s^{2})",
                                        "SBB train 50000 kg, brake force -10000 N. Find a (m/s^{2})",
                                        "Tram 12000 kg needs 2 m/s^{2} acceleration. Find F (N)",
                                        "Car 1000 kg, net force 2000 N. Find a (m/s^{2})",
                                        "Basel bus 8000 kg accelerates at 1 m/s^{2}. Find F (N)",
                                        "Bicycle 80 kg, force 160 N. Find a (m/s^{2})",
                                        "Truck 5000 kg, acceleration 0.5 m/s^{2}. Find F (N)"
                                ],
                                "ADVANCED": [
                                        "Basel tram 10000 kg, applied force 18000 N, friction 3000 N. Find a (m/s^{2})",
                                        "Fasnacht float 3000 kg, push 2000 N, friction 500 N. Find a (m/s^{2})",
                                        "Rhine boat 2000 kg, thrust 4000 N, water resistance 1000 N. Find a (m/s^{2})",
                                        "SBB train 60000 kg, brake -15000 N, friction -3000 N. Find a (m/s^{2})",
                                        "Tram 15000 kg needs 1.8 m/s^{2} with friction 2000 N. Find applied force (N)",
                                        "Car 1200 kg, engine 5000 N, air resistance 800 N. Find a (m/s^{2})",
                                        "Basel bus 8000 kg, engine 10000 N, friction 2000 N. Find a (m/s^{2})"
                                ],
                                "ELITE": [
                                        "Basel tram system: 3 trams (10000, 12000, 15000 kg) all accelerate at 1.5 m/s^{2}. Total force?",
                                        "Fasnacht parade: 5 floats, each 2000 kg, each pushed with 1000 N. Total acceleration?",
                                        "Rhine boat 2500 kg, thrust 5000 N, water resistance 20% of thrust. Find a (m/s^{2})"
                                ]
                        },
                        "THIRD_LAW": {
                                "BASIC": [
                                        "You push wall with 50 N. Wall pushes back with how many N?",
                                        "Rocket exerts 1000 N on gas. Gas exerts how many N on rocket?",
                                        "Earth pulls you with 600 N. You pull Earth with how many N?",
                                        "Hammer hits nail with 200 N. Nail hits hammer with how many N?",
                                        "Action-reaction forces act on (same/different) objects?",
                                        "Action force 100 N east. Reaction force direction?"
                                ],
                                "CORE": [
                                        "Basel tram 10000 kg pushes track with 15000 N. Track pushes tram with how many N?",
                                        "Rhine boat propeller pushes water backward with 3000 N. Water pushes boat with how many N?",
                                        "Fasnacht float pushes ground with 20000 N. Ground pushes float with how many N?",
                                        "SBB train wheels push track with 50000 N. Track pushes wheels with how many N?",
                                        "Swimmer pushes water backward with 500 N. Water pushes swimmer forward with how many N?",
                                        "Car tire pushes road with 4000 N. Road pushes tire with how many N?",
                                        "Rocket pushes exhaust gas with 100000 N. Gas pushes rocket with how many N?",
                                        "Person pushes wall with 200 N. Wall pushes person with how many N?"
                                ],
                                "ADVANCED": [
                                        "Basel tram 10000 kg accelerates at 1.5 m/s^{2}. Force on track?",
                                        "Rhine boat 2000 kg accelerates at 2 m/s^{2}. Force on water?",
                                        "Fasnacht float 3000 kg, friction 500 N, accelerates at 0.5 m/s^{2}. Force on ground?",
                                        "SBB train 50000 kg decelerates at -0.2 m/s^{2}. Force on track?",
                                        "Rocket 5000 kg accelerates at 10 m/s^{2}. Force on exhaust gas?",
                                        "Car 1200 kg accelerates at 3 m/s^{2}. Force on road?",
                                        "Basel bus 8000 kg accelerates at 1 m/s^{2}. Force on road?"
                                ],
                                "ELITE": [
                                        "Basel tram 10000 kg and car 1000 kg collide. Tram exerts 50000 N on car. Car exerts how many N on tram?",
                                        "Rhine boat 2000 kg pushes water with 4000 N. Boat accelerates at 2 m/s^{2}. Water mass pushed?",
                                        "Fasnacht float 3000 kg, ground pushes with 2000 N. Float accelerates at 0.5 m/s^{2}. Friction force?",
                                        "SBB train 50000 kg, track pushes with 10000 N. Train decelerates at -0.2 m/s^{2}. Verify F=ma?"
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

        // --- Basel Sek 2 Series (SP2 - Electricity) ---

        // SP2.01: Circuit Basics
        sp2_01: {
                back: "Back to Nexus",
                title: "SP2.01 // CIRCUIT BASICS",
                check: "Verify",
                next: "Next",
                correct: "Circuit Verified",
                incorrect: "Circuit Error",
                ready: "Ready",
                monitor_title: "SP2.01_CIRCUIT_LAB",
                footer_left: "SP2.01_ELECTRICITY // NODE: BASEL",
                objective_title: "Circuit Objective",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                stages: {
                        components: "COMPONENTS",
                        simple_circuits: "SIMPLE CIRCUITS",
                        circuit_diagrams: "CIRCUIT DIAGRAMS"
                },
                scenarios: {
                        components: "Basel Home Electrical Safety: You are a trainee electrician at Basel's vocational school (Gewerbeschule Basel). Today you're learning to identify circuit components for home electrical installations. Understanding each component's function is critical for safety - a misidentified component could cause fires or electrical shocks. In Basel's historic buildings, electrical systems must meet strict Swiss safety standards (NIV 2020). You'll work with batteries (power sources providing voltage), bulbs (converting electrical energy to light), switches (controlling current flow), wires (conducting electricity), and resistors (limiting current). Each component has a specific role in protecting homes and ensuring reliable power delivery. This knowledge is essential for Basel's 170,000 residents who depend on safe electrical systems every day.",
                        simple_circuits: "Basel Christmas Light Installation: You're helping install Christmas lights along Basel's Freie Strasse shopping district. The city requires energy-efficient LED strings that can be controlled independently. You need to understand series circuits (where bulbs are in a single path - if one fails, all go dark) versus parallel circuits (where bulbs are in separate paths - each can be controlled independently). Series circuits are simpler but less reliable. Parallel circuits use more wire but provide redundancy. For Basel's 2km of Christmas lights, parallel circuits with individual switches allow sections to be turned off during the day to save energy. The Basel Christmas market uses over 50,000 LED bulbs, and proper circuit design ensures they operate safely at 230V AC while consuming minimal power.",
                        circuit_diagrams: "Basel Electrical Engineering Apprenticeship: At ABB Switzerland's Basel training center, you're learning to read and draw circuit diagrams - the universal language of electricians worldwide. Circuit symbols are standardized by IEC (International Electrotechnical Commission) so engineers in Basel can collaborate with colleagues in Tokyo or New York. A battery is shown as two parallel lines (long positive, short negative). A bulb is a circle with an X inside. A switch is a gap in the line (open) or continuous line (closed). Resistors are rectangles or zigzags. Ammeters (measuring current in amperes) and voltmeters (measuring voltage in volts) are circles with A or V inside. These symbols appear in every electrical schematic from simple home circuits to complex industrial systems at Basel's Roche and Novartis pharmaceutical plants. Mastering circuit diagrams is essential for your Swiss Federal Certificate of Proficiency (Eidgenössisches Fähigkeitszeugnis EFZ) in electrical engineering."
                },
                feedback: { correct: "Circuit analysis confirmed.", incorrect: "Circuit configuration error detected." }
        },

        // --- Basel Sek 3 Series (Aligned SP3 Key Map) ---

        // SP3.01: Measurement (from sp1_01)
        sp3_01: {
                back: "Back to Nexus",
                title: "SP3.01 // MEASUREMENT & UNITS",
                check: "Verify",
                next: "Next",
                correct: "Measurement Verified",
                incorrect: "Measurement Error",
                ready: "Ready",
                monitor_title: "SP3.01_MEASUREMENT_LAB",
                footer_left: "SP3.01_MEASUREMENT // NODE: BASEL",
                objective_title: "Measurement Objective",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                stages: { si_units: "SI UNITS", conversion: "CONVERSION", precision: "PRECISION" },
                tools: { ruler: "Ruler", scale: "Scale", timer: "Timer" },
                labels: { precision: "Measurement Precision", measurement_display: "Measurement Display", input_terminal: "Terminal Input" },
                prompts: {
                        si_unit: "What is the SI unit for {measurement}?",
                        convert: "Convert {value} {from} to {to}",
                        sigfigs: "How many significant figures in {value}?",
                        hint_si: "The SI unit is {name}",
                        hint_factor: "Multiply by {factor}",
                        hint_sigfigs: "Count all non-zero digits and zeros between them"
                },
                scenarios: {
                        lab_pharma: "Novartis Quality Control: In Basel's pharmaceutical labs, measuring mass correctly is critical. A tiny error can change the entire chemical reaction.",
                        basel_watch: "Swiss Watchmaking Precision: Crafting luxury watches in Basel requires measurements in micrometers. Precision is the soul of Basel's industry."
                },
                feedback: { correct: "Measurement confirmed.", incorrect: "Calibration error detected." }
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
                footer_left: "SP3.02_MECHANICS // NODE: BASEL",
                stages: {
                        newton_1: "INERTIA",
                        newton_2: "F = ma",
                        friction: "FRICTIONAL FORCES"
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
                        hospital_equipment_3d: "On inclined plane: N = mg cos θ (normal force perpendicular to surface). Friction force f = μN = μ(mg cos θ) acts parallel to surface, opposing motion.",
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
                footer_left: "SP3.03_MECHANICS // NODE: BASEL",
                stages: { potential: "POTENTIAL ENERGY", kinetic: "KINETIC ENERGY", work: "POWER OUTPUT" },
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
                ready: "Ready",
                monitor_title: "SP3.04_FLUID_MONITOR",
                footer_left: "SP3.04_FLUID_MECHANICS // NODE: RHINE",
                objective_title: "Active Mission Objective",
                stages: { pressure: "PRESSURE", buoyancy: "BUOYANCY", hydraulics: "HYDRAULICS" },
                prompts: {
                        pressure_depth: "A swimmer dives to {depth} m in the Rhine. Calculate total pressure.",
                        buoyant_force: "An object with {volume} m^{3} is submerged in the Rhine. Calculate buoyancy.",
                        hint_pressure: "Use P = P₀ + ρgh",
                        hint_archimedes: "Use F_b = ρ_water × V × g"
                },
                scenarios: {
                        rhine_swimming: "Rhine River Swimming: Divers explore the Rhine bed near Mittlere Brücke. Water pressure increases with depth.",
                        rhine_boat: "Rhine Cargo: Understanding buoyancy is critical for the barges navigating between Basel and Rotterdam."
                },
                feedback: { correct: "Fluid mechanics mastered!", incorrect: "Review Archimedes' principle." }
        },

        // SP3.05: Simple Machines (from sp1_04 - Full Version)
        sp3_05: {
                back: "Return to Nexus",
                title: "SP3.05 // SIMPLE MACHINES",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                next: "Execute Next Sequence",
                check: "Verify",
                correct: "Verified",
                incorrect: "Mismatch",
                ready: "Ready",
                monitor_title: "SP3.05_MECHANICS_MONITOR",
                footer_left: "SP3.05_SIMPLE_MACHINES // NODE: BASEL",
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
                        pulley: "A pulley system lifts a {load} N load with {strands} supporting strands. What effort force is needed?",
                        inclined_plane: "An inclined plane lifts a {load} N load to height {height} m over length {length} m. What effort force is needed?",
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
                ready: "Ready",
                monitor_title: "SP3.07_FERRY_MONITOR",
                footer_left: "SP3.07_RHINE_FERRY // NODE: BASEL",
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
                        n_e5: "\\text{Ferry mass 1kg, } 3\\text{ m/s at } 110^\\circ\\text{, river } 1\\text{ m/s. Kinetic energy?}",
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
                        n_e5: "E = \\frac{1}{2} \\times 1 \\times v_{net}^{2}, \\text{ find } v_{net} \\text{ first}",
                },
                results: {
                        valid: "Calculation Valid",
                        invalid: "Vector Mismatch",
                        valid_desc: "Physics confirmed. Proceeding to next objective.",
                        invalid_desc: "Recalculate vector components.",
                        stability: "Vector Stability",
                }
        },

        // SP3.06: Acoustics (Existing full content)
        sp3_06: {
                back: "Back to Nexus",
                title: "SP3.06 // ACOUSTICS",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Sonic Signature Analysis",
                monitor_title: "Acoustics Monitor",
                footer_left: "SP3.06_ACOUSTICS // NODE: BASEL",
                check: "Verify",
                next: "Next Challenge",
                correct: "Correct",
                incorrect: "Incorrect",
                stages: { sound_waves: "SOUND WAVES", frequency_pitch: "FREQUENCY & PITCH", loudness_intensity: "LOUDNESS & INTENSITY" },
                scenarios: {
                        stadtcasino_basel: "Basel Symphony Orchestra - Sound Wave Physics: You are working at the Stadtcasino Basel, one of Europe's finest concert halls, known for its perfect sound reflection.",
                        euroairport_noise: "Basel Airport - Sound Intensity: Monitoring decibel levels at EuroAirport Basel-Mulhouse to protect the surrounding neighborhoods."
                }
        },

        // SP3.08: Geometrical Optics (from sp1_08)
        sp3_08: {
                title: "SP3.08 // GEOMETRICAL OPTICS",
                back: "Back to Nexus",
                footer_left: "SP3.08_OPTICS_BENCH // NODE: BASEL",
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
                hints: {
                        refraction: "Light bends toward the normal when entering a denser medium (n_2 > n_1)"
                },
                snell: { title: "SNELL'S LAW", line_1: "n_1 sin(θ_1) = n_2 sin(θ_2)", line_2: "θ_c = arcsin(n_2/n_1)", line_3: "v = c/n" },
                mission: { title: "MISSION: RAY OPTICS", description: "Master the physics of light refraction and reflection using Basel's laboratory models." }
        },

        // SP2.02: Ohm's Law & Circuits
        sp2_02: {
                title: "SP2.02 // OHM'S LAW & CIRCUITS",
                back: "Back to Nexus",
                footer_left: "SP2.02_CIRCUITS // NODE: BASEL",
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
                scenarios: {
                        ohms_law: "Basel Electrical Engineering Lab at University of Basel: You are a first-year electrical engineering student learning circuit fundamentals. Today's lab focuses on Ohm's Law (U = I × R), the foundation of all circuit analysis. Your task is to calculate voltage, current, or resistance in simple circuits. Professor Schmidt emphasizes: 'Understanding Ohm's Law is like learning the alphabet - it's essential for everything that follows.' You'll use digital multimeters to measure real circuits and verify your calculations. This knowledge is crucial for designing everything from smartphone circuits to Basel's tram electrical systems.",
                        series_circuits: "Novartis Pharmaceutical Equipment Design: You are working with the electrical engineering team at Novartis Basel, designing power distribution for new laboratory equipment. In series circuits, components share the same current, but voltage divides across them. Your task is to calculate total resistance (R_total = R_1 + R_2 + ...) and current flow. This is critical for ensuring that sensitive analytical instruments receive correct voltage levels. A miscalculation could damage equipment worth millions of Swiss Francs or compromise drug quality testing results.",
                        parallel_circuits: "Roche Tower Lighting System: You are designing the emergency lighting system for Roche Tower in Basel. In parallel circuits, components share the same voltage, but current divides among branches. Your task is to calculate total current and equivalent resistance (1/R_total = 1/R_1 + 1/R_2 + ...). This design ensures that if one light fails, others continue working - critical for safety during power outages. The system must handle the building's 41 floors with thousands of LED lights operating efficiently."
                }
        },

        // SP2.03: Electric Power & Energy
        sp2_03: {
                title: "SP2.03 // ELECTRIC POWER & ENERGY",
                back: "Back to Nexus",
                footer_left: "SP2.03_POWER // NODE: BASEL",
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
                scenarios: {
                        power_basics: "Basel Household Electricity: You are helping Basel's energy consulting company calculate power consumption for residential customers. Electric power (P = U × I) determines how much energy devices use per second, measured in Watts. Your task is to calculate power for various household appliances. Understanding this helps families reduce electricity bills and carbon footprint. For example, a typical Basel household uses about 4,500 kWh per year, costing around 1,125 CHF at 0.25 CHF/kWh. Accurate power calculations help identify energy-wasting devices.",
                        energy_consumption: "IWB Basel Energy Management: You work for IWB (Industrielle Werke Basel), Basel's main electricity provider. Your task is to calculate energy consumption (E = P × t) and costs for commercial customers. Energy is measured in kilowatt-hours (kWh), and Basel's electricity rate is approximately 0.25 CHF/kWh for households and 0.20 CHF/kWh for businesses. You're analyzing a Novartis laboratory that runs equipment 24/7. Accurate calculations ensure correct billing and help customers optimize energy usage to reduce costs and environmental impact.",
                        efficiency: "Basel Solar Panel Installation: You are an engineer at Solarville Basel, installing solar panels on residential rooftops. Efficiency (η = P_out/P_in × 100%) determines how much sunlight energy converts to electricity. Modern panels achieve 18-22% efficiency. Your task is to calculate power output, energy losses, and cost savings. A typical Basel home with 20 m^{2} of panels (4 kW capacity) generates about 3,800 kWh/year, saving approximately 950 CHF annually. Understanding efficiency helps customers make informed investment decisions."
                },
                prompts: {
                        e1: "IWB Heat Pump: P=3kW for 500h. Rate: 0.28 CHF/kWh. Cost?",
                        e2: "Summer AC: P=1.5kW for 100h. Rate: 0.28 CHF/kWh. Cost?",
                        e3: "Basler Läckerli Oven: P=2kW for 5h. Rate: 0.28 CHF/kWh. Cost?",
                        e4: "EV Charging (Off-peak): P=11kW for 50h. Rate: 0.24 CHF/kWh. Cost?",
                        e5: "Fasnacht Lanterns: P=0.5kW for 72h. Rate: 0.28 CHF/kWh. Cost?"
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
                ready: "Stable",
                monitor_title: "GP2.01_THERMO_MONITOR",
                footer_left: "GP2.01_THERMODYNAMICS // NODE: BASEL",
                stages: { ideal_gas: "IDEAL GAS", boyles: "BOYLE'S LAW", charles: "CHARLES'S LAW" },
                prompts: {
                        find_p: "Ideal gas: n = {n} mol, T = {T} K, V = {V} m^{3}. Find P.",
                        find_v: "Gas: n = {n} mol, P = {P} Pa, T = {T} K. Find V.",
                        find_n: "Gas: P = {P} Pa, V = {V} m^{3}, T = {T} K. Find n.",
                        find_t: "Gas: P = {P} Pa, V = {V} m^{3}, n = {n} mol. Find T.",
                        relation_pt: "Double the temperature at constant volume. Pressure changes by what factor?",
                        relation_vn: "Double the moles at constant P and T. Volume changes by what factor?",
                        boyle_find_p2: "Boyle's Law: P_1 = {p1} kPa, V_1 = {v1} L, V_2 = {v2} L. Find P_2.",
                        boyle_find_v2: "Boyle's Law: P_1 = {p1} kPa, V_1 = {v1} L, P_2 = {p2} kPa. Find V_2.",
                        boyle_relation: "Compress gas from {v1} L to {v2} L at constant T. Pressure multiplies by?",
                        boyle_condition: "Boyle's Law requires which quantity to remain constant?",
                        charles_find_v2: "Charles's Law: V_1 = {v1} L, T_1 = {t1} K, T_2 = {t2} K. Find V_2.",
                        charles_find_t2: "Charles's Law: V_1 = {v1} L, T_1 = {t1} K, V_2 = {v2} L. Find T_2.",
                        charles_relation: "Double the absolute temperature at constant P. Volume changes by what factor?",
                        charles_condition: "Charles's Law requires which quantity to remain constant?",
                        combined_law: "Combined Gas Law provided P, V, T changes. Solving for {target}.",
                        iwb_steam: "IWB District Heating: Steam at T={T} K, V={V} m^{3}, n={n} mol. Calculate Pressure P (Ideal Gas assumption).",
                        roche_tower: "Roche Tower Floor 40: Room V={V} m^{3}, T={T} K, P={P} Pa. Calculate moles of air n.",
                        rhine_bubble: "Rhine Diver at depth (P1={p1} kPa) exhales bubble V1={v1} mL. Volume at surface (P2={p2} kPa)?",
                        weather_balloon: "Basel Weather Balloon: Ground V={v1} m^{3}, T1={t1} K. Stratosphere T2={t2} K (assume constant P for Charles' Law). New Volume?",
                        novartis_reactor: "Novartis Reactor V={V} m^{3}. Purge with N2 at P={P} Pa, T={T} K. Calculate mass of N2 (M=0.028 kg/mol)."
                },
                scenarios: {
                        ideal_gas: "The Ideal Gas Law (PV=nRT) describes the behavior of many gases under various conditions.",
                        boyles_law: "Boyle's Law: At constant temperature, volume is inversely proportional to pressure.",
                        charles_law: "Charles's Law: At constant pressure, volume is directly proportional to temperature."
                }
        },
        gp2_02: {
                back: "Return to Nexus",
                title: "GP2.02 // THERMODYNAMICS I",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                objective_title: "Thermal Energy Analysis",
                next: "Next Phase",
                check: "Verify Energy",
                correct: "Verified",
                incorrect: "Mismatch",
                ready: "Ready",
                monitor_title: "GP2.02_THERMO_MONITOR",
                footer_left: "GP2.02_THERMODYNAMICS // NODE: BASEL",
                stages: { first_law: "FIRST LAW", internal_energy: "INTERNAL ENERGY", work_heat: "WORK & HEAT" },
                prompts: {
                        fl_calc_du: "First Law: Q = {q} J (absorbed), W = {w} J (done by system). Find ΔU.",
                        fl_calc_q: "System change: ΔU = {du} J, W = {w} J. Find heat Q.",
                        fl_calc_w: "System absorbs Q = {q} J, internal energy increases by ΔU = {du} J. Find W.",
                        fl_adiabatic: "Adiabatic process (Q=0). Work done ON system is {w} J. Find ΔU.",
                        fl_cycle: "Cyclic process: Net work W = {w} J. What is net heat Q?",
                        fl_sign_conv: "Heat released by system: Q is positive or negative?",
                        ie_ideal_u: "Monatomic ideal gas: n={n} mol, T={t} K. Find U (U = 1.5 nRT).",
                        ie_delta_u: "Isothermal process of ideal gas. What is ΔU?",
                        ie_diatomic: "Diatomic gas (f=5): n={n}, T={t}. Calculate internal energy U.",
                        ie_change_t: "Ideal gas (n={n}, Cv={cv} J/molK) heated from {t1} K to {t2} K. Find ΔU.",
                        ie_state_func: "Internal energy is a state function. Change in a cycle is?",
                        wh_isobaric: "Isobaric expansion: P = {p} Pa, ΔV = {dv} m^{3}. Find Work W.",
                        wh_isochoric: "Isochoric heating (constant Volume). What is Work W?",
                        wh_isothermal_w: "Isothermal expansion of ideal gas. Q = {q} J. Find W.",
                        wh_area: "PV Diagram area represents what quantity?",
                        wh_adiabatic_rel: "Adiabatic expansion: Internal energy decreases. Temperature changes how?"
                },
                scenarios: {
                        first_law: "The First Law of Thermodynamics is the law of conservation of energy.",
                        internal_energy: "Internal energy depends on the temperature and state of the system.",
                        work_heat: "Heat and work are the two ways energy is transferred."
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
                ready: "Ready",
                monitor_title: "GP3.01_WAVE_MONITOR",
                footer_left: "GP3.01_WAVE_PHYSICS // NODE: BASEL",
                prompts: {
                        find_velocity: "A wave has frequency {f} Hz and wavelength {lambda} m. Find velocity v.",
                        find_wavelength: "A wave has frequency {f} Hz and velocity {v} m/s. Find wavelength λ.",
                        find_frequency: "A wave has velocity {v} m/s and wavelength {lambda} m. Find frequency f.",
                        verify_wave_eq: "Verify: wave with f = {f} Hz, λ = {lambda} m has velocity v = {v} m/s.",
                        water_wave: "Water wave on Rhine River: f = {f} Hz, λ = {lambda} m. Find velocity.",
                        find_period: "A wave has frequency {f} Hz. Find period T.",
                        period_to_freq: "A wave has period T = {T} s. Find frequency f.",
                        sound_in_air: "Sound wave in air (v = 340 m/s) has frequency {f} Hz. Find wavelength.",
                        sound_in_water: "Sound wave in water (v = 1500 m/s) has frequency {f} Hz. Find wavelength.",
                        speed_ratio: "Sound travels 1500 m/s in water, 340 m/s in air. Find ratio vwater/vair.",
                        doppler_approach: "Ambulance siren approaches. Is observed frequency higher or lower?",
                        doppler_recede: "Ambulance siren recedes. Is observed frequency higher or lower?",
                        constructive_interference: "Two waves (A = 2 m each) interfere constructively. Total amplitude?",
                        destructive_interference: "Two waves (A = 3 m each) interfere destructively. Total amplitude?",
                        beat_frequency: "Two tuning forks: 440 Hz and 444 Hz. Beat frequency?",
                        de_broglie: "Electron (m = 9.1×10^-^{3}¹ kg, v = 1 m/s). De Broglie wavelength? (h = 6.63×10^-^{3}^{4})",
                        wave_particle_duality: "Light exhibits both wave and particle properties. True or false?",
                        photon_energy: "Photon with f = 5×10¹^{4} Hz. Energy E = hf? (h = 6.63×10^-^{3}^{4})",
                        matter_wave: "Electron wavelength λ = h/mv. For typical electron, λ ≈ ?",
                        uncertainty: "Heisenberg uncertainty: ΔxΔp ≥ h/4π. Can we know both exactly?",
                        same_phase_add: "Two waves (A = 2 m) in phase. Total amplitude?",
                        opposite_phase_cancel: "Two waves (A = 3 m) opposite phase. Total amplitude?",
                        constructive_max: "Two waves (A = 1 m) constructive interference. Maximum amplitude?",
                        partial_destructive: "Waves A_1 = 5 m, A_2 = 3 m interfere destructively. Total amplitude?",
                        interference_type: "Two waves in phase combine. Interference type?",
                        standing_wave_node: "Standing wave λ = 2 m. First node position x_1?",
                        standing_wave_antinode: "Standing wave λ = 4 m. First antinode position x_1?",
                        node_count: "String length 5 m, λ = 2 m. Number of nodes?",
                        string_fundamental: "String fundamental mode: L = λ/2. If λ = 1 m, find L.",
                        harmonic_wavelength: "Fundamental λ_1 = 2 m. Second harmonic wavelength λ_2?",
                        double_slit_spacing: "Double slit: λ = 500 nm, L = 2 m, d = 1 mm. Fringe spacing Δy?",
                        fringe_order: "Double slit: λ = 600 nm, L = 2 m, d = 1.2 mm. Third bright fringe y_3?",
                        slit_separation: "Double slit: λ = 500 nm, L = 1 m, Δy = 1 mm. Slit separation d?",
                        wavelength_from_fringes: "Double slit: Δy = 0.8 mm, d = 0.5 mm, L = 1 m. Wavelength λ?",
                        central_maximum: "Double slit: central maximum position y₀?",
                        thin_film_constructive: "Thin film (n = 2): constructive interference for λ = 500 nm, m = 1. Thickness t?",
                        thin_film_destructive: "Thin film (n = 2): destructive interference for λ = 600 nm, m = 0. Thickness t?",
                        newton_rings: "Newton rings: λ = 500 nm, R = 1 m. First bright ring radius r_1?",
                        soap_bubble: "Soap bubble (n = 1.33, t = 300 nm) reflects which color strongly?",
                        anti_reflection: "Anti-reflection coating (n = 2): λ = 400 nm. Minimum thickness t?",
                        reflection_angle: "Light incident at 30°. Reflection angle θᵣ?",
                        refraction_basic: "Light from air (n = 1) to glass (n = 1.5) at 30°. Refraction angle θ_2?",
                        light_speed_medium: "Light in glass (n = 1.5). Speed v = c/n?",
                        refractive_index: "Light speed in medium: v = 2×10^8 m/s. Refractive index n?",
                        normal_incidence: "Light perpendicular to surface. Refraction angle θᵣ?",
                        critical_angle: "Glass (n = 1.5) to air (n = 1). Critical angle θc?",
                        total_internal_reflection: "Light at 50° from glass to air (θc = 42°). Total internal reflection?",
                        fiber_optics: "Fiber optics use which principle to trap light?",
                        prism_dispersion: "Prism separates white light into colors. This effect is called?",
                        brewster_angle: "Brewster angle for glass (n = 1.5) to air. tan θB = n_2/n_1. Find θB.",
                        single_slit_minima: "Single slit (a = 1 mm): first minimum for λ = 500 nm. Angle θ_1?",
                        diffraction_width: "Single slit (a = 0.6 mm): λ = 600 nm, L = 1 m. Central maximum width w?",
                        rayleigh_criterion: "Telescope (D = 0.5 m): λ = 500 nm. Minimum resolvable angle θmin?",
                        circular_aperture: "Circular aperture (D = 10 mm, f = 100 mm): λ = 500 nm. Airy disk radius r?",
                        resolving_power: "Telescope diameter D = 0.5 m, λ = 500 nm. Resolving power R?",
                        grating_equation: "Diffraction grating (d = 1 μm): λ = 500 nm, m = 1. Angle θ_1?",
                        grating_order: "Grating (d = 2 μm): λ = 600 nm. Maximum order mmax?",
                        grating_spacing: "Grating: λ = 500 nm, θ_1 = 30°, m = 1. Line spacing d?",
                        spectral_resolution: "Grating: m = 2, N = 5000 lines. Spectral resolution R?",
                        blazed_grating: "Blazed grating optimizes efficiency for specific wavelength. Purpose?"
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
                        magnetic_field: "At Basel University Hospital's MRI department, you are calibrating magnetic field systems for medical imaging. Magnetic fields are created by electric currents and are measured in Tesla (T). A straight current-carrying wire produces a circular magnetic field with strength B = μ₀I/(2πr), where μ₀ = 4π×10^-^7 T·m/A is the permeability of free space. The right-hand rule determines field direction: thumb points along current, fingers curl in field direction. Solenoids (coils) create uniform fields B = μ₀nI inside, used in MRI machines to align hydrogen atoms in patients' bodies. The force on a current-carrying wire in a magnetic field is F = BILsinθ, enabling electric motors in Basel's trams and trains. Magnetic levitation (maglev) trains use these principles, and Basel's connection to the Swiss rail network relies on electromagnetic systems.",
                        particle_motion: "You are a physicist at CERN's Basel research facility, analyzing charged particle trajectories in electromagnetic fields for the Large Hadron Collider experiments. When a charged particle (charge q, mass m) enters an electric field E, it experiences force F = qE and acceleration a = qE/m, following a parabolic path like projectile motion. In a magnetic field B, a moving charged particle experiences the Lorentz force F = qvB perpendicular to both velocity and field, causing circular motion with radius r = mv/(qB). This principle enables mass spectrometers at Novartis and Roche quality control laboratories to identify molecular masses of pharmaceutical compounds. Velocity selectors use crossed electric and magnetic fields where particles travel straight only when v = E/B, separating ions by speed. Cyclotrons accelerate particles in spiral paths for cancer radiation therapy at Basel University Hospital. Understanding particle motion is essential for designing particle detectors, analyzing cosmic rays, and developing next-generation medical imaging technologies."
                },
                objective_title: "Electromagnetic Analysis",
                complete: "Module Complete!",
                check: "Verify",
                next: "Next Challenge",
                correct: "Field Verified",
                incorrect: "Check calculation",
                ready: "Ready",
                monitor_title: "GP3.02_EM_MONITOR",
                footer_left: "GP3.02_ELECTROMAGNETISM // NODE: BASEL"
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
                ready: "Ready",
                monitor_title: "GP3.03_INDUCTION_MONITOR",
                footer_left: "GP3.03_INDUCTION // NODE: BASEL"
        },
        // SP1.03: Weather & Climate
        sp1_03: {
                title: "SP1.03 // Weather & Climate",
                back: "Back",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                stages: {
                        atmosphere: "ATMOSPHERE",
                        weather: "WEATHER",
                        climate: "CLIMATE"
                },
                footer_left: "SP1.03_METEOROLOGY // NODE: BASEL",
                check: "Verify",
                next: "Next Challenge",
                correct: "Data Validated",
                incorrect: "Check parameters",
                labels: { mission_objective: "METEOROLOGICAL ANALYSIS", terminal_input: "DATA INPUT", hint: "HINT" },
                prompts: {}
        },

        // SP1.04: Astronomy Basics
        sp1_04: {
                title: "SP1.04 // Astronomy Basics",
                back: "Back",
                difficulty: { basic: "BASIC", core: "CORE", advanced: "ADVANCED", elite: "ELITE" },
                stages: {
                        solar_system: "SOLAR SYSTEM",
                        moon_phases: "MOON PHASES",
                        seasons: "SEASONS"
                },
                footer_left: "SP1.04_ASTRONOMY // NODE: BASEL",
                check: "Verify",
                next: "Next Challenge",
                correct: "Coordinates Validated",
                incorrect: "Check orbital data",
                labels: { mission_objective: "ORBITAL ANALYSIS", terminal_input: "TELEMETRY INPUT", hint: "HINT" },
                prompts: {}
        }
};
