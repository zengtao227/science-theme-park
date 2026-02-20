#!/bin/bash
# LaTeX Anti-Pattern Auto-Fixer
# Usage: bash scripts/fix-latex.sh
# This script fixes the most common LaTeX rendering issues across all chamber modules.

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHAMBER_DIR="$PROJECT_ROOT/src/app/chamber"

echo "================================================================"
echo "  Science Theme Park — LaTeX Auto-Fixer"
echo "  $(date)"
echo "================================================================"
echo ""

# Track changes
TOTAL_FIXES=0

# -------------------------------------------------------------------
# Fix 1: unit: "\\text{m}^2" -> unit: "\\\\text{m}^2" (double backslash fix)
# Only fix cases where there's exactly one backslash before text (i.e. \\text but not \\\\text)
# In the file, \\text appears as \text (2 chars), \\\\text appears as \\text (4 chars)
# -------------------------------------------------------------------
echo "### Fix 1: Fixing under-escaped \\text in unit fields..."
FIX1_COUNT=0

for f in "$CHAMBER_DIR"/*/page.tsx; do
    # Count matches before fix
    before=$(grep -c 'unit: "\\text{' "$f" 2>/dev/null || echo 0)
    if [ "$before" -gt 0 ]; then
        # Replace \text with \\text in unit fields only
        # This targets: unit: "\text{m}^2" -> unit: "\\text{m}^2"  
        sed -i '' 's/unit: "\\text{/unit: "\\\\text{/g' "$f"
        after=$(grep -c 'unit: "\\text{' "$f" 2>/dev/null || echo 0)
        fixed=$((before - after))
        if [ "$fixed" -gt 0 ]; then
            echo "  ✅ $(basename $(dirname "$f")): Fixed $fixed unit escaping issues"
            FIX1_COUNT=$((FIX1_COUNT + fixed))
        fi
    fi
done

# Also fix in lib/ quest files
for f in "$PROJECT_ROOT"/src/lib/*/quests.ts; do
    [ ! -f "$f" ] && continue
    before=$(grep -c 'unit: "\\text{' "$f" 2>/dev/null || echo 0)
    if [ "$before" -gt 0 ]; then
        sed -i '' 's/unit: "\\text{/unit: "\\\\text{/g' "$f"
        after=$(grep -c 'unit: "\\text{' "$f" 2>/dev/null || echo 0)
        fixed=$((before - after))
        if [ "$fixed" -gt 0 ]; then
            mod=$(basename $(dirname "$f"))
            echo "  ✅ lib/$mod: Fixed $fixed unit escaping issues"
            FIX1_COUNT=$((FIX1_COUNT + fixed))
        fi
    fi
done

echo "  Total Fix 1: $FIX1_COUNT fixes"
TOTAL_FIXES=$((TOTAL_FIXES + FIX1_COUNT))
echo ""

# -------------------------------------------------------------------
# Fix 2: x^2 -> x^{2} in LaTeX string contexts
# Target: strings that look like LaTeX (containing \\ or Latex in key name)
# Be careful NOT to touch JS runtime code like Math.pow or variable names
# -------------------------------------------------------------------
echo "### Fix 2: Fixing bare x^2 -> x^{2} in LaTeX strings..."
FIX2_COUNT=0

for f in "$CHAMBER_DIR"/*/page.tsx "$PROJECT_ROOT"/src/lib/*/quests.ts "$PROJECT_ROOT"/src/components/chamber/*/QuadraticCanvas.tsx "$PROJECT_ROOT"/src/components/chamber/*/BinomialSquare2D.tsx; do
    [ ! -f "$f" ] && continue
    
    before=$(grep -c '\^2[^}]' "$f" 2>/dev/null || echo 0)
    
    if [ "$before" -gt 0 ]; then
        # Fix common patterns: x^2, a^2, b^2, r^2, y^2, n^2, v^2 -> x^{2} etc.
        # Only when followed by non-brace char (space, comma, +, -, ), \, end of string, etc.)
        # Avoid Math.pow, ** patterns  
        sed -i '' -E '
            /Math\./!{
                /\*\*/!{
                    s/\^2([^}0-9{])/^{2}\1/g
                    s/\^2$/^{2}/g
                    s/\^2"/^{2}"/g
                    s/\^2'"'"'/^{2}'"'"'/g
                    s/\^2`/^{2}`/g
                    s/\^2\)/^{2})/g
                    s/\^2\]/^{2}]/g
                }
            }
        ' "$f"
        
        after=$(grep -c '\^2[^}]' "$f" 2>/dev/null || echo 0)
        fixed=$((before - after))
        if [ "$fixed" -gt 0 ]; then
            mod=$(basename $(dirname "$f"))
            echo "  ✅ $mod: Fixed $fixed bare ^2 issues"
            FIX2_COUNT=$((FIX2_COUNT + fixed))
        fi
    fi
