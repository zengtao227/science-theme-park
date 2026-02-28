#!/bin/bash
echo "=== 审计 1：promptLatex 未走 renderMixedText ==="
# 豁免：sc2-01 使用 BlockMath 渲染纯公式 promptLatex
find src/app/chamber -name "page.tsx" | while read -r f; do
  grep -q "promptLatex" "$f" && ! grep -q "renderMixedText" "$f" && basename "$(dirname "$f")"
done | grep -v "^sc2-01$" | sort -u

echo "=== 审计 2：\\text{} 包裹 t() 调用（仅 promptLatex）==="
grep -rn "promptLatex.*\\\\text{\${t(" src/app/chamber --include="*.tsx"

echo "=== 审计 3：expressionLatex 四反斜杠 ==="
find src/app/chamber -name "page.tsx" | while read -r f; do
  rg -q 'expressionLatex:\s*`[^`]*\\\\\\\\[a-zA-Z]' "$f" && basename "$(dirname "$f")"
done | sort -u

echo "=== 审计 6：本地 IIFE 剥皮逻辑残留 ==="
grep -rln "replace.*\\\\\\\\+text\|startsWith.*\\\\text" \
  src/app/chamber --include="*.tsx" | \
  xargs -I{} dirname {} | xargs -I{} basename {} | sort -u

echo "=== 审计 7：InlineMath 直接渲染 promptLatex ==="
grep -rn "InlineMath.*promptLatex\|BlockMath.*promptLatex" \
  src/app/chamber --include="*.tsx" | grep -v "sc2-01\|sc2-05\|gb3-02\|sc3-05\|gb2-01"

echo "=== 审计 4：validate translations ==="
npm run validate:translations

echo "=== 审计 5：组件硬编码英文文本 ==="
rg -n '>\s*"[A-Z][^"]*"\s*<|\{"\s*[A-Z][^"]*"\s*\}' \
  src/components/chamber --glob '*.tsx' \
  | rg -v '^\s*//' | rg -v '\?\?|\|\|' \
  | rg -v 'translations\?|labels\?|props\.' \
  | cut -d: -f1 | sort -u

# ── 新增规则 E1：hintLatex / labelLatex 四反斜杠检测 ──
echo "=== E1: hintLatex/labelLatex four-backslash check ==="
E1=$(rg -n '(hintLatex|labelLatex).*\\\\\\\\' src/app/chamber --glob '*.tsx' \
  | grep -v 't("sm' \
  | grep -v 'sm2-10')
if [ -z "$E1" ]; then
  echo "  OK – no violations"
else
  echo "$E1"
  FAIL=1
fi

# ── 新增规则 E2：公式字段非 i18n 英文 \text 检测 ──
echo "=== E2: hardcoded \\text{English} in formula fields ==="
# 阶段性降噪策略（E2）：
# A类（已评审可豁免的科学/数学固定术语模块）从 E2 输出中过滤：
#   sm2-10, sm3-05, gb1-01, gb3-02, sc3-05, gp3-01, sc2-06, em1-01, sc2-01
# C类（归 E3/F1 渲染链批次，暂不在 E2 统计）过滤：
#   sc2-05, sp3-05, gp2-01, gp2-02, sm2-03, gp3-03, sc3-04, sp3-01
# B类（下一批 i18n 处理）保留在 E2 输出中。
E2=$(rg -n '(expressionLatex|correctLatex|labelLatex|hintLatex).*\\\\text\{[A-Z][a-z]' \
  src/app/chamber --glob '*.tsx' \
  | grep -v 't("sm' \
  | grep -v '/sm2-10/' \
  | grep -v '/sm3-05/' \
  | grep -v '/gb1-01/' \
  | grep -v '/gb3-02/' \
  | grep -v '/sc3-05/' \
  | grep -v '/gp3-01/' \
  | grep -v '/sc2-06/' \
  | grep -v '/em1-01/' \
  | grep -v '/sc2-01/' \
  | grep -v '/sc2-05/' \
  | grep -v '/sp3-05/' \
  | grep -v '/gp2-01/' \
  | grep -v '/gp2-02/' \
  | grep -v '/sm2-03/' \
  | grep -v '/gp3-03/' \
  | grep -v '/sc3-04/' \
  | grep -v '/sp3-01/')
if [ -z "$E2" ]; then
  echo "  OK – no violations"
else
  echo "$E2"
  FAIL=1
fi
