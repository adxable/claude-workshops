# Facilitator Checklist: Self-Validating Agents Workshop

## One Week Before

- [ ] Confirm room/video setup
- [ ] Send calendar invites with prerequisites
- [ ] Test all demos on a clean environment
- [ ] Prepare backup demo recordings
- [ ] Create pre-configured starter repos (optional)
- [ ] Print quick reference cards

## Day Before

- [ ] Review speaker notes completely
- [ ] Test Claude Code is working (not rate limited)
- [ ] Verify Python environment
- [ ] Prepare sample files with intentional errors
- [ ] Set up shared channel for questions (Slack/Teams)
- [ ] Charge laptop, test projector/screen share

## Morning Of

- [ ] Arrive 30 minutes early
- [ ] Test AV equipment
- [ ] Open all demo terminals/editors
- [ ] Clear Claude Code context for clean demos
- [ ] Have water available
- [ ] Post starter repo link in chat

## Required Software (Verify)

```bash
# Participants need:
claude --version    # Recent Claude Code CLI
python3 --version   # 3.9+
uv --version        # Or pip --version
```

## Demo Project Structure

Create before workshop:

```
demo-project/
├── .claude/
│   ├── commands/
│   │   ├── json-edit.md
│   │   └── csv-edit.md
│   ├── hooks/
│   │   └── validators/
│   │       ├── json_validator.py
│   │       └── csv_validator.py
│   └── logs/
├── test.json           # Intentionally broken
└── transactions.csv    # Intentionally broken
```

## Broken Test Files

### test.json (for demos)
```json
{"name": "test", "value": }
```

### transactions.csv (for demos)
```csv
date,vendor,description,amount,category
2024-01-15,ACME Corp,Invoice,1500,Services
2024-01-16,Tech Inc,Software License,2500
2024-01-17,Office Depot,Supplies,150,Office
,Amazon,Books,45,Education
```

## Timing Guide

| Time | Duration | Section |
|------|----------|---------|
| 0:00 | 15 min | Welcome & Setup |
| 0:15 | 20 min | Why Self-Validation Matters |
| 0:35 | 15 min | The Core 4 Mental Model |
| 0:50 | 10 min | BREAK |
| 1:00 | 25 min | Hook Types Deep Dive |
| 1:25 | 30 min | Exercise 1: JSON Validator |
| 1:55 | 10 min | BREAK |
| 2:05 | 20 min | Auto-Fix Loop Demo |
| 2:25 | 25 min | Exercise 2: CSV Agent |
| 2:50 | 10 min | Parallel Agents |
| 3:00 | 15 min | Wrap-up & Q&A |

## If Running Behind

Priority cuts (in order):
1. Shorten parallel agents section (save 5 min)
2. Skip Core 4 deep dive (save 10 min)
3. Provide partial Exercise 2 solutions (save 10 min)

## If Running Ahead

Extensions:
1. Add schema validation to Exercise 2
2. Live code an on-stop hook
3. Extended Q&A

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Hook not firing | Check absolute path first |
| Python path issues | Use `python3` explicitly |
| Permission denied | `chmod +x` on validator |
| No feedback to agent | Must use `print()` to stdout |
| YAML parse error | Check frontmatter indentation |
| Claude rate limited | Use backup recordings |

## Backup Plans

### If Claude Code is slow/down:
1. Use pre-recorded demo videos
2. Focus on code review and discussion
3. Have participants read solution code
4. Continue with conceptual exercises

### If exercises are too hard:
1. Provide more starter code
2. Pair participants
3. Walk through solution together
4. Focus on one exercise only

### If exercises are too easy:
1. Add schema validation challenge
2. Have them add on-stop hooks
3. Build multi-file validation
4. Discuss production patterns

## Poll Questions (Engagement)

### Opening:
- "Who has used Claude Code before?" (expect most)
- "Who has used custom commands?" (expect many)
- "Who has used hooks?" (expect few)

### After Exercise 1:
- "Who got validation working?"
- "What was the trickiest part?"

### After Exercise 2:
- "Who saw the auto-fix loop in action?"
- "Anyone tackle the challenge mode?"

## Key Quotes to Emphasize

1. "Validation increases the trust we have in our agents, and trust saves the most precious engineering resource: time."

2. "A focused agent doing one thing exceptionally well outperforms an unfocused multi-purpose agent."

3. "The key difference between real engineering and vibe coding is that engineers know what their agents are doing."

## Post-Workshop

### Send to Participants:
- [ ] Exercise solutions link
- [ ] Quick reference card PDF
- [ ] Claude Code hooks documentation link
- [ ] Feedback survey link

### Collect:
- [ ] Feedback on pacing
- [ ] Difficulty ratings
- [ ] Topic requests for future workshops
- [ ] Any unresolved questions

## Notes Space

_Use this space for observations during the workshop:_

---

---

---
