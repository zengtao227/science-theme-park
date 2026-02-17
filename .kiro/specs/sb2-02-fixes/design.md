# Design Document: SB2.02 Body Systems Fixes

## Overview

This design document specifies the fixes for the SB2.02 Body Systems module, addressing incomplete question pools, hardcoded English text, and outdated i18n implementation. The fixes will bring the module up to the CHAMBER_MODULE_STANDARDS used by newer modules.

## Architecture

### Current Issues

1. **Incomplete Question Pools**: Only 3 out of 12 difficulty×stage combinations have questions
2. **Hardcoded English**: All prompts, organ names, and hints are hardcoded in page.tsx
3. **Old i18n Pattern**: Uses `translations[currentLanguage]` instead of `useLanguage()` hook
4. **Unclear Socratic Tag**: Tag exists but purpose is not clear to users

### Proposed Solution

1. **Complete All Question Pools**: Add 5 questions for each of the 12 difficulty×stage combinations
2. **Extract to Translation Keys**: Move all text to `src/lib/i18n/{en,cn,de}/biology.ts`
3. **Migrate to useLanguage()**: Update page.tsx to use modern i18n pattern
4. **Remove Socratic Tag**: Remove from homepage filters and module definitions

## Data Models

### Question Pool Structure

Each stage (DIGESTIVE, CIRCULATORY, RESPIRATORY) needs 4 difficulty levels × 5 questions = 20 questions per stage.

**Total**: 3 stages × 20 questions = 60 questions

### Translation Key Structure

```typescript
// src/lib/i18n/en/biology.ts
sb2_02: {
    // ... existing keys ...
    prompts: {
        // DIGESTIVE stage
        digestive_b1: "Food travels: Mouth → Esophagus → ? → Intestines",
        digestive_b2: "The digestive system breaks down food. What is its main function?",
        // ... more prompts ...
        
        // CIRCULATORY stage
        circulatory_b1: "The heart pumps blood throughout the body. What is its function?",
        // ... more prompts ...
        
        // RESPIRATORY stage
        respiratory_b1: "Gas exchange occurs in tiny air sacs. What are they called?",
        // ... more prompts ...
    },
    organs: {
        stomach: "Stomach",
        heart: "Heart",
        lungs: "Lungs",
        esophagus: "Esophagus",
        intestines: "Intestines",
        liver: "Liver",
        pancreas: "Pancreas",
        arteries: "Arteries",
        veins: "Veins",
        alveoli: "Alveoli",
        diaphragm: "Diaphragm",
        trachea: "Trachea",
        larynx: "Larynx",
        pharynx: "Pharynx",
    },
    functions: {
        digestion: "Digestion and absorption",
        absorption: "Nutrient absorption",
        bile: "Bile production",
        pump: "Pump blood",
        return: "Return blood to heart",
        breathing: "Enable breathing",
    },
    hints: {
        digestive_b1: "Where food is churned and digested",
        digestive_b2: "Breaks down food into nutrients",
        // ... more hints ...
    },
}
```

### Chinese Translation Examples

```typescript
// src/lib/i18n/cn/biology.ts
sb2_02: {
    prompts: {
        digestive_b1: "食物路径：口腔 → 食道 → ? → 肠道",
        digestive_b2: "消化系统分解食物。它的主要功能是什么？",
        // ...
    },
    organs: {
        stomach: "胃",
        heart: "心脏",
        lungs: "肺",
        esophagus: "食道",
        intestines: "肠道",
        liver: "肝脏",
        pancreas: "胰腺",
        arteries: "动脉",
        veins: "静脉",
        alveoli: "肺泡",
        diaphragm: "膈膜",
        trachea: "气管",
        larynx: "喉",
        pharynx: "咽",
    },
    functions: {
        digestion: "消化和吸收",
        absorption: "营养吸收",
        bile: "胆汁分泌",
        pump: "泵血",
        return: "将血液送回心脏",
        breathing: "呼吸",
    },
}
```

