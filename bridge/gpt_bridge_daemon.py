#!/usr/bin/env python3
"""
Automated GPT-4.1 Bridge Daemon
Watches for new tasks from Claude and responds automatically.
"""
import time
from pathlib import Path

from gpt_bridge import get_client, get_pending_tasks, send_task
from notify_claude import notify_claude

def main():
    print("[GPT-4.1 Bridge Daemon] Starting...")
    client = get_client()
    seen = set()
    while True:
        pending = get_pending_tasks()
        new_tasks = [t for t in pending if t not in seen]
        for task_file in new_tasks:
            response_file = send_task(client, task_file)
            notify_claude(task_file, response_file)
            seen.add(task_file)
        time.sleep(10)  # Check every 10 seconds

if __name__ == "__main__":
    main()
