# Design Document

## Overview

Science Theme Park 生物模块国际化升级 Phase 2 项目将通过系统性的重构和优化，完善三个核心生物模块的多语言支持。该设计基于现有的 ChamberLayout 组件模式、useQuestManager 钩子系统和 Premium Feel 设计规范，确保所有模块都具备一致的用户体验和完整的国际化功能。

设计的核心目标是：
1. 重构 SB1.03 细胞分裂模块，从独立目录迁移到标准 chamber 结构
2. 优化 SB2.01 组织与器官模块的翻译键结构和用户交互
3. 验证并完善 GB2.01 神经生物学模块的国际化实现
4. 统一所有模块的设计规范和交互模式

## Architecture

### 模块架构标准化

所有生物模块将遵循统一的架构模式：

```
src/app/chamber/{module-id}/
├── page.tsx                 # 主页面组件
├── components/              # 模块特定组件
│   ├── Visualization.tsx    # 可视化组件
│   └── InteractiveElements.tsx
└── types.ts                # 类型定义
```

### 国际化架构

```
src/lib/i18n/{lang}/biology.ts
├── {module_id}: {
│   ├── title, back, check, next, correct, incorrect, ready
│   ├── difficulty: { basic, core, advanced, elite }
│   ├── stages: { stage1, stage2, stage3 }
│   ├── labels: { 界面标签 }
│   ├── prompts: { 问题提示和提示信息 }
│   ├── scenarios: { 巴塞尔本地化场景描述 }
│   ├── results: { 结果反馈信息 }
│   └── feedback: { 正确/错误反馈 }
│ }
```

### 状态管理架构

使用 useQuestManager 钩子统一管理所有模块的任务状态：
- 难度级别管理 (BASIC, CORE, ADVANCED, ELITE)
- 阶段切换和进度跟踪
- 输入验证和结果反馈
- 本地存储的学习统计

## Components and Interfaces

### 核心组件接口

#### ChamberLayout 组件
```typescript
interface ChamberLayoutProps {
  moduleCode: string;
  title: string;
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
  stages: Array<{ id: string; label: string }>;
  currentStage: string;
  onStageChange: (stage: string) => void;
  onVerify?: () => void;
  onNext?: () => void;
  checkStatus?: { ok: boolean; correct: string } | null;
  footerLeft?: string;
  translations: TranslationSet;
  monitorContent?: React.ReactNode;
  children: React.ReactNode;
}
```

#### Quest 接口标准化
```typescript
interface BiologyQuest extends Quest {
  id: string;
  difficulty: Difficulty;
  stage: string;
  promptLatex: string;
  expressionLatex: string;
  targetLatex: string;
  slots: Slot[];
  correctLatex: string;
  hintLatex?: string[];
  // 生物模块特定属性
  conceptType?: 'anatomy' | 'physiology' | 'genetics' | 'ecology';
  visualizationType?: 'diagram' | '3d-model' | 'animation' | 'chart';
}
```

### 可视化组件接口

#### 通用可视化组件
```typescript
interface BiologyVisualizationProps<T extends BiologyQuest> {
  quest: T | null;
  stage: string;
  onInteraction?: (data: any) => void;
}
```

### 翻译接口标准化

```typescript
interface BiologyModuleTranslations {
  title: string;
  back: string;
  check: string;
  next: string;
  correct: string;
  incorrect: string;
  ready: string;
  monitor_title: string;
  footer_left: string;
  difficulty: {
    basic: string;
    core: string;
    advanced: string;
    elite: string;
  };
  stages: Record<string, string>;
  labels: Record<string, string>;
  prompts: Record<string, string>;
  scenarios: Record<string, string>;
  results: {
    valid: string;
    invalid: string;
    valid_desc: string;
    invalid_desc: string;
    next: string;
  };
  feedback: {
    correct: string;
    incorrect: string;
  };
}
```

## Data Models

### SB1.03 细胞分裂数据模型

