# Architecture

## Component Hierarchy

```
App
├── Router
│   └── SlideLayout
│       ├── Navigation
│       │   ├── ProgressBar
│       │   ├── SlideCounter
│       │   └── NavButtons
│       ├── KeyboardNav (hook-based)
│       └── [Slide Content]
│           ├── IntroSlide
│           ├── WorkflowSlide
│           │   └── WorkflowDiagram
│           │       └── WorkflowStep[]
│           ├── CommandSlide
│           │   └── CommandCard[]
│           ├── TipsSlide
│           │   └── TipCard[]
│           └── ... other slides
```

## File Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components (Button, Card, etc.)
│   ├── layout/
│   │   ├── SlideLayout.tsx    # Main wrapper with navigation
│   │   ├── Navigation.tsx     # Progress bar + controls
│   │   └── KeyboardNav.tsx    # Keyboard event handling
│   ├── workflow/
│   │   ├── WorkflowDiagram.tsx    # Main diagram component
│   │   ├── WorkflowStep.tsx       # Individual step
│   │   └── CommandCard.tsx        # Command showcase
│   └── common/
│       ├── CodeBlock.tsx      # Syntax highlighted code
│       ├── TipCard.tsx        # Best practices card
│       └── DemoSection.tsx    # Demo placeholder
├── slides/
│   ├── index.ts               # Slide exports and config
│   ├── 01-intro.tsx
│   ├── 02-what-is-claude.tsx
│   └── ... (12 total)
├── data/
│   ├── workflow-steps.ts      # Workflow data
│   ├── commands.ts            # Command definitions
│   └── tips.ts                # Best practices
├── hooks/
│   └── useSlideNavigation.ts  # Navigation logic
├── lib/
│   └── utils.ts               # Utility functions
├── App.tsx                    # Main app with router
├── main.tsx                   # Entry point
└── index.css                  # Global styles + Tailwind
```

## Data Flow

### Navigation State
```
useSlideNavigation hook
  ├── currentSlide (number)
  ├── totalSlides (number)
  ├── goToNext()
  ├── goToPrev()
  └── goToSlide(n)
         │
         ▼
React Router (URL sync)
  /slide/1, /slide/2, etc.
```

### Slide Configuration
```typescript
interface SlideConfig {
  id: number;
  path: string;
  title: string;
  component: React.ComponentType;
  section: string;
}
```

### Command Data Structure
```typescript
interface Command {
  name: string;
  category: 'dev' | 'verify' | 'review' | 'utils';
  description: string;
  usage: string;
  example: string;
  tips: string[];
}
```

## Routing Strategy

- Each slide has a unique route: `/slide/:id`
- Default route redirects to `/slide/1`
- Navigation updates URL for bookmarking
- Browser back/forward works naturally

## State Management

- **Local State**: React useState for UI state
- **URL State**: React Router for slide navigation
- **No global state manager needed**: App is simple enough
