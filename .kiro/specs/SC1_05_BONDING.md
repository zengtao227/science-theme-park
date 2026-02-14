# 🧪 SC1.05: The Bonding Bridge (Chemische Bindungen)

## 1. 🧠 Pedagogical Goal (Lernziel)
**Core Concept:** How do atoms stick together?
This module is the **essential prerequisite** for Organic Chemistry (SC3.02) and Biochemistry (GC4.01). It transitions students from the "planetary model" (SC1.03) to the "electron cloud sharing" model.

### Key Learning Objectives (Basel Lehrplan 21)
1.  **Octet Rule (Oktettregel)**: Atoms strive for a full outer shell (Edelgaskonfiguration).
2.  **Ionic Bonding (Ionenbindung)**: Metal + Non-Metal = Electron Transfer (Salts).
3.  **Covalent Bonding (Atombindung)**: Non-Metal + Non-Metal = Electron Sharing (Molecules).
4.  **Lewis Structures (Lewis-Formeln)**: Visualizing shared pairs and lone pairs.
5.  **Polarity (Polarität)**: Electronegativity differences (intro to Dipoles).

---

## 2. 🎮 User Experience (The "Gameplay")

### Scene: "The Electron Market" (Der Elektronen-Markt)
*Visual Context*: A futuristic trading floor or a magnetic construction kit.
*Metaphor*: Atoms are traders looking to complete their collections (shells).

### Stage 1: The Ionic Exchange (Salz-Fabrik)
*   **Goal**: Create neutral salts (NaCl, MgO).
*   **Mechanic**:
    *   Player drags a Sodium (Na) atom and a Chlorine (Cl) atom.
    *   Na "gives" an electron to Cl.
    *   Na becomes (+) and Cl becomes (-).
    *   They snap together due to electrostatic force (Coulomb).
    *   **Success**: "Salz-Kristall gebildet!"

### Stage 2: The Covalent Co-op (Molekül-Werkstatt)
*   **Goal**: Create stable molecules (H2, O2, H2O, CH4).
*   **Mechanic**: "Tug-of-War" (Tauziehen).
    *   Two atoms approach. Neither wants to give up an electron.
    *   They agree to *share*.
    *   Player must drag electrons into the "Sharing Zone" between nuclei.
    *   **Visual**: Electron clouds merge.
    *   **Challenge**: Build Methane (CH4) - requires 4 Hydrogens sharing with 1 Carbon.

### Stage 3: The Lewis Architect
*   **Goal**: Draw valid structures for unknown compounds.
*   **Mechanic**: 
    *   Given a formula (e.g., CO2).
    *   Distribute valence electrons as dots.
    *   Connect dots to form lines (bonds).
    *   Check: Does everyone have 8 (or 2 for H)?

---

## 3. 🛠 Technical Implementation

### Components
1.  **`AtomNode`**:
    *   Props: `element` (symbol, atomicNumber, electronegativity).
    *   State: `valenceElectrons` (array of positions), `charge`.
    *   Interaction: Draggable, drop-zones for electrons.

2.  **`BondConnector`**:
    *   Visualizes the link between atoms.
    *   Types: `IONIC` (dashed/magnetic), `COVALENT_SINGLE` (1 line), `COVALENT_DOUBLE` (2 lines).
    *   Shader: Pulsing energy for covalent, static attraction for ionic.

3.  **`LewisCanvas`**:
    *   A grid-based editor for drawing structures.
    *   Auto-validation logic (counting electrons).

### Data Structure (`molecules.ts`)
```typescript
interface ElementData {
  symbol: string;
  valence: number;
  electronegativity: number; // Pauling scale
  color: string; // CPK coloring
}

interface QuestChallenge {
  target: string; // e.g., "H2O"
  type: 'IONIC' | 'COVALENT';
  components: string[]; // ['H', 'H', 'O']
}
```

---

## 4. 🌍 Internationalization (i18n)

| Key | English | German (Deutsch) | Chinese (中文) |
|---|---|---|---|
| `sc105.title` | The Bonding Bridge | Die Bindungs-Brücke | 化学键之桥 |
| `sc105.ionic` | Ionic Bond | Ionenbindung | 离子键 |
| `sc105.covalent` | Covalent Bond | Atombindung / Elektronenpaarbindung | 共价键 |
| `sc105.octet` | Octet Rule | Oktettregel | 八隅体规则 |
| `sc105.share` | Share Electrons | Elektronen teilen | 共享电子 |
| `sc105.transfer`| Transfer | Übertragung | 转移 |
| `sc105.metal` | Metal | Metall | 金属 |
| `sc105.nonmetal`| Non-Metal | Nichtmetall | 非金属 |

---

## 5. 🎨 Design System (Aesthetics)
*   **Palette**:
    *   Background: Deep Navy Blue (`#0a192f`) - "The Quantum Void".
    *   Electrons: Neon Cyan (Glow effects).
    *   Nuclei: Metallic spheres.
    *   Bonds: Laser beams (Green for stable, Red for unstable).
*   **Sound**:
    *   Magnetic "Click" for ionic snap.
    *   "Humming wub-wub" for covalent sharing.
    *   Success chime: Harmonic chord.

## 6. 🔗 Integration
*   **Pre-requisite**: **SC1.03 (Atoms Forge)** - Must understand valence shells.
*   **Unlocks**: **SC3.02 (Organic Basics)** - Must understand C-H and C-C bonds.
