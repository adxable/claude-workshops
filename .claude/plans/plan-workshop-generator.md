# Plan: YouTube Transcript to Interactive Workshop Generator

**Type:** Feature (Product)
**Created:** 2026-01-21

## Goal

Build a commercial-grade product that transforms YouTube transcripts into interactive 1-2 hour workshops with:
- AI-powered workshop planning from transcripts
- Interactive presentation with slides, quizzes, and exercises
- Voice narration capability
- Engaging learning experience with multiple interaction types

## Research Findings

### Existing Assets to Leverage
| Component | File | Reuse Strategy |
|-----------|------|----------------|
| Slide Presentation | `PresentationView.tsx` | Base for workshop viewer |
| Quiz System | `QuizMode.tsx` | Inline quiz components |
| Voice Mode | `VoiceMode.tsx` | Voice narration integration |
| Agent Pattern | `AgentPlayground.tsx` | Workshop planner agent |
| Code Blocks | `CodeBlock.tsx` | Exercise code display |
| Slide Navigation | `useSlideNavigation.ts` | Workshop navigation hook |
| WebSocket Server | `server/index.js` | Agent orchestration |
| Workflow Steps | `workflow-steps.ts` | Data model patterns |

### Architecture Pattern
- React 19 + TypeScript + Vite
- Framer Motion for animations
- WebSocket for real-time agent communication
- Local Whisper + TTS for voice features

## Product Architecture

### Three-Phase User Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         WORKSHOP GENERATOR                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 1: INPUT                 PHASE 2: GENERATE              PHASE 3: │
│  ┌─────────────┐               ┌─────────────────┐            PRESENT   │
│  │ Paste YT    │               │  Workshop       │           ┌─────────┐│
│  │ Transcript  │──────────────▶│  Planner Agent  │──────────▶│Workshop ││
│  │ or URL      │               │  (Claude Opus)  │           │ Viewer  ││
│  └─────────────┘               └─────────────────┘           └─────────┘│
│        │                              │                            │     │
│        ▼                              ▼                            ▼     │
│  ┌─────────────┐               ┌─────────────────┐           ┌─────────┐│
│  │ Add context │               │ Structured Plan │           │ Slides  ││
│  │ & settings  │               │ with sections,  │           │ Quizzes ││
│  │             │               │ quizzes, etc.   │           │ Exercises│
│  └─────────────┘               └─────────────────┘           │ Voice   ││
│                                                               └─────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

## Data Models

### Workshop Structure
```typescript
interface Workshop {
  id: string
  title: string
  description: string
  sourceTranscript: string
  sourceUrl?: string
  targetDuration: number // minutes (60-120)
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  sections: WorkshopSection[]
  metadata: WorkshopMetadata
  createdAt: Date
  updatedAt: Date
}

interface WorkshopSection {
  id: string
  title: string
  type: 'content' | 'quiz' | 'exercise' | 'discussion' | 'break'
  duration: number // minutes
  content: SectionContent
  narration?: string // text for TTS
  order: number
}

type SectionContent =
  | SlideContent
  | QuizContent
  | ExerciseContent
  | DiscussionContent
  | BreakContent

interface SlideContent {
  type: 'slide'
  title: string
  bullets: string[]
  speakerNotes: string
  visualSuggestion?: string
  codeExample?: { code: string; language: string; filename?: string }
}

interface QuizContent {
  type: 'quiz'
  title: string
  questions: QuizQuestion[]
  passingScore: number
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface ExerciseContent {
  type: 'exercise'
  title: string
  description: string
  instructions: string[]
  starterCode?: string
  solution?: string
  hints: string[]
  estimatedTime: number
}

interface DiscussionContent {
  type: 'discussion'
  title: string
  prompt: string
  talkingPoints: string[]
}

interface BreakContent {
  type: 'break'
  duration: number
  activity?: string
}

interface WorkshopMetadata {
  totalSlides: number
  totalQuizzes: number
  totalExercises: number
  estimatedDuration: number
  keyTopics: string[]
  learningObjectives: string[]
}
```

## Approach

### Phase 1: Workshop Input & Configuration
- Create transcript input page with paste/URL options
- Add configuration options (duration, difficulty, audience)
- Store input in local state before generation

### Phase 2: Workshop Planner Agent
- Implement Claude-powered workshop planning
- Stream generation progress in real-time
- Parse structured output into Workshop model
- Save workshops to localStorage/IndexedDB

