# 改进方案（已更新）- 2026年2月7日

## 用户确认的要求

✅ **分界线默认位置**: 50/50
✅ **自动旋转**: 完全禁用，只有用户拖动时才旋转
✅ **动画控制**: 不是定时，而是"展开/收起"按钮，用户手动控制
✅ **公式不随旋转**: 公式标签固定在屏幕上，不随3D对象旋转
✅ **任务背景**: 不强制Basel本地化，使用通用情境
✅ **模块图标**: 已有图标系统，需要为缺失的模块添加新图标

## 新发现的问题

⚠️ **(a+b)³展开问题**: 用户看到8个方块，但(a+b)³应该只有4项
- 需要检查SM2.01的实现逻辑
- 可能是视觉展示问题（8个小立方体组成4个项？）

---

## 阶段一：全局UI改进（8小时）

### 1.1 可拖动分界线系统 ⭐ 高优先级

**目标**: 让用户可以调整左侧内容区和右侧可视化区的大小

**技术方案**:
```typescript
// 创建新组件: src/components/layout/ResizableLayout.tsx
interface ResizableLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  defaultLeftWidth?: number; // 默认50%
  minLeftWidth?: number;     // 最小25%
  maxLeftWidth?: number;     // 最大75%
}

// 功能:
// - 鼠标拖动分界线调整大小
// - 保存用户偏好到localStorage (key: `module-${code}-split`)
// - 响应式设计（移动端自动切换为上下布局）
// - 双击分界线重置为默认50/50
// - 拖动手柄样式：3px宽，hover时显示 ⋮⋮ 图标
```

**实现细节**:
```typescript
const ResizableLayout = ({ leftContent, rightContent, defaultLeftWidth = 50 }) => {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    setLeftWidth(Math.max(25, Math.min(75, newWidth)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    localStorage.setItem('split-position', leftWidth.toString());
  };

  return (
    <div className="flex h-full">
      <div style={{ width: `${leftWidth}%` }}>{leftContent}</div>
      <div 
        className="w-1 bg-white/10 hover:bg-white/30 cursor-col-resize"
        onMouseDown={handleMouseDown}
      />
      <div style={{ width: `${100 - leftWidth}%` }}>{rightContent}</div>
    </div>
  );
};
```

**影响文件**:
- 新建: `src/components/layout/ResizableLayout.tsx`
- 修改: 所有 `src/app/chamber/*/page.tsx` 文件（约53个）

**预计时间**: 4小时

---

### 1.2 统一3D控制系统 ⭐ 高优先级

**目标**: 为所有3D可视化添加统一的控制UI

**技术方案**:
```typescript
// 创建新组件: src/components/ui/Canvas3DControls.tsx
interface Canvas3DControlsProps {
  onReset: () => void;              // 重置视角
  showAutoRotate?: boolean;         // 是否显示自动旋转按钮（默认false）
  autoRotate?: boolean;             // 当前是否自动旋转
  onToggleAutoRotate?: () => void;  // 切换自动旋转
}

// UI布局（右上角浮动面板）:
// [🔄 Reset]
```

**默认行为改进**:
```typescript
// 所有Canvas组件默认配置:
<OrbitControls 
  enableRotate={true}      // 允许用户拖动旋转
  enableZoom={true}        // 允许缩放
  enablePan={false}        // 禁用平移
  autoRotate={false}       // 默认不自动旋转
  autoRotateSpeed={2.0}    // 如果启用，旋转速度
/>
```

**实现细节**:
```typescript
// 每个Canvas组件添加:
const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 10]);
const controlsRef = useRef<OrbitControlsImpl>(null);

const handleReset = () => {
  if (controlsRef.current) {
    controlsRef.current.reset(); // 重置到初始位置
  }
};

<Canvas3DControls onReset={handleReset} />
<OrbitControls ref={controlsRef} />
```

**影响文件**:
- 新建: `src/components/ui/Canvas3DControls.tsx`
- 修改: 约20个Canvas组件

**预计时间**: 4小时

---

## 阶段二：模块特定修复（6小时）

### 2.1 SM1.01 面积与体积改进

#### 2.1.1 立方体可旋转 ✅
**当前问题**: 体积部分的立方体静态显示

**解决方案**:
```typescript
// 修改: src/components/chamber/sm1-01/VolumeCanvas.tsx
<OrbitControls 
  enableRotate={true}
  enableZoom={true}
  enablePan={false}
  autoRotate={false}
/>

// 初始相机角度调整为斜视图，方便看到所有边
camera={{ position: [6, 5, 6], fov: 50 }}
```

**预计时间**: 30分钟

---

