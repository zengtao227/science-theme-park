import time
import os
import subprocess
from datetime import datetime, timedelta

# 配置路径
PROJECT_DIR = "/Users/zengtao/science-theme-park"
KIRO_TASK_FILE = f"{PROJECT_DIR}/TASKS_FOR_KIRO.md"
TRAE_TASK_FILE = f"{PROJECT_DIR}/TASKS_FOR_TRAE.md"
LOG_FILE = f"{PROJECT_DIR}/automation_log.txt"

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted_msg = f"[{timestamp}] {message}"
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"{formatted_msg}\n")
    print(formatted_msg)

def cleanup_old_logs():
    """仅保留过去 2 天的日志"""
    if not os.path.exists(LOG_FILE):
        return
    
    threshold = datetime.now() - timedelta(days=2)
    keepers = []
    
    try:
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            for line in f:
                # 提取日期 [YYYY-MM-DD
                if line.startswith("["):
                    try:
                        line_date = datetime.strptime(line[1:11], "%Y-%m-%d")
                        if line_date >= threshold:
                            keepers.append(line)
                    except:
                        keepers.append(line)
        
        with open(LOG_FILE, "w", encoding="utf-8") as f:
            f.writelines(keepers)
        log("Log retention check: Old logs removed (2-day limit).")
    except Exception as e:
        log(f"Cleanup Error: {e}")

def git_sync(force=False):
    """同步到 GitHub"""
    try:
        # 检查是否有未提交的变更
        status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True, cwd=PROJECT_DIR)
        if status.stdout.strip() or force:
            log("Git Sync Triggered: Committing and Pushing to origin...")
            subprocess.run(["git", "add", "."], cwd=PROJECT_DIR)
            # 使用时间戳作为提交信息
            msg = f"auto: daily sync {datetime.now().strftime('%Y-%m-%d %H:%M')}"
            subprocess.run(["git", "commit", "-m", msg], cwd=PROJECT_DIR)
            
            # 先拉后推，防止冲突
            subprocess.run(["git", "pull", "--rebase", "origin", "main"], cwd=PROJECT_DIR)
            subprocess.run(["git", "push", "origin", "main"], cwd=PROJECT_DIR)
            log("Git Sync Success: Repository pushed to GitHub.")
    except Exception as e:
        log(f"Git Sync Failed: {e}")

def check_status(file_path):
    if not os.path.exists(file_path):
        return False
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        if "✅ COMPLETE" in content and "🚧 IN PROGRESS" not in content:
            return True
    return False

# 启动初期清理
cleanup_old_logs()

last_git_push = time.time()
log("Auto-Pilot Watcher v3.0 (Log Rotation + Git Sync) Started.")

while True:
    current_time = time.time()
    kiro_done = check_status(KIRO_TASK_FILE)
    trae_done = check_status(TRAE_TASK_FILE)
    
    # 场景 1: 检测到任务完成信号 -> 立即同步 Git
    if kiro_done:
        log("WATCHER_ALERT: Kiro batch done. Preparing for sync...")
        git_sync(force=True)
    if trae_done:
        log("WATCHER_ALERT: Trae batch done. Preparing for sync...")
        git_sync(force=True)

    # 场景 2: 定时同步 (每 30 分钟一次，确保哪怕没完成也在备份)
    if current_time - last_git_push > 1800:
        log("WATCHER_TIMER: Hourly backup triggered.")
        git_sync()
        cleanup_old_logs() # 顺便清理日志
        last_git_push = current_time
        
    time.sleep(60)
