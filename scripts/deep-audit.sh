#!/bin/bash
# 模块深度审查脚本 v2 — 修复了 Record 模式检测、else-if 检测等问题
# 使用方法: bash scripts/deep-audit.sh
# 改进: 检测 Record<Stage, Record<Difficulty>> 模式、精确题目计数、i18n 模式检查

echo "================================================================"
echo "  Science Theme Park — Module Deep Audit v2"
echo "  $(date)"
echo "================================================================"
echo ""

# Part 1: 每个模块的题目生成模式 + 题目数量
echo "### Part 1: 模块题目完整性分析"
echo ""
printf "%-28s %5s %-18s %4s %4s %4s %4s %s\n" "MODULE" "LINES" "PATTERN" "B" "C" "A" "E" "STATUS"
echo "-----------------------------------------------------------------------------------------------------"

for f in src/app/chamber/*/page.tsx; do
    mod=$(basename $(dirname "$f"))
    lines=$(wc -l < "$f" | tr -d ' ')
    
    has_qm=$(grep -c 'useQuestManager' "$f")
    has_cl=$(grep -c 'ChamberLayout' "$f")
    
    # Detect quest generation patterns
    push_count=$(grep -c 'quests\.push' "$f")
    record_pattern=$(grep -c 'Record<.*Stage.*Record<.*Difficulty\|Record<.*Difficulty.*Quest' "$f")
    slice_pattern=$(grep -c '\.slice(' "$f")
    elseif_pattern=$(grep -c 'else if.*isCore\|else if.*isAdv\|else if.*difficulty\|} else {' "$f")
    switch_pattern=$(grep -c 'case "BASIC"\|case "CORE"\|case "ADVANCED"\|case "ELITE"' "$f")
    foreach_pattern=$(grep -c '\.forEach\|\.map(' "$f")
    
    # Count quest IDs per difficulty (multiple patterns)
    # Pattern 1: Literal ID strings like "B1", "NL_B1", "D-B1"
    b_ids=$(grep -oE '"[A-Z_]*B[0-9]+"' "$f" | wc -l | tr -d ' ')
    c_ids=$(grep -oE '"[A-Z_]*C[0-9]+"' "$f" | wc -l | tr -d ' ')
    a_ids=$(grep -oE '"[A-Z_]*A[0-9]+"' "$f" | wc -l | tr -d ' ')
    e_ids=$(grep -oE '"[A-Z_]*E[0-9]+"' "$f" | wc -l | tr -d ' ')
    
    # Pattern 2: Count items inside BASIC: [...], CORE: [...] blocks
    b_block=$(grep -A 50 'BASIC:' "$f" 2>/dev/null | grep -c 'id:' 2>/dev/null)
    c_block=$(grep -A 50 'CORE:' "$f" 2>/dev/null | grep -c 'id:' 2>/dev/null)
    a_block=$(grep -A 50 'ADVANCED:' "$f" 2>/dev/null | grep -c 'id:' 2>/dev/null)
    e_block=$(grep -A 50 'ELITE:' "$f" 2>/dev/null | grep -c 'id:' 2>/dev/null)
    
    # Use the higher count
    b_count=$((b_ids > b_block ? b_ids : b_block))
    c_count=$((c_ids > c_block ? c_ids : c_block))
    a_count=$((a_ids > a_block ? a_ids : a_block))
    e_count=$((e_ids > e_block ? e_ids : e_block))
    
    # Determine pattern
    if [ "$has_qm" -eq 0 ] && [ "$has_cl" -eq 0 ]; then
        pattern="SANDBOX"
    elif [ "$has_qm" -eq 0 ]; then
        pattern="LAYOUT-ONLY"
    elif [ "$record_pattern" -gt 0 ]; then
        pattern="RECORD<D,Q[]>"
    elif [ "$switch_pattern" -ge 4 ]; then
        pattern="SWITCH(difficulty)"
    elif [ "$push_count" -ge 20 ]; then
        pattern="PUSH(many)"
    elif [ "$elseif_pattern" -ge 3 ]; then
        pattern="ELSE-IF-CHAIN"
    elif [ "$slice_pattern" -ge 2 ]; then
        pattern="SLICE"
    elif [ "$push_count" -ge 1 ]; then
        pattern="PUSH(few)"
    elif [ "$foreach_pattern" -ge 2 ]; then
        pattern="DYNAMIC"
    else
        pattern="UNKNOWN"
    fi
    
    # Determine status
    total=$((b_count + c_count + a_count + e_count))
    if [ "$pattern" = "SANDBOX" ] || [ "$pattern" = "LAYOUT-ONLY" ]; then
        status="📋 N/A"
    elif [ "$record_pattern" -gt 0 ] && [ "$total" -ge 40 ]; then
        status="✅ FULL(Record)"
    elif [ "$total" -ge 40 ]; then
        status="✅ FULL"
    elif [ "$total" -ge 15 ]; then
        status="⚠️ PARTIAL"
    elif [ "$elseif_pattern" -ge 3 ] || [ "$push_count" -ge 4 ]; then
        status="❓ VERIFY"
    elif [ "$total" -le 5 ] && [ "$has_qm" -gt 0 ]; then
        status="🔴 SPARSE"
    else
        status="🔴 EMPTY"
    fi
    
    printf "%-28s %5s %-18s %4s %4s %4s %4s %s\n" "$mod" "$lines" "$pattern" "$b_count" "$c_count" "$a_count" "$e_count" "$status"
done

echo ""
echo ""

# Part 2: i18n 模式检查
echo "### Part 2: i18n 模式检查"
echo ""
printf "%-28s %-20s %s\n" "MODULE" "I18N_PATTERN" "STATUS"
echo "---------------------------------------------------------------------"

old_count=0
new_count=0
for f in src/app/chamber/*/page.tsx; do
    mod=$(basename $(dirname "$f"))
    uses_new=$(grep -c 'useLanguage' "$f")
    uses_old=$(grep -c 'translations\[' "$f")
    
    if [ "$uses_new" -gt 0 ]; then
        pattern="useLanguage() ✅"
        new_count=$((new_count + 1))
    elif [ "$uses_old" -gt 0 ]; then
        pattern="translations[] ❌"
        old_count=$((old_count + 1))
    else
        pattern="NONE/other"
    fi
    
    printf "%-28s %-20s\n" "$mod" "$pattern"
