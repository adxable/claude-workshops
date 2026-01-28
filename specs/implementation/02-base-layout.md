# Step 2: Base Layout

## Goal
Create the base layout structure with SlideLayout component and Navigation controls.

## Files to Create/Modify
- `src/components/layout/SlideLayout.tsx`
- `src/components/layout/Navigation.tsx`
- `src/lib/utils.ts`
- `src/App.tsx`
- `src/index.css` (add custom styles)

## Step-by-Step Instructions

### 1. Create Utility Functions
Create `src/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install clsx and tailwind-merge:
```bash
pnpm add clsx tailwind-merge
```

### 2. Create Navigation Component
Create `src/components/layout/Navigation.tsx`:
- Progress bar showing current position
- Slide counter (e.g., "3 / 12")
- Previous/Next buttons
- Uses Lucide icons (ChevronLeft, ChevronRight)

Key features:
```typescript
interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
}
```

### 3. Create SlideLayout Component
Create `src/components/layout/SlideLayout.tsx`:
- Full viewport height container
- Dark background
- Navigation positioned at bottom
- Content area with padding
- Framer Motion for transitions

Structure:
```tsx
<div className="min-h-screen bg-background flex flex-col">
  <main className="flex-1 flex items-center justify-center p-12">
    {children}
  </main>
  <Navigation {...props} />
</div>
```

### 4. Update Global Styles
Add to `src/index.css`:
```css
@layer base {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... other CSS variables */
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

### 5. Update App.tsx
Set up basic structure to test layout:
```tsx
function App() {
  return (
    <SlideLayout currentSlide={1} totalSlides={12}>
      <h1>Slide Content</h1>
    </SlideLayout>
  );
}
```

## Verification
1. Run `pnpm dev`
2. Page shows dark background
3. Navigation bar visible at bottom
4. Progress bar and slide counter display correctly
5. Prev/Next buttons are clickable (no routing yet)

## Next Step
Proceed to Step 3: Slide System
