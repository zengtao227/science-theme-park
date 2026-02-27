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
