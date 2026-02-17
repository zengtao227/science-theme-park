# Implementation Tasks: SB2.02 Body Systems Fixes

## Overview

This task list addresses the critical issues in SB2.02 module: incomplete question pools, hardcoded English text, and outdated i18n implementation.

## Tasks

### Task 1: Add Translation Keys

- [x] 1.1 Add English translation keys
  - 打开 `src/lib/i18n/en/biology.ts`
  - 在 `sb2_02` section 中添加 `prompts` object,包含所有60个问题的 prompt 文本
  - 添加 `organs` object,包含所有器官名称 (stomach, heart, lungs, esophagus, intestines, liver, pancreas, arteries, veins, alveoli, diaphragm, trachea, larynx, pharynx)
  - 添加 `functions` object,包含所有功能描述 (digestion, absorption, bile, pump, return, breathing)
  - 添加 `hints` object,包含所有60个问题的 hint 文本
  - 确认方法: `grep -A 5 "prompts:" src/lib/i18n/en/biology.ts | grep digestive_b1`

- [x] 1.2 Add Chinese translation keys
  - 打开 `src/lib/i18n/cn/biology.ts`
  - 在 `sb2_02` section 中添加与英文对应的所有翻译键
  - 器官名称使用正确的中文医学术语 (胃、心脏、肺、食道、肠道、肝脏、胰腺、动脉、静脉、肺泡、膈膜、气管、喉、咽)
  - 确认方法: `grep "stomach:" src/lib/i18n/cn/biology.ts` 应显示 "胃"

- [x] 1.3 Add German translation keys
  - 打开 `src/lib/i18n/de/biology.ts`
  - 在 `sb2_02` section 中添加与英文对应的所有翻译键
  - 器官名称使用正确的德文医学术语 (Magen, Herz, Lunge, Speiseröhre, Darm, Leber, Bauchspeicheldrüse, Arterien, Venen, Alveolen, Zwerchfell, Luftröhre, Kehlkopf, Rachen)
  - 确认方法: `grep "stomach:" src/lib/i18n/de/biology.ts` 应显示 "Magen"

- [x] 1.4 Checkpoint: Translation Keys Complete
  - 运行 `npm run build` 通过
  - 确认所有三种语言的翻译键数量相同
  - `git add -A && git commit -m "feat(sb2-02): add complete translation keys for all questions" && git push`

### Task 2: Migrate to useLanguage() Hook

- [x] 2.1 Update imports in page.tsx
  - 打开 `src/app/chamber/sb2-02-body-systems/page.tsx`
  - 将 `import { translations } from "@/lib/i18n"` 改为 `import { useLanguage } from "@/lib/i18n"`
  - 删除 `type SB202BodySystemsT = typeof translations.EN.sb2_02;` 这一行
  - 确认方法: `grep "useLanguage" src/app/chamber/sb2-02-body-systems/page.tsx`

- [x] 2.2 Update translation usage
  - 将 `const t = (translations[currentLanguage]?.sb2_02 || translations.EN.sb2_02) as SB202BodySystemsT;` 改为 `const { t } = useLanguage();`
  - 删除 `const { currentLanguage, completeStage } = useAppStore();` 中的 `currentLanguage`
  - 确认方法: `grep "const { t }" src/app/chamber/sb2-02-body-systems/page.tsx`

- [x] 2.3 Update all translation key references
  - 将所有 `t.title` 改为 `t("sb2_02.title")`
  - 将所有 `t.stages.digestive` 改为 `t("sb2_02.stages.digestive")`
  - 将所有 `t.difficulty.basic` 改为 `t("sb2_02.difficulty.basic")`
  - 将所有其他 `t.xxx` 改为 `t("sb2_02.xxx")`
  - 确认方法: `grep 't\\.title' src/app/chamber/sb2-02-body-systems/page.tsx` 应该没有结果

- [x] 2.4 Checkpoint: i18n Migration Complete
  - 运行 `npm run build` 通过
  - 浏览器访问 `/chamber/sb2-02-body-systems`
  - 切换 EN/CN/DE 三种语言,确认标题和界面文本正确切换
  - `git add -A && git commit -m "refactor(sb2-02): migrate to useLanguage() hook" && git push`

### Task 3: Complete Question Pools

- [x] 3.1 Add DIGESTIVE stage questions
  - 在 `buildStagePool` 函数中,为 DIGESTIVE stage 添加:
    - CORE difficulty: 5 questions (使用 `t("sb2_02.prompts.digestive_c1")` 等)
    - ADVANCED difficulty: 5 questions (使用 `t("sb2_02.prompts.digestive_a1")` 等)
    - ELITE difficulty: 5 questions (使用 `t("sb2_02.prompts.digestive_e1")` 等)
  - 所有文本使用翻译键,不要硬编码
  - 确认方法: 计算 DIGESTIVE 相关的 quests.push() 调用应该有 4 个 (BASIC/CORE/ADVANCED/ELITE)

