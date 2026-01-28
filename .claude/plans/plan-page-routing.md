# Plan: Implement Dedicated Routes for All Pages

**Type:** Feature
**Created:** 2026-01-21

## Goal

Implement proper routing so every page/view in the app has its own dedicated URL route, making pages bookmarkable and enabling direct navigation via URL.

## Research Findings

### Current State
- **React Router v7.1.1** is already installed and configured
- App has basic routing in `src/App.tsx` with:
  - `/dashboard` - Main dashboard (uses tabs internally)
  - `/slide/:id` - Presentation slides (1-14)
  - `/workshop/:workshopId` - Workshop viewer

### Current Issues
- Dashboard tabs (Learn ADX, Workshops, Voice Mode, Presentation) are **not routable** - switching tabs doesn't change URL
- LearnADX sub-sections (Workflow Simulator, Command Explorer, Agent Playground, Quiz Mode) are **not routable**
- Workshop creation vs. list view is **not routable**

### Files Involved
| File | Current Role |
|------|--------------|
| `src/App.tsx` | Main router with 4 routes |
| `src/components/dashboard/Dashboard.tsx` | Tab-based navigation (no routes) |
| `src/components/learn/LearnADX.tsx` | Sub-tab navigation (no routes) |
| `src/components/workshop/WorkshopTab.tsx` | View switching (no routes) |

## Approach

Convert internal tab/view state to URL-based routing using **nested routes** with `<Outlet>`.

### New Route Structure

```
/                           → Redirect to /dashboard
/dashboard                  → Dashboard layout with tabs
  /dashboard/learn          → Learn ADX section (default)
    /dashboard/learn/workflow    → Workflow Simulator
    /dashboard/learn/commands    → Command Explorer
    /dashboard/learn/agents      → Agent Playground
    /dashboard/learn/quiz        → Quiz Mode
  /dashboard/workshops      → Workshop list
  /dashboard/workshops/new  → Create new workshop
  /dashboard/voice          → Voice Mode
  /dashboard/presentation   → Presentation entry point
/slide/:id                  → Individual slides (unchanged)
/workshop/:workshopId       → Workshop viewer (unchanged)
*                           → Redirect to /dashboard
```

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/App.tsx` | Modify | Add nested routes for dashboard sections |
| `src/components/dashboard/Dashboard.tsx` | Modify | Use `<Outlet>` and route-based active tab |
| `src/components/dashboard/DashboardLayout.tsx` | Create | Shared layout wrapper with navigation |
| `src/components/learn/LearnADX.tsx` | Modify | Use nested routes for sub-sections |
| `src/components/workshop/WorkshopTab.tsx` | Modify | Use routes for list/create views |

## Implementation Steps

1. **Update App.tsx with nested route structure**
   - Add nested routes under `/dashboard`
   - Configure index routes for default redirects
   - Keep existing `/slide/:id` and `/workshop/:workshopId` routes

2. **Create DashboardLayout component**
   - Move tab navigation from Dashboard.tsx
   - Use `<NavLink>` for active state styling
   - Render `<Outlet>` for child routes

3. **Refactor Dashboard.tsx**
   - Remove internal tab state
   - Use DashboardLayout as wrapper

4. **Update LearnADX.tsx**
   - Replace internal tab state with nested routes
   - Use `<NavLink>` for sub-section navigation
   - Render `<Outlet>` for sub-section content

5. **Update WorkshopTab.tsx**
   - Replace view state with routes (`/workshops` vs `/workshops/new`)
   - Use `useNavigate` for programmatic navigation

6. **Update any hardcoded navigation links**
   - Ensure all navigation uses `<Link>` or `<NavLink>` with new routes

## Verification

- [ ] Type check passes (`pnpm tsc --noEmit`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Build passes (`pnpm build`)
- [ ] All routes are accessible via direct URL
- [ ] Browser back/forward navigation works correctly
- [ ] Tab active states reflect current route
- [ ] No broken links in navigation
