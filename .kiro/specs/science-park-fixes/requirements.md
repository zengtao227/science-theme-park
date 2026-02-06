# Requirements Document: Science Park Fixes

## Introduction

This document specifies the requirements for fixing critical issues in the Science Theme Park educational application. The application is a Next.js-based interactive STEM learning platform deployed on Vercel, serving Basel (Switzerland) students following the Basel curriculum. The fixes address display issues, layout problems, translation gaps, curriculum alignment, and user experience improvements.

## Glossary

- **System**: The Science Theme Park Next.js application
- **Module**: An individual learning chamber/simulation (e.g., SM2.07, SM3.02)
- **Homepage**: The main landing page displaying all available modules (src/app/page.tsx)
- **Translation_System**: The i18n internationalization system (src/lib/i18n.ts)
- **Module_Page**: Individual module chamber pages (src/app/chamber/{module-id}/page.tsx)
- **Monitor_Area**: The right-side vertical display area showing 3D visualizations
- **Basel_Curriculum**: The official Lehrplan 21 curriculum standards for Basel-Stadt and Basel-Landschaft
- **Sekundarschule**: Swiss secondary school (grades 7-9, ages 13-15)
- **Gymnasium**: Swiss upper secondary school (grades 10-12/13, ages 16-19)
- **Localization_Context**: Basel/Swiss-specific examples and references in educational content
- **User_System**: Simple localStorage-based username identification system

## Requirements

### Requirement 1: Module Title Display

**User Story:** As a student, I want to see the title of every module on the homepage, so that I can identify what each module teaches without clicking on it.

#### Acceptance Criteria

1. WHEN the Homepage renders a module card, THE System SHALL display the module title from Translation_System
2. WHEN Translation_System contains a title key for a module, THE System SHALL retrieve and display that title
3. THE System SHALL display titles for modules SM2.07, SM3.02, and SM3.04
4. WHEN a module title is missing from Translation_System, THE System SHALL display a fallback title in the format "{MODULE_CODE} // UNTITLED"
5. WHEN the user changes language, THE System SHALL update all module titles to the selected language

### Requirement 2: Vertical Layout Conversion

**User Story:** As a student, I want graphics to be displayed vertically in the monitor area, so that visualizations appear properly proportioned and aesthetically pleasing.

#### Acceptance Criteria

1. WHEN a Module_Page renders 3D graphics, THE System SHALL use vertical layout orientation
2. THE System SHALL use SM2.03 (Linear Functions) as the reference implementation for vertical layout
3. WHEN rendering graphics in Monitor_Area, THE System SHALL optimize aspect ratio for vertical display
4. THE System SHALL convert horizontal layouts to vertical layouts for modules SM2.02, SM2.01, SM3.02, and other affected modules
5. WHEN graphics are displayed vertically, THE System SHALL maintain interactive functionality

### Requirement 3: Graphics Size Enhancement

**User Story:** As a student, I want 3D visualizations and graphics to be larger, so that I can see details clearly and understand the concepts better.

#### Acceptance Criteria

1. WHEN rendering 3D visualizations, THE System SHALL increase canvas dimensions by at least 50%
2. WHEN displaying the SM3.02 trigonometry circle, THE System SHALL enlarge the circle radius to fill available vertical space
3. THE System SHALL maintain aspect ratios when enlarging graphics
4. WHEN graphics are enlarged, THE System SHALL ensure all interactive elements remain accessible
5. THE System SHALL ensure enlarged graphics do not cause horizontal scrolling on standard screen sizes

### Requirement 4: Translation Completeness

**User Story:** As a student, I want all text to appear in my selected language, so that I can learn in my preferred language without confusion.

#### Acceptance Criteria

1. WHEN the user selects a language, THE System SHALL display all UI text in that language
2. THE System SHALL eliminate all hardcoded English text from module components
3. WHEN Translation_System lacks a translation key, THE System SHALL log a warning and display the key name
4. THE System SHALL translate all instructional text, labels, and prompts in modules SM1.02 and other affected modules
5. THE System SHALL provide translations for German (DE), English (EN), and Chinese (CN) languages

