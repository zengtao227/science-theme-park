# S2.02 (Pythagoras & Roots) - The Final Boss Refactoring Strategy

**Current Status**: 1,252 lines  
**Target**: <400 lines (excluding data pool)  
**Complexity**: Highest - Multi-tab structure (PYTHAGORAS vs SQRT)

---

## ✅ COMPLETED EXTRACTIONS

### 1. Canvas Components → `src/components/chamber/S202_PythagorasCanvas.tsx` (253 lines)
- ✅ `TriangleCanvas` - Right triangle visualization
- ✅ `SpaceCanvas` - 3D box diagonal visualization
- ✅ `DistanceCanvas` - Coordinate plane distance visualization
- ✅ Unified interface with `visual.kind` switch

### 2. Input Component → `src/components/chamber/S202_RadicalInput.tsx` (48 lines)
- ✅ `RadicalSlotInput` - k√m format input with neon styling
- ✅ Exported `Radical` interface

---

## 📋 REFACTORING BLUEPRINT

### Phase 1: Type Definitions
```typescript
type Stage = "PYTHAGORAS" | "SQRT";
type SubStage = "TRIANGLE" | "SPACE" | "DISTANCE" | "SIMPLIFY" | "OPERATIONS";

interface S202Quest extends Quest {
  stage: Stage;
  subStage: SubStage;
  visual?: {
    kind: "triangle" | "space" | "distance";
    a?: number;
    b?: number;
    c?: number;
    highlightRightAngle?: boolean;
    p1?: { x: number; y: number };
    p2?: { x: number; y: number };
  };
  radicalSlots?: boolean; // Use RadicalSlotInput instead of regular inputs
}
```

### Phase 2: Build Pool Simplification
The current `buildStagePool` is ~600 lines. Structure:
```typescript
function buildStagePool(t, difficulty, stage: Stage, subStage: SubStage): S202Quest[] {
  if (stage === "PYTHAGORAS") {
    if (subStage === "TRIANGLE") return [...]; // ~100 lines
    if (subStage === "SPACE") return [...];    // ~100 lines
    if (subStage === "DISTANCE") return [...]; // ~100 lines
  }
  
  if (stage === "SQRT") {
    if (subStage === "SIMPLIFY") return [...]; // ~150 lines
    if (subStage === "OPERATIONS") return [...]; // ~150 lines
  }
  
  return [];
}
```

### Phase 3: Main Component Structure
```typescript
export default function S202Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].s2_02;

  const [stage, setStage] = useState<Stage>("PYTHAGORAS");
  const [subStage, setSubStage] = useState<SubStage>("TRIANGLE");

  const {
    difficulty,
    inputs,
    lastCheck,
    currentQuest,
    setInputs,
    verify,
    next,
    handleDifficultyChange,
  } = useQuestManager<S202Quest, Stage>({
    buildPool: (d, s) => buildStagePool(t, d, s, subStage),
    initialStage: stage,
  });

  // Stage tabs: PYTHAGORAS | SQRT
  const mainStages = [
    { id: "PYTHAGORAS", label: t.tabs.pythagoras },
    { id: "SQRT", label: t.tabs.sqrt },
  ];

  // Sub-stage tabs (conditional based on main stage)
  const subStages = stage === "PYTHAGORAS"
    ? [
        { id: "TRIANGLE", label: t.subtabs.triangle },
        { id: "SPACE", label: t.subtabs.space },
        { id: "DISTANCE", label: t.subtabs.distance },
      ]
    : [
        { id: "SIMPLIFY", label: t.subtabs.simplify },
        { id: "OPERATIONS", label: t.subtabs.operations },
      ];

  return (
    <ChamberLayout
      title={t.title}
      moduleCode="S2.02"
      difficulty={difficulty}
      onDifficultyChange={handleDifficultyChange}
      stages={mainStages}
      currentStage={stage}
      onStageChange={(s) => {
        setStage(s as Stage);
        setSubStage(s === "PYTHAGORAS" ? "TRIANGLE" : "SIMPLIFY");
      }}
      checkStatus={lastCheck}
      translations={{...}}
      monitorContent={
        <>
          {currentQuest.visual && (
            <S202PythagorasCanvas visual={currentQuest.visual} />
          )}
          {/* Hints and formulas */}
        </>
      }
    >
      {/* Sub-stage tabs */}
      <div className="flex gap-2 justify-center mb-8">
        {subStages.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSubStage(sub.id as SubStage)}
            className={clsx(
              "px-4 py-2 border",
              subStage === sub.id ? "border-white bg-white text-black" : "border-white/30"
            )}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* Quest content */}
      <div className="space-y-6">
        <div className="text-center">
          <h3>{t.objective_title}</h3>
          <InlineMath math={currentQuest.promptLatex} />
        </div>

        <div className="p-8 bg-white/[0.03] border border-white/20 rounded-2xl">
          <InlineMath math={currentQuest.expressionLatex} />
        </div>

        {/* Input section */}
        {currentQuest.radicalSlots ? (
          <RadicalSlotInput
            value={inputs.radical || { k: 0, m: 0 }}
            onChange={(v) => setInputs({ ...inputs, radical: v })}
            labelK="k"
            labelM="m"
          />
        ) : (
          <div className="grid gap-4">
            {currentQuest.slots.map((slot) => (
              <input
                key={slot.id}
                value={inputs[slot.id] || ""}
                onChange={(e) => setInputs({ ...inputs, [slot.id]: e.target.value })}
                placeholder={slot.placeholder}
              />
            ))}
          </div>
        )}
      </div>
    </ChamberLayout>
  );
}
```

