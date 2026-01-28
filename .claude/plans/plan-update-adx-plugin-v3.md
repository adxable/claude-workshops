# Plan: Update ADX Plugin to v3.0

**Type:** Plugin Update
**Created:** 2026-01-20

## Goal

Update the ADX toolkit plugin from v2.0 to v3.0 to get access to all the new features that were pushed to GitHub.

## Current State

- **Installed Version:** 2.0.0 (git commit: `19b317f`)
- **Latest Version:** 3.0 (git commit: `09cf34e`)
- **Install Location:** `~/.claude/plugins/cache/adx-marketplace/adx/2.0.0`
- **Marketplace:** `adxable/adx-toolkit`

## New Features in v3.0 (from diff)

### New Agents (+6)
| Agent | Purpose |
|-------|---------|
| `docs-generator` | Generate documentation (README, component docs, JSDoc) |
| `implementer` | Execute implementation plans step-by-step |
| `pattern-researcher` | Discover and research Claude Code patterns |
| `planner` | Research and create implementation plans |
| `security-auditor` | Scan for vulnerabilities and security issues |
| `verifier` | Type check + lint + build + tests verification |

### Updated Agents
| Agent | Changes |
|-------|---------|
| `browser-tester` | +285 lines - Enhanced visual testing |
| `code-reviewer` | +98 lines - Improved review capabilities |
| `refactorer` | +86 lines - Better cleanup patterns |

### New Commands (+4)
| Command | Description |
|---------|-------------|
| `/adx:costs` | Monitor usage metrics (today, week, month) |
| `/adx:discover` | Research new Claude Code patterns |
| `/adx:memory` | Manage decisions and lessons |
| `/adx:setup` | Project configuration wizard |

### Enhanced Commands
| Command | Enhancements |
|---------|--------------|
| `/adx:ship` | +599 lines - Checkpoint system, `--continue`, `--rollback` |
| `/adx:verify` | +229 lines - Test integration, multiple flags |

### New Hooks (+7)
| Hook | Purpose |
|------|---------|
| `checkpoint.py` | Save/restore pipeline state |
| `circuit_breaker.py` | Safety limits for `/ralph` loops |
| `context_loader.py` | Load project context at session start |
| `context_updater.py` | Update context during session |
| `cost_tracker.py` | Track API usage costs |
| `dev_standards_loader.py` | Load development standards |
| `memory_updater.py` | Persist decisions and lessons |

### New Skills (+3)
| Skill | Purpose |
|-------|---------|
| `code-quality-rules` | Enforce code quality standards |
| `frontend-dev-guidelines` | Frontend development best practices |
| `project-structure` | Project organization patterns |

### New Memory System
- `decisions.md` - Track architectural decisions
- `lessons.md` - Capture lessons learned
- Session context persistence

### New Templates
- `code-quality.json`
- `frontend-guidelines.json`
- `project-structure.json`

## Update Approach

### Option 1: Claude Code CLI Update (Recommended)
```bash
claude plugin update adx@adx-marketplace
```

### Option 2: Manual Git Pull
```bash
cd ~/.claude/plugins/cache/adx-marketplace/adx/2.0.0
git pull origin main
```

### Option 3: Reinstall Fresh
```bash
claude plugin uninstall adx@adx-marketplace
claude plugin install adx@adx-marketplace
```

## Implementation Steps

1. **Update the plugin** via Claude Code CLI
2. **Verify installation** by checking the new commit SHA
3. **Run setup wizard** (`/adx:setup`) to configure new hooks and memory
4. **Test new commands** - verify `/adx:costs`, `/adx:memory`, `/adx:discover` work
5. **Update project CLAUDE.md** if needed for new features

## Post-Update Verification

- [ ] Plugin shows v3.0 in marketplace
- [ ] New agents available (`security-auditor`, `verifier`, etc.)
- [ ] New commands work (`/adx:costs`, `/adx:memory`, `/adx:discover`)
- [ ] Hooks registered (`checkpoint.py`, `circuit_breaker.py`, etc.)
- [ ] Skills loaded (`code-quality-rules`, etc.)
- [ ] `/adx:ship --continue` checkpoint recovery works

## Risks & Considerations

1. **Breaking Changes** - v3.0 may have changed command signatures
2. **Hooks Conflicts** - New hooks may conflict with existing hooks
3. **Memory System** - New `.claude/memory/` directory will be created
4. **Settings** - `settings.json` has +24 lines of new configuration

## Files Changed in Update

| Category | Files Added/Modified |
|----------|---------------------|
| Agents | +6 new, 3 modified |
| Commands | +4 new, 2 modified |
| Hooks | +7 new |
| Skills | +3 new |
| Templates | +3 new |
| Config | CLAUDE.md, settings.json updated |

**Total Changes:** +7,701 lines, -431 lines across 39 files
