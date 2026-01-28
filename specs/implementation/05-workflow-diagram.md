# Step 5: Workflow Diagram

## Goal
Create an interactive workflow diagram showing the Plan → Implement → Verify → Review cycle.

## Files to Create/Modify
- `src/components/workflow/WorkflowDiagram.tsx`
- `src/components/workflow/WorkflowStep.tsx`
- `src/data/workflow-steps.ts`

## Step-by-Step Instructions

### 1. Define Workflow Data
Create `src/data/workflow-steps.ts`:
```typescript
export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  commands: string[];
  icon: string;
  color: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    id: 'plan',
    title: 'Plan',
    description: 'Define requirements and break down the task',
    commands: ['/dev:feature', '/dev:bug', '/dev:chore'],
    icon: 'Lightbulb',
    color: 'purple',
  },
  {
    id: 'implement',
    title: 'Implement',
    description: 'Write code following the plan',
    commands: ['Write code', 'Follow patterns'],
    icon: 'Code',
    color: 'blue',
  },
  {
    id: 'verify',
    title: 'Verify',
    description: 'Check types, lint, and build',
    commands: ['/verify:types', '/verify:lint', '/verify:build'],
    icon: 'CheckCircle',
    color: 'green',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review changes and commit',
    commands: ['/review:changes', '/utils:commit'],
    icon: 'Eye',
    color: 'amber',
  },
];
```

### 2. Create WorkflowStep Component
Create `src/components/workflow/WorkflowStep.tsx`:
```typescript
interface WorkflowStepProps {
  step: WorkflowStep;
  isActive: boolean;
  onClick: () => void;
  index: number;
}
```

Features:
- Circular icon with color
- Title and brief description
- Expands to show commands on click
- Animation when becoming active
- Connected by lines to other steps

### 3. Create WorkflowDiagram Component
Create `src/components/workflow/WorkflowDiagram.tsx`:

Features:
- Circular or horizontal layout of 4 steps
- Connecting lines/arrows between steps
- Click step to highlight and expand
- Animated progression
- Auto-cycle option for presentation

Layout options:
1. **Circular**: Steps arranged in a circle with arrows
2. **Horizontal**: Linear flow with curved connections
3. **Grid**: 2x2 with diagonal arrows

Example implementation:
```tsx
export function WorkflowDiagram() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Draw connecting arrows */}
      </svg>

      {/* Steps */}
      <div className="grid grid-cols-2 gap-8 md:flex md:justify-between">
        {workflowSteps.map((step, index) => (
          <WorkflowStep
            key={step.id}
            step={step}
            index={index}
            isActive={activeStep === step.id}
            onClick={() => setActiveStep(step.id)}
          />
        ))}
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {activeStep && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 p-6 bg-zinc-900 rounded-xl"
          >
            {/* Show commands for active step */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### 4. Add Animations
Using Framer Motion:
- Staggered reveal on mount
- Pulse effect on active step
- Smooth transitions between steps
- Arrow animations showing flow direction

```tsx
const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2 },
  }),
  active: {
    scale: 1.1,
    boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)',
  },
};
```

## Verification
1. Diagram renders with all 4 steps
2. Clicking a step highlights it
3. Commands appear when step is expanded
4. Animations are smooth
5. Responsive on different screen sizes

## Next Step
Proceed to Step 6: Content Slides
