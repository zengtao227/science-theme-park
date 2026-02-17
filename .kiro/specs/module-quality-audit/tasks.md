# Implementation Tasks: Module Quality Audit and Fixes

## Overview

This task list provides a systematic approach to audit and fix all 74 modules in the platform, ensuring complete question pools, proper i18n implementation, and full multilingual support.

## Phase 1: Fix Known Issue - SB2.02

- [ ] 1.1 Fix SB2.02 Body Systems module
  - 执行 `.kiro/specs/sb2-02-fixes/tasks.md` 中的所有任务
  - 添加所有 60 个问题的翻译键 (EN/CN/DE)
  - 迁移到 `useLanguage()` hook
  - 补全所有 12 个 stage×difficulty 组合
  - 验证所有三种语言正常工作
  - Commit: "fix(sb2-02): complete fixes for body systems module"

## Phase 2: Automated Audit - Identify All Issues

- [ ] 2.1 Create audit script
  - 创建 `scripts/audit-modules.js`
  - 扫描所有 `src/app/chamber/*/page.tsx` 文件
  - 检查每个模块:
    - 是否使用 `useLanguage()` (检查 import)
    - 是否有硬编码文本 (检查 promptLatex 中的直接字符串)
    - 统计每个 stage×difficulty 的题目数量
  - 输出报告: `module-audit-report.json`

- [ ] 2.2 Run audit script
  - 运行 `node scripts/audit-modules.js`
  - 生成完整的审计报告
  - 识别所有有问题的模块
  - 按优先级分类 (P0/P1/P2)

- [ ] 2.3 Review audit results
  - 查看 `module-audit-report.json`
  - 确定需要修复的模块列表
  - 估算修复工作量
  - 创建修复优先级列表

## Phase 3: Fix P0 Issues (Critical - Empty Question Pools)

- [ ] 3.1 Fix modules with empty question pools
  - 对于每个有空题库的模块:
    - 补全缺失的 stage×difficulty 组合
    - 每个组合添加 5 道题
    - 使用翻译键 (不硬编码)
    - 测试所有组合
  - Commit 每个模块: "fix(module-code): complete question pools for all difficulties"

- [ ] 3.2 Fix modules with hardcoded English
  - 对于每个有硬编码文本的模块:
    - 提取所有硬编码文本到翻译文件
    - 添加 EN/CN/DE 翻译
    - 更新 page.tsx 使用翻译键
    - 测试三种语言
  - Commit 每个模块: "fix(module-code): extract hardcoded text to translation keys"

## Phase 4: Fix P1 Issues (High - Old i18n Pattern)

- [ ] 4.1 Identify modules using old i18n pattern
  - 从审计报告中提取使用 `translations[currentLanguage]` 的模块
  - 创建迁移列表

- [ ] 4.2 Migrate modules to useLanguage() hook
  - 对于每个使用旧模式的模块:
    - 更新 import: `import { useLanguage } from "@/lib/i18n"`
    - 更新用法: `const { t } = useLanguage()`
    - 更新所有 `t.key` 为 `t("module_key.key")`
    - 测试语言切换
  - Commit 每个模块: "refactor(module-code): migrate to useLanguage() hook"

## Phase 5: Verify Translation Completeness

- [ ] 5.1 Create translation verification script
  - 创建 `scripts/verify-translations.js`
  - 对于每个模块:
    - 检查 EN/CN/DE 翻译键是否完整
    - 统计每种语言的键数量
    - 识别缺失的翻译
  - 输出报告: `translation-completeness-report.json`

- [ ] 5.2 Fix missing translations
  - 对于每个缺失翻译的模块:
    - 添加缺失的 CN 翻译
    - 添加缺失的 DE 翻译
    - 确保使用正确的术语
  - Commit: "fix(i18n): add missing translations for multiple modules"

## Phase 6: Remove Socratic Tag (Optional)

- [ ] 6.1 Remove Socratic tag from homepage
  - 打开 `src/app/page.tsx`
  - 从 `filterTags` 中删除 socratic 条目
  - 从所有模块定义中删除 "socratic" tag
  - 测试过滤功能
  - Commit: "refactor: remove unclear Socratic tag from homepage"

## Phase 7: Comprehensive Testing

- [ ] 7.1 Automated testing
  - 运行 `npm run build` - 必须通过
  - 运行 `npm run lint` - 不得有新增 error
  - 运行 `npm test` - 所有测试通过

- [ ] 7.2 Manual browser testing - Sample modules
  - 从每个学科选择 2-3 个模块进行深度测试
  - 测试所有 stage×difficulty 组合
  - 测试 EN/CN/DE 三种语言
  - 确认没有 "Module Complete!" 错误
  - 确认没有硬编码英文

- [ ] 7.3 Create testing checklist
  - 为每个模块创建测试清单
  - 记录测试结果
  - 识别任何剩余问题

## Phase 8: Documentation and Deployment

- [ ] 8.1 Update documentation
  - 更新 `DEVELOPMENT_STATUS_2026-02-15.md`
  - 记录所有修复的模块
  - 更新模块质量标准文档
  - 创建 `MODULE_QUALITY_AUDIT_REPORT.md`

- [ ] 8.2 Final commit and push
  - `git add -A`
  - `git commit -m "feat: complete module quality audit and fixes - all 74 modules verified"`
  - `git push`
  - 等待 Vercel 部署

- [ ] 8.3 Production verification
  - 在生产环境随机测试 10-15 个模块
  - 验证所有语言正常工作
  - 验证所有难度都有题目
  - 确认用户体验一致

## Execution Strategy

### Immediate Actions (Today)
1. Fix SB2.02 (Phase 1)
2. Create and run audit script (Phase 2)
3. Start fixing P0 issues (Phase 3)

### Short-term Actions (This Week)
4. Complete P0 fixes
5. Start P1 fixes (old i18n pattern)
6. Verify translation completeness

### Medium-term Actions (Next Week)
7. Complete all fixes
8. Comprehensive testing
9. Documentation and deployment

## Notes

- 优先修复影响学生学习的问题 (空题库、硬编码英文)
- 每个模块修复后立即测试和 commit
- 保持小的、频繁的 commits,便于回滚
- 所有修复必须通过 `npm run build` 验证
- 修复过程中发现的新问题立即记录