```typescript
interface CellDivisionQuest extends BiologyQuest {
  stage: 'mitosis' | 'meiosis_i' | 'meiosis_ii';
  phaseType?: 'prophase' | 'metaphase' | 'anaphase' | 'telophase';
  chromosomeCount?: number;
  divisionType?: 'mitotic' | 'meiotic';
}

interface CellDivisionVisualization {
  cellType: 'diploid' | 'haploid';
  chromosomes: Chromosome[];
  currentPhase: string;
  animationState: 'paused' | 'playing' | 'completed';
}

interface Chromosome {
  id: string;
  position: { x: number; y: number };
  paired: boolean;
  color: string;
}
```

### SB2.01 组织器官数据模型

```typescript
interface TissueOrganQuest extends BiologyQuest {
  stage: 'tissues' | 'organs' | 'systems';
  tissueType?: 'epithelial' | 'connective' | 'muscle' | 'nervous';
  organName?: string;
  systemName?: string;
  hierarchyLevel?: 'cell' | 'tissue' | 'organ' | 'system' | 'organism';
}

interface AnatomyVisualization {
  viewType: '2d' | '3d' | 'cross-section';
  highlightedStructure?: string;
  labelVisibility: boolean;
  zoomLevel: number;
}
```

### GB2.01 神经生物学数据模型

```typescript
interface NeurobiologyQuest extends BiologyQuest {
  stage: 'anatomy' | 'potential' | 'synapse';
  neuronPart?: 'soma' | 'axon' | 'dendrites' | 'synapse';
  ionType?: 'sodium' | 'potassium' | 'calcium' | 'chloride';
  voltageValue?: number;
}

interface NeuronVisualization {
  neuronType: 'motor' | 'sensory' | 'interneuron';
  actionPotentialState: 'resting' | 'depolarizing' | 'repolarizing';
  synapticActivity: boolean;
  ionChannelStates: Record<string, 'open' | 'closed'>;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

在开始编写正确性属性之前，我需要使用 prework 工具来分析验收标准的可测试性。

基于 prework 分析，以下是经过反思和优化的正确性属性：

### Property 1: 翻译界面完整性验证
*For any* 生物模块和任意语言设置，当用户访问模块时，所有必需的翻译键都应该存在且正确显示
**Validates: Requirements 1.1**

### Property 2: 语言切换实时更新
*For any* 语言切换操作，所有界面元素都应该立即更新为目标语言的对应内容
**Validates: Requirements 1.2**

### Property 3: 翻译键结构对称性
*For any* 翻译键路径，EN、CN、DE 三个语言文件中都应该存在相同的键结构和层级
**Validates: Requirements 1.3, 2.5, 5.2**

### Property 4: 硬编码文本国际化
*For any* React 组件文件，所有用户可见的文本都应该通过 t() 函数进行国际化处理
**Validates: Requirements 1.5**

### Property 5: 解剖学标签完整性
*For any* 组织类型或器官结构，系统都应该提供对应的标签和功能描述
**Validates: Requirements 2.2**

### Property 6: 多阶段学习功能
*For any* 生物模块，系统都应该支持预定义的学习阶段切换和状态管理
**Validates: Requirements 2.3**

### Property 7: 交互反馈一致性
*For any* 用户输入或交互操作，系统都应该提供即时的视觉反馈和状态更新
**Validates: Requirements 2.4, 7.4**

### Property 8: 专业术语翻译完整性
*For any* 神经生物学术语，所有语言版本都应该提供准确的专业翻译
**Validates: Requirements 3.2**

### Property 9: 数学公式渲染正确性
*For any* 包含 LaTeX 数学公式的内容，KaTeX 渲染器都应该正确显示公式
**Validates: Requirements 3.4**

### Property 10: Premium UI 样式一致性
*For any* 生物模块界面，都应该应用深色主题、玻璃拟态效果和霓虹色调样式
**Validates: Requirements 4.1, 4.2**

### Property 11: 动画集成完整性
*For any* 交互元素，都应该集成 framer-motion 动画以提供流畅的用户体验
**Validates: Requirements 4.3**

### Property 12: 布局组件标准化
*For any* 生物模块页面，都应该使用 ChamberLayout 组件确保一致的视觉层次
**Validates: Requirements 4.4**

### Property 13: 翻译回退机制
*For any* 缺失的翻译键，系统都应该回退到英文版本而不是显示键名或错误
**Validates: Requirements 5.4**

### Property 14: 参数化翻译处理
*For any* 带参数的翻译内容，系统都应该正确替换参数值并保持格式正确性
**Validates: Requirements 5.5, 8.3**

### Property 15: 翻译内容预加载
*For any* 模块加载过程，当前语言的所有必要翻译内容都应该在界面渲染前可用
**Validates: Requirements 7.2**

## Error Handling

### 翻译错误处理策略

1. **缺失翻译键处理**
   - 优先级：当前语言 → 英文回退 → 键名显示
   - 开发环境下记录警告日志
   - 生产环境下静默回退

2. **参数化翻译错误**
   - 参数缺失时使用占位符
   - 参数类型错误时进行类型转换
   - 格式化失败时显示原始模板

3. **语言切换错误**
   - 无效语言代码时保持当前语言
   - 切换过程中的异步错误不影响界面稳定性
   - 提供用户友好的错误提示

### 模块加载错误处理

1. **组件加载失败**
   - 显示友好的错误边界界面
   - 提供重试机制
   - 记录详细的错误信息用于调试

2. **资源加载超时**
   - 设置合理的超时时间 (10秒)
   - 提供离线模式支持
   - 缓存关键资源以提高可靠性

3. **数据验证错误**
   - 输入验证失败时提供清晰的错误提示
   - 保持用户已输入的有效数据
   - 高亮显示错误字段

## Testing Strategy

### 双重测试方法

本项目将采用单元测试和属性测试相结合的综合测试策略：

**单元测试重点：**
- 特定的翻译键存在性验证
- 组件渲染的基本功能测试
- 错误边界和异常处理测试
- 用户交互的具体场景测试

**属性测试重点：**
- 翻译系统的通用正确性验证
- 跨语言的一致性测试
- 输入验证的鲁棒性测试
- UI 组件的通用行为验证

### 属性测试配置

使用 Jest 和 fast-check 库实现属性测试：

```typescript
// 示例：翻译键对称性测试
import fc from 'fast-check';

