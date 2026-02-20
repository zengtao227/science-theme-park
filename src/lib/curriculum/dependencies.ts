export interface Prerequisite {
    moduleCode: string;
    stage?: string; // Optional: specify a certain stage needed (e.g., 'BASIC', 'CORE')
}

export const MODULE_DEPENDENCIES: Record<string, Prerequisite[]> = {
    // Biology Pathway
    "SB2.01": [{ moduleCode: "SB1.01" }],
    "SB2.03": [{ moduleCode: "SB2.01" }],
    "SB2.04": [{ moduleCode: "SB2.03" }],
    "SB3.01": [{ moduleCode: "SB2.04" }],

    // Physics Pathway
    "SP2.01": [{ moduleCode: "SP1.01" }],
    "SP2.02": [{ moduleCode: "SP2.01" }],
    "SP2.03": [{ moduleCode: "SP2.01" }],
    "SP3.03": [{ moduleCode: "SP2.03" }],

    // Chemistry Pathway
    "SC1.02": [{ moduleCode: "SC1.01" }],
    "SC1.03": [{ moduleCode: "SC1.02" }],
    "SC1.04": [{ moduleCode: "SC1.03" }],
    "SC1.05": [{ moduleCode: "SC1.04" }],
    "SC2.01": [{ moduleCode: "SC1.05" }],
    "SC3.01": [{ moduleCode: "SC2.01" }],

    // Math Pathway (Foundation for others)
    "SM2.01": [{ moduleCode: "SM1.01" }],
    "SM2.02": [{ moduleCode: "SM1.01" }],
    "SM2.03": [{ moduleCode: "SM1.01" }],
    "SM2.07": [{ moduleCode: "SM2.02" }],
    "SM3.01": [{ moduleCode: "SM2.01" }],
    "SM3.03": [{ moduleCode: "SM3.01" }],
};

// Cross-disciplinary links (Knowledge bridges)
export const KNOWLEDGE_BRIDGES: Record<string, string[]> = {
    "SB3.01": ["SC1.06"], // Ecosystems need Chem (Nutrient cycles)
    "SP3.03": ["SM2.03"], // Energy needs linear Algebra for power calcs
    "SC2.07": ["SM2.07"], // Org Chem needs coordinate geometry for bond angles
};
