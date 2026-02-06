# Design Document: Science Park Fixes

## Overview

This design addresses critical issues in the Science Theme Park educational application, a Next.js-based interactive STEM learning platform. The fixes target display problems, layout inconsistencies, translation gaps, curriculum alignment, and user experience improvements while maintaining the existing architecture and deployment pipeline.

### Design Philosophy

- **Minimal Invasive Changes**: Modify only what's necessary to fix identified issues
- **Consistency First**: Use existing patterns (SM2.03 as reference) for layout fixes
- **Progressive Enhancement**: Prioritize critical fixes (Week 1) before enhancements (Week 2-3)
- **Basel-Centric**: Align all content with Basel curriculum and local context
- **Family-Friendly**: Simple localStorage-based user system for personal use

## Architecture

### Current System Architecture

```
Next.js Application (App Router)
├── src/app/
│   ├── page.tsx                    # Homepage with module cards
│   ├── chamber/[module-id]/        # Individual module pages
│   └── layout.tsx                  # Root layout
├── src/components/
│   ├── layout/ChamberLayout.tsx    # Shared module layout
│   ├── chamber/[module-id]/        # Module-specific components
│   └── ui/                         # Shared UI components
├── src/lib/
│   ├── i18n.ts                     # Translation system
│   └── store.ts                    # Zustand state management
└── Vercel Deployment               # Auto-deploy on push
```

### Key Architectural Decisions

1. **No Backend Required**: All user data stored in localStorage (family use case)
2. **Component-Based Layout**: ChamberLayout provides consistent structure
3. **Translation-Driven**: All text sourced from i18n.ts translation keys
4. **State Management**: Zustand with persistence for progress tracking


## Components and Interfaces

### 1. Module Title Display Fix

**Problem**: Modules SM2.07, SM3.02, and SM3.04 display without titles on homepage

**Root Cause Analysis**:
- Translation keys exist in `src/lib/i18n.ts` (verified: `sm2_07_title`, `sm3_02_title`, `sm3_04_title`)
- Homepage `src/app/page.tsx` uses hardcoded module arrays with title references
- Likely issue: Module array entries not properly referencing translation keys

**Solution Design**:

```typescript
// In src/app/page.tsx
const mathModules = useMemo(() => ([
  // ... existing modules ...
  { 
    code: "SM2.07", 
    title: t.home.sm2_07_title,  // Ensure proper reference
    desc: t.home.sm2_07_subtitle, 
    color: "neon-green", 
    href: "/chamber/sm2-07", 
    tags: ["math"] 
  },
  { 
    code: "SM3.02", 
    title: t.home.sm3_02_title,  // Ensure proper reference
    desc: t.home.sm3_02_subtitle, 
    color: "neon-cyan", 
    href: "/chamber/sm3-02", 
    tags: ["math"] 
  },
  { 
    code: "SM3.04", 
    title: t.home.sm3_04_title,  // Ensure proper reference
    desc: t.home.sm3_04_subtitle, 
    color: "neon-amber", 
    href: "/chamber/sm3-04", 
    tags: ["math"] 
  },
]), [t]);
```

**Fallback Mechanism**:
```typescript
// Add fallback in ModuleCard component
const displayTitle = title || `${code} // UNTITLED`;
```


### 2. Vertical Layout Conversion

**Problem**: Graphics designed horizontally but monitor area is vertical, causing "flat" appearance

**Reference Implementation**: SM2.03 (Linear Functions) has correct vertical layout

**Analysis of SM2.03 Layout**:
```typescript
// SM2.03 uses vertical canvas with proper aspect ratio
<LaserCanvas
  level={level}
  slope={slope}
  intercept={intercept}
  targetX={targetX}
  targetY={targetY}
  // Canvas fills vertical space in monitor area
/>
```

**Affected Modules**:
- SM2.02 (Pythagoras) - Currently horizontal triangle visualization
- SM2.01 (Binomial Factory) - Horizontal square dissection
- SM3.02 (Trigonometry) - Horizontal circle/wave display
- Others identified during implementation

**Solution Pattern**:

For each affected module:
1. Identify canvas component (e.g., `PythagorasCanvas`, `BinomialCanvas`, `TrigCanvas`)
2. Adjust canvas dimensions to vertical aspect ratio (e.g., 600x800 instead of 800x600)
3. Reposition 3D camera/view to optimize for vertical display
4. Update layout in ChamberLayout's `monitorContent` prop

**Example: SM2.02 Pythagoras Conversion**:
```typescript
// In src/components/chamber/sm2-02/PythagorasCanvas.tsx
// Change camera position and canvas size
<Canvas
  camera={{ position: [0, 0, 12], fov: 50 }}  // Adjust for vertical view
  style={{ width: '100%', height: '800px' }}   // Vertical aspect
