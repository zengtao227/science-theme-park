#!/bin/bash

echo "=== 审计 1：promptLatex 未走 renderMixedText ==="
# 豁免：sc2-01 使用 BlockMath 渲染纯公式 promptLatex，是合理用法
find src/app/chamber -name "page.tsx" | while read f; do
  grep -q "promptLatex" "$f" && ! grep -q "renderMixedText" "$f" && basename "$(dirname "$f")"
done

echo "=== 审计 2：promptLatex 中 \\text{} 包裹 t() 调用 ==="
# 豁免：expressionLatex/targetLatex/correctLatex 字段走 InlineMath，
#      \\text{${t(...)}} 是合法 KaTeX 用法，审计 2 仅检查 promptLatex。
grep -rn "promptLatex: .*\\\\\\\\text{\${t(" src/app/chamber --include="*.tsx"

echo "=== 审计 3：expressionLatex 真正四反斜杠问题 ==="
find src/app/chamber -name "page.tsx" | while read -r f; do
  rg -q 'expressionLatex:\s*`[^`]*\\\\\\\\[a-zA-Z]' "$f" && basename "$(dirname "$f")"
done | sort -u

echo "=== 审计 4：validate translations ==="
npm run validate:translations

echo "=== 审计 5：组件硬编码英文文本（JSX 直接渲染）==="
rg -n ">\s*\"[A-Z][^\"]*\"\s*<|>\s*'[^']*'\s*<" \
  src/components/chamber --glob '*.tsx' \
  | rg -v '^\s*//' \
  | rg -v '\?\?|\|\|' \
  | rg -v 'translations\?|labels\?|props\.' \
  | cut -d: -f1 | sort -u
