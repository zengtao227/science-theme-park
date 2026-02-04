# 改进路线图 (Improvement Roadmap)

## 问题诊断 (Problem Diagnosis)

### 当前状态评估
经过代码审查，发现以下关键问题：

#### 1. 缺少真正的可视化模拟 ⚠️ **HIGH PRIORITY**
**现状**：
- 当前模块主要是"文本/LaTeX 公式交互"
- 用户体验：看公式 → 算数 → 填空 → 校验
- 更像是"互动习题集"而非"实验模拟器"

**示例问题**：
- **MG07 (S2.03 - 直线与函数)**：用户输入斜率和截距，但屏幕上没有动态函数图像
- **MG12 (S1.01 - 面积与体积)**：用户输入边长，但没有实时缩放的几何图形
- **MG08 (S2.04 - 相似与缩放)**：虽然有静态 SVG，但缺少交互式参数调节

**影响**：
- 无法实现"看见规则"的核心理念
- 学生难以建立直观的数学/物理概念
- 与设计文档中的"视觉多巴胺"理念不符

#### 2. 代码重复度高 ⚠️ **MEDIUM PRIORITY**
**现状**：
- 每个 `page.tsx` 约 400-600 行代码
- 其中 300+ 行是重复的 UI 逻辑（Header、Footer、侧边栏）
- 难度切换、语言切换、验证逻辑高度相似

**影响**：
- 维护成本高（修改一个 bug 需要改 10+ 个文件）
- 新增模块时需要大量复制粘贴
- 代码库膨胀，难以管理

#### 3. 缺少自动化测试 ⚠️ **LOW PRIORITY**
**现状**：
- 没有 `__tests__` 目录
- 没有 `.test.tsx` 文件
- "构建测试通过"仅指 TypeScript 编译成功

**影响**：
- 无法保证题目答案的正确性
- 重构时容易引入 bug
- 难以验证多语言翻译的一致性

---

## 改进计划 (Improvement Plan)

### 阶段一：引入动态可视化 🎯 **CRITICAL**

#### 1.1 数学模块可视化

##### MG07 (S2.03 - 直线与函数)
**目标**：实时函数图像绘制

**技术方案**：
- 使用 `recharts` 或 `function-plot`
- 实现交互式坐标系
- 支持拖拽点来改变斜率

**改进后效果**：
```typescript
// 用户改变 m 的值
<input onChange={(e) => setSlope(e.target.value)} />

// 屏幕上的直线实时旋转
<LineChart>
  <Line data={generateLineData(slope, intercept)} />
</LineChart>
```

**优先级**：P0 - 立即实施

##### MG12 (S1.01 - 面积与体积)
**目标**：动态几何图形

**技术方案**：
- 使用 SVG + React 状态
- 实现参数化几何绘制
- 添加面积/体积动画填充效果

**改进后效果**：
```typescript
// 用户输入矩形边长
<input onChange={(e) => setWidth(e.target.value)} />

// SVG 矩形实时缩放
<svg>
  <rect width={width * scale} height={height * scale} />
  <text>Area = {width * height}</text>
</svg>
```

**优先级**：P0 - 立即实施

##### MG08 (S2.04 - 相似与缩放)
**目标**：交互式相似三角形

**技术方案**：
- 增强现有 SVG 可视化
- 添加滑块控制缩放因子
- 实时显示对应边长比例

**改进后效果**：
- 拖动滑块，大三角形实时缩放
- 对应边用相同颜色高亮
- 比例数值动态更新

**优先级**：P1 - 本周完成

#### 1.2 物理模块可视化准备

##### 集成 Matter.js 物理引擎
**目标**：为物理模块提供真实物理模拟

**技术方案**：
```bash
npm install matter-js @types/matter-js
```

**核心功能**：
- 刚体碰撞
- 重力模拟
- 摩擦力计算
- 弹性系数

