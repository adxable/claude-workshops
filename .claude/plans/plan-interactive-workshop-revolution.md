# Plan: Interactive Workshop Revolution - "Code Playground" Section Type

**Type:** Feature
**Created:** 2026-01-21

## Goal

Transform workshops from boring "presentation → quiz → task" into an exciting, interactive learning experience with real-time code execution, visual feedback, and gamification. Create a **new section type called "Code Playground"** that lets users experiment with code and see immediate visual results.

## The Wow Factor Ideas Brainstormed

| Idea | Wow Factor | Complexity | Selected |
|------|------------|------------|----------|
| **Live Code Playground** - Write code, see results instantly | 🔥🔥🔥🔥🔥 | Medium | ✅ |
| **Code Challenges with Tests** - Pass/fail with animations | 🔥🔥🔥🔥 | Medium | ✅ |
| **Visual Canvas Section** - Draw with code (like p5.js) | 🔥🔥🔥🔥🔥 | High | ✅ |
| **Step-by-Step Debugger** - Walk through code execution | 🔥🔥🔥🔥 | High | Phase 2 |
| **Multiplayer Challenges** - Race to solve problems | 🔥🔥🔥🔥🔥 | Very High | Phase 3 |
| **AI Code Review** - Claude reviews your code live | 🔥🔥🔥🔥 | Medium | Phase 2 |
| **Achievement Badges** - Unlock rewards | 🔥🔥🔥 | Low | ✅ |
| **Code Golf Mode** - Shortest solution wins | 🔥🔥🔥🔥 | Medium | Phase 2 |

## Selected Features for Phase 1

### 1. **Live Code Playground Section**
A new section type where users write JavaScript/TypeScript and see results instantly in a preview panel.

**User Experience:**
```
┌─────────────────────────────────────────────────────────────┐
│  🎮 Code Playground: Array Magic                            │
├─────────────────────────────────┬───────────────────────────┤
│                                 │                           │
│  // Your code here              │   📊 OUTPUT               │
│  const numbers = [1, 2, 3];     │                           │
│  const doubled = numbers.map(  │   [2, 4, 6]               │
│    n => n * 2                   │                           │
│  );                             │   ✅ All tests passing!   │
│  console.log(doubled);          │                           │
│                                 │   🏆 +50 XP               │
│  ▶ Run Code                     │                           │
├─────────────────────────────────┴───────────────────────────┤
│  📋 Challenge: Double all numbers in the array              │
│  🎯 Tests: ✅ Pass | ❌ Fail | ⏳ Pending                    │
└─────────────────────────────────────────────────────────────┘
```

### 2. **Visual Canvas Mode**
For visual/creative challenges - code controls a canvas that updates in real-time.

**User Experience:**
```
┌─────────────────────────────────────────────────────────────┐
│  🎨 Visual Challenge: Draw a Pattern                        │
├─────────────────────────────────┬───────────────────────────┤
│                                 │  ┌─────────────────────┐  │
│  for (let i = 0; i < 10; i++) { │  │  🔵 🔴 🔵 🔴 🔵    │  │
│    drawCircle(i * 30, 50,      │  │  🔴 🔵 🔴 🔵 🔴    │  │
│      i % 2 ? 'red' : 'blue'); │  │  🔵 🔴 🔵 🔴 🔵    │  │
│  }                              │  └─────────────────────┘  │
│                                 │                           │
│  ▶ Run                          │   🎯 Pattern detected!   │
└─────────────────────────────────┴───────────────────────────┘
```

### 3. **Test-Driven Challenges**
Show real-time test results as user types. Green checkmarks animate in when tests pass.

```
Tests:
  ✅ should double positive numbers (passed!)
  ✅ should handle empty array (passed!)
  ⏳ should handle negative numbers (running...)
  ❌ should not mutate original array (failed)
```

### 4. **XP & Achievement System**
- Earn XP for completing challenges
- Unlock badges (First Code, Speed Demon, Perfect Score)
- Visual celebration animations when achievements unlock

## Research Findings

### Current Architecture
- 5 section types: content, quiz, exercise, discussion, break
- `SectionContent` is a union type - easily extensible
- Framer Motion already used for animations
- Session tracking supports custom metadata per section

### Key Files to Modify
| File | Purpose |
|------|---------|
| `src/types/workshop.ts` | Add new PlaygroundContent type |
| `src/components/workshop/WorkshopViewer.tsx` | Add playground renderer |
| `src/components/workshop/WorkshopPlayground.tsx` | New component |
| `src/lib/code-runner.ts` | Safe JavaScript execution |
| `src/hooks/useWorkshop.ts` | Track playground progress |

### Safe Code Execution Strategy
Use a sandboxed iframe with `srcdoc` to execute JavaScript safely:
```typescript
const sandbox = document.createElement('iframe');
sandbox.sandbox = 'allow-scripts';
sandbox.srcdoc = `<script>${userCode}</script>`;
```

Or use `Function` constructor with restricted scope for simple cases.

## Implementation Steps

### Step 1: Define New Types
```typescript
// In workshop.ts
interface PlaygroundContent {
  type: 'playground'
  title: string
  description: string
  mode: 'code' | 'visual' // code = console output, visual = canvas
  starterCode: string
  solution?: string
  tests: PlaygroundTest[]
  hints?: string[]
  xpReward: number
  language: 'javascript' | 'typescript'
}

interface PlaygroundTest {
  id: string
  name: string
  testCode: string // Code that returns true/false
  points: number
}
```

