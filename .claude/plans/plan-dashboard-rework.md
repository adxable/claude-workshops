# Plan: Dashboard Rework for Claude Demo

**Type:** Feature / Rework
**Created:** 2026-01-20

## Goal

Rework the Claude Workshop dashboard to:
1. **Extended Presentation** - Better cover ADX plugin workflow features with more detailed slides
2. **Working Voice Mode** - Enable real voice interaction with Claude Code running in terminal
3. **Interactive Learning Page** - Replace Terminal tab with an engaging, interactive page to teach the workflow

Target audience: 300 people at internal demo to inspire Claude adoption.

## Research Findings

### Current Architecture
- **3 Dashboard tabs**: Terminal (demo simulation), Voice Mode, Presentation
- **9 slides** covering: intro, workflow phases, commands, agents, best practices
- **Voice Mode**: WebSocket to `ws://localhost:3001`, uses whisper.cpp + macOS `say` command
- **Server**: Node.js server spawns Claude CLI with `--print --dangerously-skip-permissions`
- **UI Stack**: React 19, Framer Motion, Tailwind CSS, Lucide icons

### Key Insights
1. Voice mode backend already works - spawns Claude Code and speaks responses
2. Presentation system is extensible - just add slides to `slides/index.ts`
3. Terminal tab is pure simulation - can be fully replaced
4. Good component library exists: `CommandCard`, `WorkflowDiagram`, `AgentStatusCard`

## Approach

### Phase 1: Extended Presentation (New Slides)
Add detailed slides covering the full ADX workflow with:
- Interactive workflow visualizations
- Command deep-dives with real examples
- Agent showcase with capabilities
- Live demo integration points

### Phase 2: Voice Mode Enhancement
- Fix connection handling and error states
- Add visual feedback during Claude's work
- Show real-time tool usage and progress
- Make it demo-ready with better UX

### Phase 3: Interactive Learning Page
Replace Terminal with an interactive "Learn ADX" experience:
- **Workflow Simulator** - Step through the pipeline interactively
- **Command Explorer** - Try commands with explanations
- **Agent Playground** - See what each agent does
- **Quiz/Challenge Mode** - Gamified learning

## Files to Create/Modify

### Phase 1: Presentation

| File | Action | Purpose |
|------|--------|---------|
| `src/slides/10-workflow-deep-dive.tsx` | Create | Interactive 7-phase workflow breakdown |
| `src/slides/11-setup-command.tsx` | Create | `/setup` command detailed guide |
| `src/slides/12-plan-command.tsx` | Create | `/plan` workflow with examples |
| `src/slides/13-implement-command.tsx` | Create | `/implement` with live code examples |
| `src/slides/14-refactor-command.tsx` | Create | `/refactor` patterns |
| `src/slides/15-verify-command.tsx` | Create | `/verify` - type check, lint, build |
| `src/slides/16-review-command.tsx` | Create | `/review` code review flow |
| `src/slides/17-git-workflow.tsx` | Create | `/commit` + `/pr` combined |
| `src/slides/18-agents-showcase.tsx` | Create | All 9 agents with use cases |
| `src/slides/19-real-world-demo.tsx` | Create | End-to-end feature implementation |
| `src/slides/index.ts` | Modify | Register new slides |
| `src/data/workflow-steps.ts` | Modify | Add more detailed step data |
| `src/data/commands.ts` | Modify | Add `/setup` and more examples |

### Phase 2: Voice Mode

| File | Action | Purpose |
|------|--------|---------|
| `src/components/dashboard/VoiceMode.tsx` | Modify | Better UX, visual feedback, tool display |
| `src/components/dashboard/VoiceVisualizer.tsx` | Create | Audio waveform visualization |
| `src/components/dashboard/ClaudeThinking.tsx` | Create | Animated thinking indicator |
| `src/components/dashboard/ToolUsageDisplay.tsx` | Create | Show tools Claude is using |
| `server/index.js` | Modify | Stream tool usage, better error handling |

### Phase 3: Interactive Learning

