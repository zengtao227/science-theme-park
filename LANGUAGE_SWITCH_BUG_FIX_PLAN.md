# 语言切换 Bug 修复方案

## 🐛 问题根源

**错误模式**：
```typescript
const buildStagePool = useCallback((difficulty, stage) => {
  return [{ scenario: t("key"), context: t("key2") }];
}, []); // ❌ 空依赖数组
```

**正确模式**：
```typescript
const sm1_03_t = {
  scenarios: { number_line: t("sm1_03.scenarios.number_line") },
  problems: { nl_identify_neg3: t("sm1_03.problems.nl_identify_neg3") }
};

const buildStagePool = useCallback((tObj, difficulty, stage) => {
  return [{ scenario: tObj.scenarios.number_line }];
}, []);

const buildPool = useCallback(
  (d, s) => buildStagePool(sm1_03_t, d, s),
  [sm1_03_t] // ✅ 依赖翻译对象
);
```

## 📋 修复步骤

1. 创建翻译对象（如 `sm1_03_t`）
2. 修改 `buildStagePool` 接受翻译对象参数
3. 替换所有 `t()` 调用为 `tObj.`
4. 更新 `buildPool` 依赖数组为 `[翻译对象]`
5. 测试语言切换
6. 运行 `npm run build` 验证
7. 提交更改
