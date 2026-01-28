# Plan: Workshop CLI Migration - From Browser UI to Claude Agents

**Type:** Feature / Architecture Migration
**Created:** 2026-01-22
**Status:** Ready for Implementation

## Decisions Made

| Question | Decision |
|----------|----------|
| Knowledge format | **Expand it** - add code examples, related links, difficulty ratings |
| Workshop output | **Markdown only** - outline, speaker-notes, slides, participant-guide |
| Interactions | **All features** - existing + Q&A queue + code challenges + leaderboard |
| Priority | **Full implementation in phases** |

---

## Goal

Migrate workshop generation from browser UI to Claude CLI and enhance the interactive experience.

**Two CLI Commands:**
1. `/condense` - Transform transcript/text into expanded knowledge file
2. `/workshop` - Generate workshop materials from knowledge base

**Enhanced App Experience:**
- Presentation mode with agenda sidebar
- Q&A queue system
- Code challenges with live validation
- Leaderboard for gamified quizzes

---

## Phased Implementation

### Phase 1: CLI Foundation
> `/condense` and `/workshop` commands working

### Phase 2: Presentation Enhancement
> Agenda sidebar, better host controls

### Phase 3: Q&A System
> Question submission, queue management, anonymous option

### Phase 4: Gamification
> Leaderboard, timed quizzes, point system

### Phase 5: Code Challenges
> Live code submission, auto-validation, results display

---

## Phase 1: CLI Foundation

### 1.1 Expanded Knowledge File Format

```markdown
# {Title}

**Source:** {URL}
**Date Condensed:** {date}
**Category:** {category}
**Duration:** {original duration}
**Speaker:** {speaker name}
**Difficulty:** {beginner|intermediate|advanced}

## TL;DR

{2-3 sentence summary}

## Key Topics

### 1. {Topic Name}

{Detailed explanation}

**Key Point:** {one-liner takeaway}

**Code Example:**
```{language}
{code}
```

### 2. {Topic Name}
...

## Techniques & Patterns

| Technique | Description | When to Use |
|-----------|-------------|-------------|
| {name} | {what it is} | {use case} |

## Actionable Takeaways

- [ ] {action item 1}
- [ ] {action item 2}

## Memorable Quotes

> "{quote 1}"

> "{quote 2}"

## Code Examples

### {Example Name}
```{language}
{full working code example}
```

## Related Resources

- [{title}]({url}) - {brief description}
- [{title}]({url}) - {brief description}

## Workshop Notes

**Relevance:** {High|Medium|Low}
**Good for:** {audience level}
**Potential demo:** {Yes/No} - {description}
**Exercise idea:** {hands-on activity description}

## Related Topics

- {topic 1}
- {topic 2}
```

### 1.2 Files to Create

| File | Purpose |
|------|---------|
| `.claude/skills/condense.md` | User-invocable `/condense` command |
| `.claude/skills/workshop.md` | User-invocable `/workshop` command |
| `.claude/agents/transcript-condenser.md` | Subagent for condensation logic |
| `.claude/agents/workshop-prep.md` | Subagent for workshop generation |

### 1.3 Verification

- [ ] `/condense` creates expanded knowledge file with all sections
- [ ] `/workshop` generates 4 markdown files in `workshops/{topic}/`
- [ ] Output matches quality of existing `workshops/self-validating-agents/`

---

## Phase 2: Presentation Enhancement

### 2.1 Agenda Sidebar

Host sees:
- Workshop title and progress
- Clickable section list with timing
- Current section highlighted
- Total time remaining

### 2.2 Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/components/workshop/AgendaSidebar.tsx` | Create | Collapsible agenda panel |
| `src/components/workshop/WorkshopViewer.tsx` | Modify | Integrate sidebar |
| `src/hooks/useWorkshopNavigation.ts` | Modify | Add section jumping |

### 2.3 Verification

- [ ] Agenda sidebar shows all sections
- [ ] Clicking section jumps to it
- [ ] Progress updates in real-time
- [ ] Sidebar collapses on mobile/fullscreen

---

## Phase 3: Q&A System

### 3.1 Features

**Participant can:**
- Submit question (with optional anonymity)
- Upvote others' questions
- See when their question is picked

**Host can:**
- See question queue sorted by upvotes
- Pick question to display
- Mark question as answered
- Dismiss question

### 3.2 WebSocket Messages

```typescript
// Participant → Server
participant_question_submit: { text: string, anonymous: boolean }
participant_question_upvote: { questionId: string }

// Server → All
question_submitted: { id, text, anonymous, upvotes }
question_upvoted: { questionId, upvotes }
question_picked: { questionId }
question_answered: { questionId }
```

