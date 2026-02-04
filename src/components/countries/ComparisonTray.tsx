import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Trash2, X } from 'lucide-react'
import type { Country } from '../../hooks/useCountries'

interface ComparisonTrayProps {
	countries: Country[]
	maxSelection: number
	onRemove: (code: string) => void
	onClear: () => void
	onCompare: () => void
}

export function ComparisonTray({
	countries,
	maxSelection,
	onRemove,
	onClear,
	onCompare,
}: ComparisonTrayProps) {
	if (countries.length === 0) return null

	return (
		<motion.div
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: 100, opacity: 0 }}
			className="fixed bottom-0 left-0 right-0 z-50 p-4"
		>
			<div className="max-w-4xl mx-auto">
				<div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-4">
							<span className="text-sm text-muted-foreground whitespace-nowrap">
								Selected ({countries.length}/{maxSelection}):
							</span>

							<div className="flex items-center gap-2 overflow-hidden">
								<AnimatePresence mode="popLayout">
									{countries.map((country) => (
										<motion.div
											key={country.cca3}
											initial={{ scale: 0, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											exit={{ scale: 0, opacity: 0 }}
											className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full"
										>
											<img
												src={country.flags.svg}
												alt=""
												className="w-5 h-3 object-cover rounded-sm"
											/>
											<span className="text-sm text-white whitespace-nowrap">
												{country.name.common}
											</span>
											<button
												type="button"
												onClick={() => onRemove(country.cca3)}
												className="text-emerald-300 hover:text-white transition-colors"
											>
												<X className="w-4 h-4" />
											</button>
										</motion.div>
									))}
								</AnimatePresence>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={onClear}
								className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors"
							>
								<Trash2 className="w-4 h-4" />
								Clear
							</button>
							<button
								type="button"
								onClick={onCompare}
								disabled={countries.length < 2}
								className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<BarChart3 className="w-4 h-4" />
								Compare
							</button>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