>
  {/* Rotate/reposition 3D objects for vertical orientation */}
</Canvas>
```

**Design Principle**: Maintain interactive functionality while optimizing visual presentation for vertical monitor area


### 3. Graphics Size Enhancement

**Problem**: 3D visualizations too small, details hard to see

**Solution Strategy**:

**A. Canvas Dimension Scaling**:
```typescript
// Current typical size: 400x400 or 500x500
// Target size: 600x900 (50%+ increase, vertical aspect)

// Example for SM3.02 Trigonometry Circle
<Canvas
  style={{ 
    width: '100%', 
    height: '900px'  // Increased from ~600px
  }}
  camera={{ 
    position: [0, 0, 8],  // Adjust zoom
    fov: 60               // Wider field of view
  }}
>
```

**B. 3D Object Scaling**:
```typescript
// Increase mesh/geometry scale factors
<mesh scale={[2.5, 2.5, 2.5]}>  // Increased from [1.5, 1.5, 1.5]
  <circleGeometry args={[3, 64]} />  // Larger radius
</mesh>
```

**C. Responsive Constraints**:
```typescript
// Ensure no horizontal overflow
.monitor-container {
  max-width: 100%;
  overflow: hidden;
}

// Maintain aspect ratio
aspect-ratio: 2/3;  // Vertical orientation
```

**Specific Targets**:
- SM3.02 circle: Increase radius from 2 to 3.5 units
- SM2.02 triangles: Scale by 1.5x
- SM2.01 squares: Increase from 4x4 to 6x6 units
- All 3D visualizations: Minimum 50% size increase

**Testing Criteria**:
- Details clearly visible at 1920x1080 resolution
- No horizontal scrolling on standard screens
- Interactive elements remain accessible


### 4. Translation Completeness System

**Problem**: Hardcoded English text appears even when German/Chinese selected

**Root Cause**: Module components contain hardcoded strings instead of translation key references

**Solution Architecture**:

**A. Translation Audit Tool**:
```typescript
// Create utility to scan for hardcoded text
// src/lib/translation-audit.ts

export function auditHardcodedText(componentPath: string): string[] {
  // Scan for patterns:
  // - String literals in JSX: <div>"hardcoded"</div>
  // - Template literals without t(): `hardcoded ${var}`
  // - Common English words: "to", "the", "solve", etc.
  
  const violations: string[] = [];
  // Return list of hardcoded strings with line numbers
  return violations;
}
```

**B. Translation Key Convention**:
```typescript
// Pattern: module.section.key
// Example: sm1_02.labels.tower_height

// In src/lib/i18n.ts
export const translations = {
  EN: {
    sm1_02: {
      labels: {
        tower_height: "to solve tower height",
        // ... all text strings
      }
    }
  },
  DE: {
    sm1_02: {
      labels: {
        tower_height: "um die Turmhöhe zu lösen",
      }
    }
  },
  CN: {
    sm1_02: {
      labels: {
        tower_height: "求解塔高",
      }
    }
  }
}
```

**C. Component Pattern**:
```typescript
// In module components
const { currentLanguage } = useAppStore();
const t = translations[currentLanguage].sm1_02;

