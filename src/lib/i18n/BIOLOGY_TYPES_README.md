# Biology Module Translation Types

## Overview

This document describes the standardized TypeScript interfaces for biology module translations in the Science Theme Park educational platform. These types ensure type safety and consistency across all biology modules (SB1.*, SB2.*, SB3.*, GB*.*).

## Core Interface: BiologyModuleTranslations

All biology modules share a common base structure defined by `BiologyModuleTranslations`:

```typescript
interface BiologyModuleTranslations {
  // Navigation and UI labels
  title: string;                    // Module title (e.g., "SB1.03 // CELL DIVISION")
  back: string;                     // Back button text
  check: string;                    // Verify/Check button text
  next: string;                     // Next button text
  correct: string;                  // Correct answer feedback
  incorrect: string;                // Incorrect answer feedback
  ready: string;                    // Ready state text
  monitor_title: string;            // Monitor display title
  footer_left: string;              // Footer left text
  objective_title: string;          // Mission objective title
  
  // Difficulty levels
  difficulty: {
    basic: string;
    core: string;
    advanced: string;
    elite: string;
  };
  
  // Stage names (module-specific)
  stages: Record<string, string>;
  
  // UI labels (module-specific)
  labels: Record<string, string>;
  
  // Question prompts and hints (module-specific)
  prompts: Record<string, string>;
  
  // Basel-contextualized scenarios (module-specific)
  scenarios: Record<string, string>;
  
  // Result messages (optional)
  results?: {
    valid: string;
    invalid: string;
    valid_desc: string;
    invalid_desc: string;
    next: string;
  };
  
  // Feedback messages
  feedback: {
    correct: string;
    incorrect: string;
  };
}
```

## Module-Specific Interfaces

### 1. Cell Division (SB1.03)

```typescript
interface CellDivisionTranslations extends BiologyModuleTranslations {
  stages: {
    mitosis: string;
    meiosis_i: string;
    meiosis_ii: string;
  };
  scenarios: {
    mitosis: string;
    meiosis_i: string;
    meiosis_ii: string;
  };
}
```

**Usage Example:**
```typescript
const sb1_03: CellDivisionTranslations = {
  title: "SB1.03 // CELL DIVISION",
  stages: {
    mitosis: "MITOSIS",
    meiosis_i: "MEIOSIS I",
    meiosis_ii: "MEIOSIS II"
  },
  scenarios: {
    mitosis: "University Hospital Basel - Cancer Research Division: ...",
    meiosis_i: "Friedrich Miescher Institute - Reproductive Biology Lab: ...",
    meiosis_ii: "Basel Genetics Counseling Center - Heredity Analysis: ..."
  },
  // ... other required fields
};
```

### 2. Tissues & Organs (SB2.01)

```typescript
interface TissuesOrgansTranslations extends BiologyModuleTranslations {
  stages: {
    tissues: string;
    organs: string;
    systems: string;
  };
  anatomy?: {
    tissues: Record<string, {
      name: string;
      function: string;
      subtypes?: string;
      location?: string;
    }>;
    organs?: Record<string, string>;
    hierarchy?: Record<string, string>;
  };
}
```

**Usage Example:**
```typescript
const sb2_01: TissuesOrgansTranslations = {
  title: "SB2.01 // TISSUES & ORGANS",
  stages: {
    tissues: "TISSUE TYPES",
    organs: "ORGAN COMPOSITION",
    systems: "ORGAN SYSTEMS"
  },
  anatomy: {
    tissues: {
      epithelial: {
        name: "Epithelial Tissue",
        function: "Protection, secretion, absorption",
        subtypes: "Squamous, cuboidal, columnar",
        location: "Skin epidermis, intestinal lining"
      },
      // ... more tissue types
    }
  },
  // ... other required fields
};
```

### 3. Neurobiology (GB2.01)

```typescript
interface NeurobiologyTranslations extends BiologyModuleTranslations {
  stages: {
    anatomy: string;
    potential: string;
    synapse: string;
  };
  scenarios: {
    basel_biomedicine: string;
    roche_neuroscience: string;
    neural_plasticity: string;
    friedrich_miescher: string;
  };
}
```

