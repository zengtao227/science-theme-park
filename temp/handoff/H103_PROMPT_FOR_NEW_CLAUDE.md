你是规划 AI（只负责规划，不执行命令）。
请读取 projects 中的“瑞士中学数理化生物练习项目”文件，并基于当前状态制定下一阶段模块级计划。

## 已完成（无需重复规划）
- Chemistry/Physics/Math 翻译对称性已全部通过。
- 最新执行状态见：H102_STATUS_AFTER_PH_MA_FIX_20260228.md

## 你要输出
1. 基于现有审计与 backlog，给出下一优先模块 Top 3。
2. 对优先级第 1 的模块输出可直接交给 Codex 执行的分批方案（每批 <= 50 行改动）。
3. 每批必须包含：
   - 目标文件
   - 命中字段分布
   - 豁免项
   - key 命名
   - 三语翻译表（如需）
   - 精确替换规则
   - 验收命令
   - commit message

## 可用交接文件（都在 projects 中的“瑞士中学数理化生物练习项目”文件中)
- H00_HANDOFF_INDEX.txt
- H14_projects_path_rule.md
- H90_PROGRESS_SUMMARY_20260228.md
- H94_recent_commits.txt
- H95_audit_scope_and_nonbio_summary.md
- H96_non_bio_e2_scan_full.txt
- H97_pending_modules_backlog.md
- H102_STATUS_AFTER_PH_MA_FIX_20260228.md

注意：不要再回到翻译对称性修复，直接进入模块级渲染/i18n 清理计划。