done
echo ""
echo "Summary: $new_count modules use new pattern, $old_count use old pattern"

echo ""
echo ""

# Part 3: LaTeX 使用检查
echo "### Part 3: LaTeX 使用检查"
echo ""
printf "%-28s %6s %6s %s\n" "MODULE" "Inline" "Block" "STATUS"
echo "---------------------------------------------------------------------"

for f in src/app/chamber/*/page.tsx; do
    mod=$(basename $(dirname "$f"))
    inline=$(grep -c 'InlineMath' "$f")
    block=$(grep -c 'BlockMath' "$f")
    total=$((inline + block))
    
    if [ "$total" -ge 5 ]; then
        status="✅ GOOD"
    elif [ "$total" -ge 1 ]; then
        status="⚠️ PARTIAL"
    else
        status="🔴 NONE"
    fi
    
    printf "%-28s %6s %6s %s\n" "$mod" "$inline" "$block" "$status"
done

echo ""
echo ""

# Part 4: 首页链接
echo "### Part 4: 首页模块链接审查"
echo ""
echo "=== 存在于 chamber/ 但不在主页 ==="
for dir in src/app/chamber/*/; do
    mod=$(basename "$dir")
    [ ! -f "$dir/page.tsx" ] && continue
    if ! grep -q "/$mod\"" src/app/page.tsx 2>/dev/null; then
        echo "  ⚠️ $mod"
    fi
done

echo ""
echo ""

# Part 5: 可视化组件检查
echo "### Part 5: 可视化组件存在性"
echo ""
for f in src/app/chamber/*/page.tsx; do
    mod=$(basename $(dirname "$f"))
    has_qm=$(grep -c 'useQuestManager' "$f")
    [ "$has_qm" -eq 0 ] && continue
    
    viz=$(ls src/components/chamber/$mod/*Visualization*.tsx 2>/dev/null | wc -l | tr -d ' ')
    canvas=$(ls src/components/chamber/$mod/*Canvas*.tsx 2>/dev/null | wc -l | tr -d ' ')
    sim=$(ls src/components/chamber/$mod/*Sim*.tsx 2>/dev/null | wc -l | tr -d ' ')
    total_viz=$((viz + canvas + sim))
    
    if [ "$total_viz" -eq 0 ]; then
        echo "  🔴 $mod: 没有独立可视化组件"
    fi
done

echo ""
echo "================================================================"
echo "  审查完成"
echo "================================================================"
