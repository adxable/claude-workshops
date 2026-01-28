# Plan: Performance Simulator Component

**Type:** Feature
**Created:** 2026-01-28

## Goal

Create an interactive "Performance Simulator" component that compares traditional development time vs ADX /ship workflow. Users can adjust complexity and team size to see real-time ROI calculations with animated metrics.

## Research Findings

- Learn section components follow consistent patterns: motion animations, cn() utility, colorMap for styling
- Tabs defined in LearnADX.tsx with TabConfig type
- Routes nested under /dashboard/learn in App.tsx with lazy loading
- No existing slider components - need native range input with custom styling
- Animation patterns: fadeInUp variants, AnimatePresence for state changes, whileHover for interactivity

## Approach

1. Create PerformanceSimulator component with two-column comparison layout
2. Add interactive sliders for complexity (1-5) and team size (1-5)
3. Calculate metrics dynamically based on slider inputs
4. Use Framer Motion for animated transitions when values change
5. Wire up routing and navigation tab

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| src/components/learn/PerformanceSimulator.tsx | Create | Main component with comparison UI |
| src/components/learn/index.ts | Modify | Export new component |
| src/components/dashboard/LearnADX.tsx | Modify | Add "ROI" tab between Agents and Quiz |
| src/App.tsx | Modify | Add route for /dashboard/learn/roi |

## Implementation Steps

1. Create PerformanceSimulator.tsx with:
   - Two-column grid layout (Traditional vs ADX)
   - Phase breakdown with time bars
   - Slider controls for complexity and team size
   - Animated metrics display (time saved, cost saved, percentage)

2. Update LearnADX.tsx:
   - Import TrendingUp icon from lucide-react
   - Add ROI tab config between Agents and Quiz

3. Update App.tsx:
   - Add lazy import for PerformanceSimulator
   - Add route path="roi" between agents and quiz

4. Update learn/index.ts:
   - Export PerformanceSimulator

## Calculations

```
Traditional time = (Planning 2h + Coding 4h + Review 1h + Testing 1h + PR 0.5h) * complexity * (teamSize * 0.8)
ADX time = (Plan 0.25h + Implement 0.5h + Review 0.17h + Verify 0.08h + Commit+PR 0.08h) * complexity * 0.3 + 1h overhead

Time Saved = Traditional - ADX
Cost Saved = Time Saved * $100/hour
Percentage = (Time Saved / Traditional) * 100
```

## Verification

- [ ] Type check passes
- [ ] Lint passes
- [ ] Build passes
- [ ] ROI tab appears in navigation
- [ ] Sliders change values
- [ ] Metrics update on slider change
- [ ] Animations work smoothly
- [ ] Progress bars reflect time values
