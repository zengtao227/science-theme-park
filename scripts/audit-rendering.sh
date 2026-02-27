#!/bin/bash

echo "=== 审计 1：promptLatex 未走 renderMixedText ==="
find src/app/chamber -name "page.tsx" | while read f; do
  grep -q "promptLatex" "$f" && ! grep -q "renderMixedText" "$f" && basename "$(dirname "$f")"
done

echo "=== 审计 2：\\text{} 包裹 t() 调用 ==="
grep -rn "\\\\\\\\text{\${t(" src/app/chamber --include="*.tsx"

echo "=== 审计 3：expressionLatex 四反斜杠 ==="
find src/app/chamber -name "page.tsx" | while read f; do
  grep -q "expressionLatex.*\\\\\\\\" "$f" && basename "$(dirname "$f")"
done

echo "=== 审计 4：validate translations ==="
npm run validate:translations

echo "=== 审计 5：组件硬编码英文文本（JSX 直接渲染）==="
rg -n ">\s*\"[A-Z][^\"]*\"\s*<|>\s*'[^']*'\s*<" \
  src/components/chamber --glob '*.tsx' \
  | rg -v '^\s*//' \
  | rg -v '\?\?|\|\|' \
  | rg -v 'translations\?|labels\?|props\.' \
  | cut -d: -f1 | sort -u
