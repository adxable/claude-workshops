# Workshop: Self-Validating Agents in Claude Code

## Overview

**Duration:** 2.5-3 hours (half-day format)
**Audience:** Developers already familiar with Claude Code basics
**Prerequisites:**
- Claude Code installed and configured
- Basic understanding of Claude Code commands and workflows
- Familiarity with terminal/command line
- Python 3.x with `uv` package manager (or pip)
- A code editor (VS Code recommended)

**Learning Outcomes:**
By the end of this workshop, participants will be able to:
1. Explain the three hook types and when to use each
2. Create custom commands with embedded validation hooks
3. Build validation scripts that provide actionable feedback
4. Implement the auto-fix feedback loop pattern
5. Deploy parallel agents with individual validation
6. Apply the "Core 4" mental model to agent architecture

---

## Agenda

| Time | Duration | Topic | Type |
|------|----------|-------|------|
| 0:00 | 15 min | Welcome and Setup Check | Setup |
| 0:15 | 20 min | Why Self-Validation Matters | Presentation |
| 0:35 | 15 min | The Core 4 Mental Model | Presentation |
| 0:50 | 10 min | **Break** | - |
| 1:00 | 25 min | Hook Types Deep Dive | Presentation + Demo |
| 1:25 | 30 min | Exercise 1: Your First Validator | Hands-on |
| 1:55 | 10 min | **Break** | - |
| 2:05 | 20 min | Advanced Patterns: Auto-Fix Loop | Demo |
| 2:25 | 25 min | Exercise 2: Self-Correcting Agent | Hands-on |
| 2:50 | 10 min | Parallel Agents & Observability | Presentation |
| 3:00 | 15 min | Wrap-up & Q&A | Discussion |

---

## Module 1: Why Self-Validation Matters (0:00 - 0:50)

### 1.1 Welcome and Setup Check (15 min)

**Objectives:**
- Verify all participants have working environments
- Set expectations for the workshop
- Create starter project structure

**Activities:**
- Quick poll: Who has used Claude Code hooks before?
- Environment verification checklist
- Clone/create workshop starter repo

### 1.2 The Trust Problem (20 min)

**Objectives:**
- Understand why validation is critical for production agents
- Distinguish between "hope it works" and "guaranteed validation"
- Recognize the cost of manual verification

**Key Concepts:**
- Specialized agents vs general-purpose agents
- The trust-time tradeoff
- Moving from global hooks to specialized validation

**Quote to highlight:**
> "Validation increases the trust we have in our agents, and trust saves the most precious engineering resource: time."

### 1.3 The Core 4 Mental Model (15 min)

**Objectives:**
- Understand the four fundamental primitives
- See how all abstractions collapse to Core 4
- Map custom commands, skills, and subagents to primitives

**The Core 4:**
1. **Prompts** - Instructions that guide behavior
2. **Tools** - Actions the agent can take
3. **Context Model** - Information available to the agent
4. **Agents** - The execution environment

**Key insight:** Custom commands, skills, and subagents are all just prompts running in agents with tools. Understanding this demystifies the entire system.

---

## Module 2: Hook Types Deep Dive (1:00 - 1:55)

### 2.1 The Three Hook Types (25 min)

**Objectives:**
- Understand when each hook type fires
- Choose the right hook for different validation scenarios
- Learn the frontmatter configuration syntax

**Hook Types:**

| Hook | Fires When | Best For |
|------|------------|----------|
| `pre-tool-use` | Before tool invocation | Input validation, permission checks |
| `post-tool-use` | After tool completes | Output validation, format checks |
| `on-stop` | Agent workflow ends | Multi-file validation, final checks |

**Demo: Live Configuration**
- Show hook configuration in custom command frontmatter
- Demonstrate each hook type firing
- Explain tool-specific hooks (read, write, bash)

### 2.2 Exercise 1: Your First Validator (30 min)

**Objectives:**
- Create a custom command with post-tool-use hook
- Build a simple validation script
- See validation feedback in action