### Step 2: Create Code Runner Utility
```typescript
// In lib/code-runner.ts
interface RunResult {
  output: string[]
  error?: string
  testResults: TestResult[]
  executionTime: number
}

function runCode(code: string, tests: PlaygroundTest[]): RunResult
```

### Step 3: Build Playground Component
- Split-pane layout (CodeMirror-style editor | Output panel)
- Real-time output updates
- Animated test results
- Confetti on all tests passing
- XP counter with animation

### Step 4: Add Visual Canvas Mode
- HTML5 Canvas in output panel
- Expose drawing functions: `drawCircle`, `drawRect`, `setColor`, etc.
- Pattern detection for visual challenges

### Step 5: Achievement System
```typescript
interface Achievement {
  id: string
  name: string
  icon: string
  description: string
  condition: (session: WorkshopSession) => boolean
}

// Examples:
// "First Blood" - Complete your first playground
// "Speed Demon" - Complete in under 30 seconds
// "Perfect Score" - Pass all tests on first try
// "Hint-Free" - Complete without using hints
```

### Step 6: Celebration Animations
- Confetti explosion on completion (use canvas-confetti)
- Achievement popup with sound effect
- XP counter animation (+50 XP flies up)
- Progress bar celebration pulse

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/types/workshop.ts` | Modify | Add PlaygroundContent, PlaygroundTest, Achievement types |
| `src/components/workshop/WorkshopPlayground.tsx` | Create | Main playground component |
| `src/components/workshop/PlaygroundEditor.tsx` | Create | Code editor with syntax highlighting |
| `src/components/workshop/PlaygroundOutput.tsx` | Create | Output/Canvas panel |
| `src/components/workshop/PlaygroundTests.tsx` | Create | Animated test results |
| `src/components/workshop/AchievementPopup.tsx` | Create | Achievement unlock animation |
| `src/components/workshop/XPCounter.tsx` | Create | Animated XP display |
| `src/lib/code-runner.ts` | Create | Safe code execution sandbox |
| `src/lib/visual-canvas.ts` | Create | Canvas drawing API |
| `src/hooks/useCodeRunner.ts` | Create | Code execution hook |
| `src/hooks/useAchievements.ts` | Create | Achievement tracking |
| `src/components/workshop/WorkshopViewer.tsx` | Modify | Add playground renderer |
| `src/data/workshop-store.ts` | Modify | Add XP and achievement storage |
| `server/workshop-agent.js` | Modify | Generate playground sections |

## Visual Design

### Color Scheme for Playground
- Editor background: `#1e1e1e` (VS Code dark)
- Output success: `#10b981` (emerald)
- Output error: `#ef4444` (red)
- Test passing: `#22c55e` (green)
- Test failing: `#f87171` (red)
- XP color: `#fbbf24` (amber/gold)

### Animations
- Test checkmarks: Bounce in with scale overshoot
- Confetti: Burst from center on success
- XP: Float up and fade (+50 XP animation)
- Achievement: Slide in from right with glow

## Verification

- [ ] Type check passes
- [ ] Lint passes
- [ ] Build passes
- [ ] Playground renders in viewer
- [ ] Code executes safely (no infinite loops, sandboxed)
- [ ] Tests animate correctly
- [ ] Visual canvas mode works
- [ ] XP tracking persists
- [ ] Achievements unlock correctly
- [ ] Confetti celebration triggers

## Example Workshop Section

```json
{
  "id": "playground-1",
  "type": "exercise",
  "title": "Array Magic Challenge",
  "duration": 10,
  "content": {
    "type": "playground",
    "title": "Double the Numbers",
    "description": "Use Array.map() to double every number in the array",
    "mode": "code",
    "starterCode": "const numbers = [1, 2, 3, 4, 5];\n\n// Double each number\nconst doubled = // your code here\n\nconsole.log(doubled);",
    "solution": "const doubled = numbers.map(n => n * 2);",
    "tests": [
      {
        "id": "test-1",
        "name": "doubles positive numbers",
        "testCode": "JSON.stringify(doubled) === '[2,4,6,8,10]'",
        "points": 25
      },
      {
        "id": "test-2",
        "name": "uses map method",
        "testCode": "code.includes('.map(')",
        "points": 25
      }
    ],
    "hints": [
      "Array.map() takes a function that transforms each element",
      "The transformation function receives each number as an argument"
    ],
    "xpReward": 50,
    "language": "javascript"
  }
}
```

## Phase 2 Ideas (Future)

1. **AI Code Review** - Claude analyzes your solution and suggests improvements
2. **Step-by-Step Debugger** - Visual execution trace
3. **Code Golf Mode** - Compete for shortest solution
4. **Multiplayer Challenges** - Real-time race against others
5. **Custom Themes** - Personalize editor appearance
6. **Voice Coding** - Use voice to write code

## Why This is a Game Changer

1. **Immediate Feedback** - No waiting, see results as you type
2. **Gamification** - XP and achievements make learning addictive
3. **Visual Learning** - Canvas mode for creative challenges
4. **Safe Experimentation** - Sandboxed execution, can't break anything
5. **Progress Tracking** - Know exactly where you stand
6. **Celebration** - Confetti and animations make success feel rewarding

This transforms workshops from passive learning into an interactive game where every keystroke matters!
