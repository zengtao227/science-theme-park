你是规划 AI（只负责规划，不执行命令）。
请读取 projects 中的“瑞士中学数理化生物练习项目”文件，并基于下列现状制定下一步计划。

## 当前已完成
- Chemistry 翻译对称性已修复并通过验证。
- 最新提交：778d4a9（已在 main 并已 push）。
- 参考状态文档：H100_STATUS_AFTER_CH_FIX_20260228.md

## 你要做的事
1. 先给出 Math 与 Physics 的修复优先级排序（按风险与工作量）。
2. 基于现有缺失 key 清单，输出“可直接交给 Codex 执行”的分批方案：
   - MA-FIX-*（math）
   - PH-FIX-*（physics）
3. 每批必须包含：
   - 目标文件
   - 缺失 key 列表
   - key 插入节点
   - 翻译策略（真实翻译或占位）
   - 验收命令与通过标准
   - commit message
4. 输出时遵循小批次、可回滚原则（每批改动尽量 <= 50 行）。

## 可用交接文件（都在 project 下的 temp/handoff）
- H14_projects_path_rule.md
- H90_PROGRESS_SUMMARY_20260228.md
- H94_recent_commits.txt
- H95_audit_scope_and_nonbio_summary.md
- H96_non_bio_e2_scan_full.txt
- H97_pending_modules_backlog.md
- H98_math_validate_raw.txt
- H98_physics_validate_raw.txt
- H99_math_full_missing_keys.txt
- H99_physics_full_missing_keys.txt
- H100_STATUS_AFTER_CH_FIX_20260228.md

注意：不要要求我再贴历史上下文，直接在上述文件基础上给出下一轮完整计划。
