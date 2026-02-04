import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpDown, AlertCircle, Globe } from 'lucide-react'
import { useAllCountries, useCountriesByCodes } from '../../hooks/useCountries'
import {
	useComparisonMode,
	useCountryFilters,
	useCountrySelection,
} from '../../stores/useCountryStore'
import { ComparisonTray } from './ComparisonTray'
import { ComparisonView } from './ComparisonView'
import { CountryGrid } from './CountryGrid'
import { CountrySearchBar } from './CountrySearchBar'
import { CountryGridSkeleton } from './CountrySkeletons'
import { RegionFilter } from './RegionFilter'

export default function CountryComparison() {
	const { data: countries, isLoading, error } = useAllCountries()

	const {
		selectedCountries,
		maxSelection,
		toggleCountrySelection,
		clearSelection,
	} = useCountrySelection()

	const {
		searchQuery,
		selectedRegion,
		sortBy,
		sortDirection,
		setSearchQuery,
		setSelectedRegion,
		setSortBy,
		toggleSortDirection,
	} = useCountryFilters()

	const { isComparing, setIsComparing } = useComparisonMode()

	// Fetch selected countries for comparison tray and view
	const { data: selectedCountryData = [] } =
		useCountriesByCodes(selectedCountries)

	const sortOptions = [
		{ value: 'name', label: 'Name' },
		{ value: 'population', label: 'Population' },
		{ value: 'area', label: 'Area' },
	] as const

	return (
		<div className="space-y-6 pb-24">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="space-y-2"
			>
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
						<Globe className="w-5 h-5 text-emerald-400" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-white">
							Country Comparison
						</h1>
						<p className="text-sm text-muted-foreground">
							Browse countries and select up to {maxSelection} to compare
							side-by-side
						</p>
					</div>
				</div>
			</motion.div>

			{/* Filters */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="flex flex-wrap gap-4 items-center"
			>
				<CountrySearchBar
					value={searchQuery}
					onChange={setSearchQuery}
					isLoading={isLoading}
				/>

				<RegionFilter value={selectedRegion} onChange={setSelectedRegion} />

				{/* Sort */}
				<div className="flex items-center gap-2">
					<select
						value={sortBy}
						onChange={(e) =>
							setSortBy(e.target.value as 'name' | 'population' | 'area')
						}
						className="appearance-none px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all cursor-pointer"
					>
						{sortOptions.map((option) => (
							<option
								key={option.value}
								value={option.value}
								className="bg-slate-900"
							>
								Sort by {option.label}
							</option>
						))}
					</select>

					<button
						type="button"
						onClick={toggleSortDirection}
						className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
						title={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
					>
						<ArrowUpDown
							className={`w-5 h-5 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
						/>
					</button>
				</div>
			</motion.div>

			{/* Error State */}
			{error && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="flex items-center gap-4 p-6 bg-red-500/10 border border-red-500/30 rounded-xl"
				>
					<AlertCircle className="w-8 h-8 text-red-400" />
					<div>
						<h3 className="font-medium text-red-400">Failed to load countries</h3>
						<p className="text-sm text-red-400/70">
							Please check your connection and try again
						</p>
					</div>
				</motion.div>
			)}

			{/* Loading State */}
			{isLoading && <CountryGridSkeleton />}

			{/* Country Grid */}
			{!isLoading && !error && countries && (
				<CountryGrid
					countries={countries}
					selectedCountries={selectedCountries}
					maxSelection={maxSelection}
					searchQuery={searchQuery}
					selectedRegion={selectedRegion}
					sortBy={sortBy}
					sortDirection={sortDirection}
					onToggleCountry={toggleCountrySelection}
				/>
			)}

			{/* Comparison Tray */}
			<AnimatePresence>
				{selectedCountryData.length > 0 && (
					<ComparisonTray
						countries={selectedCountryData}
						maxSelection={maxSelection}
						onRemove={toggleCountrySelection}
						onClear={clearSelection}
						onCompare={() => setIsComparing(true)}
					/>
				)}
			</AnimatePresence>

			{/* Comparison View Modal */}
			<ComparisonView
				countries={selectedCountryData}
				isOpen={isComparing}
				onClose={() => setIsComparing(false)}
			/>
		</div>
	)
}
