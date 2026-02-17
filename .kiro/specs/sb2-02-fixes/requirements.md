# Requirements Document: SB2.02 Body Systems Fixes

## Introduction

This specification addresses critical issues in the SB2.02 Body Systems module, including incomplete question pools, hardcoded English text, and outdated i18n implementation. The module currently has significant gaps that prevent students from accessing content in all difficulty levels and languages.

## Glossary

- **System**: The Science Theme Park web application
- **Module**: An educational chamber containing questions, visualizations, and learning content
- **Quest**: An individual question or problem within a module
- **Difficulty_Level**: One of four levels (BASIC, CORE, ADVANCED, ELITE)
- **Stage**: A sub-section within a module focusing on a specific concept (DIGESTIVE, CIRCULATORY, RESPIRATORY)
- **i18n**: Internationalization system supporting EN/CN/DE languages
- **useLanguage**: Modern i18n hook pattern (replaces old translations[currentLanguage] pattern)

## Requirements

### Requirement 1: Complete Question Pools for All Stages and Difficulties

**User Story:** As a student, I want to practice body systems concepts at all difficulty levels, so that I can progress from basic to advanced understanding.

#### Acceptance Criteria

1. THE System SHALL provide 5 questions for DIGESTIVE stage at BASIC difficulty
2. THE System SHALL provide 5 questions for DIGESTIVE stage at CORE difficulty
3. THE System SHALL provide 5 questions for DIGESTIVE stage at ADVANCED difficulty
4. THE System SHALL provide 5 questions for DIGESTIVE stage at ELITE difficulty
5. THE System SHALL provide 5 questions for CIRCULATORY stage at BASIC difficulty
6. THE System SHALL provide 5 questions for CIRCULATORY stage at CORE difficulty
7. THE System SHALL provide 5 questions for CIRCULATORY stage at ADVANCED difficulty
8. THE System SHALL provide 5 questions for CIRCULATORY stage at ELITE difficulty
9. THE System SHALL provide 5 questions for RESPIRATORY stage at BASIC difficulty
10. THE System SHALL provide 5 questions for RESPIRATORY stage at CORE difficulty
11. THE System SHALL provide 5 questions for RESPIRATORY stage at ADVANCED difficulty
12. THE System SHALL provide 5 questions for RESPIRATORY stage at ELITE difficulty
13. WHEN a student selects any difficulty level, THE System SHALL display questions (not "Module Complete!")

### Requirement 2: Multilingual Support (EN/CN/DE)

**User Story:** As a multilingual student in Basel, I want to use the module in my preferred language, so that I can learn effectively in German, English, or Chinese.

#### Acceptance Criteria

1. THE System SHALL migrate from `translations[currentLanguage]` pattern to `useLanguage()` hook
2. THE System SHALL use translation keys for all question prompts (no hardcoded English)
3. THE System SHALL use translation keys for all organ names and system descriptions
4. THE System SHALL use translation keys for all hints and feedback messages
5. WHEN a user switches language, THE System SHALL update all text immediately
6. THE System SHALL translate difficulty levels (BASIC→基础→BASIS, CORE→核心→KERN, etc.)
7. THE System SHALL provide complete scenario descriptions in all three languages
8. THE System SHALL ensure visualization labels use translated text

### Requirement 3: Translation Content Completeness

**User Story:** As a content manager, I want all translations to be complete and accurate, so that students receive consistent educational quality in all languages.

#### Acceptance Criteria

1. THE System SHALL add translation keys for all question prompts in EN/CN/DE
2. THE System SHALL add translation keys for organ names (stomach, heart, lungs, etc.) in EN/CN/DE
3. THE System SHALL add translation keys for system functions in EN/CN/DE
4. THE System SHALL add translation keys for hints in EN/CN/DE
5. THE System SHALL ensure Chinese translations use proper medical terminology
6. THE System SHALL ensure German translations use proper medical terminology
7. THE System SHALL maintain consistent terminology across all stages

### Requirement 4: Homepage Socratic Tag Review

**User Story:** As a student browsing modules, I want clear and useful filter tags, so that I can find modules that match my learning style.

#### Acceptance Criteria

1. THE System SHALL evaluate the usefulness of the "Socratic" tag
2. IF the tag is not sufficiently distinctive, THE System SHALL remove it from the filter
3. IF the tag is removed, THE System SHALL remove it from all module definitions
4. THE System SHALL maintain other useful tags (physics, math, chemistry, biology)
5. THE System SHALL ensure tag removal does not break filtering functionality

## Notes

- Current implementation has only partial question coverage (DIGESTIVE-BASIC, CIRCULATORY-CORE, RESPIRATORY-ADVANCED)
- All question text is currently hardcoded in English within the page.tsx file
- The module uses the old i18n pattern which is inconsistent with newer modules
- Socratic tag appears on 6 modules but its meaning is unclear to users
