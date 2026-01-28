# Step 3: Slide System

## Goal
Implement React Router for slide navigation and keyboard controls for arrow key navigation.

## Files to Create/Modify
- `src/hooks/useSlideNavigation.ts`
- `src/slides/index.ts`
- `src/App.tsx`
- Placeholder slide components

## Step-by-Step Instructions

### 1. Create Slide Configuration
Create `src/slides/index.ts`:
```typescript
import { lazy } from 'react';

export interface SlideConfig {
  id: number;
  path: string;
  title: string;
  section: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

export const slides: SlideConfig[] = [
  {
    id: 1,
    path: '/slide/1',
    title: 'Welcome',
    section: 'Introduction',
    component: lazy(() => import('./01-intro')),
  },
  // ... more slides
];

export const totalSlides = slides.length;
```

### 2. Create Navigation Hook
Create `src/hooks/useSlideNavigation.ts`:
```typescript
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { totalSlides } from '../slides';

export function useSlideNavigation() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentSlide = parseInt(id || '1', 10);

  const goToSlide = useCallback((slideId: number) => {
    if (slideId >= 1 && slideId <= totalSlides) {
      navigate(`/slide/${slideId}`);
    }
  }, [navigate]);

  const goToNext = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  return {
    currentSlide,
    totalSlides,
    goToSlide,
    goToNext,
    goToPrev,
  };
}
```

### 3. Create Placeholder Slides
Create placeholder components for all 12 slides:
```typescript
// src/slides/01-intro.tsx
export default function IntroSlide() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold">Welcome</h1>
    </div>
  );
}
```

### 4. Set Up Router in App.tsx
```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { slides } from './slides';
import SlideLayout from './components/layout/SlideLayout';

function SlideRoute() {
  const { currentSlide, totalSlides, goToNext, goToPrev } = useSlideNavigation();
  const slide = slides.find(s => s.id === currentSlide);

  return (
    <SlideLayout
      currentSlide={currentSlide}
      totalSlides={totalSlides}
      onNext={goToNext}
      onPrev={goToPrev}
    >
      <Suspense fallback={<div>Loading...</div>}>
        {slide && <slide.component />}
      </Suspense>
    </SlideLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/slide/1" replace />} />
        <Route path="/slide/:id" element={<SlideRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Verification
1. Navigate to `/` - redirects to `/slide/1`
2. URL shows `/slide/1`, `/slide/2`, etc.
3. Arrow keys navigate between slides
4. Navigation buttons work
5. Cannot navigate before slide 1 or after last slide
6. Browser back/forward works

## Next Step
Proceed to Step 4: UI Components