**示例场景**：P1.02 牛顿定律
```typescript
// 创建物理世界
const engine = Matter.Engine.create();
const world = engine.world;

// 添加物体
const box = Matter.Bodies.rectangle(x, y, width, height, {
  mass: userInputMass,
  friction: 0.3
});

// 施加力
Matter.Body.applyForce(box, box.position, {
  x: userInputForce * Math.cos(angle),
  y: userInputForce * Math.sin(angle)
});

// 实时渲染
Matter.Engine.update(engine, 1000 / 60);
```

**优先级**：P0 - 本周启动

---

### 阶段二：代码重构 🔧 **IMPORTANT**

#### 2.1 创建通用壳组件

##### 组件架构
```
src/components/chamber/
├── ChamberLayout.tsx       # 统一布局
├── ChamberHeader.tsx       # 顶部导航
├── ChamberMonitor.tsx      # 右侧监视器
├── ChamberFooter.tsx       # 底部状态栏
├── QuestCard.tsx           # 题目卡片
├── InputPanel.tsx          # 输入面板
└── VerificationBadge.tsx   # 验证徽章
```

##### ChamberLayout 接口设计
```typescript
interface ChamberLayoutProps {
  moduleId: string;           // "MG07"
  title: string;              // "S2.03 // LINES & FUNCTIONS"
  difficulty: Difficulty;
  stage: Stage;
  currentQuest: Quest;
  onDifficultyChange: (d: Difficulty) => void;
  onStageChange: (s: Stage) => void;
  onVerify: () => void;
  onNext: () => void;
  children: React.ReactNode;  // 自定义可视化区域
}
```

##### 使用示例
```typescript
// 重构后的 MG07/page.tsx (仅 ~100 行)
export default function MG07Page() {
  const { currentLanguage } = useAppStore();
  const t = translations[currentLanguage].mg07;
  
  const [difficulty, setDifficulty] = useState<Difficulty>("CORE");
  const [stage, setStage] = useState<Stage>("LINES");
  const [quest, setQuest] = useState(generateQuest(difficulty, stage));
  
  return (
    <ChamberLayout
      moduleId="MG07"
      title={t.title}
      difficulty={difficulty}
      stage={stage}
      currentQuest={quest}
      onDifficultyChange={setDifficulty}
      onStageChange={setStage}
      onVerify={handleVerify}
      onNext={handleNext}
    >
      {/* 只需要写模块特定的可视化 */}
      <FunctionPlotter 
        slope={quest.slope} 
        intercept={quest.intercept} 
      />
    </ChamberLayout>
  );
}
```

**优先级**：P1 - 下周完成

#### 2.2 提取通用逻辑 Hooks

##### 自定义 Hooks
```typescript
// useQuestManager.ts
export function useQuestManager<T extends Quest>(
  buildPool: (difficulty: Difficulty, stage: Stage) => T[],
  difficulty: Difficulty,
  stage: Stage
) {
  const [nonce, setNonce] = useState(0);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [lastCheck, setLastCheck] = useState<CheckResult | null>(null);
  
  const pool = useMemo(() => buildPool(difficulty, stage), [difficulty, stage]);
  const currentQuest = useMemo(() => pool[nonce % pool.length], [pool, nonce]);
  
  const next = () => {
    setInputs({});
    setLastCheck(null);
    setNonce(v => v + 1);
  };
  
  const verify = (expected: Record<string, number>) => {
    // 通用验证逻辑
  };
  
  return { currentQuest, inputs, setInputs, lastCheck, verify, next };
}
```

**优先级**：P1 - 下周完成

---

### 阶段三：物理引擎集成 ⚛️ **STRATEGIC**

#### 3.1 创建物理模拟基础设施