**Usage Example:**
```typescript
const gb2_01: NeurobiologyTranslations = {
  title: "GB2.01 // NEUROBIOLOGY",
  stages: {
    anatomy: "NEURON ANATOMY",
    potential: "ACTION POTENTIAL",
    synapse: "SYNAPTIC TRANSMISSION"
  },
  scenarios: {
    basel_biomedicine: "University of Basel - Biozentrum Neurobiology Department: ...",
    roche_neuroscience: "Roche Pharma Research - Neurodegeneration & Rare Diseases Division: ...",
    neural_plasticity: "University of Basel - Interfaculty Research Platform: ...",
    friedrich_miescher: "Friedrich Miescher Institute for Biomedical Research: ..."
  },
  // ... other required fields
};
```

## Stage-Specific Translations

For modules with distinct learning phases, use `BiologyStageTranslations`:

```typescript
interface BiologyStageTranslations {
  [stageId: string]: {
    name: string;
    description?: string;
    prompts?: Record<string, string>;
    labels?: Record<string, string>;
  };
}
```

## Translation Key Symmetry

**Critical Requirement:** All three language files (EN, CN, DE) must maintain identical key structures.

### Example of Symmetric Keys:

**EN (src/lib/i18n/en/biology.ts):**
```typescript
export const enBiology = {
  sb1_03: {
    title: "SB1.03 // CELL DIVISION",
    stages: {
      mitosis: "MITOSIS",
      meiosis_i: "MEIOSIS I",
      meiosis_ii: "MEIOSIS II"
    }
  }
};
```

**CN (src/lib/i18n/cn/biology.ts):**
```typescript
export const cnBiology = {
  sb1_03: {
    title: "SB1.03 // 细胞分裂",
    stages: {
      mitosis: "有丝分裂",
      meiosis_i: "减数分裂 I",
      meiosis_ii: "减数分裂 II"
    }
  }
};
```

**DE (src/lib/i18n/de/biology.ts):**
```typescript
export const deBiology = {
  sb1_03: {
    title: "SB1.03 // ZELLTEILUNG",
    stages: {
      mitosis: "MITOSE",
      meiosis_i: "MEIOSE I",
      meiosis_ii: "MEIOSE II"
    }
  }
};
```

## Using Translations in Components

### Basic Usage:

```typescript
import { useLanguage } from '@/lib/i18n';

function CellDivisionModule() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('sb1_03.title')}</h1>
      <button>{t('sb1_03.check')}</button>
      <p>{t('sb1_03.scenarios.mitosis')}</p>
    </div>
  );
}
```

### With Parameters:

```typescript
const { t } = useLanguage();

// Translation with parameters
const prompt = t('sb1_03.prompts.mitosis_count', { 
  phase: 'Metaphase' 
});
// Result: "In Metaphase, how many chromatids are present?"
```

## Type Safety Benefits

1. **Compile-time validation**: TypeScript will catch missing or incorrect translation keys
2. **IntelliSense support**: Auto-completion for translation keys in IDEs
3. **Refactoring safety**: Renaming keys will show errors in all usage locations
4. **Documentation**: Types serve as living documentation of the translation structure

## Best Practices

1. **Always extend BiologyModuleTranslations** for new biology modules
2. **Maintain key symmetry** across all three language files (EN, CN, DE)
3. **Use descriptive key names** that reflect the content purpose
4. **Group related translations** under logical parent keys (stages, labels, prompts, scenarios)
5. **Include Basel context** in scenario descriptions to maintain educational authenticity
6. **Test translations** in all three languages before deployment

## Validation

To ensure translation completeness, run:

```bash
npm run test:i18n
```

This will verify:
- Key symmetry across EN, CN, DE files
- Type compliance with BiologyModuleTranslations
- No missing required fields
- Proper parameter placeholder format

## Related Files

- `src/lib/i18n/types.ts` - Type definitions
- `src/lib/i18n/en/biology.ts` - English translations
- `src/lib/i18n/cn/biology.ts` - Chinese translations
- `src/lib/i18n/de/biology.ts` - German translations
- `src/lib/i18n/index.ts` - Main i18n entry point

## References

- Design Document: `.kiro/specs/biology-i18n-phase2/design.md`
- Requirements: `.kiro/specs/biology-i18n-phase2/requirements.md`
- Implementation Tasks: `.kiro/specs/biology-i18n-phase2/tasks.md`
