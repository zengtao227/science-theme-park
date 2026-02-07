# 改进方案 - 2026年2月7日

## 方案概述

基于用户反馈，我们将分三个阶段实施改进：
1. **阶段一**: 全局UI改进（分界线拖动、3D控制）
2. **阶段二**: 模块特定修复（SM1.01、SM2.01）
3. **阶段三**: 内容增强（任务背景说明、模块图标）

---

## 阶段一：全局UI改进

### 1.1 可拖动分界线系统

**目标**: 让用户可以调整左侧内容区和右侧可视化区的大小

**技术方案**:
```typescript
// 创建新组件: src/components/layout/ResizableLayout.tsx
interface ResizableLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  defaultLeftWidth?: number; // 默认50%
  minLeftWidth?: number;     // 最小30%
  maxLeftWidth?: number;     // 最大70%
}

// 功能:
// - 鼠标拖动分界线调整大小
// - 保存用户偏好到localStorage
// - 响应式设计（移动端自动切换为上下布局）
// - 双击分界线重置为默认50/50
```

**实现细节**:
- 使用React state管理分界线位置
- 添加鼠标事件监听器（mousedown, mousemove, mouseup）
- 使用CSS `resize: horizontal` 或自定义拖动手柄
- 分界线样式：2px宽，hover时高亮，显示拖动图标（⋮⋮）

**影响文件**:
- 新建: `src/components/layout/ResizableLayout.tsx`
- 修改: 所有 `src/app/chamber/*/page.tsx` 文件（约53个）

**预计时间**: 4小时

---

### 1.2 统一3D控制系统

**目标**: 为所有3D可视化添加统一的控制UI

**技术方案**:
```typescript
// 创建新组件: src/components/ui/Canvas3DControls.tsx
interface Canvas3DControlsProps {
  onReset: () => void;           // 重置视角
  onToggleAutoRotate: () => void; // 切换自动旋转
  autoRotate: boolean;            // 当前是否自动旋转
  onTogglePause?: () => void;     // 暂停/播放动画（可选）
  isPaused?: boolean;             // 是否暂停（可选）
}

// UI布局:
// 右上角浮动控制面板
// [🔄 Reset] [⟳ 自动旋转: 开/关] [⏸ 暂停]
```

**默认行为改进**:
- 所有3D场景默认**不自动旋转**
- 用户可以通过OrbitControls手动拖动旋转
- 点击"自动旋转"按钮才启用自动旋转
- Reset按钮恢复到初始相机位置和旋转角度

**实现细节**:
- 修改所有Canvas组件，添加`autoRotate`状态
- 使用React Three Fiber的`<OrbitControls enableRotate autoRotate={autoRotate} />`
- 保存用户的自动旋转偏好到localStorage

**影响文件**:
- 新建: `src/components/ui/Canvas3DControls.tsx`
- 修改: 约20个Canvas组件（所有使用Three.js的组件）

**预计时间**: 5小时

---

## 阶段二：模块特定修复

### 2.1 SM1.01 面积与体积改进

#### 2.1.1 立方体可旋转
**当前问题**: 体积部分的立方体静态显示，无法看清所有边长

**解决方案**:
```typescript
// 修改: src/components/chamber/sm1-01/VolumeCanvas.tsx
// 添加OrbitControls使立方体可以旋转
<OrbitControls 
  enableRotate={true}
  enableZoom={true}
  enablePan={false}
  autoRotate={false}
/>

// 初始相机角度调整为斜视图
camera={{ position: [6, 5, 6], fov: 50 }}
```

**预计时间**: 30分钟

#### 2.1.2 添加任务背景说明
**解决方案**:
```typescript
// 修改: src/lib/i18n.ts
// 为每个任务添加context字段

sm1_01: {
  tasks: {
    carpet: {
      context: "张先生需要为他在巴塞尔的新公寓更换地毯。他测量了房间的尺寸，现在需要计算需要购买多少平方米的地毯。",
      title: "展开蓝图以购买准确面积的地毯",
      // ...
    },
    recycler: {
      context: "巴塞尔市的回收中心需要计算一个梯形区域的面积，以便规划垃圾分类区。",
      title: "计算回收员的梯形区域",
      // ...
    }
  }
}
```

**UI改进**:
```tsx
// 任务显示格式:
<div className="task-card">
  <div className="task-context">
    {t.sm1_01.tasks.carpet.context}
  </div>
  <div className="task-title">
    当前任务：{t.sm1_01.tasks.carpet.title}
  </div>
</div>
```

**预计时间**: 2小时（包括所有模块的任务说明）

---

### 2.2 SM2.01 二项式工厂改进

#### 2.2.1 禁用自动旋转
**解决方案**:
```typescript
// 修改: src/components/chamber/sm2-01/BinomialCanvas.tsx
// 默认autoRotate设为false
const [autoRotate, setAutoRotate] = useState(false);

<OrbitControls autoRotate={autoRotate} />
<Canvas3DControls 
  autoRotate={autoRotate}
  onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
  onReset={handleReset}
/>
```