### 3.3 Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/types/live-workshop.ts` | Modify | Add Q&A types |
| `src/components/live/QAQueue.tsx` | Create | Host queue view |
| `src/components/live/QuestionSubmit.tsx` | Create | Participant input |
| `src/components/live/QuestionDisplay.tsx` | Create | Show picked question |
| `server/live-room-manager.js` | Modify | Handle Q&A events |

### 3.4 Verification

- [ ] Participant can submit question
- [ ] Questions appear in host queue
- [ ] Upvotes sort questions
- [ ] Picked question displays to all
- [ ] Anonymous questions hide name

---

## Phase 4: Gamification & Leaderboard

### 4.1 Features

**Quiz Battles:**
- Timed questions (10-30 seconds)
- Points for correct answers
- Bonus points for speed
- Live leaderboard

**Point System:**
| Action | Points |
|--------|--------|
| Correct answer | 100 |
| Speed bonus | up to +50 |
| First correct | +25 |
| Streak (3+) | x1.5 multiplier |

### 4.2 Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/types/live-workshop.ts` | Modify | Add leaderboard types |
| `src/components/live/Leaderboard.tsx` | Create | Rankings display |
| `src/components/live/QuizTimer.tsx` | Create | Countdown timer |
| `src/components/live/ScorePopup.tsx` | Create | Points earned animation |
| `server/live-room-manager.js` | Modify | Track scores, calculate rankings |

### 4.3 Verification

- [ ] Timer counts down during quiz
- [ ] Points calculated correctly
- [ ] Leaderboard updates in real-time
- [ ] Speed bonus works
- [ ] Streak multiplier works

---

## Phase 5: Code Challenges

### 5.1 Features

**Participant can:**
- See challenge description
- Write code in mobile-friendly editor
- Submit solution
- See test results

**Host can:**
- Start code challenge
- See submission count
- Reveal solutions
- Show top solutions

### 5.2 Integration with Existing PlaygroundContent

Leverage existing `PlaygroundContent` type:
```typescript
interface PlaygroundContent {
  type: 'playground'
  title: string
  description: string
  mode: 'code' | 'visual'
  starterCode: string
  solution?: string
  tests: PlaygroundTest[]
  hints?: string[]
  xpReward: number
  language: 'javascript' | 'typescript'
}
```

### 5.3 Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/components/live/CodeChallengeParticipant.tsx` | Create | Mobile code editor |
| `src/components/live/CodeChallengeHost.tsx` | Create | Host control panel |
| `src/components/live/SubmissionResults.tsx` | Create | Test results display |
| `server/live-room-manager.js` | Modify | Handle code submissions |
| `server/code-validator.js` | Create | Run tests on submissions |

### 5.4 Verification

- [ ] Participant can write and submit code
- [ ] Tests run on submission
- [ ] Results show to participant
- [ ] Host sees submission count
- [ ] Solution can be revealed

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  CLI LAYER                                                       │
│                                                                  │
│  /condense ──→ transcript-condenser agent                       │
│                    │                                             │
│                    ▼                                             │
│              knowledge/{category}/{topic}.md                     │
│                                                                  │
│  /workshop ──→ workshop-prep agent                              │
│                    │                                             │
│                    ▼                                             │
│              workshops/{topic}/                                  │
│                ├── outline.md                                    │
│                ├── speaker-notes.md                              │
│                ├── participant-guide.md                          │
│                └── slides-outline.md                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  APP LAYER                                                       │
│                                                                  │
│  ┌──────────────┐    WebSocket    ┌──────────────┐              │
│  │  HOST VIEW   │◄──────────────►│   SERVER     │              │
│  │              │                 │              │              │
│  │ - Slides     │                 │ - Rooms      │              │
│  │ - Agenda     │                 │ - Q&A Queue  │              │
│  │ - Q&A Queue  │                 │ - Scores     │              │
│  │ - Leaderboard│                 │ - Code Tests │              │
│  └──────────────┘                 └──────────────┘              │
│         ▲                                ▲                       │
│         │                                │                       │
│         │         WebSocket              │                       │
│         │                                │                       │
│  ┌──────────────┐                 ┌──────────────┐              │
│  │ PARTICIPANT  │                 │ PARTICIPANT  │              │
│  │   (Phone)    │                 │   (Phone)    │              │
│  │              │                 │              │              │
│  │ - Reactions  │                 │ - Reactions  │              │
│  │ - Polls      │                 │ - Polls      │              │
│  │ - Quizzes    │                 │ - Quizzes    │              │
│  │ - Q&A        │                 │ - Q&A        │              │
│  │ - Code       │                 │ - Code       │              │
│  └──────────────┘                 └──────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Next Steps

```
Phase 1: /implement .claude/plans/plan-workshop-cli-migration.md --phase 1
Phase 2: /implement .claude/plans/plan-workshop-cli-migration.md --phase 2
...
```

Or implement all at once with careful ordering.
