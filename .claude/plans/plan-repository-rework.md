# Plan: Repository Rework - Simplify to Learn ADX & Presentation

## Overview

Rework the repository to:
1. Remove workshop page and voice integration
2. Keep only Learn ADX and Presentation pages
3. Update both pages to include latest ADX plugin changes
4. Add intro to Claude Code agentic workflow

## Phase 1: Remove Workshop & Voice Components

### Files to DELETE

**Workshop Components** (`src/components/workshop/`):
- `WorkshopTab.tsx`
- `WorkshopViewer.tsx`
- `WorkshopList.tsx`
- `WorkshopInput.tsx`
- `WorkshopGenerator.tsx`
- `WorkshopSlide.tsx`
- `WorkshopQuiz.tsx`
- `WorkshopExercise.tsx`
- `WorkshopPlayground.tsx`
- `WorkshopNarration.tsx`
- `WorkshopProgress.tsx`
- `AgendaSidebar.tsx`
- `index.ts`

**Live Components** (`src/components/live/`):
- `host/` - entire directory
- `participant/` - entire directory
- `index.ts`

**Voice Components** (`src/components/dashboard/`):
- `VoiceMode.tsx`
- `VoiceVisualizer.tsx`
- `ClaudeThinking.tsx` (only used by VoiceMode)
- `TerminalOutput.tsx` (only used by VoiceMode)
- `TerminalPreview.tsx` (only used by VoiceMode)
- `RealTerminal.tsx` (only used by VoiceMode)
- `AgentStatusCard.tsx` (only used by VoiceMode)

**Hooks**:
- `src/hooks/useWorkshop.ts`
- `src/hooks/useWorkshopNavigation.ts`
- `src/hooks/useLiveRoom.ts`
- `src/hooks/useHost.ts`
- `src/hooks/useParticipant.ts`

**Data**:
- `src/data/workshop-store.ts`
- `src/data/featured-workshops.ts`
- `src/data/workshops/` - entire directory

**Types**:
- `src/types/workshop.ts`
- `src/types/live-workshop.ts`

**Server** (no longer needed):
- `server/` - entire directory

### Files to MODIFY

**`src/App.tsx`**:
- Remove lazy imports for: WorkshopTab, VoiceMode, WorkshopViewer, JoinRoom, ParticipantView
- Remove routes: `/dashboard/workshops`, `/dashboard/workshops/new`, `/workshop/:workshopId`, `/join`, `/join/:roomCode`, `/live/:roomId`
- Keep: Dashboard, LearnADX, PresentationView, SlideRoute

**`src/components/dashboard/DashboardLayout.tsx`**:
- Remove tabs for "Workshops" and "Voice Mode"
- Keep only "Learn ADX" and "Presentation" tabs
- Update descriptions

**`src/components/dashboard/index.ts`**:
- Remove exports for deleted components

## Phase 2: Update Learn ADX Page

### Enhancements for `src/components/dashboard/LearnADX.tsx`

1. **Add Claude Code Agentic Workflow Introduction**
   - Add new introductory section explaining what Claude Code is
   - Explain agentic development concepts
   - Link to ADX plugin as the practical implementation

2. **Update Header**
   - Change title to "Claude Code Agentic Development"
   - Update subtitle to reflect the workshop focus

3. **Add New Tab: "Intro"**
   - Create new component `src/components/learn/AgenticIntro.tsx`
   - Explain:
     - What is Claude Code
     - What is agentic development
     - The Core 4 model (Prompts, Tools, Context Model, Agents)
     - Self-validating agents with hooks
     - ADX plugin overview

### Update `src/components/learn/WorkflowSimulator.tsx`

- Ensure 8-phase workflow is up to date
- Add references to latest ADX features

### Update `src/components/learn/CommandExplorer.tsx`

- Update command list with latest ADX commands
- Add new commands if any

### Update `src/components/learn/AgentPlayground.tsx`

- Update agent list with current ADX agents
- Add information about hook-based self-validation

### Update `src/data/commands.ts`

- Ensure all ADX commands are current

### Update `src/data/workflow-steps.ts`

- Ensure 8-phase workflow steps are accurate

### Update `src/data/learning-content.ts`

- Add content about agentic workflow
- Include hooks and self-validation content

## Phase 3: Update Presentation Slides

### Update existing slides with ADX plugin context