- [x] 3.2 Add CIRCULATORY stage questions
  - 为 CIRCULATORY stage 添加:
    - BASIC difficulty: 5 questions
    - ADVANCED difficulty: 5 questions
    - ELITE difficulty: 5 questions
  - 所有文本使用翻译键
  - 确认方法: 计算 CIRCULATORY 相关的 quests.push() 调用应该有 4 个

- [x] 3.3 Add RESPIRATORY stage questions
  - 为 RESPIRATORY stage 添加:
    - BASIC difficulty: 5 questions
    - CORE difficulty: 5 questions
    - ELITE difficulty: 5 questions
  - 所有文本使用翻译键
  - 确认方法: 计算 RESPIRATORY 相关的 quests.push() 调用应该有 4 个

- [x] 3.4 Checkpoint: All Question Pools Complete
  - 运行 `npm run build` 通过
  - 浏览器测试所有 12 个 stage×difficulty 组合:
    - DIGESTIVE: BASIC/CORE/ADVANCED/ELITE 都有 5 题
    - CIRCULATORY: BASIC/CORE/ADVANCED/ELITE 都有 5 题
    - RESPIRATORY: BASIC/CORE/ADVANCED/ELITE 都有 5 题
  - 确认没有任何组合显示 "Module Complete!"
  - `git add -A && git commit -m "feat(sb2-02): complete all question pools for 12 stage×difficulty combinations" && git push`

### Task 4: Remove Socratic Tag (Optional)

- [ ] 4.1 Remove Socratic tag from homepage
  - 打开 `src/app/page.tsx`
  - 在 `filterTags` array 中删除 `{ id: "socratic", label: t("home.filter_tags.socratic") }` 这一行
  - 在所有 module definitions 中删除 `"socratic"` tag
  - 确认方法: `grep -c "socratic" src/app/page.tsx` 应该返回 0

- [ ] 4.2 Remove Socratic translation keys
  - 从 `src/lib/i18n/en/common.ts` 中删除 `socratic: "Socratic"` (如果存在)
  - 从 `src/lib/i18n/cn/common.ts` 中删除对应翻译
  - 从 `src/lib/i18n/de/common.ts` 中删除对应翻译
  - 确认方法: `grep "socratic" src/lib/i18n/*/common.ts` 应该没有结果

- [ ] 4.3 Checkpoint: Socratic Tag Removed
  - 运行 `npm run build` 通过
  - 浏览器访问首页,确认过滤器中没有 "Socratic" 选项
  - 确认过滤功能仍然正常工作
  - `git add -A && git commit -m "refactor: remove unclear Socratic tag from homepage" && git push`

### Task 5: Final Validation

- [ ] 5.1 Build and lint validation
  - 运行 `npm run build` 通过, 0 errors
  - 运行 `npm run lint` 只有已存在的 warnings (不得有新增 error)

- [ ] 5.2 Browser testing - English
  - 访问 `/chamber/sb2-02-body-systems`
  - 测试所有 3 stages × 4 difficulties = 12 组合
  - 确认所有文本是英文
  - 确认所有题目可以验证和提交

- [ ] 5.3 Browser testing - Chinese
  - 切换到中文 (清除缓存: Cmd+Shift+R)
  - 测试所有 12 组合
  - 确认所有文本是中文 (包括器官名称、功能描述、提示)
  - 确认 difficulty 显示 "基础/核心/进阶/精英"

- [ ] 5.4 Browser testing - German
  - 切换到德文 (清除缓存: Cmd+Shift+R)
  - 测试所有 12 组合
  - 确认所有文本是德文 (包括器官名称、功能描述、提示)
  - 确认 difficulty 显示 "BASIS/KERN/ERWEITERT/ELITE"

- [ ] 5.5 Final commit and push
  - `git add -A && git commit -m "fix(sb2-02): complete fixes for body systems module - all stages, difficulties, and languages" && git push`
  - 等待 Vercel 部署完成
  - 在生产环境验证所有功能

## Notes

- Task 4 (Remove Socratic Tag) 是可选的,如果用户认为这个标签有用可以保留
- 所有问题文本必须使用翻译键,不能硬编码
- 每个 stage × difficulty 组合必须有恰好 5 道题
- 中文和德文翻译必须使用正确的医学术语
- 完成后,SB2.02 将与新模块 (GM1.02, SC2.05, GP3.01, SC2.06) 保持一致的标准
