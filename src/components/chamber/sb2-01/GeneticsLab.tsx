"use client";

type Allele = "R" | "r";
type Genotype = "RR" | "Rr" | "rR" | "rr";

interface GeneticsLabProps {
    parent1: Genotype;
    parent2: Genotype;
    onParent1Change: (genotype: Genotype) => void;
    onParent2Change: (genotype: Genotype) => void;
}

function PunnettSquare({ parent1, parent2 }: { parent1: Genotype; parent2: Genotype }) {
    const parent1Alleles: [Allele, Allele] = [parent1[0] as Allele, parent1[1] as Allele];
    const parent2Alleles: [Allele, Allele] = [parent2[0] as Allele, parent2[1] as Allele];

    const offspring: Genotype[][] = [
        [
            `${parent1Alleles[0]}${parent2Alleles[0]}` as Genotype,
            `${parent1Alleles[0]}${parent2Alleles[1]}` as Genotype,
        ],
        [
            `${parent1Alleles[1]}${parent2Alleles[0]}` as Genotype,
            `${parent1Alleles[1]}${parent2Alleles[1]}` as Genotype,
        ],
    ];

    const normalizeGenotype = (g: Genotype): Genotype => {
        if (g === "rR") return "Rr";
        return g;
    };

    const getColor = (genotype: Genotype) => {
        const normalized = normalizeGenotype(genotype);
        if (normalized === "RR" || normalized === "Rr") return "bg-purple-500";
        return "bg-pink-500";
    };

    const getPhenotype = (genotype: Genotype) => {
        const normalized = normalizeGenotype(genotype);
        if (normalized === "RR" || normalized === "Rr") return "Purple";
        return "White";
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
                {/* Top left empty cell */}
                <div className="border border-gray-600 p-2 bg-gray-800/50"></div>

                {/* Parent 2 alleles (top row) */}
                <div className="border border-cyan-500 p-2 bg-cyan-900/30 text-center">
                    <span className="text-cyan-300 font-bold">{parent2Alleles[0]}</span>
                </div>
                <div className="border border-cyan-500 p-2 bg-cyan-900/30 text-center">
                    <span className="text-cyan-300 font-bold">{parent2Alleles[1]}</span>
                </div>

                {/* First row */}
                <div className="border border-purple-500 p-2 bg-purple-900/30 text-center">
                    <span className="text-purple-300 font-bold">{parent1Alleles[0]}</span>
                </div>
                <div className={`border border-green-500 p-3 ${getColor(offspring[0][0])} text-center`}>
                    <div className="text-white font-bold">{normalizeGenotype(offspring[0][0])}</div>
                    <div className="text-xs text-white/80">{getPhenotype(offspring[0][0])}</div>
                </div>
                <div className={`border border-green-500 p-3 ${getColor(offspring[0][1])} text-center`}>
                    <div className="text-white font-bold">{normalizeGenotype(offspring[0][1])}</div>
                    <div className="text-xs text-white/80">{getPhenotype(offspring[0][1])}</div>
                </div>

                {/* Second row */}
                <div className="border border-purple-500 p-2 bg-purple-900/30 text-center">
                    <span className="text-purple-300 font-bold">{parent1Alleles[1]}</span>
                </div>
                <div className={`border border-green-500 p-3 ${getColor(offspring[1][0])} text-center`}>
                    <div className="text-white font-bold">{normalizeGenotype(offspring[1][0])}</div>
                    <div className="text-xs text-white/80">{getPhenotype(offspring[1][0])}</div>
                </div>
                <div className={`border border-green-500 p-3 ${getColor(offspring[1][1])} text-center`}>
                    <div className="text-white font-bold">{normalizeGenotype(offspring[1][1])}</div>
                    <div className="text-xs text-white/80">{getPhenotype(offspring[1][1])}</div>
                </div>
            </div>

            {/* Statistics */}
            <OffspringStats offspring={offspring.flat()} />
        </div>
    );
}

