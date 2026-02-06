# 🎯 TASKS FOR TRAE (AI2) — PHASE 3.5: I18N INTEGRATION

> **角色**: UI/UX 专家 & 国际化工程师  
> **状态**: 🚧 I18N INTEGRATION STARTING
> **现况**: T-CleanupB 已完成（零 warnings）。现在需要将 `PENDING_I18N.md` 中的翻译 Keys 集成到代码中。

---

## 🚦 核心工作流规约 (Mandatory Workflow)
1. **等待 Antigravity**: Antigravity 将使用 NVIDIA 模型为 `PENDING_I18N.md` 中的 Keys 生成 EN/CN/DE 三语翻译，并添加到 `src/lib/i18n.ts`。
2. **你的任务**: 在翻译添加完成后，将以下 6 个模块中的硬编码文本替换为 `t('key')` 调用。
3. **验收标准**: 所有模块支持三语切换，无硬编码文本残留。

---

## 📋 Mission T84 - I18N Integration (6 New Modules)

### 需要集成 i18n 的模块

#### 1. GP5.02 - Relativity Lab
**文件**: `src/app/chamber/gp5-02/page.tsx`

**需要替换的硬编码文本**:
```typescript
// 标题和导航
"GP5.02 // RELATIVITY LAB" → t("gp5_02.title")
"Back to Nexus" → t("gp5_02.back")

// 监视器标题
"GP5.02_RELATIVITY_MONITOR" → t("gp5_02.monitor_title")

// 页脚
"GP5.02_RELATIVITY_LAB // NODE: RHINE" → t("gp5_02.footer_left")

// 任务面板
"MISSION: SPECIAL RELATIVITY" → t("gp5_02.mission.title")
"Explore special relativity effects..." → t("gp5_02.mission.description")
```

---

#### 2. GS1.01 - Complex Fractal
**文件**: `src/app/chamber/gs1-01/page.tsx`

**需要替换的硬编码文本**:
```typescript
"GS1.01 // COMPLEX FRACTAL" → t("gs1_01.title")
"Back to Nexus" → t("gs1_01.back")
"GS1.01_FRACTAL_EXPLORER // NODE: BASEL" → t("gs1_01.footer_left")
"GS1.01_FRACTAL_MONITOR" → t("gs1_01.monitor_title")
"MISSION: MANDELBROT SET" → t("gs1_01.mission.title")
"Explore the Mandelbrot set..." → t("gs1_01.mission.description")
```

---

#### 3. SP1.08 - Optics Bench
**文件**: `src/app/chamber/sp1-08/page.tsx`

**需要替换的硬编码文本**:
```typescript
"SP1.08 // OPTICS BENCH" → t("sp1_08.title")
"Back to Nexus" → t("sp1_08.back")
"SP1.08_OPTICS_BENCH // NODE: BASEL" → t("sp1_08.footer_left")
"SP1.08_OPTICS_MONITOR" → t("sp1_08.monitor_title")
"MISSION: RAY OPTICS" → t("sp1_08.mission.title")
"Master Snell's law..." → t("sp1_08.mission.description")
```

---

#### 4. G3.01 - Probability Vault
**文件**: `src/app/chamber/g3-01/page.tsx`

**需要替换的硬编码文本**:
```typescript
"G3.01 // PROBABILITY VAULT" → t("g3_01.title")
"Back to Nexus" → t("g3_01.back")
"G3.01_PROBABILITY_VAULT // NODE: BASEL" → t("g3_01.footer_left")
"G3.01_PROBABILITY_MONITOR" → t("g3_01.monitor_title")
"MISSION: GALTON BOARD" → t("g3_01.mission.title")
"Observe the central limit theorem..." → t("g3_01.mission.description")
```

---

#### 5. G5.01 - Matrix Geometry
**文件**: `src/app/chamber/g5-01/page.tsx`

**需要替换的硬编码文本**:
```typescript
"G5.01 // MATRIX GEOMETRY" → t("g5_01.title")
"Back to Nexus" → t("g5_01.back")
"G5.01_MATRIX_GEOMETRY // NODE: BASEL" → t("g5_01.footer_left")
"G5.01_MATRIX_MONITOR" → t("g5_01.monitor_title")
"MISSION: LINEAR TRANSFORMATIONS" → t("g5_01.mission.title")
"Visualize linear algebra..." → t("g5_01.mission.description")
```

---

#### 6. GC2.01 - Carbon Kingdom
**文件**: `src/app/chamber/gc2-01/page.tsx`

**需要替换的硬编码文本**:
```typescript
"GC2.01 // CARBON KINGDOM" → t("gc2_01.title")
"Back to Nexus" → t("gc2_01.back")
"GC2.01_CARBON_KINGDOM // NODE: BASEL" → t("gc2_01.footer_left")
"GC2.01_ORGANIC_MONITOR" → t("gc2_01.monitor_title")
"MISSION: ORGANIC CHEMISTRY" → t("gc2_01.mission.title")
"Explore organic molecules..." → t("gc2_01.mission.description")
```

---

## 🔧 实施步骤

### Step 1: 等待 Antigravity 完成翻译
- Antigravity 将调用 NVIDIA 模型生成翻译
- 翻译将被添加到 `src/lib/i18n.ts`
- 你会收到通知开始集成

### Step 2: 替换硬编码文本
对于每个模块：
1. 打开对应的 `page.tsx` 文件
2. 确保已导入 `useLanguage` hook：
   ```typescript
   import { useLanguage } from "@/lib/i18n";
   ```
3. 在组件中获取 `t` 函数：
   ```typescript
   const { t } = useLanguage();
   ```
4. 将所有硬编码文本替换为 `t('key')` 调用

### Step 3: 测试三语切换
1. 启动开发服务器：`npm run dev`
2. 访问每个模块
3. 测试 DE/EN/CN 三语切换
4. 确认所有文本正确显示

### Step 4: 验收
1. 运行 `npm run lint` 确保无错误
2. 运行 `npm run build` 确保编译通过
3. 提交代码

---

## 📊 进度追踪

- [ ] GP5.02 - Relativity Lab
- [ ] GS1.01 - Complex Fractal
- [ ] SP1.08 - Optics Bench
- [ ] G3.01 - Probability Vault
- [ ] G5.01 - Matrix Geometry
- [ ] GC2.01 - Carbon Kingdom

---

## [BLOCKER]
- ✅ 已完成：Antigravity 已使用 NVIDIA 模型生成翻译并更新 `src/lib/i18n.ts`
- 🎯 Trae 现在可以开始 Mission T84 的 i18n 集成工作

---

## 🎯 READY TO START
Trae，翻译已完成！你现在可以开始将 6 个模块中的硬编码文本替换为 `t('key')` 调用。

---

## ✅ T-CleanupB 完成状态

- [x] 任务完成
- 完成时间: 2026-02-06
- 剩余 warnings 数量: 0
- 备注: 所有 25 个 warnings 已清理完成，项目达到零错误零警告状态 ✅