#### 2.1.2 添加任务背景说明 ✅
**解决方案**:
```typescript
// 修改: src/lib/i18n.ts
// 为每个任务添加context字段（通用情境，不强制Basel）

sm1_01: {
  tasks: {
    carpet: {
      context_en: "A homeowner needs to replace the carpet in their living room. They measured the room dimensions and now need to calculate how much carpet to purchase.",
      context_cn: "一位房主需要更换客厅的地毯。他们测量了房间的尺寸，现在需要计算需要购买多少地毯。",
      context_de: "Ein Hausbesitzer muss den Teppich in seinem Wohnzimmer ersetzen. Er hat die Raummaße gemessen und muss nun berechnen, wie viel Teppich er kaufen muss.",
      title: "展开蓝图以购买准确面积的地毯",
    },
    recycler: {
      context_en: "A recycling center needs to calculate the area of a trapezoidal zone for waste sorting planning.",
      context_cn: "一个回收中心需要计算一个梯形区域的面积，以便规划垃圾分类区。",
      context_de: "Ein Recyclingzentrum muss die Fläche einer trapezförmigen Zone für die Abfallsortierungsplanung berechnen.",
      title: "计算回收员的梯形区域",
    }
  }
}
```

**UI改进**:
```tsx
// 任务显示格式:
<div className="task-card border border-white/10 rounded-lg p-4 mb-4">
  <div className="text-sm text-white/60 mb-3 leading-relaxed">
    {t.sm1_01.tasks.carpet.context}
  </div>
  <div className="text-base font-bold text-white">
    当前任务：{t.sm1_01.tasks.carpet.title}
  </div>
</div>
```

**预计时间**: 2小时（包括10-15个主要模块的任务说明）

---

### 2.2 SM2.01 二项式工厂改进 ⭐ 高优先级

#### 2.2.1 禁用自动旋转 ✅
**解决方案**:
```typescript
// 修改: src/components/chamber/sm2-01/BinomialCanvas.tsx
// 完全移除autoRotate，只允许用户手动拖动

<OrbitControls 
  enableRotate={true}
  enableZoom={true}
  enablePan={false}
  autoRotate={false}  // 永远false
/>

// 不需要自动旋转按钮
<Canvas3DControls onReset={handleReset} />
```

**预计时间**: 30分钟

---

#### 2.2.2 动画控制系统 ⭐ 关键改进
**当前问题**: 
1. (a+b)³爆炸动画自动循环
2. 用户无法控制动画
3. 爆炸后方块方向不一致
4. **用户看到8个方块，但(a+b)³应该只有4项**

**解决方案**:
```typescript
// 添加动画状态管理
type AnimationState = 'collapsed' | 'exploded';
const [animationState, setAnimationState] = useState<AnimationState>('collapsed');
const [isAnimating, setIsAnimating] = useState(false);

// 动画控制按钮
<div className="animation-controls flex gap-2">
  <button 
    onClick={handleExplode} 
    disabled={animationState === 'exploded' || isAnimating}
    className="px-4 py-2 border border-neon-green/40 text-neon-green"
  >
    展开 (a+b)³
  </button>
  <button 
    onClick={handleCollapse} 
    disabled={animationState === 'collapsed' || isAnimating}
    className="px-4 py-2 border border-neon-cyan/40 text-neon-cyan"
  >
    收起
  </button>
  <button 
    onClick={handleReset}
    className="px-4 py-2 border border-white/40 text-white"
  >
    🔄 Reset 视角
  </button>
</div>

// 动画时长
const ANIMATION_DURATION = 2000; // 展开/收起动画2秒
// 展开后保持状态，不自动收起

// 爆炸方向优化 - 确保所有小立方体保持相同方向
cubes.forEach((cube, index) => {
  cube.rotation.set(0, 0, 0); // 保持方向一致，不旋转
  cube.position.lerp(explodedPositions[index], progress);
});
```

**关于(a+b)³的8个方块问题**:
```typescript
// 需要检查当前实现:
// (a+b)³ = a³ + 3a²b + 3ab² + b³ (4项)
// 
// 如果当前显示8个小立方体，可能的原因:
// 1. 视觉上是2x2x2=8个小立方体组成一个大立方体
// 2. 需要通过颜色/分组来表示4个代数项
//
// 建议方案:
// - a³: 1个红色立方体
// - 3a²b: 3个橙色立方体
// - 3ab²: 3个蓝色立方体  
// - b³: 1个绿色立方体
// 总共8个小立方体，但通过颜色分为4组
```

**公式标签固定显示**:
```typescript
// 公式使用HTML overlay，不随3D对象旋转
<div className="absolute top-4 left-4 bg-black/80 p-4 rounded border border-white/20">
  <div className="text-white font-mono">
    (a+b)³ = a³ + 3a²b + 3ab² + b³
  </div>
  {animationState === 'exploded' && (
    <div className="mt-2 text-sm text-white/60">
      <div className="text-red-400">■ a³ (1个)</div>
      <div className="text-orange-400">■ 3a²b (3个)</div>
      <div className="text-blue-400">■ 3ab² (3个)</div>
      <div className="text-green-400">■ b³ (1个)</div>
    </div>
  )}
</div>
```

**预计时间**: 4小时

---

## 阶段三：内容增强（4小时）

### 3.1 模块图标补充 ✅

**当前状态**: 
- ConceptIcon.tsx已有约25个图标
- ModuleCard.tsx已正确集成ConceptIcon
- 需要为缺失的模块添加新图标

