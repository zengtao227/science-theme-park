# Mission T-CleanupB - Final Warnings Cleanup (Module Set B)

## 任务概述
Phase 3 审计后的最终清理任务。需要清理 25 个 lint warnings，涉及化学、生物和物理电路模块。

## 当前状态
- **Lint 结果**: 0 errors, 32 warnings (项目整体)
- **你负责的 warnings**: 25 个
- **任务日期**: 2026-02-06

---

## 需要修复的文件列表

### 📁 页面文件 (Page Files)

#### 1. `src/app/chamber/sb1-01-metabolic/page.tsx`
- **行号**: 13
- **问题**: `'t' is assigned a value but never used`
- **说明**: 可能是 i18n 的翻译函数 `t`，如果页面没有使用翻译，可以移除 import

#### 2. `src/app/chamber/sc2-02/page.tsx`
- **行号**: 15
- **问题**: `'setBaseType' is assigned a value but never used`
- **说明**: 检查是否应该在某处调用 `setBaseType` 来更新状态

#### 3. `src/app/chamber/sp2-02/page.tsx`
- **行号**: 110
- **问题**: `React Hook useEffect has a missing dependency: 'solveRLC'`
- **修复方式**: 
  ```typescript
  // 选项 1: 添加依赖
  useEffect(() => {
    // ... 使用 solveRLC
  }, [solveRLC, /* 其他依赖 */]);
  
  // 选项 2: 如果 solveRLC 是稳定的函数，使用 useCallback 包装
  // 选项 3: 如果确定不需要作为依赖，添加 eslint-disable 注释（不推荐）
  ```

---

### 📁 生物模块 (Biology Components)

#### 4-7. `src/components/chamber/sb1-01/CellCanvas.tsx`
| 行号 | 问题 | 修复方式 |
|------|------|----------|
| 5 | `'Text' is defined but never used` | 从 import 中移除 `Text` |
| 17 | `'organelles' is assigned a value but never used` | 检查是否应该使用该变量，或删除赋值 |
| 37 | `'state' is defined but never used` | useFrame 回调中的 state 参数，可改为 `_state` 或 `_` |
| 69 | `'state' is defined but never used` | 同上 |

#### 8. `src/components/chamber/sb1-01/MetabolicCell.tsx`
- **行号**: 141
- **问题**: `'state' is defined but never used`
- **修复方式**: useFrame 回调的 state 参数，可改为 `_state` 或直接省略

#### 9-10. `src/components/chamber/sb2-01/GeneticsLab.tsx`
| 行号 | 问题 | 修复方式 |
|------|------|----------|
| 3 | `'useState' is defined but never used` | 从 React import 中移除 |
| 3 | `'useMemo' is defined but never used` | 从 React import 中移除 |

---

### 📁 化学模块 (Chemistry Components)

#### 11. `src/components/chamber/sc1-03/OrbitalCanvas.tsx`
- **行号**: 238
- **问题**: `'atomicNumber' is defined but never used`
- **修复方式**: 检查该参数是否应该用于渲染逻辑，或使用 `_atomicNumber`

#### 12-13. `src/components/chamber/sc1-04/AtomBuilder.tsx`
| 行号 | 问题 | 修复方式 |
|------|------|----------|
| 3 | `'useState' is defined but never used` | 从 React import 中移除 |
| 5 | `'Text' is defined but never used` | 从 @react-three/drei import 中移除 |

#### 14-15. `src/components/chamber/sc2-02/TitrationCanvas.tsx`
| 行号 | 问题 | 修复方式 |
|------|------|----------|
| 3 | `'useState' is defined but never used` | 从 React import 中移除 |
| 4 | `'useFrame' is defined but never used` | 从 @react-three/fiber import 中移除 |

#### 16-18. `src/components/chamber/sc2-03/GasTankCanvas.tsx`
| 行号 | 问题 | 修复方式 |
|------|------|----------|
| 7 | `'idealGasPressure' is defined but never used` | 检查是否应该使用该函数，或从 import 中移除 |
| 26 | `'moles' is defined but never used` | 检查计算逻辑，该变量是否应该被使用 |
| 143 | `'maxVolume' is defined but never used` | 检查是否应该用于限制逻辑，或移除 |

