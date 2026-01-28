# Plan: Fix Presentation Scrolling Issue

**Type:** Bug Fix
**Created:** 2026-01-22

## Goal

Fix the presentation component so slides only scroll vertically (for long content), not horizontally. Currently both horizontal and vertical scrolling are enabled, causing unintended horizontal scroll.

## Research Findings

The issue is in `PresentationView.tsx`:

1. **Line 103**: `overflow-auto` on the slide container allows both directions
2. **Line 117**: `overflow-auto` on the motion.div allows both directions
3. **Line 143**: `scale-[0.85]` with `w-[118%]` creates content wider than container, triggering horizontal scroll

The scaling hack (`scale-[0.85]` + `w-[118%]`) is used to fit slide content that was designed for a larger viewport. This creates a 118% wide element that overflows.

## Approach

1. Change `overflow-auto` to `overflow-y-auto` to allow only vertical scrolling
2. Add `overflow-x-hidden` to explicitly hide horizontal overflow caused by the scaling

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/components/dashboard/PresentationView.tsx` | Modify | Fix overflow properties |

## Implementation Steps

1. Line 103: Change `overflow-auto` to `overflow-y-auto overflow-x-hidden`
2. Line 117: Change `overflow-auto` to `overflow-y-auto overflow-x-hidden`
3. Line 74: Add `overflow-x-hidden` to outermost container
4. DashboardLayout main: Add `overflow-x-hidden`

## Code Changes

### PresentationView.tsx - Line 74 (outermost container)
```diff
- 'space-y-4',
+ 'space-y-4 overflow-x-hidden',
```

### PresentationView.tsx - Line 103 (slide container)
```diff
- <div className="relative h-full overflow-auto">
+ <div className="relative h-full overflow-y-auto overflow-x-hidden">
```

### PresentationView.tsx - Line 117 (motion.div)
```diff
- className="absolute inset-0 p-6 overflow-auto"
+ className="absolute inset-0 p-6 overflow-y-auto overflow-x-hidden"
```

### DashboardLayout.tsx - Line 201 (main)
```diff
- <main className="relative z-10 max-w-7xl mx-auto px-6 py-6">
+ <main className="relative z-10 max-w-7xl mx-auto px-6 py-6 overflow-x-hidden">
```

## Verification

- [x] Type check passes (`pnpm tsc --noEmit`)
- [x] Build passes (`pnpm build`)
- [x] Horizontal scrolling is disabled in presentation
- [x] Vertical scrolling still works for long slide content
- [x] Slide navigation (arrows, keyboard, dots) still works
- [ ] Fullscreen mode works correctly
