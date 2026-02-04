import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, X } from 'lucide-react'
import type { Country } from '../../hooks/useCountries'
import {
	formatArea,
	formatDensity,
	formatPopulation,
	getCurrenciesString,
	getLanguagesString,
} from '../../hooks/useCountries'
import { ComparisonStatBar } from './StatBar'

interface ComparisonViewProps {
	countries: Country[]
	isOpen: boolean
	onClose: () => void
}

export function ComparisonView({
	countries,
	isOpen,
	onClose,
}: ComparisonViewProps) {
	if (!isOpen || countries.length < 2) return null

	const populationData = countries.map((c) => ({
		code: c.cca3,
		value: c.population,
		name: c.name.common,
	}))

	const areaData = countries.map((c) => ({
		code: c.cca3,
		value: c.area,
		name: c.name.common,
	}))

	const densityData = countries.map((c) => ({
		code: c.cca3,
		value: c.area > 0 ? c.population / c.area : 0,
		name: c.name.common,
	}))

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
						className="w-full max-w-5xl max-h-[90vh] overflow-auto bg-slate-900 border border-white/10 rounded-2xl shadow-2xl"
					>
						{/* Header */}
						<div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
							<h2 className="text-xl font-bold text-white">
								Country Comparison
							</h2>
							<button
								type="button"
								onClick={onClose}
								className="p-2 text-muted-foreground hover:text-white transition-colors"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						<div className="p-6 space-y-8">
							{/* Country Cards */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{countries.map((country, index) => (
									<motion.div
										key={country.cca3}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
									>
										{/* Flag */}
										<div className="h-32 overflow-hidden">
											<img
												src={country.flags.svg}
												alt={`${country.name.common} flag`}
												className="w-full h-full object-cover"
											/>
										</div>

										{/* Details */}
										<div className="p-4 space-y-3">
											<div>
												<h3 className="font-bold text-lg text-white">
													{country.name.common}
												</h3>
												<p className="text-sm text-muted-foreground">
													{country.name.official}
												</p>
											</div>

											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<MapPin className="w-4 h-4" />
												<span>
													{country.capital?.[0] || 'N/A'},{' '}
													{country.subregion || country.region}
												</span>
											</div>

											<div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
												<div>
													<p className="text-xs text-muted-foreground">
														Population
													</p>
													<p className="text-sm font-medium text-white">
														{formatPopulation(country.population)}
													</p>
												</div>
												<div>
													<p className="text-xs text-muted-foreground">Area</p>
													<p className="text-sm font-medium text-white">
														{formatArea(country.area)}
													</p>
												</div>
												<div>
													<p className="text-xs text-muted-foreground">
														Languages
													</p>
													<p className="text-sm font-medium text-white truncate">
														{getLanguagesString(country.languages)}
													</p>
												</div>
												<div>
													<p className="text-xs text-muted-foreground">
														Currencies
													</p>
													<p className="text-sm font-medium text-white truncate">
														{getCurrenciesString(country.currencies)}
													</p>
												</div>
											</div>
										</div>
									</motion.div>
								))}
							</div>

							{/* Comparison Charts */}
							<div className="space-y-6 p-6 bg-white/5 border border-white/10 rounded-xl">
								<h3 className="text-lg font-semibold text-white">
									Statistics Comparison
								</h3>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
									<ComparisonStatBar
										label="Population"
										values={populationData}
										formatter={formatPopulation}
									/>
									<ComparisonStatBar
										label="Area (km²)"
										values={areaData}
										formatter={formatArea}
										colors={['bg-blue-500', 'bg-cyan-500', 'bg-teal-500']}
									/>
									<ComparisonStatBar
										label="Population Density"
										values={densityData}
										formatter={(v) => formatDensity(v, 1)}
										colors={['bg-purple-500', 'bg-pink-500', 'bg-rose-500']}
									/>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