### Phase 3: Interactive Workshop Viewer
- Full-screen presentation mode
- Inline quiz interactions with scoring
- Exercise panels with code editor
- Voice narration with play/pause
- Progress tracking and bookmarking

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/types/workshop.ts` | Create | TypeScript interfaces |
| `src/data/workshop-store.ts` | Create | Workshop storage & state |
| `src/components/workshop/WorkshopInput.tsx` | Create | Transcript input UI |
| `src/components/workshop/WorkshopGenerator.tsx` | Create | Generation progress UI |
| `src/components/workshop/WorkshopViewer.tsx` | Create | Main presentation viewer |
| `src/components/workshop/WorkshopSlide.tsx` | Create | Individual slide renderer |
| `src/components/workshop/WorkshopQuiz.tsx` | Create | Inline quiz component |
| `src/components/workshop/WorkshopExercise.tsx` | Create | Exercise panel |
| `src/components/workshop/WorkshopProgress.tsx` | Create | Progress bar + navigation |
| `src/components/workshop/WorkshopNarration.tsx` | Create | Voice narration controls |
| `src/components/workshop/WorkshopList.tsx` | Create | Saved workshops gallery |
| `src/hooks/useWorkshop.ts` | Create | Workshop state management |
| `src/hooks/useWorkshopNavigation.ts` | Create | Section navigation |
| `server/workshop-agent.js` | Create | Workshop planning agent |
| `server/index.js` | Modify | Add workshop WebSocket handlers |
| `src/components/dashboard/Dashboard.tsx` | Modify | Add Workshops tab |
| `src/App.tsx` | Modify | Add workshop routes |

## Implementation Steps

### Step 1: Data Layer (Foundation)
1. Create `src/types/workshop.ts` with all interfaces
2. Create `src/data/workshop-store.ts` with localStorage persistence
3. Create `src/hooks/useWorkshop.ts` for state management

### Step 2: Workshop Input UI
4. Create `WorkshopInput.tsx` with transcript paste area
5. Add YouTube URL auto-fetch option (using existing WebFetch pattern)
6. Add configuration form (duration slider, difficulty, audience)
7. Add "Generate Workshop" button

### Step 3: Workshop Planner Agent
8. Create `server/workshop-agent.js` with Claude integration
9. Add WebSocket handlers in `server/index.js`
10. Create `WorkshopGenerator.tsx` with streaming progress UI
11. Implement structured output parsing

### Step 4: Workshop Viewer (Core)
12. Create `WorkshopViewer.tsx` as main container
13. Create `WorkshopSlide.tsx` for content slides
14. Create `WorkshopProgress.tsx` with timeline navigation
15. Implement keyboard navigation (reuse existing hook pattern)

### Step 5: Interactive Elements
16. Create `WorkshopQuiz.tsx` for inline quizzes
17. Create `WorkshopExercise.tsx` with code editor
18. Add scoring and progress tracking
19. Create discussion prompts component

### Step 6: Voice Narration
20. Create `WorkshopNarration.tsx` with play/pause controls
21. Integrate with existing VoiceManager
22. Add auto-advance option after narration
23. Implement section-by-section narration

### Step 7: Workshop Management
24. Create `WorkshopList.tsx` gallery view
25. Add edit/delete workshop functionality
26. Implement export options (PDF, JSON)
27. Add sharing functionality (URL-based)

### Step 8: Dashboard Integration
28. Add "Workshops" tab to Dashboard.tsx
29. Add routes in App.tsx
30. Create workshop landing page
31. Polish animations and transitions

## Agent Prompt Template

```markdown
You are a workshop planning expert. Given a YouTube transcript, create a structured
interactive workshop following this exact JSON format:

INPUT:
- Transcript: {transcript}
- Target Duration: {duration} minutes
- Difficulty: {difficulty}
- Audience: {audience}