##### PhysicsSimulator 组件
```typescript
interface PhysicsSimulatorProps {
  width: number;
  height: number;
  gravity: { x: number; y: number };
  bodies: PhysicsBody[];
  forces: Force[];
  onUpdate: (state: PhysicsState) => void;
}

export function PhysicsSimulator(props: PhysicsSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine>();
  
  useEffect(() => {
    // 初始化 Matter.js 引擎
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    // 添加物体
    props.bodies.forEach(body => {
      Matter.World.add(engine.world, createBody(body));
    });
    
    // 渲染循环
    const render = () => {
      Matter.Engine.update(engine, 1000 / 60);
      drawCanvas(canvasRef.current, engine.world);
      props.onUpdate(extractState(engine.world));
      requestAnimationFrame(render);
    };
    
    render();
    
    return () => Matter.Engine.clear(engine);
  }, [props.bodies, props.forces]);
  
  return <canvas ref={canvasRef} width={props.width} height={props.height} />;
}
```

##### 使用示例：P1.02 牛顿定律
```typescript
export default function P102Page() {
  const [mass, setMass] = useState(2);
  const [force, setForce] = useState(10);
  const [acceleration, setAcceleration] = useState(0);
  
  return (
    <ChamberLayout moduleId="P1.02" title="Newton's Laws">
      <div className="flex gap-4">
        {/* 左侧：物理模拟 */}
        <PhysicsSimulator
          width={600}
          height={400}
          gravity={{ x: 0, y: 0 }}
          bodies={[
            { type: 'box', x: 100, y: 200, mass, width: 50, height: 50 }
          ]}
          forces={[
            { bodyIndex: 0, force: { x: force, y: 0 } }
          ]}
          onUpdate={(state) => {
            setAcceleration(state.bodies[0].acceleration.x);
          }}
        />
        
        {/* 右侧：控制面板 */}
        <div>
          <label>Mass (kg): {mass}</label>
          <input type="range" min="1" max="10" value={mass} onChange={e => setMass(+e.target.value)} />
          
          <label>Force (N): {force}</label>
          <input type="range" min="0" max="50" value={force} onChange={e => setForce(+e.target.value)} />
          
          <div>Acceleration: {acceleration.toFixed(2)} m/s²</div>
          <div>Expected (F=ma): {(force / mass).toFixed(2)} m/s²</div>
        </div>
      </div>
    </ChamberLayout>
  );
}
```

**优先级**：P0 - 本周启动原型

#### 3.2 物理可视化库

##### 力的可视化
```typescript
export function ForceArrow({ 
  origin: Point, 
  force: Vector, 
  scale: number 
}) {
  const magnitude = Math.sqrt(force.x ** 2 + force.y ** 2);
  const angle = Math.atan2(force.y, force.x);
  const length = magnitude * scale;
  
  return (
    <g>
      <line
        x1={origin.x}
        y1={origin.y}
        x2={origin.x + length * Math.cos(angle)}
        y2={origin.y + length * Math.sin(angle)}
        stroke="red"
        strokeWidth={3}
        markerEnd="url(#arrowhead)"
      />
      <text x={origin.x} y={origin.y - 10}>
        F = {magnitude.toFixed(1)} N
      </text>
    </g>
  );
}
```

##### 轨迹追踪
```typescript
export function TrajectoryTracer({ 
  positions: Point[], 
  color: string 
}) {
  return (
    <polyline
      points={positions.map(p => `${p.x},${p.y}`).join(' ')}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeDasharray="5,5"
    />
  );
}
```

**优先级**：P1 - 下周完成

---

### 阶段四：自动化测试 🧪 **QUALITY**

#### 4.1 单元测试框架搭建

##### 安装依赖
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

