import { Quest, Difficulty } from "@/hooks/useQuestManager";

export interface OlympiadQuest extends Quest {
    category: "Logic" | "Geometry" | "Arithmetic" | "Combinatorics";
}

export const buildOlympiadPool = (difficulty: Difficulty, stage: string): OlympiadQuest[] => {
    const pool: OlympiadQuest[] = [];

    // =====================================================================
    // BASIC (TRAINING) — 10 questions
    // Kangaroo Junior level (Grade 5-6). Quick reasoning, pattern recognition.
    // =====================================================================
    if (difficulty === "BASIC") {
        pool.push({
            id: "B01", difficulty: "BASIC", stage: "logic", category: "Logic",
            promptLatex: "\\text{In a race, Alice finished before Bob but after Charlie. David finished after Bob. Who came first?}",
            expressionLatex: "C \\rightarrow A \\rightarrow B \\rightarrow D",
            targetLatex: "\\text{Name}",
            slots: [{ id: "ans", labelLatex: "\\text{Winner}", placeholder: "Name", expected: "Charlie" }],
            correctLatex: "\\text{Charlie}",
            hintLatex: ["\\text{Order: Charlie, Alice, Bob, David}"],
        });
        pool.push({
            id: "B02", difficulty: "BASIC", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{10 people stand in a line. You are 4th from the front. What is your position from the back?}",
            expressionLatex: "10 - 4 + 1 = ?",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "position", expected: 7 }],
            correctLatex: "7",
            hintLatex: ["n_{\\text{back}} = N - n_{\\text{front}} + 1"],
        });
        pool.push({
            id: "B03", difficulty: "BASIC", stage: "logic", category: "Logic",
            promptLatex: "\\text{Anna, Bella, Cora have colors Red, Blue, Green. Anna: 'Not Red'. Bella: 'Blue'. Cora: 'Anna likes Red'. Only ONE tells truth. What is Anna's color?}",
            expressionLatex: "\\text{Truth Table: exactly 1 statement is true}",
            targetLatex: "\\text{Color}",
            slots: [{ id: "ans", labelLatex: "\\text{Color}", placeholder: "Color", expected: "Red" }],
            correctLatex: "\\text{Red}",
            hintLatex: ["\\text{If Anna lies, her color IS Red. Check who else is truthful.}"],
        });
        pool.push({
            id: "B04", difficulty: "BASIC", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{What is the sum of all whole numbers from 1 to 20?}",
            expressionLatex: "1 + 2 + 3 + \\cdots + 20 = ?",
            targetLatex: "S",
            slots: [{ id: "ans", labelLatex: "S", placeholder: "sum", expected: 210 }],
            correctLatex: "\\frac{20 \\times 21}{2} = 210",
            hintLatex: ["S = \\frac{n(n+1)}{2}"],
        });
        pool.push({
            id: "B05", difficulty: "BASIC", stage: "logic", category: "Geometry",
            promptLatex: "\\text{How many squares can you count in a 2×2 grid?}",
            expressionLatex: "\\text{Count all squares, including the large one}",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "count", expected: 5 }],
            correctLatex: "4 + 1 = 5",
            hintLatex: ["\\text{4 small (1×1) + 1 large (2×2)}"],
        });
        pool.push({
            id: "B06", difficulty: "BASIC", stage: "logic", category: "Combinatorics",
            promptLatex: "\\text{You have 3 shirts and 2 pants. How many different outfits can you make?}",
            expressionLatex: "3 \\times 2 = ?",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "outfits", expected: 6 }],
            correctLatex: "6",
            hintLatex: ["\\text{Multiply: shirts} \\times \\text{pants}"],
        });
        pool.push({
            id: "B07", difficulty: "BASIC", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{If today is Wednesday, what day of the week is it 100 days from now?}",
            expressionLatex: "100 \\div 7 = 14 \\text{ R } ?",
            targetLatex: "\\text{Day}",
            slots: [{ id: "ans", labelLatex: "\\text{Day}", placeholder: "day", expected: "Friday" }],
            correctLatex: "\\text{Friday (remainder 2, Wed + 2 = Fri)}",
            hintLatex: ["100 \\mod 7 = 2"],
        });
        pool.push({
            id: "B08", difficulty: "BASIC", stage: "logic", category: "Logic",
            promptLatex: "\\text{A snail climbs 3m up a wall during the day but slips 2m at night. The wall is 10m. How many days to reach the top?}",
            expressionLatex: "\\text{Net progress per day} = 1\\text{m}",
            targetLatex: "d",
            slots: [{ id: "ans", labelLatex: "d", placeholder: "days", expected: 8 }],
            correctLatex: "8 \\text{ days (after 7 days at 7m, day 8 climbs to 10m)}",
            hintLatex: ["\\text{On the last day, it reaches the top before slipping}"],
        });
        pool.push({
            id: "B09", difficulty: "BASIC", stage: "logic", category: "Geometry",
            promptLatex: "\\text{A rectangle has perimeter 20 cm. If its length is 7 cm, what is its area?}",
            expressionLatex: "2(l + w) = 20,\\; l = 7",
            targetLatex: "A",
            slots: [{ id: "ans", labelLatex: "A", placeholder: "area", expected: 21 }],
            correctLatex: "w = 3,\\; A = 7 \\times 3 = 21",
            hintLatex: ["w = \\frac{20}{2} - 7 = 3"],
        });
        pool.push({
            id: "B10", difficulty: "BASIC", stage: "logic", category: "Combinatorics",
            promptLatex: "\\text{How many handshakes occur if 5 people all shake hands with each other?}",
            expressionLatex: "\\binom{5}{2} = ?",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "count", expected: 10 }],
            correctLatex: "\\frac{5 \\times 4}{2} = 10",
            hintLatex: ["\\binom{n}{2} = \\frac{n(n-1)}{2}"],
        });
    }

    // =====================================================================
    // CORE (COMPETITION) — 10 questions
    // Kangaroo Standard level (Grade 7-8). Multi-step reasoning required.
    // =====================================================================
    if (difficulty === "CORE") {
        pool.push({
            id: "C01", difficulty: "CORE", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{A digital clock shows 12:34. How many minutes until all four digits are the same?}",
            expressionLatex: "12:34 \\rightarrow \\text{next } hh{:}mm \\text{ with 4 same digits}",
            targetLatex: "t",
            slots: [{ id: "ans", labelLatex: "t \\;(\\text{min})", placeholder: "min", expected: 588 }],
            correctLatex: "22:22 \\text{ is at 588 min after 12:34}",
            hintLatex: ["\\text{Next: 11:11 next day = 22h48m = 1368 min... or 22:22 = 9h48m = 588 min}"],
        });
        pool.push({
            id: "C02", difficulty: "CORE", stage: "logic", category: "Geometry",
            promptLatex: "\\text{A 3cm cube is painted red, then cut into 1cm cubes. How many small cubes have exactly 2 red faces?}",
            expressionLatex: "12 \\times (n-2) \\text{ edge cubes}",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "count", expected: 12 }],
            correctLatex: "12 \\text{ (12 edges, each with 1 middle piece)}",
            hintLatex: ["\\text{Edge cubes (not corners) have exactly 2 painted faces}"],
        });
        pool.push({
            id: "C03", difficulty: "CORE", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{The product of three different positive integers is 30. What is the maximum possible sum?}",
            expressionLatex: "abc = 30,\\; a < b < c",
            targetLatex: "S_{\\max}",
            slots: [{ id: "ans", labelLatex: "S", placeholder: "sum", expected: 18 }],
            correctLatex: "1 + 2 + 15 = 18",
            hintLatex: ["\\text{Factor 30: } 1 \\times 2 \\times 15,\\; 1 \\times 3 \\times 10,\\; 1 \\times 5 \\times 6,\\; 2 \\times 3 \\times 5"],
        });
        pool.push({
            id: "C04", difficulty: "CORE", stage: "logic", category: "Combinatorics",
            promptLatex: "\\text{In how many ways can you arrange the letters of the word MOON?}",
            expressionLatex: "\\frac{4!}{2!} = ?",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "count", expected: 12 }],
            correctLatex: "\\frac{24}{2} = 12",
            hintLatex: ["\\text{4 letters, 'O' repeated twice} \\Rightarrow \\frac{4!}{2!}"],
        });
        pool.push({
            id: "C05", difficulty: "CORE", stage: "logic", category: "Logic",
            promptLatex: "\\text{On an island, knights always tell the truth, knaves always lie. A says: 'We are both knaves.' What are A and B?}",
            expressionLatex: "\\text{Analyze A's statement logically}",
            targetLatex: "\\text{Types}",
            slots: [{ id: "ans", labelLatex: "\\text{A is a}", placeholder: "knight/knave", expected: "knave" }],
            correctLatex: "\\text{A = knave, B = knight}",
            hintLatex: ["\\text{If A is a knight, the statement must be true, but then A is a knave — contradiction!}"],
        });
        pool.push({
            id: "C06", difficulty: "CORE", stage: "logic", category: "Geometry",
            promptLatex: "\\text{What is the sum of interior angles of a regular hexagon?}",
            expressionLatex: "(n-2) \\times 180°",
            targetLatex: "S",
            slots: [{ id: "ans", labelLatex: "S\\;(°)", placeholder: "degrees", expected: 720 }],
            correctLatex: "(6-2) \\times 180 = 720°",
            hintLatex: ["\\text{Formula: }(n-2) \\times 180°"],
        });
        pool.push({
            id: "C07", difficulty: "CORE", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{Find the last two digits of }7^{100}\\text{.}",
            expressionLatex: "7^{100} \\pmod{100}",
            targetLatex: "r",
            slots: [{ id: "ans", labelLatex: "r", placeholder: "last 2 digits", expected: 1 }],
            correctLatex: "01 \\text{ (since } 7^{4} = 2401 \\equiv 01,\\; 7^{100} = (7^{4})^{25} \\equiv 01^{25} = 01\\text{)}",
            hintLatex: ["7^{1}=7,\\; 7^{2}=49,\\; 7^{3}=343,\\; 7^{4}=2401 \\equiv 01 \\pmod{100}"],
        });
        pool.push({
            id: "C08", difficulty: "CORE", stage: "logic", category: "Combinatorics",
            promptLatex: "\\text{A fair die is rolled twice. What is the probability that the sum is 7?}",
            expressionLatex: "P(S = 7) = ?",
            targetLatex: "P",
            slots: [{ id: "ans", labelLatex: "P", placeholder: "fraction", expected: "1/6" }],
            correctLatex: "\\frac{6}{36} = \\frac{1}{6}",
            hintLatex: ["\\text{Pairs: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 pairs out of 36}"],
        });
        pool.push({
            id: "C09", difficulty: "CORE", stage: "logic", category: "Logic",
            promptLatex: "\\text{There are 100 lockers in a row, all closed. 100 students walk by. Student 1 opens every locker. Student 2 toggles every 2nd. Student 3 every 3rd... Which lockers are open at the end?}",
            expressionLatex: "\\text{Locker } k \\text{ toggled by divisors of } k",
            targetLatex: "\\text{How many open?}",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "count", expected: 10 }],
            correctLatex: "10 \\text{ (perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100)}",
            hintLatex: ["\\text{Open iff odd number of divisors iff perfect square}"],
        });
        pool.push({
            id: "C10", difficulty: "CORE", stage: "logic", category: "Geometry",
            promptLatex: "\\text{In triangle ABC, angle A = 40° and angle B = 70°. What is angle C?}",
            expressionLatex: "A + B + C = 180°",
            targetLatex: "C",
            slots: [{ id: "ans", labelLatex: "C\\;(°)", placeholder: "degrees", expected: 70 }],
            correctLatex: "180 - 40 - 70 = 70°",
            hintLatex: ["\\text{Sum of angles in any triangle} = 180°"],
        });
    }

    // =====================================================================
    // ADVANCED (OLYMPIAD) — 10 questions
    // AMC/SMO level (Grade 9-10). Proof-style, more creative reasoning.
    // =====================================================================
    if (difficulty === "ADVANCED") {
        pool.push({
            id: "A01", difficulty: "ADVANCED", stage: "logic", category: "Combinatorics",
            promptLatex: "\\text{In a family of 4 children, at least 2 are girls. What is the probability that at least 3 are girls?}",
            expressionLatex: "P(G \\ge 3 \\mid G \\ge 2)",
            targetLatex: "P",
            slots: [{ id: "ans", labelLatex: "P", placeholder: "fraction", expected: "5/11" }],
            correctLatex: "\\frac{5}{11}",
            hintLatex: ["P(G \\ge 2) = 11/16,\\; P(G \\ge 3) = 5/16"],
        });
        pool.push({
            id: "A02", difficulty: "ADVANCED", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{What is the remainder when }2^{2024}\\text{ is divided by 7?}",
            expressionLatex: "2^{3} \\equiv 1 \\pmod{7}",
            targetLatex: "r",
            slots: [{ id: "ans", labelLatex: "r", placeholder: "remainder", expected: 4 }],
            correctLatex: "2024 = 3 \\times 674 + 2 \\Rightarrow 2^{2024} \\equiv 2^{2} = 4 \\pmod{7}",
            hintLatex: ["2024 \\mod 3 = 2 \\Rightarrow 2^{2024} \\equiv 2^{2} = 4"],
        });
        pool.push({
            id: "A03", difficulty: "ADVANCED", stage: "logic", category: "Geometry",
            promptLatex: "\\text{In a circle of radius 10, a chord is 16 cm long. What is the distance from the center to the chord?}",
            expressionLatex: "r^{2} = d^{2} + (c/2)^{2}",
            targetLatex: "d",
            slots: [{ id: "ans", labelLatex: "d", placeholder: "distance", expected: 6 }],
            correctLatex: "d = \\sqrt{10^{2} - 8^{2}} = \\sqrt{36} = 6",
            hintLatex: ["\\text{Half-chord} = 8,\\; d^{2} + 8^{2} = 10^{2}"],
        });
        pool.push({
            id: "A04", difficulty: "ADVANCED", stage: "logic", category: "Combinatorics",
            promptLatex: "\\text{How many ways can you climb a staircase of 10 steps, taking 1 or 2 steps at a time?}",
            expressionLatex: "f(n) = f(n-1) + f(n-2),\\; f(1) = 1,\\; f(2) = 2",
            targetLatex: "f(10)",
            slots: [{ id: "ans", labelLatex: "f(10)", placeholder: "ways", expected: 89 }],
            correctLatex: "f(10) = 89 \\text{ (Fibonacci sequence)}",
            hintLatex: ["1, 2, 3, 5, 8, 13, 21, 34, 55, 89"],
        });
        pool.push({
            id: "A05", difficulty: "ADVANCED", stage: "logic", category: "Logic",
            promptLatex: "\\text{A, B, C are suspects. Exactly one committed the crime. A says: 'B did it.' B says: 'I didn't do it.' C says: 'I didn't do it.' Exactly one is lying. Who did it?}",
            expressionLatex: "\\text{Exactly 1 liar among 3}",
            targetLatex: "\\text{Criminal}",
            slots: [{ id: "ans", labelLatex: "\\text{Who?}", placeholder: "A/B/C", expected: "C" }],
            correctLatex: "\\text{C}",
            hintLatex: ["\\text{If B did it: A true, B lies, C true → works? B and C contradict...}"],
        });
        pool.push({
            id: "A06", difficulty: "ADVANCED", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{Find the sum of all divisors of 360.}",
            expressionLatex: "360 = 2^{3} \\times 3^{2} \\times 5^{1}",
            targetLatex: "\\sigma(360)",
            slots: [{ id: "ans", labelLatex: "\\sigma", placeholder: "sum", expected: 1170 }],
            correctLatex: "\\sigma = (1+2+4+8)(1+3+9)(1+5) = 15 \\times 13 \\times 6 = 1170",
            hintLatex: ["\\sigma(p^{a} q^{b}) = \\sigma(p^{a}) \\cdot \\sigma(q^{b})"],
        });
        pool.push({
            id: "A07", difficulty: "ADVANCED", stage: "logic", category: "Geometry",
            promptLatex: "\\text{The diagonals of a rhombus are 10 and 24. What is its area?}",
            expressionLatex: "A = \\frac{d_1 \\cdot d_2}{2}",
            targetLatex: "A",
            slots: [{ id: "ans", labelLatex: "A", placeholder: "area", expected: 120 }],
            correctLatex: "A = \\frac{10 \\times 24}{2} = 120",
            hintLatex: ["\\text{Rhombus area} = \\frac{1}{2} d_1 d_2"],
        });
        pool.push({
            id: "A08", difficulty: "ADVANCED", stage: "logic", category: "Combinatorics",
            promptLatex: "\\text{A committee of 3 is chosen from 4 men and 3 women. What is the probability of at least 1 woman?}",
            expressionLatex: "1 - P(\\text{all men})",
            targetLatex: "P",
            slots: [{ id: "ans", labelLatex: "P", placeholder: "fraction", expected: "31/35" }],
            correctLatex: "1 - \\frac{\\binom{4}{3}}{\\binom{7}{3}} = 1 - \\frac{4}{35} = \\frac{31}{35}",
            hintLatex: ["\\binom{7}{3} = 35,\\; \\binom{4}{3} = 4"],
        });
        pool.push({
            id: "A09", difficulty: "ADVANCED", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{What is the units digit of }3^{2025}\\text{?}",
            expressionLatex: "3^{1}=3,\\; 3^{2}=9,\\; 3^{3}=27,\\; 3^{4}=81,\\; \\text{cycle: 3,9,7,1}",
            targetLatex: "d",
            slots: [{ id: "ans", labelLatex: "d", placeholder: "digit", expected: 3 }],
            correctLatex: "2025 \\mod 4 = 1 \\Rightarrow \\text{units digit} = 3",
            hintLatex: ["\\text{Units digits of powers of 3 cycle with period 4}"],
        });
        pool.push({
            id: "A10", difficulty: "ADVANCED", stage: "logic", category: "Logic",
            promptLatex: "\\text{There are 25 horses. You can race 5 at a time. What is the minimum number of races to find the top 3?}",
            expressionLatex: "\\text{No stopwatch available}",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "races", expected: 7 }],
            correctLatex: "7",
            hintLatex: ["\\text{5 heats + 1 final of winners + 1 race to resolve 2nd/3rd}"],
        });
    }

    // =====================================================================
    // ELITE (LEGENDARY) — 10 questions
    // IMO/Putnam style. Deep mathematical insight, elegant solutions.
    // =====================================================================
    if (difficulty === "ELITE") {
        pool.push({
            id: "E01", difficulty: "ELITE", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{Find the smallest positive integer }n\\text{ ending in 6 such that moving the 6 to the front gives }4n\\text{.}",
            expressionLatex: "10x + 6 \\rightarrow 6 \\cdot 10^{k} + x = 4(10x + 6)",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "integer", expected: 153846 }],
            correctLatex: "153846",
            hintLatex: ["6 \\cdot 10^{k} + x = 40x + 24 \\Rightarrow x = \\frac{6 \\cdot 10^{k} - 24}{39}"],
        });
        pool.push({
            id: "E02", difficulty: "ELITE", stage: "logic", category: "Geometry",
            promptLatex: "\\text{In triangle ABC with sides 13, 14, 15, what is the area?}",
            expressionLatex: "s = \\frac{13 + 14 + 15}{2} = 21",
            targetLatex: "A",
            slots: [{ id: "ans", labelLatex: "A", placeholder: "area", expected: 84 }],
            correctLatex: "\\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84",
            hintLatex: ["\\text{Heron: } A = \\sqrt{s(s-a)(s-b)(s-c)}"],
        });
        pool.push({
            id: "E03", difficulty: "ELITE", stage: "logic", category: "Combinatorics",
            promptLatex: "\\text{How many paths exist from (0,0) to (5,5) on a grid, only moving right or up, that never cross above the diagonal?}",
            expressionLatex: "C_n = \\frac{1}{n+1}\\binom{2n}{n}",
            targetLatex: "C_5",
            slots: [{ id: "ans", labelLatex: "C_5", placeholder: "paths", expected: 42 }],
            correctLatex: "C_5 = \\frac{1}{6}\\binom{10}{5} = \\frac{252}{6} = 42",
            hintLatex: ["\\text{This is the 5th Catalan number}"],
        });
        pool.push({
            id: "E04", difficulty: "ELITE", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{What is the sum }\\sum_{k=1}^{100} \\lfloor \\sqrt{k} \\rfloor\\text{?}",
            expressionLatex: "\\lfloor \\sqrt{1} \\rfloor + \\lfloor \\sqrt{2} \\rfloor + \\cdots + \\lfloor \\sqrt{100} \\rfloor",
            targetLatex: "S",
            slots: [{ id: "ans", labelLatex: "S", placeholder: "sum", expected: 615 }],
            correctLatex: "\\sum_{m=1}^{9} m \\cdot (2m+1) + 10 \\cdot 1 = 615",
            hintLatex: ["\\lfloor \\sqrt{k} \\rfloor = m \\text{ for } m^{2} \\le k < (m+1)^{2}"],
        });
        pool.push({
            id: "E05", difficulty: "ELITE", stage: "logic", category: "Logic",
            promptLatex: "\\text{100 prisoners each guess their own hat color (red/blue). They plan a strategy. At most how many can guarantee survival?}",
            expressionLatex: "\\text{Each sees all hats except their own}",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "guaranteed", expected: 99 }],
            correctLatex: "99",
            hintLatex: ["\\text{First prisoner counts parity of red hats; all others can then deduce their own}"],
        });
        pool.push({
            id: "E06", difficulty: "ELITE", stage: "logic", category: "Geometry",
            promptLatex: "\\text{What is the area of the largest rectangle that can be inscribed in a semicircle of radius }r = 10\\text{?}",
            expressionLatex: "A = 2x \\sqrt{r^{2} - x^{2}}",
            targetLatex: "A_{\\max}",
            slots: [{ id: "ans", labelLatex: "A", placeholder: "area", expected: 100 }],
            correctLatex: "A_{\\max} = r^{2} = 100",
            hintLatex: ["\\text{Max at } x = \\frac{r}{\\sqrt{2}},\\; A = r^{2}"],
        });
        pool.push({
            id: "E07", difficulty: "ELITE", stage: "logic", category: "Combinatorics",
            promptLatex: "\\text{In how many ways can 8 rooks be placed on an 8×8 chessboard so that no two attack each other?}",
            expressionLatex: "\\text{One per row, one per column}",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "ways", expected: 40320 }],
            correctLatex: "8! = 40320",
            hintLatex: ["\\text{Each row has exactly 1 rook, column is a permutation of 1..8}"],
        });
        pool.push({
            id: "E08", difficulty: "ELITE", stage: "logic", category: "Arithmetic",
            promptLatex: "\\text{Find the last 3 digits of }2^{1000}\\text{.}",
            expressionLatex: "2^{1000} \\pmod{1000}",
            targetLatex: "r",
            slots: [{ id: "ans", labelLatex: "r", placeholder: "last 3 digits", expected: 376 }],
            correctLatex: "2^{1000} \\equiv 376 \\pmod{1000}",
            hintLatex: ["2^{10} = 1024 \\equiv 24,\\; \\text{use successive squaring mod 1000}"],
        });
        pool.push({
            id: "E09", difficulty: "ELITE", stage: "logic", category: "Logic",
            promptLatex: "\\text{12 identical-looking balls, one is heavier or lighter. Using a balance scale, what is the minimum weighings to find the odd ball?}",
            expressionLatex: "3^{n} \\ge 2 \\times 12 + 1 = 25",
            targetLatex: "n",
            slots: [{ id: "ans", labelLatex: "n", placeholder: "weighings", expected: 3 }],
            correctLatex: "3 \\text{ weighings}",
            hintLatex: ["3^{3} = 27 \\ge 25 \\text{ outcomes, so 3 suffices}"],
        });
        pool.push({
            id: "E10", difficulty: "ELITE", stage: "logic", category: "Geometry",
            promptLatex: "\\text{A regular tetrahedron has edge length 6. What is its volume?}",
            expressionLatex: "V = \\frac{a^{3}}{6\\sqrt{2}}",
            targetLatex: "V",
            slots: [{ id: "ans", labelLatex: "V", placeholder: "volume", expected: 25.46 }],
            correctLatex: "V = \\frac{216}{6\\sqrt{2}} = \\frac{36}{\\sqrt{2}} \\approx 25.46",
            hintLatex: ["V = \\frac{a^{3}\\sqrt{2}}{12}"],
        });
    }

    return pool;
};