### Requirement 5: Curriculum Alignment Verification

**User Story:** As an educator, I want modules to align with Basel curriculum standards, so that students learn age-appropriate content following their official curriculum.

#### Acceptance Criteria

1. THE System SHALL verify module SM1.02 (4D Hyper-Geometry) against Basel_Curriculum for Sekundarschule Year 1 (7th grade)
2. IF SM1.02 content exceeds Sekundarschule Year 1 curriculum, THEN THE System SHALL move the module to Gymnasium section
3. IF SM1.02 content is not in Basel_Curriculum, THEN THE System SHALL mark the module as optional or remove it
4. THE System SHALL document curriculum alignment for all modules in module metadata
5. THE System SHALL organize modules by curriculum year and difficulty level

### Requirement 6: Routing Stability

**User Story:** As a student, I want modules to load reliably every time, so that I can access learning content without encountering errors.

#### Acceptance Criteria

1. WHEN a user navigates to module SM2.01 (Binomial Factory), THE System SHALL load the module page successfully
2. THE System SHALL eliminate intermittent 404 errors for all module routes
3. WHEN a module page fails to load, THE System SHALL display a user-friendly error message
4. THE System SHALL log routing errors for debugging purposes
5. THE System SHALL ensure all module routes are properly registered in Next.js routing configuration

### Requirement 7: Basel Localization

**User Story:** As a Basel student, I want examples to use familiar local context, so that I can relate mathematical concepts to my everyday environment.

#### Acceptance Criteria

1. WHEN displaying geometry examples, THE System SHALL use Basel_Localization_Context such as Basel tram windows and Basel Cathedral
2. WHEN displaying chemistry examples, THE System SHALL reference Novartis and Roche laboratories
3. WHEN displaying finance or exponential growth examples, THE System SHALL reference Swiss banks in Basel (UBS, Credit Suisse)
4. WHEN displaying physics examples, THE System SHALL reference Rhine river hydropower, Basel trams, and Basel clock towers
5. THE System SHALL maintain educational accuracy while incorporating Localization_Context

### Requirement 8: German Translation Standard

**User Story:** As a German-speaking student, I want text in standard German, so that I can read academic content in the appropriate formal language.

#### Acceptance Criteria

1. WHEN displaying German translations, THE System SHALL use Hochdeutsch (standard German)
2. THE System SHALL avoid Swiss German dialect in educational content
3. THE System SHALL use academic terminology appropriate for secondary education
4. WHEN translating mathematical terms, THE System SHALL use standard German mathematical vocabulary
5. THE System SHALL maintain consistency in German terminology across all modules

### Requirement 9: User Identification System

**User Story:** As a parent, I want a simple username system, so that multiple children can track their individual learning progress on the same device.

#### Acceptance Criteria

1. WHEN a user visits the application for the first time, THE System SHALL prompt for a username
2. THE System SHALL store the username in localStorage
3. WHEN a user completes a module, THE System SHALL associate learning records with the current username
4. THE System SHALL provide a user switching interface
5. THE System SHALL persist learning history per username without requiring backend authentication

### Requirement 10: Implementation Priority

**User Story:** As a developer, I want clear implementation priorities, so that I can fix critical issues first and deliver value incrementally.

#### Acceptance Criteria

1. THE System SHALL prioritize Week 1 fixes: missing titles, curriculum research, layout conversion, graphics enlargement, and routing stability
2. THE System SHALL schedule Week 2-3 enhancements: translation audit, Basel localization, user system, and German review
3. THE System SHALL maintain existing functionality during all fixes
4. THE System SHALL not modify code structure unnecessarily
5. THE System SHALL validate each fix through manual testing before deployment

## Notes

- All changes must maintain compatibility with Vercel deployment
- The application is for personal family use (daughter + friends' children)
- Basel curriculum alignment is mandatory - content must strictly follow Lehrplan 21
- Translation keys already exist in src/lib/i18n.ts but may not be properly referenced
- SM2.03 (Linear Functions) serves as the reference implementation for good vertical layout