#### 19-20. `src/components/chamber/sc2-04/BeakerCanvas.tsx`
| 行号 | 问题 | 修复方式 |
|------|------|----------|
| 3 | `'useMemo' is defined but never used` | 从 React import 中移除 |
| 21 | `'temperature' is defined but never used` | 检查该解构变量是否应该被使用 |

---

### 📁 物理电路模块 (Physics Circuit Components)

#### 21-25. `src/components/chamber/sp2-02/CircuitCanvas.tsx`
| 行号 | 问题 | 修复方式 |
|------|------|----------|
| 3 | `'useRef' is defined but never used` | 从 React import 中移除 |
| 4 | `'useFrame' is defined but never used` | 从 @react-three/fiber import 中移除 |
| 170 | `'hoveredId' is assigned a value but never used` | 如果不需要 hover 状态，移除整个 useState |
| 170 | `'setHoveredId' is assigned a value but never used` | 同上 |
| 171 | `'circuitResults' is assigned a value but never used` | 检查是否应该显示电路计算结果 |

---

## 常见修复模式

### 1. 未使用的 import
```typescript
// ❌ 错误
import { useState, useMemo, useCallback } from 'react';
// 但只使用了 useCallback

// ✅ 正确
import { useCallback } from 'react';
```

### 2. useFrame 回调中未使用的 state 参数
```typescript
// ❌ 错误
useFrame((state, delta) => {
  // 只使用 delta，没用 state
  ref.current.rotation.x += delta;
});

// ✅ 正确 - 使用下划线前缀
useFrame((_state, delta) => {
  ref.current.rotation.x += delta;
});

// 或者只解构需要的
useFrame((_, delta) => {
  ref.current.rotation.x += delta;
});
```

### 3. useEffect 依赖缺失
```typescript
// ❌ 错误 - 缺少 solveRLC 依赖
useEffect(() => {
  const result = solveRLC(params);
  setResult(result);
}, [params]); // 警告: 缺少 solveRLC

// ✅ 正确 - 添加依赖
useEffect(() => {
  const result = solveRLC(params);
  setResult(result);
}, [params, solveRLC]);

// 或者如果 solveRLC 是组件内定义的函数
const solveRLC = useCallback((p) => {
  // 计算逻辑
}, [/* 相关依赖 */]);

useEffect(() => {
  const result = solveRLC(params);
  setResult(result);
}, [params, solveRLC]);
```

### 4. 未使用的解构变量
```typescript
// ❌ 错误
const { temperature, pressure, volume } = props;
// 但 temperature 没被使用

// ✅ 正确 - 只解构需要的
const { pressure, volume } = props;

// 或者如果需要保留接口但暂不使用
const { temperature: _temperature, pressure, volume } = props;
```

---

## 验收标准

1. 运行 `npm run lint`
2. 确认上述 25 个 warnings 全部消除
3. 运行 `npm run build` 确认没有破坏编译

---

## 修复优先级建议

1. **高优先级** (容易修复):
   - 所有未使用的 import 语句 (行 3, 4, 5, 7 等)
   
2. **中优先级** (需要检查上下文):
   - useFrame 的 state 参数 (多处)
   - 未使用的解构变量
   
3. **需要思考** (可能需要功能调整):
   - `sp2-02/page.tsx` 的 useEffect 依赖问题
   - `CircuitCanvas.tsx` 的 hoveredId 和 circuitResults

---

## 完成后

1. 运行完整 lint 检查：`npm run lint`
2. 确认 build 正常：`npm run build`
3. 提交代码：
   ```bash
   git add -A
   git commit -m "fix: clear remaining lint warnings in T-CleanupB module set"
   git push
   ```
4. 在此文件底部更新完成状态

---

## 完成状态

<!-- 完成后在此处填写 -->
- [ ] 任务完成
- 完成时间: 
- 剩余 warnings 数量: 
- 备注: 
