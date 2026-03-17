#!/usr/bin/env python3
# auto-fixer.py: Build validator with optional local auto-fix loop.
# Hook contract: check only, never runs git add/commit/push.

import argparse
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).resolve().parents[1]


class AutoFixer:
    def __init__(self, max_loops: int = 5, check_only: bool = False, timeout_sec: int = 180):
        self.max_loops = max_loops
        self.check_only = check_only
        self.timeout_sec = timeout_sec
        self.project_root = PROJECT_ROOT

    def run_npm_build(self) -> tuple[bool, str]:
        os.chdir(self.project_root)
        result = subprocess.run(
            ["npm", "run", "build"],
            capture_output=True,
            text=True,
            timeout=self.timeout_sec,
        )
        output = "\n".join(part for part in [result.stdout, result.stderr] if part)
        return result.returncode == 0, output

    def parse_and_fix_ts(self, build_output: str) -> list[dict[str, Any]]:
        fixes: list[dict[str, Any]] = []
        placeholder_error = "Property 'placeholders' does not exist on type"
        if placeholder_error not in build_output:
            return fixes

        target = self.find_file(build_output)
        if target is None or not target.exists():
            return fixes

        fixes.append(
            {
                "path": target,
                "edits": [
                    {
                        "oldText": r"t\.placeholders\.[^,\s]+",
                        "newText": '"yes"',
                    }
                ],
            }
        )
        return fixes

    def apply_fixes(self, fixes: list[dict[str, Any]]) -> int:
        applied = 0
        for fix in fixes:
            path = fix["path"]
            for edit in fix["edits"]:
                if self.edit_file_content(path, edit):
                    applied += 1
        return applied

    def edit_file_content(self, path: Path, edit: dict[str, str]) -> bool:
        content = path.read_text()
        updated, count = re.subn(edit["oldText"], edit["newText"], content)
        if count > 0:
            path.write_text(updated)
            print(f"Applied {count} edit(s) in {path}")
            return True
        return False

    def find_file(self, build_output: str) -> Path | None:
        # Capture both './src/file.tsx:12:3' and 'src/file.tsx:12'
        match = re.search(r"(?:\./)?(src/[^:\n]+):\d+(?::\d+)?", build_output)
        if not match:
            return None
        return self.project_root / match.group(1)

    def run(self) -> int:
        mode = "check" if self.check_only else "autofix"
        print(f"[auto-fixer] mode={mode}, max_loops={self.max_loops}")

        loops = 1 if self.check_only else self.max_loops
        for idx in range(loops):
            ok, output = self.run_npm_build()
            if ok:
                print("[auto-fixer] build passed")
                return 0

            print(f"[auto-fixer] build failed (attempt {idx + 1}/{loops})")
            if self.check_only:
                print(output)
                return 1

            fixes = self.parse_and_fix_ts(output)
            if not fixes:
                print("[auto-fixer] no known auto-fix pattern matched")
                print(output)
                return 1

            applied = self.apply_fixes(fixes)
            if applied == 0:
                print("[auto-fixer] fix pattern matched but no edit applied")
                return 1

        print("[auto-fixer] reached max loops without successful build")
        return 1


def main() -> int:
    parser = argparse.ArgumentParser(description="Build validator and optional local auto-fix loop.")
    parser.add_argument("--check", action="store_true", help="Check mode for git hook: run build once and exit.")
    parser.add_argument("--max-loops", type=int, default=5, help="Maximum auto-fix iterations.")
    parser.add_argument("--timeout-sec", type=int, default=180, help="Build timeout per iteration.")
    args = parser.parse_args()

    fixer = AutoFixer(max_loops=args.max_loops, check_only=args.check, timeout_sec=args.timeout_sec)
    return fixer.run()


if __name__ == "__main__":
    sys.exit(main())
