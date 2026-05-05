# Team Workflow — Claude + GPT-4.1 + Tenzin

---

## How We Work

```
Tenzin (Product Owner)
    ↓ direction & decisions
Claude (Senior Engineer)
    ↓ writes task files
bridge/tasks/TASK_*.md
    ↓ python gpt_bridge.py
GPT-4.1 (Coder/Researcher)
    ↓ returns output
bridge/responses/RESPONSE_*.md
    ↑ Claude reads & reviews
```

---

## Running the Bridge

### One-time setup
```bash
cd nyingje-app
pip install openai
export OPENAI_API_KEY=your-key-here
```

### Process pending tasks
```bash
python bridge/gpt_bridge.py
```

### Create a task manually (Claude does this automatically)
```bash
python bridge/gpt_bridge.py new "Task Title" "Detailed description..."
```

---

## Task File Format

Tasks live in `bridge/tasks/TASK_YYYYMMDD_HHMMSS.md`

```markdown
# Task [ID]: [Title]
**Type:** code | research | design | review
**From:** Claude (Senior Engineer)
**To:** GPT-4.1
**Created:** [date]

---

## Instruction
[Detailed instructions from Claude]

---

## Expected Output
[What Claude expects back]
```

---

## Response File Format

Responses land in `bridge/responses/RESPONSE_[ID].md` automatically after running the bridge.

---

## Claude's Review Process

After each GPT-4.1 response:
1. Claude reads the response
2. Accepts, requests changes, or escalates to Tenzin
3. Merges accepted code into the project
4. Updates `CLAUDE_VISION.md` if architecture changed

---

## Ground Rules

- **Claude owns architecture decisions** — GPT-4.1 implements, doesn't design
- **Tenzin has final say** on product direction
- **Nothing ships** without Claude reviewing GPT-4.1's code
- **Security and privacy** are non-negotiable at every step
