# science-theme-park Context

## 项目定位

Science Theme Park 是面向瑞士初高中生的科学逻辑乐园，使用数学、物理和现实生活任务构建互动学习模块。

项目使用 Next.js、React、Three.js / R3F、Matter.js、KaTeX 和多语言 i18n，强调德语优先、英语辅助、中文延后。

## 关键结构

- `src/app/chamber/*/page.tsx`: 各学习模块页面。
- `src/components/layout/ChamberLayout.tsx`: 全站模块布局。
- `src/hooks/useQuestManager.ts`: 题目状态和验证逻辑。
- `src/components/chamber/`: 各模块动态 SVG/Canvas/3D 组件。
- `src/lib/i18n.ts`: 多语言文案。
- `scripts/`: 翻译、渲染和质量检查脚本。
- `AGENTS.md`: 本仓库特殊协作规则。
- `README.md`: 项目愿景和路线图。

## 工作规则

- 修改前读 `AGENTS.md`。
- 新模块必须使用 `useQuestManager`，不要在页面内手写 nonce/validate 逻辑。
- 页面必须由 `ChamberLayout` 包裹。
- 所有文案必须走 `src/lib/i18n.ts`，页面内不要硬编码文本。
- LaTeX 渲染遵守 `AGENTS.md` 的 `promptLatex`、`expressionLatex`、`targetLatex` 规则。
- 修复 bug 后要搜索全库类似问题，并先报告再等用户批准批量修复。

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
npm run validate:translations
scripts/audit-rendering.sh
```

## 验证要求

- 前端修改后至少运行相关 lint/build/test。
- 渲染或 LaTeX 修改后运行 `scripts/audit-rendering.sh`。
- UI 修改后打开页面确认桌面和移动端渲染。
