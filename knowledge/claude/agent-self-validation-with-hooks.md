# Your Agents Should Be Validating Their Own Work (Claude Code Hooks)

**Source:** https://www.youtube.com/watch?v=u5GkG71PkR0
**Date Condensed:** 2026-01-21
**Category:** claude
**Duration:** ~27 minutes
**Speaker:** Unknown (Claude Code for Engineers series)

## TL;DR

Claude Code now supports hooks in custom commands, subagents, and skills, enabling specialized self-validation at the agent level. By embedding validation scripts that run post-tool-use, agents can deterministically verify their own work without manual intervention, dramatically increasing trust and saving engineering time. This is a fundamental shift from global hooks to specialized, context-specific validation.

## Key Topics

### 1. Hook-Based Self-Validation

Claude Code introduced hooks that can be embedded directly in prompts, subagents, and skills. These hooks run at specific points (pre-tool-use, post-tool-use, on-stop) and enable agents to validate their work deterministically.

**Key Point:** Hooks transform agents from "hope it works" to "guaranteed validation" by running specialized validation scripts after every relevant action.

### 2. Specialized Agents vs General-Purpose Agents

A focused agent that does one thing exceptionally well outperforms a multi-purpose agent over dozens, hundreds, or thousands of runs. Specialization enables better validation and more predictable outcomes.

**Key Point:** Build agents like CSVedit that only edit CSV files, not generalist agents that handle 10-20 different tasks poorly.

### 3. The Three Hook Types

Hooks can be triggered at three points in the agent lifecycle:
- **pre-tool-use:** Runs before a tool is invoked
- **post-tool-use:** Runs after a tool completes (most common for validation)
- **on-stop:** Runs when the agent finishes its entire workflow

**Key Point:** Post-tool-use hooks are ideal for single-file validation, while on-stop hooks work well for validating multiple files or entire codebases.

### 4. The Core 4 Context Model Tools

Everything in agentic engineering reduces to four fundamental tools: Prompts, Tools, Context Model, and Agents. All abstractions (custom commands, skills, subagents) eventually collapse into these core primitives.

**Key Point:** Understanding that custom commands and skills are essentially prompts running in agents helps demystify the entire system.

### 5. Implementation Pattern

The standard implementation places validation scripts in `.claude/hooks/validators/` and references them in the frontmatter of prompts/subagents/skills:

```yaml
hooks:
  post-tool-use:
    read: "uv run /absolute/path/to/validator.py {file_path}"
    write: "uv run /absolute/path/to/validator.py {file_path}"
```

**Key Point:** Always use absolute paths in hooks, and generate detailed log files for observability.

### 6. Validation Feedback Loop

When validation fails, the validator script returns errors directly to the agent with instructions like "Fix this CSV error: {error_details}". The agent immediately corrects the issue and reruns validation.

**Key Point:** Agents can fix their own mistakes in a closed loop without human intervention, as long as validation provides clear error messages.

### 7. Warning Against "Vibe Coding"

The speaker warns against over-relying on agents to the point where engineers stop learning. Reading documentation, understanding what agents do, and maintaining engineering fundamentals are critical.

**Key Point:** "The key difference between real engineering and vibe coding is that engineers know what their agents are doing."

## Techniques & Patterns

| Technique | Description | When to Use |
|-----------|-------------|-------------|
| Post-tool-use validation | Run validation script after read/write operations | Single file operations where you know the file path |
| On-stop validation | Run validation when entire agent workflow completes | Multi-file operations or codebase-wide checks |
| CSV validation pattern | Parse CSV with pandas, detect errors, return to agent | Any structured data format that needs schema validation |
| Parallel agent deployment | Deploy one specialized agent per file using subagents | When processing multiple files with same operation |
| Validator log files | Each validator writes to its own log file | Debugging and proof that validation ran |

## Actionable Takeaways

- [ ] Move validation from global settings.json hooks to specialized prompt/subagent/skill hooks
- [ ] Create a `.claude/hooks/validators/` directory for validation scripts
- [ ] Build focused agents that do one thing well (e.g., CSVedit, HTMLvalidate)
- [ ] Use post-tool-use hooks for immediate validation after operations
- [ ] Return clear error messages from validators so agents can self-correct
- [ ] Generate log files from every validation run for observability
- [ ] Read Claude Code release notes carefully - valuable features are often buried

## Memorable Quotes

> "Validation increases the trust we have in our agents, and trust saves the most precious engineering resource: time."

> "A focused agent doing one thing exceptionally well outperforms an unfocused multi-purpose agent."

> "Engineers know what their agents are doing. If you want to know what they do, you must read the documentation."

> "You're not working on your application anymore. You're working on the agents that run your application."

> "Every good engineer validates their work. Soon it will be exactly the same with your agents."

## Workshop Notes

**Relevance:** High
**Good for:** Intermediate/Advanced
**Potential demo:** Yes - Live CSV validation demo showing error detection and self-correction
**Exercise idea:** Have attendees build a simple JSON validator that runs post-write, intentionally break a JSON file, and watch the agent fix it automatically

## Related Topics

- MCP servers and tool integration
- Context window management and delegation
- Agentic workflow patterns (parallelization, isolation)
- The "Core 4" model context tools framework
- Prompt engineering for specialized agents
- Observability patterns in agentic systems
- Ralph Wiggum technique (agents + code patterns)

## Additional Notes

### Real-World Example
The video demonstrates a complete financial review system where agents:
1. Read CSV files with transaction data
2. Format and validate data structure
3. Generate charts and reports
4. Present findings in a generative UI

Each agent in the chain validates its own work using specialized hooks, creating a reliable end-to-end pipeline.

### Hook Configuration Location
Hooks can be defined in three places:
- **Custom commands** (.claude/commands/*.md)
- **Subagents** (.claude/agents/*.md)
- **Skills** (.claude/skills/*.md)

All use the same frontmatter format with the hooks section.

### The Merge of Commands and Skills
Claude Code team merged custom slash commands and skills into one concept, reinforcing the idea that everything is fundamentally a prompt running in an agent with tools.

---
*Condensed from Polish-language transcript by transcript-condenser agent*
