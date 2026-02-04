import { motion } from 'framer-motion'
import { Check, Users } from 'lucide-react'
import type { Country } from '../../hooks/useCountries'
import { formatPopulation } from '../../hooks/useCountries'
import { cn } from '../../lib/utils'

interface CountryCardProps {
	country: Country
	isSelected: boolean
	isDisabled: boolean
	onToggle: (code: string) => void
}

export function CountryCard({
	country,
	isSelected,
	isDisabled,
	onToggle,
}: CountryCardProps) {
	return (
		<motion.button
			type="button"
			layout
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			whileHover={{ scale: isDisabled && !isSelected ? 1 : 1.02 }}
			whileTap={{ scale: isDisabled && !isSelected ? 1 : 0.98 }}
			onClick={() => !isDisabled || isSelected ? onToggle(country.cca3) : null}
			disabled={isDisabled && !isSelected}
			className={cn(
				'relative w-full text-left rounded-xl overflow-hidden transition-all duration-300',
				'border backdrop-blur-sm',
				'focus:outline-none focus:ring-2 focus:ring-emerald-500/50',
				isSelected
					? 'bg-emerald-500/20 border-emerald-500/50 ring-2 ring-emerald-500/30'
					: 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20',
				isDisabled && !isSelected && 'opacity-50 cursor-not-allowed',
			)}
		>
			{/* Flag */}
			<div className="relative h-32 overflow-hidden">
				<img
					src={country.flags.svg}
					alt={`${country.name.common} flag`}
					className="w-full h-full object-cover"
				/>
				{isSelected && (
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
					>
						<Check className="w-4 h-4 text-white" />
					</motion.div>
				)}
			</div>

			{/* Info */}
			<div className="p-4">
				<h3 className="font-semibold text-white truncate">
					{country.name.common}
				</h3>
				<p className="text-sm text-muted-foreground truncate">
					{country.capital?.[0] || 'No capital'}
				</p>
				<div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
					<Users className="w-3 h-3" />
					<span>{formatPopulation(country.population)}</span>
				</div>
			</div>
		</motion.button>
	)
}
