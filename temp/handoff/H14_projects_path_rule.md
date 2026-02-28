# Projects Path Rule (Persistent)

From now on, for every Claude handoff prompt, use this wording:

- Required phrasing: "读取 projects 中的瑞士中学数理化生物练习项目中的文件"
- Do not use: "先读 handoff 文件"

Purpose:
- Ensure the receiving AI always starts from the mounted project path context.
- Avoid false 'repo not mounted' conclusions when handoff snapshots are present.

Applies to:
- temp/handoff/H11_new_claude_start_prompt.txt
- temp/handoff/H13_new_claude_prompt_v2.txt
- Any future handoff prompt file under temp/handoff/