describe('Translation Key Symmetry', () => {
  it('should have symmetric keys across all languages', () => {
    fc.assert(fc.property(
      fc.constantFrom('en', 'cn', 'de'),
      fc.string({ minLength: 1 }),
      (lang, keyPath) => {
        // Property 3: 翻译键结构对称性
        const enKeys = getKeysAtPath('en', keyPath);
        const targetKeys = getKeysAtPath(lang, keyPath);
        expect(enKeys).toEqual(targetKeys);
      }
    ), { numRuns: 100 });
  });
});
```

每个属性测试将：
- 运行最少 100 次迭代以确保充分的随机性覆盖
- 使用标准化的标签格式：**Feature: biology-i18n-phase2, Property {number}: {property_text}**
- 引用对应的设计文档属性编号
- 提供清晰的失败消息和调试信息

### 测试覆盖目标

- **翻译完整性**：100% 的翻译键覆盖
- **组件渲染**：所有生物模块组件的基本渲染测试
- **交互功能**：用户输入、验证、反馈的完整流程测试
- **错误处理**：所有错误场景的处理验证
- **性能基准**：语言切换和模块加载的性能测试

### 持续集成测试

- 每次提交都运行完整的测试套件
- 翻译文件变更时自动验证键结构对称性
- 组件变更时自动验证国际化函数的使用
- 定期运行性能回归测试

通过这种综合测试策略，我们确保生物模块国际化升级的质量和可靠性，同时为未来的维护和扩展提供坚实的测试基础。