---

## 🎯 KEY CHALLENGES & SOLUTIONS

### Challenge 1: Dual Tab System
**Problem**: S2.02 has both main tabs (PYTHAGORAS/SQRT) and sub-tabs (TRIANGLE/SPACE/etc.)  
**Solution**: Use two separate state variables (`stage` and `subStage`) and conditional rendering

### Challenge 2: Radical Input Format
**Problem**: SQRT stage uses k√m format instead of regular numeric inputs  
**Solution**: Use `radicalSlots` flag in quest type + extracted `RadicalSlotInput` component

### Challenge 3: Multiple Visual Types
**Problem**: Different quest types need different canvas visualizations  
**Solution**: Unified `S202PythagorasCanvas` with `visual.kind` switch

### Challenge 4: Complex Validation
**Problem**: SQRT stage needs to validate k√m format, not just numbers  
**Solution**: Custom validation in `useQuestManager` or quest-specific verify function

---

## 📊 EXPECTED RESULTS

### Before Refactoring
- **Total**: 1,252 lines
- **Structure**: Monolithic single file
- **UI**: Manual Header/Footer/Aside/Buttons
- **Canvas**: Inline components (300+ lines)
- **Input**: Inline RadicalSlotInput (50+ lines)

### After Refactoring
- **Page**: ~350 lines (types + buildPool + main component)
- **Canvas**: 253 lines (extracted)
- **Input**: 48 lines (extracted)
- **Total**: ~651 lines across 3 files
- **Reduction**: 48% (601 lines removed)
- **Structure**: Modular, maintainable, V2.1 compliant

---

## ✅ COMPLETION CHECKLIST

- [x] Extract TriangleCanvas
- [x] Extract SpaceCanvas
- [x] Extract DistanceCanvas
- [x] Extract RadicalSlotInput
- [x] Create unified S202PythagorasCanvas
- [ ] Define S202Quest interface
- [ ] Refactor buildStagePool (preserve all quest data)
- [ ] Integrate useQuestManager
- [ ] Implement dual tab system
- [ ] Wire up ChamberLayout
- [ ] Handle radical input validation
- [ ] Test all quest types
- [ ] Verify build passes

---

## 🚀 NEXT STEPS

1. **Read full S2.02 structure** to understand all quest types
2. **Map quest data** to new S202Quest interface
3. **Refactor buildStagePool** with proper typing
4. **Implement main component** with dual tabs
5. **Test each sub-stage** individually
6. **Verify all visualizations** render correctly
7. **Run full build** and fix any TypeScript errors

---

**Status**: Components extracted, blueprint complete, ready for implementation  
**Estimated Time**: 2-3 hours for full refactoring  
**Risk Level**: Medium (complex tab logic, radical input validation)
