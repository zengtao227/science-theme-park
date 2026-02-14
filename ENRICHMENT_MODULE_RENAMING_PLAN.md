# 拓展模块重命名方案
**创建时间**: 2026-02-14

---

## 🎯 问题分析

### 当前问题
1. **SM1.02** (4D Hyper-Geometry) 是拓展内容，但占用了标准课程编号
2. **GM5.01** (Matrix Transform) 应该移到拓展模块区域
3. 拓展模块需要独立的命名体系，不应占用标准课程编号

### 影响
- ❌ SM1.02 看起来像是初中一年级必修内容
- ❌ 占用了可能需要的标准课程编号
- ❌ 造成课程结构混淆

---

## 💡 解决方案

### 新的命名规范：拓展模块使用 "E" 前缀

**E = Enrichment (拓展/进阶)**

```
标准课程: SM1, SM2, SM3, GM1, GM2, GM3, GM4
拓展课程: EM1, EM2, EM3... (数学拓展)
         EP1, EP2, EP3... (物理拓展)
         EC1, EC2, EC3... (化学拓展)
         EB1, EB2, EB3... (生物拓展)
```

### 具体重命名方案

#### 方案 A: 使用 EM 前缀（推荐）✅

```
SM1.02 (4D Hyper-Geometry) → EM1.01 (Enrichment Math 1.01)
GM5.01 (Matrix Transform)  → EM2.01 (Enrichment Math 2.01)
```

**优点**:
- 清晰区分标准和拓展内容
- 不占用标准课程编号
- 可扩展性强

#### 方案 B: 使用 SMX/GMX 前缀

```
SM1.02 → SMX.01 (Sek Math eXtra)
GM5.01 → GMX.01 (Gym Math eXtra)
```

**优点**:
- 保持与原命名的关联
- X 表示 Extra/Extension

#### 方案 C: 使用 SMA/GMA 前缀

```
SM1.02 → SMA.01 (Sek Math Advanced)
GM5.01 → GMA.01 (Gym Math Advanced)
```

---

## 📋 推荐方案：EM 前缀

### EM1.01 - 4D Hyper-Geometry (原 SM1.02)
- **内容**: Thales 定理、4D 投影、超立方体
- **难度**: Advanced
- **适合**: 对几何感兴趣的 Sek 学生

### EM2.01 - Matrix Transform (原 GM5.01)
- **内容**: 矩阵变换、特征向量
- **难度**: Advanced
- **适合**: Matura 准备、大学预科

---

## 🔧 实施步骤

### 步骤 1: 重命名 SM1.02 → EM1.01

#### 1.1 重命名文件夹
```bash
mv src/app/chamber/sm1-02 src/app/chamber/em1-01
mv src/components/chamber/sm1-02 src/components/chamber/em1-01
```

#### 1.2 更新页面文件
- `src/app/chamber/em1-01/page.tsx`
  - 更新 moduleCode: "SM1.02" → "EM1.01"
  - 更新 completeStage: "sm1-02" → "em1-01"
  - 更新组件引用路径

#### 1.3 更新 i18n 翻译
- `src/lib/i18n.ts`
  - `sm1_02` → `em1_01`
  - 标题更新: "SM1.02 // 4D HYPER-GEOMETRY" → "EM1.01 // 4D HYPER-GEOMETRY"

#### 1.4 更新首页配置
```typescript
const enrichmentModules = [
  { 
    code: "EM1.01", 
    title: t.home.em1_01_title, 
    desc: t.home.em1_01_subtitle, 
    color: "neon-purple", 
    href: "/chamber/em1-01", 
    tags: ["math", "enrichment", "advanced"] 
  },
];
```

### 步骤 2: 移动 GM5.01 → EM2.01

#### 2.1 重命名文件夹
```bash
mv src/app/chamber/gm5-01 src/app/chamber/em2-01
mv src/components/chamber/gm5-01 src/components/chamber/em2-01
```

#### 2.2 更新页面文件
- `src/app/chamber/em2-01/page.tsx`
  - 更新 moduleCode: "GM5.01" → "EM2.01"
  - 更新 completeStage: "gm5-01" → "em2-01"

#### 2.3 更新 i18n 翻译
- `src/lib/i18n.ts`
  - `gm5_01` → `em2_01`
  - 标题更新: "GM5.01 // MATRIX TRANSFORM" → "EM2.01 // MATRIX TRANSFORM"

#### 2.4 从 mathModules 移除，添加到 enrichmentModules
```typescript
const mathModules = [
  // ... SM1-SM3, GM1-GM4 (移除 GM5.01)
];

const enrichmentModules = [
  { 
    code: "EM1.01", 
    title: t.home.em1_01_title, 
    desc: t.home.em1_01_subtitle + " (Advanced Geometry)", 
    color: "neon-purple", 
    href: "/chamber/em1-01", 
    tags: ["math", "enrichment", "advanced"] 
  },
  { 
    code: "EM2.01", 
    title: t.home.em2_01_title, 
    desc: t.home.em2_01_subtitle + " (Matura Preparation)", 
    color: "neon-amber", 
    href: "/chamber/em2-01", 
    tags: ["math", "enrichment", "advanced", "matura-prep"] 
  },
];
```

