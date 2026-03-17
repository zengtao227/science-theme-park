# Bugfix Requirements Document

## Introduction

SM2-05 模块（幂运算与根号）中存在硬编码文本的国际化问题。当用户切换语言时，部分界面文本不会随之改变，导致多语言体验不一致。具体问题包括：

1. 在页面组件 `src/app/chamber/sm2-05/page.tsx` 第730行附近，实验功能切换按钮使用了硬编码的中文文本
2. 在 3D 可视化组件 `src/components/chamber/sm2-05/PowerCanvas.tsx` 中，所有标签和提示文本都是硬编码的英文

这些文本应该通过项目的 i18n 系统进行国际化处理，使用 `t()` 函数从翻译文件中获取对应语言的文本。

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN 用户在 SM2-05 页面点击实验功能切换按钮 THEN 按钮显示硬编码的中文文本 "隐藏实验功能" 或 "实验功能 (3D)"，不随系统语言设置改变

1.2 WHEN 用户在 PowerCanvas 3D 可视化组件中查看标签文本 THEN 所有文本（如 "Reciprocal"、"Division = Cancellation"、"Move Right"、"Move Left"、"VISUAL_MODE"、"BASE" 等）都显示为硬编码的英文，不随系统语言设置改变

1.3 WHEN 用户切换到德语或其他语言 THEN 这些硬编码文本仍然保持原样（中文或英文），破坏了多语言体验的一致性

### Expected Behavior (Correct)

2.1 WHEN 用户在 SM2-05 页面点击实验功能切换按钮 THEN 按钮文本应该通过 `t("sm2_05.experimental.toggle_show")` 和 `t("sm2_05.experimental.toggle_hide")` 从 i18n 系统获取，根据当前语言显示相应翻译

2.2 WHEN 用户在 PowerCanvas 3D 可视化组件中查看标签文本 THEN 所有文本应该通过 `t()` 函数从 i18n 系统获取，包括：
- "Reciprocal" → `t("sm2_05.visual.reciprocal")`
- "Division = Cancellation" → `t("sm2_05.visual.division_cancellation")`
- "Move Right" / "Move Left" → `t("sm2_05.visual.move_right")` / `t("sm2_05.visual.move_left")`
- "VISUAL_MODE" → `t("sm2_05.visual.mode_label")`
- "BASE" → `t("sm2_05.visual.base_label")`
- "m=" / "n=" → `t("sm2_05.visual.m_label")` / `t("sm2_05.visual.n_label")`

2.3 WHEN 用户切换到任何支持的语言（英语、中文、德语）THEN 所有这些文本都应该正确显示为对应语言的翻译

### Unchanged Behavior (Regression Prevention)

3.1 WHEN 用户访问 SM2-05 模块的其他已国际化部分 THEN 这些部分的多语言功能应该继续正常工作，不受此次修复影响

3.2 WHEN 用户在其他模块（如 SM2-04、SM2-06）中使用 i18n 功能 THEN 这些模块的国际化功能应该继续正常工作

3.3 WHEN PowerCanvas 组件的 3D 可视化逻辑执行时 THEN 动画、交互和数学计算应该保持不变，只有文本显示方式改变

3.4 WHEN 用户与实验功能切换按钮交互时 THEN 按钮的显示/隐藏逻辑应该保持不变，只有按钮文本的获取方式改变
