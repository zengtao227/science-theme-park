# Science Theme Park - 核心设计工作流协议 (Core Design Workflow)

> **原则**：谋定而后动。所有的游戏设计必须始于对学习痛点的深度洞察。

---

## 一、资源获取与 AI 协作流程 (NotebookLM Protocol)

为了确保我们的游戏内容源自权威的瑞士竞赛题库（Kangourou Math & SwissPhO），请严格遵循以下互动流程：

### 1. 知识库准备
- 确保 `/Resources/Research_Report_Full_Reference.md` 已上传至您的 Google NotebookLM 项目。
- 该文件包含了 54 个权威引用源，是我们的核心数据库。

### 2. 标准提问模板 (Prompting Strategy)
不要泛泛而谈，使用以下模板向 NotebookLM 提问：

*   **挖掘痛点**：
    > "根据 Kangourou Math 的历史数据，请分析 Grade [X] 学生在 [主题，如：立体几何] 中最容易犯错的 3 种思维模式是什么？"
*   **寻找原型**：
    > "请找出 SwissPhO 题目中所有涉及 [力矩平衡] 的题目，并描述它们的物理场景（不要公式，要场景）。"
*   **跨学科灵感**：
    > "有哪些数学竞赛题是需要用到物理常识（如重力、反射）才能解开的？"

---

## 二、游戏立项审查清单 (The Design Manifesto)

**⛔️ STOP!** 在 Roblox Studio 中创建任何 Part 或 Script 之前，必须针对每一个拟开发的小游戏（Mini-game）完成以下 **4 步归因分析**。

只有当这 4 个问题都有清晰答案时，才能进入开发阶段。

### 📋 步骤 1: 锁定学术锚点 (The Academic Anchor)
*   **对应大纲章节**：(例如：Grade 8 Math - 代数表达式)
*   **具体知识点**：(例如：完全平方公式 $(a+b)^2$)
*   **核心痛点/难点**：(学生卡在哪？例如：学生总是漏掉中间的 $2ab$，误以为 $(a+b)^2 = a^2 + b^2$)

### 🤯 步骤 2: 剖析认知障碍 (The Cognitive Block)
*   **为什么难？**
    *   是因为太抽象（看不见）？
    *   是因为反直觉（和生活经验冲突）？
    *   还是因为计算量太大导致逻辑断层？
*   *(设计目标就是移除这个障碍)*

### 🎮 步骤 3: 游戏化转译 (The Gameplay Translation)
*   **隐喻机制**：我们用 Roblox 的什么物理/逻辑机制来代替抽象符号？
    *   *Bad Example*: 屏幕上跳出一个对话框让选 A/B/C。
    *   *Good Example*: 用一个巨大的正方形机甲 BOSS 代表公式，必须打断它的双臂（代表 $2ab$）才能击败它。
*   **操作反馈**：玩家的输入是“点击”、“移动”还是“建造”？

### 🔧 步骤 4: 验证标准 (Success Criteria)
*   **如何证明玩家懂了？**
    *   不是因为他试错了 100 次运气好过了。
    *   而是因为他**一次性**精准地完成了操作（如：直接把反射镜放在了正确的角度）。

---

## 三、开发执行流程 (Development Pipeline)
1.  **Draft**: 在 `/Design Documents/` 下以此模板创建分稿。
2.  **Review**: 审视分稿是否偏离了“解决痛点”的初衷。
3.  **Code**: 编写 Lua 脚本实现核心机制。
4.  **Test**: 在 Roblox Studio 中验证手感（这就是所谓的"Fun Factor"）。

---

## 四、视觉无障碍与可读性协议 (Absolute Visibility Protocol)
**原则**：严禁在核心 UI（导航、知识点、操作指令）中使用灰色或低对比度文字。

1.  **文字对比度**：
    - 所有的章节标题（EXPLORE, ARCHITECT 等）必须使用 **100% 纯白色 (text-white)**。
    - 禁止使用 `text-white/50`, `text-neutral-500` 等低透明度或灰色样式处理关键文字。
    - 交互元素在选中状态下必须有明显的视觉增强（如：`border-b-8`, `shadow-2xl`）。

2.  **字体大小与重量**：
    - 导航按钮（如 "Back to Nexus"）必须足够巨大（建议 `text-2xl` 或以上）。
    - 任务目标和公式必须是页面中最显眼的元素（建议 `text-7xl` 到 `text-9xl`）。

3.  **小屏幕适配建议**：
    - 避免在重要指令上使用过细的字体。使用 `font-black` 或 `font-bold`。
    - 输入框的 Placeholder 必须保持最低 50% 的可见度 (`placeholder:text-white/50`)。

*违反此协议即视为交付失败。*
