# Step 6: Content Slides

## Goal
Create all 12 slide components with proper content and styling.

## Files to Create/Modify
- `src/slides/01-intro.tsx`
- `src/slides/02-what-is-claude.tsx`
- `src/slides/03-getting-started.tsx`
- `src/slides/04-toolkit-overview.tsx`
- `src/slides/05-workflow-visual.tsx`
- `src/slides/06-planning-commands.tsx`
- `src/slides/07-verification.tsx`
- `src/slides/08-code-review.tsx`
- `src/slides/09-utilities.tsx`
- `src/slides/10-best-practices.tsx`
- `src/slides/11-live-demo.tsx`
- `src/slides/12-qa.tsx`
- `src/data/commands.ts`
- `src/data/tips.ts`

## Slide Content

### Slide 1: Intro
```tsx
// Welcome slide with title, presenter name, agenda
<div className="text-center space-y-8">
  <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
    Claude Code Workshop
  </h1>
  <p className="text-2xl text-zinc-400">
    Accelerating Development with AI-Powered Workflows
  </p>
  <div className="text-lg text-zinc-500">
    Your Name • Date
  </div>
</div>
```

### Slide 2: What is Claude?
- Brief intro to Claude and Claude Code CLI
- Key capabilities
- Why it's useful for developers

### Slide 3: Getting Started
- Installation command
- API key setup
- Basic configuration
- First command example

### Slide 4: Toolkit Overview
- Introduction to frontend-dev-toolkit
- What it provides
- How it enhances Claude Code

### Slide 5: Workflow Visual
- Full WorkflowDiagram component
- Interactive demonstration
- Click through the cycle

### Slide 6: Planning Commands
- `/dev:feature` card
- `/dev:bug` card
- `/dev:chore` card
- `/dev:refactor` card

### Slide 7: Verification
- `/verify:types` card
- `/verify:lint` card
- `/verify:build` card
- `/verify:loop` card

### Slide 8: Code Review
- `/review:changes` card
- `/review:perf` card

### Slide 9: Utilities
- `/utils:commit` card
- `/utils:pr` card
- `/utils:cleanup` card

### Slide 10: Best Practices
- Grid of TipCards
- Categories: Prompting, Context, Workflow, Debugging

### Slide 11: Live Demo
- Placeholder for live demonstration
- Could include embedded terminal or instructions

### Slide 12: Q&A
- Questions welcome
- Resources and links
- Contact information

## Data Files

### commands.ts
```typescript
export const commands = {
  dev: [
    {
      name: '/dev:feature',
      description: 'Plan and implement a new feature',
      example: '/dev:feature Add user authentication',
      tips: ['Be specific about requirements', 'Include acceptance criteria'],
    },
    // ... more commands
  ],
  verify: [...],
  review: [...],
  utils: [...],
};
```

### tips.ts
```typescript
export const tips = [
  {
    category: 'prompting',
    icon: 'MessageSquare',
    title: 'Be Specific',
    description: 'Provide clear, detailed requirements for better results',
  },
  // ... more tips
];
```

## Verification
1. All 12 slides render correctly
2. Navigation works through all slides
3. CommandCards display properly
4. TipCards animate on reveal
5. WorkflowDiagram is interactive
6. Content is readable and well-formatted

## Next Step
Proceed to Step 7: Animations
