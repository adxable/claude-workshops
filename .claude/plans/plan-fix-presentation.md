# Plan: Fix Presentation Slides

**Type:** Bug Fix
**Created:** 2026-01-21

## Goal

Fix the presentation breaking on slide 2 and validate all other slides work correctly.

## Research Findings

### Bug #1: Missing `Settings` icon in 02-workflow.tsx (CRITICAL)
- `workflow-steps.ts` defines 8 workflow steps with icons: `Settings`, `Lightbulb`, `Code`, `Wrench`, `CheckCircle`, `Eye`, `GitCommit`, `GitPullRequest`
- `02-workflow.tsx` has an `iconMap` that is **missing the `Settings` icon**
- This causes a runtime error when rendering the first workflow step (Setup phase)
- The component tries to render `undefined` as an icon, breaking the slide

### Bug #2: TOTAL_SLIDES mismatch in useSlideNavigation.ts
- `useSlideNavigation.ts` has hardcoded `TOTAL_SLIDES = 12`
- `slides/index.ts` exports 14 slides and a `totalSlides` constant
- This prevents navigation to slides 13-14 via the `/slide/:id` route

### Bug #3: PresentationView only loads 9 slides
- `PresentationView.tsx` (dashboard version) hardcodes 9 slides
- The full slide deck has 14 slides
- Users in dashboard presentation mode miss 5 slides

### Validation Summary
| Component | Issue | Severity |
|-----------|-------|----------|
| `02-workflow.tsx` | Missing `Settings` icon | CRITICAL |
| `useSlideNavigation.ts` | Hardcoded slide count | HIGH |
| `PresentationView.tsx` | Incomplete slide list | MEDIUM |

## Approach

1. Fix the missing `Settings` icon import in `02-workflow.tsx`
2. Update `useSlideNavigation.ts` to use dynamic slide count from config
3. Update `PresentationView.tsx` to load all 14 slides from the config

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/slides/02-workflow.tsx` | Modify | Add missing `Settings` icon to iconMap |
| `src/hooks/useSlideNavigation.ts` | Modify | Import and use `totalSlides` from slides config |
| `src/components/dashboard/PresentationView.tsx` | Modify | Load slides from config instead of hardcoding |

## Implementation Steps

1. **Fix 02-workflow.tsx**
   - Import `Settings` from lucide-react
   - Add `Settings` to the iconMap

2. **Fix useSlideNavigation.ts**
   - Import `totalSlides` from `../slides`
   - Replace hardcoded `TOTAL_SLIDES = 12` with imported constant

3. **Fix PresentationView.tsx**
   - Import `slides` from config
   - Replace hardcoded slide array with config
   - Update `slideInfo` to use config titles

## Verification

- [ ] Type check passes (`pnpm tsc --noEmit`)
- [ ] Build passes (`pnpm build`)
- [ ] Slide 2 (Workflow) renders without errors
- [ ] All 14 slides are navigable via `/slide/:id`
- [ ] Dashboard presentation shows all slides
- [ ] Keyboard navigation works correctly