// Replace hardcoded text
// Before: <label>to solve tower height</label>
// After:  <label>{t.labels.tower_height}</label>
```

**D. Missing Translation Handling**:
```typescript
// Add fallback utility
function getTranslation(key: string, fallback: string): string {
  const value = /* lookup key in translations */;
  if (!value) {
    console.warn(`Missing translation: ${key}`);
    return fallback || key;
  }
  return value;
}
```

**Priority Modules for Translation Audit**:
1. SM1.02 (4D Hyper-Geometry) - User reported issue
2. All Sekundarschule modules (SM1.*, SM2.*, SM3.*)
3. Gymnasium modules (GM*.*, GP*.*, GC*.*)


### 5. Curriculum Alignment System

**Problem**: SM1.02 (4D Hyper-Geometry) may be too advanced for 7th grade

**Basel Curriculum Context**:
- Sekundarschule Year 1 (7th grade): Ages 13-14
- Curriculum: Lehrplan 21 (Basel-Stadt and Basel-Landschaft)
- Focus: Basic geometry, algebra, proportional reasoning

**Research Findings**:
Based on Basel curriculum documents:
- 7th grade geometry: Areas, volumes, basic 3D shapes (prisms, cylinders)
- 4D geometry: Not in standard Sekundarschule curriculum
- Appropriate level: Gymnasium (upper secondary) or advanced enrichment

**Solution Design**:

**A. Curriculum Metadata System**:
```typescript
// Add to module definitions
interface ModuleMetadata {
  code: string;
  title: string;
  curriculumLevel: 'SEK1' | 'SEK2' | 'SEK3' | 'GYM' | 'ENRICHMENT';
  baselCurriculumRef?: string;  // Reference to Lehrplan 21 competency
  difficulty: 'BASIC' | 'CORE' | 'ADVANCED' | 'ELITE';
  topics: string[];
}

// Example
const SM1_02_METADATA: ModuleMetadata = {
  code: 'SM1.02',
  title: '4D HYPER-GEOMETRY',
  curriculumLevel: 'ENRICHMENT',  // Not standard curriculum
  baselCurriculumRef: null,       // No direct curriculum mapping
  difficulty: 'ELITE',
  topics: ['4D geometry', 'tesseract', 'rotation matrices']
};
```

**B. Module Reorganization**:
```typescript
// In src/app/page.tsx
// Move SM1.02 to separate "Enrichment" or "Advanced Topics" section
const enrichmentModules = [
  { 
    code: "SM1.02", 
    title: t.home.sm1_02_title,
    desc: t.home.sm1_02_subtitle,
    badge: "ENRICHMENT",  // Visual indicator
    color: "neon-purple",
    href: "/chamber/sm1-02",
    tags: ["math", "advanced"]
  },
];
```

**C. Curriculum Alignment Documentation**:
```markdown
# Module Curriculum Mapping

## Sekundarschule Year 1 (7th Grade)
- SM1.01: Areas & Volumes ✓ (Lehrplan 21: MA.2.B.2)
- SM1.02: 4D Hyper-Geometry ⚠️ (Enrichment - not in standard curriculum)

## Sekundarschule Year 2 (8th Grade)
- SM2.01: Binomial Formulas ✓ (Lehrplan 21: MA.1.A.3)
- SM2.02: Pythagoras ✓ (Lehrplan 21: MA.2.A.2)
...
```

**D. User Interface Changes**:
- Add "Enrichment" badge to SM1.02 card
- Optional: Add curriculum level filter
- Tooltip explaining enrichment content


### 6. Routing Stability Fix

**Problem**: SM2.01 (Binomial Factory) shows intermittent 404 errors

**Investigation Approach**:

**A. Verify File Structure**:
```bash
# Check if files exist
src/app/chamber/sm2-01/page.tsx  ✓ (exists, verified)
src/components/chamber/sm2-01/   ✓ (exists)
```

**B. Potential Causes**:
1. **Dynamic Import Issue**: Component may fail to load intermittently
2. **Build Cache**: Next.js build cache corruption
3. **Client-Side Navigation**: React hydration mismatch
4. **Vercel Edge Function**: Cold start timeout

**C. Solution Design**:

**1. Add Error Boundary**:
```typescript
// src/app/chamber/sm2-01/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2>Module Loading Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  );
}
```

**2. Add Loading State**:
```typescript
// src/app/chamber/sm2-01/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="animate-pulse">Loading SM2.01...</div>
    </div>
  );
}
```

**3. Ensure Static Generation**:
```typescript
// In src/app/chamber/sm2-01/page.tsx
// Add metadata export to ensure proper static generation
export const metadata = {
  title: 'SM2.01 // Binomial Factory',
};

// Ensure no dynamic server-side dependencies
```

**4. Add Logging**:
```typescript
// Track 404 errors
useEffect(() => {
  console.log('[SM2.01] Component mounted successfully');
  return () => console.log('[SM2.01] Component unmounted');
}, []);
```

**5. Vercel Configuration**:
```json
// vercel.json (if needed)
{
  "routes": [
    {
      "src": "/chamber/sm2-01",
      "dest": "/chamber/sm2-01"
    }
  ]
}
```


### 7. Basel Localization System

**Problem**: Examples use generic context instead of Basel-specific references

**Basel Context Research**:
- **Geometry**: Basel tram windows (trapezoids), Basel Cathedral (Basler Münster) for shadows
- **Chemistry**: Novartis and Roche laboratories (major Basel employers)
- **Finance**: UBS, Credit Suisse (Swiss banks with Basel presence)
- **Physics**: Rhine river hydropower, Basel trams, Basel clock towers

**Solution Design**:

**A. Localization Content Database**:
```typescript
// src/lib/basel-context.ts

