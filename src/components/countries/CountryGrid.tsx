import { AnimatePresence, motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useMemo } from 'react'
import type { Country } from '../../hooks/useCountries'
import type { SortDirection, SortOption } from '../../stores/useCountryStore'
import { CountryCard } from './CountryCard'

interface CountryGridProps {
	countries: Country[]
	selectedCountries: string[]
	maxSelection: number
	searchQuery: string
	selectedRegion: string
	sortBy: SortOption
	sortDirection: SortDirection
	onToggleCountry: (code: string) => void
}

export function CountryGrid({
	countries,
	selectedCountries,
	maxSelection,
	searchQuery,
	selectedRegion,
	sortBy,
	sortDirection,
	onToggleCountry,
}: CountryGridProps) {
	// Memoized filtering and sorting
	const filteredAndSortedCountries = useMemo(() => {
		let result = [...countries]

		// Filter by region
		if (selectedRegion) {
			result = result.filter((c) => c.region === selectedRegion)
		}

		// Filter by search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase()
			result = result.filter(
				(c) =>
					c.name.common.toLowerCase().includes(query) ||
					c.name.official.toLowerCase().includes(query) ||
					c.capital?.some((cap) => cap.toLowerCase().includes(query)),
			)
		}

		// Sort
		result.sort((a, b) => {
			let comparison = 0
			switch (sortBy) {
				case 'name':
					comparison = a.name.common.localeCompare(b.name.common)
					break
				case 'population':
					comparison = a.population - b.population
					break
				case 'area':
					comparison = a.area - b.area
					break
			}
			return sortDirection === 'asc' ? comparison : -comparison
		})

		return result
	}, [countries, selectedRegion, searchQuery, sortBy, sortDirection])

	const isMaxSelected = selectedCountries.length >= maxSelection

	if (filteredAndSortedCountries.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col items-center justify-center py-20 text-center"
			>
				<Globe className="w-16 h-16 text-muted-foreground/50 mb-4" />
				<h3 className="text-lg font-medium text-muted-foreground">
					No countries found
				</h3>
				<p className="text-sm text-muted-foreground/70 mt-1">
					Try adjusting your search or filters
				</p>
			</motion.div>
		)
	}

	return (
		<div>
			<p className="text-sm text-muted-foreground mb-4">
				{filteredAndSortedCountries.length} countries available
				{selectedCountries.length > 0 && (
					<span className="text-emerald-400">
						{' '}
						&middot; {selectedCountries.length} selected
					</span>
				)}
			</p>

			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: { opacity: 0 },
					visible: {
						opacity: 1,
						transition: {
							staggerChildren: 0.03,
						},
					},
				}}
			>
				<AnimatePresence mode="popLayout">
					{filteredAndSortedCountries.map((country) => (
						<CountryCard
							key={country.cca3}
							country={country}
							isSelected={selectedCountries.includes(country.cca3)}
							isDisabled={isMaxSelected}
							onToggle={onToggleCountry}
						/>
					))}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}