OUTPUT (strict JSON):
{
  "title": "Workshop title",
  "description": "2-3 sentence workshop description",
  "learningObjectives": ["objective 1", "objective 2", ...],
  "sections": [
    {
      "type": "content",
      "title": "Section title",
      "duration": 10,
      "content": {
        "type": "slide",
        "title": "Slide title",
        "bullets": ["point 1", "point 2"],
        "speakerNotes": "What to say...",
        "codeExample": { "code": "...", "language": "typescript" }
      },
      "narration": "Text for voice narration..."
    },
    {
      "type": "quiz",
      "title": "Knowledge Check",
      "duration": 5,
      "content": {
        "type": "quiz",
        "questions": [
          {
            "question": "...",
            "options": ["A", "B", "C", "D"],
            "correctIndex": 0,
            "explanation": "..."
          }
        ],
        "passingScore": 70
      }
    },
    {
      "type": "exercise",
      "title": "Hands-on Practice",
      "duration": 15,
      "content": {
        "type": "exercise",
        "description": "...",
        "instructions": ["step 1", "step 2"],
        "starterCode": "...",
        "solution": "...",
        "hints": ["hint 1", "hint 2"]
      }
    }
  ]
}

GUIDELINES:
- Create 6-12 sections for a 60-minute workshop
- Include 2-3 quizzes distributed throughout
- Include 1-2 hands-on exercises
- Add a discussion section for engagement
- Include a 5-minute break for workshops > 60 minutes
- Make content progressively more complex
- Keep slides concise (3-5 bullets max)
- Write narration in conversational tone
```

## UI/UX Design

### Workshop Input Screen
```
┌────────────────────────────────────────────────────────────────┐
│  🎬 Create Workshop from YouTube                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Paste YouTube transcript or URL...                       │ │
│  │                                                          │ │
│  │                                                          │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ⚙️ Workshop Settings                                          │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │ Duration: 90 min │  │ Difficulty: Med  │                   │
│  └──────────────────┘  └──────────────────┘                   │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Target audience (optional): Developers learning React    │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│                    [✨ Generate Workshop]                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Workshop Viewer
```
┌────────────────────────────────────────────────────────────────┐
│ ◀ ▶  Section 3/8: Understanding Components    🔊 [|||] 45:00  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                    ┌─────────────────────┐                     │
│                    │                     │                     │
│                    │   SLIDE CONTENT     │                     │
│                    │                     │                     │
│                    │   • Point one       │                     │
│                    │   • Point two       │                     │
│                    │   • Point three     │                     │
│                    │                     │                     │
│                    │   ```code```        │                     │
│                    │                     │                     │
│                    └─────────────────────┘                     │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│ ●━━━━━━━━●━━━━━━━●━━━━━━━●━━━━━●━━━━━━━●━━━━━━━●━━━━━━━●━━━  │
│ Intro   Quiz    Deep    Exercise  Break  Quiz   Advanced  End  │
└────────────────────────────────────────────────────────────────┘
```

### Quiz Interaction
```
┌────────────────────────────────────────────────────────────────┐
│                    📝 Knowledge Check                          │
│                    Question 2 of 3                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  What is the primary purpose of React hooks?                   │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ ○ A) To style components                               │   │
│  └────────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ ● B) To add state and effects to functional components │ ✓ │
│  └────────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ ○ C) To create class components                        │   │
│  └────────────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ ○ D) To handle routing                                 │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                │
│  ✅ Correct! Hooks let you use state and other React features │
│     without writing a class.                                   │
│                                                                │
│                           [Continue →]                         │
└────────────────────────────────────────────────────────────────┘
```

## Verification

- [ ] Type check passes (`npm run typecheck`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build passes (`npm run build`)
- [ ] Workshop input accepts transcript and URL
- [ ] Agent generates valid workshop structure
- [ ] Workshop viewer displays all section types
- [ ] Quizzes track scores correctly
- [ ] Exercises display code with syntax highlighting
- [ ] Voice narration plays correctly
- [ ] Progress saves to localStorage
- [ ] Navigation works (keyboard + clicks)
- [ ] Workshops persist between sessions

## Future Enhancements (v2)

- [ ] Collaborative workshop editing
- [ ] Export to PowerPoint/Google Slides
- [ ] Student progress tracking dashboard
- [ ] AI-generated visuals for slides
- [ ] Video embedding from source
- [ ] Multi-language support
- [ ] Custom branding options
- [ ] Workshop templates library
- [ ] Analytics and engagement metrics
- [ ] Integration with LMS platforms

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Long transcripts exceed token limits | Chunk transcript and generate sections iteratively |
| Agent output doesn't match schema | Add JSON validation + retry logic |
| Complex exercises need runtime | Start with code display, add WebContainer later |
| Voice narration timing issues | Pre-calculate durations, add manual override |
| Workshop generation takes too long | Show progress indicators, allow cancellation |