function OffspringStats({ offspring }: { offspring: Genotype[] }) {
    const normalizeGenotype = (g: Genotype): Genotype => {
        if (g === "rR") return "Rr";
        return g;
    };

    const normalized = offspring.map(normalizeGenotype);

    const counts = {
        RR: normalized.filter((g) => g === "RR").length,
        Rr: normalized.filter((g) => g === "Rr").length,
        rr: normalized.filter((g) => g === "rr").length,
    };

    const purpleCount = counts.RR + counts.Rr;
    const whiteCount = counts.rr;

    const purplePercent = (purpleCount / 4) * 100;
    const whitePercent = (whiteCount / 4) * 100;

    return (
        <div className="border border-amber-500 p-3 space-y-2">
            <div className="text-sm text-amber-400 font-bold">OFFSPRING STATISTICS</div>

            <div className="space-y-1 text-xs">
                <div className="text-cyan-300">Genotype Ratio:</div>
                <div className="flex justify-between text-cyan-200">
                    <span>RR: {counts.RR}/4 ({(counts.RR / 4) * 100}%)</span>
                </div>
                <div className="flex justify-between text-cyan-200">
                    <span>Rr: {counts.Rr}/4 ({(counts.Rr / 4) * 100}%)</span>
                </div>
                <div className="flex justify-between text-cyan-200">
                    <span>rr: {counts.rr}/4 ({(counts.rr / 4) * 100}%)</span>
                </div>
            </div>

            <div className="border-t border-amber-500/50 pt-2 space-y-1 text-xs">
                <div className="text-purple-300">Phenotype Ratio:</div>
                <div className="flex justify-between text-purple-200">
                    <span>Purple Flowers: {purpleCount}/4 ({purplePercent}%)</span>
                </div>
                <div className="flex justify-between text-pink-200">
                    <span>White Flowers: {whiteCount}/4 ({whitePercent}%)</span>
                </div>
            </div>
        </div>
    );
}

function PeaPlant({ genotype, label }: { genotype: Genotype; label: string }) {
    const normalizeGenotype = (g: Genotype): Genotype => {
        if (g === "rR") return "Rr";
        return g;
    };

    const normalized = normalizeGenotype(genotype);
    const isPurple = normalized === "RR" || normalized === "Rr";

    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-white">{label}</div>
            <div className="relative w-20 h-24">
                {/* Stem */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-green-600"></div>

                {/* Leaves */}
                <div className="absolute bottom-8 left-2 w-4 h-2 bg-green-500 rounded-full transform -rotate-45"></div>
                <div className="absolute bottom-8 right-2 w-4 h-2 bg-green-500 rounded-full transform rotate-45"></div>

                {/* Flower */}
                <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${
                        isPurple ? "bg-purple-500" : "bg-pink-200"
                    } border-2 ${isPurple ? "border-purple-700" : "border-pink-400"}`}
                ></div>
            </div>
            <div className="text-sm font-bold text-cyan-300">{normalized}</div>
            <div className="text-xs text-white">{isPurple ? "Purple" : "White"}</div>
        </div>
    );
}

export default function GeneticsLab({ parent1, parent2, onParent1Change, onParent2Change }: GeneticsLabProps) {
    const genotypes: Genotype[] = ["RR", "Rr", "rr"];

    return (
        <div className="space-y-6">
            {/* Parent Selection */}
            <div className="grid grid-cols-2 gap-4">
                <div className="border border-purple-500 p-4 bg-purple-900/20 space-y-3">
                    <div className="text-sm text-purple-400 font-bold">PARENT 1</div>
                    <PeaPlant genotype={parent1} label="Parent 1" />
                    <div className="space-y-2">
                        {genotypes.map((g) => (
                            <button
                                key={g}
                                onClick={() => onParent1Change(g)}
                                className={`w-full px-3 py-2 border transition-colors ${
                                    parent1 === g
                                        ? "border-purple-400 bg-purple-500/30 text-purple-200"
                                        : "border-gray-600 text-white hover:border-purple-500/50"
                                }`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border border-cyan-500 p-4 bg-cyan-900/20 space-y-3">
                    <div className="text-sm text-cyan-400 font-bold">PARENT 2</div>
                    <PeaPlant genotype={parent2} label="Parent 2" />
                    <div className="space-y-2">
                        {genotypes.map((g) => (
                            <button
                                key={g}
                                onClick={() => onParent2Change(g)}
                                className={`w-full px-3 py-2 border transition-colors ${
                                    parent2 === g
                                        ? "border-cyan-400 bg-cyan-500/30 text-cyan-200"
                                        : "border-gray-600 text-white hover:border-cyan-500/50"
                                }`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Punnett Square */}
            <div className="border border-green-500 p-4 bg-green-900/20 space-y-3">
                <div className="text-sm text-green-400 font-bold">PUNNETT SQUARE</div>
                <PunnettSquare parent1={parent1} parent2={parent2} />
            </div>
        </div>
    );
}