| File | Action | Purpose |
|------|--------|---------|
| `src/components/dashboard/LearnADX.tsx` | Create | Main interactive learning page |
| `src/components/learn/WorkflowSimulator.tsx` | Create | Step-through workflow experience |
| `src/components/learn/CommandExplorer.tsx` | Create | Interactive command reference |
| `src/components/learn/AgentPlayground.tsx` | Create | Agent capability explorer |
| `src/components/learn/QuizMode.tsx` | Create | Optional gamification |
| `src/components/learn/index.ts` | Create | Export all learn components |
| `src/data/learning-content.ts` | Create | Quiz questions, scenarios, tips |
| `src/components/dashboard/Dashboard.tsx` | Modify | Replace Terminal tab with Learn |

## Implementation Steps

### Phase 1: Extended Presentation (Priority: High)

1. **Update data files**
   - Add `/setup` command to `commands.ts`
   - Add detailed workflow descriptions
   - Add agent use-case examples

2. **Create presentation slides**
   - `/setup` introduction slide
   - Workflow deep-dive with interactive diagram
   - One slide per main command with examples
   - Agent showcase with animations
   - Real-world demo scenario slide

3. **Update slide registry**
   - Register all new slides in `slides/index.ts`
   - Update slide count and navigation

### Phase 2: Voice Mode Polish (Priority: High)

4. **Enhance VoiceMode component**
   - Add connection status with retry
   - Visual "thinking" animation while Claude works
   - Display which tools Claude is using
   - Better error handling and fallbacks

5. **Improve server integration**
   - Parse and forward tool usage from Claude output
   - Add heartbeat for connection stability
   - Improve response chunking for smoother TTS

6. **Add visual components**
   - Audio visualizer during recording
   - Animated Claude avatar/indicator
   - Tool usage pills/badges

### Phase 3: Interactive Learning (Priority: Medium)

7. **Create LearnADX main component**
   - Tab-based or step-based navigation
   - Links between sections
   - Progress tracking (session-based)

8. **Build WorkflowSimulator**
   - 7-phase interactive walkthrough
   - Click to advance, animations between phases
   - Show what happens at each step
   - "Try it yourself" prompts

9. **Build CommandExplorer**
   - Searchable command list
   - Click to see details, examples, tips
   - Copy-to-clipboard functionality
   - Related commands suggestions

10. **Build AgentPlayground**
    - Grid of 9 agents
    - Click to see capabilities
    - Example scenarios for each
    - When to use which agent

11. **Update Dashboard**
    - Replace Terminal tab with Learn tab
    - Update tab icons and labels
    - Ensure smooth transitions

## Visual Design Notes

### Presentation Slides
- Use existing color scheme (purple, blue, cyan gradients)
- Interactive elements with Framer Motion
- Large text for 300-person audience
- Dark mode optimized

### Voice Mode
- Pulsing orb during recording (like Siri)
- Thinking dots animation
- Tool badges that appear/disappear
- Terminal output with syntax highlighting

### Learn Page
- Card-based layout matching existing design
- Progress indicators
- Gamification elements (optional badges)
- Mobile-responsive for follow-along

## Verification

- [ ] Type check passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] All new slides render correctly
- [ ] Voice mode connects and works
- [ ] Learning page is interactive
- [ ] Works on large screen (demo)
- [ ] Responsive on tablets (follow-along)

## Demo Flow Suggestion

1. Start with **Presentation** - quick intro slides
2. Switch to **Voice Mode** - show voice interaction with Claude
3. Use **Learn ADX** - interactive exploration
4. Return to **Presentation** - Q&A slide

---

## Estimated Scope

| Phase | Files | Complexity |
|-------|-------|------------|
| Phase 1 | ~12 new slides + data | Medium |
| Phase 2 | ~4 components + server | Medium |
| Phase 3 | ~5 components + data | Medium-High |

## Questions for User

1. **Presentation depth**: Do you want all 10 new slides, or should we prioritize certain commands?
2. **Voice mode**: Do you need the voice mode to work without the server (browser-only fallback)?
3. **Interactive learning**:
   - Do you want quiz/gamification features?
   - Should it track progress across sessions?
4. **Demo priority**: Should we focus more on presentation or voice mode for the 300-person demo?