### German Translation Examples

```typescript
// src/lib/i18n/de/biology.ts
sb2_02: {
    prompts: {
        digestive_b1: "Nahrungsweg: Mund → Speiseröhre → ? → Darm",
        digestive_b2: "Das Verdauungssystem zerlegt Nahrung. Was ist seine Hauptfunktion?",
        // ...
    },
    organs: {
        stomach: "Magen",
        heart: "Herz",
        lungs: "Lunge",
        esophagus: "Speiseröhre",
        intestines: "Darm",
        liver: "Leber",
        pancreas: "Bauchspeicheldrüse",
        arteries: "Arterien",
        veins: "Venen",
        alveoli: "Alveolen",
        diaphragm: "Zwerchfell",
        trachea: "Luftröhre",
        larynx: "Kehlkopf",
        pharynx: "Rachen",
    },
    functions: {
        digestion: "Verdauung und Absorption",
        absorption: "Nährstoffaufnahme",
        bile: "Gallenproduktion",
        pump: "Blut pumpen",
        return: "Blut zum Herzen zurückführen",
        breathing: "Atmung ermöglichen",
    },
}
```

## Implementation Strategy

### Phase 1: Translation Keys

1. Add all translation keys to `src/lib/i18n/en/biology.ts`
2. Add all translation keys to `src/lib/i18n/cn/biology.ts`
3. Add all translation keys to `src/lib/i18n/de/biology.ts`

### Phase 2: Complete Question Pools

1. Add 5 questions for each missing difficulty×stage combination
2. Use translation keys for all text (no hardcoded strings)
3. Ensure questions follow difficulty progression guidelines:
   - BASIC: Simple identification, single concepts
   - CORE: Multi-step reasoning, combined concepts
   - ADVANCED: Complex pathways, conditional logic
   - ELITE: System integration, comprehensive understanding

### Phase 3: Migrate to useLanguage()

1. Replace `import { translations } from "@/lib/i18n"` with `import { useLanguage } from "@/lib/i18n"`
2. Replace `const t = translations[currentLanguage].sb2_02` with `const { t } = useLanguage()`
3. Update all `t.key` references to `t("sb2_02.key")`
4. Test language switching in browser

### Phase 4: Remove Socratic Tag

1. Remove "socratic" from filterTags array in `src/app/page.tsx`
2. Remove "socratic" tag from all module definitions
3. Test filtering functionality

## Correctness Properties

### Property 1: Complete Question Coverage
*For any* stage (DIGESTIVE, CIRCULATORY, RESPIRATORY) and any difficulty (BASIC, CORE, ADVANCED, ELITE), the question pool should contain exactly 5 questions.

**Validates: Requirement 1.1-1.13**

### Property 2: No Hardcoded English
*For any* question in the module, all text (prompts, hints, labels) should use translation keys, not hardcoded strings.

**Validates: Requirement 2.2-2.4**

### Property 3: Translation Completeness
*For any* translation key used in the module, all three languages (EN, CN, DE) should have a corresponding translation.

**Validates: Requirement 3.1-3.7**

### Property 4: Language Switching Reactivity
*For any* language change (EN ↔ CN ↔ DE), all displayed text should update to the new language within one render cycle.

**Validates: Requirement 2.5**

## Testing Strategy

### Unit Tests

1. Test question pool size for each stage×difficulty combination
2. Test translation key existence for all used keys
3. Test language switching updates all text
4. Test that no "Module Complete!" message appears when questions exist

### Manual Browser Testing

1. Test all 12 stage×difficulty combinations in EN/CN/DE
2. Verify all text is translated correctly
3. Verify organ names and functions are translated
4. Verify hints are translated
5. Verify visualization labels are translated

## Notes

- This is a fix for an existing module, not a new module
- Priority is to bring SB2.02 up to the standards of newer modules
- All changes should maintain backward compatibility with existing user progress