##### 测试示例
```typescript
// src/app/chamber/mg07/__tests__/quest-generation.test.ts
import { describe, it, expect } from 'vitest';
import { buildStagePool } from '../quest-builder';

describe('MG07 Quest Generation', () => {
  it('should generate correct line equation', () => {
    const quests = buildStagePool('BASIC', 'LINES');
    const quest = quests[0];
    
    // 验证答案正确性
    expect(quest.slots[0].expected).toBe(2); // slope
    expect(quest.slots[1].expected).toBe(3); // intercept
  });
  
  it('should have consistent difficulty scaling', () => {
    const basic = buildStagePool('BASIC', 'LINES');
    const elite = buildStagePool('ELITE', 'LINES');
    
    expect(elite.length).toBeGreaterThan(basic.length);
  });
});
```

**优先级**：P2 - 下月完成

#### 4.2 集成测试

##### E2E 测试示例
```typescript
// e2e/mg07.spec.ts
import { test, expect } from '@playwright/test';

test('MG07 - User can solve line equation', async ({ page }) => {
  await page.goto('/chamber/mg07');
  
  // 选择难度
  await page.click('text=BASIC');
  
  // 输入答案
  await page.fill('input[placeholder="m"]', '2');
  await page.fill('input[placeholder="b"]', '3');
  
  // 验证
  await page.click('text=Verify');
  
  // 检查结果
  await expect(page.locator('text=Verified')).toBeVisible();
});
```

**优先级**：P2 - 下月完成

---

## 实施时间表 (Implementation Timeline)

### 本周 (Week 1)
- [x] 创建改进路线图文档
- [x] 安装可视化库 (recharts, matter-js)
- [x] 实现 S1.01 (MG12) 几何图形可视化 - 动态SVG渲染
- [x] S2.03 (MG07) 已有函数图像可视化 (FunctionCanvas)
- [x] 启动 Matter.js 物理引擎原型 (PhysicsSimulator组件)
- [x] 创建物理演示页面 (physics-demo) 展示牛顿定律

### 下周 (Week 2)
- [ ] 创建 ChamberLayout 通用组件
- [ ] 提取 useQuestManager Hook
- [ ] 重构 MG07 使用新架构
- [ ] 重构 MG12 使用新架构
- [ ] 完成物理可视化库（力箭头、轨迹）

### 第三周 (Week 3)
- [ ] 重构所有数学模块使用新架构
- [ ] 开发 P1.02 牛顿定律物理模拟
- [ ] 开发 P2.02 欧姆定律电路模拟
- [ ] 增强 MG08 交互式缩放

### 第四周 (Week 4)
- [ ] 完成 P0 级别物理模块
- [ ] 建立单元测试框架
- [ ] 编写核心模块测试用例
- [ ] 性能优化与代码审查

---

## 成功指标 (Success Metrics)

### 用户体验指标
- [ ] 每个模块都有至少一个动态可视化元素
- [ ] 参数改变到视觉反馈延迟 < 100ms
- [ ] 移动端流畅度 > 30fps

### 代码质量指标
- [ ] 代码重复率 < 20%
- [ ] 平均模块文件大小 < 200 行
- [ ] 测试覆盖率 > 60%

### 教学效果指标
- [ ] 学生能在 30 秒内理解模块目标
- [ ] 错误答案后能通过可视化理解原因
- [ ] 完成率提升 > 30%

---

## 风险与缓解 (Risks & Mitigation)

### 风险 1：性能问题
**描述**：Matter.js 物理模拟可能在低端设备上卡顿

**缓解措施**：
- 提供"简化模式"开关
- 限制同时模拟的物体数量
- 使用 Web Worker 进行物理计算

### 风险 2：重构引入 Bug
**描述**：大规模重构可能破坏现有功能

**缓解措施**：
- 先建立测试用例
- 逐个模块重构，不一次性全改
- 保留旧代码作为备份分支

### 风险 3：可视化库学习曲线
**描述**：团队需要时间学习新库

**缓解措施**：
- 先做简单原型验证可行性
- 创建可复用的示例组件
- 编写详细的使用文档

---

**文档版本**: v1.0
**创建日期**: 2026-02-04
**负责人**: Development Team
**审核状态**: ✅ 已批准，准备实施