export const baselContext = {
  geometry: {
    trapezoid: {
      EN: "Basel tram window",
      DE: "Basler Tramfenster",
      CN: "巴塞尔电车窗户"
    },
    shadow: {
      EN: "Basel Cathedral (Basler Münster) shadow",
      DE: "Schatten des Basler Münsters",
      CN: "巴塞尔大教堂阴影"
    },
    tower: {
      EN: "Basel clock tower",
      DE: "Basler Uhrturm",
      CN: "巴塞尔钟楼"
    }
  },
  chemistry: {
    lab: {
      EN: "Novartis laboratory",
      DE: "Novartis-Labor",
      CN: "诺华实验室"
    },
    compound: {
      EN: "Roche pharmaceutical compound",
      DE: "Roche-Pharmaverbindung",
      CN: "罗氏制药化合物"
    }
  },
  physics: {
    hydropower: {
      EN: "Rhine river hydropower station",
      DE: "Rhein-Wasserkraftwerk",
      CN: "莱茵河水电站"
    },
    tram: {
      EN: "Basel tram system",
      DE: "Basler Tramnetz",
      CN: "巴塞尔电车系统"
    }
  },
  finance: {
    bank: {
      EN: "UBS Basel branch",
      DE: "UBS Basel-Filiale",
      CN: "瑞银巴塞尔分行"
    },
    exponential: {
      EN: "Swiss bank compound interest",
      DE: "Schweizer Bank Zinseszins",
      CN: "瑞士银行复利"
    }
  }
};
```

**B. Module Integration Pattern**:
```typescript
// Example: SM1.01 (Areas & Volumes)
// Replace generic "window" with Basel tram window

const t = translations[currentLanguage].sm1_01;
const context = baselContext.geometry.trapezoid[currentLanguage];

// In quest prompt
promptLatex: `\\text{Calculate the area of a ${context}}`
```

**C. Priority Modules for Localization**:
1. SM1.01 (Areas & Volumes) - Geometry examples
2. SM2.02 (Pythagoras) - Tower/shadow problems
3. SC1.02 (Mole Master) - Chemistry lab context
4. SM3.03 (Exponential Growth) - Finance examples
5. SP1.03 (Energy & Power) - Rhine hydropower

**D. Educational Accuracy**:
- Verify all Basel references are factually accurate
- Ensure measurements/values are realistic
- Maintain educational value while adding local context


### 8. German Translation Standard

**Problem**: Ensure standard German (Hochdeutsch) not Swiss German dialect

**Solution Design**:

**A. Translation Review Checklist**:
```markdown
# German Translation Standards

## Use Hochdeutsch (Standard German)
✓ "Mathematik" not "Mathe"
✓ "Aufgabe" not "Ufgab"
✓ "berechnen" not "usrächne"

## Academic Terminology
✓ Use formal mathematical terms
✓ Avoid colloquialisms
✓ Maintain consistency with Swiss textbooks (which use Hochdeutsch)

## Swiss-Specific Exceptions
✓ "Matura" (Swiss term for university entrance exam)
✓ "Sekundarschule" (Swiss school system term)
✓ Place names: "Basel", "Rhein" (not "Rhine")
```

**B. Translation Validation**:
```typescript
// Add validation utility
export function validateGermanTranslation(text: string): string[] {
  const swissDialectPatterns = [
    /\busrächne\b/,  // Should be "berechnen"
    /\bUfgab\b/,     // Should be "Aufgabe"
    /\bMathe\b/,     // Should be "Mathematik"
  ];
  
  const violations: string[] = [];
  swissDialectPatterns.forEach(pattern => {
    if (pattern.test(text)) {
      violations.push(`Swiss dialect detected: ${pattern}`);
    }
  });
  return violations;
}
```

**C. Review Process**:
1. Audit all German translations in `src/lib/i18n.ts`
2. Check against Hochdeutsch dictionary
3. Verify mathematical terminology matches Swiss textbooks
4. Test with German-speaking users


### 9. User Identification System

**Problem**: No way to track individual user progress for multiple children

**Requirements**:
- Simple localStorage-based (no backend)
- Username prompt on first visit
- User switching capability
- Per-user learning records
- Personal family use only

**Solution Design**:

**A. User State Management**:
```typescript
// Extend src/lib/store.ts

