import os
from pathlib import Path
from datetime import datetime

def notify_claude(task_file, response_file):
    """
    Notification stub: Replace this with integration to Claude's preferred notification system.
    For now, just logs to a file.
    """
    log_file = Path(__file__).parent / "claude_notifications.log"
    with open(log_file, "a") as f:
        f.write(f"[NOTIFY] {datetime.now().isoformat()} - Task {task_file.name} completed. Response: {response_file}\n")
    print(f"[Notify] Claude notified for {task_file.name}")
