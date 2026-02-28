# Pending Modules Backlog (Next-Round Guide)

## Why this file
- 避免每轮重复扫描与重复定级。
- 让规划 AI（Claude）与执行 AI（Codex）在同一 backlog 上协作。

## Current known pending set (from H95/H96)
> 注：H96 为粗扫口径；实际执行前需二次核对（已修模块剔除，白名单按最新规则处理）。

| Priority | Module | Hits | Subject | Status | Notes |
|---|---:|---:|---|---|---|
| P1 | sm3-05 | 101 | Math | pending | 体量最大，先做结构摸底再分批 |
| P1 | sm2-10 | 43 | Math | pending | 命中集中，可能复用 key 较高 |
| P1 | gp3-01 | 30 | GP | pending | 需区分术语豁免与 UI 标签 |
| P1 | sc2-05 | 19 | Chemistry | pending | 化学场景混合文本较多 |
| P1 | sp3-01 | 17 | Physics | pending | 与单位/术语交织，先分层 |
| P1 | sm2-08 | 17 | Math | pending | prompt/label 混合需分批 |
| P1 | gp2-01 | 17 | GP | pending | if/else 赋值结构较多 |
| P2 | sc2-06 | 10 | Chemistry | pending | 低风险热身批，建议先做 |
| P2 | em1-01 | 10 | EM | pending | 专有场景，术语豁免可能较多 |

## Already completed (do not re-plan)
- sb2-02-body-systems: BS-B202-SP1/SP2/SP3 done
- sb1-04: BS-B104-SP1 done
- sb1-01: BS-B101-SP1 done
- sb2-03: BS-B203-SP1 done
- sp3-04: BS-P304-SP1/SP2 done
- sc3-01: BS-SC-SP1/SP2/SP3 done
- sp3-06: BS-SP1..SP5 done (per handoff history)

## Mandatory pre-check gates (before any new batch)
- Gate status (2026-02-28): FAIL (chemistry/math/physics all failing)
- Ref: `temp/handoff/H98_multisubject_translation_baseline_failures_20260228.md`

1. `npm run validate:translations physics`
2. `npm run validate:translations chemistry`
3. `npm run validate:translations math`

If any gate fails: 先修对称性，再加新 key。

## Execution policy (for Codex)
- 单批改动建议 <= 50 行。
- 先做低风险高确定性字段（labelLatex/hintLatex），再做 expression/target/correct。
- 每批独立验收：
  - `npm run build`
  - `npm run validate:translations <module>` 或全量校验
  - `bash scripts/audit-rendering.sh`
- 每批单独 commit，便于回滚。

## Suggested next target
- `sc2-06`（约 10 行，结构统一）作为下一轮热身批。

