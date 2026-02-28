# Audit Scope & Non-Biology Scan Summary

## 1) audit-rendering.sh 覆盖范围
- 脚本使用：`find src/app/chamber -name "page.tsx"` 与 `grep/rg src/app/chamber`。
- 结论：**扫描范围是全部 chamber 模块**，不是仅 Biology。
- 其中 E2 还带有白名单过滤（脚本内有 `grep -v` 的模块豁免注释）。

## 2) validate:translations 当前默认模块
- `scripts/validate-translations.mjs` 中：
  - `const moduleName = args[0] || 'biology';`
- 结论：默认只验 `biology`，但支持传参（例如 `physics` / `chemistry` / `math`）。

## 3) 非 Biology 快速 E2 粗扫结果
- 命令：
  - `grep -rn '\\\\text{[A-Z][a-z]' src/app/chamber/sc* src/app/chamber/sp* src/app/chamber/sm* src/app/chamber/gm* src/app/chamber/gp* src/app/chamber/gc* src/app/chamber/gb* src/app/chamber/em* 2>/dev/null | grep -v node_modules`
- 总命中：**329 行**
- 完整清单：`temp/handoff/H96_non_bio_e2_scan_full.txt`

### Top modules by hit count
- `sm3-05`: 101
- `sm2-10`: 43
- `gp3-01`: 30
- `sc2-05`: 19
- `sc3-01`: 19
- `sp3-01`: 17
- `sm2-08`: 17
- `gp2-01`: 17
- `sc2-06`: 10
- `em1-01`: 10
- `sp3-05`: 9
- `sc3-05`: 7
- `gp2-02`: 5
- `sm1-03`: 4
- `gb1-01`: 4
- 其余模块 <= 3

## 4) 当前状态判断
- 你之前看到的 `audit-rendering.sh` “E2 OK” 属于该脚本当前规则+白名单下的结果。
- 但按“纯 grep 粗扫”口径，非 Biology 仍有大量 `\\text{English}` 形态，后续需由规划侧决定：
  - 哪些是白名单继续豁免
  - 哪些进入下一轮 B 类分批 i18n