**缺失图标的模块**（需要添加）:
```
物理模块:
- SP1.05 (Rhine Ferry)
- SP1.06 (Pendulum)  
- SP1.08 (Optics Lab)
- SP2.01 (Thermodynamics)
- SP3.02 (Wave Optics)
- SP4.01 (Wave Basics)
- GP5.01, GP5.02, GP5.03, GP5.04

化学模块:
- SC1.03, SC1.04
- SC2.01, SC2.02, SC2.03, SC2.04
- SC3.01
- GC1.01, GC2.01, GC3.01, GC3.02

生物模块:
- SB1.01, SB1.01-MET, SB2.01, GB3.01

数学模块:
- SM2.04, SM2.05, SM2.06
- SM3.03
- GM3.01
```

**设计原则**:
- 使用简单的几何形状
- 与模块主题相关
- 保持与现有图标风格一致
- 使用motion动画增加趣味性

**预计时间**: 3小时

---

### 3.2 任务背景说明（全模块）✅

**范围**: 为主要模块添加情境说明（不强制Basel本地化）

**优先级模块**（约15个）:
1. SM1.01 - 面积与体积
2. SM2.01 - 二项式
3. SM2.02 - 勾股定律
4. SM2.03 - 直线与函数
5. SP1.02 - 牛顿定律
6. SP2.01 - 热力学
7. SC1.02 - 摩尔计算
8. SC2.01 - 反应动力学
9. 其他有任务的模块

**说明模板**（通用情境）:
```
[角色]遇到了[问题]。他们需要使用[知识点]来解决这个问题。

当前任务：[具体任务描述]
```

**示例**:
```typescript
// 英文
context: "A construction engineer needs to calculate the roof support beam length for a house. The roof has a half-span of 6m and a height of 6m."

// 中文  
context: "一位建筑工程师需要计算房屋的屋顶支撑梁长度。屋顶的半跨度为6米，高度为6米。"

// 德文
context: "Ein Bauingenieur muss die Länge des Dachträgerbalkens für ein Haus berechnen. Das Dach hat eine Halbspannweite von 6 m und eine Höhe von 6 m."
```

**预计时间**: 1小时（15个模块）

---

## 实施计划（总计18小时）

### 第一批（立即开始）- 8小时
1. ✅ 可拖动分界线系统（4小时）
2. ✅ 统一3D控制系统（4小时）

### 第二批（第一批完成后）- 6小时
3. ✅ SM1.01立方体可旋转（30分钟）
4. ✅ SM2.01禁用自动旋转（30分钟）
5. ✅ SM2.01动画控制系统（4小时）
   - 展开/收起按钮
   - 公式固定显示
   - 检查并修复(a+b)³的8个方块问题
6. ✅ 任务背景说明（1小时）

### 第三批（第二批完成后）- 4小时
7. ✅ 模块图标补充（3小时）
8. ✅ 测试和调试（1小时）

---

## 测试计划

### 功能测试
- [ ] 分界线拖动在所有模块正常工作
- [ ] 双击分界线重置为50/50
- [ ] localStorage正确保存分界线位置
- [ ] 3D对象只在用户拖动时旋转
- [ ] Reset按钮正确恢复初始视角
- [ ] SM1.01立方体可以旋转查看所有边
- [ ] SM2.01展开/收起按钮正常工作
- [ ] SM2.01公式不随3D对象旋转
- [ ] SM2.01的(a+b)³展开逻辑正确（4项，8个方块）
- [ ] 所有主要任务都有背景说明
- [ ] 所有模块图标正确显示

### 浏览器兼容性测试
- [ ] Chrome
- [ ] Firefox  
- [ ] Safari
- [ ] Edge

---

## 关键问题需要确认

### ⚠️ SM2.01 的 (a+b)³ 展开问题
**用户反馈**: "A加B括号的三次方展开了之后不是有四个项目吗，但是我看到你那个展开的那个方块有八个呢"

**需要检查**:
1. 当前实现是否正确表示了4个代数项？
2. 8个小立方体是如何对应到4个项的？
3. 是否需要通过颜色/标签来明确区分？

**建议方案**:
- 使用颜色编码：a³(红)、3a²b(橙)、3ab²(蓝)、b³(绿)
- 添加图例说明每种颜色代表哪一项
- 确保展开后用户能清楚看到4项的对应关系

---

## 风险评估

### 低风险
- 任务背景说明（纯文本添加）
- 禁用自动旋转（配置更改）
- 模块图标补充（独立功能）

### 中风险
- 可拖动分界线（需要测试所有模块）
- 3D控制系统（需要确保不破坏现有功能）

### 高风险
- SM2.01动画重构（复杂的状态管理）
- (a+b)³展开逻辑（需要确认数学正确性）

---

## 需要立即确认的问题

1. **SM2.01的8个方块**: 这是正确的设计吗？如何对应到4个代数项？
2. **分界线保存**: 是否每个模块独立保存分界线位置，还是全局统一？
3. **图标优先级**: 哪些模块的图标最重要，需要优先添加？

请确认以上方案，我将立即开始实施。