done

echo "  Total Fix 2: $FIX2_COUNT fixes"
TOTAL_FIXES=$((TOTAL_FIXES + FIX2_COUNT))
echo ""

# -------------------------------------------------------------------
# Fix 3: ^3 -> ^{3} in LaTeX strings (same pattern as Fix 2)
# -------------------------------------------------------------------
echo "### Fix 3: Fixing bare ^3 -> ^{3}..."
FIX3_COUNT=0

for f in "$CHAMBER_DIR"/*/page.tsx "$PROJECT_ROOT"/src/lib/*/quests.ts; do
    [ ! -f "$f" ] && continue
    
    before=$(grep -c '\^3[^}]' "$f" 2>/dev/null || echo 0)
    
    if [ "$before" -gt 0 ]; then
        sed -i '' -E '
            /Math\./!{
                /\*\*/!{
                    s/\^3([^}0-9{])/^{3}\1/g
                    s/\^3$/^{3}/g
                    s/\^3"/^{3}"/g
                    s/\^3'"'"'/^{3}'"'"'/g
                    s/\^3`/^{3}`/g
                    s/\^3\)/^{3})/g
                }
            }
        ' "$f"
        
        after=$(grep -c '\^3[^}]' "$f" 2>/dev/null || echo 0)
        fixed=$((before - after))
        if [ "$fixed" -gt 0 ]; then
            mod=$(basename $(dirname "$f"))
            echo "  ✅ $mod: Fixed $fixed bare ^3 issues"
            FIX3_COUNT=$((FIX3_COUNT + fixed))
        fi
    fi
done

echo "  Total Fix 3: $FIX3_COUNT fixes"
TOTAL_FIXES=$((TOTAL_FIXES + FIX3_COUNT))
echo ""

# -------------------------------------------------------------------
# Fix 4: "sqrt(2)*1000" in correctLatex -> "\\sqrt{2} \\cdot 1000"
# -------------------------------------------------------------------
echo "### Fix 4: Fixing bare sqrt() in LaTeX strings..."
FIX4_COUNT=0

for f in "$CHAMBER_DIR"/*/page.tsx "$PROJECT_ROOT"/src/lib/*/quests.ts; do
    [ ! -f "$f" ] && continue
    
    before=$(grep -c 'sqrt(' "$f" 2>/dev/null || echo 0)
    mathsqrt=$(grep -c 'Math.sqrt(' "$f" 2>/dev/null || echo 0)
    latex_sqrt=$(grep -c '\\sqrt{' "$f" 2>/dev/null || echo 0)
    bare=$((before - mathsqrt - latex_sqrt))
    
    if [ "$bare" -gt 0 ]; then
        # Fix: sqrt(X) -> \\sqrt{X} when not preceded by Math. or \\
        sed -i '' -E '/Math\./!s/([^\\])sqrt\(([^)]+)\)/\1\\\\sqrt{\2}/g' "$f"
        echo "  ✅ $(basename $(dirname "$f")): Fixed bare sqrt patterns"
        FIX4_COUNT=$((FIX4_COUNT + bare))
    fi
done

echo "  Total Fix 4: $FIX4_COUNT fixes"
TOTAL_FIXES=$((TOTAL_FIXES + FIX4_COUNT))
echo ""

echo "================================================================"
echo "  Total fixes applied: $TOTAL_FIXES"
echo "================================================================"
