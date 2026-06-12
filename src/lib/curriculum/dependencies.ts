export interface Prerequisite {
    moduleCode: string;
    stage?: string; // Optional: specify a certain stage needed (e.g., 'BASIC', 'CORE')
}

export const MODULE_DEPENDENCIES: Record<string, Prerequisite[]> = {
    // Biology Pathway
    "sb2-01": [{ moduleCode: "sb1-01" }],
    "sb2-03": [{ moduleCode: "sb2-01" }],
    "sb2-04": [{ moduleCode: "sb2-03" }],
    "sb3-01": [{ moduleCode: "sb2-04" }],

    // Physics Pathway
    "sp2-01": [{ moduleCode: "sp1-01" }],
    "sp2-02": [{ moduleCode: "sp2-01" }],
    "sp2-03": [{ moduleCode: "sp2-01" }],
    "sp3-03": [{ moduleCode: "sp2-03" }],

    // Chemistry Pathway
    "sc1-02": [{ moduleCode: "sc1-01" }],
    "sc1-03": [{ moduleCode: "sc1-02" }],
    "sc1-04": [{ moduleCode: "sc1-03" }],
    "sc1-05": [{ moduleCode: "sc1-04" }],
    "sc2-01": [{ moduleCode: "sc1-05" }],
    "sc3-01": [{ moduleCode: "sc2-01" }],

    // Math Pathway (Foundation for others)
    "sm2-01": [{ moduleCode: "sm1-01" }],
    "sm2-02": [{ moduleCode: "sm1-01" }],
    "sm2-03": [{ moduleCode: "sm1-01" }],
    "sm2-07": [{ moduleCode: "sm2-02" }],
    "sm3-01": [{ moduleCode: "sm2-01" }],
    "sm3-03": [{ moduleCode: "sm3-01" }],
};

// Cross-disciplinary links (Knowledge bridges)
export const KNOWLEDGE_BRIDGES: Record<string, string[]> = {
    "sb3-01": ["sc1-06"], // Ecosystems need Chem (Nutrient cycles)
    "sp3-03": ["sm2-03"], // Energy needs linear Algebra for power calcs
    "sc2-07": ["sm2-07"], // Org Chem needs coordinate geometry for bond angles
};
