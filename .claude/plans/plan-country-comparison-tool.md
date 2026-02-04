# Plan: Country Comparison Tool

**Type:** Feature
**Created:** 2026-02-04

## Goal

Build a country comparison tool that allows users to browse countries, select up to 3, and compare them side-by-side with visual stat bars.

## Research Findings

Based on codebase exploration:
- Similar patterns in `src/components/crypto/` and `src/components/github/`
- Use TanStack Query hooks in `src/hooks/`
- Zustand stores in `src/stores/`
- Dashboard tabs configured in `DashboardLayout.tsx`
- Routes defined in `App.tsx`

## API

REST Countries API (no auth required):
- All countries: `https://restcountries.com/v3.1/all`
- By region: `https://restcountries.com/v3.1/region/{region}`
- Search: `https://restcountries.com/v3.1/name/{name}`

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/hooks/useCountries.ts` | Create | TanStack Query hooks for API |
| `src/stores/useCountryStore.ts` | Create | Zustand store for selection state |
| `src/components/countries/CountryComparison.tsx` | Create | Main page component |
| `src/components/countries/CountryGrid.tsx` | Create | Grid of country cards |
| `src/components/countries/CountryCard.tsx` | Create | Individual country card |
| `src/components/countries/CountrySearchBar.tsx` | Create | Search input |
| `src/components/countries/RegionFilter.tsx` | Create | Region dropdown filter |
| `src/components/countries/ComparisonTray.tsx` | Create | Bottom selection tray |
| `src/components/countries/ComparisonView.tsx` | Create | Comparison modal |
| `src/components/countries/StatBar.tsx` | Create | Visual stat bars |
| `src/components/countries/CountrySkeletons.tsx` | Create | Loading skeletons |
| `src/components/countries/index.ts` | Create | Barrel exports |
| `src/App.tsx` | Modify | Add route |
| `src/components/dashboard/DashboardLayout.tsx` | Modify | Add tab |

## Implementation Steps

1. Create useCountries hook with TanStack Query
2. Create useCountryStore Zustand store
3. Create CountryCard component
4. Create CountryGrid component
5. Create CountrySearchBar component
6. Create RegionFilter component
7. Create ComparisonTray component
8. Create StatBar component
9. Create ComparisonView component
10. Create CountrySkeletons component
11. Create CountryComparison main component
12. Create index.ts barrel export
13. Add route to App.tsx
14. Add tab to DashboardLayout.tsx

## Verification

- [ ] Type check passes
- [ ] Build passes
- [ ] Page loads at /dashboard/country-compare
- [ ] Countries display in grid
- [ ] Search filters countries
- [ ] Region filter works
- [ ] Can select up to 3 countries
- [ ] Comparison view shows stats
