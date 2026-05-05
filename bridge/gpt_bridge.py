#!/usr/bin/env python3
"""
Nyingje App — Claude <-> GPT-4.1 Communication Bridge
Claude (Senior Engineer) writes task files → this script sends to GPT-4.1 → saves responses
"""

import os
import sys
import json
import glob
from datetime import datetime
from pathlib import Path

try:
    from openai import OpenAI
except ImportError:
    print("Run: pip install openai")
    sys.exit(1)

TASKS_DIR = Path(__file__).parent / "tasks"
RESPONSES_DIR = Path(__file__).parent / "responses"

GPT_SYSTEM_PROMPT = """You are GPT-4.1, working as a skilled coder and researcher on the Nyingje App project.
Nyingje App is a compassionate AI companion rooted in Buddhist wisdom and modern psychology.
It helps people with anger, anxiety, depression, and emotional struggles.

Stack: React Native + Expo (mobile), Claude API (AI), Node.js + Express (backend), PostgreSQL.

You are receiving instructions from Claude (the Senior Software Engineer / Architect).
Your job: execute coding tasks, research, write code, solve problems, and return clear results.
Be thorough, practical, and production-quality. When writing code, include file paths.
Always end your response with a ## Summary section listing what you produced."""


def get_client():
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("Error: OPENAI_API_KEY environment variable not set.")
        print("Run: export OPENAI_API_KEY=your-key-here")
        sys.exit(1)
    return OpenAI(api_key=api_key)


def get_pending_tasks():
    tasks = sorted(TASKS_DIR.glob("TASK_*.md"))
    done = set(RESPONSES_DIR.glob("RESPONSE_*.md"))
    done_ids = {p.stem.replace("RESPONSE_", "") for p in done}
    return [t for t in tasks if t.stem.replace("TASK_", "") not in done_ids]


def send_task(client, task_file: Path) -> str:
    task_id = task_file.stem.replace("TASK_", "")
    content = task_file.read_text()

    print(f"\n→ Sending task {task_id} to GPT-4.1...")

    response = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {"role": "system", "content": GPT_SYSTEM_PROMPT},
            {"role": "user", "content": content},
        ],
        temperature=0.3,
    )

    result = response.choices[0].message.content
    tokens_used = response.usage.total_tokens

    response_file = RESPONSES_DIR / f"RESPONSE_{task_id}.md"
    response_file.write_text(
        f"# GPT-4.1 Response — Task {task_id}\n"
        f"**Received:** {datetime.now().strftime('%Y-%m-%d %H:%M')}\n"
        f"**Tokens used:** {tokens_used}\n\n"
        f"---\n\n{result}"
    )

    print(f"✓ Response saved → bridge/responses/RESPONSE_{task_id}.md")
    return str(response_file)


def create_task(title: str, description: str, task_type: str = "code"):
    """Helper to programmatically create a new task file."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    task_id = f"{timestamp}"
    task_file = TASKS_DIR / f"TASK_{task_id}.md"

    content = f"""# Task {task_id}: {title}
**Type:** {task_type}
**From:** Claude (Senior Engineer)
**To:** GPT-4.1
**Created:** {datetime.now().strftime('%Y-%m-%d %H:%M')}

---

## Instruction

{description}

---

## Expected Output

- Working, production-quality code with file paths clearly indicated
- Brief explanation of decisions made
- Any dependencies or setup steps needed
- ## Summary at the end
"""
    task_file.write_text(content)
    print(f"✓ Task created → bridge/tasks/TASK_{task_id}.md")
    return task_id


def run():
    client = get_client()
    pending = get_pending_tasks()

    if not pending:
        print("No pending tasks. Write a task file in bridge/tasks/ to get started.")
        return

    print(f"Found {len(pending)} pending task(s).")
    for task_file in pending:
        send_task(client, task_file)

    print("\nAll tasks processed.")


if __name__ == "__main__":
    if len(sys.argv) == 1:
        run()
    elif sys.argv[1] == "new":
        if len(sys.argv) < 4:
            print("Usage: python gpt_bridge.py new 'Task Title' 'Task description...'")
            sys.exit(1)
        create_task(title=sys.argv[2], description=sys.argv[3])
    else:
        print("Usage:")
        print("  python gpt_bridge.py              # process all pending tasks")
        print("  python gpt_bridge.py new 'Title' 'Description'  # create a new task")