**`src/slides/01-intro.tsx`**:
- Update intro to focus on ADX plugin for Claude Code workshops
- Add what attendees will learn

**`src/slides/02-workflow.tsx`**:
- Ensure workflow visualization is current

**`src/slides/10-workflow-deep-dive.tsx`**:
- Add detail about each workflow phase

**`src/slides/07-agents.tsx`** (or `18-agents-showcase.tsx`):
- Update agent list
- Add information about self-validating agents

**`src/slides/08-best-practices.tsx`**:
- Add best practices for agentic development
- Include tips from knowledge base (hooks, specialized agents)

### Consider adding new slides:

1. **Agentic Development Intro Slide** - What is Claude Code, what is agentic development
2. **Self-Validating Agents Slide** - Hook-based validation pattern
3. **Core 4 Model Slide** - Prompts, Tools, Context Model, Agents

## Phase 4: Update Navigation and Routing

### Final route structure:

```
/                       → Redirect to /dashboard
/dashboard              → DashboardLayout
  /dashboard/learn      → LearnADX (with intro tab as default)
    /dashboard/learn/intro     → AgenticIntro (NEW)
    /dashboard/learn/workflow  → WorkflowSimulator
    /dashboard/learn/commands  → CommandExplorer
    /dashboard/learn/agents    → AgentPlayground
    /dashboard/learn/quiz      → QuizMode
  /dashboard/presentation → PresentationView
/slide/:id              → SlideRoute (individual slide view)
```

## Implementation Order

1. **Delete files** - Remove all workshop, voice, and live components
2. **Update App.tsx** - Remove routes and imports
3. **Update DashboardLayout.tsx** - Simplify navigation
4. **Create AgenticIntro.tsx** - New intro component
5. **Update LearnADX.tsx** - Add intro tab, update header
6. **Update learn components** - Refresh content
7. **Update data files** - Ensure commands/workflow are current
8. **Update presentation slides** - Add/update relevant slides
9. **Cleanup** - Remove any orphaned files

## Files Summary

### DELETE (Complete directories/files)
- `src/components/workshop/` (entire directory)
- `src/components/live/` (entire directory)
- `src/components/dashboard/VoiceMode.tsx`
- `src/components/dashboard/VoiceVisualizer.tsx`
- `src/components/dashboard/ClaudeThinking.tsx`
- `src/components/dashboard/TerminalOutput.tsx`
- `src/components/dashboard/TerminalPreview.tsx`
- `src/components/dashboard/RealTerminal.tsx`
- `src/components/dashboard/AgentStatusCard.tsx`
- `src/hooks/useWorkshop.ts`
- `src/hooks/useWorkshopNavigation.ts`
- `src/hooks/useLiveRoom.ts`
- `src/hooks/useHost.ts`
- `src/hooks/useParticipant.ts`
- `src/data/workshop-store.ts`
- `src/data/featured-workshops.ts`
- `src/data/workshops/`
- `src/types/workshop.ts`
- `src/types/live-workshop.ts`
- `server/` (entire directory)

### MODIFY
- `src/App.tsx`
- `src/components/dashboard/DashboardLayout.tsx`
- `src/components/dashboard/LearnADX.tsx`
- `src/components/dashboard/index.ts`
- `src/components/learn/WorkflowSimulator.tsx` (if needed)
- `src/components/learn/AgentPlayground.tsx` (if needed)
- `src/data/commands.ts` (if needed)
- `src/data/workflow-steps.ts` (if needed)
- `src/data/learning-content.ts`
- `src/slides/01-intro.tsx`

### CREATE
- `src/components/learn/AgenticIntro.tsx`

## Browser Verification Checklist

- [ ] Home page redirects to dashboard
- [ ] Dashboard shows only Learn ADX and Presentation tabs
- [ ] Learn ADX shows Intro, Workflow, Commands, Agents, Quiz tabs
- [ ] Intro tab displays agentic development content
- [ ] Workflow simulator works correctly
- [ ] Commands explorer shows all commands
- [ ] Agents playground shows all agents
- [ ] Quiz mode functions
- [ ] Presentation view shows all slides
- [ ] Slide navigation (arrows, keyboard) works
- [ ] Individual slide routes work (/slide/1, /slide/2, etc.)
- [ ] No console errors
- [ ] No broken imports/references
