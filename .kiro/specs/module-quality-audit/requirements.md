# Requirements Document: Module Quality Audit and Fixes

## Introduction

This specification defines a comprehensive audit of all modules in the Science Theme Park platform to identify and fix common quality issues: incomplete question pools, hardcoded text, and inconsistent i18n implementation.

## Glossary

- **Module**: An educational chamber containing questions, visualizations, and learning content
- **Quest**: An individual question or problem within a module
- **Difficulty_Level**: One of four levels (BASIC, CORE, ADVANCED, ELITE)
- **Stage**: A sub-section within a module focusing on a specific concept
- **Hardcoded_Text**: Text directly written in code instead of using translation keys
- **i18n_Pattern**: Method of accessing translations (old: `translations[currentLanguage]`, new: `useLanguage()`)
- **Question_Pool**: Set of questions for a specific stage×difficulty combination

## Requirements

### Requirement 1: Complete Question Pool Coverage

**User Story:** As a student, I want to access questions at all difficulty levels in all stages, so that I can practice comprehensively.

#### Acceptance Criteria

1. THE System SHALL provide 4-5 questions for each stage×difficulty combination in every module
2. WHEN a student selects any difficulty level, THE System SHALL display questions (not "Module Complete!")
3. THE System SHALL ensure no stage×difficulty combination is empty
4. THE System SHALL maintain consistent question count across all modules

### Requirement 2: No Hardcoded Text

**User Story:** As a multilingual student, I want all text to be translatable, so that I can learn in my preferred language.

#### Acceptance Criteria

1. THE System SHALL use translation keys for all question prompts
2. THE System SHALL use translation keys for all labels and UI text
3. THE System SHALL use translation keys for all hints and feedback
4. THE System SHALL use translation keys for all organ/concept names
5. THE System SHALL ensure no English text is hardcoded in page.tsx files

### Requirement 3: Consistent i18n Implementation

**User Story:** As a developer, I want consistent i18n patterns across all modules, so that maintenance is easier.

#### Acceptance Criteria

1. THE System SHALL use `useLanguage()` hook in all modules (not `translations[currentLanguage]`)
2. THE System SHALL use `t("module_key.subkey")` syntax for all translations
3. THE System SHALL ensure all modules follow the same i18n pattern
4. THE System SHALL migrate all old-pattern modules to new pattern

### Requirement 4: Translation Completeness

**User Story:** As a content manager, I want all translations to exist in all three languages, so that no language has missing content.

#### Acceptance Criteria

1. THE System SHALL provide EN/CN/DE translations for all text in all modules
2. THE System SHALL ensure translation key counts match across all three languages
3. THE System SHALL use proper terminology in Chinese and German
4. THE System SHALL verify no translation keys are missing

## Audit Scope

### Modules to Audit

**Mathematics (26 modules):**
- SM1.01, SM1.02, SM1.03, SM1.04, SM1.05
- SM2.01, SM2.02, SM2.03, SM2.04, SM2.05, SM2.06, SM2.07, SM2.08, SM2.10
- SM3.01, SM3.02, SM3.03, SM3.04, SM3.05
- GM1.01, GM1.01-ADV, GM1.02, GM2.01, GM3.01, GM4.01
- EM1.01, EM2.01

**Physics (15 modules):**
- SP3.01, SP3.02, SP3.03, SP3.04, SP3.05, SP3.06, SP3.07, SP3.08
- GP1.01, GP1.02, GP1.03, GP1.04
- GP2.01, GP2.02, GP3.01

**Chemistry (21 modules):**
- SC1.01, SC1.02, SC1.03, SC1.04, SC1.05
- SC2.01, SC2.02, SC2.03, SC2.04, SC2.05, SC2.06
- SC3.01, SC3.02, SC3.03, SC3.04, SC3.05
- GC1.01, GC1.02, GC2.01, GC3.01, GC3.02

**Biology (12 modules):**
- SB1.01, SB1.01-M, SB1.02, SB1.03
- SB2.01, SB2.02, SB2.03
- SB3.01
- GB1.01, GB2.01, GB3.01, GB3.02

**Total: 74 modules**

## Audit Checklist per Module

For each module, verify:

1. **Question Pool Completeness**
   - [ ] All stages have questions for all 4 difficulty levels
   - [ ] Each stage×difficulty has 4-5 questions
   - [ ] No "Module Complete!" message appears when questions should exist

2. **i18n Pattern**
   - [ ] Uses `useLanguage()` hook (not old pattern)
   - [ ] All text uses translation keys (no hardcoded strings)
   - [ ] Translation keys follow `t("module_key.subkey")` format

3. **Translation Completeness**
   - [ ] EN translations exist for all keys
   - [ ] CN translations exist for all keys
   - [ ] DE translations exist for all keys
   - [ ] Translation key counts match across languages

4. **Browser Testing**
   - [ ] All stages×difficulties work in EN
   - [ ] All stages×difficulties work in CN
   - [ ] All stages×difficulties work in DE
   - [ ] Difficulty labels are translated correctly

## Priority Levels

**P0 (Critical - Fix Immediately):**
- Modules with empty question pools (students cannot practice)
- Modules with hardcoded English (CN/DE users see English)

**P1 (High - Fix Soon):**
- Modules using old i18n pattern (inconsistent with new modules)
- Modules with incomplete translations

**P2 (Medium - Fix When Possible):**
- Modules with minor translation issues
- Modules with inconsistent question counts

## Notes

- This audit will identify all quality issues across the platform
- Fixes will be prioritized based on impact to students
- All fixes will follow CHAMBER_MODULE_STANDARDS
- Each module fix will be tested in all three languages