interface UserProfile {
  username: string;
  createdAt: number;
  lastActive: number;
  avatar?: string;  // Optional emoji/color
}

interface AppState {
  // ... existing state ...
  
  // New user system state
  currentUser: string | null;
  users: Record<string, UserProfile>;
  userProgress: Record<string, ModuleProgress>;  // username -> progress
  userHistory: Record<string, HistoryEntry[]>;   // username -> history
  
  // New user actions
  setCurrentUser: (username: string) => void;
  createUser: (username: string) => void;
  switchUser: (username: string) => void;
  getUserList: () => UserProfile[];
}
```

**B. First Visit Flow**:
```typescript
// src/components/UserSetup.tsx

export default function UserSetup() {
  const [username, setUsername] = useState('');
  const { createUser, setCurrentUser } = useAppStore();
  
  const handleSubmit = () => {
    if (username.trim()) {
      createUser(username.trim());
      setCurrentUser(username.trim());
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md p-8 border border-neon-green">
        <h2 className="text-2xl font-black mb-4">Welcome to Science Park</h2>
        <p className="mb-6">Enter your name to start learning:</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          className="w-full p-3 bg-black border border-white text-white"
        />
        <button
          onClick={handleSubmit}
          className="w-full mt-4 p-3 bg-neon-green text-black font-black"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}
```

**C. User Switching Interface**:
```typescript
// src/components/UserSwitcher.tsx

export default function UserSwitcher() {
  const { currentUser, getUserList, switchUser } = useAppStore();
  const [showMenu, setShowMenu] = useState(false);
  const users = getUserList();
  
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 border border-white/20"
      >
        <User className="w-4 h-4" />
        {currentUser}
      </button>
      
      {showMenu && (
        <div className="absolute top-full right-0 mt-2 bg-black border border-white/20 min-w-[200px]">
          {users.map(user => (
            <button
              key={user.username}
              onClick={() => {
                switchUser(user.username);
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-white/10"
            >
              {user.username}
            </button>
          ))}
          <button
            onClick={() => {
              // Show create user dialog
            }}
            className="w-full px-4 py-2 text-left border-t border-white/10 text-neon-green"
          >
            + Add User
          </button>
        </div>
      )}
    </div>
  );
}
```

**D. Data Isolation**:
```typescript
// Modify store to scope data by user

completeStage: (moduleId, stageId) =>
  set((state) => {
    const user = state.currentUser;
    if (!user) return state;
    
    return {
      userProgress: {
        ...state.userProgress,
        [user]: {
          ...state.userProgress[user],
          [moduleId]: {
            stages: {
              ...(state.userProgress[user]?.[moduleId]?.stages || {}),
              [stageId]: true,
            },
            lastPlayed: Date.now(),
          },
        },
      },
    };
  }),
```

**E. Integration Points**:
1. Check for `currentUser` on app load
2. Show UserSetup if no user exists
3. Add UserSwitcher to header
4. Scope all progress/history by username
5. Persist to localStorage with user namespace


## Data Models

### User Profile Model
```typescript
interface UserProfile {
  username: string;
  createdAt: number;
  lastActive: number;
  avatar?: string;
}
```

### Module Metadata Model
```typescript
interface ModuleMetadata {
  code: string;
  title: string;
  curriculumLevel: 'SEK1' | 'SEK2' | 'SEK3' | 'GYM' | 'ENRICHMENT';
  baselCurriculumRef?: string;
  difficulty: 'BASIC' | 'CORE' | 'ADVANCED' | 'ELITE';
  topics: string[];
}
```

### Translation Structure
```typescript
interface TranslationEntry {
  [key: string]: string | TranslationEntry;
}

interface Translations {
  EN: TranslationEntry;
  DE: TranslationEntry;
  CN: TranslationEntry;
}
```

### Canvas Configuration
```typescript
interface CanvasConfig {
  width: number;
  height: number;
  aspectRatio: number;  // height/width for vertical orientation
  cameraPosition: [number, number, number];
  fov: number;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies:
- Properties 1.1 and 1.2 both test translation retrieval - combined into Property 1
- Properties 4.1 and 4.2 both test translation completeness - combined into Property 2
- Properties 8.1 and 8.2 are identical - combined into Property 6
- Properties 2.3 and 2.4 test the same aspect ratio concept - combined into Property 3

### Property 1: Translation Key Retrieval
*For any* module code that has a translation key in Translation_System, retrieving and displaying that module's title should return a non-empty string from the current language's translation set.

**Validates: Requirements 1.1, 1.2**

### Property 2: Translation Completeness
*For any* language selection (EN, DE, CN), all UI text elements in module components should use translation keys from Translation_System, with no hardcoded strings in other languages appearing.

**Validates: Requirements 4.1, 4.2, 4.5**

### Property 3: Vertical Layout Aspect Ratio
*For any* module that renders 3D graphics in Monitor_Area, the canvas aspect ratio (height/width) should be greater than 1.0, indicating vertical orientation.

**Validates: Requirements 2.3, 2.4**

### Property 4: Graphics Size Increase
*For any* 3D visualization canvas, the new dimensions should be at least 1.5 times the original dimensions while maintaining the original aspect ratio.

**Validates: Requirements 3.1, 3.3**

### Property 5: No Horizontal Overflow
*For any* enlarged graphics canvas, the width should not exceed the viewport width at standard screen resolutions (1920px), ensuring no horizontal scrolling occurs.

**Validates: Requirements 3.5**

### Property 6: Hochdeutsch Compliance
*For any* German translation text, the text should not contain Swiss German dialect patterns (e.g., "usrächne", "Ufgab", "Mathe") and should use standard German mathematical vocabulary.

**Validates: Requirements 8.1, 8.2, 8.4**

### Property 7: German Terminology Consistency
*For any* mathematical concept that appears in multiple modules, the German translation should use the same term consistently across all occurrences.

**Validates: Requirements 8.5**

### Property 8: Translation Fallback
*For any* translation key that does not exist in Translation_System, the system should log a warning and display the key name as fallback text.

**Validates: Requirements 4.3**

### Property 9: User Data Isolation
*For any* username in the system, completing a module should associate the learning record with that username, and switching users should show only that user's progress and history.

**Validates: Requirements 9.2, 9.3, 9.5**

### Property 10: Route Accessibility
*For all* module routes defined in the application, navigating to that route should successfully load the module page without 404 errors.

**Validates: Requirements 6.5**

### Property 11: Error Logging
*For any* routing error or module load failure, the system should log the error to the console with sufficient detail for debugging.

**Validates: Requirements 6.3, 6.4**

### Property 12: Module Metadata Completeness
*For all* modules in the system, module metadata should exist and contain curriculum level, difficulty, and topic information.

**Validates: Requirements 5.4, 5.5**

### Property 13: Existing Functionality Preservation
*For any* existing module functionality before fixes, that functionality should continue to work identically after fixes are applied.

**Validates: Requirements 10.3**


## Error Handling

### Translation Errors
- **Missing Translation Key**: Log warning, display key name as fallback
- **Invalid Language Code**: Fall back to English (EN)
- **Malformed Translation Object**: Log error, use empty string

### Routing Errors
- **404 Not Found**: Display error boundary with "Try Again" button
- **Component Load Failure**: Show loading state, retry after timeout
- **Hydration Mismatch**: Log error, force client-side re-render

### User System Errors
- **localStorage Unavailable**: Show warning, operate in memory-only mode
- **Corrupted User Data**: Reset to default state, log error
- **Invalid Username**: Reject empty/whitespace-only names

### Canvas Rendering Errors
- **WebGL Not Supported**: Display fallback 2D visualization
- **Canvas Initialization Failure**: Show error message with browser requirements
- **Memory Overflow**: Reduce quality settings, log warning

### Curriculum Validation Errors
- **Missing Metadata**: Log warning, mark as "UNCATEGORIZED"
- **Invalid Curriculum Level**: Default to "ENRICHMENT"


## Testing Strategy

### Dual Testing Approach

This project requires both **unit tests** and **property-based tests** to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs
- Both are complementary and necessary for comprehensive coverage

### Unit Testing Focus

Unit tests should focus on:
- **Specific examples**: SM2.07, SM3.02, SM3.04 title display (Requirement 1.3)
- **Module-specific fixes**: SM2.02, SM2.01, SM3.02 vertical layout (Requirement 2.4)
- **Basel localization examples**: Specific references in geometry, chemistry, physics (Requirements 7.1-7.4)
- **User flow examples**: First visit prompt, user switching UI (Requirements 9.1, 9.4)
- **Curriculum decisions**: SM1.02 placement (Requirements 5.2, 5.3)
- **Routing stability**: SM2.01 route loading (Requirement 6.1)
- **Edge cases**: Empty username, missing translation keys, WebGL unavailable

### Property-Based Testing Configuration

- **Library**: Use `fast-check` for TypeScript/JavaScript property-based testing
- **Minimum Iterations**: 100 runs per property test
- **Tag Format**: `// Feature: science-park-fixes, Property {number}: {property_text}`
- **Each correctness property MUST be implemented by a SINGLE property-based test**

### Property Test Implementation

**Property 1: Translation Key Retrieval**
```typescript
// Feature: science-park-fixes, Property 1: Translation Key Retrieval
test('translation keys return non-empty strings', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('EN', 'DE', 'CN'),
      fc.constantFrom('sm1-01', 'sm2-07', 'sm3-02', 'sm3-04'),
      (lang, moduleCode) => {
        const title = getModuleTitle(moduleCode, lang);
        return title.length > 0;
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 2: Translation Completeness**
```typescript
// Feature: science-park-fixes, Property 2: Translation Completeness
test('no hardcoded strings in other languages', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('EN', 'DE', 'CN'),
      fc.constantFrom(...allModuleComponents),
      (selectedLang, component) => {
        const renderedText = renderComponent(component, selectedLang);
        const otherLangs = ['EN', 'DE', 'CN'].filter(l => l !== selectedLang);
        return !containsTextFromLanguages(renderedText, otherLangs);
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 3: Vertical Layout Aspect Ratio**
```typescript
// Feature: science-park-fixes, Property 3: Vertical Layout Aspect Ratio
test('3D graphics use vertical aspect ratio', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('sm2-02', 'sm2-01', 'sm3-02'),
      (moduleCode) => {
        const canvas = getModuleCanvas(moduleCode);
        const aspectRatio = canvas.height / canvas.width;
        return aspectRatio > 1.0;
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 6: Hochdeutsch Compliance**
```typescript
// Feature: science-park-fixes, Property 6: Hochdeutsch Compliance
test('German translations use Hochdeutsch', () => {
  const swissDialectPatterns = [/\busrächne\b/, /\bUfgab\b/, /\bMathe\b/];
  
  fc.assert(
    fc.property(
      fc.constantFrom(...allGermanTranslationKeys),
      (key) => {
        const text = getGermanTranslation(key);
        return !swissDialectPatterns.some(pattern => pattern.test(text));
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 9: User Data Isolation**
```typescript
// Feature: science-park-fixes, Property 9: User Data Isolation
test('user progress is isolated per username', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 20 }),
      fc.string({ minLength: 1, maxLength: 20 }),
      fc.constantFrom(...allModuleCodes),
      (user1, user2, moduleCode) => {
        fc.pre(user1 !== user2); // Ensure different users
        
        // User 1 completes module
        switchUser(user1);
        completeModule(moduleCode);
        const user1Progress = getProgress(moduleCode);
        
        // User 2 should have no progress
        switchUser(user2);
        const user2Progress = getProgress(moduleCode);
        
        return user1Progress > 0 && user2Progress === 0;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

- Test complete user flows: first visit → username setup → module completion → user switch
- Test language switching across multiple modules
- Test routing for all 53 modules
- Test canvas rendering in different viewport sizes

### Manual Testing Checklist

Week 1 Fixes:
- [ ] Verify SM2.07, SM3.02, SM3.04 titles display correctly
- [ ] Verify SM2.02, SM2.01, SM3.02 use vertical layout
- [ ] Verify graphics are 50%+ larger and details visible
- [ ] Verify SM2.01 loads consistently without 404 errors
- [ ] Verify SM1.02 curriculum alignment decision

Week 2-3 Enhancements:
- [ ] Audit all modules for hardcoded English text
- [ ] Verify Basel references in geometry, chemistry, physics modules
- [ ] Test user system: create user, switch users, verify data isolation
- [ ] Review all German translations for Hochdeutsch compliance
- [ ] Verify curriculum metadata for all modules

### Regression Testing

- Run existing test suite after each fix
- Verify no existing functionality broken
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test on mobile devices (responsive design)
- Verify Vercel deployment succeeds