**Exercise:**
Build a JSON validator that:
1. Runs after every write operation
2. Validates JSON syntax
3. Returns clear error messages

**Deliverables:**
- `.claude/commands/json-edit.md` with hook configuration
- `.claude/hooks/validators/json_validator.py`
- Successful validation run

---

## Module 3: Advanced Patterns (2:05 - 2:50)

### 3.1 The Auto-Fix Feedback Loop (20 min)

**Objectives:**
- Understand closed-loop validation and correction
- Design validators that enable self-correction
- Implement the error message pattern

**Key Pattern:**
```
Agent writes file -> Validator runs -> Error found ->
Error message returned to agent -> Agent fixes ->
Validator runs again -> Success
```

**Demo: CSV Validation with Auto-Fix**
- Intentionally create malformed CSV
- Watch agent receive error and self-correct
- Examine validation logs

**Critical Design Point:**
Validators must return actionable error messages:
- Bad: "Validation failed"
- Good: "CSV error on row 3: Expected 5 columns, found 4. Missing value in 'amount' column."

### 3.2 Exercise 2: Self-Correcting Agent (25 min)

**Objectives:**
- Build a complete self-validating workflow
- Implement meaningful error messages
- Test the auto-fix behavior

**Exercise:**
Create a CSV processing agent that:
1. Reads a CSV file
2. Validates structure and data types
3. Automatically fixes common errors
4. Logs all validation attempts

**Challenge mode:** Add schema validation (required columns, data types)

### 3.3 Parallel Agents & Observability (10 min)

**Objectives:**
- Understand when to parallelize validation
- Implement per-file agent deployment
- Set up validation logging for debugging

**Pattern: One Agent Per File**
When processing multiple files:
1. Orchestrator agent spawns subagents
2. Each subagent handles one file
3. Each has its own validation hooks
4. Logs aggregate for full visibility

**Logging Pattern:**
Each validator writes to its own timestamped log file in `.claude/logs/validators/`

---

## Module 4: Wrap-up (2:50 - 3:15)

### 4.1 Key Takeaways

1. **Specialize your agents** - Focused agents outperform generalists
2. **Validate deterministically** - Use scripts, not prompts, for validation
3. **Enable self-correction** - Clear error messages let agents fix themselves
4. **Log everything** - Observability is critical for debugging
5. **Know what your agents do** - Read documentation, avoid vibe coding

### 4.2 Warning: Avoid Vibe Coding

> "The key difference between real engineering and vibe coding is that engineers know what their agents are doing."

- Read Claude Code release notes
- Understand your validation scripts
- Maintain engineering fundamentals

### 4.3 Next Steps

- [ ] Audit existing agents for validation opportunities
- [ ] Create a validators directory in your projects
- [ ] Build specialized agents for repetitive tasks
- [ ] Implement logging for all validation runs
- [ ] Share patterns with your team

### 4.4 Resources

- Claude Code documentation on hooks
- Workshop exercise solutions (provided)
- Community patterns repository
- Related: MCP servers, subagent patterns

---

## Facilitator Notes

### Before the Workshop

- [ ] Test all demos on fresh environment
- [ ] Prepare backup demo recordings
- [ ] Create pre-configured starter repos
- [ ] Set up shared chat for questions
- [ ] Prepare printed quick-reference cards

### Required Setup

- Claude Code CLI (latest version)
- Python 3.9+ with uv or pip
- pandas library (for CSV exercises)
- VS Code or similar editor
- Terminal access

### Backup Plans

- **If Claude Code is slow:** Use pre-recorded demos, continue with exercises
- **If time runs short:** Cut parallel agents section, extend exercises
- **If exercises are too easy:** Add schema validation challenge
- **If exercises are too hard:** Provide partial solutions, pair programming

### Common Issues

| Issue | Solution |
|-------|----------|
| Hook not firing | Check absolute path, verify frontmatter syntax |
| Validator errors | Check Python environment, verify uv/pip setup |
| Permission denied | Check file permissions on validator script |
| No feedback to agent | Ensure validator prints to stdout |