### 步骤 3: 更新文档

#### 3.1 CURRICULUM_PLAN.md
```markdown
### 📐 Mathematics (Basel Standard)
**Sekundarschule (Sek 1-3)**:
- SM1.01-06 (Sek 1)
- SM2.01-08 (Sek 2)
- SM3.01-04 (Sek 3)

**Gymnasium (Gym 1-4)**:
- GM1.01 (Gym 1 - Calculus)
- GM2.01 (Gym 2 - Vectors)
- GM3.01 (Gym 3 - Probability)
- GM4.01 (Gym 4 - Complex Numbers)

**Enrichment/Advanced**:
- EM1.01 - 4D Hyper-Geometry (Advanced Geometry)
- EM2.01 - Matrix Transform (Matura Prep)
```

---

## 📊 重命名前后对比

### 重命名前
```
标准课程:
SM1.01 ✅
SM1.02 ❌ (实际是拓展内容)
SM1.03 ✅
...
GM1-GM4 ✅
GM5.01 ❌ (实际是拓展内容)

拓展模块:
(混在标准课程中)
```

### 重命名后
```
标准课程:
SM1.01 ✅
SM1.02 (空缺，可用于未来标准内容)
SM1.03 ✅
...
GM1-GM4 ✅

拓展模块:
EM1.01 - 4D Hyper-Geometry ✅
EM2.01 - Matrix Transform ✅
```

---

## 🎯 优势

### 1. 清晰的课程结构
- ✅ 标准课程编号保持连续性
- ✅ 拓展内容独立命名
- ✅ 不会混淆必修和选修

### 2. 可扩展性
- ✅ 可以添加更多拓展模块（EM1.02, EM1.03...）
- ✅ 可以为其他学科添加拓展（EP, EC, EB）
- ✅ 不占用标准课程编号空间

### 3. 用户体验
- ✅ 学生清楚知道哪些是必修，哪些是拓展
- ✅ 教师可以更好地规划课程
- ✅ 首页可以有独立的"拓展模块"区域

---

## ⚠️ 注意事项

### 用户进度迁移
需要在 store 中添加迁移逻辑：

```typescript
const migrateEnrichmentModules = (state: any) => {
  const migrations = {
    'sm1-02': 'em1-01',
    'gm5-01': 'em2-01',
  };
  
  Object.entries(migrations).forEach(([oldCode, newCode]) => {
    if (state.completedStages[oldCode]) {
      state.completedStages[newCode] = state.completedStages[oldCode];
      delete state.completedStages[oldCode];
    }
  });
};
```

### 添加重定向
在 `next.config.ts` 中：

```typescript
async rewrites() {
  return [
    {
      source: '/chamber/sm1-02',
      destination: '/chamber/em1-01',
    },
    {
      source: '/chamber/gm5-01',
      destination: '/chamber/em2-01',
    },
  ];
},
```

---

## 📋 检查清单

### 重命名 SM1.02 → EM1.01
- [ ] 重命名文件夹 (app/chamber)
- [ ] 重命名组件文件夹
- [ ] 更新页面文件中的 moduleCode
- [ ] 更新 i18n 翻译键
- [ ] 更新首页配置
- [ ] 更新文档

### 移动 GM5.01 → EM2.01
- [ ] 重命名文件夹 (app/chamber)
- [ ] 重命名组件文件夹
- [ ] 更新页面文件中的 moduleCode
- [ ] 更新 i18n 翻译键
- [ ] 从 mathModules 移除
- [ ] 添加到 enrichmentModules
- [ ] 更新文档

### 测试验证
- [ ] 编译无错误
- [ ] 路由可访问
- [ ] 首页显示正确
- [ ] 三语翻译正确

---

## ✅ 预期结果

### 首页显示
```
📐 Mathematics (标准课程)
├── Sekundarschule
│   ├── SM1.01 - Areas & Volumes
│   ├── SM1.03 - Algebra Quest
│   ├── SM1.04 - Below Zero
│   └── ...
└── Gymnasium
    ├── GM1.01 - Calculus
    ├── GM2.01 - Vectors
    ├── GM3.01 - Probability
    └── GM4.01 - Complex Numbers

🌟 Enrichment/Advanced (拓展课程)
├── EM1.01 - 4D Hyper-Geometry
└── EM2.01 - Matrix Transform
```

---

**创建者**: Kiro AI  
**日期**: 2026-02-14  
**状态**: 待执行