**预计时间**: 30分钟

#### 2.2.2 动画控制系统
**当前问题**: (a+b)³爆炸动画自动循环，时间太短，无法控制

**解决方案**:
```typescript
// 添加动画状态管理
const [animationState, setAnimationState] = useState<'collapsed' | 'exploded'>('collapsed');
const [isAnimating, setIsAnimating] = useState(false);

// 动画控制按钮
<div className="animation-controls">
  <button onClick={handleExplode} disabled={animationState === 'exploded'}>
    展开 (a+b)³
  </button>
  <button onClick={handleCollapse} disabled={animationState === 'collapsed'}>
    收起
  </button>
  <button onClick={handleReset}>
    Reset 视角
  </button>
</div>

// 动画时长调整
const EXPLODE_DURATION = 2000;  // 展开动画2秒
const HOLD_DURATION = 10000;    // 保持展开状态10秒
const COLLAPSE_DURATION = 2000; // 收起动画2秒
```

**爆炸方向优化**:
```typescript
// 确保所有小立方体在爆炸后保持相同方向
// 使用统一的旋转矩阵
cubes.forEach((cube, index) => {
  cube.rotation.set(0, 0, 0); // 保持方向一致
  cube.position.lerp(explodedPositions[index], progress);
});
```

**预计时间**: 3小时

---

## 阶段三：内容增强

### 3.1 模块图标显示

**当前问题**: 主页模块卡片没有显示概念图标

**诊断步骤**:
1. 检查`src/components/ConceptIcon.tsx`是否正确导出
2. 检查`src/components/ui/ModuleCard.tsx`是否正确使用ConceptIcon
3. 检查CSS样式是否隐藏了图标

**解决方案**:
```typescript
// 确认ModuleCard正确使用ConceptIcon
import ConceptIcon from '@/components/ConceptIcon';

<ModuleCard>
  <ConceptIcon code={module.code} className="w-12 h-12 mb-4" />
  <h3>{module.title}</h3>
  {/* ... */}
</ModuleCard>
```

**如果ConceptIcon缺失图标**:
- 为所有53个模块添加对应的SVG图标
- 使用简单的几何形状表示概念（圆、三角、立方体等）

**预计时间**: 2小时

---

### 3.2 任务背景说明（全模块）

**范围**: 为所有有任务的模块添加情境说明

**模块列表**（部分示例）:
- SM1.01: 面积与体积（地毯、回收区）
- SM2.02: 勾股定律（CERN校准、屋顶设计）
- SM2.03: 直线与函数（Basel电车路线）
- SP1.02: 牛顿定律（Basel物理实验）
- SC1.02: 摩尔计算（Novartis实验室）

**说明模板**:
```
[人物/机构] 在 [Basel相关地点] 遇到了 [具体问题]。
他们需要使用 [本模块知识点] 来解决这个问题。

当前任务：[具体任务描述]
```

**预计时间**: 6小时（约40个模块）

---

## 实施计划

### 第一批（立即开始）- 预计8小时
1. ✅ 可拖动分界线系统（4小时）
2. ✅ 统一3D控制系统（4小时）

### 第二批（第一批完成后）- 预计4小时
3. ✅ SM1.01立方体可旋转（30分钟）
4. ✅ SM2.01禁用自动旋转（30分钟）
5. ✅ SM2.01动画控制（3小时）

### 第三批（第二批完成后）- 预计10小时
6. ✅ 任务背景说明（8小时）
7. ✅ 模块图标诊断和修复（2小时）

**总预计时间**: 22小时

---

## 测试计划

### 功能测试
- [ ] 分界线拖动在所有模块正常工作
- [ ] 3D控制按钮在所有Canvas组件正常工作
- [ ] SM1.01立方体可以旋转查看所有边
- [ ] SM2.01动画可以手动控制
- [ ] 所有任务都有背景说明
- [ ] 所有模块图标正确显示

### 浏览器兼容性测试
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 响应式测试
- [ ] 桌面端（1920x1080）
- [ ] 平板端（768x1024）
- [ ] 移动端（375x667）

---

## 风险评估

### 低风险
- 任务背景说明（纯文本添加）
- 禁用自动旋转（配置更改）

### 中风险
- 可拖动分界线（需要测试所有模块）
- 3D控制系统（需要确保不破坏现有功能）

### 高风险
- SM2.01动画重构（复杂的状态管理）

---

## 回滚计划

所有更改将通过Git分支管理：
- 主分支：`main`
- 开发分支：`feature/ui-improvements-2026-02`

如果出现问题，可以快速回滚到当前稳定版本。

---

## 需要用户确认的问题

1. **分界线默认位置**: 50/50还是40/60（左/右）？
2. **自动旋转**: 是否完全禁用，还是保留选项让用户选择？
3. **动画时长**: 展开状态保持10秒是否合适？
4. **任务背景**: 是否所有任务都需要Basel本地化情境？
5. **模块图标**: 如果当前图标系统有问题，是修复还是重新设计？

请确认以上方案是否符合您的期望，我将开始实施。
