import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'

export type SortOption = 'name' | 'population' | 'area'
export type SortDirection = 'asc' | 'desc'

interface CountryState {
	// Selection
	selectedCountries: string[] // Country codes (cca3)
	maxSelection: number

	// Filters
	searchQuery: string
	selectedRegion: string

	// Sorting
	sortBy: SortOption
	sortDirection: SortDirection

	// Comparison mode
	isComparing: boolean

	// Actions
	toggleCountrySelection: (code: string) => void
	clearSelection: () => void
	setSearchQuery: (query: string) => void
	setSelectedRegion: (region: string) => void
	setSortBy: (option: SortOption) => void
	toggleSortDirection: () => void
	setIsComparing: (comparing: boolean) => void
}

export const useCountryStore = create<CountryState>()(
	persist(
		(set, get) => ({
			// Initial state
			selectedCountries: [],
			maxSelection: 3,
			searchQuery: '',
			selectedRegion: '',
			sortBy: 'name',
			sortDirection: 'asc',
			isComparing: false,

			// Actions
			toggleCountrySelection: (code) => {
				const { selectedCountries, maxSelection } = get()
				if (selectedCountries.includes(code)) {
					set({ selectedCountries: selectedCountries.filter((c) => c !== code) })
				} else if (selectedCountries.length < maxSelection) {
					set({ selectedCountries: [...selectedCountries, code] })
				}
			},

			clearSelection: () => set({ selectedCountries: [], isComparing: false }),

			setSearchQuery: (query) => set({ searchQuery: query }),

			setSelectedRegion: (region) => set({ selectedRegion: region }),

			setSortBy: (option) => set({ sortBy: option }),

			toggleSortDirection: () =>
				set((state) => ({
					sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc',
				})),

			setIsComparing: (comparing) => set({ isComparing: comparing }),
		}),
		{
			name: 'country-comparison-storage',
			partialize: (state) => ({
				selectedCountries: state.selectedCountries,
			}),
		},
	),
)

// Optimized selectors using useShallow
export function useCountrySelection() {
	return useCountryStore(
		useShallow((state) => ({
			selectedCountries: state.selectedCountries,
			maxSelection: state.maxSelection,
			toggleCountrySelection: state.toggleCountrySelection,
			clearSelection: state.clearSelection,
		})),
	)
}

export function useCountryFilters() {
	return useCountryStore(
		useShallow((state) => ({
			searchQuery: state.searchQuery,
			selectedRegion: state.selectedRegion,
			sortBy: state.sortBy,
			sortDirection: state.sortDirection,
			setSearchQuery: state.setSearchQuery,
			setSelectedRegion: state.setSelectedRegion,
			setSortBy: state.setSortBy,
			toggleSortDirection: state.toggleSortDirection,
		})),
	)
}

export function useComparisonMode() {
	return useCountryStore(
		useShallow((state) => ({
			isComparing: state.isComparing,
			setIsComparing: state.setIsComparing,
			selectedCountries: state.selectedCountries,
		})),
	)
}
